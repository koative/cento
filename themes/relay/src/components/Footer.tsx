import { Link } from "../router";
import { brand, footerNav } from "../content";
import { Logo } from "./Logo";
import { EMAIL, Field, useForm } from "./form";

export function Footer() {
  const form = useForm({ email: "" }, (v) => ({
    email: !v.email.trim()
      ? "Enter your work email to get the bulletin."
      : !EMAIL.test(v.email)
        ? "That email is missing an @ or a domain, e.g. name@company.com."
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
            <a href={brand.phoneHref}>{brand.phone}</a>
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
            <span className="footer-desk">{brand.desk}</span>
          </address>
        </div>
        {footerNav.map((col) => (
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
          <h2>Lane & rate bulletin</h2>
          <p>
            Fuel surcharges, new departures and holiday cut-offs. Monthly, one
            email.
          </p>
          {form.status === "done" ? (
            <p className="form-success">
              Subscribed: the next bulletin goes to {form.values.email}. (Demo —
              nothing was sent.)
            </p>
          ) : (
            <form onSubmit={form.submit} noValidate className="news-form">
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
          <div role="status" className="sr-only">
            {form.status === "done" ? "Subscribed to the bulletin." : ""}
          </div>
        </div>
      </div>
      <div className="wrap footer-base">
        <p>
          {brand.name} is a fictional brand — a{" "}
          <a href="https://koative.github.io/cento/">Cento</a> template by
          Koative.
        </p>
        <ul className="social">
          {brand.social.map((s) => (
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
