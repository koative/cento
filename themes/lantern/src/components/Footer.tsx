import { useState, type FormEvent } from "react";
import { Facebook, Instagram } from "lucide-react";
import { Link } from "../router";
import { brand, footerColumns, newsletter, socials } from "../content";
import { Logo } from "./Header";
import { clearError, Field, validate, type Errors } from "./Field";

const icons: Record<string, typeof Instagram> = { Instagram, Facebook };

export function Footer() {
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(e.currentTarget, {
      "news-email": {
        missing: "Enter your email to get The Window.",
        invalid:
          "That email is missing something — check the @ and the part after it.",
      },
    });
    setErrors(found);
    if (!Object.keys(found).length) setDone(true);
  }

  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-news">
          <Logo />
          <h2>{newsletter.title}</h2>
          <p>{newsletter.text}</p>
          <div aria-live="polite">
            {done ? (
              <p className="note-success">
                You're on the list. The next letter goes out on the first
                Saturday of the month.
              </p>
            ) : (
              <form
                className="inline-form"
                noValidate
                onSubmit={submit}
                onInput={clearError(setErrors)}
              >
                <Field
                  label="Email address"
                  name="news-email"
                  type="email"
                  autoComplete="email"
                  required
                  error={errors["news-email"]}
                />
                <button className="btn btn-light" type="submit">
                  Sign up
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
                <li key={l.label}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <div className="footer-col">
          <h2>The window</h2>
          <address>
            {brand.address}
            <br />
            {brand.hours}
            <br />
            <a href={"mailto:" + brand.email}>{brand.email}</a>
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
                  <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <p>{brand.registration}</p>
        <p>
          {brand.name} is a fictional brand — a{" "}
          <a href="https://koative.github.io/cento/">Cento</a> template by
          Koative.
        </p>
      </div>
    </footer>
  );
}
