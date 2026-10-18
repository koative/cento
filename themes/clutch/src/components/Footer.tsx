import { useState, type FormEvent } from "react";
import { Link } from "../router";
import { brand, players, products } from "../content";
import { Mark } from "./Mark";

const columns = [
  {
    title: "Teams",
    links: [
      { to: "/teams", label: "All rosters" },
      ...players
        .filter((p) => p.division === "fault-line")
        .map((p) => ({ to: `/players/${p.id}`, label: p.handle })),
    ],
  },
  {
    title: "Matches",
    links: [
      { to: "/matches", label: "Schedule & results" },
      { to: "/matches/2026-10-17-hexa-club", label: "Replay: Clutch vs Hexa" },
      { to: "/news", label: "News" },
      { to: "/news/six-rounds-in-a-row", label: "Latest story" },
    ],
  },
  {
    title: "Shop",
    links: [
      { to: "/shop", label: "All merch" },
      { to: `/shop/${products[0].id}`, label: products[0].name },
      { to: "/cart", label: "Bag & checkout" },
    ],
  },
  {
    title: "Club",
    links: [
      { to: "/club", label: "Story & Clutch House" },
      { to: "/partners", label: "Partners" },
      { to: "/", label: "Home" },
    ],
  },
];

export function Footer() {
  const [state, setState] = useState<"idle" | "error" | "done">("idle");
  const [email, setEmail] = useState("");

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState(e.currentTarget.checkValidity() ? "done" : "error");
  };

  return (
    <footer className="site-footer">
      <div className="wrap footer-top">
        <div className="footer-brand">
          <Link to="/" className="logo" aria-label={`${brand.name}, home`}>
            <Mark />
            <span>{brand.name}</span>
          </Link>
          <address>
            {brand.address.map((l) => (
              <span key={l}>{l}</span>
            ))}
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
            <a href={`tel:${brand.phone.replace(/\s/g, "")}`}>{brand.phone}</a>
          </address>
          <ul className="socials">
            {brand.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <form
          className="newsletter"
          noValidate
          onSubmit={submit}
          aria-labelledby="nl-title"
        >
          <h2 id="nl-title">Matchday email</h2>
          <p>
            Lineups, start times and where to watch, the morning of every match.
            Nothing else.
          </p>
          {state === "done" ? (
            <p className="form-success">
              You're on the list. First email lands before Saturday's match
              against Varg.
            </p>
          ) : (
            <>
              <div
                className="inline-field"
                data-invalid={state === "error" ? "" : undefined}
              >
                <label htmlFor="nl-email">Email address</label>
                <input
                  id="nl-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => (
                    setEmail(e.target.value),
                    state === "error" && setState("idle")
                  )}
                  aria-invalid={state === "error" || undefined}
                  aria-describedby={state === "error" ? "nl-err" : undefined}
                />
                <button type="submit" className="btn">
                  Sign up
                </button>
              </div>
              {state === "error" && (
                <p className="field-error" id="nl-err">
                  Enter an email address like name@example.com.
                </p>
              )}
            </>
          )}
          <p aria-live="polite" className="sr-only">
            {state === "done" ? "Signed up for the matchday email." : ""}
          </p>
        </form>
      </div>

      <nav className="wrap footer-map" aria-label="Sitemap">
        {columns.map((c) => (
          <div key={c.title}>
            <h2>{c.title}</h2>
            <ul>
              {c.links.map((l) => (
                <li key={l.to + l.label}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="wrap footer-base">
        <p>
          {brand.name} is a fictional brand — a{" "}
          <a href="https://koative.github.io/cento/">Cento</a> template by
          Koative.
        </p>
        <p>Teams, players, partners and results are demonstration content.</p>
      </div>
    </footer>
  );
}
