'use client';

import React, { useState } from 'react';
import {
  Wifi,
  Copy,
  Check,
  QrCode,
  Users,
  Flame,
  Search,
  Shuffle,
  Lock,
  Unlock,
  PlayCircle,
  ArrowRight,
  ArrowDown,
  RefreshCw,
  HelpCircle,
  Timer,
  Calculator,
  ShieldCheck,
  Share2,
  ExternalLink
} from 'lucide-react';
import { Player } from '@/lib/quiz-data';
import { sound } from '@/lib/audio';

interface LobbyViewProps {
  roomCode: string;
  players: Player[];
  onStartQuiz: () => void;
  onOpenQR: () => void;
  isRoomLocked: boolean;
  onToggleLockRoom: () => void;
}

export const LobbyView: React.FC<LobbyViewProps> = ({
  roomCode,
  players,
  onStartQuiz,
  onOpenQR,
  isRoomLocked,
  onToggleLockRoom,
}) => {
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isStarting, setIsStarting] = useState(false);
  const [activePlayerList, setActivePlayerList] = useState<Player[]>(players);

  React.useEffect(() => {
    setActivePlayerList(players);
  }, [players]);

  const handleCopy = () => {
    sound.playClick();
    navigator.clipboard?.writeText(roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShuffle = () => {
    sound.playClick();
    const shuffled = [...activePlayerList].sort(() => Math.random() - 0.5);
    setActivePlayerList(shuffled);
  };

  const handleStart = () => {
    sound.playSuccess();
    setIsStarting(true);
    setTimeout(() => {
      onStartQuiz();
    }, 800);
  };

  const filteredPlayers = activePlayerList.filter((p) => {
    const q = searchQuery.toLowerCase().trim();
    return p.name.toLowerCase().includes(q) || p.college.toLowerCase().includes(q);
  });

  const joinedCount = players.length;
  const maxSlots = 50;
  const readyPercent = Math.round((joinedCount / maxSlots) * 100);

  return (
    <div className="flex flex-col w-full pb-12">
      {/* Top Arcade Atmosphere & Hero Section */}
      <section className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#7359f8] p-5 sm:p-8 lg:p-12 shadow-2xl">
        {/* Background Decorative Grids & Fluid Wave Silhouettes */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-arena-grid-pattern"></div>
        <div className="absolute -top-24 -left-20 w-96 h-96 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-28 -right-16 w-[36rem] h-[36rem] rounded-full bg-[#5c3fe0]/30 blur-3xl pointer-events-none"></div>

        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-15"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 1000 600"
        >
          <path
            d="M-100 250 C 150 120, 320 420, 620 220 C 850 70, 950 310, 1150 210 L1150 700 L-100 700 Z"
            fill="white"
          />
          <path
            d="M-50 480 C 200 320, 450 560, 750 400 C 950 280, 1050 480, 1200 420 L1200 700 L-50 700 Z"
            fill="white"
            opacity="0.4"
          />
        </svg>

        {/* Top Badge Bar */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="inline-flex items-center gap-2 bg-[#0e082a]/80 backdrop-blur-md px-4 py-1.5 rounded-full shadow-md border border-white/10">
            <span className="w-2.5 h-2.5 rounded-full bg-[#c8bfff] animate-ping"></span>
            <span className="text-xs font-black uppercase tracking-widest text-[#c8bfff]">
              LIVE SESSION
            </span>
            <span className="text-[#c9c4d8]/60 text-xs">•</span>
            <span className="text-xs text-white font-bold">Tier-1 Inter-College Arena</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-white/80 tracking-wider uppercase hidden sm:inline">
              Engine:
            </span>
            <div className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-black tracking-wider">
              v4.9.2 ULTRA
            </div>
          </div>
        </div>

        {/* Central Hero Title */}
        <div className="relative z-10 text-center my-4 lg:my-6">
          <h1 className="font-['Rubik'] font-black text-3xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight drop-shadow-md">
            APTIQUIZ LOBBY
          </h1>
          <p className="text-base sm:text-lg text-[#e5deff] mt-2 max-w-xl mx-auto font-medium opacity-95">
            Synchronized real-time multiplayer aptitude showdown. Prepare your speed calculators!
          </p>
        </div>

        {/* Main Dual Split Card */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mt-8">
          {/* Left Anchor: Massive White Central Information Card */}
          <div className="lg:col-span-7 bg-white text-[#0e082a] rounded-2xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between">
            <div>
              {/* Eyebrow Category */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black text-[#7359f8] uppercase tracking-widest">
                  ROOM IDENTIFIER
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-gray-600 font-bold">
                  <Wifi className="w-4 h-4 text-[#7359f8]" />
                  <span>{isRoomLocked ? 'Room Locked' : 'Lobby Active'}</span>
                </span>
              </div>

              {/* Room PIN Hero Headline */}
              <div className="bg-[#0e082a] text-[#fffbff] rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-inner my-2 border border-white/5">
                <div>
                  <div className="text-[11px] text-[#c8bfff] uppercase tracking-widest font-bold">
                    INVITE PIN
                  </div>
                  <div className="font-['Rubik'] font-black text-4xl sm:text-5xl text-white tracking-widest leading-none mt-1">
                    {roomCode}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={handleCopy}
                    className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-white font-bold text-sm shadow-md transition-all active:scale-95 ${
                      copied
                        ? 'bg-emerald-600 hover:bg-emerald-700'
                        : 'bg-[#7359f8] hover:bg-[#5c3fe0]'
                    }`}
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                  </button>

                  {/* Share Deep Link & QR Button */}
                  <button
                    onClick={() => {
                      sound.playClick();
                      onOpenQR();
                    }}
                    title="Share Deep Link on social apps or display QR Code"
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-[#201b3c] hover:bg-[#2e2654] text-white font-bold text-sm shadow-md transition-all active:scale-95 border border-white/10 group cursor-pointer"
                  >
                    <Share2 className="w-4 h-4 text-[#c8bfff] group-hover:scale-110 transition-transform" />
                    <span>Share &amp; QR</span>
                  </button>

                  <button
                    onClick={() => {
                      sound.playClick();
                      onOpenQR();
                    }}
                    title="Display QR Code"
                    className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    <QrCode className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Progress Meter Capsule */}
              <div className="mt-5 bg-gray-100 rounded-xl p-4 sm:p-5 border border-gray-200/70">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm sm:text-base font-extrabold text-[#0e082a] flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#7359f8]" />
                    <span>{joinedCount} / {maxSlots} Players Joined</span>
                  </span>
                  <span className="text-sm font-black text-[#7359f8]">
                    {readyPercent}% READY
                  </span>
                </div>

                {/* Meter Bar Track */}
                <div className="w-full h-3.5 bg-gray-200 rounded-full overflow-hidden p-0.5">
                  <div
                    className="h-full bg-[#7359f8] rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${readyPercent}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between mt-2 text-xs font-semibold text-gray-500">
                  <span>{maxSlots - joinedCount} Slots remaining</span>
                  <span>Host auto-locks at {maxSlots}</span>
                </div>
              </div>
            </div>

            {/* Parameters Pill List */}
            <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gray-100 text-[#0e082a] text-xs font-bold">
                <HelpCircle className="w-3.5 h-3.5 text-[#7359f8]" />
                20 QUESTIONS
              </div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gray-100 text-[#0e082a] text-xs font-bold">
                <Timer className="w-3.5 h-3.5 text-[#7359f8]" />
                SPEED SCORING ENABLED
              </div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gray-100 text-[#0e082a] text-xs font-bold">
                <Calculator className="w-3.5 h-3.5 text-[#7359f8]" />
                CALCULATOR ALLOWED
              </div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gray-100 text-[#0e082a] text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-[#7359f8]" />
                PROCTORING V3 ACTIVE
              </div>
            </div>
          </div>

          {/* Right Column: High-Contrast Seed Roster Pills */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            {/* Status Pill: Waiting Animation */}
            <div className="bg-[#0e082a] text-white rounded-2xl p-4 sm:p-5 shadow-2xl flex items-center justify-between border border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#7359f8] flex items-center justify-center shrink-0 shadow-md">
                  <RefreshCw className="w-5 h-5 text-white animate-spin" />
                </div>
                <div>
                  <div className="font-bold text-white text-base">Matchmaking Active</div>
                  <div className="text-xs text-[#c9c4d8]/80 font-medium">
                    Connecting colleges via Low-Latency WebSockets
                  </div>
                </div>
              </div>
              <span className="text-xs font-black text-[#c8bfff] bg-[#201b3c] px-3 py-1 rounded-full border border-white/5">
                14ms
              </span>
            </div>

            {/* Featured Roster Items (Dynamic from real room players) */}
            <div className="flex flex-col gap-2.5">
              {players.length === 0 ? (
                <div className="w-full bg-[#0e082a]/70 text-[#c9c4d8] rounded-2xl p-6 text-center border border-white/5 flex flex-col items-center justify-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#00e599] animate-ping"></div>
                  <span className="text-xs font-bold text-white">Awaiting Contenders to Join</span>
                  <span className="text-[11px] text-[#c9c4d8]/70">Enter PIN {roomCode} to check in live</span>
                </div>
              ) : (
                players.slice(0, 4).map((p, index) => {
                  const isBlack = index === 1;
                  return (
                    <div
                      key={p.id}
                      className={`w-full rounded-full p-2 pr-4 flex items-center justify-between shadow-lg hover:-translate-y-0.5 transition-transform cursor-pointer ${
                        isBlack
                          ? 'bg-[#0e082a] text-white ring-2 ring-[#c8bfff]/30'
                          : 'bg-white text-[#0e082a]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full font-extrabold text-sm flex items-center justify-center ${
                            isBlack ? 'bg-white text-[#0e082a]' : 'bg-[#7359f8] text-white'
                          }`}
                        >
                          {p.initials || p.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="flex flex-col text-left truncate">
                          <span
                            className={`font-bold text-sm leading-tight truncate ${
                              isBlack ? 'text-white' : 'text-[#0e082a]'
                            }`}
                          >
                            {p.name} {p.isCurrentUser && '(You)'}
                          </span>
                          <span
                            className={`text-[11px] font-bold truncate ${
                              isBlack ? 'text-[#c8bfff]' : 'text-[#7359f8]'
                            }`}
                          >
                            {p.college || 'Competitor'}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0 ml-2">
                        {p.streakCount && p.streakCount >= 3 ? (
                          <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#7359f8] text-white text-[11px] font-black">
                            <Flame className="w-3 h-3 fill-current" /> 🔥 {p.streakCount}
                          </span>
                        ) : (
                          <>
                            <span className="w-2.5 h-2.5 rounded-full bg-[#00e599]"></span>
                            <span className="text-[11px] font-extrabold uppercase text-gray-400">
                              {p.status || 'READY'}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Quick Summary Bar */}
            {players.length > 4 && (
              <div className="bg-[#0e082a]/85 backdrop-blur-md text-white rounded-full px-5 py-3 flex items-center justify-between border border-white/5">
                <span className="text-xs text-[#c9c4d8]">
                  +{players.length - 4} More Contenders below
                </span>
                <a
                  href="#full-roster"
                  className="text-xs font-black text-[#c8bfff] uppercase tracking-wider hover:underline flex items-center gap-1"
                >
                  Jump to Roster <ArrowDown className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Complete 48-Player Roster Section */}
      <section className="mt-8 w-full" id="full-roster">
        {/* Section Title & Filter Tabs */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#c8bfff]"></span>
              <h2 className="font-['Rubik'] font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                Connected Competitors
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#c9c4d8] mt-1">
              Real-time check-in stream of validated collegiate participants ({players.length} Connected)
            </p>
          </div>

          {/* Quick Search & Actions */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-72">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#c9c4d8]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or college..."
                className="w-full bg-[#201b3c] text-white placeholder:text-[#c9c4d8]/60 text-sm rounded-full pl-10 pr-4 py-2 border border-white/10 outline-none focus:border-[#7359f8] transition-colors"
              />
            </div>
            <button
              onClick={handleShuffle}
              title="Shuffle Competitor Order"
              className="w-10 h-10 rounded-full bg-[#201b3c] hover:bg-[#2a2547] text-white flex items-center justify-center transition-colors border border-white/5 active:scale-95"
            >
              <Shuffle className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Roster Grid Container */}
        {filteredPlayers.length === 0 ? (
          <div className="py-14 px-6 rounded-2xl bg-[#140e33] border border-white/10 text-center flex flex-col items-center justify-center gap-3">
            <Users className="w-12 h-12 text-[#c8bfff]/40" />
            <h4 className="font-['Rubik'] font-bold text-white text-lg">
              {searchQuery ? 'No matching contenders found' : 'No contenders in the lobby yet'}
            </h4>
            <p className="text-xs text-[#c9c4d8] max-w-sm">
              {searchQuery
                ? 'Try a different search query or clear the filter.'
                : `Share invite PIN ${roomCode} with players to join this live auditorium arena!`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filteredPlayers.map((player) => {
              const isHighlighted = player.isCurrentUser;
              return (
                <div
                  key={player.id}
                  className={`rounded-full p-1.5 pr-4 flex items-center justify-between shadow-sm transition-all hover:scale-[1.02] cursor-default ${
                    isHighlighted
                      ? 'bg-[#0e082a] text-white ring-2 ring-[#c8bfff]'
                      : 'bg-white text-[#0e082a]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <div
                      className={`w-9 h-9 rounded-full font-extrabold text-xs flex items-center justify-center shrink-0 ${
                        isHighlighted
                          ? 'bg-white text-[#0e082a]'
                          : 'bg-[#7359f8] text-white'
                      }`}
                    >
                      {player.initials || player.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="truncate">
                      <div className="text-xs sm:text-sm font-bold truncate">
                        {player.name} {player.isCurrentUser && '(You)'}
                      </div>
                      <div
                        className={`text-[11px] font-bold truncate ${
                          isHighlighted ? 'text-[#c8bfff]' : 'text-[#7359f8]'
                        }`}
                      >
                        {player.college}
                      </div>
                    </div>
                  </div>
                  <span
                    className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0 ml-2"
                    title="Active in room"
                  ></span>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Sticky Bottom Interactive Control Bar */}
      <aside className="sticky bottom-4 z-40 w-full mt-8 bg-[#0e082a]/95 backdrop-blur-xl rounded-full p-2.5 sm:p-3.5 border border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.6)] flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Left Status Display */}
        <div className="flex items-center gap-3 pl-2 sm:pl-3">
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></div>
          <div>
            <div className="text-sm font-bold text-white leading-none">
              Waiting for Host to begin...
            </div>
            <div className="text-xs text-[#c9c4d8] mt-1">
              Quiz starts instantly when timer triggers or Host executes start
            </div>
          </div>
        </div>

        {/* Center/Right Action CTAs */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => {
              sound.playClick();
              onToggleLockRoom();
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#2a2547] hover:bg-[#353053] text-white text-xs font-bold transition-all border border-white/5 active:scale-95"
          >
            {isRoomLocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            <span>{isRoomLocked ? 'Unlock Room' : 'Lock Room'}</span>
          </button>

          {/* Start Quiz Pill */}
          <button
            onClick={handleStart}
            disabled={isStarting}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 rounded-full bg-white hover:bg-[#e5deff] text-[#0e082a] font-['Rubik'] font-black text-sm sm:text-base tracking-tight shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all cursor-pointer"
          >
            <PlayCircle className="w-5 h-5 text-[#0e082a]" />
            <span>{isStarting ? 'Launching Arena...' : 'Start Quiz Now (Host)'}</span>
            <ArrowRight className="w-4 h-4 text-[#0e082a]" />
          </button>
        </div>
      </aside>
    </div>
  );
};
