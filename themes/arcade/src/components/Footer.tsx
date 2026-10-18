import { useState, type FormEvent } from "react";
import { Link } from "../router";
import { brand, games, jobs, newsletter } from "../content";
import { validate } from "../lib/util";
import { Field, useErrors } from "./Field";
import { Logo } from "./PixelArt";

const columns = [
  {
    title: "Games",
    links: games.map((g) => ({ to: `/games/${g.slug}`, label: g.name })),
  },
  {
    title: "Studio",
    links: [
      { to: "/games", label: "All games" },
      { to: "/play", label: "Play the demo" },
      { to: "/devlog", label: "Devlog" },
      { to: "/studio", label: "About the studio" },
      { to: "/press", label: "Press kit" },
      { to: "/jobs", label: `Jobs (${jobs.length} open)` },
    ],
  },
];

export function Footer() {
  const { errors, setErrors, onChange } = useErrors();
  const [done, setDone] = useState("");

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, {
      email: "Enter an email like you@example.com so we can send you builds.",
    });
    setErrors(found);
    if (Object.keys(found).length) return;
    setDone(String(new FormData(form).get("email")));
    form.reset();
  };

  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Logo className="logo-footer" />
          <p>{brand.tagline}</p>
          <address>
            {brand.address.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </address>
          <p>
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
            <br />
            <a href={brand.phoneHref}>{brand.phone}</a>
          </p>
          <ul className="footer-social">
            {brand.social.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title} className="footer-col">
            <h2>{col.title}</h2>
            <ul>
              {col.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="footer-news">
          <h2>{newsletter.title}</h2>
          <p>{newsletter.text}</p>
          <form
            noValidate
            onSubmit={submit}
            onChange={onChange}
            className="news-form"
          >
            <Field
              label="Email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              error={errors.email}
            />
            <button className="btn btn-sun" type="submit">
              Sign me up
            </button>
          </form>
          <p className="news-done" aria-live="polite">
            {done &&
              `You're on the list. The next build goes to ${done}. (Demo: nothing was sent.)`}
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
          Games, people, prices and quotes are sample content. Prices in USD.
        </p>
      </div>
    </footer>
  );
}
