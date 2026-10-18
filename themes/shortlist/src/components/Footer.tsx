import { useState, type FormEvent } from "react";
import { Link } from "../router";
import { brand, categories, footerColumns, newsletter } from "../content";
import { validate } from "../lib/format";
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
        "Enter an email like you@example.com so the column has somewhere to go.",
    });
    setErrors(found);
    if (Object.keys(found).length) return;
    const data = new FormData(form);
    const trade =
      categories.find((c) => c.id === data.get("trade"))?.label ??
      "every trade";
    setDone(
      `Subscribed. Monday’s column for ${trade} goes to ${data.get("email")}.`,
    );
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
          <p className="footer-hours">{brand.hours}</p>
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
            <Field label="Trade" name="trade">
              <select defaultValue="">
                <option value="">Every trade</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </Field>
            <button className="btn btn-ink" type="submit">
              Subscribe
            </button>
          </form>
          <p className="form-done" aria-live="polite">
            {done}
          </p>
        </div>
      </div>
      <div className="wrap footer-base">
        <p>
          {brand.name} is a fictional brand — a{" "}
          <a href="https://cento.koative.com/">Cento</a> template by
          Koative.
        </p>
        <p className="footer-social">
          {brand.social.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
              {s.label}
            </a>
          ))}
        </p>
      </div>
    </footer>
  );
}
