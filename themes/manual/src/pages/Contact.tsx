import { useEffect, useRef, useState, type FormEvent } from "react";
import { CircleCheck, Route, X } from "lucide-react";
import { Link } from "../router";
import { brand, contact } from "../content";
import { codeOf, search } from "../lib/manual";
import { active } from "../lib/status";
import {
  getHandoff,
  pause,
  phoneStatus,
  setHandoff,
  validate,
  type Handoff,
} from "../lib/forms";
import { Field, useErrors } from "../components/Field";

const messages = {
  name: "Add your name so we know who to ask for.",
  email: "Enter the email you use for Counter, like you@yourshop.com.",
  shop: "Shop IDs look like CTR-104729: the letters CTR, a dash and six digits. Leave it empty if you can't find it.",
  topic:
    "Choose the topic closest to your problem so the right specialist picks it up.",
  urgency: "Tell us how urgent this is so we know how fast to respond.",
  subject:
    "Add a short subject of at least 8 characters, like “Reader won't pair with new iPad”.",
  details:
    "Describe what happened in at least 30 characters: what you did, what you expected, what you saw.",
};

type Sent = { ticket: string; email: string; urgency: string; phone: string };

export function Contact() {
  const [handoff, setLocalHandoff] = useState<Handoff | null>(getHandoff);
  const { errors, setErrors, onChange } = useErrors();
  const [busy, setBusy] = useState(false);
  const [urgency, setUrgency] = useState("");
  const [subject, setSubject] = useState("");
  const [sent, setSent] = useState<Sent | null>(null);
  const done = useRef<HTMLHeadingElement>(null);
  const phone = phoneStatus();
  const suggestions =
    subject.trim().length > 2 ? search(subject).slice(0, 3) : [];

  useEffect(() => {
    if (sent) done.current?.focus();
  }, [sent]);

  const dropHandoff = () => {
    setHandoff(null);
    setLocalHandoff(null);
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const extra: Record<string, string> = {};
    if (data.get("urgency") === "down" && !String(data.get("phone")).trim()) {
      extra.phone =
        "Add a phone number so we can call you back within 15 minutes.";
    }
    const file = data.get("screenshot");
    if (file instanceof File && file.size > 10 * 1024 * 1024) {
      extra.screenshot =
        "That image is over 10 MB. Crop it or take the screenshot again at a smaller size.";
    }
    const found = validate(form, messages, extra);
    setErrors(found);
    if (Object.keys(found).length) return;
    setBusy(true);
    await pause(1100);
    setBusy(false);
    setSent({
      ticket: `CM-${String(48213 + (Date.now() % 900)).padStart(5, "0")}`,
      email: String(data.get("email")),
      urgency: String(data.get("urgency")),
      phone: String(data.get("phone") ?? ""),
    });
    dropHandoff();
  };

  if (sent) {
    const level = contact.urgency.find((u) => u.value === sent.urgency);
    return (
      <div className="wrap narrow-wide">
        <section className="sent" aria-live="polite">
          <CircleCheck aria-hidden="true" className="sent-icon" />
          <h1 ref={done} tabIndex={-1}>
            Ticket {sent.ticket} is open
          </h1>
          <p className="lead">
            A copy is on its way to <strong>{sent.email}</strong>. {level?.hint}
            .
          </p>
          <dl className="sent-facts">
            <div>
              <dt>Reference</dt>
              <dd className="code">{sent.ticket}</dd>
            </div>
            <div>
              <dt>Priority</dt>
              <dd>{level?.label}</dd>
            </div>
            <div>
              <dt>We'll reach you by</dt>
              <dd>
                {sent.urgency === "down"
                  ? `Phone, at ${sent.phone}`
                  : `Email, from ${brand.email}`}
              </dd>
            </div>
          </dl>
          <p>
            Reply to that email to add anything you forgot; it lands on the same
            ticket. Please don't open a second one, it moves you to the back of
            the queue.
          </p>
          <p className="sent-actions">
            <Link to="/" className="btn btn-ink">
              Back to the manual
            </Link>
            <button
              type="button"
              className="btn btn-quiet"
              onClick={() => setSent(null)}
            >
              Open another ticket
            </button>
          </p>
        </section>
      </div>
    );
  }

  return (
    <div className="wrap contact-layout">
      <header className="page-head contact-head">
        <h1>{contact.title}</h1>
        <p className="lead">{contact.lead}</p>
      </header>

      <form
        className="ticket"
        noValidate
        onSubmit={submit}
        onChange={onChange}
        aria-busy={busy}
      >
        {handoff && (
          <section className="handoff" aria-labelledby="handoff-title">
            <div className="handoff-head">
              <Route aria-hidden="true" />
              <h2 id="handoff-title">
                From the troubleshooter: {handoff.flow}
              </h2>
              <button
                type="button"
                className="icon-btn"
                onClick={dropHandoff}
                aria-label="Remove troubleshooter answers from this ticket"
              >
                <X aria-hidden="true" />
              </button>
            </div>
            <ol>
              {handoff.trail.map((t) => (
                <li key={t.q}>
                  {t.q} <strong>{t.a}</strong>
                </li>
              ))}
            </ol>
            <p className="muted">
              These {handoff.trail.length} answers are attached to your ticket.
              No need to repeat them below.
            </p>
            <input
              type="hidden"
              name="trail"
              value={handoff.trail.map((t) => `${t.q} ${t.a}`).join("\n")}
            />
          </section>
        )}

        <fieldset className="group">
          <legend>About you</legend>
          <div className="row-2">
            <Field
              label="Your name"
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
              placeholder="you@yourshop.com"
              error={errors.email}
            />
          </div>
          <Field
            label="Shop ID (optional)"
            name="shop"
            hint="Under Settings › Account in the register app."
            pattern="CTR-[0-9]{6}"
            placeholder="CTR-104729"
            autoComplete="off"
            className="mono-input"
            error={errors.shop}
          />
        </fieldset>

        <fieldset className="group">
          <legend>The problem</legend>
          <Field label="Topic" name="topic" error={errors.topic}>
            <select required defaultValue={handoff?.topic ?? ""}>
              <option value="" disabled>
                Choose a topic
              </option>
              {contact.topics.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </Field>

          <div className="field" data-invalid={errors.urgency ? "" : undefined}>
            <fieldset
              className="radios"
              aria-describedby={errors.urgency ? "f-urgency-err" : undefined}
            >
              <legend>How urgent is it?</legend>
              {contact.urgency.map((u) => (
                <label key={u.value} className="choice choice-card">
                  <input
                    type="radio"
                    name="urgency"
                    value={u.value}
                    required
                    onChange={() => setUrgency(u.value)}
                  />
                  <span>
                    <strong>{u.label}</strong>
                    <span className="muted">{u.hint}</span>
                  </span>
                </label>
              ))}
            </fieldset>
            {errors.urgency && (
              <p className="field-error" id="f-urgency-err">
                {errors.urgency}
              </p>
            )}
          </div>

          {urgency === "down" && (
            <Field
              label="Callback number"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="+1 555 …"
              hint="We call within 15 minutes, 7 am – 11 pm ET."
              error={errors.phone}
            />
          )}

          <Field
            label="Subject"
            name="subject"
            required
            minLength={8}
            maxLength={120}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            error={errors.subject}
          />

          <div className="deflect" aria-live="polite">
            {suggestions.length > 0 && (
              <>
                <p className="deflect-title">
                  These articles might already answer it:
                </p>
                <ul>
                  {suggestions.map((r) => (
                    <li key={r.article.slug}>
                      <Link to={`/articles/${r.article.slug}`}>
                        <span className="code">{codeOf(r.article)}</span>{" "}
                        {r.article.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <Field
            label="What happened?"
            name="details"
            hint="What you did, what you expected, and what you saw instead. Error messages word for word help most."
            error={errors.details}
          >
            <textarea required minLength={30} rows={6} />
          </Field>

          <div className="row-2">
            <Field label="Device (optional)" name="device">
              <select defaultValue="">
                <option value="">Not sure</option>
                <option>iPad</option>
                <option>iPhone</option>
                <option>Android tablet</option>
                <option>Android phone</option>
                <option>Web dashboard</option>
              </select>
            </Field>
            <Field
              label="Screenshot (optional)"
              name="screenshot"
              type="file"
              accept="image/*"
              hint="PNG or JPG, up to 10 MB."
              error={errors.screenshot}
            />
          </div>
        </fieldset>

        <div className="submit-row">
          <button type="submit" className="btn btn-primary" disabled={busy}>
            {busy ? "Opening ticket…" : "Open a ticket"}
          </button>
          <p className="muted">
            This is a demo: nothing is sent and no ticket is created.
          </p>
        </div>
      </form>

      <aside className="contact-aside">
        {active.map((i) => (
          <Link
            key={i.id}
            to={`/status/${i.id}`}
            className="notice"
            data-impact={i.impact}
          >
            <strong>Known issue: {i.title}</strong>
            <span>We're on it. No need to open a ticket for this one.</span>
          </Link>
        ))}
        <h2>Other ways to reach us</h2>
        <dl className="channels channels-stacked">
          {contact.channels.map((c) => (
            <div key={c.name}>
              <dt>{c.name}</dt>
              <dd>{c.detail}</dd>
              <dd className="muted">{c.hours}</dd>
            </div>
          ))}
        </dl>
        <p className="phone-state" data-open={phone.open ? "" : undefined}>
          <span className="dot" aria-hidden="true" />
          {phone.label}
        </p>
        <p>
          <a href={brand.phoneHref}>{brand.phone}</a>
          <br />
          <a href={`mailto:${brand.email}`}>{brand.email}</a>
        </p>
        <p className="muted">
          Before you write, the <Link to="/troubleshoot">troubleshooter</Link>{" "}
          solves most reader and payout problems in under two minutes.
        </p>
      </aside>
    </div>
  );
}
