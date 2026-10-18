import { useState, type FormEvent } from "react";
import { applyPage, type Job } from "../content";
import { Link } from "../router";
import { companyOf, dateIn, range, validate, type Errors } from "../lib/format";
import { markApplied } from "../lib/shortlist";
import { Field, useErrors } from "../components/Field";
import { CompanyMark } from "../components/Marks";

const messages: Errors = {
  name: "Enter your full name as you’d like the employer to see it.",
  email: "Enter an email like you@example.com — replies go there.",
  phone: "Use digits, spaces, + or dashes, e.g. +1 555 010 4477.",
  city: "Tell the employer where you’re based, e.g. Portland, OR.",
  cv: "Attach your CV as a PDF or Word file.",
  portfolio: "Use a full link starting with https://, or leave it empty.",
  expected: "Enter a yearly figure in dollars, e.g. 85000, or leave it empty.",
  work: "Choose whether you need visa sponsorship.",
  start: "Choose when you could start.",
  note: "Write at least 60 characters on why this job; a few honest lines is plenty.",
  consent: "Tick the box so we can pass your application to the employer.",
};

export function Apply({ job }: { job: Job }) {
  const company = companyOf(job);
  const { errors, setErrors, onChange } = useErrors();
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<{ ref: string; email: string } | null>(null);
  const [noteLen, setNoteLen] = useState(0);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const file = (form.elements.namedItem("cv") as HTMLInputElement).files?.[0];
    const extra: Errors =
      file && file.size > 5 * 1024 * 1024
        ? {
            cv: "That file is over 5 MB. Export a smaller PDF and attach it again.",
          }
        : {};
    const found = validate(form, messages, extra);
    setErrors(found);
    if (Object.keys(found).length) return;
    setSending(true);
    const email = String(new FormData(form).get("email"));
    window.setTimeout(() => {
      markApplied(job.id);
      setSending(false);
      setSent({
        ref: `SL-${Math.floor(100000 + Math.random() * 900000)}`,
        email,
      });
      window.scrollTo({ top: 0 });
    }, 1100);
  };

  return (
    <div className="wrap page apply-page">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/jobs">Find jobs</Link>
        <span aria-hidden="true">/</span>
        <Link to={`/jobs/${job.id}`}>{job.title}</Link>
      </nav>

      <div className="apply-layout">
        <aside
          className="apply-summary"
          aria-label="The job you’re applying for"
        >
          <CompanyMark company={company} size={40} />
          <p className="apply-company">{company.name}</p>
          <p className="apply-job">{job.title}</p>
          <p className="ad-pay num">
            {range(job.salary)}
            <span>
              {job.city} · {job.workplace} · {job.type}
            </span>
          </p>
          <p className="fine">
            {company.name} has promised every applicant a reply within{" "}
            {company.replyDays} working days. Applications close{" "}
            {dateIn(job.closes)}.
          </p>
        </aside>

        <div className="apply-main">
          <p className="sr-only" aria-live="polite">
            {sent
              ? `Application sent to ${company.name}. Reference ${sent.ref}.`
              : ""}
          </p>
          {sent ? (
            <section
              className="success"
              aria-labelledby="done-h"
              tabIndex={-1}
              ref={(el) => el?.focus()}
            >
              <h1 id="done-h">Application sent to {company.name}.</h1>
              <p className="lede">
                Your reference is <strong className="num">{sent.ref}</strong>. A
                copy is on its way to {sent.email}, and {company.name} has
                promised a reply by{" "}
                <strong>{dateIn(company.replyDays + 2)}</strong>.
              </p>
              <p>
                We’ve put this job on your shortlist and marked it applied, so
                you can compare it against the others.
              </p>
              <div className="close-actions">
                <Link to="/shortlist" className="btn btn-pen">
                  Open your shortlist
                </Link>
                <Link to="/jobs" className="btn btn-ghost">
                  Keep looking
                </Link>
              </div>
            </section>
          ) : (
            <>
              <h1>Apply for {job.title}</h1>
              <p className="lede">
                Seven questions and your CV. No account, no personality test, no
                cover letter in the old sense.
              </p>
              <form
                className="form"
                noValidate
                onSubmit={submit}
                onChange={onChange}
                aria-busy={sending}
              >
                <fieldset className="form-section">
                  <legend>About you</legend>
                  <div className="form-grid">
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
                      label="Phone (optional)"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      pattern="[+0-9 ()\-]{7,}"
                      error={errors.phone}
                    />
                    <Field
                      label="Where you’re based"
                      name="city"
                      required
                      autoComplete="address-level2"
                      placeholder="City, state"
                      error={errors.city}
                    />
                  </div>
                </fieldset>

                <fieldset className="form-section">
                  <legend>Your work</legend>
                  <Field
                    label="CV"
                    name="cv"
                    type="file"
                    required
                    accept=".pdf,.doc,.docx"
                    hint="PDF or Word, up to 5 MB."
                    error={errors.cv}
                  />
                  <div className="form-grid">
                    <Field
                      label="Portfolio or LinkedIn (optional)"
                      name="portfolio"
                      type="url"
                      placeholder="https://"
                      error={errors.portfolio}
                    />
                    <Field
                      label="Expected base salary (optional)"
                      name="expected"
                      type="number"
                      inputMode="numeric"
                      min={10000}
                      max={500000}
                      step={1000}
                      hint={`This listing pays ${range(job.salary)}.`}
                      error={errors.expected}
                    />
                  </div>
                </fieldset>

                <fieldset className="form-section">
                  <legend>Logistics</legend>
                  <fieldset
                    className="choice-group"
                    data-invalid={errors.work ? "" : undefined}
                    aria-describedby={errors.work ? "work-err" : undefined}
                  >
                    <legend>Right to work in the US</legend>
                    {applyPage.rightToWork.map((r, i) => (
                      <label key={r} className="check">
                        <input type="radio" name="work" value={i} required />
                        <span>{r}</span>
                      </label>
                    ))}
                    {errors.work && (
                      <p className="field-error" id="work-err">
                        {errors.work}
                      </p>
                    )}
                  </fieldset>
                  <Field
                    label="When could you start?"
                    name="start"
                    error={errors.start}
                  >
                    <select required defaultValue="">
                      <option value="" disabled>
                        Choose one
                      </option>
                      {applyPage.starts.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </Field>
                </fieldset>

                <fieldset className="form-section">
                  <legend>Why this job</legend>
                  <Field
                    label="A few lines to the hiring manager"
                    name="note"
                    hint={`${noteLen} / 1,200 characters`}
                    error={errors.note}
                  >
                    <textarea
                      rows={6}
                      required
                      minLength={60}
                      maxLength={1200}
                      onInput={(e) => setNoteLen(e.currentTarget.value.length)}
                      placeholder="What drew you to it, and one thing you’ve done that shows you could do it."
                    />
                  </Field>
                  <label
                    className="check consent"
                    data-invalid={errors.consent ? "" : undefined}
                  >
                    <input
                      type="checkbox"
                      name="consent"
                      required
                      aria-describedby={
                        errors.consent ? "consent-err" : undefined
                      }
                    />
                    <span>
                      Pass my application to {company.name}. They can contact me
                      about this role only.
                    </span>
                  </label>
                  {errors.consent && (
                    <p className="field-error" id="consent-err">
                      {errors.consent}
                    </p>
                  )}
                </fieldset>

                <div className="form-foot">
                  <button
                    className="btn btn-pen"
                    type="submit"
                    disabled={sending}
                  >
                    {sending ? "Sending…" : "Send application"}
                  </button>
                  <p className="fine">{applyPage.note}</p>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
