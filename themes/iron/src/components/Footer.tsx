import { useState, type FormEvent } from "react";
import { Link } from "../router";
import { brand, footerColumns, hours, newsletter } from "../content";
import { validate } from "../lib";
import { Field, useErrors } from "./Field";
import { Wordmark } from "./Marks";

export function Footer() {
  const { errors, setErrors, onChange } = useErrors();
  const [done, setDone] = useState("");

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, {
      email:
        "Enter an email like you@example.com so the board has somewhere to go.",
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
            <Wordmark />
          </Link>
          <p>{brand.tagline}</p>
          <address>
            {brand.full}
            <br />
            {brand.street}, {brand.area}
            <br />
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
            <br />
            <a href={brand.phoneHref}>{brand.phone}</a>
          </address>
          <dl className="footer-hours">
            {hours.map((h) => (
              <div key={h.days}>
                <dt>{h.days}</dt>
                <dd>{h.open}</dd>
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
            <button className="btn btn-primary" type="submit">
              Subscribe
            </button>
          </form>
          <p className="news-done" aria-live="polite">
            {done && `Done. The next board lands in ${done} on Monday at 5am.`}
          </p>
          <p className="footer-social">
            {brand.social.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
                {s.label}
              </a>
            ))}
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
          Prices in USD. Weights in pounds. People, classes and quotes are
          sample content.
        </p>
      </div>
    </footer>
  );
}
