'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import socket from '@/lib/socket';
import toast from 'react-hot-toast';
import {
  Zap,
  Lock,
  Unlock,
  Plus,
  Play,
  Eye,
  Trash2,
  Edit3,
  Copy,
  Check,
  Users,
  Clock,
  Layers,
  FileText,
  Upload,
  Download,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  X,
  Radio,
  Trophy,
  Activity,
  LogOut,
  RefreshCw,
  Award
} from 'lucide-react';
import { QUIZ_QUESTIONS } from '@/lib/questions';

// Default Admin Secret Password (as documented in README)
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'SECRET_QUIZ_2026';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

interface ScheduledQuiz {
  id: string;
  title: string;
  startTime: string;
  code: string;
  hostId: string;
  createdAt: string;
  questions: QuizQuestion[];
  questionDuration: number;
  gapDuration: number;
  enableRooms?: boolean;
  mode?: 'team' | 'individual';
}

interface UserLeaderboardEntry {
  rank: number;
  id: string;
  name: string;
  team?: string;
  score: number;
  connected: boolean;
  room?: string;
}

interface TeamLeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  members: number;
  memberNames?: string[];
}

export default function HostSecretQuizAdminPage() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Scheduled Quizzes
  const [quizzes, setQuizzes] = useState<ScheduledQuiz[]>([]);
  const [activeSessionCodes, setActiveSessionCodes] = useState<Record<string, { status: string; participants: number; mode?: 'team' | 'individual' }>>({});
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Schedule Modal State
  const [isScheduleOpen, setIsScheduleOpen] = useState<boolean>(false);
  const [scheduleStep, setScheduleStep] = useState<1 | 2 | 3>(1);
  const [editingCode, setEditingCode] = useState<string | null>(null);

  // Schedule Form Data
  const [formTitle, setFormTitle] = useState<string>('');
  const [formStartTime, setFormStartTime] = useState<string>('');
  const [formQDuration, setFormQDuration] = useState<number>(10);
  const [formGapDuration, setFormGapDuration] = useState<number>(4);
  const [formEnableRooms, setFormEnableRooms] = useState<boolean>(true);
  const [formMode, setFormMode] = useState<'team' | 'individual'>('team');
  const [formInputMode, setFormInputMode] = useState<'manual' | 'csv' | 'preset'>('manual');
  const [formQuestions, setFormQuestions] = useState<QuizQuestion[]>([...QUIZ_QUESTIONS]);
  const [csvRawText, setCsvRawText] = useState<string>('');
  const [csvError, setCsvError] = useState<string>('');

  // Live Monitor State
  const [monitoringCode, setMonitoringCode] = useState<string | null>(null);
  const [monitorMode, setMonitorMode] = useState<'team' | 'individual'>('team');
  const [monitorStatus, setMonitorStatus] = useState<'waiting' | 'active' | 'finished' | 'idle'>('idle');
  const [monitorCountdown, setMonitorCountdown] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [monitorTimeLeft, setMonitorTimeLeft] = useState<number>(0);
  const [revealedAnswer, setRevealedAnswer] = useState<string | null>(null);
  const [submittedAnswersCount, setSubmittedAnswersCount] = useState<number>(0);
  const [participantsCount, setParticipantsCount] = useState<number>(0);
  const [roomStats, setRoomStats] = useState<Record<string, number>>({ A: 0, B: 0, C: 0 });
  const [individualRanks, setIndividualRanks] = useState<UserLeaderboardEntry[]>([]);
  const [teamRanks, setTeamRanks] = useState<TeamLeaderboardEntry[]>([]);
  const [topPercentFilter, setTopPercentFilter] = useState<string>('100');

  // Check sessionStorage auth on mount
  useEffect(() => {
    const savedAuth = sessionStorage.getItem('aptiquiz_admin_auth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Socket connection & scheduled quiz loading
  useEffect(() => {
    if (!socket.connected) socket.connect();

    const fetchQuizzes = () => {
      socket.emit('get-scheduled-quizzes', (list: ScheduledQuiz[]) => {
        if (Array.isArray(list)) {
          setQuizzes(list);
          // Check active status for all quizzes
          list.forEach((q) => {
            socket.emit('get-session-status', { code: q.code }, (res: any) => {
              if (res && res.active) {
                setActiveSessionCodes((prev) => ({
                  ...prev,
                  [q.code]: { status: res.status, participants: res.participants },
                }));
              }
            });
          });
        }
      });
    };

    fetchQuizzes();

    const onConnect = () => fetchQuizzes();
    const onQuizScheduled = (newQuiz: ScheduledQuiz) => {
      setQuizzes((prev) => [...prev.filter((q) => q.code !== newQuiz.code), newQuiz]);
      toast.success(`Quiz "${newQuiz.title}" scheduled! (Code: ${newQuiz.code})`);
    };
    const onQuizDeleted = ({ code }: { code: string }) => {
      setQuizzes((prev) => prev.filter((q) => q.code !== code));
      setActiveSessionCodes((prev) => {
        const copy = { ...prev };
        delete copy[code];
        return copy;
      });
      toast.success(`Quiz ${code} deleted.`);
    };
    const onQuizUpdated = (quiz: ScheduledQuiz) => {
      setQuizzes((prev) => prev.map((q) => (q.code === quiz.code ? quiz : q)));
      toast.success(`Quiz ${quiz.code} updated.`);
    };
    const onSessionCreated = ({ code }: { code: string }) => {
      setActiveSessionCodes((prev) => ({
        ...prev,
        [code]: { status: 'waiting', participants: 0 },
      }));
    };
    const onSessionEnded = ({ code }: { code: string }) => {
      setActiveSessionCodes((prev) => {
        const copy = { ...prev };
        delete copy[code];
        return copy;
      });
      if (monitoringCode === code) {
        setMonitorStatus('finished');
        toast('Quiz session ended.');
      }
    };

    socket.on('connect', onConnect);
    socket.on('quiz-scheduled', onQuizScheduled);
    socket.on('quiz-deleted', onQuizDeleted);
    socket.on('quiz-updated', onQuizUpdated);
    socket.on('session-created', onSessionCreated);
    socket.on('session-ended', onSessionEnded);

    return () => {
      socket.off('connect', onConnect);
      socket.off('quiz-scheduled', onQuizScheduled);
      socket.off('quiz-deleted', onQuizDeleted);
      socket.off('quiz-updated', onQuizUpdated);
      socket.off('session-created', onSessionCreated);
      socket.off('session-ended', onSessionEnded);
    };
  }, [monitoringCode]);

  // Handle Live Monitor socket listeners when monitoringCode changes
  useEffect(() => {
    if (!monitoringCode) return;

    socket.emit('join-observer', { code: monitoringCode }, (res: any) => {
      if (res && res.success) {
        if (res.leaderboard) {
          setIndividualRanks(res.leaderboard.individuals || []);
          setTeamRanks(res.leaderboard.teams || []);
        }
        if (res.status) setMonitorStatus(res.status);
      }
    });

    const onUserJoined = (data: any) => {
      if (data.totalParticipants !== undefined) setParticipantsCount(data.totalParticipants);
      if (data.roomStats) setRoomStats(data.roomStats);
    };

    const onUserLeft = (data: any) => {
      if (data.totalParticipants !== undefined) setParticipantsCount(data.totalParticipants);
      if (data.roomStats) setRoomStats(data.roomStats);
    };

    const onQuizStarting = (data: { countdown: number }) => {
      setMonitorStatus('waiting');
      setMonitorCountdown(data.countdown);
    };

    const onNewQuestion = (data: { question: any; timeLeft: number }) => {
      setMonitorCountdown(null);
      setMonitorStatus('active');
      setCurrentQuestion(data.question);
      setMonitorTimeLeft(data.timeLeft);
      setRevealedAnswer(null);
      setSubmittedAnswersCount(0);
    };

    const onTimerTick = (data: { timeLeft: number }) => {
      setMonitorTimeLeft(data.timeLeft);
    };

    const onTimeUp = (data: { answer: string }) => {
      setRevealedAnswer(data.answer);
    };

    const onAnswerSubmitted = (data: { answersCount: number }) => {
      setSubmittedAnswersCount(data.answersCount);
    };

    const onLeaderboardReveal = (data: { individual: UserLeaderboardEntry[]; teams: TeamLeaderboardEntry[] }) => {
      if (data.individual) setIndividualRanks(data.individual);
      if (data.teams) setTeamRanks(data.teams);
    };

    const onQuizFinished = (data: { leaderboard: { individuals: UserLeaderboardEntry[]; teams: TeamLeaderboardEntry[] } }) => {
      setMonitorStatus('finished');
      if (data.leaderboard) {
        setIndividualRanks(data.leaderboard.individuals || []);
        setTeamRanks(data.leaderboard.teams || []);
      }
      toast.success('Quiz finished! Final rankings available.');
    };

    socket.on('user-joined', onUserJoined);
    socket.on('user-left', onUserLeft);
    socket.on('quiz-starting', onQuizStarting);
    socket.on('new-question', onNewQuestion);
    socket.on('timer-tick', onTimerTick);
    socket.on('time-up', onTimeUp);
    socket.on('answer-submitted', onAnswerSubmitted);
    socket.on('leaderboard-reveal', onLeaderboardReveal);
    socket.on('quiz-finished', onQuizFinished);

    return () => {
      socket.off('user-joined', onUserJoined);
      socket.off('user-left', onUserLeft);
      socket.off('quiz-starting', onQuizStarting);
      socket.off('new-question', onNewQuestion);
      socket.off('timer-tick', onTimerTick);
      socket.off('time-up', onTimeUp);
      socket.off('answer-submitted', onAnswerSubmitted);
      socket.off('leaderboard-reveal', onLeaderboardReveal);
      socket.off('quiz-finished', onQuizFinished);
    };
  }, [monitoringCode]);

  // Auth Handler
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput.trim() === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('aptiquiz_admin_auth', 'true');
      setAuthError('');
      toast.success('Admin Dashboard Unlocked');
    } else {
      setAuthError('Invalid Admin Password. Access Denied.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('aptiquiz_admin_auth');
    setIsAuthenticated(false);
    setPasswordInput('');
  };

  // Copy code helper
  const copyToClipboard = (text: string, code: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(code);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Open Schedule Modal
  const openScheduleModal = (quizToEdit?: ScheduledQuiz) => {
    if (quizToEdit) {
      setEditingCode(quizToEdit.code);
      setFormTitle(quizToEdit.title);
      setFormStartTime(quizToEdit.startTime.slice(0, 16));
      setFormQDuration(quizToEdit.questionDuration || 10);
      setFormGapDuration(quizToEdit.gapDuration || 4);
      setFormEnableRooms(quizToEdit.enableRooms ?? true);
      setFormMode(quizToEdit.mode || 'team');
      setFormQuestions([...quizToEdit.questions]);
    } else {
      setEditingCode(null);
      setFormTitle('');
      const defaultTime = new Date(Date.now() + 30 * 60000).toISOString().slice(0, 16);
      setFormStartTime(defaultTime);
      setFormQDuration(10);
      setFormGapDuration(4);
      setFormEnableRooms(true);
      setFormMode('team');
      setFormQuestions([...QUIZ_QUESTIONS]);
    }
    setScheduleStep(1);
    setIsScheduleOpen(true);
  };

  // CSV Parsing
  const handleCsvUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      parseCsvText(content);
    };
    reader.readAsText(file);
  };

  const parseCsvText = (csv: string) => {
    setCsvError('');
    try {
      const lines = csv.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
      if (lines.length < 2) {
        setCsvError('CSV must have a header row and at least 1 question.');
        return;
      }
      const parsed: QuizQuestion[] = [];
      // Skip header row
      for (let i = 1; i < lines.length; i++) {
        const parts = lines[i].split(',').map((p) => p.trim());
        if (parts.length >= 6) {
          const qText = parts[0];
          const opts = [parts[1], parts[2], parts[3], parts[4]];
          const correctKey = parts[5].toUpperCase();
          const optionMap: Record<string, number> = { A: 0, B: 1, C: 2, D: 3 };
          const ansText = optionMap[correctKey] !== undefined ? opts[optionMap[correctKey]] : parts[5];
          parsed.push({
            id: i,
            question: qText,
            options: opts,
            answer: ansText,
          });
        }
      }
      if (parsed.length === 0) {
        setCsvError('No valid rows found. Format: question,OptionA,OptionB,OptionC,OptionD,Correct(A/B/C/D)');
        return;
      }
      setFormQuestions(parsed);
      toast.success(`Imported ${parsed.length} questions from CSV!`);
    } catch (err: any) {
      setCsvError('Failed to parse CSV: ' + err.message);
    }
  };

  // Submit Schedule/Edit Form
  const handleScheduleSubmit = () => {
    if (!formTitle.trim()) {
      toast.error('Please enter a Quiz Title.');
      setScheduleStep(1);
      return;
    }
    if (formQuestions.length === 0) {
      toast.error('Quiz must have at least 1 question.');
      setScheduleStep(2);
      return;
    }

    if (!socket.connected) {
      socket.connect();
    }

    if (editingCode) {
      // Edit existing
      socket.emit(
        'edit-quiz',
        {
          code: editingCode,
          title: formTitle.trim(),
          startTime: formStartTime || new Date().toISOString(),
          questionDuration: Number(formQDuration),
          gapDuration: Number(formGapDuration),
          enableRooms: formEnableRooms,
          mode: formMode,
          questions: formQuestions,
        },
        (res: any) => {
          if (res?.success) {
            toast.success(`Quiz ${editingCode} updated!`);
            setIsScheduleOpen(false);
          } else {
            toast.error(res?.message || 'Failed to update quiz');
          }
        }
      );
    } else {
      // Schedule fresh quiz
      let handled = false;
      socket.emit(
        'schedule-quiz',
        {
          title: formTitle.trim(),
          startTime: formStartTime || new Date(Date.now() + 600000).toISOString(),
          hostId: 'host-admin',
          questions: formQuestions,
          questionDuration: Number(formQDuration),
          gapDuration: Number(formGapDuration),
          enableRooms: formEnableRooms,
          mode: formMode,
        },
        (res: any) => {
          handled = true;
          if (res?.success) {
            toast.success(`Quiz scheduled! Code: ${res.quiz.code} (${formMode} mode)`);
            setIsScheduleOpen(false);
          } else {
            toast.error(res?.message || 'Failed to schedule quiz');
          }
        }
      );

      // Safety fallback: if callback didn't run within 1.5s, close modal & refetch
      setTimeout(() => {
        if (!handled) {
          setIsScheduleOpen(false);
          socket.emit('get-scheduled-quizzes', (list: ScheduledQuiz[]) => {
            if (Array.isArray(list)) setQuizzes(list);
          });
        }
      }, 1500);
    }
  };

  // Start Session Now
  const handleStartSession = (quiz: ScheduledQuiz) => {
    const mode = quiz.mode || 'team';
    setMonitorMode(mode);
    socket.emit('create-session', {
      code: quiz.code,
      hostId: 'host-admin',
      enableRooms: quiz.enableRooms ?? true,
      mode,
    });
    // Start countdown and question flow
    setTimeout(() => {
      socket.emit('start-quiz', { code: quiz.code });
    }, 400);

    setMonitoringCode(quiz.code);
    setMonitorStatus('waiting');
    toast.success(`Session started for ${quiz.code} (${mode.toUpperCase()} mode)!`);
  };

  // Force End Quiz
  const handleForceEndQuiz = (code: string) => {
    if (!confirm(`⚠️ FORCE END QUIZ #${code}?\n\nThis will immediately stop all ongoing questions, freeze the timer, and force all player screens to display the final scoreboard immediately.`)) return;
    socket.emit('force-end-quiz', { code }, (res: any) => {
      toast.success(`Quiz #${code} was force-ended!`);
      if (res?.leaderboard) {
        setIndividualRanks(res.leaderboard.individuals || []);
        setTeamRanks(res.leaderboard.teams || []);
      }
      setMonitorStatus('finished');
      setActiveSessionCodes((prev) => {
        const copy = { ...prev };
        delete copy[code];
        return copy;
      });
    });
  };

  // End Session
  const handleEndSession = (code: string) => {
    if (!confirm(`Are you sure you want to terminate live session ${code}? All active players will be notified.`)) return;
    socket.emit('end-session', { code, force: true }, () => {
      toast.success(`Session ${code} terminated.`);
      setMonitoringCode(null);
      setMonitorStatus('idle');
    });
  };

  // Delete Quiz
  const handleDeleteQuiz = (code: string) => {
    if (!confirm(`Are you sure you want to permanently delete Quiz ${code}?`)) return;
    socket.emit('delete-quiz', { code }, (res: any) => {
      if (res?.success) {
        toast.success(`Quiz ${code} deleted.`);
      } else {
        toast.error(res?.message || 'Failed to delete');
      }
    });
  };

  // CSV Export for Leaderboard Results
  const exportRankingsCsv = () => {
    const isIndiv = monitorMode === 'individual';
    const percent = Math.min(100, Math.max(1, parseInt(topPercentFilter, 10) || 100));

    if (isIndiv || teamRanks.length === 0) {
      if (individualRanks.length === 0) {
        toast.error('No player ranking data available to export.');
        return;
      }
      const countToExport = Math.ceil((individualRanks.length * percent) / 100);
      const subset = individualRanks.slice(0, countToExport);
      let csvContent = 'Rank,Player Name,Score\n';
      subset.forEach((u) => {
        csvContent += `${u.rank},"${u.name}",${u.score}\n`;
      });

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `quiz-players-top-${percent}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success(`Exported top ${percent}% (${subset.length} players)!`);
    } else {
      // Team CSV with Member Names returned
      if (teamRanks.length === 0) {
        toast.error('No team ranking data available to export.');
        return;
      }
      const countToExport = Math.ceil((teamRanks.length * percent) / 100);
      const subset = teamRanks.slice(0, countToExport);
      let csvContent = 'Rank,Team Name,Total Score,Team Size,Member Names\n';
      subset.forEach((t) => {
        const membersList = (t.memberNames || []).join('; ');
        csvContent += `${t.rank},"${t.name}",${t.score},${t.members},"${membersList}"\n`;
      });

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `quiz-teams-top-${percent}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success(`Exported top ${percent}% (${subset.length} teams with members)!`);
    }
  };

  // ==========================================
  // RENDER: PASSWORD PROTECTION SCREEN
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="relative min-h-screen flex items-center justify-center px-4">
        {/* Glow ambient background */}
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-[30rem] h-[30rem] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(109,40,217,0.6) 0%, transparent 70%)' }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="relative z-10 w-full max-w-md qz-card p-8 sm:p-10 shadow-2xl"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-[#7c3aed] text-white mx-auto mb-4 flex items-center justify-center shadow-lg">
              <Lock className="w-8 h-8" />
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-[#7c3aed]">
              Restricted Area
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight mt-1">
              HOST ADMIN CONSOLE
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Enter master passphrase to access quiz scheduler, controller, and results exporter.
            </p>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                Admin Passphrase
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    setAuthError('');
                  }}
                  placeholder="Enter secret passphrase..."
                  autoFocus
                  className="w-full bg-gray-100 border-2 border-gray-200 rounded-2xl px-4 py-3.5 text-black font-semibold placeholder-gray-400 focus:outline-none focus:border-[#7c3aed] focus:bg-white transition-all text-base"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-bold"
                >
                  {showPassword ? 'HIDE' : 'SHOW'}
                </button>
              </div>
              {authError && (
                <p className="text-red-500 text-xs font-bold mt-2 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  {authError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#7c3aed] text-white font-black py-4 rounded-full flex items-center justify-center gap-2 shadow-lg hover:bg-[#6d28d9] active:scale-[0.98] transition-all text-base tracking-wide"
            >
              <Unlock className="w-5 h-5" />
              UNLOCK DASHBOARD
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400">
              Default password specified in <code className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-700">README.md</code> is{' '}
              <span className="font-mono font-bold text-gray-700">SECRET_QUIZ_2026</span>
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  // ==========================================
  // RENDER: AUTHENTICATED ADMIN DASHBOARD
  // ==========================================
  return (
    <div className="min-h-screen pb-20">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 bg-[#7c3aed]/90 backdrop-blur-md border-b border-white/20 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center shadow-md">
              <Zap className="w-5 h-5 text-white fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl tracking-tight text-white">APTIQUIZ</span>
                <span className="bg-white/20 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full border border-white/30">
                  ADMIN CONSOLE
                </span>
              </div>
              <p className="text-xs text-white/70">Master Quiz & Session Controller</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Live Indicator */}
            <div className="flex items-center gap-2 bg-black/20 px-3 py-1.5 rounded-full border border-white/10 text-xs font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Realtime Engine Ready</span>
            </div>

            {/* Schedule Quiz CTA */}
            <button
              onClick={() => openScheduleModal()}
              className="btn-qz flex items-center gap-2 text-sm !py-2.5 !px-5"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              SCHEDULE QUIZ
            </button>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              title="Lock Admin Console"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all"
            >
              <LogOut className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 mt-8">
        {/* Banner with stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="qz-glass p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-xs uppercase font-bold text-white/70">Scheduled Quizzes</p>
              <p className="text-2xl font-black text-white">{quizzes.length}</p>
            </div>
          </div>

          <div className="qz-glass p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-400/20 flex items-center justify-center">
              <Activity className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <p className="text-xs uppercase font-bold text-white/70">Live Sessions</p>
              <p className="text-2xl font-black text-white">
                {Object.keys(activeSessionCodes).length}
              </p>
            </div>
          </div>

          <div className="qz-glass p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/20 flex items-center justify-center">
              <Award className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <p className="text-xs uppercase font-bold text-white/70">Cluster Support</p>
              <p className="text-sm font-black text-white">1,500+ Players (Sharded)</p>
            </div>
          </div>
        </div>

        {/* Live Active Session Bar (if any is active or currently monitored) */}
        {monitoringCode && (
          <div className="mb-8 qz-card p-6 border-4 border-emerald-400 relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 animate-ping" />
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-black text-black">
                      LIVE MONITOR: QUIZ #{monitoringCode}
                    </h2>
                    <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-2.5 py-0.5 rounded-full">
                      {monitorStatus.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Watching live student responses, room sharding, and rankings
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Stage Projector Link */}
                <a
                  href={`/leaderboard/${monitoringCode}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-gray-100 hover:bg-gray-200 text-black text-xs font-bold px-3.5 py-2 rounded-full flex items-center gap-1.5 transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  STAGE TV VIEW
                </a>

                {/* Force End Quiz Button */}
                <button
                  onClick={() => handleForceEndQuiz(monitoringCode)}
                  className="bg-red-600 hover:bg-red-700 text-white text-xs font-black px-4 py-2 rounded-full shadow-md transition-all flex items-center gap-1.5 animate-pulse"
                >
                  <AlertCircle className="w-3.5 h-3.5" />
                  FORCE END QUIZ
                </button>

                <button
                  onClick={() => handleEndSession(monitoringCode)}
                  className="bg-gray-800 hover:bg-gray-900 text-white text-xs font-bold px-3 py-2 rounded-full shadow-md transition-all"
                >
                  Terminate
                </button>

                <button
                  onClick={() => setMonitoringCode(null)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-bold px-3 py-2 rounded-full"
                >
                  Minimize
                </button>
              </div>
            </div>

            {/* Live Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <div className="bg-gray-50 rounded-2xl p-4 text-center border border-gray-100">
                <p className="text-xs text-gray-500 font-bold uppercase">Participants</p>
                <p className="text-2xl font-black text-black">{participantsCount}</p>
                <span className="text-[10px] text-purple-600 font-bold uppercase mt-1 inline-block">
                  Mode: {monitorMode}
                </span>
              </div>

              <div className="bg-gray-50 rounded-2xl p-4 text-center border border-gray-100">
                <p className="text-xs text-gray-500 font-bold uppercase">Sub-Room Sharding</p>
                <p className="text-xs font-mono font-bold text-gray-700 mt-1">
                  A: {roomStats.A || 0} | B: {roomStats.B || 0} | C: {roomStats.C || 0}
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-4 text-center border border-gray-100">
                <p className="text-xs text-gray-500 font-bold uppercase">Round Time</p>
                <p className="text-2xl font-black text-[#7c3aed]">{monitorTimeLeft}s</p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-4 text-center border border-gray-100">
                <p className="text-xs text-gray-500 font-bold uppercase">Answer Submissions</p>
                <p className="text-2xl font-black text-emerald-600">{submittedAnswersCount}</p>
              </div>
            </div>

            {/* Current Active Question Display */}
            {currentQuestion && (
              <div className="bg-purple-50 rounded-2xl p-5 mb-6 border border-purple-100">
                <div className="flex items-center justify-between text-xs text-purple-700 font-bold mb-2">
                  <span>
                    QUESTION {currentQuestion.index + 1} OF {currentQuestion.total}
                  </span>
                  {revealedAnswer && (
                    <span className="bg-emerald-600 text-white px-2 py-0.5 rounded-full">
                      REVEALED ANSWER: {revealedAnswer}
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-base sm:text-lg text-black mb-3">
                  {currentQuestion.question}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentQuestion.options?.map((opt: string, idx: number) => {
                    const letter = String.fromCharCode(65 + idx);
                    const isCorrect = revealedAnswer === opt;
                    return (
                      <div
                        key={idx}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 border ${
                          isCorrect
                            ? 'bg-emerald-100 border-emerald-400 text-emerald-900 font-bold'
                            : 'bg-white border-gray-200 text-gray-800'
                        }`}
                      >
                        <span className="w-5 h-5 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center text-[10px]">
                          {letter}
                        </span>
                        <span>{opt}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Live Leaderboards Side-by-Side (or Full Width in Individual Mode) */}
            {monitorMode === 'individual' ? (
              /* INDIVIDUAL MODE: Only Player Names */
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-black text-sm uppercase tracking-wide text-gray-700 flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#7c3aed]" />
                    Individual Solo Leaderboard ({individualRanks.length} Players)
                  </h4>
                  {/* Export CSV Controls */}
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-gray-400 font-bold">Top %:</span>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={topPercentFilter}
                      onChange={(e) => setTopPercentFilter(e.target.value)}
                      className="w-14 bg-gray-100 border border-gray-200 rounded-lg px-2 py-1 text-xs text-center font-bold"
                    />
                    <button
                      onClick={exportRankingsCsv}
                      className="bg-black text-white hover:bg-gray-800 text-xs font-bold px-3 py-1 rounded-lg flex items-center gap-1 transition-all"
                    >
                      <Download className="w-3 h-3" />
                      EXPORT PLAYERS CSV
                    </button>
                  </div>
                </div>

                <div className="max-h-72 overflow-y-auto space-y-1.5 border border-gray-100 rounded-2xl p-3 bg-gray-50">
                  {individualRanks.length === 0 ? (
                    <p className="text-center text-xs text-gray-400 py-6">Waiting for players...</p>
                  ) : (
                    individualRanks.map((u) => (
                      <div
                        key={u.id}
                        className="flex items-center justify-between bg-white px-4 py-2.5 rounded-xl text-xs font-semibold shadow-sm"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 font-black text-gray-500 text-center">#{u.rank}</span>
                          <span className="font-bold text-black text-sm">{u.name}</span>
                          {u.room && (
                            <span className="text-[9px] bg-purple-100 text-purple-700 px-1.5 py-0.2 rounded font-bold">
                              Room {u.room}
                            </span>
                          )}
                        </div>
                        <span className="font-black text-base text-[#7c3aed]">{u.score} pts</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ) : (
              /* TEAM MODE: Teams with all member names & individual standings */
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Team Leaderboard */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-black text-sm uppercase tracking-wide text-gray-700 flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-amber-500" />
                      Team Standings ({teamRanks.length})
                    </h4>
                    {/* Export CSV Controls */}
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-gray-400 font-bold">Top %:</span>
                      <input
                        type="number"
                        min="1"
                        max="100"
                        value={topPercentFilter}
                        onChange={(e) => setTopPercentFilter(e.target.value)}
                        className="w-14 bg-gray-100 border border-gray-200 rounded-lg px-2 py-1 text-xs text-center font-bold"
                      />
                      <button
                        onClick={exportRankingsCsv}
                        className="bg-black text-white hover:bg-gray-800 text-xs font-bold px-3 py-1 rounded-lg flex items-center gap-1 transition-all"
                      >
                        <Download className="w-3 h-3" />
                        EXPORT CSV
                      </button>
                    </div>
                  </div>

                  <div className="max-h-72 overflow-y-auto space-y-2 border border-gray-100 rounded-2xl p-2 bg-gray-50">
                    {teamRanks.length === 0 ? (
                      <p className="text-center text-xs text-gray-400 py-6">No teams scored yet</p>
                    ) : (
                      teamRanks.map((t) => (
                        <div
                          key={t.name}
                          className="bg-white p-3 rounded-xl text-xs font-semibold shadow-sm"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span
                                className={`w-6 h-6 rounded-full flex items-center justify-center font-black text-[10px] ${
                                  t.rank === 1
                                    ? 'bg-amber-400 text-black'
                                    : t.rank === 2
                                    ? 'bg-gray-300 text-black'
                                    : t.rank === 3
                                    ? 'bg-amber-700 text-white'
                                    : 'bg-gray-100 text-gray-600'
                                }`}
                              >
                                {t.rank}
                              </span>
                              <span className="font-bold text-black uppercase text-sm">{t.name}</span>
                              <span className="text-[10px] text-gray-400 font-normal">
                                ({t.members} player{t.members !== 1 ? 's' : ''})
                              </span>
                            </div>
                            <span className="font-black text-[#7c3aed] text-sm">{t.score} pts</span>
                          </div>

                          {/* All Member Names Returned With Team Names */}
                          {t.memberNames && t.memberNames.length > 0 && (
                            <div className="mt-2 pt-2 border-t border-gray-100 flex flex-wrap items-center gap-1.5 pl-8">
                              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                                Members:
                              </span>
                              {t.memberNames.map((m, mIdx) => (
                                <span
                                  key={mIdx}
                                  className="bg-purple-50 border border-purple-100 text-purple-800 text-[10px] font-bold px-2 py-0.5 rounded-full"
                                >
                                  {m}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Individual Leaderboard (in Team Mode) */}
                <div>
                  <h4 className="font-black text-sm uppercase tracking-wide text-gray-700 mb-3 flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#7c3aed]" />
                    Top Players ({individualRanks.length})
                  </h4>

                  <div className="max-h-72 overflow-y-auto space-y-1.5 border border-gray-100 rounded-2xl p-2 bg-gray-50">
                    {individualRanks.length === 0 ? (
                      <p className="text-center text-xs text-gray-400 py-6">Waiting for players...</p>
                    ) : (
                      individualRanks.map((u) => (
                        <div
                          key={u.id}
                          className="flex items-center justify-between bg-white px-3 py-2 rounded-xl text-xs font-semibold shadow-sm"
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-5 font-black text-gray-500 text-center">#{u.rank}</span>
                            <span className="font-bold text-black">{u.name}</span>
                            {u.team && (
                              <span className="text-[10px] text-gray-400 uppercase font-medium">
                                [{u.team}]
                              </span>
                            )}
                            {u.room && (
                              <span className="text-[9px] bg-purple-100 text-purple-700 px-1.5 py-0.2 rounded font-bold">
                                Room {u.room}
                              </span>
                            )}
                          </div>
                          <span className="font-black text-black">{u.score} pts</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              SCHEDULED QUIZZES
            </h2>
            <p className="text-xs sm:text-sm text-white/70">
              Create, edit, launch, or manage scheduled quiz tournaments
            </p>
          </div>

          <button
            onClick={() => {
              socket.emit('get-scheduled-quizzes', (list: ScheduledQuiz[]) => {
                if (Array.isArray(list)) setQuizzes(list);
              });
              toast.success('Refreshed quiz list');
            }}
            className="text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-all"
            title="Refresh List"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* Quiz Cards Grid */}
        {quizzes.length === 0 ? (
          <div className="qz-card p-12 text-center max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-purple-100 text-[#7c3aed] mx-auto mb-4 flex items-center justify-center">
              <FileText className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-black mb-2">No Quizzes Scheduled</h3>
            <p className="text-sm text-gray-500 mb-6">
              Get started by scheduling your first tournament or importing a CSV question bank.
            </p>
            <button
              onClick={() => openScheduleModal()}
              className="bg-[#7c3aed] text-white font-bold py-3 px-6 rounded-full inline-flex items-center gap-2 shadow-lg hover:bg-[#6d28d9] transition-all"
            >
              <Plus className="w-4 h-4" />
              SCHEDULE FIRST QUIZ
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => {
              const isLive = Boolean(activeSessionCodes[quiz.code]);
              const sessionInfo = activeSessionCodes[quiz.code];

              return (
                <div
                  key={quiz.code}
                  className="qz-card p-6 flex flex-col justify-between transition-transform hover:-translate-y-1"
                >
                  <div>
                    {/* Card Header & Status */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
                          CODE: {quiz.code}
                        </span>
                        <h3 className="font-black text-lg text-black mt-1 line-clamp-1">
                          {quiz.title}
                        </h3>
                      </div>

                      <div className="flex flex-col items-end gap-1">
                        {isLive ? (
                          <span className="flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase px-2.5 py-1 rounded-full animate-pulse">
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            LIVE ({sessionInfo?.participants || 0})
                          </span>
                        ) : (
                          <span className="bg-gray-100 text-gray-600 text-[10px] font-black uppercase px-2 py-1 rounded-full">
                            SCHEDULED
                          </span>
                        )}
                        <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                          quiz.mode === 'individual'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-purple-50 text-purple-700 border border-purple-200'
                        }`}>
                          {quiz.mode === 'individual' ? '👤 Solo' : '👥 Team Battle'}
                        </span>
                      </div>
                    </div>

                    {/* Metadata chips */}
                    <div className="space-y-2 text-xs text-gray-600 mb-6">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        <span>
                          {new Date(quiz.startTime).toLocaleString(undefined, {
                            dateStyle: 'medium',
                            timeStyle: 'short',
                          })}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Layers className="w-3.5 h-3.5 text-gray-400" />
                        <span>
                          <strong>{quiz.questions?.length || 0}</strong> Questions •{' '}
                          <strong>{quiz.questionDuration || 10}s</strong> per question
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 text-gray-400" />
                        <span>
                          Sub-Rooms:{' '}
                          <span className="font-semibold text-black">
                            {quiz.enableRooms ? 'Enabled (A/B/C)' : 'Single Room'}
                          </span>
                        </span>
                      </div>
                    </div>

                    {/* Shareable Link Box */}
                    <div className="bg-gray-50 border border-gray-100 rounded-xl p-2.5 flex items-center justify-between mb-6">
                      <div className="truncate mr-2">
                        <span className="text-[10px] text-gray-400 block font-bold">JOIN CODE</span>
                        <span className="font-mono font-black text-black text-sm tracking-wider">
                          {quiz.code}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => copyToClipboard(quiz.code, quiz.code)}
                          title="Copy Code"
                          className="p-1.5 hover:bg-gray-200 rounded-lg text-gray-600 transition-all"
                        >
                          {copiedCode === quiz.code ? (
                            <Check className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-2">
                    {isLive ? (
                      <div className="flex-1 flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setMonitoringCode(quiz.code);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md"
                        >
                          <Eye className="w-4 h-4" />
                          MONITOR
                        </button>
                        <button
                          onClick={() => handleForceEndQuiz(quiz.code)}
                          title="Force End Quiz"
                          className="bg-red-600 hover:bg-red-700 text-white text-xs font-black py-2.5 px-3 rounded-xl flex items-center gap-1 transition-all shadow-md"
                        >
                          <AlertCircle className="w-3.5 h-3.5" />
                          END
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleStartSession(quiz)}
                        className="flex-1 bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-black text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md"
                      >
                        <Play className="w-4 h-4 fill-white" />
                        START NOW
                      </button>
                    )}

                    <button
                      onClick={() => openScheduleModal(quiz)}
                      disabled={isLive}
                      title="Edit Quiz"
                      className="p-2.5 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 text-gray-700 rounded-xl transition-all"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleDeleteQuiz(quiz.code)}
                      disabled={isLive}
                      title="Delete Quiz"
                      className="p-2.5 bg-red-50 hover:bg-red-100 disabled:opacity-40 text-red-600 rounded-xl transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* ========================================================
          SCHEDULE / EDIT QUIZ MODAL (3-STEP WIZARD)
         ======================================================== */}
      <AnimatePresence>
        {isScheduleOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl text-black my-8"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#7c3aed]">
                    {editingCode ? `EDITING QUIZ #${editingCode}` : 'NEW TOURNAMENT'}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-black tracking-tight">
                    {scheduleStep === 1 && 'Step 1 — Tournament Details'}
                    {scheduleStep === 2 && 'Step 2 — Questions Repository'}
                    {scheduleStep === 3 && 'Step 3 — Review & Confirm'}
                  </h3>
                </div>
                <button
                  onClick={() => setIsScheduleOpen(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Progress Steps Indicators */}
              <div className="flex items-center justify-between gap-2 mb-6 text-xs font-bold">
                <div
                  className={`flex-1 py-1.5 text-center rounded-lg border ${
                    scheduleStep >= 1
                      ? 'bg-purple-50 text-[#7c3aed] border-purple-200'
                      : 'bg-gray-50 text-gray-400 border-gray-100'
                  }`}
                >
                  1. Details
                </div>
                <div
                  className={`flex-1 py-1.5 text-center rounded-lg border ${
                    scheduleStep >= 2
                      ? 'bg-purple-50 text-[#7c3aed] border-purple-200'
                      : 'bg-gray-50 text-gray-400 border-gray-100'
                  }`}
                >
                  2. Questions ({formQuestions.length})
                </div>
                <div
                  className={`flex-1 py-1.5 text-center rounded-lg border ${
                    scheduleStep >= 3
                      ? 'bg-purple-50 text-[#7c3aed] border-purple-200'
                      : 'bg-gray-50 text-gray-400 border-gray-100'
                  }`}
                >
                  3. Confirm
                </div>
              </div>

              {/* STEP 1: DETAILS */}
              {scheduleStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-600 mb-1">
                      Quiz Title *
                    </label>
                    <input
                      type="text"
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      placeholder="e.g., Campus Placement Aptitude Battle 2026"
                      className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-black font-semibold focus:border-[#7c3aed] focus:outline-none"
                    />
                  </div>

                  {/* Competition Format Selector (Team vs Individual) */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-600 mb-2">
                      Tournament Format *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setFormMode('team')}
                        className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                          formMode === 'team'
                            ? 'border-[#7c3aed] bg-purple-50 text-black shadow-sm'
                            : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Users className="w-4 h-4 text-[#7c3aed]" />
                          <span className="font-black text-sm">Team Battle</span>
                        </div>
                        <p className="text-[11px] text-gray-500">
                          Players belong to teams. Shows team standings with all member names & individual scores.
                        </p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setFormMode('individual')}
                        className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                          formMode === 'individual'
                            ? 'border-[#7c3aed] bg-purple-50 text-black shadow-sm'
                            : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Award className="w-4 h-4 text-[#7c3aed]" />
                          <span className="font-black text-sm">Individual Solo</span>
                        </div>
                        <p className="text-[11px] text-gray-500">
                          Solo tournament. Players enter only their name (no team). Standings return player names only.
                        </p>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-600 mb-1">
                        Scheduled Start Time
                      </label>
                      <input
                        type="datetime-local"
                        value={formStartTime}
                        onChange={(e) => setFormStartTime(e.target.value)}
                        className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-black font-semibold focus:border-[#7c3aed] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-600 mb-1">
                        Question Duration (Seconds)
                      </label>
                      <input
                        type="number"
                        min="5"
                        max="120"
                        value={formQDuration}
                        onChange={(e) => setFormQDuration(Number(e.target.value))}
                        className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-black font-semibold focus:border-[#7c3aed] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-600 mb-1">
                        Gap Between Questions (Seconds)
                      </label>
                      <input
                        type="number"
                        min="2"
                        max="30"
                        value={formGapDuration}
                        onChange={(e) => setFormGapDuration(Number(e.target.value))}
                        className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-black font-semibold focus:border-[#7c3aed] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-600 mb-1">
                        Room Sharding (150+ Players)
                      </label>
                      <label className="flex items-center gap-3 bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formEnableRooms}
                          onChange={(e) => setFormEnableRooms(e.target.checked)}
                          className="w-4 h-4 accent-[#7c3aed]"
                        />
                        <span className="text-xs font-semibold text-gray-700">
                          Enable Sub-Rooms (A, B, C)
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: QUESTIONS */}
              {scheduleStep === 2 && (
                <div className="space-y-4">
                  {/* Mode Selector */}
                  <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                    <button
                      type="button"
                      onClick={() => setFormInputMode('manual')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        formInputMode === 'manual'
                          ? 'bg-[#7c3aed] text-white'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      Question List ({formQuestions.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormInputMode('csv')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        formInputMode === 'csv'
                          ? 'bg-[#7c3aed] text-white'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      CSV Upload
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setFormQuestions([...QUIZ_QUESTIONS]);
                        toast.success('Loaded 5 standard aptitude questions');
                      }}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold bg-gray-100 hover:bg-gray-200 text-gray-700 ml-auto"
                    >
                      Reset to Defaults
                    </button>
                  </div>

                  {/* Manual Question Editor Mode */}
                  {formInputMode === 'manual' && (
                    <div className="max-h-72 overflow-y-auto space-y-3 pr-1">
                      {formQuestions.map((q, idx) => (
                        <div
                          key={idx}
                          className="p-3 bg-gray-50 border border-gray-200 rounded-xl relative"
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <span className="font-bold text-xs text-[#7c3aed]">
                              #{idx + 1} Question
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                setFormQuestions(formQuestions.filter((_, i) => i !== idx));
                              }}
                              className="text-gray-400 hover:text-red-500 text-xs"
                            >
                              Remove
                            </button>
                          </div>
                          <input
                            type="text"
                            value={q.question}
                            onChange={(e) => {
                              const updated = [...formQuestions];
                              updated[idx].question = e.target.value;
                              setFormQuestions(updated);
                            }}
                            className="w-full bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold mb-2 focus:border-[#7c3aed] focus:outline-none"
                            placeholder="Question text..."
                          />

                          <div className="grid grid-cols-2 gap-1.5">
                            {q.options.map((opt, optIdx) => {
                              const letter = String.fromCharCode(65 + optIdx);
                              const isCorrect = q.answer === opt;
                              return (
                                <div key={optIdx} className="flex items-center gap-1">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const updated = [...formQuestions];
                                      updated[idx].answer = opt;
                                      setFormQuestions(updated);
                                    }}
                                    className={`w-5 h-5 rounded-full text-[10px] font-black flex items-center justify-center flex-shrink-0 ${
                                      isCorrect
                                        ? 'bg-emerald-600 text-white'
                                        : 'bg-gray-200 text-gray-600'
                                    }`}
                                    title="Mark as correct answer"
                                  >
                                    {letter}
                                  </button>
                                  <input
                                    type="text"
                                    value={opt}
                                    onChange={(e) => {
                                      const updated = [...formQuestions];
                                      const wasAnswer = updated[idx].answer === updated[idx].options[optIdx];
                                      updated[idx].options[optIdx] = e.target.value;
                                      if (wasAnswer) updated[idx].answer = e.target.value;
                                      setFormQuestions(updated);
                                    }}
                                    className="w-full bg-white border border-gray-200 rounded-md px-2 py-1 text-xs"
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={() => {
                          setFormQuestions([
                            ...formQuestions,
                            {
                              id: formQuestions.length + 1,
                              question: 'New Question Prompt',
                              options: ['Option A', 'Option B', 'Option C', 'Option D'],
                              answer: 'Option A',
                            },
                          ]);
                        }}
                        className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-xs flex items-center justify-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Question
                      </button>
                    </div>
                  )}

                  {/* CSV Upload Mode */}
                  {formInputMode === 'csv' && (
                    <div className="space-y-4">
                      <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-[#7c3aed] transition-colors">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-xs font-bold text-gray-700">
                          Upload CSV file with format:
                        </p>
                        <p className="text-[11px] font-mono text-gray-500 mt-1">
                          question,OptionA,OptionB,OptionC,OptionD,Correct
                        </p>
                        <input
                          type="file"
                          accept=".csv"
                          onChange={(e) => {
                            if (e.target.files?.[0]) handleCsvUpload(e.target.files[0]);
                          }}
                          className="mt-3 block mx-auto text-xs text-gray-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#7c3aed] file:text-white hover:file:bg-[#6d28d9]"
                        />
                      </div>

                      {csvError && (
                        <p className="text-red-500 text-xs font-bold">{csvError}</p>
                      )}

                      <div>
                        <label className="block text-xs font-bold uppercase text-gray-600 mb-1">
                          Or Paste Raw CSV Data:
                        </label>
                        <textarea
                          rows={4}
                          value={csvRawText}
                          onChange={(e) => setCsvRawText(e.target.value)}
                          placeholder="question,OptionA,OptionB,OptionC,OptionD,Correct&#10;What is 2+2?,3,4,5,6,B"
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs font-mono focus:border-[#7c3aed] focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => parseCsvText(csvRawText)}
                          className="mt-2 bg-black text-white px-4 py-1.5 rounded-lg text-xs font-bold"
                        >
                          Parse Pasted CSV
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 3: REVIEW & CONFIRM */}
              {scheduleStep === 3 && (
                <div className="space-y-4">
                  <div className="bg-purple-50 border border-purple-100 rounded-2xl p-5">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className="font-black text-lg text-[#7c3aed]">
                        {formTitle || 'Untitled Quiz'}
                      </h4>
                      <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${
                        formMode === 'individual'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-purple-200 text-purple-900'
                      }`}>
                        {formMode === 'individual' ? '👤 Individual Solo' : '👥 Team Battle'}
                      </span>
                    </div>
                    <p className="text-xs text-purple-700">
                      Scheduled for:{' '}
                      <strong>
                        {new Date(formStartTime || Date.now()).toLocaleString()}
                      </strong>
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                    <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                      <p className="text-[10px] text-gray-500 uppercase font-bold">Total Questions</p>
                      <p className="text-xl font-black text-black">{formQuestions.length}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                      <p className="text-[10px] text-gray-500 uppercase font-bold">Duration</p>
                      <p className="text-xl font-black text-black">{formQDuration}s</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                      <p className="text-[10px] text-gray-500 uppercase font-bold">Gap Between</p>
                      <p className="text-xl font-black text-black">{formGapDuration}s</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                      <p className="text-[10px] text-gray-500 uppercase font-bold">Format</p>
                      <p className="text-sm font-black text-[#7c3aed]">
                        {formMode === 'individual' ? 'Solo' : 'Teams'}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500">
                    {formMode === 'individual'
                      ? 'Players join using only their name. Individual ranking will be computed.'
                      : 'Players join with team name and their own name. Both team and individual rankings will be computed.'}
                  </p>
                </div>
              )}

              {/* Modal Footer Controls */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-6">
                {scheduleStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => setScheduleStep((s) => (s - 1) as any)}
                    className="flex items-center gap-1 text-xs font-bold text-gray-600 hover:text-black"
                  >
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>
                ) : (
                  <div />
                )}

                {scheduleStep < 3 ? (
                  <button
                    type="button"
                    onClick={() => {
                      if (scheduleStep === 1 && !formTitle.trim()) {
                        toast.error('Please enter a Quiz Title.');
                        return;
                      }
                      if (scheduleStep === 2 && formQuestions.length === 0) {
                        toast.error('Add at least 1 question.');
                        return;
                      }
                      setScheduleStep((s) => (s + 1) as any);
                    }}
                    className="bg-[#7c3aed] text-white px-6 py-2.5 rounded-full text-xs font-black flex items-center gap-1 shadow-md hover:bg-[#6d28d9]"
                  >
                    Next Step <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleScheduleSubmit}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full text-xs font-black shadow-lg flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    {editingCode ? 'SAVE CHANGES' : 'SCHEDULE TOURNAMENT NOW'}
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
