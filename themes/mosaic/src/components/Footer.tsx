import { useState, type FormEvent } from "react";
import { Link } from "../router";
import { brand } from "../content";
import { Logo } from "./Header";
import { Field, validate, type Errors } from "./Field";

const columns = [
  {
    title: "Work",
    links: [
      ["/projects", "Projects"],
      ["/services", "Services"],
      ["/process", "Process"],
    ],
  },
  {
    title: "Library",
    links: [
      ["/materials", "Material library"],
      ["/samples", "Your sample board"],
    ],
  },
  {
    title: "Studio",
    links: [
      ["/studio", "About the studio"],
      ["/consultation", "Book a consultation"],
    ],
  },
];

export function Footer() {
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState("");

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, {
      "news-email": {
        missing: "Enter your email to get the letter.",
        invalid:
          "Check the email — it needs an @ and a domain, like ada@home.com.",
      },
    });
    setErrors(found);
    if (Object.keys(found).length) return;
    setDone((form.elements.namedItem("news-email") as HTMLInputElement).value);
    form.reset();
  }

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <Logo />
          <p>{brand.tagline}</p>
          <address>
            {brand.address.map((l) => (
              <span key={l}>{l}</span>
            ))}
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
            <a href={brand.phoneHref}>{brand.phone}</a>
          </address>
          <dl className="footer-hours">
            {brand.hours.map((h) => (
              <div key={h.days}>
                <dt>{h.days}</dt>
                <dd>{h.time}</dd>
              </div>
            ))}
          </dl>
        </div>
        {columns.map((c) => (
          <nav key={c.title} className="footer-col" aria-label={c.title}>
            <h2>{c.title}</h2>
            {c.links.map(([to, label]) => (
              <Link key={to} to={to}>
                {label}
              </Link>
            ))}
          </nav>
        ))}
        <div className="footer-news">
          <h2>Material notes</h2>
          <p>
            One letter a season: what came into the library, what we are
            specifying and why.
          </p>
          <div aria-live="polite">
            {done ? (
              <p className="form-success">
                Thank you — the autumn letter goes to {done}.
              </p>
            ) : (
              <form noValidate onSubmit={submit} className="news-form">
                <Field
                  label="Email address"
                  name="news-email"
                  type="email"
                  required
                  autoComplete="email"
                  error={errors["news-email"]}
                />
                <button className="btn btn-ghost" type="submit">
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <div className="footer-base">
        <p>
          {brand.name} is a fictional brand — a{" "}
          <a href="https://koative.github.io/cento/">Cento</a> template by
          Koative.
        </p>
        <p className="footer-social">
          {brand.socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
              {s.label}
            </a>
          ))}
        </p>
      </div>
    </footer>
  );
}
