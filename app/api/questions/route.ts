import { NextRequest, NextResponse } from 'next/server';
import { QuizQuestion } from '@/lib/quiz-data';
import { getQuestions, insertQuestion } from '@/lib/db';
import { isSupabaseConfigured } from '@/lib/supabase';
import {
  QUESTION_BANK,
  QUESTION_SETS,
  getQuestionsBySet,
  getQuestionsByCategory,
} from '@/lib/question-bank';

const customInjectedQuestions: QuizQuestion[] = [];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const roomCode = searchParams.get('room');
  const setName = searchParams.get('set');
  const listSets = searchParams.get('sets');
  const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;

  try {
    if (listSets) {
      return NextResponse.json({
        status: 'success',
        totalSets: QUESTION_SETS.length,
        sets: QUESTION_SETS,
      });
    }

    let questions: QuizQuestion[] = [];

    if (isSupabaseConfigured()) {
      questions = await getQuestions(roomCode || undefined);
    }

    // If Supabase returned empty or is not yet configured, pull from curated 300-question bank
    if (questions.length === 0) {
      if (setName) {
        questions = getQuestionsBySet(setName);
      } else if (category) {
        questions = getQuestionsByCategory(category);
      } else {
        questions = QUESTION_BANK;
      }
    } else {
      if (category) {
        questions = questions.filter(
          (q) => q.category.toLowerCase() === category.toLowerCase()
        );
      }
    }

    if (limit && limit > 0) {
      questions = questions.slice(0, limit);
    }

    return NextResponse.json({
      status: 'success',
      source: isSupabaseConfigured() && questions.length > 0 ? 'supabase' : 'curated-question-bank',
      total: questions.length,
      availableSets: QUESTION_SETS.length,
      questions,
    });
  } catch (error: any) {
    return NextResponse.json(
      { status: 'error', message: error.message || 'Failed to fetch questions' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.question || !body.category || !body.options || !body.correctKey) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Missing required question fields: question, category, options, correctKey',
        },
        { status: 400 }
      );
    }

    const questionPayload: Omit<QuizQuestion, 'id'> & { roomCode?: string } = {
      roomCode: body.roomCode || undefined,
      category: body.category || 'Quant',
      section: body.section || 'SECTION 01',
      topic: body.topic || 'General Aptitude',
      question: body.question,
      options: body.options.map((opt: any, index: number) => ({
        key: opt.key || ['A', 'B', 'C', 'D'][index],
        text: opt.text,
        percentage: opt.percentage || (opt.key === body.correctKey ? 60 : 13),
        count: opt.count || (opt.key === body.correctKey ? 30 : 6),
        isCorrect: opt.key === body.correctKey,
      })),
      correctKey: body.correctKey,
      officialAnswerText: body.officialAnswerText || body.options.find((o: any) => o.key === body.correctKey)?.text || '',
      standardPaceSec: body.standardPaceSec || 45,
      maxPoints: body.maxPoints || 1000,
      scratchpadFormula: body.scratchpadFormula || '',
      explanation: body.explanation || 'Verified collegiate standard reasoning.',
    };

    let newQuestion: QuizQuestion;

    if (isSupabaseConfigured()) {
      const inserted = await insertQuestion(questionPayload);
      if (!inserted) {
        throw new Error('Supabase insert failed');
      }
      newQuestion = inserted;
    } else {
      newQuestion = {
        ...questionPayload,
        id: QUESTION_BANK.length + customInjectedQuestions.length + 1,
      };
      customInjectedQuestions.push(newQuestion);
    }

    return NextResponse.json({
      status: 'success',
      message: 'Question added successfully to database / runtime',
      question: newQuestion,
      source: isSupabaseConfigured() ? 'supabase' : 'in-memory-fallback',
    });
  } catch (error: any) {
    return NextResponse.json(
      { status: 'error', message: error.message || 'Failed to process question' },
      { status: 500 }
    );
  }
}
