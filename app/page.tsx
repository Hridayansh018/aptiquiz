'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import socket from '@/lib/socket';
import toast from 'react-hot-toast';
import { Zap, Play, Users, Trophy } from 'lucide-react';

export default function JoinPage() {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [team, setTeam] = useState('');
  const [quizMode, setQuizMode] = useState<'team' | 'individual' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!socket.connected) socket.connect();
  }, []);

  // Detect quiz mode when a full 6-character code is entered
  useEffect(() => {
    if (code.trim().length === 6) {
      socket.emit('get-quiz-mode', { code: code.trim().toUpperCase() }, (res: any) => {
        if (res && res.found) {
          setQuizMode(res.mode || 'team');
        } else {
          setQuizMode(null);
        }
      });
    } else {
      setQuizMode(null);
    }
  }, [code]);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    const isIndiv = quizMode === 'individual';
    if (!code || !name || (!isIndiv && !team)) {
      toast.error(isIndiv ? 'Please enter Quiz Code and Your Name' : 'Please fill in all fields');
      return;
    }
    setIsLoading(true);
    socket.emit('join-session', { code: code.toUpperCase(), name, team: isIndiv ? '' : team }, (response: any) => {
      setIsLoading(false);
      if (response.success) {
        toast.success('Joined successfully!');
        sessionStorage.setItem('quiz_user', JSON.stringify({
          name,
          team: isIndiv ? '' : team,
          code: code.toUpperCase(),
          mode: response.mode || quizMode || 'team'
        }));
        router.push(`/quiz/${code.toUpperCase()}`);
      } else {
        toast.error(response.message || 'Failed to join');
      }
    });
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Decorative blobs */}
      <div
        className="absolute -top-40 -left-40 w-[28rem] h-[28rem] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.10) 0%, transparent 70%)' }}
      />
      <div
        className="absolute -bottom-40 -right-40 w-[32rem] h-[32rem] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(109,40,217,0.55) 0%, transparent 70%)' }}
      />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2.5 mb-8"
      >
        <div className="w-10 h-10 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center">
          <Zap className="w-5 h-5 text-white fill-white" />
        </div>
        <div className="flex flex-col leading-none">
          <span className="font-black text-xl text-white tracking-tight">QUITZO</span>
          <span className="text-[10px] text-white/70 font-bold tracking-widest uppercase">APTIQUIZ</span>
        </div>
      </motion.div>

      {/* Hero headline */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.08, type: 'spring', stiffness: 200, damping: 20 }}
        className="text-6xl sm:text-8xl font-black text-white tracking-tight text-center mb-10 select-none"
        style={{ textShadow: '0 4px 24px rgba(0,0,0,0.25)' }}
      >
        QUIZ TIME
      </motion.h1>

      {/* Join card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, type: 'spring', stiffness: 160, damping: 22 }}
        className="qz-card w-full max-w-md p-8 space-y-6"
      >
        <div className="text-center">
          <p className="text-[#7c3aed] font-black text-xs uppercase tracking-widest mb-1">Join Session</p>
          <h2 className="text-2xl font-black text-black">Enter your details</h2>
        </div>

        <form onSubmit={handleJoin} className="space-y-4">
          {/* Quiz Code */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="quiz-code" className="text-xs font-black uppercase tracking-widest text-[#7c3aed] block">
                Quiz Code
              </label>
              {quizMode && (
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                  quizMode === 'individual' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                }`}>
                  {quizMode === 'individual' ? '👤 Solo Mode' : '👥 Team Mode'}
                </span>
              )}
            </div>
            <input
              id="quiz-code"
              type="text"
              placeholder="e.g. AB1234"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              maxLength={6}
              className="w-full border-2 border-[#7c3aed]/30 rounded-2xl px-4 py-3.5 text-black font-black text-center text-2xl tracking-widest uppercase font-mono placeholder-gray-300 focus:outline-none focus:border-[#7c3aed] transition-all"
            />
          </div>

          {/* Team Name - Only shown if not in individual mode */}
          {quizMode !== 'individual' && (
            <div className="space-y-1.5">
              <label htmlFor="team-name" className="text-xs font-black uppercase tracking-widest text-[#7c3aed] block">
                Team Name
              </label>
              <input
                id="team-name"
                type="text"
                placeholder="The Avengers"
                value={team}
                onChange={(e) => setTeam(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3.5 text-black font-semibold placeholder-gray-300 focus:outline-none focus:border-[#7c3aed] transition-all"
              />
            </div>
          )}

          {/* Your Name */}
          <div className="space-y-1.5">
            <label htmlFor="player-name" className="text-xs font-black uppercase tracking-widest text-[#7c3aed] block">
              Your Name
            </label>
            <input
              id="player-name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3.5 text-black font-semibold placeholder-gray-300 focus:outline-none focus:border-[#7c3aed] transition-all"
            />
          </div>

          <button
            id="join-btn"
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2.5 bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-black rounded-2xl py-4 text-lg transition-all active:scale-[0.98] disabled:opacity-60 shadow-lg mt-2"
            style={{ boxShadow: '0 4px 0 rgba(0,0,0,0.2)' }}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Play className="w-5 h-5 fill-current" />
                JOIN QUIZ
              </>
            )}
          </button>
        </form>

        {/* Footer stats */}
        <div className="flex items-center justify-center gap-5 pt-2 text-xs text-gray-400 font-semibold">
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" />
            <span>Real-time Sync</span>
          </div>
          <div className="w-1 h-1 bg-gray-300 rounded-full" />
          <div className="flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5" />
            <span>Live Leaderboard</span>
          </div>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8 text-white/50 text-xs font-semibold text-center"
      >
        Get the quiz code from your host
      </motion.p>
    </div>
  );
}
