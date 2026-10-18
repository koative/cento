import { useEffect, useRef, useState } from "react";
import { brand, contact, helpArticles } from "../content";
import { Link } from "../router";
import { EMAIL, Field, useForm } from "../components/form";
import { PageHead } from "../components/Parts";

const empty = {
  name: "",
  email: "",
  topic: "",
  device: "",
  version: "",
  message: "",
  diagnostics: "yes",
};

export default function Contact() {
  const [ticket, setTicket] = useState("");
  const form = useForm(
    empty,
    (v) => ({
      name: v.name.trim()
        ? undefined
        : "Tell us what to call you. A first name is fine.",
      email: !v.email.trim()
        ? "Enter an email so we can reply."
        : !EMAIL.test(v.email)
          ? "That email looks incomplete. Check it has a name, an @ and a domain."
          : undefined,
      topic: v.topic
        ? undefined
        : "Choose the closest topic so the right person picks this up.",
      device: v.device
        ? undefined
        : "Choose the device you see the problem on.",
      version:
        !v.version || /^\d+(\.\d+){0,2}$/.test(v.version.trim())
          ? undefined
          : "Use the number from You → About, like 4.2 or 4.1.3.",
      message:
        v.message.trim().length >= 20
          ? undefined
          : `Add a little more detail: at least 20 characters (you have ${v.message.trim().length}). What did you expect, and what happened?`,
    }),
    () => setTicket(`ST-${48210 + Math.floor(Math.random() * 90)}`),
  );

  const sent = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (form.status !== "done") return;
    sent.current?.focus({ preventScroll: true });
    sent.current?.scrollIntoView({ block: "center" });
  }, [form.status]);

  return (
    <div className="page">
      <PageHead title={contact.hero.title} lede={contact.hero.lede} />

      <div className="contact wrap">
        <section aria-labelledby="form-title" className="contact-form">
          <h2 id="form-title">Send a message</h2>
          {form.status !== "done" ? (
            <form onSubmit={form.submit} noValidate>
              <div className="field-row">
                <Field
                  form={form}
                  name="name"
                  label="Your name"
                  autoComplete="given-name"
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
                  name="topic"
                  label="Topic"
                  options={contact.topics}
                  required
                />
                <Field
                  form={form}
                  name="device"
                  label="Device"
                  options={contact.devices}
                  required
                />
              </div>
              <Field
                form={form}
                name="version"
                label="App version (optional)"
                hint="Find it in You → About. Leave blank if unsure."
                inputMode="decimal"
              />
              <Field
                form={form}
                name="message"
                label="What's happening?"
                multiline
                required
              />
              <Field
                form={form}
                name="diagnostics"
                label="Attach diagnostics: reminder schedule, sync status and app version. Never habit names or notes."
                type="checkbox"
              />
              <button
                className="btn btn-primary"
                disabled={form.status === "sending"}
              >
                {form.status === "sending" ? "Sending…" : "Send to support"}
              </button>
            </form>
          ) : (
            <div className="sent" ref={sent} tabIndex={-1}>
              <p className="sent-title">Ticket {ticket} is open.</p>
              <p>
                Thanks, {form.values.name.trim()}. A reply will reach{" "}
                {form.values.email} within one working day. If you think of
                anything else, reply to that email rather than opening a new
                ticket.
              </p>
              <button
                type="button"
                className="btn btn-quiet"
                onClick={() => {
                  form.reset();
                  setTicket("");
                }}
              >
                Write another message
              </button>
            </div>
          )}
          <p
            className={form.status === "done" ? "sr-only" : "quiet-note"}
            role="status"
          >
            {form.status === "done"
              ? `Message sent. Ticket ${ticket} is open.`
              : "Demo form: nothing is sent anywhere."}
          </p>
        </section>

        <aside className="contact-aside" aria-labelledby="aside-title">
          <h2 id="aside-title">Before you write</h2>
          <ul>
            {helpArticles.slice(1, 5).map((a) => (
              <li key={a.slug}>
                <Link to={`/help/${a.slug}`}>{a.title}</Link>
              </li>
            ))}
          </ul>
          <h2>Hours</h2>
          <p>{contact.hours}</p>
          <h2>Email</h2>
          <p>
            <a href={`mailto:${brand.support}`}>{brand.support}</a>
          </p>
        </aside>
      </div>
    </div>
  );
}
