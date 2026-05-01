/**
 * Analytics utility - generates realistic election-related data
 * based on Firebase Analytics events we're tracking
 */

export interface DailyEngagement {
  date: string;
  pageViews: number;
  uniqueUsers: number;
  quizAttempts: number;
  aiQuestions: number;
}

export interface QuizMetric {
  date: string;
  avgScore: number;
  completionRate: number;
  totalAttempts: number;
}

export interface AITopic {
  question: string;
  frequency: number;
  category: 'voting' | 'registration' | 'timeline' | 'evm' | 'mcc';
}

export interface RegionalData {
  state: string;
  users: number;
  region: string;
}

/**
 * Generate realistic daily engagement data
 * Election interest patterns: spikes on major dates
 */
export function generateDailyEngagement(days: number = 30): DailyEngagement[] {
  const data: DailyEngagement[] = [];
  const today = new Date();

  // Major election events in India (2024 Lok Sabha)
  const electionDates = ['2024-04-19', '2024-04-26', '2024-05-03']; // Phase dates

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];

    // Base traffic
    let basePageViews = Math.floor(150 + Math.random() * 250);
    let baseUsers = Math.floor(80 + Math.random() * 150);
    let baseQuiz = Math.floor(20 + Math.random() * 60);
    let baseAI = Math.floor(30 + Math.random() * 80);

    // Spikes on election dates
    if (electionDates.some((d) => dateStr.startsWith(d.substring(0, 7)))) {
      basePageViews *= 2.5;
      baseUsers *= 2.2;
      baseQuiz *= 2;
      baseAI *= 2.8;
    }

    // Weekend spike
    if (date.getDay() === 0 || date.getDay() === 6) {
      basePageViews *= 1.4;
      baseUsers *= 1.35;
      baseQuiz *= 1.3;
      baseAI *= 1.25;
    }

    data.push({
      date: dateStr,
      pageViews: Math.floor(basePageViews),
      uniqueUsers: Math.floor(baseUsers),
      quizAttempts: Math.floor(baseQuiz),
      aiQuestions: Math.floor(baseAI),
    });
  }

  return data;
}

/**
 * Generate quiz performance metrics
 */
export function generateQuizMetrics(days: number = 30): QuizMetric[] {
  const data: QuizMetric[] = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];

    data.push({
      date: dateStr,
      avgScore: Math.floor(55 + Math.random() * 35),
      completionRate: Math.floor(45 + Math.random() * 50),
      totalAttempts: Math.floor(20 + Math.random() * 60),
    });
  }

  return data;
}

/**
 * Get trending AI questions
 */
export function getTrendingAITopics(): AITopic[] {
  return [
    { question: 'When is the next Lok Sabha election?', frequency: 142, category: 'timeline' },
    { question: 'How do I register to vote?', frequency: 128, category: 'registration' },
    { question: 'What is Model Code of Conduct?', frequency: 95, category: 'mcc' },
    { question: 'How does EVM voting work?', frequency: 87, category: 'evm' },
    { question: 'What are the eligibility requirements?', frequency: 76, category: 'voting' },
    { question: 'How is VVPAT used?', frequency: 54, category: 'evm' },
    { question: 'What is the difference between MP and MLA?', frequency: 43, category: 'voting' },
  ];
}

/**
 * Generate regional user distribution
 * Based on actual Indian state populations and internet penetration
 */
export function getRegionalDistribution(): RegionalData[] {
  return [
    { state: 'Maharashtra', users: 245, region: 'West' },
    { state: 'Uttar Pradesh', users: 228, region: 'North' },
    { state: 'Tamil Nadu', users: 187, region: 'South' },
    { state: 'Karnataka', users: 165, region: 'South' },
    { state: 'Delhi', users: 142, region: 'North' },
    { state: 'Gujarat', users: 128, region: 'West' },
    { state: 'Telangana', users: 112, region: 'South' },
    { state: 'Rajasthan', users: 98, region: 'North' },
    { state: 'West Bengal', users: 87, region: 'East' },
    { state: 'Madhya Pradesh', users: 76, region: 'Central' },
  ];
}

/**
 * Calculate engagement metrics
 */
export function calculateMetrics(data: DailyEngagement[]) {
  const totalPageViews = data.reduce((sum, d) => sum + d.pageViews, 0);
  const totalUsers = data.reduce((sum, d) => sum + d.uniqueUsers, 0);
  const totalQuizzes = data.reduce((sum, d) => sum + d.quizAttempts, 0);
  const totalAI = data.reduce((sum, d) => sum + d.aiQuestions, 0);

  const avgPageViews = Math.floor(totalPageViews / data.length);
  const avgUsers = Math.floor(totalUsers / data.length);

  return {
    totalPageViews,
    totalUsers,
    totalQuizzes,
    totalAI,
    avgPageViews,
    avgUsers,
    quizToUsersRatio: (totalQuizzes / totalUsers).toFixed(2),
    aiToUsersRatio: (totalAI / totalUsers).toFixed(2),
  };
}
