import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { brand, footer } from "../content";
import { Logo } from "./Header";

const columns = [
  {
    title: "Shop",
    links: [
      { to: "/shop", label: "All products" },
      { to: "/drops", label: "Drops calendar" },
      { to: "/raffle", label: "Raffle entry" },
      { to: "/cart", label: "Bag" },
      { to: "/checkout", label: "Checkout" },
    ],
  },
  {
    title: "Drop",
    links: [
      { to: "/lookbook", label: "Lookbook" },
      { to: "/store", label: "The shop" },
      { to: "/help", label: "Help & sizing" },
    ],
  },
];

export function Footer() {
  const [error, setError] = useState("");
  const [done, setDone] = useState("");

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem(
      "alerts",
    ) as HTMLInputElement;
    if (!input.validity.valid) {
      setError(
        input.validity.valueMissing
          ? "Enter an email to get the Monday lineup."
          : "That email is missing an @ or a domain like example.com.",
      );
      input.focus();
      return;
    }
    setError("");
    setDone(input.value);
    e.currentTarget.reset();
  }

  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <Logo />
          <p>{brand.tagline}</p>
          <address>
            {brand.address.map((l) => (
              <span key={l}>{l}</span>
            ))}
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
            <a href={brand.phoneHref}>{brand.phone}</a>
          </address>
        </div>

        {columns.map((c) => (
          <nav key={c.title} aria-label={c.title} className="footer-col">
            <h2>{c.title}</h2>
            <ul>
              {c.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="footer-col">
          <h2>Follow</h2>
          <ul>
            {brand.social.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <form className="alerts" noValidate onSubmit={submit}>
          <h2 id="alerts-title">{footer.alertsTitle}</h2>
          <p>{footer.alertsText}</p>
          <label htmlFor="alerts" className="visually-hidden">
            Email for drop alerts
          </label>
          <div className="alerts-row">
            <input
              id="alerts"
              name="alerts"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? "alerts-error" : undefined}
            />
            <button type="submit" className="btn btn-signal">
              Sign up <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
          {error && (
            <p className="field-error" id="alerts-error">
              {error}
            </p>
          )}
          <p className="alerts-status" aria-live="polite">
            {done &&
              `You're on the list. The next lineup goes to ${done} on Monday at 18:00.`}
          </p>
        </form>
      </div>
      <p className="footer-legal">
        {brand.name} is a fictional brand — a{" "}
        <a href="https://koative.github.io/cento/">Cento</a> template by
        Koative. Nothing on this site is sold, sent or charged.
      </p>
    </footer>
  );
}
