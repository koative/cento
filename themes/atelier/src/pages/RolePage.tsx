import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { Link } from "../router";
import { brand, roles, type Role } from "../content";
import { pause, validate } from "../lib";
import { Field, useErrors } from "../components/Field";

const messages = {
  name: "Tell us your name so we know who we're writing to.",
  email: "Enter an email like you@studio.com; it's where we'll reply.",
  portfolio: "Add a full link to your portfolio, starting with https://.",
  location: "Tell us where you're based, for example “Philadelphia, PA”.",
  start: "Pick roughly when you could start.",
  answer: "Give us at least 80 characters here. A short paragraph is plenty.",
  consent: "Tick the box so we're allowed to keep your application on file.",
};

export function RolePage({ role }: { role: Role }) {
  const { errors, setErrors, onChange } = useErrors();
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const success = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (status === "sent") success.current?.focus();
  }, [status]);
  const [sentTo, setSentTo] = useState("");
  const others = roles.filter((r) => r !== role).slice(0, 3);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, messages);
    setErrors(found);
    if (Object.keys(found).length) return;
    setStatus("sending");
    await pause();
    setSentTo(String(new FormData(form).get("email")));
    setStatus("sent");
  };

  return (
    <>
      <section className="page-head wrap role-head">
        <Link to="/careers" className="back-link">
          <ArrowLeft aria-hidden="true" /> All roles
        </Link>
        <h1>{role.title}</h1>
        <p className="lede">{role.summary}</p>
        <dl className="role-facts">
          <div>
            <dt>Team</dt>
            <dd>{role.team}</dd>
          </div>
          <div>
            <dt>Type</dt>
            <dd>{role.type}</dd>
          </div>
          <div>
            <dt>Where</dt>
            <dd>{role.location}</dd>
          </div>
          <div>
            <dt>Salary</dt>
            <dd className="tabular">{role.salary}</dd>
          </div>
          <div>
            <dt>Posted</dt>
            <dd>{role.posted}</dd>
          </div>
        </dl>
      </section>

      <div className="wrap role-grid">
        <div className="role-body">
          <p className="role-about">{role.about}</p>
          <h2>What you'll do</h2>
          <ul className="ticks">
            {role.doing.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
          <h2>What you'll bring</h2>
          <ul className="ticks">
            {role.bringing.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
          <h2>Good to have, never required</h2>
          <ul className="ticks">
            {role.bonus.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>

        <section className="apply" aria-labelledby="apply-title">
          <h2 id="apply-title">Apply for this role</h2>
          <div aria-live="polite">
            {status === "sent" && (
              <div className="success" ref={success} tabIndex={-1}>
                <Check aria-hidden="true" className="success-icon" />
                <h3>Application received.</h3>
                <p>
                  Thanks. A person from the {role.team.toLowerCase()} team will
                  read it within ten working days and reply to {sentTo},
                  whatever the answer.
                </p>
                <Link to="/careers" className="text-link">
                  Back to all roles
                </Link>
              </div>
            )}
          </div>
          {status !== "sent" && (
            <form
              noValidate
              onSubmit={submit}
              onChange={onChange}
              className="form"
            >
              <Field
                label="Full name"
                name="name"
                required
                autoComplete="name"
                error={errors.name}
              />
              <Field
                label="Email"
                name="email"
                type="email"
                required
                autoComplete="email"
                error={errors.email}
              />
              <Field
                label="Portfolio link"
                name="portfolio"
                type="url"
                required
                placeholder="https://"
                hint="A website, PDF link or reel. Password is fine; put it in your answer below."
                error={errors.portfolio}
              />
              <Field
                label="Where are you based?"
                name="location"
                required
                autoComplete="address-level2"
                error={errors.location}
              />
              <Field
                label="When could you start?"
                name="start"
                error={errors.start}
              >
                <select required defaultValue="">
                  <option value="" disabled>
                    Choose one
                  </option>
                  <option>Right away</option>
                  <option>Within a month</option>
                  <option>In one to three months</option>
                  <option>Later than that</option>
                </select>
              </Field>
              <Field label={role.question} name="answer" error={errors.answer}>
                <textarea required minLength={80} rows={6} />
              </Field>
              <Field
                label="Salary expectation"
                name="salary"
                optional
                hint={`The band for this role is ${role.salary}.`}
              />
              <div
                className="field check"
                data-invalid={errors.consent ? "" : undefined}
              >
                <label>
                  <input
                    type="checkbox"
                    name="consent"
                    required
                    aria-invalid={errors.consent ? true : undefined}
                    aria-describedby={
                      errors.consent ? "consent-err" : undefined
                    }
                  />
                  Keep my application on file for 12 months.
                </label>
                {errors.consent && (
                  <p className="field-error" id="consent-err">
                    {errors.consent}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="btn btn-ink btn-big"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending…" : "Send application"}
              </button>
              <p className="fine">
                This is a demo: nothing is sent or stored. Questions go to{" "}
                {brand.jobsEmail}.
              </p>
            </form>
          )}
        </section>
      </div>

      <section className="wrap section" aria-labelledby="other-roles">
        <h2 id="other-roles">Other open roles</h2>
        <ul className="role-list">
          {others.map((r) => (
            <li key={r.id}>
              <Link to={`/careers/${r.id}`}>
                <span className="role-title">{r.title}</span>
                <span className="role-meta">
                  {r.type} · {r.location}
                </span>
                <span className="role-salary tabular">{r.salary}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
