import pptxgen from 'pptxgenjs';
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

async function generatePowerPoint() {
  console.log('📊 Initializing AptiQuiz PowerPoint Generator...');
  const pres = new pptxgen();

  // Set 16:9 widescreen layout
  pres.layout = 'LAYOUT_16x9';

  // Palette Constants matching AptiQuiz Dark Arcade Theme
  const BG_COLOR = '0E082A';       // Deep Midnight Violet
  const CARD_BG = '1A1438';        // Card surface
  const PRIMARY = '7359F8';        // Neon Purple
  const SECONDARY = 'C8BFFF';      // Pastel Lavender
  const ACCENT_GREEN = '00E599';   // Mint Emerald
  const ACCENT_AMBER = 'FFB800';   // Trophy Gold
  const TEXT_WHITE = 'FFFFFF';
  const TEXT_MUTED = 'C9C4D8';
  const FONT_TITLE = 'Arial';
  const FONT_BODY = 'Arial';

  // Helper: Common slide setup with background & branding
  function createBaseSlide(title: string, categoryBadge: string = 'APTIQUIZ PLATFORM') {
    const slide = pres.addSlide();
    slide.background = { color: BG_COLOR };

    // Top Category / Section Badge
    slide.addText(categoryBadge.toUpperCase(), {
      x: 0.8,
      y: 0.4,
      w: 8.0,
      h: 0.3,
      fontSize: 10,
      bold: true,
      color: SECONDARY,
      fontFace: FONT_TITLE,
    });

    // Main Title
    slide.addText(title, {
      x: 0.8,
      y: 0.7,
      w: 11.5,
      h: 0.6,
      fontSize: 24,
      bold: true,
      color: TEXT_WHITE,
      fontFace: FONT_TITLE,
    });

    // Footer Watermark
    slide.addText('AptiQuiz • Realtime Collegiate Aptitude Arena', {
      x: 0.8,
      y: 7.0,
      w: 8.0,
      h: 0.3,
      fontSize: 9,
      color: '6A6488',
      fontFace: FONT_BODY,
    });

    slide.addText('Confidential & Proprietary', {
      x: 10.0,
      y: 7.0,
      w: 2.5,
      h: 0.3,
      fontSize: 9,
      align: 'right',
      color: '6A6488',
      fontFace: FONT_BODY,
    });

    return slide;
  }

  // ==========================================================================
  // SLIDE 1: Title Slide (Hero)
  // ==========================================================================
  {
    const slide = pres.addSlide();
    slide.background = { color: BG_COLOR };

    // Accent Pill
    slide.addShape(pres.ShapeType.roundRect, {
      x: 0.8,
      y: 1.5,
      w: 3.5,
      h: 0.4,
      fill: { color: '201944' },
      line: { color: PRIMARY, width: 1 },
      rectRadius: 0.2,
    });
    slide.addText('⚡ NEXT-GEN ESPORTS FOR ACADEMICS', {
      x: 0.9,
      y: 1.55,
      w: 3.3,
      h: 0.3,
      fontSize: 9,
      bold: true,
      color: SECONDARY,
      fontFace: FONT_TITLE,
    });

    // Big Title
    slide.addText('AptiQuiz', {
      x: 0.8,
      y: 2.1,
      w: 11.0,
      h: 1.2,
      fontSize: 54,
      bold: true,
      color: TEXT_WHITE,
      fontFace: FONT_TITLE,
    });

    // Subtitle
    slide.addText('Realtime High-Concurrency Collegiate Aptitude Arena', {
      x: 0.8,
      y: 3.3,
      w: 11.0,
      h: 0.6,
      fontSize: 22,
      color: SECONDARY,
      fontFace: FONT_TITLE,
    });

    // Tagline Paragraph
    slide.addText(
      'A synchronized multiplayer platform designed for auditoriums, hackathons, and collegiate aptitude championships. Featuring a 5-worker distributed WebSocket cluster, sub-50ms latency, 300 curated problems, and broadcast-ready 4K projector displays.',
      {
        x: 0.8,
        y: 4.1,
        w: 9.0,
        h: 1.2,
        fontSize: 13,
        color: TEXT_MUTED,
        fontFace: FONT_BODY,
        lineSpacing: 18,
      }
    );

    // 3 Feature Badges on bottom
    const badges = [
      { label: '5-Worker Cluster', sub: 'Load Balanced :8000-:8005' },
      { label: '300 Curated MCQs', sub: '10 Specialized Domains' },
      { label: 'Sub-50ms Latency', sub: 'In-Memory Aggregator Hub' },
    ];
    badges.forEach((b, idx) => {
      slide.addShape(pres.ShapeType.roundRect, {
        x: 0.8 + idx * 3.8,
        y: 5.6,
        w: 3.5,
        h: 1.0,
        fill: { color: CARD_BG },
        line: { color: '2E2654', width: 1 },
        rectRadius: 0.15,
      });
      slide.addText(b.label, {
        x: 1.0 + idx * 3.8,
        y: 5.75,
        w: 3.1,
        h: 0.35,
        fontSize: 14,
        bold: true,
        color: ACCENT_GREEN,
        fontFace: FONT_TITLE,
      });
      slide.addText(b.sub, {
        x: 1.0 + idx * 3.8,
        y: 6.15,
        w: 3.1,
        h: 0.3,
        fontSize: 10,
        color: TEXT_MUTED,
        fontFace: FONT_BODY,
      });
    });
  }

  // ==========================================================================
  // SLIDE 2: Executive Summary & The Problem Space
  // ==========================================================================
  {
    const slide = createBaseSlide('Executive Summary & The Problem Space', 'Problem & Solution');

    // Left Column: The Problem
    slide.addShape(pres.ShapeType.roundRect, {
      x: 0.8,
      y: 1.6,
      w: 5.6,
      h: 5.0,
      fill: { color: CARD_BG },
      line: { color: '93000A', width: 1 },
      rectRadius: 0.15,
    });
    slide.addText('🔴 THE CHALLENGE IN TRADITIONAL QUIZZES', {
      x: 1.1,
      y: 1.9,
      w: 5.0,
      h: 0.3,
      fontSize: 12,
      bold: true,
      color: 'FFB4AB',
      fontFace: FONT_TITLE,
    });
    slide.addText(
      '• Monolithic Bottlenecks: Standard quiz apps crash or experience 2-5 second lag spikes when hundreds of students submit simultaneously in university halls.\n\n' +
      '• Lack of Competitive Tension: Slow static web forms feel like boring exams rather than high-stakes collegiate tournaments.\n\n' +
      '• Fragmented Tooling: Hosts juggle disjointed projector slides, mobile forms, and manual spreadsheets to tally scores.\n\n' +
      '• Poor Data Persistence: Network hiccups lead to lost player scores and disrupted rounds.',
      {
        x: 1.1,
        y: 2.4,
        w: 5.0,
        h: 4.0,
        fontSize: 12,
        color: TEXT_MUTED,
        fontFace: FONT_BODY,
        lineSpacing: 18,
      }
    );

    // Right Column: The AptiQuiz Solution
    slide.addShape(pres.ShapeType.roundRect, {
      x: 6.8,
      y: 1.6,
      w: 5.6,
      h: 5.0,
      fill: { color: CARD_BG },
      line: { color: PRIMARY, width: 1 },
      rectRadius: 0.15,
    });
    slide.addText('🟢 THE APTIQUIZ PARADIGM SHIFT', {
      x: 7.1,
      y: 1.9,
      w: 5.0,
      h: 0.3,
      fontSize: 12,
      bold: true,
      color: ACCENT_GREEN,
      fontFace: FONT_TITLE,
    });
    slide.addText(
      '• Distributed Multi-Worker Cluster: 5 isolated WebSocket worker nodes absorb traffic with least-connections load balancing.\n\n' +
      '• Microsecond In-Memory Hub: Authoritative central aggregator merges standings and fans out delta updates across all screens.\n\n' +
      '• Esports-Style Gamification: Real-time speed bonus multipliers, tactile scratchpads, lifelines, and streak meters.\n\n' +
      '• Dedicated 4K Auditorium View: Clean, high-contrast projector UI tailored for stage displays alongside mobile contenders.',
      {
        x: 7.1,
        y: 2.4,
        w: 5.0,
        h: 4.0,
        fontSize: 12,
        color: TEXT_MUTED,
        fontFace: FONT_BODY,
        lineSpacing: 18,
      }
    );
  }

  // ==========================================================================
  // SLIDE 3: Scalability Architecture (Cluster Topology)
  // ==========================================================================
  {
    const slide = createBaseSlide('Scalability Architecture & Distributed WebSocket Cluster', 'Core Engineering');

    // Architecture 4-Tier Flow
    const tiers = [
      {
        tier: 'TIER 1: SMART REVERSE PROXY',
        title: 'Load Balancer Gateway (:8000)',
        desc: '• Zero-copy TCP streaming tunneling on HTTP Upgrade\n• Least-Connections & Consistent Room Hashing\n• Health checks & live telemetry at /cluster/stats',
        color: SECONDARY,
      },
      {
        tier: 'TIER 2: MULTI-PROCESS WORKERS',
        title: '5 Partitioned Sub-Workers (:8001 - :8005)',
        desc: '• Dedicated CPU core & memory isolation\n• Decoupled event loop & zero garbage collection pauses\n• Heartbeat ping/pong (25s) & client timestamping',
        color: ACCENT_GREEN,
      },
      {
        tier: 'TIER 3: CENTRAL AGGREGATOR',
        title: 'Master Hub State Coordinator',
        desc: '• In-memory cross-server player & score merging\n• Authoritative rank calculations & tie-breaking\n• Parallel broadcast fan-out back across all workers',
        color: PRIMARY,
      },
      {
        tier: 'TIER 4: HYBRID DATA PERSISTENCE',
        title: 'Supabase PostgreSQL & Curated Bank',
        desc: '• Asynchronous non-blocking database commits\n• Indexed by room_code, category, and score DESC\n• 300-question offline fallback for 100% resilience',
        color: ACCENT_AMBER,
      },
    ];

    tiers.forEach((t, i) => {
      const colX = 0.8 + i * 2.95;
      slide.addShape(pres.ShapeType.roundRect, {
        x: colX,
        y: 1.6,
        w: 2.75,
        h: 5.0,
        fill: { color: CARD_BG },
        line: { color: '2E2654', width: 1 },
        rectRadius: 0.15,
      });

      slide.addText(t.tier, {
        x: colX + 0.15,
        y: 1.8,
        w: 2.45,
        h: 0.35,
        fontSize: 9,
        bold: true,
        color: t.color,
        fontFace: FONT_TITLE,
      });

      slide.addText(t.title, {
        x: colX + 0.15,
        y: 2.2,
        w: 2.45,
        h: 0.7,
        fontSize: 13,
        bold: true,
        color: TEXT_WHITE,
        fontFace: FONT_TITLE,
      });

      slide.addText(t.desc, {
        x: colX + 0.15,
        y: 3.0,
        w: 2.45,
        h: 3.4,
        fontSize: 10,
        color: TEXT_MUTED,
        fontFace: FONT_BODY,
        lineSpacing: 15,
      });
    });
  }

  // ==========================================================================
  // SLIDE 4: Curated 300-Question Collegiate Curriculum
  // ==========================================================================
  {
    const slide = createBaseSlide('Comprehensive 300-Question Question Bank', 'Curriculum & Content');

    slide.addText(
      'AptiQuiz includes 300 battle-tested collegiate aptitude problems parsed from aptiquiz_question_sets/ into 10 structured domains of 30 MCQs each. Every question features verified solutions, formulas, and pace recommendations.',
      {
        x: 0.8,
        y: 1.5,
        w: 11.6,
        h: 0.6,
        fontSize: 12,
        color: TEXT_MUTED,
        fontFace: FONT_BODY,
      }
    );

    // Grid of 10 Sets
    const sets = [
      { id: '01', title: 'Quantitative Aptitude', cat: 'Quant', pace: '35s', diff: 'Easy/Med' },
      { id: '02', title: 'Logical Reasoning', cat: 'Logic', pace: '45s', diff: 'Medium' },
      { id: '03', title: 'Verbal Ability', cat: 'Verbal', pace: '30s', diff: 'Easy/Med' },
      { id: '04', title: 'Data Interpretation', cat: 'DI', pace: '55s', diff: 'Hard' },
      { id: '05', title: 'Time, Work & Speed', cat: 'Quant', pace: '40s', diff: 'Medium' },
      { id: '06', title: 'Probability & Counting', cat: 'Quant', pace: '45s', diff: 'Hard' },
      { id: '07', title: 'Algebra & Geometry', cat: 'Quant', pace: '45s', diff: 'Medium' },
      { id: '08', title: 'Number Systems & Series', cat: 'Quant', pace: '35s', diff: 'Easy/Med' },
      { id: '09', title: 'Mixed Placement Aptitude', cat: 'Quant', pace: '45s', diff: 'Med/Hard' },
      { id: '10', title: 'Advanced Mixed Gauntlet', cat: 'Logic', pace: '50s', diff: 'Olympiad' },
    ];

    sets.forEach((s, idx) => {
      const row = Math.floor(idx / 5);
      const col = idx % 5;
      const x = 0.8 + col * 2.36;
      const y = 2.4 + row * 2.2;

      slide.addShape(pres.ShapeType.roundRect, {
        x,
        y,
        w: 2.2,
        h: 1.95,
        fill: { color: CARD_BG },
        line: { color: '2E2654', width: 1 },
        rectRadius: 0.12,
      });

      slide.addText(`SET #${s.id} • ${s.cat}`, {
        x: x + 0.15,
        y: y + 0.15,
        w: 1.9,
        h: 0.25,
        fontSize: 9,
        bold: true,
        color: PRIMARY,
        fontFace: FONT_TITLE,
      });

      slide.addText(s.title, {
        x: x + 0.15,
        y: y + 0.45,
        w: 1.9,
        h: 0.6,
        fontSize: 11,
        bold: true,
        color: TEXT_WHITE,
        fontFace: FONT_TITLE,
      });

      slide.addText(`30 MCQs • ${s.pace} Pace • ${s.diff}`, {
        x: x + 0.15,
        y: y + 1.25,
        w: 1.9,
        h: 0.45,
        fontSize: 9,
        color: ACCENT_GREEN,
        fontFace: FONT_BODY,
      });
    });
  }

  // ==========================================================================
  // SLIDE 5: 10 Ready-to-Start Battle Arenas
  // ==========================================================================
  {
    const slide = createBaseSlide('10 Ready-to-Start Dedicated Quiz Arenas', 'Tournament Rooms');

    slide.addText(
      'Pre-configured tournament rooms mapped directly to each curriculum set, available both offline and via Supabase database seeder:',
      {
        x: 0.8,
        y: 1.5,
        w: 11.6,
        h: 0.4,
        fontSize: 12,
        color: TEXT_MUTED,
        fontFace: FONT_BODY,
      }
    );

    const arenas = [
      { code: 'QUANT101', name: 'Collegiate Speed Qualifier', host: 'Prof. S. Ranganathan', q: 30, max: 100 },
      { code: 'LOGIC202', name: 'Deductive Logic Arena', host: 'Dr. Anita Joshi', q: 30, max: 80 },
      { code: 'VERBAL303', name: 'Verbal & Critical Reading', host: 'Prof. Vikram Roy', q: 30, max: 60 },
      { code: 'DATA404', name: 'Data Interpretation Champs', host: 'Dr. M. Swaminathan', q: 30, max: 100 },
      { code: 'SPEED505', name: 'Time, Work & Motion Sprint', host: 'Prof. C. Verma', q: 30, max: 120 },
      { code: 'PROB606', name: 'Probability & Combinatorics', host: 'Prof. R. Sundaram', q: 30, max: 80 },
      { code: 'ALGEBRA707', name: 'High-Yield Algebra Battle', host: 'Dr. Neha Agarwal', q: 30, max: 90 },
      { code: 'SERIES808', name: 'Number Systems Blitz', host: 'Auditorium Host Desk', q: 30, max: 100 },
      { code: 'CAMPUS909', name: 'Campus Placement Grand Prix', host: 'Placement Cell', q: 30, max: 250 },
      { code: 'ADVMIX010', name: 'Elite Mixed Gauntlet', host: 'Dr. K. Narayanan', q: 30, max: 150 },
    ];

    arenas.forEach((a, i) => {
      const row = Math.floor(i / 2);
      const col = i % 2;
      const x = 0.8 + col * 5.9;
      const y = 2.1 + row * 0.95;

      slide.addShape(pres.ShapeType.roundRect, {
        x,
        y,
        w: 5.6,
        h: 0.82,
        fill: { color: CARD_BG },
        line: { color: '251F45', width: 1 },
        rectRadius: 0.1,
      });

      slide.addText(a.code, {
        x: x + 0.2,
        y: y + 0.15,
        w: 1.4,
        h: 0.5,
        fontSize: 14,
        bold: true,
        color: SECONDARY,
        fontFace: FONT_TITLE,
      });

      slide.addText(a.name, {
        x: x + 1.6,
        y: y + 0.12,
        w: 2.6,
        h: 0.35,
        fontSize: 11,
        bold: true,
        color: TEXT_WHITE,
        fontFace: FONT_TITLE,
      });

      slide.addText(`${a.host} • ${a.q} Qs • Cap: ${a.max}`, {
        x: x + 1.6,
        y: y + 0.45,
        w: 2.6,
        h: 0.25,
        fontSize: 9,
        color: TEXT_MUTED,
        fontFace: FONT_BODY,
      });

      slide.addText('READY TO START', {
        x: x + 4.2,
        y: y + 0.25,
        w: 1.25,
        h: 0.3,
        fontSize: 8,
        bold: true,
        align: 'center',
        color: ACCENT_GREEN,
        fontFace: FONT_TITLE,
      });
    });
  }

  // ==========================================================================
  // SLIDE 6: The Player Interactive Quiz Arena
  // ==========================================================================
  {
    const slide = createBaseSlide('The Player Interactive Quiz Arena', 'Gameplay Experience');

    const features = [
      {
        title: 'Speed Bonus Multiplier',
        desc: 'Responses submitted in the initial 5 seconds earn a 1.5x multiplier. Rewards high-speed mastery while penalizing guesswork.',
        stat: '1.5x XP MULTIPLIER',
      },
      {
        title: 'Dynamic Urgency Progress Bar',
        desc: 'Color shifts dynamically: 🟢 Speed Zone (1.5x), 🟡 Standard Pace (1.0x), and 🔴 Critical Lockdown with urgent audio ticks.',
        stat: 'COLOR-CODED PACING',
      },
      {
        title: 'Proctored Scratchpad Calculator',
        desc: 'Built-in arithmetic solver with clean expression evaluator, tactile keypad, and scratchpad memory for quantitative problem-solving.',
        stat: 'BUILT-IN CALCULATOR',
      },
      {
        title: 'Strategic Tournament Lifelines',
        desc: 'Includes 50:50 (eliminates 2 incorrect distractors) and Audience Poll (simulates crowd distribution based on difficulty curves).',
        stat: '50:50 & AUDIENCE POLL',
      },
    ];

    features.forEach((f, idx) => {
      const colX = 0.8 + idx * 2.95;
      slide.addShape(pres.ShapeType.roundRect, {
        x: colX,
        y: 1.8,
        w: 2.75,
        h: 4.8,
        fill: { color: CARD_BG },
        line: { color: '2E2654', width: 1 },
        rectRadius: 0.15,
      });

      slide.addText(f.stat, {
        x: colX + 0.15,
        y: 2.0,
        w: 2.45,
        h: 0.3,
        fontSize: 9,
        bold: true,
        color: SECONDARY,
        fontFace: FONT_TITLE,
      });

      slide.addText(f.title, {
        x: colX + 0.15,
        y: 2.4,
        w: 2.45,
        h: 0.7,
        fontSize: 14,
        bold: true,
        color: TEXT_WHITE,
        fontFace: FONT_TITLE,
      });

      slide.addText(f.desc, {
        x: colX + 0.15,
        y: 3.3,
        w: 2.45,
        h: 3.0,
        fontSize: 11,
        color: TEXT_MUTED,
        fontFace: FONT_BODY,
        lineSpacing: 16,
      });
    });
  }

  // ==========================================================================
  // SLIDE 7: Auditorium 4K Projector & Stage Display
  // ==========================================================================
  {
    const slide = createBaseSlide('Auditorium 4K Projector & Stage Controller', 'Broadcast View');

    // Left Card: 4K Stage Projector View
    slide.addShape(pres.ShapeType.roundRect, {
      x: 0.8,
      y: 1.6,
      w: 5.6,
      h: 5.0,
      fill: { color: CARD_BG },
      line: { color: PRIMARY, width: 1 },
      rectRadius: 0.15,
    });
    slide.addText('📺 4K AUDITORIUM STAGE PROJECTOR', {
      x: 1.1,
      y: 1.9,
      w: 5.0,
      h: 0.3,
      fontSize: 12,
      bold: true,
      color: SECONDARY,
      fontFace: FONT_TITLE,
    });
    slide.addText(
      '• Big Screen Optimization: Ultra-high contrast layout formatted for university auditorium LED walls and HDMI projectors.\n\n' +
      '• Massive Countdown Dial: High-visibility timer widget visible from 50+ meters back in the auditorium.\n\n' +
      '• Live Answer Reveal: Shows response distribution histograms as contenders submit choices in real time.\n\n' +
      '• Instant Official Verdict: Automatically reveals correct key, formula steps, and verified explanation at round end.',
      {
        x: 1.1,
        y: 2.4,
        w: 5.0,
        h: 4.0,
        fontSize: 12,
        color: TEXT_MUTED,
        fontFace: FONT_BODY,
        lineSpacing: 18,
      }
    );

    // Right Card: Host Stage Console
    slide.addShape(pres.ShapeType.roundRect, {
      x: 6.8,
      y: 1.6,
      w: 5.6,
      h: 5.0,
      fill: { color: CARD_BG },
      line: { color: '2E2654', width: 1 },
      rectRadius: 0.15,
    });
    slide.addText('🎛️ HOST STAGE CONTROLLER', {
      x: 7.1,
      y: 1.9,
      w: 5.0,
      h: 0.3,
      fontSize: 12,
      bold: true,
      color: ACCENT_AMBER,
      fontFace: FONT_TITLE,
    });
    slide.addText(
      '• Global Timer Freeze: Instantly pause the clock cluster-wide during clarifications, technical checks, or announcements.\n\n' +
      '• Live Ticker Broadcasting: Send high-priority broadcast banner messages that flash across all connected student devices.\n\n' +
      '• Question Vault Browser: Hosts can search, filter by domain, preview explanations, and inject custom problems on the fly.\n\n' +
      '• Roster Management: Lock room against latecomers, shuffle seats, or moderate participants.',
      {
        x: 7.1,
        y: 2.4,
        w: 5.0,
        h: 4.0,
        fontSize: 12,
        color: TEXT_MUTED,
        fontFace: FONT_BODY,
        lineSpacing: 18,
      }
    );
  }

  // ==========================================================================
  // SLIDE 8: Live Unified Leaderboard & Telemetry
  // ==========================================================================
  {
    const slide = createBaseSlide('Live Unified Leaderboard & Performance Telemetry', 'Analytics & Scoring');

    const metrics = [
      {
        title: 'Cluster-Merged Rankings',
        desc: 'Aggregates students across all 5 sub-servers into a single unified global standings board with deterministic tie-breaking.',
      },
      {
        title: 'Recharts Trajectory Graphs',
        desc: 'Interactive performance trendline tracking player score, speed in seconds, cumulative XP, and rank delta across rounds.',
      },
      {
        title: 'Streak Prodigy Multipliers',
        desc: 'Unbroken streaks of 5+ correct verdicts trigger burning flame aura badges and collegiate prestige multipliers.',
      },
      {
        title: 'Tiered Milestones System',
        desc: '6 progression badges (Aptitude Ace, Speedster, Campus Vanguard, Precision Hawk) in Gold, Silver, and Diamond tiers.',
      },
    ];

    metrics.forEach((m, i) => {
      const colX = 0.8 + i * 2.95;
      slide.addShape(pres.ShapeType.roundRect, {
        x: colX,
        y: 1.8,
        w: 2.75,
        h: 4.8,
        fill: { color: CARD_BG },
        line: { color: '2E2654', width: 1 },
        rectRadius: 0.15,
      });

      slide.addText(`FEATURE 0${i + 1}`, {
        x: colX + 0.15,
        y: 2.0,
        w: 2.45,
        h: 0.3,
        fontSize: 9,
        bold: true,
        color: SECONDARY,
        fontFace: FONT_TITLE,
      });

      slide.addText(m.title, {
        x: colX + 0.15,
        y: 2.4,
        w: 2.45,
        h: 0.7,
        fontSize: 14,
        bold: true,
        color: TEXT_WHITE,
        fontFace: FONT_TITLE,
      });

      slide.addText(m.desc, {
        x: colX + 0.15,
        y: 3.3,
        w: 2.45,
        h: 3.0,
        fontSize: 11,
        color: TEXT_MUTED,
        fontFace: FONT_BODY,
        lineSpacing: 16,
      });
    });
  }

  // ==========================================================================
  // SLIDE 9: Dynamic Invite QR & Full App Router Navigation
  // ==========================================================================
  {
    const slide = createBaseSlide('Dynamic Invite QR System & Next.js App Router', 'Integration & Access');

    // Left Column: QR System
    slide.addShape(pres.ShapeType.roundRect, {
      x: 0.8,
      y: 1.6,
      w: 5.6,
      h: 5.0,
      fill: { color: CARD_BG },
      line: { color: PRIMARY, width: 1 },
      rectRadius: 0.15,
    });
    slide.addText('📱 REALTIME INVITE QR & SOCIAL CHANNELS', {
      x: 1.1,
      y: 1.9,
      w: 5.0,
      h: 0.3,
      fontSize: 12,
      bold: true,
      color: SECONDARY,
      fontFace: FONT_TITLE,
    });
    slide.addText(
      '• Instant Camera Recognition: High-contrast QR matrix scans seamlessly on iOS Camera and Android Google Lens.\n\n' +
      '• Direct Deep Links: Encodes full room routes (/lobby?room=QUANT101) directly into the QR code.\n\n' +
      '• 4 Social Messaging Channels: 1-click sharing to WhatsApp, Telegram, X (Twitter), and Email with pre-filled room PIN.\n\n' +
      '• Organizer Export: 1-click high-resolution PNG download for presentation slides and physical campus posters.',
      {
        x: 1.1,
        y: 2.4,
        w: 5.0,
        h: 4.0,
        fontSize: 12,
        color: TEXT_MUTED,
        fontFace: FONT_BODY,
        lineSpacing: 18,
      }
    );

    // Right Column: App Router
    slide.addShape(pres.ShapeType.roundRect, {
      x: 6.8,
      y: 1.6,
      w: 5.6,
      h: 5.0,
      fill: { color: CARD_BG },
      line: { color: '2E2654', width: 1 },
      rectRadius: 0.15,
    });
    slide.addText('🗺️ MODULAR APP ROUTER MAP', {
      x: 7.1,
      y: 1.9,
      w: 5.0,
      h: 0.3,
      fontSize: 12,
      bold: true,
      color: ACCENT_GREEN,
      fontFace: FONT_TITLE,
    });
    slide.addText(
      '• / (Home): Global room browser, PIN joiner, and admin portal.\n\n' +
      '• /lobby?room={code}: Synchronized waiting room with roster list.\n\n' +
      '• /arena?room={code}: Interactive player battle arena with timers.\n\n' +
      '• /leaderboard?room={code}: Verdict recap & Recharts telemetry.\n\n' +
      '• /projector?room={code}: 4K stage display for auditorium screens.\n\n' +
      '• /host?room={code}: Host console for timer freeze & round controls.\n\n' +
      '• /quiz/[id] & /room/[code]: Deep links with popstate history sync.',
      {
        x: 7.1,
        y: 2.3,
        w: 5.0,
        h: 4.2,
        fontSize: 11,
        color: TEXT_MUTED,
        fontFace: FONT_BODY,
        lineSpacing: 16,
      }
    );
  }

  // ==========================================================================
  // SLIDE 10: Conclusion & Engineering Summary
  // ==========================================================================
  {
    const slide = createBaseSlide('Summary & Key Architectural Achievements', 'Conclusion');

    const achievements = [
      {
        title: 'Zero-Lag Synchronization',
        value: '< 50ms',
        desc: 'Round-trip answer latency across 5 partitioned WebSocket worker processes.',
      },
      {
        title: 'Battle-Tested Content',
        value: '300 MCQs',
        desc: 'Curated across 10 specialized collegiate aptitude categories with solutions.',
      },
      {
        title: 'Stress-Tested Concurrency',
        value: '50+ Bots',
        desc: 'Automated test harness validating seamless leaderboard state merging.',
      },
    ];

    achievements.forEach((a, idx) => {
      const colX = 0.8 + idx * 3.9;
      slide.addShape(pres.ShapeType.roundRect, {
        x: colX,
        y: 1.8,
        w: 3.6,
        h: 3.2,
        fill: { color: CARD_BG },
        line: { color: PRIMARY, width: 1 },
        rectRadius: 0.15,
      });

      slide.addText(a.value, {
        x: colX + 0.2,
        y: 2.1,
        w: 3.2,
        h: 0.8,
        fontSize: 36,
        bold: true,
        color: ACCENT_GREEN,
        fontFace: FONT_TITLE,
      });

      slide.addText(a.title, {
        x: colX + 0.2,
        y: 2.9,
        w: 3.2,
        h: 0.4,
        fontSize: 16,
        bold: true,
        color: TEXT_WHITE,
        fontFace: FONT_TITLE,
      });

      slide.addText(a.desc, {
        x: colX + 0.2,
        y: 3.4,
        w: 3.2,
        h: 1.2,
        fontSize: 12,
        color: TEXT_MUTED,
        fontFace: FONT_BODY,
        lineSpacing: 16,
      });
    });

    // Bottom Summary Banner
    slide.addShape(pres.ShapeType.roundRect, {
      x: 0.8,
      y: 5.3,
      w: 11.4,
      h: 1.4,
      fill: { color: '201944' },
      line: { color: '2E2654', width: 1 },
      rectRadius: 0.15,
    });

    slide.addText('🎯 APTIQUIZ IS PRODUCTION-READY FOR COLLEGIATE ARENAS', {
      x: 1.1,
      y: 5.5,
      w: 10.8,
      h: 0.35,
      fontSize: 13,
      bold: true,
      color: SECONDARY,
      fontFace: FONT_TITLE,
    });

    slide.addText(
      'Combining esports-level thrills with rigorous collegiate evaluation. Backed by a 5-worker WebSocket cluster, Supabase persistence, instant QR joins, and dedicated 4K projector views, AptiQuiz transforms competitive exams into unforgettable auditorium championships.',
      {
        x: 1.1,
        y: 5.9,
        w: 10.8,
        h: 0.65,
        fontSize: 11,
        color: TEXT_MUTED,
        fontFace: FONT_BODY,
        lineSpacing: 16,
      }
    );
  }

  // Save PPTX
  const pptxPath = path.resolve(process.cwd(), 'aptiquiz_presentation.pptx');
  await pres.writeFile({ fileName: pptxPath });
  console.log(`✅ Saved PowerPoint Presentation to: ${pptxPath}`);
}

generatePowerPoint();
