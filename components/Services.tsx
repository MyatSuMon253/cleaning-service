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
                <p className="service-note">{copy.note}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
