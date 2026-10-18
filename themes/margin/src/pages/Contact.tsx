import { useRef, useState, type FormEvent } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { Link } from "../router";
import { brand, contact } from "../content";
import {
  Area,
  Choice,
  Field,
  validate,
  type Errors,
} from "../components/Field";

const MIN_MESSAGE = 40;

export function Contact() {
  const [errors, setErrors] = useState<Errors>({});
  const [kind, setKind] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [sent, setSent] = useState({ name: "", kind: "" });
  const done = useRef<HTMLDivElement>(null);
  const hiring = kind === "Full-time role";

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const message = form.elements.namedItem("message") as HTMLTextAreaElement;
    const length = message.value.trim().length;
    message.setCustomValidity(
      length > 0 && length < MIN_MESSAGE ? "short" : "",
    );
    const found = validate(form, {
      kind: {
        missing:
          "Choose what kind of work this is — it decides which questions I ask next.",
      },
      name: { missing: "Add your name so I know who I'm writing back to." },
      email: {
        missing: "Add an email address for my reply.",
        invalid:
          "That email address is missing something — check the @ and the domain.",
      },
      ...(hiring
        ? {}
        : {
            budget: {
              missing: "Pick a budget range. 'Not sure yet' is a fine answer.",
            },
          }),
      timing: { missing: "Pick when you'd like to start, even roughly." },
      message: {
        missing: "Tell me a little about the product and what's in the way.",
        invalid: `A bit more, please — at least ${MIN_MESSAGE} characters (you have ${length}).`,
      },
    });
    setErrors(found);
    if (Object.keys(found).length) return;
    setStatus("sending");
    setSent({
      name: String(new FormData(form).get("name")).split(" ")[0],
      kind,
    });
    window.setTimeout(() => {
      setStatus("sent");
      requestAnimationFrame(() => done.current?.focus());
    }, 900);
  }

  return (
    <>
      <section className="sheet page-head">
        <dl className="aside meta">
          <div>
            <dt>Email</dt>
            <dd>
              <a href={"mailto:" + brand.email}>{brand.email}</a>
            </dd>
          </div>
          <div>
            <dt>Phone</dt>
            <dd>
              <a href={brand.phoneHref}>{brand.phone}</a>
            </dd>
          </div>
          <div>
            <dt>Hours</dt>
            <dd>Mon–Thu, 9:00–17:00 {brand.timezone}</dd>
          </div>
          <div>
            <dt>Next opening</dt>
            <dd>{brand.availability}</dd>
          </div>
        </dl>
        <div className="col">
          <h1 className="display">{contact.title}</h1>
          <p className="lead">{contact.intro}</p>
        </div>
      </section>

      <section className="sheet" aria-label="Project enquiry">
        <p className="aside margin-note">{contact.rates}</p>
        <div className="col">
          <div aria-live="polite">
            {status === "sent" ? (
              <div className="form-done" tabIndex={-1} ref={done}>
                <Check size={28} aria-hidden="true" />
                <h2>Thanks, {sent.name}. Your note is on my desk.</h2>
                <p>
                  I read every enquiry myself and reply within two working days
                  {sent.kind === "Full-time role"
                    ? " — for roles, usually with a time for a first call."
                    : " — usually with three questions and a time to talk."}
                </p>
                <p className="quiet">Demo only: nothing was sent or stored.</p>
                <div className="actions">
                  <Link to="/work" className="btn">
                    Read a case study while you wait{" "}
                    <ArrowRight size={18} aria-hidden="true" />
                  </Link>
                  <button
                    type="button"
                    className="btn btn-line"
                    onClick={() => {
                      setStatus("idle");
                      setKind("");
                    }}
                  >
                    Send another enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form
                className="enquiry"
                noValidate
                onSubmit={submit}
                aria-busy={status === "sending"}
              >
                <fieldset
                  className="kinds"
                  aria-describedby={errors.kind ? "kind-error" : undefined}
                  data-invalid={errors.kind ? "" : undefined}
                >
                  <legend>What kind of work is it?</legend>
                  <div className="presets">
                    {contact.kinds.map((k) => (
                      <label key={k} className="chip">
                        <input
                          type="radio"
                          name="kind"
                          value={k}
                          required
                          checked={kind === k}
                          onChange={() => setKind(k)}
                        />
                        {k}
                      </label>
                    ))}
                  </div>
                  {errors.kind && (
                    <p className="field-error" id="kind-error">
                      {errors.kind}
                    </p>
                  )}
                </fieldset>
                <div className="form-grid">
                  <Field
                    label="Your name"
                    name="name"
                    autoComplete="name"
                    required
                    error={errors.name}
                  />
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    error={errors.email}
                  />
                  <Field
                    label="Company or team"
                    name="company"
                    autoComplete="organization"
                    hint="Optional"
                  />
                  {!hiring && (
                    <Choice
                      label="Budget"
                      name="budget"
                      required
                      options={contact.budgets}
                      placeholder="Choose a range"
                      error={errors.budget}
                    />
                  )}
                  <Choice
                    label="When would you like to start?"
                    name="timing"
                    required
                    options={contact.timings}
                    placeholder="Choose a timeframe"
                    error={errors.timing}
                  />
                </div>
                <Area
                  label={
                    hiring
                      ? "About the role and the team"
                      : "About the product and what's in the way"
                  }
                  name="message"
                  rows={6}
                  required
                  hint="Who uses it, where, and what you'd like to be different in six months."
                  error={errors.message}
                />
                <div className="form-submit">
                  <button
                    className="btn"
                    type="submit"
                    disabled={status === "sending"}
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2
                          size={18}
                          className="spin"
                          aria-hidden="true"
                        />{" "}
                        Sending…
                      </>
                    ) : (
                      <>
                        Send enquiry <ArrowRight size={18} aria-hidden="true" />
                      </>
                    )}
                  </button>
                  <p className="quiet">
                    This is a demo form — nothing is sent anywhere.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="sheet" aria-labelledby="faq">
        <div className="aside" />
        <div className="col">
          <h2 id="faq">Before you write</h2>
          <div className="faq">
            {contact.faq.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
