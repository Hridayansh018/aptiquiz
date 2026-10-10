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
// 10 Curated Quizzes (Ready to Start, Mapped to 10 Question Sets)
// ---------------------------------------------------------------------------
export const DEFAULT_10_QUIZZES: HostedQuizRoom[] = [
  {
    roomCode: 'QUANT101',
    title: 'Collegiate Quantitative Speed Qualifier',
    category: 'Quant',
    hostName: 'Prof. S. Ranganathan',
    playersJoined: 24,
    maxPlayers: 100,
    status: 'lobby',
    roundInfo: 'Round 01 / 30',
    questionCount: 30,
    tags: ['National', 'Quant Speed', 'Tier-1'],
  },
  {
    roomCode: 'LOGIC202',
    title: 'Deductive & Logical Reasoning Arena',
    category: 'Logic',
    hostName: 'Dr. Anita Joshi',
    playersJoined: 18,
    maxPlayers: 80,
    status: 'lobby',
    roundInfo: 'Round 01 / 30',
    questionCount: 30,
    tags: ['GATE', 'Logic Puzzles', 'Syllogisms'],
  },
  {
    roomCode: 'VERBAL303',
    title: 'Verbal Ability & Critical Reading Sprint',
    category: 'Verbal',
    hostName: 'Prof. Vikram Roy',
    playersJoined: 15,
    maxPlayers: 60,
    status: 'lobby',
    roundInfo: 'Round 01 / 30',
    questionCount: 30,
    tags: ['CAT/GMAT', 'Vocabulary', 'Analogies'],
  },
  {
    roomCode: 'DATA404',
    title: 'Data Interpretation & Chart Championship',
    category: 'Data Interpretation',
    hostName: 'Dr. Meera Swaminathan',
    playersJoined: 20,
    maxPlayers: 100,
    status: 'lobby',
    roundInfo: 'Round 01 / 30',
    questionCount: 30,
    tags: ['DI & Analytics', 'Bar Charts', 'Pie Charts'],
  },
  {
    roomCode: 'SPEED505',
    title: 'Time, Work & Motion Speed Sprint',
    category: 'Quant',
    hostName: 'Prof. C. Verma',
    playersJoined: 28,
    maxPlayers: 120,
    status: 'lobby',
    roundInfo: 'Round 01 / 30',
    questionCount: 30,
    tags: ['Time & Work', 'Distance & Pipes', 'High Speed'],
  },
  {
    roomCode: 'PROB606',
    title: 'Combinatorics & Probability Masters',
    category: 'Quant',
    hostName: 'Prof. R. Sundaram',
    playersJoined: 12,
    maxPlayers: 80,
    status: 'lobby',
    roundInfo: 'Round 01 / 30',
    questionCount: 30,
    tags: ['Probability', 'Permutations', 'Combinations'],
  },
  {
    roomCode: 'ALGEBRA707',
    title: 'High-Yield Algebra & Geometry Battle',
    category: 'Quant',
    hostName: 'Dr. Neha Agarwal',
    playersJoined: 16,
    maxPlayers: 90,
    status: 'lobby',
    roundInfo: 'Round 01 / 30',
    questionCount: 30,
    tags: ['Algebra', 'Geometry', 'Quadratics'],
  },
  {
    roomCode: 'SERIES808',
    title: 'Number Systems & Sequences Blitz',
    category: 'Quant',
    hostName: 'Auditorium Host Desk',
    playersJoined: 22,
    maxPlayers: 100,
    status: 'lobby',
    roundInfo: 'Round 01 / 30',
    questionCount: 30,
    tags: ['Number Theory', 'Series & Progressions', 'Fast-Track'],
  },
  {
    roomCode: 'CAMPUS909',
    title: 'Tier-1 Campus Placement Grand Prix',
    category: 'Quant',
    hostName: 'Placement Coordination Cell',
    playersJoined: 42,
    maxPlayers: 250,
    status: 'lobby',
    roundInfo: 'Round 01 / 30',
    questionCount: 30,
    tags: ['Placement 2026', 'TCS/Infosys/Accenture', 'Campus Grand Prix'],
  },
  {
    roomCode: 'ADVMIX010',
    title: 'Elite Advanced Mixed Aptitude Gauntlet',
    category: 'Logic',
    hostName: 'Dr. K. Narayanan',
    playersJoined: 31,
    maxPlayers: 150,
    status: 'lobby',
    roundInfo: 'Round 01 / 30',
    questionCount: 30,
    tags: ['Olympiad', 'Hard Mixed', 'Championship'],
  },
];

export const INITIAL_HOSTED_QUIZZES: HostedQuizRoom[] = DEFAULT_10_QUIZZES;

export const INITIAL_ACHIEVEMENTS: Achievement[] = [];

export const INITIAL_PERFORMANCE_HISTORY: RoundPerformance[] = [];

export const INITIAL_QUESTIONS: QuizQuestion[] = [];

export const INITIAL_PLAYERS: Player[] = [];

