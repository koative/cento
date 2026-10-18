import { useState, type FormEvent } from "react";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { Link } from "../router";
import { brand, clubhouseHours, nav, season, teams } from "../content";
import { Crest } from "./Kit";
import { emailOk } from "./Field";

const icons = { Instagram, Facebook, YouTube: Youtube } as const;

export function Footer() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!emailOk(email)) {
      setError(
        email.trim()
          ? "That address is missing something, check the part after the @."
          : "Enter your email address to get the Monday Sheet.",
      );
      return;
    }
    setError("");
    setDone(`Done. The Monday Sheet goes to ${email.trim()} from next week.`);
    setEmail("");
  };

  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Link
            to="/"
            className="logo logo-footer"
            aria-label={`${brand.name}, home`}
          >
            <Crest size={44} />
            <span className="logo-word">
              Field United
              <small>{brand.motto}</small>
            </span>
          </Link>
          <address>
            {brand.address.map((l) => (
              <span key={l}>{l}</span>
            ))}
            <a href={`tel:${brand.phone.replace(/\s/g, "")}`}>
              {brand.phoneLabel}
            </a>
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
          </address>
          <ul className="socials">
            {brand.socials.map((s) => {
              const Icon = icons[s.label as keyof typeof icons];
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${brand.name} on ${s.label}`}
                  >
                    <Icon aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <nav className="footer-col" aria-label="Teams">
          <h2>Teams</h2>
          <ul>
            {teams.map((t) => (
              <li key={t.slug}>
                <Link to={`/teams/${t.slug}`}>{t.name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="footer-col" aria-label="Club">
          <h2>Club</h2>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {nav.map((l) => (
              <li key={l.to}>
                <Link to={l.to}>{l.label}</Link>
              </li>
            ))}
            <li>
              <Link to="/join">Join &amp; fees</Link>
            </li>
          </ul>
        </nav>

        <div className="footer-col">
          <h2>Clubhouse</h2>
          <dl className="hours">
            {clubhouseHours.map((h) => (
              <div key={h.days}>
                <dt>{h.days}</dt>
                <dd className="num">{h.hours}</dd>
              </div>
            ))}
          </dl>
        </div>

        <form className="footer-news" noValidate onSubmit={submit}>
          <h2>The Monday Sheet</h2>
          <p>
            Every result, every Monday morning, plus whatever the committee
            forgot to tell you.
          </p>
          <div className="field" data-invalid={error ? "" : undefined}>
            <label htmlFor="news-email">Email address</label>
            <div className="inline-input">
              <input
                id="news-email"
                type="email"
                autoComplete="email"
                value={email}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? "news-email-err" : undefined}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error && emailOk(e.target.value)) setError("");
                }}
              />
              <button type="submit" className="btn btn-primary">
                Sign up
              </button>
            </div>
            {error && (
              <p className="field-error" id="news-email-err">
                {error}
              </p>
            )}
          </div>
          <p className="form-status" role="status">
            {done}
          </p>
        </form>
      </div>
      <div className="wrap footer-base">
        <p>
          {brand.name} is a fictional brand — a{" "}
          <a href="https://koative.github.io/cento/">Cento</a> template by
          Koative.
        </p>
        <p>
          Season {season} · Run by volunteers since {brand.founded}
        </p>
      </div>
    </footer>
  );
}
