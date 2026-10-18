import { useState, type FormEvent } from "react";
import { Link } from "../router";
import { brand, footerColumns, newsletter, villas } from "../content";
import { validate } from "../lib/form";
import { Field, useErrors } from "./Field";
import { Mark } from "./Header";

export function Footer() {
  const { errors, setErrors, onChange } = useErrors();
  const [done, setDone] = useState("");

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, {
      email:
        "Enter an email address like you@example.com so the letter can reach you.",
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
          <address>
            {brand.office.map((l) => (
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

        <nav aria-label="The houses" className="footer-col">
          <h2>The houses</h2>
          <ul>
            {villas.map((v) => (
              <li key={v.slug}>
                <Link to={`/villas/${v.slug}`}>{v.name}</Link>
              </li>
            ))}
          </ul>
        </nav>

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
            <button className="btn btn-quiet" type="submit">
              Add me
            </button>
          </form>
          <p className="news-done" aria-live="polite">
            {done &&
              `Done. The next opening goes to ${done} before anyone else.`}
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
          Prices in euros, per house per night. Houses, people and places on{" "}
          {brand.island} are sample content.
        </p>
      </div>
    </footer>
  );
}
