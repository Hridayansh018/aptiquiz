# Quitzo AptiQuiz - Live Multiplayer Aptitude Arena

Quitzo AptiQuiz is a high-voltage, synchronized real-time multiplayer aptitude quiz arena designed for collegiate scrimmage battles, auditorium stage broadcasts, and competitive aptitude training.

Powered by **Next.js 15**, **Supabase** for persistent database storage & **Supabase Realtime WebSockets** for live synchronization.

---

## 🚀 Key Features & Screen Architecture

### 1. 🏠 Home Screen (Default Destination)
- **Competitive Player Profile**: Dynamic player display with live XP, real-time leaderboard rank, and customizable player name and institution.
- **Hosted Quiz Arenas Browser**: Live catalog of active competitions fetched directly from Supabase with category filters (`Quant`, `Logic`, `Verbal`, `Data Interpretation`), live player counters, round info, and one-click room joining.
- **Direct PIN Quick-Join Bar**: Direct room code input for instantaneous entry into live lectures, arenas, or competitions.
- **Administrator Portal**: One-click modal to inject new aptitude questions into the active runtime and Supabase database.

### 2. 📺 Auditorium 4K Projector Screen
- Stage banner with **Live Broadcast** indicator, round tracker, and category indicators.
- **Monumental Circular Countdown Timer**: Real-time ticker with urgent state pulsing and host pause/freeze support.
- **Question Billboard & Category Tag**: Displays question prompt, standard pace metadata (`45s`), and points available.
- **Dynamic Audience Counters**: Live response and student submission counters synced with room participants.

### 3. 👥 AptiQuiz Lobby
- Saturated violet-purple card with live matchmaking status and participant count.
- **Interactive PIN, Deep Link & QR Sharing**: One-click code copying, authentic QR code modal, and instant social deep link generator (`?room={code}&tab=lobby`) for WhatsApp, X (Twitter), Telegram, Email, and native device share sheets with automatic URL route detection.
- **Real-Time Collegiate Roster**: Player initials, student names, and college affiliations with active online indicators.
- **Room Controls**: Lock/unlock room toggle, shuffle players, and start match trigger.

### 4. ⚡ Quiz Arena (Player Interactive Mode)
- **Question Category Tags**: Prominently displays `QUANT`, `LOGIC`, `VERBAL`, and `DATA INTERPRETATION` tags for round context.
- **Dynamic Pacing Progress Bar**: Real-time animated time-remaining progress bar that changes color based on urgency:
  - 🟢 **Speed Bonus Zone** (1.5x active point multiplier)
  - 🟡 **Standard Pace** (lock in verdict)
  - 🔴 **Critical Pacing** (points locking with urgent audio ticks)
- **Proctored Scratchpad Calculator**: Built-in arithmetic solver with clean expression evaluator and tactile keypad.
- **Lifeline Controls**: `50:50` eliminating two incorrect choices, and `Audience Poll` percentage breakdown.
- **Tactile Answer Selection**: Unselected initially, with immediate audio-tactile feedback upon choice.

### 5. 🏆 Leaderboard & Round Reveal
- **Question Recap & Official Verdict**: Displays the correct solution and response distribution.
- **Recharts Performance Line Chart**: Interactive player trajectory trendline tracking performance across rounds:
  - Metric switcher: **Points Earned**, **Cumulative XP**, **Response Speed (seconds)**, and **Rank Movement**.
- **Live Standings Movement**: Real-time rank changes, streak badges, and starred top contenders derived dynamically from the room's players.
- **Automation Ticker**: Countdown to next round with skip controls and full standing modals.

### 6. 🎖️ Badges & Milestone Achievement System (User Profile)
- Displays achievement cards based on milestone points reached:
  - **Aptitude Ace**: Reach 3,000 XP in collegiate competitions.
  - **Speedster**: Answer correctly in under 5.0 seconds with >95% precision.
  - **Streak Prodigy**: Maintain an unbroken streak of 5+ correct responses.
  - **Grand Contender**: Surpass 5,000 cumulative XP.
  - **Campus Vanguard**: Reach the top 5 ranking on the live auditorium leaderboard.
  - **Precision Hawk**: Attain >90% accuracy in a quantitative round.
- Filter badges by `All`, `Unlocked`, and `Locked`, with visual tier glows (`Diamond`, `Gold`, `Silver`).

### 7. 🎛️ Auditorium Host Console
- Stage controller to freeze timers, advance questions, toggle room locks, and broadcast live ticker announcements.

---

## ⚡ Distributed WebSocket Cluster (5 Sub-Servers & Load Balancer)

To handle thousands of concurrent students and auditorium participants with zero latency, AptiQuiz features a **Distributed WebSocket Cluster Architecture** with 5 load-balanced sub-servers merged into a single Central Master Hub:

```
                                +---------------------------------------------+
                                |      Master Central Aggregator (Port 8000)  |
                                |  - Unified Global Realtime Leaderboard      |
                                |  - Merged Room State & Sync                 |
                                |  - Supabase Database Persistence            |
                                |  - Cross-Worker Broadcast Hub               |
                                +---------------------------------------------+
                                      ▲          ▲         ▲         ▲         ▲
                      Internal IPC /  |          |         |         |         |  Internal IPC /
                      WebSocket Bus   |          |         |         |         |  WebSocket Bus
                                      ▼          ▼         ▼         ▼         ▼
                                +----------+ +----------+ +----------+ +----------+ +----------+
                                | Worker 1 | | Worker 2 | | Worker 3 | | Worker 4 | | Worker 5 |
                                | SubServer| | SubServer| | SubServer| | SubServer| | SubServer|
                                |(Port 8001)|(Port 8002)|(Port 8003)|(Port 8004)|(Port 8005)|
                                +----------+ +----------+ +----------+ +----------+ +----------+
                                      ▲          ▲         ▲         ▲         ▲
                                      +----------+----+----+---------+---------+
                                                      |
                                        +---------------------------+
                                        |  Gateway / Load Balancer  |
                                        | (Smart Router / Proxy)    |
                                        | - Least-Connections Policy|
                                        | - Consistent Room Hashing |
                                        +---------------------------+
                                                      ▲
                                                      |
                                              Frontend Clients
                                         (Players, Projector, Host)
```

### Cluster Components:
1. **Central Master Aggregator Hub** ([`server/master-hub.ts`](server/master-hub.ts)):
   - **Unified Global Leaderboard**: Aggregates and ranks all players across all 5 sub-servers into a single unified scoreboard.
   - **State Merging**: Synchronizes round advancement, timer freezing, and announcements cluster-wide.
   - **Cross-Node Fan-Out**: Broadcasts merged leaderboard events down to all sub-servers so every student sees synchronized rankings.
2. **5 Independent Sub-Servers** ([`server/sub-worker.ts`](server/sub-worker.ts)):
   - Run on distinct ports: `:8001`, `:8002`, `:8003`, `:8004`, `:8005`.
   - Maintain client connections, measure ping/latencies, sanitize answer inputs, and submit scores to the Master Hub.
3. **Load Balancer Gateway** ([`server/gateway.ts`](server/gateway.ts)):
   - Listens on Port `:8000`.
   - Distributes incoming WebSocket clients evenly across the 5 workers using **Least-Connections** or **Room-Affinity** algorithms.
   - Serves an interactive HTML status dashboard at `http://localhost:8000` and live JSON telemetry at `http://localhost:8000/cluster/stats`.

### Running the Distributed Cluster:
```bash
# Start all 5 WebSocket Sub-Servers + Load Balancer Gateway
npm run ws:cluster

# Run automated 25+ concurrent player simulation across all 5 workers
npm run ws:test
```

## 🗄️ Supabase Database Architecture

The project includes a ready-to-run SQL schema file at [`schema.sql`](schema.sql) (and [`supabase/schema.sql`](supabase/schema.sql)).

### Database Tables:
| Table Name | Description |
| :--- | :--- |
| `public.profiles` | User profiles, college affiliations, and total XP |
| `public.rooms` | Active quiz sessions, room PINs, host settings, rounds, and lock states |
| `public.questions` | Question repository (section, topic, options JSONB, answers, explanations) |
| `public.room_players` | Real-time player attendance per room, scores, ranks, and streaks |
| `public.performance_history` | Per-round player response telemetry, accuracy, speed, and XP |
| `public.achievements` | Milestone badges and progression criteria |

### Features Included in the Schema:
- **Row Level Security (RLS)**: Public read/write policies configured for anonymous and authenticated participants.
- **Indexes**: Optimized indexes for `room_code`, `category`, and leaderboard `score DESC`.
- **Realtime Publication**: `ALTER PUBLICATION supabase_realtime ADD TABLE ...` enabled for rooms, questions, and players.
- **Starter Seed Data**: Achievement templates and starter aptitude questions included.

---

## ⚙️ Supabase Setup Guide

### 1. Create a Supabase Project
1. Go to [Supabase](https://supabase.com/) and create a new project.
2. Once created, navigate to **Project Settings -> API**.
3. Copy your **Project URL** and **anon / public Key**.

### 2. Configure Environment Variables
Create a `.env.local` file in the project root (or copy from `.env.example`):

```bash
# GEMINI AI (Optional)
GEMINI_API_KEY="your-gemini-key"

# App URL
APP_URL="http://localhost:3000"

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="https://your-project-ref.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-public-key"
```

### 3. Run the SQL Table Creation Script
1. Open your Supabase Dashboard and go to the **SQL Editor**.
2. Click **New query**.
3. Copy the full contents of [`schema.sql`](schema.sql) and paste into the editor.
4. Click **Run**.
5. All tables, security policies, indexes, and realtime publications will be created instantly.

---

## 🛠️ Adding Questions to the Database

You can add questions through multiple methods:

### Method 1: In-App Administrator Portal (GUI)
1. On the **Home** screen or in the **Host Console**, click **"Add Question / View Guide"**.
2. Fill out the form (Question prompt, Category, Options A–D, Correct Key, Explanation).
3. Click **"Inject Question Into Arena"**.
4. The question is saved into the Supabase `questions` table and immediately loaded into the active runtime.

### Method 2: Via REST API (`/api/questions`)

#### Fetch Questions (GET):
```bash
# Fetch all questions
curl http://localhost:3000/api/questions

# Filter by category
curl "http://localhost:3000/api/questions?category=Quant"

# Filter by room
curl "http://localhost:3000/api/questions?room=7K9QX"
```

#### Insert New Question (POST):
```bash
curl -X POST http://localhost:3000/api/questions \
  -H "Content-Type: application/json" \
  -d '{
    "category": "Quant",
    "section": "Section B",
    "topic": "Probability",
    "question": "Two dice are rolled. What is the probability that the sum is greater than 9?",
    "options": [
      { "key": "A", "text": "1/6", "isCorrect": true },
      { "key": "B", "text": "1/9" },
      { "key": "C", "text": "5/36" },
      { "key": "D", "text": "1/4" }
    ],
    "correctKey": "A",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "6 / 36 = 1/6",
    "explanation": "Pairs with sum > 9: (4,6), (5,5), (5,6), (6,4), (6,5), (6,6) = 6/36 = 1/6."
  }'
```

### Method 3: Direct SQL Insert in Supabase
Run an `INSERT` statement in the Supabase SQL editor:
```sql
INSERT INTO public.questions (category, section, topic, question, options, correct_key, official_answer_text, standard_pace_sec, max_points, explanation)
VALUES (
  'Quant',
  'Section A',
  'Number Systems',
  'What is the remainder when 2^100 is divided by 7?',
  '[
    {"key": "A", "text": "1"},
    {"key": "B", "text": "2", "isCorrect": true},
    {"key": "C", "text": "4"},
    {"key": "D", "text": "6"}
  ]'::jsonb,
  'B',
  'Option B: 2',
  45,
  1000,
  '2^3 = 8 ≡ 1 (mod 7). 2^100 = (2^3)^33 * 2^1 ≡ 1^33 * 2 = 2.'
);
```

---

## 💻 Tech Stack

- **Framework**: Next.js 15 (App Router, React 19)
- **Database**: Supabase (PostgreSQL with Row Level Security)
- **Real-Time Engine**: Supabase Realtime (WebSockets `wss://`)
- **Language**: TypeScript 5.9
- **Styling**: Tailwind CSS v4, `tw-animate-css`
- **Charts**: Recharts (Responsive performance trajectory trendline)
- **Icons**: Lucide React
- **Audio Synthesizer**: Web Audio API Custom Synthesizer (`lib/audio.ts`)
- **Confetti Engine**: Canvas-Confetti

---

## 🏃 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Configure environment variables in .env.local
cp .env.example .env.local
# (Add your NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY)

# 3. Start development server
npm run dev

# 4. Open in browser
# http://localhost:3000

# 5. Type-check & build for production
npx tsc --noEmit
npm run build
```
