import { useState, type FormEvent } from "react";
import { ArrowRight, Facebook, Instagram, Linkedin } from "lucide-react";
import { Link } from "../router";
import { brand, footerColumns, newsletter, socials } from "../content";
import { Logo } from "./Header";
import { Field, validate, type Errors } from "./Field";

const icons: Record<string, typeof Instagram> = {
  Instagram,
  Facebook,
  LinkedIn: Linkedin,
};

export function Footer() {
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(e.currentTarget, {
      "list-email": {
        missing: "Enter your email to get the Thursday list.",
        invalid: "That email looks incomplete; check the @ and the domain.",
      },
    });
    setErrors(found);
    if (!Object.keys(found).length) setDone(true);
  }

  return (
    <footer className="site-footer">
      <div className="footer-top wrap">
        <div className="footer-news">
          <h2>{newsletter.title}</h2>
          <p>{newsletter.text}</p>
          <div aria-live="polite">
            {done ? (
              <p className="success">
                You are on the Thursday list. The first email arrives this week.
                (Demo: nothing was stored.)
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
                  Join the list <ArrowRight size={18} aria-hidden="true" />
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
          <h2>The office</h2>
          <address>
            {brand.address}
            <br />
            <a href={brand.phoneHref}>{brand.phone}</a>
            <br />
            <a href={"mailto:" + brand.email}>{brand.email}</a>
          </address>
          <ul className="footer-hours">
            {brand.hours.map((h) => (
              <li key={h.days}>
                <span>{h.days}</span> <span className="num">{h.time}</span>
              </li>
            ))}
          </ul>
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
                  <Icon size={19} strokeWidth={1.75} aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
      <div className="footer-bottom wrap">
        <Logo />
        <p>
          {brand.name} is a fictional brand — a{" "}
          <a href="https://koative.github.io/cento/">Cento</a> template by
          Koative. Homes, people and prices are demonstration content.
        </p>
      </div>
    </footer>
  );
}
