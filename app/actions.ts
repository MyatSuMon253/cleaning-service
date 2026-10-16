"use server";

import { mkdir, appendFile } from "node:fs/promises";
import path from "node:path";

export interface BookingState {
  message: string;
  success: boolean;
}

export async function createBooking(_previousState: BookingState, formData: FormData): Promise<BookingState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const service = String(formData.get("service") ?? "").trim();
  const date = String(formData.get("date") ?? "").trim();
  const homeSize = String(formData.get("homeSize") ?? "").trim();

  if (name.length < 2 || name.length > 100) return { message: "Please enter your name (at least 2 characters).", success: false };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { message: "Please enter a valid email address.", success: false };
  if (phone.replace(/\D/g, "").length < 7) return { message: "Please enter a valid phone number.", success: false };
  if (!["regular", "deep", "move", "office"].includes(service)) return { message: "Please choose one of our available services.", success: false };
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || date < new Date().toISOString().slice(0, 10)) return { message: "Please choose a future appointment date.", success: false };
  if (!["studio", "one", "two", "three", "four"].includes(homeSize)) return { message: "Please select the size of your space.", success: false };

  const booking = { id: crypto.randomUUID(), name, email, phone, service, date, homeSize, createdAt: new Date().toISOString() };
  const dataDirectory = path.join(process.cwd(), "data");
  await mkdir(dataDirectory, { recursive: true });
  await appendFile(path.join(dataDirectory, "bookings.json"), `${JSON.stringify(booking)}\n`, "utf8");

  return { message: `You're on the list, ${name.split(" ")[0]}! We'll be in touch shortly to confirm your ${service === "regular" ? "regular clean" : service === "deep" ? "deep clean" : service === "move" ? "move-in / move-out clean" : "office clean"}.`, success: true };
}
