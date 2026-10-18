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
      "news-email": {
        missing: "Enter your email to get Thursday's arrivals.",
        invalid:
          "That email is missing something — check the @ and the domain.",
      },
    });
    setErrors(found);
    if (!Object.keys(found).length) setDone(true);
  }

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-news">
          <h2>{newsletter.title}</h2>
          <p>{newsletter.text}</p>
          <div aria-live="polite">
            {done ? (
              <p className="success">
                You are on the list. The first email arrives on Thursday at 9am.
              </p>
            ) : (
              <form className="inline-form" noValidate onSubmit={submit}>
                <Field
                  label="Email address"
                  name="news-email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="you@example.com"
                  error={errors["news-email"]}
                />
                <button className="btn btn-light" type="submit">
                  Sign up
                </button>
              </form>
            )}
          </div>
          <p className="quiet">Demo form — nothing is sent or stored.</p>
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
          <h2>The warehouse</h2>
          <address>
            {brand.address}
            <br />
            <a href={"mailto:" + brand.email}>{brand.email}</a>
            <br />
            <a href={brand.phoneHref}>{brand.phone}</a>
          </address>
          <dl className="footer-hours">
            {brand.hours.slice(0, 3).map((h) => (
              <div key={h.days}>
                <dt>{h.days}</dt>
                <dd>{h.time}</dd>
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
                  aria-label={`${brand.name} on ${s.label}`}
                >
                  <Icon size={20} strokeWidth={1.6} aria-hidden="true" />
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
          <a href="https://cento.koative.com/">Cento</a> template by
          Koative.
        </p>
      </div>
    </footer>
  );
}
