import { useState, type FormEvent } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { Link } from "../router";
import { brand, projects, type Job } from "../content";
import { Field } from "../components/Field";
import { dateLabel } from "../lib/format";
import { pause, reference, useErrors, validate } from "../lib/forms";

const messages: Record<string, string> = {
  name: "Enter your full name so we know who to call.",
  email:
    "Enter an email like name@example.com so we can confirm your application.",
  phone: "Enter a phone number with at least 10 digits, like +1 555 010 2030.",
  experience: "Choose how many years you have worked in construction.",
  cv: "Attach your CV as a PDF or Word document.",
  consent:
    "Tick the box so we can keep your application on file while we review it.",
};

export function JobPage({ job }: { job: Job }) {
  const { errors, setErrors, onChange } = useErrors();
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [ref, setRef] = useState("");
  const project = projects.find((p) => p.slug === job.project);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const file = (form.elements.namedItem("cv") as HTMLInputElement).files?.[0];
    const extra: Record<string, string> = {};
    if (file && !/\.(pdf|docx?)$/i.test(file.name))
      extra.cv = `${file.name} is not a PDF or Word file. Save your CV as .pdf or .docx and attach it again.`;
    else if (file && file.size > 5_000_000)
      extra.cv =
        "That file is over 5 MB. Export a smaller PDF and attach it again.";
    const found = validate(form, messages, extra);
    setErrors(found);
    if (Object.keys(found).length) return;
    setState("sending");
    await pause();
    setRef(reference("C"));
    setState("done");
  }

  return (
    <>
      <header className="wrap page-head job-head">
        <Link to="/careers" className="back-link">
          <ArrowLeft aria-hidden="true" size={16} /> All roles
        </Link>
        <h1>{job.title}</h1>
        <dl className="job-facts">
          <div>
            <dt>Discipline</dt>
            <dd>{job.discipline}</dd>
          </div>
          <div>
            <dt>Office</dt>
            <dd>{job.location}</dd>
          </div>
          <div>
            <dt>Contract</dt>
            <dd>{job.type}</dd>
          </div>
          <div>
            <dt>Pay</dt>
            <dd className="num">{job.pay}</dd>
          </div>
          <div>
            <dt>Closes</dt>
            <dd className="num">{dateLabel(job.closes)}</dd>
          </div>
        </dl>
      </header>

      <div className="wrap job-layout">
        <div className="prose">
          <p className="lede">{job.summary}</p>
          {project && (
            <p>
              You would join the team on{" "}
              <Link to={`/projects/${project.slug}`}>{project.name}</Link>,
              currently in week {project.week} of its programme.
            </p>
          )}
          <h2>What you will do</h2>
          <ul>
            {job.duties.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
          <h2>What you bring</h2>
          <ul>
            {job.needs.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
          <p className="quiet">
            Questions about the role? Email{" "}
            <a href={`mailto:${brand.careers}`}>{brand.careers}</a>.
          </p>
        </div>

        <section className="form-card" aria-labelledby="apply-h">
          <h2 id="apply-h">Apply for this role</h2>
          <div aria-live="polite">
            {state === "done" && (
              <div className="success">
                <Check aria-hidden="true" size={28} />
                <h3>Application received</h3>
                <p>
                  Thanks. Your reference is{" "}
                  <strong className="num">{ref}</strong>. The hiring manager for{" "}
                  {job.title} will call you within a week.
                </p>
              </div>
            )}
          </div>
          {state !== "done" && (
            <form
              noValidate
              onSubmit={submit}
              onChange={onChange}
              className="form"
            >
              <Field
                label="Full name"
                name="name"
                autoComplete="name"
                required
                error={errors.name}
              />
              <Field
                label="Email"
                name="email"
                type="email"
                autoComplete="email"
                required
                error={errors.email}
              />
              <Field
                label="Phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                pattern="\+?[0-9 .\-]{10,}"
                error={errors.phone}
              />
              <Field
                label="Years in construction"
                name="experience"
                error={errors.experience}
              >
                <select required defaultValue="">
                  <option value="" disabled>
                    Choose one
                  </option>
                  <option>Less than 1 year</option>
                  <option>1–3 years</option>
                  <option>4–9 years</option>
                  <option>10 years or more</option>
                </select>
              </Field>
              <Field
                label="CV"
                name="cv"
                type="file"
                accept=".pdf,.doc,.docx"
                required
                hint="PDF or Word, up to 5 MB."
                error={errors.cv}
              />
              <Field
                label="Anything you want us to know (optional)"
                name="note"
              >
                <textarea rows={4} maxLength={800} />
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
                  Keep my application on file for six months while it is
                  reviewed.
                </label>
                {errors.consent && (
                  <p className="field-error" id="f-consent-err">
                    {errors.consent}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="btn btn-signal btn-block"
                disabled={state === "sending"}
              >
                {state === "sending"
                  ? "Sending application…"
                  : "Send application"}
              </button>
              <p className="quiet">
                Demo form: nothing is uploaded or sent anywhere.
              </p>
            </form>
          )}
        </section>
      </div>
    </>
  );
}
