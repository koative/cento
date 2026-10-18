import { useState, type FormEvent } from "react";
import { Link } from "../router";
import { brand, footer, offices } from "../content";
import { tel } from "../lib/util";
import { Logo } from "./Header";
import { Field, validate, type Errors } from "./Field";

const messages = {
  briefing: {
    missing: "Enter your email address to receive briefings.",
    invalid:
      "Check the email address: it needs an @ and a domain, like name@example.com.",
  },
};

export function Footer() {
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState("");

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const next = validate(form, messages);
    setErrors(next);
    if (Object.keys(next).length) return;
    setDone((form.elements.namedItem("briefing") as HTMLInputElement).value);
    form.reset();
  }

  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Logo />
          <p>
            {brand.legalName}. Attorneys at law, admitted in Maine, New
            Hampshire and Massachusetts.
          </p>
          <ul className="footer-social">
            {footer.social.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {footer.columns.map((c) => (
          <nav key={c.heading} aria-label={c.heading}>
            <h2 className="footer-heading">{c.heading}</h2>
            <ul>
              {c.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div>
          <h2 className="footer-heading">Offices</h2>
          {offices.map((o) => (
            <address key={o.city}>
              <strong>{o.city}</strong>
              {o.address.map((line) => (
                <span key={line}>{line}</span>
              ))}
              <a href={tel(o.phone)}>{o.phone}</a>
            </address>
          ))}
          <a href={`mailto:${brand.email}`}>{brand.email}</a>
        </div>

        <form className="footer-form" noValidate onSubmit={submit}>
          <h2 className="footer-heading">Client briefings</h2>
          <p>
            One email a month when the law changes in ways our clients should
            know about.
          </p>
          <Field label="Email address" name="briefing" error={errors.briefing}>
            {(p) => (
              <input
                {...p}
                type="email"
                required
                autoComplete="email"
                placeholder="name@example.com"
              />
            )}
          </Field>
          <button className="btn btn-ghost" type="submit">
            Subscribe
          </button>
          <p className="form-status" role="status">
            {done &&
              `Subscribed: briefings will go to ${done}. This is a demo, so nothing was sent.`}
          </p>
        </form>
      </div>

      <div className="wrap footer-base">
        <p>{brand.disclaimer}</p>
        <p>
          {brand.name} is a fictional brand — a{" "}
          <a href="https://cento.koative.com/">Cento</a> template by
          Koative.
        </p>
      </div>
    </footer>
  );
}
