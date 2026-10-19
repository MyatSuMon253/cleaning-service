/**
 * In-memory lockout for the admin login form.
 *
 * Process-local and deliberately simple: with one admin account it only needs
 * to make an online password guess impractical, not survive a restart.
 */

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;

type Attempts = { count: number; firstAt: number };

const attempts = new Map<string, Attempts>();

export function lockoutMinutesRemaining(key: string, now: number = Date.now()): number {
  const entry = attempts.get(key);
  if (!entry || entry.count < MAX_ATTEMPTS) return 0;

  const remaining = entry.firstAt + WINDOW_MS - now;
  if (remaining <= 0) {
    attempts.delete(key);
    return 0;
  }
  return Math.ceil(remaining / 60_000);
}

export function recordFailure(key: string, now: number = Date.now()): void {
  const entry = attempts.get(key);
  if (!entry || now - entry.firstAt > WINDOW_MS) {
    attempts.set(key, { count: 1, firstAt: now });
    return;
  }
  entry.count += 1;
}

export function clearFailures(key: string): void {
  attempts.delete(key);
}
