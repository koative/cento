import { Link } from "../router";
import { brand, footerColumns, newsletter } from "../content";
import { Logo } from "./Marks";
import { EMAIL, Field, useForm } from "./form";

export function Footer() {
  const form = useForm({ digest: "" }, (v) => ({
    digest: !v.digest.trim()
      ? "Enter your email to get the digest."
      : !EMAIL.test(v.digest)
        ? "Check the email: it needs a name, an @ and a domain."
        : undefined,
  }));

  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Link to="/" aria-label={`${brand.name} home`}>
            <Logo inverse />
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
        <div className="footer-news">
          <h2>{newsletter.title}</h2>
          <p>{newsletter.text}</p>
          {form.status === "done" ? (
            <p className="form-success" role="status">
              You are on the list. The next digest goes out on the first Tuesday
              of the month.
            </p>
          ) : (
            <form noValidate onSubmit={form.submit} className="news-form">
              <Field
                form={form}
                name="digest"
                label="Email for the digest"
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                required
              />
              <button
                className="btn btn-signal"
                disabled={form.status === "sending"}
              >
                {form.status === "sending" ? "Subscribing…" : "Subscribe"}
              </button>
            </form>
          )}
          <p className="quiet-note">Demo form: nothing is sent.</p>
        </div>
      </div>
      <div className="wrap footer-base">
        <p>
          {brand.name} is a fictional brand — a{" "}
          <a href="https://cento.koative.com/">Cento</a> template by
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
