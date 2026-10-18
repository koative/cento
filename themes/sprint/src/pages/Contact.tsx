import { Check } from "lucide-react";
import { Link } from "../router";
import { brand, contact } from "../content";
import { EMAIL, Field, useForm } from "../components/form";

const FREE_MAIL = /@(gmail|yahoo|hotmail|outlook|icloud)\./i;

export default function Contact() {
  const form = useForm(
    {
      name: "",
      email: "",
      company: "",
      size: "",
      tool: "",
      message: "",
      consent: "",
    },
    (v) => ({
      name: v.name.trim() ? undefined : "Tell us who to reply to.",
      email: !v.email.trim()
        ? "Enter your work email so we can reply."
        : !EMAIL.test(v.email)
          ? "That email is missing something — check the part after the @."
          : FREE_MAIL.test(v.email)
            ? "Use your work address so we can set up a workspace for your company."
            : undefined,
      company: v.company.trim() ? undefined : "Add your company name.",
      size: v.size ? undefined : "Pick a team size — a rough range is fine.",
      message:
        v.message.trim().length >= 20
          ? undefined
          : "Write a sentence or two about how you plan today (at least 20 characters).",
      consent: v.consent
        ? undefined
        : "Tick the box so we’re allowed to email you back.",
    }),
  );

  return (
    <section className="page-head contact">
      <div className="wrap contact-grid">
        <div>
          <h1>{contact.h1}</h1>
          <p className="lede">{contact.lede}</p>
          <ul className="ticks">
            {contact.promises.map((p) => (
              <li key={p}>
                <Check size={18} aria-hidden />
                {p}
              </li>
            ))}
          </ul>
          <address className="contact-direct">
            <span>Prefer email or a phone?</span>
            <a href={`mailto:${brand.salesEmail}`}>{brand.salesEmail}</a>
            <a href={brand.phoneHref}>{brand.phone}</a>
          </address>
        </div>

        <div className="form-card" aria-live="polite">
          {form.status === "done" ? (
            <div className="form-success">
              <h2>Thanks, {form.values.name.split(" ")[0]}.</h2>
              <p>
                We will write to <strong>{form.values.email}</strong> within one
                business day with two times for a call, and a workspace already
                set up for a {form.values.size} person team.
              </p>
              <div className="actions">
                <Link to="/app" className="btn btn-primary">
                  Explore the demo meanwhile
                </Link>
                <button
                  type="button"
                  className="btn btn-line"
                  onClick={form.reset}
                >
                  Send another
                </button>
              </div>
            </div>
          ) : (
            <form noValidate onSubmit={form.submit}>
              <h2>Tell us about your team</h2>
              <div className="field-row">
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
                  label="Work email"
                  type="email"
                  autoComplete="email"
                  required
                />
              </div>
              <div className="field-row">
                <Field
                  form={form}
                  name="company"
                  label="Company"
                  autoComplete="organization"
                  required
                />
                <Field
                  form={form}
                  name="size"
                  label="Team size"
                  options={contact.sizes}
                  required
                />
              </div>
              <Field
                form={form}
                name="tool"
                label="What do you plan with today? (optional)"
                options={contact.tools}
              />
              <Field
                form={form}
                name="message"
                label="How does planning work today?"
                multiline
                required
                hint="Cycle length, how many teams, what you’d change first."
              />
              <Field
                form={form}
                name="consent"
                label="Sprint may email me about this request."
                type="checkbox"
              />
              <button
                className="btn btn-primary btn-lg"
                disabled={form.status === "sending"}
              >
                {form.status === "sending" ? "Sending…" : "Request a call"}
              </button>
              <p className="fine">
                This is a demo form: nothing is sent anywhere.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
