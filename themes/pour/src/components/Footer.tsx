import { useState, type FormEvent } from "react";
import { Instagram } from "lucide-react";
import { Link } from "../router";
import { brand, footerNav, hours, newsletter } from "../content";
import { Logo } from "./Header";

export function Footer() {
  const [error, setError] = useState("");
  const [done, setDone] = useState("");

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem(
      "news-email",
    ) as HTMLInputElement;
    if (!input.validity.valid) {
      setError(
        input.validity.valueMissing
          ? "Enter your email to get the list."
          : "That email looks incomplete. Use a format like name@example.com.",
      );
      input.focus();
      return;
    }
    setError("");
    setDone(input.value);
  }

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-news">
          <h2>{newsletter.title}</h2>
          <p>{newsletter.text}</p>
          {done ? (
            <p className="form-success" role="status">
              You are on the list. The next one lands in {done}'s inbox on
              Thursday.
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
                  placeholder="you@example.com"
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? "news-error" : undefined}
                />
                <button className="btn" type="submit">
                  Sign up
                </button>
              </div>
              {error && (
                <p className="field-error" id="news-error">
                  {error}
                </p>
              )}
            </form>
          )}
          <p className="quiet">Nothing is sent: this is a demo form.</p>
        </div>
        {footerNav.map((col) => (
          <nav key={col.title} className="footer-col" aria-label={col.title}>
            <h2>{col.title}</h2>
            <ul>
              {col.links.map(([to, label]) => (
                <li key={label}>
                  <Link to={to}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <div className="footer-col">
          <h2>Find us</h2>
          <address>
            {brand.street}
            <br />
            {brand.area}
            <br />
            <a href={brand.phoneHref}>{brand.phone}</a>
            <br />
            <a href={"mailto:" + brand.email}>{brand.email}</a>
          </address>
          <p className="footer-hours">
            Shop Tue–Sun from 11 · Bar from {hours[1].bar.split(" – ")[0]}
          </p>
          <a
            className="social"
            href={brand.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Pour on Instagram"
          >
            <Instagram size={20} aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="footer-base">
        <Logo />
        <p>Over 21s only for wine purchases. Drink well, not more.</p>
        <p>
          {brand.name} is a fictional brand — a{" "}
          <a href="https://koative.github.io/cento/">Cento</a> template by
          Koative.
        </p>
      </div>
    </footer>
  );
}
