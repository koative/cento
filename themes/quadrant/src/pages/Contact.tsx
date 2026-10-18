import { useRef, useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { brand, capabilities, contactPage, offices } from "../content";
import { capabilityBySlug, personById, type Errors } from "../lib/format";
import { Field, useErrors } from "../components/Field";

type Sent = {
  ref: string;
  name: string;
  email: string;
  topic: string;
  partner?: string;
};

const messages: Record<
  string,
  (v: string, el: HTMLInputElement) => string | undefined
> = {
  name: (v) => (!v ? "Enter your name so we know who to reply to." : undefined),
  email: (v, el) =>
    !v
      ? "Enter your work email address."
      : !el.validity.valid
        ? "Check the email address — it needs an @ and a domain, like name@company.com."
        : undefined,
  company: (v) => (!v ? "Enter your company or organisation." : undefined),
  topic: (v) =>
    !v
      ? "Choose the area closest to your problem, or “Something else”."
      : undefined,
  size: (v) => (!v ? "Choose your company’s approximate size." : undefined),
  timeline: (v) => (!v ? "Choose when you would want to start." : undefined),
  message: (v) =>
    v.length < 60
      ? `Tell us a little more — at least 60 characters so the partner can prepare (${v.length} so far).`
      : undefined,
  consent: (_, el) =>
    !el.checked
      ? "Tick the box so we may keep your details to reply."
      : undefined,
};

export function Contact() {
  const { errors, setErrors, onChange } = useErrors();
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<Sent | null>(null);
  const status = useRef<HTMLDivElement>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const found: Errors = {};
    for (const [name, check] of Object.entries(messages)) {
      const el = form.elements.namedItem(name);
      const input = (
        el instanceof RadioNodeList ? el[0] : el
      ) as HTMLInputElement;
      const msg = check(String(data.get(name) ?? "").trim(), input);
      if (msg) found[name] = msg;
    }
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      const el = form.elements.namedItem(first);
      ((el instanceof RadioNodeList ? el[0] : el) as HTMLElement).focus();
      return;
    }
    setSending(true);
    const topic = String(data.get("topic"));
    const cap = capabilityBySlug(topic);
    // Nothing leaves the browser: a short pause stands in for the network round trip.
    window.setTimeout(() => {
      setSending(false);
      setSent({
        ref: `Q-26-${String(Math.floor(1000 + Math.random() * 9000))}`,
        name: String(data.get("name")).trim().split(" ")[0],
        email: String(data.get("email")).trim(),
        topic: cap?.name ?? "Something else",
        partner: cap
          ? personById(cap.lead)?.name
          : personById("margit-lindqvist")?.name,
      });
      requestAnimationFrame(() => status.current?.focus());
    }, 1100);
  };

  return (
    <>
      <header className="page-head wrap">
        <h1 className="display">{contactPage.title}</h1>
        <p className="lede">{contactPage.lede}</p>
      </header>

      <section className="wrap section-tight contact">
        <div className="contact-main">
          <div
            ref={status}
            tabIndex={-1}
            aria-live="polite"
            className="contact-status"
          >
            {sent && (
              <div className="sent">
                <Check aria-hidden="true" />
                <h2 className="h2">
                  Thank you, {sent.name}. Your note is with {sent.partner}.
                </h2>
                <p>
                  Reference <strong className="num">{sent.ref}</strong> ·{" "}
                  {sent.topic}. Expect a reply at <strong>{sent.email}</strong>{" "}
                  within two working days, usually with two or three times for a
                  first call.
                </p>
                <button
                  type="button"
                  className="btn btn-quiet"
                  onClick={() => setSent(null)}
                >
                  Write another enquiry
                </button>
              </div>
            )}
          </div>

          {!sent && (
            <form
              className="form"
              noValidate
              onSubmit={onSubmit}
              onChange={onChange}
              aria-describedby="form-note"
            >
              <div className="form-grid">
                <Field
                  label="Your name"
                  name="name"
                  error={errors.name}
                  autoComplete="name"
                  required
                />
                <Field
                  label="Work email"
                  name="email"
                  type="email"
                  error={errors.email}
                  autoComplete="email"
                  required
                />
                <Field
                  label="Company"
                  name="company"
                  error={errors.company}
                  autoComplete="organization"
                  required
                />
                <Field
                  label="Your role (optional)"
                  name="role"
                  autoComplete="organization-title"
                />
              </div>

              <Field
                label="What is the problem closest to?"
                name="topic"
                error={errors.topic}
              >
                <select required defaultValue="">
                  <option value="" disabled>
                    Choose an area
                  </option>
                  {capabilities.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                  <option value="other">Something else</option>
                </select>
              </Field>

              <fieldset
                className="field choice"
                data-invalid={errors.size ? "" : undefined}
                aria-describedby={errors.size ? "f-size-err" : undefined}
              >
                <legend>Company size</legend>
                <div className="choice-row">
                  {contactPage.sizes.map((s) => (
                    <label key={s}>
                      <input type="radio" name="size" value={s} required />
                      <span>{s}</span>
                    </label>
                  ))}
                </div>
                {errors.size && (
                  <p className="field-error" id="f-size-err">
                    {errors.size}
                  </p>
                )}
              </fieldset>

              <Field
                label="When would you want to start?"
                name="timeline"
                error={errors.timeline}
              >
                <select required defaultValue="">
                  <option value="" disabled>
                    Choose a timeframe
                  </option>
                  {contactPage.timelines.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </Field>

              <Field
                label="What is happening?"
                name="message"
                hint="What you are seeing, what you have tried, and what a good result would look like."
                error={errors.message}
              >
                <textarea rows={7} required minLength={60} maxLength={3000} />
              </Field>

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
                      errors.consent ? "f-consent-err" : undefined
                    }
                  />
                  <span>
                    Quadrant may keep these details for twelve months to reply
                    to this enquiry.
                  </span>
                </label>
                {errors.consent && (
                  <p className="field-error" id="f-consent-err">
                    {errors.consent}
                  </p>
                )}
              </div>

              <div className="form-submit">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={sending}
                  aria-busy={sending}
                >
                  {sending ? "Sending to a partner…" : "Send to a partner"}
                </button>
                <p id="form-note" className="muted">
                  This is a demo: nothing is sent anywhere, and your note stays
                  in this browser tab.
                </p>
              </div>
            </form>
          )}
        </div>

        <aside className="contact-side" aria-label="Other ways to reach us">
          <h2 className="h4">Offices</h2>
          <ul className="contact-offices">
            {offices.map((o) => (
              <li key={o.city}>
                <p className="office-city">{o.city}</p>
                <address>
                  {o.lines.map((l) => (
                    <span key={l}>{l}</span>
                  ))}
                  <a href={o.phoneHref} className="num">
                    {o.phone}
                  </a>
                </address>
              </li>
            ))}
          </ul>
          <h2 className="h4">Not a client enquiry?</h2>
          <ul className="contact-other">
            {contactPage.other.map((o) => (
              <li key={o.label}>
                <p className="office-city">{o.label}</p>
                <p className="muted">{o.text}</p>
                <a href={`mailto:${o.email}`}>{o.email}</a>
              </li>
            ))}
            <li>
              <p className="office-city">Switchboard</p>
              <a href={brand.phoneHref} className="num">
                {brand.phone}
              </a>
            </li>
          </ul>
        </aside>
      </section>
    </>
  );
}
