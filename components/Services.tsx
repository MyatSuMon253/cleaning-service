import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Dictionary } from "../content/dictionaries";
import { SERVICES } from "../lib/services";

export function Services({ t }: { t: Dictionary }) {
  return (
    <section className="section" id="services">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{t.services.eyebrow}</span>
          <h2>{t.services.heading}</h2>
          <p>{t.services.note}</p>
        </div>

        <div className="services-grid">
          {SERVICES.map((service) => {
            const copy = t.services[service.id];
            const Icon = service.icon;
            return (
              <article key={service.id} className="service-card">
                <Icon className="service-icon" size={28} aria-hidden="true" />
                <h3 className="service-name">{copy.name}</h3>
                <p className="service-blurb">{copy.blurb}</p>
                <div className="service-materials">
                  <h4 className="service-materials-heading">{t.services.materialsHeading}</h4>
                  <ul className="service-materials-list">
                    {copy.materials.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <p className="service-note">{copy.note}</p>
                <Link className="service-link" href={`/services/${service.id}`}>
                  {t.serviceDetail.detailsCta}
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
