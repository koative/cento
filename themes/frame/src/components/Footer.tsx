import { useState, type FormEvent } from "react";
import { Link } from "../router";
import { brand, footer, series } from "../content";
import { Logo } from "./Header";

export function Footer() {
  const [error, setError] = useState("");
  const [done, setDone] = useState("");

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem(
      "letter-email",
    ) as HTMLInputElement;
    if (!input.validity.valid) {
      setError(
        input.validity.valueMissing
          ? "Enter your email to receive the letter."
          : "That email looks incomplete — check it has an @ and a domain.",
      );
      input.focus();
      return;
    }
    setError("");
    setDone(`Thank you. The next letter goes to ${input.value} in December.`);
    e.currentTarget.reset();
  }

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <Logo />
          <p>
            The studio of photographer {brand.photographer}. {brand.booking}.
          </p>
        </div>
        <form className="letter" noValidate onSubmit={submit}>
          <label htmlFor="letter-email">{footer.letter}</label>
          <div className="letter-row">
            <input
              id="letter-email"
              name="letter-email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? "letter-error" : undefined}
            />
            <button className="btn" type="submit">
              Subscribe
            </button>
          </div>
          {error && (
            <p className="field-error" id="letter-error">
              {error}
            </p>
          )}
          <p className="letter-done" aria-live="polite">
            {done}
          </p>
        </form>
      </div>
      <div className="footer-cols">
        <nav aria-label="Series">
          <h2>Series</h2>
          <Link to="/series">All series</Link>
          {series.map((s) => (
            <Link key={s.slug} to={`/series/${s.slug}`}>
              {s.title}
            </Link>
          ))}
        </nav>
        <nav aria-label="Studio">
          <h2>Studio</h2>
          <Link to="/commissions">Commissions</Link>
          <Link to="/prints">Prints</Link>
          <Link to="/order">Your order</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>
        <div>
          <h2>Visit</h2>
          <address>
            {brand.studio.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </address>
          <p>{brand.visits}</p>
        </div>
        <div>
          <h2>Write</h2>
          <a href={`mailto:${brand.email}`}>{brand.email}</a>
          <a href={brand.phoneHref}>{brand.phone}</a>
          <a href={brand.instagram} target="_blank" rel="noreferrer">
            Instagram
          </a>
          <a href={brand.vimeo} target="_blank" rel="noreferrer">
            Vimeo
          </a>
        </div>
      </div>
      <p className="footer-legal">
        {brand.name} is a fictional brand — a{" "}
        <a href="https://cento.koative.com/">Cento</a> template by
        Koative. Photographs CC0 via Wikimedia Commons.
      </p>
    </footer>
  );
}
