import { ArrowRight } from "lucide-react";
import type { Dictionary } from "../content/dictionaries";
import { durationKey, formatMmk } from "../lib/format";
import { DAMAGE_COVERAGE_MMK, SERVICES, TIERS, isFixed } from "../lib/services";

export function Pricing({ t }: { t: Dictionary }) {
  const fixed = SERVICES.filter(isFixed);
  const deep = SERVICES.find((s) => !isFixed(s));

  return (
    <section className="section" id="pricing">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{t.pricing.eyebrow}</span>
          <h2>{t.pricing.heading}</h2>
        </div>

        <div className="pricing-tiers">
          {TIERS.map((tier) => (
            <div key={tier.hours} className="tier-row">
              <span className="tier-duration">{t.pricing.duration[durationKey(tier.hours)]}</span>
              <span className="tier-price">
                {formatMmk(tier.mmk)}
                <span>{t.pricing.currency}</span>
              </span>
            </div>
          ))}
        </div>

        <p className="pricing-note">
          {t.pricing.appliesTo} {fixed.map((s) => t.services[s.id].name).join(" · ")}.
        </p>
        <p className="pricing-note">{t.pricing.durationNote}</p>
        <p className="pricing-note">{t.pricing.materialsNote}</p>
        <p className="pricing-note">
          {t.pricing.damageNote} {formatMmk(DAMAGE_COVERAGE_MMK)} {t.pricing.currency}.
        </p>

        {deep ? (
          <div className="pricing-deep">
            <h3>{t.pricing.deepHeading}</h3>
            <p className="pricing-note">{t.pricing.deepNote}</p>

            <div className="survey-fee">
              <span className="tier-duration">{t.pricing.surveyFee}</span>
              <span className="tier-price">
                {formatMmk(deep.pricing.kind === "quote" ? deep.pricing.surveyFeeMmk : 0)}
                <span>{t.pricing.currency}</span>
              </span>
            </div>
            <p className="pricing-note">{t.pricing.surveyFeeNote}</p>
          </div>
        ) : null}

        <div className="pricing-cta">
          <a className="btn btn-primary" href="#booking">
            {t.pricing.cta}
            <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
