import { Link } from "../router";
import { brand, footerColumns, newsletter } from "../content";
import { Logo } from "./Logo";
import { EMAIL, Field, useForm } from "./form";

export function Footer() {
  const form = useForm({ news: "" }, (v) => ({
    news: !v.news.trim()
      ? "Enter your email to get the release notes."
      : !EMAIL.test(v.news)
        ? "That address is missing something — check the part after the @."
        : undefined,
  }));

  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Link to="/" className="logo-link" aria-label="Sprint home">
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

        <div className="footer-news">
          <h2>{newsletter.title}</h2>
          <p>{newsletter.text}</p>
          <div aria-live="polite">
            {form.status === "done" ? (
              <p className="form-done">
                You’re on the list. The next notes go out after release 4.13.
              </p>
            ) : (
              <form className="inline-form" noValidate onSubmit={form.submit}>
                <Field
                  form={form}
                  name="news"
                  label="Email for release notes"
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
          </div>
        </div>
      </div>
      <div className="wrap footer-base">
        <p>
          {brand.name} is a fictional brand — a{" "}
          <a href="https://koative.github.io/cento/">Cento</a> template by
          Koative.
        </p>
        <p>
          © 2026 {brand.legal} ·{" "}
          <a href="https://github.com/" target="_blank" rel="noreferrer">
            GitHub
          </a>{" "}
          ·{" "}
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </p>
      </div>
    </footer>
  );
}
