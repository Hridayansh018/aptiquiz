'use client';

import React, { useState, useEffect } from 'react';
import {
  Trophy,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  ChevronRight,
  Zap,
  BarChart2,
  SkipForward,
  Star,
  Clock,
  Sparkles,
  HelpCircle,
  Award,
  Activity,
  Gauge
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { QuizQuestion, Player, RoundPerformance } from '@/lib/quiz-data';
import { sound } from '@/lib/audio';

interface LeaderboardViewProps {
  question?: QuizQuestion;
  roundNumber: number;
  totalRounds: number;
  players: Player[];
  userEarnedPoints: number;
  userRank: number;
  performanceHistory?: RoundPerformance[];
  onSkipWait: () => void;
  onOpenAnalytics: () => void;
  onOpenFullStandings: () => void;
  roomCode?: string;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  question,
  roundNumber,
  totalRounds,
  players,
  userEarnedPoints,
  userRank,
  performanceHistory,
  onSkipWait,
  onOpenAnalytics,
  onOpenFullStandings,
  roomCode,
}) => {
  const [countdown, setCountdown] = useState(4);
  const chartMounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const [chartMetric, setChartMetric] = useState<'score' | 'cumulative' | 'speed' | 'rank'>('score');

  const chartData = performanceHistory || [];

  // Trigger celebration confetti on mount
  useEffect(() => {
    sound.playSuccess();
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#7359f8', '#c8bfff', '#ffffff', '#00e599'],
      });
    } catch {}
  }, []);

  // Pacing automation ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Derive dynamic top 5 players directly from actual room participants
  const topPlayers = [...players]
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map((player, idx) => ({
      rank: idx + 1,
      name: player.name,
      college: player.college || 'Auditorium Contender',
      streak: player.streakCount || 0,
      points: player.score,
      delta: (player.deltaPoints ?? 0) >= 0 ? `+${player.deltaPoints ?? 0}` : `${player.deltaPoints ?? 0}`,
      isUp: (player.deltaRanks ?? 0) >= 0,
      hasStar: idx === 0,
      isUser: player.isCurrentUser,
    }));

  return (
    <div className="flex flex-col w-full pb-8">
      {/* Container with Violet-Purple Arcade Theme */}
      <div className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl bg-[#7359f8] p-5 sm:p-8 lg:p-10 shadow-2xl">
        {/* Grids and Ambient Lights */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-arena-grid-pattern"></div>
        <div className="absolute -bottom-24 -left-20 w-96 h-96 rounded-full bg-[#0e082a]/30 blur-2xl pointer-events-none"></div>
        <div className="absolute -top-32 right-10 w-80 h-80 rounded-full bg-[#c8bfff]/25 blur-3xl pointer-events-none"></div>

        {/* Top Header */}
        <div className="relative z-10 flex flex-col items-center text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0e082a] text-white shadow-md mb-3 border border-white/5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#c8bfff] animate-ping"></span>
            <span className="text-xs font-black tracking-wider uppercase text-[#c8bfff]">
              LIVE STATS VERIFIED
            </span>
            <span className="text-white/40">•</span>
            <span className="text-xs text-white/90 font-bold">
              ROUND {roundNumber < 10 ? `0${roundNumber}` : roundNumber} / {totalRounds}
            </span>
          </div>

          <h1 className="font-['Rubik'] font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight drop-shadow-sm uppercase">
            ROUND REVEAL
          </h1>
          <p className="text-sm sm:text-base text-[#e5deff] max-w-2xl mt-1.5 font-medium">
            Speed bonus locked. Check your accuracy breakdown &amp; real-time leaderboard movement!
          </p>
        </div>

        {/* Split Grid */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Recap & Accuracy Distribution */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="bg-white text-[#0e082a] rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between gap-3 mb-3">
                <span className="text-xs font-black text-[#7359f8] uppercase tracking-wider">
                  QUESTION {roundNumber < 10 ? `0${roundNumber}` : roundNumber} RECAP
                </span>
                <span className="px-3 py-1 rounded-full bg-gray-100 text-[#0e082a] font-extrabold text-xs">
                  SPEED MULTIPLIER 1.5x
                </span>
              </div>

              <h2 className="font-['Rubik'] font-extrabold text-lg sm:text-xl text-[#0e082a] leading-tight mb-5">
                {question?.question || 'Round question completed'}
              </h2>

              {/* Official Answer Card */}
              <div className="rounded-xl bg-[#0e082a] text-white p-4 sm:p-5 shadow-md mb-6 border border-white/5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-full bg-[#c8bfff] flex items-center justify-center font-['Rubik'] font-black text-base text-[#1a0064]">
                      {question?.correctKey || '-'}
                    </span>
                    <div>
                      <span className="text-[10px] font-black tracking-widest text-[#c9c4d8] uppercase block">
                        OFFICIAL ANSWER
                      </span>
                      <span className="font-['Rubik'] font-bold text-sm sm:text-base text-white">
                        {question?.officialAnswerText || 'Verdict verified'}
                      </span>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#7359f8] text-white text-xs font-extrabold self-start sm:self-auto">
                    <CheckCircle className="w-4 h-4" />
                    CORRECT VERDICT
                  </span>
                </div>
              </div>

              {/* Response Distribution */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center text-[#0e082a]">
                  <span className="font-bold text-sm">Response Distribution (50 Contenders)</span>
                  <span className="text-xs text-gray-600 font-extrabold">Accuracy: 61.5%</span>
                </div>

                <div className="space-y-2">
                  {/* Option A */}
                  <div className="flex items-center gap-3">
                    <span className="font-black text-xs w-5 text-gray-700">A</span>
                    <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden p-0.5">
                      <div
                        className="h-full bg-gray-400 rounded-full flex items-center px-2 text-[10px] font-bold text-white transition-all duration-700"
                        style={{ width: '12.4%' }}
                      >
                        12.4%
                      </div>
                    </div>
                    <span className="text-xs w-8 text-right font-semibold text-gray-500">6</span>
                  </div>

                  {/* Option B (Correct) */}
                  <div className="flex items-center gap-3">
                    <span className="font-black text-xs w-5 text-[#7359f8]">B</span>
                    <div className="flex-1 h-7 bg-gray-100 rounded-full overflow-hidden p-0.5">
                      <div
                        className="h-full bg-[#7359f8] rounded-full flex items-center justify-between px-3 text-[11px] font-black text-white transition-all duration-700"
                        style={{ width: '61.5%' }}
                      >
                        <span>61.5% Correct</span>
                        <CheckCircle className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <span className="text-xs w-8 text-right font-black text-[#0e082a]">31</span>
                  </div>

                  {/* Option C */}
                  <div className="flex items-center gap-3">
                    <span className="font-black text-xs w-5 text-gray-700">C</span>
                    <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden p-0.5">
                      <div
                        className="h-full bg-gray-400 rounded-full flex items-center px-2 text-[10px] font-bold text-white transition-all duration-700"
                        style={{ width: '21.2%' }}
                      >
                        21.2%
                      </div>
                    </div>
                    <span className="text-xs w-8 text-right font-semibold text-gray-500">11</span>
                  </div>

                  {/* Option D */}
                  <div className="flex items-center gap-3">
                    <span className="font-black text-xs w-5 text-gray-700">D</span>
                    <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden p-0.5">
                      <div
                        className="h-full bg-gray-400 rounded-full flex items-center px-2 text-[10px] font-bold text-white transition-all duration-700"
                        style={{ width: '4.9%' }}
                      >
                        4.9%
                      </div>
                    </div>
                    <span className="text-xs w-8 text-right font-semibold text-gray-500">2</span>
                  </div>
                </div>
              </div>

              {/* Earned Score Pill */}
              <div className="p-4 rounded-xl bg-[#0e082a] text-white shadow-inner flex flex-col sm:flex-row items-center justify-between gap-4 border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#7359f8] flex items-center justify-center text-white shadow-md">
                    <Zap className="w-5 h-5 fill-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-['Rubik'] font-black text-base text-[#c8bfff]">
                        +{userEarnedPoints > 0 ? userEarnedPoints : 840} PTS EARNED
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-[#201b3c] text-[#c8bfff] text-[10px] font-black uppercase tracking-wider">
                        FAST RESPONSE
                      </span>
                    </div>
                    <p className="text-xs text-[#c9c4d8]/80 mt-0.5">
                      Response Latency: <strong className="text-white">8.6s</strong> • Precision Rating: <strong className="text-white">99.4%</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#201b3c] border border-white/5">
                  <span className="text-xs text-[#c9c4d8]">Round Rank:</span>
                  <span className="font-['Rubik'] font-black text-sm text-white">#{userRank}</span>
                  <span className="text-xs font-black text-[#c8bfff]">▲ +2</span>
                </div>
              </div>
            </div>

            {/* Performance Trend Line Chart Card using Recharts */}
            <div className="bg-white text-[#0e082a] rounded-2xl p-5 sm:p-6 shadow-2xl border border-gray-100 flex flex-col justify-between">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-4 h-4 text-[#7359f8]" />
                    <span className="text-xs font-black text-[#7359f8] uppercase tracking-wider">
                      PERFORMANCE TRAJECTORY
                    </span>
                  </div>
                  <h3 className="font-['Rubik'] font-black text-base sm:text-lg text-[#0e082a]">
                    Player Performance Trend
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">
                    Tracking your speed and point momentum from Round 01 through Round 07
                  </p>
                </div>

                {/* Metric Selector Tabs */}
                <div className="flex items-center gap-1 p-1 rounded-full bg-gray-100 self-start sm:self-auto">
                  <button
                    onClick={() => {
                      sound.playClick();
                      setChartMetric('score');
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      chartMetric === 'score'
                        ? 'bg-[#7359f8] text-white shadow-sm'
                        : 'text-gray-600 hover:text-black'
                    }`}
                  >
                    Points
                  </button>
                  <button
                    onClick={() => {
                      sound.playClick();
                      setChartMetric('cumulative');
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      chartMetric === 'cumulative'
                        ? 'bg-[#7359f8] text-white shadow-sm'
                        : 'text-gray-600 hover:text-black'
                    }`}
                  >
                    Total XP
                  </button>
                  <button
                    onClick={() => {
                      sound.playClick();
                      setChartMetric('speed');
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      chartMetric === 'speed'
                        ? 'bg-[#7359f8] text-white shadow-sm'
                        : 'text-gray-600 hover:text-black'
                    }`}
                  >
                    Speed (s)
                  </button>
                  <button
                    onClick={() => {
                      sound.playClick();
                      setChartMetric('rank');
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      chartMetric === 'rank'
                        ? 'bg-[#7359f8] text-white shadow-sm'
                        : 'text-gray-600 hover:text-black'
                    }`}
                  >
                    Rank
                  </button>
                </div>
              </div>

              {/* Recharts Line Chart Container */}
              <div className="w-full h-52 sm:h-56 my-2">
                {chartMounted && chartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={chartData}
                      margin={{ top: 12, right: 16, left: -22, bottom: 4 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f5" vertical={false} />
                      <XAxis
                        dataKey="roundName"
                        stroke="#928ea1"
                        tick={{ fontSize: 11, fontWeight: 700, fill: '#6b7280' }}
                        axisLine={{ stroke: '#e5e7eb' }}
                        tickLine={false}
                      />
                      <YAxis
                        stroke="#928ea1"
                        tick={{ fontSize: 11, fontWeight: 600, fill: '#6b7280' }}
                        axisLine={false}
                        tickLine={false}
                        reversed={chartMetric === 'rank'}
                        domain={
                          chartMetric === 'score'
                            ? [0, 1000]
                            : chartMetric === 'cumulative'
                            ? [0, 6000]
                            : chartMetric === 'speed'
                            ? [0, 15]
                            : [1, 10]
                        }
                      />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload as RoundPerformance;
                            return (
                              <div className="bg-[#0e082a] text-white rounded-xl p-3 shadow-2xl border border-white/10 text-xs">
                                <div className="flex items-center justify-between gap-3 mb-1">
                                  <span className="font-extrabold text-[#c8bfff]">
                                    {data.roundName} • {data.topic}
                                  </span>
                                  <span className="px-1.5 py-0.5 rounded bg-[#7359f8] text-[10px] font-bold">
                                    Rank #{data.rank}
                                  </span>
                                </div>
                                <div className="space-y-0.5">
                                  <div className="text-white font-bold">
                                    Round Score: <span className="text-[#c8bfff]">+{data.scoreEarned} PTS</span>
                                  </div>
                                  <div className="text-gray-300">
                                    Cumulative XP: {data.cumulativeXP.toLocaleString()} XP
                                  </div>
                                  <div className="text-gray-300">
                                    Response Latency: {data.latencySec}s ({data.accuracy}% acc)
                                  </div>
                                </div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey={
                          chartMetric === 'score'
                            ? 'scoreEarned'
                            : chartMetric === 'cumulative'
                            ? 'cumulativeXP'
                            : chartMetric === 'speed'
                            ? 'latencySec'
                            : 'rank'
                        }
                        stroke={
                          chartMetric === 'speed'
                            ? '#ea580c'
                            : chartMetric === 'cumulative'
                            ? '#059669'
                            : '#7359f8'
                        }
                        strokeWidth={3.5}
                        dot={{
                          r: 4.5,
                          fill: '#ffffff',
                          stroke:
                            chartMetric === 'speed'
                              ? '#ea580c'
                              : chartMetric === 'cumulative'
                              ? '#059669'
                              : '#7359f8',
                          strokeWidth: 2.5
                        }}
                        activeDot={{
                          r: 7,
                          fill:
                            chartMetric === 'speed'
                              ? '#ea580c'
                              : chartMetric === 'cumulative'
                              ? '#059669'
                              : '#7359f8',
                          stroke: '#ffffff',
                          strokeWidth: 2
                        }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-xs text-gray-400 gap-1.5 p-4 text-center">
                    <TrendingUp className="w-6 h-6 text-gray-300" />
                    <span className="font-bold text-gray-500">No round performance records yet</span>
                    <span className="text-[11px] text-gray-400">Play rounds to track your speed and XP momentum!</span>
                  </div>
                )}
              </div>

              {/* Bottom Quick KPI Badges */}
              <div className="pt-3 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="bg-gray-50 rounded-lg p-2 text-center border border-gray-100">
                  <span className="text-[10px] text-gray-500 font-bold block">Peak Round</span>
                  <span className="font-extrabold text-[#7359f8]">
                    {chartData.length > 0 ? `+${Math.max(...chartData.map((d) => d.scoreEarned))} PTS` : '--'}
                  </span>
                </div>
                <div className="bg-gray-50 rounded-lg p-2 text-center border border-gray-100">
                  <span className="text-[10px] text-gray-500 font-bold block">Fastest Speed</span>
                  <span className="font-extrabold text-emerald-600">
                    {chartData.length > 0 ? `${Math.min(...chartData.map((d) => d.latencySec))}s` : '--'}
                  </span>
                </div>
                <div className="bg-gray-50 rounded-lg p-2 text-center border border-gray-100">
                  <span className="text-[10px] text-gray-500 font-bold block">Current Standing</span>
                  <span className="font-extrabold text-[#0e082a]">
                    {userRank > 0 ? `Rank #${userRank}` : 'Unranked'}
                  </span>
                </div>
                <div className="bg-gray-50 rounded-lg p-2 text-center border border-gray-100">
                  <span className="text-[10px] text-gray-500 font-bold block">Contenders</span>
                  <span className="font-extrabold text-[#7359f8]">
                    {players.length} Active
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Leaderboard Top 5 */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="bg-[#0e082a]/90 backdrop-blur-xl rounded-2xl p-5 shadow-2xl text-white flex flex-col gap-4 border border-white/10">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-[#c8bfff]" />
                  <h3 className="font-['Rubik'] font-bold text-base sm:text-lg text-white tracking-tight">
                    LIVE LEADERBOARD
                  </h3>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#201b3c] text-xs font-extrabold text-[#c9c4d8] border border-white/5">
                  ROOM #{roomCode || 'LIVE'}
                </span>
              </div>

              {/* Leaderboard Stack */}
              <div className="flex flex-col gap-2">
                {topPlayers.length === 0 ? (
                  <div className="py-10 text-center text-xs text-[#c9c4d8]/70 flex flex-col items-center justify-center gap-2">
                    <Trophy className="w-8 h-8 text-white/20" />
                    <span className="font-bold text-white/80">No contenders registered yet</span>
                    <span className="text-[11px] text-white/50 max-w-xs">
                      Contenders will appear here live once they join Room #{roomCode || 'LIVE'}
                    </span>
                  </div>
                ) : (
                  topPlayers.map((player) => {
                  return (
                    <div
                      key={player.rank}
                      className={`flex items-center justify-between p-2 pr-4 rounded-full transition-all ${
                        player.isUser
                          ? 'bg-[#7359f8] text-white shadow-xl transform scale-[1.02]'
                          : 'bg-[#201b3c] hover:bg-[#2a2547] text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 sm:w-11 h-10 sm:h-11 rounded-full flex items-center justify-center font-['Rubik'] font-black text-sm shadow-sm ${
                            player.rank === 1
                              ? 'bg-[#c8bfff] text-[#1a0064]'
                              : player.isUser
                              ? 'bg-white text-[#0e082a]'
                              : 'bg-[#353053] text-white'
                          }`}
                        >
                          {player.rank}
                        </div>

                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-['Rubik'] font-bold text-sm leading-tight">
                              {player.name}
                            </span>
                            {player.hasStar && (
                              <Star className="w-3.5 h-3.5 fill-[#c8bfff] text-[#c8bfff]" />
                            )}
                            {player.isUser && (
                              <span className="px-1.5 py-0.2 rounded-full bg-[#0e082a] text-[#c8bfff] text-[9px] font-black uppercase tracking-wider">
                                YOU
                              </span>
                            )}
                          </div>
                          <span
                            className={`text-[11px] font-semibold ${
                              player.isUser ? 'text-[#e5deff]' : 'text-[#c9c4d8]/80'
                            }`}
                          >
                            {player.college} • Streak: {player.streak}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-['Rubik'] font-black text-sm sm:text-base leading-tight">
                          {player.points.toLocaleString()}{' '}
                          <span className="text-[11px] font-normal opacity-80">PTS</span>
                        </div>
                        <span
                          className={`text-[11px] font-extrabold ${
                            player.isUp
                              ? player.isUser
                                ? 'text-[#fffbff]'
                                : 'text-[#c8bfff]'
                              : 'text-gray-400'
                          }`}
                        >
                          {player.delta}
                        </span>
                      </div>
                    </div>
                  );
                }))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-2 px-1 text-xs text-[#c9c4d8]">
                <span>Showing top 5 of 50 players</span>
                <button
                  onClick={() => {
                    sound.playClick();
                    onOpenFullStandings();
                  }}
                  className="font-bold text-[#c8bfff] hover:text-white transition-colors flex items-center gap-0.5 cursor-pointer"
                >
                  <span>Full Standings</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Pacing Automation Bar */}
        <div className="relative z-10 mt-6 sm:mt-8 p-4 sm:p-5 rounded-2xl bg-[#0e082a]/85 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl border border-white/10">
          <div className="flex items-center gap-3.5 w-full md:w-auto">
            <div className="w-11 h-11 rounded-full bg-[#201b3c] flex items-center justify-center text-[#c8bfff] shadow-sm">
              <Clock className="w-5 h-5 animate-spin" />
            </div>
            <div>
              <span className="text-[10px] font-black text-[#c9c4d8] uppercase tracking-wider block">
                PACING AUTOMATION
              </span>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-white">Next Question Starting in</span>
                <span className="font-['Rubik'] font-black text-base text-[#c8bfff]">
                  {countdown > 0 ? `${countdown}s` : 'Launching...'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center flex-wrap gap-2.5 w-full md:w-auto justify-end">
            <button
              onClick={() => {
                sound.playClick();
                onOpenAnalytics();
              }}
              className="px-4 py-2.5 rounded-full bg-[#201b3c] hover:bg-[#2a2547] text-white text-xs font-bold transition-all flex items-center gap-1.5 border border-white/5 active:scale-95 cursor-pointer"
            >
              <BarChart2 className="w-4 h-4 text-[#c8bfff]" />
              <span>Question Analytics</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onSkipWait();
              }}
              className="px-6 py-2.5 rounded-full bg-[#c8bfff] hover:bg-white text-[#1a0064] text-xs font-black transition-all shadow-md flex items-center gap-1.5 active:scale-95 cursor-pointer"
            >
              <span>Skip Wait</span>
              <SkipForward className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
