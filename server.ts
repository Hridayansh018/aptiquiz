import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import next from 'next';
import cors from 'cors';
import { QUIZ_QUESTIONS } from './lib/questions';
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// ─── Types ────────────────────────────────────────────────────────────────────

type RoomLetter = 'A' | 'B' | 'C';

interface User {
  id: string;            // current socket id
  persistentId: string;  // name:team
  name: string;
  team: string;          // normalized lowercase
  score: number;
  lastAnswerCorrect: boolean | null;
  connected: boolean;
  room: RoomLetter;
}

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

interface Quiz {
  id: string;
  title: string;
  startTime: string;
  code: string;
  hostId: string;
  createdAt: string;
  questions: QuizQuestion[];
  questionDuration: number;
  gapDuration: number;
  enableRooms?: boolean; // whether to load balance across A/B/C
  mode?: 'team' | 'individual'; // team or individual mode
}

interface Session {
  code: string;
  hostId: string;
  hostSocketId: string | null;
  users: Record<string, User>;         // keyed by persistentId
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  questionStartTime: number;
  status: 'waiting' | 'active' | 'finished';
  timer: NodeJS.Timeout | null;
  timeLeft: number;
  lastScoreHash: string;
  // ─── NEW: Rooms, Teams, Timer ──────────────────────
  rooms: Record<RoomLetter, Set<string>>;   // persistentIds per room
  teams: Record<string, { score: number; members: Set<string> }>;  // team aggregates
  questionDuration: number;   // seconds per question (default 10)
  gapDuration: number;        // seconds between questions (default 4)
  answeredThisRound: Set<string>;  // persistentIds that answered this question
  enableRooms: boolean;
  mode: 'team' | 'individual';
}

// ─── In-memory stores ─────────────────────────────────────────────────────────

const sessions: Record<string, Session> = {};
const lobbies: Record<string, Map<string, { name: string; team: string; socketId: string }>> = {}; // code -> socketId -> user
const scheduledQuizzes: Quiz[] = [
  {
    id: 'sample-quiz-id',
    title: 'Sample General Knowledge Quiz',
    startTime: new Date(Date.now() + 3600000).toISOString(),
    code: 'SAMPLE',
    hostId: 'sample-host-id',
    createdAt: new Date().toISOString(),
    questions: QUIZ_QUESTIONS,
    questionDuration: 10,
    gapDuration: 4,
    mode: 'team',
  }
];

// ─── Helper: Create fresh session fields ──────────────────────────────────────

function createSessionFields(overrides?: Partial<Session>): Omit<Session, 'code' | 'hostId' | 'hostSocketId' | 'questions'> {
  return {
    users: {},
    currentQuestionIndex: -1,
    questionStartTime: 0,
    status: 'waiting',
    timer: null,
    timeLeft: overrides?.questionDuration ?? 10,
    lastScoreHash: '',
    rooms: { A: new Set(), B: new Set(), C: new Set() },
    teams: {},
    questionDuration: overrides?.questionDuration ?? 10,
    gapDuration: overrides?.gapDuration ?? 4,
    answeredThisRound: new Set(),
    enableRooms: overrides?.enableRooms ?? true,
    mode: overrides?.mode ?? 'team',
    ...overrides,
  };
}

// ─── Helper: Assign room (least-loaded) ───────────────────────────────────────

function assignRoom(session: Session): RoomLetter {
  if (!session.enableRooms) return 'A';
  
  const counts: [RoomLetter, number][] = [
    ['A', session.rooms.A.size],
    ['B', session.rooms.B.size],
    ['C', session.rooms.C.size],
  ];
  counts.sort((a, b) => a[1] - b[1]);
  return counts[0][0];
}

// ─── Helper: Emit to all sub-rooms ────────────────────────────────────────────

function emitToAllRooms(io: Server, code: string, event: string, payload: any) {
  (['A', 'B', 'C'] as RoomLetter[]).forEach(room => {
    io.to(`${code}-${room}`).emit(event, payload);
  });
  // Also emit to the main room (host socket sits here)
  io.to(code).emit(event, payload);
}

// ─── Helper: Get room stats ───────────────────────────────────────────────────

function getRoomStats(session: Session) {
  return {
    A: session.rooms.A.size,
    B: session.rooms.B.size,
    C: session.rooms.C.size,
    total: session.rooms.A.size + session.rooms.B.size + session.rooms.C.size,
  };
}

// ─── Boot ─────────────────────────────────────────────────────────────────────

app.prepare().then(() => {
  const server = express();
  const httpServer = createServer(server);
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.NEXT_PUBLIC_SITE_URL || '*',
      methods: ['GET', 'POST'],
    },
    maxHttpBufferSize: 1e6, // 1MB payload buffer limit
    pingTimeout: 60000,     // 60s max ping wait (useful for shaky mobile connections)
    pingInterval: 25000,    // 25s ping heartbeats
    perMessageDeflate: true // Enables compression for heavy leaderboards
  });

  server.use(cors());

  // ─── Leaderboard computation ──────────────────────────────────────────────

  function getLeaderboard(code: string) {
    const session = sessions[code];
    if (!session) return { individuals: [], teams: [], mode: 'team' };

    const isTeamMode = session.mode === 'team';

    // In individual mode: only player name, score, rank, connected (no team)
    // In team mode: also include team name
    const individuals = Object.values(session.users)
      .sort((a, b) => b.score - a.score)
      .map((u, index) => ({
        rank: index + 1,
        id: u.persistentId,
        name: u.name,
        score: u.score,
        connected: u.connected,
        room: u.room,
        ...(isTeamMode ? { team: u.team } : {}),
      }));

    // In team mode: return all member names with team names
    // In individual mode: no team leaderboard
    const teams = isTeamMode
      ? Object.entries(session.teams)
          .map(([teamName, t]) => {
            const memberNames = Array.from(t.members).map(
              (pid) => session.users[pid]?.name || pid.split(':')[0]
            );
            return {
              name: teamName,
              score: t.score,
              members: t.members.size,
              memberNames, // array of all member names in this team
            };
          })
          .sort((a, b) => b.score - a.score)
          .map((t, index) => ({
            rank: index + 1,
            ...t,
          }))
      : [];

    return { individuals, teams, mode: session.mode };
  }

  // ─── Team leaderboard (standalone) ────────────────────────────────────────

  function getTeamLeaderboard(session: Session) {
    return Object.entries(session.teams)
      .map(([teamName, t]) => ({
        name: teamName,
        score: t.score,
        members: t.members.size,
      }))
      .sort((a, b) => b.score - a.score)
      .map((t, index) => ({
        rank: index + 1,
        ...t,
      }));
  }

  // ─── Quiz engine: start next question ─────────────────────────────────────

  function startNextQuestion(code: string) {
    const session = sessions[code];
    if (!session) return;

    session.currentQuestionIndex++;

    if (session.currentQuestionIndex >= session.questions.length) {
      session.status = 'finished';
      const finalLeaderboard = getLeaderboard(code);
      emitToAllRooms(io, code, 'quiz-finished', { leaderboard: finalLeaderboard });
      return;
    }

    // Reset per-question state
    Object.values(session.users).forEach(u => u.lastAnswerCorrect = null);
    session.answeredThisRound = new Set();

    session.timeLeft = session.questionDuration;
    session.questionStartTime = Date.now();

    const question = session.questions[session.currentQuestionIndex];
    const questionData = {
      ...question,
      answer: undefined,
      index: session.currentQuestionIndex,
      total: session.questions.length,
    };

    emitToAllRooms(io, code, 'new-question', { question: questionData, timeLeft: session.timeLeft });

    if (session.timer) clearInterval(session.timer);

    session.timer = setInterval(() => {
      session.timeLeft--;
      if (session.timeLeft <= 0) {
        if (session.timer) clearInterval(session.timer);
        emitToAllRooms(io, code, 'time-up', { answer: question.answer });

        // ── Leaderboard reveal after 1s (let time-up animation play) ────
        setTimeout(() => {
          const leaderboard = getLeaderboard(code);
          emitToAllRooms(io, code, 'leaderboard-reveal', {
            individual: leaderboard.individuals.slice(0, 20),
            teams: leaderboard.teams,
          });

          // ── After 4s animation, start gap countdown ────
          setTimeout(() => {
            emitToAllRooms(io, code, 'gap-start', { duration: session.gapDuration });

            // ── After gap, next question ────
            setTimeout(() => {
              startNextQuestion(code);
            }, session.gapDuration * 1000);
          }, 4000);
        }, 1000);

      } else {
        emitToAllRooms(io, code, 'timer-tick', { timeLeft: session.timeLeft });
      }
    }, 1000);
  }

  // ─── Socket.IO connection handler ─────────────────────────────────────────

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // ── Get scheduled quizzes ──────────────────────────────────────────────
    socket.on('get-scheduled-quizzes', (callback) => {
      if (typeof callback === 'function') callback(scheduledQuizzes);
    });

    // ── Get quiz mode ──────────────────────────────────────────────────────
    socket.on('get-quiz-mode', ({ code }, callback) => {
      const normCode = code?.toUpperCase();
      const quiz = scheduledQuizzes.find(q => q.code === normCode);
      const session = sessions[normCode];
      if (typeof callback === 'function') {
        callback({
          found: Boolean(quiz || session),
          mode: session?.mode || quiz?.mode || 'team',
          title: session ? 'Active Quiz' : (quiz?.title || ''),
        });
      }
    });

    // ── Schedule quiz ──────────────────────────────────────────────────────
    socket.on('schedule-quiz', async ({ title, startTime, hostId, questions, questionDuration, gapDuration, enableRooms, mode }, callback) => {
      try {
        const code = Math.random().toString(36).substring(2, 8).toUpperCase();
        const qDuration = questionDuration ?? 10;
        const gDuration = gapDuration ?? 4;
        const roomsEnabled = enableRooms ?? true;
        const quizMode = mode === 'individual' ? 'individual' : 'team';

        const quizQuestions: QuizQuestion[] = Array.isArray(questions) && questions.length > 0
          ? questions
          : QUIZ_QUESTIONS;

        const newQuiz: Quiz = {
          id: Math.random().toString(36).substring(2, 15),
          title: title || 'Untitled Quiz',
          startTime: startTime || new Date().toISOString(),
          code,
          hostId: hostId || 'host-admin',
          createdAt: new Date().toISOString(),
          questions: quizQuestions,
          questionDuration: qDuration,
          gapDuration: gDuration,
          enableRooms: roomsEnabled,
          mode: quizMode,
        };

        scheduledQuizzes.push(newQuiz);

        console.log(`[RAM] Quiz ${code} (${quizMode} mode) saved to memory.`);

        io.emit('quiz-scheduled', newQuiz);
        if (typeof callback === 'function') {
          callback({ success: true, quiz: newQuiz });
        }
      } catch (err: any) {
        console.error('Error scheduling quiz:', err);
        if (typeof callback === 'function') {
          callback({ success: false, message: err.message || 'Failed to schedule quiz' });
        }
      }
    });

    // ── Delete quiz ────────────────────────────────────────────────────────
    socket.on('delete-quiz', ({ code }, callback) => {
      const idx = scheduledQuizzes.findIndex(q => q.code === code);
      if (idx === -1) return callback?.({ success: false, message: 'Quiz not found' });
      scheduledQuizzes.splice(idx, 1);
      io.emit('quiz-deleted', { code });
      console.log(`[RAM] Quiz ${code} deleted.`);
      callback?.({ success: true });
    });

    // ── Edit quiz ──────────────────────────────────────────────────────────
    socket.on('edit-quiz', ({ code, title, startTime, questionDuration, gapDuration, enableRooms, questions, mode }, callback) => {
      const quiz = scheduledQuizzes.find(q => q.code === code);
      if (!quiz) return callback?.({ success: false, message: 'Quiz not found' });
      if (sessions[code]) return callback?.({ success: false, message: 'Cannot edit an active session' });

      if (title) quiz.title = title;
      if (startTime) quiz.startTime = startTime;
      if (questionDuration != null) quiz.questionDuration = questionDuration;
      if (gapDuration != null) quiz.gapDuration = gapDuration;
      if (enableRooms != null) quiz.enableRooms = enableRooms;
      if (mode) quiz.mode = mode;
      if (Array.isArray(questions) && questions.length > 0) quiz.questions = questions;

      io.emit('quiz-updated', quiz);
      console.log(`[RAM] Quiz ${code} updated.`);
      callback?.({ success: true, quiz });
    });

    // ── Get session status ─────────────────────────────────────────────────
    socket.on('get-session-status', ({ code }, callback) => {
      const session = sessions[code];
      if (!session) return callback?.({ active: false });
      callback?.({
        active: true,
        status: session.status,
        participants: Object.values(session.users).filter((u: any) => u.connected).length,
        currentQuestion: session.currentQuestionIndex,
        totalQuestions: session.questions.length,
        mode: session.mode,
      });
    });

    // ── Create session ─────────────────────────────────────────────────────
    socket.on('create-session', ({ code, hostId, enableRooms, mode }) => {
      const quiz = scheduledQuizzes.find(q => q.code === code);

      const questions = quiz?.questions ?? QUIZ_QUESTIONS;
      const sessionMode = mode || quiz?.mode || 'team';

      sessions[code] = {
        code,
        hostId,
        hostSocketId: socket.id,
        questions,
        ...createSessionFields({
          questionDuration: quiz?.questionDuration ?? 10,
          gapDuration: quiz?.gapDuration ?? 4,
          enableRooms: enableRooms ?? quiz?.enableRooms ?? true,
          mode: sessionMode,
        }),
      };
      socket.join(code);
      console.log(`Session created: ${code} by ${hostId} (Mode: ${sessionMode}, Q: ${sessions[code].questionDuration}s, Gap: ${sessions[code].gapDuration}s)`);

      // Notify any users in the pre-session lobby
      if (lobbies[code] && lobbies[code].size > 0) {
        io.to(`lobby-${code}`).emit('session-starting', { code });
        console.log(`[Lobby] Notified ${lobbies[code].size} waiting players in ${code}`);
      }
      io.emit('session-created', { code, mode: sessionMode });
    });

    // ── Join session (Player) ──────────────────────────────────────────────
    socket.on('join-session', ({ code: rawCode, name, team }, callback?) => {
      const respond = typeof callback === 'function' ? callback : () => {};
      const code = rawCode?.toUpperCase();
      const session = sessions[code];

      // ── No session yet — check if quiz is scheduled → put in lobby ──
      if (!session) {
        const scheduledQuiz = scheduledQuizzes.find(q => q.code === code);
        if (!scheduledQuiz) {
          return respond({ success: false, message: 'Quiz not found' });
        }

        const isIndiv = scheduledQuiz.mode === 'individual';
        const teamNormalized = isIndiv ? '' : (team ? team.trim().toLowerCase() : '');

        // Add to lobby
        if (!lobbies[code]) lobbies[code] = new Map();
        const lobbyUser = { name, team: teamNormalized, socketId: socket.id };
        lobbies[code].set(socket.id, lobbyUser);
        socket.join(`lobby-${code}`);

        // Broadcast updated lobby to all waiting
        const lobbyList = Array.from(lobbies[code].values());
        io.to(`lobby-${code}`).emit('lobby-update', { players: lobbyList });
        console.log(`[Lobby] ${name} joined lobby for quiz ${code} (${lobbyList.length} waiting)`);

        return respond({
          success: true,
          lobby: true,
          scheduledTime: scheduledQuiz.startTime,
          players: lobbyList,
          quizTitle: scheduledQuiz.title,
          mode: scheduledQuiz.mode || 'team',
        });
      }

      const isIndiv = session.mode === 'individual';
      const teamNormalized = isIndiv ? '' : (team ? team.trim().toLowerCase() : '');
      const persistentId = isIndiv
        ? name.trim().toLowerCase()
        : `${name.trim().toLowerCase()}:${teamNormalized}`;
      const existingUser = session.users[persistentId];

      if (existingUser) {
        // ── Reconnection ──
        const wasDisconnected = !existingUser.connected;
        existingUser.id = socket.id;
        existingUser.connected = true;

        // Re-join Socket.IO rooms
        socket.join(code);
        socket.join(`${code}-${existingUser.room}`);

        // Re-add to room tracking
        session.rooms[existingUser.room].add(persistentId);

        io.to(code).emit('user-rejoined', {
          user: existingUser,
          totalParticipants: Object.values(session.users).filter(u => u.connected).length,
          wasDisconnected,
        });

        const currentQuestion = session.currentQuestionIndex >= 0 ? {
          ...session.questions[session.currentQuestionIndex],
          answer: undefined,
          index: session.currentQuestionIndex,
          total: session.questions.length,
        } : null;

        const myTeamRank = isIndiv
          ? 0
          : getLeaderboard(code).teams.find(t => t.name === teamNormalized)?.rank || 0;

        return respond({
          success: true,
          sessionStatus: session.status,
          reconnected: true,
          wasDisconnected,
          currentQuestion,
          timeLeft: session.timeLeft,
          score: existingUser.score,
          room: existingUser.room,
          teamRank: myTeamRank,
          mode: session.mode,
        });
      }

      // ── New user ──

      // Initialize team if not exists (only in team mode)
      if (!isIndiv && teamNormalized) {
        if (!session.teams[teamNormalized]) {
          session.teams[teamNormalized] = { score: 0, members: new Set() };
        }
        session.teams[teamNormalized].members.add(persistentId);
      }

      // Assign room (least-loaded)
      const room = assignRoom(session);

      const newUser: User = {
        id: socket.id,
        persistentId,
        name,
        team: teamNormalized,
        score: 0,
        lastAnswerCorrect: null,
        connected: true,
        room,
      };

      session.users[persistentId] = newUser;
      session.rooms[room].add(persistentId);

      // Join Socket.IO rooms
      socket.join(code);
      socket.join(`${code}-${room}`);

      // Notify all
      io.to(code).emit('user-joined', {
        user: newUser,
        totalParticipants: Object.values(session.users).filter(u => u.connected).length,
        roomStats: getRoomStats(session),
      });

      respond({ success: true, sessionStatus: session.status, room, mode: session.mode });
      console.log(`User ${name} joined session ${code} → Room ${room} | Mode: ${session.mode}${!isIndiv ? ` | Team "${teamNormalized}"` : ''}`);
    });

    // ── Join Observer (Leaderboard Only) ───────────────────────────────────
    socket.on('join-observer', ({ code: rawCode }, callback?) => {
      const code = rawCode?.toUpperCase();
      const session = sessions[code];
      const respond = typeof callback === 'function' ? callback : () => {};

      if (!session) {
        return respond({ success: false, message: 'Quiz not found' });
      }

      // Read-only join, does not add to participants array
      socket.join(code);
      console.log(`Observer joined session: ${code}`);

      // Instantly send current leaderboard state
      respond({ 
        success: true, 
        leaderboard: getLeaderboard(code),
        status: session.status,
        mode: session.mode
      });
    });

    // ── Start quiz ─────────────────────────────────────────────────────────
    socket.on('start-quiz', ({ code }) => {
      const session = sessions[code];
      if (!session || session.status !== 'waiting') return;

      // Brief grace period so lobby players can complete their join-session
      setTimeout(() => {
        // Broadcast countdown 3 → 2 → 1 then fire first question
        let count = 3;
        emitToAllRooms(io, code, 'quiz-starting', { countdown: count });
        io.to(code).emit('quiz-starting', { countdown: count }); // host room

        const tick = setInterval(() => {
          count--;
          if (count > 0) {
            emitToAllRooms(io, code, 'quiz-starting', { countdown: count });
            io.to(code).emit('quiz-starting', { countdown: count });
          } else {
            clearInterval(tick);
            session.status = 'active';
            startNextQuestion(code);
          }
        }, 1000);
      }, 600); // 600ms grace for lobby rejoins
    });

    // ── Force end quiz ─────────────────────────────────────────────────────
    socket.on('force-end-quiz', ({ code }, callback?) => {
      const session = sessions[code];
      if (!session) return callback?.({ success: false, message: 'Session not found' });

      if (session.timer) {
        clearInterval(session.timer);
        session.timer = null;
      }
      session.status = 'finished';
      const finalLeaderboard = getLeaderboard(code);
      emitToAllRooms(io, code, 'quiz-finished', {
        leaderboard: finalLeaderboard,
        forceEnded: true,
      });
      delete sessions[code];
      io.emit('session-ended', { code, forceEnded: true });
      console.log(`[Admin] Quiz ${code} force-ended by host.`);
      callback?.({ success: true, leaderboard: finalLeaderboard });
    });

    // ── End session ────────────────────────────────────────────────────────
    socket.on('end-session', ({ code, force }: { code: string; force?: boolean }, callback?) => {
      const session = sessions[code];
      if (session) {
        if (session.timer) {
          clearInterval(session.timer);
          session.timer = null;
        }
        session.status = 'finished';
        const finalLeaderboard = getLeaderboard(code);
        emitToAllRooms(io, code, 'quiz-finished', {
          leaderboard: finalLeaderboard,
          forceEnded: Boolean(force),
        });
        delete sessions[code];
        io.emit('session-ended', { code, forceEnded: Boolean(force) });
        console.log(`[Admin] Session ${code} ended.`);
      }
      if (typeof callback === 'function') callback({ success: true });
    });

    // ── Submit answer ──────────────────────────────────────────────────────
    socket.on('submit-answer', ({ code, answer }) => {
      const session = sessions[code];
      if (!session || session.status !== 'active') return;

      const user = Object.values(session.users).find(u => u.id === socket.id);
      if (!user) return;

      // Prevent duplicate answers this round
      if (session.answeredThisRound.has(user.persistentId)) return;

      const currentQuestion = session.questions[session.currentQuestionIndex];
      if (!currentQuestion) return;

      const isCorrect = answer === currentQuestion.answer;
      const timeTaken = (Date.now() - session.questionStartTime) / 1000;
      const timeLeft = Math.max(0, session.questionDuration - timeTaken);

      // Mark as answered
      session.answeredThisRound.add(user.persistentId);

      if (isCorrect && user.lastAnswerCorrect === null) {
        const points = 100 + Math.floor((timeLeft / session.questionDuration) * 100);
        user.score += points;
        user.lastAnswerCorrect = true;

        // Increment team score only in team mode
        if (session.mode === 'team' && user.team && session.teams[user.team]) {
          session.teams[user.team].score += points;
        }
      } else if (user.lastAnswerCorrect === null) {
        user.lastAnswerCorrect = false;
      }

      // Notify host of live answer count
      const answersCount = session.answeredThisRound.size;
      emitToAllRooms(io, code, 'answer-submitted', { answersCount });

      // Send back current score to user
      socket.emit('score-update', { score: user.score });
    });

    // ── Disconnect ─────────────────────────────────────────────────────────
    socket.on('disconnect', () => {
      // Clean up lobby presence
      for (const [code, lobby] of Object.entries(lobbies)) {
        if (lobby.has(socket.id)) {
          lobby.delete(socket.id);
          const lobbyList = Array.from(lobby.values());
          io.to(`lobby-${code}`).emit('lobby-update', { players: lobbyList });
          if (lobby.size === 0) delete lobbies[code];
          break;
        }
      }

      // Clean up session presence
      for (const code in sessions) {
        const session = sessions[code];
        const user = Object.values(session.users).find(u => u.id === socket.id);

        if (user) {
          user.connected = false;

          // Remove from room tracking
          session.rooms[user.room].delete(user.persistentId);

          io.to(code).emit('user-left', {
            socketId: socket.id,
            totalParticipants: Object.values(session.users).filter(u => u.connected).length,
            roomStats: getRoomStats(session),
          });
          console.log(`User ${user.name} disconnected from session ${code}`);
          break;
        }
      }
    });
  });

  // ─── Next.js route handler ──────────────────────────────────────────────────

  server.all(/.*/, (req, res) => {
    return handle(req, res);
  });

  // ─── Listen ─────────────────────────────────────────────────────────────────

  httpServer.listen(PORT, () => {
    console.log(`> Ready on http://localhost:${PORT}`);

    // Auto-initialize sample session for testing
    sessions['SAMPLE'] = {
      code: 'SAMPLE',
      hostId: 'sample-host-id',
      hostSocketId: null,
      questions: QUIZ_QUESTIONS,
      ...createSessionFields({ questionDuration: 10, gapDuration: 4 }),
    };
  });
});
