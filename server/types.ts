export interface PlayerPayload {
  id: string;
  name: string;
  college?: string;
  initials?: string;
  score: number;
  rank?: number;
  streakCount?: number;
  accuracyRate?: number;
  status?: 'top-seed' | 'ready' | 'streak' | 'active';
  isCurrentUser?: boolean;
  workerId?: number;
  lastActive?: number;
}

export interface AnswerPayload {
  roomCode: string;
  playerId: string;
  questionId: number;
  round: number;
  selectedKey: 'A' | 'B' | 'C' | 'D' | null;
  latencySec: number;
  pointsEarned: number;
  isCorrect: boolean;
}

export interface RoomStatePayload {
  roomCode: string;
  currentRound: number;
  totalRounds: number;
  isLocked: boolean;
  timerFrozen: boolean;
  broadcastMessage: string;
  updatedAt: number;
}

export interface SubWorkerStats {
  workerId: number;
  port: number;
  clientsCount: number;
  messagesReceived: number;
  messagesSent: number;
  uptimeSeconds: number;
  memoryUsageMB: number;
}

export interface ClusterStatus {
  status: 'healthy' | 'degraded';
  timestamp: string;
  gatewayPort: number;
  masterHub: {
    roomsCount: number;
    totalPlayersTracked: number;
    leaderboardsCount: number;
  };
  totalConnectedClients: number;
  workers: SubWorkerStats[];
}

export type ClientMessageType =
  | 'JOIN_ROOM'
  | 'LEAVE_ROOM'
  | 'SUBMIT_ANSWER'
  | 'HOST_ACTION'
  | 'GET_LEADERBOARD'
  | 'PING';

export type ServerMessageType =
  | 'CONNECTED'
  | 'ROOM_SYNC'
  | 'LEADERBOARD_UPDATE'
  | 'HOST_EVENT'
  | 'STATS_UPDATE'
  | 'PONG'
  | 'ERROR';

export interface ClientMessage {
  type: ClientMessageType;
  roomCode?: string;
  player?: Partial<PlayerPayload>;
  answer?: AnswerPayload;
  action?: 'advance_round' | 'lock_room' | 'freeze_timer' | 'broadcast';
  payload?: any;
}

export interface ServerMessage {
  type: ServerMessageType;
  workerId: number;
  roomCode?: string;
  players?: PlayerPayload[];
  leaderboard?: PlayerPayload[];
  roomState?: RoomStatePayload;
  clusterStats?: ClusterStatus;
  message?: string;
  timestamp: number;
}
