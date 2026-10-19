/**
 * Data access layer for the admin area.
 *
 * Every admin read goes through `requireAdmin()`, so the auth check cannot be
 * forgotten in a page or action. Checks live here rather than in a layout —
 * layouts do not re-render on client-side navigation.
 */

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { ADMIN_SESSION_COOKIE, ADMIN_SESSION_MAX_AGE_SECONDS } from "./admin";
import { createSessionToken, readSessionToken, type AdminSession } from "./admin-session";

const cookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: ADMIN_SESSION_MAX_AGE_SECONDS,
} as const;

export async function startAdminSession(email: string): Promise<void> {
  (await cookies()).set(ADMIN_SESSION_COOKIE, createSessionToken(email), cookieOptions);
}

export async function endAdminSession(): Promise<void> {
  (await cookies()).delete(ADMIN_SESSION_COOKIE);
}

/** The current session, or null. Memoized per render pass. */
export const getAdminSession = cache(async (): Promise<AdminSession | null> => {
  return readSessionToken((await cookies()).get(ADMIN_SESSION_COOKIE)?.value);
});

/** The current session, or a redirect to the login page. Use this in pages and actions. */
export async function requireAdmin(): Promise<AdminSession> {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  return session;
}
