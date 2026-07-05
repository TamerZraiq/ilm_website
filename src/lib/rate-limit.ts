import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const limiters = new Map<string, Ratelimit>();

function getLimiter(name: string, limit: number, window: Parameters<typeof Ratelimit.slidingWindow>[1]) {
  let limiter = limiters.get(name);
  if (!limiter) {
    limiter = new Ratelimit({
      redis: Redis.fromEnv(),
      prefix: `ratelimit:${name}`,
      limiter: Ratelimit.slidingWindow(limit, window),
    });
    limiters.set(name, limiter);
  }
  return limiter;
}

export async function checkRateLimit(
  name: string,
  key: string,
  limit: number,
  window: Parameters<typeof Ratelimit.slidingWindow>[1]
): Promise<boolean> {
  const { success } = await getLimiter(name, limit, window).limit(key);
  return success;
}
