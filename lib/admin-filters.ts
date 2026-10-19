/**
 * Dashboard filtering. Lives in the URL so a filtered view is linkable and
 * needs no client-side state.
 */

import { BOOKING_STATUSES, type Booking, type BookingStatus } from "./admin";
import { SERVICES, type ServiceId } from "./services";

export type BookingFilters = {
  status: BookingStatus | "all";
  service: ServiceId | "all";
  from: string;
  to: string;
  q: string;
};

export const emptyFilters: BookingFilters = { status: "all", service: "all", from: "", to: "", q: "" };

const DATE = /^\d{4}-\d{2}-\d{2}$/;

function one(value: string | string[] | undefined): string {
  return (Array.isArray(value) ? value[0] : value)?.trim() ?? "";
}

export function parseFilters(params: Record<string, string | string[] | undefined>): BookingFilters {
  const status = one(params.status);
  const service = one(params.service);
  const from = one(params.from);
  const to = one(params.to);

  return {
    status: (BOOKING_STATUSES as readonly string[]).includes(status) ? (status as BookingStatus) : "all",
    service: SERVICES.some((s) => s.id === service) ? (service as ServiceId) : "all",
    from: DATE.test(from) ? from : "",
    to: DATE.test(to) ? to : "",
    q: one(params.q).slice(0, 80),
  };
}

export function hasActiveFilters(filters: BookingFilters): boolean {
  return (
    filters.status !== "all" ||
    filters.service !== "all" ||
    filters.from !== "" ||
    filters.to !== "" ||
    filters.q !== ""
  );
}

/** Matches name, phone and booking reference — the three things a caller gives on the phone. */
function matchesQuery(booking: Booking, query: string): boolean {
  const needle = query.toLowerCase();
  // Digits only, and only when there are any: `"".includes("")` would match every phone.
  const digits = needle.replace(/\D/g, "");

  return (
    booking.name.toLowerCase().includes(needle) ||
    booking.reference.toLowerCase().includes(needle) ||
    (digits.length > 0 && booking.phone.includes(digits))
  );
}

export function applyFilters(bookings: Booking[], filters: BookingFilters): Booking[] {
  return bookings.filter((booking) => {
    if (filters.status !== "all" && booking.status !== filters.status) return false;
    if (filters.service !== "all" && booking.serviceId !== filters.service) return false;
    if (filters.from && booking.date < filters.from) return false;
    if (filters.to && booking.date > filters.to) return false;
    if (filters.q && !matchesQuery(booking, filters.q)) return false;
    return true;
  });
}

export type BookingTotals = {
  all: number;
  byStatus: Record<BookingStatus, number>;
  upcoming: number;
  quotedMmk: number;
};

/** Counted over every booking, so the tiles stay stable while filters change. */
export function totals(bookings: Booking[], today: string): BookingTotals {
  const byStatus = { new: 0, confirmed: 0, done: 0, cancelled: 0 } satisfies Record<BookingStatus, number>;
  let upcoming = 0;
  let quotedMmk = 0;

  for (const booking of bookings) {
    byStatus[booking.status] += 1;
    if (booking.date >= today && booking.status !== "cancelled") upcoming += 1;
    if (booking.status !== "cancelled") quotedMmk += booking.quotedPriceMmk ?? booking.surveyFeeMmk ?? 0;
  }

  return { all: bookings.length, byStatus, upcoming, quotedMmk };
}
