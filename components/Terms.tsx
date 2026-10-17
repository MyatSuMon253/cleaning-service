import type { Dictionary } from "../content/dictionaries";

export function Terms({ t }: { t: Dictionary }) {
  return (
    <section className="section" id="terms">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{t.terms.eyebrow}</span>
          <h2>{t.terms.heading}</h2>
          <p>{t.terms.intro}</p>
        </div>

        <div className="terms-grid">
          {t.terms.clauses.map((clause, index) => (
            <article key={clause.title} className="term-card">
              <h3 className="term-title">
                <span className="term-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {clause.title}
              </h3>
              <p className="term-body">{clause.body}</p>
            </article>
          ))}
        </div>

        <p className="terms-disclaimer">{t.terms.disclaimer}</p>
      </div>
    </section>
  );
}
