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
        "Enter an email like you@yourshop.com so we know where to send release notes.",
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
          <Link to="/" className="logo" aria-label={`${brand.site}, home`}>
            <Mark />
            <span className="logo-word">
              {brand.name} <span>Manual</span>
            </span>
          </Link>
          <p>{brand.tagline}</p>
          <p className="footer-contact">
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
            <a href={brand.phoneHref}>{brand.phone}</a>
          </p>
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
            className="inline-form"
          >
            <Field
              label="Email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@yourshop.com"
              error={errors.email}
            />
            <button className="btn btn-ink" type="submit">
              Subscribe
            </button>
          </form>
          <p className="form-done" aria-live="polite">
            {done && `Subscribed. Release notes will go to ${done}.`}
          </p>
        </div>
      </div>
      <div className="wrap footer-base">
        <p>
          {brand.name} is a fictional brand — a{" "}
          <a href="https://koative.github.io/cento/">Cento</a> template by
          Koative.
        </p>
        <p>Products, prices, people and incidents are sample content.</p>
      </div>
    </footer>
  );
}
