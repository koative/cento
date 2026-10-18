import { useState, type FormEvent } from "react";
import { Link } from "../router";
import { brand, footerColumns, newsletter, services, week } from "../content";
import { validate } from "../lib/forms";
import { span } from "../lib/time";
import { Field, useErrors } from "./Field";
import { Logo } from "./Logo";

export function Footer() {
  const { errors, setErrors, onChange } = useErrors();
  const [done, setDone] = useState("");

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, {
      newsletter:
        "Enter an email like you@example.com so the letter has somewhere to go.",
    });
    setErrors(found);
    if (Object.keys(found).length) return;
    setDone(String(new FormData(form).get("newsletter")));
    form.reset();
  };

  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Logo className="logo-footer" />
          <p>{brand.tagline}</p>
          <address>
            {brand.street}, {brand.area}
            <br />
            <a href={brand.phoneHref}>{brand.phone}</a>
            <br />
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
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

        <div className="footer-hours">
          <h2>Hours</h2>
          <dl>
            {week.map((d) => (
              <div key={d.day}>
                <dt>{d.short}</dt>
                <dd>{d.dinner ? span(d.dinner) : "Closed"}</dd>
              </div>
            ))}
          </dl>
          <p className="footer-small">
            Brunch: {services.find((s) => s.id === "brunch")?.when}
          </p>
        </div>

        <div className="footer-news">
          <h2>{newsletter.title}</h2>
          <p>{newsletter.text}</p>
          <form
            noValidate
            onSubmit={submit}
            onChange={onChange}
            className="news-form"
          >
            <Field
              label="Email address"
              name="newsletter"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              error={errors.newsletter}
            />
            <button className="btn btn-light" type="submit">
              Sign me up
            </button>
          </form>
          <p className="news-done" aria-live="polite">
            {done && `You're on the list. Sunday's letter goes to ${done}.`}
          </p>
        </div>
      </div>
      <div className="wrap footer-base">
        <p>
          {brand.name} is a fictional brand — a{" "}
          <a href="https://cento.koative.com/">Cento</a> template by
          Koative.
        </p>
        <p>
          Menus, prices and people are sample content. Prices in US dollars.
        </p>
      </div>
    </footer>
  );
}
