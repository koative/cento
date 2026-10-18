import { useState, type FormEvent } from "react";
import { Link } from "../router";
import { brand, locations, nav, services } from "../content";
import { Logo } from "./Header";

export function Footer() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem(
      "letter-email",
    ) as HTMLInputElement;
    if (input.validity.valueMissing)
      return setError("Enter your email address to get the letter.");
    if (!input.validity.valid)
      return setError(
        "That email looks incomplete — use the form name@example.com.",
      );
    setError("");
    setDone(true);
  }

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <Logo />
          <p>{brand.tagline}</p>
          <p>
            <a href={brand.phoneHref}>{brand.phone}</a>
            <br />
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
          </p>
          <p className="footer-emergency">{brand.emergency}</p>
        </div>

        <form className="letter" onSubmit={submit} noValidate>
          <h2>The season’s letter</h2>
          <p>
            Four emails a year: flu clinic dates, school vaccine reminders and
            the odd note from our doctors. Nothing else.
          </p>
          {done ? (
            <p className="letter-done" role="status">
              Thank you — the autumn letter will reach {email} in November.
            </p>
          ) : (
            <div className="letter-row">
              <label htmlFor="letter-email" className="visually-hidden">
                Email address
              </label>
              <input
                id="letter-email"
                name="letter-email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={error ? true : undefined}
                aria-describedby="letter-error"
              />
              <button type="submit" className="btn">
                Subscribe
              </button>
            </div>
          )}
          <p className="error" id="letter-error" aria-live="polite">
            {error}
          </p>
        </form>
      </div>

      <div className="footer-cols">
        <div>
          <h2>Care</h2>
          <ul>
            <li>
              <Link to="/services">All services</Link>
            </li>
            {services.map((s) => (
              <li key={s.slug}>
                <Link to={`/services/${s.slug}`}>{s.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Practice</h2>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {nav.map((n) => (
              <li key={n.to}>
                <Link to={n.to}>{n.label}</Link>
              </li>
            ))}
            <li>
              <Link to="/book">Book a visit</Link>
            </li>
          </ul>
        </div>
        <div>
          <h2>Clinics</h2>
          <ul className="footer-clinics">
            {locations.map((l) => (
              <li key={l.slug}>
                <Link to="/locations">{l.name}</Link>
                <span>{l.street}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Follow</h2>
          <ul>
            {brand.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="footer-legal">
        {brand.name} is a fictional brand — a{" "}
        <a href="https://cento.koative.com/">Cento</a> template by
        Koative. Nothing on this site is medical advice.
      </p>
    </footer>
  );
}
