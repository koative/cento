import { useState, type FormEvent } from "react";
import { Link } from "../router";
import { brand, footerColumns, newsletter } from "../content";
import { validate } from "../lib";
import { Field, useErrors } from "./Field";
import { Logo } from "./Logo";

export function Footer() {
  const { errors, setErrors, onChange } = useErrors();
  const [done, setDone] = useState("");

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, {
      email: "Enter an email like you@studio.com so we know where to send it.",
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
            <Logo />
          </Link>
          <p>{brand.summary}</p>
          <address>
            {brand.address.map((l) => (
              <span key={l}>{l}</span>
            ))}
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
            <a href={brand.phoneHref}>{brand.phone}</a>
          </address>
        </div>

        {footerColumns.map((col) => (
          <nav
            key={col.title}
            aria-label={`${col.title} pages`}
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

        <div className="footer-col">
          <h2>Elsewhere</h2>
          <ul>
            {brand.social.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
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
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@studio.com"
              error={errors.email}
            />
            <button className="btn btn-citron" type="submit">
              Subscribe
            </button>
          </form>
          <p className="news-done" aria-live="polite">
            {done &&
              `Pinned. The next letter goes to ${done} on the first Tuesday of the month.`}
          </p>
        </div>
      </div>
      <div className="wrap footer-base">
        <p>
          {brand.name} is a fictional brand — a{" "}
          <a href="https://koative.github.io/cento/">Cento</a> template by
          Koative.
        </p>
        <p>Clients, people, prices and results are sample content.</p>
      </div>
    </footer>
  );
}
