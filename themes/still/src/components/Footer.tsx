import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { brand, footerColumns, newsletter } from "../content";
import { Mark } from "./Logo";

export function Footer() {
  const [state, setState] = useState<"idle" | "error" | "done">("idle");
  const [email, setEmail] = useState("");

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem(
      "letter-email",
    ) as HTMLInputElement;
    setState(input.checkValidity() ? "done" : "error");
    if (!input.checkValidity()) input.focus();
  };

  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-letter">
          <h2>{newsletter.title}</h2>
          <p>{newsletter.text}</p>
          {state === "done" ? (
            <p className="letter-done" role="status">
              Thank you. The next letter arrives on Sunday morning at {email}.
            </p>
          ) : (
            <form className="letter-form" noValidate onSubmit={submit}>
              <label htmlFor="letter-email">Email address</label>
              <div className="letter-row">
                <input
                  id="letter-email"
                  name="letter-email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  aria-invalid={state === "error" || undefined}
                  aria-describedby={
                    state === "error" ? "letter-err" : undefined
                  }
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (state === "error" && e.target.checkValidity())
                      setState("idle");
                  }}
                />
                <button type="submit" className="btn btn-light">
                  Subscribe <ArrowRight aria-hidden="true" size={16} />
                </button>
              </div>
              {state === "error" && (
                <p className="field-error" id="letter-err">
                  Enter an email address like name@example.com so we know where
                  to send it.
                </p>
              )}
            </form>
          )}
        </div>

        {footerColumns.map((col) => (
          <nav key={col.title} className="footer-col" aria-label={col.title}>
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

        <div className="footer-col footer-contact">
          <h2>Find us</h2>
          <address>
            {brand.address.map((l) => (
              <span key={l}>{l}</span>
            ))}
            <a href={`tel:${brand.phone.replaceAll(" ", "")}`}>{brand.phone}</a>
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
          </address>
          <ul className="footer-social">
            {brand.social.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="wrap footer-base">
        <Mark size={22} />
        <p>
          {brand.name} is a fictional brand — a{" "}
          <a href="https://koative.github.io/cento/">Cento</a> template by
          Koative.
        </p>
      </div>
    </footer>
  );
}
