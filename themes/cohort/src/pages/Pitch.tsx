import { useEffect, useRef, useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { Link } from "../router";
import { brand, domains, partnerBySlug, partners } from "../content";
import { Field, useErrors, validate } from "../components/Field";
import { compact } from "../lib/format";

const messages: Record<string, (el: HTMLInputElement) => string> = {
  name: () => "Tell us who you are, your full name is fine.",
  email: (el) =>
    el.validity.valueMissing
      ? "We need an email address to reply to."
      : "Enter an email like name@company.com.",
  company: () => "Add your company name, even if it is a working title.",
  website: () =>
    "Enter a full address starting with https://, or leave it blank.",
  domain: () => "Pick the part of the economy you are building for.",
  stage: () => "Choose the round you are raising.",
  raise: (el) =>
    el.validity.valueMissing
      ? "Tell us roughly how much you are raising, in US dollars."
      : "Enter an amount between $100,000 and $50,000,000.",
  line: (el) =>
    el.validity.valueMissing
      ? "Describe the company in one line."
      : "Give us a little more: at least 20 characters.",
  deck: (el) =>
    el.validity.valueMissing
      ? "Paste a link to your deck."
      : "That doesn't look like a link. Start it with https://.",
  nda: () => "Please confirm you have read this before sending.",
};

/** Ten working days from now, the reply we promise to every pitch. */
function replyBy() {
  const d = new Date();
  for (let left = 10; left > 0;) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() % 6 !== 0) left--;
  }
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

type Sent = {
  ref: string;
  company: string;
  email: string;
  partner: string;
  raise: number;
  reply: string;
};

export function Pitch() {
  const preset =
    new URLSearchParams(window.location.hash.split("?")[1]).get("partner") ??
    "";
  const { errors, setErrors, onChange } = useErrors();
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState<Sent | null>(null);
  const [line, setLine] = useState("");
  const done = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (sent) done.current?.focus();
  }, [sent]);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, messages);
    setErrors(found);
    if (Object.keys(found).length) return;
    const data = new FormData(form);
    setBusy(true);
    window.setTimeout(() => {
      setBusy(false);
      setSent({
        ref: `COH-${new Date().getFullYear()}-${String(Math.floor(1000 + Math.random() * 9000))}`,
        company: String(data.get("company")),
        email: String(data.get("email")),
        partner:
          partnerBySlug(String(data.get("partner")))?.name ?? "Sam Whitlock",
        raise: Number(data.get("raise")),
        reply: replyBy(),
      });
    }, 1100);
  };

  return (
    <div className="page wrap pitch">
      <header className="page-head">
        <h1>Pitch Cohort</h1>
        <p className="lede">
          Send us the deck and a few facts. A partner reads every pitch, and you
          will have an answer, with reasons, within ten working days.
        </p>
      </header>

      <div className="pitch-grid">
        <aside className="pitch-aside">
          <h2>What helps</h2>
          <ul className="ticks">
            <li>One customer who has paid, or a pilot with a price attached</li>
            <li>
              Someone on the team who has done the job your product serves
            </li>
            <li>A deck under fifteen slides; we will ask for the rest</li>
          </ul>
          <h2>What happens next</h2>
          <ol className="steps">
            <li>Sam logs your pitch and routes it to the closest partner.</li>
            <li>If it fits, you will get a call within three working days.</li>
            <li>If it doesn't, you will get our reasons in writing.</li>
          </ol>
          <p className="fine">
            Prefer email?{" "}
            <a href={`mailto:${brand.pitchEmail}`}>{brand.pitchEmail}</a>. Read{" "}
            <Link to="/founders">our terms</Link> first if you like.
          </p>
        </aside>

        <div className="pitch-main">
          <div aria-live="polite">
            {sent && (
              <div className="sent">
                <Check aria-hidden="true" className="sent-icon" />
                <h2 ref={done} tabIndex={-1}>
                  Received. Thank you, {sent.company}.
                </h2>
                <p>
                  Your reference is <strong className="num">{sent.ref}</strong>.{" "}
                  {sent.partner} will read the pitch for your{" "}
                  {compact(sent.raise)} round, and you will hear from us at{" "}
                  {sent.email} by <strong>{sent.reply}</strong> at the latest.
                </p>
                <p className="fine">
                  This is a demo: nothing was sent and no data left your
                  browser.
                </p>
                <div className="actions">
                  <Link to="/writing" className="btn btn-line">
                    Read while you wait
                  </Link>
                  <button
                    type="button"
                    className="btn btn-ink"
                    onClick={() => setSent(null)}
                  >
                    Send another pitch
                  </button>
                </div>
              </div>
            )}
          </div>

          {!sent && (
            <form
              className="form"
              noValidate
              onSubmit={submit}
              onChange={onChange}
              aria-busy={busy}
            >
              <fieldset className="form-group">
                <legend>About you</legend>
                <div className="form-row">
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
                    error={errors.email}
                  />
                </div>
                <div className="form-row">
                  <Field
                    label="Company"
                    name="company"
                    required
                    autoComplete="organization"
                    error={errors.company}
                  />
                  <Field
                    label="Website (optional)"
                    name="website"
                    type="url"
                    placeholder="https://"
                    autoComplete="url"
                    error={errors.website}
                  />
                </div>
              </fieldset>

              <fieldset className="form-group">
                <legend>The company</legend>
                <div
                  className="field"
                  data-invalid={errors.domain ? "" : undefined}
                >
                  <fieldset
                    className="radio-cards"
                    aria-describedby={
                      errors.domain ? "f-domain-err" : undefined
                    }
                    aria-invalid={errors.domain ? true : undefined}
                  >
                    <legend>Which part of the economy?</legend>
                    {domains.map((d) => (
                      <label key={d.id}>
                        <input
                          type="radio"
                          name="domain"
                          value={d.id}
                          required
                        />
                        <span>
                          {d.name}
                          <small>{d.line}</small>
                        </span>
                      </label>
                    ))}
                    <label>
                      <input
                        type="radio"
                        name="domain"
                        value="other"
                        required
                      />
                      <span>
                        Somewhere else
                        <small>
                          Tell us why it belongs here in your one line
                        </small>
                      </span>
                    </label>
                  </fieldset>
                  {errors.domain && (
                    <p className="field-error" id="f-domain-err">
                      {errors.domain}
                    </p>
                  )}
                </div>
                <div className="form-row">
                  <Field label="Round" name="stage" error={errors.stage}>
                    <select required defaultValue="">
                      <option value="" disabled>
                        Choose a round
                      </option>
                      <option>Pre-seed</option>
                      <option>Seed</option>
                      <option>Series A</option>
                      <option>Series B or later</option>
                    </select>
                  </Field>
                  <Field
                    label="Raising (USD)"
                    name="raise"
                    type="number"
                    inputMode="numeric"
                    min={100000}
                    max={50000000}
                    step={1000}
                    placeholder="3000000"
                    required
                    error={errors.raise}
                  />
                </div>
                <Field
                  label="What you do, in one line"
                  name="line"
                  hint={`${line.length} of 160 characters. Say it the way you would to a customer.`}
                  error={errors.line}
                >
                  <textarea
                    rows={3}
                    required
                    minLength={20}
                    maxLength={160}
                    value={line}
                    onChange={(e) => setLine(e.target.value)}
                  />
                </Field>
                <Field
                  label="Who has paid you so far? (optional)"
                  name="traction"
                  hint="Customer type, contract size, how long it took to sign."
                >
                  <textarea rows={3} />
                </Field>
              </fieldset>

              <fieldset className="form-group">
                <legend>The pitch</legend>
                <Field
                  label="Deck link"
                  name="deck"
                  type="url"
                  required
                  placeholder="https://"
                  hint="DocSend, Google Drive, Dropbox or your own site. Please allow access without a sign-in."
                  error={errors.deck}
                />
                <Field label="Partner (optional)" name="partner">
                  <select defaultValue={preset}>
                    <option value="">Whoever fits best</option>
                    {partners.map((p) => (
                      <option key={p.slug} value={p.slug}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </Field>
                <div
                  className="field check"
                  data-invalid={errors.nda ? "" : undefined}
                >
                  <label>
                    <input
                      type="checkbox"
                      name="nda"
                      required
                      aria-invalid={errors.nda ? true : undefined}
                      aria-describedby={errors.nda ? "f-nda-err" : undefined}
                    />
                    <span>
                      I understand Cohort does not sign NDAs at first contact
                      and will not share my deck outside the partnership.
                    </span>
                  </label>
                  {errors.nda && (
                    <p className="field-error" id="f-nda-err">
                      {errors.nda}
                    </p>
                  )}
                </div>
              </fieldset>

              {Object.keys(errors).length > 0 && (
                <p className="form-summary" role="alert">
                  {Object.keys(errors).length === 1
                    ? "One thing needs fixing before we can read your pitch."
                    : `${Object.keys(errors).length} things need fixing before we can read your pitch.`}
                </p>
              )}
              <div className="form-submit">
                <button type="submit" className="btn btn-ink" disabled={busy}>
                  {busy ? "Sending…" : "Send the pitch"}
                </button>
                <p className="fine">Demo form: nothing is sent anywhere.</p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
