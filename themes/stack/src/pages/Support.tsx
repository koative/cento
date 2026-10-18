import { useEffect, useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import { Link } from "../router";
import { brand, support } from "../content";
import { EMAIL, Field, useForm } from "../components/form";

const initial = {
  name: "",
  email: "",
  project: "",
  topic: "",
  sdk: "",
  severity: "normal",
  subject: "",
  message: "",
};

export default function Support() {
  const form = useForm(initial, (v) => ({
    name: v.name.trim()
      ? undefined
      : "Enter your name so we know who to reply to.",
    email: !v.email.trim()
      ? "Enter the email address we should reply to."
      : !EMAIL.test(v.email)
        ? "That email is missing something. Check for an @ and a domain such as .com."
        : undefined,
    project:
      v.project.trim() && !/^prj_[a-z0-9]{2,}$/i.test(v.project.trim())
        ? "Project ids start with prj_ followed by letters or numbers, like prj_81. Leave it blank if you don't have one."
        : undefined,
    topic: v.topic
      ? undefined
      : "Choose a topic so the right engineer picks this up.",
    subject:
      v.subject.trim().length >= 6
        ? undefined
        : "Add a subject of at least 6 characters, such as “jobs stuck in active”.",
    message:
      v.message.trim().length >= 40
        ? undefined
        : `Describe what happened in at least 40 characters (${v.message.trim().length} so far). Include a request id if you have one.`,
  }));
  const v = form.values;
  const panel = useRef<HTMLElement>(null);
  // The long form collapses into a short confirmation; bring it into view so it isn't left above the fold.
  useEffect(() => {
    if (form.status === "done")
      panel.current?.scrollIntoView({ block: "start" });
  }, [form.status]);
  const ticket = `SUP-${(48213 + v.subject.length * 7 + v.message.length).toString()}`;

  return (
    <div className="wrap page support">
      <header className="page-head">
        <h1>{support.h1}</h1>
        <p className="lead">{support.lead}</p>
      </header>

      <div className="support-grid">
        <section
          className="panel support-form"
          aria-labelledby="form-h"
          ref={panel}
        >
          <h2 id="form-h">Open a ticket</h2>
          <div role="status" aria-live="polite">
            {form.status === "done" && (
              <div className="success">
                <CheckCircle2 size={28} aria-hidden />
                <h3>
                  Ticket <span className="tabular">{ticket}</span> is open.
                </h3>
                <p>
                  Thanks, {v.name.trim().split(" ")[0]}. A{" "}
                  {v.topic.toLowerCase()} ticket with {v.severity} priority is
                  in the queue, and a copy is on its way to {v.email}.{" "}
                  {v.severity === "urgent"
                    ? "Urgent tickets page the on-call engineer on Enterprise plans."
                    : "Expect a first reply within one working day on Team plans."}
                </p>
                <button
                  type="button"
                  className="btn btn-quiet"
                  onClick={form.reset}
                >
                  Open another ticket
                </button>
              </div>
            )}
          </div>
          {form.status !== "done" && (
            <form onSubmit={form.submit} noValidate>
              <div className="form-row">
                <Field
                  form={form}
                  name="name"
                  label="Your name"
                  autoComplete="name"
                  required
                />
                <Field
                  form={form}
                  name="email"
                  label="Email"
                  type="email"
                  autoComplete="email"
                  required
                />
              </div>
              <div className="form-row">
                <Field
                  form={form}
                  name="topic"
                  label="Topic"
                  options={support.topics}
                  required
                />
                <Field
                  form={form}
                  name="sdk"
                  label="Client and version"
                  options={support.sdks}
                  hint="Optional."
                />
              </div>
              <Field
                form={form}
                name="project"
                label="Project id"
                placeholder="prj_81"
                hint="Optional. Found under Settings → Project."
                className="mono"
                spellCheck={false}
              />
              <fieldset className="field radios">
                <legend>Severity</legend>
                {support.severities.map((s) => (
                  <label key={s.value} className="radio">
                    <input
                      type="radio"
                      name="severity"
                      value={s.value}
                      checked={v.severity === s.value}
                      onChange={() => form.set("severity", s.value)}
                    />
                    <span>
                      <strong>{s.label}</strong> {s.hint}
                    </span>
                  </label>
                ))}
              </fieldset>
              <Field form={form} name="subject" label="Subject" required />
              <Field
                form={form}
                name="message"
                label="What happened?"
                multiline
                required
                minLength={40}
                placeholder="What you expected, what you got, and any request ids (req_…)."
              />
              <div className="form-foot">
                <button
                  className="btn btn-primary"
                  disabled={form.status === "sending"}
                >
                  {form.status === "sending"
                    ? "Opening ticket…"
                    : "Open ticket"}
                </button>
                <p className="quiet-note">
                  Demo form: nothing is sent anywhere.
                </p>
              </div>
            </form>
          )}
        </section>

        <aside className="support-side">
          <section aria-labelledby="resp-h">
            <h2 id="resp-h">{support.response.heading}</h2>
            <div className="table-scroll">
              <table className="data">
                <thead>
                  <tr>
                    <th scope="col">Plan</th>
                    <th scope="col">First reply</th>
                    <th scope="col">Hours</th>
                  </tr>
                </thead>
                <tbody>
                  {support.response.rows.map((r) => (
                    <tr key={r.plan}>
                      <th scope="row">{r.plan}</th>
                      <td>{r.first}</td>
                      <td>{r.hours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="contact-lines">
              <a href={`mailto:${brand.email}`}>{brand.email}</a>
              <a href={`tel:${brand.phone.replace(/\s/g, "")}`}>
                {brand.phone}
              </a>
            </p>
          </section>

          <section aria-labelledby="faq-h" className="faq">
            <h2 id="faq-h">{support.faq.heading}</h2>
            {support.faq.items.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
            <p>
              Still lost? <Link to="/search">Search the docs</Link>.
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}
