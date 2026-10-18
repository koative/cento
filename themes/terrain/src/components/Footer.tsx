import { useState, type FormEvent } from "react";
import { Link } from "../router";
import { brand, newsletter, trips } from "../content";
import { Logo } from "./Marks";

const columns = [
  {
    title: "Plan",
    links: [
      ["/trips", "All trips"],
      ["/route-finder", "Route finder"],
      ["/gear", "Gear list"],
      ["/book", "Book a trip"],
    ],
  },
  {
    title: "Terrain",
    links: [
      ["/guides", "Our guides"],
      ["/about", "About & safety"],
      ["/faq", "FAQ & policies"],
    ],
  },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem(
      "newsletter",
    ) as HTMLInputElement;
    if (!input.checkValidity()) {
      setError(
        input.validity.valueMissing
          ? "Enter your email to get the trail letter."
          : "That email looks incomplete: try name@example.com.",
      );
      input.focus();
      return;
    }
    setError("");
    setDone(true);
  };

  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Link to="/" className="logo" aria-label={`${brand.name}, home`}>
            <Logo />
            <span>terrain</span>
          </Link>
          <p>Good company. Open country.</p>
          <address>
            {brand.address.map((l) => (
              <span key={l}>{l}</span>
            ))}
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
            <a href={brand.phoneHref}>{brand.phone}</a>
            <span>{brand.hours}</span>
          </address>
        </div>

        <div className="footer-col">
          <h2>Trips</h2>
          <ul>
            {trips.map((t) => (
              <li key={t.slug}>
                <Link to={`/trips/${t.slug}`}>{t.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        {columns.map((c) => (
          <div className="footer-col" key={c.title}>
            <h2>{c.title}</h2>
            <ul>
              {c.links.map(([to, label]) => (
                <li key={to}>
                  <Link to={to}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="footer-news">
          <h2>{newsletter.title}</h2>
          <p>{newsletter.text}</p>
          <div aria-live="polite">
            {done && (
              <p className="form-success">
                You're on the list. The next letter goes out on the first Sunday
                of the month.
              </p>
            )}
          </div>
          {!done && (
            <form noValidate onSubmit={submit} className="news-form">
              <label htmlFor="newsletter">Email address</label>
              <div className="news-row">
                <input
                  id="newsletter"
                  name="newsletter"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? "newsletter-err" : undefined}
                />
                <button type="submit" className="btn btn-sign">
                  Subscribe
                </button>
              </div>
              {error && (
                <p className="field-error" id="newsletter-err">
                  {error}
                </p>
              )}
            </form>
          )}
          <ul className="social">
            {brand.social.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="wrap footer-base">
        <p>
          {brand.name} is a fictional brand — a{" "}
          <a href="https://cento.koative.com/">Cento</a> template by
          Koative.
        </p>
        <p>
          Prices in euros, per person. Demo site: nothing is booked, sent or
          charged.
        </p>
      </div>
    </footer>
  );
}
