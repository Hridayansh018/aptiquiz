import { MasterAggregatorHub } from './master-hub';
import { SubWorkerServer } from './sub-worker';
import { LoadBalancerGateway } from './gateway';

export interface ClusterOptions {
  gatewayPort?: number;
  workerCount?: number;
  baseWorkerPort?: number;
  strategy?: 'least-connections' | 'room-hash' | 'round-robin';
}

export async function startCluster(options: ClusterOptions = {}) {
  const gatewayPort = options.gatewayPort || parseInt(process.env.WS_GATEWAY_PORT || '8000', 10);
  const workerCount = options.workerCount || 5;
  const baseWorkerPort = options.baseWorkerPort || 8001;
  const strategy = options.strategy || 'least-connections';

  console.log(`\n===============================================================`);
  console.log(`🚀 INITIALIZING APTIQUIZ DISTRIBUTED WEBSOCKET CLUSTER`);
  console.log(`🎯 Workers Configured: ${workerCount} Sub-Servers`);
  console.log(`===============================================================\n`);

  // 1. Create the central Master Aggregator Hub (Merged Leaderboard & Room Sync)
  const masterHub = new MasterAggregatorHub();
  console.log(`[Master Hub] 🧠 Central Leaderboard & State Aggregator online.`);

  // 2. Spawn the 5 WebSocket Sub-Servers
  const workers: SubWorkerServer[] = [];
  for (let i = 1; i <= workerCount; i++) {
    const port = baseWorkerPort + i - 1;
    const worker = new SubWorkerServer(i, port, masterHub);
    await worker.start();
    workers.push(worker);
  }

  // 3. Start the Load Balancer Gateway
  const gateway = new LoadBalancerGateway(
    {
      port: gatewayPort,
      workers,
      strategy,
    },
    masterHub
  );
  await gateway.start();

  const shutdown = async () => {
    console.log('\n[Cluster] Shutting down cluster gracefully...');
    await gateway.stop();
    for (const worker of workers) {
      await worker.stop();
    }
    console.log('[Cluster] All sub-workers and gateway stopped.');
    process.exit(0);
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);

  return { masterHub, workers, gateway };
}

// Auto-run if executed directly
startCluster().catch((err) => {
  console.error('[Cluster Error]', err);
  process.exit(1);
});
