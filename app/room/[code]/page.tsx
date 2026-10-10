'use client';

import { useParams } from 'next/navigation';
import { AptiQuizApp } from '@/components/AptiQuizApp';

export default function RoomDynamicPage() {
  const params = useParams();
  const code = Array.isArray(params?.code) ? params.code[0] : (params?.code as string) || '';
  return <AptiQuizApp initialTab="lobby" initialRoomCode={code} />;
}
