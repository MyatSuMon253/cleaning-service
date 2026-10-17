export type Locale = "en" | "my";

export const LOCALE_COOKIE = "tidy-locale";

/** Burmese first — the primary audience is Yangon households. */
export const DEFAULT_LOCALE: Locale = "my";

export const LOCALES: readonly Locale[] = ["my", "en"];

export function parseLocale(value: string | undefined): Locale {
  return value === "en" || value === "my" ? value : DEFAULT_LOCALE;
}
