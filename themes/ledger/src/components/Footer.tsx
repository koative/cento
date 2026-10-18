import { Instagram, Linkedin, Youtube } from "lucide-react";
import { Link } from "../router";
import { brand, footerColumns, socials } from "../content";
import { EMAIL, Field, useForm } from "./form";
import { Logo } from "./Logo";

const icons = { Instagram, LinkedIn: Linkedin, YouTube: Youtube };

export function Footer() {
  const form = useForm({ news: "" }, (v) => ({
    news: !v.news.trim()
      ? "Enter your email to get the payday letter."
      : !EMAIL.test(v.news)
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
            <span>{brand.hours}</span>
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
          <h2>The payday letter</h2>
          <p>
            One short email on the 1st and 15th: a guide, a checklist, nothing
            to buy.
          </p>
          {form.status !== "done" && (
            <form onSubmit={form.submit} noValidate>
              <Field
                form={form}
                name="news"
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
              ? `Subscribed as ${form.values.news}. The next letter arrives on November 1.`
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
