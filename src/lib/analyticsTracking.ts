/**
 * Enhanced Analytics event tracking
 * Comprehensive event logging for all user interactions
 */

import { trackEvent as firebaseTrackEvent } from './firebase';

// Event type constants for better type safety
export const ANALYTICS_EVENTS = {
  PAGE_VIEW: 'page_view',
  QUIZ_STARTED: 'quiz_started',
  QUIZ_COMPLETED: 'quiz_completed',
  QUIZ_QUESTION_ANSWERED: 'quiz_question_answered',
  AI_QUESTION_ASKED: 'ai_question_asked',
  AI_RESPONSE_RECEIVED: 'ai_response_received',
  LANGUAGE_CHANGED: 'language_changed',
  FEATURE_USED: 'feature_used',
  ERROR_OCCURRED: 'error_occurred',
  OFFLINE_ACCESS: 'offline_access',
  ARTICLE_READ: 'article_read',
  SEARCH_PERFORMED: 'search_performed',
  SHARE_CONTENT: 'share_content',
  USER_SIGNUP: 'user_signup',
  USER_LOGIN: 'user_login',
  DEVICE_INFO: 'device_info',
} as const;

/**
 * Track page view
 */
export function trackPageView(page: string, title: string): void {
  firebaseTrackEvent('page_view', {
    page_path: page,
    page_title: title,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track quiz start
 */
export function trackQuizStart(): void {
  firebaseTrackEvent('quiz_started', {
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track quiz completion with score
 */
export function trackQuizComplete(score: number, totalQuestions: number): void {
  firebaseTrackEvent('quiz_completed', {
    score,
    total_questions: totalQuestions,
    percentage: Math.round((score / totalQuestions) * 100),
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track individual quiz question answer
 */
export function trackQuestionAnswered(
  questionId: string,
  correct: boolean,
  timeSpent: number
): void {
  firebaseTrackEvent('quiz_question_answered', {
    question_id: questionId,
    correct,
    time_spent_ms: timeSpent,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track AI question with metadata
 */
export function trackAIQuestion(question: string, language: string): void {
  firebaseTrackEvent('ai_question_asked', {
    question_length: question.length,
    language,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track AI response
 */
export function trackAIResponse(
  responseLength: number,
  model: string,
  language: string,
  responseTime: number
): void {
  firebaseTrackEvent('ai_response_received', {
    response_length: responseLength,
    model_used: model,
    language,
    response_time_ms: responseTime,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track language change
 */
export function trackLanguageChange(fromLang: string, toLang: string): void {
  firebaseTrackEvent('language_changed', {
    from_language: fromLang,
    to_language: toLang,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track feature usage
 */
export function trackFeatureUse(featureName: string, metadata?: Record<string, string | number>): void {
  firebaseTrackEvent('feature_used', {
    feature_name: featureName,
    ...metadata,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track errors
 */
export function trackError(errorName: string, message: string, stack?: string): void {
  firebaseTrackEvent('error_occurred', {
    error_name: errorName,
    error_message: message,
    error_stack: stack || 'N/A',
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track offline access
 */
export function trackOfflineAccess(page: string): void {
  firebaseTrackEvent('offline_access', {
    page_accessed: page,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track article/content read
 */
export function trackArticleRead(title: string, timeSpent: number): void {
  firebaseTrackEvent('article_read', {
    article_title: title,
    time_spent_ms: timeSpent,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track search
 */
export function trackSearch(query: string, resultsCount: number): void {
  firebaseTrackEvent('search_performed', {
    search_query: query,
    results_count: resultsCount,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track content sharing
 */
export function trackShare(contentType: string, platform?: string): void {
  firebaseTrackEvent('share_content', {
    content_type: contentType,
    platform: platform || 'unknown',
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track user signup
 */
export function trackSignup(signupMethod: string): void {
  firebaseTrackEvent('user_signup', {
    signup_method: signupMethod,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track user login
 */
export function trackLogin(loginMethod: string): void {
  firebaseTrackEvent('user_login', {
    login_method: loginMethod,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track device information
 */
export function trackDeviceInfo(): void {
  const ua = navigator.userAgent;
  const isMobile = /mobile/i.test(ua);
  const isTablet = /tablet|ipad/i.test(ua);
  const isDesktop = !isMobile && !isTablet;

  firebaseTrackEvent('device_info', {
    device_type: isDesktop ? 'desktop' : isTablet ? 'tablet' : 'mobile',
    user_agent: ua.substring(0, 100), // Truncate for privacy
    screen_width: window.innerWidth,
    screen_height: window.innerHeight,
    timestamp: new Date().toISOString(),
  });
}
