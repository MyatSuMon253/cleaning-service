import type { Dictionary } from "../content/dictionaries";
import type { Locale } from "../lib/locale";
import { LocaleToggle } from "./LocaleToggle";
import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader({ t, locale }: { t: Dictionary; locale: Locale }) {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href="#top" className="brand">
          {t.brand}
        </a>

        <nav className="nav" aria-label={t.brand}>
          <a href="#services">{t.nav.services}</a>
          <a href="#gallery">{t.nav.gallery}</a>
          <a href="#pricing">{t.nav.pricing}</a>
          <a href="#booking">{t.nav.book}</a>
          <a href="#terms">{t.nav.terms}</a>
        </nav>

        <div className="header-actions">
          <LocaleToggle current={locale} label={t.nav.language} />
          <ThemeToggle label={t.nav.theme} />
        </div>
      </div>
    </header>
  );
}
