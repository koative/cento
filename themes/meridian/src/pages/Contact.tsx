import { useState, type FormEvent } from "react";
import { Check, Mail, Phone } from "lucide-react";
import { brand, contact, listings } from "../content";
import { CityMap } from "../components/CityMap";
import {
  Field,
  SelectField,
  TextField,
  validate,
  type Errors,
} from "../components/Field";

export function Contact() {
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [name, setName] = useState("");

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, {
      "c-name": { missing: "Enter your name." },
      "c-email": {
        missing: "Enter your email so we can reply.",
        invalid: "That email looks incomplete; check the @ and the domain.",
      },
      "c-topic": {
        missing:
          "Choose what your message is about so it reaches the right desk.",
      },
      "c-message": {
        missing: "Write a short message.",
        invalid: "Add a little more detail: at least 20 characters.",
      },
    });
    setErrors(found);
    if (Object.keys(found).length) return;
    setName(String(new FormData(form).get("c-name")).split(" ")[0]);
    setState("sending");
    window.setTimeout(() => setState("done"), 900);
  }

  return (
    <>
      <section className="page-head wrap">
        <h1>{contact.title}</h1>
        <p className="lede">{contact.intro}</p>
      </section>

      <section className="wrap contact-grid">
        <div className="contact-info">
          <CityMap
            label="Map of Port Ellery showing the Meridian office in Old Town"
            listings={[]}
            activeArea="old-town"
            marker={{ ...contact.officePin, label: "Meridian" }}
          />
          <div className="contact-cols">
            <div>
              <h2>The office</h2>
              <address>{brand.address}</address>
              <p className="contact-lines">
                <a href={brand.phoneHref}>
                  <Phone size={15} aria-hidden="true" /> Sales{" "}
                  <span className="num">{brand.phone}</span>
                </a>
                <a href={brand.lettingsPhoneHref}>
                  <Phone size={15} aria-hidden="true" /> Lettings{" "}
                  <span className="num">{brand.lettingsPhone}</span>
                </a>
                <a href={"mailto:" + brand.email}>
                  <Mail size={15} aria-hidden="true" /> {brand.email}
                </a>
              </p>
            </div>
            <div>
              <h2>Opening hours</h2>
              <dl className="hours num">
                {brand.hours.map((h) => (
                  <div key={h.days}>
                    <dt>{h.days}</dt>
                    <dd>{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        <div className="contact-form" aria-live="polite">
          {state === "done" ? (
            <div className="success-panel">
              <Check size={22} aria-hidden="true" />
              <h2>Message received</h2>
              <p>
                Thanks, {name}. The right desk will reply by email before the
                end of the next working day.
              </p>
              <button
                type="button"
                className="text-btn"
                onClick={() => setState("idle")}
              >
                Send another message
              </button>
            </div>
          ) : (
            <form noValidate onSubmit={submit}>
              <h2>Write to us</h2>
              <Field
                label="Full name"
                name="c-name"
                autoComplete="name"
                required
                error={errors["c-name"]}
              />
              <Field
                label="Email"
                name="c-email"
                type="email"
                autoComplete="email"
                required
                error={errors["c-email"]}
              />
              <SelectField
                label="What is it about?"
                name="c-topic"
                required
                placeholder="Choose a topic"
                options={contact.topics.map((t) => ({ value: t, label: t }))}
                error={errors["c-topic"]}
              />
              <SelectField
                label="About a particular home? (optional)"
                name="c-home"
                placeholder="No particular home"
                options={listings.map((l) => ({
                  value: l.id,
                  label: l.address,
                }))}
              />
              <TextField
                label="Message"
                name="c-message"
                rows={5}
                required
                minLength={20}
                error={errors["c-message"]}
              />
              <button
                type="submit"
                className="btn btn-accent"
                disabled={state === "sending"}
              >
                {state === "sending" ? "Sending…" : "Send message"}
              </button>
              <p className="fine">Demo form: nothing is sent anywhere.</p>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
