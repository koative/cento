import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Link } from "../router";
import { brand, quotePage } from "../content";
import { estimate, kwh, money, usePlan } from "../lib/energy";
import { EMAIL, Field, useForm } from "../components/form";
import { PageHead } from "../components/Bits";

const steps = [
  { title: "Your home", keys: ["address", "zip", "homeType", "roofType"] },
  { title: "Your energy", keys: ["bill", "interests", "notes"] },
  {
    title: "How to reach you",
    keys: ["name", "email", "phone", "time", "consent"],
  },
] as const;

export default function Quote() {
  const plan = usePlan();
  const est = estimate(plan);
  const [step, setStep] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const shownStep = useRef(step);

  const form = useForm(
    {
      address: "",
      zip: "",
      homeType: "",
      roofType: "",
      bill: String(plan.bill),
      interests: [
        "Solar panels",
        plan.batteries ? "Battery storage" : "",
        plan.ev ? "EV charger" : "",
      ]
        .filter(Boolean)
        .join("|"),
      notes: "",
      attach: plan.panels.length ? "yes" : "",
      name: "",
      email: "",
      phone: "",
      time: "",
      consent: "",
    },
    (v) => ({
      address:
        v.address.trim().length < 6
          ? "Enter the street address of the house, e.g. 41 Harlow Avenue."
          : undefined,
      zip: !/^\d{5}$/.test(v.zip.trim())
        ? "Enter the five-digit ZIP code."
        : undefined,
      homeType: !v.homeType ? "Choose the type of home, or Other." : undefined,
      roofType: !v.roofType
        ? "Choose a roof covering. Not sure is fine."
        : undefined,
      bill: !(+v.bill >= 20 && +v.bill <= 2000)
        ? "Enter a typical monthly bill between $20 and $2,000."
        : undefined,
      interests: !v.interests
        ? "Pick at least one thing you would like quoted."
        : undefined,
      name:
        v.name.trim().length < 2
          ? "Enter your name so the designer knows who to ask for."
          : undefined,
      email: !v.email.trim()
        ? "Enter your email for the layout and price."
        : !EMAIL.test(v.email)
          ? "That email looks incomplete. Check the @ and the domain."
          : undefined,
      phone:
        v.phone.replace(/\D/g, "").length < 10
          ? "Enter a phone number with area code, at least 10 digits."
          : undefined,
      time: !v.time ? "Choose when a survey visit would suit you." : undefined,
      consent: !v.consent
        ? "Tick the box so we can contact you about this quote."
        : undefined,
    }),
  );

  // Move focus to the new step's heading, but not on first render (StrictMode runs effects twice).
  useEffect(() => {
    if (shownStep.current !== step) headRef.current?.focus();
    shownStep.current = step;
  }, [step]);

  // The confirmation replaces the form: bring the reader back to its heading.
  useEffect(() => {
    if (form.status !== "done") return;
    window.scrollTo({ top: 0 });
    document.getElementById("main")?.focus({ preventScroll: true });
  }, [form.status]);

  const picked = form.values.interests.split("|").filter(Boolean);
  const toggleInterest = (i: string) =>
    form.set(
      "interests",
      (picked.includes(i)
        ? picked.filter((x) => x !== i)
        : [...picked, i]
      ).join("|"),
    );
  const [ref] = useState(() => `GRD-${String(Date.now()).slice(-6)}`);

  if (form.status === "done")
    return (
      <>
        <PageHead
          title="Quote request received"
          lead={`Thank you, ${form.values.name.split(" ")[0]}. Your reference is ${ref}.`}
        />
        <section className="wrap quote-done" role="status">
          <h2>What happens next</h2>
          <ol className="next-steps">
            {quotePage.next.map((n) => (
              <li key={n}>
                <Check size={18} aria-hidden /> {n}
              </li>
            ))}
          </ol>
          <p>
            We will write to <strong>{form.values.email}</strong>
            {form.values.attach
              ? ` with your ${plan.panels.length}-panel planner layout attached`
              : ""}
            . Questions before then:{" "}
            <a href={`tel:${brand.phone.replace(/\s/g, "")}`}>{brand.phone}</a>.
          </p>
          <p className="quiet-note">
            Demo only: nothing was sent, and no one will call.
          </p>
          <div className="actions">
            <Link to="/how-it-works" className="btn btn-line">
              See how installation works
            </Link>
            <button
              type="button"
              className="btn btn-quiet"
              onClick={() => {
                form.reset();
                setStep(0);
              }}
            >
              Start another request
            </button>
          </div>
        </section>
      </>
    );

  const last = step === steps.length - 1;

  return (
    <>
      <PageHead title={quotePage.title} lead={quotePage.intro} />
      <section className="wrap quote">
        <form
          ref={formRef}
          className="quote-form"
          noValidate
          onSubmit={(e) => {
            if (last) return form.submit(e);
            e.preventDefault();
            if (form.check([...steps[step].keys], formRef.current))
              setStep(step + 1);
          }}
        >
          <ol className="progress">
            {steps.map((s, i) => (
              <li
                key={s.title}
                aria-current={i === step ? "step" : undefined}
                data-done={i < step ? "" : undefined}
              >
                <span className="num">{i + 1}</span> {s.title}
              </li>
            ))}
          </ol>

          <h2 ref={headRef} tabIndex={-1}>
            {steps[step].title}
          </h2>

          {step === 0 && (
            <div className="field-grid">
              <Field
                form={form}
                name="address"
                label="Street address"
                autoComplete="street-address"
                required
                className="span-2"
              />
              <Field
                form={form}
                name="zip"
                label="ZIP code"
                inputMode="numeric"
                autoComplete="postal-code"
                maxLength={5}
                required
              />
              <Field
                form={form}
                name="homeType"
                label="Type of home"
                options={quotePage.homeTypes}
                required
              />
              <Field
                form={form}
                name="roofType"
                label="Roof covering"
                options={quotePage.roofTypes}
                required
                className="span-2"
              />
            </div>
          )}

          {step === 1 && (
            <div className="field-grid">
              <Field
                form={form}
                name="bill"
                label="Typical monthly electricity bill ($)"
                type="number"
                inputMode="numeric"
                min={20}
                max={2000}
                hint="A rough average is fine. We ask for real statements later."
                required
              />
              <fieldset
                className="field span-2 checks"
                aria-describedby={
                  form.errors.interests ? "f-interests-err" : undefined
                }
              >
                <legend>What would you like quoted?</legend>
                {quotePage.interests.map((i, n) => (
                  <label key={i}>
                    <input
                      type="checkbox"
                      name={n === 0 ? "interests" : undefined}
                      checked={picked.includes(i)}
                      onChange={() => toggleInterest(i)}
                      aria-invalid={form.errors.interests ? true : undefined}
                    />
                    {i}
                  </label>
                ))}
                {form.errors.interests && (
                  <p className="field-error" id="f-interests-err">
                    {form.errors.interests}
                  </p>
                )}
              </fieldset>
              <Field
                form={form}
                name="notes"
                label="Anything we should know (optional)"
                multiline
                placeholder="Shade from a neighbour's oak, plans for a heat pump…"
                className="span-2"
              />
              {plan.panels.length > 0 && (
                <label className="switch span-2">
                  <input
                    type="checkbox"
                    checked={!!form.values.attach}
                    onChange={(e) =>
                      form.set("attach", e.target.checked ? "yes" : "")
                    }
                  />
                  <span>
                    Attach my planner layout{" "}
                    <small>
                      {plan.panels.length} panels, {est.kwp.toFixed(2)} kWp
                    </small>
                  </span>
                </label>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="field-grid">
              <Field
                form={form}
                name="name"
                label="Full name"
                autoComplete="name"
                required
              />
              <Field
                form={form}
                name="phone"
                label="Phone"
                type="tel"
                autoComplete="tel"
                required
              />
              <Field
                form={form}
                name="email"
                label="Email"
                type="email"
                autoComplete="email"
                required
                className="span-2"
              />
              <Field
                form={form}
                name="time"
                label="Best time for a survey visit"
                options={quotePage.times}
                required
                className="span-2"
              />
              <div className="field span-2">
                <label className="check-line">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={!!form.values.consent}
                    onChange={(e) =>
                      form.set("consent", e.target.checked ? "yes" : "")
                    }
                    aria-invalid={form.errors.consent ? true : undefined}
                    aria-describedby={
                      form.errors.consent ? "f-consent-err" : undefined
                    }
                  />
                  Grid may contact me by email or phone about this quote. No
                  marketing lists.
                </label>
                {form.errors.consent && (
                  <p className="field-error" id="f-consent-err">
                    {form.errors.consent}
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="form-nav">
            {step > 0 && (
              <button
                type="button"
                className="btn btn-quiet"
                onClick={() => setStep(step - 1)}
              >
                <ArrowLeft size={18} aria-hidden /> Back
              </button>
            )}
            <button
              type="submit"
              className="btn btn-sun"
              disabled={form.status === "sending"}
            >
              {form.status === "sending"
                ? "Sending…"
                : last
                  ? "Send quote request"
                  : "Continue"}
              {form.status !== "sending" && (
                <ArrowRight size={18} aria-hidden />
              )}
            </button>
          </div>
          <p className="quiet-note">Demo form: nothing is sent anywhere.</p>
        </form>

        <aside className="quote-aside" aria-label="Your planner design">
          <h2>Your planner design</h2>
          {plan.panels.length ? (
            <dl className="spec-table">
              {(
                [
                  ["Panels", `${plan.panels.length} × Grid Line 430`],
                  ["System size", `${est.kwp.toFixed(2)} kWp`],
                  [
                    "Batteries",
                    plan.batteries ? `${plan.batteries} × Store 13` : "None",
                  ],
                  ["EV charger", plan.ev ? "Grid Charge 48" : "None"],
                  ["Produced per year", kwh(est.annualGen)],
                  ["Estimated price", money(est.price)],
                ] as [string, string][]
              ).map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd className="num">{v}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p>
              No layout yet. A designer will draw one from satellite imagery.
            </p>
          )}
          <Link to="/planner" className="text-link">
            {plan.panels.length
              ? "Adjust it in the planner"
              : "Lay out panels in the planner"}
          </Link>
          <h3>Rather talk?</h3>
          <p>
            <a href={`tel:${brand.phone.replace(/\s/g, "")}`}>{brand.phone}</a>
            <br />
            <a href={`mailto:${brand.surveys}`}>{brand.surveys}</a>
          </p>
        </aside>
      </section>
    </>
  );
}
