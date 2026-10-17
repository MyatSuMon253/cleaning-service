import Image from "next/image";
import type { Dictionary } from "../content/dictionaries";
import { GALLERY, resolveImage } from "../lib/gallery";
import type { Locale } from "../lib/locale";

export function BeforeAfter({ t, locale }: { t: Dictionary; locale: Locale }) {
  return (
    <section className="section" id="gallery">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{t.gallery.eyebrow}</span>
          <h2>{t.gallery.heading}</h2>
          <p>{t.gallery.lede}</p>
        </div>

        <div className="gallery-grid">
          {GALLERY.map((pair) => (
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
      </div>
    </section>
  );
}
