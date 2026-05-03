/**
 * Simple exponential backoff retry helper with jitter.
 * Use for transient network calls (429 / 5xx) where retrying is safe.
 */
export type RetryOptions = {
  retries?: number;
  minDelayMs?: number;
  maxDelayMs?: number;
  factor?: number;
};

function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  opts: RetryOptions = {}
): Promise<T> {
  const { retries = 3, minDelayMs = 200, maxDelayMs = 5000, factor = 2 } = opts;

  let attempt = 0;
  let lastErr: unknown;

  while (attempt <= retries) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      attempt += 1;

      // If we've exhausted attempts, rethrow
      if (attempt > retries) break;

      // Calculate exponential backoff with full jitter
      const exp = Math.min(maxDelayMs, minDelayMs * Math.pow(factor, attempt));
      const delay = Math.floor(Math.random() * exp);
      await sleep(delay);
    }
  }

  throw lastErr;
}
