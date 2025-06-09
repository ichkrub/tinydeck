import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

export class RateLimiter {
  private static instance: RateLimiter;
  private ratelimit: Ratelimit;

  private constructor() {
    // Initialize Upstash Redis client
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL || '',
      token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
    });

    // Create rate limiter that allows 3 requests per day per IP or user
    this.ratelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(3, '24 h'),
      analytics: true,
      prefix: 'ratelimit:pdf:',
    });
  }

  public static getInstance(): RateLimiter {
    if (!RateLimiter.instance) {
      RateLimiter.instance = new RateLimiter();
    }
    return RateLimiter.instance;
  }

  async isAllowed(identifier: string): Promise<{ success: boolean; limit: number; remaining: number }> {
    const result = await this.ratelimit.limit(identifier);
    return {
      success: result.success,
      limit: result.limit,
      remaining: result.remaining,
    };
  }
}
