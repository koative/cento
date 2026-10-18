import { useState, type FormEvent } from "react";
import { Dribbble, Github, Linkedin } from "lucide-react";
import { Link } from "../router";
import { brand, footerColumns, newsletter, socials } from "../content";
import { Logo } from "./Header";
import { Field, validate, type Errors } from "./Field";

const icons: Record<string, typeof Github> = {
  LinkedIn: Linkedin,
  Dribbble,
  GitHub: Github,
};

export function Footer() {
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(e.currentTarget, {
      "letter-email": {
        missing: "Enter your email address to get the letter.",
        invalid:
          "That address is missing something — check the @ and the domain.",
      },
    });
    setErrors(found);
    if (!Object.keys(found).length) setDone(true);
  }

  return (
    <footer className="site-footer">
      <div className="sheet">
        <div className="aside">
          <Logo />
          <p className="footer-person">
            The practice of {brand.person}, {brand.role.toLowerCase()} in{" "}
            {brand.city}.
          </p>
        </div>
        <div className="col footer-grid">
          <div className="footer-letter">
            <h2>{newsletter.title}</h2>
            <p>{newsletter.text}</p>
            <div aria-live="polite">
              {done ? (
                <p className="success">
                  You're on the list. The next letter goes out in early
                  December. (Demo: nothing was stored.)
                </p>
              ) : (
                <form className="inline-form" noValidate onSubmit={submit}>
                  <Field
                    label="Email address"
                    name="letter-email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="you@studio.example"
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
                  <li key={l.label}>
                    <Link to={l.to}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div className="footer-col footer-contact">
            <h2>Contact</h2>
            <address>
              <a href={"mailto:" + brand.email}>{brand.email}</a>
              <br />
              <a href={brand.phoneHref}>{brand.phone}</a>
              <br />
              {brand.city}
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
                    <Icon size={18} strokeWidth={1.6} aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>
          <p className="footer-legal">
            {brand.name} is a fictional brand — a{" "}
            <a href="https://koative.github.io/cento/">Cento</a> template by
            Koative.
          </p>
        </div>
      </div>
    </footer>
  );
}
