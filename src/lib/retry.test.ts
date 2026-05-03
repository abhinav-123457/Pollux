import { vi, describe, it, expect } from 'vitest';
import { retryWithBackoff } from './retry';

describe('retryWithBackoff', () => {
  it('retries until success', async () => {
    let calls = 0;
    const fn = vi.fn(async () => {
      calls += 1;
      if (calls < 3) {
        throw new Error('Transient');
      }
      return 'ok';
    });

    const res = await retryWithBackoff(() => fn(), { retries: 4, minDelayMs: 1, maxDelayMs: 5 });
    expect(res).toBe('ok');
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it('throws after exhausting retries', async () => {
    const fn = vi.fn(async () => {
      throw new Error('Always fail');
    });

    await expect(retryWithBackoff(() => fn(), { retries: 2, minDelayMs: 1, maxDelayMs: 5 })).rejects.toThrow('Always fail');
    expect(fn).toHaveBeenCalledTimes(3); // initial + 2 retries
  });
});
