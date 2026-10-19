/**
 * Admin session: a signed cookie, no database and no dependencies.
 *
 * The credentials live in `.env` (ADMIN_EMAIL / ADMIN_PASSWORD) and the cookie
 * is an HMAC over `{email, exp}`, so a forged or expired cookie is rejected
 * without any server-side session store.
 *
 * Node-only (`node:crypto`), so importing this from a Client Component fails
 * the build rather than leaking the secret.
 */

import { createHmac, timingSafeEqual } from "node:crypto";
import { ADMIN_SESSION_MAX_AGE_SECONDS } from "./admin";

export type AdminSession = { email: string; exp: number };

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not set. Copy .env.example to .env and fill it in.`);
  }
  return value;
}

/** Constant-time comparison that also tolerates differing lengths. */
function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a, "utf8");
  const right = Buffer.from(b, "utf8");
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function credentialsMatch(email: string, password: string): boolean {
  // Both comparisons always run so a wrong email and a wrong password cost the same.
  const emailOk = safeEqual(email.toLowerCase(), requireEnv("ADMIN_EMAIL").toLowerCase());
  const passwordOk = safeEqual(password, requireEnv("ADMIN_PASSWORD"));
  return emailOk && passwordOk;
}

function sign(payload: string): string {
  return createHmac("sha256", requireEnv("ADMIN_SESSION_SECRET")).update(payload).digest("base64url");
}

export function createSessionToken(email: string, now: Date = new Date()): string {
  const session: AdminSession = {
    email,
    exp: Math.floor(now.getTime() / 1000) + ADMIN_SESSION_MAX_AGE_SECONDS,
  };
  const payload = Buffer.from(JSON.stringify(session), "utf8").toString("base64url");
  return `${payload}.${sign(payload)}`;
}

/** Returns the session only when the signature verifies and it has not expired. */
export function readSessionToken(token: string | undefined, now: Date = new Date()): AdminSession | null {
  if (!token) return null;

  const separator = token.lastIndexOf(".");
  if (separator <= 0) return null;

  const payload = token.slice(0, separator);
  const signature = token.slice(separator + 1);
  if (!safeEqual(signature, sign(payload))) return null;

  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as unknown;
    if (
      typeof session !== "object" ||
      session === null ||
      typeof (session as AdminSession).email !== "string" ||
      typeof (session as AdminSession).exp !== "number"
    ) {
      return null;
    }
    const valid = session as AdminSession;
    return valid.exp * 1000 > now.getTime() ? valid : null;
  } catch {
    return null;
  }
}
