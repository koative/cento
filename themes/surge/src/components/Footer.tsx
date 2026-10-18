import { useState, type FormEvent } from "react";
import { Link } from "../router";
import { brand, footerColumns, newsletter } from "../content";
import { validate } from "../lib/format";
import { Field, useErrors } from "./Field";
import { Logo } from "./Logo";

export function Footer() {
  const { errors, setErrors, onChange } = useErrors();
  const [done, setDone] = useState("");

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, {
      subscriber:
        "Enter a work email like you@company.com so the Readout has somewhere to go.",
    });
    setErrors(found);
    if (Object.keys(found).length) return;
    setDone(String(new FormData(form).get("subscriber")));
    form.reset();
  };

  return (
    <footer className="site-footer">
      <div className="wrap footer-top">
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
              label="Work email"
              name="subscriber"
              type="email"
              required
              autoComplete="email"
              placeholder="you@company.com"
              error={errors.subscriber}
            />
            <button className="btn btn-lift" type="submit">
              Subscribe
            </button>
          </form>
          <p className="news-done" aria-live="polite">
            {done && `Subscribed. Monday's Readout goes to ${done}.`}
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

        <div className="footer-contact">
          <h2>Studio</h2>
          <address>
            {brand.address.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </address>
          <p>
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
            <br />
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
      </div>
      <div className="wrap footer-base">
        <Logo className="logo-footer" />
        <p>
          {brand.name} is a fictional brand — a{" "}
          <a href="https://cento.koative.com/">Cento</a> template by
          Koative.
        </p>
        <p>Clients, people and results are sample content. Prices in USD.</p>
      </div>
    </footer>
  );
}
