import { useState, type FormEvent } from "react";
import { Link } from "../router";
import { brand, footerColumns, destinations } from "../content";
import { Logo } from "./Header";

function Dispatch() {
  const [error, setError] = useState("");
  const [done, setDone] = useState("");

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem(
      "dispatch-email",
    ) as HTMLInputElement;
    const value = input.value.trim();
    if (!value) return setError("Enter your email address to subscribe.");
    if (!input.validity.valid)
      return setError(
        "That email looks incomplete. Check for an @ and a domain, like name@example.com.",
      );
    setError("");
    setDone(value);
  }

  return (
    <form className="dispatch" onSubmit={submit} noValidate>
      <h2 className="footer-title">The Dispatch</h2>
      <p>
        One letter a month from whichever planner is on the road. No offers,
        ever.
      </p>
      {done ? (
        <p className="form-success" role="status">
          Subscribed. The next Dispatch goes to {done} on the first Sunday of
          the month.
        </p>
      ) : (
        <>
          <label htmlFor="dispatch-email">Email address</label>
          <div className="dispatch-row">
            <input
              id="dispatch-email"
              name="dispatch-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? "dispatch-error" : undefined}
              onInput={() => error && setError("")}
            />
            <button className="btn btn-paper" type="submit">
              Subscribe
            </button>
          </div>
          {error && (
            <p id="dispatch-error" className="field-error" role="alert">
              {error}
            </p>
          )}
        </>
      )}
    </form>
  );
}

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
            {brand.address.map((l) => (
              <span key={l}>{l}</span>
            ))}
            <a href={brand.phoneHref}>{brand.phone}</a>
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
          </address>
        </div>
        {footerColumns.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <h2 className="footer-title">{c.title}</h2>
            <ul>
              {c.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <nav aria-label="Destinations">
          <h2 className="footer-title">Destinations</h2>
          <ul>
            {destinations.map((d) => (
              <li key={d.slug}>
                <Link to={`/destinations/${d.slug}`}>{d.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <Dispatch />
      </div>
      <div className="wrap footer-base">
        <p>
          {brand.name} is a fictional brand — a{" "}
          <a href="https://koative.github.io/cento/">Cento</a> template by
          Koative.
        </p>
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
    </footer>
  );
}
