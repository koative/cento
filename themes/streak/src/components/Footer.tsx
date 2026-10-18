import { Instagram, Youtube } from "lucide-react";
import { Link } from "../router";
import { brand, footerColumns, socials } from "../content";
import { EMAIL, Field, useForm } from "./form";
import { Logo } from "./marks";

const icons = { Instagram, YouTube: Youtube };

export function Footer() {
  const form = useForm({ email: "" }, (v) => ({
    email: !v.email.trim()
      ? "Enter your email to get the Sunday letter."
      : !EMAIL.test(v.email)
        ? "That email looks incomplete. Check it has a name, an @ and a domain."
        : undefined,
  }));

  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Link to="/" className="logo-link" aria-label={`${brand.name} home`}>
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
          <h2>The Sunday letter</h2>
          <p>
            One short email a week: a habit idea, a member's chain, and nothing
            to buy.
          </p>
          {form.status !== "done" && (
            <form onSubmit={form.submit} noValidate>
              <Field
                form={form}
                name="email"
                label="Email"
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
              ? "You're on the list. The first letter arrives this Sunday at 8 a.m."
              : "Demo form: nothing is sent anywhere."}
          </p>
        </div>
      </div>
      <div className="wrap footer-base">
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
                  <Icon size={18} aria-hidden="true" />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}
