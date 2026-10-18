import { Github, Linkedin, Youtube } from "lucide-react";
import { Link } from "../router";
import { brand, footer } from "../content";
import { EMAIL, Field, useForm } from "./form";
import { Logo } from "./Logo";

const icons = { GitHub: Github, LinkedIn: Linkedin, YouTube: Youtube };

export function Footer() {
  const form = useForm({ email: "" }, (v) => ({
    email: !v.email.trim()
      ? "Enter your work email to get the Monday letter."
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

        {footer.columns.map((c) => (
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
          <h2>{footer.newsletter.title}</h2>
          <p>{footer.newsletter.body}</p>
          {form.status !== "done" && (
            <form onSubmit={form.submit} noValidate className="inline-form">
              <Field
                form={form}
                name="email"
                label="Work email"
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
              ? `Subscribed as ${form.values.email}. The next letter goes out Monday at 7:00.`
              : "Demo form: nothing is sent anywhere."}
          </p>
        </div>
      </div>
      <div className="wrap footer-base">
        <p>
          {brand.name} is a fictional brand — a{" "}
          <a href="https://koative.github.io/cento/">Cento</a> template by
          Koative.
        </p>
        <ul className="socials">
          {brand.socials.map((s) => {
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
