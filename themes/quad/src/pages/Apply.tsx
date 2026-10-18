import { useRef, useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, CircleCheck, X } from "lucide-react";
import { Link } from "../router";
import { brand, images, programmes } from "../content";
import { clearPlan, loadPlan, type SavedPlan } from "../lib/plan";
import { pause, useErrors, validate, type Errors } from "../lib/forms";
import { Field } from "../components/Field";
import { Photo } from "../components/Photo";

const steps = ["About you", "Your programme", "Statement & referee"];
const countries = [
  "United Kingdom",
  "Ireland",
  "France",
  "Germany",
  "Nigeria",
  "India",
  "China",
  "Malaysia",
  "United States",
  "Canada",
  "Other",
];
const STATEMENT_MIN = 300;
const STATEMENT_MAX = 4000;

const messages: Record<string, string> = {
  firstName: "Enter your first name as it appears on your passport or ID.",
  lastName: "Enter your family name as it appears on your passport or ID.",
  email:
    "Enter an email address like name@example.com — your offer will be sent there.",
  phone:
    "Use digits, spaces and an optional leading + only, e.g. +44 7700 900123.",
  dob: "Enter your date of birth so we can check you'll be 17 or over when the course starts.",
  country: "Choose the country you live in now.",
  feeStatus:
    "Choose a fee status, or ‘Not sure’ and our fees team will assess it.",
  programme: "Choose the programme you are applying for.",
  entry: "Choose when you'd like to start.",
  mode: "Choose full-time or part-time study.",
  qualifications:
    "List your qualifications and grades, e.g. ‘A levels: History A, English A, Maths B (predicted)’.",
  statement: `Write at least ${STATEMENT_MIN} characters about why you want to study this programme.`,
  refereeName:
    "Enter the name of a teacher, tutor or employer who knows your work.",
  refereeEmail: "Enter your referee's email address like name@school.example.",
  consent:
    "Tick to confirm the application is your own work and the details are accurate.",
};

export function Apply() {
  const form = useRef<HTMLFormElement>(null);
  const sets = useRef<(HTMLFieldSetElement | null)[]>([]);
  const { errors, setErrors, onChange } = useErrors();
  const [step, setStep] = useState(0);
  const [plan, setPlan] = useState<SavedPlan | null>(loadPlan);
  const [programme, setProgramme] = useState(plan?.programme ?? "");
  const [statement, setStatement] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<{
    ref: string;
    name: string;
    programme: string;
  } | null>(null);

  const chosen = programmes.find((p) => p.id === programme);
  const planFor = plan && plan.programme === programme ? plan : null;

  /** Custom checks the browser can't express. */
  const extra = (index: number): Errors => {
    const data = new FormData(form.current!);
    const out: Errors = {};
    if (index === 0) {
      const dob = String(data.get("dob") ?? "");
      if (dob) {
        const start = new Date("2027-09-01");
        const born = new Date(dob);
        const age =
          start.getFullYear() -
          born.getFullYear() -
          (start <
          new Date(start.getFullYear(), born.getMonth(), born.getDate())
            ? 1
            : 0);
        if (age < 17)
          out.dob =
            "You need to be 17 or over by 1 September 2027. Check the year, or apply for 2028 entry.";
        if (age > 100)
          out.dob = "Check the year of birth — it looks like a typing slip.";
      }
    }
    if (
      index === 1 &&
      data.get("mode") === "Part-time" &&
      chosen &&
      !chosen.modes.includes("Part-time")
    ) {
      out.mode = `${chosen.title} is full-time only. Choose full-time, or pick a programme that offers part-time study.`;
    }
    if (
      index === 2 &&
      statement.trim().length > 0 &&
      statement.trim().length < STATEMENT_MIN
    ) {
      out.statement = `Your statement is ${statement.trim().length} characters; write at least ${STATEMENT_MIN - statement.trim().length} more.`;
    }
    return out;
  };

  const check = (index: number) => {
    const found = validate(sets.current[index]!, messages, extra(index));
    setErrors(found);
    return Object.keys(found).length === 0;
  };

  const go = (to: number) => {
    if (to > step && !check(step)) return;
    setErrors({});
    setStep(to);
    requestAnimationFrame(() =>
      sets.current[to]
        ?.querySelector<HTMLElement>("input, select, textarea")
        ?.focus(),
    );
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step < steps.length - 1) return go(step + 1);
    if (!check(step)) return;
    const data = new FormData(e.currentTarget);
    setBusy(true);
    await pause(1100);
    setBusy(false);
    setDone({
      ref: `QW27-${Math.floor(10000 + Math.random() * 89999)}`,
      name: String(data.get("firstName")),
      programme: chosen ? `${chosen.award} ${chosen.title}` : "",
    });
  };

  return (
    <>
      <header className="page-head wrap apply-head">
        <div>
          <h1>Apply for September 2027</h1>
          <p className="lead">
            Three short sections, about forty minutes. You can come back to any
            step before you submit. Deadline for equal consideration: 28 January
            2027.
          </p>
        </div>
        <Photo img={images.redBook} className="apply-photo" eager />
      </header>

      <div className="wrap apply-grid">
        <div aria-live="polite" className="apply-live">
          {done && (
            <div className="success" tabIndex={-1} ref={(el) => el?.focus()}>
              <CircleCheck aria-hidden="true" />
              <h2>Application received, {done.name}</h2>
              <p>
                Your reference is <strong className="num">{done.ref}</strong>.
                We've logged your application for {done.programme}. Most
                decisions arrive within eight weeks; you'll hear from Admissions
                by email first.
              </p>
              <ul className="success-next">
                <li>
                  <Link to="/events/autumn-open-day">Book the open day</Link> —
                  applicants get a reserved seat in subject talks.
                </li>
                <li>
                  <Link to="/campus-life">Look at halls</Link> — accommodation
                  applications open once you hold an offer.
                </li>
                <li>
                  <Link to="/admissions">Read about scholarships</Link> — most
                  are assessed automatically from this form.
                </li>
              </ul>
            </div>
          )}
        </div>

        {!done && (
          <form
            ref={form}
            noValidate
            onSubmit={submit}
            onChange={onChange}
            className="apply-form"
            aria-describedby="apply-note"
          >
            <ol className="stepper">
              {steps.map((s, i) => (
                <li
                  key={s}
                  aria-current={i === step ? "step" : undefined}
                  data-done={i < step ? "" : undefined}
                >
                  <button
                    type="button"
                    onClick={() => go(i)}
                    disabled={i > step}
                  >
                    <span className="step-num">{i + 1}</span>
                    {s}
                  </button>
                </li>
              ))}
            </ol>

            <fieldset
              ref={(el) => void (sets.current[0] = el)}
              hidden={step !== 0}
            >
              <legend>About you</legend>
              <div className="field-row">
                <Field
                  label="First name"
                  name="firstName"
                  required
                  autoComplete="given-name"
                  error={errors.firstName}
                />
                <Field
                  label="Family name"
                  name="lastName"
                  required
                  autoComplete="family-name"
                  error={errors.lastName}
                />
              </div>
              <div className="field-row">
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  error={errors.email}
                />
                <Field
                  label="Phone (optional)"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  pattern="\+?[0-9 ]{7,16}"
                  error={errors.phone}
                />
              </div>
              <div className="field-row">
                <Field
                  label="Date of birth"
                  name="dob"
                  type="date"
                  required
                  max="2012-12-31"
                  error={errors.dob}
                />
                <Field
                  label="Country of residence"
                  name="country"
                  error={errors.country}
                >
                  <select required defaultValue="">
                    <option value="" disabled>
                      Choose a country
                    </option>
                    {countries.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </Field>
              </div>
              <fieldset
                className="radio-group"
                aria-describedby={
                  errors.feeStatus ? "f-feeStatus-err" : undefined
                }
                data-invalid={errors.feeStatus ? "" : undefined}
              >
                <legend>Fee status</legend>
                {["Home", "International", "Not sure"].map((s) => (
                  <label key={s} className="check">
                    <input type="radio" name="feeStatus" value={s} required />
                    <span>{s}</span>
                  </label>
                ))}
                {errors.feeStatus && (
                  <p className="field-error" id="f-feeStatus-err">
                    {errors.feeStatus}
                  </p>
                )}
              </fieldset>
            </fieldset>

            <fieldset
              ref={(el) => void (sets.current[1] = el)}
              hidden={step !== 1}
            >
              <legend>Your programme</legend>
              <Field
                label="Programme"
                name="programme"
                error={errors.programme}
              >
                <select
                  required
                  value={programme}
                  onChange={(e) => setProgramme(e.target.value)}
                >
                  <option value="" disabled>
                    Choose a programme
                  </option>
                  {programmes.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.award} {p.title} ({p.code})
                    </option>
                  ))}
                </select>
              </Field>

              {planFor && (
                <div className="plan-attached">
                  <p>
                    <strong>Module plan attached</strong> — {planFor.year}{" "}
                    options: {planFor.modules.join(", ") || "core modules only"}
                    .
                  </p>
                  <button
                    type="button"
                    className="btn btn-quiet"
                    onClick={() => {
                      setPlan(null);
                      clearPlan();
                    }}
                  >
                    <X aria-hidden="true" /> Remove
                  </button>
                </div>
              )}

              <div className="field-row">
                <Field label="Start date" name="entry" error={errors.entry}>
                  <select required defaultValue="2027">
                    <option value="2027">September 2027</option>
                    <option value="2028">September 2028 (deferred)</option>
                  </select>
                </Field>
                <fieldset
                  className="radio-group"
                  data-invalid={errors.mode ? "" : undefined}
                  aria-describedby={errors.mode ? "f-mode-err" : undefined}
                >
                  <legend>Mode of study</legend>
                  {["Full-time", "Part-time"].map((m) => (
                    <label key={m} className="check">
                      <input
                        type="radio"
                        name="mode"
                        value={m}
                        required
                        defaultChecked={m === "Full-time"}
                      />
                      <span>{m}</span>
                    </label>
                  ))}
                  {errors.mode && (
                    <p className="field-error" id="f-mode-err">
                      {errors.mode}
                    </p>
                  )}
                </fieldset>
              </div>
              <Field
                label="Qualifications and grades"
                name="qualifications"
                hint="Include predicted grades and say which ones are predicted."
                error={errors.qualifications}
              >
                <textarea required minLength={10} rows={3} />
              </Field>
            </fieldset>

            <fieldset
              ref={(el) => void (sets.current[2] = el)}
              hidden={step !== 2}
            >
              <legend>Statement & referee</legend>
              <Field
                label="Personal statement"
                name="statement"
                hint={`Why this programme, and what you've done to explore it. ${STATEMENT_MIN}–${STATEMENT_MAX} characters.`}
                error={errors.statement}
              >
                <textarea
                  required
                  minLength={STATEMENT_MIN}
                  maxLength={STATEMENT_MAX}
                  rows={9}
                  value={statement}
                  onChange={(e) => setStatement(e.target.value)}
                />
              </Field>
              <p
                className="counter"
                data-short={
                  statement.trim().length < STATEMENT_MIN ? "" : undefined
                }
              >
                <span className="num">
                  {statement.trim().length.toLocaleString("en-GB")}
                </span>{" "}
                / {STATEMENT_MAX.toLocaleString("en-GB")} characters
              </p>
              <div className="field-row">
                <Field
                  label="Referee's name"
                  name="refereeName"
                  required
                  error={errors.refereeName}
                />
                <Field
                  label="Referee's email"
                  name="refereeEmail"
                  type="email"
                  required
                  error={errors.refereeEmail}
                />
              </div>
              <div
                className="field"
                data-invalid={errors.consent ? "" : undefined}
              >
                <label className="check">
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
                    This application is my own work and the details are
                    accurate.
                  </span>
                </label>
                {errors.consent && (
                  <p className="field-error" id="f-consent-err">
                    {errors.consent}
                  </p>
                )}
              </div>
            </fieldset>

            <div className="form-actions">
              {step > 0 && (
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => go(step - 1)}
                  disabled={busy}
                >
                  <ArrowLeft aria-hidden="true" /> Back
                </button>
              )}
              <button
                type="submit"
                className="btn btn-primary"
                disabled={busy}
                aria-busy={busy}
              >
                {step < steps.length - 1 ? (
                  <>
                    Continue to {steps[step + 1].toLowerCase()}{" "}
                    <ArrowRight aria-hidden="true" />
                  </>
                ) : busy ? (
                  "Submitting application…"
                ) : (
                  "Submit application"
                )}
              </button>
            </div>
            <p className="small" id="apply-note">
              Demo form: nothing is sent or stored beyond this page. Questions
              go to <a href={`mailto:${brand.email}`}>{brand.email}</a>.
            </p>
          </form>
        )}

        <aside className="apply-aside" aria-label="Before you start">
          <h2>Have these to hand</h2>
          <ul>
            <li>Your qualifications and predicted grades</li>
            <li>A personal statement — draft it somewhere else first</li>
            <li>Your referee's name and email address</li>
            <li>A module plan, if you made one on a programme page</li>
          </ul>
          <p>
            Not chosen yet?{" "}
            <Link to="/programmes">Use the programme finder</Link>.
          </p>
        </aside>
      </div>
    </>
  );
}
