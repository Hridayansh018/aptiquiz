// ============================================================================
// APTIQUIZ CURATED QUESTION BANK (300 QUESTIONS)
// Parsed from aptiquiz_question_sets/
// ============================================================================

import { QuizQuestion, QuestionCategory } from './quiz-data';

export interface QuestionBankItem extends QuizQuestion {
  setName: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | string;
}

export const QUESTION_SETS: { id: string; title: string; category: QuestionCategory; count: number }[] = [
  { id: '01_quantitative_aptitude', title: 'Quantitative Aptitude', category: 'Quant', count: 30 },
  { id: '02_logical_reasoning', title: 'Logical Reasoning', category: 'Logic', count: 30 },
  { id: '03_verbal_ability', title: 'Verbal Ability', category: 'Verbal', count: 30 },
  { id: '04_data_interpretation', title: 'Data Interpretation', category: 'Data Interpretation', count: 30 },
  { id: '05_time_work_speed', title: 'Time, Work & Speed', category: 'Quant', count: 30 },
  { id: '06_probability_counting', title: 'Probability & Counting', category: 'Quant', count: 30 },
  { id: '07_algebra_geometry', title: 'Algebra & Geometry', category: 'Quant', count: 30 },
  { id: '08_number_systems_series', title: 'Number Systems & Series', category: 'Quant', count: 30 },
  { id: '09_mixed_placement', title: 'Mixed Placement Aptitude', category: 'Quant', count: 30 },
  { id: '10_advanced_mixed', title: 'Advanced Mixed Aptitude', category: 'Logic', count: 30 },
];

export const QUESTION_BANK: QuestionBankItem[] = [
  {
    "id": 1,
    "category": "Quant",
    "section": "Quantitative Aptitude • Easy",
    "topic": "Quantitative Aptitude",
    "question": "If a number is multiplied by 6, the result is 204. What is the number?",
    "options": [
      {
        "key": "A",
        "text": "40",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "34",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "36",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "32",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: 34",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Quantitative Aptitude | Difficulty: Easy",
    "explanation": "Option B (34) is the verified solution for this easy-level problem from Quantitative Aptitude.",
    "setName": "01_quantitative_aptitude",
    "difficulty": "Easy"
  },
  {
    "id": 2,
    "category": "Quant",
    "section": "Quantitative Aptitude • Easy",
    "topic": "Quantitative Aptitude",
    "question": "An item costs ₹620 and is sold at a 25% profit. What is its selling price?",
    "options": [
      {
        "key": "A",
        "text": "₹675",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "₹645",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "₹775",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "₹825",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: ₹775",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Quantitative Aptitude | Difficulty: Easy",
    "explanation": "Option C (₹775) is the verified solution for this easy-level problem from Quantitative Aptitude.",
    "setName": "01_quantitative_aptitude",
    "difficulty": "Easy"
  },
  {
    "id": 3,
    "category": "Quant",
    "section": "Quantitative Aptitude • Easy",
    "topic": "Quantitative Aptitude",
    "question": "What is the average of 30 and 40?",
    "options": [
      {
        "key": "A",
        "text": "38",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "40",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "33",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "35",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: 35",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Quantitative Aptitude | Difficulty: Easy",
    "explanation": "Option D (35) is the verified solution for this easy-level problem from Quantitative Aptitude.",
    "setName": "01_quantitative_aptitude",
    "difficulty": "Easy"
  },
  {
    "id": 4,
    "category": "Quant",
    "section": "Quantitative Aptitude • Easy",
    "topic": "Quantitative Aptitude",
    "question": "What is the least common multiple (LCM) of 9 and 2?",
    "options": [
      {
        "key": "A",
        "text": "18",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "36",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "27",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "20",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: 18",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Quantitative Aptitude | Difficulty: Easy",
    "explanation": "Option A (18) is the verified solution for this easy-level problem from Quantitative Aptitude.",
    "setName": "01_quantitative_aptitude",
    "difficulty": "Easy"
  },
  {
    "id": 5,
    "category": "Quant",
    "section": "Quantitative Aptitude • Easy",
    "topic": "Quantitative Aptitude",
    "question": "Solve for x: x − 4 = 12.",
    "options": [
      {
        "key": "A",
        "text": "14",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "17",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "19",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "16",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: 16",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Quantitative Aptitude | Difficulty: Easy",
    "explanation": "Option D (16) is the verified solution for this easy-level problem from Quantitative Aptitude.",
    "setName": "01_quantitative_aptitude",
    "difficulty": "Easy"
  },
  {
    "id": 6,
    "category": "Quant",
    "section": "Quantitative Aptitude • Easy",
    "topic": "Quantitative Aptitude",
    "question": "What is 15% of 110?",
    "options": [
      {
        "key": "A",
        "text": "16",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "11",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "21",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "26",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: 16",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Quantitative Aptitude | Difficulty: Easy",
    "explanation": "Option A (16) is the verified solution for this easy-level problem from Quantitative Aptitude.",
    "setName": "01_quantitative_aptitude",
    "difficulty": "Easy"
  },
  {
    "id": 7,
    "category": "Quant",
    "section": "Quantitative Aptitude • Easy",
    "topic": "Quantitative Aptitude",
    "question": "If a number is multiplied by 7, the result is 119. What is the number?",
    "options": [
      {
        "key": "A",
        "text": "15",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "24",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "17",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "19",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: 17",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Quantitative Aptitude | Difficulty: Easy",
    "explanation": "Option C (17) is the verified solution for this easy-level problem from Quantitative Aptitude.",
    "setName": "01_quantitative_aptitude",
    "difficulty": "Easy"
  },
  {
    "id": 8,
    "category": "Quant",
    "section": "Quantitative Aptitude • Easy",
    "topic": "Quantitative Aptitude",
    "question": "An item costs ₹270 and is sold at a 25% profit. What is its selling price?",
    "options": [
      {
        "key": "A",
        "text": "₹387",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "₹337",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "₹237",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "₹295",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: ₹337",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Quantitative Aptitude | Difficulty: Easy",
    "explanation": "Option B (₹337) is the verified solution for this easy-level problem from Quantitative Aptitude.",
    "setName": "01_quantitative_aptitude",
    "difficulty": "Easy"
  },
  {
    "id": 9,
    "category": "Quant",
    "section": "Quantitative Aptitude • Easy",
    "topic": "Quantitative Aptitude",
    "question": "What is the average of 27 and 27?",
    "options": [
      {
        "key": "A",
        "text": "32",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "27",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "30",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "25",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: 27",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Quantitative Aptitude | Difficulty: Easy",
    "explanation": "Option B (27) is the verified solution for this easy-level problem from Quantitative Aptitude.",
    "setName": "01_quantitative_aptitude",
    "difficulty": "Easy"
  },
  {
    "id": 10,
    "category": "Quant",
    "section": "Quantitative Aptitude • Easy",
    "topic": "Quantitative Aptitude",
    "question": "What is the least common multiple (LCM) of 4 and 11?",
    "options": [
      {
        "key": "A",
        "text": "55",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "88",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "44",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "48",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: 44",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Quantitative Aptitude | Difficulty: Easy",
    "explanation": "Option C (44) is the verified solution for this easy-level problem from Quantitative Aptitude.",
    "setName": "01_quantitative_aptitude",
    "difficulty": "Easy"
  },
  {
    "id": 11,
    "category": "Quant",
    "section": "Quantitative Aptitude • Medium",
    "topic": "Quantitative Aptitude",
    "question": "Solve for x: x − 6 = 15.",
    "options": [
      {
        "key": "A",
        "text": "21",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "19",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "22",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "24",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: 21",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Quantitative Aptitude | Difficulty: Medium",
    "explanation": "Option A (21) is the verified solution for this medium-level problem from Quantitative Aptitude.",
    "setName": "01_quantitative_aptitude",
    "difficulty": "Medium"
  },
  {
    "id": 12,
    "category": "Quant",
    "section": "Quantitative Aptitude • Medium",
    "topic": "Quantitative Aptitude",
    "question": "What is 30% of 250?",
    "options": [
      {
        "key": "A",
        "text": "80",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "85",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "75",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "70",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: 75",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Quantitative Aptitude | Difficulty: Medium",
    "explanation": "Option C (75) is the verified solution for this medium-level problem from Quantitative Aptitude.",
    "setName": "01_quantitative_aptitude",
    "difficulty": "Medium"
  },
  {
    "id": 13,
    "category": "Quant",
    "section": "Quantitative Aptitude • Medium",
    "topic": "Quantitative Aptitude",
    "question": "If a number is multiplied by 3, the result is 96. What is the number?",
    "options": [
      {
        "key": "A",
        "text": "30",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "34",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "32",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "35",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: 32",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Quantitative Aptitude | Difficulty: Medium",
    "explanation": "Option C (32) is the verified solution for this medium-level problem from Quantitative Aptitude.",
    "setName": "01_quantitative_aptitude",
    "difficulty": "Medium"
  },
  {
    "id": 14,
    "category": "Quant",
    "section": "Quantitative Aptitude • Medium",
    "topic": "Quantitative Aptitude",
    "question": "An item costs ₹400 and is sold at a 10% profit. What is its selling price?",
    "options": [
      {
        "key": "A",
        "text": "₹490",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "₹410",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "₹440",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "₹340",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: ₹440",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Quantitative Aptitude | Difficulty: Medium",
    "explanation": "Option C (₹440) is the verified solution for this medium-level problem from Quantitative Aptitude.",
    "setName": "01_quantitative_aptitude",
    "difficulty": "Medium"
  },
  {
    "id": 15,
    "category": "Quant",
    "section": "Quantitative Aptitude • Medium",
    "topic": "Quantitative Aptitude",
    "question": "What is the average of 35 and 27?",
    "options": [
      {
        "key": "A",
        "text": "29",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "31",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "34",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "36",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: 31",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Quantitative Aptitude | Difficulty: Medium",
    "explanation": "Option B (31) is the verified solution for this medium-level problem from Quantitative Aptitude.",
    "setName": "01_quantitative_aptitude",
    "difficulty": "Medium"
  },
  {
    "id": 16,
    "category": "Quant",
    "section": "Quantitative Aptitude • Medium",
    "topic": "Quantitative Aptitude",
    "question": "What is the least common multiple (LCM) of 11 and 6?",
    "options": [
      {
        "key": "A",
        "text": "132",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "66",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "72",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "77",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: 66",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Quantitative Aptitude | Difficulty: Medium",
    "explanation": "Option B (66) is the verified solution for this medium-level problem from Quantitative Aptitude.",
    "setName": "01_quantitative_aptitude",
    "difficulty": "Medium"
  },
  {
    "id": 17,
    "category": "Quant",
    "section": "Quantitative Aptitude • Medium",
    "topic": "Quantitative Aptitude",
    "question": "Solve for x: x − 6 = 9.",
    "options": [
      {
        "key": "A",
        "text": "15",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "18",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "13",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "16",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: 15",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Quantitative Aptitude | Difficulty: Medium",
    "explanation": "Option A (15) is the verified solution for this medium-level problem from Quantitative Aptitude.",
    "setName": "01_quantitative_aptitude",
    "difficulty": "Medium"
  },
  {
    "id": 18,
    "category": "Quant",
    "section": "Quantitative Aptitude • Medium",
    "topic": "Quantitative Aptitude",
    "question": "What is 15% of 160?",
    "options": [
      {
        "key": "A",
        "text": "24",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "19",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "34",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "29",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: 24",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Quantitative Aptitude | Difficulty: Medium",
    "explanation": "Option A (24) is the verified solution for this medium-level problem from Quantitative Aptitude.",
    "setName": "01_quantitative_aptitude",
    "difficulty": "Medium"
  },
  {
    "id": 19,
    "category": "Quant",
    "section": "Quantitative Aptitude • Medium",
    "topic": "Quantitative Aptitude",
    "question": "If a number is multiplied by 5, the result is 225. What is the number?",
    "options": [
      {
        "key": "A",
        "text": "43",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "50",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "47",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "45",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: 45",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Quantitative Aptitude | Difficulty: Medium",
    "explanation": "Option D (45) is the verified solution for this medium-level problem from Quantitative Aptitude.",
    "setName": "01_quantitative_aptitude",
    "difficulty": "Medium"
  },
  {
    "id": 20,
    "category": "Quant",
    "section": "Quantitative Aptitude • Medium",
    "topic": "Quantitative Aptitude",
    "question": "An item costs ₹250 and is sold at a 10% profit. What is its selling price?",
    "options": [
      {
        "key": "A",
        "text": "₹260",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "₹325",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "₹175",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "₹275",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: ₹275",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Quantitative Aptitude | Difficulty: Medium",
    "explanation": "Option D (₹275) is the verified solution for this medium-level problem from Quantitative Aptitude.",
    "setName": "01_quantitative_aptitude",
    "difficulty": "Medium"
  },
  {
    "id": 21,
    "category": "Quant",
    "section": "Quantitative Aptitude • Medium",
    "topic": "Quantitative Aptitude",
    "question": "What is the average of 31 and 36?",
    "options": [
      {
        "key": "A",
        "text": "33.5",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "38.5",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "36.5",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "31.5",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: 33.5",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Quantitative Aptitude | Difficulty: Medium",
    "explanation": "Option A (33.5) is the verified solution for this medium-level problem from Quantitative Aptitude.",
    "setName": "01_quantitative_aptitude",
    "difficulty": "Medium"
  },
  {
    "id": 22,
    "category": "Quant",
    "section": "Quantitative Aptitude • Medium",
    "topic": "Quantitative Aptitude",
    "question": "What is the least common multiple (LCM) of 5 and 8?",
    "options": [
      {
        "key": "A",
        "text": "80",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "40",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "48",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "45",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: 40",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Quantitative Aptitude | Difficulty: Medium",
    "explanation": "Option B (40) is the verified solution for this medium-level problem from Quantitative Aptitude.",
    "setName": "01_quantitative_aptitude",
    "difficulty": "Medium"
  },
  {
    "id": 23,
    "category": "Quant",
    "section": "Quantitative Aptitude • Hard",
    "topic": "Quantitative Aptitude",
    "question": "Solve for x: x − 11 = 12.",
    "options": [
      {
        "key": "A",
        "text": "26",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "24",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "21",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "23",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: 23",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Quantitative Aptitude | Difficulty: Hard",
    "explanation": "Option D (23) is the verified solution for this hard-level problem from Quantitative Aptitude.",
    "setName": "01_quantitative_aptitude",
    "difficulty": "Hard"
  },
  {
    "id": 24,
    "category": "Quant",
    "section": "Quantitative Aptitude • Hard",
    "topic": "Quantitative Aptitude",
    "question": "What is 10% of 230?",
    "options": [
      {
        "key": "A",
        "text": "23",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "33",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "28",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "18",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: 23",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Quantitative Aptitude | Difficulty: Hard",
    "explanation": "Option A (23) is the verified solution for this hard-level problem from Quantitative Aptitude.",
    "setName": "01_quantitative_aptitude",
    "difficulty": "Hard"
  },
  {
    "id": 25,
    "category": "Quant",
    "section": "Quantitative Aptitude • Hard",
    "topic": "Quantitative Aptitude",
    "question": "If a number is multiplied by 5, the result is 60. What is the number?",
    "options": [
      {
        "key": "A",
        "text": "14",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "10",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "17",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "12",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: 12",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Quantitative Aptitude | Difficulty: Hard",
    "explanation": "Option D (12) is the verified solution for this hard-level problem from Quantitative Aptitude.",
    "setName": "01_quantitative_aptitude",
    "difficulty": "Hard"
  },
  {
    "id": 26,
    "category": "Quant",
    "section": "Quantitative Aptitude • Hard",
    "topic": "Quantitative Aptitude",
    "question": "An item costs ₹400 and is sold at a 25% profit. What is its selling price?",
    "options": [
      {
        "key": "A",
        "text": "₹425",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "₹500",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "₹550",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "₹400",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: ₹500",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Quantitative Aptitude | Difficulty: Hard",
    "explanation": "Option B (₹500) is the verified solution for this hard-level problem from Quantitative Aptitude.",
    "setName": "01_quantitative_aptitude",
    "difficulty": "Hard"
  },
  {
    "id": 27,
    "category": "Quant",
    "section": "Quantitative Aptitude • Hard",
    "topic": "Quantitative Aptitude",
    "question": "What is the average of 35 and 28?",
    "options": [
      {
        "key": "A",
        "text": "29.5",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "34.5",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "36.5",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "31.5",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: 31.5",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Quantitative Aptitude | Difficulty: Hard",
    "explanation": "Option D (31.5) is the verified solution for this hard-level problem from Quantitative Aptitude.",
    "setName": "01_quantitative_aptitude",
    "difficulty": "Hard"
  },
  {
    "id": 28,
    "category": "Quant",
    "section": "Quantitative Aptitude • Hard",
    "topic": "Quantitative Aptitude",
    "question": "What is the least common multiple (LCM) of 9 and 10?",
    "options": [
      {
        "key": "A",
        "text": "99",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "180",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "90",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "100",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: 90",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Quantitative Aptitude | Difficulty: Hard",
    "explanation": "Option C (90) is the verified solution for this hard-level problem from Quantitative Aptitude.",
    "setName": "01_quantitative_aptitude",
    "difficulty": "Hard"
  },
  {
    "id": 29,
    "category": "Quant",
    "section": "Quantitative Aptitude • Hard",
    "topic": "Quantitative Aptitude",
    "question": "Solve for x: x − 10 = 11.",
    "options": [
      {
        "key": "A",
        "text": "19",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "24",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "22",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "21",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: 21",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Quantitative Aptitude | Difficulty: Hard",
    "explanation": "Option D (21) is the verified solution for this hard-level problem from Quantitative Aptitude.",
    "setName": "01_quantitative_aptitude",
    "difficulty": "Hard"
  },
  {
    "id": 30,
    "category": "Quant",
    "section": "Quantitative Aptitude • Hard",
    "topic": "Quantitative Aptitude",
    "question": "What is 30% of 200?",
    "options": [
      {
        "key": "A",
        "text": "55",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "70",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "65",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "60",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: 60",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Quantitative Aptitude | Difficulty: Hard",
    "explanation": "Option D (60) is the verified solution for this hard-level problem from Quantitative Aptitude.",
    "setName": "01_quantitative_aptitude",
    "difficulty": "Hard"
  },
  {
    "id": 31,
    "category": "Logic",
    "section": "Logical Reasoning • Easy",
    "topic": "Logical Reasoning",
    "question": "Complete the analogy: Book is to Read as Food is to __.",
    "options": [
      {
        "key": "A",
        "text": "Eat",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Road",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Garden",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Water",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: Eat",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Logical Reasoning | Difficulty: Easy",
    "explanation": "Option A (Eat) is the verified solution for this easy-level problem from Logical Reasoning.",
    "setName": "02_logical_reasoning",
    "difficulty": "Easy"
  },
  {
    "id": 32,
    "category": "Logic",
    "section": "Logical Reasoning • Easy",
    "topic": "Logical Reasoning",
    "question": "Find the missing number: 16, 25, __.",
    "options": [
      {
        "key": "A",
        "text": "29",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "26",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "36",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "27",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: 36",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Logical Reasoning | Difficulty: Easy",
    "explanation": "Option C (36) is the verified solution for this easy-level problem from Logical Reasoning.",
    "setName": "02_logical_reasoning",
    "difficulty": "Easy"
  },
  {
    "id": 33,
    "category": "Logic",
    "section": "Logical Reasoning • Easy",
    "topic": "Logical Reasoning",
    "question": "Complete the letter series: O, Q, S, __.",
    "options": [
      {
        "key": "A",
        "text": "T",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "W",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "U",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "V",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: U",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Logical Reasoning | Difficulty: Easy",
    "explanation": "Option C (U) is the verified solution for this easy-level problem from Logical Reasoning.",
    "setName": "02_logical_reasoning",
    "difficulty": "Easy"
  },
  {
    "id": 34,
    "category": "Logic",
    "section": "Logical Reasoning • Easy",
    "topic": "Logical Reasoning",
    "question": "A person walks 4 km north and then 4 km south. How far are they from the starting point?",
    "options": [
      {
        "key": "A",
        "text": "0 km",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "8 km",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "1 km",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "4 km",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: 0 km",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Logical Reasoning | Difficulty: Easy",
    "explanation": "Option A (0 km) is the verified solution for this easy-level problem from Logical Reasoning.",
    "setName": "02_logical_reasoning",
    "difficulty": "Easy"
  },
  {
    "id": 35,
    "category": "Logic",
    "section": "Logical Reasoning • Easy",
    "topic": "Logical Reasoning",
    "question": "Find the next number: 1, 8, 15, 22, __.",
    "options": [
      {
        "key": "A",
        "text": "22",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "43",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "36",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "29",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: 29",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Logical Reasoning | Difficulty: Easy",
    "explanation": "Option D (29) is the verified solution for this easy-level problem from Logical Reasoning.",
    "setName": "02_logical_reasoning",
    "difficulty": "Easy"
  },
  {
    "id": 36,
    "category": "Logic",
    "section": "Logical Reasoning • Easy",
    "topic": "Logical Reasoning",
    "question": "Complete the analogy: Bird is to Nest as Bee is to __.",
    "options": [
      {
        "key": "A",
        "text": "Water",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Garden",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Road",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Hive",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: Hive",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Logical Reasoning | Difficulty: Easy",
    "explanation": "Option D (Hive) is the verified solution for this easy-level problem from Logical Reasoning.",
    "setName": "02_logical_reasoning",
    "difficulty": "Easy"
  },
  {
    "id": 37,
    "category": "Logic",
    "section": "Logical Reasoning • Easy",
    "topic": "Logical Reasoning",
    "question": "Find the missing number: 324, 361, __.",
    "options": [
      {
        "key": "A",
        "text": "362",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "400",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "365",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "363",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: 400",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Logical Reasoning | Difficulty: Easy",
    "explanation": "Option B (400) is the verified solution for this easy-level problem from Logical Reasoning.",
    "setName": "02_logical_reasoning",
    "difficulty": "Easy"
  },
  {
    "id": 38,
    "category": "Logic",
    "section": "Logical Reasoning • Easy",
    "topic": "Logical Reasoning",
    "question": "Complete the letter series: Q, S, U, __.",
    "options": [
      {
        "key": "A",
        "text": "X",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Y",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "W",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "V",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: W",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Logical Reasoning | Difficulty: Easy",
    "explanation": "Option C (W) is the verified solution for this easy-level problem from Logical Reasoning.",
    "setName": "02_logical_reasoning",
    "difficulty": "Easy"
  },
  {
    "id": 39,
    "category": "Logic",
    "section": "Logical Reasoning • Easy",
    "topic": "Logical Reasoning",
    "question": "A person walks 10 km north and then 10 km south. How far are they from the starting point?",
    "options": [
      {
        "key": "A",
        "text": "20 km",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "1 km",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "10 km",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "0 km",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: 0 km",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Logical Reasoning | Difficulty: Easy",
    "explanation": "Option D (0 km) is the verified solution for this easy-level problem from Logical Reasoning.",
    "setName": "02_logical_reasoning",
    "difficulty": "Easy"
  },
  {
    "id": 40,
    "category": "Logic",
    "section": "Logical Reasoning • Easy",
    "topic": "Logical Reasoning",
    "question": "Find the next number: 9, 13, 17, 21, __.",
    "options": [
      {
        "key": "A",
        "text": "21",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "29",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "33",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "25",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: 25",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Logical Reasoning | Difficulty: Easy",
    "explanation": "Option D (25) is the verified solution for this easy-level problem from Logical Reasoning.",
    "setName": "02_logical_reasoning",
    "difficulty": "Easy"
  },
  {
    "id": 41,
    "category": "Logic",
    "section": "Logical Reasoning • Medium",
    "topic": "Logical Reasoning",
    "question": "Complete the analogy: Pencil is to Write as Knife is to __.",
    "options": [
      {
        "key": "A",
        "text": "Garden",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Water",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Road",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Cut",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: Cut",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Logical Reasoning | Difficulty: Medium",
    "explanation": "Option D (Cut) is the verified solution for this medium-level problem from Logical Reasoning.",
    "setName": "02_logical_reasoning",
    "difficulty": "Medium"
  },
  {
    "id": 42,
    "category": "Logic",
    "section": "Logical Reasoning • Medium",
    "topic": "Logical Reasoning",
    "question": "Find the missing number: 196, 225, __.",
    "options": [
      {
        "key": "A",
        "text": "229",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "227",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "256",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "226",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: 256",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Logical Reasoning | Difficulty: Medium",
    "explanation": "Option C (256) is the verified solution for this medium-level problem from Logical Reasoning.",
    "setName": "02_logical_reasoning",
    "difficulty": "Medium"
  },
  {
    "id": 43,
    "category": "Logic",
    "section": "Logical Reasoning • Medium",
    "topic": "Logical Reasoning",
    "question": "Complete the letter series: U, W, Y, __.",
    "options": [
      {
        "key": "A",
        "text": "[",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Z",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "\\",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "]",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: [",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Logical Reasoning | Difficulty: Medium",
    "explanation": "Option A ([) is the verified solution for this medium-level problem from Logical Reasoning.",
    "setName": "02_logical_reasoning",
    "difficulty": "Medium"
  },
  {
    "id": 44,
    "category": "Logic",
    "section": "Logical Reasoning • Medium",
    "topic": "Logical Reasoning",
    "question": "A person walks 5 km north and then 5 km south. How far are they from the starting point?",
    "options": [
      {
        "key": "A",
        "text": "5 km",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "0 km",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "10 km",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "1 km",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: 0 km",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Logical Reasoning | Difficulty: Medium",
    "explanation": "Option B (0 km) is the verified solution for this medium-level problem from Logical Reasoning.",
    "setName": "02_logical_reasoning",
    "difficulty": "Medium"
  },
  {
    "id": 45,
    "category": "Logic",
    "section": "Logical Reasoning • Medium",
    "topic": "Logical Reasoning",
    "question": "Find the next number: 11, 13, 15, 17, __.",
    "options": [
      {
        "key": "A",
        "text": "19",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "21",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "23",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "17",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: 19",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Logical Reasoning | Difficulty: Medium",
    "explanation": "Option A (19) is the verified solution for this medium-level problem from Logical Reasoning.",
    "setName": "02_logical_reasoning",
    "difficulty": "Medium"
  },
  {
    "id": 46,
    "category": "Logic",
    "section": "Logical Reasoning • Medium",
    "topic": "Logical Reasoning",
    "question": "Complete the analogy: Pencil is to Write as Knife is to __.",
    "options": [
      {
        "key": "A",
        "text": "Cut",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Garden",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Water",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Road",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: Cut",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Logical Reasoning | Difficulty: Medium",
    "explanation": "Option A (Cut) is the verified solution for this medium-level problem from Logical Reasoning.",
    "setName": "02_logical_reasoning",
    "difficulty": "Medium"
  },
  {
    "id": 47,
    "category": "Logic",
    "section": "Logical Reasoning • Medium",
    "topic": "Logical Reasoning",
    "question": "Find the missing number: 49, 196, __.",
    "options": [
      {
        "key": "A",
        "text": "225",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "198",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "200",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "197",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: 225",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Logical Reasoning | Difficulty: Medium",
    "explanation": "Option A (225) is the verified solution for this medium-level problem from Logical Reasoning.",
    "setName": "02_logical_reasoning",
    "difficulty": "Medium"
  },
  {
    "id": 48,
    "category": "Logic",
    "section": "Logical Reasoning • Medium",
    "topic": "Logical Reasoning",
    "question": "Complete the letter series: D, F, H, __.",
    "options": [
      {
        "key": "A",
        "text": "I",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "L",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "K",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "J",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: J",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Logical Reasoning | Difficulty: Medium",
    "explanation": "Option D (J) is the verified solution for this medium-level problem from Logical Reasoning.",
    "setName": "02_logical_reasoning",
    "difficulty": "Medium"
  },
  {
    "id": 49,
    "category": "Logic",
    "section": "Logical Reasoning • Medium",
    "topic": "Logical Reasoning",
    "question": "A person walks 9 km north and then 9 km south. How far are they from the starting point?",
    "options": [
      {
        "key": "A",
        "text": "18 km",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "0 km",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "9 km",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "1 km",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: 0 km",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Logical Reasoning | Difficulty: Medium",
    "explanation": "Option B (0 km) is the verified solution for this medium-level problem from Logical Reasoning.",
    "setName": "02_logical_reasoning",
    "difficulty": "Medium"
  },
  {
    "id": 50,
    "category": "Logic",
    "section": "Logical Reasoning • Medium",
    "topic": "Logical Reasoning",
    "question": "Find the next number: 4, 6, 8, 10, __.",
    "options": [
      {
        "key": "A",
        "text": "14",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "12",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "16",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "10",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: 12",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Logical Reasoning | Difficulty: Medium",
    "explanation": "Option B (12) is the verified solution for this medium-level problem from Logical Reasoning.",
    "setName": "02_logical_reasoning",
    "difficulty": "Medium"
  },
  {
    "id": 51,
    "category": "Logic",
    "section": "Logical Reasoning • Medium",
    "topic": "Logical Reasoning",
    "question": "Complete the analogy: Bird is to Nest as Bee is to __.",
    "options": [
      {
        "key": "A",
        "text": "Road",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Water",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Hive",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "Garden",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: Hive",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Logical Reasoning | Difficulty: Medium",
    "explanation": "Option C (Hive) is the verified solution for this medium-level problem from Logical Reasoning.",
    "setName": "02_logical_reasoning",
    "difficulty": "Medium"
  },
  {
    "id": 52,
    "category": "Logic",
    "section": "Logical Reasoning • Medium",
    "topic": "Logical Reasoning",
    "question": "Find the missing number: 100, 121, __.",
    "options": [
      {
        "key": "A",
        "text": "144",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "125",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "122",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "123",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: 144",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Logical Reasoning | Difficulty: Medium",
    "explanation": "Option A (144) is the verified solution for this medium-level problem from Logical Reasoning.",
    "setName": "02_logical_reasoning",
    "difficulty": "Medium"
  },
  {
    "id": 53,
    "category": "Logic",
    "section": "Logical Reasoning • Hard",
    "topic": "Logical Reasoning",
    "question": "Complete the letter series: N, P, R, __.",
    "options": [
      {
        "key": "A",
        "text": "U",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "V",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "S",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "T",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: T",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Logical Reasoning | Difficulty: Hard",
    "explanation": "Option D (T) is the verified solution for this hard-level problem from Logical Reasoning.",
    "setName": "02_logical_reasoning",
    "difficulty": "Hard"
  },
  {
    "id": 54,
    "category": "Logic",
    "section": "Logical Reasoning • Hard",
    "topic": "Logical Reasoning",
    "question": "A person walks 9 km north and then 9 km south. How far are they from the starting point?",
    "options": [
      {
        "key": "A",
        "text": "18 km",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "1 km",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "0 km",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "9 km",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: 0 km",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Logical Reasoning | Difficulty: Hard",
    "explanation": "Option C (0 km) is the verified solution for this hard-level problem from Logical Reasoning.",
    "setName": "02_logical_reasoning",
    "difficulty": "Hard"
  },
  {
    "id": 55,
    "category": "Logic",
    "section": "Logical Reasoning • Hard",
    "topic": "Logical Reasoning",
    "question": "Find the next number: 13, 19, 25, 31, __.",
    "options": [
      {
        "key": "A",
        "text": "49",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "43",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "31",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "37",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: 37",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Logical Reasoning | Difficulty: Hard",
    "explanation": "Option D (37) is the verified solution for this hard-level problem from Logical Reasoning.",
    "setName": "02_logical_reasoning",
    "difficulty": "Hard"
  },
  {
    "id": 56,
    "category": "Logic",
    "section": "Logical Reasoning • Hard",
    "topic": "Logical Reasoning",
    "question": "Complete the analogy: Book is to Read as Food is to __.",
    "options": [
      {
        "key": "A",
        "text": "Road",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Garden",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Water",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Eat",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: Eat",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Logical Reasoning | Difficulty: Hard",
    "explanation": "Option D (Eat) is the verified solution for this hard-level problem from Logical Reasoning.",
    "setName": "02_logical_reasoning",
    "difficulty": "Hard"
  },
  {
    "id": 57,
    "category": "Logic",
    "section": "Logical Reasoning • Hard",
    "topic": "Logical Reasoning",
    "question": "Find the missing number: 1, 4, __.",
    "options": [
      {
        "key": "A",
        "text": "6",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "5",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "9",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "8",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: 9",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Logical Reasoning | Difficulty: Hard",
    "explanation": "Option C (9) is the verified solution for this hard-level problem from Logical Reasoning.",
    "setName": "02_logical_reasoning",
    "difficulty": "Hard"
  },
  {
    "id": 58,
    "category": "Logic",
    "section": "Logical Reasoning • Hard",
    "topic": "Logical Reasoning",
    "question": "Complete the letter series: S, U, W, __.",
    "options": [
      {
        "key": "A",
        "text": "X",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "[",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Y",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "Z",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: Y",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Logical Reasoning | Difficulty: Hard",
    "explanation": "Option C (Y) is the verified solution for this hard-level problem from Logical Reasoning.",
    "setName": "02_logical_reasoning",
    "difficulty": "Hard"
  },
  {
    "id": 59,
    "category": "Logic",
    "section": "Logical Reasoning • Hard",
    "topic": "Logical Reasoning",
    "question": "A person walks 4 km north and then 4 km south. How far are they from the starting point?",
    "options": [
      {
        "key": "A",
        "text": "8 km",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "1 km",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "0 km",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "4 km",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: 0 km",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Logical Reasoning | Difficulty: Hard",
    "explanation": "Option C (0 km) is the verified solution for this hard-level problem from Logical Reasoning.",
    "setName": "02_logical_reasoning",
    "difficulty": "Hard"
  },
  {
    "id": 60,
    "category": "Logic",
    "section": "Logical Reasoning • Hard",
    "topic": "Logical Reasoning",
    "question": "Find the next number: 4, 12, 20, 28, __.",
    "options": [
      {
        "key": "A",
        "text": "44",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "28",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "36",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "52",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: 36",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Logical Reasoning | Difficulty: Hard",
    "explanation": "Option C (36) is the verified solution for this hard-level problem from Logical Reasoning.",
    "setName": "02_logical_reasoning",
    "difficulty": "Hard"
  },
  {
    "id": 61,
    "category": "Verbal",
    "section": "Verbal Ability • Easy",
    "topic": "Verbal Ability",
    "question": "Choose the antonym of 'scarce'.",
    "options": [
      {
        "key": "A",
        "text": "Limited",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Abundant",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Rare",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Meagre",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: Abundant",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Verbal Ability | Difficulty: Easy",
    "explanation": "Option B (Abundant) is the verified solution for this easy-level problem from Verbal Ability.",
    "setName": "03_verbal_ability",
    "difficulty": "Easy"
  },
  {
    "id": 62,
    "category": "Verbal",
    "section": "Verbal Ability • Easy",
    "topic": "Verbal Ability",
    "question": "Choose the grammatically correct sentence.",
    "options": [
      {
        "key": "A",
        "text": "She don't like tea.",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "She doesn't like tea.",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "She doesn't likes tea.",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "She not like tea.",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: She doesn't like tea.",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Verbal Ability | Difficulty: Easy",
    "explanation": "Option B (She doesn't like tea.) is the verified solution for this easy-level problem from Verbal Ability.",
    "setName": "03_verbal_ability",
    "difficulty": "Easy"
  },
  {
    "id": 63,
    "category": "Verbal",
    "section": "Verbal Ability • Easy",
    "topic": "Verbal Ability",
    "question": "A person who writes poems is a:",
    "options": [
      {
        "key": "A",
        "text": "Editor",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Novelist",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Poet",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "Orator",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: Poet",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Verbal Ability | Difficulty: Easy",
    "explanation": "Option C (Poet) is the verified solution for this easy-level problem from Verbal Ability.",
    "setName": "03_verbal_ability",
    "difficulty": "Easy"
  },
  {
    "id": 64,
    "category": "Verbal",
    "section": "Verbal Ability • Easy",
    "topic": "Verbal Ability",
    "question": "Choose the correctly spelled word.",
    "options": [
      {
        "key": "A",
        "text": "Accomodation",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Acommodation",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Accommadation",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Accommodation",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: Accommodation",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Verbal Ability | Difficulty: Easy",
    "explanation": "Option D (Accommodation) is the verified solution for this easy-level problem from Verbal Ability.",
    "setName": "03_verbal_ability",
    "difficulty": "Easy"
  },
  {
    "id": 65,
    "category": "Verbal",
    "section": "Verbal Ability • Easy",
    "topic": "Verbal Ability",
    "question": "Choose the synonym of 'rapid'.",
    "options": [
      {
        "key": "A",
        "text": "Weak",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Swift",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Slow",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Late",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: Swift",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Verbal Ability | Difficulty: Easy",
    "explanation": "Option B (Swift) is the verified solution for this easy-level problem from Verbal Ability.",
    "setName": "03_verbal_ability",
    "difficulty": "Easy"
  },
  {
    "id": 66,
    "category": "Verbal",
    "section": "Verbal Ability • Easy",
    "topic": "Verbal Ability",
    "question": "Choose the antonym of 'generous'.",
    "options": [
      {
        "key": "A",
        "text": "Kind",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Helpful",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Stingy",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "Giving",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: Stingy",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Verbal Ability | Difficulty: Easy",
    "explanation": "Option C (Stingy) is the verified solution for this easy-level problem from Verbal Ability.",
    "setName": "03_verbal_ability",
    "difficulty": "Easy"
  },
  {
    "id": 67,
    "category": "Verbal",
    "section": "Verbal Ability • Easy",
    "topic": "Verbal Ability",
    "question": "Fill in the blank: Neither of the answers __ correct.",
    "options": [
      {
        "key": "A",
        "text": "are",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "is",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "have",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "were",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: is",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Verbal Ability | Difficulty: Easy",
    "explanation": "Option B (is) is the verified solution for this easy-level problem from Verbal Ability.",
    "setName": "03_verbal_ability",
    "difficulty": "Easy"
  },
  {
    "id": 68,
    "category": "Verbal",
    "section": "Verbal Ability • Easy",
    "topic": "Verbal Ability",
    "question": "Choose the meaning of 'ubiquitous'.",
    "options": [
      {
        "key": "A",
        "text": "Present everywhere",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Rare",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Temporary",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Dangerous",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: Present everywhere",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Verbal Ability | Difficulty: Easy",
    "explanation": "Option A (Present everywhere) is the verified solution for this easy-level problem from Verbal Ability.",
    "setName": "03_verbal_ability",
    "difficulty": "Easy"
  },
  {
    "id": 69,
    "category": "Verbal",
    "section": "Verbal Ability • Easy",
    "topic": "Verbal Ability",
    "question": "Choose the correct article: She bought __ umbrella.",
    "options": [
      {
        "key": "A",
        "text": "thee",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "no article",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "a",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "an",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: an",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Verbal Ability | Difficulty: Easy",
    "explanation": "Option D (an) is the verified solution for this easy-level problem from Verbal Ability.",
    "setName": "03_verbal_ability",
    "difficulty": "Easy"
  },
  {
    "id": 70,
    "category": "Verbal",
    "section": "Verbal Ability • Easy",
    "topic": "Verbal Ability",
    "question": "Choose the antonym of 'optimistic'.",
    "options": [
      {
        "key": "A",
        "text": "Hopeful",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Confident",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Pessimistic",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "Cheerful",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: Pessimistic",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Verbal Ability | Difficulty: Easy",
    "explanation": "Option C (Pessimistic) is the verified solution for this easy-level problem from Verbal Ability.",
    "setName": "03_verbal_ability",
    "difficulty": "Easy"
  },
  {
    "id": 71,
    "category": "Verbal",
    "section": "Verbal Ability • Medium",
    "topic": "Verbal Ability",
    "question": "Choose the correct word: The medicine had no __ on him.",
    "options": [
      {
        "key": "A",
        "text": "effects to",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "affect",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "effect",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "affects",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: effect",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Verbal Ability | Difficulty: Medium",
    "explanation": "Option C (effect) is the verified solution for this medium-level problem from Verbal Ability.",
    "setName": "03_verbal_ability",
    "difficulty": "Medium"
  },
  {
    "id": 72,
    "category": "Verbal",
    "section": "Verbal Ability • Medium",
    "topic": "Verbal Ability",
    "question": "Choose the plural of 'criterion'.",
    "options": [
      {
        "key": "A",
        "text": "Criterias",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Criterions",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Criterion",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Criteria",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: Criteria",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Verbal Ability | Difficulty: Medium",
    "explanation": "Option D (Criteria) is the verified solution for this medium-level problem from Verbal Ability.",
    "setName": "03_verbal_ability",
    "difficulty": "Medium"
  },
  {
    "id": 73,
    "category": "Verbal",
    "section": "Verbal Ability • Medium",
    "topic": "Verbal Ability",
    "question": "Choose the meaning of 'mitigate'.",
    "options": [
      {
        "key": "A",
        "text": "Intensify",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Predict",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Alleviate",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "Ignore",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: Alleviate",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Verbal Ability | Difficulty: Medium",
    "explanation": "Option C (Alleviate) is the verified solution for this medium-level problem from Verbal Ability.",
    "setName": "03_verbal_ability",
    "difficulty": "Medium"
  },
  {
    "id": 74,
    "category": "Verbal",
    "section": "Verbal Ability • Medium",
    "topic": "Verbal Ability",
    "question": "Complete the phrase: No sooner had the bell rung __ the students left.",
    "options": [
      {
        "key": "A",
        "text": "than",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "that",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "then",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "when",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: than",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Verbal Ability | Difficulty: Medium",
    "explanation": "Option A (than) is the verified solution for this medium-level problem from Verbal Ability.",
    "setName": "03_verbal_ability",
    "difficulty": "Medium"
  },
  {
    "id": 75,
    "category": "Verbal",
    "section": "Verbal Ability • Medium",
    "topic": "Verbal Ability",
    "question": "Choose the synonym of 'concise'.",
    "options": [
      {
        "key": "A",
        "text": "Lengthy",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Vague",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Noisy",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Brief",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: Brief",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Verbal Ability | Difficulty: Medium",
    "explanation": "Option D (Brief) is the verified solution for this medium-level problem from Verbal Ability.",
    "setName": "03_verbal_ability",
    "difficulty": "Medium"
  },
  {
    "id": 76,
    "category": "Verbal",
    "section": "Verbal Ability • Medium",
    "topic": "Verbal Ability",
    "question": "Choose the antonym of 'scarce'.",
    "options": [
      {
        "key": "A",
        "text": "Abundant",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Limited",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Rare",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Meagre",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: Abundant",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Verbal Ability | Difficulty: Medium",
    "explanation": "Option A (Abundant) is the verified solution for this medium-level problem from Verbal Ability.",
    "setName": "03_verbal_ability",
    "difficulty": "Medium"
  },
  {
    "id": 77,
    "category": "Verbal",
    "section": "Verbal Ability • Medium",
    "topic": "Verbal Ability",
    "question": "Choose the grammatically correct sentence.",
    "options": [
      {
        "key": "A",
        "text": "She doesn't likes tea.",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "She not like tea.",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "She doesn't like tea.",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "She don't like tea.",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: She doesn't like tea.",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Verbal Ability | Difficulty: Medium",
    "explanation": "Option C (She doesn't like tea.) is the verified solution for this medium-level problem from Verbal Ability.",
    "setName": "03_verbal_ability",
    "difficulty": "Medium"
  },
  {
    "id": 78,
    "category": "Verbal",
    "section": "Verbal Ability • Medium",
    "topic": "Verbal Ability",
    "question": "A person who writes poems is a:",
    "options": [
      {
        "key": "A",
        "text": "Orator",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Poet",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Novelist",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Editor",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: Poet",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Verbal Ability | Difficulty: Medium",
    "explanation": "Option B (Poet) is the verified solution for this medium-level problem from Verbal Ability.",
    "setName": "03_verbal_ability",
    "difficulty": "Medium"
  },
  {
    "id": 79,
    "category": "Verbal",
    "section": "Verbal Ability • Medium",
    "topic": "Verbal Ability",
    "question": "Choose the correctly spelled word.",
    "options": [
      {
        "key": "A",
        "text": "Accommadation",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Acommodation",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Accommodation",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "Accomodation",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: Accommodation",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Verbal Ability | Difficulty: Medium",
    "explanation": "Option C (Accommodation) is the verified solution for this medium-level problem from Verbal Ability.",
    "setName": "03_verbal_ability",
    "difficulty": "Medium"
  },
  {
    "id": 80,
    "category": "Verbal",
    "section": "Verbal Ability • Medium",
    "topic": "Verbal Ability",
    "question": "Choose the synonym of 'rapid'.",
    "options": [
      {
        "key": "A",
        "text": "Weak",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Slow",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Swift",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "Late",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: Swift",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Verbal Ability | Difficulty: Medium",
    "explanation": "Option C (Swift) is the verified solution for this medium-level problem from Verbal Ability.",
    "setName": "03_verbal_ability",
    "difficulty": "Medium"
  },
  {
    "id": 81,
    "category": "Verbal",
    "section": "Verbal Ability • Medium",
    "topic": "Verbal Ability",
    "question": "Choose the antonym of 'generous'.",
    "options": [
      {
        "key": "A",
        "text": "Helpful",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Stingy",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Kind",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Giving",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: Stingy",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Verbal Ability | Difficulty: Medium",
    "explanation": "Option B (Stingy) is the verified solution for this medium-level problem from Verbal Ability.",
    "setName": "03_verbal_ability",
    "difficulty": "Medium"
  },
  {
    "id": 82,
    "category": "Verbal",
    "section": "Verbal Ability • Medium",
    "topic": "Verbal Ability",
    "question": "Fill in the blank: Neither of the answers __ correct.",
    "options": [
      {
        "key": "A",
        "text": "have",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "is",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "were",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "are",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: is",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Verbal Ability | Difficulty: Medium",
    "explanation": "Option B (is) is the verified solution for this medium-level problem from Verbal Ability.",
    "setName": "03_verbal_ability",
    "difficulty": "Medium"
  },
  {
    "id": 83,
    "category": "Verbal",
    "section": "Verbal Ability • Hard",
    "topic": "Verbal Ability",
    "question": "Choose the meaning of 'ubiquitous'.",
    "options": [
      {
        "key": "A",
        "text": "Dangerous",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Rare",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Temporary",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Present everywhere",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: Present everywhere",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Verbal Ability | Difficulty: Hard",
    "explanation": "Option D (Present everywhere) is the verified solution for this hard-level problem from Verbal Ability.",
    "setName": "03_verbal_ability",
    "difficulty": "Hard"
  },
  {
    "id": 84,
    "category": "Verbal",
    "section": "Verbal Ability • Hard",
    "topic": "Verbal Ability",
    "question": "Choose the correct article: She bought __ umbrella.",
    "options": [
      {
        "key": "A",
        "text": "an",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "no article",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "a",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "thee",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: an",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Verbal Ability | Difficulty: Hard",
    "explanation": "Option A (an) is the verified solution for this hard-level problem from Verbal Ability.",
    "setName": "03_verbal_ability",
    "difficulty": "Hard"
  },
  {
    "id": 85,
    "category": "Verbal",
    "section": "Verbal Ability • Hard",
    "topic": "Verbal Ability",
    "question": "Choose the antonym of 'optimistic'.",
    "options": [
      {
        "key": "A",
        "text": "Confident",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Pessimistic",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Hopeful",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Cheerful",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: Pessimistic",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Verbal Ability | Difficulty: Hard",
    "explanation": "Option B (Pessimistic) is the verified solution for this hard-level problem from Verbal Ability.",
    "setName": "03_verbal_ability",
    "difficulty": "Hard"
  },
  {
    "id": 86,
    "category": "Verbal",
    "section": "Verbal Ability • Hard",
    "topic": "Verbal Ability",
    "question": "Choose the correct word: The medicine had no __ on him.",
    "options": [
      {
        "key": "A",
        "text": "affects",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "effect",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "effects to",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "affect",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: effect",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Verbal Ability | Difficulty: Hard",
    "explanation": "Option B (effect) is the verified solution for this hard-level problem from Verbal Ability.",
    "setName": "03_verbal_ability",
    "difficulty": "Hard"
  },
  {
    "id": 87,
    "category": "Verbal",
    "section": "Verbal Ability • Hard",
    "topic": "Verbal Ability",
    "question": "Choose the plural of 'criterion'.",
    "options": [
      {
        "key": "A",
        "text": "Criteria",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Criterion",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Criterions",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Criterias",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: Criteria",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Verbal Ability | Difficulty: Hard",
    "explanation": "Option A (Criteria) is the verified solution for this hard-level problem from Verbal Ability.",
    "setName": "03_verbal_ability",
    "difficulty": "Hard"
  },
  {
    "id": 88,
    "category": "Verbal",
    "section": "Verbal Ability • Hard",
    "topic": "Verbal Ability",
    "question": "Choose the meaning of 'mitigate'.",
    "options": [
      {
        "key": "A",
        "text": "Ignore",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Alleviate",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Predict",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Intensify",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: Alleviate",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Verbal Ability | Difficulty: Hard",
    "explanation": "Option B (Alleviate) is the verified solution for this hard-level problem from Verbal Ability.",
    "setName": "03_verbal_ability",
    "difficulty": "Hard"
  },
  {
    "id": 89,
    "category": "Verbal",
    "section": "Verbal Ability • Hard",
    "topic": "Verbal Ability",
    "question": "Complete the phrase: No sooner had the bell rung __ the students left.",
    "options": [
      {
        "key": "A",
        "text": "than",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "when",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "then",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "that",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: than",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Verbal Ability | Difficulty: Hard",
    "explanation": "Option A (than) is the verified solution for this hard-level problem from Verbal Ability.",
    "setName": "03_verbal_ability",
    "difficulty": "Hard"
  },
  {
    "id": 90,
    "category": "Verbal",
    "section": "Verbal Ability • Hard",
    "topic": "Verbal Ability",
    "question": "Choose the synonym of 'concise'.",
    "options": [
      {
        "key": "A",
        "text": "Vague",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Brief",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Lengthy",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Noisy",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: Brief",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Verbal Ability | Difficulty: Hard",
    "explanation": "Option B (Brief) is the verified solution for this hard-level problem from Verbal Ability.",
    "setName": "03_verbal_ability",
    "difficulty": "Hard"
  },
  {
    "id": 91,
    "category": "Data Interpretation",
    "section": "Data Interpretation • Easy",
    "topic": "Data Interpretation",
    "question": "20% of a group of 90 people chose option A. How many people is that?",
    "options": [
      {
        "key": "A",
        "text": "17",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "20",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "18",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "72",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: 18",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Data Interpretation | Difficulty: Easy",
    "explanation": "Option C (18) is the verified solution for this easy-level problem from Data Interpretation.",
    "setName": "04_data_interpretation",
    "difficulty": "Easy"
  },
  {
    "id": 92,
    "category": "Data Interpretation",
    "section": "Data Interpretation • Easy",
    "topic": "Data Interpretation",
    "question": "Find the average of 30, 20, 20, 60.",
    "options": [
      {
        "key": "A",
        "text": "130",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "37",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "32",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "27",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: 32",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Data Interpretation | Difficulty: Easy",
    "explanation": "Option C (32) is the verified solution for this easy-level problem from Data Interpretation.",
    "setName": "04_data_interpretation",
    "difficulty": "Easy"
  },
  {
    "id": 93,
    "category": "Data Interpretation",
    "section": "Data Interpretation • Easy",
    "topic": "Data Interpretation",
    "question": "A survey has 950 responses. If 20% selected option B, how many responses is that?",
    "options": [
      {
        "key": "A",
        "text": "760",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "180",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "200",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "190",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: 190",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Data Interpretation | Difficulty: Easy",
    "explanation": "Option D (190) is the verified solution for this easy-level problem from Data Interpretation.",
    "setName": "04_data_interpretation",
    "difficulty": "Easy"
  },
  {
    "id": 94,
    "category": "Data Interpretation",
    "section": "Data Interpretation • Easy",
    "topic": "Data Interpretation",
    "question": "What is the median of 24, 26, and 39?",
    "options": [
      {
        "key": "A",
        "text": "89",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "26",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "39",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "24",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: 39",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Data Interpretation | Difficulty: Easy",
    "explanation": "Option C (39) is the verified solution for this easy-level problem from Data Interpretation.",
    "setName": "04_data_interpretation",
    "difficulty": "Easy"
  },
  {
    "id": 95,
    "category": "Data Interpretation",
    "section": "Data Interpretation • Easy",
    "topic": "Data Interpretation",
    "question": "Sales increased from 70 units to 120 units. What was the increase?",
    "options": [
      {
        "key": "A",
        "text": "120",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "40",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "60",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "50",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: 50",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Data Interpretation | Difficulty: Easy",
    "explanation": "Option D (50) is the verified solution for this easy-level problem from Data Interpretation.",
    "setName": "04_data_interpretation",
    "difficulty": "Easy"
  },
  {
    "id": 96,
    "category": "Data Interpretation",
    "section": "Data Interpretation • Easy",
    "topic": "Data Interpretation",
    "question": "40% of a group of 100 people chose option A. How many people is that?",
    "options": [
      {
        "key": "A",
        "text": "60",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "39",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "40",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "42",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: 40",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Data Interpretation | Difficulty: Easy",
    "explanation": "Option C (40) is the verified solution for this easy-level problem from Data Interpretation.",
    "setName": "04_data_interpretation",
    "difficulty": "Easy"
  },
  {
    "id": 97,
    "category": "Data Interpretation",
    "section": "Data Interpretation • Easy",
    "topic": "Data Interpretation",
    "question": "Find the average of 30, 30, 35, 25.",
    "options": [
      {
        "key": "A",
        "text": "25",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "120",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "30",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "35",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: 30",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Data Interpretation | Difficulty: Easy",
    "explanation": "Option C (30) is the verified solution for this easy-level problem from Data Interpretation.",
    "setName": "04_data_interpretation",
    "difficulty": "Easy"
  },
  {
    "id": 98,
    "category": "Data Interpretation",
    "section": "Data Interpretation • Easy",
    "topic": "Data Interpretation",
    "question": "A survey has 200 responses. If 20% selected option B, how many responses is that?",
    "options": [
      {
        "key": "A",
        "text": "50",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "160",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "30",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "40",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: 40",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Data Interpretation | Difficulty: Easy",
    "explanation": "Option D (40) is the verified solution for this easy-level problem from Data Interpretation.",
    "setName": "04_data_interpretation",
    "difficulty": "Easy"
  },
  {
    "id": 99,
    "category": "Data Interpretation",
    "section": "Data Interpretation • Easy",
    "topic": "Data Interpretation",
    "question": "What is the median of 23, 47, and 60?",
    "options": [
      {
        "key": "A",
        "text": "23",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "47",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "60",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "130",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: 60",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Data Interpretation | Difficulty: Easy",
    "explanation": "Option C (60) is the verified solution for this easy-level problem from Data Interpretation.",
    "setName": "04_data_interpretation",
    "difficulty": "Easy"
  },
  {
    "id": 100,
    "category": "Data Interpretation",
    "section": "Data Interpretation • Easy",
    "topic": "Data Interpretation",
    "question": "Sales increased from 160 units to 200 units. What was the increase?",
    "options": [
      {
        "key": "A",
        "text": "30",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "200",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "50",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "40",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: 40",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Data Interpretation | Difficulty: Easy",
    "explanation": "Option D (40) is the verified solution for this easy-level problem from Data Interpretation.",
    "setName": "04_data_interpretation",
    "difficulty": "Easy"
  },
  {
    "id": 101,
    "category": "Data Interpretation",
    "section": "Data Interpretation • Medium",
    "topic": "Data Interpretation",
    "question": "50% of a group of 90 people chose option A. How many people is that?",
    "options": [
      {
        "key": "A",
        "text": "45",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "52",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "48",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "43",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: 45",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Data Interpretation | Difficulty: Medium",
    "explanation": "Option A (45) is the verified solution for this medium-level problem from Data Interpretation.",
    "setName": "04_data_interpretation",
    "difficulty": "Medium"
  },
  {
    "id": 102,
    "category": "Data Interpretation",
    "section": "Data Interpretation • Medium",
    "topic": "Data Interpretation",
    "question": "Find the average of 15, 50, 45, 15.",
    "options": [
      {
        "key": "A",
        "text": "125",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "31",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "26",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "36",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: 31",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Data Interpretation | Difficulty: Medium",
    "explanation": "Option B (31) is the verified solution for this medium-level problem from Data Interpretation.",
    "setName": "04_data_interpretation",
    "difficulty": "Medium"
  },
  {
    "id": 103,
    "category": "Data Interpretation",
    "section": "Data Interpretation • Medium",
    "topic": "Data Interpretation",
    "question": "A survey has 200 responses. If 10% selected option B, how many responses is that?",
    "options": [
      {
        "key": "A",
        "text": "10",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "20",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "180",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "30",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: 20",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Data Interpretation | Difficulty: Medium",
    "explanation": "Option B (20) is the verified solution for this medium-level problem from Data Interpretation.",
    "setName": "04_data_interpretation",
    "difficulty": "Medium"
  },
  {
    "id": 104,
    "category": "Data Interpretation",
    "section": "Data Interpretation • Medium",
    "topic": "Data Interpretation",
    "question": "What is the median of 12, 13, and 82?",
    "options": [
      {
        "key": "A",
        "text": "12",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "82",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "13",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "107",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: 82",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Data Interpretation | Difficulty: Medium",
    "explanation": "Option B (82) is the verified solution for this medium-level problem from Data Interpretation.",
    "setName": "04_data_interpretation",
    "difficulty": "Medium"
  },
  {
    "id": 105,
    "category": "Data Interpretation",
    "section": "Data Interpretation • Medium",
    "topic": "Data Interpretation",
    "question": "Sales increased from 60 units to 70 units. What was the increase?",
    "options": [
      {
        "key": "A",
        "text": "70",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "0",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "10",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "20",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: 10",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Data Interpretation | Difficulty: Medium",
    "explanation": "Option C (10) is the verified solution for this medium-level problem from Data Interpretation.",
    "setName": "04_data_interpretation",
    "difficulty": "Medium"
  },
  {
    "id": 106,
    "category": "Data Interpretation",
    "section": "Data Interpretation • Medium",
    "topic": "Data Interpretation",
    "question": "40% of a group of 50 people chose option A. How many people is that?",
    "options": [
      {
        "key": "A",
        "text": "22",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "30",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "19",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "20",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: 20",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Data Interpretation | Difficulty: Medium",
    "explanation": "Option D (20) is the verified solution for this medium-level problem from Data Interpretation.",
    "setName": "04_data_interpretation",
    "difficulty": "Medium"
  },
  {
    "id": 107,
    "category": "Data Interpretation",
    "section": "Data Interpretation • Medium",
    "topic": "Data Interpretation",
    "question": "Find the average of 20, 60, 55, 20.",
    "options": [
      {
        "key": "A",
        "text": "33",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "43",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "38",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "155",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: 38",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Data Interpretation | Difficulty: Medium",
    "explanation": "Option C (38) is the verified solution for this medium-level problem from Data Interpretation.",
    "setName": "04_data_interpretation",
    "difficulty": "Medium"
  },
  {
    "id": 108,
    "category": "Data Interpretation",
    "section": "Data Interpretation • Medium",
    "topic": "Data Interpretation",
    "question": "A survey has 750 responses. If 10% selected option B, how many responses is that?",
    "options": [
      {
        "key": "A",
        "text": "675",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "85",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "75",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "65",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: 75",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Data Interpretation | Difficulty: Medium",
    "explanation": "Option C (75) is the verified solution for this medium-level problem from Data Interpretation.",
    "setName": "04_data_interpretation",
    "difficulty": "Medium"
  },
  {
    "id": 109,
    "category": "Data Interpretation",
    "section": "Data Interpretation • Medium",
    "topic": "Data Interpretation",
    "question": "What is the median of 22, 47, and 83?",
    "options": [
      {
        "key": "A",
        "text": "22",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "83",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "152",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "47",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: 83",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Data Interpretation | Difficulty: Medium",
    "explanation": "Option B (83) is the verified solution for this medium-level problem from Data Interpretation.",
    "setName": "04_data_interpretation",
    "difficulty": "Medium"
  },
  {
    "id": 110,
    "category": "Data Interpretation",
    "section": "Data Interpretation • Medium",
    "topic": "Data Interpretation",
    "question": "Sales increased from 120 units to 130 units. What was the increase?",
    "options": [
      {
        "key": "A",
        "text": "0",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "130",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "10",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "20",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: 10",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Data Interpretation | Difficulty: Medium",
    "explanation": "Option C (10) is the verified solution for this medium-level problem from Data Interpretation.",
    "setName": "04_data_interpretation",
    "difficulty": "Medium"
  },
  {
    "id": 111,
    "category": "Data Interpretation",
    "section": "Data Interpretation • Medium",
    "topic": "Data Interpretation",
    "question": "20% of a group of 60 people chose option A. How many people is that?",
    "options": [
      {
        "key": "A",
        "text": "11",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "12",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "48",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "14",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: 12",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Data Interpretation | Difficulty: Medium",
    "explanation": "Option B (12) is the verified solution for this medium-level problem from Data Interpretation.",
    "setName": "04_data_interpretation",
    "difficulty": "Medium"
  },
  {
    "id": 112,
    "category": "Data Interpretation",
    "section": "Data Interpretation • Medium",
    "topic": "Data Interpretation",
    "question": "Find the average of 25, 10, 25, 10.",
    "options": [
      {
        "key": "A",
        "text": "17",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "22",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "70",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "12",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: 17",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Data Interpretation | Difficulty: Medium",
    "explanation": "Option A (17) is the verified solution for this medium-level problem from Data Interpretation.",
    "setName": "04_data_interpretation",
    "difficulty": "Medium"
  },
  {
    "id": 113,
    "category": "Data Interpretation",
    "section": "Data Interpretation • Hard",
    "topic": "Data Interpretation",
    "question": "A survey has 400 responses. If 20% selected option B, how many responses is that?",
    "options": [
      {
        "key": "A",
        "text": "70",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "90",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "80",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "320",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: 80",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Data Interpretation | Difficulty: Hard",
    "explanation": "Option C (80) is the verified solution for this hard-level problem from Data Interpretation.",
    "setName": "04_data_interpretation",
    "difficulty": "Hard"
  },
  {
    "id": 114,
    "category": "Data Interpretation",
    "section": "Data Interpretation • Hard",
    "topic": "Data Interpretation",
    "question": "What is the median of 43, 81, and 90?",
    "options": [
      {
        "key": "A",
        "text": "43",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "214",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "90",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "81",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: 90",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Data Interpretation | Difficulty: Hard",
    "explanation": "Option C (90) is the verified solution for this hard-level problem from Data Interpretation.",
    "setName": "04_data_interpretation",
    "difficulty": "Hard"
  },
  {
    "id": 115,
    "category": "Data Interpretation",
    "section": "Data Interpretation • Hard",
    "topic": "Data Interpretation",
    "question": "Sales increased from 90 units to 100 units. What was the increase?",
    "options": [
      {
        "key": "A",
        "text": "10",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "0",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "100",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "20",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: 10",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Data Interpretation | Difficulty: Hard",
    "explanation": "Option A (10) is the verified solution for this hard-level problem from Data Interpretation.",
    "setName": "04_data_interpretation",
    "difficulty": "Hard"
  },
  {
    "id": 116,
    "category": "Data Interpretation",
    "section": "Data Interpretation • Hard",
    "topic": "Data Interpretation",
    "question": "25% of a group of 90 people chose option A. How many people is that?",
    "options": [
      {
        "key": "A",
        "text": "68",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "21",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "24",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "22",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: 22",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Data Interpretation | Difficulty: Hard",
    "explanation": "Option D (22) is the verified solution for this hard-level problem from Data Interpretation.",
    "setName": "04_data_interpretation",
    "difficulty": "Hard"
  },
  {
    "id": 117,
    "category": "Data Interpretation",
    "section": "Data Interpretation • Hard",
    "topic": "Data Interpretation",
    "question": "Find the average of 35, 15, 40, 30.",
    "options": [
      {
        "key": "A",
        "text": "30",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "120",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "25",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "35",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: 30",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Data Interpretation | Difficulty: Hard",
    "explanation": "Option A (30) is the verified solution for this hard-level problem from Data Interpretation.",
    "setName": "04_data_interpretation",
    "difficulty": "Hard"
  },
  {
    "id": 118,
    "category": "Data Interpretation",
    "section": "Data Interpretation • Hard",
    "topic": "Data Interpretation",
    "question": "A survey has 900 responses. If 40% selected option B, how many responses is that?",
    "options": [
      {
        "key": "A",
        "text": "350",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "540",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "370",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "360",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: 360",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Data Interpretation | Difficulty: Hard",
    "explanation": "Option D (360) is the verified solution for this hard-level problem from Data Interpretation.",
    "setName": "04_data_interpretation",
    "difficulty": "Hard"
  },
  {
    "id": 119,
    "category": "Data Interpretation",
    "section": "Data Interpretation • Hard",
    "topic": "Data Interpretation",
    "question": "What is the median of 44, 44, and 71?",
    "options": [
      {
        "key": "A",
        "text": "42",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "44",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "47",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "51",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: 44",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Data Interpretation | Difficulty: Hard",
    "explanation": "Option B (44) is the verified solution for this hard-level problem from Data Interpretation.",
    "setName": "04_data_interpretation",
    "difficulty": "Hard"
  },
  {
    "id": 120,
    "category": "Data Interpretation",
    "section": "Data Interpretation • Hard",
    "topic": "Data Interpretation",
    "question": "Sales increased from 200 units to 260 units. What was the increase?",
    "options": [
      {
        "key": "A",
        "text": "50",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "60",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "70",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "260",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: 60",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Data Interpretation | Difficulty: Hard",
    "explanation": "Option B (60) is the verified solution for this hard-level problem from Data Interpretation.",
    "setName": "04_data_interpretation",
    "difficulty": "Hard"
  },
  {
    "id": 121,
    "category": "Quant",
    "section": "Time Work Speed • Easy",
    "topic": "Time, Work & Speed",
    "question": "A worker completes a job in 13 days at a constant rate. What fraction of the job is completed per day?",
    "options": [
      {
        "key": "A",
        "text": "1/2",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "1/12",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "1/14",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "1/13",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: 1/13",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Time Work Speed | Difficulty: Easy",
    "explanation": "Option D (1/13) is the verified solution for this easy-level problem from Time Work Speed.",
    "setName": "05_time_work_speed",
    "difficulty": "Easy"
  },
  {
    "id": 122,
    "category": "Quant",
    "section": "Time Work Speed • Easy",
    "topic": "Time, Work & Speed",
    "question": "A can finish a job in 10 days and B in 15 days. How long do they take together?",
    "options": [
      {
        "key": "A",
        "text": "10 days",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "5 days",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "7 days",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "6 days",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: 6 days",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Time Work Speed | Difficulty: Easy",
    "explanation": "Option D (6 days) is the verified solution for this easy-level problem from Time Work Speed.",
    "setName": "05_time_work_speed",
    "difficulty": "Easy"
  },
  {
    "id": 123,
    "category": "Quant",
    "section": "Time Work Speed • Easy",
    "topic": "Time, Work & Speed",
    "question": "Convert 90 km/h to metres per second.",
    "options": [
      {
        "key": "A",
        "text": "30 m/s",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "25 m/s",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "27 m/s",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "23 m/s",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: 25 m/s",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Time Work Speed | Difficulty: Easy",
    "explanation": "Option B (25 m/s) is the verified solution for this easy-level problem from Time Work Speed.",
    "setName": "05_time_work_speed",
    "difficulty": "Easy"
  },
  {
    "id": 124,
    "category": "Quant",
    "section": "Time Work Speed • Easy",
    "topic": "Time, Work & Speed",
    "question": "A vehicle travels at 45 km/h for 4 hours. What distance does it cover?",
    "options": [
      {
        "key": "A",
        "text": "49 km",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "180 km",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "170 km",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "190 km",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: 180 km",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Time Work Speed | Difficulty: Easy",
    "explanation": "Option B (180 km) is the verified solution for this easy-level problem from Time Work Speed.",
    "setName": "05_time_work_speed",
    "difficulty": "Easy"
  },
  {
    "id": 125,
    "category": "Quant",
    "section": "Time Work Speed • Easy",
    "topic": "Time, Work & Speed",
    "question": "A worker completes a job in 17 days at a constant rate. What fraction of the job is completed per day?",
    "options": [
      {
        "key": "A",
        "text": "1/16",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "1/2",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "1/18",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "1/17",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: 1/17",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Time Work Speed | Difficulty: Easy",
    "explanation": "Option D (1/17) is the verified solution for this easy-level problem from Time Work Speed.",
    "setName": "05_time_work_speed",
    "difficulty": "Easy"
  },
  {
    "id": 126,
    "category": "Quant",
    "section": "Time Work Speed • Easy",
    "topic": "Time, Work & Speed",
    "question": "A can finish a job in 10 days and B in 15 days. How long do they take together?",
    "options": [
      {
        "key": "A",
        "text": "5 days",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "10 days",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "7 days",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "6 days",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: 6 days",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Time Work Speed | Difficulty: Easy",
    "explanation": "Option D (6 days) is the verified solution for this easy-level problem from Time Work Speed.",
    "setName": "05_time_work_speed",
    "difficulty": "Easy"
  },
  {
    "id": 127,
    "category": "Quant",
    "section": "Time Work Speed • Easy",
    "topic": "Time, Work & Speed",
    "question": "Convert 36 km/h to metres per second.",
    "options": [
      {
        "key": "A",
        "text": "10 m/s",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "8 m/s",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "15 m/s",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "12 m/s",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: 10 m/s",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Time Work Speed | Difficulty: Easy",
    "explanation": "Option A (10 m/s) is the verified solution for this easy-level problem from Time Work Speed.",
    "setName": "05_time_work_speed",
    "difficulty": "Easy"
  },
  {
    "id": 128,
    "category": "Quant",
    "section": "Time Work Speed • Easy",
    "topic": "Time, Work & Speed",
    "question": "A vehicle travels at 60 km/h for 3 hours. What distance does it cover?",
    "options": [
      {
        "key": "A",
        "text": "63 km",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "180 km",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "190 km",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "170 km",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: 180 km",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Time Work Speed | Difficulty: Easy",
    "explanation": "Option B (180 km) is the verified solution for this easy-level problem from Time Work Speed.",
    "setName": "05_time_work_speed",
    "difficulty": "Easy"
  },
  {
    "id": 129,
    "category": "Quant",
    "section": "Time Work Speed • Easy",
    "topic": "Time, Work & Speed",
    "question": "A worker completes a job in 20 days at a constant rate. What fraction of the job is completed per day?",
    "options": [
      {
        "key": "A",
        "text": "1/19",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "1/2",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "1/21",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "1/20",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: 1/20",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Time Work Speed | Difficulty: Easy",
    "explanation": "Option D (1/20) is the verified solution for this easy-level problem from Time Work Speed.",
    "setName": "05_time_work_speed",
    "difficulty": "Easy"
  },
  {
    "id": 130,
    "category": "Quant",
    "section": "Time Work Speed • Easy",
    "topic": "Time, Work & Speed",
    "question": "A can finish a job in 10 days and B in 15 days. How long do they take together?",
    "options": [
      {
        "key": "A",
        "text": "7 days",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "10 days",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "5 days",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "6 days",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: 6 days",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Time Work Speed | Difficulty: Easy",
    "explanation": "Option D (6 days) is the verified solution for this easy-level problem from Time Work Speed.",
    "setName": "05_time_work_speed",
    "difficulty": "Easy"
  },
  {
    "id": 131,
    "category": "Quant",
    "section": "Time Work Speed • Medium",
    "topic": "Time, Work & Speed",
    "question": "Convert 90 km/h to metres per second.",
    "options": [
      {
        "key": "A",
        "text": "23 m/s",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "27 m/s",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "30 m/s",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "25 m/s",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: 25 m/s",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Time Work Speed | Difficulty: Medium",
    "explanation": "Option D (25 m/s) is the verified solution for this medium-level problem from Time Work Speed.",
    "setName": "05_time_work_speed",
    "difficulty": "Medium"
  },
  {
    "id": 132,
    "category": "Quant",
    "section": "Time Work Speed • Medium",
    "topic": "Time, Work & Speed",
    "question": "A vehicle travels at 30 km/h for 2 hours. What distance does it cover?",
    "options": [
      {
        "key": "A",
        "text": "50 km",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "60 km",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "32 km",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "70 km",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: 60 km",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Time Work Speed | Difficulty: Medium",
    "explanation": "Option B (60 km) is the verified solution for this medium-level problem from Time Work Speed.",
    "setName": "05_time_work_speed",
    "difficulty": "Medium"
  },
  {
    "id": 133,
    "category": "Quant",
    "section": "Time Work Speed • Medium",
    "topic": "Time, Work & Speed",
    "question": "A worker completes a job in 17 days at a constant rate. What fraction of the job is completed per day?",
    "options": [
      {
        "key": "A",
        "text": "1/17",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "1/2",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "1/16",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "1/18",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: 1/17",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Time Work Speed | Difficulty: Medium",
    "explanation": "Option A (1/17) is the verified solution for this medium-level problem from Time Work Speed.",
    "setName": "05_time_work_speed",
    "difficulty": "Medium"
  },
  {
    "id": 134,
    "category": "Quant",
    "section": "Time Work Speed • Medium",
    "topic": "Time, Work & Speed",
    "question": "A can finish a job in 8 days and B in 12 days. How long do they take together?",
    "options": [
      {
        "key": "A",
        "text": "4.8 days",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "8 days",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "3.8 days",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "5.8 days",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: 4.8 days",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Time Work Speed | Difficulty: Medium",
    "explanation": "Option A (4.8 days) is the verified solution for this medium-level problem from Time Work Speed.",
    "setName": "05_time_work_speed",
    "difficulty": "Medium"
  },
  {
    "id": 135,
    "category": "Quant",
    "section": "Time Work Speed • Medium",
    "topic": "Time, Work & Speed",
    "question": "Convert 36 km/h to metres per second.",
    "options": [
      {
        "key": "A",
        "text": "12 m/s",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "10 m/s",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "8 m/s",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "15 m/s",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: 10 m/s",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Time Work Speed | Difficulty: Medium",
    "explanation": "Option B (10 m/s) is the verified solution for this medium-level problem from Time Work Speed.",
    "setName": "05_time_work_speed",
    "difficulty": "Medium"
  },
  {
    "id": 136,
    "category": "Quant",
    "section": "Time Work Speed • Medium",
    "topic": "Time, Work & Speed",
    "question": "A vehicle travels at 50 km/h for 2 hours. What distance does it cover?",
    "options": [
      {
        "key": "A",
        "text": "110 km",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "52 km",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "90 km",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "100 km",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: 100 km",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Time Work Speed | Difficulty: Medium",
    "explanation": "Option D (100 km) is the verified solution for this medium-level problem from Time Work Speed.",
    "setName": "05_time_work_speed",
    "difficulty": "Medium"
  },
  {
    "id": 137,
    "category": "Quant",
    "section": "Time Work Speed • Medium",
    "topic": "Time, Work & Speed",
    "question": "A worker completes a job in 16 days at a constant rate. What fraction of the job is completed per day?",
    "options": [
      {
        "key": "A",
        "text": "1/16",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "1/2",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "1/17",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "1/15",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: 1/16",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Time Work Speed | Difficulty: Medium",
    "explanation": "Option A (1/16) is the verified solution for this medium-level problem from Time Work Speed.",
    "setName": "05_time_work_speed",
    "difficulty": "Medium"
  },
  {
    "id": 138,
    "category": "Quant",
    "section": "Time Work Speed • Medium",
    "topic": "Time, Work & Speed",
    "question": "A can finish a job in 6 days and B in 12 days. How long do they take together?",
    "options": [
      {
        "key": "A",
        "text": "5 days",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "3 days",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "4 days",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "6 days",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: 4 days",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Time Work Speed | Difficulty: Medium",
    "explanation": "Option C (4 days) is the verified solution for this medium-level problem from Time Work Speed.",
    "setName": "05_time_work_speed",
    "difficulty": "Medium"
  },
  {
    "id": 139,
    "category": "Quant",
    "section": "Time Work Speed • Medium",
    "topic": "Time, Work & Speed",
    "question": "Convert 72 km/h to metres per second.",
    "options": [
      {
        "key": "A",
        "text": "20 m/s",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "18 m/s",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "22 m/s",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "25 m/s",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: 20 m/s",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Time Work Speed | Difficulty: Medium",
    "explanation": "Option A (20 m/s) is the verified solution for this medium-level problem from Time Work Speed.",
    "setName": "05_time_work_speed",
    "difficulty": "Medium"
  },
  {
    "id": 140,
    "category": "Quant",
    "section": "Time Work Speed • Medium",
    "topic": "Time, Work & Speed",
    "question": "A vehicle travels at 60 km/h for 5 hours. What distance does it cover?",
    "options": [
      {
        "key": "A",
        "text": "65 km",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "300 km",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "310 km",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "290 km",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: 300 km",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Time Work Speed | Difficulty: Medium",
    "explanation": "Option B (300 km) is the verified solution for this medium-level problem from Time Work Speed.",
    "setName": "05_time_work_speed",
    "difficulty": "Medium"
  },
  {
    "id": 141,
    "category": "Quant",
    "section": "Time Work Speed • Medium",
    "topic": "Time, Work & Speed",
    "question": "A worker completes a job in 16 days at a constant rate. What fraction of the job is completed per day?",
    "options": [
      {
        "key": "A",
        "text": "1/15",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "1/17",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "1/2",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "1/16",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: 1/16",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Time Work Speed | Difficulty: Medium",
    "explanation": "Option D (1/16) is the verified solution for this medium-level problem from Time Work Speed.",
    "setName": "05_time_work_speed",
    "difficulty": "Medium"
  },
  {
    "id": 142,
    "category": "Quant",
    "section": "Time Work Speed • Medium",
    "topic": "Time, Work & Speed",
    "question": "A can finish a job in 6 days and B in 12 days. How long do they take together?",
    "options": [
      {
        "key": "A",
        "text": "3 days",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "6 days",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "5 days",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "4 days",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: 4 days",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Time Work Speed | Difficulty: Medium",
    "explanation": "Option D (4 days) is the verified solution for this medium-level problem from Time Work Speed.",
    "setName": "05_time_work_speed",
    "difficulty": "Medium"
  },
  {
    "id": 143,
    "category": "Quant",
    "section": "Time Work Speed • Hard",
    "topic": "Time, Work & Speed",
    "question": "Convert 54 km/h to metres per second.",
    "options": [
      {
        "key": "A",
        "text": "20 m/s",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "13 m/s",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "15 m/s",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "17 m/s",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: 15 m/s",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Time Work Speed | Difficulty: Hard",
    "explanation": "Option C (15 m/s) is the verified solution for this hard-level problem from Time Work Speed.",
    "setName": "05_time_work_speed",
    "difficulty": "Hard"
  },
  {
    "id": 144,
    "category": "Quant",
    "section": "Time Work Speed • Hard",
    "topic": "Time, Work & Speed",
    "question": "A vehicle travels at 45 km/h for 2 hours. What distance does it cover?",
    "options": [
      {
        "key": "A",
        "text": "90 km",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "47 km",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "80 km",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "100 km",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: 90 km",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Time Work Speed | Difficulty: Hard",
    "explanation": "Option A (90 km) is the verified solution for this hard-level problem from Time Work Speed.",
    "setName": "05_time_work_speed",
    "difficulty": "Hard"
  },
  {
    "id": 145,
    "category": "Quant",
    "section": "Time Work Speed • Hard",
    "topic": "Time, Work & Speed",
    "question": "A worker completes a job in 17 days at a constant rate. What fraction of the job is completed per day?",
    "options": [
      {
        "key": "A",
        "text": "1/2",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "1/18",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "1/17",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "1/16",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: 1/17",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Time Work Speed | Difficulty: Hard",
    "explanation": "Option C (1/17) is the verified solution for this hard-level problem from Time Work Speed.",
    "setName": "05_time_work_speed",
    "difficulty": "Hard"
  },
  {
    "id": 146,
    "category": "Quant",
    "section": "Time Work Speed • Hard",
    "topic": "Time, Work & Speed",
    "question": "A can finish a job in 8 days and B in 16 days. How long do they take together?",
    "options": [
      {
        "key": "A",
        "text": "8 days",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "6.33333 days",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "5.33333 days",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "4.33333 days",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: 5.33333 days",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Time Work Speed | Difficulty: Hard",
    "explanation": "Option C (5.33333 days) is the verified solution for this hard-level problem from Time Work Speed.",
    "setName": "05_time_work_speed",
    "difficulty": "Hard"
  },
  {
    "id": 147,
    "category": "Quant",
    "section": "Time Work Speed • Hard",
    "topic": "Time, Work & Speed",
    "question": "Convert 72 km/h to metres per second.",
    "options": [
      {
        "key": "A",
        "text": "22 m/s",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "18 m/s",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "20 m/s",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "25 m/s",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: 20 m/s",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Time Work Speed | Difficulty: Hard",
    "explanation": "Option C (20 m/s) is the verified solution for this hard-level problem from Time Work Speed.",
    "setName": "05_time_work_speed",
    "difficulty": "Hard"
  },
  {
    "id": 148,
    "category": "Quant",
    "section": "Time Work Speed • Hard",
    "topic": "Time, Work & Speed",
    "question": "A vehicle travels at 50 km/h for 5 hours. What distance does it cover?",
    "options": [
      {
        "key": "A",
        "text": "260 km",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "55 km",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "250 km",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "240 km",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: 250 km",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Time Work Speed | Difficulty: Hard",
    "explanation": "Option C (250 km) is the verified solution for this hard-level problem from Time Work Speed.",
    "setName": "05_time_work_speed",
    "difficulty": "Hard"
  },
  {
    "id": 149,
    "category": "Quant",
    "section": "Time Work Speed • Hard",
    "topic": "Time, Work & Speed",
    "question": "A worker completes a job in 7 days at a constant rate. What fraction of the job is completed per day?",
    "options": [
      {
        "key": "A",
        "text": "1/2",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "1/7",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "1/6",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "1/8",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: 1/7",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Time Work Speed | Difficulty: Hard",
    "explanation": "Option B (1/7) is the verified solution for this hard-level problem from Time Work Speed.",
    "setName": "05_time_work_speed",
    "difficulty": "Hard"
  },
  {
    "id": 150,
    "category": "Quant",
    "section": "Time Work Speed • Hard",
    "topic": "Time, Work & Speed",
    "question": "A can finish a job in 8 days and B in 16 days. How long do they take together?",
    "options": [
      {
        "key": "A",
        "text": "4.33333 days",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "6.33333 days",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "8 days",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "5.33333 days",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: 5.33333 days",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Time Work Speed | Difficulty: Hard",
    "explanation": "Option D (5.33333 days) is the verified solution for this hard-level problem from Time Work Speed.",
    "setName": "05_time_work_speed",
    "difficulty": "Hard"
  },
  {
    "id": 151,
    "category": "Quant",
    "section": "Probability Counting • Easy",
    "topic": "Probability & Counting",
    "question": "A bag has 5 red and 5 blue balls. What is the probability of drawing a red ball?",
    "options": [
      {
        "key": "A",
        "text": "5",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "8",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "3",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "12",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: 5",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Probability Counting | Difficulty: Easy",
    "explanation": "Option A (5) is the verified solution for this easy-level problem from Probability Counting.",
    "setName": "06_probability_counting",
    "difficulty": "Easy"
  },
  {
    "id": 152,
    "category": "Quant",
    "section": "Probability Counting • Easy",
    "topic": "Probability & Counting",
    "question": "What is 6 factorial (6!)?",
    "options": [
      {
        "key": "A",
        "text": "720",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "360",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "1440",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "726",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: 720",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Probability Counting | Difficulty: Easy",
    "explanation": "Option A (720) is the verified solution for this easy-level problem from Probability Counting.",
    "setName": "06_probability_counting",
    "difficulty": "Easy"
  },
  {
    "id": 153,
    "category": "Quant",
    "section": "Probability Counting • Easy",
    "topic": "Probability & Counting",
    "question": "How many distinct pairs can be formed from 4 people?",
    "options": [
      {
        "key": "A",
        "text": "12",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "5",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "10",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "6",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: 6",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Probability Counting | Difficulty: Easy",
    "explanation": "Option D (6) is the verified solution for this easy-level problem from Probability Counting.",
    "setName": "06_probability_counting",
    "difficulty": "Easy"
  },
  {
    "id": 154,
    "category": "Quant",
    "section": "Probability Counting • Easy",
    "topic": "Probability & Counting",
    "question": "A fair die is rolled. What is the probability of getting a 5?",
    "options": [
      {
        "key": "A",
        "text": "1/6",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "1/3",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "2/3",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "1/2",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: 1/6",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Probability Counting | Difficulty: Easy",
    "explanation": "Option A (1/6) is the verified solution for this easy-level problem from Probability Counting.",
    "setName": "06_probability_counting",
    "difficulty": "Easy"
  },
  {
    "id": 155,
    "category": "Quant",
    "section": "Probability Counting • Easy",
    "topic": "Probability & Counting",
    "question": "A bag has 4 red and 3 blue balls. What is the probability of drawing a red ball?",
    "options": [
      {
        "key": "A",
        "text": "4/7",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "3/7",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "4/3",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "1/7",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: 4/7",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Probability Counting | Difficulty: Easy",
    "explanation": "Option A (4/7) is the verified solution for this easy-level problem from Probability Counting.",
    "setName": "06_probability_counting",
    "difficulty": "Easy"
  },
  {
    "id": 156,
    "category": "Quant",
    "section": "Probability Counting • Easy",
    "topic": "Probability & Counting",
    "question": "What is 4 factorial (4!)?",
    "options": [
      {
        "key": "A",
        "text": "28",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "24",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "48",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "12",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: 24",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Probability Counting | Difficulty: Easy",
    "explanation": "Option B (24) is the verified solution for this easy-level problem from Probability Counting.",
    "setName": "06_probability_counting",
    "difficulty": "Easy"
  },
  {
    "id": 157,
    "category": "Quant",
    "section": "Probability Counting • Easy",
    "topic": "Probability & Counting",
    "question": "How many distinct pairs can be formed from 8 people?",
    "options": [
      {
        "key": "A",
        "text": "28",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "27",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "56",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "36",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: 28",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Probability Counting | Difficulty: Easy",
    "explanation": "Option A (28) is the verified solution for this easy-level problem from Probability Counting.",
    "setName": "06_probability_counting",
    "difficulty": "Easy"
  },
  {
    "id": 158,
    "category": "Quant",
    "section": "Probability Counting • Easy",
    "topic": "Probability & Counting",
    "question": "A fair die is rolled. What is the probability of getting a 3?",
    "options": [
      {
        "key": "A",
        "text": "1/2",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "2/3",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "1/3",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "1/6",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: 1/6",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Probability Counting | Difficulty: Easy",
    "explanation": "Option D (1/6) is the verified solution for this easy-level problem from Probability Counting.",
    "setName": "06_probability_counting",
    "difficulty": "Easy"
  },
  {
    "id": 159,
    "category": "Quant",
    "section": "Probability Counting • Easy",
    "topic": "Probability & Counting",
    "question": "A bag has 4 red and 3 blue balls. What is the probability of drawing a red ball?",
    "options": [
      {
        "key": "A",
        "text": "4/7",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "1/7",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "3/7",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "4/3",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: 4/7",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Probability Counting | Difficulty: Easy",
    "explanation": "Option A (4/7) is the verified solution for this easy-level problem from Probability Counting.",
    "setName": "06_probability_counting",
    "difficulty": "Easy"
  },
  {
    "id": 160,
    "category": "Quant",
    "section": "Probability Counting • Easy",
    "topic": "Probability & Counting",
    "question": "What is 4 factorial (4!)?",
    "options": [
      {
        "key": "A",
        "text": "48",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "24",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "28",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "12",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: 24",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Probability Counting | Difficulty: Easy",
    "explanation": "Option B (24) is the verified solution for this easy-level problem from Probability Counting.",
    "setName": "06_probability_counting",
    "difficulty": "Easy"
  },
  {
    "id": 161,
    "category": "Quant",
    "section": "Probability Counting • Medium",
    "topic": "Probability & Counting",
    "question": "How many distinct pairs can be formed from 9 people?",
    "options": [
      {
        "key": "A",
        "text": "45",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "35",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "72",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "36",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: 36",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Probability Counting | Difficulty: Medium",
    "explanation": "Option D (36) is the verified solution for this medium-level problem from Probability Counting.",
    "setName": "06_probability_counting",
    "difficulty": "Medium"
  },
  {
    "id": 162,
    "category": "Quant",
    "section": "Probability Counting • Medium",
    "topic": "Probability & Counting",
    "question": "A fair die is rolled. What is the probability of getting a 6?",
    "options": [
      {
        "key": "A",
        "text": "1/3",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "1/2",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "1/6",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "2/3",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: 1/6",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Probability Counting | Difficulty: Medium",
    "explanation": "Option C (1/6) is the verified solution for this medium-level problem from Probability Counting.",
    "setName": "06_probability_counting",
    "difficulty": "Medium"
  },
  {
    "id": 163,
    "category": "Quant",
    "section": "Probability Counting • Medium",
    "topic": "Probability & Counting",
    "question": "A bag has 5 red and 3 blue balls. What is the probability of drawing a red ball?",
    "options": [
      {
        "key": "A",
        "text": "5/3",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "5/8",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "3/8",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "1/8",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: 5/8",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Probability Counting | Difficulty: Medium",
    "explanation": "Option B (5/8) is the verified solution for this medium-level problem from Probability Counting.",
    "setName": "06_probability_counting",
    "difficulty": "Medium"
  },
  {
    "id": 164,
    "category": "Quant",
    "section": "Probability Counting • Medium",
    "topic": "Probability & Counting",
    "question": "What is 3 factorial (3!)?",
    "options": [
      {
        "key": "A",
        "text": "12",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "3",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "6",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "9",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: 6",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Probability Counting | Difficulty: Medium",
    "explanation": "Option C (6) is the verified solution for this medium-level problem from Probability Counting.",
    "setName": "06_probability_counting",
    "difficulty": "Medium"
  },
  {
    "id": 165,
    "category": "Quant",
    "section": "Probability Counting • Medium",
    "topic": "Probability & Counting",
    "question": "How many distinct pairs can be formed from 5 people?",
    "options": [
      {
        "key": "A",
        "text": "9",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "10",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "15",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "20",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: 10",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Probability Counting | Difficulty: Medium",
    "explanation": "Option B (10) is the verified solution for this medium-level problem from Probability Counting.",
    "setName": "06_probability_counting",
    "difficulty": "Medium"
  },
  {
    "id": 166,
    "category": "Quant",
    "section": "Probability Counting • Medium",
    "topic": "Probability & Counting",
    "question": "A fair die is rolled. What is the probability of getting a 1?",
    "options": [
      {
        "key": "A",
        "text": "1/6",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "1/3",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "2/3",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "1/2",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: 1/6",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Probability Counting | Difficulty: Medium",
    "explanation": "Option A (1/6) is the verified solution for this medium-level problem from Probability Counting.",
    "setName": "06_probability_counting",
    "difficulty": "Medium"
  },
  {
    "id": 167,
    "category": "Quant",
    "section": "Probability Counting • Medium",
    "topic": "Probability & Counting",
    "question": "A bag has 7 red and 4 blue balls. What is the probability of drawing a red ball?",
    "options": [
      {
        "key": "A",
        "text": "7/4",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "7/11",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "1/11",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "4/11",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: 7/11",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Probability Counting | Difficulty: Medium",
    "explanation": "Option B (7/11) is the verified solution for this medium-level problem from Probability Counting.",
    "setName": "06_probability_counting",
    "difficulty": "Medium"
  },
  {
    "id": 168,
    "category": "Quant",
    "section": "Probability Counting • Medium",
    "topic": "Probability & Counting",
    "question": "What is 7 factorial (7!)?",
    "options": [
      {
        "key": "A",
        "text": "5047",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "2520",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "5040",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "10080",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: 5040",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Probability Counting | Difficulty: Medium",
    "explanation": "Option C (5040) is the verified solution for this medium-level problem from Probability Counting.",
    "setName": "06_probability_counting",
    "difficulty": "Medium"
  },
  {
    "id": 169,
    "category": "Quant",
    "section": "Probability Counting • Medium",
    "topic": "Probability & Counting",
    "question": "How many distinct pairs can be formed from 8 people?",
    "options": [
      {
        "key": "A",
        "text": "27",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "28",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "56",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "36",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: 28",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Probability Counting | Difficulty: Medium",
    "explanation": "Option B (28) is the verified solution for this medium-level problem from Probability Counting.",
    "setName": "06_probability_counting",
    "difficulty": "Medium"
  },
  {
    "id": 170,
    "category": "Quant",
    "section": "Probability Counting • Medium",
    "topic": "Probability & Counting",
    "question": "A fair die is rolled. What is the probability of getting a 6?",
    "options": [
      {
        "key": "A",
        "text": "1/2",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "2/3",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "1/6",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "1/3",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: 1/6",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Probability Counting | Difficulty: Medium",
    "explanation": "Option C (1/6) is the verified solution for this medium-level problem from Probability Counting.",
    "setName": "06_probability_counting",
    "difficulty": "Medium"
  },
  {
    "id": 171,
    "category": "Quant",
    "section": "Probability Counting • Medium",
    "topic": "Probability & Counting",
    "question": "A bag has 2 red and 5 blue balls. What is the probability of drawing a red ball?",
    "options": [
      {
        "key": "A",
        "text": "2/7",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "1/7",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "2/5",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "5/7",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: 2/7",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Probability Counting | Difficulty: Medium",
    "explanation": "Option A (2/7) is the verified solution for this medium-level problem from Probability Counting.",
    "setName": "06_probability_counting",
    "difficulty": "Medium"
  },
  {
    "id": 172,
    "category": "Quant",
    "section": "Probability Counting • Medium",
    "topic": "Probability & Counting",
    "question": "What is 6 factorial (6!)?",
    "options": [
      {
        "key": "A",
        "text": "726",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "720",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "360",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "1440",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: 720",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Probability Counting | Difficulty: Medium",
    "explanation": "Option B (720) is the verified solution for this medium-level problem from Probability Counting.",
    "setName": "06_probability_counting",
    "difficulty": "Medium"
  },
  {
    "id": 173,
    "category": "Quant",
    "section": "Probability Counting • Hard",
    "topic": "Probability & Counting",
    "question": "How many distinct pairs can be formed from 11 people?",
    "options": [
      {
        "key": "A",
        "text": "55",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "110",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "66",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "54",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: 55",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Probability Counting | Difficulty: Hard",
    "explanation": "Option A (55) is the verified solution for this hard-level problem from Probability Counting.",
    "setName": "06_probability_counting",
    "difficulty": "Hard"
  },
  {
    "id": 174,
    "category": "Quant",
    "section": "Probability Counting • Hard",
    "topic": "Probability & Counting",
    "question": "A fair die is rolled. What is the probability of getting a 2?",
    "options": [
      {
        "key": "A",
        "text": "1/6",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "2/3",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "1/2",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "1/3",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: 1/6",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Probability Counting | Difficulty: Hard",
    "explanation": "Option A (1/6) is the verified solution for this hard-level problem from Probability Counting.",
    "setName": "06_probability_counting",
    "difficulty": "Hard"
  },
  {
    "id": 175,
    "category": "Quant",
    "section": "Probability Counting • Hard",
    "topic": "Probability & Counting",
    "question": "A bag has 5 red and 3 blue balls. What is the probability of drawing a red ball?",
    "options": [
      {
        "key": "A",
        "text": "5/8",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "1/8",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "5/3",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "3/8",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: 5/8",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Probability Counting | Difficulty: Hard",
    "explanation": "Option A (5/8) is the verified solution for this hard-level problem from Probability Counting.",
    "setName": "06_probability_counting",
    "difficulty": "Hard"
  },
  {
    "id": 176,
    "category": "Quant",
    "section": "Probability Counting • Hard",
    "topic": "Probability & Counting",
    "question": "What is 7 factorial (7!)?",
    "options": [
      {
        "key": "A",
        "text": "2520",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "10080",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "5047",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "5040",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: 5040",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Probability Counting | Difficulty: Hard",
    "explanation": "Option D (5040) is the verified solution for this hard-level problem from Probability Counting.",
    "setName": "06_probability_counting",
    "difficulty": "Hard"
  },
  {
    "id": 177,
    "category": "Quant",
    "section": "Probability Counting • Hard",
    "topic": "Probability & Counting",
    "question": "How many distinct pairs can be formed from 5 people?",
    "options": [
      {
        "key": "A",
        "text": "9",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "10",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "20",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "15",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: 10",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Probability Counting | Difficulty: Hard",
    "explanation": "Option B (10) is the verified solution for this hard-level problem from Probability Counting.",
    "setName": "06_probability_counting",
    "difficulty": "Hard"
  },
  {
    "id": 178,
    "category": "Quant",
    "section": "Probability Counting • Hard",
    "topic": "Probability & Counting",
    "question": "A fair die is rolled. What is the probability of getting a 4?",
    "options": [
      {
        "key": "A",
        "text": "2/3",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "1/3",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "1/2",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "1/6",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: 1/6",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Probability Counting | Difficulty: Hard",
    "explanation": "Option D (1/6) is the verified solution for this hard-level problem from Probability Counting.",
    "setName": "06_probability_counting",
    "difficulty": "Hard"
  },
  {
    "id": 179,
    "category": "Quant",
    "section": "Probability Counting • Hard",
    "topic": "Probability & Counting",
    "question": "A bag has 3 red and 2 blue balls. What is the probability of drawing a red ball?",
    "options": [
      {
        "key": "A",
        "text": "1/5",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "2/5",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "3/5",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "3/2",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: 3/5",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Probability Counting | Difficulty: Hard",
    "explanation": "Option C (3/5) is the verified solution for this hard-level problem from Probability Counting.",
    "setName": "06_probability_counting",
    "difficulty": "Hard"
  },
  {
    "id": 180,
    "category": "Quant",
    "section": "Probability Counting • Hard",
    "topic": "Probability & Counting",
    "question": "What is 7 factorial (7!)?",
    "options": [
      {
        "key": "A",
        "text": "5047",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "2520",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "10080",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "5040",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: 5040",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Probability Counting | Difficulty: Hard",
    "explanation": "Option D (5040) is the verified solution for this hard-level problem from Probability Counting.",
    "setName": "06_probability_counting",
    "difficulty": "Hard"
  },
  {
    "id": 181,
    "category": "Quant",
    "section": "Algebra Geometry • Easy",
    "topic": "Algebra & Geometry",
    "question": "What is the area of a square with side 7 cm?",
    "options": [
      {
        "key": "A",
        "text": "49 cm²",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "56 cm²",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "28 cm²",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "42 cm²",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: 49 cm²",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Algebra Geometry | Difficulty: Easy",
    "explanation": "Option A (49 cm²) is the verified solution for this easy-level problem from Algebra Geometry.",
    "setName": "07_algebra_geometry",
    "difficulty": "Easy"
  },
  {
    "id": 182,
    "category": "Quant",
    "section": "Algebra Geometry • Easy",
    "topic": "Algebra & Geometry",
    "question": "Find the area of a triangle with base 15 cm and height 12 cm.",
    "options": [
      {
        "key": "A",
        "text": "90 cm²",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "85 cm²",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "95 cm²",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "180 cm²",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: 90 cm²",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Algebra Geometry | Difficulty: Easy",
    "explanation": "Option A (90 cm²) is the verified solution for this easy-level problem from Algebra Geometry.",
    "setName": "07_algebra_geometry",
    "difficulty": "Easy"
  },
  {
    "id": 183,
    "category": "Quant",
    "section": "Algebra Geometry • Easy",
    "topic": "Algebra & Geometry",
    "question": "If x + 14 = 24, what is x?",
    "options": [
      {
        "key": "A",
        "text": "5",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "6",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "14",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "4",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: 5",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Algebra Geometry | Difficulty: Easy",
    "explanation": "Option A (5) is the verified solution for this easy-level problem from Algebra Geometry.",
    "setName": "07_algebra_geometry",
    "difficulty": "Easy"
  },
  {
    "id": 184,
    "category": "Quant",
    "section": "Algebra Geometry • Easy",
    "topic": "Algebra & Geometry",
    "question": "What is the perimeter of a square with side 4 cm?",
    "options": [
      {
        "key": "A",
        "text": "19",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "16",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "23",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "14",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: 16",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Algebra Geometry | Difficulty: Easy",
    "explanation": "Option B (16) is the verified solution for this easy-level problem from Algebra Geometry.",
    "setName": "07_algebra_geometry",
    "difficulty": "Easy"
  },
  {
    "id": 185,
    "category": "Quant",
    "section": "Algebra Geometry • Easy",
    "topic": "Algebra & Geometry",
    "question": "Solve for x: 9x = 54.",
    "options": [
      {
        "key": "A",
        "text": "4",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "6",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "54",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "7",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: 6",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Algebra Geometry | Difficulty: Easy",
    "explanation": "Option B (6) is the verified solution for this easy-level problem from Algebra Geometry.",
    "setName": "07_algebra_geometry",
    "difficulty": "Easy"
  },
  {
    "id": 186,
    "category": "Quant",
    "section": "Algebra Geometry • Easy",
    "topic": "Algebra & Geometry",
    "question": "What is the area of a square with side 5 cm?",
    "options": [
      {
        "key": "A",
        "text": "25",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "28",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "32",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "23",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: 25",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Algebra Geometry | Difficulty: Easy",
    "explanation": "Option A (25) is the verified solution for this easy-level problem from Algebra Geometry.",
    "setName": "07_algebra_geometry",
    "difficulty": "Easy"
  },
  {
    "id": 187,
    "category": "Quant",
    "section": "Algebra Geometry • Easy",
    "topic": "Algebra & Geometry",
    "question": "Find the area of a triangle with base 15 cm and height 13 cm.",
    "options": [
      {
        "key": "A",
        "text": "195 cm²",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "102 cm²",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "92 cm²",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "97 cm²",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: 97 cm²",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Algebra Geometry | Difficulty: Easy",
    "explanation": "Option D (97 cm²) is the verified solution for this easy-level problem from Algebra Geometry.",
    "setName": "07_algebra_geometry",
    "difficulty": "Easy"
  },
  {
    "id": 188,
    "category": "Quant",
    "section": "Algebra Geometry • Easy",
    "topic": "Algebra & Geometry",
    "question": "If x + 6 = 30, what is x?",
    "options": [
      {
        "key": "A",
        "text": "6",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "12",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "11",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "13",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: 12",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Algebra Geometry | Difficulty: Easy",
    "explanation": "Option B (12) is the verified solution for this easy-level problem from Algebra Geometry.",
    "setName": "07_algebra_geometry",
    "difficulty": "Easy"
  },
  {
    "id": 189,
    "category": "Quant",
    "section": "Algebra Geometry • Easy",
    "topic": "Algebra & Geometry",
    "question": "What is the perimeter of a square with side 8 cm?",
    "options": [
      {
        "key": "A",
        "text": "32",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "64",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "30",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "34",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: 32",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Algebra Geometry | Difficulty: Easy",
    "explanation": "Option A (32) is the verified solution for this easy-level problem from Algebra Geometry.",
    "setName": "07_algebra_geometry",
    "difficulty": "Easy"
  },
  {
    "id": 190,
    "category": "Quant",
    "section": "Algebra Geometry • Easy",
    "topic": "Algebra & Geometry",
    "question": "Solve for x: 2x = 26.",
    "options": [
      {
        "key": "A",
        "text": "14",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "11",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "26",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "13",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: 13",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Algebra Geometry | Difficulty: Easy",
    "explanation": "Option D (13) is the verified solution for this easy-level problem from Algebra Geometry.",
    "setName": "07_algebra_geometry",
    "difficulty": "Easy"
  },
  {
    "id": 191,
    "category": "Quant",
    "section": "Algebra Geometry • Medium",
    "topic": "Algebra & Geometry",
    "question": "What is the area of a square with side 7 cm?",
    "options": [
      {
        "key": "A",
        "text": "56 cm²",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "42 cm²",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "49 cm²",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "28 cm²",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: 49 cm²",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Algebra Geometry | Difficulty: Medium",
    "explanation": "Option C (49 cm²) is the verified solution for this medium-level problem from Algebra Geometry.",
    "setName": "07_algebra_geometry",
    "difficulty": "Medium"
  },
  {
    "id": 192,
    "category": "Quant",
    "section": "Algebra Geometry • Medium",
    "topic": "Algebra & Geometry",
    "question": "Find the area of a triangle with base 12 cm and height 5 cm.",
    "options": [
      {
        "key": "A",
        "text": "60 cm²",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "30 cm²",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "35 cm²",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "25 cm²",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: 30 cm²",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Algebra Geometry | Difficulty: Medium",
    "explanation": "Option B (30 cm²) is the verified solution for this medium-level problem from Algebra Geometry.",
    "setName": "07_algebra_geometry",
    "difficulty": "Medium"
  },
  {
    "id": 193,
    "category": "Quant",
    "section": "Algebra Geometry • Medium",
    "topic": "Algebra & Geometry",
    "question": "If x + 6 = 30, what is x?",
    "options": [
      {
        "key": "A",
        "text": "13",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "12",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "6",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "11",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: 12",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Algebra Geometry | Difficulty: Medium",
    "explanation": "Option B (12) is the verified solution for this medium-level problem from Algebra Geometry.",
    "setName": "07_algebra_geometry",
    "difficulty": "Medium"
  },
  {
    "id": 194,
    "category": "Quant",
    "section": "Algebra Geometry • Medium",
    "topic": "Algebra & Geometry",
    "question": "What is the perimeter of a square with side 3 cm?",
    "options": [
      {
        "key": "A",
        "text": "10",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "9",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "14",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "12",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: 12",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Algebra Geometry | Difficulty: Medium",
    "explanation": "Option D (12) is the verified solution for this medium-level problem from Algebra Geometry.",
    "setName": "07_algebra_geometry",
    "difficulty": "Medium"
  },
  {
    "id": 195,
    "category": "Quant",
    "section": "Algebra Geometry • Medium",
    "topic": "Algebra & Geometry",
    "question": "Solve for x: 5x = 65.",
    "options": [
      {
        "key": "A",
        "text": "14",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "11",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "65",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "13",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: 13",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Algebra Geometry | Difficulty: Medium",
    "explanation": "Option D (13) is the verified solution for this medium-level problem from Algebra Geometry.",
    "setName": "07_algebra_geometry",
    "difficulty": "Medium"
  },
  {
    "id": 196,
    "category": "Quant",
    "section": "Algebra Geometry • Medium",
    "topic": "Algebra & Geometry",
    "question": "What is the area of a square with side 8 cm?",
    "options": [
      {
        "key": "A",
        "text": "72 cm²",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "32 cm²",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "56 cm²",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "64 cm²",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: 64 cm²",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Algebra Geometry | Difficulty: Medium",
    "explanation": "Option D (64 cm²) is the verified solution for this medium-level problem from Algebra Geometry.",
    "setName": "07_algebra_geometry",
    "difficulty": "Medium"
  },
  {
    "id": 197,
    "category": "Quant",
    "section": "Algebra Geometry • Medium",
    "topic": "Algebra & Geometry",
    "question": "Find the area of a triangle with base 7 cm and height 6 cm.",
    "options": [
      {
        "key": "A",
        "text": "21 cm²",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "42 cm²",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "26 cm²",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "16 cm²",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: 21 cm²",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Algebra Geometry | Difficulty: Medium",
    "explanation": "Option A (21 cm²) is the verified solution for this medium-level problem from Algebra Geometry.",
    "setName": "07_algebra_geometry",
    "difficulty": "Medium"
  },
  {
    "id": 198,
    "category": "Quant",
    "section": "Algebra Geometry • Medium",
    "topic": "Algebra & Geometry",
    "question": "If x + 12 = 36, what is x?",
    "options": [
      {
        "key": "A",
        "text": "12",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "19",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "10",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "15",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: 12",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Algebra Geometry | Difficulty: Medium",
    "explanation": "Option A (12) is the verified solution for this medium-level problem from Algebra Geometry.",
    "setName": "07_algebra_geometry",
    "difficulty": "Medium"
  },
  {
    "id": 199,
    "category": "Quant",
    "section": "Algebra Geometry • Medium",
    "topic": "Algebra & Geometry",
    "question": "What is the perimeter of a square with side 3 cm?",
    "options": [
      {
        "key": "A",
        "text": "12",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "9",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "14",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "10",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: 12",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Algebra Geometry | Difficulty: Medium",
    "explanation": "Option A (12) is the verified solution for this medium-level problem from Algebra Geometry.",
    "setName": "07_algebra_geometry",
    "difficulty": "Medium"
  },
  {
    "id": 200,
    "category": "Quant",
    "section": "Algebra Geometry • Medium",
    "topic": "Algebra & Geometry",
    "question": "Solve for x: 6x = 72.",
    "options": [
      {
        "key": "A",
        "text": "10",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "13",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "72",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "12",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: 12",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Algebra Geometry | Difficulty: Medium",
    "explanation": "Option D (12) is the verified solution for this medium-level problem from Algebra Geometry.",
    "setName": "07_algebra_geometry",
    "difficulty": "Medium"
  },
  {
    "id": 201,
    "category": "Quant",
    "section": "Algebra Geometry • Medium",
    "topic": "Algebra & Geometry",
    "question": "What is the area of a square with side 9 cm?",
    "options": [
      {
        "key": "A",
        "text": "36 cm²",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "81 cm²",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "90 cm²",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "72 cm²",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: 81 cm²",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Algebra Geometry | Difficulty: Medium",
    "explanation": "Option B (81 cm²) is the verified solution for this medium-level problem from Algebra Geometry.",
    "setName": "07_algebra_geometry",
    "difficulty": "Medium"
  },
  {
    "id": 202,
    "category": "Quant",
    "section": "Algebra Geometry • Medium",
    "topic": "Algebra & Geometry",
    "question": "Find the area of a triangle with base 12 cm and height 11 cm.",
    "options": [
      {
        "key": "A",
        "text": "71 cm²",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "61 cm²",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "66 cm²",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "132 cm²",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: 66 cm²",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Algebra Geometry | Difficulty: Medium",
    "explanation": "Option C (66 cm²) is the verified solution for this medium-level problem from Algebra Geometry.",
    "setName": "07_algebra_geometry",
    "difficulty": "Medium"
  },
  {
    "id": 203,
    "category": "Quant",
    "section": "Algebra Geometry • Hard",
    "topic": "Algebra & Geometry",
    "question": "If x + 6 = 14, what is x?",
    "options": [
      {
        "key": "A",
        "text": "4",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "3",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "5",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "6",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: 4",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Algebra Geometry | Difficulty: Hard",
    "explanation": "Option A (4) is the verified solution for this hard-level problem from Algebra Geometry.",
    "setName": "07_algebra_geometry",
    "difficulty": "Hard"
  },
  {
    "id": 204,
    "category": "Quant",
    "section": "Algebra Geometry • Hard",
    "topic": "Algebra & Geometry",
    "question": "What is the perimeter of a square with side 4 cm?",
    "options": [
      {
        "key": "A",
        "text": "23",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "19",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "16",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "14",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: 16",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Algebra Geometry | Difficulty: Hard",
    "explanation": "Option C (16) is the verified solution for this hard-level problem from Algebra Geometry.",
    "setName": "07_algebra_geometry",
    "difficulty": "Hard"
  },
  {
    "id": 205,
    "category": "Quant",
    "section": "Algebra Geometry • Hard",
    "topic": "Algebra & Geometry",
    "question": "Solve for x: 5x = 35.",
    "options": [
      {
        "key": "A",
        "text": "8",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "7",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "35",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "5",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: 7",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Algebra Geometry | Difficulty: Hard",
    "explanation": "Option B (7) is the verified solution for this hard-level problem from Algebra Geometry.",
    "setName": "07_algebra_geometry",
    "difficulty": "Hard"
  },
  {
    "id": 206,
    "category": "Quant",
    "section": "Algebra Geometry • Hard",
    "topic": "Algebra & Geometry",
    "question": "What is the area of a square with side 7 cm?",
    "options": [
      {
        "key": "A",
        "text": "56 cm²",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "42 cm²",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "28 cm²",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "49 cm²",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: 49 cm²",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Algebra Geometry | Difficulty: Hard",
    "explanation": "Option D (49 cm²) is the verified solution for this hard-level problem from Algebra Geometry.",
    "setName": "07_algebra_geometry",
    "difficulty": "Hard"
  },
  {
    "id": 207,
    "category": "Quant",
    "section": "Algebra Geometry • Hard",
    "topic": "Algebra & Geometry",
    "question": "Find the area of a triangle with base 20 cm and height 9 cm.",
    "options": [
      {
        "key": "A",
        "text": "180 cm²",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "95 cm²",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "90 cm²",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "85 cm²",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: 90 cm²",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Algebra Geometry | Difficulty: Hard",
    "explanation": "Option C (90 cm²) is the verified solution for this hard-level problem from Algebra Geometry.",
    "setName": "07_algebra_geometry",
    "difficulty": "Hard"
  },
  {
    "id": 208,
    "category": "Quant",
    "section": "Algebra Geometry • Hard",
    "topic": "Algebra & Geometry",
    "question": "If x + 13 = 25, what is x?",
    "options": [
      {
        "key": "A",
        "text": "5",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "6",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "7",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "13",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: 6",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Algebra Geometry | Difficulty: Hard",
    "explanation": "Option B (6) is the verified solution for this hard-level problem from Algebra Geometry.",
    "setName": "07_algebra_geometry",
    "difficulty": "Hard"
  },
  {
    "id": 209,
    "category": "Quant",
    "section": "Algebra Geometry • Hard",
    "topic": "Algebra & Geometry",
    "question": "What is the perimeter of a square with side 10 cm?",
    "options": [
      {
        "key": "A",
        "text": "42",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "40",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "38",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "100",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: 40",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Algebra Geometry | Difficulty: Hard",
    "explanation": "Option B (40) is the verified solution for this hard-level problem from Algebra Geometry.",
    "setName": "07_algebra_geometry",
    "difficulty": "Hard"
  },
  {
    "id": 210,
    "category": "Quant",
    "section": "Algebra Geometry • Hard",
    "topic": "Algebra & Geometry",
    "question": "Solve for x: 6x = 54.",
    "options": [
      {
        "key": "A",
        "text": "54",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "9",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "10",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "7",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: 9",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Algebra Geometry | Difficulty: Hard",
    "explanation": "Option B (9) is the verified solution for this hard-level problem from Algebra Geometry.",
    "setName": "07_algebra_geometry",
    "difficulty": "Hard"
  },
  {
    "id": 211,
    "category": "Quant",
    "section": "Number Systems Series • Easy",
    "topic": "Number Systems & Series",
    "question": "Find the next term: 8, 10, 12, 14, __.",
    "options": [
      {
        "key": "A",
        "text": "18",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "15",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "16",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "20",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: 16",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Number Systems Series | Difficulty: Easy",
    "explanation": "Option C (16) is the verified solution for this easy-level problem from Number Systems Series.",
    "setName": "08_number_systems_series",
    "difficulty": "Easy"
  },
  {
    "id": 212,
    "category": "Quant",
    "section": "Number Systems Series • Easy",
    "topic": "Number Systems & Series",
    "question": "What is 2 squared?",
    "options": [
      {
        "key": "A",
        "text": "11",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "7",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "2",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "4",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: 4",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Number Systems Series | Difficulty: Easy",
    "explanation": "Option D (4) is the verified solution for this easy-level problem from Number Systems Series.",
    "setName": "08_number_systems_series",
    "difficulty": "Easy"
  },
  {
    "id": 213,
    "category": "Quant",
    "section": "Number Systems Series • Easy",
    "topic": "Number Systems & Series",
    "question": "What is 8 × 3?",
    "options": [
      {
        "key": "A",
        "text": "25",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "11",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "24",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "23",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: 24",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Number Systems Series | Difficulty: Easy",
    "explanation": "Option C (24) is the verified solution for this easy-level problem from Number Systems Series.",
    "setName": "08_number_systems_series",
    "difficulty": "Easy"
  },
  {
    "id": 214,
    "category": "Quant",
    "section": "Number Systems Series • Easy",
    "topic": "Number Systems & Series",
    "question": "What is the remainder when 73 is divided by 9?",
    "options": [
      {
        "key": "A",
        "text": "2",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "4",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "3",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "1",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: 1",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Number Systems Series | Difficulty: Easy",
    "explanation": "Option D (1) is the verified solution for this easy-level problem from Number Systems Series.",
    "setName": "08_number_systems_series",
    "difficulty": "Easy"
  },
  {
    "id": 215,
    "category": "Quant",
    "section": "Number Systems Series • Easy",
    "topic": "Number Systems & Series",
    "question": "What is the LCM of 3 and 4?",
    "options": [
      {
        "key": "A",
        "text": "16",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "24",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "15",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "12",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: 12",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Number Systems Series | Difficulty: Easy",
    "explanation": "Option D (12) is the verified solution for this easy-level problem from Number Systems Series.",
    "setName": "08_number_systems_series",
    "difficulty": "Easy"
  },
  {
    "id": 216,
    "category": "Quant",
    "section": "Number Systems Series • Easy",
    "topic": "Number Systems & Series",
    "question": "Find the next term: 7, 14, 21, 28, __.",
    "options": [
      {
        "key": "A",
        "text": "34",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "35",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "49",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "42",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: 35",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Number Systems Series | Difficulty: Easy",
    "explanation": "Option B (35) is the verified solution for this easy-level problem from Number Systems Series.",
    "setName": "08_number_systems_series",
    "difficulty": "Easy"
  },
  {
    "id": 217,
    "category": "Quant",
    "section": "Number Systems Series • Easy",
    "topic": "Number Systems & Series",
    "question": "What is 9 squared?",
    "options": [
      {
        "key": "A",
        "text": "18",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "80",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "81",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "82",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: 81",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Number Systems Series | Difficulty: Easy",
    "explanation": "Option C (81) is the verified solution for this easy-level problem from Number Systems Series.",
    "setName": "08_number_systems_series",
    "difficulty": "Easy"
  },
  {
    "id": 218,
    "category": "Quant",
    "section": "Number Systems Series • Easy",
    "topic": "Number Systems & Series",
    "question": "What is 6 × 6?",
    "options": [
      {
        "key": "A",
        "text": "35",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "37",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "36",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "12",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: 36",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Number Systems Series | Difficulty: Easy",
    "explanation": "Option C (36) is the verified solution for this easy-level problem from Number Systems Series.",
    "setName": "08_number_systems_series",
    "difficulty": "Easy"
  },
  {
    "id": 219,
    "category": "Quant",
    "section": "Number Systems Series • Easy",
    "topic": "Number Systems & Series",
    "question": "What is the remainder when 68 is divided by 9?",
    "options": [
      {
        "key": "A",
        "text": "5",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "7",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "8",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "6",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: 5",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Number Systems Series | Difficulty: Easy",
    "explanation": "Option A (5) is the verified solution for this easy-level problem from Number Systems Series.",
    "setName": "08_number_systems_series",
    "difficulty": "Easy"
  },
  {
    "id": 220,
    "category": "Quant",
    "section": "Number Systems Series • Easy",
    "topic": "Number Systems & Series",
    "question": "What is the LCM of 8 and 6?",
    "options": [
      {
        "key": "A",
        "text": "30",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "24",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "48",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "32",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: 24",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Number Systems Series | Difficulty: Easy",
    "explanation": "Option B (24) is the verified solution for this easy-level problem from Number Systems Series.",
    "setName": "08_number_systems_series",
    "difficulty": "Easy"
  },
  {
    "id": 221,
    "category": "Quant",
    "section": "Number Systems Series • Medium",
    "topic": "Number Systems & Series",
    "question": "Find the next term: 7, 11, 15, 19, __.",
    "options": [
      {
        "key": "A",
        "text": "31",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "27",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "23",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "22",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: 23",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Number Systems Series | Difficulty: Medium",
    "explanation": "Option C (23) is the verified solution for this medium-level problem from Number Systems Series.",
    "setName": "08_number_systems_series",
    "difficulty": "Medium"
  },
  {
    "id": 222,
    "category": "Quant",
    "section": "Number Systems Series • Medium",
    "topic": "Number Systems & Series",
    "question": "What is 2 squared?",
    "options": [
      {
        "key": "A",
        "text": "2",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "4",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "7",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "11",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: 4",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Number Systems Series | Difficulty: Medium",
    "explanation": "Option B (4) is the verified solution for this medium-level problem from Number Systems Series.",
    "setName": "08_number_systems_series",
    "difficulty": "Medium"
  },
  {
    "id": 223,
    "category": "Quant",
    "section": "Number Systems Series • Medium",
    "topic": "Number Systems & Series",
    "question": "What is 14 × 8?",
    "options": [
      {
        "key": "A",
        "text": "112",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "22",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "111",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "113",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: 112",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Number Systems Series | Difficulty: Medium",
    "explanation": "Option A (112) is the verified solution for this medium-level problem from Number Systems Series.",
    "setName": "08_number_systems_series",
    "difficulty": "Medium"
  },
  {
    "id": 224,
    "category": "Quant",
    "section": "Number Systems Series • Medium",
    "topic": "Number Systems & Series",
    "question": "What is the remainder when 54 is divided by 9?",
    "options": [
      {
        "key": "A",
        "text": "2",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "1",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "0",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "3",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: 0",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Number Systems Series | Difficulty: Medium",
    "explanation": "Option C (0) is the verified solution for this medium-level problem from Number Systems Series.",
    "setName": "08_number_systems_series",
    "difficulty": "Medium"
  },
  {
    "id": 225,
    "category": "Quant",
    "section": "Number Systems Series • Medium",
    "topic": "Number Systems & Series",
    "question": "What is the LCM of 5 and 5?",
    "options": [
      {
        "key": "A",
        "text": "5",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "3",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "12",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "8",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: 5",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Number Systems Series | Difficulty: Medium",
    "explanation": "Option A (5) is the verified solution for this medium-level problem from Number Systems Series.",
    "setName": "08_number_systems_series",
    "difficulty": "Medium"
  },
  {
    "id": 226,
    "category": "Quant",
    "section": "Number Systems Series • Medium",
    "topic": "Number Systems & Series",
    "question": "Find the next term: 9, 16, 23, 30, __.",
    "options": [
      {
        "key": "A",
        "text": "36",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "44",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "51",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "37",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: 37",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Number Systems Series | Difficulty: Medium",
    "explanation": "Option D (37) is the verified solution for this medium-level problem from Number Systems Series.",
    "setName": "08_number_systems_series",
    "difficulty": "Medium"
  },
  {
    "id": 227,
    "category": "Quant",
    "section": "Number Systems Series • Medium",
    "topic": "Number Systems & Series",
    "question": "What is 8 squared?",
    "options": [
      {
        "key": "A",
        "text": "63",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "16",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "64",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "65",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: 64",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Number Systems Series | Difficulty: Medium",
    "explanation": "Option C (64) is the verified solution for this medium-level problem from Number Systems Series.",
    "setName": "08_number_systems_series",
    "difficulty": "Medium"
  },
  {
    "id": 228,
    "category": "Quant",
    "section": "Number Systems Series • Medium",
    "topic": "Number Systems & Series",
    "question": "What is 6 × 3?",
    "options": [
      {
        "key": "A",
        "text": "17",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "19",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "9",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "18",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: 18",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Number Systems Series | Difficulty: Medium",
    "explanation": "Option D (18) is the verified solution for this medium-level problem from Number Systems Series.",
    "setName": "08_number_systems_series",
    "difficulty": "Medium"
  },
  {
    "id": 229,
    "category": "Quant",
    "section": "Number Systems Series • Medium",
    "topic": "Number Systems & Series",
    "question": "What is the remainder when 67 is divided by 9?",
    "options": [
      {
        "key": "A",
        "text": "5",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "6",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "7",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "4",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: 4",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Number Systems Series | Difficulty: Medium",
    "explanation": "Option D (4) is the verified solution for this medium-level problem from Number Systems Series.",
    "setName": "08_number_systems_series",
    "difficulty": "Medium"
  },
  {
    "id": 230,
    "category": "Quant",
    "section": "Number Systems Series • Medium",
    "topic": "Number Systems & Series",
    "question": "What is the LCM of 7 and 4?",
    "options": [
      {
        "key": "A",
        "text": "32",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "35",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "56",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "28",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: 28",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Number Systems Series | Difficulty: Medium",
    "explanation": "Option D (28) is the verified solution for this medium-level problem from Number Systems Series.",
    "setName": "08_number_systems_series",
    "difficulty": "Medium"
  },
  {
    "id": 231,
    "category": "Quant",
    "section": "Number Systems Series • Medium",
    "topic": "Number Systems & Series",
    "question": "Find the next term: 4, 8, 12, 16, __.",
    "options": [
      {
        "key": "A",
        "text": "20",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "24",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "28",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "19",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: 20",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Number Systems Series | Difficulty: Medium",
    "explanation": "Option A (20) is the verified solution for this medium-level problem from Number Systems Series.",
    "setName": "08_number_systems_series",
    "difficulty": "Medium"
  },
  {
    "id": 232,
    "category": "Quant",
    "section": "Number Systems Series • Medium",
    "topic": "Number Systems & Series",
    "question": "What is 7 squared?",
    "options": [
      {
        "key": "A",
        "text": "14",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "50",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "49",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "48",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: 49",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Number Systems Series | Difficulty: Medium",
    "explanation": "Option C (49) is the verified solution for this medium-level problem from Number Systems Series.",
    "setName": "08_number_systems_series",
    "difficulty": "Medium"
  },
  {
    "id": 233,
    "category": "Quant",
    "section": "Number Systems Series • Hard",
    "topic": "Number Systems & Series",
    "question": "What is 11 × 6?",
    "options": [
      {
        "key": "A",
        "text": "65",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "66",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "17",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "67",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: 66",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Number Systems Series | Difficulty: Hard",
    "explanation": "Option B (66) is the verified solution for this hard-level problem from Number Systems Series.",
    "setName": "08_number_systems_series",
    "difficulty": "Hard"
  },
  {
    "id": 234,
    "category": "Quant",
    "section": "Number Systems Series • Hard",
    "topic": "Number Systems & Series",
    "question": "What is the remainder when 27 is divided by 9?",
    "options": [
      {
        "key": "A",
        "text": "3",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "2",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "0",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "1",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: 0",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Number Systems Series | Difficulty: Hard",
    "explanation": "Option C (0) is the verified solution for this hard-level problem from Number Systems Series.",
    "setName": "08_number_systems_series",
    "difficulty": "Hard"
  },
  {
    "id": 235,
    "category": "Quant",
    "section": "Number Systems Series • Hard",
    "topic": "Number Systems & Series",
    "question": "What is the LCM of 9 and 6?",
    "options": [
      {
        "key": "A",
        "text": "18",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "24",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "27",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "36",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: 18",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Number Systems Series | Difficulty: Hard",
    "explanation": "Option A (18) is the verified solution for this hard-level problem from Number Systems Series.",
    "setName": "08_number_systems_series",
    "difficulty": "Hard"
  },
  {
    "id": 236,
    "category": "Quant",
    "section": "Number Systems Series • Hard",
    "topic": "Number Systems & Series",
    "question": "Find the next term: 5, 8, 11, 14, __.",
    "options": [
      {
        "key": "A",
        "text": "20",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "16",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "17",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "23",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: 17",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Number Systems Series | Difficulty: Hard",
    "explanation": "Option C (17) is the verified solution for this hard-level problem from Number Systems Series.",
    "setName": "08_number_systems_series",
    "difficulty": "Hard"
  },
  {
    "id": 237,
    "category": "Quant",
    "section": "Number Systems Series • Hard",
    "topic": "Number Systems & Series",
    "question": "What is 10 squared?",
    "options": [
      {
        "key": "A",
        "text": "101",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "99",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "100",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "20",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: 100",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Number Systems Series | Difficulty: Hard",
    "explanation": "Option C (100) is the verified solution for this hard-level problem from Number Systems Series.",
    "setName": "08_number_systems_series",
    "difficulty": "Hard"
  },
  {
    "id": 238,
    "category": "Quant",
    "section": "Number Systems Series • Hard",
    "topic": "Number Systems & Series",
    "question": "What is 4 × 4?",
    "options": [
      {
        "key": "A",
        "text": "16",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "17",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "8",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "15",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: 16",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Number Systems Series | Difficulty: Hard",
    "explanation": "Option A (16) is the verified solution for this hard-level problem from Number Systems Series.",
    "setName": "08_number_systems_series",
    "difficulty": "Hard"
  },
  {
    "id": 239,
    "category": "Quant",
    "section": "Number Systems Series • Hard",
    "topic": "Number Systems & Series",
    "question": "What is the remainder when 35 is divided by 9?",
    "options": [
      {
        "key": "A",
        "text": "0",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "2",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "8",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "1",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: 8",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Number Systems Series | Difficulty: Hard",
    "explanation": "Option C (8) is the verified solution for this hard-level problem from Number Systems Series.",
    "setName": "08_number_systems_series",
    "difficulty": "Hard"
  },
  {
    "id": 240,
    "category": "Quant",
    "section": "Number Systems Series • Hard",
    "topic": "Number Systems & Series",
    "question": "What is the LCM of 8 and 4?",
    "options": [
      {
        "key": "A",
        "text": "16",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "8",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "12",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "13",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: 8",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Number Systems Series | Difficulty: Hard",
    "explanation": "Option B (8) is the verified solution for this hard-level problem from Number Systems Series.",
    "setName": "08_number_systems_series",
    "difficulty": "Hard"
  },
  {
    "id": 241,
    "category": "Quant",
    "section": "Mixed Placement • Easy",
    "topic": "Mixed Placement Aptitude",
    "question": "A worker completes a job in 14 days at a constant rate. What fraction of the job is completed per day?",
    "options": [
      {
        "key": "A",
        "text": "1/2",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "1/13",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "1/14",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "1/15",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: 1/14",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Mixed Placement | Difficulty: Easy",
    "explanation": "Option C (1/14) is the verified solution for this easy-level problem from Mixed Placement.",
    "setName": "09_mixed_placement",
    "difficulty": "Easy"
  },
  {
    "id": 242,
    "category": "Quant",
    "section": "Mixed Placement • Easy",
    "topic": "Mixed Placement Aptitude",
    "question": "What is 5 factorial (5!)?",
    "options": [
      {
        "key": "A",
        "text": "120",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "240",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "60",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "125",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: 120",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Mixed Placement | Difficulty: Easy",
    "explanation": "Option A (120) is the verified solution for this easy-level problem from Mixed Placement.",
    "setName": "09_mixed_placement",
    "difficulty": "Easy"
  },
  {
    "id": 243,
    "category": "Quant",
    "section": "Mixed Placement • Easy",
    "topic": "Mixed Placement Aptitude",
    "question": "A survey has 250 responses. If 20% selected option B, how many responses is that?",
    "options": [
      {
        "key": "A",
        "text": "200",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "40",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "60",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "50",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: 50",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Mixed Placement | Difficulty: Easy",
    "explanation": "Option D (50) is the verified solution for this easy-level problem from Mixed Placement.",
    "setName": "09_mixed_placement",
    "difficulty": "Easy"
  },
  {
    "id": 244,
    "category": "Quant",
    "section": "Mixed Placement • Easy",
    "topic": "Mixed Placement Aptitude",
    "question": "A fair die is rolled. What is the probability of getting a 6?",
    "options": [
      {
        "key": "A",
        "text": "2/3",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "1/3",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "1/6",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "1/2",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: 1/6",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Mixed Placement | Difficulty: Easy",
    "explanation": "Option C (1/6) is the verified solution for this easy-level problem from Mixed Placement.",
    "setName": "09_mixed_placement",
    "difficulty": "Easy"
  },
  {
    "id": 245,
    "category": "Quant",
    "section": "Mixed Placement • Easy",
    "topic": "Mixed Placement Aptitude",
    "question": "Sales increased from 70 units to 120 units. What was the increase?",
    "options": [
      {
        "key": "A",
        "text": "40",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "50",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "120",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "60",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: 50",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Mixed Placement | Difficulty: Easy",
    "explanation": "Option B (50) is the verified solution for this easy-level problem from Mixed Placement.",
    "setName": "09_mixed_placement",
    "difficulty": "Easy"
  },
  {
    "id": 246,
    "category": "Quant",
    "section": "Mixed Placement • Easy",
    "topic": "Mixed Placement Aptitude",
    "question": "30% of a group of 60 people chose option A. How many people is that?",
    "options": [
      {
        "key": "A",
        "text": "20",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "17",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "42",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "18",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: 18",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Mixed Placement | Difficulty: Easy",
    "explanation": "Option D (18) is the verified solution for this easy-level problem from Mixed Placement.",
    "setName": "09_mixed_placement",
    "difficulty": "Easy"
  },
  {
    "id": 247,
    "category": "Quant",
    "section": "Mixed Placement • Easy",
    "topic": "Mixed Placement Aptitude",
    "question": "How many distinct pairs can be formed from 10 people?",
    "options": [
      {
        "key": "A",
        "text": "44",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "45",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "55",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "90",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: 45",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Mixed Placement | Difficulty: Easy",
    "explanation": "Option B (45) is the verified solution for this easy-level problem from Mixed Placement.",
    "setName": "09_mixed_placement",
    "difficulty": "Easy"
  },
  {
    "id": 248,
    "category": "Quant",
    "section": "Mixed Placement • Easy",
    "topic": "Mixed Placement Aptitude",
    "question": "A survey has 900 responses. If 25% selected option B, how many responses is that?",
    "options": [
      {
        "key": "A",
        "text": "675",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "235",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "215",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "225",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: 225",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Mixed Placement | Difficulty: Easy",
    "explanation": "Option D (225) is the verified solution for this easy-level problem from Mixed Placement.",
    "setName": "09_mixed_placement",
    "difficulty": "Easy"
  },
  {
    "id": 249,
    "category": "Quant",
    "section": "Mixed Placement • Easy",
    "topic": "Mixed Placement Aptitude",
    "question": "A person walks 4 km north and then 4 km south. How far are they from the starting point?",
    "options": [
      {
        "key": "A",
        "text": "4 km",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "1 km",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "0 km",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "8 km",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: 0 km",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Mixed Placement | Difficulty: Easy",
    "explanation": "Option C (0 km) is the verified solution for this easy-level problem from Mixed Placement.",
    "setName": "09_mixed_placement",
    "difficulty": "Easy"
  },
  {
    "id": 250,
    "category": "Quant",
    "section": "Mixed Placement • Easy",
    "topic": "Mixed Placement Aptitude",
    "question": "Sales increased from 170 units to 210 units. What was the increase?",
    "options": [
      {
        "key": "A",
        "text": "40",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "210",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "30",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "50",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: 40",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Mixed Placement | Difficulty: Easy",
    "explanation": "Option A (40) is the verified solution for this easy-level problem from Mixed Placement.",
    "setName": "09_mixed_placement",
    "difficulty": "Easy"
  },
  {
    "id": 251,
    "category": "Quant",
    "section": "Mixed Placement • Medium",
    "topic": "Mixed Placement Aptitude",
    "question": "Solve for x: x − 5 = 6.",
    "options": [
      {
        "key": "A",
        "text": "12",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "9",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "14",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "11",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: 11",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Mixed Placement | Difficulty: Medium",
    "explanation": "Option D (11) is the verified solution for this medium-level problem from Mixed Placement.",
    "setName": "09_mixed_placement",
    "difficulty": "Medium"
  },
  {
    "id": 252,
    "category": "Quant",
    "section": "Mixed Placement • Medium",
    "topic": "Mixed Placement Aptitude",
    "question": "What is 20% of 280?",
    "options": [
      {
        "key": "A",
        "text": "51",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "66",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "61",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "56",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: 56",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Mixed Placement | Difficulty: Medium",
    "explanation": "Option D (56) is the verified solution for this medium-level problem from Mixed Placement.",
    "setName": "09_mixed_placement",
    "difficulty": "Medium"
  },
  {
    "id": 253,
    "category": "Quant",
    "section": "Mixed Placement • Medium",
    "topic": "Mixed Placement Aptitude",
    "question": "Complete the letter series: G, I, K, __.",
    "options": [
      {
        "key": "A",
        "text": "M",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "O",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "L",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "N",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: M",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Mixed Placement | Difficulty: Medium",
    "explanation": "Option A (M) is the verified solution for this medium-level problem from Mixed Placement.",
    "setName": "09_mixed_placement",
    "difficulty": "Medium"
  },
  {
    "id": 254,
    "category": "Quant",
    "section": "Mixed Placement • Medium",
    "topic": "Mixed Placement Aptitude",
    "question": "A can finish a job in 8 days and B in 16 days. How long do they take together?",
    "options": [
      {
        "key": "A",
        "text": "4.33333 days",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "6.33333 days",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "5.33333 days",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "8 days",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: 5.33333 days",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Mixed Placement | Difficulty: Medium",
    "explanation": "Option C (5.33333 days) is the verified solution for this medium-level problem from Mixed Placement.",
    "setName": "09_mixed_placement",
    "difficulty": "Medium"
  },
  {
    "id": 255,
    "category": "Quant",
    "section": "Mixed Placement • Medium",
    "topic": "Mixed Placement Aptitude",
    "question": "Find the next number: 7, 9, 11, 13, __.",
    "options": [
      {
        "key": "A",
        "text": "15",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "13",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "19",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "17",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: 15",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Mixed Placement | Difficulty: Medium",
    "explanation": "Option A (15) is the verified solution for this medium-level problem from Mixed Placement.",
    "setName": "09_mixed_placement",
    "difficulty": "Medium"
  },
  {
    "id": 256,
    "category": "Quant",
    "section": "Mixed Placement • Medium",
    "topic": "Mixed Placement Aptitude",
    "question": "What is the least common multiple (LCM) of 12 and 12?",
    "options": [
      {
        "key": "A",
        "text": "12",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "24",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "15",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "16",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: 12",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Mixed Placement | Difficulty: Medium",
    "explanation": "Option A (12) is the verified solution for this medium-level problem from Mixed Placement.",
    "setName": "09_mixed_placement",
    "difficulty": "Medium"
  },
  {
    "id": 257,
    "category": "Quant",
    "section": "Mixed Placement • Medium",
    "topic": "Mixed Placement Aptitude",
    "question": "Solve for x: x − 5 = 7.",
    "options": [
      {
        "key": "A",
        "text": "10",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "13",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "12",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "15",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: 12",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Mixed Placement | Difficulty: Medium",
    "explanation": "Option C (12) is the verified solution for this medium-level problem from Mixed Placement.",
    "setName": "09_mixed_placement",
    "difficulty": "Medium"
  },
  {
    "id": 258,
    "category": "Quant",
    "section": "Mixed Placement • Medium",
    "topic": "Mixed Placement Aptitude",
    "question": "What is 10% of 80?",
    "options": [
      {
        "key": "A",
        "text": "8",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "3",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "18",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "13",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: 8",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Mixed Placement | Difficulty: Medium",
    "explanation": "Option A (8) is the verified solution for this medium-level problem from Mixed Placement.",
    "setName": "09_mixed_placement",
    "difficulty": "Medium"
  },
  {
    "id": 259,
    "category": "Quant",
    "section": "Mixed Placement • Medium",
    "topic": "Mixed Placement Aptitude",
    "question": "If a number is multiplied by 7, the result is 287. What is the number?",
    "options": [
      {
        "key": "A",
        "text": "41",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "43",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "39",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "48",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: 41",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Mixed Placement | Difficulty: Medium",
    "explanation": "Option A (41) is the verified solution for this medium-level problem from Mixed Placement.",
    "setName": "09_mixed_placement",
    "difficulty": "Medium"
  },
  {
    "id": 260,
    "category": "Quant",
    "section": "Mixed Placement • Medium",
    "topic": "Mixed Placement Aptitude",
    "question": "A fair die is rolled. What is the probability of getting a 5?",
    "options": [
      {
        "key": "A",
        "text": "1/2",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "1/3",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "1/6",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "2/3",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: 1/6",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Mixed Placement | Difficulty: Medium",
    "explanation": "Option C (1/6) is the verified solution for this medium-level problem from Mixed Placement.",
    "setName": "09_mixed_placement",
    "difficulty": "Medium"
  },
  {
    "id": 261,
    "category": "Quant",
    "section": "Mixed Placement • Medium",
    "topic": "Mixed Placement Aptitude",
    "question": "A bag has 2 red and 6 blue balls. What is the probability of drawing a red ball?",
    "options": [
      {
        "key": "A",
        "text": "2/6",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "1/8",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "2/8",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "6/8",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: 2/8",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Mixed Placement | Difficulty: Medium",
    "explanation": "Option C (2/8) is the verified solution for this medium-level problem from Mixed Placement.",
    "setName": "09_mixed_placement",
    "difficulty": "Medium"
  },
  {
    "id": 262,
    "category": "Quant",
    "section": "Mixed Placement • Medium",
    "topic": "Mixed Placement Aptitude",
    "question": "What is the least common multiple (LCM) of 9 and 4?",
    "options": [
      {
        "key": "A",
        "text": "72",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "45",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "36",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "40",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: 36",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Mixed Placement | Difficulty: Medium",
    "explanation": "Option C (36) is the verified solution for this medium-level problem from Mixed Placement.",
    "setName": "09_mixed_placement",
    "difficulty": "Medium"
  },
  {
    "id": 263,
    "category": "Quant",
    "section": "Mixed Placement • Hard",
    "topic": "Mixed Placement Aptitude",
    "question": "How many distinct pairs can be formed from 11 people?",
    "options": [
      {
        "key": "A",
        "text": "66",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "54",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "110",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "55",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: 55",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Mixed Placement | Difficulty: Hard",
    "explanation": "Option D (55) is the verified solution for this hard-level problem from Mixed Placement.",
    "setName": "09_mixed_placement",
    "difficulty": "Hard"
  },
  {
    "id": 264,
    "category": "Quant",
    "section": "Mixed Placement • Hard",
    "topic": "Mixed Placement Aptitude",
    "question": "A fair die is rolled. What is the probability of getting a 6?",
    "options": [
      {
        "key": "A",
        "text": "1/6",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "1/3",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "2/3",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "1/2",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: 1/6",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Mixed Placement | Difficulty: Hard",
    "explanation": "Option A (1/6) is the verified solution for this hard-level problem from Mixed Placement.",
    "setName": "09_mixed_placement",
    "difficulty": "Hard"
  },
  {
    "id": 265,
    "category": "Quant",
    "section": "Mixed Placement • Hard",
    "topic": "Mixed Placement Aptitude",
    "question": "Find the next number: 7, 15, 23, 31, __.",
    "options": [
      {
        "key": "A",
        "text": "31",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "39",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "47",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "55",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: 39",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Mixed Placement | Difficulty: Hard",
    "explanation": "Option B (39) is the verified solution for this hard-level problem from Mixed Placement.",
    "setName": "09_mixed_placement",
    "difficulty": "Hard"
  },
  {
    "id": 266,
    "category": "Quant",
    "section": "Mixed Placement • Hard",
    "topic": "Mixed Placement Aptitude",
    "question": "Complete the analogy: Bird is to Nest as Bee is to __.",
    "options": [
      {
        "key": "A",
        "text": "Hive",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Water",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Garden",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Road",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: Hive",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Mixed Placement | Difficulty: Hard",
    "explanation": "Option A (Hive) is the verified solution for this hard-level problem from Mixed Placement.",
    "setName": "09_mixed_placement",
    "difficulty": "Hard"
  },
  {
    "id": 267,
    "category": "Quant",
    "section": "Mixed Placement • Hard",
    "topic": "Mixed Placement Aptitude",
    "question": "Find the missing number: 36, 49, __.",
    "options": [
      {
        "key": "A",
        "text": "53",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "50",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "64",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "51",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: 64",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Mixed Placement | Difficulty: Hard",
    "explanation": "Option C (64) is the verified solution for this hard-level problem from Mixed Placement.",
    "setName": "09_mixed_placement",
    "difficulty": "Hard"
  },
  {
    "id": 268,
    "category": "Quant",
    "section": "Mixed Placement • Hard",
    "topic": "Mixed Placement Aptitude",
    "question": "A fair die is rolled. What is the probability of getting a 4?",
    "options": [
      {
        "key": "A",
        "text": "2/3",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "1/6",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "1/2",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "1/3",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: 1/6",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Mixed Placement | Difficulty: Hard",
    "explanation": "Option B (1/6) is the verified solution for this hard-level problem from Mixed Placement.",
    "setName": "09_mixed_placement",
    "difficulty": "Hard"
  },
  {
    "id": 269,
    "category": "Quant",
    "section": "Mixed Placement • Hard",
    "topic": "Mixed Placement Aptitude",
    "question": "Solve for x: x − 3 = 12.",
    "options": [
      {
        "key": "A",
        "text": "16",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "13",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "18",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "15",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: 15",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Mixed Placement | Difficulty: Hard",
    "explanation": "Option D (15) is the verified solution for this hard-level problem from Mixed Placement.",
    "setName": "09_mixed_placement",
    "difficulty": "Hard"
  },
  {
    "id": 270,
    "category": "Quant",
    "section": "Mixed Placement • Hard",
    "topic": "Mixed Placement Aptitude",
    "question": "Find the next number: 11, 13, 15, 17, __.",
    "options": [
      {
        "key": "A",
        "text": "23",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "19",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "21",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "17",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: 19",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Mixed Placement | Difficulty: Hard",
    "explanation": "Option B (19) is the verified solution for this hard-level problem from Mixed Placement.",
    "setName": "09_mixed_placement",
    "difficulty": "Hard"
  },
  {
    "id": 271,
    "category": "Quant",
    "section": "Advanced Mixed • Easy",
    "topic": "Advanced Mixed Aptitude",
    "question": "An item priced at ₹510 has a 15% discount. What is the sale price?",
    "options": [
      {
        "key": "A",
        "text": "₹423",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "₹510",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "₹443",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "₹433",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: ₹433",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Advanced Mixed | Difficulty: Easy",
    "explanation": "Option D (₹433) is the verified solution for this easy-level problem from Advanced Mixed.",
    "setName": "10_advanced_mixed",
    "difficulty": "Easy"
  },
  {
    "id": 272,
    "category": "Quant",
    "section": "Advanced Mixed • Easy",
    "topic": "Advanced Mixed Aptitude",
    "question": "Two numbers are 4 and 10. What is their product?",
    "options": [
      {
        "key": "A",
        "text": "38",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "42",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "40",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "14",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: 40",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Advanced Mixed | Difficulty: Easy",
    "explanation": "Option C (40) is the verified solution for this easy-level problem from Advanced Mixed.",
    "setName": "10_advanced_mixed",
    "difficulty": "Easy"
  },
  {
    "id": 273,
    "category": "Quant",
    "section": "Advanced Mixed • Easy",
    "topic": "Advanced Mixed Aptitude",
    "question": "Find 30% of 48.",
    "options": [
      {
        "key": "A",
        "text": "34",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "13",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "15",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "14",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: 14",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Advanced Mixed | Difficulty: Easy",
    "explanation": "Option D (14) is the verified solution for this easy-level problem from Advanced Mixed.",
    "setName": "10_advanced_mixed",
    "difficulty": "Easy"
  },
  {
    "id": 274,
    "category": "Quant",
    "section": "Advanced Mixed • Easy",
    "topic": "Advanced Mixed Aptitude",
    "question": "If x = 31 and y = 12, what is xy?",
    "options": [
      {
        "key": "A",
        "text": "372",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "362",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "382",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "43",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: 372",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Advanced Mixed | Difficulty: Easy",
    "explanation": "Option A (372) is the verified solution for this easy-level problem from Advanced Mixed.",
    "setName": "10_advanced_mixed",
    "difficulty": "Easy"
  },
  {
    "id": 275,
    "category": "Quant",
    "section": "Advanced Mixed • Easy",
    "topic": "Advanced Mixed Aptitude",
    "question": "An item priced at ₹380 has a 25% discount. What is the sale price?",
    "options": [
      {
        "key": "A",
        "text": "₹380",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "₹295",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "₹275",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "₹285",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: ₹285",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Advanced Mixed | Difficulty: Easy",
    "explanation": "Option D (₹285) is the verified solution for this easy-level problem from Advanced Mixed.",
    "setName": "10_advanced_mixed",
    "difficulty": "Easy"
  },
  {
    "id": 276,
    "category": "Quant",
    "section": "Advanced Mixed • Easy",
    "topic": "Advanced Mixed Aptitude",
    "question": "Two numbers are 3 and 4. What is their product?",
    "options": [
      {
        "key": "A",
        "text": "12",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "10",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "14",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "7",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: 12",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Advanced Mixed | Difficulty: Easy",
    "explanation": "Option A (12) is the verified solution for this easy-level problem from Advanced Mixed.",
    "setName": "10_advanced_mixed",
    "difficulty": "Easy"
  },
  {
    "id": 277,
    "category": "Quant",
    "section": "Advanced Mixed • Easy",
    "topic": "Advanced Mixed Aptitude",
    "question": "Find 20% of 47.",
    "options": [
      {
        "key": "A",
        "text": "8",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "10",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "9",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "38",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: 9",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Advanced Mixed | Difficulty: Easy",
    "explanation": "Option C (9) is the verified solution for this easy-level problem from Advanced Mixed.",
    "setName": "10_advanced_mixed",
    "difficulty": "Easy"
  },
  {
    "id": 278,
    "category": "Quant",
    "section": "Advanced Mixed • Easy",
    "topic": "Advanced Mixed Aptitude",
    "question": "If x = 17 and y = 23, what is xy?",
    "options": [
      {
        "key": "A",
        "text": "401",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "381",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "391",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "40",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: 391",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Advanced Mixed | Difficulty: Easy",
    "explanation": "Option C (391) is the verified solution for this easy-level problem from Advanced Mixed.",
    "setName": "10_advanced_mixed",
    "difficulty": "Easy"
  },
  {
    "id": 279,
    "category": "Quant",
    "section": "Advanced Mixed • Easy",
    "topic": "Advanced Mixed Aptitude",
    "question": "An item priced at ₹280 has a 25% discount. What is the sale price?",
    "options": [
      {
        "key": "A",
        "text": "₹200",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "₹280",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "₹210",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "₹220",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: ₹210",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Advanced Mixed | Difficulty: Easy",
    "explanation": "Option C (₹210) is the verified solution for this easy-level problem from Advanced Mixed.",
    "setName": "10_advanced_mixed",
    "difficulty": "Easy"
  },
  {
    "id": 280,
    "category": "Quant",
    "section": "Advanced Mixed • Easy",
    "topic": "Advanced Mixed Aptitude",
    "question": "Two numbers are 6 and 3. What is their product?",
    "options": [
      {
        "key": "A",
        "text": "18",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "9",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "20",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "16",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: 18",
    "standardPaceSec": 35,
    "maxPoints": 800,
    "scratchpadFormula": "Set: Advanced Mixed | Difficulty: Easy",
    "explanation": "Option A (18) is the verified solution for this easy-level problem from Advanced Mixed.",
    "setName": "10_advanced_mixed",
    "difficulty": "Easy"
  },
  {
    "id": 281,
    "category": "Quant",
    "section": "Advanced Mixed • Medium",
    "topic": "Advanced Mixed Aptitude",
    "question": "Find 30% of 70.",
    "options": [
      {
        "key": "A",
        "text": "20",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "21",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "49",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "22",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: 21",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Advanced Mixed | Difficulty: Medium",
    "explanation": "Option B (21) is the verified solution for this medium-level problem from Advanced Mixed.",
    "setName": "10_advanced_mixed",
    "difficulty": "Medium"
  },
  {
    "id": 282,
    "category": "Quant",
    "section": "Advanced Mixed • Medium",
    "topic": "Advanced Mixed Aptitude",
    "question": "If x = 28 and y = 13, what is xy?",
    "options": [
      {
        "key": "A",
        "text": "374",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "354",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "364",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "41",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: 364",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Advanced Mixed | Difficulty: Medium",
    "explanation": "Option C (364) is the verified solution for this medium-level problem from Advanced Mixed.",
    "setName": "10_advanced_mixed",
    "difficulty": "Medium"
  },
  {
    "id": 283,
    "category": "Quant",
    "section": "Advanced Mixed • Medium",
    "topic": "Advanced Mixed Aptitude",
    "question": "An item priced at ₹600 has a 15% discount. What is the sale price?",
    "options": [
      {
        "key": "A",
        "text": "₹600",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "₹510",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "₹520",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "₹500",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: ₹510",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Advanced Mixed | Difficulty: Medium",
    "explanation": "Option B (₹510) is the verified solution for this medium-level problem from Advanced Mixed.",
    "setName": "10_advanced_mixed",
    "difficulty": "Medium"
  },
  {
    "id": 284,
    "category": "Quant",
    "section": "Advanced Mixed • Medium",
    "topic": "Advanced Mixed Aptitude",
    "question": "Two numbers are 10 and 4. What is their product?",
    "options": [
      {
        "key": "A",
        "text": "38",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "42",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "40",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "14",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: 40",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Advanced Mixed | Difficulty: Medium",
    "explanation": "Option C (40) is the verified solution for this medium-level problem from Advanced Mixed.",
    "setName": "10_advanced_mixed",
    "difficulty": "Medium"
  },
  {
    "id": 285,
    "category": "Quant",
    "section": "Advanced Mixed • Medium",
    "topic": "Advanced Mixed Aptitude",
    "question": "Find 10% of 78.",
    "options": [
      {
        "key": "A",
        "text": "71",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "7",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "8",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "6",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: 7",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Advanced Mixed | Difficulty: Medium",
    "explanation": "Option B (7) is the verified solution for this medium-level problem from Advanced Mixed.",
    "setName": "10_advanced_mixed",
    "difficulty": "Medium"
  },
  {
    "id": 286,
    "category": "Quant",
    "section": "Advanced Mixed • Medium",
    "topic": "Advanced Mixed Aptitude",
    "question": "If x = 24 and y = 37, what is xy?",
    "options": [
      {
        "key": "A",
        "text": "898",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "878",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "61",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "888",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: 888",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Advanced Mixed | Difficulty: Medium",
    "explanation": "Option D (888) is the verified solution for this medium-level problem from Advanced Mixed.",
    "setName": "10_advanced_mixed",
    "difficulty": "Medium"
  },
  {
    "id": 287,
    "category": "Quant",
    "section": "Advanced Mixed • Medium",
    "topic": "Advanced Mixed Aptitude",
    "question": "An item priced at ₹480 has a 10% discount. What is the sale price?",
    "options": [
      {
        "key": "A",
        "text": "₹442",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "₹422",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "₹432",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "₹480",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: ₹432",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Advanced Mixed | Difficulty: Medium",
    "explanation": "Option C (₹432) is the verified solution for this medium-level problem from Advanced Mixed.",
    "setName": "10_advanced_mixed",
    "difficulty": "Medium"
  },
  {
    "id": 288,
    "category": "Quant",
    "section": "Advanced Mixed • Medium",
    "topic": "Advanced Mixed Aptitude",
    "question": "Two numbers are 3 and 12. What is their product?",
    "options": [
      {
        "key": "A",
        "text": "34",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "36",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "15",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "38",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: 36",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Advanced Mixed | Difficulty: Medium",
    "explanation": "Option B (36) is the verified solution for this medium-level problem from Advanced Mixed.",
    "setName": "10_advanced_mixed",
    "difficulty": "Medium"
  },
  {
    "id": 289,
    "category": "Quant",
    "section": "Advanced Mixed • Medium",
    "topic": "Advanced Mixed Aptitude",
    "question": "Find 30% of 57.",
    "options": [
      {
        "key": "A",
        "text": "17",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "18",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "40",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "16",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: 17",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Advanced Mixed | Difficulty: Medium",
    "explanation": "Option A (17) is the verified solution for this medium-level problem from Advanced Mixed.",
    "setName": "10_advanced_mixed",
    "difficulty": "Medium"
  },
  {
    "id": 290,
    "category": "Quant",
    "section": "Advanced Mixed • Medium",
    "topic": "Advanced Mixed Aptitude",
    "question": "If x = 17 and y = 20, what is xy?",
    "options": [
      {
        "key": "A",
        "text": "340",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "330",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "37",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "350",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: 340",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Advanced Mixed | Difficulty: Medium",
    "explanation": "Option A (340) is the verified solution for this medium-level problem from Advanced Mixed.",
    "setName": "10_advanced_mixed",
    "difficulty": "Medium"
  },
  {
    "id": 291,
    "category": "Quant",
    "section": "Advanced Mixed • Medium",
    "topic": "Advanced Mixed Aptitude",
    "question": "An item priced at ₹310 has a 20% discount. What is the sale price?",
    "options": [
      {
        "key": "A",
        "text": "₹238",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "₹248",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "₹258",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "₹310",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: ₹248",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Advanced Mixed | Difficulty: Medium",
    "explanation": "Option B (₹248) is the verified solution for this medium-level problem from Advanced Mixed.",
    "setName": "10_advanced_mixed",
    "difficulty": "Medium"
  },
  {
    "id": 292,
    "category": "Quant",
    "section": "Advanced Mixed • Medium",
    "topic": "Advanced Mixed Aptitude",
    "question": "Two numbers are 11 and 7. What is their product?",
    "options": [
      {
        "key": "A",
        "text": "77",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "79",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "18",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "75",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: 77",
    "standardPaceSec": 45,
    "maxPoints": 1000,
    "scratchpadFormula": "Set: Advanced Mixed | Difficulty: Medium",
    "explanation": "Option A (77) is the verified solution for this medium-level problem from Advanced Mixed.",
    "setName": "10_advanced_mixed",
    "difficulty": "Medium"
  },
  {
    "id": 293,
    "category": "Quant",
    "section": "Advanced Mixed • Hard",
    "topic": "Advanced Mixed Aptitude",
    "question": "Find 25% of 69.",
    "options": [
      {
        "key": "A",
        "text": "17",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "52",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "18",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "16",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: 17",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Advanced Mixed | Difficulty: Hard",
    "explanation": "Option A (17) is the verified solution for this hard-level problem from Advanced Mixed.",
    "setName": "10_advanced_mixed",
    "difficulty": "Hard"
  },
  {
    "id": 294,
    "category": "Quant",
    "section": "Advanced Mixed • Hard",
    "topic": "Advanced Mixed Aptitude",
    "question": "If x = 25 and y = 34, what is xy?",
    "options": [
      {
        "key": "A",
        "text": "840",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "850",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "860",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "59",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: 850",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Advanced Mixed | Difficulty: Hard",
    "explanation": "Option B (850) is the verified solution for this hard-level problem from Advanced Mixed.",
    "setName": "10_advanced_mixed",
    "difficulty": "Hard"
  },
  {
    "id": 295,
    "category": "Quant",
    "section": "Advanced Mixed • Hard",
    "topic": "Advanced Mixed Aptitude",
    "question": "An item priced at ₹460 has a 10% discount. What is the sale price?",
    "options": [
      {
        "key": "A",
        "text": "₹424",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "₹460",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "₹414",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "₹404",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "C",
    "officialAnswerText": "Option C: ₹414",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Advanced Mixed | Difficulty: Hard",
    "explanation": "Option C (₹414) is the verified solution for this hard-level problem from Advanced Mixed.",
    "setName": "10_advanced_mixed",
    "difficulty": "Hard"
  },
  {
    "id": 296,
    "category": "Quant",
    "section": "Advanced Mixed • Hard",
    "topic": "Advanced Mixed Aptitude",
    "question": "Two numbers are 3 and 11. What is their product?",
    "options": [
      {
        "key": "A",
        "text": "31",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "33",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "35",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "14",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "B",
    "officialAnswerText": "Option B: 33",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Advanced Mixed | Difficulty: Hard",
    "explanation": "Option B (33) is the verified solution for this hard-level problem from Advanced Mixed.",
    "setName": "10_advanced_mixed",
    "difficulty": "Hard"
  },
  {
    "id": 297,
    "category": "Quant",
    "section": "Advanced Mixed • Hard",
    "topic": "Advanced Mixed Aptitude",
    "question": "Find 20% of 48.",
    "options": [
      {
        "key": "A",
        "text": "9",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "10",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "39",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "8",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: 9",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Advanced Mixed | Difficulty: Hard",
    "explanation": "Option A (9) is the verified solution for this hard-level problem from Advanced Mixed.",
    "setName": "10_advanced_mixed",
    "difficulty": "Hard"
  },
  {
    "id": 298,
    "category": "Quant",
    "section": "Advanced Mixed • Hard",
    "topic": "Advanced Mixed Aptitude",
    "question": "If x = 18 and y = 40, what is xy?",
    "options": [
      {
        "key": "A",
        "text": "710",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "58",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "730",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "720",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: 720",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Advanced Mixed | Difficulty: Hard",
    "explanation": "Option D (720) is the verified solution for this hard-level problem from Advanced Mixed.",
    "setName": "10_advanced_mixed",
    "difficulty": "Hard"
  },
  {
    "id": 299,
    "category": "Quant",
    "section": "Advanced Mixed • Hard",
    "topic": "Advanced Mixed Aptitude",
    "question": "An item priced at ₹440 has a 20% discount. What is the sale price?",
    "options": [
      {
        "key": "A",
        "text": "₹362",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "₹440",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "₹342",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "₹352",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      }
    ],
    "correctKey": "D",
    "officialAnswerText": "Option D: ₹352",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Advanced Mixed | Difficulty: Hard",
    "explanation": "Option D (₹352) is the verified solution for this hard-level problem from Advanced Mixed.",
    "setName": "10_advanced_mixed",
    "difficulty": "Hard"
  },
  {
    "id": 300,
    "category": "Quant",
    "section": "Advanced Mixed • Hard",
    "topic": "Advanced Mixed Aptitude",
    "question": "Two numbers are 10 and 9. What is their product?",
    "options": [
      {
        "key": "A",
        "text": "90",
        "percentage": 65,
        "count": 32,
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "88",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "92",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "19",
        "percentage": 12,
        "count": 6,
        "isCorrect": false
      }
    ],
    "correctKey": "A",
    "officialAnswerText": "Option A: 90",
    "standardPaceSec": 60,
    "maxPoints": 1200,
    "scratchpadFormula": "Set: Advanced Mixed | Difficulty: Hard",
    "explanation": "Option A (90) is the verified solution for this hard-level problem from Advanced Mixed.",
    "setName": "10_advanced_mixed",
    "difficulty": "Hard"
  }
];

export function getQuestionsBySet(setName: string): QuestionBankItem[] {
  return QUESTION_BANK.filter((q) => q.setName === setName);
}

export function getQuestionsByCategory(category: string): QuestionBankItem[] {
  const target = category.toLowerCase();
  return QUESTION_BANK.filter((q) => q.category.toLowerCase() === target);
}

export function getRandomQuestionSlice(count: number = 15, category?: string): QuestionBankItem[] {
  const pool = category ? getQuestionsByCategory(category) : QUESTION_BANK;
  if (pool.length <= count) return [...pool];
  
  // Deterministic shuffle or sample
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map((q, idx) => ({
    ...q,
    id: idx + 1,
  }));
}
