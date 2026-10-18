import { useState, type FormEvent } from "react";
import { Link } from "../router";
import { brand, footer } from "../content";
import { Logo } from "./Header";
import { Field, validate, type Errors } from "./Field";

export function Footer() {
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState("");

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, {
      news: {
        missing: "Enter your email to get the menu.",
        invalid:
          "Check the email, it needs an @ and a domain like example.com.",
      },
    });
    setErrors(found);
    if (Object.keys(found).length) return;
    setDone((form.elements.namedItem("news") as HTMLInputElement).value);
    form.reset();
  }

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-news">
          <h2>{footer.newsletter.title}</h2>
          <p>{footer.newsletter.body}</p>
          <form className="news-form" noValidate onSubmit={submit}>
            <Field
              label="Email address"
              name="news"
              type="email"
              autoComplete="email"
              required
              error={errors.news}
            />
            <button className="btn" type="submit">
              Send me the menu
            </button>
          </form>
          <p className="form-status" aria-live="polite">
            {done && `Done. The next menu goes to ${done} on Sunday at noon.`}
          </p>
        </div>
        <nav className="footer-cols" aria-label="Footer">
          {footer.columns.map((c) => (
            <div key={c.title}>
              <h2>{c.title}</h2>
              <ul>
                {c.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h2>Kitchen support</h2>
            <ul>
              <li>
                <a href={"mailto:" + brand.email}>{brand.email}</a>
              </li>
              <li>
                <a href={brand.phoneHref}>{brand.phone}</a>
              </li>
              {brand.hours.map((h) => (
                <li key={h} className="muted">
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
      <div className="footer-bottom">
        <Logo />
        <address>{brand.address.join(", ")}</address>
        <ul className="social">
          {brand.social.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noreferrer">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="fiction">
          {brand.name} is a fictional brand — a{" "}
          <a href="https://cento.koative.com/">Cento</a> template by
          Koative.
        </p>
      </div>
    </footer>
  );
}
