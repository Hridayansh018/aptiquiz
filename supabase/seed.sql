-- ============================================================================
-- APTIQUIZ SUPABASE SEED SQL SCRIPT
-- ============================================================================
-- Run this in your Supabase SQL Editor:
-- Dashboard -> SQL Editor -> New Query -> Paste & Run.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. ACHIEVEMENTS SEED
-- ----------------------------------------------------------------------------
INSERT INTO public.achievements (id, name, category, description, icon_name, milestone_points, tier, badge_label)
VALUES
  ('aptitude-ace', 'Aptitude Ace', 'points', 'Surpass 3,000 milestone XP in collegiate aptitude challenges', 'Award', 3000, 'gold', '3,000 XP Milestone'),
  ('speedster', 'Speedster', 'speed', 'Lock in a correct verdict in under 5.0 seconds with >95% precision', 'Zap', 800, 'silver', '⚡ 4.2s Clocked'),
  ('streak-prodigy', 'Streak Prodigy', 'streak', 'Maintain an unbroken streak of 5 or more consecutive correct responses', 'Flame', 1500, 'gold', '🔥 6 In A Row'),
  ('grand-contender', 'Grand Contender', 'points', 'Achieve 5,000+ total cumulative XP to attain Tier-1 Master standing', 'Trophy', 5000, 'diamond', '5,000 XP Milestone'),
  ('campus-vanguard', 'Campus Vanguard', 'accuracy', 'Climb into the top 5 of the auditorium leaderboard standings', 'Star', 2000, 'gold', '🎖️ Top 5 Ranked'),
  ('precision-hawk', 'Precision Hawk', 'accuracy', 'Finish a quantitative section with greater than 90% accuracy rate', 'Target', 2500, 'silver', '90% Precision')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  milestone_points = EXCLUDED.milestone_points,
  badge_label = EXCLUDED.badge_label;

-- ----------------------------------------------------------------------------
-- 2. ROOMS SEED
-- ----------------------------------------------------------------------------
INSERT INTO public.rooms (room_code, title, category, host_name, status, current_round, total_rounds, is_locked, timer_frozen, broadcast_message, max_players, tags)
VALUES
  ('LIVE01', 'Collegiate National Speed Qualifier', 'Quant', 'Prof. S. Ranganathan', 'live', 1, 15, false, false, 'Welcome contenders! Standard pace is 45s per round.', 100, ARRAY['National', 'Quant Speed', 'Tier-1']),
  ('ARENA2026', 'Auditorium Grand Championship 2026', 'Quant', 'Auditorium Host Desk', 'lobby', 1, 20, false, false, 'Distributed 5-Worker Cluster Enabled. Sync in lobby.', 250, ARRAY['Championship', 'High Stakes', 'Multi-College']),
  ('GATE2026', 'GATE General Aptitude Fast-Track', 'Logic', 'Dr. Anita Joshi', 'starting-soon', 1, 10, false, false, '', 80, ARRAY['GATE', 'Engineering', 'Deductive Logic']),
  ('CAT2026', 'IIM Verbal & Critical Reasoning Battle', 'Verbal', 'Prof. Vikram Roy', 'lobby', 1, 12, false, false, '', 60, ARRAY['CAT', 'MBA Aptitude', 'Analogies']),
  ('QUANT101', 'Collegiate Quantitative Speed Qualifier', 'Quant', 'Prof. S. Ranganathan', 'lobby', 1, 30, false, false, 'Ready to start! Standard pace is 35-45s per round.', 100, ARRAY['National', 'Quant Speed', 'Tier-1']),
  ('LOGIC202', 'Deductive & Logical Reasoning Arena', 'Logic', 'Dr. Anita Joshi', 'lobby', 1, 30, false, false, 'Logic arena ready. Speed bonus enabled.', 80, ARRAY['GATE', 'Logic Puzzles', 'Syllogisms']),
  ('VERBAL303', 'Verbal Ability & Critical Reading Sprint', 'Verbal', 'Prof. Vikram Roy', 'lobby', 1, 30, false, false, '', 60, ARRAY['CAT/GMAT', 'Vocabulary', 'Analogies']),
  ('DATA404', 'Data Interpretation & Chart Championship', 'Data Interpretation', 'Dr. Meera Swaminathan', 'lobby', 1, 30, false, false, '', 100, ARRAY['DI & Analytics', 'Bar Charts', 'Pie Charts']),
  ('SPEED505', 'Time, Work & Motion Speed Sprint', 'Quant', 'Prof. C. Verma', 'lobby', 1, 30, false, false, '', 120, ARRAY['Time & Work', 'Distance & Pipes', 'High Speed']),
  ('PROB606', 'Combinatorics & Probability Masters', 'Quant', 'Prof. R. Sundaram', 'lobby', 1, 30, false, false, '', 80, ARRAY['Probability', 'Permutations', 'Combinations']),
  ('ALGEBRA707', 'High-Yield Algebra & Geometry Battle', 'Quant', 'Dr. Neha Agarwal', 'lobby', 1, 30, false, false, '', 90, ARRAY['Algebra', 'Geometry', 'Quadratics']),
  ('SERIES808', 'Number Systems & Sequences Blitz', 'Quant', 'Auditorium Host Desk', 'lobby', 1, 30, false, false, '', 100, ARRAY['Number Theory', 'Series & Progressions', 'Fast-Track']),
  ('CAMPUS909', 'Tier-1 Campus Placement Grand Prix', 'Quant', 'Placement Coordination Cell', 'lobby', 1, 30, false, false, 'Grand Prix ready to start.', 250, ARRAY['Placement 2026', 'TCS/Infosys/Accenture', 'Campus Grand Prix']),
  ('ADVMIX010', 'Elite Advanced Mixed Aptitude Gauntlet', 'Logic', 'Dr. K. Narayanan', 'lobby', 1, 30, false, false, '', 150, ARRAY['Olympiad', 'Hard Mixed', 'Championship'])
ON CONFLICT (room_code) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  host_name = EXCLUDED.host_name,
  status = EXCLUDED.status,
  total_rounds = EXCLUDED.total_rounds,
  max_players = EXCLUDED.max_players;

-- ----------------------------------------------------------------------------
-- 3. QUESTIONS SEED (Starter Set)
-- NOTE: To seed all 300 questions from aptiquiz_question_sets/, run either:
-- 1) `supabase/seed_questions.sql` in Supabase SQL editor, or
-- 2) `npm run db:seed` in your terminal.
-- ----------------------------------------------------------------------------
INSERT INTO public.questions (room_code, category, section, topic, question, options, correct_key, official_answer_text, standard_pace_sec, max_points, scratchpad_formula, explanation)
VALUES
(
  'LIVE01',
  'Quant',
  'Aptitude • Section B',
  'Speed, Distance & Time',
  'A train 240 m long crosses a platform of equal length in 27 seconds. What is the speed of the train in km/h?',
  '[
    {"key": "A", "text": "48 km/h", "percentage": 12, "count": 6},
    {"key": "B", "text": "64 km/h", "percentage": 68, "count": 34, "isCorrect": true},
    {"key": "C", "text": "72 km/h", "percentage": 14, "count": 7},
    {"key": "D", "text": "54 km/h", "percentage": 6, "count": 3}
  ]'::jsonb,
  'B',
  'Option B: 64 km/h',
  45,
  1000,
  '(240 + 240) / 27 * 18/5',
  'Total distance = 240 + 240 = 480 m. Time = 27 s. Speed = 480 / 27 = 160 / 9 m/s. Convert to km/h: (160 / 9) * (18 / 5) = 64 km/h.'
),
(
  'LIVE01',
  'Quant',
  'Quantitative Aptitude • Section 2',
  'Time & Work',
  'A can complete a project in 16 days while B can complete it in 12 days. With the assistance of C, they finish the work together in 4 days. How many days would C take to do the work alone?',
  '[
    {"key": "A", "text": "8.4 days", "percentage": 8, "count": 4},
    {"key": "B", "text": "10.2 days", "percentage": 18, "count": 9},
    {"key": "C", "text": "9.6 days", "percentage": 62, "count": 31, "isCorrect": true},
    {"key": "D", "text": "11.0 days", "percentage": 12, "count": 6}
  ]'::jsonb,
  'C',
  'Option C: 9.6 days (48/5 days)',
  50,
  1000,
  '1 / (1/4 - 1/16 - 1/12)',
  '1/C = 1/4 - (1/16 + 1/12) = 12/48 - (3/48 + 4/48) = 12/48 - 7/48 = 5/48. Therefore, C alone takes 48/5 = 9.6 days.'
),
(
  'LIVE01',
  'Quant',
  'Quantitative Aptitude • Section 3',
  'Permutations & Combinations',
  'In how many distinct ways can the letters of the word "ENGINEERING" be arranged such that all the vowels always remain together?',
  '[
    {"key": "A", "text": "21,600", "percentage": 15, "count": 7},
    {"key": "B", "text": "18,400", "percentage": 10, "count": 5},
    {"key": "C", "text": "37,800", "percentage": 60, "count": 28, "isCorrect": true},
    {"key": "D", "text": "42,000", "percentage": 15, "count": 7}
  ]'::jsonb,
  'C',
  'Option C: 37,800 arrangements',
  60,
  1200,
  '(7! / (3! * 2! * 1!)) * (5! / (3! * 2!))',
  'Vowels: E, E, E, I, I (5 vowels: 3 E, 2 I). Consonants: N, G, N, R, N, G (6 consonants: 3 N, 2 G, 1 R). Treating vowels as 1 block gives 7 units: 7! / (3! * 2!) = 420. Internal vowel arrangements: 5! / (3! * 2!) = 10. Total permutations: 420 * 90 = 37,800.'
),
(
  'LIVE01',
  'Logic',
  'Logical Reasoning • Section C',
  'Seating Arrangements & Deductions',
  'Five professors P, Q, R, S, T sit in a row facing north. S is to the immediate right of P. Q is between R and T. T is not at an end. If R is at the extreme left, who is seated in the exact middle?',
  '[
    {"key": "A", "text": "Professor Q", "percentage": 14, "count": 7},
    {"key": "B", "text": "Professor T", "percentage": 70, "count": 35, "isCorrect": true},
    {"key": "C", "text": "Professor P", "percentage": 10, "count": 5},
    {"key": "D", "text": "Professor S", "percentage": 6, "count": 3}
  ]'::jsonb,
  'B',
  'Option B: Professor T',
  45,
  1000,
  'Positions: 1:R, 2:Q, 3:T, 4:P, 5:S',
  'R is at extreme left. Q is between R and T. S is to the immediate right of P. The row arrangement is: R, Q, T, P, S. The exact middle (position 3) is Professor T.'
),
(
  'ARENA2026',
  'Logic',
  'Deductive Logic • Section 1',
  'Syllogisms & Categorical Logic',
  'Statements: All engineers are mathematicians. Some mathematicians are philosophers. No philosopher is an artist. Conclusions: I. Some mathematicians are not artists. II. Some engineers are philosophers.',
  '[
    {"key": "A", "text": "Only Conclusion I follows", "percentage": 65, "count": 32, "isCorrect": true},
    {"key": "B", "text": "Only Conclusion II follows", "percentage": 15, "count": 7},
    {"key": "C", "text": "Both I and II follow", "percentage": 12, "count": 6},
    {"key": "D", "text": "Neither I nor II follows", "percentage": 8, "count": 4}
  ]'::jsonb,
  'A',
  'Option A: Only Conclusion I follows',
  40,
  1000,
  'Mathematicians who are philosophers cannot be artists',
  'Since some mathematicians are philosophers and no philosopher is an artist, those specific mathematicians who are philosophers definitely cannot be artists. Therefore Conclusion I holds validly.'
),
(
  'ARENA2026',
  'Verbal',
  'Verbal Ability • Section A',
  'Critical Reasoning & Analogies',
  'Choose the word pair that exhibits the same relationship as: EPHEMERAL : PERMANENT :: TACITURN : ?',
  '[
    {"key": "A", "text": "GARRULOUS", "percentage": 76, "count": 38, "isCorrect": true},
    {"key": "B", "text": "RETICENT", "percentage": 12, "count": 6},
    {"key": "C", "text": "LACONIC", "percentage": 8, "count": 4},
    {"key": "D", "text": "LOQUACITY", "percentage": 4, "count": 2}
  ]'::jsonb,
  'A',
  'Option A: GARRULOUS',
  30,
  1000,
  'Antonym pair: Ephemeral <=> Permanent; Taciturn <=> Garrulous',
  'Ephemeral is the exact antonym of Permanent. Similarly, Taciturn (silent, reserved) is the antonym of Garrulous (excessively talkative).'
),
(
  'ARENA2026',
  'Verbal',
  'Reading & Verbal Diagnostics',
  'Sentence Correction & Grammar',
  'Identify the grammatically sound version: "Neither the team captains nor the coach _____ willing to forfeit the match despite the adverse weather."',
  '[
    {"key": "A", "text": "were", "percentage": 22, "count": 11},
    {"key": "B", "text": "was", "percentage": 68, "count": 34, "isCorrect": true},
    {"key": "C", "text": "have been", "percentage": 6, "count": 3},
    {"key": "D", "text": "are", "percentage": 4, "count": 2}
  ]'::jsonb,
  'B',
  'Option B: was',
  35,
  1000,
  'Subject proximity rule with Neither...Nor',
  'In a "Neither...nor" construction, the verb agrees in number with the closer subject ("the coach", which is singular). Hence, "was" is correct.'
),
(
  'GATE2026',
  'Quant',
  'Aptitude & Probability',
  'Probability & Distributions',
  'Two dice are rolled simultaneously. What is the probability that the sum of the numbers is a prime number greater than 5?',
  '[
    {"key": "A", "text": "1/6", "percentage": 10, "count": 5},
    {"key": "B", "text": "7/36", "percentage": 18, "count": 9},
    {"key": "C", "text": "2/9", "percentage": 62, "count": 31, "isCorrect": true},
    {"key": "D", "text": "5/18", "percentage": 10, "count": 5}
  ]'::jsonb,
  'C',
  'Option C: 2/9 (8 / 36)',
  45,
  1000,
  'Primes > 5: {7, 11}. Sum=7 (6 ways), Sum=11 (2 ways) -> 8/36 = 2/9',
  'The possible sums greater than 5 that are prime are 7 and 11. Sum of 7 has 6 outcomes: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1). Sum of 11 has 2 outcomes: (5,6),(6,5). Total = 8 outcomes. Probability = 8/36 = 2/9.'
),
(
  'CAT2026',
  'Data Interpretation',
  'Data Analysis • Charts',
  'Percentage Growth & Ratios',
  'Company Alpha registered revenues of $120M in 2023, expanding by 25% in 2024, while operational expenses climbed by 15% from $80M to $92M. By what percentage did operating profit increase?',
  '[
    {"key": "A", "text": "35%", "percentage": 15, "count": 6},
    {"key": "B", "text": "45%", "percentage": 65, "count": 26, "isCorrect": true},
    {"key": "C", "text": "50%", "percentage": 12, "count": 5},
    {"key": "D", "text": "40%", "percentage": 8, "count": 3}
  ]'::jsonb,
  'B',
  'Option B: 45% ($40M -> $58M)',
  55,
  1100,
  '2023: 120 - 80 = 40. 2024: 150 - 92 = 58. (58 - 40) / 40 = 45%',
  '2023 Profit = $120M - $80M = $40M. 2024 Revenue = $120M * 1.25 = $150M. 2024 Expenses = $92M. 2024 Profit = $150M - $92M = $58M. Increase = (58 - 40) / 40 = 18 / 40 = 45%.'
);

-- ----------------------------------------------------------------------------
-- 4. ROOM PLAYERS SEED
-- ----------------------------------------------------------------------------
INSERT INTO public.room_players (id, room_code, name, college, initials, score, rank, streak_count, accuracy_rate, status)
VALUES
  ('p_seed_01', 'LIVE01', 'Aarav Sharma', 'IIT Delhi', 'AS', 2850, 1, 4, 96.00, 'top-seed'),
  ('p_seed_02', 'LIVE01', 'Pooja Hegde', 'BITS Pilani', 'PH', 2640, 2, 3, 92.50, 'streak'),
  ('p_seed_03', 'LIVE01', 'Rohan Mehta', 'RVCE Bangalore', 'RM', 2480, 3, 2, 88.00, 'ready'),
  ('p_seed_04', 'LIVE01', 'Kavya Nair', 'NIT Trichy', 'KN', 2310, 4, 3, 91.00, 'active'),
  ('p_seed_05', 'LIVE01', 'Tanmay Kulkarni', 'IIT Bombay', 'TK', 2190, 5, 1, 85.00, 'active'),
  ('p_seed_06', 'ARENA2026', 'Siddharth Rao', 'IIIT Hyderabad', 'SR', 3100, 1, 5, 98.00, 'top-seed'),
  ('p_seed_07', 'ARENA2026', 'Divya Iyer', 'MIT Pune', 'DI', 2940, 2, 4, 94.00, 'streak'),
  ('p_seed_08', 'ARENA2026', 'Varun Verma', 'Stanford Online', 'VV', 2780, 3, 3, 90.50, 'ready')
ON CONFLICT (id) DO UPDATE SET
  score = EXCLUDED.score,
  rank = EXCLUDED.rank,
  streak_count = EXCLUDED.streak_count,
  accuracy_rate = EXCLUDED.accuracy_rate,
  status = EXCLUDED.status;
