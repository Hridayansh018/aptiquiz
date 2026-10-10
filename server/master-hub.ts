import { EventEmitter } from 'events';
import {
  PlayerPayload,
  AnswerPayload,
  RoomStatePayload,
  ClusterStatus,
  SubWorkerStats,
} from './types';

export class MasterAggregatorHub extends EventEmitter {
  // roomCode -> Map of playerId -> PlayerPayload
  private roomPlayers: Map<string, Map<string, PlayerPayload>> = new Map();
  // roomCode -> RoomStatePayload
  private roomStates: Map<string, RoomStatePayload> = new Map();
  // workerId -> SubWorkerStats
  private workerStats: Map<number, SubWorkerStats> = new Map();

  constructor() {
    super();
    // Allow up to 50 listeners for multiple workers
    this.setMaxListeners(50);
  }

  // --------------------------------------------------------------------------
  // Worker Registration & Telemetry
  // --------------------------------------------------------------------------
  public updateWorkerStats(stats: SubWorkerStats) {
    this.workerStats.set(stats.workerId, stats);
    this.emit('stats_updated', this.getClusterStatus(8000));
  }

  // --------------------------------------------------------------------------
  // Player Management & Cross-Server Merging
  // --------------------------------------------------------------------------
  public registerPlayer(roomCode: string, player: PlayerPayload, workerId: number): PlayerPayload[] {
    if (!this.roomPlayers.has(roomCode)) {
      this.roomPlayers.set(roomCode, new Map());
    }

    const roomMap = this.roomPlayers.get(roomCode)!;
    const existing = roomMap.get(player.id);

    const mergedPlayer: PlayerPayload = {
      id: player.id,
      name: player.name || existing?.name || 'Contender',
      college: player.college || existing?.college || '',
      initials: (player.name || existing?.name || 'CO')
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase(),
      score: existing ? existing.score : player.score || 0,
      streakCount: existing ? existing.streakCount : player.streakCount || 0,
      accuracyRate: existing ? existing.accuracyRate : player.accuracyRate || 0,
      status: existing ? existing.status : 'active',
      workerId,
      lastActive: Date.now(),
    };

    roomMap.set(player.id, mergedPlayer);

    const mergedLeaderboard = this.calculateLeaderboard(roomCode);
    this.emit('leaderboard_update', { roomCode, leaderboard: mergedLeaderboard });
    return mergedLeaderboard;
  }

  public removePlayer(roomCode: string, playerId: string): PlayerPayload[] {
    const roomMap = this.roomPlayers.get(roomCode);
    if (!roomMap) return [];

    roomMap.delete(playerId);
    if (roomMap.size === 0) {
      this.roomPlayers.delete(roomCode);
    }

    const mergedLeaderboard = this.calculateLeaderboard(roomCode);
    this.emit('leaderboard_update', { roomCode, leaderboard: mergedLeaderboard });
    return mergedLeaderboard;
  }

  // --------------------------------------------------------------------------
  // Answer Processing & Score Merging
  // --------------------------------------------------------------------------
  public recordAnswer(answer: AnswerPayload, workerId: number): PlayerPayload[] {
    const { roomCode, playerId, pointsEarned, isCorrect } = answer;
    if (!this.roomPlayers.has(roomCode)) {
      this.roomPlayers.set(roomCode, new Map());
    }

    const roomMap = this.roomPlayers.get(roomCode)!;
    let player = roomMap.get(playerId);

    if (!player) {
      player = {
        id: playerId,
        name: `Player_${playerId.slice(-4)}`,
        score: 0,
        streakCount: 0,
        accuracyRate: 0,
        workerId,
        lastActive: Date.now(),
      };
      roomMap.set(playerId, player);
    }

    // Apply points and update streak
    player.score += pointsEarned;
    player.streakCount = isCorrect ? (player.streakCount || 0) + 1 : 0;
    player.status = (player.streakCount >= 5) ? 'streak' : 'active';
    player.lastActive = Date.now();

    const mergedLeaderboard = this.calculateLeaderboard(roomCode);
    this.emit('leaderboard_update', { roomCode, leaderboard: mergedLeaderboard });
    return mergedLeaderboard;
  }

  // --------------------------------------------------------------------------
  // Central Leaderboard Calculator (The Merged View)
  // --------------------------------------------------------------------------
  public calculateLeaderboard(roomCode: string): PlayerPayload[] {
    const roomMap = this.roomPlayers.get(roomCode);
    if (!roomMap || roomMap.size === 0) return [];

    const playersArray = Array.from(roomMap.values());

    // Sort descending by score
    playersArray.sort((a, b) => b.score - a.score);

    // Assign unified ranks and badges
    return playersArray.map((p, idx) => ({
      ...p,
      rank: idx + 1,
      status: idx === 0 ? 'top-seed' : (p.streakCount && p.streakCount >= 5) ? 'streak' : p.status,
    }));
  }

  // --------------------------------------------------------------------------
  // Room State Operations (Synchronized Across All Workers)
  // --------------------------------------------------------------------------
  public getRoomState(roomCode: string): RoomStatePayload {
    if (!this.roomStates.has(roomCode)) {
      this.roomStates.set(roomCode, {
        roomCode,
        currentRound: 1,
        totalRounds: 15,
        isLocked: false,
        timerFrozen: false,
        broadcastMessage: '',
        updatedAt: Date.now(),
      });
    }
    return this.roomStates.get(roomCode)!;
  }

  public updateRoomState(roomCode: string, patch: Partial<RoomStatePayload>): RoomStatePayload {
    const current = this.getRoomState(roomCode);
    const updated: RoomStatePayload = {
      ...current,
      ...patch,
      updatedAt: Date.now(),
    };
    this.roomStates.set(roomCode, updated);
    this.emit('room_state_update', { roomCode, roomState: updated });
    return updated;
  }

  // --------------------------------------------------------------------------
  // Cluster-Wide Telemetry
  // --------------------------------------------------------------------------
  public getClusterStatus(gatewayPort: number = 8000): ClusterStatus {
    const workers = Array.from(this.workerStats.values()).sort((a, b) => a.workerId - b.workerId);
    const totalClients = workers.reduce((acc, w) => acc + w.clientsCount, 0);

    let totalPlayers = 0;
    for (const roomMap of this.roomPlayers.values()) {
      totalPlayers += roomMap.size;
    }

    return {
      status: workers.length >= 5 ? 'healthy' : 'degraded',
      timestamp: new Date().toISOString(),
      gatewayPort,
      masterHub: {
        roomsCount: this.roomStates.size,
        totalPlayersTracked: totalPlayers,
        leaderboardsCount: this.roomPlayers.size,
      },
      totalConnectedClients: totalClients,
      workers,
    };
  }
}
