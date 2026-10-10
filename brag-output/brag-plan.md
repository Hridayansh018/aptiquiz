# /brag Plan: AptiQuiz (QUITZO)

## 1. Planning Rubric Answers

1. **What is it?**
   AptiQuiz is a high-octane collegiate aptitude arena that turns boring placement tests and quantitative exams into a multiplayer esports competition with auditorium 4K projection and real-time distributed load balancing.

2. **Who is it for, and what does it do for them?**
   For students, college placement cells, and hackathons: it transforms solitary multiple-choice tests into live campus rivalry battles with speed multipliers, streak bonuses, and instant auditorium rankings.

3. **What sets it apart?**
   A custom 5-node distributed WebSocket cluster with a central Master Hub aggregator that load balances hundreds of concurrent test-takers with zero latency, alongside 4K auditorium projector mode and supersonic speed-scoring (under 5s = 1,000 pts).

4. **What is the most impressive or funniest claim?**
   "500 students in the auditorium. 5 distributed sub-servers. 1 unified live leaderboard. Zero lag."

5. **What is the visual hook?**
   A high-stakes quantitative round countdown clock rapidly draining with ambient heartbeat audio, followed by an electrifying 4.2-second speed lock-in bursting with neon XP particles and a 🔥 4X streak multiplier.

6. **What real UI or flow will be shown?**
   - The Auditorium Lobby with live connected contenders across colleges (IIT, BITS, RVCE, NIT).
   - The Quiz Arena in active combat: 45s timer, Option B lock-in, latency telemetry (4.2s), points earned (+940 PTS).
   - The Distributed Cluster Architecture: 5 sub-servers dynamically balancing sockets.
   - The 4K Projector Podium & Merged Cross-Node Leaderboard.

7. **What tone fits?**
   `polished` / `default` — High-energy esports meets intellectual collegiate championship. Punchy, clean, premium dark mode.

8. **What is the one-line share caption?**
   "We got tired of boring aptitude tests, so we turned campus placements into a live 5-server multiplayer arena."

9. **Duration & Format:**
   - Format: Landscape (1920×1080), 30fps
   - Target Duration: 20 seconds total

---

## 2. Beat-by-Beat Storyboard (20 Seconds Total)

| Scene | Time | Name | Visual Action & Real UI Elements | Audio Cue / SFX |
| :--- | :--- | :--- | :--- | :--- |
| **Scene 1** | 0.0s – 3.2s | **The Hook** | Deep auditorium gradient (`#0e082a`). Giant typography: *"College Aptitude Tests Are Boring."* Glitch transition into *"So We Made It An Esports Arena."* QUITZO electric badge pulses. | Synth riser into energetic beat drop. |
| **Scene 2** | 3.2s – 8.0s | **The Arena Lock-in** | Real Quiz Arena UI: Quantitative Aptitude Speed Question. Live countdown ticker (45s → 4.2s). Player clicks **Option B: 64 km/h**. Instant neon flash: **+940 PTS** lock-in, **🔥 4X Streak**, **⚡ 4.2s Speed**. | Fast clock tick → Heavy success chime + bass punch. |
| **Scene 3** | 8.0s – 12.5s | **Distributed Cluster Power** | Architecture telemetry visual: Port `:8000` Gateway balancing 500+ live players across Sub-Workers `#1` through `#5` (`:8001` - `:8005`) merging into Master Hub in real-time. | Hi-tech socket data burst SFX. |
| **Scene 4** | 12.5s – 17.0s | **Auditorium 4K Projector Podium** | Monumental Projector Mode: Top 3 campus champions podium (IIT Delhi, BITS Pilani, RVCE Bangalore). Gold crown particles, accuracy charts, and gold confetti explosion. | Celebration fanfare & crowd cheer swell. |
| **Scene 5** | 17.0s – 20.0s | **The Punchline & Outro** | Glowing QUITZO brand card: *"You Built It. Now Compete."* Badges: Next.js 15 • Supabase • 5-Node WebSocket Cluster. | Clean musical decay & final power chord. |

---

## 3. Visual Identity & Brand Tokens

- **Background:** `#0e082a` (Auditorium Midnight), `#1c1738` (Card Surface)
- **Primary Accent:** `#7359f8` (Electric Ultraviolet), `#c8bfff` (Lavender Highlight)
- **Status Accents:**
  - Speed / Streak: `#ff9900` / `#f59e0b` (Flame Amber)
  - Accuracy / Online: `#00e599` (Emerald Mint)
- **Typography:**
  - Display / Hero: `Rubik`, sans-serif (800 / 900 weight)
  - Body & Telemetry: `Inter`, system-ui
