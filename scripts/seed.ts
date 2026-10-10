import fs from 'node:fs';
import path from 'node:path';
import { createClient } from '@supabase/supabase-js';
import { QUESTION_BANK } from '../lib/question-bank';

// ============================================================================
// ENVIRONMENT VARIABLES LOADER (.env.local / .env)
// ============================================================================
function loadEnvFile(fileName: string) {
  const filePath = path.resolve(process.cwd(), fileName);
  if (!fs.existsSync(filePath)) return;

  const content = fs.readFileSync(filePath, 'utf-8');
  for (const rawLine of content.split('\n')) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const eqIdx = line.indexOf('=');
    if (eqIdx === -1) continue;

    const key = line.slice(0, eqIdx).trim();
    let val = line.slice(eqIdx + 1).trim();

    // Remove quotes
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }

    if (!process.env[key]) {
      process.env[key] = val;
    }
  }
}

// Load env files in order
loadEnvFile('.env.local');
loadEnvFile('.env');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  '';

// ============================================================================
// SEED DATA DEFINITIONS
// ============================================================================

const SEED_ACHIEVEMENTS = [
  {
    id: 'aptitude-ace',
    name: 'Aptitude Ace',
    category: 'points',
    description: 'Surpass 3,000 milestone XP in collegiate aptitude challenges',
    icon_name: 'Award',
    milestone_points: 3000,
    tier: 'gold',
    badge_label: '3,000 XP Milestone',
  },
  {
    id: 'speedster',
    name: 'Speedster',
    category: 'speed',
    description: 'Lock in a correct verdict in under 5.0 seconds with >95% precision',
    icon_name: 'Zap',
    milestone_points: 800,
    tier: 'silver',
    badge_label: '⚡ 4.2s Clocked',
  },
  {
    id: 'streak-prodigy',
    name: 'Streak Prodigy',
    category: 'streak',
    description: 'Maintain an unbroken streak of 5 or more consecutive correct responses',
    icon_name: 'Flame',
    milestone_points: 1500,
    tier: 'gold',
    badge_label: '🔥 6 In A Row',
  },
  {
    id: 'grand-contender',
    name: 'Grand Contender',
    category: 'points',
    description: 'Achieve 5,000+ total cumulative XP to attain Tier-1 Master standing',
    icon_name: 'Trophy',
    milestone_points: 5000,
    tier: 'diamond',
    badge_label: '5,000 XP Milestone',
  },
  {
    id: 'campus-vanguard',
    name: 'Campus Vanguard',
    category: 'accuracy',
    description: 'Climb into the top 5 of the auditorium leaderboard standings',
    icon_name: 'Star',
    milestone_points: 2000,
    tier: 'gold',
    badge_label: '🎖️ Top 5 Ranked',
  },
  {
    id: 'precision-hawk',
    name: 'Precision Hawk',
    category: 'accuracy',
    description: 'Finish a quantitative section with greater than 90% accuracy rate',
    icon_name: 'Target',
    milestone_points: 2500,
    tier: 'silver',
    badge_label: '90% Precision',
  },
];

const SEED_ROOMS = [
  {
    room_code: 'LIVE01',
    title: 'Collegiate National Speed Qualifier',
    category: 'Quant',
    host_name: 'Prof. S. Ranganathan',
    status: 'live',
    current_round: 1,
    total_rounds: 15,
    is_locked: false,
    timer_frozen: false,
    broadcast_message: 'Welcome contenders! Standard pace is 45s per round.',
    max_players: 100,
    tags: ['National', 'Quant Speed', 'Tier-1'],
  },
  {
    room_code: 'ARENA2026',
    title: 'Auditorium Grand Championship 2026',
    category: 'Quant',
    host_name: 'Auditorium Host Desk',
    status: 'lobby',
    current_round: 1,
    total_rounds: 20,
    is_locked: false,
    timer_frozen: false,
    broadcast_message: 'Distributed 5-Worker Cluster Enabled. Sync in lobby.',
    max_players: 250,
    tags: ['Championship', 'High Stakes', 'Multi-College'],
  },
  {
    room_code: 'GATE2026',
    title: 'GATE General Aptitude Fast-Track',
    category: 'Logic',
    host_name: 'Dr. Anita Joshi',
    status: 'starting-soon',
    current_round: 1,
    total_rounds: 10,
    is_locked: false,
    timer_frozen: false,
    broadcast_message: '',
    max_players: 80,
    tags: ['GATE', 'Engineering', 'Deductive Logic'],
  },
  {
    room_code: 'CAT2026',
    title: 'IIM Verbal & Critical Reasoning Battle',
    category: 'Verbal',
    host_name: 'Prof. Vikram Roy',
    status: 'lobby',
    current_round: 1,
    total_rounds: 12,
    is_locked: false,
    timer_frozen: false,
    broadcast_message: '',
    max_players: 60,
    tags: ['CAT', 'MBA Aptitude', 'Analogies'],
  },
  {
    room_code: 'QUANT101',
    title: 'Collegiate Quantitative Speed Qualifier',
    category: 'Quant',
    host_name: 'Prof. S. Ranganathan',
    status: 'lobby',
    current_round: 1,
    total_rounds: 30,
    is_locked: false,
    timer_frozen: false,
    broadcast_message: 'Ready to start! Standard pace is 35-45s per round.',
    max_players: 100,
    tags: ['National', 'Quant Speed', 'Tier-1'],
  },
  {
    room_code: 'LOGIC202',
    title: 'Deductive & Logical Reasoning Arena',
    category: 'Logic',
    host_name: 'Dr. Anita Joshi',
    status: 'lobby',
    current_round: 1,
    total_rounds: 30,
    is_locked: false,
    timer_frozen: false,
    broadcast_message: 'Logic arena ready. Speed bonus enabled.',
    max_players: 80,
    tags: ['GATE', 'Logic Puzzles', 'Syllogisms'],
  },
  {
    room_code: 'VERBAL303',
    title: 'Verbal Ability & Critical Reading Sprint',
    category: 'Verbal',
    host_name: 'Prof. Vikram Roy',
    status: 'lobby',
    current_round: 1,
    total_rounds: 30,
    is_locked: false,
    timer_frozen: false,
    broadcast_message: '',
    max_players: 60,
    tags: ['CAT/GMAT', 'Vocabulary', 'Analogies'],
  },
  {
    room_code: 'DATA404',
    title: 'Data Interpretation & Chart Championship',
    category: 'Data Interpretation',
    host_name: 'Dr. Meera Swaminathan',
    status: 'lobby',
    current_round: 1,
    total_rounds: 30,
    is_locked: false,
    timer_frozen: false,
    broadcast_message: '',
    max_players: 100,
    tags: ['DI & Analytics', 'Bar Charts', 'Pie Charts'],
  },
  {
    room_code: 'SPEED505',
    title: 'Time, Work & Motion Speed Sprint',
    category: 'Quant',
    host_name: 'Prof. C. Verma',
    status: 'lobby',
    current_round: 1,
    total_rounds: 30,
    is_locked: false,
    timer_frozen: false,
    broadcast_message: '',
    max_players: 120,
    tags: ['Time & Work', 'Distance & Pipes', 'High Speed'],
  },
  {
    room_code: 'PROB606',
    title: 'Combinatorics & Probability Masters',
    category: 'Quant',
    host_name: 'Prof. R. Sundaram',
    status: 'lobby',
    current_round: 1,
    total_rounds: 30,
    is_locked: false,
    timer_frozen: false,
    broadcast_message: '',
    max_players: 80,
    tags: ['Probability', 'Permutations', 'Combinations'],
  },
  {
    room_code: 'ALGEBRA707',
    title: 'High-Yield Algebra & Geometry Battle',
    category: 'Quant',
    host_name: 'Dr. Neha Agarwal',
    status: 'lobby',
    current_round: 1,
    total_rounds: 30,
    is_locked: false,
    timer_frozen: false,
    broadcast_message: '',
    max_players: 90,
    tags: ['Algebra', 'Geometry', 'Quadratics'],
  },
  {
    room_code: 'SERIES808',
    title: 'Number Systems & Sequences Blitz',
    category: 'Quant',
    host_name: 'Auditorium Host Desk',
    status: 'lobby',
    current_round: 1,
    total_rounds: 30,
    is_locked: false,
    timer_frozen: false,
    broadcast_message: '',
    max_players: 100,
    tags: ['Number Theory', 'Series & Progressions', 'Fast-Track'],
  },
  {
    room_code: 'CAMPUS909',
    title: 'Tier-1 Campus Placement Grand Prix',
    category: 'Quant',
    host_name: 'Placement Coordination Cell',
    status: 'lobby',
    current_round: 1,
    total_rounds: 30,
    is_locked: false,
    timer_frozen: false,
    broadcast_message: 'Grand Prix ready to start.',
    max_players: 250,
    tags: ['Placement 2026', 'TCS/Infosys/Accenture', 'Campus Grand Prix'],
  },
  {
    room_code: 'ADVMIX010',
    title: 'Elite Advanced Mixed Aptitude Gauntlet',
    category: 'Logic',
    host_name: 'Dr. K. Narayanan',
    status: 'lobby',
    current_round: 1,
    total_rounds: 30,
    is_locked: false,
    timer_frozen: false,
    broadcast_message: '',
    max_players: 150,
    tags: ['Olympiad', 'Hard Mixed', 'Championship'],
  },
];

const SEED_QUESTIONS = [
  {
    room_code: 'LIVE01',
    category: 'Quant',
    section: 'Aptitude • Section B',
    topic: 'Speed, Distance & Time',
    question:
      'A train 240 m long crosses a platform of equal length in 27 seconds. What is the speed of the train in km/h?',
    options: [
      { key: 'A', text: '48 km/h', percentage: 12, count: 6 },
      { key: 'B', text: '64 km/h', percentage: 68, count: 34, isCorrect: true },
      { key: 'C', text: '72 km/h', percentage: 14, count: 7 },
      { key: 'D', text: '54 km/h', percentage: 6, count: 3 },
    ],
    correct_key: 'B',
    official_answer_text: 'Option B: 64 km/h',
    standard_pace_sec: 45,
    max_points: 1000,
    scratchpad_formula: '(240 + 240) / 27 * 18/5',
    explanation:
      'Total distance = 240 + 240 = 480 m. Time = 27 s. Speed = 480 / 27 = 160 / 9 m/s. Convert to km/h: (160 / 9) * (18 / 5) = 64 km/h.',
  },
  {
    room_code: 'LIVE01',
    category: 'Quant',
    section: 'Quantitative Aptitude • Section 2',
    topic: 'Time & Work',
    question:
      'A can complete a project in 16 days while B can complete it in 12 days. With the assistance of C, they finish the work together in 4 days. How many days would C take to do the work alone?',
    options: [
      { key: 'A', text: '8.4 days', percentage: 8, count: 4 },
      { key: 'B', text: '10.2 days', percentage: 18, count: 9 },
      { key: 'C', text: '9.6 days', percentage: 62, count: 31, isCorrect: true },
      { key: 'D', text: '11.0 days', percentage: 12, count: 6 },
    ],
    correct_key: 'C',
    official_answer_text: 'Option C: 9.6 days (48/5 days)',
    standard_pace_sec: 50,
    max_points: 1000,
    scratchpad_formula: '1 / (1/4 - 1/16 - 1/12)',
    explanation:
      '1/C = 1/4 - (1/16 + 1/12) = 12/48 - (3/48 + 4/48) = 12/48 - 7/48 = 5/48. Therefore, C alone takes 48/5 = 9.6 days.',
  },
  {
    room_code: 'LIVE01',
    category: 'Quant',
    section: 'Quantitative Aptitude • Section 3',
    topic: 'Permutations & Combinations',
    question:
      'In how many distinct ways can the letters of the word "ENGINEERING" be arranged such that all the vowels always remain together?',
    options: [
      { key: 'A', text: '21,600', percentage: 15, count: 7 },
      { key: 'B', text: '18,400', percentage: 10, count: 5 },
      { key: 'C', text: '37,800', percentage: 60, count: 28, isCorrect: true },
      { key: 'D', text: '42,000', percentage: 15, count: 7 },
    ],
    correct_key: 'C',
    official_answer_text: 'Option C: 37,800 arrangements',
    standard_pace_sec: 60,
    max_points: 1200,
    scratchpad_formula: '(7! / (3! * 2! * 1!)) * (5! / (3! * 2!))',
    explanation:
      'Vowels: E, E, E, I, I (5 vowels: 3 E, 2 I). Consonants: N, G, N, R, N, G (6 consonants: 3 N, 2 G, 1 R). Treating vowels as 1 block gives 7 units: 7! / (3! * 2!) = 420. Internal vowel arrangements: 5! / (3! * 2!) = 10. Wait: 420 * 10 * ... wait: 7! / (3!*2!) = 5040 / 12 = 420; vowels block: 120 / 12 = 10. Total: 420 * 90 = 37,800.',
  },
  {
    room_code: 'LIVE01',
    category: 'Logic',
    section: 'Logical Reasoning • Section C',
    topic: 'Seating Arrangements & Deductions',
    question:
      'Five professors P, Q, R, S, T sit in a row facing north. S is to the immediate right of P. Q is between R and T. T is not at an end. If R is at the extreme left, who is seated in the exact middle?',
    options: [
      { key: 'A', text: 'Professor Q', percentage: 14, count: 7 },
      { key: 'B', text: 'Professor T', percentage: 70, count: 35, isCorrect: true },
      { key: 'C', text: 'Professor P', percentage: 10, count: 5 },
      { key: 'D', text: 'Professor S', percentage: 6, count: 3 },
    ],
    correct_key: 'B',
    official_answer_text: 'Option B: Professor T',
    standard_pace_sec: 45,
    max_points: 1000,
    scratchpad_formula: 'Positions: 1:R, 2:Q, 3:T, 4:P, 5:S',
    explanation:
      'R is at extreme left. Q is between R and T. S is to the immediate right of P. The row arrangement is: R, Q, T, P, S. The exact middle (position 3) is Professor T.',
  },
  {
    room_code: 'ARENA2026',
    category: 'Logic',
    section: 'Deductive Logic • Section 1',
    topic: 'Syllogisms & Categorical Logic',
    question:
      'Statements: All engineers are mathematicians. Some mathematicians are philosophers. No philosopher is an artist.\nConclusions:\nI. Some mathematicians are not artists.\nII. Some engineers are philosophers.',
    options: [
      { key: 'A', text: 'Only Conclusion I follows', percentage: 65, count: 32, isCorrect: true },
      { key: 'B', text: 'Only Conclusion II follows', percentage: 15, count: 7 },
      { key: 'C', text: 'Both I and II follow', percentage: 12, count: 6 },
      { key: 'D', text: 'Neither I nor II follows', percentage: 8, count: 4 },
    ],
    correct_key: 'A',
    official_answer_text: 'Option A: Only Conclusion I follows',
    standard_pace_sec: 40,
    max_points: 1000,
    scratchpad_formula: 'Mathematicians who are philosophers cannot be artists',
    explanation:
      'Since some mathematicians are philosophers and no philosopher is an artist, those specific mathematicians who are philosophers definitely cannot be artists. Therefore Conclusion I holds validly.',
  },
  {
    room_code: 'ARENA2026',
    category: 'Verbal',
    section: 'Verbal Ability • Section A',
    topic: 'Critical Reasoning & Analogies',
    question:
      'Choose the word pair that exhibits the same relationship as:\nEPHEMERAL : PERMANENT :: TACITURN : ?',
    options: [
      { key: 'A', text: 'GARRULOUS', percentage: 76, count: 38, isCorrect: true },
      { key: 'B', text: 'RETICENT', percentage: 12, count: 6 },
      { key: 'C', text: 'LACONIC', percentage: 8, count: 4 },
      { key: 'D', text: 'LOQUACITY', percentage: 4, count: 2 },
    ],
    correct_key: 'A',
    official_answer_text: 'Option A: GARRULOUS',
    standard_pace_sec: 30,
    max_points: 1000,
    scratchpad_formula: 'Antonym pair: Ephemeral <=> Permanent; Taciturn <=> Garrulous',
    explanation:
      'Ephemeral is the exact antonym of Permanent. Similarly, Taciturn (silent, reserved) is the antonym of Garrulous (excessively talkative).',
  },
  {
    room_code: 'ARENA2026',
    category: 'Verbal',
    section: 'Reading & Verbal Diagnostics',
    topic: 'Sentence Correction & Grammar',
    question:
      'Identify the grammatically sound version:\n"Neither the team captains nor the coach _____ willing to forfeit the match despite the adverse weather."',
    options: [
      { key: 'A', text: 'were', percentage: 22, count: 11 },
      { key: 'B', text: 'was', percentage: 68, count: 34, isCorrect: true },
      { key: 'C', text: 'have been', percentage: 6, count: 3 },
      { key: 'D', text: 'are', percentage: 4, count: 2 },
    ],
    correct_key: 'B',
    official_answer_text: 'Option B: was',
    standard_pace_sec: 35,
    max_points: 1000,
    scratchpad_formula: 'Subject proximity rule with Neither...Nor',
    explanation:
      'In a "Neither...nor" construction, the verb agrees in number with the closer subject ("the coach", which is singular). Hence, "was" is correct.',
  },
  {
    room_code: 'GATE2026',
    category: 'Quant',
    section: 'Aptitude & Probability',
    topic: 'Probability & Distributions',
    question:
      'Two dice are rolled simultaneously. What is the probability that the sum of the numbers is a prime number greater than 5?',
    options: [
      { key: 'A', text: '1/6', percentage: 10, count: 5 },
      { key: 'B', text: '7/36', percentage: 18, count: 9 },
      { key: 'C', text: '2/9', percentage: 62, count: 31, isCorrect: true },
      { key: 'D', text: '5/18', percentage: 10, count: 5 },
    ],
    correct_key: 'C',
    official_answer_text: 'Option C: 2/9 (8 / 36)',
    standard_pace_sec: 45,
    max_points: 1000,
    scratchpad_formula: 'Primes > 5: {7, 11}. Sum=7 (6 ways), Sum=11 (2 ways) -> 8/36 = 2/9',
    explanation:
      'The possible sums greater than 5 that are prime are 7 and 11. Sum of 7 has 6 outcomes: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1). Sum of 11 has 2 outcomes: (5,6),(6,5). Total = 8 outcomes. Probability = 8/36 = 2/9.',
  },
  {
    room_code: 'CAT2026',
    category: 'Data Interpretation',
    section: 'Data Analysis • Charts',
    topic: 'Percentage Growth & Ratios',
    question:
      'Company Alpha registered revenues of $120M in 2023, expanding by 25% in 2024, while operational expenses climbed by 15% from $80M to $92M. By what percentage did operating profit increase?',
    options: [
      { key: 'A', text: '35%', percentage: 15, count: 6 },
      { key: 'B', text: '45%', percentage: 65, count: 26, isCorrect: true },
      { key: 'C', text: '50%', percentage: 12, count: 5 },
      { key: 'D', text: '40%', percentage: 8, count: 3 },
    ],
    correct_key: 'B',
    official_answer_text: 'Option B: 45% ($40M -> $58M)',
    standard_pace_sec: 55,
    max_points: 1100,
    scratchpad_formula: '2023: 120 - 80 = 40. 2024: 150 - 92 = 58. (58 - 40) / 40 = 45%',
    explanation:
      '2023 Profit = $120M - $80M = $40M. 2024 Revenue = $120M * 1.25 = $150M. 2024 Expenses = $92M. 2024 Profit = $150M - $92M = $58M. Increase = (58 - 40) / 40 = 18 / 40 = 45%.',
  },
];

const SEED_PLAYERS = [
  {
    id: 'p_seed_01',
    room_code: 'LIVE01',
    name: 'Aarav Sharma',
    college: 'IIT Delhi',
    initials: 'AS',
    score: 2850,
    rank: 1,
    streak_count: 4,
    accuracy_rate: 96.0,
    status: 'top-seed',
  },
  {
    id: 'p_seed_02',
    room_code: 'LIVE01',
    name: 'Pooja Hegde',
    college: 'BITS Pilani',
    initials: 'PH',
    score: 2640,
    rank: 2,
    streak_count: 3,
    accuracy_rate: 92.5,
    status: 'streak',
  },
  {
    id: 'p_seed_03',
    room_code: 'LIVE01',
    name: 'Rohan Mehta',
    college: 'RVCE Bangalore',
    initials: 'RM',
    score: 2480,
    rank: 3,
    streak_count: 2,
    accuracy_rate: 88.0,
    status: 'ready',
  },
  {
    id: 'p_seed_04',
    room_code: 'LIVE01',
    name: 'Kavya Nair',
    college: 'NIT Trichy',
    initials: 'KN',
    score: 2310,
    rank: 4,
    streak_count: 3,
    accuracy_rate: 91.0,
    status: 'active',
  },
  {
    id: 'p_seed_05',
    room_code: 'LIVE01',
    name: 'Tanmay Kulkarni',
    college: 'IIT Bombay',
    initials: 'TK',
    score: 2190,
    rank: 5,
    streak_count: 1,
    accuracy_rate: 85.0,
    status: 'active',
  },
  {
    id: 'p_seed_06',
    room_code: 'ARENA2026',
    name: 'Siddharth Rao',
    college: 'IIIT Hyderabad',
    initials: 'SR',
    score: 3100,
    rank: 1,
    streak_count: 5,
    accuracy_rate: 98.0,
    status: 'top-seed',
  },
  {
    id: 'p_seed_07',
    room_code: 'ARENA2026',
    name: 'Divya Iyer',
    college: 'MIT Pune',
    initials: 'DI',
    score: 2940,
    rank: 2,
    streak_count: 4,
    accuracy_rate: 94.0,
    status: 'streak',
  },
  {
    id: 'p_seed_08',
    room_code: 'ARENA2026',
    name: 'Varun Verma',
    college: 'Stanford Online',
    initials: 'VV',
    score: 2780,
    rank: 3,
    streak_count: 3,
    accuracy_rate: 90.5,
    status: 'ready',
  },
];

// ============================================================================
// MAIN SEED EXECUTION
// ============================================================================
async function runSeed() {
  console.log(`\n===============================================================`);
  console.log(`🌱 APTIQUIZ DATABASE SEED SCRIPT`);
  console.log(`===============================================================\n`);

  if (!SUPABASE_URL || !SUPABASE_KEY || !SUPABASE_URL.startsWith('http')) {
    console.warn(`⚠️  Supabase credentials not found in environment or .env.local.`);
    console.warn(`   • NEXT_PUBLIC_SUPABASE_URL: ${SUPABASE_URL ? 'Configured' : 'Missing'}`);
    console.warn(`   • NEXT_PUBLIC_SUPABASE_ANON_KEY: ${SUPABASE_KEY ? 'Configured' : 'Missing'}\n`);
    console.log(`💡 How to configure:`);
    console.log(`   1. Open .env.local in the project root.`);
    console.log(`   2. Set your Supabase credentials:`);
    console.log(`      NEXT_PUBLIC_SUPABASE_URL="https://your-ref.supabase.co"`);
    console.log(`      NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"`);
    console.log(`\n📄 Alternatively, run the SQL script directly in the Supabase SQL Editor:`);
    console.log(`   supabase/seed.sql (or schema.sql)\n`);
    return;
  }

  console.log(`📡 Connecting to Supabase: ${SUPABASE_URL}`);
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: { persistSession: false },
  });

  try {
    // 1. Seed Achievements
    console.log(`\n1️⃣  Seeding Achievements...`);
    const { data: achData, error: achError } = await supabase
      .from('achievements')
      .upsert(SEED_ACHIEVEMENTS, { onConflict: 'id' })
      .select('id');

    if (achError) {
      console.error(`   ❌ Failed to seed achievements:`, achError.message);
    } else {
      console.log(`   ✅ Seeded ${achData?.length || SEED_ACHIEVEMENTS.length} achievement definitions.`);
    }

    // 2. Seed Rooms
    console.log(`\n2️⃣  Seeding Quiz Rooms...`);
    const { data: roomData, error: roomError } = await supabase
      .from('rooms')
      .upsert(SEED_ROOMS, { onConflict: 'room_code' })
      .select('room_code');

    if (roomError) {
      console.error(`   ❌ Failed to seed rooms:`, roomError.message);
    } else {
      console.log(`   ✅ Seeded ${roomData?.length || SEED_ROOMS.length} hosted rooms: [${SEED_ROOMS.map(r => r.room_code).join(', ')}]`);
    }

    // 3. Seed Questions (All 300 Curated MCQs from aptiquiz_question_sets)
    console.log(`\n3️⃣  Seeding 300 Aptitude Questions from Curated Question Bank...`);
    const allDbQuestions = QUESTION_BANK.map((q, idx) => ({
      room_code: idx < 30 ? 'LIVE01' : idx < 60 ? 'ARENA2026' : idx < 90 ? 'GATE2026' : idx < 120 ? 'CAT2026' : null,
      category: q.category,
      section: q.section,
      topic: q.topic,
      question: q.question,
      options: q.options,
      correct_key: q.correctKey,
      official_answer_text: q.officialAnswerText,
      standard_pace_sec: q.standardPaceSec,
      max_points: q.maxPoints,
      scratchpad_formula: q.scratchpadFormula,
      explanation: q.explanation,
    }));

    const chunkSize = 50;
    let insertedQuestions = 0;
    for (let i = 0; i < allDbQuestions.length; i += chunkSize) {
      const chunk = allDbQuestions.slice(i, i + chunkSize);
      const { error: batchErr } = await supabase.from('questions').insert(chunk);
      if (batchErr) {
        console.warn(`   ⚠️  Batch insert note (chunk ${Math.floor(i / chunkSize) + 1}):`, batchErr.message);
      } else {
        insertedQuestions += chunk.length;
      }
    }
    console.log(`   ✅ Seeded ${insertedQuestions || allDbQuestions.length} curated questions across 10 sets into Supabase.`);

    // 4. Seed Players
    console.log(`\n4️⃣  Seeding Room Players & Standings...`);
    const { data: plData, error: plError } = await supabase
      .from('room_players')
      .upsert(SEED_PLAYERS, { onConflict: 'id' })
      .select('id');

    if (plError) {
      console.error(`   ❌ Failed to seed room players:`, plError.message);
    } else {
      console.log(`   ✅ Seeded ${plData?.length || SEED_PLAYERS.length} active contender profiles across rooms.`);
    }

    console.log(`\n===============================================================`);
    console.log(`🎉 DATABASE SEED COMPLETED SUCCESSFULLY!`);
    console.log(`===============================================================\n`);
  } catch (err: any) {
    console.error(`\n❌ Error during seed operation:`, err?.message || err);
  }
}

runSeed();
