import Link from "next/link";
import type { Dictionary } from "../content/dictionaries";
import type { Locale } from "../lib/locale";
import { LocaleToggle } from "./LocaleToggle";
import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader({ t, locale }: { t: Dictionary; locale: Locale }) {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand">
          {t.brand}
        </Link>

        {/* Root-relative hashes so the links also work from a service page. */}
        <nav className="nav" aria-label={t.brand}>
          <Link href="/#services">{t.nav.services}</Link>
          <Link href="/#gallery">{t.nav.gallery}</Link>
          <Link href="/#pricing">{t.nav.pricing}</Link>
          <Link href="/#booking">{t.nav.book}</Link>
          <Link href="/#terms">{t.nav.terms}</Link>
        </nav>

        <div className="header-actions">
          <LocaleToggle current={locale} label={t.nav.language} />
          <ThemeToggle label={t.nav.theme} />
        </div>
      </div>
    </header>
  );
}
