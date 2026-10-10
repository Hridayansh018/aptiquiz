# 🎯 Mind Sprint — Real-Time Quiz App

A high-performance, real-time quiz platform supporting **1,500+ concurrent players** with live leaderboards, team scoring, and a zero-database architecture running entirely in server memory.

---

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Quick Start (Local)](#quick-start-local)
- [Deployment (Render)](#deployment-render)
- [Admin Guide](#-admin-guide)
- [Player Guide](#-player-guide)
- [Public Leaderboard Screen](#-public-leaderboard-screen)
- [Architecture Notes](#architecture-notes)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15 (App Router), React 19 |
| Backend | Node.js + Express + Socket.IO v4 |
| Styling | Tailwind CSS v4 |
| Animations | Motion (Framer Motion) |
| Transport | WebSockets (with polling fallback) |
| Database | **None** — 100% in-memory (RAM) |

---

## Quick Start (Local)

```bash
# 1. Install dependencies
npm install

# 2. Start the development server (Next.js + Socket.IO combined)
npm run dev

# 3. Open the app
# Players:   http://localhost:3000
# Admin:     http://localhost:3000/host-secret-quiz-admin
# Projector: http://localhost:3000/leaderboard/<CODE>
```

> **Note:** The app runs a custom `server.ts` that boots both Next.js and Socket.IO on the same port. Do **not** use `next dev` directly.

---

## Deployment (Render)

This app must be deployed on a **persistent server** (not Vercel) because it requires long-lived WebSocket connections.

### Steps

1. Push your code to GitHub.
2. Go to [render.com](https://render.com) → **New → Web Service**.
3. Connect your GitHub repository.
4. Configure:

| Setting | Value |
|---|---|
| **Environment** | Node |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm start` |
| **Root Directory** | *(leave blank)* |

5. Add Environment Variables:

| Key | Value |
|---|---|
| `NODE_ENV` | `production` |

6. Click **Deploy**. Render auto-assigns the `PORT` — your app handles it automatically.

> ⚠️ **Important:** The app stores all quiz data in RAM. If Render restarts your service (e.g., after a new deploy), all active sessions and scheduled quizzes are wiped. Only deploy updates when no quiz is running.

---

## 👑 Admin Guide

### Accessing the Dashboard

Navigate to:
```
https://your-domain.com/host-secret-quiz-admin
```

**Password:** `SECRET_QUIZ_2026`

> 🔐 Change this in `app/host-secret-quiz-admin/page.tsx` before sharing your deployment URL publicly.

---

### Scheduling a Quiz

1. Click **SCHEDULE QUIZ** in the top-right corner.
2. Fill in the three-step modal:

**Step 1 — Details**
| Field | Description |
|---|---|
| Quiz Title | Name displayed to players |
| Scheduled Start Time | When the quiz is planned to begin |
| Question Duration | Seconds players have to answer each question |
| Gap Between Questions | Seconds the leaderboard is shown between questions |
| Enable Sub-Rooms | Check for 150+ players; uncheck for small groups |

**Step 2 — Questions**

Choose input mode:
- **Manual**: Add questions one-by-one using the editor.
- **CSV Upload**: Drag-and-drop or browse for a `.csv` file.

CSV format (one question per row):
```
question,OptionA,OptionB,OptionC,OptionD,Correct
What is 2+2?,3,4,5,6,B
```
Where `Correct` is `A`, `B`, `C`, or `D`.

**Step 3 — Review & Confirm**

Review the summary and click **SCHEDULE**.  
The system generates a unique **6-character Quiz Code** (e.g., `XJ9K2A`). Share this with players.

---

### Managing Scheduled Quizzes

Each quiz card shows:
- **Quiz Title**, scheduled time, number of questions, and code
- A **live indicator** with player count if a session is already running

**Available actions per quiz card:**

| Button | Behavior |
|---|---|
| **START NOW** | Creates a session and begins the quiz immediately |
| **VIEW LIVE STATUS** | Opens the active session monitor (only shown while live) |
| **EDIT** | Opens a modal to change title, time, durations, and room settings *(disabled while live)* |
| **DELETE** | Permanently removes the quiz from memory *(disabled while live)* |

---

### Running a Live Quiz

1. Click **START NOW** on the quiz card.
2. The dashboard switches to **Live Session View**, showing:
   - Real-time participant count per room (A, B, C)
   - Current question being displayed to players
   - Answer submission count
   - Individual and Team rankings updated live
3. When the quiz ends, all scoreboards freeze in their final state.
4. Use the **Export Rankings** panel to download results.

---

### Exporting Results

In the **Team Rankings** section of the live dashboard:

1. *(Optional)* Enter a percentage in the **Top %** filter box.  
   e.g., entering `30` will export only the top 30% of teams.
2. Click **Export** to download a `quiz-teams-top-XX.csv` file.

CSV columns: `Rank, Team Name, Total Score, Team Size`

---

### Ending a Session

Click **END SESSION** (red button, bottom-left of live view) to return to the quiz list.  
Session data remains in memory until the server restarts.

---

## 📱 Player Guide

### Joining a Quiz

1. Open the app URL in your browser (works on mobile — no download needed).
2. Fill in:
   - **Quiz Code** — provided by your host (e.g., `XJ9K2A`)
   - **Team Name** — your team's name (case-insensitive; all teammates must type the exact same name)
   - **Your Name** — your personal display name
3. Click **JOIN QUIZ**.

You will enter the waiting lobby until the host starts the session.

---

### Answering Questions

- Each question shows **4 options** as colored buttons.
- You have a countdown timer — tap your answer before time runs out.
- You can only submit **one answer per question**.
- After time expires, your button highlights ✅ green or ❌ red.

---

### Between Questions (Gap Phase)

After each question, you will see:
- Whether your answer was correct
- Your **live rank** among all individual players
- The **team leaderboard** 
- A countdown until the next question

---

### Reconnecting

If you lose connection or accidentally refresh:
1. Simply re-open the app URL.
2. Re-enter your **exact same name and team name**.
3. You will rejoin with your full score restored.

> The server identifies you by a `name:team` hash — as long as you use the same details, your progress is preserved.

---

## 📺 Public Leaderboard Screen

For stage TVs or projectors, open this URL in a separate browser tab:

```
https://your-domain.com/leaderboard/<QUIZ_CODE>
```

This is a **read-only observer** — it:
- Does **not** count as a player or affect room stats
- Shows a two-column live view: **Team Rankings** on the left, **Top Individuals** on the right
- Animates ranking changes in real-time as scores update
- Displays a "Waiting for Host to Start" badge before the quiz begins
- Switches to "Final Standings" banner when the quiz ends

---

## Architecture Notes

### Memory-Only Design
All quiz state (scheduled quizzes, sessions, scores) lives in Node.js RAM. There is no database. This means:
- **Zero latency** on reads/writes
- **Ephemeral** — a server restart clears everything
- Supports **1,500+ concurrent users** with Socket.IO room sharding

### Room Sharding
When **Enable Sub-Rooms** is checked, players are automatically distributed across Rooms A, B, and C using a least-loaded assignment algorithm. This ensures no single Socket.IO namespace gets overloaded.

### Socket Events Reference

| Event | Direction | Purpose |
|---|---|---|
| `join-session` | Client → Server | Player joins a quiz |
| `join-observer` | Client → Server | Observer joins leaderboard view |
| `submit-answer` | Client → Server | Player submits answer |
| `create-session` | Admin → Server | Host creates a session |
| `start-quiz` | Admin → Server | Host starts question flow |
| `schedule-quiz` | Admin → Server | Host schedules a new quiz |
| `edit-quiz` | Admin → Server | Host edits a quiz |
| `delete-quiz` | Admin → Server | Host deletes a quiz |
| `get-session-status` | Admin → Server | Poll if a session is live |
| `new-question` | Server → Client | Broadcast question to players |
| `timer-tick` | Server → Client | Countdown tick |
| `time-up` | Server → Client | Question answer revealed |
| `leaderboard-reveal` | Server → Client | Post-question leaderboard |
| `quiz-finished` | Server → Client | Final results |
