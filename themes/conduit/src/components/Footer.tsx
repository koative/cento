import { Link } from "../router";
import { brand, footerColumns, socials } from "../content";
import { Logo } from "./Logo";
import { EMAIL, Field, useForm } from "./form";

export function Footer() {
  const form = useForm({ digestEmail: "" }, (v) => ({
    digestEmail: !v.digestEmail.trim()
      ? "Enter an email address to get the changelog digest."
      : !EMAIL.test(v.digestEmail)
        ? "That address is missing something — check the part after the @."
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
            <a href={brand.phoneHref}>{brand.phone}</a>
          </address>
        </div>

        {footerColumns.map((col) => (
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

        <div className="footer-digest">
          <h2>Changelog digest</h2>
          <p>
            One email on the first Tuesday of the month. Breaking changes, never
            marketing.
          </p>
          {form.status === "done" ? (
            <p className="form-success" role="status">
              Subscribed. The next digest goes to {form.values.digestEmail}.
            </p>
          ) : (
            <form noValidate onSubmit={form.submit} className="inline-form">
              <Field
                form={form}
                name="digestEmail"
                label="Work email"
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                required
              />
              <button
                className="btn btn-quiet"
                disabled={form.status === "sending"}
              >
                {form.status === "sending" ? "Subscribing…" : "Subscribe"}
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="wrap footer-base">
        <p>
          {brand.name} is a fictional brand — a{" "}
          <a href="https://cento.koative.com/">Cento</a> template by
          Koative.
        </p>
        <ul className="socials">
          {socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noreferrer">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
