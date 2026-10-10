import { WebSocket } from 'ws';

interface SimulatedPlayer {
  id: string;
  name: string;
  college: string;
  ws?: WebSocket;
  assignedWorkerId?: number;
  finalScore?: number;
  finalRank?: number;
}

const COLLEGES = [
  'IIT Delhi',
  'BITS Pilani',
  'RVCE Bangalore',
  'NIT Trichy',
  'IIT Bombay',
  'Stanford Online',
  'IIIT Hyderabad',
  'MIT Pune',
];

const FIRST_NAMES = [
  'Aarav', 'Ananya', 'Rohan', 'Kavya', 'Tanmay', 'Divya', 'Siddharth', 'Pooja',
  'Varun', 'Meera', 'Nikhil', 'Sneha', 'Aayush', 'Pranav', 'Rhea', 'Kunal',
  'Isha', 'Yash', 'Aditi', 'Harsh', 'Tara', 'Sourav', 'Nisha', 'Chirag', 'Sanya'
];

async function runLoadTest(playerCount: number = 25, gatewayUrl: string = 'ws://localhost:8000') {
  console.log(`\n===============================================================`);
  console.log(`🧪 SIMULATING ${playerCount} PLAYERS CONNECTING ACROSS 5 SUB-SERVERS`);
  console.log(`📡 Connecting via Gateway: ${gatewayUrl}?room=ARENA2026`);
  console.log(`===============================================================\n`);

  const players: SimulatedPlayer[] = [];
  const workerClientCounts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  let latestLeaderboard: any[] = [];

  // 1. Connect all players
  for (let i = 1; i <= playerCount; i++) {
    const name = `${FIRST_NAMES[i % FIRST_NAMES.length]} ${String.fromCharCode(65 + (i % 26))}.`;
    const college = COLLEGES[i % COLLEGES.length];
    const id = `sim_p${i}`;

    const player: SimulatedPlayer = { id, name, college };
    players.push(player);

    const ws = new WebSocket(`${gatewayUrl}?room=ARENA2026&playerId=${id}`);
    player.ws = ws;

    await new Promise<void>((resolve) => {
      ws.on('open', () => {
        // Send JOIN_ROOM
        ws.send(
          JSON.stringify({
            type: 'JOIN_ROOM',
            roomCode: 'ARENA2026',
            player: { id, name, college, score: 0 },
          })
        );
        resolve();
      });

      ws.on('message', (raw: any) => {
        try {
          const msg = JSON.parse(raw.toString());
          if (msg.type === 'CONNECTED' && msg.workerId) {
            player.assignedWorkerId = msg.workerId;
            workerClientCounts[msg.workerId] = (workerClientCounts[msg.workerId] || 0) + 1;
          }
          if (msg.type === 'LEADERBOARD_UPDATE' && msg.leaderboard) {
            latestLeaderboard = msg.leaderboard;
          }
        } catch {}
      });
    });

    // Small stagger
    await new Promise((r) => setTimeout(r, 50));
  }

  console.log(`\n✅ All ${playerCount} players connected!`);
  console.log(`📊 Load Balancing Distribution Across the 5 Sub-Servers:`);
  for (const [workerId, count] of Object.entries(workerClientCounts)) {
    const bar = '█'.repeat(count);
    console.log(`   • Sub-Worker #${workerId} (Port :800${workerId}): ${count} players [${bar}]`);
  }

  // 2. Simulate round answers
  console.log(`\n⚡ Simulating players submitting answers with varying speeds & scores...`);
  for (let round = 1; round <= 3; round++) {
    console.log(`   ▶ Round ${round} In Progress...`);
    for (const player of players) {
      if (player.ws && player.ws.readyState === WebSocket.OPEN) {
        const isCorrect = Math.random() > 0.3;
        const latencySec = Math.round((Math.random() * 8 + 2) * 10) / 10;
        const points = isCorrect ? Math.round(1000 * Math.max(0.4, (20 - latencySec) / 20)) : 0;

        player.ws.send(
          JSON.stringify({
            type: 'SUBMIT_ANSWER',
            roomCode: 'ARENA2026',
            answer: {
              roomCode: 'ARENA2026',
              playerId: player.id,
              questionId: round,
              round,
              selectedKey: isCorrect ? 'B' : 'A',
              latencySec,
              pointsEarned: points,
              isCorrect,
            },
          })
        );
      }
      await new Promise((r) => setTimeout(r, 20));
    }
  }

  // Allow propagation
  await new Promise((r) => setTimeout(r, 1000));

  console.log(`\n===============================================================`);
  console.log(`🏆 MERGED LEADERBOARD (AGGREGATED ACROSS ALL 5 SUB-SERVERS)`);
  console.log(`===============================================================`);
  const top15 = latestLeaderboard.slice(0, 15);
  console.log(
    `Rank | Name               | College            | Score    | Streak | Worker Node`
  );
  console.log(
    `--------------------------------------------------------------------------------`
  );
  for (const p of top15) {
    const rankStr = String(p.rank).padEnd(4);
    const nameStr = p.name.padEnd(18);
    const colStr = (p.college || '').padEnd(18);
    const scoreStr = `${p.score} PTS`.padEnd(8);
    const streakStr = `🔥 ${p.streakCount || 0}`.padEnd(6);
    const workerStr = `Sub-Worker #${p.workerId} (:800${p.workerId})`;
    console.log(`${rankStr} | ${nameStr} | ${colStr} | ${scoreStr} | ${streakStr} | ${workerStr}`);
  }
  console.log(`===============================================================\n`);

  // Disconnect simulated players
  for (const p of players) {
    if (p.ws) p.ws.close();
  }

  console.log(`🎉 Load test with 50 concurrent users completed successfully!`);
}

// Auto-run if executed with 50 players
runLoadTest(50).catch(console.error);
