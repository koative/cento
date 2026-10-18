import { useState, type FormEvent } from "react";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { Link } from "../router";
import { brand, footer, sitemap } from "../content";
import { pause, validate } from "../lib/util";
import { Field, useErrors } from "./Field";
import { Mark } from "./Logo";
import { HoursList } from "./Hours";

const icons = { Instagram, Facebook, YouTube: Youtube } as const;

export function Footer() {
  const { errors, setErrors, onChange } = useErrors();
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(e.currentTarget, {
      email:
        "Enter an email like name@example.com so we can send Kennel notes.",
    });
    setErrors(found);
    if (Object.keys(found).length) return;
    setState("sending");
    await pause(700);
    setState("done");
  }

  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Link to="/" className="logo" aria-label={`${brand.name}, home`}>
            <Mark />
            <span>{brand.name.toLowerCase()}</span>
          </Link>
          <address>
            {brand.address.map((l) => (
              <span key={l}>{l}</span>
            ))}
            <a href={brand.phoneHref}>{brand.phone}</a>
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
          </address>
          <ul className="social" aria-label="Kindred elsewhere">
            {brand.social.map((s) => {
              const Icon = icons[s.label as keyof typeof icons];
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                  >
                    <Icon aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {sitemap.map((col) => (
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

        <div className="footer-col">
          <h2>Open to visitors</h2>
          <HoursList compact />
        </div>

        <div className="footer-news">
          <h2>{footer.newsletterTitle}</h2>
          <p>{footer.newsletterText}</p>
          {state === "done" ? (
            <p className="form-success" role="status">
              You're on the list. The first Kennel notes arrives on the 1st.
            </p>
          ) : (
            <form
              noValidate
              onSubmit={submit}
              onChange={onChange}
              className="news-form"
            >
              <Field
                label="Email address"
                name="email"
                type="email"
                required
                autoComplete="email"
                error={errors.email}
              />
              <button
                className="btn btn-primary"
                disabled={state === "sending"}
              >
                {state === "sending" ? "Signing up…" : "Sign up"}
              </button>
            </form>
          )}
          <p className="sr-only" aria-live="polite">
            {state === "done" ? "Signed up to Kennel notes." : ""}
          </p>
        </div>
      </div>
      <div className="wrap footer-base">
        <p>
          {brand.name} is a fictional brand — a{" "}
          <a href="https://cento.koative.com/">Cento</a> template by
          Koative.
        </p>
        <p>{brand.charity}</p>
      </div>
    </footer>
  );
}
