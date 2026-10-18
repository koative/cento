import { useState, type FormEvent } from "react";
import { Link } from "../router";
import { articles, brand, nav, services } from "../content";
import { pause, validate } from "../lib/forms";
import { Field, useErrors } from "./Field";
import { TallyMark } from "./Marks";

export function Footer() {
  const { errors, setErrors, onChange } = useErrors();
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [email, setEmail] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(e.currentTarget, {
      reminder:
        "Enter an email like name@business.com so we know where to send reminders.",
    });
    setErrors(found);
    if (Object.keys(found).length) return;
    setState("sending");
    await pause(700);
    setState("done");
  }

  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Link
            to="/"
            className="logo logo-light"
            aria-label={`${brand.name}, home`}
          >
            <TallyMark />
            <span>{brand.name}</span>
          </Link>
          <p>{brand.promise}</p>
          <address>
            {brand.address.map((l) => (
              <span key={l}>{l}</span>
            ))}
            <a href={brand.phoneHref}>{brand.phone}</a>
            <a href={brand.emailHref}>{brand.email}</a>
            <span>{brand.hours}</span>
          </address>
        </div>

        <nav className="footer-cols" aria-label="Footer">
          <div>
            <h2>Services</h2>
            <ul>
              {services.map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`}>{s.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Firm</h2>
            <ul>
              {nav.map((l) => (
                <li key={l.to}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
              <li>
                <Link to="/book">Book a call</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2>Reading</h2>
            <ul>
              {articles.slice(0, 4).map((a) => (
                <li key={a.slug}>
                  <Link to={`/resources/${a.slug}`}>{a.short}</Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="footer-signup">
          <h2>Deadline reminders</h2>
          <p>
            One short email a week before each federal due date. No newsletter,
            no offers.
          </p>
          {state === "done" ? (
            <p className="signup-done" role="status">
              Done — reminders will go to <strong>{email}</strong>, starting
              with the next due date.
            </p>
          ) : (
            <form
              noValidate
              onSubmit={submit}
              onChange={onChange}
              className="signup-form"
            >
              <Field
                label="Email address"
                name="reminder"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.reminder}
              />
              <button className="btn btn-light" disabled={state === "sending"}>
                {state === "sending" ? "Adding…" : "Remind me"}
              </button>
            </form>
          )}
          <p className="sr-only" aria-live="polite">
            {state === "done" ? "Reminder signup confirmed." : ""}
          </p>
        </div>
      </div>

      <div className="wrap footer-base">
        <p>
          {brand.name} is a fictional brand — a{" "}
          <a href="https://koative.github.io/cento/">Cento</a> template by
          Koative.
        </p>
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
    </footer>
  );
}
