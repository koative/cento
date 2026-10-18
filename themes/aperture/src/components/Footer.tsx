import { useState, type FormEvent } from "react";
import { Link } from "../router";
import { brand, footerColumns, hours, newsletter } from "../content";
import { validate } from "../lib/forms";
import { Field, useErrors } from "./Field";
import { Logo } from "./Logo";

export function Footer() {
  const { errors, setErrors, onChange } = useErrors();
  const [done, setDone] = useState("");

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, {
      email:
        "Enter an email like you@example.com so the programme has somewhere to go.",
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
          <Logo />
          <p>{brand.tagline}</p>
          <address>
            {brand.street}
            <br />
            {brand.town}
            <br />
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
            <br />
            <a href={brand.phoneHref}>{brand.phone}</a>
          </address>
          <p className="footer-hours">
            {hours[1].label}: {hours[1].value}
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
              placeholder="you@example.com"
              error={errors.email}
            />
            <button className="btn btn-paper" type="submit">
              Send me the sheet
            </button>
          </form>
          <p className="form-done" aria-live="polite">
            {done && `Done. The next Tuesday sheet goes to ${done}.`}
          </p>
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
      </div>
      <div className="wrap footer-base">
        <p>
          {brand.name} is a fictional brand — a{" "}
          <a href="https://koative.github.io/cento/">Cento</a> template by
          Koative.
        </p>
        <p>
          Films, people, prices and screenings are sample content. Prices in
          GBP.
        </p>
      </div>
    </footer>
  );
}
