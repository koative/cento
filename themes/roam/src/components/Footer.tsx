import { useState, type FormEvent } from "react";
import { Link } from "../router";
import { brand, footerColumns, newsletter } from "../content";
import { validate } from "../lib/forms";
import { Field, useErrors } from "./Field";
import { Mark } from "./Mark";

export function Footer() {
  const { errors, setErrors, onChange } = useErrors();
  const [done, setDone] = useState("");

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, {
      email:
        "Enter an email like you@example.com so we know where to send the codes.",
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
            <Mark />
            <span>{brand.name}</span>
          </Link>
          <p>{brand.tagline}</p>
          <dl className="footer-contact">
            <div>
              <dt>Bookings</dt>
              <dd>
                <a href={brand.phoneHref}>{brand.phone}</a>
              </dd>
            </div>
            <div>
              <dt>Roadside, 24/7</dt>
              <dd>
                <a href={brand.roadsideHref}>{brand.roadside}</a>
              </dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${brand.email}`}>{brand.email}</a>
              </dd>
            </div>
          </dl>
          <p className="footer-social">
            {brand.social.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
                {s.label}
              </a>
            ))}
          </p>
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
            <button className="btn btn-sign" type="submit">
              Send me codes
            </button>
          </form>
          <p className="news-done" aria-live="polite">
            {done && `Done. New codes go to ${done} the day they launch.`}
          </p>
        </div>
      </div>
      <div className="wrap footer-base">
        <p>
          {brand.name} is a fictional brand — a{" "}
          <a href="https://koative.github.io/cento/">Cento</a> template by
          Koative.
        </p>
        <p>
          Prices in USD. Cars, stations, people and deals are sample content.
        </p>
      </div>
    </footer>
  );
}
