import Image from "next/image";
import type { Dictionary } from "../content/dictionaries";
import { GALLERY, type BeforeAfterPair, resolveImage } from "../lib/gallery";
import type { Locale } from "../lib/locale";

export function BeforeAfter({
  t,
  locale,
  pairs = GALLERY,
  eyebrow,
  heading,
  lede,
  id = "gallery",
}: {
  t: Dictionary;
  locale: Locale;
  /** Defaults to the whole gallery; service pages pass their own subset. */
  pairs?: readonly BeforeAfterPair[];
  eyebrow?: string;
  heading?: string;
  lede?: string;
  id?: string;
}) {
  return (
    <section className="section" id={id}>
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{eyebrow ?? t.gallery.eyebrow}</span>
          <h2>{heading ?? t.gallery.heading}</h2>
          <p>{lede ?? t.gallery.lede}</p>
        </div>

        {pairs.length === 0 ? (
          <p className="pricing-note">{t.gallery.empty}</p>
        ) : (
          <div className="gallery-grid">
            {pairs.map((pair) => (
              <figure key={pair.id} className="ba-pair">
                <div className="ba-images">
                  <div className="ba-figure">
                    <Image
                      src={resolveImage(pair.before)}
                      alt={pair.before.alt[locale]}
                      fill
                      sizes="(max-width: 640px) 50vw, 45vw"
                    />
                    <span className="ba-badge">{t.gallery.before}</span>
                  </div>
                  <div className="ba-figure">
                    <Image
                      src={resolveImage(pair.after)}
                      alt={pair.after.alt[locale]}
                      fill
                      sizes="(max-width: 640px) 50vw, 45vw"
                    />
                    <span className="ba-badge">{t.gallery.after}</span>
                  </div>
                </div>
                <figcaption className="ba-caption">{pair.caption[locale]}</figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
