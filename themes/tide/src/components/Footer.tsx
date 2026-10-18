import { useState, type FormEvent } from "react";
import { Link } from "../router";
import { brand, newsletter, programmes, reports } from "../content";
import { Mark } from "./Mark";

const columns = [
  {
    title: "Programmes",
    links: [
      { to: "/programmes", label: "All programmes" },
      ...programmes.map((p) => ({
        to: `/programmes/${p.slug}`,
        label: p.name,
      })),
    ],
  },
  {
    title: "Get involved",
    links: [
      { to: "/volunteer", label: "Volunteer events" },
      { to: "/programmes/shore-school", label: "Book a school visit" },
      { to: "/donate", label: "Donate" },
    ],
  },
  {
    title: "The charity",
    links: [
      { to: "/impact", label: "Impact reports" },
      { to: `/impact/${reports[0].year}`, label: `${reports[0].year} report` },
      { to: "/about", label: "About Tide" },
    ],
  },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem(
      "nl-email",
    ) as HTMLInputElement;
    if (!input.checkValidity()) {
      setError(
        email
          ? "That email looks incomplete. Check for an @ and a domain, like name@example.com."
          : "Enter your email to get Tide Notes.",
      );
      input.focus();
      return;
    }
    setError("");
    setDone(true);
  };

  return (
    <footer className="site-footer">
      <div className="wrap footer-top">
        <div className="footer-notes">
          <h2>{newsletter.title}</h2>
          <p>{newsletter.text}</p>
          {done ? (
            <p className="form-success" role="status">
              Thanks. The first Tide Notes will reach {email} on the 1st.
            </p>
          ) : (
            <form className="inline-form" noValidate onSubmit={submit}>
              <label htmlFor="nl-email">Email address</label>
              <div className="inline-form-row">
                <input
                  id="nl-email"
                  name="nl-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={error ? true : undefined}
                  aria-describedby="nl-email-msg"
                />
                <button type="submit" className="btn btn-paper">
                  Subscribe
                </button>
              </div>
              <p
                id="nl-email-msg"
                className={error ? "field-error" : "field-hint"}
                aria-live="polite"
              >
                {error || "Monthly, no more. Nothing is sent from this demo."}
              </p>
            </form>
          )}
        </div>

        <nav className="footer-cols" aria-label="Site map">
          {columns.map((c) => (
            <div key={c.title}>
              <h2>{c.title}</h2>
              <ul>
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h2>Contact</h2>
            <address>
              {brand.address.map((line) => (
                <span key={line}>{line}</span>
              ))}
              <a href={`mailto:${brand.email}`}>{brand.email}</a>
              <a href={brand.phoneHref}>{brand.phone}</a>
              <span>{brand.hours}</span>
            </address>
            <ul className="social">
              {brand.social.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>

      <div className="wrap footer-base">
        <Link
          to="/"
          className="logo logo-small"
          aria-label={`${brand.name}, home`}
        >
          <Mark />
          <span>{brand.name}</span>
        </Link>
        <p>
          {brand.name} is a fictional brand — a{" "}
          <a href="https://koative.github.io/cento/">Cento</a> template by
          Koative.
        </p>
      </div>
    </footer>
  );
}
