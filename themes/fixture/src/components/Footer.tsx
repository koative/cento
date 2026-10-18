import { useState, type FormEvent } from "react";
import { Link } from "../router";
import { brand, footer, services, trades, type Trade } from "../content";
import { validate } from "../lib/format";
import { Mark } from "./Mark";

const pages = [
  { to: "/services", label: "All services" },
  { to: "/estimate", label: "Instant estimate" },
  { to: "/areas", label: "Service areas" },
  { to: "/emergency", label: "Emergency" },
  { to: "/book", label: "Book a visit" },
  { to: "/about", label: "About & team" },
];

export function Footer() {
  const [error, setError] = useState("");
  const [done, setDone] = useState("");

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const errors = validate(form, {
      email: "Enter an email like name@example.com so the reminders reach you.",
    });
    setError(errors.email ?? "");
    if (errors.email) return;
    setDone((form.elements.namedItem("email") as HTMLInputElement).value);
    form.reset();
  };

  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Link
            to="/"
            className="logo logo-footer"
            aria-label={`${brand.name}, home`}
          >
            <Mark />
            <span>{brand.name}</span>
          </Link>
          <p>{footer.blurb}</p>
          <ul className="footer-contact">
            <li>
              Office <a href={brand.phoneHref}>{brand.phone}</a>
            </li>
            <li>
              Emergency <a href={brand.emergencyHref}>{brand.emergency}</a>
            </li>
            <li>
              <a href={`mailto:${brand.email}`}>{brand.email}</a>
            </li>
            <li>{brand.address}</li>
          </ul>
          <dl className="footer-hours">
            {brand.hours.map((h) => (
              <div key={h.days}>
                <dt>{h.days}</dt>
                <dd>{h.time}</dd>
              </div>
            ))}
          </dl>
        </div>

        <nav className="footer-nav" aria-label="Footer">
          <div>
            <h2>Fixture</h2>
            <ul>
              {pages.map((p) => (
                <li key={p.to}>
                  <Link to={p.to}>{p.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          {(Object.keys(trades) as Trade[]).map((t) => (
            <div key={t}>
              <h2>{trades[t].label}</h2>
              <ul>
                {services
                  .filter((s) => s.trade === t)
                  .map((s) => (
                    <li key={s.slug}>
                      <Link to={`/services/${s.slug}`}>{s.name}</Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </nav>

        <form className="footer-form" noValidate onSubmit={submit}>
          <h2>Maintenance reminders</h2>
          <p id="reminders-desc">{footer.reminders}</p>
          <div
            className="footer-form-row"
            data-invalid={error ? "" : undefined}
          >
            <label htmlFor="f-reminder" className="sr-only">
              Email address
            </label>
            <input
              id="f-reminder"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              aria-invalid={error ? true : undefined}
              aria-describedby={
                error ? "reminders-desc reminders-err" : "reminders-desc"
              }
              onChange={(e) =>
                error && e.currentTarget.checkValidity() && setError("")
              }
            />
            <button className="btn btn-live" type="submit">
              Sign up
            </button>
          </div>
          {error && (
            <p className="field-error" id="reminders-err">
              {error}
            </p>
          )}
          <p className="footer-done" aria-live="polite">
            {done &&
              `Signed up — the first reminder goes to ${done} before the first frost.`}
          </p>
        </form>
      </div>

      <div className="wrap footer-base">
        <p>
          {brand.name} is a fictional brand — a{" "}
          <a href="https://cento.koative.com/">Cento</a> template by
          Koative.
        </p>
        <p>{brand.licences.map((l) => `${l.label} ${l.value}`).join(" · ")}</p>
      </div>
    </footer>
  );
}
