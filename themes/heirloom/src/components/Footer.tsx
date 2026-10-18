import { useState, type FormEvent } from "react";
import { Facebook, Instagram } from "lucide-react";
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
      "letter-email": {
        missing: "Enter your email to receive the letters.",
        invalid: "That email looks incomplete; check the @ and the domain.",
      },
    });
    setErrors(found);
    if (!Object.keys(found).length) setDone(true);
  }

  return (
    <footer className="site-footer">
      <div className="wrap footer-top">
        <div className="footer-letter">
          <h2>{newsletter.title}</h2>
          <p>{newsletter.text}</p>
          <div aria-live="polite">
            {done ? (
              <p className="success">
                You are on the list. The autumn letter goes out in November.
                (Demo: nothing was stored.)
              </p>
            ) : (
              <form className="inline-form" noValidate onSubmit={submit}>
                <Field
                  label="Email address"
                  name="letter-email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="you@example.com"
                  error={errors["letter-email"]}
                />
                <button className="btn" type="submit">
                  Subscribe
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
          <h2>Visit</h2>
          <address>
            {brand.street}
            <br />
            {brand.city}
            <br />
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
            <br />
            <a href={brand.phoneHref}>{brand.phone}</a>
          </address>
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
                  <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
      <div className="wrap footer-bottom">
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
