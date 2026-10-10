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
} from '@/lib/quiz-data';
import {
  getQuestions,
  getRooms,
  getRoomPlayers,
  joinRoomPlayer,
  updatePlayerScore,
  savePerformanceHistory,
  subscribeToRoomPlayers,
  subscribeToRoomState,
} from '@/lib/db';
import { isSupabaseConfigured } from '@/lib/supabase';
import { AptiQuizClusterClient } from '@/lib/websocket-client';
import { sound } from '@/lib/audio';
import confetti from 'canvas-confetti';
import { Radio } from 'lucide-react';

export default function Home() {
  // Home page is the default destination, with deep link ?room=... and ?tab=... support
  const [activeTab, setActiveTab] = useState<ActiveTab>(() => {
    if (typeof window !== 'undefined') {
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

  const [roomCode, setRoomCode] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const urlRoom = searchParams.get('room');
      if (urlRoom) return urlRoom.toUpperCase();
    }
    return 'LIVE01';
  });

  // User session state (clean, no mock XP/scores)
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

  // Database-backed dynamic state (clean defaults, no mock players/history)
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [players, setPlayers] = useState<Player[]>([]);
  const [rooms, setRooms] = useState<HostedQuizRoom[]>([]);
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

  // Safe question lookup
  const currentQuestion = questions[currentQuestionIndex] || questions[0];
  const roundNumber = currentQuestion ? currentQuestion.id : 1;
  const totalRounds = questions.length > 0 ? questions.length : 15;

  // Load questions from Supabase / API
  const refreshQuestions = useCallback(async () => {
    try {
      const data = await getQuestions(roomCode);
      if (data && data.length > 0) {
        setQuestions(data);
      } else {
        // Fetch via API route
        const res = await fetch('/api/questions');
        const json = await res.json();
        if (json.questions) {
          setQuestions(json.questions);
        }
      }
    } catch (err) {
      console.error('Failed to load questions:', err);
    }
  }, [roomCode]);

  // Load rooms from Supabase
  const refreshRooms = useCallback(async () => {
    try {
      const data = await getRooms();
      setRooms(data);
    } catch (err) {
      console.error('Failed to load rooms:', err);
    }
  }, []);

  // Load players for the current room
  const refreshPlayers = useCallback(async () => {
    try {
      const data = await getRoomPlayers(roomCode);
      setPlayers(data);

      // Find current user rank
      const myRecord = data.find((p) => p.id === playerId);
      if (myRecord) {
        setUserRank(myRecord.rank);
        setUserXP(myRecord.score);
      }
    } catch (err) {
      console.error('Failed to load room players:', err);
    }
  }, [roomCode, playerId]);

  // Initial load
  useEffect(() => {
    refreshQuestions();
    refreshRooms();
    refreshPlayers();
  }, [refreshQuestions, refreshRooms, refreshPlayers]);

  // Supabase Realtime subscriptions (WebSockets)
  useEffect(() => {
    if (!isSupabaseConfigured() || !roomCode) return;

    // Listen to players entering/leaving/updating scores in this room
    const unsubPlayers = subscribeToRoomPlayers(roomCode, () => {
      refreshPlayers();
    });

    // Listen to host state changes (round advance, lock, broadcast)
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

  // Connect to the Distributed WebSocket Cluster (5 Sub-Servers with Load Balancing)
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
    // Also register or update player in active room
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

    // Persist to Supabase if configured
    if (currentQuestion) {
      // Forward answer to load-balanced WebSocket cluster for instant cross-server merging
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

    setActiveTab('leaderboard');
  };

  // Skip wait or advance round
  const handleSkipWaitOrAdvance = () => {
    if (questions.length === 0) return;
    const nextIdx = (currentQuestionIndex + 1) % questions.length;
    setCurrentQuestionIndex(nextIdx);
    clusterClientRef.current?.sendHostAction('advance_round');
    setActiveTab('quiz-arena');
  };

  // Kick player
  const handleKickPlayer = (id: string) => {
    setPlayers((prev) => prev.filter((p) => p.id !== id));
  };

  // Join room from Home page or PIN input
  const handleJoinRoom = async (targetRoomCode: string, targetView?: 'lobby' | 'quiz-arena') => {
    setRoomCode(targetRoomCode);
    setActiveTab(targetView || 'quiz-arena');
    // Register player in Supabase room
    await joinRoomPlayer(targetRoomCode, {
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
        onTabChange={setActiveTab}
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
            onNavigateTab={setActiveTab}
            onOpenProfile={() => setProfileOpen(true)}
            onOpenStandings={() => setStandingsOpen(true)}
            onOpenAdminModal={() => setAdminOpen(true)}
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
            onRevealAnswer={() => setActiveTab('leaderboard')}
            timerFrozen={timerFrozen}
            onToggleFreezeTimer={() => setTimerFrozen(!timerFrozen)}
          />
        )}

        {/* Screen 2: AptiQuiz Lobby */}
        {activeTab === 'lobby' && (
          <LobbyView
            roomCode={roomCode}
            players={players}
            onStartQuiz={() => setActiveTab('quiz-arena')}
            onOpenQR={() => setQrOpen(true)}
            isRoomLocked={isRoomLocked}
            onToggleLockRoom={() => setIsRoomLocked(!isRoomLocked)}
          />
        )}

        {/* Screen 3: Quiz Arena (Player Interactive View) */}
        {activeTab === 'quiz-arena' && (
          <ArenaView
            question={currentQuestion}
            roundNumber={roundNumber}
            totalRounds={totalRounds}
            onNextQuestion={handleNextQuestion}
            onRevealAnswer={() => setActiveTab('leaderboard')}
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
            onRevealAnswer={() => setActiveTab('leaderboard')}
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
        onOpenHostGuide={() => setActiveTab('host-console')}
        onToggleAudioModal={handleToggleSound}
      />

      {/* Modals */}
      <QRModal
        isOpen={qrOpen}
        onClose={() => setQrOpen(false)}
        roomCode={roomCode}
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
      />

      <RoomCodeModal
        isOpen={roomCodeOpen}
        onClose={() => setRoomCodeOpen(false)}
        roomCode={roomCode}
        onSaveRoomCode={(newCode) => {
          setRoomCode(newCode);
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
