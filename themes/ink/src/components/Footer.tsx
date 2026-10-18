import { useState, type FormEvent } from "react";
import { Instagram } from "lucide-react";
import { Link } from "../router";
import { artists, brand, footer, hours, nav } from "../content";
import { Wordmark } from "./Wordmark";

export function Footer() {
  const [error, setError] = useState("");
  const [done, setDone] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem(
      "drop-email",
    ) as HTMLInputElement;
    if (!input.value.trim())
      return setError("Enter your email to get the flash drop.");
    if (!input.checkValidity())
      return setError("That email looks incomplete — try name@example.com.");
    setError("");
    setDone(
      `Subscribed. The next drop lands in ${input.value} on the first Monday of the month.`,
    );
    e.currentTarget.reset();
  };

  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Link to="/" className="logo" aria-label={`${brand.name}, home`}>
            <Wordmark />
          </Link>
          <p>{footer.blurb}</p>
          <address>
            {brand.street}, {brand.city}, {brand.region}
            <br />
            <a href={`tel:${brand.phone.replace(/\s/g, "")}`}>{brand.phone}</a>
            <br />
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
          </address>
          <a
            className="social"
            href={brand.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Ink on Instagram"
          >
            <Instagram aria-hidden="true" />
          </a>
        </div>

        <nav className="footer-col" aria-label="Studio">
          <h2>Studio</h2>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {nav.map((l) => (
              <li key={l.to}>
                <Link to={l.to}>{l.label}</Link>
              </li>
            ))}
            <li>
              <Link to="/book">Request a booking</Link>
            </li>
          </ul>
        </nav>

        <nav className="footer-col" aria-label="Artists">
          <h2>Artists</h2>
          <ul>
            {artists.map((a) => (
              <li key={a.id}>
                <Link to={`/artists/${a.id}`}>{a.name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer-col">
          <h2>Hours</h2>
          <dl className="hours">
            {hours.map((h) => (
              <div key={h.days}>
                <dt>{h.days}</dt>
                <dd>{h.time}</dd>
              </div>
            ))}
          </dl>
        </div>

        <form className="footer-form" noValidate onSubmit={onSubmit}>
          <h2>{footer.newsletterTitle}</h2>
          <p>{footer.newsletterText}</p>
          <label htmlFor="drop-email">Email</label>
          <div className="inline-field">
            <input
              id="drop-email"
              name="drop-email"
              type="email"
              autoComplete="email"
              required
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? "drop-email-err" : undefined}
            />
            <button type="submit" className="btn btn-paper">
              Subscribe
            </button>
          </div>
          {error && (
            <p className="field-error" id="drop-email-err">
              {error}
            </p>
          )}
          <p className="form-status" aria-live="polite">
            {done}
          </p>
        </form>
      </div>
      <div className="wrap footer-base">
        <p>
          {brand.name} is a fictional brand — a{" "}
          <a href="https://koative.github.io/cento/">Cento</a> template by
          Koative.
        </p>
        <p>
          Licence BA-2291 · 18+ with photo ID · © {brand.founded}–2026{" "}
          {brand.name}
        </p>
      </div>
    </footer>
  );
}
