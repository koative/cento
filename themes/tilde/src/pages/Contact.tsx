import { useRef, useState, type FormEvent } from "react";
import { brand, calendar, contact } from "../content";
import { Field, validate, type Errors } from "../components/Field";
import { Section } from "../components/Blocks";
import { formatMonth } from "../lib/format";

type Sent = { name: string; email: string; kind: string; start: string };

const messages = {
  name: { missing: "Add your name so I know who to reply to." },
  email: {
    missing: "Add an email address for the reply.",
    invalid: "That email looks incomplete. It needs a name, an @ and a domain.",
  },
  kind: { missing: "Choose what kind of work this is." },
  budget: { missing: "Pick a budget range, or choose “Not sure yet”." },
  message: {
    missing: "Describe the problem in a few sentences.",
    invalid:
      "A little more detail, please: at least 40 characters about what is slow, fragile or missing.",
  },
};

export function Contact() {
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<Sent | null>(null);
  const status = useRef<HTMLDivElement>(null);
  const open = calendar.filter((m) => m.state !== "booked");

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, messages);
    setErrors(found);
    if (Object.keys(found).length) return;
    const data = new FormData(form);
    setSending(true);
    // Nothing leaves the browser: a short pause stands in for the network.
    window.setTimeout(() => {
      setSending(false);
      setSent({
        name: String(data.get("name")),
        email: String(data.get("email")),
        kind: String(data.get("kind")),
        start: String(data.get("start")),
      });
      form.reset();
      requestAnimationFrame(() => status.current?.focus());
    }, 900);
  }

  return (
    <>
      <header className="page-head wrap">
        <h1>Start a project</h1>
        <p className="lead">{contact.lead}</p>
      </header>

      <div className="wrap contact-grid">
        <div>
          <div
            className="form-status-box"
            ref={status}
            tabIndex={-1}
            aria-live="polite"
          >
            {sent && (
              <div className="sent">
                <h2>Message queued, {sent.name.split(" ")[0]}.</h2>
                <p>
                  I will reply to <strong>{sent.email}</strong> within two
                  working days about your {sent.kind.toLowerCase()}
                  {sent.start ? `, starting ${sent.start}` : ""}.
                </p>
                <pre className="sent-log">{`$ mail --queue
1 message queued for ${brand.email}
delivery: local demo, nothing was sent`}</pre>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setSent(null)}
                >
                  Write another message
                </button>
              </div>
            )}
          </div>

          {!sent && (
            <form
              className="contact-form"
              noValidate
              onSubmit={submit}
              aria-busy={sending}
            >
              <div className="row-2">
                <Field label="Your name" name="name" error={errors.name}>
                  {(a) => (
                    <input {...a} name="name" required autoComplete="name" />
                  )}
                </Field>
                <Field label="Email" name="email" error={errors.email}>
                  {(a) => (
                    <input
                      {...a}
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                    />
                  )}
                </Field>
              </div>
              <div className="row-2">
                <Field label="Company (optional)" name="company">
                  {(a) => (
                    <input {...a} name="company" autoComplete="organization" />
                  )}
                </Field>
                <Field
                  label="What kind of work?"
                  name="kind"
                  error={errors.kind}
                >
                  {(a) => (
                    <select {...a} name="kind" required defaultValue="">
                      <option value="" disabled>
                        Choose one
                      </option>
                      {contact.kinds.map((k) => (
                        <option key={k}>{k}</option>
                      ))}
                    </select>
                  )}
                </Field>
              </div>
              <Field
                label="Ideal start"
                name="start"
                hint="Booked months are not listed."
              >
                {(a) => (
                  <select {...a} name="start" defaultValue="">
                    <option value="">Flexible</option>
                    {open.map((m) => (
                      <option key={m.month} value={formatMonth(m.month)}>
                        {formatMonth(m.month)}
                        {m.state === "partial"
                          ? ` (${m.note.toLowerCase()})`
                          : ""}
                      </option>
                    ))}
                  </select>
                )}
              </Field>
              <fieldset
                className="field"
                aria-describedby={errors.budget ? "f-budget-error" : undefined}
              >
                <legend>Budget</legend>
                <div className="chips">
                  {contact.budgets.map((b) => (
                    <label key={b} className="chip">
                      <input
                        type="radio"
                        name="budget"
                        value={b}
                        required
                        aria-invalid={errors.budget ? true : undefined}
                      />
                      <span>{b}</span>
                    </label>
                  ))}
                </div>
                {errors.budget && (
                  <p className="field-error" id="f-budget-error">
                    {errors.budget}
                  </p>
                )}
              </fieldset>
              <Field
                label="The problem"
                name="message"
                error={errors.message}
                hint="What is slow, fragile or missing? Numbers help: latency, row counts, team size."
              >
                {(a) => (
                  <textarea
                    {...a}
                    name="message"
                    required
                    minLength={40}
                    rows={7}
                  />
                )}
              </Field>
              <div className="form-foot">
                <button className="btn" type="submit" disabled={sending}>
                  {sending ? "Sending…" : "Send message"}
                </button>
                <p className="muted">
                  This form is a demo: nothing is sent anywhere.
                </p>
              </div>
            </form>
          )}
        </div>

        <aside className="contact-side" aria-label="Working terms">
          <h2>Terms</h2>
          <dl className="kv">
            {contact.terms.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <h2>Availability</h2>
          <ol
            className="calendar calendar-compact"
            aria-label="Availability by month"
          >
            {calendar.map((m) => (
              <li key={m.month} data-state={m.state}>
                <span className="cal-month">{formatMonth(m.month)}</span>
                <span className="cal-note">{m.note}</span>
              </li>
            ))}
          </ol>
          <h2>Direct</h2>
          <p>
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
            <br />
            <a href={brand.phoneHref}>{brand.phone}</a>
            <br />
            <span className="muted">{brand.hours}</span>
          </p>
        </aside>
      </div>

      <Section title="Questions">
        <div className="faq">
          {contact.faq.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </Section>
    </>
  );
}
