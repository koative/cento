import { useState, type FormEvent } from "react";
import { Facebook, Instagram } from "lucide-react";
import { Link } from "../router";
import { brand, hours, newsletter } from "../content";
import { clock, weekday } from "../lib/format";
import { Mark } from "./Mark";

const columns = [
  {
    title: "Care",
    links: [
      { to: "/services", label: "All services" },
      { to: "/plans", label: "Health plans" },
      { to: "/planner", label: "Care planner" },
      { to: "/emergency", label: "Emergency" },
    ],
  },
  {
    title: "Clinic",
    links: [
      { to: "/vets", label: "Vets & nurses" },
      { to: "/about", label: "About Whisker" },
      { to: "/visit", label: "Visiting & new clients" },
      { to: "/book", label: "Book a visit" },
    ],
  },
];

export function Footer() {
  const [state, setState] = useState<"idle" | "error" | "done">("idle");
  const [email, setEmail] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!e.currentTarget.checkValidity()) {
      setState("error");
      e.currentTarget.querySelector("input")?.focus();
      return;
    }
    setState("done");
  };

  // Sunday first in the data; the footer reads Monday → Sunday.
  const week = [1, 2, 3, 4, 5, 6, 0];

  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Link
            to="/"
            className="logo"
            aria-label={`${brand.name} Veterinary Clinic, home`}
          >
            <Mark />
            <span className="logo-word">
              {brand.name}
              <small>Veterinary clinic</small>
            </span>
          </Link>
          <address>
            {brand.address.map((l) => (
              <span key={l}>{l}</span>
            ))}
            <a href={brand.phoneHref}>{brand.phone}</a>
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
          </address>
          <p className="footer-emergency">
            Emergencies, day and night:{" "}
            <a href={brand.emergencyHref}>{brand.emergencyPhone}</a>
          </p>
        </div>

        {columns.map((c) => (
          <nav key={c.title} className="footer-col" aria-label={c.title}>
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
          <h2>Hours</h2>
          <dl className="footer-hours">
            {week.map((d) => (
              <div key={d}>
                <dt>{weekday[d].slice(0, 3)}</dt>
                <dd>
                  {hours[d]
                    ? `${clock(hours[d]!.open)} – ${clock(hours[d]!.close)}`
                    : "Closed"}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="footer-news">
          <h2>{newsletter.title}</h2>
          <p>{newsletter.body}</p>
          {state === "done" ? (
            <p className="form-success" role="status">
              You're on the list. The next note goes out at the start of the
              season.
            </p>
          ) : (
            <form className="news-form" noValidate onSubmit={onSubmit}>
              <label htmlFor="news-email">Email address</label>
              <div className="news-row">
                <input
                  id="news-email"
                  type="email"
                  required
                  value={email}
                  autoComplete="email"
                  placeholder="you@example.com"
                  aria-invalid={state === "error" ? true : undefined}
                  aria-describedby={state === "error" ? "news-err" : undefined}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (state === "error" && e.target.checkValidity())
                      setState("idle");
                  }}
                />
                <button type="submit" className="btn btn-primary">
                  Sign up
                </button>
              </div>
              {state === "error" && (
                <p className="field-error" id="news-err">
                  Enter an email like name@example.com.
                </p>
              )}
            </form>
          )}
          <p role="status" className="sr-only">
            {state === "done" ? "Signed up for the seasonal note." : ""}
          </p>
        </div>
      </div>

      <div className="wrap footer-base">
        <p>
          {brand.name} is a fictional brand — a{" "}
          <a href="https://cento.koative.com/">Cento</a> template by
          Koative.
        </p>
        <ul className="social">
          <li>
            <a
              href={brand.social[0].href}
              target="_blank"
              rel="noreferrer"
              aria-label="Whisker on Instagram"
            >
              <Instagram aria-hidden="true" />
            </a>
          </li>
          <li>
            <a
              href={brand.social[1].href}
              target="_blank"
              rel="noreferrer"
              aria-label="Whisker on Facebook"
            >
              <Facebook aria-hidden="true" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
