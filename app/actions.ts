"use server";

import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { dictionaries } from "../content/dictionaries";
import type { BookingResult } from "../lib/booking";
import {
  bookingReference,
  durationKey,
  earliestBookableDate,
  formatMmk,
  isBookableDate,
  isValidDuration,
  normalizeMmPhone,
  priceFor,
} from "../lib/format";
import type { Locale } from "../lib/locale";
import { SHIFTS, getService, getSurveyFee, isFixed, type DurationHours, type ShiftId } from "../lib/services";

function read(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function parseLocaleField(value: string): Locale {
  return value === "en" || value === "my" ? value : "my";
}

export async function createBooking(
  _previousState: BookingResult,
  formData: FormData,
): Promise<BookingResult> {
  const locale = parseLocaleField(read(formData, "locale"));
  const t = dictionaries[locale];
  const errors: Record<string, string> = {};

  const name = read(formData, "name");
  const rawPhone = read(formData, "phone");
  const address = read(formData, "address");
  const serviceId = read(formData, "serviceId");
  const date = read(formData, "date");
  const shift = read(formData, "shift");
  const rawDuration = read(formData, "durationHours");
  const notes = read(formData, "notes");

  if (name.length < 2 || name.length > 100) errors.name = t.booking.errors.name;

  const phone = normalizeMmPhone(rawPhone);
  if (!phone) errors.phone = t.booking.errors.phone;

  if (address.length < 10) errors.address = t.booking.errors.address;

  const service = getService(serviceId);
  if (!service) errors.service = t.booking.errors.service;

  if (!isBookableDate(date, earliestBookableDate())) errors.date = t.booking.errors.date;

  const validShift = shift === "morning" || shift === "evening" ? (shift as ShiftId) : null;
  if (!validShift) errors.shift = t.booking.errors.shift;

  // Duration is required for fixed-price services and must not be sent for deep cleaning.
  let durationHours: DurationHours | null = null;
  let quotedPriceMmk: number | null = null;
  let surveyFeeMmk: number | null = null;

  if (service) {
    if (isFixed(service)) {
      const parsedDuration = Number(rawDuration);
      if (!isValidDuration(parsedDuration)) {
        errors.durationHours = t.booking.errors.duration;
      } else {
        durationHours = parsedDuration;
        const price = priceFor(parsedDuration, service.pricing.tiers);
        if (price === undefined) errors.durationHours = t.booking.errors.duration;
        else quotedPriceMmk = price;
      }
    } else {
      surveyFeeMmk = getSurveyFee(service);
    }
  }

  // A 7-hour job always starts at 9:00.
  if (validShift === "evening" && durationHours === 7) {
    errors.durationHours = t.booking.errors.durationNotAvailable;
  }

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: t.booking.errors.generic,
      fieldErrors: errors,
    };
  }

  const id = crypto.randomUUID();
  const record = {
    id,
    createdAt: new Date().toISOString(),
    locale,
    name,
    phone,
    address,
    serviceId,
    date,
    shift: validShift,
    durationHours,
    quotedPriceMmk,
    surveyFeeMmk,
    notes,
  };

  try {
    const dataDirectory = path.join(process.cwd(), "data");
    await mkdir(dataDirectory, { recursive: true });
    await appendFile(path.join(dataDirectory, "bookings.json"), `${JSON.stringify(record)}\n`, "utf8");
  } catch {
    return {
      status: "error",
      message: t.booking.errors.generic,
      fieldErrors: {},
    };
  }

  const shiftMeta = SHIFTS.find((s) => s.id === validShift)!;

  return {
    status: "success",
    message: t.booking.success.heading,
    reference: bookingReference(id),
    summary: {
      serviceName: service ? t.services[service.id].name : "",
      date,
      shift: `${validShift === "morning" ? t.shifts.morning : t.shifts.evening} · ${shiftMeta.startHour}:00`,
      duration:
        durationHours !== null ? t.pricing.duration[durationKey(durationHours)] : null,
      surveyFee:
        surveyFeeMmk !== null ? `${formatMmk(surveyFeeMmk)} ${t.pricing.currency}` : null,
      phone: phone ?? "",
    },
  };
}
