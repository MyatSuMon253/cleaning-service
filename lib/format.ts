import type { DurationHours, PriceTier } from "./services";

/** Keys of the localized duration map in the dictionaries. */
export type DurationKey = "3" | "4" | "7";

export function durationKey(hours: DurationHours): DurationKey {
  return String(hours) as DurationKey;
}

const NUMBER = new Intl.NumberFormat("en-US");

/** Arabic numerals in both locales — Burmese digits make phones and prices harder to compare. */
export function formatMmk(amount: number): string {
  return NUMBER.format(amount);
}

export function formatTier(tier: PriceTier): string {
  return `${tier.hours}h · ${formatMmk(tier.mmk)}`;
}

/**
 * Myanmar phones: 09XXXXXXXXX is the canonical form.
 * Accepts 09..., +959..., 959... and a bare 9...
 */
export function normalizeMmPhone(raw: string): string | null {
  let digits = raw.replace(/[\s\-()./]/g, "");
  if (digits.startsWith("+")) digits = digits.slice(1);
  if (digits.startsWith("00959")) digits = "0" + digits.slice(3);
  else if (digits.startsWith("959")) digits = "0" + digits.slice(2);
  else if (digits.startsWith("95")) digits = "0" + digits.slice(2);
  else if (/^9\d{8,9}$/.test(digits)) digits = "0" + digits;

  return /^09\d{9}$/.test(digits) ? digits : null;
}

const YANGON_OFFSET_MINUTES = 6 * 60 + 30;

/**
 * Today's date in Yangon (UTC+6:30) as YYYY-MM-DD.
 * `new Date().toISOString()` is UTC and is wrong for the last 6.5 hours of every Yangon day.
 */
export function yangonToday(now: Date = new Date()): string {
  return formatYangonDate(new Date(now.getTime() + YANGON_OFFSET_MINUTES * 60_000));
}

/** The earliest bookable date — tomorrow in Yangon. */
export function earliestBookableDate(now: Date = new Date()): string {
  return formatYangonDate(new Date(now.getTime() + 24 * 60 * 60_000 + YANGON_OFFSET_MINUTES * 60_000));
}

function formatYangonDate(shifted: Date): string {
  const y = shifted.getUTCFullYear();
  const m = String(shifted.getUTCMonth() + 1).padStart(2, "0");
  const d = String(shifted.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

/** True when `date` is a real calendar day on or after `earliest`. */
export function isBookableDate(date: string, earliest: string): boolean {
  if (!DATE_PATTERN.test(date)) return false;
  const parsed = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return false;
  const floor = new Date(`${earliest}T00:00:00Z`);
  return parsed.getTime() >= floor.getTime();
}

export function isValidDuration(value: unknown): value is DurationHours {
  return value === 3 || value === 4 || value === 7;
}

export function priceFor(duration: DurationHours, tiers: readonly PriceTier[]): number | undefined {
  return tiers.find((t) => t.hours === duration)?.mmk;
}

/** Short, stable booking reference shown to the customer. */
export function bookingReference(id: string): string {
  return `TH-${id.replace(/-/g, "").slice(0, 6).toUpperCase()}`;
}
