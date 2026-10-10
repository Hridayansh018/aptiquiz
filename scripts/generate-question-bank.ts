import fs from 'node:fs';
import path from 'node:path';
import { QuizQuestion, QuestionCategory } from '../lib/quiz-data';

function parseCSVLine(text: string): string[] {
  const result: string[] = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') {
      if (inQuotes && text[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c === ',' && !inQuotes) {
      result.push(cur.trim());
      cur = '';
    } else {
      cur += c;
    }
  }
  result.push(cur.trim());
  return result;
}

function normalizeCategory(rawCat: string, setName: string): QuestionCategory {
  const lower = (rawCat || '').toLowerCase();
  if (lower.includes('logic')) return 'Logic';
  if (lower.includes('verbal')) return 'Verbal';
  if (lower.includes('data interpretation') || lower.includes('chart')) return 'Data Interpretation';
  if (setName.includes('logical')) return 'Logic';
  if (setName.includes('verbal')) return 'Verbal';
  if (setName.includes('data_interpretation')) return 'Data Interpretation';
  return 'Quant';
}

function formatSetName(setName: string): string {
  return setName
    .replace(/^\d+_/, '')
    .split('_')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function run() {
  const csvPath = path.resolve(process.cwd(), 'aptiquiz_question_sets', 'all_300_questions.csv');
  if (!fs.existsSync(csvPath)) {
    console.error('File not found:', csvPath);
    process.exit(1);
  }

  const raw = fs.readFileSync(csvPath, 'utf-8').replace(/^\uFEFF/, '');
  const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);

  const header = parseCSVLine(lines[0]);
  console.log('Headers:', header);

  const questions: (QuizQuestion & { setName: string; difficulty: string })[] = [];
  const setCounts: Record<string, number> = {};

  for (let i = 1; i < lines.length; i++) {
    const row = parseCSVLine(lines[i]);
    if (row.length < 11) continue;

    const [
      setName,
      questionId,
      rawCategory,
      difficulty,
      questionText,
      optionA,
      optionB,
      optionC,
      optionD,
      correctOptionRaw,
      correctAnswer,
    ] = row;

    const correctKey = (correctOptionRaw.trim().toUpperCase() || 'A') as 'A' | 'B' | 'C' | 'D';
    const category = normalizeCategory(rawCategory, setName);
    const setFriendlyName = formatSetName(setName);

    setCounts[setName] = (setCounts[setName] || 0) + 1;

    const pace = difficulty === 'Hard' ? 60 : difficulty === 'Medium' ? 45 : 35;
    const pts = difficulty === 'Hard' ? 1200 : difficulty === 'Medium' ? 1000 : 800;

    const q: QuizQuestion & { setName: string; difficulty: string } = {
      id: i,
      category,
      section: `${setFriendlyName} • ${difficulty}`,
      topic: rawCategory || setFriendlyName,
      question: questionText,
      options: [
        {
          key: 'A',
          text: optionA,
          percentage: correctKey === 'A' ? 65 : 12,
          count: correctKey === 'A' ? 32 : 6,
          isCorrect: correctKey === 'A',
        },
        {
          key: 'B',
          text: optionB,
          percentage: correctKey === 'B' ? 65 : 12,
          count: correctKey === 'B' ? 32 : 6,
          isCorrect: correctKey === 'B',
        },
        {
          key: 'C',
          text: optionC,
          percentage: correctKey === 'C' ? 65 : 12,
          count: correctKey === 'C' ? 32 : 6,
          isCorrect: correctKey === 'C',
        },
        {
          key: 'D',
          text: optionD,
          percentage: correctKey === 'D' ? 65 : 12,
          count: correctKey === 'D' ? 32 : 6,
          isCorrect: correctKey === 'D',
        },
      ],
      correctKey,
      officialAnswerText: `Option ${correctKey}: ${correctAnswer}`,
      standardPaceSec: pace,
      maxPoints: pts,
      scratchpadFormula: `Set: ${setFriendlyName} | Difficulty: ${difficulty}`,
      explanation: `Option ${correctKey} (${correctAnswer}) is the verified solution for this ${difficulty.toLowerCase()}-level problem from ${setFriendlyName}.`,
      setName,
      difficulty,
    };

    questions.push(q);
  }

  console.log(`Parsed ${questions.length} questions across ${Object.keys(setCounts).length} sets:`);
  for (const [k, v] of Object.entries(setCounts)) {
    console.log(`  • ${k}: ${v} questions`);
  }

  // Generate lib/question-bank.ts
  const outputCode = `// ============================================================================
// APTIQUIZ CURATED QUESTION BANK (300 QUESTIONS)
// Parsed from aptiquiz_question_sets/
// ============================================================================

import { QuizQuestion, QuestionCategory } from './quiz-data';

export interface QuestionBankItem extends QuizQuestion {
  setName: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | string;
}

export const QUESTION_SETS: { id: string; title: string; category: QuestionCategory; count: number }[] = [
  { id: '01_quantitative_aptitude', title: 'Quantitative Aptitude', category: 'Quant', count: 30 },
  { id: '02_logical_reasoning', title: 'Logical Reasoning', category: 'Logic', count: 30 },
  { id: '03_verbal_ability', title: 'Verbal Ability', category: 'Verbal', count: 30 },
  { id: '04_data_interpretation', title: 'Data Interpretation', category: 'Data Interpretation', count: 30 },
  { id: '05_time_work_speed', title: 'Time, Work & Speed', category: 'Quant', count: 30 },
  { id: '06_probability_counting', title: 'Probability & Counting', category: 'Quant', count: 30 },
  { id: '07_algebra_geometry', title: 'Algebra & Geometry', category: 'Quant', count: 30 },
  { id: '08_number_systems_series', title: 'Number Systems & Series', category: 'Quant', count: 30 },
  { id: '09_mixed_placement', title: 'Mixed Placement Aptitude', category: 'Quant', count: 30 },
  { id: '10_advanced_mixed', title: 'Advanced Mixed Aptitude', category: 'Logic', count: 30 },
];

export const QUESTION_BANK: QuestionBankItem[] = ${JSON.stringify(questions, null, 2)};

export function getQuestionsBySet(setName: string): QuestionBankItem[] {
  return QUESTION_BANK.filter((q) => q.setName === setName);
}

export function getQuestionsByCategory(category: string): QuestionBankItem[] {
  const target = category.toLowerCase();
  return QUESTION_BANK.filter((q) => q.category.toLowerCase() === target);
}

export function getRandomQuestionSlice(count: number = 15, category?: string): QuestionBankItem[] {
  const pool = category ? getQuestionsByCategory(category) : QUESTION_BANK;
  if (pool.length <= count) return [...pool];
  
  // Deterministic shuffle or sample
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map((q, idx) => ({
    ...q,
    id: idx + 1,
  }));
}
`;

  fs.writeFileSync(path.resolve(process.cwd(), 'lib', 'question-bank.ts'), outputCode, 'utf-8');
  console.log(`\n✅ Generated lib/question-bank.ts with ${questions.length} questions!`);

  // Also generate supabase/seed_questions.sql for direct Supabase SQL Editor execution
  const sqlValues = questions.map((q, idx) => {
    const roomCode = idx < 30 ? "'LIVE01'" : idx < 60 ? "'ARENA2026'" : idx < 90 ? "'GATE2026'" : idx < 120 ? "'CAT2026'" : "NULL";
    const escapeSql = (str: string) => (str || '').replace(/'/g, "''");
    const jsonOpts = escapeSql(JSON.stringify(q.options));
    return `(
  ${roomCode},
  '${escapeSql(q.category)}',
  '${escapeSql(q.section)}',
  '${escapeSql(q.topic)}',
  '${escapeSql(q.question)}',
  '${jsonOpts}'::jsonb,
  '${escapeSql(q.correctKey)}',
  '${escapeSql(q.officialAnswerText)}',
  ${q.standardPaceSec},
  ${q.maxPoints},
  '${escapeSql(q.scratchpadFormula)}',
  '${escapeSql(q.explanation)}'
)`;
  });

  const sqlCode = `-- ============================================================================
-- APTIQUIZ 300 QUESTIONS SEED SQL SCRIPT
-- Generated from aptiquiz_question_sets/ (10 sets x 30 questions)
-- ============================================================================

INSERT INTO public.questions (
  room_code,
  category,
  section,
  topic,
  question,
  options,
  correct_key,
  official_answer_text,
  standard_pace_sec,
  max_points,
  scratchpad_formula,
  explanation
)
VALUES
${sqlValues.join(',\n')};
`;

  fs.writeFileSync(path.resolve(process.cwd(), 'supabase', 'seed_questions.sql'), sqlCode, 'utf-8');
  console.log(`✅ Generated supabase/seed_questions.sql with ${questions.length} questions!`);
}

run();
