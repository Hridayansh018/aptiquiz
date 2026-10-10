export type QuestionCategory = 'Quant' | 'Logic' | 'Verbal' | 'Data Interpretation';

export interface QuizQuestion {
  id: number;
  category: QuestionCategory;
  section: string;
  topic: string;
  question: string;
  options: {
    key: 'A' | 'B' | 'C' | 'D';
    text: string;
    percentage: number;
    count: number;
    isCorrect?: boolean;
  }[];
  correctKey: 'A' | 'B' | 'C' | 'D';
  officialAnswerText: string;
  standardPaceSec: number;
  maxPoints: number;
  scratchpadFormula: string;
  explanation: string;
}

export interface Achievement {
  id: string;
  name: string;
  category: 'points' | 'speed' | 'streak' | 'accuracy';
  description: string;
  iconName: string;
  milestonePoints: number;
  tier: 'bronze' | 'silver' | 'gold' | 'diamond';
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  unlockedAt?: string;
  badgeLabel: string;
}

export interface RoundPerformance {
  round: number;
  roundName: string;
  topic: string;
  scoreEarned: number;
  cumulativeXP: number;
  latencySec: number;
  rank: number;
  accuracy: number;
}

export interface Player {
  id: string;
  initials: string;
  name: string;
  college: string;
  status: 'top-seed' | 'ready' | 'streak' | 'active';
  streakCount?: number;
  score: number;
  rank: number;
  deltaRanks?: number;
  deltaPoints?: number;
  accuracyRate: number;
  isCurrentUser?: boolean;
}

export interface HostedQuizRoom {
  roomCode: string;
  title: string;
  category: QuestionCategory;
  hostName: string;
  playersJoined: number;
  maxPlayers: number;
  status: 'live' | 'lobby' | 'starting-soon';
  roundInfo: string;
  questionCount: number;
  tags: string[];
}

export function getCategoryMeta(category: QuestionCategory) {
  switch (category) {
    case 'Quant':
      return {
        label: 'QUANT',
        badgeBg: 'bg-[#7359f8]',
        badgeText: 'text-white',
        border: 'border-purple-300/40',
        ring: 'ring-purple-400/30',
        dot: 'bg-[#c8bfff]',
        name: 'Quantitative Aptitude',
        accentColor: '#7359f8'
      };
    case 'Logic':
      return {
        label: 'LOGIC',
        badgeBg: 'bg-amber-600',
        badgeText: 'text-white',
        border: 'border-amber-300/40',
        ring: 'ring-amber-400/30',
        dot: 'bg-amber-300',
        name: 'Logical Reasoning',
        accentColor: '#d97706'
      };
    case 'Verbal':
      return {
        label: 'VERBAL',
        badgeBg: 'bg-emerald-600',
        badgeText: 'text-white',
        border: 'border-emerald-300/40',
        ring: 'ring-emerald-400/30',
        dot: 'bg-emerald-300',
        name: 'Verbal Ability',
        accentColor: '#059669'
      };
    default:
      return {
        label: 'APTITUDE',
        badgeBg: 'bg-[#7359f8]',
        badgeText: 'text-white',
        border: 'border-white/20',
        ring: 'ring-white/20',
        dot: 'bg-[#c8bfff]',
        name: 'General Aptitude',
        accentColor: '#7359f8'
      };
  }
}

// ---------------------------------------------------------------------------
// Clean State Collections (No Hardcoded Mock Data)
// Real data is pulled dynamically from Supabase database tables.
// ---------------------------------------------------------------------------

export const INITIAL_HOSTED_QUIZZES: HostedQuizRoom[] = [];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'aptitude-ace',
    name: 'Aptitude Ace',
    category: 'points',
    description: 'Surpass 3,000 milestone XP in collegiate aptitude challenges',
    iconName: 'Award',
    milestonePoints: 3000,
    tier: 'gold',
    progress: 0,
    maxProgress: 3000,
    unlocked: false,
    badgeLabel: '3,000 XP Milestone'
  },
  {
    id: 'speedster',
    name: 'Speedster',
    category: 'speed',
    description: 'Lock in a correct verdict in under 5.0 seconds with >95% precision',
    iconName: 'Zap',
    milestonePoints: 800,
    tier: 'silver',
    progress: 0,
    maxProgress: 5.0,
    unlocked: false,
    badgeLabel: '⚡ Speedster'
  },
  {
    id: 'streak-prodigy',
    name: 'Streak Prodigy',
    category: 'streak',
    description: 'Maintain an unbroken streak of 5 or more consecutive correct responses',
    iconName: 'Flame',
    milestonePoints: 1500,
    tier: 'gold',
    progress: 0,
    maxProgress: 5,
    unlocked: false,
    badgeLabel: '🔥 Streak Prodigy'
  },
  {
    id: 'grand-contender',
    name: 'Grand Contender',
    category: 'points',
    description: 'Achieve 5,000+ total cumulative XP to attain Tier-1 Master standing',
    iconName: 'Trophy',
    milestonePoints: 5000,
    tier: 'diamond',
    progress: 0,
    maxProgress: 5000,
    unlocked: false,
    badgeLabel: '5,000 XP Milestone'
  },
  {
    id: 'campus-vanguard',
    name: 'Campus Vanguard',
    category: 'accuracy',
    description: 'Climb into the top 5 of the auditorium leaderboard standings',
    iconName: 'Star',
    milestonePoints: 2000,
    tier: 'gold',
    progress: 0,
    maxProgress: 5,
    unlocked: false,
    badgeLabel: '🎖️ Top 5 Ranked'
  },
  {
    id: 'precision-hawk',
    name: 'Precision Hawk',
    category: 'accuracy',
    description: 'Finish a quantitative section with greater than 90% accuracy rate',
    iconName: 'Target',
    milestonePoints: 2500,
    tier: 'silver',
    progress: 0,
    maxProgress: 90,
    unlocked: false,
    badgeLabel: '90% Precision'
  }
];

export const INITIAL_PERFORMANCE_HISTORY: RoundPerformance[] = [];

export const INITIAL_QUESTIONS: QuizQuestion[] = [];

export const INITIAL_PLAYERS: Player[] = [];
