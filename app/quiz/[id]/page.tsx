'use client';

import { useParams } from 'next/navigation';
import { AptiQuizApp } from '@/components/AptiQuizApp';

export default function QuizDynamicPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : (params?.id as string) || '';
  return <AptiQuizApp initialTab="quiz-arena" initialRoomCode={id} />;
}
