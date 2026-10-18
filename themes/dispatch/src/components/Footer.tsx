import { Link } from "../router";
import { brand, footerColumns, topics } from "../content";
import { Logo } from "./Header";
import { SubscribeForm } from "./SubscribeForm";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Link to="/" className="logo" aria-label={`${brand.name}, home`}>
            <Logo />
          </Link>
          <p>{brand.tagline}</p>
          <address>
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
            <br />
            <a href={brand.phoneHref}>{brand.phone}</a>
            <br />
            {brand.postal.join(", ")}
          </address>
          <ul className="footer-social">
            {brand.social.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {footerColumns.map((col) => (
          <nav key={col.title} aria-label={col.title} className="footer-col">
            <h2>{col.title}</h2>
            <ul>
              {col.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <nav aria-label="Topics" className="footer-col">
          <h2>Topics</h2>
          <ul>
            {topics.map((t) => (
              <li key={t.id}>
                <Link to={`/topics/${t.id}`}>{t.name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer-news">
          <h2>The Sunday Letter</h2>
          <p>Free, every week, 7 a.m. your time.</p>
          <SubscribeForm id="footer" button="Sign me up" />
        </div>
      </div>
      <div className="wrap footer-base">
        <p>
          {brand.name} is a fictional brand — a{" "}
          <a href="https://koative.github.io/cento/">Cento</a> template by
          Koative.
        </p>
        <p>
          Writer, people, places and prices are sample content. Prices in USD.
        </p>
      </div>
    </footer>
  );
}
