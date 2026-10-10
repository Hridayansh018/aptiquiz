'use client';

import React, { useState } from 'react';
import {
  Zap,
  Trophy,
  Award,
  Users,
  Tv,
  Sliders,
  Play,
  ArrowRight,
  Search,
  Sparkles,
  Shield,
  Clock,
  CheckCircle,
  Database,
  PlusCircle,
  BookOpen,
  Filter,
  Flame,
  Radio,
  ChevronRight,
  Copy,
  Check,
  QrCode
} from 'lucide-react';
import {
  HostedQuizRoom,
  QuestionCategory,
  getCategoryMeta,
  QuizQuestion,
  Achievement
} from '@/lib/quiz-data';
import { sound } from '@/lib/audio';

interface HomeViewProps {
  userXP: number;
  userRank: number;
  userName: string;
  collegeName: string;
  currentRoomCode: string;
  rooms?: HostedQuizRoom[];
  onJoinRoom: (roomCode: string, targetView?: 'lobby' | 'quiz-arena') => void;
  onNavigateTab: (tab: 'quiz-arena' | 'lobby' | 'leaderboard' | 'host-console' | 'projector') => void;
  onOpenProfile: () => void;
  onOpenStandings: () => void;
  onOpenAdminModal: () => void;
  onOpenQRForRoom?: (roomCode: string, roomTitle?: string) => void;
  questionsCount: number;
}

export const HomeView: React.FC<HomeViewProps> = ({
  userXP,
  userRank,
  userName,
  collegeName,
  currentRoomCode,
  rooms = [],
  onJoinRoom,
  onNavigateTab,
  onOpenProfile,
  onOpenStandings,
  onOpenAdminModal,
  onOpenQRForRoom,
  questionsCount,
}) => {
  const [pinInput, setPinInput] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | QuestionCategory>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'live' | 'lobby'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Filtered rooms from database
  const filteredRooms = rooms.filter((room) => {
    const matchesCategory = categoryFilter === 'all' || room.category === categoryFilter;
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'live' && room.status === 'live') ||
      (statusFilter === 'lobby' && (room.status === 'lobby' || room.status === 'starting-soon'));
    const matchesQuery =
      room.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.hostName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.roomCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesStatus && matchesQuery;
  });

  const handleJoinPin = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = pinInput.trim().toUpperCase();
    if (!clean) return;
    sound.playClick();
    onJoinRoom(clean, 'quiz-arena');
  };

  const handleCopyCode = (code: string) => {
    sound.playClick();
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Milestone points calculations
  const nextMilestone = userXP < 3000 ? 3000 : userXP < 5000 ? 5000 : 10000;
  const xpPercent = Math.min(100, Math.round((userXP / nextMilestone) * 100));

  return (
    <div className="flex flex-col w-full pb-12 gap-8 sm:gap-10">
      
      {/* Hero Welcome & Player Performance Command Center */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#7359f8] via-[#5c3fe0] to-[#3a1da8] p-6 sm:p-10 lg:p-12 shadow-2xl text-white">
        {/* Decorative Grid & Glow */}
        <div className="absolute inset-0 bg-arena-grid-pattern opacity-20 pointer-events-none"></div>
        <div className="absolute -top-24 -right-20 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-20 w-96 h-96 rounded-full bg-[#c8bfff]/20 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Greeting, User Rating, Rank & Quick Action */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-xs font-black uppercase tracking-wider border border-white/15">
                <span className="w-2 h-2 rounded-full bg-[#00e599] animate-pulse"></span>
                Auditorium Season 2026
              </span>
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-[#e5deff]">
                Live Collegiate Network
              </span>
            </div>

            <div>
              <h1 className="font-['Rubik'] font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase leading-tight drop-shadow-sm">
                WELCOME, {userName.toUpperCase()}
              </h1>
              <p className="text-sm sm:text-base text-[#e5deff] font-medium mt-1">
                Representing <strong className="text-white underline decoration-white/40">{collegeName}</strong> in high-stakes synchronized aptitude arenas.
              </p>
            </div>

            {/* Quick Action Hub */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  sound.playClick();
                  onNavigateTab('quiz-arena');
                }}
                className="px-6 py-3 rounded-full bg-white text-[#2d009d] font-black text-sm uppercase tracking-wider flex items-center gap-2 shadow-lg hover:bg-[#e5deff] transition-all transform active:scale-95 cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-[#2d009d]" />
                Enter Active Arena
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  onNavigateTab('projector');
                }}
                className="px-5 py-3 rounded-full bg-black/40 hover:bg-black/60 text-white font-bold text-sm tracking-wide border border-white/20 flex items-center gap-2 transition-all cursor-pointer backdrop-blur-md"
              >
                <Tv className="w-4 h-4 text-[#c8bfff]" />
                Auditorium Projector
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  onNavigateTab('host-console');
                }}
                className="px-4 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/10 flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Sliders className="w-3.5 h-3.5 text-[#c8bfff]" />
                Host Console
              </button>
            </div>
          </div>

          {/* Right Column: Player Telemetry & Rating Breakdown Card */}
          <div className="lg:col-span-5 bg-[#0e082a]/85 backdrop-blur-xl rounded-2xl p-6 sm:p-7 border border-white/15 shadow-2xl flex flex-col justify-between gap-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#7359f8] flex items-center justify-center">
                  <Trophy className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-['Rubik'] font-black text-sm uppercase text-white tracking-wider">
                    COMPETITIVE STANDING
                  </h3>
                  <span className="text-[11px] text-[#c9c4d8]">Collegiate Aptitude League</span>
                </div>
              </div>
              <button
                onClick={() => {
                  sound.playClick();
                  onOpenProfile();
                }}
                className="text-xs font-bold text-[#c8bfff] hover:text-white underline cursor-pointer"
              >
                View Badges
              </button>
            </div>

            {/* Grid of Key Metrics */}
            <div className="grid grid-cols-2 gap-3">
              {/* Rank */}
              <div
                onClick={() => {
                  sound.playClick();
                  onOpenStandings();
                }}
                className="p-3.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 cursor-pointer"
              >
                <span className="text-[11px] font-bold text-[#c9c4d8] uppercase block">Current Rank</span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="font-['Rubik'] font-black text-2xl text-white">#{userRank}</span>
                  <span className="text-xs font-bold text-[#00e599]">Top 8%</span>
                </div>
                <span className="text-[10px] text-[#c9c4d8]/70">of 48 active players</span>
              </div>

              {/* Rating / ELO */}
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                <span className="text-[11px] font-bold text-[#c9c4d8] uppercase block">Aptitude Rating</span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="font-['Rubik'] font-black text-2xl text-[#ffd700]">1,840</span>
                  <span className="text-xs font-black text-amber-300">MMR</span>
                </div>
                <span className="text-[10px] text-[#c9c4d8]/70">Tier-1 Master Rank</span>
              </div>

              {/* Score */}
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                <span className="text-[11px] font-bold text-[#c9c4d8] uppercase block">Round Score</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="font-['Rubik'] font-black text-2xl text-white">5,420</span>
                  <span className="text-xs font-bold text-[#c8bfff]">PTS</span>
                </div>
                <span className="text-[10px] text-[#00e599] font-bold">▲ +840 in R7</span>
              </div>

              {/* Milestone XP */}
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                <span className="text-[11px] font-bold text-[#c9c4d8] uppercase block">Milestone XP</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="font-['Rubik'] font-black text-2xl text-[#c8bfff]">{userXP.toLocaleString()}</span>
                  <span className="text-xs font-bold text-white/60">XP</span>
                </div>
                <span className="text-[10px] text-[#c9c4d8]/70">Goal: 3,000 XP</span>
              </div>
            </div>

            {/* Next Milestone Progress Bar */}
            <div className="pt-2">
              <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                <span className="flex items-center gap-1.5 text-[#e5deff]">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  Next Milestone: <strong className="text-white">&apos;Aptitude Ace&apos;</strong>
                </span>
                <span className="text-white/80">{userXP} / {nextMilestone} XP ({xpPercent}%)</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden p-0.5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#ffd700] via-[#c8bfff] to-white shadow-[0_0_10px_rgba(255,215,0,0.5)] transition-all duration-700"
                  style={{ width: `${xpPercent}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Direct PIN Quick Join Bar */}
      <section className="bg-[#1c1738] rounded-2xl p-4 sm:p-6 border border-white/10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 w-full md:w-auto">
          <div className="w-12 h-12 rounded-2xl bg-[#7359f8] flex items-center justify-center shrink-0 shadow-md">
            <Radio className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div>
            <h2 className="font-['Rubik'] font-black text-base sm:text-lg text-white">
              HAVE A ROOM CODE OR PIN?
            </h2>
            <p className="text-xs text-[#c9c4d8]">
              Instantly jump into an ongoing auditorium lecture or collegiate scrimmage.
            </p>
          </div>
        </div>

        <form onSubmit={handleJoinPin} className="flex items-center gap-2 w-full md:w-auto">
          <input
            type="text"
            value={pinInput}
            onChange={(e) => setPinInput(e.target.value.toUpperCase())}
            placeholder="e.g. 7K9QX"
            maxLength={8}
            className="w-full sm:w-48 px-4 py-2.5 rounded-xl bg-[#0e082a] border border-white/15 text-white font-mono font-black text-center text-sm tracking-widest placeholder:text-white/30 focus:outline-none focus:border-[#7359f8] focus:ring-1 focus:ring-[#7359f8]"
          />
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-[#7359f8] hover:bg-[#5c3fe0] text-white font-black text-xs uppercase tracking-wider transition-colors shrink-0 cursor-pointer shadow-md"
          >
            Join Quiz
          </button>
        </form>
      </section>

      {/* Multiple Hosted Quizzes Browser */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-4 h-4 text-[#c8bfff]" />
              <span className="text-xs font-black text-[#c8bfff] uppercase tracking-wider">
                MULTIPLAYER CONSOLE
              </span>
            </div>
            <h2 className="font-['Rubik'] font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
              HOSTED QUIZ ARENAS
            </h2>
            <p className="text-xs sm:text-sm text-[#c9c4d8]">
              Browse and join live synchronous competitions hosted by professors, quiz masters, and societies.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search rooms, hosts, topics..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#1c1738] border border-white/10 text-white text-xs placeholder:text-white/40 focus:outline-none focus:border-[#7359f8]"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-1 border-b border-white/5">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-bold text-[#c9c4d8] mr-1 hidden sm:inline">Category:</span>
            {(['all', 'Quant', 'Logic', 'Verbal', 'Data Interpretation'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  sound.playClick();
                  setCategoryFilter(cat);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  categoryFilter === cat
                    ? 'bg-[#7359f8] text-white shadow-sm'
                    : 'bg-[#1c1738] text-[#c9c4d8] hover:text-white'
                }`}
              >
                {cat === 'all' ? 'All Subjects' : cat}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-[#c9c4d8] mr-1 hidden sm:inline">Status:</span>
            {(['all', 'live', 'lobby'] as const).map((st) => (
              <button
                key={st}
                onClick={() => {
                  sound.playClick();
                  setStatusFilter(st);
                }}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  statusFilter === st
                    ? 'bg-white/20 text-white'
                    : 'text-[#c9c4d8] hover:text-white'
                }`}
              >
                {st === 'all' ? 'All' : st === 'live' ? '⚡ Live Now' : '⏳ In Lobby'}
              </button>
            ))}
          </div>
        </div>

        {/* Quiz Cards Grid */}
        {filteredRooms.length === 0 ? (
          <div className="rounded-2xl p-10 bg-[#1a1438] border border-white/10 text-center flex flex-col items-center justify-center gap-3">
            <Radio className="w-10 h-10 text-[#c8bfff]/40 animate-pulse" />
            <h4 className="font-['Rubik'] font-bold text-white text-lg">No active quiz rooms found</h4>
            <p className="text-xs text-[#c9c4d8] max-w-md">
              Create a new synchronized quiz arena from Host Controls or enter a PIN to join directly.
            </p>
            <button
              onClick={() => {
                sound.playClick();
                onNavigateTab('host-console');
              }}
              className="mt-2 px-6 py-2.5 rounded-xl bg-[#7359f8] hover:bg-[#5c3fe0] text-white font-black text-xs uppercase tracking-wider transition-all shadow-lg active:scale-95 cursor-pointer"
            >
              Host a New Quiz Arena
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {filteredRooms.map((room) => {
              const catMeta = getCategoryMeta(room.category);
              const isCurrent = room.roomCode === currentRoomCode;
              const fillRatio = (room.playersJoined / room.maxPlayers) * 100;

              return (
                <div
                  key={room.roomCode}
                  className={`rounded-2xl p-5 sm:p-6 bg-[#1a1438] border transition-all duration-200 flex flex-col justify-between shadow-xl relative overflow-hidden ${
                    isCurrent
                      ? 'border-[#7359f8] ring-2 ring-[#7359f8]/40 shadow-[0_0_25px_rgba(115,89,248,0.25)]'
                      : 'border-white/10 hover:border-white/20 hover:bg-[#201944]'
                  }`}
                >
                  {isCurrent && (
                    <div className="absolute top-0 right-0 bg-[#7359f8] text-white text-[10px] font-black uppercase px-3 py-1 rounded-bl-xl tracking-wider shadow-sm">
                      Currently Connected
                    </div>
                  )}

                  <div>
                    {/* Card Header: Category & Status */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${catMeta.badgeBg} text-white text-[11px] font-black uppercase tracking-wider shadow-sm`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                        {room.category}
                      </span>

                      <div className="flex items-center gap-2">
                        {room.status === 'live' ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 text-[10px] font-black uppercase tracking-wider">
                            <span className="w-2 h-2 rounded-full bg-red-400 animate-ping"></span>
                            {room.roundInfo}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-black uppercase tracking-wider">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                            Ready to Start
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Room Title */}
                    <h3 className="font-['Rubik'] font-black text-lg sm:text-xl text-white leading-snug mb-1">
                      {room.title}
                    </h3>

                    <p className="text-xs text-[#c9c4d8] mb-3">
                      Hosted by <strong className="text-white">{room.hostName}</strong> • {room.questionCount} Questions
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap items-center gap-1.5 mb-4">
                      {room.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md bg-[#2a2254] text-[#c8bfff] text-[10px] font-bold border border-white/5"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer Section: Players count + Join Action */}
                  <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                    {/* Player fill bar */}
                    <div className="flex flex-col gap-1 w-full sm:w-44">
                      <div className="flex items-center justify-between text-xs text-[#c9c4d8]">
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3 text-[#c8bfff]" />
                          {room.playersJoined} / {room.maxPlayers}
                        </span>
                        <span className="text-[10px] font-bold text-white/70">{Math.round(fillRatio)}% Capacity</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-black/40 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#7359f8] to-[#c8bfff] rounded-full"
                          style={{ width: `${fillRatio}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Action buttons (Invite QR, Start, Lobby, Copy) */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {/* Invite QR Code Modal trigger */}
                      <button
                        onClick={() => {
                          sound.playClick();
                          if (onOpenQRForRoom) {
                            onOpenQRForRoom(room.roomCode, room.title);
                          }
                        }}
                        title="Invite Players via QR Code"
                        className="px-2.5 py-2 rounded-xl bg-[#7359f8]/10 hover:bg-[#7359f8]/20 text-[#c8bfff] hover:text-white transition-colors cursor-pointer border border-[#7359f8]/30 flex items-center gap-1.5 text-xs font-bold"
                      >
                        <QrCode className="w-4 h-4 text-[#7359f8]" />
                        <span>Invite QR</span>
                      </button>

                      {/* Copy PIN */}
                      <button
                        onClick={() => handleCopyCode(room.roomCode)}
                        title="Copy Room PIN"
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer border border-white/5"
                      >
                        {copiedCode === room.roomCode ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>

                      {/* Fast Start into Arena */}
                      <button
                        onClick={() => {
                          sound.playClick();
                          onJoinRoom(room.roomCode, 'quiz-arena');
                        }}
                        title="Start this Quiz immediately"
                        className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1 transition-all shadow-md active:scale-95 cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Start</span>
                      </button>

                      {/* Join Lobby */}
                      <button
                        onClick={() => {
                          sound.playClick();
                          onJoinRoom(room.roomCode, 'lobby');
                        }}
                        className="px-3.5 py-2 rounded-xl bg-[#7359f8] hover:bg-[#5c3fe0] text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
                      >
                        <Users className="w-3.5 h-3.5" />
                        <span>Lobby</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Administrator & Database Sync Hub Card */}
      <section className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#171138] via-[#20174a] to-[#171138] border border-[#7359f8]/40 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#7359f8]/30 border border-[#7359f8] flex items-center justify-center shrink-0">
              <Database className="w-6 h-6 text-[#c8bfff]" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-[#7359f8] text-white text-[10px] font-black uppercase tracking-wider">
                  ADMINISTRATOR PORTAL
                </span>
                <span className="text-xs text-[#c9c4d8]">Live Question Bank: {questionsCount} Loaded</span>
              </div>
              <h3 className="font-['Rubik'] font-black text-xl sm:text-2xl text-white">
                How to Add Questions into the Database &amp; Frontend
              </h3>
              <p className="text-xs sm:text-sm text-[#c9c4d8] max-w-2xl mt-1">
                Admins can dynamically inject new aptitude questions into the active runtime, configure PostgreSQL or Firebase Firestore database schemas, and load them via the unified REST API endpoint.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                sound.playClick();
                onOpenAdminModal();
              }}
              className="px-5 py-2.5 rounded-xl bg-[#7359f8] hover:bg-[#5c3fe0] text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              Add Question / View Guide
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onNavigateTab('host-console');
              }}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/10 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Sliders className="w-4 h-4 text-[#c8bfff]" />
              Open Host Controls
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
