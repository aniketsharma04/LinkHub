import { NextRequest } from 'next/server';

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// In-memory store for rate limiting (use Redis in production)
const store = new Map<string, RateLimitEntry>();

export function rateLimit(
  request: NextRequest,
  limit: number = 10,
  windowMs: number = 15 * 60 * 1000 // 15 minutes
): { success: boolean; remaining: number; resetTime: number } {
  const ip = request.headers.get('x-forwarded-for') || 
             request.headers.get('x-real-ip') || 
             'unknown';
  
  const now = Date.now();
  const key = `${ip}:${request.nextUrl.pathname}`;
  
  // Clean up expired entries
  store.forEach((value, key) => {
    if (value.resetTime < now) {
      store.delete(key);
    }
  });
  
  const entry = store.get(key);
  
  if (!entry || entry.resetTime < now) {
    // First request or window expired
    store.set(key, {
      count: 1,
      resetTime: now + windowMs
    });
    return {
      success: true,
      remaining: limit - 1,
      resetTime: now + windowMs
    };
  }
  
  if (entry.count >= limit) {
    return {
      success: false,
      remaining: 0,
      resetTime: entry.resetTime
    };
  }
  
  entry.count++;
  store.set(key, entry);
  
  return {
    success: true,
    remaining: limit - entry.count,
    resetTime: entry.resetTime
  };
}