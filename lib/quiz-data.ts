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

export const INITIAL_ACHIEVEMENTS: Achievement[] = [];

export const INITIAL_PERFORMANCE_HISTORY: RoundPerformance[] = [];

export const INITIAL_QUESTIONS: QuizQuestion[] = [];

export const INITIAL_PLAYERS: Player[] = [];
