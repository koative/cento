import { useState, type FormEvent } from "react";
import { Link } from "../router";
import { brand, nav, posts, projects } from "../content";
import { Field, validate, type Errors } from "./Field";
import { Mark } from "./Header";

export function Footer() {
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState("");

  function subscribe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, {
      "news-email": {
        missing: "Enter your email to get new posts.",
        invalid: "That email looks incomplete. Check the part after the @.",
      },
    });
    setErrors(found);
    if (Object.keys(found).length) return;
    setDone((form.elements.namedItem("news-email") as HTMLInputElement).value);
    form.reset();
  }

  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-intro">
          <p className="footer-logo">
            <Mark /> {brand.person}
          </p>
          <p>
            {brand.role}, {brand.city}.
          </p>
          <p>
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
            <br />
            <a href={brand.phoneHref}>{brand.phone}</a>
          </p>
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
        <nav className="footer-cols" aria-label="Sitemap">
          <div>
            <h2>Site</h2>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              {nav.map((n) => (
                <li key={n.to}>
                  <Link to={n.to}>{n.label}</Link>
                </li>
              ))}
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2>Projects</h2>
            <ul>
              {projects.slice(0, 4).map((p) => (
                <li key={p.slug}>
                  <Link to={`/projects/${p.slug}`}>{p.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Recent writing</h2>
            <ul>
              {posts.slice(0, 3).map((p) => (
                <li key={p.slug}>
                  <Link to={`/writing/${p.slug}`}>{p.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
        <form className="newsletter" noValidate onSubmit={subscribe}>
          <h2>New posts by email</h2>
          <p>About once a month. Plain text, no tracking pixels.</p>
          <div className="inline-form">
            <Field
              label="Email address"
              name="news-email"
              error={errors["news-email"]}
            >
              {(a) => (
                <input
                  {...a}
                  name="news-email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@company.example"
                />
              )}
            </Field>
            <button className="btn" type="submit">
              Subscribe
            </button>
          </div>
          <p className="form-status" aria-live="polite">
            {done &&
              `Subscribed ${done}. The next post will arrive in your inbox.`}
          </p>
        </form>
      </div>
      <div className="wrap footer-base">
        <p>
          {brand.name} is a fictional brand — a{" "}
          <a href="https://cento.koative.com/">Cento</a> template by
          Koative.
        </p>
        <p>Set in DM Mono and Schibsted Grotesk. No cookies, no analytics.</p>
      </div>
    </footer>
  );
}
