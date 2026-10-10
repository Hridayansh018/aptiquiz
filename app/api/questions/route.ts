import { NextRequest, NextResponse } from 'next/server';
import { QuizQuestion } from '@/lib/quiz-data';
import { getQuestions, insertQuestion } from '@/lib/db';
import { isSupabaseConfigured } from '@/lib/supabase';

// In-memory fallback if Supabase credentials are not configured yet
let fallbackQuestions: QuizQuestion[] = [];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const roomCode = searchParams.get('room');

  try {
    let questions: QuizQuestion[] = [];

    if (isSupabaseConfigured()) {
      questions = await getQuestions(roomCode || undefined);
    } else {
      questions = fallbackQuestions;
    }

    if (category) {
      questions = questions.filter(
        (q) => q.category.toLowerCase() === category.toLowerCase()
      );
    }

    return NextResponse.json({
      status: 'success',
      source: isSupabaseConfigured() ? 'supabase' : 'in-memory-fallback',
      total: questions.length,
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
        id: fallbackQuestions.length + 1,
      };
      fallbackQuestions.push(newQuestion);
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
