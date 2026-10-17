import { cookies } from "next/headers";
import { BeforeAfter } from "../components/BeforeAfter";
import { BookingForm } from "../components/BookingForm";
import { Hero, TrustStrip } from "../components/Hero";
import { Pricing } from "../components/Pricing";
import { Services } from "../components/Services";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { Terms } from "../components/Terms";
import { dictionaries } from "../content/dictionaries";
import { LOCALE_COOKIE, parseLocale } from "../lib/locale";

export default async function Page() {
  const locale = parseLocale((await cookies()).get(LOCALE_COOKIE)?.value);
  const t = dictionaries[locale];

  return (
    <>
      <SiteHeader t={t} locale={locale} />

      <main>
        <Hero t={t} />
        <TrustStrip t={t} />
        <Services t={t} />
        <BeforeAfter t={t} locale={locale} />
        <Pricing t={t} />

        <section className="section" id="booking">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">{t.booking.eyebrow}</span>
              <h2>{t.booking.heading}</h2>
              <p>{t.booking.lede}</p>
            </div>
            <BookingForm t={t} locale={locale} />
          </div>
        </section>

        <Terms t={t} />
      </main>

      <SiteFooter t={t} />
    </>
  );
}
