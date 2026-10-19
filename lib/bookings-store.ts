/**
 * Reads the booking log the public form appends to, plus a parallel status log.
 *
 * Both files are newline-delimited JSON and append-only: a status change writes
 * a new line and the last line for an id wins. That keeps writes atomic enough
 * for a single-process deployment without pulling in a database.
 */

import { appendFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import {
  DEFAULT_STATUS,
  isBookingStatus,
  type Booking,
  type BookingRecord,
  type BookingStatus,
} from "./admin";
import { bookingReference } from "./format";
import { getService } from "./services";

const DATA_DIRECTORY = path.join(process.cwd(), "data");
const BOOKINGS_FILE = path.join(DATA_DIRECTORY, "bookings.json");
const STATUS_FILE = path.join(DATA_DIRECTORY, "booking-status.json");

type StatusEntry = { id: string; status: BookingStatus; updatedAt: string };

async function readLines(file: string): Promise<unknown[]> {
  let raw: string;
  try {
    raw = await readFile(file, "utf8");
  } catch {
    // No bookings yet — an absent file is an empty log, not an error.
    return [];
  }

  const parsed: unknown[] = [];
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    try {
      parsed.push(JSON.parse(trimmed));
    } catch {
      // Skip a torn or hand-edited line rather than failing the whole dashboard.
    }
  }
  return parsed;
}

function isBookingRecord(value: unknown): value is BookingRecord {
  if (typeof value !== "object" || value === null) return false;
  const record = value as Partial<BookingRecord>;
  return (
    typeof record.id === "string" &&
    typeof record.createdAt === "string" &&
    typeof record.name === "string" &&
    typeof record.phone === "string" &&
    typeof record.date === "string" &&
    getService(record.serviceId) !== undefined
  );
}

function isStatusEntry(value: unknown): value is StatusEntry {
  if (typeof value !== "object" || value === null) return false;
  const entry = value as Partial<StatusEntry>;
  return typeof entry.id === "string" && isBookingStatus(entry.status);
}

/** Every booking, newest first, with its current status folded in. */
export async function readBookings(): Promise<Booking[]> {
  const [records, statusLines] = await Promise.all([readLines(BOOKINGS_FILE), readLines(STATUS_FILE)]);

  const statuses = new Map<string, StatusEntry>();
  for (const line of statusLines) {
    if (isStatusEntry(line)) statuses.set(line.id, line);
  }

  return records
    .filter(isBookingRecord)
    .map((record) => {
      const entry = statuses.get(record.id);
      return {
        ...record,
        reference: bookingReference(record.id),
        status: entry?.status ?? DEFAULT_STATUS,
        statusUpdatedAt: entry?.updatedAt ?? null,
      };
    })
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

/** Appends a status change. Returns false when the id is not in the booking log. */
export async function writeBookingStatus(id: string, status: BookingStatus): Promise<boolean> {
  const exists = (await readLines(BOOKINGS_FILE)).filter(isBookingRecord).some((r) => r.id === id);
  if (!exists) return false;

  const entry: StatusEntry = { id, status, updatedAt: new Date().toISOString() };
  await mkdir(DATA_DIRECTORY, { recursive: true });
  await appendFile(STATUS_FILE, `${JSON.stringify(entry)}\n`, "utf8");
  return true;
}
