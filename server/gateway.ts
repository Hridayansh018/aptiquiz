import http from 'http';
import net from 'net';
import { MasterAggregatorHub } from './master-hub';
import { SubWorkerServer } from './sub-worker';

export interface GatewayConfig {
  port: number;
  workers: SubWorkerServer[];
  strategy?: 'least-connections' | 'room-hash' | 'round-robin';
}

export class LoadBalancerGateway {
  private server: http.Server;
  private port: number;
  private workers: SubWorkerServer[];
  private masterHub: MasterAggregatorHub;
  private strategy: 'least-connections' | 'room-hash' | 'round-robin';
  private roundRobinIndex: number = 0;

  constructor(config: GatewayConfig, masterHub: MasterAggregatorHub) {
    this.port = config.port;
    this.workers = config.workers;
    this.masterHub = masterHub;
    this.strategy = config.strategy || 'least-connections';

    this.server = http.createServer((req, res) => {
      this.handleHttpRequest(req, res);
    });

    this.server.on('upgrade', (req, socket, head) => {
      this.handleWebSocketUpgrade(req, socket, head);
    });
  }

  // --------------------------------------------------------------------------
  // Start the Gateway
  // --------------------------------------------------------------------------
  public start(): Promise<void> {
    return new Promise((resolve) => {
      this.server.listen(this.port, () => {
        console.log(`\n===============================================================`);
        console.log(`⚡ APTIQUIZ WEBSOCKET LOAD BALANCER GATEWAY ONLINE`);
        console.log(`📡 Gateway Listening Port: :${this.port}`);
        console.log(`⚖️  Balancing Strategy:   ${this.strategy.toUpperCase()}`);
        console.log(`🔀 Sub-Worker Nodes:     ${this.workers.length} Instances (Ports: ${this.workers.map(w => w.port).join(', ')})`);
        console.log(`📊 Cluster Telemetry:    http://localhost:${this.port}/cluster/stats`);
        console.log(`===============================================================\n`);
        resolve();
      });
    });
  }

  public stop(): Promise<void> {
    return new Promise((resolve) => {
      this.server.close(() => resolve());
    });
  }

  // --------------------------------------------------------------------------
  // Target Sub-Worker Selection Algorithm
  // --------------------------------------------------------------------------
  public pickWorker(roomCode?: string): SubWorkerServer {
    if (this.workers.length === 0) {
      throw new Error('No sub-workers registered in cluster');
    }

    if (this.strategy === 'least-connections') {
      // Pick the worker with the lowest connected clients count
      let lowest = this.workers[0];
      for (const worker of this.workers) {
        if (worker.getStats().clientsCount < lowest.getStats().clientsCount) {
          lowest = worker;
        }
      }
      return lowest;
    }

    if (this.strategy === 'room-hash' && roomCode) {
      // Consistent hash of roomCode
      let hash = 0;
      for (let i = 0; i < roomCode.length; i++) {
        hash = (hash << 5) - hash + roomCode.charCodeAt(i);
        hash |= 0;
      }
      const index = Math.abs(hash) % this.workers.length;
      return this.workers[index];
    }

    // Default Round-Robin
    const selected = this.workers[this.roundRobinIndex % this.workers.length];
    this.roundRobinIndex = (this.roundRobinIndex + 1) % this.workers.length;
    return selected;
  }

  // --------------------------------------------------------------------------
  // HTTP Telemetry & Assignment Endpoints
  // --------------------------------------------------------------------------
  private handleHttpRequest(req: http.IncomingMessage, res: http.ServerResponse) {
    const parsedUrl = new URL(req.url || '/', `http://localhost:${this.port}`);
    const pathname = parsedUrl.pathname;

    // Enable CORS for browser frontend clients
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    // Cluster Telemetry Status Endpoint
    if (pathname === '/cluster/stats' || pathname === '/status' || pathname === '/health') {
      const stats = this.masterHub.getClusterStatus(this.port);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(stats, null, 2));
      return;
    }

    // Worker Assignment Endpoint (Client asks which port to connect to)
    if (pathname === '/assign') {
      const room = parsedUrl.searchParams.get('room') || 'LIVE01';
      const assignedWorker = this.pickWorker(room);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          status: 'success',
          roomCode: room,
          assignedWorkerId: assignedWorker.workerId,
          targetPort: assignedWorker.port,
          websocketUrl: `ws://localhost:${assignedWorker.port}?room=${room}`,
          gatewayUrl: `ws://localhost:${this.port}?room=${room}`,
        })
      );
      return;
    }

    // Root Welcome HTML Dashboard
    if (pathname === '/') {
      const stats = this.masterHub.getClusterStatus(this.port);
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>AptiQuiz WebSocket Cluster • 5 Sub-Servers &amp; Load Balancer</title>
            <style>
              body { font-family: system-ui, sans-serif; background: #0e082a; color: #e5deff; padding: 2rem; margin: 0; }
              h1 { color: #c8bfff; }
              .card { background: #1c153f; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem; }
              .badge { display: inline-block; padding: 4px 10px; border-radius: 9999px; font-weight: bold; font-size: 11px; background: #7359f8; color: white; }
              table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
              th, td { text-align: left; padding: 8px 12px; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 13px; }
              th { color: #c8bfff; font-weight: bold; }
              .green { color: #00e599; font-weight: bold; }
            </style>
          </head>
          <body>
            <h1>🚀 AptiQuiz Distributed WebSocket Cluster</h1>
            <div class="card">
              <span class="badge">GATEWAY PORT :${this.port}</span>
              <p>Active Strategy: <strong>${this.strategy.toUpperCase()}</strong></p>
              <p>Total Active Connected Clients: <strong class="green">${stats.totalConnectedClients}</strong></p>
              <p>Rooms Synced: <strong>${stats.masterHub.roomsCount}</strong> | Players Tracked in Master Hub: <strong>${stats.masterHub.totalPlayersTracked}</strong></p>
            </div>
            <div class="card">
              <h3>5 Load-Balanced WebSocket Sub-Servers</h3>
              <table>
                <thead>
                  <tr>
                    <th>Worker ID</th>
                    <th>Port</th>
                    <th>Connected Clients</th>
                    <th>Messages In/Out</th>
                    <th>Memory</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  ${stats.workers.map(w => `
                    <tr>
                      <td><strong>Sub-Worker #${w.workerId}</strong></td>
                      <td>:${w.port}</td>
                      <td><span class="green">${w.clientsCount}</span> clients</td>
                      <td>↓ ${w.messagesReceived} / ↑ ${w.messagesSent}</td>
                      <td>${w.memoryUsageMB} MB</td>
                      <td><span class="badge" style="background:#00e599;color:#0e082a;">ONLINE</span></td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
            <p><a href="/cluster/stats" style="color:#c8bfff;">View Raw JSON Telemetry (/cluster/stats)</a></p>
          </body>
        </html>
      `);
      return;
    }

    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Endpoint not found' }));
  }

  // --------------------------------------------------------------------------
  // Transparent WebSocket Reverse Proxy via TCP Socket Piping
  // --------------------------------------------------------------------------
  private handleWebSocketUpgrade(req: http.IncomingMessage, clientSocket: any, head: Buffer) {
    const url = new URL(req.url || '/', `http://localhost:${this.port}`);
    const room = url.searchParams.get('room') || 'LIVE01';

    // Pick target sub-worker
    const targetWorker = this.pickWorker(room);

    // Forward the connection to the target sub-worker's port
    const targetSocket = net.connect(targetWorker.port, 'localhost', () => {
      // Re-construct the raw HTTP upgrade request header
      let rawRequest = `${req.method} ${req.url} HTTP/${req.httpVersion}\r\n`;
      for (let i = 0; i < req.rawHeaders.length; i += 2) {
        const key = req.rawHeaders[i];
        const val = req.rawHeaders[i + 1];
        if (key.toLowerCase() === 'host') {
          rawRequest += `Host: localhost:${targetWorker.port}\r\n`;
        } else {
          rawRequest += `${key}: ${val}\r\n`;
        }
      }
      rawRequest += '\r\n';

      targetSocket.write(rawRequest);
      if (head && head.length > 0) {
        targetSocket.write(head);
      }

      // Bi-directional pipe between client and target sub-worker
      clientSocket.pipe(targetSocket);
      targetSocket.pipe(clientSocket);
    });

    targetSocket.on('error', (err) => {
      console.error(`[Gateway Proxy] Error forwarding to Sub-Worker #${targetWorker.workerId}:`, err.message);
      clientSocket.destroy();
    });

    clientSocket.on('error', () => {
      targetSocket.destroy();
    });
  }
}
