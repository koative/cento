import { useState, type FormEvent } from "react";
import { Link } from "../router";
import { brand, footerColumns, newsletter } from "../content";
import { validate } from "../lib/util";
import { Field, useErrors } from "./Field";
import { Mark } from "./Art";
import { HoursTable } from "./HoursTable";

export function Footer() {
  const { errors, setErrors, onChange } = useErrors();
  const [done, setDone] = useState("");

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, {
      email:
        "Enter an email like you@example.com so we know where to send The Brew Sheet.",
    });
    setErrors(found);
    if (Object.keys(found).length) return;
    setDone(String(new FormData(form).get("email")));
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
              label="Email address"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              error={errors.email}
            />
            <button className="btn btn-copper" type="submit">
              Subscribe
            </button>
          </form>
          <p className="news-done" aria-live="polite">
            {done &&
              `Signed up. The next Brew Sheet goes to ${done} on the first Monday of the month.`}
          </p>
        </div>
        <div className="footer-hours">
          <h2>Taproom hours</h2>
          <HoursTable />
        </div>
      </div>

      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Link to="/" className="logo" aria-label={`${brand.name}, home`}>
            <Mark />
            <span>{brand.name}</span>
          </Link>
          <address>
            {brand.legal}
            <br />
            {brand.street}, {brand.city}
            <br />
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
            <br />
            <a href={brand.phoneHref}>{brand.phone}</a>
          </address>
        </div>
        {footerColumns.map((col) => (
          <nav key={col.title} aria-label={col.title} className="footer-col">
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
        <div className="footer-col">
          <h2>Follow</h2>
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
      </div>

      <div className="wrap footer-base">
        <p>
          {brand.name} is a fictional brand — a{" "}
          <a href="https://cento.koative.com/">Cento</a> template by
          Koative.
        </p>
        <p>Please drink responsibly. Must be 21+ to purchase. Prices in USD.</p>
      </div>
    </footer>
  );
}
