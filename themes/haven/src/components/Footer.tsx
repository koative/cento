import { useState, type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "../router";
import { brand, footer } from "../content";
import { pause, useErrors, validate } from "../lib/forms";
import { Field } from "./Field";
import { Ridge } from "./Ridge";
import { Wordmark } from "./Header";

export function Footer() {
  const { errors, setErrors, onChange } = useErrors();
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(e.currentTarget, {
      email: "Enter an email address like name@example.com.",
    });
    setErrors(found);
    if (Object.keys(found).length) return;
    setState("sending");
    await pause(700);
    setState("done");
  }

  return (
    <footer className="site-footer">
      <Ridge className="footer-ridge" />
      <div className="footer-body">
        <div className="wrap footer-grid">
          <div className="footer-intro">
            <Link to="/" className="logo" aria-label={`${brand.name}, home`}>
              <Wordmark />
            </Link>
            <address>
              {brand.address.map((l) => (
                <span key={l}>{l}</span>
              ))}
              <a href={`mailto:${brand.email}`}>{brand.email}</a>
              <a href={`tel:${brand.phone.replace(/\s/g, "")}`}>
                {brand.phone}
              </a>
            </address>
            <ul className="social">
              {brand.social.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer">
                    {s.label} <ArrowUpRight aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {footer.columns.map((c) => (
            <nav key={c.heading} className="footer-col" aria-label={c.heading}>
              <h2>{c.heading}</h2>
              <ul>
                {c.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="footer-letter">
            <h2>Letters from the valley</h2>
            <p>{footer.note}</p>
            {state === "done" ? (
              <p className="form-done" role="status">
                Thank you. The next letter comes with the first snow.
              </p>
            ) : (
              <form
                noValidate
                onSubmit={submit}
                onChange={onChange}
                className="letter-form"
              >
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  error={errors.email}
                  placeholder="name@example.com"
                />
                <button
                  className="btn btn-light"
                  disabled={state === "sending"}
                >
                  {state === "sending" ? "Signing you up…" : "Sign up"}
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
          <p>
            Forms on this site are a demonstration; nothing is sent or stored.
          </p>
        </div>
      </div>
    </footer>
  );
}
