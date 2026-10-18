import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { hiring, jobs, type Job } from "../content";
import { pause, validate } from "../lib/util";
import { Field, useErrors } from "../components/Field";

const ZONES = [
  "UTC−5 (Americas East)",
  "UTC−3",
  "UTC+0 (Halden)",
  "UTC+1",
  "UTC+2",
  "UTC+3",
  "Somewhere else",
];

export function JobPage({ job }: { job: Job }) {
  const others = jobs.filter((j) => j.slug !== job.slug);
  return (
    <div className="page wrap">
      <header className="page-head job-head">
        <p className="crumbs">
          <Link to="/jobs">Jobs</Link> / <span>{job.team}</span>
        </p>
        <h1>{job.title}</h1>
        <p className="lede">{job.summary}</p>
        <dl className="facts facts-inline">
          <div>
            <dt>Salary</dt>
            <dd className="num">{job.salary}</dd>
          </div>
          <div>
            <dt>Type</dt>
            <dd>{job.type}</dd>
          </div>
          <div>
            <dt>Where</dt>
            <dd>{job.location}</dd>
          </div>
        </dl>
      </header>

      <div className="job-layout">
        <div className="prose">
          <h2>The role</h2>
          {job.about.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <h2>What you'll do</h2>
          <ul>
            {job.doing.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
          <h2>What you'll bring</h2>
          <ul>
            {job.have.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
          <h2>Nice to have</h2>
          <ul>
            {job.nice.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
          <h2>The process</h2>
          <ol>
            {hiring.process.map((s) => (
              <li key={s.title}>
                <strong>{s.title}.</strong> {s.text}
              </li>
            ))}
          </ol>
        </div>
        <Apply job={job} />
      </div>

      <section aria-labelledby="other-roles">
        <h2 id="other-roles">Other open roles</h2>
        <ul className="other-roles">
          {others.map((j) => (
            <li key={j.slug}>
              <Link to={`/jobs/${j.slug}`} className="text-link">
                {j.title} <ArrowRight aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function Apply({ job }: { job: Job }) {
  const { errors, setErrors, onChange } = useErrors();
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<{
    name: string;
    email: string;
    ref: string;
  } | null>(null);
  const [note, setNote] = useState("");

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, {
      name: "Tell us your name.",
      email: "Enter an email like you@example.com so we can reply.",
      portfolio:
        "Paste a full link to your work, starting with https://. A folder, a site or an itch.io page are all fine.",
      zone: "Choose your time zone so we can plan the first chat.",
      note: "Write at least 80 characters: a game you finished recently and one thing you'd change about it.",
      consent:
        "Tick the box to confirm you've read how we handle applications.",
    });
    setErrors(found);
    if (Object.keys(found).length) return;
    const data = new FormData(form);
    setSending(true);
    await pause(1100);
    setSending(false);
    setDone({
      name: String(data.get("name")),
      email: String(data.get("email")),
      ref: `ARC-${job.slug.slice(0, 3).toUpperCase()}-${String(Date.now()).slice(-5)}`,
    });
  };

  return (
    <aside className="apply" aria-labelledby="apply-title">
      <h2 id="apply-title">Apply for this role</h2>
      <div aria-live="polite">
        {done ? (
          <div className="success">
            <h3>Thanks, {done.name.split(" ")[0]}. Application in.</h3>
            <p>
              Your reference is <strong className="num">{done.ref}</strong>. Ada
              will reply to {done.email} within ten working days, whatever the
              answer.
            </p>
            <p className="small">
              Demo only: nothing was sent and nothing was stored.
            </p>
          </div>
        ) : (
          <form
            noValidate
            onSubmit={submit}
            onChange={onChange}
            className="form-stack"
            aria-busy={sending}
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
              label="Portfolio or work link"
              name="portfolio"
              type="url"
              required
              placeholder="https://"
              hint="Games, prototypes, a reel, a repository: whatever shows your work best."
              error={errors.portfolio}
            />
            <Field label="Your time zone" name="zone" error={errors.zone}>
              <select required defaultValue="">
                <option value="">Choose a time zone</option>
                {ZONES.map((z) => (
                  <option key={z}>{z}</option>
                ))}
              </select>
            </Field>
            <Field
              label="A game you finished recently, and one thing you'd change"
              name="note"
              hint={`${note.trim().length} of 80 characters minimum`}
              error={errors.note}
            >
              <textarea
                required
                minLength={80}
                rows={5}
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
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
                  aria-describedby={
                    errors.consent ? "f-consent-err" : undefined
                  }
                />
                <span>
                  I understand my application is read by the hiring team only
                  and deleted after six months.
                </span>
              </label>
              {errors.consent && (
                <p className="field-error" id="f-consent-err">
                  {errors.consent}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              disabled={sending}
            >
              {sending ? "Sending application…" : "Send application"}
            </button>
            <p className="small">Demo form: nothing is sent anywhere.</p>
          </form>
        )}
      </div>
    </aside>
  );
}
