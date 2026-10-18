import { useState, type FormEvent } from "react";
import { Link } from "../router";
import { brand, days, hours, treatments } from "../content";
import { hoursLabel, pause, validate } from "../lib/format";
import { Field, useErrors } from "./Field";
import { Mark } from "./Logo";

export function Footer() {
  const { errors, setErrors, onChange } = useErrors();
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [email, setEmail] = useState("");

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, {
      recall:
        "Enter an email like you@example.com so the reminder can reach you.",
    });
    setErrors(found);
    if (Object.keys(found).length) return;
    setState("sending");
    setEmail(String(new FormData(form).get("recall")));
    await pause(700);
    setState("done");
  };

  return (
    <footer className="site-footer">
      <div className="wrap footer-top">
        <div className="footer-brand">
          <Link to="/" className="logo" aria-label={`${brand.name}, home`}>
            <Mark />
            <span>{brand.name.toLowerCase()}</span>
          </Link>
          <p>{brand.tagline}</p>
          <address>
            {brand.address.map((l) => (
              <span key={l}>{l}</span>
            ))}
            <a href={`tel:${brand.phone.replace(/\s/g, "")}`}>{brand.phone}</a>
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
          </address>
        </div>

        <div className="recall">
          <h2>Six months goes quickly.</h2>
          <p>
            Leave your email and we'll send one reminder when your next check-up
            is due. Nothing else.
          </p>
          {state === "done" ? (
            <p className="recall-done" role="status">
              Done — we'll write to {email} when it's time.
            </p>
          ) : (
            <form
              noValidate
              onSubmit={submit}
              onChange={onChange}
              className="recall-form"
              aria-busy={state === "sending"}
            >
              <Field
                label="Email for your recall reminder"
                name="recall"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                error={errors.recall}
              />
              <button
                className="btn btn-primary"
                disabled={state === "sending"}
              >
                {state === "sending" ? "Saving…" : "Remind me"}
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="wrap footer-cols">
        <nav aria-label="Treatments">
          <h2>Treatments</h2>
          <ul>
            {treatments.slice(0, 6).map((t) => (
              <li key={t.slug}>
                <Link to={`/treatments/${t.slug}`}>{t.name}</Link>
              </li>
            ))}
            <li>
              <Link to="/treatments">All treatments</Link>
            </li>
          </ul>
        </nav>
        <nav aria-label="Patients">
          <h2>Patients</h2>
          <ul>
            <li>
              <Link to="/new-patients">New patients</Link>
            </li>
            <li>
              <Link to="/prices">Prices & plans</Link>
            </li>
            <li>
              <Link to="/book">Book online</Link>
            </li>
            <li>
              <Link to="/treatments/emergency">Emergencies</Link>
            </li>
          </ul>
        </nav>
        <nav aria-label="Clinic">
          <h2>Clinic</h2>
          <ul>
            <li>
              <Link to="/dentists">Dentists</Link>
            </li>
            <li>
              <Link to="/about">About Enamel</Link>
            </li>
            <li>
              <Link to="/visit">Visit & hours</Link>
            </li>
            {brand.social.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2>Hours</h2>
          <dl className="hours-list">
            {[1, 2, 3, 4, 5, 6, 0].map((d) => (
              <div key={d}>
                <dt>{days[d].slice(0, 3)}</dt>
                <dd>{hoursLabel(hours[d])}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="wrap footer-base">
        <p>
          {brand.name} is a fictional brand — a{" "}
          <a href="https://koative.github.io/cento/">Cento</a> template by
          Koative.
        </p>
        <p>All names, prices and patient notes are demonstration content.</p>
      </div>
    </footer>
  );
}
