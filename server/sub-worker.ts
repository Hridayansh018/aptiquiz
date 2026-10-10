import { WebSocketServer, WebSocket } from 'ws';
import { MasterAggregatorHub } from './master-hub';
import {
  ClientMessage,
  ServerMessage,
  PlayerPayload,
  SubWorkerStats,
} from './types';

interface ClientConnection {
  ws: WebSocket;
  roomCode?: string;
  playerId?: string;
  isAlive: boolean;
}

export class SubWorkerServer {
  public readonly workerId: number;
  public readonly port: number;
  private wss: WebSocketServer | null = null;
  private masterHub: MasterAggregatorHub;
  private clients: Map<string, ClientConnection> = new Map();
  private messagesReceived: number = 0;
  private messagesSent: number = 0;
  private startTime: number = Date.now();
  private heartbeatInterval: NodeJS.Timeout | null = null;

  constructor(workerId: number, port: number, masterHub: MasterAggregatorHub) {
    this.workerId = workerId;
    this.port = port;
    this.masterHub = masterHub;

    // Listen to merged broadcasts from Master Hub
    this.masterHub.on('leaderboard_update', ({ roomCode, leaderboard }) => {
      this.broadcastToRoom(roomCode, {
        type: 'LEADERBOARD_UPDATE',
        workerId: this.workerId,
        roomCode,
        leaderboard,
        timestamp: Date.now(),
      });
    });

    this.masterHub.on('room_state_update', ({ roomCode, roomState }) => {
      this.broadcastToRoom(roomCode, {
        type: 'ROOM_SYNC',
        workerId: this.workerId,
        roomCode,
        roomState,
        timestamp: Date.now(),
      });
    });
  }

  // --------------------------------------------------------------------------
  // Start the Sub-Worker Server
  // --------------------------------------------------------------------------
  public start(): Promise<void> {
    return new Promise((resolve) => {
      this.wss = new WebSocketServer({ port: this.port }, () => {
        console.log(`[Sub-Worker #${this.workerId}] 🚀 WebSocket server active on port :${this.port}`);
        resolve();
      });

      this.wss.on('connection', (ws: WebSocket, req) => {
        this.handleConnection(ws, req);
      });

      // Regular stats reporting to Master Hub
      this.heartbeatInterval = setInterval(() => {
        this.reportStats();
      }, 2000);
    });
  }

  // --------------------------------------------------------------------------
  // Stop Server
  // --------------------------------------------------------------------------
  public stop(): Promise<void> {
    return new Promise((resolve) => {
      if (this.heartbeatInterval) clearInterval(this.heartbeatInterval);
      if (this.wss) {
        this.wss.close(() => resolve());
      } else {
        resolve();
      }
    });
  }

  public getStats(): SubWorkerStats {
    return {
      workerId: this.workerId,
      port: this.port,
      clientsCount: this.clients.size,
      messagesReceived: this.messagesReceived,
      messagesSent: this.messagesSent,
      uptimeSeconds: Math.floor((Date.now() - this.startTime) / 1000),
      memoryUsageMB: Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 10) / 10,
    };
  }

  private reportStats() {
    this.masterHub.updateWorkerStats(this.getStats());
  }

  // --------------------------------------------------------------------------
  // Handle Client WebSocket Connections
  // --------------------------------------------------------------------------
  private handleConnection(ws: WebSocket, req: any) {
    const url = new URL(req.url || '/', `http://localhost:${this.port}`);
    const roomParam = url.searchParams.get('room') || 'LIVE01';
    const playerParam = url.searchParams.get('playerId') || `p_${Math.random().toString(36).substring(2, 9)}`;

    const connId = `${playerParam}_${Math.random().toString(36).substring(2, 6)}`;
    const clientConn: ClientConnection = {
      ws,
      roomCode: roomParam,
      playerId: playerParam,
      isAlive: true,
    };

    this.clients.set(connId, clientConn);

    // Initial greeting & worker identification
    this.send(ws, {
      type: 'CONNECTED',
      workerId: this.workerId,
      roomCode: roomParam,
      message: `Connected to Sub-Worker #${this.workerId} on Port ${this.port}`,
      timestamp: Date.now(),
    });

    // Auto-sync current merged room state and leaderboard
    const roomState = this.masterHub.getRoomState(roomParam);
    const leaderboard = this.masterHub.calculateLeaderboard(roomParam);

    this.send(ws, {
      type: 'ROOM_SYNC',
      workerId: this.workerId,
      roomCode: roomParam,
      roomState,
      leaderboard,
      timestamp: Date.now(),
    });

    // Listen to messages from this client
    ws.on('message', (data: any) => {
      this.messagesReceived++;
      try {
        const message: ClientMessage = JSON.parse(data.toString());
        this.handleClientMessage(clientConn, message);
      } catch (err) {
        this.send(ws, {
          type: 'ERROR',
          workerId: this.workerId,
          message: 'Invalid JSON message payload',
          timestamp: Date.now(),
        });
      }
    });

    ws.on('pong', () => {
      clientConn.isAlive = true;
    });

    ws.on('close', () => {
      if (clientConn.roomCode && clientConn.playerId) {
        this.masterHub.removePlayer(clientConn.roomCode, clientConn.playerId);
      }
      this.clients.delete(connId);
      this.reportStats();
    });

    ws.on('error', (err) => {
      console.error(`[Sub-Worker #${this.workerId}] Client socket error:`, err.message);
      this.clients.delete(connId);
    });

    this.reportStats();
  }

  // --------------------------------------------------------------------------
  // Dispatch Client Messages to Master Hub
  // --------------------------------------------------------------------------
  private handleClientMessage(conn: ClientConnection, msg: ClientMessage) {
    const roomCode = msg.roomCode || conn.roomCode || 'LIVE01';
    conn.roomCode = roomCode;

    switch (msg.type) {
      case 'JOIN_ROOM': {
        const player: PlayerPayload = {
          id: msg.player?.id || conn.playerId || `p_${Date.now()}`,
          name: msg.player?.name || 'Contender',
          college: msg.player?.college || '',
          score: msg.player?.score || 0,
          streakCount: msg.player?.streakCount || 0,
        };
        conn.playerId = player.id;

        // Register to Master Hub (merges across all 5 sub-servers!)
        const mergedLeaderboard = this.masterHub.registerPlayer(roomCode, player, this.workerId);
        const roomState = this.masterHub.getRoomState(roomCode);

        // Immediate confirmation to this client
        this.send(conn.ws, {
          type: 'ROOM_SYNC',
          workerId: this.workerId,
          roomCode,
          roomState,
          leaderboard: mergedLeaderboard,
          timestamp: Date.now(),
        });
        break;
      }

      case 'SUBMIT_ANSWER': {
        if (!msg.answer) return;
        // Merge score at Master Hub
        this.masterHub.recordAnswer(msg.answer, this.workerId);
        break;
      }

      case 'HOST_ACTION': {
        if (!msg.action) return;
        const patch: any = {};
        if (msg.action === 'advance_round') {
          const currentState = this.masterHub.getRoomState(roomCode);
          patch.currentRound = (currentState.currentRound % currentState.totalRounds) + 1;
        } else if (msg.action === 'lock_room') {
          patch.isLocked = Boolean(msg.payload?.isLocked);
        } else if (msg.action === 'freeze_timer') {
          patch.timerFrozen = Boolean(msg.payload?.timerFrozen);
        } else if (msg.action === 'broadcast') {
          patch.broadcastMessage = String(msg.payload?.message || '');
        }

        this.masterHub.updateRoomState(roomCode, patch);
        break;
      }

      case 'GET_LEADERBOARD': {
        const leaderboard = this.masterHub.calculateLeaderboard(roomCode);
        this.send(conn.ws, {
          type: 'LEADERBOARD_UPDATE',
          workerId: this.workerId,
          roomCode,
          leaderboard,
          timestamp: Date.now(),
        });
        break;
      }

      case 'PING': {
        this.send(conn.ws, {
          type: 'PONG',
          workerId: this.workerId,
          timestamp: Date.now(),
        });
        break;
      }
    }
  }

  // --------------------------------------------------------------------------
  // Message Broadcasting Helpers
  // --------------------------------------------------------------------------
  private send(ws: WebSocket, message: ServerMessage) {
    if (ws.readyState === WebSocket.OPEN) {
      this.messagesSent++;
      ws.send(JSON.stringify(message));
    }
  }

  private broadcastToRoom(roomCode: string, message: ServerMessage) {
    const payload = JSON.stringify(message);
    for (const client of this.clients.values()) {
      if (client.roomCode === roomCode && client.ws.readyState === WebSocket.OPEN) {
        this.messagesSent++;
        client.ws.send(payload);
      }
    }
  }
}
