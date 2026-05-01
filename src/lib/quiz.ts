/**
 * Interactive voting knowledge quiz to test user understanding.
 * Educational feature to increase engagement and learning.
 */

export interface QuizQuestion {
  id: string;
  question: string;
  options: {
    text: string;
    correct: boolean;
    explanation: string;
  }[];
  category: 'registration' | 'voting' | 'evm' | 'timeline';
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'What is the minimum age to register as a voter in Indian elections?',
    options: [
      {
        text: '18 years',
        correct: true,
        explanation:
          'Indian citizens aged 18 years and above are eligible to register as voters.',
      },
      {
        text: '21 years',
        correct: false,
        explanation:
          'While some positions require 21 years, voter registration starts at 18.',
      },
      {
        text: '25 years',
        correct: false,
        explanation: 'This is the age requirement for some candidate positions, not voting.',
      },
    ],
    category: 'registration',
  },
  {
    id: 'q2',
    question: 'What does EVM stand for?',
    options: [
      {
        text: 'Electronic Voting Machine',
        correct: true,
        explanation:
          'EVM is the Electronic Voting Machine used in Indian elections for secure, quick voting.',
      },
      {
        text: 'Election Verification Module',
        correct: false,
        explanation:
          'While verification is important, EVM specifically refers to Electronic Voting Machine.',
      },
      {
        text: 'Electoral Vote Mechanism',
        correct: false,
        explanation: 'The correct full form is Electronic Voting Machine.',
      },
    ],
    category: 'evm',
  },
  {
    id: 'q3',
    question: 'What is the Model Code of Conduct (MCC)?',
    options: [
      {
        text: 'A set of rules that restrict certain government activities during elections',
        correct: true,
        explanation:
          'The MCC comes into effect after election announcement and regulates government announcements and policy decisions.',
      },
      {
        text: 'A mandatory voting requirement',
        correct: false,
        explanation:
          'The MCC is about restricting government activities, not about voting requirements.',
      },
      {
        text: 'A candidate registration form',
        correct: false,
        explanation: 'The MCC is a regulatory framework, not a registration form.',
      },
    ],
    category: 'timeline',
  },
  {
    id: 'q4',
    question: 'What is VVPAT?',
    options: [
      {
        text: 'Voter Verifiable Paper Audit Trail — prints a slip for each vote',
        correct: true,
        explanation:
          'VVPAT is a security feature that prints a physical record of each vote for verification.',
      },
      {
        text: 'Voter Verification and Processing Tracker',
        correct: false,
        explanation: 'VVPAT specifically refers to the paper audit trail system.',
      },
      {
        text: 'Voting Validation Process Tool',
        correct: false,
        explanation:
          'The correct full form is Voter Verifiable Paper Audit Trail.',
      },
    ],
    category: 'evm',
  },
  {
    id: 'q5',
    question: 'How many seats are required for a majority in the Lok Sabha?',
    options: [
      {
        text: '272 seats',
        correct: true,
        explanation:
          'A party or coalition needs 272 seats out of 543 in the Lok Sabha for a simple majority.',
      },
      {
        text: '200 seats',
        correct: false,
        explanation:
          'The Lok Sabha has 543 seats total, and 272 is the majority threshold.',
      },
      {
        text: '300 seats',
        correct: false,
        explanation:
          'While 300 is a supermajority, the simple majority threshold is 272 seats.',
      },
    ],
    category: 'timeline',
  },
];

/**
 * Get random quiz questions for a session.
 * @param count - Number of questions to return
 * @returns Array of random quiz questions
 */
export function getRandomQuestions(count: number = 3): QuizQuestion[] {
  const shuffled = [...QUIZ_QUESTIONS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * Calculate quiz score.
 * @param answers - Map of question IDs to selected option indices
 * @returns Score and total
 */
export function calculateScore(
  answers: Record<string, number>
): { score: number; total: number } {
  let score = 0;
  let total = 0;

  for (const [questionId, selectedIndex] of Object.entries(answers)) {
    const question = QUIZ_QUESTIONS.find((q) => q.id === questionId);
    if (question) {
      total++;
      if (question.options[selectedIndex]?.correct) {
        score++;
      }
    }
  }

  return { score, total };
}
