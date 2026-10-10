'use client';

import { useState, useEffect, use, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import socket from '@/lib/socket';
import toast from 'react-hot-toast';
import {
  Timer,
  Users,
  Trophy,
  CheckCircle2,
  XCircle,
  Zap,
  ChevronUp,
  ChevronDown,
  Minus,
  Sparkles,
  Clock,
  ArrowRight,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface LeaderboardEntry {
  id: string;
  name: string;
  team: string;
  score: number;
  rank: number;
  prevRank?: number | null;
  rankChange?: number;
}

interface TeamEntry {
  name: string;
  score: number;
  members: number;
  rank: number;
}

type Phase = 'question' | 'timeup' | 'reveal' | 'gap' | 'starting';

// ─── Rank helpers ─────────────────────────────────────────────────────────────

function RankBadge({ change }: { change: number }) {
  if (change > 0)
    return (
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-0.5 text-green-400 text-xs font-bold">
        <ChevronUp className="w-3.5 h-3.5" /><span>+{change}</span>
      </motion.div>
    );
  if (change < 0)
    return (
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-0.5 text-red-400 text-xs font-bold">
        <ChevronDown className="w-3.5 h-3.5" /><span>{change}</span>
      </motion.div>
    );
  return <div className="text-white/20 text-xs"><Minus className="w-3 h-3" /></div>;
}

function RankMedal({ rank }: { rank: number }) {
  if (rank === 1) return <span className="text-lg">🥇</span>;
  if (rank === 2) return <span className="text-lg">🥈</span>;
  if (rank === 3) return <span className="text-lg">🥉</span>;
  return <span className="font-mono font-bold text-[#a78bfa] w-6 text-center">#{rank}</span>;
}

// ─── Leaderboard Reveal Overlay ───────────────────────────────────────────────

function LeaderboardReveal({
  individual, teams, myId, questionIndex,
}: {
  individual: LeaderboardEntry[];
  teams: TeamEntry[];
  myId: string;
  questionIndex: number;
}) {
  const isIndiv = !teams || teams.length === 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
      style={{ background: 'rgba(15,13,31,0.92)', backdropFilter: 'blur(20px)' }}
    >
      <motion.div
        initial={{ scale: 0.85, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.85, y: 40 }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
        className="w-full max-w-3xl space-y-6 my-auto"
      >
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 bg-[#7c3aed]/30 border border-[#7c3aed]/50 rounded-full px-4 py-1.5 text-[#a78bfa] text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            After Question {questionIndex + 1}
          </div>
          <h2 className="text-4xl font-black text-white tracking-tight">
            {isIndiv ? 'SOLO STANDINGS' : 'RANKINGS'}
          </h2>
        </div>

        <div className={`grid grid-cols-1 ${isIndiv ? 'max-w-xl mx-auto' : 'md:grid-cols-5'} gap-4`}>
          {/* Individual */}
          <div className={`${isIndiv ? 'w-full' : 'md:col-span-3'} space-y-2`}>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#a78bfa] flex items-center gap-1.5 mb-3">
              <Trophy className="w-3.5 h-3.5" /> {isIndiv ? 'Top Players' : 'Individual'}
            </h3>
            {individual.slice(0, 10).map((entry, i) => {
              const isMe = entry.id === myId;
              return (
                <motion.div
                  key={entry.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, type: 'spring', damping: 20 }}
                  className={`flex items-center justify-between p-3 rounded-xl border-2 transition-all ${
                    isMe
                      ? 'bg-[#7c3aed]/30 border-[#7c3aed]/60'
                      : (entry.rankChange ?? 0) > 0
                      ? 'bg-green-500/10 border-green-500/30'
                      : (entry.rankChange ?? 0) < 0
                      ? 'bg-red-500/5 border-red-500/20'
                      : 'bg-white/5 border-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <RankMedal rank={entry.rank} />
                    <div>
                      <p className={`font-bold text-sm ${isMe ? 'text-[#a78bfa]' : 'text-white'}`}>
                        {entry.name} {isMe && <span className="text-[#7c3aed] text-xs">(You)</span>}
                      </p>
                      {entry.team && (
                        <p className="text-[10px] text-white/30 uppercase tracking-wider">{entry.team}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <RankBadge change={entry.rankChange ?? 0} />
                    <span className="font-black text-lg tabular-nums text-white">{entry.score}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Teams */}
          {!isIndiv && (
            <div className="md:col-span-2 space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#a78bfa] flex items-center gap-1.5 mb-3">
                <Users className="w-3.5 h-3.5" /> Teams
              </h3>
              {teams.map((t: any, i) => (
                <motion.div
                  key={t.name}
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 + 0.3 }}
                  className="p-3 rounded-xl border border-white/10 bg-white/5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-[#a78bfa] text-sm w-6">#{t.rank}</span>
                      <div>
                        <p className="font-bold text-sm uppercase tracking-wider text-white">{t.name}</p>
                        <p className="text-[10px] text-white/30">{t.members} member{t.members !== 1 ? 's' : ''}</p>
                      </div>
                    </div>
                    <span className="font-black text-lg text-[#a78bfa] tabular-nums">{t.score}</span>
                  </div>
                  {t.memberNames && t.memberNames.length > 0 && (
                    <div className="mt-1.5 pt-1.5 border-t border-white/10 flex flex-wrap gap-1 pl-6">
                      {t.memberNames.map((m: string, mIdx: number) => (
                        <span key={mIdx} className="bg-purple-500/20 text-[#a78bfa] text-[10px] px-1.5 py-0.5 rounded">
                          {m}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Gap Countdown ────────────────────────────────────────────────────────────

function GapCountdown({ duration }: { duration: number }) {
  const [count, setCount] = useState(duration);
  useEffect(() => {
    if (count <= 0) return;
    const t = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [count]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ background: 'rgba(15,13,31,0.85)', backdropFilter: 'blur(16px)' }}
    >
      <div className="text-center space-y-4">
        <Clock className="w-10 h-10 text-[#a78bfa] mx-auto" />
        <p className="text-sm font-bold uppercase tracking-widest text-white/60">Next question in</p>
        <motion.p
          key={count}
          initial={{ scale: 1.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-8xl font-black text-white tabular-nums"
        >
          {count}
        </motion.p>
      </div>
    </motion.div>
  );
}

// ─── Option key labels ────────────────────────────────────────────────────────

const OPTION_KEYS = ['A', 'B', 'C', 'D'];

// ─── Main Quiz Page ───────────────────────────────────────────────────────────

export default function QuizPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = use(params);
  const [user, setUser] = useState<any>(null);
  const [status, setStatus] = useState<'waiting' | 'active' | 'finished'>('waiting');
  const [phase, setPhase] = useState<Phase>('question');
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [totalTime, setTotalTime] = useState(30);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [leaderboards, setLeaderboards] = useState<{ individuals: LeaderboardEntry[]; teams: TeamEntry[] }>({ individuals: [], teams: [] });
  const [revealData, setRevealData] = useState<{ individual: LeaderboardEntry[]; teams: TeamEntry[] } | null>(null);
  const [gapDuration, setGapDuration] = useState(0);
  const [totalParticipants, setTotalParticipants] = useState(0);
  const [score, setScore] = useState(0);
  const [teamRank, setTeamRank] = useState(0);
  const [myRoom, setMyRoom] = useState('');
  const [isLobby, setIsLobby] = useState(false);
  const [lobbyPlayers, setLobbyPlayers] = useState<{ name: string; team: string }[]>([]);
  const [quizTitle, setQuizTitle] = useState('');
  const [countdownNum, setCountdownNum] = useState<number | null>(null);
  const selectedAnswerRef = useRef<string | null>(null);
  const prevLeaderboardRef = useRef<LeaderboardEntry[] | null>(null);
  const isFirstJoin = useRef(true);
  const router = useRouter();

  useEffect(() => {
    selectedAnswerRef.current = selectedAnswer;
  }, [selectedAnswer]);

  const myPersistentId = user ? `${user.name.toLowerCase()}:${user.team.trim().toLowerCase()}` : '';

  useEffect(() => {
    const storedUser = sessionStorage.getItem('quiz_user');
    if (!storedUser) { router.push('/'); return; }
    const parsedUser = JSON.parse(storedUser);
    if (parsedUser.code !== code) { router.push('/'); return; }
    setTimeout(() => setUser(parsedUser), 0);

    if (!socket.connected) socket.connect();

    const handleJoin = () => {
      socket.emit('join-session', parsedUser, (res: any) => {
        if (!res.success) {
          toast.error(res.message);
          router.push('/');
        } else if (res.lobby) {
          setIsLobby(true);
          setLobbyPlayers(res.players || []);
          setQuizTitle(res.quizTitle || `Quiz ${code}`);
        } else {
          setIsLobby(false);
          setStatus(res.sessionStatus);
          if (res.room) setMyRoom(res.room);
          if (res.reconnected) {
            if (res.wasDisconnected && !isFirstJoin.current) toast.success('Reconnected!');
            isFirstJoin.current = false;
            setScore(res.score || 0);
            setTeamRank(res.teamRank || 0);
            if (res.currentQuestion) { setCurrentQuestion(res.currentQuestion); setTimeLeft(res.timeLeft); }
          } else { isFirstJoin.current = false; }
        }
      });
    };

    socket.on('connect', handleJoin);
    if (socket.connected) handleJoin();

    socket.on('new-question', ({ question, timeLeft: tl }: any) => {
      setCurrentQuestion(question);
      setTimeLeft(tl);
      setTotalTime(tl);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setStatus('active');
      setPhase('question');
      setRevealData(null);
      setGapDuration(0);
    });

    socket.on('timer-tick', ({ timeLeft: tl }: any) => setTimeLeft(tl));

    socket.on('time-up', ({ answer }: any) => {
      if (selectedAnswerRef.current === null) toast.error('Time is up!');
      setIsCorrect(selectedAnswerRef.current === answer);
      setPhase('timeup');
    });

    socket.on('score-update', ({ score: s }: any) => setScore(s));

    socket.on('leaderboard-reveal', (data: any) => {
      const prev = prevLeaderboardRef.current;
      const enriched = data.individual.map((entry: any) => {
        const prevEntry = prev?.find((u) => u.id === entry.id);
        return { ...entry, prevRank: prevEntry?.rank ?? null, rankChange: prevEntry ? prevEntry.rank - entry.rank : 0 };
      });
      prevLeaderboardRef.current = enriched;
      setRevealData({ individual: enriched, teams: data.teams });
      setLeaderboards({ individuals: enriched, teams: data.teams });
      setPhase('reveal');
      const myTeam = data.teams.find((t: any) => t.name === parsedUser?.team?.trim().toLowerCase());
      if (myTeam) setTeamRank(myTeam.rank);
    });

    socket.on('gap-start', ({ duration }: any) => { setPhase('gap'); setGapDuration(duration); setRevealData(null); });

    socket.on('leaderboard-update', ({ leaderboard }: any) => {
      setLeaderboards(leaderboard);
      if (parsedUser) {
        const myTeam = leaderboard.teams.find((t: any) => t.name === parsedUser.team?.trim().toLowerCase());
        if (myTeam) setTeamRank(myTeam.rank);
      }
    });

    socket.on('quiz-finished', ({ leaderboard }: any) => {
      setStatus('finished');
      setLeaderboards(leaderboard);
      setPhase('question');
      setRevealData(null);
    });

    socket.on('user-joined', ({ totalParticipants: tp }: any) => setTotalParticipants(tp));
    socket.on('user-rejoined', ({ totalParticipants: tp }: any) => setTotalParticipants(tp));
    socket.on('user-left', ({ totalParticipants: tp }: any) => setTotalParticipants(tp));
    socket.on('lobby-update', ({ players }: any) => setLobbyPlayers(players));

    socket.on('session-starting', () => {
      toast.success('Quiz is starting!');
      setIsLobby(false);
      socket.emit('join-session', parsedUser, (res: any) => {
        if (res.success && !res.lobby) { setStatus(res.sessionStatus); if (res.room) setMyRoom(res.room); }
      });
    });

    socket.on('quiz-starting', ({ countdown }: any) => { setPhase('starting'); setCountdownNum(countdown); });

    return () => {
      socket.off('connect');
      socket.off('new-question');
      socket.off('timer-tick');
      socket.off('time-up');
      socket.off('score-update');
      socket.off('leaderboard-reveal');
      socket.off('leaderboard-update');
      socket.off('gap-start');
      socket.off('quiz-finished');
      socket.off('user-joined');
      socket.off('user-rejoined');
      socket.off('user-left');
      socket.off('lobby-update');
      socket.off('session-starting');
      socket.off('quiz-starting');
    };
  }, [code, router]);

  const submitAnswer = (answer: string) => {
    if (selectedAnswer || timeLeft <= 0) return;
    setSelectedAnswer(answer);
    socket.emit('submit-answer', { code, answer });
    toast.success('Answer submitted!');
  };

  // ─── Countdown ─────────────────────────────────────────────────────────────

  if (phase === 'starting' && countdownNum !== null) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50" style={{ background: 'rgba(15,13,31,0.9)', backdropFilter: 'blur(12px)' }}>
        <div className="text-center space-y-4">
          <motion.p
            key={`num-${countdownNum}`}
            initial={{ scale: 2.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-[10rem] font-black leading-none"
            style={{
              background: countdownNum === 3
                ? 'linear-gradient(135deg, #7c3aed, #a78bfa)'
                : countdownNum === 2
                ? 'linear-gradient(135deg, #f59e0b, #ef4444)'
                : 'linear-gradient(135deg, #10b981, #06b6d4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {countdownNum}
          </motion.p>
          <p className="text-xl font-black text-white/60 uppercase tracking-widest">Get Ready!</p>
        </div>
      </div>
    );
  }

  // ─── Lobby ─────────────────────────────────────────────────────────────────

  if (isLobby) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="qz-card w-full max-w-md p-8 space-y-8">
          <div className="text-center space-y-2">
            <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ repeat: Infinity, duration: 2 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-[#7c3aed]/10 rounded-2xl mb-4">
              <Clock className="text-[#7c3aed] w-8 h-8" />
            </motion.div>
            <h1 className="text-2xl font-black text-black">{quizTitle}</h1>
            <p className="text-gray-400 text-sm">Waiting for the host to start...</p>
          </div>
          <div className="space-y-3">
            <p className="text-xs font-black uppercase tracking-widest text-[#7c3aed] flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" />{lobbyPlayers.length} in lobby
            </p>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              <AnimatePresence>
                {lobbyPlayers.map((p) => (
                  <motion.div
                    key={`${p.name}:${p.team}`}
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
                    className={`flex items-center justify-between px-4 py-2.5 rounded-xl border text-sm ${
                      p.name.toLowerCase() === user?.name?.toLowerCase()
                        ? 'bg-[#7c3aed]/10 border-[#7c3aed]/40 text-[#7c3aed]'
                        : 'bg-gray-50 border-gray-100 text-black'
                    }`}
                  >
                    <span className="font-bold">{p.name}</span>
                    <span className="text-xs text-gray-400 uppercase tracking-widest">{p.team}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-400 mb-1">Quiz Code</p>
            <p className="text-3xl font-black tracking-widest font-mono text-[#7c3aed]">{code}</p>
          </div>
        </motion.div>
      </div>
    );
  }

  // ─── Waiting ───────────────────────────────────────────────────────────────

  if (status === 'waiting') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center space-y-8">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center"
        >
          <Users className="w-10 h-10 text-white" />
        </motion.div>
        <div className="space-y-2">
          <h1 className="text-4xl font-black tracking-tight text-white">WAITING FOR HOST</h1>
          <p className="text-white/60">The quiz will start shortly. Get ready!</p>
        </div>
        <div className="qz-card p-6 w-full max-w-sm space-y-4">
          {user?.team ? (
            <div className="flex justify-between text-sm">
              <span className="text-[#7c3aed] uppercase tracking-widest font-black text-xs">Your Team</span>
              <span className="font-bold text-black">{user?.team}</span>
            </div>
          ) : (
            <div className="flex justify-between text-sm">
              <span className="text-[#7c3aed] uppercase tracking-widest font-black text-xs">Competition</span>
              <span className="font-bold text-black">Individual Solo</span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-[#7c3aed] uppercase tracking-widest font-black text-xs">Player Name</span>
            <span className="font-bold text-black">{user?.name}</span>
          </div>
          {myRoom && (
            <div className="flex justify-between text-sm">
              <span className="text-[#7c3aed] uppercase tracking-widest font-black text-xs">Room</span>
              <span className="font-bold text-black">{myRoom}</span>
            </div>
          )}
          <div className="h-px bg-gray-100" />
          <div className="flex justify-between text-sm">
            <span className="text-[#7c3aed] uppercase tracking-widest font-black text-xs">Participants</span>
            <span className="font-bold text-black">{totalParticipants}</span>
          </div>
        </div>
      </div>
    );
  }

  // ─── Finished ──────────────────────────────────────────────────────────────

  if (status === 'finished') {
    const isIndiv = !leaderboards.teams || leaderboards.teams.length === 0;

    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 space-y-8">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center space-y-2">
          <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h1 className="text-5xl font-black tracking-tight text-white">QUIZ OVER!</h1>
          <p className="text-white/60">Great job out there!</p>
        </motion.div>

        <div className="w-full max-w-4xl space-y-6">
          <div className={`grid grid-cols-1 ${isIndiv ? 'md:grid-cols-1 max-w-xl mx-auto' : 'md:grid-cols-2'} gap-6`}>
            <div className="qz-card p-6">
              <h3 className="text-lg font-black mb-4 flex items-center gap-2 text-[#7c3aed]">
                <Trophy className="w-5 h-5" /> {isIndiv ? 'Final Leaderboard' : 'Individual Rankings'}
              </h3>
              <div className="space-y-2">
                {leaderboards.individuals.slice(0, 10).map((player) => (
                  <div key={player.id || player.name}
                    className={`flex items-center justify-between p-3 rounded-xl border ${
                      player.id === myPersistentId ? 'bg-[#7c3aed]/10 border-[#7c3aed]/40' : 'bg-gray-50 border-gray-100'
                    }`}>
                    <div className="flex items-center gap-3">
                      <RankMedal rank={player.rank} />
                      <div>
                        <span className="font-bold text-black">{player.name}</span>
                        {player.team && (
                          <p className="text-[10px] text-gray-400 uppercase font-semibold">[{player.team}]</p>
                        )}
                      </div>
                    </div>
                    <span className="font-black text-black">{player.score}</span>
                  </div>
                ))}
              </div>
            </div>

            {!isIndiv && (
              <div className="qz-card p-6">
                <h3 className="text-lg font-black mb-4 flex items-center gap-2 text-[#7c3aed]">
                  <Users className="w-5 h-5" /> Team Rankings
                </h3>
                <div className="space-y-2">
                  {leaderboards.teams.map((team: any) => (
                    <div key={team.name}
                      className={`p-3 rounded-xl border ${
                        team.name === user?.team?.trim().toLowerCase() ? 'bg-[#7c3aed]/10 border-[#7c3aed]/40' : 'bg-gray-50 border-gray-100'
                      }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-[#7c3aed]">#{team.rank}</span>
                          <div>
                            <span className="font-bold uppercase tracking-wider text-black">{team.name}</span>
                            <p className="text-xs text-gray-400">{team.members} member{team.members !== 1 ? 's' : ''}</p>
                          </div>
                        </div>
                        <span className="font-black text-[#7c3aed]">{team.score}</span>
                      </div>
                      {team.memberNames && team.memberNames.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-gray-100 flex flex-wrap gap-1 pl-7">
                          <span className="text-[10px] text-gray-400 font-bold uppercase">Members:</span>
                          {team.memberNames.map((m: string, mIdx: number) => (
                            <span key={mIdx} className="bg-purple-100 text-purple-800 text-[10px] font-bold px-1.5 py-0.2 rounded">
                              {m}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <button onClick={() => router.push('/')} className="w-full btn-qz mt-4 text-lg">
            PLAY AGAIN
          </button>
        </div>
      </div>
    );
  }

  // ─── Active Quiz ───────────────────────────────────────────────────────────

  const progressPct = totalTime > 0 ? (timeLeft / totalTime) * 100 : 0;
  const isWarning = timeLeft <= 10 && timeLeft > 5;
  const isCritical = timeLeft <= 5;

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Overlays */}
      <AnimatePresence>
        {phase === 'reveal' && revealData && (
          <LeaderboardReveal
            individual={revealData.individual}
            teams={revealData.teams}
            myId={myPersistentId}
            questionIndex={currentQuestion?.index ?? 0}
          />
        )}
        {phase === 'gap' && gapDuration > 0 && <GapCountdown duration={gapDuration} />}
      </AnimatePresence>

      {/* Top header bar */}
      <header className="sticky top-0 z-30 w-full bg-white/10 backdrop-blur-md border-b border-white/15">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="font-black text-white text-sm hidden sm:block">APTIQUIZ</span>
          </div>

          {/* Center: question count + timer */}
          <div className="flex flex-col items-center gap-0.5">
            <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest leading-none">
              Question {(currentQuestion?.index ?? 0) + 1} of {currentQuestion?.total ?? '?'}
            </p>
            <div className="flex items-center gap-1.5">
              <Timer className={`w-4 h-4 ${isCritical ? 'text-red-300 animate-pulse' : 'text-white'}`} />
              <span className={`text-2xl font-black font-mono leading-none ${isCritical ? 'text-red-300' : 'text-white'}`}>
                {timeLeft}s
              </span>
            </div>
          </div>

          {/* Right: score + team rank */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="text-right">
              <p className="text-[10px] font-black text-white/60 uppercase tracking-widest leading-none">Score</p>
              <p className="text-lg font-black text-white leading-none">{score}</p>
            </div>
            {teamRank > 0 && (
              <div className="text-right hidden sm:block">
                <p className="text-[10px] font-black text-white/60 uppercase tracking-widest leading-none">Team</p>
                <p className="text-lg font-black text-white leading-none">#{teamRank}</p>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Timer bar */}
      <div className="w-full bg-black/20 h-2.5">
        <div
          className={`qz-timer-fill ${isCritical ? 'critical' : isWarning ? 'warning' : ''}`}
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* Main quiz content */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-5xl">
          {/* QUIZ TIME hero + question number */}
          <div className="text-center mb-6">
            <h1 className="text-5xl sm:text-7xl font-black text-white tracking-tight select-none"
              style={{ textShadow: '0 2px 16px rgba(0,0,0,0.2)' }}>
              QUIZ TIME
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
            {/* Left: White question card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion?.id ?? 'q'}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="qz-card p-8 flex flex-col gap-4 min-h-[240px] justify-between"
              >
                <div>
                  <p className="text-[#7c3aed] font-black text-xs uppercase tracking-widest text-center mb-4">Question</p>
                  <p className="font-black text-xl sm:text-2xl text-black text-center leading-snug">
                    {currentQuestion?.question ?? '—'}
                  </p>
                </div>

                {selectedAnswer && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-center justify-center gap-2 mt-2 py-2 rounded-xl text-sm font-black ${
                      isCorrect === null ? 'bg-[#7c3aed]/10 text-[#7c3aed]' :
                      isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {isCorrect === null ? (
                      <>✅ Answer submitted! Waiting...</>
                    ) : isCorrect ? (
                      <><CheckCircle2 className="w-4 h-4" /> Correct!</>
                    ) : (
                      <><XCircle className="w-4 h-4" /> Wrong answer</>
                    )}
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Right: Answer options */}
            <div className="flex flex-col gap-3">
              {(currentQuestion?.options ?? []).map((option: string, i: number) => {
                const key = OPTION_KEYS[i] ?? String.fromCharCode(65 + i);
                const isSelected = selectedAnswer === option;
                const showResult = isCorrect !== null && isSelected;

                let stateClass = '';
                if (showResult) stateClass = isCorrect ? 'qz-correct' : 'qz-wrong';
                else if (isSelected) stateClass = 'qz-selected';

                return (
                  <motion.button
                    key={i}
                    whileHover={!selectedAnswer ? { y: -2 } : {}}
                    whileTap={!selectedAnswer ? { y: 1 } : {}}
                    onClick={() => submitAnswer(option)}
                    disabled={!!selectedAnswer || timeLeft <= 0}
                    className={`qz-option ${stateClass} ${selectedAnswer && !isSelected ? 'opacity-40' : ''}`}
                  >
                    <span className="qz-key">{key}</span>
                    <span className="font-bold text-base sm:text-lg flex-1 text-left">{option}</span>
                    {showResult && (
                      isCorrect
                        ? <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                        : <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                    )}
                  </motion.button>
                );
              })}

              {/* Participants + room info */}
              <div className="flex items-center justify-between mt-2 text-white/70 text-xs font-semibold">
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  <span>{totalParticipants} players</span>
                </div>
                {myRoom && <span className="text-white/50">Room: {myRoom}</span>}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom footer: player info */}
      <footer className="w-full bg-black/20 border-t border-white/10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center font-black text-white text-base">
              {user?.name?.[0] ?? '?'}
            </div>
            <div>
              <p className="font-black text-white text-sm leading-none">{user?.name}</p>
              <p className="text-xs text-white/50">{user?.team}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-white/50 font-bold uppercase tracking-widest">Score</p>
            <p className="text-xl font-black text-white">{score}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
