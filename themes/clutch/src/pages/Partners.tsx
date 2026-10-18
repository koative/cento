import { useState, type FormEvent } from "react";
import { audience, brand, images, partnerFormats, partners } from "../content";
import { Field, useErrors, validate } from "../components/Field";

const messages: Record<string, string> = {
  company: "Enter your company or brand name.",
  contact: "Enter the name of the person we should reply to.",
  email: "Enter a work email like name@company.com.",
  budget: "Choose a budget range — a rough one is fine.",
  interest: "Pick at least one format you're interested in.",
  message:
    "Tell us a little about the brand and the audience you want to reach (at least 30 characters).",
};

const budgets = [
  "Under €25,000",
  "€25,000–€75,000",
  "€75,000–€200,000",
  "Over €200,000",
  "Not sure yet",
];

export function Partners() {
  const { errors, setErrors, onChange } = useErrors();
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState("");

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, messages);
    const picked = form.querySelectorAll<HTMLInputElement>(
      'input[name="interest"]:checked',
    ).length;
    if (!picked) found.interest = messages.interest;
    setErrors(found);
    if (Object.keys(found).length) {
      if (!picked && Object.keys(found).length === 1)
        form.querySelector<HTMLInputElement>('input[name="interest"]')?.focus();
      return;
    }
    setBusy(true);
    const company = (form.elements.namedItem("company") as HTMLInputElement)
      .value;
    window.setTimeout(() => {
      setBusy(false);
      setSent(company);
      form.reset();
    }, 900);
  };

  return (
    <>
      <header className="page-head wrap partners-head">
        <div>
          <h1>Partners</h1>
          <p className="lede">
            Our partners are on the jersey, on the stream and in the room on
            match night. We work with a small number of brands, for years at a
            time, and we only sign ones the players would choose themselves.
          </p>
        </div>
        <img
          src={images.keyboard}
          alt="A mechanical keyboard on the Clutch practice floor, keys lit from beneath."
          width={1400}
          height={841}
          className="cut"
        />
      </header>

      <section className="wrap section" aria-labelledby="current-h">
        <h2 id="current-h">Who we work with</h2>
        <ul className="partner-list">
          {partners.map((p) => (
            <li key={p.name}>
              <strong className="partner-name">{p.name}</strong>
              <span className="partner-role">
                {p.role} · since <span className="num">{p.since}</span>
              </span>
              <p>{p.what}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section section-deck">
        <div className="wrap formats">
          <h2>What a partnership looks like</h2>
          <dl>
            {partnerFormats.map((f) => (
              <div key={f.title}>
                <dt>{f.title}</dt>
                <dd>{f.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="wrap section audience" aria-labelledby="aud-h">
        <h2 id="aud-h">Who's watching</h2>
        <table className="data-table">
          <caption>{audience.note}</caption>
          <tbody>
            {audience.rows.map((r) => (
              <tr key={r.label}>
                <th scope="row">{r.label}</th>
                <td className="num">{r.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="wrap section enquiry" aria-labelledby="enq-h">
        <div className="enquiry-intro">
          <h2 id="enq-h">Start a conversation</h2>
          <p>
            Tell us who you are and what you'd like to do together. Our
            partnerships team replies within three working days, usually with a
            call and an invitation to a match night.
          </p>
          <p>
            Prefer email?{" "}
            <a href={`mailto:${brand.partnersEmail}`}>{brand.partnersEmail}</a>
          </p>
        </div>

        {sent ? (
          <div className="form-success big">
            <h3>Thanks, {sent}.</h3>
            <p>
              Your enquiry is with the partnerships team. Expect a reply within
              three working days.
            </p>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setSent("")}
            >
              Send another enquiry
            </button>
          </div>
        ) : (
          <form
            className="enquiry-form"
            noValidate
            onSubmit={submit}
            onChange={onChange}
            aria-busy={busy}
          >
            <div className="field-row">
              <Field
                label="Company or brand"
                name="company"
                autoComplete="organization"
                required
                error={errors.company}
              />
              <Field
                label="Your name"
                name="contact"
                autoComplete="name"
                required
                error={errors.contact}
              />
            </div>
            <Field
              label="Work email"
              name="email"
              type="email"
              autoComplete="email"
              required
              error={errors.email}
            />
            <Field
              label="Budget for the first season"
              name="budget"
              error={errors.budget}
            >
              <select required defaultValue="">
                <option value="" disabled>
                  Choose a range
                </option>
                {budgets.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
            </Field>
            <fieldset
              className="choice choice-grid"
              data-invalid={errors.interest ? "" : undefined}
              aria-describedby={errors.interest ? "interest-err" : undefined}
              onChange={() =>
                errors.interest && setErrors(({ interest: _, ...rest }) => rest)
              }
            >
              <legend>Interested in</legend>
              {partnerFormats.map((f) => (
                <label key={f.title}>
                  <input type="checkbox" name="interest" value={f.title} />
                  <span>{f.title}</span>
                </label>
              ))}
              {errors.interest && (
                <p className="field-error" id="interest-err">
                  {errors.interest}
                </p>
              )}
            </fieldset>
            <Field
              label="What do you have in mind?"
              name="message"
              error={errors.message}
            >
              <textarea required minLength={30} rows={5} />
            </Field>
            <button type="submit" className="btn btn-wide" disabled={busy}>
              {busy ? "Sending…" : "Send enquiry"}
            </button>
            <p className="quiet">Demo form: nothing is sent anywhere.</p>
          </form>
        )}
        <p className="sr-only" aria-live="polite">
          {sent
            ? `Enquiry sent for ${sent}. Expect a reply within three working days.`
            : ""}
        </p>
      </section>
    </>
  );
}
