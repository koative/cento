import { useRef, useState, type FormEvent } from "react";
import { ArrowRight, Check, Loader2, ShieldAlert } from "lucide-react";
import { Link } from "../router";
import { areas, brand, home, people } from "../content";
import {
  areaBySlug,
  daysBetween,
  fromISO,
  hashQuery,
  longDate,
  personBySlug,
  tel,
  today,
} from "../lib/util";
import {
  Field,
  revalidate,
  validate,
  type Errors,
  type Messages,
} from "../components/Field";
import { PageHead } from "../components/PageHead";

const messages: Messages = {
  name: { missing: "Enter your full name so we can run a conflict check." },
  organization: {
    missing: "Enter the organization’s legal name, as it appears on contracts.",
  },
  email: {
    missing: "Enter an email address so we can reply.",
    invalid:
      "Check the email address: it needs an @ and a domain, like name@example.com.",
  },
  phone: {
    missing: "Add a phone number, or choose email as the way to reach you.",
    invalid:
      "Use digits, spaces, brackets, dashes or a leading +, at least 7 characters.",
  },
  area: { missing: "Choose the area closest to your matter, or “Not sure”." },
  parties: {
    missing:
      "List the other people or companies involved, or write “none”. We need this for the conflict check.",
  },
  keyDate: {
    missing: "",
    invalid: "Enter a real date, or leave the field empty.",
  },
  summary: {
    missing: "Tell us briefly what has happened.",
    invalid: "Add a little more detail: at least 40 characters.",
  },
  consent: {
    missing: "Confirm you have read the note about confidential information.",
  },
};

type Sent = {
  ref: string;
  name: string;
  email: string;
  area: string;
  lawyer: string;
  keyDate: string;
  contact: string;
};

export function Enquiry() {
  const [initial] = useState(() => {
    const q = hashQuery();
    return {
      area: areaBySlug(q.get("area") ?? "") ? q.get("area")! : "",
      lawyer: personBySlug(q.get("lawyer") ?? "") ? q.get("lawyer")! : "",
      date: /^\d{4}-\d{2}-\d{2}$/.test(q.get("date") ?? "")
        ? q.get("date")!
        : "",
    };
  });
  const [kind, setKind] = useState<"individual" | "organization">("individual");
  const [contact, setContact] = useState<"email" | "phone">("email");
  const [keyDate, setKeyDate] = useState(initial.date);
  const [summary, setSummary] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState<Sent | null>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  const daysToKey = keyDate ? daysBetween(today(), fromISO(keyDate)) : null;

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    const form = e.currentTarget;
    const next = validate(form, messages);
    setErrors(next);
    if (Object.keys(next).length) return;

    const data = new FormData(form);
    setBusy(true);
    // ponytail: simulated round-trip; swap for a real POST to your intake system.
    window.setTimeout(() => {
      setBusy(false);
      setSent({
        ref: `CP-${new Date().getFullYear() % 100}-${String(Math.floor(1000 + Math.random() * 9000))}`,
        name: String(data.get("name")),
        email: String(data.get("email")),
        area: areaBySlug(String(data.get("area")))?.name ?? "Not sure yet",
        lawyer: personBySlug(String(data.get("lawyer")))?.name ?? "",
        keyDate: String(data.get("keyDate") ?? ""),
        contact:
          data.get("contact") === "phone"
            ? `by phone on ${data.get("phone")}`
            : "by email",
      });
      requestAnimationFrame(() => statusRef.current?.focus());
    }, 1100);
  }

  return (
    <>
      <PageHead
        title="Make an enquiry"
        lede="Tell us who is involved and what has happened. A lawyer reads every enquiry, and we reply within one business day."
      >
        {(initial.area || initial.lawyer) && !sent && (
          <p className="prefill-note">
            We have started this for you:{" "}
            {[
              areaBySlug(initial.area)?.name,
              personBySlug(initial.lawyer)?.name,
              initial.date && `key date ${longDate(initial.date)}`,
            ]
              .filter(Boolean)
              .join(", ")}
            . Check the details below before you send.
          </p>
        )}
      </PageHead>

      <section className="wrap enquiry">
        <div className="enquiry-main">
          <div
            ref={statusRef}
            tabIndex={-1}
            role="status"
            aria-live="polite"
            className="enquiry-status"
          >
            {sent && (
              <div className="receipt">
                <p className="receipt-ref">
                  <Check size={18} aria-hidden="true" /> Reference {sent.ref}
                </p>
                <h2>
                  Thank you, {sent.name.split(" ")[0]}. Your enquiry is with us.
                </h2>
                <dl className="memo-block">
                  <div>
                    <dt>Re</dt>
                    <dd>{sent.area}</dd>
                  </div>
                  {sent.lawyer && (
                    <div>
                      <dt>For</dt>
                      <dd>{sent.lawyer}</dd>
                    </div>
                  )}
                  {sent.keyDate && (
                    <div>
                      <dt>Key date</dt>
                      <dd>{longDate(sent.keyDate)}</dd>
                    </div>
                  )}
                  <div>
                    <dt>Reply</dt>
                    <dd>
                      {sent.contact}, by the end of the next business day. A
                      copy goes to {sent.email}.
                    </dd>
                  </div>
                </dl>
                <p>
                  We will run a conflict check first. If your deadline is within
                  the week, call {brand.urgentPhone} and quote your reference.
                </p>
                <div className="actions">
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => setSent(null)}
                  >
                    Start another enquiry
                  </button>
                  <Link to="/fees" className="text-link">
                    Read how we charge{" "}
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </div>
                <p className="demo-note">
                  This is a demo: nothing left your browser and no one was
                  contacted.
                </p>
              </div>
            )}
          </div>

          {!sent && (
            <form
              className="form"
              noValidate
              onSubmit={submit}
              onChange={(e) => {
                const next = revalidate(e.target, errors, messages);
                if (next) setErrors(next);
              }}
            >
              <fieldset>
                <legend>About you</legend>
                <div
                  className="choice-row"
                  role="radiogroup"
                  aria-label="I am enquiring as"
                >
                  {(["individual", "organization"] as const).map((k) => (
                    <label key={k} className="choice">
                      <input
                        type="radio"
                        name="kind"
                        value={k}
                        checked={kind === k}
                        onChange={() => setKind(k)}
                      />
                      {k === "individual" ? "An individual" : "An organization"}
                    </label>
                  ))}
                </div>
                <div className="form-grid">
                  <Field label="Full name" name="name" error={errors.name}>
                    {(p) => <input {...p} required autoComplete="name" />}
                  </Field>
                  {kind === "organization" && (
                    <Field
                      label="Organization"
                      name="organization"
                      error={errors.organization}
                    >
                      {(p) => (
                        <input {...p} required autoComplete="organization" />
                      )}
                    </Field>
                  )}
                  <Field label="Email" name="email" error={errors.email}>
                    {(p) => (
                      <input
                        {...p}
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="name@example.com"
                      />
                    )}
                  </Field>
                  <Field
                    label="Phone"
                    name="phone"
                    optional={contact === "email"}
                    error={errors.phone}
                  >
                    {(p) => (
                      <input
                        {...p}
                        type="tel"
                        required={contact === "phone"}
                        pattern="\+?[0-9 .\(\)\-]{7,}"
                        autoComplete="tel"
                        placeholder="+1 555 …"
                      />
                    )}
                  </Field>
                </div>
                <div
                  className="choice-row"
                  role="radiogroup"
                  aria-label="Preferred way to reach you"
                >
                  <span className="choice-label">Reply by</span>
                  {(["email", "phone"] as const).map((c) => (
                    <label key={c} className="choice">
                      <input
                        type="radio"
                        name="contact"
                        value={c}
                        checked={contact === c}
                        onChange={() => setContact(c)}
                      />
                      {c === "email" ? "Email" : "Phone call"}
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend>Your matter</legend>
                <div className="form-grid">
                  <Field label="Practice area" name="area" error={errors.area}>
                    {(p) => (
                      <select {...p} required defaultValue={initial.area}>
                        <option value="" disabled>
                          Choose an area
                        </option>
                        {areas.map((a) => (
                          <option key={a.slug} value={a.slug}>
                            {a.name}
                          </option>
                        ))}
                        <option value="unsure">Not sure</option>
                      </select>
                    )}
                  </Field>
                  <Field label="Preferred lawyer" name="lawyer" optional>
                    {(p) => (
                      <select {...p} defaultValue={initial.lawyer}>
                        <option value="">No preference</option>
                        {people.map((x) => (
                          <option key={x.slug} value={x.slug}>
                            {x.name}
                          </option>
                        ))}
                      </select>
                    )}
                  </Field>
                  <Field
                    label="Other parties involved"
                    name="parties"
                    className="span-2"
                    error={errors.parties}
                    hint="Names of the other people or companies, so we can check we do not already act for them."
                  >
                    {(p) => (
                      <input
                        {...p}
                        required
                        placeholder="e.g. Harbor Supply Co.; J. Doyle"
                      />
                    )}
                  </Field>
                  <Field
                    label="Deadline, hearing or closing date"
                    name="keyDate"
                    optional
                    error={errors.keyDate}
                    hint={
                      daysToKey === null
                        ? "If something is due by a date, tell us now."
                        : daysToKey < 0
                          ? `That date was ${Math.abs(daysToKey)} days ago. Exceptions sometimes apply; tell us more below.`
                          : daysToKey <= 14
                            ? `${daysToKey} days from today. If it is within the week, also call ${brand.urgentPhone}.`
                            : `${daysToKey} days from today.`
                    }
                  >
                    {(p) => (
                      <input
                        {...p}
                        type="date"
                        value={keyDate}
                        onChange={(e) => setKeyDate(e.target.value)}
                      />
                    )}
                  </Field>
                  <Field
                    label="What has happened?"
                    name="summary"
                    className="span-2"
                    error={errors.summary}
                    hint={`${summary.length} / 1,500 characters. A few sentences is plenty.`}
                  >
                    {(p) => (
                      <textarea
                        {...p}
                        required
                        minLength={40}
                        maxLength={1500}
                        rows={6}
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                      />
                    )}
                  </Field>
                </div>
              </fieldset>

              <div className="consent">
                <p className="warn">
                  <ShieldAlert size={18} aria-hidden="true" />
                  Please do not include confidential details yet. Until we
                  confirm there is no conflict and you sign an engagement
                  letter, we cannot act for you and this form does not create an
                  attorney–client relationship.
                </p>
                <div className="field field-check">
                  <label className="choice">
                    <input
                      id="f-consent"
                      name="consent"
                      type="checkbox"
                      required
                      aria-invalid={errors.consent ? true : undefined}
                      aria-describedby={
                        errors.consent ? "f-consent-error" : undefined
                      }
                    />
                    I have read this note.
                  </label>
                  {errors.consent && (
                    <p className="field-error" id="f-consent-error">
                      {errors.consent}
                    </p>
                  )}
                </div>
              </div>

              <div className="form-submit">
                <button className="btn" type="submit" disabled={busy}>
                  {busy ? (
                    <>
                      <Loader2 className="spin" size={16} aria-hidden="true" />{" "}
                      Sending enquiry…
                    </>
                  ) : (
                    <>
                      Send enquiry <ArrowRight size={16} aria-hidden="true" />
                    </>
                  )}
                </button>
                <p className="demo-note">
                  Demo form: nothing is sent anywhere.
                </p>
              </div>
            </form>
          )}
        </div>

        <aside className="enquiry-aside" aria-labelledby="next-title">
          <h2 id="next-title">What happens next</h2>
          <ol className="steps steps-vertical">
            {home.process.map((s, i) => (
              <li key={s.title}>
                <span className="step-n" aria-hidden="true">
                  {i + 1}
                </span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="urgent">
            <h3>Urgent?</h3>
            <p>
              For hearings, closings or deadlines this week, call{" "}
              <a href={tel(brand.urgentPhone)}>{brand.urgentPhone}</a>.
              Otherwise call <a href={tel(brand.phone)}>{brand.phone}</a>,{" "}
              {brand.hours}.
            </p>
          </div>
        </aside>
      </section>
    </>
  );
}
