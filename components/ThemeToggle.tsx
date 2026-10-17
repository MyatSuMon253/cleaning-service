"use client";

import { Moon, Sun } from "lucide-react";

/**
 * No React state and no effect: the pre-paint script in layout.tsx owns
 * `data-theme`, and CSS swaps the two icons. Toggling only mutates the DOM
 * attribute and localStorage, so there is nothing to hydrate and no chance
 * of the icon disagreeing with the page.
 */
export function ThemeToggle({ label }: { label: string }) {
  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("tidy-theme", next);
    } catch {
      /* private mode — the attribute still applies for this session */
    }
  }

  return (
    <button type="button" className="icon-btn" onClick={toggle} aria-label={label} title={label}>
      <span className="theme-icon theme-icon-light">
        <Sun size={20} />
      </span>
      <span className="theme-icon theme-icon-dark">
        <Moon size={20} />
      </span>
    </button>
  );
}
