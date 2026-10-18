import { useState, type FormEvent } from "react";
import { ArrowRight, Facebook, Instagram } from "lucide-react";
import { Link } from "../router";
import { brand, footerColumns, newsletter, socials } from "../content";
import { Logo } from "./Header";
import { Field, validate, type Errors } from "./Field";

const icons: Record<string, typeof Instagram> = { Instagram, Facebook };

export function Footer() {
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(e.currentTarget, {
      "list-email": {
        missing: "Enter your email to get the Thursday list.",
        invalid:
          "That email is missing something. Check the @ and the part after it.",
      },
    });
    setErrors(found);
    if (!Object.keys(found).length) setDone(true);
  }

  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-list">
          <h2>{newsletter.title}</h2>
          <p>{newsletter.text}</p>
          <div aria-live="polite">
            {done ? (
              <p className="success-note">
                You're on the list. The first one arrives Thursday morning.
                (Demo: nothing was stored or sent.)
              </p>
            ) : (
              <form className="inline-form" noValidate onSubmit={submit}>
                <Field
                  label="Email address"
                  name="list-email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="you@example.com"
                  error={errors["list-email"]}
                />
                <button className="btn" type="submit">
                  Sign up <ArrowRight size={18} aria-hidden="true" />
                </button>
              </form>
            )}
          </div>
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
        <div className="footer-col">
          <h2>The shop</h2>
          <address>
            {brand.address}
            <br />
            <a href={"mailto:" + brand.email}>{brand.email}</a>
            <br />
            <a href={brand.phoneHref}>{brand.phone}</a>
          </address>
          <dl className="hours">
            {brand.shopHours.map((h) => (
              <div key={h.days}>
                <dt>{h.days}</dt>
                <dd>{h.hours}</dd>
              </div>
            ))}
          </dl>
          <div className="socials">
            {socials.map((s) => {
              const Icon = icons[s.label];
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                >
                  <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <Logo />
        <p>
          {brand.name} is a fictional brand — a{" "}
          <a href="https://koative.github.io/cento/">Cento</a> template by
          Koative.
        </p>
      </div>
    </footer>
  );
}
