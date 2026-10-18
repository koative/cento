import { useState, type FormEvent } from "react";
import { Link } from "../router";
import { brand, footerNav } from "../content";
import { Logo } from "./Header";
import { Field, validate, type Errors } from "./Field";

export function Footer() {
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState("");

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const next = validate(form, {
      news: {
        missing: "Add your email so we can write to you.",
        invalid:
          "That email looks incomplete. Check it has an @ and a domain, like name@example.com.",
      },
    });
    setErrors(next);
    if (Object.keys(next).length) return;
    setDone((form.elements.namedItem("news") as HTMLInputElement).value);
    form.reset();
  }

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <Logo />
          <p>
            {brand.street}
            <br />
            {brand.district}
          </p>
          <p>
            <a href={brand.phoneHref}>{brand.phone}</a>
            <br />
            <a href={"mailto:" + brand.email}>{brand.email}</a>
          </p>
          <dl className="footer-hours">
            {brand.hours.map((h) => (
              <div key={h.days}>
                <dt>{h.days}</dt>
                <dd>{h.time}</dd>
              </div>
            ))}
          </dl>
        </div>
        {footerNav.map((col) => (
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
          <h2>The Monday stem list</h2>
          <p>
            What came in at market this week, one short email. No discounts, no
            shouting.
          </p>
          <div aria-live="polite">
            {done && (
              <p className="form-success">
                Thank you. The next stem list goes to {done} on Monday morning.
              </p>
            )}
          </div>
          {!done && (
            <form noValidate onSubmit={submit} className="news-form">
              <Field
                label="Email address"
                name="news"
                type="email"
                required
                autoComplete="email"
                placeholder="name@example.com"
                error={errors.news}
              />
              <button className="btn" type="submit">
                Sign up
              </button>
            </form>
          )}
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          {brand.name} is a fictional brand — a{" "}
          <a href="https://cento.koative.com/">Cento</a> template by
          Koative.
        </p>
        <ul className="social">
          {brand.social.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noreferrer">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
