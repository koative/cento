import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { brand, days, hours, hoursNote } from "../content";
import { hoursLabel } from "../lib/format";
import { pause, useErrors, validate } from "../lib/forms";
import { Field } from "./Field";
import { Mark } from "./Shape";

const columns = [
  {
    title: "Visit",
    links: [
      { to: "/visit", label: "Plan your visit" },
      { to: "/tickets", label: "Tickets" },
      { to: "/events", label: "Events" },
    ],
  },
  {
    title: "Explore",
    links: [
      { to: "/exhibits", label: "All exhibits" },
      { to: "/exhibits/bubble-works", label: "Bubble Works" },
      { to: "/exhibits/dino-dig", label: "Dino Dig" },
      { to: "/exhibits/little-harbour", label: "Little Harbour" },
    ],
  },
  {
    title: "Groups",
    links: [
      { to: "/school-trips", label: "School trips" },
      { to: "/parties", label: "Birthday parties" },
      { to: "/about", label: "About Fable" },
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
        "Add your email, like name@example.com, so we know where to send the letter.",
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
            className="logo logo-lg"
            aria-label={`${brand.name}, home`}
          >
            <Mark />
            <span>{brand.name.toLowerCase()}</span>
          </Link>
          <address>
            {brand.address.map((l) => (
              <span key={l}>{l}</span>
            ))}
            <a href={brand.phoneHref}>{brand.phone}</a>
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
          </address>
          <ul className="socials">
            {brand.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {columns.map((c) => (
          <nav key={c.title} className="footer-col" aria-label={c.title}>
            <h2>{c.title}</h2>
            <ul>
              {c.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="footer-hours">
          <h2>Opening hours</h2>
          <dl>
            {[2, 3, 4, 5, 6, 0, 1].map((d) => (
              <div key={d}>
                <dt>{days[d].slice(0, 3)}</dt>
                <dd>{hoursLabel(hours[d])}</dd>
              </div>
            ))}
          </dl>
          <p>{hoursNote}</p>
        </div>

        <div className="footer-letter">
          <h2>The family letter</h2>
          <p>
            One email a month: new exhibits, holiday camps and the free-day
            calendar.
          </p>
          <div aria-live="polite">
            {state === "done" ? (
              <p className="form-success">
                You’re on the list. The next letter goes out on the first
                Thursday of the month.
              </p>
            ) : (
              <form
                noValidate
                onSubmit={submit}
                onChange={onChange}
                className="letter-form"
              >
                <Field
                  label="Email address"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="name@example.com"
                  error={errors.email}
                />
                <button className="btn btn-ink" disabled={state === "sending"}>
                  {state === "sending" ? "Signing up…" : "Sign up"}{" "}
                  <ArrowRight aria-hidden="true" />
                </button>
              </form>
            )}
          </div>
          <p className="quiet-note">Demo form: nothing is sent anywhere.</p>
        </div>
      </div>
      <div className="wrap footer-base">
        <p>
          {brand.name} is a fictional brand — a{" "}
          <a href="https://koative.github.io/cento/">Cento</a> template by
          Koative.
        </p>
        <p>All exhibits, prices, people and events are sample content.</p>
      </div>
    </footer>
  );
}
