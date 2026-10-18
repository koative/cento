import { useState, type FormEvent } from "react";
import { brand, capabilities, footer } from "../content";
import { Link } from "../router";
import { Logo } from "./Logo";

export function Footer() {
  const [error, setError] = useState("");
  const [done, setDone] = useState("");

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem(
      "news-email",
    ) as HTMLInputElement;
    if (input.validity.valueMissing)
      return setError("Enter an email address to subscribe.");
    if (input.validity.typeMismatch)
      return setError(
        "That address is missing an @ or a domain, e.g. name@company.com.",
      );
    setError("");
    setDone(`Subscribed. The next issue of Shop notes goes to ${input.value}.`);
    e.currentTarget.reset();
  };

  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Logo />
          <address>
            {brand.legal}
            <br />
            {brand.address.join(", ")}
            <br />
            <a href={brand.phoneHref}>{brand.phone}</a>
            <br />
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
          </address>
          <ul className="socials">
            {brand.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav className="footer-nav" aria-label="Footer">
          <div>
            <h2>Capabilities</h2>
            <ul>
              {capabilities.map((c) => (
                <li key={c.slug}>
                  <Link to={`/capabilities/${c.slug}`}>{c.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Company</h2>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/capabilities">All capabilities</Link>
              </li>
              <li>
                <Link to="/configurator">Part configurator</Link>
              </li>
              <li>
                <Link to="/industries">Industries</Link>
              </li>
              <li>
                <Link to="/quality">Quality</Link>
              </li>
              <li>
                <Link to="/about">About & careers</Link>
              </li>
              <li>
                <Link to="/rfq">Request a quote</Link>
              </li>
            </ul>
          </div>
        </nav>

        <form className="footer-form" noValidate onSubmit={submit}>
          <h2 id="news-title">Shop notes</h2>
          <p>{footer.newsletter}</p>
          <label htmlFor="news-email">Work email</label>
          <div className="inline-form">
            <input
              id="news-email"
              name="news-email"
              type="email"
              required
              autoComplete="email"
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? "news-error" : undefined}
              onInput={() => error && setError("")}
            />
            <button type="submit" className="btn btn-dark">
              Subscribe
            </button>
          </div>
          {error && (
            <p className="error" id="news-error">
              {error}
            </p>
          )}
          <p className="success" aria-live="polite">
            {done}
          </p>
        </form>
      </div>
      <div className="wrap footer-base">
        <p>
          {brand.name} is a fictional brand — a{" "}
          <a href="https://cento.koative.com/">Cento</a> template by
          Koative.
        </p>
        <p>{brand.hours[0].join(": ")}</p>
      </div>
    </footer>
  );
}
