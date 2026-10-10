import { supabase, isSupabaseConfigured } from './supabase';
import { QuizQuestion, Player, HostedQuizRoom, RoundPerformance, Achievement } from './quiz-data';

// ============================================================================
// QUESTIONS CRUD
// ============================================================================

export async function getQuestions(roomCode?: string): Promise<QuizQuestion[]> {
  if (!isSupabaseConfigured()) {
    return [];
  }

  let query = supabase.from('questions').select('*').order('id', { ascending: true });
  if (roomCode) {
    query = query.or(`room_code.eq.${roomCode},room_code.is.null`);
  }

  const { data, error } = await query;
  if (error) {
    console.error('Error fetching questions from Supabase:', error);
    return [];
  }

  return (data || []).map((row: any) => ({
    id: row.id,
    category: row.category,
    section: row.section,
    topic: row.topic,
    question: row.question,
    options: row.options || [],
    correctKey: row.correct_key,
    officialAnswerText: row.official_answer_text,
    standardPaceSec: row.standard_pace_sec,
    maxPoints: row.max_points,
    scratchpadFormula: row.scratchpad_formula || '',
    explanation: row.explanation || '',
  }));
}

export async function insertQuestion(question: Omit<QuizQuestion, 'id'> & { roomCode?: string }): Promise<QuizQuestion | null> {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const { data, error } = await supabase
    .from('questions')
    .insert([
      {
        room_code: question.roomCode || null,
        category: question.category,
        section: question.section,
        topic: question.topic,
        question: question.question,
        options: question.options,
        correct_key: question.correctKey,
        official_answer_text: question.officialAnswerText,
        standard_pace_sec: question.standardPaceSec,
        max_points: question.maxPoints,
        scratchpad_formula: question.scratchpadFormula,
        explanation: question.explanation,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Error inserting question into Supabase:', error);
    return null;
  }

  return {
    id: data.id,
    category: data.category,
    section: data.section,
    topic: data.topic,
    question: data.question,
    options: data.options || [],
    correctKey: data.correct_key,
    officialAnswerText: data.official_answer_text,
    standardPaceSec: data.standard_pace_sec,
    maxPoints: data.max_points,
    scratchpadFormula: data.scratchpad_formula || '',
    explanation: data.explanation || '',
  };
}

// ============================================================================
// ROOMS CRUD
// ============================================================================

export async function getRooms(): Promise<HostedQuizRoom[]> {
  if (!isSupabaseConfigured()) {
    return [];
  }

  const { data, error } = await supabase
    .from('rooms')
    .select('*, room_players(count)')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching rooms from Supabase:', error);
    return [];
  }

  return (data || []).map((row: any) => {
    const playersJoined = row.room_players?.[0]?.count ?? 0;
    return {
      roomCode: row.room_code,
      title: row.title,
      category: row.category,
      hostName: row.host_name,
      playersJoined,
      maxPlayers: row.max_players,
      status: row.status,
      roundInfo: `Round ${String(row.current_round || 1).padStart(2, '0')} / ${row.total_rounds || 15}`,
      questionCount: row.total_rounds || 15,
      tags: row.tags || [],
    };
  });
}

export async function getRoom(roomCode: string): Promise<HostedQuizRoom | null> {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const { data, error } = await supabase
    .from('rooms')
    .select('*')
    .eq('room_code', roomCode)
    .single();

  if (error || !data) {
    return null;
  }

  return {
    roomCode: data.room_code,
    title: data.title,
    category: data.category,
    hostName: data.host_name,
    playersJoined: 0,
    maxPlayers: data.max_players,
    status: data.status,
    roundInfo: `Round ${String(data.current_round || 1).padStart(2, '0')} / ${data.total_rounds || 15}`,
    questionCount: data.total_rounds || 15,
    tags: data.tags || [],
  };
}

export async function createRoom(room: HostedQuizRoom): Promise<HostedQuizRoom | null> {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const { data, error } = await supabase
    .from('rooms')
    .insert([
      {
        room_code: room.roomCode,
        title: room.title,
        category: room.category,
        host_name: room.hostName,
        max_players: room.maxPlayers,
        status: room.status,
        total_rounds: room.questionCount,
        tags: room.tags,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Error creating room in Supabase:', error);
    return null;
  }

  return room;
}

// ============================================================================
// ROOM PLAYERS CRUD
// ============================================================================

export async function getRoomPlayers(roomCode: string): Promise<Player[]> {
  if (!isSupabaseConfigured()) {
    return [];
  }

  const { data, error } = await supabase
    .from('room_players')
    .select('*')
    .eq('room_code', roomCode)
    .order('score', { ascending: false });

  if (error) {
    console.error('Error fetching room players from Supabase:', error);
    return [];
  }

  return (data || []).map((row: any, index: number) => ({
    id: row.id,
    initials: row.initials || row.name.slice(0, 2).toUpperCase(),
    name: row.name,
    college: row.college || '',
    status: row.status || 'active',
    streakCount: row.streak_count || 0,
    score: row.score || 0,
    rank: index + 1,
    accuracyRate: Number(row.accuracy_rate) || 0,
    isCurrentUser: row.is_current_user || false,
  }));
}

export async function joinRoomPlayer(
  roomCode: string,
  player: { id: string; name: string; college?: string; isCurrentUser?: boolean }
): Promise<Player | null> {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const initials = player.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const { data, error } = await supabase
    .from('room_players')
    .upsert(
      {
        id: player.id,
        room_code: roomCode,
        name: player.name,
        college: player.college || '',
        initials,
        score: 0,
        rank: 1,
        streak_count: 0,
        accuracy_rate: 0,
        status: 'active',
        is_current_user: player.isCurrentUser || false,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'id' }
    )
    .select()
    .single();

  if (error) {
    console.error('Error joining player to room in Supabase:', error);
    return null;
  }

  return {
    id: data.id,
    initials: data.initials,
    name: data.name,
    college: data.college,
    status: data.status,
    streakCount: data.streak_count,
    score: data.score,
    rank: data.rank,
    accuracyRate: Number(data.accuracy_rate),
    isCurrentUser: data.is_current_user,
  };
}

export async function updatePlayerScore(
  playerId: string,
  roomCode: string,
  pointsEarned: number,
  isCorrect: boolean
) {
  if (!isSupabaseConfigured()) {
    return;
  }

  const { data: current } = await supabase
    .from('room_players')
    .select('score, streak_count')
    .eq('id', playerId)
    .eq('room_code', roomCode)
    .single();

  const prevScore = current?.score || 0;
  const prevStreak = current?.streak_count || 0;

  const newScore = prevScore + pointsEarned;
  const newStreak = isCorrect ? prevStreak + 1 : 0;

  await supabase
    .from('room_players')
    .update({
      score: newScore,
      streak_count: newStreak,
      status: newStreak >= 5 ? 'streak' : 'active',
      updated_at: new Date().toISOString(),
    })
    .eq('id', playerId)
    .eq('room_code', roomCode);
}

// ============================================================================
// PERFORMANCE HISTORY CRUD
// ============================================================================

export async function getPerformanceHistory(playerId: string, roomCode: string): Promise<RoundPerformance[]> {
  if (!isSupabaseConfigured()) {
    return [];
  }

  const { data, error } = await supabase
    .from('performance_history')
    .select('*')
    .eq('player_id', playerId)
    .eq('room_code', roomCode)
    .order('round', { ascending: true });

  if (error) {
    console.error('Error fetching performance history:', error);
    return [];
  }

  return (data || []).map((row: any) => ({
    round: row.round,
    roundName: row.round_name || `R${row.round}`,
    topic: row.topic,
    scoreEarned: row.score_earned,
    cumulativeXP: row.cumulative_xp,
    latencySec: Number(row.latency_sec),
    rank: row.rank,
    accuracy: Number(row.accuracy),
  }));
}

export async function savePerformanceHistory(
  record: RoundPerformance,
  playerId: string,
  roomCode: string
) {
  if (!isSupabaseConfigured()) {
    return;
  }

  await supabase.from('performance_history').insert([
    {
      room_code: roomCode,
      player_id: playerId,
      round: record.round,
      round_name: record.roundName,
      topic: record.topic,
      score_earned: record.scoreEarned,
      cumulative_xp: record.cumulativeXP,
      latency_sec: record.latencySec,
      rank: record.rank,
      accuracy: record.accuracy,
    },
  ]);
}

// ============================================================================
// SUPABASE REALTIME SUBSCRIPTIONS (Using WebSockets under the hood)
// ============================================================================

export function subscribeToRoomPlayers(
  roomCode: string,
  onPlayersChange: () => void
) {
  if (!isSupabaseConfigured()) {
    return () => {};
  }

  const channel = supabase
    .channel(`room_players_${roomCode}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'room_players',
        filter: `room_code=eq.${roomCode}`,
      },
      () => {
        onPlayersChange();
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

export function subscribeToRoomState(
  roomCode: string,
  onRoomChange: (updatedRoom: any) => void
) {
  if (!isSupabaseConfigured()) {
    return () => {};
  }

  const channel = supabase
    .channel(`room_state_${roomCode}`)
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'rooms',
        filter: `room_code=eq.${roomCode}`,
      },
      (payload) => {
        onRoomChange(payload.new);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

// ============================================================================
// ACHIEVEMENTS CRUD
// ============================================================================

export async function getAchievements(userXP: number = 0): Promise<Achievement[]> {
  if (!isSupabaseConfigured()) {
    return [];
  }

  const { data, error } = await supabase
    .from('achievements')
    .select('*')
    .order('milestone_points', { ascending: true });

  if (error || !data) {
    console.error('Error fetching achievements from Supabase:', error);
    return [];
  }

  return data.map((row: any) => ({
    id: row.id,
    name: row.name,
    category: row.category,
    description: row.description,
    iconName: row.icon_name,
    milestonePoints: row.milestone_points,
    tier: row.tier,
    progress: Math.min(userXP, row.milestone_points),
    maxProgress: row.milestone_points,
    unlocked: userXP >= row.milestone_points,
    badgeLabel: row.badge_label,
  }));
}
