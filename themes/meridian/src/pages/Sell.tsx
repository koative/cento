import { useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Link } from "../router";
import { areas, sell } from "../content";
import { agentOf, areaOf, estimate, money } from "../lib/format";
import {
  Choices,
  Field,
  SelectField,
  validate,
  type Errors,
  type Messages,
} from "../components/Field";

const typeFactor: Record<string, number> = {
  House: 1,
  Townhouse: 1,
  Apartment: 0.97,
  Cottage: 1.02,
};
const conditionFactor: Record<string, number> = {
  "needs-work": 0.88,
  good: 1,
  renovated: 1.08,
};
const extraFactor: Record<string, number> = {
  garden: 0.03,
  parking: 0.02,
  views: 0.04,
};

const steps: { title: string; messages: Messages }[] = [
  {
    title: "Your home",
    messages: {
      address: { missing: "Enter the street address of the home." },
      area: { missing: "Choose the neighborhood the home is in." },
      ptype: { missing: "Choose the type of home." },
    },
  },
  {
    title: "Details",
    messages: {
      beds: { missing: "Choose the number of bedrooms." },
      sqft: {
        missing: "Enter the floor area; a rough figure is fine.",
        invalid: "Enter a floor area between 300 and 10,000 sq ft.",
      },
      condition: {
        missing: "Choose the option closest to the home's condition.",
      },
    },
  },
  {
    title: "About you",
    messages: {
      name: { missing: "Enter your name." },
      email: {
        missing: "Enter your email for the written valuation.",
        invalid: "That email looks incomplete; check the @ and the domain.",
      },
      phone: {
        missing: "Enter a phone number so the agent can arrange the visit.",
        invalid: "Use digits, spaces and an optional +, at least 7 digits.",
      },
      timing: { missing: "Tell us roughly when you might move." },
    },
  },
];

type Draft = {
  area: string;
  sqft: number;
  ptype: string;
  condition: string;
  extras: string[];
  name: string;
  phone: string;
  intent: string;
};

const faqs = [
  {
    q: "Is the valuation really free?",
    a: "Yes. A valuation visit costs nothing and commits you to nothing. About a third of the homes we value are not sold that year, and that is fine.",
  },
  {
    q: "How long does a visit take?",
    a: "About an hour. We walk through every room, measure, look at the garden and the roof line, and talk through what buyers in your street are asking for.",
  },
  {
    q: "Can you value a home I want to let instead?",
    a: "Yes. Choose 'Letting' in the last step of the form and Maeve's lettings team will give you an achievable monthly rent alongside the sale figure, so you can compare.",
  },
  {
    q: "Why is your figure sometimes lower than other agents'?",
    a: "Because we price to sell, not to win the instruction. Every figure comes with the three sales that justify it, and we publish our achieved prices every quarter.",
  },
];

export function Sell() {
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [d, setD] = useState<Draft>({
    area: "",
    sqft: 0,
    ptype: "",
    condition: "",
    extras: [],
    name: "",
    phone: "",
    intent: "Selling",
  });

  const area = d.area ? areaOf(d.area) : null;
  const ready = area && d.sqft >= 300 && d.sqft <= 10000;
  const range = ready
    ? estimate(area, d.sqft, {
        type: typeFactor[d.ptype] ?? 1,
        condition: conditionFactor[d.condition] ?? 1,
        extras: d.extras.reduce((s, x) => s + (extraFactor[x] ?? 0), 0),
      })
    : null;

  function read(form: HTMLFormElement) {
    const f = new FormData(form);
    setD({
      area: String(f.get("area") ?? ""),
      sqft: Number(f.get("sqft")) || 0,
      ptype: String(f.get("ptype") ?? ""),
      condition: String(f.get("condition") ?? ""),
      extras: f.getAll("extras").map(String),
      name: String(f.get("name") ?? ""),
      phone: String(f.get("phone") ?? ""),
      intent: String(f.get("intent") ?? "Selling"),
    });
  }

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(e.currentTarget, steps[step].messages);
    setErrors(found);
    if (Object.keys(found).length) return;
    if (step < steps.length - 1) {
      setStep(step + 1);
      return;
    }
    setState("sending");
    window.setTimeout(() => setState("done"), 1000);
  }

  const agent = agentOf(
    d.intent === "Letting" ? "maeve-callahan" : (area?.agent ?? "priya-raman"),
  );

  return (
    <>
      <section className="page-head wrap">
        <h1>{sell.title}</h1>
        <p className="lede">{sell.intro}</p>
      </section>

      <section className="wrap valuation" aria-labelledby="val-title">
        <div className="valuation-form">
          <h2 id="val-title">Book a valuation</h2>
          <ol className="stepper">
            {steps.map((s, i) => (
              <li
                key={s.title}
                aria-current={
                  i === step && state !== "done" ? "step" : undefined
                }
                data-done={i < step || state === "done" || undefined}
              >
                <span className="num">{i + 1}</span> {s.title}
              </li>
            ))}
          </ol>

          <div aria-live="polite">
            {state === "done" ? (
              <div className="success-panel">
                <Check size={22} aria-hidden="true" />
                <h3>Valuation requested</h3>
                <p>
                  Thank you, {d.name.split(" ")[0]}. {agent.name} will call you
                  on {d.phone} within one working day to arrange a visit to your
                  home in {area?.name}.
                  {range && (
                    <>
                      {" "}
                      Until then, our desk estimate for your home is{" "}
                      <strong className="num">
                        {money(range.low)} – {money(range.high)}
                      </strong>
                      .
                    </>
                  )}
                </p>
                <Link to={"/agents/" + agent.id} className="text-link">
                  Read about {agent.name.split(" ")[0]}{" "}
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            ) : (
              <form
                noValidate
                onSubmit={submit}
                onChange={(e) => read(e.currentTarget)}
              >
                <div hidden={step !== 0} className="step">
                  <Field
                    label="Street address"
                    name="address"
                    autoComplete="street-address"
                    required
                    placeholder="e.g. 12 Larkspur Avenue"
                    error={errors.address}
                  />
                  <SelectField
                    label="Neighborhood"
                    name="area"
                    required
                    placeholder="Choose a neighborhood"
                    options={areas.map((a) => ({
                      value: a.slug,
                      label: a.name,
                    }))}
                    error={errors.area}
                  />
                  <Choices
                    legend="Type of home"
                    name="ptype"
                    required
                    options={Object.keys(typeFactor).map((t) => ({
                      value: t,
                      label: t,
                    }))}
                    error={errors.ptype}
                  />
                </div>

                <div hidden={step !== 1} className="step">
                  <div className="field-row">
                    <SelectField
                      label="Bedrooms"
                      name="beds"
                      required
                      placeholder="Choose"
                      options={["1", "2", "3", "4", "5", "6+"].map((n) => ({
                        value: n,
                        label: n,
                      }))}
                      error={errors.beds}
                    />
                    <Field
                      label="Floor area (sq ft)"
                      name="sqft"
                      type="number"
                      inputMode="numeric"
                      min={300}
                      max={10000}
                      required
                      error={errors.sqft}
                      hint="Check your deed or an old listing."
                    />
                  </div>
                  <Choices
                    legend="Condition"
                    name="condition"
                    required
                    error={errors.condition}
                    options={[
                      {
                        value: "needs-work",
                        label: "Needs work",
                        note: "Dated kitchen or bath",
                      },
                      {
                        value: "good",
                        label: "Good",
                        note: "Lived in, well kept",
                      },
                      {
                        value: "renovated",
                        label: "Renovated",
                        note: "In the last five years",
                      },
                    ]}
                  />
                  <fieldset className="choices">
                    <legend>Outside & extras</legend>
                    <div className="chips">
                      {[
                        ["garden", "Private garden"],
                        ["parking", "Off-street parking"],
                        ["views", "River or harbor view"],
                      ].map(([v, label]) => (
                        <label key={v} className="chip">
                          <input type="checkbox" name="extras" value={v} />
                          <span>{label}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </div>

                <div hidden={step !== 2} className="step">
                  <Choices
                    legend="I am thinking of"
                    name="intent"
                    options={[
                      { value: "Selling", label: "Selling" },
                      { value: "Letting", label: "Letting" },
                    ]}
                    value={d.intent}
                    onChange={(intent) => setD({ ...d, intent })}
                  />
                  <div className="field-row">
                    <Field
                      label="Full name"
                      name="name"
                      autoComplete="name"
                      required
                      error={errors.name}
                    />
                    <Field
                      label="Phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      required
                      pattern={"\\+?[0-9 \\-\\(\\)]{7,}"}
                      error={errors.phone}
                    />
                  </div>
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    error={errors.email}
                  />
                  <SelectField
                    label="When might you move?"
                    name="timing"
                    required
                    placeholder="Choose"
                    options={[
                      "Within 3 months",
                      "In 3 to 6 months",
                      "Later this year or next",
                      "Just curious for now",
                    ].map((t) => ({ value: t, label: t }))}
                    error={errors.timing}
                  />
                </div>

                <div className="form-actions">
                  {step > 0 && (
                    <button
                      type="button"
                      className="btn btn-quiet"
                      onClick={() => setStep(step - 1)}
                    >
                      <ArrowLeft size={18} aria-hidden="true" /> Back
                    </button>
                  )}
                  <button
                    type="submit"
                    className="btn btn-accent"
                    disabled={state === "sending"}
                  >
                    {state === "sending"
                      ? "Booking…"
                      : step < steps.length - 1
                        ? "Continue"
                        : "Book my valuation"}
                    {state !== "sending" && (
                      <ArrowRight size={18} aria-hidden="true" />
                    )}
                  </button>
                </div>
                <p className="fine">
                  Demo form: nothing is sent and nobody will call.
                </p>
              </form>
            )}
          </div>
        </div>

        <aside className="estimate" aria-label="Desk estimate">
          <h2>Desk estimate</h2>
          {range && area ? (
            <>
              <p className="estimate-range num">
                {money(range.low)}
                <span> to </span>
                {money(range.high)}
              </p>
              <p className="muted">
                From {money(area.pricePerSqft)} per sq ft achieved in{" "}
                {area.name} this year, adjusted for type, condition and extras.
                The visit sets the real figure.
              </p>
              <div className="estimate-scale" aria-hidden="true">
                <span
                  style={{
                    left: `${Math.min(96, Math.max(4, (range.low / 2000000) * 100))}%`,
                    right: `${100 - Math.min(98, (range.high / 2000000) * 100)}%`,
                  }}
                />
              </div>
              <p className="estimate-axis num" aria-hidden="true">
                <span>$0</span>
                <span>$1m</span>
                <span>$2m</span>
              </p>
            </>
          ) : (
            <p className="muted">
              Choose a neighborhood and enter the floor area, and a first figure
              appears here as you type.
            </p>
          )}
          <div className="estimate-agent">
            <img src={agent.photo} alt="" />
            <p>
              <strong>{agent.name}</strong>
              <br />
              {area
                ? `values homes in ${area.name}`
                : "leads valuations for the office"}
            </p>
          </div>
        </aside>
      </section>

      <section className="wrap section">
        <h2>From valuation to keys</h2>
        <ol className="timeline">
          {sell.steps.map((s) => (
            <li key={s.title}>
              <span className="timeline-when num">{s.week}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap section fees" aria-labelledby="fees-title">
        <h2 id="fees-title">Fees, in full</h2>
        <dl className="fee-list">
          {sell.fees.map((f) => (
            <div key={f.name}>
              <dt>{f.name}</dt>
              <dd className="fee-price num">{f.price}</dd>
              <dd className="muted">{f.note}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="wrap section faq" aria-labelledby="faq-title">
        <h2 id="faq-title">Before you book</h2>
        {faqs.map((f) => (
          <details key={f.q}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </section>
    </>
  );
}
