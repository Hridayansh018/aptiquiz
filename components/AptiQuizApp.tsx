'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Header, ActiveTab } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LobbyView } from '@/components/LobbyView';
import { ArenaView } from '@/components/ArenaView';
import { ProjectorView } from '@/components/ProjectorView';
import { LeaderboardView } from '@/components/LeaderboardView';
import { HostConsoleView } from '@/components/HostConsoleView';
import { HomeView } from '@/components/HomeView';
import {
  QRModal,
  FullStandingsModal,
  QuestionAnalyticsModal,
  UserProfileModal,
  RoomCodeModal,
  AdminQuestionModal,
} from '@/components/Modals';
import {
  QuizQuestion,
  Player,
  RoundPerformance,
  HostedQuizRoom,
  Achievement,
} from '@/lib/quiz-data';
import {
  getQuestions,
  getRooms,
  getRoomPlayers,
  getAchievements,
  joinRoomPlayer,
  updatePlayerScore,
  savePerformanceHistory,
  subscribeToRoomPlayers,
  subscribeToRoomState,
} from '@/lib/db';
import { isSupabaseConfigured } from '@/lib/supabase';
import { AptiQuizClusterClient } from '@/lib/websocket-client';
import { getRandomQuestionSlice, getQuestionsBySet } from '@/lib/question-bank';
import { sound } from '@/lib/audio';
import confetti from 'canvas-confetti';
import { Radio } from 'lucide-react';

const ROOM_TO_SET: Record<string, string> = {
  QUANT101: '01_quantitative_aptitude',
  LOGIC202: '02_logical_reasoning',
  VERBAL303: '03_verbal_ability',
  DATA404: '04_data_interpretation',
  SPEED505: '05_time_work_speed',
  PROB606: '06_probability_counting',
  ALGEBRA707: '07_algebra_geometry',
  SERIES808: '08_number_systems_series',
  CAMPUS909: '09_mixed_placement',
  ADVMIX010: '10_advanced_mixed',
  LIVE01: '01_quantitative_aptitude',
  ARENA2026: '09_mixed_placement',
  GATE2026: '02_logical_reasoning',
  CAT2026: '03_verbal_ability',
};

interface AptiQuizAppProps {
  initialTab?: ActiveTab;
  initialRoomCode?: string;
}

export function AptiQuizApp({ initialTab, initialRoomCode }: AptiQuizAppProps) {
  // Initialize tab from prop, pathname, or query string
  const [activeTab, setActiveTabState] = useState<ActiveTab>(() => {
    if (initialTab) return initialTab;
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path === '/arena' || path === '/quiz-arena' || path.startsWith('/quiz')) return 'quiz-arena';
      if (path === '/lobby' || path.startsWith('/room')) return 'lobby';
      if (path === '/leaderboard') return 'leaderboard';
      if (path === '/projector') return 'projector';
      if (path === '/host' || path === '/host-console') return 'host-console';

      const searchParams = new URLSearchParams(window.location.search);
      const urlTab = searchParams.get('tab') as ActiveTab | null;
      if (urlTab && ['home', 'quiz-arena', 'lobby', 'leaderboard', 'host-console', 'projector'].includes(urlTab)) {
        return urlTab;
      }
      if (searchParams.get('room')) {
        return 'lobby';
      }
    }
    return 'home';
  });

  // Initialize roomCode from prop, query string, or default QUANT101
  const [roomCode, setRoomCodeState] = useState<string>(() => {
    if (initialRoomCode) return initialRoomCode.toUpperCase();
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const urlRoom = searchParams.get('room');
      if (urlRoom) return urlRoom.toUpperCase();
    }
    return 'QUANT101';
  });

  // State for QR modal target
  const [qrTargetRoom, setQrTargetRoom] = useState<{ code: string; title: string }>({
    code: 'QUANT101',
    title: 'Collegiate Quantitative Speed Qualifier',
  });

  // Synchronize browser history / URL with active tab and room code
  const navigateToTab = useCallback((tab: ActiveTab, newRoomCode?: string) => {
    const code = (newRoomCode || roomCode).toUpperCase();
    setActiveTabState(tab);
    if (newRoomCode) setRoomCodeState(code);

    if (typeof window !== 'undefined') {
      let targetPath = '/';
      if (tab === 'quiz-arena') targetPath = '/arena';
      else if (tab === 'lobby') targetPath = '/lobby';
      else if (tab === 'leaderboard') targetPath = '/leaderboard';
      else if (tab === 'projector') targetPath = '/projector';
      else if (tab === 'host-console') targetPath = '/host';

      const search = code ? `?room=${code}` : '';
      const fullUrl = `${targetPath}${search}`;
      if (window.location.pathname + window.location.search !== fullUrl) {
        window.history.pushState({ tab, roomCode: code }, '', fullUrl);
      }
    }
  }, [roomCode]);

  // Handle browser back and forward button events
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const searchParams = new URLSearchParams(window.location.search);
      const urlRoom = searchParams.get('room');
      if (urlRoom) setRoomCodeState(urlRoom.toUpperCase());

      if (path === '/arena' || path === '/quiz-arena' || path.startsWith('/quiz')) {
        setActiveTabState('quiz-arena');
      } else if (path === '/lobby' || path.startsWith('/room')) {
        setActiveTabState('lobby');
      } else if (path === '/leaderboard') {
        setActiveTabState('leaderboard');
      } else if (path === '/projector') {
        setActiveTabState('projector');
      } else if (path === '/host' || path === '/host-console') {
        setActiveTabState('host-console');
      } else {
        const urlTab = searchParams.get('tab') as ActiveTab | null;
        if (urlTab) setActiveTabState(urlTab);
        else setActiveTabState('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // User session state
  const [userXP, setUserXP] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isRoomLocked, setIsRoomLocked] = useState(false);
  const [timerFrozen, setTimerFrozen] = useState(false);
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [playerId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem('aptiqiz_player_id');
      if (cached) return cached;
      const newId = `p_${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem('aptiqiz_player_id', newId);
      return newId;
    }
    return `p_${Math.random().toString(36).substring(2, 9)}`;
  });

  // User profile
  const [userName, setUserName] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('aptiqiz_player_name') || 'Contender';
    }
    return 'Contender';
  });
  const [collegeName, setCollegeName] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('aptiqiz_player_college') || '';
    }
    return '';
  });

  // Database-backed dynamic state
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [players, setPlayers] = useState<Player[]>([]);
  const [rooms, setRooms] = useState<HostedQuizRoom[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [userEarnedPoints, setUserEarnedPoints] = useState(0);
  const [userRank, setUserRank] = useState(0);
  const [userStreak, setUserStreak] = useState(0);
  const [performanceHistory, setPerformanceHistory] = useState<RoundPerformance[]>([]);
  const [clusterWorkerId, setClusterWorkerId] = useState<number | null>(null);
  const clusterClientRef = React.useRef<AptiQuizClusterClient | null>(null);

  // Modals
  const [qrOpen, setQrOpen] = useState(false);
  const [standingsOpen, setStandingsOpen] = useState(false);
  const [analyticsOpen, setAnalyticsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [roomCodeOpen, setRoomCodeOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  // Load questions for active room code (mapped to curated sets or database)
  const refreshQuestions = useCallback(async (resetIndex = false) => {
    try {
      // 1. Check if room is directly mapped to one of the 10 curated question sets
      const matchedSetId = ROOM_TO_SET[roomCode];
      if (matchedSetId) {
        const matchedQuestions = getQuestionsBySet(matchedSetId);
        if (matchedQuestions && matchedQuestions.length > 0) {
          setQuestions(matchedQuestions);
          if (resetIndex) setCurrentQuestionIndex(0);
          return;
        }
      }

      // 2. Query Supabase
      const data = await getQuestions(roomCode);
      if (data && data.length > 0) {
        setQuestions(data);
        if (resetIndex) setCurrentQuestionIndex(0);
        return;
      }

      // 3. Fallback to API route
      const res = await fetch(`/api/questions?room=${encodeURIComponent(roomCode)}`);
      const json = await res.json();
      if (json.questions && json.questions.length > 0) {
        setQuestions(json.questions);
      } else {
        setQuestions(getRandomQuestionSlice(15));
      }
      if (resetIndex) setCurrentQuestionIndex(0);
    } catch (err) {
      console.error('Failed to load questions from database, using curated set:', err);
      const fallbackSet = ROOM_TO_SET[roomCode] ? getQuestionsBySet(ROOM_TO_SET[roomCode]) : null;
      setQuestions(fallbackSet && fallbackSet.length > 0 ? fallbackSet : getRandomQuestionSlice(15));
      if (resetIndex) setCurrentQuestionIndex(0);
    }
  }, [roomCode]);

  // Load rooms from database or default 10
  const refreshRooms = useCallback(async () => {
    try {
      const data = await getRooms();
      setRooms(data);
    } catch (err) {
      console.error('Failed to load rooms:', err);
    }
  }, []);

  // Load achievements
  const refreshAchievements = useCallback(async () => {
    try {
      const data = await getAchievements(userXP);
      setAchievements(data);
    } catch (err) {
      console.error('Failed to load achievements:', err);
    }
  }, [userXP]);

  // Load players for the current room
  const refreshPlayers = useCallback(async () => {
    try {
      const data = await getRoomPlayers(roomCode);
      setPlayers(data);

      const myRecord = data.find((p) => p.id === playerId);
      if (myRecord) {
        setUserRank(myRecord.rank);
        setUserXP(myRecord.score);
      }
    } catch (err) {
      console.error('Failed to load room players:', err);
    }
  }, [roomCode, playerId]);

  // Initial load for room questions, rooms and players (only on room change)
  useEffect(() => {
    refreshQuestions(true);
    refreshRooms();
    refreshPlayers();
  }, [roomCode, refreshQuestions, refreshRooms, refreshPlayers]);

  // Load achievements whenever userXP changes (isolated, does NOT touch questions or question index)
  useEffect(() => {
    refreshAchievements();
  }, [refreshAchievements]);

  // Supabase Realtime subscriptions
  useEffect(() => {
    if (!isSupabaseConfigured() || !roomCode) return;

    const unsubPlayers = subscribeToRoomPlayers(roomCode, () => {
      refreshPlayers();
    });

    const unsubRoom = subscribeToRoomState(roomCode, (updatedRoom) => {
      if (updatedRoom) {
        if (updatedRoom.is_locked !== undefined) setIsRoomLocked(updatedRoom.is_locked);
        if (updatedRoom.timer_frozen !== undefined) setTimerFrozen(updatedRoom.timer_frozen);
        if (updatedRoom.broadcast_message !== undefined) setBroadcastMessage(updatedRoom.broadcast_message);
      }
    });

    return () => {
      unsubPlayers();
      unsubRoom();
    };
  }, [roomCode, refreshPlayers]);

  // Connect to the Distributed WebSocket Cluster
  useEffect(() => {
    const client = new AptiQuizClusterClient(
      roomCode,
      { id: playerId, name: userName, college: collegeName },
      {
        onConnected: (workerId) => {
          setClusterWorkerId(workerId);
        },
        onLeaderboard: (mergedLeaderboard) => {
          setPlayers(mergedLeaderboard);
          const myRecord = mergedLeaderboard.find((p) => p.id === playerId);
          if (myRecord) {
            setUserRank(myRecord.rank);
            setUserXP(myRecord.score);
          }
        },
        onRoomState: (state) => {
          if (state.isLocked !== undefined) setIsRoomLocked(state.isLocked);
          if (state.timerFrozen !== undefined) setTimerFrozen(state.timerFrozen);
          if (state.broadcastMessage !== undefined) setBroadcastMessage(state.broadcastMessage);
        },
      }
    );

    client.connect();
    clusterClientRef.current = client;

    return () => {
      client.disconnect();
    };
  }, [roomCode, playerId, userName, collegeName]);

  // Save profile to localStorage and Supabase
  const handleSaveProfile = async (name: string, college: string) => {
    setUserName(name);
    setCollegeName(college);
    if (typeof window !== 'undefined') {
      localStorage.setItem('aptiqiz_player_name', name);
      localStorage.setItem('aptiqiz_player_college', college);
    }
    if (roomCode) {
      await joinRoomPlayer(roomCode, {
        id: playerId,
        name,
        college,
        isCurrentUser: true,
      });
      refreshPlayers();
    }
  };

  // Sound toggle handler
  const handleToggleSound = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    sound.enabled = newState;
    if (newState) sound.playClick();
  };

  // Next question flow with dynamic performance tracking
  const handleNextQuestion = async (selectedKey: 'A' | 'B' | 'C' | 'D' | null, earnedPoints: number) => {
    const isCorrect = currentQuestion ? selectedKey === currentQuestion.correctKey : false;
    const newStreak = isCorrect ? userStreak + 1 : 0;
    setUserStreak(newStreak);
    setUserEarnedPoints(earnedPoints);

    const newXP = userXP + earnedPoints;
    setUserXP(newXP);

    if (newXP >= 3000 && userXP < 3000) {
      sound.playSuccess();
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ffd700', '#7359f8', '#c8bfff', '#00e599'],
        });
      } catch {}
    }

    if (currentQuestion) {
      clusterClientRef.current?.submitAnswer({
        questionId: currentQuestion.id,
        round: currentQuestion.id,
        selectedKey,
        latencySec: 4.2,
        pointsEarned: earnedPoints,
        isCorrect,
      });

      const newRecord: RoundPerformance = {
        round: currentQuestion.id,
        roundName: `R${currentQuestion.id}`,
        topic: currentQuestion.topic,
        scoreEarned: earnedPoints,
        cumulativeXP: newXP,
        latencySec: 4.2,
        rank: userRank || 1,
        accuracy: isCorrect ? 100 : 0,
      };

      setPerformanceHistory((prev) => [...prev.filter((p) => p.round !== currentQuestion.id), newRecord]);

      await savePerformanceHistory(newRecord, playerId, roomCode);
      await updatePlayerScore(playerId, roomCode, earnedPoints, isCorrect);
      refreshPlayers();
    }

    // Check if this was the final question of the quiz
    const totalCount = questions.length || 30;
    if (currentQuestionIndex + 1 >= totalCount) {
      sound.playSuccess();
      try {
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
      } catch {}
      navigateToTab('leaderboard');
    } else {
      // Advance to next question in the arena
      const nextIdx = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIdx);
      clusterClientRef.current?.sendHostAction('advance_round');
      navigateToTab('quiz-arena');
    }
  };

  // Skip wait or advance round
  const handleSkipWaitOrAdvance = () => {
    if (questions.length === 0) return;
    const nextIdx = (currentQuestionIndex + 1) % questions.length;
    setCurrentQuestionIndex(nextIdx);
    clusterClientRef.current?.sendHostAction('advance_round');
    navigateToTab('quiz-arena');
  };

  // Kick player
  const handleKickPlayer = (id: string) => {
    setPlayers((prev) => prev.filter((p) => p.id !== id));
  };

  // Join room from Home page or PIN input
  const handleJoinRoom = async (targetRoomCode: string, targetView?: 'lobby' | 'quiz-arena') => {
    const clean = targetRoomCode.trim().toUpperCase();
    navigateToTab(targetView || 'quiz-arena', clean);
    await joinRoomPlayer(clean, {
      id: playerId,
      name: userName,
      college: collegeName,
      isCurrentUser: true,
    });
    refreshPlayers();
  };

  // Add question from Admin portal
  const handleAddQuestion = async (newQuestion: QuizQuestion) => {
    try {
      const res = await fetch('/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newQuestion, roomCode }),
      });
      const data = await res.json();
      if (data.question) {
        setQuestions((prev) => [...prev, data.question]);
      } else {
        setQuestions((prev) => [...prev, newQuestion]);
      }
    } catch {
      setQuestions((prev) => [...prev, newQuestion]);
    }

    sound.playSuccess();
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#7359f8', '#c8bfff', '#00e599'],
      });
    } catch {}
  };

  const currentQuestion = questions[currentQuestionIndex] || questions[0];
  const roundNumber = currentQuestionIndex + 1;
  const totalRounds = questions.length || 30;

  return (
    <div className="bg-[#130e2f] text-[#e5deff] font-['Rubik',sans-serif] min-h-screen relative overflow-x-hidden selection:bg-[#c8bfff] selection:text-[#2d009d] flex flex-col justify-between">
      {/* Background Decor Layer */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-arcade-grid opacity-60"></div>
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#7359f8]/20 blur-3xl"></div>
        <div className="absolute top-1/2 -right-48 w-[32rem] h-[32rem] rounded-full bg-[#5c3fe0]/15 blur-3xl"></div>
      </div>

      {/* Global Top Navigation */}
      <Header
        activeTab={activeTab}
        onTabChange={(tab) => navigateToTab(tab)}
        roomCode={roomCode}
        userXP={userXP}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onOpenProfile={() => setProfileOpen(true)}
        onOpenRoomModal={() => setRoomCodeOpen(true)}
        clusterWorkerId={clusterWorkerId}
      />

      {/* Flash Broadcast Alert Banner if set by Host */}
      {broadcastMessage && (
        <div className="fixed top-20 left-0 right-0 z-40 bg-[#7359f8] text-white py-2 px-4 shadow-xl border-b border-white/20 flex items-center justify-center gap-3 animate-in slide-in-from-top duration-300">
          <Radio className="w-4 h-4 text-[#c8bfff] animate-pulse shrink-0" />
          <span className="text-xs sm:text-sm font-bold text-center">
            {broadcastMessage}
          </span>
          <button
            onClick={() => setBroadcastMessage('')}
            className="text-xs font-black uppercase text-white/80 hover:text-white underline ml-2 cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Container */}
      <main className="relative z-10 w-full pt-24 sm:pt-28 min-h-[calc(100vh-140px)] max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex-1">
        {/* Screen 0: Home Page (Default Destination) */}
        {activeTab === 'home' && (
          <HomeView
            userXP={userXP}
            userRank={userRank}
            userName={userName}
            collegeName={collegeName}
            currentRoomCode={roomCode}
            rooms={rooms}
            onJoinRoom={handleJoinRoom}
            onNavigateTab={(tab) => navigateToTab(tab)}
            onOpenProfile={() => setProfileOpen(true)}
            onOpenStandings={() => setStandingsOpen(true)}
            onOpenAdminModal={() => setAdminOpen(true)}
            onOpenQRForRoom={(code, title) => {
              setQrTargetRoom({ code, title: title || '' });
              setQrOpen(true);
            }}
            questionsCount={questions.length}
          />
        )}

        {/* Screen 1: Projector (Auditorium 4K Projector View) */}
        {activeTab === 'projector' && (
          <ProjectorView
            question={currentQuestion}
            roundNumber={roundNumber}
            totalRounds={totalRounds}
            playersCount={players.length}
            onRevealAnswer={() => navigateToTab('leaderboard')}
            timerFrozen={timerFrozen}
            onToggleFreezeTimer={() => setTimerFrozen(!timerFrozen)}
          />
        )}

        {/* Screen 2: AptiQuiz Lobby */}
        {activeTab === 'lobby' && (
          <LobbyView
            roomCode={roomCode}
            players={players}
            onStartQuiz={() => navigateToTab('quiz-arena')}
            onOpenQR={() => {
              setQrTargetRoom({ code: roomCode, title: `Room ${roomCode} Lobby` });
              setQrOpen(true);
            }}
            isRoomLocked={isRoomLocked}
            onToggleLockRoom={() => setIsRoomLocked(!isRoomLocked)}
          />
        )}

        {/* Screen 3: Quiz Arena (Player Interactive View) */}
        {activeTab === 'quiz-arena' && (
          <ArenaView
            key={`arena-round-${roundNumber}-${currentQuestion?.id || currentQuestionIndex}`}
            question={currentQuestion}
            roundNumber={roundNumber}
            totalRounds={totalRounds}
            onNextQuestion={handleNextQuestion}
            onRevealAnswer={() => navigateToTab('leaderboard')}
            timerFrozen={timerFrozen}
            onToggleFreezeTimer={() => setTimerFrozen(!timerFrozen)}
            streak={userStreak}
            onStreakChange={setUserStreak}
          />
        )}

        {/* Screen 4: Leaderboard / Round Reveal */}
        {activeTab === 'leaderboard' && (
          <LeaderboardView
            question={currentQuestion}
            roundNumber={roundNumber}
            totalRounds={totalRounds}
            players={players}
            userEarnedPoints={userEarnedPoints}
            userRank={userRank}
            performanceHistory={performanceHistory}
            onSkipWait={handleSkipWaitOrAdvance}
            onOpenAnalytics={() => setAnalyticsOpen(true)}
            onOpenFullStandings={() => setStandingsOpen(true)}
            roomCode={roomCode}
          />
        )}

        {/* Screen 5: Host Console View */}
        {activeTab === 'host-console' && (
          <HostConsoleView
            roomCode={roomCode}
            currentQuestion={currentQuestion}
            questions={questions}
            onSelectQuestion={(q) => {
              const idx = questions.findIndex((item) => item.id === q.id);
              if (idx !== -1) setCurrentQuestionIndex(idx);
            }}
            onNextQuestion={handleSkipWaitOrAdvance}
            onRevealAnswer={() => navigateToTab('leaderboard')}
            timerFrozen={timerFrozen}
            onToggleFreezeTimer={() => setTimerFrozen(!timerFrozen)}
            isRoomLocked={isRoomLocked}
            onToggleLockRoom={() => setIsRoomLocked(!isRoomLocked)}
            broadcastMessage={broadcastMessage}
            onSetBroadcastMessage={setBroadcastMessage}
            players={players}
            onKickPlayer={handleKickPlayer}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onOpenRules={() => setAnalyticsOpen(true)}
        onOpenHostGuide={() => navigateToTab('host-console')}
        onToggleAudioModal={handleToggleSound}
      />

      {/* Modals */}
      <QRModal
        isOpen={qrOpen}
        onClose={() => setQrOpen(false)}
        roomCode={qrTargetRoom.code || roomCode}
        roomTitle={qrTargetRoom.title}
      />

      <FullStandingsModal
        isOpen={standingsOpen}
        onClose={() => setStandingsOpen(false)}
        players={players}
        roomCode={roomCode}
      />

      <QuestionAnalyticsModal
        isOpen={analyticsOpen}
        onClose={() => setAnalyticsOpen(false)}
        question={currentQuestion || {
          id: 1,
          category: 'Quant',
          section: 'Section A',
          topic: 'General Aptitude',
          question: 'Awaiting question',
          options: [],
          correctKey: 'A',
          officialAnswerText: '',
          standardPaceSec: 45,
          maxPoints: 1000,
          scratchpadFormula: '',
          explanation: '',
        }}
      />

      <UserProfileModal
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
        userName={userName}
        collegeName={collegeName}
        onSaveProfile={handleSaveProfile}
        userXP={userXP}
        achievements={achievements}
      />

      <RoomCodeModal
        isOpen={roomCodeOpen}
        onClose={() => setRoomCodeOpen(false)}
        roomCode={roomCode}
        onSaveRoomCode={(newCode) => {
          setRoomCodeState(newCode);
          joinRoomPlayer(newCode, {
            id: playerId,
            name: userName,
            college: collegeName,
            isCurrentUser: true,
          });
        }}
      />

      <AdminQuestionModal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        onAddQuestion={handleAddQuestion}
        currentQuestionCount={questions.length}
      />
    </div>
  );
}
