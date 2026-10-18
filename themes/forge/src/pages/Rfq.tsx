import { useRef, useState, type FormEvent } from "react";
import { ArrowRight, Check, Loader2, Paperclip, X } from "lucide-react";
import { brand, families, materials, rfq, tolerances } from "../content";
import { describedBy, Field, focusFirst, validate } from "../components/Field";
import { getDraft, partNumber, quote, setDraft, usd } from "../lib/part";
import { Link } from "../router";

const ACCEPT = [
  ".step",
  ".stp",
  ".igs",
  ".iges",
  ".x_t",
  ".sldprt",
  ".pdf",
  ".dxf",
];
const MAX_MB = 25;

const isoDate = (d: Date) => d.toISOString().slice(0, 10);

const messages = {
  name: {
    valueMissing: "Enter your name so the estimator knows who to reply to.",
  },
  company: {
    valueMissing:
      "Enter your company name, or “Independent” if you are buying for yourself.",
  },
  email: {
    valueMissing: "Enter a work email; the quote is sent there.",
    typeMismatch:
      "That email is missing an @ or a domain, e.g. dana@corvane.com.",
  },
  phone: {
    patternMismatch:
      "Use digits, spaces, + or dashes only, e.g. +1 555 014 2300.",
  },
  part: {
    valueMissing:
      "Give the part a name or number, e.g. “Sensor bracket, rev B”.",
  },
  material: {
    valueMissing: "Choose a material, or “Other” and name it in the notes.",
  },
  qty: {
    valueMissing: "Enter how many parts you need.",
    rangeUnderflow: "Quantity must be at least 1.",
    rangeOverflow:
      "Over 100,000 parts? Enter 100000 and give the annual volume in the notes.",
    stepMismatch: "Enter a whole number of parts.",
    badInput: "Enter the quantity as a number, e.g. 250.",
  },
  date: {
    valueMissing: "Pick the date you need parts on your dock.",
    rangeUnderflow:
      "Pick a date at least a week out; first articles alone take 5–7 days. Need it sooner? Say so in the notes.",
  },
  notes: {
    tooLong: "Keep notes under 2,000 characters, or attach them as a PDF.",
  },
};

export function Rfq() {
  const [draft, setLocalDraft] = useState(getDraft);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [reference, setReference] = useState("");
  const result = useRef<HTMLDivElement>(null);
  const minDate = isoDate(new Date(Date.now() + 7 * 864e5));

  const removeDraft = () => {
    setDraft(null);
    setLocalDraft(null);
  };

  const fileError = (list: File[]) => {
    if (!list.length && !draft)
      return "Attach a drawing or model (STEP and PDF preferred), or build the part in the configurator first.";
    const bad = list.find(
      (f) => !ACCEPT.some((ext) => f.name.toLowerCase().endsWith(ext)),
    );
    if (bad)
      return `${bad.name} is not a file type we can open. Use STEP, IGES, Parasolid, SolidWorks, PDF or DXF.`;
    const big = list.find((f) => f.size > MAX_MB * 1024 * 1024);
    if (big)
      return `${big.name} is over ${MAX_MB} MB. Zip it or email it to ${brand.rfqEmail} after you submit.`;
    return "";
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, messages);
    const fe = fileError(files);
    if (fe) found.files = fe;
    setErrors(found);
    if (Object.keys(found).length) {
      focusFirst(form, found);
      return;
    }
    setStatus("sending");
    window.setTimeout(() => {
      setReference(
        `RFQ-${new Date().getFullYear() % 100}-${String(Math.floor(1000 + Math.random() * 9000))}`,
      );
      setStatus("sent");
      setDraft(null);
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
        result.current?.focus({ preventScroll: true });
      });
    }, 1400);
  };

  const clear = (name: string) =>
    errors[name] && setErrors(({ [name]: _, ...rest }) => rest);

  if (status === "sent") {
    return (
      <section className="wrap rfq-done" aria-labelledby="done-title">
        <div
          ref={result}
          tabIndex={-1}
          aria-live="polite"
          className="done-panel"
        >
          <Check aria-hidden="true" className="done-icon" />
          <h1 id="done-title">{reference} is with estimating</h1>
          <p className="lede">
            An estimator will reply by 17:00 ET on the next business day. Keep
            the reference handy if you call.
          </p>
          <ol className="after">
            {rfq.after.map(([k, v]) => (
              <li key={k}>
                <strong>{k}</strong>
                <span>{v}</span>
              </li>
            ))}
          </ol>
          <p className="fineprint">
            This is a demo: nothing was uploaded or sent.
          </p>
          <div className="actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setStatus("idle");
                setFiles([]);
                setLocalDraft(null);
              }}
            >
              Start another RFQ
            </button>
            <Link to="/capabilities" className="btn btn-ghost">
              Browse capabilities
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const draftQuote = draft && quote(draft);

  return (
    <>
      <header className="page-head wrap">
        <h1>Request a quote</h1>
        <p className="lede">{rfq.lede}</p>
      </header>

      <div className="wrap rfq">
        <form
          className="rfq-form"
          noValidate
          onSubmit={submit}
          aria-busy={status === "sending"}
        >
          {Object.keys(errors).length > 0 && (
            <p className="form-alert" role="alert">
              {Object.keys(errors).length === 1
                ? "One field needs attention."
                : `${Object.keys(errors).length} fields need attention.`}{" "}
              Each one says what to change.
            </p>
          )}

          <fieldset>
            <legend>The part</legend>
            {draft && draftQuote && (
              <div className="draft">
                <div>
                  <p className="draft-pn">{partNumber(draft)}</p>
                  <p>
                    {families.find((f) => f.id === draft.family)!.name} ·{" "}
                    {materials.find((m) => m.id === draft.material)!.name} ·{" "}
                    {draft.qty.toLocaleString("en-US")} pcs
                  </p>
                  <p className="hint">
                    Attached from the configurator. Indicative{" "}
                    {usd(draftQuote.unit)} per part, ~{draftQuote.days} working
                    days.
                  </p>
                </div>
                <div className="draft-actions">
                  <Link to="/configurator" className="text-link">
                    Edit
                  </Link>
                  <button
                    type="button"
                    className="icon-btn"
                    onClick={removeDraft}
                    aria-label="Remove the attached configurator part"
                  >
                    <X aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}
            <Field name="part" label="Part name or number" error={errors.part}>
              <input
                id="part"
                name="part"
                required
                defaultValue={draft ? partNumber(draft) : ""}
                aria-invalid={!!errors.part || undefined}
                aria-describedby={describedBy("part", false, errors.part)}
                onInput={() => clear("part")}
              />
            </Field>
            <Field
              name="files"
              label="Drawings and models"
              optional={!!draft}
              hint={`STEP, IGES, Parasolid, SolidWorks, PDF or DXF, up to ${MAX_MB} MB each.`}
              error={errors.files}
            >
              <div className="file">
                <input
                  id="files"
                  name="files"
                  type="file"
                  multiple
                  accept={ACCEPT.join(",")}
                  aria-invalid={!!errors.files || undefined}
                  aria-describedby={describedBy("files", true, errors.files)}
                  onChange={(e) => {
                    const list = Array.from(e.target.files ?? []);
                    setFiles(list);
                    setErrors(({ files: _, ...rest }) =>
                      fileError(list)
                        ? { ...rest, files: fileError(list) }
                        : rest,
                    );
                  }}
                />
                <span className="file-face" aria-hidden="true">
                  <Paperclip />{" "}
                  {files.length
                    ? `${files.length} file${files.length > 1 ? "s" : ""} selected`
                    : "Choose files"}
                </span>
              </div>
              {files.length > 0 && (
                <ul className="file-list">
                  {files.map((f) => (
                    <li key={f.name}>
                      {f.name}{" "}
                      <span>{(f.size / 1024 / 1024).toFixed(1)} MB</span>
                    </li>
                  ))}
                </ul>
              )}
            </Field>
            <div className="field-row">
              <Field name="material" label="Material" error={errors.material}>
                <select
                  id="material"
                  name="material"
                  required
                  defaultValue={draft ? draft.material : ""}
                  aria-invalid={!!errors.material || undefined}
                  aria-describedby={describedBy(
                    "material",
                    false,
                    errors.material,
                  )}
                  onChange={() => clear("material")}
                >
                  <option value="" disabled>
                    Choose…
                  </option>
                  {materials.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                  <option value="other">Other (name it in the notes)</option>
                </select>
              </Field>
              <Field name="qty" label="Quantity" error={errors.qty}>
                <input
                  id="qty"
                  name="qty"
                  type="number"
                  inputMode="numeric"
                  required
                  min={1}
                  max={100000}
                  step={1}
                  defaultValue={draft?.qty}
                  aria-invalid={!!errors.qty || undefined}
                  aria-describedby={describedBy("qty", false, errors.qty)}
                  onInput={() => clear("qty")}
                />
              </Field>
            </div>
            <div className="field-row">
              <Field name="tolerance" label="Tightest tolerance on the print">
                <select
                  id="tolerance"
                  name="tolerance"
                  defaultValue={draft?.tol ?? "standard"}
                >
                  {tolerances.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.band} · {t.name}
                    </option>
                  ))}
                </select>
              </Field>
              <Field name="date" label="Needed on dock by" error={errors.date}>
                <input
                  id="date"
                  name="date"
                  type="date"
                  required
                  min={minDate}
                  aria-invalid={!!errors.date || undefined}
                  aria-describedby={describedBy("date", false, errors.date)}
                  onInput={() => clear("date")}
                />
              </Field>
            </div>
            <div className="checks-row">
              <label className="check">
                <input type="checkbox" name="itar" /> Export-controlled (ITAR /
                EAR) data
              </label>
              <label className="check">
                <input type="checkbox" name="nda" /> Send me an NDA before you
                open the files
              </label>
            </div>
          </fieldset>

          <fieldset>
            <legend>You</legend>
            <div className="field-row">
              <Field name="name" label="Name" error={errors.name}>
                <input
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  aria-invalid={!!errors.name || undefined}
                  aria-describedby={describedBy("name", false, errors.name)}
                  onInput={() => clear("name")}
                />
              </Field>
              <Field name="company" label="Company" error={errors.company}>
                <input
                  id="company"
                  name="company"
                  required
                  autoComplete="organization"
                  aria-invalid={!!errors.company || undefined}
                  aria-describedby={describedBy(
                    "company",
                    false,
                    errors.company,
                  )}
                  onInput={() => clear("company")}
                />
              </Field>
            </div>
            <div className="field-row">
              <Field name="email" label="Work email" error={errors.email}>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  aria-invalid={!!errors.email || undefined}
                  aria-describedby={describedBy("email", false, errors.email)}
                  onInput={() => clear("email")}
                />
              </Field>
              <Field name="phone" label="Phone" optional error={errors.phone}>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  pattern="[0-9 +()\-]{7,20}"
                  autoComplete="tel"
                  aria-invalid={!!errors.phone || undefined}
                  aria-describedby={describedBy("phone", false, errors.phone)}
                  onInput={() => clear("phone")}
                />
              </Field>
            </div>
            <Field
              name="notes"
              label="Notes for the estimator"
              optional
              hint="Annual volume, critical features, finish samples, inspection requirements."
              error={errors.notes}
            >
              <textarea
                id="notes"
                name="notes"
                rows={5}
                maxLength={2000}
                aria-invalid={!!errors.notes || undefined}
                aria-describedby={describedBy("notes", true, errors.notes)}
                onInput={() => clear("notes")}
              />
            </Field>
          </fieldset>

          <div className="submit-row">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={status === "sending"}
            >
              {status === "sending" ? (
                <>
                  <Loader2 aria-hidden="true" className="spin" /> Sending RFQ…
                </>
              ) : (
                <>
                  Send RFQ <ArrowRight aria-hidden="true" />
                </>
              )}
            </button>
            <p className="fineprint">
              Demo form: nothing is uploaded or sent anywhere.
            </p>
          </div>
          <p className="sr-only" aria-live="polite">
            {status === "sending" ? "Sending your RFQ." : ""}
          </p>
        </form>

        <aside className="rfq-aside" aria-labelledby="aside-title">
          <h2 id="aside-title">What happens next</h2>
          <ol className="after">
            {rfq.after.map(([k, v]) => (
              <li key={k}>
                <strong>{k}</strong>
                <span>{v}</span>
              </li>
            ))}
          </ol>
          <p>{rfq.ndaNote}</p>
          <dl className="spec-list">
            <div>
              <dt>Estimating</dt>
              <dd>{brand.hours[1][1]}</dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd>
                <a href={brand.phoneHref}>{brand.phone}</a>
              </dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${brand.rfqEmail}`}>{brand.rfqEmail}</a>
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </>
  );
}
