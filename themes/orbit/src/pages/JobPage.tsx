import { useState } from "react";
import { ArrowLeft, ArrowRight, CircleCheck } from "lucide-react";
import { Link } from "../router";
import { brand, jobs, type Job } from "../content";
import { described, focusOnMount, useFormFlow, type Rules } from "../lib/form";

const rules: Rules = {
  "app-name": { message: "Enter your full name." },
  "app-email": { message: "Enter an email address like name@example.com." },
  "app-link": {
    message: "Enter a full link starting with https://, or leave it empty.",
    test: (v) => v === "" || /^https?:\/\/\S+\.\S+/.test(v),
  },
  "app-cv": {
    message: "Attach your CV as a PDF, up to 5 MB.",
    test: (_, el) => {
      const file = (el as HTMLInputElement | null)?.files?.[0];
      return !!file && file.size <= 5_000_000 && /\.pdf$/i.test(file.name);
    },
  },
  "app-why": {
    message:
      "Tell us in at least 80 characters what you would like to work on here.",
    test: (v) => v.length >= 80,
  },
  "app-auth": {
    message: "Choose whether you are authorised to work in the US.",
  },
};

export function JobPage({ job }: { job: Job }) {
  const form = useFormFlow(rules, 1400);
  const e = form.errors;
  const [why, setWhy] = useState("");
  const others = jobs.filter((j) => j.slug !== job.slug).slice(0, 3);

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <Link to="/careers" className="back">
            <ArrowLeft aria-hidden="true" size={16} /> All roles
          </Link>
          <h1>{job.title}</h1>
          <p className="lede">{job.summary}</p>
          <dl className="facts facts-row light tnum">
            <div>
              <dt>Team</dt>
              <dd>{job.team}</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>{job.location}</dd>
            </div>
            <div>
              <dt>Type</dt>
              <dd>{job.type}</dd>
            </div>
            <div>
              <dt>Salary</dt>
              <dd>{job.salary}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="section tight">
        <div className="wrap job-grid">
          <div className="prose">
            <h2>What you will do</h2>
            <ul>
              {job.doing.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            <h2>What you bring</h2>
            <ul>
              {job.bring.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            <h2>Good to have</h2>
            <ul>
              {job.bonus.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            <p>
              Questions about the role? Write to{" "}
              <a href={`mailto:${brand.careersEmail}`}>{brand.careersEmail}</a>.
            </p>
          </div>

          <div className="apply" aria-live="polite">
            {form.status === "done" ? (
              <div className="success">
                <CircleCheck aria-hidden="true" size={40} />
                <h2 tabIndex={-1} ref={focusOnMount}>
                  Application received.
                </h2>
                <p>
                  Someone on the {job.team} team will read it this week and
                  reply within five working days, whatever the answer.
                </p>
                <p className="fine">
                  This is a demo: nothing was uploaded or sent.
                </p>
                <Link to="/careers" className="btn btn-dark">
                  See other roles
                </Link>
              </div>
            ) : (
              <form
                noValidate
                className="form"
                onSubmit={(ev) => form.submit(ev)}
                onInput={(ev) =>
                  form.clear((ev.target as HTMLInputElement).name)
                }
              >
                <h2>Apply</h2>
                <div className="field">
                  <label htmlFor="app-name">Full name</label>
                  <input
                    required
                    autoComplete="name"
                    {...described("app-name", e["app-name"])}
                  />
                  {e["app-name"] && (
                    <p className="field-error" id="app-name-error">
                      {e["app-name"]}
                    </p>
                  )}
                </div>
                <div className="field">
                  <label htmlFor="app-email">Email</label>
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    {...described("app-email", e["app-email"])}
                  />
                  {e["app-email"] && (
                    <p className="field-error" id="app-email-error">
                      {e["app-email"]}
                    </p>
                  )}
                </div>
                <div className="field">
                  <label htmlFor="app-link">
                    Portfolio, GitHub or LinkedIn{" "}
                    <span className="optional">optional</span>
                  </label>
                  <input
                    type="url"
                    placeholder="https://"
                    {...described("app-link", e["app-link"])}
                  />
                  {e["app-link"] && (
                    <p className="field-error" id="app-link-error">
                      {e["app-link"]}
                    </p>
                  )}
                </div>
                <div className="field">
                  <label htmlFor="app-cv">CV (PDF)</label>
                  <input
                    type="file"
                    accept="application/pdf,.pdf"
                    required
                    {...described("app-cv", e["app-cv"], true)}
                  />
                  <p className="hint" id="app-cv-hint">
                    PDF, up to 5 MB.
                  </p>
                  {e["app-cv"] && (
                    <p className="field-error" id="app-cv-error">
                      {e["app-cv"]}
                    </p>
                  )}
                </div>
                <div className="field">
                  <label htmlFor="app-why">
                    What would you like to work on here?
                  </label>
                  <textarea
                    rows={5}
                    required
                    minLength={80}
                    value={why}
                    onChange={(ev) => setWhy(ev.target.value)}
                    {...described("app-why", e["app-why"], true)}
                  />
                  <p className="hint tnum" id="app-why-hint">
                    {why.trim().length < 80
                      ? `${80 - why.trim().length} more characters, at least`
                      : "Thank you, that is plenty."}
                  </p>
                  {e["app-why"] && (
                    <p className="field-error" id="app-why-error">
                      {e["app-why"]}
                    </p>
                  )}
                </div>
                <div
                  className="field"
                  role="radiogroup"
                  aria-labelledby="app-auth-label"
                  aria-describedby={
                    e["app-auth"] ? "app-auth-error" : undefined
                  }
                >
                  <p className="label" id="app-auth-label">
                    Authorised to work in the US?
                  </p>
                  <div className="segmented">
                    <label>
                      <input type="radio" name="app-auth" value="yes" />
                      <span>Yes</span>
                    </label>
                    <label>
                      <input type="radio" name="app-auth" value="sponsor" />
                      <span>Need sponsorship</span>
                    </label>
                  </div>
                  {e["app-auth"] && (
                    <p className="field-error" id="app-auth-error">
                      {e["app-auth"]}
                    </p>
                  )}
                </div>
                <button
                  className="btn btn-primary"
                  disabled={form.status === "sending"}
                >
                  {form.status === "sending"
                    ? "Sending application…"
                    : "Send application"}
                </button>
                <p className="fine">Demo form: nothing leaves your browser.</p>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="section paper-2">
        <div className="wrap">
          <h2>Other open roles</h2>
          <ul className="job-list">
            {others.map((j) => (
              <li key={j.slug}>
                <Link to={`/careers/${j.slug}`}>
                  <span className="job-title">
                    <strong>{j.title}</strong>
                    <span>{j.summary}</span>
                  </span>
                  <span className="job-meta">
                    <span>{j.team}</span>
                    <span>{j.location}</span>
                  </span>
                  <ArrowRight aria-hidden="true" size={20} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
