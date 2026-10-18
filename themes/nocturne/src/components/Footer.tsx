import { useState, type FormEvent } from "react";
import { Link } from "../router";
import { brand, days, footerColumns, hours, newsletter } from "../content";
import { hoursLabel } from "../lib/format";
import { validate } from "../lib/forms";
import { Field, useErrors } from "./Field";
import { Mark } from "./Art";

export function Footer() {
  const { errors, setErrors, onChange } = useErrors();
  const [done, setDone] = useState("");

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, {
      email:
        "Enter an email like you@example.com so the slip has somewhere to go.",
    });
    setErrors(found);
    if (Object.keys(found).length) return;
    setDone(String(new FormData(form).get("email")));
    form.reset();
  };

  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Link to="/" className="logo" aria-label={`${brand.name}, home`}>
            <Mark size={34} />
            <span>{brand.name}</span>
          </Link>
          <p className="footer-tag">{brand.tagline}</p>
          <address>
            {brand.street}
            <br />
            {brand.city}
            <br />
            <a href={brand.phoneHref}>{brand.phone}</a>
            <br />
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
          </address>
          <p className="footer-social">
            {brand.social.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
                {s.label}
              </a>
            ))}
          </p>
        </div>

        <div className="footer-hours">
          <h2>Hours</h2>
          <dl>
            {[1, 2, 3, 4, 5, 6, 0].map((d) => (
              <div key={d}>
                <dt>{days[d].slice(0, 3)}</dt>
                <dd>{hoursLabel(hours[d])}</dd>
              </div>
            ))}
          </dl>
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
              label="Email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              error={errors.email}
            />
            <button className="btn btn-ghost" type="submit">
              Subscribe
            </button>
          </form>
          <p className="news-done" aria-live="polite">
            {done &&
              `Thank you. The next slip goes to ${done} on Sunday morning.`}
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
          Prices in Danish kroner. Guests 18 and over. Please drink
          thoughtfully.
        </p>
      </div>
    </footer>
  );
}
