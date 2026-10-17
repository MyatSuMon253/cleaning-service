/**
 * Booking shapes and the initial form state.
 *
 * These live outside `app/actions.ts` because a "use server" module may only
 * export async functions — exporting the state object from there is a runtime
 * error that the production build does not catch.
 */

export type BookingSummary = {
  serviceName: string;
  date: string;
  shift: string;
  duration: string | null;
  surveyFee: string | null;
  phone: string;
};

export type BookingResult = {
  status: "idle" | "success" | "error";
  message: string;
  reference?: string;
  fieldErrors?: Record<string, string>;
  summary?: BookingSummary;
};

export const initialBookingState: BookingResult = { status: "idle", message: "" };
