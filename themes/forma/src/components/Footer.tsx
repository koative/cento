import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { brand, nav, projects } from "../content";
import { Logo } from "./Header";
import { validate, type Errors } from "./Field";

export function Footer() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState("");

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, {
      letter: {
        missing: "Enter your email address to subscribe.",
        invalid: "Check the email address, it needs an @ and a domain.",
      },
    });
    setErrors(found);
    if (Object.keys(found).length) return;
    setSent((form.elements.namedItem("letter") as HTMLInputElement).value);
    form.reset();
  }

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-letter">
          <h2>The Forma letter</h2>
          <p>
            Four times a year: one finished project, one drawing from the
            archive, and the dates of our open drawing evenings.
          </p>
          <form onSubmit={submit} noValidate className="letter-form">
            <label htmlFor="f-letter">Email address</label>
            <div className="letter-row">
              <input
                id="f-letter"
                name="letter"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                aria-invalid={errors.letter ? true : undefined}
                aria-describedby={errors.letter ? "f-letter-error" : undefined}
              />
              <button type="submit" className="btn">
                Subscribe <ArrowRight size={16} aria-hidden="true" />
              </button>
            </div>
            {errors.letter && (
              <p className="field-error" id="f-letter-error">
                {errors.letter}
              </p>
            )}
            <p className="form-status" aria-live="polite">
              {sent &&
                `Thank you. The next letter goes to ${sent} in December. (Demo: nothing was sent.)`}
            </p>
          </form>
        </div>

        <nav className="footer-map" aria-label="Footer">
          <div>
            <h2>Site</h2>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              {nav.map((n) => (
                <li key={n.to}>
                  <Link to={n.to}>{n.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Recent work</h2>
            <ul>
              {projects.slice(0, 5).map((p) => (
                <li key={p.slug}>
                  <Link to={"/projects/" + p.slug}>{p.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Studio</h2>
            <address>
              {brand.address.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </address>
            <p>{brand.hours}</p>
            <p>
              <a href={"mailto:" + brand.email}>{brand.email}</a>
              <br />
              <a href={brand.phoneHref}>{brand.phone}</a>
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
        </nav>
      </div>

      <div className="footer-base">
        <Logo />
        <p>
          {brand.name} is a fictional brand — a{" "}
          <a href="https://cento.koative.com/">Cento</a> template by
          Koative.
        </p>
        <p>
          © {new Date().getFullYear()} {brand.legal}
        </p>
      </div>
    </footer>
  );
}
