import { useState, type FormEvent } from "react";
import { audience, brand, images, partners, sponsorPackages } from "../content";
import { money, pause, useErrors, validate } from "../lib/forms";
import { Field } from "../components/Field";

export function Sponsors() {
  const { errors, setErrors, onChange } = useErrors();
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState("");

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, {
      company: "Tell us which company or studio you're writing from.",
      name: "Add your name so Theo knows who to reply to.",
      email: "Enter a work email like you@company.com.",
      package: "Choose a package, or ‘Not sure yet’.",
      message:
        "A sentence or two, please — at least 20 characters about what you'd like to do.",
    });
    setErrors(found);
    if (Object.keys(found).length) return;
    setBusy(true);
    await pause();
    setDone(String(new FormData(form).get("name")).split(" ")[0]);
    setBusy(false);
    form.reset();
  };

  return (
    <div className="wrap page">
      <header className="page-head">
        <h1>Partner with us</h1>
        <p className="lede">
          Partners keep Prism independent and tickets affordable. In return you
          meet 1,100 designers who chose to spend three days learning — and
          nobody pitches from the stage.
        </p>
      </header>

      <section className="section split">
        <h2>Who comes</h2>
        <div>
          <ul className="bars" aria-label="Prism 2026 attendees by discipline">
            {audience.map((a) => (
              <li key={a.label}>
                <span className="bar-label">{a.label}</span>
                <span className="bar" style={{ width: `${a.share * 2.4}%` }} />
                <span className="bar-value">{a.share}%</span>
              </li>
            ))}
          </ul>
          <p className="section-note">
            From Prism 2026 registration data: 1,100 attendees from 31
            countries; 62% work in-house, 38% in studios or independently.
          </p>
        </div>
      </section>

      <section className="section">
        <h2 className="h-section">Packages for 2027</h2>
        <ul className="packages">
          {sponsorPackages.map((p) => (
            <li key={p.id}>
              <div className="pk-head">
                <h3>{p.name}</h3>
                <p className="pk-price">{money(p.price)}</p>
                <p className="pk-avail">{p.available}</p>
              </div>
              <p className="pk-text">{p.text}</p>
              <ul className="pk-includes">
                {p.includes.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <p className="quiet-line">
          Prices exclude VAT. Every package can be split across two years.
        </p>
      </section>

      <section className="section">
        <h2 className="h-section">Our 2027 partners</h2>
        <ul className="partner-list">
          {partners.map((p) => (
            <li key={p.name}>
              <span className="partner-name">{p.name}</span>
              <span className="partner-tier">{p.tier}</span>
              <span className="partner-text">{p.text}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="section enquiry">
        <div>
          <h2>Start a conversation</h2>
          <p>
            Theo Brask looks after partnerships and replies within two working
            days. Prefer email?{" "}
            <a href={`mailto:${brand.partnersEmail}`}>{brand.partnersEmail}</a>
          </p>
          <img
            src={images.dinner.src}
            alt={images.dinner.alt}
            width={images.dinner.w}
            height={images.dinner.h}
            loading="lazy"
          />
        </div>
        {done ? (
          <div className="form-success">
            <h3>Thanks, {done}.</h3>
            <p>
              Theo has your note and will reply within two working days with the
              partner pack and available dates.
            </p>
            <button
              type="button"
              className="btn btn-line"
              onClick={() => setDone("")}
            >
              Send another enquiry
            </button>
            <p className="quiet-line">Demo form: nothing was sent.</p>
          </div>
        ) : (
          <form
            className="stack-form"
            noValidate
            onSubmit={submit}
            onChange={onChange}
            aria-busy={busy}
          >
            <div className="field-row">
              <Field
                label="Company"
                name="company"
                required
                autoComplete="organization"
                error={errors.company}
              />
              <Field
                label="Your name"
                name="name"
                required
                autoComplete="name"
                error={errors.name}
              />
            </div>
            <Field
              label="Work email"
              name="email"
              type="email"
              required
              autoComplete="email"
              error={errors.email}
            />
            <Field label="Package" name="package" error={errors.package}>
              <select required defaultValue="">
                <option value="" disabled>
                  Choose a package
                </option>
                {sponsorPackages.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} · {money(p.price)}
                  </option>
                ))}
                <option value="unsure">Not sure yet</option>
              </select>
            </Field>
            <Field
              label="What would you like to do at Prism?"
              name="message"
              error={errors.message}
            >
              <textarea rows={5} required minLength={20} />
            </Field>
            <button type="submit" className="btn btn-ink" disabled={busy}>
              {busy ? "Sending…" : "Send enquiry"}
            </button>
            <p className="quiet-line">Demo form: nothing is sent anywhere.</p>
          </form>
        )}
        <p className="sr-only" aria-live="polite">
          {busy
            ? "Sending your enquiry…"
            : done
              ? `Thanks, ${done}. Your enquiry is with Theo.`
              : ""}
        </p>
      </section>
    </div>
  );
}
