import { Github, Linkedin, Youtube } from "lucide-react";
import { Link } from "../router";
import { brand, footerColumns, socials } from "../content";
import { EMAIL, Field, useForm } from "./form";
import { Logo } from "./Logo";

const icons = { GitHub: Github, YouTube: Youtube, LinkedIn: Linkedin };

export function Footer() {
  const form = useForm({ email: "" }, (v) => ({
    email: !v.email.trim()
      ? "Enter an email address to get release notes."
      : !EMAIL.test(v.email)
        ? "That address is missing something. Check for an @ and a domain such as .com."
        : undefined,
  }));

  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <Link to="/" className="logo-link" aria-label={`${brand.site} home`}>
            <Logo />
          </Link>
          <p>{brand.tagline}</p>
          <address>
            {brand.address.map((l) => (
              <span key={l}>{l}</span>
            ))}
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
            <a href={`tel:${brand.phone.replace(/\s/g, "")}`}>{brand.phone}</a>
          </address>
        </div>

        {footerColumns.map((c) => (
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

        <div className="footer-news">
          <h2>Release notes by email</h2>
          <p>
            One message per minor release. Breaking changes flagged in the
            subject line.
          </p>
          {form.status !== "done" && (
            <form onSubmit={form.submit} noValidate>
              <Field
                form={form}
                name="email"
                label="Email address"
                type="email"
                autoComplete="email"
                required
              />
              <button
                className="btn btn-primary"
                disabled={form.status === "sending"}
              >
                {form.status === "sending" ? "Subscribing…" : "Subscribe"}
              </button>
            </form>
          )}
          <p
            className={form.status === "done" ? "form-success" : "quiet-note"}
            role="status"
          >
            {form.status === "done"
              ? `Subscribed ${form.values.email}. The next note goes out with 3.5.0.`
              : "Demo form: nothing is sent anywhere."}
          </p>
        </div>
      </div>
      <div className="footer-base">
        <p>
          {brand.name} is a fictional brand — a{" "}
          <a href={brand.gallery}>Cento</a> template by Koative.
        </p>
        <ul className="socials">
          {socials.map((s) => {
            const Icon = icons[s.label as keyof typeof icons];
            return (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                >
                  <Icon size={18} aria-hidden />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}
