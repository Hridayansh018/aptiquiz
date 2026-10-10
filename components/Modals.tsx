'use client';

import React, { useState } from 'react';
import {
  X,
  QrCode,
  Copy,
  Check,
  Trophy,
  BarChart2,
  Clock,
  User,
  Users,
  Zap,
  Flame,
  Award,
  Search,
  ExternalLink,
  Star,
  Sparkles,
  Database,
  BookOpen,
  PlusCircle,
  Code
} from 'lucide-react';
import { Player, QuizQuestion, Achievement, QuestionCategory } from '@/lib/quiz-data';
import { sound } from '@/lib/audio';

// 1. QR Code Modal
interface QRModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomCode: string;
}

export const QRModal: React.FC<QRModalProps> = ({ isOpen, onClose, roomCode }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    sound.playClick();
    navigator.clipboard.writeText(roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white text-[#0e082a] rounded-3xl max-w-sm w-full p-6 sm:p-8 shadow-2xl text-center relative border border-gray-100">
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <span className="text-xs font-black text-[#7359f8] uppercase tracking-widest block">
          SCAN TO JOIN QUICKLY
        </span>
        <h3 className="font-['Rubik'] font-black text-2xl text-[#0e082a] mt-1">
          Room {roomCode}
        </h3>

        {/* SVG QR Code */}
        <div className="my-5 p-4 bg-gray-50 rounded-2xl shadow-inner inline-block border border-gray-200">
          <svg className="w-44 h-44 mx-auto text-[#0e082a]" fill="currentColor" viewBox="0 0 100 100">
            <path d="M0 0h30v30H0zm5 5v20h20V5z M10 10h10v10H10z M70 0h30v30H70zm5 5v20h20V5z M80 10h10v10H80z M0 70h30v30H0zm5 5v20h20V5z M10 80h10v10H10z M40 10h20v10H40z M40 40h20v20H40z M10 40h20v20H10z M70 40h20v10H70z M70 60h10v10H70z M80 70h20v30H80zm5 5v20h10v-20z M40 70h10v30H40z M55 80h15v10H55z" />
          </svg>
        </div>

        <p className="text-xs text-gray-500 font-medium">
          Point phone camera at this QR code to join without entering room code manually.
        </p>

        <div className="mt-5 flex gap-2">
          <button
            onClick={handleCopy}
            className="flex-1 py-3 rounded-full bg-gray-100 hover:bg-gray-200 text-[#0e082a] font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied!' : 'Copy Link'}</span>
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="flex-1 py-3 rounded-full bg-[#7359f8] text-white font-bold text-xs shadow-md hover:bg-[#5c3fe0] transition-all"
          >
            Back to Lobby
          </button>
        </div>
      </div>
    </div>
  );
};

// 2. Full Standings Modal
interface FullStandingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  players: Player[];
  roomCode: string;
}

export const FullStandingsModal: React.FC<FullStandingsModalProps> = ({
  isOpen,
  onClose,
  players,
  roomCode,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filtered = players.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.college.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#0e082a] text-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative border border-white/10 max-h-[90vh] flex flex-col">
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#201b3c] flex items-center justify-center text-[#c9c4d8] hover:text-white hover:bg-[#2a2547] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <Trophy className="w-5 h-5 text-[#c8bfff]" />
          <h2 className="font-['Rubik'] font-black text-xl sm:text-2xl text-white">
            Official Room Standings
          </h2>
        </div>
        <p className="text-xs text-[#c9c4d8] mb-4">
          All validated collegiate competitors in Room #{roomCode}
        </p>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#c9c4d8]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search student or institution..."
            className="w-full bg-[#201b3c] text-white text-xs rounded-full pl-10 pr-4 py-2.5 border border-white/10 outline-none focus:border-[#7359f8]"
          />
        </div>

        {/* Table list */}
        <div className="overflow-y-auto space-y-2 flex-1 pr-1">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-xs text-[#c9c4d8]/70 flex flex-col items-center justify-center gap-2">
              <Users className="w-8 h-8 text-white/20" />
              <span>No contenders registered in standings yet.</span>
            </div>
          ) : (
            filtered.map((p, idx) => (
              <div
                key={p.id}
                className={`flex items-center justify-between p-2.5 px-4 rounded-full text-xs transition-colors ${
                  p.isCurrentUser
                    ? 'bg-[#7359f8] text-white ring-1 ring-white/30'
                    : 'bg-[#1c1738] text-white hover:bg-[#201b3c]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#0e082a] text-[#c8bfff] font-bold flex items-center justify-center text-xs">
                    {idx + 1}
                  </span>
                  <div>
                    <div className="font-bold">
                      {p.name} {p.isCurrentUser && '(You)'}
                    </div>
                    <div className="text-[11px] text-[#c9c4d8]/80">{p.college}</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-bold text-sm">{p.score} PTS</div>
                  <div className="text-[10px] text-[#c8bfff]">{p.accuracyRate}% Accuracy</div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-4 pt-3 border-t border-white/10 flex justify-end">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-6 py-2.5 rounded-full bg-[#7359f8] text-white text-xs font-bold hover:bg-[#5c3fe0] transition-colors"
          >
            Close Standings
          </button>
        </div>
      </div>
    </div>
  );
};

// 3. Question Analytics Modal
interface QuestionAnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: QuizQuestion;
}

export const QuestionAnalyticsModal: React.FC<QuestionAnalyticsModalProps> = ({
  isOpen,
  onClose,
  question,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white text-[#0e082a] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-gray-100">
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <BarChart2 className="w-5 h-5 text-[#7359f8]" />
          <h2 className="font-['Rubik'] font-black text-xl text-[#0e082a]">
            Question Performance Telemetry
          </h2>
        </div>
        <span className="text-xs font-extrabold text-[#7359f8] uppercase tracking-wider block mb-4">
          Q{question.id} • {question.topic}
        </span>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="p-3 bg-gray-50 rounded-xl text-center border border-gray-200">
            <span className="text-[11px] text-gray-500 font-bold block">Avg. Latency</span>
            <span className="font-['Rubik'] font-black text-base text-[#0e082a]">8.6s</span>
          </div>
          <div className="p-3 bg-gray-50 rounded-xl text-center border border-gray-200">
            <span className="text-[11px] text-gray-500 font-bold block">Accuracy</span>
            <span className="font-['Rubik'] font-black text-base text-emerald-600">61.5%</span>
          </div>
          <div className="p-3 bg-gray-50 rounded-xl text-center border border-gray-200">
            <span className="text-[11px] text-gray-500 font-bold block">Distractor</span>
            <span className="font-['Rubik'] font-black text-base text-[#7359f8]">Option C (21%)</span>
          </div>
        </div>

        {/* Mathematical Explanation */}
        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 mb-6">
          <span className="text-xs font-black text-[#7359f8] uppercase block mb-1">
            Step-by-step Solution:
          </span>
          <p className="text-xs text-gray-700 leading-relaxed font-medium">
            {question.explanation}
          </p>
          <div className="mt-3 p-2 bg-white rounded-lg text-xs font-mono text-[#0e082a] border border-gray-200">
            Formula: {question.scratchpadFormula}
          </div>
        </div>

        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="w-full py-3 rounded-full bg-[#7359f8] text-white text-xs font-bold hover:bg-[#5c3fe0] transition-colors"
        >
          Got it
        </button>
      </div>
    </div>
  );
};

// 4. User Profile & Badge Achievement Tracking System Modal
interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  collegeName: string;
  onSaveProfile: (name: string, college: string) => void;
  userXP: number;
  achievements?: Achievement[];
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  userName,
  collegeName,
  onSaveProfile,
  userXP,
  achievements = [],
}) => {
  const [name, setName] = useState(userName);
  const [college, setCollege] = useState(collegeName);
  const [activeTab, setActiveTab] = useState<'badges' | 'profile'>('badges');
  const [badgeFilter, setBadgeFilter] = useState<'all' | 'unlocked' | 'locked'>('all');

  if (!isOpen) return null;

  // Dynamically compute achievement unlocked states based on current userXP
  const computedAchievements = achievements.map((ach) => {
    let isUnlocked = ach.unlocked;
    let progress = ach.progress;

    if (ach.id === 'aptitude-ace') {
      progress = userXP;
      isUnlocked = userXP >= 3000;
    } else if (ach.id === 'grand-contender') {
      progress = userXP;
      isUnlocked = userXP >= 5000;
    }

    return {
      ...ach,
      progress,
      unlocked: isUnlocked,
    };
  });

  const unlockedCount = computedAchievements.filter((a) => a.unlocked).length;
  const filteredBadges = computedAchievements.filter((a) => {
    if (badgeFilter === 'unlocked') return a.unlocked;
    if (badgeFilter === 'locked') return !a.unlocked;
    return true;
  });

  const nextMilestone = userXP < 3000 ? 3000 : userXP < 5000 ? 5000 : 10000;
  const milestonePercent = Math.min(100, Math.round((userXP / nextMilestone) * 100));

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();
    onSaveProfile(name.trim() || userName || 'Player', college.trim() || collegeName || '');
    setActiveTab('badges');
  };

  const getBadgeIcon = (iconName: string, unlocked: boolean) => {
    const className = `w-6 h-6 ${unlocked ? 'text-white' : 'text-gray-400'}`;
    switch (iconName) {
      case 'Award':
        return <Award className={className} />;
      case 'Zap':
        return <Zap className={className} />;
      case 'Flame':
        return <Flame className={className} />;
      case 'Trophy':
        return <Trophy className={className} />;
      case 'Star':
        return <Star className={className} />;
      default:
        return <Sparkles className={className} />;
    }
  };

  const getTierGradient = (tier: string, unlocked: boolean) => {
    if (!unlocked) return 'from-gray-800 to-gray-900 border-gray-700/60 text-gray-500';
    switch (tier) {
      case 'diamond':
        return 'from-[#7359f8] via-[#5c3fe0] to-[#2d009d] border-[#c8bfff] shadow-[0_0_20px_rgba(115,89,248,0.4)]';
      case 'gold':
        return 'from-amber-500 via-yellow-600 to-amber-700 border-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.35)]';
      case 'silver':
        return 'from-slate-600 via-gray-700 to-slate-800 border-slate-300 shadow-[0_0_15px_rgba(203,213,225,0.25)]';
      default:
        return 'from-violet-700 to-purple-900 border-purple-400';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#0e082a] text-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative border border-white/10 max-h-[92vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#201b3c] flex items-center justify-center text-[#c9c4d8] hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Profile Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#7359f8] to-[#c8bfff] text-[#1a0064] font-['Rubik'] font-black text-xl flex items-center justify-center shadow-lg ring-2 ring-white/20">
              {userName.slice(0, 2).toUpperCase() || 'AK'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-['Rubik'] font-black text-lg sm:text-xl text-white leading-tight">
                  {userName}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#7359f8] text-white text-[10px] font-black uppercase tracking-wider">
                  Tier-1 Competitor
                </span>
              </div>
              <span className="text-xs text-[#c9c4d8] font-semibold">{collegeName}</span>
            </div>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex items-center gap-1 p-1 rounded-full bg-[#201b3c] border border-white/5 self-start sm:self-auto">
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('badges');
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeTab === 'badges'
                  ? 'bg-[#7359f8] text-white shadow-sm'
                  : 'text-[#c9c4d8] hover:text-white'
              }`}
            >
              Badges & Milestones ({unlockedCount}/{computedAchievements.length})
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('profile');
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeTab === 'profile'
                  ? 'bg-[#7359f8] text-white shadow-sm'
                  : 'text-[#c9c4d8] hover:text-white'
              }`}
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* Tab 1: Badges & Milestones */}
        {activeTab === 'badges' && (
          <div className="flex-1 overflow-y-auto mt-4 pr-1 space-y-4">
            {/* Milestone Progress Bar */}
            <div className="bg-[#1c1738] rounded-2xl p-4 sm:p-5 border border-white/5 shadow-inner">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[#c8bfff]" />
                  <span className="text-xs sm:text-sm font-bold text-white">
                    Milestone Level 4 • Senior Contender
                  </span>
                </div>
                <span className="text-xs font-black text-[#c8bfff]">
                  {userXP.toLocaleString()} / {nextMilestone.toLocaleString()} XP ({milestonePercent}%)
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-3 bg-[#0e082a] rounded-full overflow-hidden p-0.5 border border-white/5">
                <div
                  className="h-full bg-gradient-to-r from-[#7359f8] via-[#c8bfff] to-emerald-400 rounded-full transition-all duration-700"
                  style={{ width: `${milestonePercent}%` }}
                ></div>
              </div>

              <div className="flex items-center justify-between mt-2 text-[11px] text-[#c9c4d8]">
                <span>
                  {userXP >= 3000
                    ? '🎉 "Aptitude Ace" Milestone Unlocked!'
                    : `Next Milestone: Aptitude Ace at 3,000 XP (${3000 - userXP} XP remaining)`}
                </span>
                <span className="font-bold text-white">Rank #4 Auditorium</span>
              </div>
            </div>

            {/* Filter pills */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs font-black text-[#c8bfff] uppercase tracking-wider">
                ACHIEVEMENT BADGES GALLERY
              </span>
              <div className="flex items-center gap-1 text-xs">
                <button
                  onClick={() => setBadgeFilter('all')}
                  className={`px-2.5 py-1 rounded-full font-bold transition-all ${
                    badgeFilter === 'all'
                      ? 'bg-white text-[#0e082a]'
                      : 'bg-[#201b3c] text-[#c9c4d8] hover:text-white'
                  }`}
                >
                  All ({computedAchievements.length})
                </button>
                <button
                  onClick={() => setBadgeFilter('unlocked')}
                  className={`px-2.5 py-1 rounded-full font-bold transition-all ${
                    badgeFilter === 'unlocked'
                      ? 'bg-emerald-500 text-white'
                      : 'bg-[#201b3c] text-[#c9c4d8] hover:text-white'
                  }`}
                >
                  Unlocked ({unlockedCount})
                </button>
                <button
                  onClick={() => setBadgeFilter('locked')}
                  className={`px-2.5 py-1 rounded-full font-bold transition-all ${
                    badgeFilter === 'locked'
                      ? 'bg-amber-600 text-white'
                      : 'bg-[#201b3c] text-[#c9c4d8] hover:text-white'
                  }`}
                >
                  In Progress ({computedAchievements.length - unlockedCount})
                </button>
              </div>
            </div>

            {/* Badges Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pb-2">
              {filteredBadges.map((badge) => {
                const gradientClasses = getTierGradient(badge.tier, badge.unlocked);

                return (
                  <div
                    key={badge.id}
                    className={`rounded-2xl p-4 border transition-all relative overflow-hidden flex flex-col justify-between ${
                      badge.unlocked
                        ? 'bg-[#1c1738] border-white/15 shadow-lg'
                        : 'bg-[#140f33]/60 border-white/5 opacity-75'
                    }`}
                  >
                    <div>
                      {/* Top Emblem Row */}
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div
                          className={`w-12 h-12 rounded-2xl bg-gradient-to-br border flex items-center justify-center shrink-0 ${gradientClasses}`}
                        >
                          {getBadgeIcon(badge.iconName, badge.unlocked)}
                        </div>

                        <div className="flex flex-col items-end">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                              badge.unlocked
                                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                                : 'bg-gray-800 text-gray-400 border-gray-700'
                            }`}
                          >
                            {badge.unlocked ? 'UNLOCKED' : 'LOCKED'}
                          </span>
                          <span className="text-[10px] font-bold text-[#c8bfff] mt-1">
                            {badge.badgeLabel}
                          </span>
                        </div>
                      </div>

                      {/* Title & Description */}
                      <h4 className="font-['Rubik'] font-black text-base text-white leading-tight mb-1">
                        {badge.name}
                      </h4>
                      <p className="text-xs text-[#c9c4d8]/80 leading-relaxed font-medium">
                        {badge.description}
                      </p>
                    </div>

                    {/* Progress / Status Footer */}
                    <div className="mt-3 pt-2.5 border-t border-white/5">
                      {badge.unlocked ? (
                        <div className="flex items-center justify-between text-[11px] text-emerald-400 font-bold">
                          <span className="flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Milestone Achieved</span>
                          </span>
                          <span className="text-[#c8bfff]">{badge.unlockedAt || 'Verified'}</span>
                        </div>
                      ) : (
                        <div>
                          <div className="flex items-center justify-between text-[10px] font-bold text-gray-400 mb-1">
                            <span>Requirement Progress:</span>
                            <span>
                              {badge.progress.toLocaleString()} / {badge.maxProgress.toLocaleString()}
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-[#0e082a] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#7359f8] rounded-full"
                              style={{
                                width: `${Math.min(
                                  100,
                                  Math.round((badge.progress / badge.maxProgress) * 100)
                                )}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Edit Profile Form */}
        {activeTab === 'profile' && (
          <form onSubmit={handleSave} className="space-y-4 mt-4 flex-1">
            <div className="bg-[#1c1738] rounded-2xl p-5 border border-white/5 space-y-4">
              <div>
                <label className="text-xs font-bold text-[#c9c4d8] block mb-1.5">
                  Your Name / Alias:
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#0e082a] text-white text-sm rounded-xl px-4 py-3 border border-white/10 outline-none focus:border-[#7359f8]"
                  placeholder="e.g. Alex K."
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#c9c4d8] block mb-1.5">
                  Collegiate Institution:
                </label>
                <input
                  type="text"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  className="w-full bg-[#0e082a] text-white text-sm rounded-xl px-4 py-3 border border-white/10 outline-none focus:border-[#7359f8]"
                  placeholder="e.g. IIT Delhi, RVCE, BITS Pilani"
                />
              </div>
            </div>

            <div className="flex gap-3 justify-end pt-2">
              <button
                type="button"
                onClick={() => setActiveTab('badges')}
                className="px-5 py-2.5 rounded-full bg-[#201b3c] text-white text-xs font-bold hover:bg-[#2a2547]"
              >
                Back to Badges
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-[#7359f8] text-white text-xs font-bold hover:bg-[#5c3fe0] shadow-md transition-all cursor-pointer"
              >
                Save Profile
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};


// 5. Room PIN Editor Modal
interface RoomCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomCode: string;
  onSaveRoomCode: (newCode: string) => void;
}

export const RoomCodeModal: React.FC<RoomCodeModalProps> = ({
  isOpen,
  onClose,
  roomCode,
  onSaveRoomCode,
}) => {
  const [code, setCode] = useState(roomCode);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();
    if (code.trim()) {
      onSaveRoomCode(code.trim().toUpperCase());
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#0e082a] text-white rounded-3xl max-w-sm w-full p-6 shadow-2xl relative border border-white/10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#201b3c] flex items-center justify-center text-[#c9c4d8]"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="font-['Rubik'] font-bold text-base text-white mb-1">Room Identifier</h3>
        <p className="text-xs text-[#c9c4d8] mb-4">
          Change auditorium PIN code for live audience matching
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[11px] font-bold text-[#c9c4d8] block mb-1">
              Invite PIN (5-6 characters):
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              maxLength={8}
              className="w-full bg-[#1c1738] text-white font-mono tracking-widest text-center text-lg font-bold rounded-xl px-3.5 py-2.5 border border-white/10 outline-none focus:border-[#7359f8]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-full bg-[#7359f8] text-white text-xs font-bold hover:bg-[#5c3fe0]"
          >
            Update Room Code
          </button>
        </form>
      </div>
    </div>
  );
};

// 6. Admin Question Manager & Database Sync Modal
interface AdminQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddQuestion: (question: QuizQuestion) => void;
  currentQuestionCount: number;
}

export const AdminQuestionModal: React.FC<AdminQuestionModalProps> = ({
  isOpen,
  onClose,
  onAddQuestion,
  currentQuestionCount,
}) => {
  const [activeTab, setActiveTab] = useState<'create' | 'database' | 'sample'>('create');
  const [category, setCategory] = useState<QuestionCategory>('Quant');
  const [section, setSection] = useState('SECTION 02');
  const [topic, setTopic] = useState('Probability & Permutations');
  const [questionText, setQuestionText] = useState(
    'In a class of 60 students, 35 play football, 25 play cricket, and 12 play both. How many students play neither?'
  );
  const [optA, setOptA] = useState('8 students');
  const [optB, setOptB] = useState('12 students');
  const [optC, setOptC] = useState('15 students');
  const [optD, setOptD] = useState('18 students');
  const [correctKey, setCorrectKey] = useState<'A' | 'B' | 'C' | 'D'>('B');
  const [paceSec, setPaceSec] = useState(45);
  const [formula, setFormula] = useState('Total = n(F) + n(C) - n(F ∩ C) + Neither => 60 = 35 + 25 - 12 + X');
  const [explanation, setExplanation] = useState(
    'Using set theory: n(F ∪ C) = 35 + 25 - 12 = 48. Neither = 60 - 48 = 12 students.'
  );
  const [copiedSchema, setCopiedSchema] = useState(false);
  const [successToast, setSuccessToast] = useState(false);

  if (!isOpen) return null;

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;

    sound.playSuccess();

    const optionsMap: { key: 'A' | 'B' | 'C' | 'D'; text: string; percentage: number; count: number; isCorrect?: boolean }[] = [
      { key: 'A', text: optA || 'Option A', percentage: correctKey === 'A' ? 62 : 12, count: correctKey === 'A' ? 31 : 6, isCorrect: correctKey === 'A' },
      { key: 'B', text: optB || 'Option B', percentage: correctKey === 'B' ? 62 : 14, count: correctKey === 'B' ? 31 : 7, isCorrect: correctKey === 'B' },
      { key: 'C', text: optC || 'Option C', percentage: correctKey === 'C' ? 62 : 18, count: correctKey === 'C' ? 31 : 9, isCorrect: correctKey === 'C' },
      { key: 'D', text: optD || 'Option D', percentage: correctKey === 'D' ? 62 : 6, count: correctKey === 'D' ? 31 : 3, isCorrect: correctKey === 'D' },
    ];

    const officialText = optionsMap.find((o) => o.key === correctKey)?.text || '';

    const newQuestion: QuizQuestion = {
      id: currentQuestionCount + 1,
      category,
      section,
      topic,
      question: questionText,
      options: optionsMap,
      correctKey,
      officialAnswerText: officialText,
      standardPaceSec: paceSec,
      maxPoints: 400,
      scratchpadFormula: formula,
      explanation,
    };

    // Add to frontend state
    onAddQuestion(newQuestion);

    // Also asynchronously push to /api/questions
    try {
      await fetch('/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newQuestion),
      });
    } catch {}

    setSuccessToast(true);
    setTimeout(() => {
      setSuccessToast(false);
      onClose();
    }, 1200);
  };

  const sampleJson = JSON.stringify(
    {
      id: currentQuestionCount + 1,
      category: 'Quant',
      section: 'SECTION 02',
      topic: 'Probability & Permutations',
      question: 'In a class of 60 students, 35 play football, 25 play cricket, and 12 play both. How many students play neither?',
      options: [
        { key: 'A', text: '8 students', percentage: 12, count: 6 },
        { key: 'B', text: '12 students', percentage: 62, count: 31, isCorrect: true },
        { key: 'C', text: '15 students', percentage: 18, count: 9 },
        { key: 'D', text: '18 students', percentage: 8, count: 4 }
      ],
      correctKey: 'B',
      officialAnswerText: '12 students',
      standardPaceSec: 45,
      maxPoints: 400,
      scratchpadFormula: '60 = 35 + 25 - 12 + X => X = 12',
      explanation: 'Using principle of inclusion-exclusion: Total = n(A) + n(B) - n(A ∩ B) + Neither.'
    },
    null,
    2
  );

  const copyCode = (text: string) => {
    sound.playClick();
    navigator.clipboard?.writeText(text);
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#0e082a] text-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative border border-white/10 max-h-[92vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#201b3c] flex items-center justify-center text-[#c9c4d8] hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#7359f8] flex items-center justify-center shadow-lg">
              <Database className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-['Rubik'] font-black text-lg sm:text-xl text-white">
                  Administrator Question Portal
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#7359f8] text-white text-[10px] font-black uppercase">
                  Admin Active
                </span>
              </div>
              <p className="text-xs text-[#c9c4d8]">
                Insert new questions into frontend state, PostgreSQL / Firebase DB, and REST API
              </p>
            </div>
          </div>

          {/* Subtabs */}
          <div className="flex items-center gap-1 p-1 rounded-full bg-[#201b3c] border border-white/5 self-start sm:self-auto">
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('create');
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeTab === 'create'
                  ? 'bg-[#7359f8] text-white shadow-sm'
                  : 'text-[#c9c4d8] hover:text-white'
              }`}
            >
              Add Question
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('database');
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeTab === 'database'
                  ? 'bg-[#7359f8] text-white shadow-sm'
                  : 'text-[#c9c4d8] hover:text-white'
              }`}
            >
              DB Schema Guide
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('sample');
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeTab === 'sample'
                  ? 'bg-[#7359f8] text-white shadow-sm'
                  : 'text-[#c9c4d8] hover:text-white'
              }`}
            >
              JSON Template
            </button>
          </div>
        </div>

        {/* Tab 1: Form to Add Question */}
        {activeTab === 'create' && (
          <form onSubmit={handleCreate} className="flex-1 overflow-y-auto mt-4 pr-1 space-y-4">
            {successToast && (
              <div className="p-3 bg-emerald-500/20 border border-emerald-500/50 rounded-xl text-emerald-300 text-xs font-bold flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                Question created and injected into live arena question bank!
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-bold text-[#c9c4d8] block mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as QuestionCategory)}
                  className="w-full bg-[#1c1738] text-white text-xs font-bold rounded-xl px-3 py-2 border border-white/10 outline-none focus:border-[#7359f8]"
                >
                  <option value="Quant">Quant (Quantitative)</option>
                  <option value="Logic">Logic (Logical Reasoning)</option>
                  <option value="Verbal">Verbal (Reading & Verbal)</option>
                  <option value="Data Interpretation">Data Interpretation</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#c9c4d8] block mb-1">Section Identifier</label>
                <input
                  type="text"
                  value={section}
                  onChange={(e) => setSection(e.target.value)}
                  className="w-full bg-[#1c1738] text-white text-xs font-bold rounded-xl px-3 py-2 border border-white/10 outline-none focus:border-[#7359f8]"
                  placeholder="e.g. SECTION 02"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#c9c4d8] block mb-1">Topic Name</label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full bg-[#1c1738] text-white text-xs font-bold rounded-xl px-3 py-2 border border-white/10 outline-none focus:border-[#7359f8]"
                  placeholder="e.g. Work & Time"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-[#c9c4d8] block mb-1">
                Question Prompt (Billboard Text)
              </label>
              <textarea
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                rows={3}
                className="w-full bg-[#1c1738] text-white text-xs rounded-xl p-3 border border-white/10 outline-none focus:border-[#7359f8]"
                placeholder="Enter complete aptitude question text..."
                required
              />
            </div>

            {/* 4 Options Grid */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-[#c9c4d8] block">
                Answer Options &amp; Correct Key
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { key: 'A', val: optA, setVal: setOptA },
                  { key: 'B', val: optB, setVal: setOptB },
                  { key: 'C', val: optC, setVal: setOptC },
                  { key: 'D', val: optD, setVal: setOptD },
                ].map(({ key, val, setVal }) => (
                  <div
                    key={key}
                    className={`flex items-center gap-2 p-2 rounded-xl border ${
                      correctKey === key ? 'bg-[#7359f8]/20 border-[#7359f8]' : 'bg-[#1c1738] border-white/5'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setCorrectKey(key as 'A' | 'B' | 'C' | 'D')}
                      className={`w-7 h-7 rounded-lg text-xs font-black flex items-center justify-center shrink-0 cursor-pointer ${
                        correctKey === key ? 'bg-[#7359f8] text-white ring-2 ring-white/30' : 'bg-[#2a2254] text-[#c9c4d8]'
                      }`}
                    >
                      {key}
                    </button>
                    <input
                      type="text"
                      value={val}
                      onChange={(e) => setVal(e.target.value)}
                      placeholder={`Option ${key} text`}
                      className="flex-1 bg-transparent text-white text-xs outline-none"
                      required
                    />
                    {correctKey === key && (
                      <span className="text-[10px] font-black text-[#00e599] uppercase shrink-0">
                        Correct
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Pacing & Scratchpad Formula */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-[#c9c4d8] block mb-1">
                  Pace Countdown (Seconds)
                </label>
                <input
                  type="number"
                  value={paceSec}
                  onChange={(e) => setPaceSec(Number(e.target.value))}
                  min={10}
                  max={120}
                  className="w-full bg-[#1c1738] text-white text-xs font-bold rounded-xl px-3 py-2 border border-white/10 outline-none focus:border-[#7359f8]"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#c9c4d8] block mb-1">
                  Proctored Scratchpad Formula
                </label>
                <input
                  type="text"
                  value={formula}
                  onChange={(e) => setFormula(e.target.value)}
                  className="w-full bg-[#1c1738] text-white text-xs font-mono rounded-xl px-3 py-2 border border-white/10 outline-none focus:border-[#7359f8]"
                  placeholder="e.g. Speed = Dist / Time"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-[#c9c4d8] block mb-1">
                Detailed Solution &amp; Explanation
              </label>
              <input
                type="text"
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
                className="w-full bg-[#1c1738] text-white text-xs rounded-xl px-3 py-2 border border-white/10 outline-none focus:border-[#7359f8]"
                placeholder="Collegiate explanation shown in round reveal..."
              />
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-full bg-white/10 text-white text-xs font-bold hover:bg-white/20"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-[#7359f8] text-white text-xs font-black uppercase tracking-wider hover:bg-[#5c3fe0] shadow-lg transition-transform active:scale-95 flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                Inject Question Into Arena
              </button>
            </div>
          </form>
        )}

        {/* Tab 2: Database Schema Architecture */}
        {activeTab === 'database' && (
          <div className="flex-1 overflow-y-auto mt-4 pr-1 space-y-4 text-xs text-[#c9c4d8]">
            <div className="p-4 rounded-2xl bg-[#1c1738] border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-['Rubik'] font-black text-sm text-white">
                  1. Relational Database Schema (PostgreSQL / Cloud SQL)
                </h4>
                <button
                  onClick={() =>
                    copyCode(`CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  category VARCHAR(50) NOT NULL,
  section VARCHAR(50) NOT NULL,
  topic VARCHAR(100) NOT NULL,
  question TEXT NOT NULL,
  correct_key CHAR(1) NOT NULL,
  official_answer_text TEXT NOT NULL,
  standard_pace_sec INT DEFAULT 45,
  max_points INT DEFAULT 400,
  scratchpad_formula TEXT,
  explanation TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE question_options (
  id SERIAL PRIMARY KEY,
  question_id INT REFERENCES questions(id) ON DELETE CASCADE,
  option_key CHAR(1) NOT NULL,
  option_text TEXT NOT NULL,
  percentage INT DEFAULT 0,
  count INT DEFAULT 0
);`)
                  }
                  className="px-3 py-1 rounded-md bg-white/10 hover:bg-white/20 text-white font-mono text-[10px] flex items-center gap-1.5"
                >
                  <Copy className="w-3 h-3" />
                  {copiedSchema ? 'Copied SQL!' : 'Copy SQL'}
                </button>
              </div>
              <pre className="bg-[#0e082a] p-3 rounded-xl overflow-x-auto font-mono text-[11px] text-[#c8bfff]">
{`CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  category VARCHAR(50) NOT NULL, -- 'Quant', 'Logic', 'Verbal'
  section VARCHAR(50) NOT NULL,
  topic VARCHAR(100) NOT NULL,
  question TEXT NOT NULL,
  correct_key CHAR(1) NOT NULL,
  official_answer_text TEXT NOT NULL,
  standard_pace_sec INT DEFAULT 45,
  max_points INT DEFAULT 400,
  scratchpad_formula TEXT,
  explanation TEXT
);`}
              </pre>
            </div>

            <div className="p-4 rounded-2xl bg-[#1c1738] border border-white/10">
              <h4 className="font-['Rubik'] font-black text-sm text-white mb-2">
                2. REST API Integration (`app/api/questions/route.ts`)
              </h4>
              <p className="mb-2">
                Quitzo provides a built-in Next.js App Router API route to seamlessly query or insert questions:
              </p>
              <div className="space-y-1 font-mono text-[11px]">
                <div className="p-2 rounded bg-[#0e082a] text-emerald-400">
                  GET /api/questions?category=Quant <span className="text-gray-400">{'// Fetches list of questions'}</span>
                </div>
                <div className="p-2 rounded bg-[#0e082a] text-[#c8bfff]">
                  POST /api/questions <span className="text-gray-400">{'// Injects new question JSON payload'}</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#1c1738] border border-white/10">
              <h4 className="font-['Rubik'] font-black text-sm text-white mb-2">
                3. Loading in Frontend Components
              </h4>
              <p className="mb-2">
                Frontend components read questions via state initialized with `INITIAL_QUESTIONS` from `lib/quiz-data.ts`, or dynamically fetched on mount:
              </p>
              <pre className="bg-[#0e082a] p-3 rounded-xl overflow-x-auto font-mono text-[11px] text-gray-300">
{`useEffect(() => {
  async function loadQuestions() {
    const res = await fetch('/api/questions');
    const data = await res.json();
    if (data.questions) setQuestions(data.questions);
  }
  loadQuestions();
}, []);`}
              </pre>
            </div>
          </div>
        )}

        {/* Tab 3: JSON Template */}
        {activeTab === 'sample' && (
          <div className="flex-1 overflow-y-auto mt-4 pr-1 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#c9c4d8]">
                Standard QuizQuestion payload format for direct import:
              </span>
              <button
                onClick={() => copyCode(sampleJson)}
                className="px-3 py-1.5 rounded-lg bg-[#7359f8] hover:bg-[#5c3fe0] text-white text-xs font-bold flex items-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                {copiedSchema ? 'Copied JSON!' : 'Copy Template JSON'}
              </button>
            </div>
            <pre className="bg-[#1c1738] p-4 rounded-2xl border border-white/10 font-mono text-xs text-[#c8bfff] overflow-x-auto max-h-[320px]">
              {sampleJson}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
