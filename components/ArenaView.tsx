'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Timer,
  Zap,
  CheckCircle,
  HelpCircle,
  BarChart2,
  FastForward,
  ArrowRight,
  Calculator as CalcIcon,
  ChevronDown,
  ChevronUp,
  Award,
  Flame,
  Clock,
  Gauge,
  Sparkles,
  SkipForward
} from 'lucide-react';
import { QuizQuestion, getCategoryMeta } from '@/lib/quiz-data';
import { sound } from '@/lib/audio';

interface ArenaViewProps {
  question: QuizQuestion;
  roundNumber: number;
  totalRounds: number;
  onNextQuestion: (selectedKey: 'A' | 'B' | 'C' | 'D' | null, earnedPoints: number) => void;
  onRevealAnswer: () => void;
  timerFrozen: boolean;
  onToggleFreezeTimer: () => void;
  streak?: number;
  onStreakChange?: (newStreak: number) => void;
}

export const ArenaView: React.FC<ArenaViewProps> = ({
  question,
  roundNumber,
  totalRounds,
  onNextQuestion,
  onRevealAnswer,
  timerFrozen,
  onToggleFreezeTimer,
  streak,
  onStreakChange,
}) => {
  const [currentStreak, setCurrentStreak] = useState(streak ?? 0);
  const standardPace = question?.standardPaceSec || 20;
  const [initialSeconds, setInitialSeconds] = useState(standardPace);
  const [secondsRemaining, setSecondsRemaining] = useState(standardPace);
  const [selectedAnswer, setSelectedAnswer] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [calcOpen, setCalcOpen] = useState(false);
  const [calcDisplay, setCalcDisplay] = useState(question?.scratchpadFormula || '');
  const [eliminatedOptions, setEliminatedOptions] = useState<string[]>([]);
  const [pollVisible, setPollVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [autoSkipCountdown, setAutoSkipCountdown] = useState<number | null>(null);
  const [skipNoticeVisible, setSkipNoticeVisible] = useState(false);

  const categoryMeta = getCategoryMeta(question?.category || 'Quant');

  // Reset arena state when a new question loads
  useEffect(() => {
    const pace = question?.standardPaceSec || 20;
    setInitialSeconds(pace);
    setSecondsRemaining(pace);
    setSelectedAnswer(null);
    setEliminatedOptions([]);
    setPollVisible(false);
    setIsSubmitting(false);
    setAutoSkipCountdown(null);
    setSkipNoticeVisible(false);
    setCalcDisplay(question?.scratchpadFormula || '');
  }, [roundNumber, question?.id, question?.standardPaceSec, question?.scratchpadFormula]);

  // Main Question Timer countdown
  useEffect(() => {
    if (timerFrozen || isSubmitting) return;

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          sound.playTick(true);
          // Trigger the 3-second auto-skip sequence when timer runs out
          setAutoSkipCountdown(3);
          return 0;
        }
        if (prev <= 6) {
          sound.playTick(true);
        } else if (prev % 5 === 0) {
          sound.playTick(false);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerFrozen, isSubmitting, question?.id]);

  // Question Auto-Skip Grace Period Countdown (3s -> 0s -> Auto Advance)
  useEffect(() => {
    if (autoSkipCountdown === null || timerFrozen || isSubmitting) return;

    if (autoSkipCountdown <= 0) {
      handleSkipQuestion('Time Expired • Auto-Skipped');
      return;
    }

    const timer = setTimeout(() => {
      sound.playTick(true);
      setAutoSkipCountdown((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);

    return () => clearTimeout(timer);
  }, [autoSkipCountdown, timerFrozen, isSubmitting]);

  // Points calculation based on speed
  const maxPts = 1000;
  const baseFraction = Math.max(0.4, secondsRemaining / initialSeconds);
  const currentAvailablePoints = Math.round(maxPts * baseFraction);

  const handleSelect = (key: 'A' | 'B' | 'C' | 'D') => {
    if (eliminatedOptions.includes(key)) return;
    sound.playSelect();
    setSelectedAnswer(key);
  };

  // Calculator logic
  const handleCalcAppend = (char: string) => {
    sound.playClick();
    if (calcDisplay === '0' || calcDisplay.includes('Error')) {
      setCalcDisplay(char);
    } else {
      setCalcDisplay((prev) => prev + char);
    }
  };

  const handleCalcClear = () => {
    sound.playClick();
    setCalcDisplay('');
  };

  const handleCalcSolve = () => {
    sound.playClick();
    try {
      const sanitized = calcDisplay.replace(/[^0-9+\-*/().]/g, '');
      // Evaluate basic arithmetic expression safely
      const fn = new Function(`return (${sanitized})`);
      const res = fn();
      if (typeof res === 'number' && !isNaN(res)) {
        setCalcDisplay(String(Math.round(res * 100) / 100));
      } else {
        setCalcDisplay('Error');
      }
    } catch {
      setCalcDisplay('Error');
    }
  };

  // 50:50 Lifeline
  const handle5050 = () => {
    if (eliminatedOptions.length > 0) return;
    sound.playLifeline();
    const wrongKeys = question.options
      .filter((o) => o.key !== question.correctKey)
      .map((o) => o.key);
    // Eliminate first two wrong options
    setEliminatedOptions(wrongKeys.slice(0, 2));
  };

  // Audience poll lifeline
  const handlePoll = () => {
    sound.playLifeline();
    setPollVisible(!pollVisible);
  };

  // Submit and next
  const handleSubmitAndNext = () => {
    sound.playClick();
    setIsSubmitting(true);
    const isCorrect = selectedAnswer === question.correctKey;
    const newStreak = isCorrect ? currentStreak + 1 : 0;
    setCurrentStreak(newStreak);
    if (onStreakChange) onStreakChange(newStreak);
    if (isCorrect && newStreak >= 2) {
      sound.playSuccess();
    }
    setTimeout(() => {
      onNextQuestion(selectedAnswer, currentAvailablePoints);
    }, 500);
  };

  // Skip question action (via Skip button or Auto-Skip timer expiration)
  const handleSkipQuestion = (reason: string = 'Question Skipped') => {
    if (isSubmitting) return;
    sound.playClick();
    setIsSubmitting(true);
    setSkipNoticeVisible(true);
    setCurrentStreak(0);
    if (onStreakChange) onStreakChange(0);

    setTimeout(() => {
      onNextQuestion(null, 0);
    }, 600);
  };

  if (!question) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-[#1a1438] rounded-3xl border border-white/10 text-center gap-4 my-8">
        <Sparkles className="w-12 h-12 text-[#c8bfff] animate-pulse" />
        <h2 className="font-['Rubik'] font-black text-2xl text-white">No Questions in Active Arena</h2>
        <p className="text-sm text-[#c9c4d8] max-w-md">
          There are currently no questions in this room. Add questions via the Host Console / Admin Portal or run the Supabase starter seed SQL!
        </p>
      </div>
    );
  }

  const progressPercent = (secondsRemaining / initialSeconds) * 100;
  const isUrgent = secondsRemaining <= 5;
  const isWarning = secondsRemaining > 5 && secondsRemaining <= 10;

  return (
    <div className="flex flex-col w-full relative">
      {/* Interactive Canvas Container with Violet-Purple Neo-Arcade Backdrop */}
      <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#7359f8] p-5 sm:p-8 lg:p-12 shadow-2xl my-2 sm:my-4">
        {/* Background Decor */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-arena-grid-pattern"></div>
        <div className="absolute -bottom-24 -left-20 w-[36rem] h-[36rem] rounded-full bg-white/10 blur-2xl pointer-events-none"></div>
        <div className="absolute -top-32 -right-20 w-[40rem] h-[40rem] rounded-full bg-[#5c3fe0]/30 blur-3xl pointer-events-none"></div>

        {/* Top Status Bar: Question Count, Category Tag, Streak Indicator & Countdown Pill */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white text-[#1b1b1b] font-black text-xs sm:text-sm shadow-sm">
              Question {roundNumber < 10 ? `0${roundNumber}` : roundNumber} of {totalRounds}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider border border-white/10">
              <span className="w-2 h-2 rounded-full bg-[#c8bfff] animate-ping"></span>
              Live Match
            </span>
            {/* Category Tag Badge */}
            <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full ${categoryMeta.badgeBg} text-white text-xs font-black uppercase tracking-wider shadow-md border border-white/20`}>
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              {categoryMeta.label}
            </span>

            {/* Visual Glowing Streak Indicator using Framer Motion */}
            <AnimatePresence>
              {currentStreak >= 2 && (
                <motion.div
                  key="status-streak-badge"
                  initial={{ opacity: 0, scale: 0.6, y: -4 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    boxShadow: [
                      '0 0 10px rgba(249, 115, 22, 0.5), 0 0 20px rgba(239, 68, 68, 0.3)',
                      '0 0 24px rgba(249, 115, 22, 0.95), 0 0 40px rgba(245, 158, 11, 0.75)',
                      '0 0 10px rgba(249, 115, 22, 0.5), 0 0 20px rgba(239, 68, 68, 0.3)',
                    ],
                  }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{
                    boxShadow: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' },
                    scale: { type: 'spring', stiffness: 400, damping: 20 },
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 text-white text-xs font-black uppercase tracking-wider border border-amber-300/60 shadow-lg relative cursor-default select-none"
                >
                  <motion.span
                    animate={{
                      rotate: [-8, 8, -8],
                      scale: [1, 1.25, 1],
                    }}
                    transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <Flame className="w-3.5 h-3.5 text-yellow-200 fill-yellow-300 drop-shadow" />
                  </motion.span>
                  <span>{currentStreak}X STREAK</span>
                  <span className="hidden sm:inline text-[10px] font-bold text-yellow-100 bg-black/25 px-1.5 py-0.5 rounded-full">
                    +{Math.min(50, (currentStreak - 1) * 10)}% PTS
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Timer & Question Skip Timer Pills */}
          <div className="flex items-center gap-2">
            <div
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-black/40 backdrop-blur-md text-white border border-white/10 text-xs font-bold shadow-inner"
              title="Question auto-skips when timer reaches 0"
            >
              <SkipForward className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span className="text-white/80">Auto-Skip:</span>
              <strong className="text-white font-mono">{secondsRemaining}s</strong>
            </div>

            {/* Realtime Timer Pill */}
            <div
              onClick={onToggleFreezeTimer}
              title={timerFrozen ? 'Timer Paused (Click to resume)' : 'Click to pause timer'}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md text-white shadow-inner border border-white/10 cursor-pointer hover:bg-black/60 transition-colors"
            >
              <Timer className={`w-4 h-4 ${isUrgent ? 'text-[#ffb4ab] animate-bounce' : 'text-[#c8bfff] animate-pulse'}`} />
              <span
                className={`font-['Rubik'] font-black text-sm sm:text-base tracking-wide ${
                  isUrgent ? 'text-[#ffb4ab]' : 'text-white'
                }`}
              >
                {secondsRemaining < 10 ? `0${secondsRemaining}` : secondsRemaining}s
              </span>
              <span className="text-xs text-white/70">
                {timerFrozen ? '(Paused)' : 'Remaining'}
              </span>
            </div>
          </div>
        </div>

        {/* Auto-Skip Active Grace Countdown Banner */}
        <AnimatePresence>
          {autoSkipCountdown !== null && (
            <motion.div
              key="auto-skip-active-banner"
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              className="relative z-20 w-full mb-4 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 border border-white/30 shadow-2xl flex items-center justify-between gap-3 text-white"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-black/40 flex items-center justify-center font-['Rubik'] font-black text-lg text-yellow-300 border border-white/20 shrink-0">
                  {autoSkipCountdown}
                </div>
                <div>
                  <div className="font-['Rubik'] font-black text-sm sm:text-base flex items-center gap-2">
                    <span>TIME EXPIRED • AUTO-SKIPPING QUESTION</span>
                  </div>
                  <div className="text-xs text-white/80">
                    Advancing to next question in {autoSkipCountdown}s (0 points awarded).
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleSkipQuestion('Time Expired Skip')}
                className="px-4 py-2 rounded-full bg-white text-black font-['Rubik'] font-black text-xs hover:bg-white/90 cursor-pointer shadow-md active:scale-95 transition-all flex items-center gap-1.5 shrink-0"
              >
                <span>Skip Now</span>
                <SkipForward className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          )}

          {skipNoticeVisible && (
            <motion.div
              key="skip-notice-active-banner"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="relative z-20 w-full mb-4 p-3 rounded-xl bg-amber-500 text-black font-black text-center text-xs sm:text-sm shadow-xl flex items-center justify-center gap-2"
            >
              <SkipForward className="w-4 h-4" />
              <span>QUESTION SKIPPED • Advancing to next round...</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dynamic Progress Bar Component */}
        <div className="relative z-10 w-full mb-6 sm:mb-8">
          <div className="flex items-center justify-between text-[11px] font-bold text-white/90 mb-1.5 px-1">
            <span className="flex items-center gap-1.5">
              <span
                className={`w-2 h-2 rounded-full ${
                  isUrgent
                    ? 'bg-red-400 animate-ping'
                    : isWarning
                    ? 'bg-amber-300'
                    : 'bg-emerald-300'
                }`}
              ></span>
              <span className="uppercase tracking-wider">
                {isUrgent
                  ? 'CRITICAL PACING • POINTS LOCKING!'
                  : isWarning
                  ? 'STANDARD PACE • LOCK IN VERDICT'
                  : 'SPEED BONUS ZONE (1.5x ACTIVE)'}
              </span>
            </span>
            <span className="font-mono text-xs">
              {secondsRemaining}s / {initialSeconds}s ({Math.round(progressPercent)}%)
            </span>
          </div>

          {/* Visual Track */}
          <div className="relative w-full h-3.5 rounded-full bg-black/40 backdrop-blur-md p-0.5 overflow-hidden border border-white/15 shadow-inner">
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-linear relative ${
                isUrgent
                  ? 'bg-gradient-to-r from-red-500 via-rose-500 to-red-600 animate-pulse shadow-[0_0_20px_rgba(239,68,68,1)]'
                  : isWarning
                  ? 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 shadow-[0_0_14px_rgba(245,158,11,0.8)]'
                  : 'bg-gradient-to-r from-white via-[#c8bfff] to-white shadow-[0_0_14px_rgba(255,255,255,0.7)]'
              }`}
              style={{ width: `${progressPercent}%` }}
            >
              {/* Highlight flare at the tip */}
              <div className="absolute right-0 top-0 bottom-0 w-2 bg-white rounded-full opacity-90 shadow-[0_0_8px_white]"></div>
            </div>

            {/* Milestones markers on the track */}
            <div className="absolute top-0 bottom-0 left-1/4 w-0.5 bg-white/20 pointer-events-none"></div>
            <div className="absolute top-0 bottom-0 left-2/4 w-0.5 bg-white/25 pointer-events-none"></div>
            <div className="absolute top-0 bottom-0 left-3/4 w-0.5 bg-white/20 pointer-events-none"></div>
          </div>
        </div>

        {/* Hero Header: Bold Centered QUIZ TIME & Animated Glowing Streak Banner */}
        <div className="relative z-10 text-center mb-6 lg:mb-10 flex flex-col items-center">
          <h1 className="font-['Rubik'] font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-wide uppercase drop-shadow-md select-none">
            QUIZ TIME
          </h1>
          <p className="text-xs sm:text-sm text-white/85 font-semibold mt-1">
            {categoryMeta.name} • {question.section}
          </p>

          {/* Glowing Streak Banner with Framer Motion keyframe glow effect */}
          <AnimatePresence>
            {currentStreak >= 2 && (
              <motion.div
                key="hero-streak-banner"
                initial={{ opacity: 0, y: -12, scale: 0.85 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  boxShadow: [
                    '0 0 18px rgba(249, 115, 22, 0.45), 0 0 35px rgba(239, 68, 68, 0.25)',
                    '0 0 35px rgba(251, 146, 60, 0.95), 0 0 60px rgba(245, 158, 11, 0.65)',
                    '0 0 18px rgba(249, 115, 22, 0.45), 0 0 35px rgba(239, 68, 68, 0.25)',
                  ],
                }}
                exit={{ opacity: 0, y: -10, scale: 0.85 }}
                transition={{
                  boxShadow: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                  scale: { type: 'spring', stiffness: 350, damping: 25 },
                }}
                className="mt-3.5 inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-gradient-to-r from-orange-500/90 via-amber-500/90 to-rose-600/90 backdrop-blur-md border border-amber-300/80 text-white shadow-2xl relative"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.35, 1],
                    rotate: [-12, 12, -12],
                  }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative shrink-0"
                >
                  <Flame className="w-5 h-5 text-yellow-200 fill-yellow-300 drop-shadow-[0_0_8px_rgba(255,255,0,0.8)]" />
                </motion.div>

                <div className="flex items-center gap-2">
                  <span className="font-['Rubik'] font-black text-xs sm:text-sm tracking-wider uppercase text-white drop-shadow">
                    {currentStreak >= 5 ? '🔥 GODLIKE STREAK' : '🔥 ON FIRE'}: {currentStreak} CORRECT IN A ROW!
                  </span>
                  <span className="text-[10px] font-black uppercase text-amber-950 bg-amber-200 px-2.5 py-0.5 rounded-full shadow-sm">
                    +{Math.min(50, (currentStreak - 1) * 10)}% PTS
                  </span>
                </div>

                {/* Quick Interactive Streak Tester */}
                <div className="flex items-center gap-1 ml-1 pl-2 border-l border-white/20">
                  <button
                    onClick={() => {
                      sound.playClick();
                      const n = Math.max(0, currentStreak - 1);
                      setCurrentStreak(n);
                      if (onStreakChange) onStreakChange(n);
                    }}
                    title="Decrease Streak (Test indicator)"
                    className="w-5 h-5 rounded-full bg-black/35 hover:bg-black/60 text-white text-[10px] font-bold flex items-center justify-center cursor-pointer transition-colors"
                  >
                    -
                  </button>
                  <button
                    onClick={() => {
                      sound.playClick();
                      sound.playSuccess();
                      const n = currentStreak + 1;
                      setCurrentStreak(n);
                      if (onStreakChange) onStreakChange(n);
                    }}
                    title="Increase Streak (Test glow effect)"
                    className="w-5 h-5 rounded-full bg-black/35 hover:bg-black/60 text-white text-[10px] font-bold flex items-center justify-center cursor-pointer transition-colors"
                  >
                    +
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Main Content Arena: 2-Column Split */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Left Column: Big White Question Card + Calculator */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 text-black shadow-2xl relative min-h-[340px] flex flex-col justify-between">
              <div>
                {/* Question Eyebrow Badge with Category Tag */}
                <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                  <span className={`inline-block text-xs font-black tracking-widest uppercase ${categoryMeta.badgeBg} text-white px-3.5 py-1 rounded-full shadow-sm`}>
                    {categoryMeta.label}
                  </span>
                  <span className="inline-block text-xs font-black tracking-widest text-[#7359f8] uppercase bg-[#e5deff]/50 px-4 py-1 rounded-full">
                    QUESTION
                  </span>
                </div>

                {/* Primary Question Statement */}
                <p className="font-['Rubik'] font-extrabold text-xl sm:text-2xl text-black text-center leading-snug">
                  {question.question}
                </p>
              </div>

              {/* Question Footprint / Metadata */}
              <div className="pt-6 mt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 text-gray-600">
                  <Gauge className="w-4 h-4 text-[#7359f8]" />
                  <span className="text-xs font-bold">Topic: {question.topic}</span>
                </div>
                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#0e082a] text-[#c8bfff] text-xs font-black shadow-sm">
                  <Zap className="w-3.5 h-3.5 fill-[#c8bfff]" />
                  <span>{currentAvailablePoints} / {maxPts} PTS</span>
                </div>
              </div>
            </div>

            {/* Built-in Collapsible Calculator Bar & Widget */}
            <div className="bg-[#0e082a]/85 backdrop-blur-xl rounded-2xl p-3.5 sm:p-4 text-white shadow-xl border border-white/5">
              <div className="flex items-center justify-between px-1 py-0.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#7359f8] flex items-center justify-center text-white shadow-sm">
                    <CalcIcon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm font-bold">Speed Scratchpad</span>
                </div>

                <button
                  onClick={() => {
                    sound.playClick();
                    setCalcOpen(!calcOpen);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#201b3c] text-white hover:bg-[#2a2547] text-xs font-semibold transition-all border border-white/5"
                >
                  <span>Calculator: {calcOpen ? 'ON' : 'OFF'}</span>
                  {calcOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Calculator Drawer Body */}
              {calcOpen && (
                <div className="mt-3 p-3 rounded-xl bg-[#1c1738] border border-white/5">
                  <div className="flex flex-col gap-2">
                    <div className="bg-[#0e082a] p-2.5 rounded-lg text-right font-['Rubik'] font-bold text-base sm:text-lg text-[#c8bfff] tracking-wider min-h-[44px] overflow-hidden truncate border border-white/5">
                      {calcDisplay || '0'}
                    </div>

                    <div className="grid grid-cols-4 gap-1.5">
                      <button
                        onClick={() => handleCalcAppend('7')}
                        className="py-2.5 rounded-lg bg-[#201b3c] hover:bg-[#2a2547] text-white font-bold text-sm transition-colors active:scale-95"
                      >
                        7
                      </button>
                      <button
                        onClick={() => handleCalcAppend('8')}
                        className="py-2.5 rounded-lg bg-[#201b3c] hover:bg-[#2a2547] text-white font-bold text-sm transition-colors active:scale-95"
                      >
                        8
                      </button>
                      <button
                        onClick={() => handleCalcAppend('9')}
                        className="py-2.5 rounded-lg bg-[#201b3c] hover:bg-[#2a2547] text-white font-bold text-sm transition-colors active:scale-95"
                      >
                        9
                      </button>
                      <button
                        onClick={() => handleCalcAppend('/')}
                        className="py-2.5 rounded-lg bg-[#7359f8] hover:bg-[#5c3fe0] text-white font-bold text-sm transition-colors active:scale-95"
                      >
                        ÷
                      </button>

                      <button
                        onClick={() => handleCalcAppend('4')}
                        className="py-2.5 rounded-lg bg-[#201b3c] hover:bg-[#2a2547] text-white font-bold text-sm transition-colors active:scale-95"
                      >
                        4
                      </button>
                      <button
                        onClick={() => handleCalcAppend('5')}
                        className="py-2.5 rounded-lg bg-[#201b3c] hover:bg-[#2a2547] text-white font-bold text-sm transition-colors active:scale-95"
                      >
                        5
                      </button>
                      <button
                        onClick={() => handleCalcAppend('6')}
                        className="py-2.5 rounded-lg bg-[#201b3c] hover:bg-[#2a2547] text-white font-bold text-sm transition-colors active:scale-95"
                      >
                        6
                      </button>
                      <button
                        onClick={() => handleCalcAppend('*')}
                        className="py-2.5 rounded-lg bg-[#7359f8] hover:bg-[#5c3fe0] text-white font-bold text-sm transition-colors active:scale-95"
                      >
                        ×
                      </button>

                      <button
                        onClick={() => handleCalcAppend('1')}
                        className="py-2.5 rounded-lg bg-[#201b3c] hover:bg-[#2a2547] text-white font-bold text-sm transition-colors active:scale-95"
                      >
                        1
                      </button>
                      <button
                        onClick={() => handleCalcAppend('2')}
                        className="py-2.5 rounded-lg bg-[#201b3c] hover:bg-[#2a2547] text-white font-bold text-sm transition-colors active:scale-95"
                      >
                        2
                      </button>
                      <button
                        onClick={() => handleCalcAppend('3')}
                        className="py-2.5 rounded-lg bg-[#201b3c] hover:bg-[#2a2547] text-white font-bold text-sm transition-colors active:scale-95"
                      >
                        3
                      </button>
                      <button
                        onClick={() => handleCalcAppend('-')}
                        className="py-2.5 rounded-lg bg-[#7359f8] hover:bg-[#5c3fe0] text-white font-bold text-sm transition-colors active:scale-95"
                      >
                        -
                      </button>

                      <button
                        onClick={handleCalcClear}
                        className="py-2.5 rounded-lg bg-[#93000a] hover:bg-[#b00020] text-white font-black text-sm transition-colors active:scale-95"
                      >
                        C
                      </button>
                      <button
                        onClick={() => handleCalcAppend('0')}
                        className="py-2.5 rounded-lg bg-[#201b3c] hover:bg-[#2a2547] text-white font-bold text-sm transition-colors active:scale-95"
                      >
                        0
                      </button>
                      <button
                        onClick={handleCalcSolve}
                        className="py-2.5 rounded-lg bg-[#c8bfff] text-[#1a0064] font-black text-base hover:brightness-110 transition-colors active:scale-95"
                      >
                        =
                      </button>
                      <button
                        onClick={() => handleCalcAppend('+')}
                        className="py-2.5 rounded-lg bg-[#7359f8] hover:bg-[#5c3fe0] text-white font-bold text-sm transition-colors active:scale-95"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Tactile Answer Pill Buttons Stack */}
          <div className="lg:col-span-6 flex flex-col gap-3.5 sm:gap-4">
            {question.options.map((opt) => {
              const isSelected = selectedAnswer === opt.key;
              const isEliminated = eliminatedOptions.includes(opt.key);

              return (
                <button
                  key={opt.key}
                  disabled={isEliminated}
                  onClick={() => handleSelect(opt.key)}
                  className={`group relative w-full text-left rounded-full transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-xl p-2.5 sm:p-3 flex items-center justify-between cursor-pointer ${
                    isEliminated
                      ? 'opacity-20 cursor-not-allowed bg-white/40'
                      : isSelected
                      ? 'bg-black text-white ring-2 ring-white/20'
                      : 'bg-white text-black hover:bg-white/95'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0 pr-3">
                    <div
                      className={`w-11 sm:w-12 h-11 sm:h-12 rounded-full font-['Rubik'] font-black text-base flex items-center justify-center flex-shrink-0 shadow-md ${
                        isSelected
                          ? 'bg-white text-black shadow-inner'
                          : 'bg-[#7359f8] text-white'
                      }`}
                    >
                      {opt.key}
                    </div>
                    <span
                      className={`font-['Rubik'] font-bold text-base sm:text-lg tracking-tight truncate ${
                        isSelected ? 'text-white' : 'text-black'
                      }`}
                    >
                      {opt.text}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 pr-3 shrink-0">
                    {pollVisible && (
                      <span className="text-xs font-extrabold px-2 py-0.5 rounded-full bg-[#7359f8]/20 text-[#7359f8]">
                        {opt.percentage}%
                      </span>
                    )}
                    {isSelected && (
                      <CheckCircle className="w-6 h-6 text-[#7359f8] fill-current" />
                    )}
                  </div>
                </button>
              );
            })}

            {/* Bottom Action Bar: Lifelines & Next Question */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 mt-2">
              {/* Lifeline Badges */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handle5050}
                  disabled={eliminatedOptions.length > 0}
                  title="50:50 Lifeline (Removes 2 incorrect choices)"
                  className={`w-11 h-11 rounded-full flex items-center justify-center transition-all shadow-md active:scale-95 font-black text-xs ${
                    eliminatedOptions.length > 0
                      ? 'bg-[#201b3c]/40 text-white/30 cursor-not-allowed'
                      : 'bg-[#201b3c] hover:bg-[#2a2547] text-white border border-white/10'
                  }`}
                >
                  50:50
                </button>
                <button
                  onClick={handlePoll}
                  title="Audience Poll Distribution"
                  className={`w-11 h-11 rounded-full flex items-center justify-center transition-all shadow-md active:scale-95 ${
                    pollVisible
                      ? 'bg-[#7359f8] text-white shadow-lg'
                      : 'bg-[#201b3c] hover:bg-[#2a2547] text-white border border-white/10'
                  }`}
                >
                  <BarChart2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => {
                    sound.playClick();
                    onRevealAnswer();
                  }}
                  title="Skip to Round Reveal / Official Answer"
                  className="w-11 h-11 rounded-full bg-[#201b3c] hover:bg-[#2a2547] text-white flex items-center justify-center transition-all shadow-md active:scale-95 border border-white/10"
                >
                  <FastForward className="w-5 h-5" />
                </button>
              </div>

              {/* Question Action Controls */}
              <div className="flex items-center gap-2.5 sm:gap-3">
                {/* Skip Question Button with Live Skip Timer Countdown */}
                <button
                  onClick={() => handleSkipQuestion('Contender Manual Skip')}
                  disabled={isSubmitting}
                  title={`Skip question immediately (0 points) • Auto-skips in ${secondsRemaining}s`}
                  className="px-4 sm:px-5 py-3 rounded-full bg-[#201b3c] hover:bg-[#2c264f] text-[#cbd5e1] hover:text-white border border-white/10 font-['Rubik'] font-bold text-xs sm:text-sm tracking-tight flex items-center gap-2 transition-all active:scale-95 cursor-pointer disabled:opacity-50 shadow-md"
                >
                  <SkipForward className="w-4 h-4 text-[#ffb4ab]" />
                  <span>Skip</span>
                  <span className="font-mono text-[11px] px-2 py-0.5 rounded-full bg-black/40 text-cyan-300 border border-white/5">
                    {secondsRemaining}s
                  </span>
                </button>

                {/* Next Question Pill */}
                <button
                  onClick={handleSubmitAndNext}
                  disabled={isSubmitting}
                  className="px-6 sm:px-8 py-3.5 rounded-full bg-white text-black hover:bg-white/90 font-['Rubik'] font-extrabold text-sm sm:text-base tracking-tight shadow-2xl flex items-center gap-2 group transition-all transform hover:-translate-y-0.5 active:scale-95 cursor-pointer disabled:opacity-60"
                >
                  <span>{isSubmitting ? 'Evaluating...' : 'Next Question'}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Arena Bottom Analytics Strip: Room Status & Accuracy Counter */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="p-4 sm:p-5 rounded-2xl bg-[#1c1738] border border-white/5 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#7359f8]/20 text-[#c8bfff] flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-[#c9c4d8] block font-medium">Current Rank</span>
              <span className="text-base font-bold text-white">3rd of 42 Players</span>
            </div>
          </div>
          <span className="text-xs font-black text-[#c8bfff] bg-[#2a2547] px-2.5 py-1 rounded-full border border-white/5">
            +2 Positions
          </span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-[#1c1738] border border-white/5 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#7359f8]/20 text-[#c8bfff] flex items-center justify-center">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-[#c9c4d8] block font-medium">Accuracy Streak</span>
              <span className="text-base font-bold text-white">6 In A Row</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[#c8bfff] text-xs font-black bg-[#2a2547] px-2.5 py-1 rounded-full border border-white/5">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>2.5x MULT</span>
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-[#1c1738] border border-white/5 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#7359f8]/20 text-[#c8bfff] flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-[#c9c4d8] block font-medium">Avg. Response Time</span>
              <span className="text-base font-bold text-white">4.2 Seconds</span>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-[#353053] text-[#c9c4d8] text-[11px] font-black uppercase">
            TOP 5%
          </span>
        </div>
      </div>
    </div>
  );
};
