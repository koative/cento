import { useState, type FormEvent } from "react";
import { Link } from "../router";
import { brand, footer } from "../content";
import { validate } from "../lib/format";
import { Field, useErrors } from "./Field";
import { Wordmark } from "./Wordmark";

export function Footer() {
  const { errors, setErrors, onChange } = useErrors();
  const [done, setDone] = useState("");

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, {
      email:
        "Enter an email address like you@example.com so the sheet has somewhere to go.",
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
            {brand.address.map((l) => (
              <span key={l}>{l}</span>
            ))}
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
            <a href={brand.phoneHref}>{brand.phone}</a>
          </address>
          <p className="footer-social">
            {brand.social.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
                {s.label}
              </a>
            ))}
          </p>
        </div>

        {footer.columns.map((col) => (
          <nav
            key={col.title}
            aria-label={`${col.title} links`}
            className="footer-col"
          >
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
          <h2>{footer.newsletter.title}</h2>
          <p>{footer.newsletter.text}</p>
          <form
            noValidate
            onSubmit={submit}
            onChange={onChange}
            className="news-form"
          >
            <Field
              label="Email address"
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
          <p className="form-status" aria-live="polite">
            {done && `Subscribed. The next sheet goes to ${done}.`}
          </p>
        </div>
      </div>
      <div className="wrap footer-base">
        <p>
          {brand.name} is a fictional brand — a{" "}
          <a href="https://koative.github.io/cento/">Cento</a> template by
          Koative.
        </p>
        <p>{brand.hours}</p>
      </div>
    </footer>
  );
}
