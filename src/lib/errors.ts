/**
 * Advanced error utilities for comprehensive error handling and recovery.
 * Provides typed error classes and error boundary utilities.
 */

export class ElectionAPIError extends Error {
  code: string;
  statusCode?: number;

  constructor(
    message: string,
    code: string = 'UNKNOWN',
    statusCode?: number
  ) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
    this.name = 'ElectionAPIError';
  }
}

export class RateLimitError extends ElectionAPIError {
  constructor(message: string = 'Too many requests. Please wait a moment.') {
    super(message, 'RATE_LIMIT', 429);
    this.name = 'RateLimitError';
  }
}

export class ValidationError extends ElectionAPIError {
  constructor(message: string) {
    super(message, 'VALIDATION_ERROR', 400);
    this.name = 'ValidationError';
  }
}

/**
 * Safe error message for user display.
 * Returns user-friendly message without exposing internal details.
 */
export function getUserFriendlyErrorMessage(error: unknown): string {
  if (error instanceof RateLimitError) {
    return 'Too many questions asked. Please wait a moment and try again.';
  }
  if (error instanceof ValidationError) {
    return 'Please check your input and try again.';
  }
  if (error instanceof ElectionAPIError) {
    return 'Unable to fetch answer. Please try again in a moment.';
  }
  if (error instanceof Error) {
    return error.message || 'An unexpected error occurred.';
  }
  return 'An unexpected error occurred. Please refresh and try again.';
}

/**
 * Log error for debugging and monitoring
 */
export function logError(error: unknown, context?: string) {
  const timestamp = new Date().toISOString();
  const contextStr = context ? ` [${context}]` : '';
  
  if (error instanceof Error) {
    console.error(`[${timestamp}] Error${contextStr}:`, error.message, error);
  } else {
    console.error(`[${timestamp}] Error${contextStr}:`, error);
  }
}
