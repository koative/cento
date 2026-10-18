import { useEffect, useRef, useState } from "react";
import { Link } from "../router";
import { access, brand, pricing, systems } from "../content";
import { EMAIL, Field, useForm } from "../components/form";
import { PageHead } from "../components/PageHead";

const initial = {
  name: "",
  email: "",
  org: "",
  role: "",
  use: "",
  system: "",
  plan: "",
  hours: "",
  brief: "",
  terms: "",
};

export default function Access() {
  const [reference, setReference] = useState("");
  const done = useRef<HTMLDivElement>(null);
  const form = useForm(
    initial,
    (v) => {
      const hours = Number(v.hours);
      return {
        name:
          v.name.trim().length < 2
            ? "Enter your full name so we know who to reply to."
            : undefined,
        email: !v.email.trim()
          ? "Enter an email address; it is where your account details will go."
          : !EMAIL.test(v.email)
            ? "That email looks incomplete. Check it has a name, an @ and a domain."
            : undefined,
        org: !v.org.trim()
          ? "Enter your university, laboratory or company. Write “Independent” if none."
          : undefined,
        role: !v.role ? "Choose the role that fits you best." : undefined,
        use: !v.use ? "Choose what you mainly plan to do." : undefined,
        system: !v.system ? "Choose a system, or “Not sure yet”." : undefined,
        hours:
          !v.hours.trim() ||
          !Number.isFinite(hours) ||
          hours < 0 ||
          hours > 1000
            ? "Enter an estimate between 0 and 1,000 QPU hours a month. A rough guess is fine."
            : undefined,
        brief:
          v.brief.trim().length < 40
            ? `Describe your workload in at least 40 characters (${v.brief.trim().length} so far): circuit size, depth, shots.`
            : undefined,
        terms:
          v.terms !== "yes"
            ? "Confirm you accept the acceptable-use policy to continue."
            : undefined,
      };
    },
    () => setReference(`HX-A-${String(Date.now()).slice(-5)}`),
  );

  useEffect(() => {
    if (form.status === "done")
      done.current?.scrollIntoView({ block: "center" });
  }, [form.status]);

  return (
    <>
      <PageHead title={access.heading} lead={access.lead} />
      <section className="wrap access-grid">
        <div className="access-form">
          {form.status === "done" ? (
            <div
              className="form-done"
              role="status"
              aria-live="polite"
              ref={done}
            >
              <h2>Request {reference} received</h2>
              <p>
                Thanks, {form.values.name.split(" ")[0]}. A physicist on our
                access team will reply to <strong>{form.values.email}</strong>{" "}
                within two working days. Your Open account on Firn 24 is ready
                as soon as you confirm that email.
              </p>
              <dl className="spec-list compact">
                <div>
                  <dt>Organisation</dt>
                  <dd>{form.values.org}</dd>
                </div>
                <div>
                  <dt>System</dt>
                  <dd>{form.values.system}</dd>
                </div>
                <div>
                  <dt>Plan</dt>
                  <dd>{form.values.plan || "Recommend one"}</dd>
                </div>
                <div>
                  <dt>Estimate</dt>
                  <dd>{form.values.hours} QPU h / month</dd>
                </div>
              </dl>
              <div className="actions">
                <Link to="/research" className="btn btn-primary">
                  Read the latest papers
                </Link>
                <button
                  type="button"
                  className="btn btn-quiet"
                  onClick={() => {
                    form.reset();
                    setReference("");
                  }}
                >
                  Send another request
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={form.submit} noValidate aria-label="Request access">
              <fieldset>
                <legend>About you</legend>
                <div className="field-row">
                  <Field
                    form={form}
                    name="name"
                    label="Full name"
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
                <div className="field-row">
                  <Field
                    form={form}
                    name="org"
                    label="Organisation"
                    autoComplete="organization"
                    required
                  />
                  <Field
                    form={form}
                    name="role"
                    label="Role"
                    options={access.roles}
                    required
                  />
                </div>
              </fieldset>
              <fieldset>
                <legend>Your workload</legend>
                <div className="field-row">
                  <Field
                    form={form}
                    name="use"
                    label="Main use"
                    options={access.uses}
                    required
                  />
                  <Field
                    form={form}
                    name="system"
                    label="System"
                    options={[...systems.map((s) => s.name), "Not sure yet"]}
                    required
                  />
                </div>
                <div className="field-row">
                  <Field
                    form={form}
                    name="plan"
                    label="Plan (optional)"
                    options={pricing.plans.map((p) => p.name)}
                  />
                  <Field
                    form={form}
                    name="hours"
                    label="QPU hours per month"
                    type="number"
                    inputMode="decimal"
                    min={0}
                    max={1000}
                    step={0.5}
                    hint="Open covers about 0.17 h."
                    required
                  />
                </div>
                <Field
                  form={form}
                  name="brief"
                  label="What do you want to run?"
                  multiline
                  hint="Circuit width and depth, shots, and anything you need from us, such as pulse access or reserved time."
                  required
                />
              </fieldset>
              <Field
                form={form}
                name="terms"
                label="I accept the acceptable-use policy and understand calibration data is public."
                type="checkbox"
                required
              />
              <div className="form-submit">
                <button
                  className="btn btn-primary"
                  disabled={form.status === "sending"}
                >
                  {form.status === "sending"
                    ? "Sending request…"
                    : "Send request"}
                </button>
                <p className="quiet-note">
                  Demo form: nothing is sent anywhere.
                </p>
              </div>
            </form>
          )}
        </div>

        <aside className="access-side" aria-label="What happens next">
          <h2>What happens next</h2>
          <dl>
            {access.expect.map((e) => (
              <div key={e.title}>
                <dt>{e.title}</dt>
                <dd>{e.text}</dd>
              </div>
            ))}
          </dl>
          <p>
            Prefer email? Write to{" "}
            <a href={`mailto:${brand.access}`}>{brand.access}</a> or call{" "}
            <a href={`tel:${brand.phone.replace(/\s/g, "")}`}>{brand.phone}</a>,
            weekdays 9:00–17:00 Mountain Time.
          </p>
        </aside>
      </section>
    </>
  );
}
