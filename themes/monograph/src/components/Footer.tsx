import { useState, type FormEvent } from "react";
import { ArrowRight, Instagram } from "lucide-react";
import { Link } from "../router";
import { brand, footer } from "../content";
import { validate } from "./Field";

function SundayLetter() {
  const [error, setError] = useState("");
  const [done, setDone] = useState("");

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const errors = validate(form, {
      letter: {
        missing: "Enter an email address so we know where to send it.",
        invalid:
          "That address is missing an @ or a domain, e.g. name@example.com.",
      },
    });
    setError(errors.letter ?? "");
    if (errors.letter) return;
    setDone((form.elements.namedItem("letter") as HTMLInputElement).value);
    form.reset();
  }

  return (
    <form className="letter-form" noValidate onSubmit={submit}>
      <h2>The Sunday letter</h2>
      <p>
        One piece from the archive, one from the next issue, and what we are
        reading. Sundays, 7am.
      </p>
      <label htmlFor="f-letter">Email address</label>
      <div className="inline-input">
        <input
          id="f-letter"
          name="letter"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "f-letter-error" : undefined}
          onChange={() => setDone("")}
        />
        <button type="submit" className="btn">
          Sign up <ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>
      {error && (
        <p className="field-error" id="f-letter-error">
          {error}
        </p>
      )}
      <p className="form-status" role="status">
        {done &&
          `Done. The next Sunday letter will go to ${done}. (Demo: nothing was sent or stored.)`}
      </p>
    </form>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <p className="footer-mark">Monograph</p>
          <p>{brand.tagline}</p>
          <address>
            {brand.address}
            <br />
            <a href={"mailto:" + brand.email}>{brand.email}</a>
            <br />
            <a href={brand.phoneHref}>{brand.phone}</a>
            <br />
            {brand.hours}
          </address>
          <a
            className="social"
            href={brand.instagram}
            target="_blank"
            rel="noreferrer"
          >
            <Instagram size={18} aria-hidden="true" /> Instagram
          </a>
        </div>
        {footer.columns.map((c) => (
          <nav className="footer-col" key={c.title} aria-label={c.title}>
            <h2>{c.title}</h2>
            <ul>
              {c.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <SundayLetter />
      </div>
      <p className="wrap colophon">
        Monograph is a fictional brand — a{" "}
        <a href="https://cento.koative.com/">Cento</a> template by
        Koative. Set in Libre Bodoni and Literata.
      </p>
    </footer>
  );
}
