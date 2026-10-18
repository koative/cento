import { CircleCheck } from "lucide-react";
import { Link } from "../router";
import { brand, contact } from "../content";
import { EMAIL, Field, useForm } from "../components/form";

const blank = {
  name: "",
  email: "",
  company: "",
  size: "",
  interest: "",
  message: "",
  consent: "",
};

export default function Contact() {
  const form = useForm(blank, (v) => ({
    name: v.name.trim()
      ? undefined
      : "Add your name so we know who to reply to.",
    email: !v.email.trim()
      ? "Add your work email; that is where the reply goes."
      : !EMAIL.test(v.email)
        ? "That email looks incomplete. Use the form name@company.com."
        : undefined,
    company: v.company.trim() ? undefined : "Add your company name.",
    size: v.size
      ? undefined
      : "Choose your team size so we can suggest the right plan.",
    message:
      v.message.trim().length < 20
        ? "Describe the process in a sentence or two (at least 20 characters), e.g. which tools and who is involved."
        : undefined,
    consent: v.consent
      ? undefined
      : "Tick the box so we are allowed to email you back.",
  }));

  return (
    <>
      <header className="page-head wrap">
        <h1>{contact.heading}</h1>
        <p className="lede">{contact.lede}</p>
      </header>
      <div className="wrap contact-grid">
        <div aria-live="polite">
          {form.status === "done" ? (
            <div className="form-done">
              <CircleCheck size={28} aria-hidden />
              <h2>
                Thanks, {form.values.name.split(" ")[0]}. Your request is in.
              </h2>
              <p>
                A solutions engineer will reply to {form.values.email} within
                one working day with a first workflow for {form.values.company}.
                In the meantime, the demo workspace is open.
              </p>
              <div className="actions">
                <Link to="/app" className="btn btn-plum">
                  Open the demo workspace
                </Link>
                <button
                  type="button"
                  className="btn btn-line"
                  onClick={form.reset}
                >
                  Send another request
                </button>
              </div>
            </div>
          ) : (
            <form noValidate onSubmit={form.submit} className="form">
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
                  label="Work email"
                  type="email"
                  autoComplete="email"
                  required
                />
              </div>
              <div className="form-row">
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
                name="interest"
                label="Interested in (optional)"
                options={contact.interests}
              />
              <Field
                form={form}
                name="message"
                label="What do you want to automate?"
                hint="Name the tools and the handoff: “When a deal is won in our CRM, someone sets up a folder and a channel.”"
                multiline
                required
              />
              <Field
                form={form}
                name="consent"
                type="checkbox"
                label="Flux may email me about this request. Nothing else."
              />
              <button
                className="btn btn-plum btn-lg"
                disabled={form.status === "sending"}
              >
                {form.status === "sending" ? "Sending…" : "Send request"}
              </button>
              <p className="quiet-note">
                This is a demo form: nothing is sent anywhere.
              </p>
            </form>
          )}
        </div>
        <aside className="contact-side" aria-labelledby="expect-h">
          <h2 id="expect-h">What happens next</h2>
          <ol className="next-steps">
            {contact.expect.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ol>
          <p>
            Prefer email?{" "}
            <a href={`mailto:${brand.salesEmail}`}>{brand.salesEmail}</a>
            <br />
            Or call{" "}
            <a href={`tel:${brand.phone.replace(/\s/g, "")}`}>{brand.phone}</a>,
            weekdays 8–5 Pacific.
          </p>
        </aside>
      </div>
    </>
  );
}
