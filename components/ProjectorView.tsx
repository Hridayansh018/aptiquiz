'use client';

import React, { useState, useEffect } from 'react';
import {
  Share2,
  Tv,
  Pause,
  Play,
  ArrowRight,
  UserCheck,
  CheckCircle2,
  Sparkles,
  Volume2,
  Timer as TimerIcon,
  Calculator,
  SkipForward
} from 'lucide-react';
import { QuizQuestion, getCategoryMeta } from '@/lib/quiz-data';
import { sound } from '@/lib/audio';

interface ProjectorViewProps {
  question?: QuizQuestion;
  roundNumber: number;
  totalRounds: number;
  onRevealAnswer: () => void;
  timerFrozen: boolean;
  onToggleFreezeTimer: () => void;
  playersCount?: number;
}

export const ProjectorView: React.FC<ProjectorViewProps> = ({
  question,
  roundNumber,
  totalRounds,
  onRevealAnswer,
  timerFrozen,
  onToggleFreezeTimer,
  playersCount = 0,
}) => {
  const pace = question?.standardPaceSec || 20;
  const [countdown, setCountdown] = useState(pace);
  const [autoSkipCountdown, setAutoSkipCountdown] = useState<number | null>(null);
  const totalAudience = playersCount;
  const [submittedCount, setSubmittedCount] = useState(0);

  const categoryMeta = getCategoryMeta(question?.category || 'Quant');

  // Reset timer whenever a new question is loaded on projector
  useEffect(() => {
    const qPace = question?.standardPaceSec || 20;
    setCountdown(qPace);
    setAutoSkipCountdown(null);
  }, [question?.id, question?.standardPaceSec]);

  // Realtime projector countdown
  useEffect(() => {
    if (timerFrozen) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          sound.playTick(true);
          setAutoSkipCountdown(3);
          return 0;
        }
        if (prev <= 5) {
          sound.playTick(true);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerFrozen, question?.id]);

  // Auto-skip grace period countdown (3s before auto-revealing round answer)
  useEffect(() => {
    if (autoSkipCountdown === null || timerFrozen) return;

    if (autoSkipCountdown <= 0) {
      sound.playSuccess();
      onRevealAnswer();
      return;
    }

    const timer = setTimeout(() => {
      sound.playTick(true);
      setAutoSkipCountdown((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);

    return () => clearTimeout(timer);
  }, [autoSkipCountdown, timerFrozen, onRevealAnswer]);

  if (!question) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-[#1a1438] rounded-3xl border border-white/10 text-center gap-4 my-8">
        <Tv className="w-12 h-12 text-[#c8bfff] animate-pulse" />
        <h2 className="font-['Rubik'] font-black text-2xl text-white">Projector Broadcast Standby</h2>
        <p className="text-sm text-[#c9c4d8] max-w-md">
          Awaiting next question from the Host Console. Add questions via the host console or database to broadcast on auditorium screens.
        </p>
      </div>
    );
  }

  const submissionPercent = totalAudience > 0 ? Math.round((submittedCount / totalAudience) * 100) : 0;

  return (
    <div className="flex flex-col w-full pb-8">
      {/* Huge Projector Arena Container */}
      <div className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl bg-[#7359f8] p-4 sm:p-6 lg:p-10 shadow-2xl">
        {/* Arena Grid Background */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-arena-grid-pattern"></div>
        <div className="absolute -bottom-24 -left-20 w-96 h-96 rounded-full bg-[#c8bfff]/20 blur-3xl pointer-events-none"></div>
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col gap-6 lg:gap-8">
          
          {/* Top Stage Banner Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-2">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0e082a] text-white font-extrabold text-xs sm:text-sm shadow-md border border-white/5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffb4ab] animate-ping"></span>
                LIVE BROADCAST
              </span>
              <span className="px-4 py-1.5 rounded-full bg-[#fffbff] text-[#2d009d] font-['Rubik'] font-black text-xs sm:text-sm tracking-wider shadow-md">
                ROUND {roundNumber < 10 ? `0${roundNumber}` : roundNumber} / {totalRounds}
              </span>
              {/* Category Tag Badge */}
              <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full ${categoryMeta.badgeBg} text-white font-['Rubik'] font-black text-xs sm:text-sm tracking-wider shadow-md border border-white/20`}>
                <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                {categoryMeta.label}
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#2a2547]/60 backdrop-blur-md text-white text-xs font-semibold border border-white/5">
                <Share2 className="w-3.5 h-3.5 text-[#c8bfff]" />
                STAGE LINK #402
              </span>
            </div>

            {/* Projector Big Timer Widget */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 bg-[#0e082a]/90 px-4 py-2.5 rounded-full border border-white/10 text-xs font-bold text-white shadow-xl">
                <SkipForward className="w-3.5 h-3.5 text-[#38bdf8]" />
                <span className="text-white/70">Auto-Skip:</span>
                <span className="font-mono text-cyan-300">{countdown}s</span>
              </div>

              <div className="flex items-center gap-4 bg-[#0e082a]/90 px-6 py-2.5 rounded-full shadow-2xl border border-white/10">
                <div className="flex flex-col items-end">
                  <span className="text-[11px] font-black tracking-widest text-[#c8bfff] uppercase leading-tight">
                    Time Remaining
                  </span>
                  <span className="text-xs text-[#c9c4d8]/80 font-medium">
                    {timerFrozen ? 'Timer paused by Host' : 'Points lock at 0s'}
                  </span>
                </div>
                <div
                  onClick={onToggleFreezeTimer}
                  title="Click to freeze or unfreeze timer"
                  className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#93000a] text-[#ffdad6] shadow-inner cursor-pointer hover:scale-105 transition-transform"
                >
                  <span className="font-['Rubik'] font-black text-2xl sm:text-3xl leading-none text-[#ffb4ab]">
                    {countdown < 10 ? `0${countdown}` : countdown}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Auto-Skip Active Stage Banner */}
          {autoSkipCountdown !== null && (
            <div className="w-full p-4 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 border border-white/30 shadow-2xl flex items-center justify-between gap-4 text-white animate-pulse">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-black/40 flex items-center justify-center font-['Rubik'] font-black text-xl text-yellow-300 border border-white/20">
                  {autoSkipCountdown}
                </div>
                <div>
                  <div className="font-['Rubik'] font-black text-base uppercase">
                    STAGE TIMER EXPIRED • AUTO-SKIPPING TO REVEAL
                  </div>
                  <div className="text-xs text-white/90">
                    Broadcasting answer and class response telemetry in {autoSkipCountdown} seconds...
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  sound.playSuccess();
                  onRevealAnswer();
                }}
                className="px-5 py-2.5 rounded-full bg-white text-black font-['Rubik'] font-black text-xs hover:bg-white/90 shadow-lg active:scale-95 transition-transform flex items-center gap-2 cursor-pointer"
              >
                <span>Reveal Now</span>
                <SkipForward className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Main Monumental Header */}
          <div className="text-center my-1 lg:my-2">
            <h1 className="font-['Rubik'] font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-wider uppercase drop-shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
              QUIZ TIME
            </h1>
            <p className="text-xs sm:text-sm font-extrabold text-[#e5deff] uppercase tracking-widest mt-1 opacity-90">
              Auditorium Arena • <span className="text-white underline decoration-wavy decoration-[#c8bfff]/60">{categoryMeta.name}</span> • {question.topic}
            </p>
          </div>

          {/* Split Stage Layout (Dual Column) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            
            {/* Left: Question Billboard */}
            <div className="lg:col-span-6 flex flex-col">
              <div className="h-full bg-white text-[#0e082a] rounded-2xl p-6 sm:p-10 lg:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.35)] flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-[#7359f8] via-[#c8bfff] to-[#5c3fe0]"></div>
                
                <div className="flex flex-col">
                  {/* Category and Section Badges */}
                  <div className="flex flex-wrap items-center gap-2 self-start mb-2">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${categoryMeta.badgeBg} text-white text-xs font-black tracking-wide uppercase shadow-sm`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                      <span>{categoryMeta.label}</span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e5deff] text-[#1a0064] text-xs font-black tracking-wide uppercase">
                      <Calculator className="w-3.5 h-3.5" />
                      {question.section}
                    </div>
                  </div>

                  <div className="mt-8 mb-6">
                    <p className="font-['Rubik'] font-black text-2xl sm:text-3xl lg:text-3xl text-[#0e082a] leading-tight sm:leading-snug">
                      {question.question}
                    </p>
                  </div>
                </div>

                {/* Question Metadata Footer */}
                <div className="pt-6 border-t border-gray-100 flex items-center justify-between bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-2">
                    <TimerIcon className="w-5 h-5 text-[#7359f8]" />
                    <span className="text-sm font-bold text-[#0e082a]">
                      Standard Pace: {question.standardPaceSec}s
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0e082a] text-[#c8bfff] font-black text-xs">
                    +{question.maxPoints / 2.5} PTS MAX
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Tactile Pill Choices & Real-time Live Heat Bar Distribution */}
            <div className="lg:col-span-6 flex flex-col justify-between gap-3.5 sm:gap-4">
              {/* Option A (Active Spotlight / 68% verified) */}
              <div className="relative w-full bg-[#0e082a] text-white rounded-full p-2.5 sm:p-3 shadow-lg flex items-center justify-between border border-white/5">
                <div className="flex items-center gap-4 min-w-0 pr-3">
                  <div className="w-12 h-12 shrink-0 rounded-full bg-white text-[#0e082a] font-['Rubik'] font-black text-lg flex items-center justify-center shadow-md">
                    A
                  </div>
                  <span className="font-['Rubik'] font-bold text-lg text-white tracking-tight truncate">
                    64 km/h
                  </span>
                </div>
                {/* Live responses metric */}
                <div className="flex items-center gap-3 pr-4 shrink-0">
                  <div className="hidden sm:flex flex-col items-end w-24">
                    <span className="text-xs font-black text-[#c8bfff] leading-none">68%</span>
                    <div className="w-full bg-[#2a2547] h-2 rounded-full overflow-hidden mt-1">
                      <div className="bg-[#c8bfff] h-full rounded-full transition-all duration-700" style={{ width: '68%' }}></div>
                    </div>
                  </div>
                  <CheckCircle2 className="w-6 h-6 text-[#c8bfff]" />
                </div>
              </div>

              {/* Option B */}
              <div className="relative w-full bg-white text-[#0e082a] rounded-full p-2.5 sm:p-3 shadow-lg flex items-center justify-between">
                <div className="flex items-center gap-4 min-w-0 pr-3">
                  <div className="w-12 h-12 shrink-0 rounded-full bg-[#7359f8] text-white font-['Rubik'] font-black text-lg flex items-center justify-center shadow-md">
                    B
                  </div>
                  <span className="font-['Rubik'] font-bold text-lg text-[#0e082a] tracking-tight truncate">
                    72 km/h
                  </span>
                </div>
                <div className="flex items-center gap-3 pr-4 shrink-0">
                  <div className="hidden sm:flex flex-col items-end w-24">
                    <span className="text-xs font-bold text-gray-500 leading-none">18%</span>
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mt-1">
                      <div className="bg-[#7359f8] h-full rounded-full transition-all duration-700" style={{ width: '18%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Option C */}
              <div className="relative w-full bg-white text-[#0e082a] rounded-full p-2.5 sm:p-3 shadow-lg flex items-center justify-between">
                <div className="flex items-center gap-4 min-w-0 pr-3">
                  <div className="w-12 h-12 shrink-0 rounded-full bg-[#7359f8] text-white font-['Rubik'] font-black text-lg flex items-center justify-center shadow-md">
                    C
                  </div>
                  <span className="font-['Rubik'] font-bold text-lg text-[#0e082a] tracking-tight truncate">
                    54 km/h
                  </span>
                </div>
                <div className="flex items-center gap-3 pr-4 shrink-0">
                  <div className="hidden sm:flex flex-col items-end w-24">
                    <span className="text-xs font-bold text-gray-500 leading-none">9%</span>
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mt-1">
                      <div className="bg-[#7359f8] h-full rounded-full transition-all duration-700" style={{ width: '9%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Option D */}
              <div className="relative w-full bg-white text-[#0e082a] rounded-full p-2.5 sm:p-3 shadow-lg flex items-center justify-between">
                <div className="flex items-center gap-4 min-w-0 pr-3">
                  <div className="w-12 h-12 shrink-0 rounded-full bg-[#7359f8] text-white font-['Rubik'] font-black text-lg flex items-center justify-center shadow-md">
                    D
                  </div>
                  <span className="font-['Rubik'] font-bold text-lg text-[#0e082a] tracking-tight truncate">
                    80 km/h
                  </span>
                </div>
                <div className="flex items-center gap-3 pr-4 shrink-0">
                  <div className="hidden sm:flex flex-col items-end w-24">
                    <span className="text-xs font-bold text-gray-500 leading-none">5%</span>
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mt-1">
                      <div className="bg-[#7359f8] h-full rounded-full transition-all duration-700" style={{ width: '5%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Auditorium Ticker & Submission Monitor */}
          <div className="mt-2 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Live Submission Counters */}
            <div className="md:col-span-7 bg-[#0e082a]/85 backdrop-blur-md rounded-full px-5 py-3 flex items-center justify-between gap-4 shadow-xl border border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#7359f8] flex items-center justify-center text-white">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-extrabold text-white leading-tight">
                    {submittedCount} of {totalAudience} Submitted
                  </span>
                  <span className="text-xs text-[#c9c4d8]/80">
                    {totalAudience - submittedCount} auditorium devices answering...
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-28 sm:w-36 hidden sm:block bg-[#201b3c] h-3 rounded-full overflow-hidden">
                  <div
                    className="bg-[#c8bfff] h-full rounded-full transition-all duration-700"
                    style={{ width: `${submissionPercent}%` }}
                  ></div>
                </div>
                <span className="text-sm font-black text-[#c8bfff]">{submissionPercent}%</span>
              </div>
            </div>

            {/* Leaderboard Spotlight Pill */}
            <div className="md:col-span-5 bg-white text-[#0e082a] rounded-full px-5 py-3 flex items-center justify-between shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#0e082a] text-white flex items-center justify-center font-black text-sm">
                  #1
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-['Rubik'] font-black text-sm sm:text-base leading-tight truncate">
                    Priya Sharma
                  </span>
                  <span className="text-xs font-semibold text-gray-500">
                    Streak • 6 Correct
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="font-['Rubik'] font-black text-base text-[#7359f8]">
                  6,420 XP
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Synchronized Audio / Host Live Controller Strip */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 px-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black text-[#c8bfff] uppercase tracking-wider">
            Display Mode:
          </span>
          <span className="px-3 py-1 rounded-full bg-[#201b3c] text-white text-xs font-bold border border-white/5">
            Auditorium Projector 4K
          </span>
          <span className="px-3 py-1 rounded-full bg-[#201b3c] text-[#c9c4d8] text-xs font-medium border border-white/5 flex items-center gap-1">
            <Volume2 className="w-3.5 h-3.5 text-[#c8bfff]" /> Audio FX: Active
          </span>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <button
            onClick={() => {
              sound.playClick();
              onToggleFreezeTimer();
            }}
            className="px-4 sm:px-5 py-2.5 rounded-full bg-[#201b3c] hover:bg-[#2a2547] text-white text-xs sm:text-sm font-bold transition-colors flex items-center gap-2 border border-white/5 active:scale-95 cursor-pointer"
          >
            {timerFrozen ? <Play className="w-4 h-4 text-[#c8bfff]" /> : <Pause className="w-4 h-4 text-[#ffb4ab]" />}
            <span>{timerFrozen ? 'Resume Timer' : 'Freeze Timer'}</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              sound.playSuccess();
              onRevealAnswer();
            }}
            title="Fast-forward and skip stage timer immediately"
            className="px-4 sm:px-5 py-2.5 rounded-full bg-[#201b3c] hover:bg-[#2a2547] text-[#cbd5e1] hover:text-white text-xs sm:text-sm font-bold transition-colors flex items-center gap-2 border border-white/5 active:scale-95 cursor-pointer"
          >
            <SkipForward className="w-4 h-4 text-[#ffb4ab]" />
            <span>Skip Question</span>
          </button>

          <button
            onClick={() => {
              sound.playSuccess();
              onRevealAnswer();
            }}
            className="px-5 sm:px-6 py-2.5 rounded-full bg-[#7359f8] text-white text-xs sm:text-sm font-black hover:bg-[#5c3fe0] shadow-lg transition-transform active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            <span>Reveal Answer</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
