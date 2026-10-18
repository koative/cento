import { useState, type FormEvent } from "react";
import { brand, footerColumns, hours, socials } from "../content";
import { Link } from "../router";
import { hoursLabel } from "../lib/format";
import { Logo } from "./Header";
import { Field, validate, type Errors } from "./Field";

const messages = {
  "news-email": {
    missing: "Enter your email to get the Monthly Index.",
    invalid:
      "Check the email address: it needs an @ and a domain, like name@example.com.",
  },
};

export function Footer() {
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState("");

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const next = validate(form, messages);
    setErrors(next);
    if (Object.keys(next).length) return;
    setDone((form.elements.namedItem("news-email") as HTMLInputElement).value);
    form.reset();
  }

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <Logo />
          <p>{brand.tagline}</p>
          <address>
            {brand.address}
            <br />
            <a href={brand.phoneHref}>{brand.phone}</a>
            <br />
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
          </address>
        </div>
        <form
          className="newsletter"
          onSubmit={submit}
          noValidate
          aria-labelledby="news-title"
        >
          <h2 id="news-title">The Monthly Index</h2>
          <p>
            One letter on the first Saturday: new arrivals, the club book and
            who is reading here next. Nothing else.
          </p>
          <div className="newsletter-row">
            <Field
              label="Email address"
              name="news-email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
              error={errors["news-email"]}
            />
            <button className="btn" type="submit">
              Subscribe
            </button>
          </div>
          <p className="form-status" aria-live="polite">
            {done &&
              `Thank you. The next letter goes to ${done} on the first Saturday.`}
          </p>
        </form>
      </div>

      <div className="footer-grid">
        {footerColumns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2>{col.title}</h2>
            <ul>
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <div>
          <h2>Opening hours</h2>
          <dl className="hours-mini">
            {hours.map((h) => (
              <div key={h.day}>
                <dt>{h.day.slice(0, 3)}</dt>
                <dd>{hoursLabel(h.open, h.close)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="footer-base">
        <p>
          {brand.name} is a fictional brand — a{" "}
          <a href="https://cento.koative.com/">Cento</a> template by
          Koative.
        </p>
        <ul className="socials">
          {socials.map((s) => (
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
