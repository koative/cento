import { useRef, useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import { brand, contact, projectTypes } from "../content";
import {
  Field,
  Select,
  TextArea,
  validate,
  type Errors,
} from "../components/Field";
import { hashQuery } from "../lib/format";

type Sent = { name: string; type: string; site: string; ref: string };

export function Contact() {
  const preset = hashQuery().get("type") ?? "";
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState<Sent | null>(null);
  const status = useRef<HTMLDivElement>(null);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, {
      name: { missing: "Tell us your name so we know who to reply to." },
      email: {
        missing: "Enter an email address for our reply.",
        invalid:
          "Check the email address, it needs an @ and a domain, like name@example.com.",
      },
      phone: {
        missing: "",
        invalid:
          "Use digits, spaces and an optional + only, for example +45 31 22 40 18.",
      },
      type: { missing: "Choose the kind of building you are planning." },
      site: {
        missing: "Tell us where the site is, a town or a district is enough.",
      },
      area: {
        missing: "",
        invalid:
          "Enter an approximate floor area between 20 and 50,000 m², or leave it empty.",
      },
      budget: {
        missing: "Pick a budget range, “Not sure yet” is a fine answer.",
      },
      start: { missing: "Choose when you would like to start." },
      message: {
        missing: "Describe the project in a few sentences.",
        invalid:
          "Add a little more, at least 40 characters, so we can prepare for the first conversation.",
        check: (v) => v.length >= 40,
      },
    });
    setErrors(found);
    if (Object.keys(found).length) return;

    const data = new FormData(form);
    setBusy(true);
    window.setTimeout(() => {
      setBusy(false);
      setSent({
        name: String(data.get("name")).trim().split(" ")[0],
        type: String(data.get("type")),
        site: String(data.get("site")).trim(),
        ref:
          "F-" +
          new Date().getFullYear() +
          "-" +
          String(Math.floor(1000 + Math.random() * 9000)),
      });
      requestAnimationFrame(() => status.current?.focus());
    }, 1100);
  }

  return (
    <div className="wrap page contact">
      <header className="page-head">
        <h1>{contact.title}</h1>
        <p>{contact.lead}</p>
      </header>

      <div className="contact-grid">
        <div className="contact-main">
          <div
            ref={status}
            tabIndex={-1}
            aria-live="polite"
            className="contact-status"
          >
            {sent && (
              <div className="success">
                <Check size={28} aria-hidden="true" />
                <h2>Thank you, {sent.name}.</h2>
                <p>
                  Your enquiry about a {sent.type.toLowerCase()} project in{" "}
                  {sent.site} is with us, reference{" "}
                  <strong className="num">{sent.ref}</strong>. A partner will
                  reply within three working days.
                </p>
                <p className="small">
                  This is a demo: nothing was sent or stored.
                </p>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setSent(null)}
                >
                  Send another enquiry
                </button>
              </div>
            )}
          </div>

          {!sent && (
            <form
              className="enquiry"
              onSubmit={submit}
              noValidate
              aria-busy={busy}
            >
              <fieldset disabled={busy}>
                <legend className="visually-hidden">About you</legend>
                <div className="form-row">
                  <Field
                    label="Your name"
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
                </div>
                <div className="form-row">
                  <Field
                    label="Phone (optional)"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    pattern="[+]?[0-9 ]{6,20}"
                    error={errors.phone}
                  />
                  <Field
                    label="Organisation (optional)"
                    name="org"
                    autoComplete="organization"
                  />
                </div>
              </fieldset>

              <fieldset disabled={busy}>
                <legend>The project</legend>
                <div className="form-row">
                  <Select
                    label="Type of building"
                    name="type"
                    required
                    options={projectTypes}
                    defaultValue={
                      projectTypes.includes(preset as never) ? preset : ""
                    }
                    error={errors.type}
                  />
                  <Field
                    label="Site location"
                    name="site"
                    required
                    placeholder="Town or district"
                    error={errors.site}
                  />
                </div>
                <div className="form-row">
                  <Field
                    label="Approximate floor area, m² (optional)"
                    name="area"
                    type="number"
                    inputMode="numeric"
                    min={20}
                    max={50000}
                    error={errors.area}
                  />
                  <Select
                    label="When would you like to start?"
                    name="start"
                    required
                    options={contact.starts}
                    error={errors.start}
                  />
                </div>

                <div
                  className="field"
                  data-invalid={errors.budget ? "" : undefined}
                >
                  <fieldset
                    className="radio-group"
                    aria-describedby={
                      errors.budget ? "f-budget-error" : undefined
                    }
                  >
                    <legend>Construction budget</legend>
                    <div className="radio-options">
                      {contact.budgets.map((b) => (
                        <label key={b}>
                          <input
                            type="radio"
                            name="budget"
                            value={b}
                            required
                          />
                          <span>{b}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  {errors.budget && (
                    <p className="field-error" id="f-budget-error">
                      {errors.budget}
                    </p>
                  )}
                </div>

                <TextArea
                  label="About the project"
                  name="message"
                  required
                  minLength={40}
                  rows={6}
                  hint="What you want to build, who it is for, and anything you already know about the site."
                  error={errors.message}
                />
              </fieldset>

              <div className="form-submit">
                <button type="submit" className="btn" disabled={busy}>
                  {busy ? "Sending…" : "Send enquiry"}{" "}
                  {!busy && <ArrowRight size={16} aria-hidden="true" />}
                </button>
                <p className="small">Demo form: nothing is sent or stored.</p>
              </div>
            </form>
          )}
        </div>

        <aside className="contact-side">
          <h2>What happens next</h2>
          <ol className="next-steps">
            {contact.next.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ol>
          <h2>Studio</h2>
          <address>
            {brand.address.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </address>
          <p>{brand.hours}</p>
          <p>
            <a href={"mailto:" + brand.email}>{brand.email}</a>
            <br />
            <a href={brand.phoneHref}>{brand.phone}</a>
          </p>
          <p className="small">
            Press: <a href={"mailto:" + brand.press}>{brand.press}</a>
            <br />
            Jobs: <a href={"mailto:" + brand.jobs}>{brand.jobs}</a>
          </p>
        </aside>
      </div>
    </div>
  );
}
