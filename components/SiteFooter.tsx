import type { Dictionary } from "../content/dictionaries";

export function SiteFooter({ t }: { t: Dictionary }) {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h3 className="brand">{t.brand}</h3>
            <p>{t.footer.tagline}</p>
            <p>{t.footer.materials}</p>
            <p>{t.footer.madeNote}</p>
          </div>

          <div>
            <h3>{t.footer.contact}</h3>
            <ul className="footer-list">
              <li>
                <a href="tel:+959264853450">{t.footer.phone}: 09 264 853 450</a>
              </li>
              <li>{t.footer.addressValue}</li>
            </ul>
          </div>

          <div>
            <h3>{t.footer.hours}</h3>
            <ul className="footer-list">
              <li>{t.footer.hoursValue}</li>
            </ul>
          </div>
        </div>

        <p className="footer-bottom">
          © {year} {t.brand}. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
