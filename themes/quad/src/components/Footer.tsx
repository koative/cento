import { useState, type FormEvent } from "react";
import { Link } from "../router";
import { brand, footerColumns, newsletter } from "../content";
import { useErrors, validate } from "../lib/forms";
import { Field } from "./Field";
import { Crest } from "./Crest";

export function Footer() {
  const { errors, setErrors, onChange } = useErrors();
  const [done, setDone] = useState("");

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, {
      email:
        "Enter an email address like name@example.com so we know where to send it.",
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
          <Link
            to="/"
            className="logo logo-footer"
            aria-label={`${brand.full}, home`}
          >
            <Crest />
            <span className="logo-text">
              <span className="logo-name">{brand.name}</span>
              <span className="logo-sub">University · {brand.city}</span>
            </span>
          </Link>
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
              label="Email address"
              name="email"
              type="email"
              required
              autoComplete="email"
              error={errors.email}
            />
            <button className="btn btn-light" type="submit">
              Send me the prospectus
            </button>
          </form>
          <p className="news-done" aria-live="polite">
            {done &&
              `Done — the next issue goes to ${done}. No more than one a month.`}
          </p>
        </div>
      </div>
      <div className="wrap footer-base">
        <p>
          {brand.full} is a fictional brand — a{" "}
          <a href="https://cento.koative.com/">Cento</a> template by
          Koative.
        </p>
        <p>
          Programmes, people, fees and dates are sample content. Fees shown in
          GBP.
        </p>
      </div>
    </footer>
  );
}
