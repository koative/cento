import { CheckCircle2 } from "lucide-react";
import { contact } from "../content";
import { EMAIL, Field, useForm } from "../components/form";

const FREE_MAIL = /@(gmail|yahoo|hotmail|outlook|icloud|proton)\./i;

export default function Contact() {
  const form = useForm(
    { name: "", email: "", company: "", size: "", use: "", message: "" },
    (v) => ({
      name: v.name.trim()
        ? undefined
        : "Enter your name so the specialist knows who to ask for.",
      email: !v.email.trim()
        ? "Enter your work email so we can reply."
        : !EMAIL.test(v.email)
          ? "That email looks incomplete. Check it has a name, an @ and a domain."
          : FREE_MAIL.test(v.email)
            ? "Use your work address so we can set up a workspace for your company."
            : undefined,
      company: v.company.trim()
        ? undefined
        : "Enter your company or organisation name.",
      size: v.size
        ? undefined
        : "Choose roughly how many people write for your team.",
      use: v.use
        ? undefined
        : "Choose the kind of writing you would use Lucid for first.",
      message:
        v.message.trim().length >= 20
          ? undefined
          : "Tell us a little more: at least 20 characters about what your team writes.",
    }),
  );

  return (
    <>
      <header className="page-head wrap">
        <h1 className="display">{contact.heading}</h1>
        <p className="lede">{contact.lede}</p>
      </header>

      <div className="wrap form-layout">
        <div className="form-panel">
          {form.status === "done" ? (
            <div className="success" role="status" aria-live="polite">
              <CheckCircle2 size={28} aria-hidden />
              <h2>Request received</h2>
              <p>{contact.success.replace("{email}", form.values.email)}</p>
              <button
                type="button"
                className="btn btn-quiet"
                onClick={form.reset}
              >
                Send another request
              </button>
            </div>
          ) : (
            <form onSubmit={form.submit} noValidate className="form-grid">
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
              <div className="span-2">
                <Field
                  form={form}
                  name="use"
                  label="What will you write first?"
                  options={contact.uses}
                  required
                />
              </div>
              <div className="span-2">
                <Field
                  form={form}
                  name="message"
                  label="What does your team write, and what slows it down?"
                  hint="For example: 400 support replies a day, and every agent has their own tone."
                  multiline
                  required
                />
              </div>
              <div className="span-2 form-foot">
                <button
                  className="btn btn-primary btn-large"
                  disabled={form.status === "sending"}
                >
                  {form.status === "sending"
                    ? "Sending…"
                    : "Request a trial workspace"}
                </button>
                <p className="quiet-note">{contact.note}</p>
              </div>
              <p className="sr-only" aria-live="polite">
                {form.status === "sending" ? "Sending your request" : ""}
              </p>
            </form>
          )}
        </div>
        <aside className="form-aside" aria-label="About this form">
          {contact.aside.map((a) => (
            <section key={a.heading}>
              <h2>{a.heading}</h2>
              <p>{a.text}</p>
            </section>
          ))}
        </aside>
      </div>
    </>
  );
}
