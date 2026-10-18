import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { brand, footerNav, newsletter } from "../content";
import { Logo } from "./Header";

export function Footer() {
  const [error, setError] = useState("");
  const [done, setDone] = useState("");

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem(
      "news-email",
    ) as HTMLInputElement;
    if (input.validity.valid) {
      setError("");
      setDone(input.value);
      return;
    }
    setError(
      input.validity.valueMissing
        ? "Enter your email to get the monthly letter."
        : "That email needs an @ and a domain, like name@example.com.",
    );
    input.focus();
  }

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-news">
          <h2>{newsletter.title}</h2>
          <p>{newsletter.text}</p>
          {done ? (
            <p className="news-done" role="status">
              Thank you. The next letter goes to {done}.
            </p>
          ) : (
            <form className="news-form" noValidate onSubmit={submit}>
              <label htmlFor="news-email">Email address</label>
              <div className="news-row">
                <input
                  id="news-email"
                  name="news-email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="name@example.com"
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? "news-error" : undefined}
                />
                <button type="submit" className="btn btn-light">
                  Subscribe <ArrowRight size={16} aria-hidden="true" />
                </button>
              </div>
              {error && (
                <p className="field-error" id="news-error">
                  {error}
                </p>
              )}
            </form>
          )}
          <p className="quiet">Demo form: nothing is sent or stored.</p>
        </div>
        {footerNav.map((col) => (
          <nav key={col.title} className="footer-col" aria-label={col.title}>
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
          <h2>Write to us</h2>
          <address>
            {brand.address.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </address>
          <ul>
            <li>
              <a href={"mailto:" + brand.email}>{brand.email}</a>
            </li>
            <li>
              <a href={brand.phoneHref}>{brand.phone}</a>
            </li>
            <li className="quiet">{brand.hours}</li>
          </ul>
        </div>
      </div>
      <div className="footer-base">
        <Logo />
        <ul className="social">
          {brand.social.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noreferrer">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <p>
          {brand.name} is a fictional brand — a{" "}
          <a href="https://cento.koative.com/">Cento</a> template by
          Koative.
        </p>
      </div>
    </footer>
  );
}
