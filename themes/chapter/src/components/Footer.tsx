import { useState, type FormEvent } from "react";
import { brand, platforms, shows, socials } from "../content";
import { Link } from "../router";
import { emailOk } from "../lib/format";
import { Wordmark } from "./Header";

const columns = [
  {
    title: "Listen",
    links: [
      { to: "/shows", label: "All shows" },
      { to: "/episodes", label: "Every episode" },
      { to: "/listening-list", label: "Your listening list" },
      { to: "/hosts", label: "Hosts" },
    ],
  },
  {
    title: "Shows",
    links: shows.map((s) => ({ to: `/shows/${s.slug}`, label: s.title })),
  },
  {
    title: "Chapter",
    links: [
      { to: "/about", label: "About the network" },
      { to: "/newsletter", label: "The Margin newsletter" },
      { to: "/advertise", label: "Advertise" },
    ],
  },
];

function MiniSignup() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!emailOk(email))
      return setError("Enter an email address like name@example.com.");
    setError("");
    setDone(true);
  };

  return (
    <form className="mini-signup" noValidate onSubmit={submit}>
      <label htmlFor="footer-email">
        The Margin — a short letter every Sunday
      </label>
      <div className="mini-row">
        <input
          id="footer-email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "footer-email-err" : undefined}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error && emailOk(e.target.value)) setError("");
          }}
          disabled={done}
        />
        <button type="submit" className="btn btn-paper" disabled={done}>
          Subscribe
        </button>
      </div>
      {error && (
        <p className="field-error" id="footer-email-err">
          {error}
        </p>
      )}
      <p className="mini-status" aria-live="polite">
        {done
          ? `Thank you. The next Margin goes to ${email.trim()} on Sunday.`
          : ""}
      </p>
    </form>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-top">
        <div className="footer-brand">
          <Link to="/" className="logo" aria-label={`${brand.name}, home`}>
            <Wordmark />
          </Link>
          <p>{brand.tagline}</p>
          <MiniSignup />
        </div>
        {columns.map((c) => (
          <nav key={c.title} aria-label={c.title} className="footer-col">
            <h2>{c.title}</h2>
            <ul>
              {c.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <div className="footer-col">
          <h2>Contact</h2>
          <address>
            {brand.address.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </address>
          <ul>
            <li>
              <a href={`mailto:${brand.email}`}>{brand.email}</a>
            </li>
            <li>
              <a href={`tel:${brand.phone.replace(/\s/g, "")}`}>
                {brand.phone}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <ul className="footer-out" aria-label="Find Chapter elsewhere">
          {[...platforms, ...socials].map((p) => (
            <li key={p.label}>
              <a href={p.href} target="_blank" rel="noreferrer">
                {p.label}
              </a>
            </li>
          ))}
        </ul>
        <p>
          {brand.name} is a fictional brand — a{" "}
          <a href="https://koative.github.io/cento/">Cento</a> template by
          Koative.
        </p>
      </div>
    </footer>
  );
}
