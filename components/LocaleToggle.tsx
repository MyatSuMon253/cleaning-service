"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { LOCALE_COOKIE, type Locale } from "../lib/locale";

/**
 * Sets the locale cookie, then refreshes the RSC payload.
 * router.refresh() reconciles rather than remounts, so anything typed into
 * the booking form survives a language switch mid-entry.
 */
export function LocaleToggle({ current, label }: { current: Locale; label: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const next: Locale = current === "my" ? "en" : "my";

  function switchLocale() {
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
    startTransition(() => router.refresh());
  }

  return (
    <button
      type="button"
      className="locale-btn"
      onClick={switchLocale}
      disabled={pending}
      aria-label={`${label}: ${next === "en" ? "English" : "မြန်မာ"}`}
      title={label}
      lang={next}
    >
      {next === "en" ? "EN" : "မြန်မာ"}
    </button>
  );
}
