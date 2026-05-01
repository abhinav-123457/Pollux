/**
 * Real-time Firebase Analytics Data Service
 * Fetches actual engagement data from Firebase instead of mock data
 */

import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';

export interface AnalyticsEvent {
  timestamp: Date;
  eventName: string;
  params?: Record<string, string | number>;
  userId?: string;
}

/**
 * Fetch real page view events from Firebase
 */
export async function getPageViewEvents(daysBack: number = 30) {
  if (!db) {
    console.warn('Firebase not initialized');
    return [];
  }
  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysBack);

    const analyticsRef = collection(db, 'analytics_events');
    const q = query(
      analyticsRef,
      where('eventName', '==', 'page_view'),
      where('timestamp', '>=', Timestamp.fromDate(startDate)),
      orderBy('timestamp', 'desc'),
      limit(1000)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      ...doc.data(),
      timestamp: doc.data().timestamp?.toDate(),
    })) as AnalyticsEvent[];
  } catch (error) {
    console.error('Error fetching page view events:', error);
    return [];
  }
}

/**
 * Fetch quiz completion events
 */
export async function getQuizEvents(daysBack: number = 30) {
  if (!db) {
    console.warn('Firebase not initialized');
    return [];
  }
  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysBack);

    const analyticsRef = collection(db, 'analytics_events');
    const q = query(
      analyticsRef,
      where('eventName', '==', 'quiz_completed'),
      where('timestamp', '>=', Timestamp.fromDate(startDate)),
      orderBy('timestamp', 'desc'),
      limit(500)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      ...doc.data(),
      timestamp: doc.data().timestamp?.toDate(),
    })) as AnalyticsEvent[];
  } catch (error) {
    console.error('Error fetching quiz events:', error);
    return [];
  }
}

/**
 * Fetch AI question events
 */
export async function getAIQuestionEvents(daysBack: number = 30) {
  if (!db) {
    console.warn('Firebase not initialized');
    return [];
  }
  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysBack);

    const analyticsRef = collection(db, 'analytics_events');
    const q = query(
      analyticsRef,
      where('eventName', '==', 'ai_question_asked'),
      where('timestamp', '>=', Timestamp.fromDate(startDate)),
      orderBy('timestamp', 'desc'),
      limit(500)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      ...doc.data(),
      timestamp: doc.data().timestamp?.toDate(),
    })) as AnalyticsEvent[];
  } catch (error) {
    console.error('Error fetching AI events:', error);
    return [];
  }
}

/**
 * Aggregate daily stats from raw events
 */
export interface DailyStats {
  date: string;
  pageViews: number;
  uniqueUsers: number;
  quizAttempts: number;
  aiQuestions: number;
}

export function aggregateDailyStats(
  pageViewEvents: AnalyticsEvent[],
  quizEvents: AnalyticsEvent[],
  aiEvents: AnalyticsEvent[]
): DailyStats[] {
  interface DailyStatsAccumulator {
    date: string;
    pageViews: number;
    uniqueUsers: Set<string>;
    quizAttempts: number;
    aiQuestions: number;
  }

  const statsMap = new Map<string, DailyStatsAccumulator>();

  // Process page view events
  pageViewEvents.forEach((event) => {
    const date = event.timestamp ? event.timestamp.toISOString().split('T')[0] : '';
    const existing = statsMap.get(date) || {
      date,
      pageViews: 0,
      uniqueUsers: new Set<string>(),
      quizAttempts: 0,
      aiQuestions: 0,
    };

    existing.pageViews += 1;
    if (event.userId) {
      existing.uniqueUsers.add(event.userId);
    }

    statsMap.set(date, existing);
  });

  // Process quiz events
  quizEvents.forEach((event) => {
    const date = event.timestamp ? event.timestamp.toISOString().split('T')[0] : '';
    const existing = statsMap.get(date) || {
      date,
      pageViews: 0,
      uniqueUsers: new Set<string>(),
      quizAttempts: 0,
      aiQuestions: 0,
    };

    existing.quizAttempts += 1;

    statsMap.set(date, existing);
  });

  // Process AI events
  aiEvents.forEach((event) => {
    const date = event.timestamp ? event.timestamp.toISOString().split('T')[0] : '';
    const existing = statsMap.get(date) || {
      date,
      pageViews: 0,
      uniqueUsers: new Set<string>(),
      quizAttempts: 0,
      aiQuestions: 0,
    };

    existing.aiQuestions += 1;

    statsMap.set(date, existing);
  });

  // Convert Sets to counts and sort by date
  return Array.from(statsMap.values())
    .map((stat: DailyStatsAccumulator): DailyStats => ({
      date: stat.date,
      pageViews: stat.pageViews,
      uniqueUsers: stat.uniqueUsers.size,
      quizAttempts: stat.quizAttempts,
      aiQuestions: stat.aiQuestions,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
}
