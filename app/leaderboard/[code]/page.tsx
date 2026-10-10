'use client';

import React, { useState, useEffect, use } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import socket from '@/lib/socket';
import {
  Trophy,
  Users,
  Award,
  Zap,
  Sparkles,
  Radio,
  Clock,
  CheckCircle,
  HelpCircle,
  AlertTriangle,
  User,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface LeaderboardProps {
  params: Promise<{ code: string }>;
}

interface UserEntry {
  rank: number;
  id: string;
  name: string;
  team?: string;
  score: number;
  connected: boolean;
  room?: string;
}

interface TeamEntry {
  rank: number;
  name: string;
  score: number;
  members: number;
  memberNames?: string[];
}

export default function LeaderboardPage({ params }: LeaderboardProps) {
  const resolvedParams = use(params);
  const code = resolvedParams.code.toUpperCase();

  const [status, setStatus] = useState<'waiting' | 'active' | 'finished'>('waiting');
  const [mode, setMode] = useState<'team' | 'individual'>('team');
  const [individuals, setIndividuals] = useState<UserEntry[]>([]);
  const [teams, setTeams] = useState<TeamEntry[]>([]);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState<number>(0);
  const [totalQuestions, setTotalQuestions] = useState<number>(0);
  const [questionText, setQuestionText] = useState<string>('');
  const [countdown, setCountdown] = useState<number | null>(null);
  const [forceEnded, setForceEnded] = useState<boolean>(false);

  useEffect(() => {
    if (!socket.connected) socket.connect();

    // Join as Observer
    socket.emit('join-observer', { code }, (res: any) => {
      if (res && res.success) {
        if (res.mode) setMode(res.mode);
        if (res.leaderboard) {
          setIndividuals(res.leaderboard.individuals || []);
          setTeams(res.leaderboard.teams || []);
          if (res.leaderboard.mode) setMode(res.leaderboard.mode);
        }
        if (res.status) setStatus(res.status);
      }
    });

    const onQuizStarting = (data: { countdown: number }) => {
      setStatus('waiting');
      setCountdown(data.countdown);
    };

    const onNewQuestion = (data: { question: any }) => {
      setCountdown(null);
      setStatus('active');
      if (data.question) {
        setCurrentQuestionNumber(data.question.index + 1);
        setTotalQuestions(data.question.total);
        setQuestionText(data.question.question);
      }
    };

    const onLeaderboardReveal = (data: { individual: UserEntry[]; teams: TeamEntry[] }) => {
      if (data.individual) setIndividuals(data.individual);
      if (data.teams) setTeams(data.teams);
    };

    const onQuizFinished = (data: {
      leaderboard: { individuals: UserEntry[]; teams: TeamEntry[]; mode?: 'team' | 'individual' };
      forceEnded?: boolean;
    }) => {
      setStatus('finished');
      if (data.forceEnded) setForceEnded(true);
      if (data.leaderboard) {
        setIndividuals(data.leaderboard.individuals || []);
        setTeams(data.leaderboard.teams || []);
        if (data.leaderboard.mode) setMode(data.leaderboard.mode);
      }
      try {
        confetti({ particleCount: 140, spread: 80, origin: { y: 0.6 } });
      } catch (e) {}
    };

    socket.on('quiz-starting', onQuizStarting);
    socket.on('new-question', onNewQuestion);
    socket.on('leaderboard-reveal', onLeaderboardReveal);
    socket.on('quiz-finished', onQuizFinished);

    return () => {
      socket.off('quiz-starting', onQuizStarting);
      socket.off('new-question', onNewQuestion);
      socket.off('leaderboard-reveal', onLeaderboardReveal);
      socket.off('quiz-finished', onQuizFinished);
    };
  }, [code]);

  const isIndiv = mode === 'individual';

  return (
    <div className="min-h-screen text-white p-4 sm:p-8 flex flex-col justify-between">
      {/* Top Banner Header */}
      <header className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center shadow-lg">
            <Zap className="w-6 h-6 text-white fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-black text-2xl sm:text-3xl tracking-tight text-white">
                APTIQUIZ ARENA
              </h1>
              <span className="bg-white/20 text-white font-mono font-black text-xs px-2.5 py-1 rounded-full border border-white/30">
                #{code}
              </span>
              <span
                className={`font-black text-[11px] px-2.5 py-1 rounded-full uppercase tracking-wider ${
                  isIndiv
                    ? 'bg-amber-400 text-black'
                    : 'bg-purple-300 text-purple-950 font-extrabold'
                }`}
              >
                {isIndiv ? 'Solo Player' : 'Team Battle'}
              </span>
            </div>
            <p className="text-xs text-white/70">Stage Projector & Real-time Live Standings</p>
          </div>
        </div>

        {/* Status Pill */}
        <div className="flex items-center gap-3">
          {forceEnded && (
            <div className="bg-red-500 text-white font-black text-xs px-3.5 py-2 rounded-full flex items-center gap-1.5 shadow-md animate-pulse">
              <AlertTriangle className="w-4 h-4" /> FORCE ENDED BY HOST
            </div>
          )}

          {status === 'waiting' && !forceEnded && (
            <div className="bg-amber-400 text-black font-black text-xs px-4 py-2 rounded-full flex items-center gap-2 shadow-md">
              <Clock className="w-4 h-4 animate-spin" />
              {countdown ? `STARTING IN ${countdown}...` : 'WAITING FOR HOST TO START'}
            </div>
          )}

          {status === 'active' && !forceEnded && (
            <div className="bg-emerald-400 text-black font-black text-xs px-4 py-2 rounded-full flex items-center gap-2 shadow-md animate-pulse">
              <Radio className="w-4 h-4" />
              QUESTION {currentQuestionNumber} OF {totalQuestions}
            </div>
          )}

          {status === 'finished' && !forceEnded && (
            <div className="bg-white text-black font-black text-xs px-5 py-2 rounded-full flex items-center gap-2 shadow-lg">
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
              FINAL RESULTS
            </div>
          )}
        </div>
      </header>

      {/* Main Standings */}
      {isIndiv ? (
        /* ── Solo Individual Standings Mode ── */
        <main className="flex-1 mb-8 max-w-4xl mx-auto w-full">
          <div className="qz-card p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-[#7c3aed]">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-black text-xl text-black">SOLO LEADERBOARD</h2>
                  <p className="text-xs text-gray-500 font-semibold">
                    Individual players ranked by accuracy and speed
                  </p>
                </div>
              </div>
              <span className="font-mono text-xs font-bold bg-purple-50 text-[#7c3aed] px-3 py-1.5 rounded-full border border-purple-200">
                {individuals.length} Competitors
              </span>
            </div>

            {individuals.length === 0 ? (
              <div className="text-center py-20 text-gray-400 text-sm font-semibold">
                Waiting for solo players to join and answer questions...
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[62vh] overflow-y-auto pr-1">
                {individuals.map((user, idx) => (
                  <motion.div
                    key={user.id}
                    layout
                    className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                      idx === 0
                        ? 'bg-amber-50/80 border-amber-300 shadow-sm'
                        : idx === 1
                        ? 'bg-gray-50 border-gray-200'
                        : idx === 2
                        ? 'bg-amber-50/40 border-amber-200'
                        : 'bg-white border-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs ${
                          idx === 0
                            ? 'bg-amber-400 text-black shadow-sm'
                            : idx === 1
                            ? 'bg-gray-300 text-black'
                            : idx === 2
                            ? 'bg-amber-700 text-white'
                            : 'bg-purple-100 text-[#7c3aed]'
                        }`}
                      >
                        #{user.rank}
                      </span>
                      <div>
                        <span className="font-black text-base text-black block">{user.name}</span>
                        <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
                          Solo Player
                        </span>
                      </div>
                    </div>
                    <span className="font-black text-lg text-[#7c3aed]">
                      {user.score.toLocaleString()} pts
                    </span>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </main>
      ) : (
        /* ── Team Battle Dual Column Standings Mode ── */
        <main className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 mb-8">
          {/* Left Column: Team Rankings */}
          <div className="qz-card p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-black text-lg text-black">TEAM RANKINGS</h2>
                    <p className="text-[11px] text-gray-500 font-semibold">
                      Aggregated scores across all team members
                    </p>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold bg-gray-100 px-2.5 py-1 rounded-full text-gray-700">
                  {teams.length} Teams
                </span>
              </div>

              {/* List */}
              <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                {teams.length === 0 ? (
                  <div className="text-center py-16 text-gray-400 text-sm font-semibold">
                    Waiting for teams to answer questions...
                  </div>
                ) : (
                  teams.map((team, idx) => (
                    <motion.div
                      key={team.name}
                      layout
                      className={`p-4 rounded-2xl border transition-all ${
                        idx === 0
                          ? 'bg-amber-50/80 border-amber-300 shadow-sm'
                          : idx === 1
                          ? 'bg-gray-50 border-gray-200'
                          : idx === 2
                          ? 'bg-amber-50/40 border-amber-200'
                          : 'bg-white border-gray-100'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-7 h-7 rounded-full flex items-center justify-center font-black text-xs ${
                              idx === 0
                                ? 'bg-amber-400 text-black'
                                : idx === 1
                                ? 'bg-gray-300 text-black'
                                : idx === 2
                                ? 'bg-amber-700 text-white'
                                : 'bg-gray-100 text-gray-500'
                            }`}
                          >
                            {team.rank}
                          </span>
                          <div>
                            <span className="font-black text-base text-black uppercase tracking-tight block">
                              {team.name}
                            </span>
                            <span className="text-[10px] text-gray-500 font-medium">
                              {team.members} player{team.members === 1 ? '' : 's'}
                            </span>
                          </div>
                        </div>
                        <span className="font-black text-lg text-[#7c3aed]">
                          {team.score.toLocaleString()} pts
                        </span>
                      </div>

                      {/* Member Names Pill List */}
                      {team.memberNames && team.memberNames.length > 0 && (
                        <div className="mt-2.5 pt-2.5 border-t border-gray-100 flex flex-wrap items-center gap-1.5 pl-10">
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mr-1">
                            Members:
                          </span>
                          {team.memberNames.map((m, mIdx) => (
                            <span
                              key={mIdx}
                              className="bg-purple-100 text-[#7c3aed] text-[11px] font-bold px-2 py-0.5 rounded-full"
                            >
                              {m}
                            </span>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Top Scorers */}
          <div className="qz-card p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center text-[#7c3aed]">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-black text-lg text-black">INDIVIDUAL SCORERS</h2>
                    <p className="text-[11px] text-gray-500 font-semibold">
                      Top players contributing to their teams
                    </p>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold bg-gray-100 px-2.5 py-1 rounded-full text-gray-700">
                  Top {individuals.length}
                </span>
              </div>

              {/* List */}
              <div className="space-y-2.5 max-h-[60vh] overflow-y-auto pr-1">
                {individuals.length === 0 ? (
                  <div className="text-center py-16 text-gray-400 text-sm font-semibold">
                    Waiting for player responses...
                  </div>
                ) : (
                  individuals.slice(0, 15).map((user, idx) => (
                    <motion.div
                      key={user.id}
                      layout
                      className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
                        idx === 0
                          ? 'bg-purple-50 border-purple-300 shadow-sm'
                          : 'bg-white border-gray-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 font-black text-xs text-gray-400 text-center">
                          #{user.rank}
                        </span>
                        <div>
                          <span className="font-bold text-sm text-black block">{user.name}</span>
                          {user.team && (
                            <span className="text-[10px] text-gray-400 font-semibold uppercase">
                              TEAM {user.team}
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="font-black text-sm text-black">
                        {user.score.toLocaleString()} pts
                      </span>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </div>
        </main>
      )}

      {/* Footer bar */}
      <footer className="text-center text-xs text-white/50">
        AptiQuiz Real-Time Distributed Arena • Stage Projector Feed
      </footer>
    </div>
  );
}
