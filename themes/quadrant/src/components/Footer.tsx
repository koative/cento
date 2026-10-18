import { useState, type FormEvent } from "react";
import { Link } from "../router";
import { brand, capabilities, footer, offices, social } from "../content";
import { Mark } from "./Mark";

export function Footer() {
  const [error, setError] = useState("");
  const [done, setDone] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem(
      "memo-email",
    ) as HTMLInputElement;
    if (!input.value.trim())
      return setError("Enter your email address to subscribe.");
    if (!input.validity.valid)
      return setError(
        "That address looks incomplete — check for a missing @ or domain.",
      );
    setError("");
    setDone(input.value.trim());
  };

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-memo">
            <h2>{footer.newsletter.title}</h2>
            <p>{footer.newsletter.text}</p>
            <div aria-live="polite">
              {done ? (
                <p className="memo-done">
                  Subscribed. The next memo goes to <strong>{done}</strong> on
                  Monday.
                </p>
              ) : (
                <form className="memo-form" noValidate onSubmit={onSubmit}>
                  <label htmlFor="memo-email">Work email</label>
                  <div className="memo-row">
                    <input
                      id="memo-email"
                      name="memo-email"
                      type="email"
                      autoComplete="email"
                      required
                      aria-invalid={error ? true : undefined}
                      aria-describedby={error ? "memo-err" : undefined}
                      onChange={() => error && setError("")}
                    />
                    <button className="btn btn-primary" type="submit">
                      Subscribe
                    </button>
                  </div>
                  {error && (
                    <p className="field-error" id="memo-err">
                      {error}
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>

          <nav className="footer-map" aria-label="Footer">
            <div>
              <h2>Capabilities</h2>
              <ul>
                <li>
                  <Link to="/capabilities">All capabilities</Link>
                </li>
                {capabilities.map((c) => (
                  <li key={c.slug}>
                    <Link to={`/capabilities/${c.slug}`}>{c.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2>Firm</h2>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/industries">Industries</Link>
                </li>
                <li>
                  <Link to="/insights">Insights</Link>
                </li>
                <li>
                  <Link to="/people">People</Link>
                </li>
                <li>
                  <Link to="/careers">Careers</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </div>
            <div>
              <h2>Offices</h2>
              <ul>
                {offices.map((o) => (
                  <li key={o.city}>
                    <a href={o.phoneHref}>
                      {o.city} <span className="num">{o.phone}</span>
                    </a>
                  </li>
                ))}
                <li>
                  <a href={`mailto:${brand.email}`}>{brand.email}</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="footer-base">
          <Link to="/" className="logo" aria-label={`${brand.name}, home`}>
            <Mark />
            <span>{brand.name}</span>
          </Link>
          <ul className="footer-social">
            {social.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <p>
            {brand.name} is a fictional brand — a{" "}
            <a href="https://koative.github.io/cento/">Cento</a> template by
            Koative.
          </p>
        </div>
      </div>
    </footer>
  );
}
