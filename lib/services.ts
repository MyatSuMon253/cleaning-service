import { Home, Shirt, Sparkles, Truck, type LucideIcon } from "lucide-react";

export type ServiceId = "general" | "deep" | "moving" | "washing";

export type DurationHours = 3 | 4 | 7;

export type PriceTier = { hours: DurationHours; mmk: number };

export type ServicePricing =
  | { kind: "fixed"; tiers: readonly PriceTier[] }
  | { kind: "quote"; surveyFeeMmk: number };

export type Service = {
  id: ServiceId;
  icon: LucideIcon;
  pricing: ServicePricing;
};

export const TIERS: readonly PriceTier[] = [
  { hours: 3, mmk: 20_000 },
  { hours: 4, mmk: 25_000 },
  { hours: 7, mmk: 45_000 },
];

export const SERVICES: readonly Service[] = [
  { id: "general", icon: Sparkles, pricing: { kind: "fixed", tiers: TIERS } },
  { id: "deep", icon: Home, pricing: { kind: "quote", surveyFeeMmk: 5_000 } },
  { id: "moving", icon: Truck, pricing: { kind: "fixed", tiers: TIERS } },
  { id: "washing", icon: Shirt, pricing: { kind: "fixed", tiers: TIERS } },
];

export type ShiftId = "morning" | "evening";

export type Shift = { id: ShiftId; startHour: 9 | 13 };

export const SHIFTS: readonly Shift[] = [
  { id: "morning", startHour: 9 },
  { id: "evening", startHour: 13 },
];

/**
 * A 7-hour job starts only at 9:00 and runs to 16:00.
 * The 13:00 start is capped at 4 hours.
 */
export const SHIFT_MAX_HOURS: Record<ShiftId, DurationHours> = {
  morning: 7,
  evening: 4,
};

export const DAMAGE_COVERAGE_MMK = 100_000;

export function getService(id: string | null | undefined): Service | undefined {
  if (!id) return undefined;
  return SERVICES.find((s) => s.id === id);
}

export function isFixed(
  service: Service,
): service is Service & { pricing: { kind: "fixed"; tiers: readonly PriceTier[] } } {
  return service.pricing.kind === "fixed";
}

export function getSurveyFee(service: Service): number | null {
  return service.pricing.kind === "quote" ? service.pricing.surveyFeeMmk : null;
}

/** Hours a shift can accommodate, used to gate the 7-hour option. */
export function maxHoursFor(shift: ShiftId): DurationHours {
  return SHIFT_MAX_HOURS[shift];
}

export function formatStartHour(hour: 9 | 13): string {
  return `${hour.toString().padStart(2, "0")}:00`;
}

/** 9:00 + 7h -> "16:00". Used in the shift labels so the end time is explicit. */
export function formatEndHour(hour: 9 | 13, hours: number): string {
  const end = hour + hours;
  return `${end.toString().padStart(2, "0")}:00`;
}
