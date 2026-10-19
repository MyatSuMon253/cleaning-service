/**
 * Admin-side shapes shared by server actions, the dashboard and its client bits.
 *
 * Kept out of `app/admin/actions.ts` for the same reason as `lib/booking.ts`:
 * a "use server" module may only export async functions.
 */

import type { DurationHours, ServiceId, ShiftId } from "./services";

export const ADMIN_SESSION_COOKIE = "tidy-admin";

/** Eight hours — one working day, so a shift lead is not logged out mid-round. */
export const ADMIN_SESSION_MAX_AGE_SECONDS = 8 * 60 * 60;

export const BOOKING_STATUSES = ["new", "confirmed", "done", "cancelled"] as const;

export type BookingStatus = (typeof BOOKING_STATUSES)[number];

export const DEFAULT_STATUS: BookingStatus = "new";

export const STATUS_LABELS: Record<BookingStatus, string> = {
  new: "New",
  confirmed: "Confirmed",
  done: "Done",
  cancelled: "Cancelled",
};

/** What each status can move to. Keeps the row actions to the two or three that make sense. */
export const STATUS_TRANSITIONS: Record<BookingStatus, readonly BookingStatus[]> = {
  new: ["confirmed", "cancelled"],
  confirmed: ["done", "cancelled"],
  done: ["confirmed"],
  cancelled: ["new"],
};

export function isBookingStatus(value: unknown): value is BookingStatus {
  return typeof value === "string" && (BOOKING_STATUSES as readonly string[]).includes(value);
}

/** One line of `data/bookings.json`, as written by `createBooking`. */
export type BookingRecord = {
  id: string;
  createdAt: string;
  locale: string;
  name: string;
  phone: string;
  address: string;
  busStop: string;
  busLines: string;
  serviceId: ServiceId;
  date: string;
  shift: ShiftId;
  durationHours: DurationHours | null;
  quotedPriceMmk: number | null;
  surveyFeeMmk: number | null;
  notes: string;
};

export type Booking = BookingRecord & {
  reference: string;
  status: BookingStatus;
  statusUpdatedAt: string | null;
};

export type AdminLoginResult = {
  status: "idle" | "error";
  message: string;
};

export const initialAdminLoginState: AdminLoginResult = { status: "idle", message: "" };
