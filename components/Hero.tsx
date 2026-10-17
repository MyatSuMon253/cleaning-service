import { ArrowRight, ShieldCheck } from "lucide-react";
import type { Dictionary } from "../content/dictionaries";

export function Hero({ t }: { t: Dictionary }) {
  return (
    <section className="hero" id="top">
      <div className="container">
        <span className="eyebrow">{t.hero.eyebrow}</span>
        <h1>
          {t.hero.heading1}
          <br />
          {t.hero.heading2}
        </h1>
        <p className="hero-lede">{t.hero.lede}</p>

        <div className="hero-actions">
          <a className="btn btn-primary" href="#booking">
            {t.hero.ctaPrimary}
            <ArrowRight size={18} aria-hidden="true" />
          </a>
          <a className="btn btn-ghost" href="#pricing">
            {t.hero.ctaSecondary}
          </a>
        </div>

        <p className="hero-note">
          <ShieldCheck size={18} aria-hidden="true" />
          {t.hero.materialsNote}
        </p>
      </div>
    </section>
  );
}

export function TrustStrip({ t }: { t: Dictionary }) {
  return (
    <section className="trust-strip" aria-label={t.services.heading}>
      <div className="container">
        <div className="trust-grid">
          {t.trust.map((item) => (
            <div key={item.title} className="trust-item">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
