import { useState, type FormEvent } from "react";
import { Instagram, Facebook } from "lucide-react";
import { Link } from "../router";
import { brand, rooms } from "../content";
import { Logo } from "./Logo";

const columns = [
  {
    title: "Rooms",
    links: [
      { to: "/rooms", label: "All rooms by age" },
      ...rooms.map((r) => ({ to: `/rooms/${r.id}`, label: `${r.name} room` })),
    ],
  },
  {
    title: "Families",
    links: [
      { to: "/day", label: "A day at Nest" },
      { to: "/fees", label: "Fees calculator" },
      { to: "/parents", label: "Parent info & FAQ" },
      { to: "/tour", label: "Book a tour" },
    ],
  },
  {
    title: "Nest",
    links: [
      { to: "/", label: "Home" },
      { to: "/team", label: "Team" },
      { to: "/about", label: "About & story" },
    ],
  },
];

const icons = { Instagram, Facebook } as const;

export function Footer() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem(
      "news-email",
    ) as HTMLInputElement;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError(
        email.trim()
          ? "That email looks incomplete. Check for an @ and a domain, like name@example.com."
          : "Enter your email to get the termly letter.",
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
        <div className="footer-brand">
          <Link to="/" className="logo" aria-label={`${brand.name}, home`}>
            <Logo />
          </Link>
          <p>{brand.description}</p>
          <address>
            {brand.address.map((l) => (
              <span key={l}>{l}</span>
            ))}
            <a href={brand.phoneHref}>{brand.phone}</a>
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
            <span>{brand.hours}</span>
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
        <nav className="footer-nav" aria-label="Footer">
          {columns.map((c) => (
            <div key={c.title}>
              <h2>{c.title}</h2>
              <ul>
                {c.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <div className="footer-news">
          <h2>The termly letter</h2>
          <p>
            Open days, new places and what Rosa is cooking, three times a year.
          </p>
          {done ? (
            <p className="news-done" role="status">
              Thank you. The next letter goes out in January to {email}.
            </p>
          ) : (
            <form onSubmit={submit} noValidate className="news-form">
              <label htmlFor="news-email">Email address</label>
              <div className="news-row">
                <input
                  id="news-email"
                  name="news-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? "news-err" : undefined}
                />
                <button type="submit" className="btn btn-primary">
                  Sign up
                </button>
              </div>
              {error && (
                <p id="news-err" className="field-error">
                  {error}
                </p>
              )}
            </form>
          )}
          <p className="quiet" aria-live="polite">
            {done ? "" : "Demo form: nothing is sent."}
          </p>
        </div>
      </div>
      <div className="wrap footer-base">
        <p>
          {brand.name} is a fictional brand — a{" "}
          <a href="https://koative.github.io/cento/">Cento</a> template by
          Koative.
        </p>
        <p>
          © {new Date().getFullYear()} {brand.name} Nursery. Sample content
          only.
        </p>
      </div>
    </footer>
  );
}
