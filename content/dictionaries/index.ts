import type { Locale } from "../../lib/locale";
import { en } from "./en";
import { my } from "./my";

/** Structural type derived from the English copy — every key is required in every locale. */
export type Dictionary = typeof en;

export const dictionaries: Record<Locale, Dictionary> = {
  en,
  my,
};
