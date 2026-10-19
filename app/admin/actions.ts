"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { isBookingStatus, type AdminLoginResult } from "../../lib/admin";
import { endAdminSession, requireAdmin, startAdminSession } from "../../lib/admin-auth";
import { credentialsMatch } from "../../lib/admin-session";
import { clearFailures, lockoutMinutesRemaining, recordFailure } from "../../lib/admin-throttle";
import { writeBookingStatus } from "../../lib/bookings-store";

function read(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

/** Throttle per client, falling back to a shared bucket behind a proxy that strips the header. */
async function throttleKey(): Promise<string> {
  const headerList = await headers();
  const forwarded = headerList.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || "local";
}

export async function signInAdmin(
  _previousState: AdminLoginResult,
  formData: FormData,
): Promise<AdminLoginResult> {
  const email = read(formData, "email");
  const password = read(formData, "password");
  const key = await throttleKey();

  const locked = lockoutMinutesRemaining(key);
  if (locked > 0) {
    return {
      status: "error",
      message: `Too many failed attempts. Try again in ${locked} minute${locked === 1 ? "" : "s"}.`,
    };
  }

  if (!email || !password) {
    return { status: "error", message: "Enter both your email and password." };
  }

  if (!credentialsMatch(email, password)) {
    recordFailure(key);
    // One message for both fields — naming the wrong one confirms a valid email.
    return { status: "error", message: "That email and password do not match." };
  }

  clearFailures(key);
  await startAdminSession(email);
  redirect("/admin");
}

export async function signOutAdmin(): Promise<void> {
  await endAdminSession();
  redirect("/admin/login");
}

export async function updateBookingStatus(formData: FormData): Promise<void> {
  await requireAdmin();

  const id = read(formData, "id");
  const status = read(formData, "status");
  if (!id || !isBookingStatus(status)) return;

  await writeBookingStatus(id, status);
  revalidatePath("/admin");
}
