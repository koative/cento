import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { brand, partners } from "../content";
import { Field, validate, type Errors } from "../components/Field";

const messages = {
  company: { missing: "Enter the brand or company name." },
  contact: { missing: "Enter your name so we know who to reply to." },
  email: {
    missing: "Enter a work email for the reply.",
    invalid: "That email needs an @ and a domain, e.g. you@brand.example.",
  },
  product: { missing: "Tell us which product you'd like in the shop." },
  format: { missing: "Choose the format you have in mind, or “Not sure yet”." },
  message: {
    missing:
      "Add a few lines about the product and timing (at least 30 characters).",
    invalid: "A little more detail, please: at least 30 characters.",
  },
};

export function Partners() {
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState("");
  const max = Math.max(...partners.audience.map((a) => a.share));

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, messages);
    setErrors(found);
    if (Object.keys(found).length) return;
    setBusy(true);
    const company = (form.elements.namedItem("company") as HTMLInputElement)
      .value;
    setTimeout(() => {
      setSent(company);
      setBusy(false);
    }, 900);
  }

  return (
    <>
      <header className="page-head wrap">
        <h1>{partners.title}</h1>
        <p className="lead">{partners.intro}</p>
      </header>

      <section className="section wrap kit" aria-labelledby="h-audience">
        <div>
          <h2 id="h-audience">Who watches</h2>
          <p>{partners.audienceNote}</p>
        </div>
        <ul className="bars">
          {partners.audience.map((a) => (
            <li key={a.label}>
              <span className="bar-label">{a.label}</span>
              <span className="bar" aria-hidden="true">
                <span style={{ width: (a.share / max) * 100 + "%" }} />
              </span>
              <span className="bar-value">{a.share}%</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="section wrap" aria-labelledby="h-formats">
        <div className="section-head">
          <h2 id="h-formats">Formats and rates</h2>
        </div>
        <div className="table-scroll">
          <table className="rates">
            <thead>
              <tr>
                <th scope="col">Format</th>
                <th scope="col">What it is</th>
                <th scope="col">Rate</th>
                <th scope="col">Note</th>
              </tr>
            </thead>
            <tbody>
              {partners.formats.map((f) => (
                <tr key={f.name}>
                  <th scope="row">{f.name}</th>
                  <td>{f.length}</td>
                  <td className="num">{f.price}</td>
                  <td>{f.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap rules" aria-labelledby="h-rules">
        <h2 id="h-rules">House rules for sponsors</h2>
        <dl>
          {partners.rules.map((r) => (
            <div key={r.title}>
              <dt>{r.title}</dt>
              <dd>{r.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="section wrap past" aria-labelledby="h-past">
        <div>
          <h2 id="h-past">Recent partners</h2>
          <ul>
            {partners.past.map((p) => (
              <li key={p.brand}>
                <strong>{p.brand}</strong>
                <span>{p.what}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>How it works</h2>
          <ol className="steps">
            {partners.steps.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section wrap enquiry" aria-labelledby="h-enquiry">
        <div className="join-copy">
          <h2 id="h-enquiry">Send an enquiry</h2>
          <p>
            Prefer email? Write to{" "}
            <a href={"mailto:" + brand.partnersEmail}>{brand.partnersEmail}</a>.
            We reply within five working days, either way.
          </p>
          <p className="page-note">Demo form: nothing is sent anywhere.</p>
        </div>
        {sent ? (
          <div className="confirmation" aria-live="polite">
            <CheckCircle2 size={40} aria-hidden="true" />
            <h3>Thanks, {sent}. Enquiry received.</h3>
            <p>
              Jess reads every one. Expect a straight yes or no within five
              working days, and a shipping address for the four-week test if
              it's a yes.
            </p>
          </div>
        ) : (
          <form className="form" noValidate onSubmit={submit} aria-busy={busy}>
            <div className="field-row">
              <Field
                label="Brand or company"
                name="company"
                required
                autoComplete="organization"
                error={errors.company}
              />
              <Field
                label="Your name"
                name="contact"
                required
                autoComplete="name"
                error={errors.contact}
              />
            </div>
            <div className="field-row">
              <Field
                label="Work email"
                name="email"
                type="email"
                required
                autoComplete="email"
                error={errors.email}
              />
              <Field
                as="select"
                label="Format"
                name="format"
                required
                defaultValue=""
                error={errors.format}
              >
                <option value="" disabled>
                  Choose…
                </option>
                {partners.formats.map((f) => (
                  <option key={f.name}>{f.name}</option>
                ))}
                <option>Not sure yet</option>
              </Field>
            </div>
            <Field
              label="Product"
              name="product"
              required
              placeholder="e.g. 6-inch F-clamps"
              error={errors.product}
            />
            <Field
              as="textarea"
              label="About the product and timing"
              name="message"
              required
              minLength={30}
              error={errors.message}
            />
            <button
              type="submit"
              className="btn btn-spark btn-wide"
              disabled={busy}
            >
              {busy ? "Sending…" : "Send enquiry"}
            </button>
          </form>
        )}
      </section>
    </>
  );
}
