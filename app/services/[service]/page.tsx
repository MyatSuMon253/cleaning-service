import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BeforeAfter } from "../../../components/BeforeAfter";
import { BookingForm } from "../../../components/BookingForm";
import { SiteFooter } from "../../../components/SiteFooter";
import { SiteHeader } from "../../../components/SiteHeader";
import { dictionaries } from "../../../content/dictionaries";
import { durationKey, formatMmk } from "../../../lib/format";
import { galleryFor } from "../../../lib/gallery";
import { LOCALE_COOKIE, parseLocale } from "../../../lib/locale";
import { materialImage } from "../../../lib/materials";
import { DAMAGE_COVERAGE_MMK, formatStartHour, getService, isFixed } from "../../../lib/services";

type ServiceRouteProps = { params: Promise<{ service: string }> };

export async function generateMetadata(props: ServiceRouteProps): Promise<Metadata> {
  const { service: slug } = await props.params;
  const service = getService(slug);
  if (!service) return {};

  const locale = parseLocale((await cookies()).get(LOCALE_COOKIE)?.value);
  const t = dictionaries[locale];
  const copy = t.services[service.id];

  return {
    title: `${copy.name} | ${t.brand}`,
    description: copy.blurb,
  };
}

export default async function ServicePage(props: ServiceRouteProps) {
  const { service: slug } = await props.params;
  const service = getService(slug);
  if (!service) notFound();

  const locale = parseLocale((await cookies()).get(LOCALE_COOKIE)?.value);
  const t = dictionaries[locale];
  const copy = t.services[service.id];
  const d = t.serviceDetail;
  const Icon = service.icon;

  const tiers = isFixed(service) ? service.pricing.tiers : null;
  const surveyFee = service.pricing.kind === "quote" ? service.pricing.surveyFeeMmk : null;
  const pairs = galleryFor(service.id);

  return (
    <>
      <SiteHeader t={t} locale={locale} />

      <main>
        <section className="section service-hero">
          <div className="container">
            <Icon className="service-hero-icon" size={40} aria-hidden="true" />
            <h1>{copy.name}</h1>
            <p className="hero-lede">{copy.blurb}</p>

            <div className="hero-actions">
              <a className="btn btn-primary" href="#booking">
                {t.pricing.cta}
                <ArrowRight size={18} aria-hidden="true" />
              </a>
              <a className="btn btn-ghost" href="#materials">
                {d.materialsHeading}
              </a>
            </div>
          </div>
        </section>

        {/* Prices live here rather than in a section of their own — four services,
            one short list, no reason to make the page longer. */}
        <section className="section" id="details">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">{d.overviewHeading}</span>
              <h2>{d.factsHeading}</h2>
            </div>

            <dl className="fact-grid">
              <div className="fact">
                <dt>{d.factPricing}</dt>
                <dd>{copy.note}</dd>
              </div>

              {tiers ? (
                tiers.map((tier) => (
                  <div key={tier.hours} className="fact fact-price">
                    <dt>{t.pricing.duration[durationKey(tier.hours)]}</dt>
                    <dd>
                      {formatMmk(tier.mmk)} <span>{t.pricing.currency}</span>
                    </dd>
                  </div>
                ))
              ) : (
                <div className="fact fact-price">
                  <dt>{t.pricing.surveyFee}</dt>
                  <dd>
                    {formatMmk(surveyFee ?? 0)} <span>{t.pricing.currency}</span>
                  </dd>
                </div>
              )}

              <div className="fact">
                <dt>{d.factStart}</dt>
                <dd>
                  {t.shifts.morning} {formatStartHour(9)} · {t.shifts.evening}{" "}
                  {formatStartHour(13)}
                </dd>
              </div>

              <div className="fact">
                <dt>{d.factDamage}</dt>
                <dd>
                  {formatMmk(DAMAGE_COVERAGE_MMK)} <span>{t.pricing.currency}</span>
                </dd>
              </div>
            </dl>

            {/* The 7-hour rule only applies to the fixed tiers, not to a surveyed quote. */}
            {tiers ? <p className="pricing-note">{t.pricing.durationNote}</p> : null}
            {tiers ? null : <p className="pricing-note">{t.pricing.deepNote}</p>}
            {tiers ? null : <p className="pricing-note">{t.pricing.surveyFeeNote}</p>}
            <p className="pricing-note">{t.pricing.materialsNote}</p>
          </div>
        </section>

        <section className="section" id="materials">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">{t.services.materialsHeading}</span>
              <h2>{d.materialsHeading}</h2>
              <p>{d.materialsLede}</p>
            </div>

            <ul className="material-grid">
              {copy.materials.map((item, index) => {
                const image = materialImage(service.id, index);
                return (
                  <li key={item} className="material-card">
                    {image ? (
                      <span className="material-visual">
                        {/* Decorative: the label beside it already names the item. */}
                        <Image src={image} alt="" width={160} height={160} />
                      </span>
                    ) : null}
                    <span className="material-label">{item}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <BeforeAfter
          t={t}
          locale={locale}
          pairs={pairs}
          eyebrow={copy.name}
          heading={d.resultsHeading}
          id="results"
        />

        <section className="section" id="booking">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">{t.booking.eyebrow}</span>
              <h2>{d.bookHeading}</h2>
              <p>{d.bookLede}</p>
            </div>
            <BookingForm t={t} locale={locale} initialServiceId={service.id} />
          </div>
        </section>
      </main>

      <SiteFooter t={t} />
    </>
  );
}
