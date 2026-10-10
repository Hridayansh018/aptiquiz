import { Player, HostedQuizRoom } from './quiz-data';

export interface ClusterClientCallbacks {
  onLeaderboard?: (leaderboard: Player[]) => void;
  onRoomState?: (roomState: any) => void;
  onConnected?: (workerId: number, message: string) => void;
  onStatusChange?: (status: 'connecting' | 'connected' | 'disconnected' | 'error') => void;
}

export class AptiQuizClusterClient {
  private ws: WebSocket | null = null;
  private gatewayUrl: string;
  private roomCode: string;
  private player: { id: string; name: string; college?: string };
  private callbacks: ClusterClientCallbacks;
  private reconnectTimer: any = null;
  private shouldReconnect: boolean = true;
  public workerId: number | null = null;

  constructor(
    roomCode: string,
    player: { id: string; name: string; college?: string },
    callbacks: ClusterClientCallbacks = {},
    gatewayUrl?: string
  ) {
    this.roomCode = roomCode;
    this.player = player;
    this.callbacks = callbacks;
    this.gatewayUrl =
      gatewayUrl ||
      process.env.NEXT_PUBLIC_WS_URL ||
      (typeof window !== 'undefined'
        ? `ws://${window.location.hostname}:8000`
        : 'ws://localhost:8000');
  }

  public connect() {
    if (typeof window === 'undefined') return;
    this.shouldReconnect = true;

    try {
      this.callbacks.onStatusChange?.('connecting');
      const wsUrl = `${this.gatewayUrl}?room=${encodeURIComponent(this.roomCode)}&playerId=${encodeURIComponent(this.player.id)}`;
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        this.callbacks.onStatusChange?.('connected');
        // Register player to cluster
        this.send({
          type: 'JOIN_ROOM',
          roomCode: this.roomCode,
          player: {
            id: this.player.id,
            name: this.player.name,
            college: this.player.college || '',
            score: 0,
          },
        });
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.handleServerMessage(data);
        } catch (err) {
          console.warn('[Cluster Client] Non-JSON message received:', event.data);
        }
      };

      this.ws.onclose = () => {
        this.callbacks.onStatusChange?.('disconnected');
        if (this.shouldReconnect) {
          clearTimeout(this.reconnectTimer);
          this.reconnectTimer = setTimeout(() => {
            this.connect();
          }, 2500);
        }
      };

      this.ws.onerror = () => {
        this.callbacks.onStatusChange?.('error');
      };
    } catch (err) {
      this.callbacks.onStatusChange?.('error');
    }
  }

  public disconnect() {
    this.shouldReconnect = false;
    clearTimeout(this.reconnectTimer);
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  public submitAnswer(answer: {
    questionId: number;
    round: number;
    selectedKey: 'A' | 'B' | 'C' | 'D' | null;
    latencySec: number;
    pointsEarned: number;
    isCorrect: boolean;
  }) {
    this.send({
      type: 'SUBMIT_ANSWER',
      roomCode: this.roomCode,
      answer: {
        ...answer,
        roomCode: this.roomCode,
        playerId: this.player.id,
      },
    });
  }

  public sendHostAction(action: 'advance_round' | 'lock_room' | 'freeze_timer' | 'broadcast', payload?: any) {
    this.send({
      type: 'HOST_ACTION',
      roomCode: this.roomCode,
      action,
      payload,
    });
  }

  private handleServerMessage(msg: any) {
    if (msg.type === 'CONNECTED') {
      this.workerId = msg.workerId;
      this.callbacks.onConnected?.(msg.workerId, msg.message);
    } else if (msg.type === 'LEADERBOARD_UPDATE' && msg.leaderboard) {
      // Merged leaderboard across all 5 sub-servers
      const mapped: Player[] = msg.leaderboard.map((p: any) => ({
        id: p.id,
        initials: p.initials || p.name.slice(0, 2).toUpperCase(),
        name: p.name,
        college: p.college || '',
        score: p.score || 0,
        rank: p.rank || 1,
        streakCount: p.streakCount || 0,
        status: p.status || 'active',
        isCurrentUser: p.id === this.player.id,
        accuracyRate: p.accuracyRate || 0,
      }));
      this.callbacks.onLeaderboard?.(mapped);
    } else if (msg.type === 'ROOM_SYNC') {
      if (msg.leaderboard) {
        const mapped: Player[] = msg.leaderboard.map((p: any) => ({
          id: p.id,
          initials: p.initials || p.name.slice(0, 2).toUpperCase(),
          name: p.name,
          college: p.college || '',
          score: p.score || 0,
          rank: p.rank || 1,
          streakCount: p.streakCount || 0,
          status: p.status || 'active',
          isCurrentUser: p.id === this.player.id,
          accuracyRate: p.accuracyRate || 0,
        }));
        this.callbacks.onLeaderboard?.(mapped);
      }
      if (msg.roomState) {
        this.callbacks.onRoomState?.(msg.roomState);
      }
    }
  }

  private send(payload: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(payload));
    }
  }
}
