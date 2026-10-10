'use client';

import React, { useState } from 'react';
import {
  Sliders,
  Play,
  Pause,
  ArrowRight,
  RotateCcw,
  Volume2,
  Lock,
  Unlock,
  Radio,
  Send,
  Shield,
  Calculator,
  Zap,
  CheckCircle,
  AlertTriangle,
  Users,
  Settings,
  Plus
} from 'lucide-react';
import { QuizQuestion, Player, getCategoryMeta } from '@/lib/quiz-data';
import { sound } from '@/lib/audio';

interface HostConsoleViewProps {
  roomCode: string;
  currentQuestion: QuizQuestion;
  questions: QuizQuestion[];
  onSelectQuestion: (question: QuizQuestion) => void;
  onNextQuestion: () => void;
  onRevealAnswer: () => void;
  timerFrozen: boolean;
  onToggleFreezeTimer: () => void;
  isRoomLocked: boolean;
  onToggleLockRoom: () => void;
  broadcastMessage: string;
  onSetBroadcastMessage: (msg: string) => void;
  players: Player[];
  onKickPlayer: (id: string) => void;
}

export const HostConsoleView: React.FC<HostConsoleViewProps> = ({
  roomCode,
  currentQuestion,
  questions,
  onSelectQuestion,
  onNextQuestion,
  onRevealAnswer,
  timerFrozen,
  onToggleFreezeTimer,
  isRoomLocked,
  onToggleLockRoom,
  broadcastMessage,
  onSetBroadcastMessage,
  players,
  onKickPlayer,
}) => {
  const [announcementInput, setAnnouncementInput] = useState('');
  const [calculatorAllowed, setCalculatorAllowed] = useState(true);
  const [proctoringActive, setProctoringActive] = useState(true);
  const [multiplier, setMultiplier] = useState<'1.0x' | '1.5x' | '2.0x'>('1.5x');
  const [activeTab, setActiveTab] = useState<'controls' | 'questions' | 'roster'>('controls');

  const handleSendAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcementInput.trim()) return;
    sound.playClick();
    onSetBroadcastMessage(announcementInput.trim());
    setAnnouncementInput('');
  };

  return (
    <div className="flex flex-col w-full pb-10">
      {/* Container */}
      <div className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl bg-[#7359f8] p-5 sm:p-8 shadow-2xl">
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-arena-grid-pattern"></div>
        <div className="absolute -top-24 -left-20 w-96 h-96 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>

        {/* Top Header */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#0e082a] flex items-center justify-center text-[#c8bfff] shadow-md border border-white/5">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-['Rubik'] font-black text-xl sm:text-2xl text-white uppercase tracking-tight">
                  AUDITORIUM HOST CONSOLE
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-[#0e082a] text-[#c8bfff] text-[10px] font-black uppercase">
                  MASTER CONTROLLER
                </span>
              </div>
              <p className="text-xs text-[#e5deff]">
                Synchronized live controls for Room <strong className="text-white">{roomCode}</strong>
              </p>
            </div>
          </div>

          {/* Sub Navigation */}
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#0e082a] border border-white/10">
            <button
              onClick={() => setActiveTab('controls')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeTab === 'controls' ? 'bg-[#7359f8] text-white shadow-sm' : 'text-[#c9c4d8] hover:text-white'
              }`}
            >
              Live Stage
            </button>
            <button
              onClick={() => setActiveTab('questions')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeTab === 'questions' ? 'bg-[#7359f8] text-white shadow-sm' : 'text-[#c9c4d8] hover:text-white'
              }`}
            >
              Question Bank ({questions.length})
            </button>
            <button
              onClick={() => setActiveTab('roster')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeTab === 'roster' ? 'bg-[#7359f8] text-white shadow-sm' : 'text-[#c9c4d8] hover:text-white'
              }`}
            >
              Manage Roster ({players.length})
            </button>
          </div>
        </div>

        {/* Tab 1: Live Stage Controls */}
        {activeTab === 'controls' && (
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left Column: Quick Stage Action Buttons */}
            <div className="lg:col-span-7 bg-white text-[#0e082a] rounded-2xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-black text-[#7359f8] uppercase tracking-wider">
                    CURRENT STAGE FOCUS
                  </span>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${getCategoryMeta(currentQuestion?.category || 'Quant').badgeBg} text-white uppercase`}>
                      {getCategoryMeta(currentQuestion?.category || 'Quant').label}
                    </span>
                    <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-gray-100 text-[#0e082a]">
                      {currentQuestion ? `Active: Q${currentQuestion.id} (${currentQuestion.topic})` : 'Standby (No Question Loaded)'}
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 mb-6">
                  <span className="text-xs text-gray-500 font-bold block mb-1">PROMPT PREVIEW:</span>
                  <p className="font-['Rubik'] font-bold text-base text-[#0e082a]">
                    {currentQuestion ? currentQuestion.question : 'No questions currently active in this room. Add or load questions from Supabase.'}
                  </p>
                  <div className="mt-2 text-xs font-extrabold text-[#7359f8]">
                    Official Answer: {currentQuestion?.officialAnswerText || 'Awaiting question'}
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  <button
                    onClick={() => {
                      sound.playClick();
                      onToggleFreezeTimer();
                    }}
                    className={`p-3.5 rounded-xl font-['Rubik'] font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer ${
                      timerFrozen
                        ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                        : 'bg-[#0e082a] text-white hover:bg-[#201b3c]'
                    }`}
                  >
                    {timerFrozen ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                    <span>{timerFrozen ? 'Resume Stage Timer' : 'Freeze Stage Timer'}</span>
                  </button>

                  <button
                    onClick={() => {
                      sound.playSuccess();
                      onRevealAnswer();
                    }}
                    className="p-3.5 rounded-xl bg-[#7359f8] text-white hover:bg-[#5c3fe0] font-['Rubik'] font-black text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Reveal Official Answer</span>
                  </button>

                  <button
                    onClick={() => {
                      sound.playClick();
                      onNextQuestion();
                    }}
                    className="p-3.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#0e082a] font-['Rubik'] font-bold text-sm flex items-center justify-center gap-2 transition-all border border-gray-300 active:scale-95 cursor-pointer"
                  >
                    <ArrowRight className="w-4 h-4" />
                    <span>Advance Next Round</span>
                  </button>

                  <button
                    onClick={() => {
                      sound.playClick();
                      onToggleLockRoom();
                    }}
                    className="p-3.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#0e082a] font-['Rubik'] font-bold text-sm flex items-center justify-center gap-2 transition-all border border-gray-300 active:scale-95 cursor-pointer"
                  >
                    {isRoomLocked ? <Unlock className="w-4 h-4 text-emerald-600" /> : <Lock className="w-4 h-4" />}
                    <span>{isRoomLocked ? 'Unlock Room Slots' : 'Lock Room Slots'}</span>
                  </button>
                </div>
              </div>

              {/* Proctoring & Scoring Settings */}
              <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs font-bold text-gray-600">
                <div className="flex items-center gap-2">
                  <span>Speed Multiplier:</span>
                  {(['1.0x', '1.5x', '2.0x'] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setMultiplier(m)}
                      className={`px-2.5 py-1 rounded-md transition-colors ${
                        multiplier === m
                          ? 'bg-[#7359f8] text-white'
                          : 'bg-gray-100 hover:bg-gray-200 text-[#0e082a]'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={calculatorAllowed}
                      onChange={(e) => setCalculatorAllowed(e.target.checked)}
                      className="rounded text-[#7359f8] focus:ring-[#7359f8]"
                    />
                    <span>Scratchpad ON</span>
                  </label>

                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={proctoringActive}
                      onChange={(e) => setProctoringActive(e.target.checked)}
                      className="rounded text-[#7359f8] focus:ring-[#7359f8]"
                    />
                    <span>Proctoring V3</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column: Live Auditorium Announcement Strip */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-4">
              <div className="bg-[#0e082a] text-white rounded-2xl p-5 sm:p-6 shadow-2xl border border-white/5 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Radio className="w-4 h-4 text-[#c8bfff] animate-pulse" />
                    <h3 className="font-['Rubik'] font-bold text-base text-white">
                      AUDITORIUM FLASH BROADCAST
                    </h3>
                  </div>
                  <p className="text-xs text-[#c9c4d8]/80 mb-4">
                    Send real-time alerts or hints to projector &amp; participants instantly.
                  </p>

                  {/* Active broadcast display */}
                  <div className="p-3 rounded-xl bg-[#1c1738] border border-white/10 mb-4">
                    <span className="text-[10px] text-[#c8bfff] font-black uppercase tracking-wider block mb-1">
                      CURRENT STAGE BANNER:
                    </span>
                    <div className="text-xs font-semibold text-white">
                      {broadcastMessage || '“Standard Pace: 45s • Points lock at 0s”'}
                    </div>
                  </div>

                  {/* Input form */}
                  <form onSubmit={handleSendAnnouncement} className="flex gap-2">
                    <input
                      type="text"
                      value={announcementInput}
                      onChange={(e) => setAnnouncementInput(e.target.value)}
                      placeholder="e.g. 10 seconds remaining! Submit now..."
                      className="flex-1 bg-[#201b3c] text-white placeholder:text-[#c9c4d8]/50 text-xs rounded-full px-4 py-2.5 border border-white/10 outline-none focus:border-[#7359f8]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 rounded-full bg-[#7359f8] hover:bg-[#5c3fe0] text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md active:scale-95"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Push</span>
                    </button>
                  </form>
                </div>

                {/* Quick Preset Buttons */}
                <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => onSetBroadcastMessage('⏱️ 10 seconds remaining! Lock in your choices!')}
                    className="px-2.5 py-1 rounded-full bg-[#201b3c] hover:bg-[#2a2547] text-[11px] text-[#c9c4d8] font-medium"
                  >
                    ⏱️ 10s Alert
                  </button>
                  <button
                    type="button"
                    onClick={() => onSetBroadcastMessage('🧮 Use the Speed Scratchpad for conversion to km/h')}
                    className="px-2.5 py-1 rounded-full bg-[#201b3c] hover:bg-[#2a2547] text-[11px] text-[#c9c4d8] font-medium"
                  >
                    🧮 Calculator Tip
                  </button>
                  <button
                    type="button"
                    onClick={() => onSetBroadcastMessage('🔥 High streak bonus active for Section 2!')}
                    className="px-2.5 py-1 rounded-full bg-[#201b3c] hover:bg-[#2a2547] text-[11px] text-[#c9c4d8] font-medium"
                  >
                    🔥 Streak Bonus
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Question Bank */}
        {activeTab === 'questions' && (
          <div className="relative z-10 bg-white text-[#0e082a] rounded-2xl p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="font-['Rubik'] font-black text-xl text-[#0e082a]">
                  Aptitude Question Repository
                </h2>
                <p className="text-xs text-gray-500">
                  Select any question to immediately project or test in the arena
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {questions.map((q) => {
                const isActive = q.id === currentQuestion.id;
                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      isActive
                        ? 'border-[#7359f8] bg-[#f5f2ff] ring-2 ring-[#7359f8]/30 shadow-md'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                    onClick={() => {
                      sound.playClick();
                      onSelectQuestion(q);
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${getCategoryMeta(q.category || 'Quant').badgeBg} text-white`}>
                          {getCategoryMeta(q.category || 'Quant').label}
                        </span>
                        <span className="text-xs font-black text-[#7359f8] uppercase">
                          Q{q.id} • {q.topic}
                        </span>
                      </div>
                      {isActive && (
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#7359f8] text-white">
                          LIVE ON STAGE
                        </span>
                      )}
                    </div>
                    <p className="font-bold text-sm text-[#0e082a] mb-3 line-clamp-2">
                      {q.question}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-600 font-semibold pt-2 border-t border-gray-100">
                      <span>Correct: {q.officialAnswerText}</span>
                      <span className="text-[#7359f8]">Formula available</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 3: Roster Management */}
        {activeTab === 'roster' && (
          <div className="relative z-10 bg-white text-[#0e082a] rounded-2xl p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-['Rubik'] font-black text-xl text-[#0e082a]">
                Connected Competitors ({players.length})
              </h2>
              <span className="text-xs font-bold text-gray-500">
                Auditorium devices authenticated
              </span>
            </div>

            <div className="max-h-96 overflow-y-auto space-y-2 pr-1">
              {players.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between p-2.5 px-4 rounded-full bg-gray-50 border border-gray-200 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-[#7359f8] text-white font-bold flex items-center justify-center text-[11px]">
                      {p.initials}
                    </span>
                    <div>
                      <span className="font-bold text-[#0e082a]">{p.name}</span>
                      <span className="text-gray-500 ml-2">({p.college})</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-bold text-[#7359f8]">{p.score} XP</span>
                    <button
                      onClick={() => onKickPlayer(p.id)}
                      className="px-2.5 py-1 rounded-full bg-red-50 text-red-600 hover:bg-red-100 font-bold text-[10px] transition-colors"
                    >
                      Kick
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
