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

## 🗺️ Page Router & Deep Link Navigation

AptiQuiz features comprehensive Next.js App Router support with bidirectional URL synchronization, browser history support (`popstate`), and direct URL routing:

| Route | View | Description |
| :--- | :--- | :--- |
| `/` | **Home Page** | Room browser, PIN joiner, 10 ready quizzes, and admin portal |
| `/lobby?room={code}` | **Lobby** | Real-time participant waiting room with Invite QR and start controls |
| `/arena?room={code}` | **Quiz Arena** | Interactive player battle arena with timers, scratchpad & lifelines |
| `/leaderboard?room={code}` | **Leaderboard** | Official verdict recap, Recharts performance trendline & rankings |
| `/projector?room={code}` | **Auditorium Projector** | High-contrast 4K stage display designed for big-screen presentation |
| `/host?room={code}` | **Host Console** | Stage director console for question control, timer freeze & broadcasts |
| `/quiz/[id]` | **Direct Quiz** | Launches directly into arena for any quiz room code or set ID |
| `/room/[code]` | **Direct Room** | Enters the lobby for any specific room code |

---

## 🎯 10 Ready-to-Start Curated Quizzes

AptiQuiz includes 10 pre-configured, ready-to-start quizzes mapped to their respective question sets from [`aptiquiz_question_sets/`](aptiquiz_question_sets/):

1. **`QUANT101`** — *Collegiate Quantitative Speed Qualifier* (Quant, 30 Questions)
2. **`LOGIC202`** — *Deductive & Logical Reasoning Arena* (Logic, 30 Questions)
3. **`VERBAL303`** — *Verbal Ability & Critical Reading Sprint* (Verbal, 30 Questions)
4. **`DATA404`** — *Data Interpretation & Chart Championship* (Data Interpretation, 30 Questions)
5. **`SPEED505`** — *Time, Work & Motion Speed Sprint* (Quant, 30 Questions)
6. **`PROB606`** — *Combinatorics & Probability Masters* (Quant, 30 Questions)
7. **`ALGEBRA707`** — *High-Yield Algebra & Geometry Battle* (Quant, 30 Questions)
8. **`SERIES808`** — *Number Systems & Sequences Blitz* (Quant, 30 Questions)
9. **`CAMPUS909`** — *Tier-1 Campus Placement Grand Prix* (Quant, 30 Questions)
10. **`ADVMIX010`** — *Elite Advanced Mixed Aptitude Gauntlet* (Logic, 30 Questions)

Each quiz card on the Home screen features:
- **`Invite QR`** button — opens a scannable QR code customized to that room.
- **`Start`** button — launches immediately into active arena gameplay.
- **`Lobby`** button — enters the synchronized multiplayer waiting room.
- **`Copy PIN`** — 1-click clipboard copy.

---

## 📱 Dynamic Invite QR Code System

Powered by client-side QR matrix generation:
- **Scannable Camera Target**: High-density QR code readable by any iOS Camera, Android Camera, or Google Lens without any extra app.
- **Full Deep Link**: Encodes `${origin}/lobby?room=${roomCode}` into the QR code.
- **Direct Actions**:
  - **Copy Link**: 1-click URL copying with visual checkmark feedback.
  - **Save Image**: Downloads a high-resolution `.PNG` image (`AptiQuiz-Room-{roomCode}-QR.png`) for slides, flyers, or stage projectors.
  - **Native Share Sheet**: Invokes `navigator.share` on mobile/tablets for instant WhatsApp/Telegram sharing.

---

## 🚀 Scalability Architecture & Distributed WebSocket Cluster

In high-stakes collegiate battles, auditorium speed qualifiers, and campus hackathons, hundreds or thousands of concurrent students submit responses within tight milliseconds. A naive monolithic WebSocket server suffers from event loop starvation, garbage collection pauses, and head-of-line socket delays.

To guarantee **sub-50ms round-trip latency**, **zero packet loss**, and **rock-solid state consistency**, AptiQuiz implements a **Distributed Multi-Process Cluster Architecture** combining a smart reverse-proxy gateway, 5 partitioned WebSocket sub-servers, an authoritative Central Master Aggregator Hub, and an asynchronous Supabase persistence tier:

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

### 🏛️ Scalability Pillars

#### 1. Smart Reverse Proxy & Load Balancer Gateway ([`server/gateway.ts`](server/gateway.ts))
* **Port**: `:8000`
* **Zero-Copy TCP Socket Tunneling**: Intercepts HTTP `Upgrade: websocket` requests and transparently pipes the raw TCP stream directly to the target worker using native Node.js socket piping (`net.connect`). This eliminates payload re-serialization overhead.
* **Dynamic Load Balancing Strategies**:
  * **Least-Connections (`least-connections`)** *(Default)*: Routes new contenders to the worker instance currently handling the fewest active connections, preventing hotspots during mass auditorium join waves.
  * **Consistent Room Hashing (`room-hash`)**: Uses a hash of `roomCode` modulo worker count to enforce room affinity, keeping single-room contenders clustered when desired.
  * **Round-Robin (`round-robin`)**: Sequential connection distribution.
* **Live Cluster Telemetry Dashboard**:
  * Serves an interactive HTML status dashboard at `http://localhost:8000`.
  * Exposes JSON telemetry at `http://localhost:8000/cluster/stats` with per-worker connection counts, message throughput, and process memory utilization.

#### 2. Partitioned Sub-Worker Processes ([`server/sub-worker.ts`](server/sub-worker.ts))
* **Ports**: `:8001`, `:8002`, `:8003`, `:8004`, `:8005`
* **Event Loop Isolation**: By running 5 distinct worker servers across dedicated ports, socket allocations, message serialization, and garbage collection pauses are distributed across multiple CPU cores rather than blocking a single thread.
* **Edge Validation & Sanitization**:
  * Each worker sanitizes incoming answer payloads, validates room tokens, and records sub-millisecond client response timestamps before forwarding events to the master hub.
  * Maintains socket-level heartbeat ping/pongs every 25 seconds, dropping ghost connections immediately.

#### 3. Hub-and-Spoke Central Aggregator ([`server/master-hub.ts`](server/master-hub.ts))
* **Global Leaderboard Merging**: When a student on `Worker 2` locks in an answer and a student on `Worker 5` does the same, the Master Hub aggregates both events into a single authoritative in-memory state map.
* **Deterministic Rank Calculation**: Computes live ranks, tie-breaks, speed-bonus multipliers, and streak statuses across all connected participants simultaneously.
* **Parallel Broadcast Fan-Out**: The unified leaderboard is fanned out in parallel back across all 5 sub-servers, ensuring the auditorium projector and every player's mobile screen update in unison within milliseconds.
* **Concurrency & Race Condition Prevention**: State transitions (e.g. Host Freezes Timer, Next Round, Question Broadcast) are authoritatively dispatched from the hub, avoiding split-brain desynchronization across nodes.

#### 4. Hybrid Realtime & Asynchronous Database Persistence
* **Microsecond In-Memory Execution**: Gameplay-critical operations (timer countdowns, rapid-fire button locks, live rank flips) execute purely in memory for microsecond responsiveness.
* **Asynchronous Supabase Sync**: Aggregated standings, match logs, and player XP are committed asynchronously to the Supabase PostgreSQL database ([`schema.sql`](schema.sql)) without blocking the live WebSocket tick loop.
* **High-Availability Fallback**: If external database connectivity drops or hits rate limits, the system seamlessly continues running on the built-in 300-question bank ([`lib/question-bank.ts`](lib/question-bank.ts)) with zero impact on active players.

---

### 🧪 Load Testing & Cluster Operations

```bash
# 1. Launch the 5-Worker Cluster + Gateway + Master Hub
npm run ws:cluster

# 2. Run the Concurrent Stress Test (Simulates 50+ Real Players across all 5 workers)
npm run ws:test
```

The automated test harness ([`server/simulate-users.ts`](server/simulate-users.ts)) launches 50 concurrent virtual contenders connecting through the Gateway, submitting realistic answers with randomized latency profiles, and asserting synchronized score updates across the cluster.

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

### 4. Seed the Database (Rooms, Questions, Achievements, Contenders)
You can seed the database using either the Node/TypeScript CLI script or directly via SQL:

#### Option A: TypeScript Seed Script (CLI) — Seeds All 300 Curated Questions
Once `.env.local` is configured with your Supabase credentials:
```bash
npm run db:seed
```
This automatically seeds achievements, hosted rooms (`LIVE01`, `ARENA2026`, `GATE2026`, `CAT2026`), all **300 collegiate aptitude questions** across 10 specialized categories from [`aptiquiz_question_sets/`](aptiquiz_question_sets/) with verified explanations, and contender profiles.

#### Option B: Direct SQL Seed
- Run [`supabase/seed.sql`](supabase/seed.sql) in your Supabase SQL Editor to populate base achievements, rooms, and starter questions.
- Run [`supabase/seed_questions.sql`](supabase/seed_questions.sql) to batch insert all **300 curated aptitude questions** into `public.questions`.

---

## 📚 Curated Question Bank (`aptiquiz_question_sets/`)

AptiQuiz includes **300 battle-tested collegiate aptitude questions** structured across 10 distinct sets:
1. `01_quantitative_aptitude` (30 MCQs)
2. `02_logical_reasoning` (30 MCQs)
3. `03_verbal_ability` (30 MCQs)
4. `04_data_interpretation` (30 MCQs)
5. `05_time_work_speed` (30 MCQs)
6. `06_probability_counting` (30 MCQs)
7. `07_algebra_geometry` (30 MCQs)
8. `08_number_systems_series` (30 MCQs)
9. `09_mixed_placement` (30 MCQs)
10. `10_advanced_mixed` (30 MCQs)

### Question Bank Integration
- **In-Memory & Hybrid Fallback**: [`lib/question-bank.ts`](lib/question-bank.ts) exposes `QUESTION_BANK`, `QUESTION_SETS`, `getQuestionsBySet()`, `getQuestionsByCategory()`, and `getRandomQuestionSlice()`.
- **Arena & Projector Runtime**: The Quiz Arena automatically draws questions from Supabase or the curated 300-question bank.
- **Host Console**: Real-time search and category filtering across the entire question bank.

### REST API Endpoints (`/api/questions`)

```bash
# Fetch randomized slice (default: 15 questions)
curl http://localhost:3000/api/questions

# Fetch list of all 10 question sets with metadata
curl "http://localhost:3000/api/questions?sets=true"

# Filter by category (Quant, Logic, Verbal, Data Interpretation)
curl "http://localhost:3000/api/questions?category=Quant&limit=10"

# Filter by specific question set
curl "http://localhost:3000/api/questions?set=05_time_work_speed"
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
