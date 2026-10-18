import { useState, type FormEvent } from "react";
import { Link } from "../router";
import { brand } from "../content";
import { pause, validate } from "../lib/util";
import { Field, useErrors } from "./Field";
import { Logo } from "./Logo";

const columns = [
  {
    title: "Learn",
    links: [
      ["/lessons", "Lessons"],
      ["/camps", "Camps"],
      ["/book", "Book"],
    ],
  },
  {
    title: "Plan",
    links: [
      ["/forecast", "Surf report"],
      ["/faq", "FAQ"],
    ],
  },
  {
    title: "School",
    links: [
      ["/about", "About"],
      ["/coaches", "Coaches"],
    ],
  },
];

export function Footer() {
  const { errors, setErrors, onChange } = useErrors();
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(e.currentTarget, {
      email:
        "Enter an email address like you@example.com so we can send swell alerts.",
    });
    setErrors(found);
    if (Object.keys(found).length) return;
    setState("sending");
    await pause(700);
    setState("done");
  }

  return (
    <footer className="site-footer">
      <svg
        className="footer-swell"
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0 40C120 40 160 10 300 10s200 34 360 34 220-30 380-30 240 26 400 26V60H0Z" />
      </svg>
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Link to="/" className="logo" aria-label={`${brand.name}, home`}>
            <Logo />
            <span>{brand.name}</span>
          </Link>
          <address>
            {brand.address.map((l) => (
              <span key={l}>{l}</span>
            ))}
            <a href={brand.phoneHref}>{brand.phone}</a>
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
          </address>
          <p className="footer-hours">{brand.hours}</p>
        </div>

        <nav className="footer-nav" aria-label="Footer">
          {columns.map((c) => (
            <div key={c.title}>
              <h2>{c.title}</h2>
              <ul>
                {c.links.map(([to, label]) => (
                  <li key={to}>
                    <Link to={to}>{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h2>Follow</h2>
            <ul>
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

        <div className="footer-alerts">
          <h2>Swell alerts</h2>
          <p>
            One short email when a good, beginner-friendly swell is on the way.
            Roughly twice a month.
          </p>
          {state === "done" ? (
            <p className="form-success" role="status">
              You're on the list. The next alert lands when the charts line up.
            </p>
          ) : (
            <form
              noValidate
              onSubmit={submit}
              onChange={onChange}
              className="inline-form"
            >
              <Field
                label="Email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                error={errors.email}
              />
              <button className="btn btn-wax" disabled={state === "sending"}>
                {state === "sending" ? "Signing up…" : "Get alerts"}
              </button>
            </form>
          )}
          <p className="quiet">Demo form: nothing is sent or stored.</p>
        </div>
      </div>
      <div className="wrap footer-base">
        <p>
          {brand.name} is a fictional brand — a{" "}
          <a href="https://koative.github.io/cento/">Cento</a> template by
          Koative.
        </p>
        <p>
          Forecasts on this site are sample data. Always check conditions before
          you paddle out.
        </p>
      </div>
    </footer>
  );
}
