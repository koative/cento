import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type MouseEvent,
} from "react";
import { ArrowLeft, ArrowRight, Check, LoaderCircle } from "lucide-react";
import { Link } from "../router";
import {
  brand,
  coverBySlug,
  deductibleOptions,
  liabilityOptions,
  quoteAddOns,
  quotePage,
  rates,
  type QuoteKind,
} from "../content";
import { Field, useErrors } from "../components/Field";
import { ContentsCounter } from "../components/ContentsCounter";
import { PolicySchedule } from "../components/PolicySchedule";
import { validate, pause } from "../lib/form";
import {
  annualPremium,
  hashParam,
  money,
  monthlyPremium,
  scheduleLines,
  type QuoteInput,
} from "../lib/quote";

const kinds = Object.keys(rates) as QuoteKind[];
const steps = ["Your home", "Your things", "Your cover", "About you"];
const today = new Date().toISOString().slice(0, 10);
const in60 = new Date(Date.now() + 60 * 864e5).toISOString().slice(0, 10);

const messages: Record<string, string> = {
  zip: "Enter the 5-digit ZIP code of the home you're insuring, like 43215.",
  sqft: "Enter the floor area in square feet, between 300 and 12,000.",
  year: "Enter the year the home was built, between 1850 and this year.",
  home: "Choose the kind of home you rent.",
  contents: "Enter a limit between $5,000 and $250,000, in whole dollars.",
  name: "Enter your full name as it should appear on the policy.",
  email: "Enter an email like you@example.com so we can send the quote.",
  phone: "Use digits only, like 555 014 7700, or leave it blank.",
  start: "Pick a start date between today and 60 days from now.",
  claims: "Tell us how many home claims you've made in the last five years.",
  consent: "Tick the box to confirm the details are accurate.",
};

const longDate = (iso: string) =>
  new Date(iso + "T12:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export function Quote() {
  const preset = hashParam("cover");
  const presetContents = Number(hashParam("contents"));
  const [kind, setKind] = useState<QuoteKind>(
    kinds.includes(preset as QuoteKind) ? (preset as QuoteKind) : "renters",
  );
  const [sqft, setSqft] = useState(1400);
  const [contents, setContents] = useState(
    presetContents >= 5000 && presetContents <= 250000
      ? presetContents
      : rates[kind].defaultContents,
  );
  const [liability, setLiability] = useState(300000);
  const [deductible, setDeductible] = useState(1000);
  const [addOns, setAddOns] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [start, setStart] = useState(today);
  const [annual, setAnnual] = useState(false);
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [reference, setReference] = useState("");
  const [email, setEmail] = useState("");
  const { errors, setErrors, onChange } = useErrors();
  const legends = useRef<(HTMLHeadingElement | null)[]>([]);
  const first = useRef(true);

  const dwelling = rates[kind].perSqFt > 0;
  const input: QuoteInput = {
    kind,
    sqft: dwelling ? sqft : 0,
    contents,
    liability,
    deductible,
    addOns,
  };
  const monthly = monthlyPremium(input);
  const cover = coverBySlug(kind)!;
  const done = status === "done";

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    legends.current[step]?.focus();
  }, [step]);

  const next = (e: MouseEvent<HTMLButtonElement>) => {
    const found = validate(
      e.currentTarget.form!.querySelectorAll("fieldset")[step],
      messages,
    );
    setErrors(found);
    if (!Object.keys(found).length) setStep(step + 1);
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form.querySelectorAll("fieldset")[step], messages);
    setErrors(found);
    if (Object.keys(found).length) return;
    setEmail(String(new FormData(form).get("email")));
    setStatus("sending");
    await pause();
    setReference(
      `VLT-${new Date().getFullYear()}-${String(Math.floor(10000 + Math.random() * 89999))}`,
    );
    setStatus("done");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="wrap quote-page">
      <section className="quote-main">
        <h1>{done ? "Your quote is ready" : quotePage.title}</h1>

        <div aria-live="polite" className="quote-live">
          {done && (
            <div className="quote-done">
              <p className="lede">
                Thank you{name ? `, ${name.split(" ")[0]}` : ""}. Quote{" "}
                <strong>{reference}</strong> holds this price for 30 days. A
                copy would go to {email} — nothing is actually sent from this
                template.
              </p>
              <dl className="ledger">
                <div>
                  <dt>{annual ? "Annual premium" : "Monthly premium"}</dt>
                  <dd className="num">
                    {money(annual ? annualPremium(monthly) : monthly)}
                  </dd>
                </div>
                <div>
                  <dt>Cover starts</dt>
                  <dd>{longDate(start)}, 12:01am</dd>
                </div>
              </dl>
              <ul className="ticks">
                <li>
                  <Check aria-hidden="true" size={18} />
                  <span>Nothing is charged until you accept the quote.</span>
                </li>
                <li>
                  <Check aria-hidden="true" size={18} />
                  <span>
                    Change any limit or the start date from your account before
                    then.
                  </span>
                </li>
                <li>
                  <Check aria-hidden="true" size={18} />
                  <span>
                    Questions? Call the policy desk on{" "}
                    <a href={brand.phoneHref}>{brand.phone}</a>.
                  </span>
                </li>
              </ul>
              <div className="actions">
                <Link to={`/cover/${cover.slug}`} className="btn btn-ghost">
                  Read the {cover.name.toLowerCase()} wording
                </Link>
                <Link to="/help" className="btn btn-quiet">
                  Visit the help centre
                </Link>
              </div>
            </div>
          )}
        </div>

        {!done && (
          <>
            <p className="lede">{quotePage.text}</p>
            <ol className="progress" aria-label="Quote steps">
              {steps.map((s, i) => (
                <li
                  key={s}
                  data-state={
                    i < step ? "done" : i === step ? "current" : undefined
                  }
                >
                  <button
                    type="button"
                    disabled={i >= step}
                    onClick={() => setStep(i)}
                    aria-current={i === step ? "step" : undefined}
                  >
                    <span className="progress-n" aria-hidden="true">
                      {i < step ? <Check size={14} /> : i + 1}
                    </span>
                    <span>
                      <span className="sr-only">Step {i + 1}: </span>
                      {s}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
            <form
              noValidate
              onSubmit={submit}
              onChange={onChange}
              className="quote-form"
            >
              <fieldset hidden={step !== 0}>
                <legend>
                  <h2
                    tabIndex={-1}
                    ref={(el) => void (legends.current[0] = el)}
                  >
                    {steps[0]}
                  </h2>
                </legend>
                <div
                  className="kind-grid"
                  role="radiogroup"
                  aria-label="What are you insuring?"
                >
                  {kinds.map((k) => {
                    const c = coverBySlug(k)!;
                    return (
                      <label key={k} className="kind">
                        <input
                          type="radio"
                          name="kind"
                          value={k}
                          checked={kind === k}
                          onChange={() => {
                            setKind(k);
                            if (!presetContents)
                              setContents(rates[k].defaultContents);
                          }}
                        />
                        <span className="kind-name">{c.name}</span>
                        <span className="kind-sub">{c.summary}</span>
                      </label>
                    );
                  })}
                </div>
                <div className="field-row">
                  <Field
                    label="ZIP code"
                    name="zip"
                    inputMode="numeric"
                    pattern="[0-9]{5}"
                    maxLength={5}
                    required
                    autoComplete="postal-code"
                    error={errors.zip}
                  />
                  {dwelling ? (
                    <>
                      <Field
                        label="Floor area (sq ft)"
                        name="sqft"
                        type="number"
                        min={300}
                        max={12000}
                        required
                        value={sqft || ""}
                        onChange={(e) => setSqft(Number(e.target.value))}
                        hint="Sets the rebuild cost"
                        error={errors.sqft}
                      />
                      <Field
                        label="Year built"
                        name="year"
                        type="number"
                        min={1850}
                        max={new Date().getFullYear()}
                        required
                        error={errors.year}
                      />
                    </>
                  ) : (
                    <Field label="Kind of home" name="home" error={errors.home}>
                      <select required defaultValue="">
                        <option value="" disabled>
                          Choose one
                        </option>
                        <option>Apartment</option>
                        <option>House</option>
                        <option>Room in a shared home</option>
                        <option>Dorm or student hall</option>
                      </select>
                    </Field>
                  )}
                </div>
              </fieldset>

              <fieldset hidden={step !== 1}>
                <legend>
                  <h2
                    tabIndex={-1}
                    ref={(el) => void (legends.current[1] = el)}
                  >
                    {steps[1]}
                  </h2>
                </legend>
                <Field
                  label={
                    kind === "landlord"
                      ? "Contents you supply to tenants ($)"
                      : "Personal property limit ($)"
                  }
                  name="contents"
                  type="number"
                  min={5000}
                  max={250000}
                  step={1000}
                  required
                  value={contents || ""}
                  onChange={(e) => setContents(Number(e.target.value))}
                  hint="What it would cost to buy everything again, new. Not sure? Count it below."
                  error={errors.contents}
                  className="field-wide"
                />
                <ContentsCounter
                  onUse={(total) => {
                    setContents(total);
                    setErrors(({ contents: _, ...rest }) => rest);
                  }}
                />
              </fieldset>

              <fieldset hidden={step !== 2}>
                <legend>
                  <h2
                    tabIndex={-1}
                    ref={(el) => void (legends.current[2] = el)}
                  >
                    {steps[2]}
                  </h2>
                </legend>
                <div
                  className="option-group"
                  role="radiogroup"
                  aria-labelledby="liab-l"
                >
                  <p id="liab-l" className="group-label">
                    Personal liability (section E)
                  </p>
                  {liabilityOptions.map((o) => (
                    <label key={o.value} className="option">
                      <input
                        type="radio"
                        name="liability"
                        checked={liability === o.value}
                        onChange={() => setLiability(o.value)}
                      />
                      <span className="num">{money(o.value)}</span>
                      <span className="option-sub">
                        {o.monthly ? `+${money(o.monthly)}/mo` : "Included"}
                      </span>
                    </label>
                  ))}
                </div>
                <div
                  className="option-group"
                  role="radiogroup"
                  aria-labelledby="ded-l"
                >
                  <p id="ded-l" className="group-label">
                    Deductible — what you pay towards each claim
                  </p>
                  {deductibleOptions.map((o) => (
                    <label key={o.value} className="option">
                      <input
                        type="radio"
                        name="deductible"
                        checked={deductible === o.value}
                        onChange={() => setDeductible(o.value)}
                      />
                      <span className="num">{money(o.value)}</span>
                      <span className="option-sub">
                        {o.factor > 1
                          ? "Higher premium"
                          : o.factor < 1
                            ? "Lower premium"
                            : "Our standard"}
                      </span>
                    </label>
                  ))}
                </div>
                <div
                  className="option-group"
                  role="group"
                  aria-labelledby="add-l"
                >
                  <p id="add-l" className="group-label">
                    Add-ons
                  </p>
                  {quoteAddOns.map((a) => (
                    <label key={a.id} className="option option-check">
                      <input
                        type="checkbox"
                        name="addons"
                        checked={addOns.includes(a.id)}
                        onChange={() =>
                          setAddOns((list) =>
                            list.includes(a.id)
                              ? list.filter((x) => x !== a.id)
                              : [...list, a.id],
                          )
                        }
                      />
                      <span>{a.label}</span>
                      <span className="option-sub">
                        {a.note} ·{" "}
                        <span className="num">+{money(a.monthly)}/mo</span>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset hidden={step !== 3}>
                <legend>
                  <h2
                    tabIndex={-1}
                    ref={(el) => void (legends.current[3] = el)}
                  >
                    {steps[3]}
                  </h2>
                </legend>
                <div className="field-row">
                  <Field
                    label="Full name"
                    name="name"
                    required
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={errors.name}
                  />
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    error={errors.email}
                  />
                  <Field
                    label="Phone (optional)"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    pattern="[0-9 +()\-]{7,20}"
                    hint="Only used if you ask us to call"
                    error={errors.phone}
                  />
                  <Field
                    label="Cover starts"
                    name="start"
                    type="date"
                    min={today}
                    max={in60}
                    required
                    value={start}
                    onChange={(e) => setStart(e.target.value)}
                    error={errors.start}
                  />
                  <Field
                    label="Home claims in the last 5 years"
                    name="claims"
                    error={errors.claims}
                  >
                    <select required defaultValue="">
                      <option value="" disabled>
                        Choose one
                      </option>
                      <option>None</option>
                      <option>One</option>
                      <option>Two or more</option>
                    </select>
                  </Field>
                </div>
                <div
                  className="field check"
                  data-invalid={errors.consent ? "" : undefined}
                >
                  <label>
                    <input
                      type="checkbox"
                      name="consent"
                      required
                      aria-invalid={errors.consent ? true : undefined}
                      aria-describedby={
                        errors.consent ? "consent-err" : undefined
                      }
                    />
                    The details I've given are accurate to the best of my
                    knowledge.
                  </label>
                  {errors.consent && (
                    <p className="field-error" id="consent-err">
                      {errors.consent}
                    </p>
                  )}
                </div>
              </fieldset>

              <div className="form-nav">
                {step > 0 && (
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => setStep(step - 1)}
                  >
                    <ArrowLeft aria-hidden="true" size={18} /> Back
                  </button>
                )}
                {step < steps.length - 1 ? (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={next}
                  >
                    Continue to {steps[step + 1].toLowerCase()}{" "}
                    <ArrowRight aria-hidden="true" size={18} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={status === "sending"}
                    aria-disabled={status === "sending"}
                  >
                    {status === "sending" ? (
                      <>
                        <LoaderCircle
                          className="spin"
                          aria-hidden="true"
                          size={18}
                        />{" "}
                        Pricing your quote…
                      </>
                    ) : (
                      <>
                        See my quote <ArrowRight aria-hidden="true" size={18} />
                      </>
                    )}
                  </button>
                )}
              </div>
              <p className="fine">
                Nothing you enter here is sent anywhere — this is a template,
                and the prices are illustrative.
              </p>
            </form>
            <p className="mobile-price" aria-hidden="true">
              So far{" "}
              <strong className="num">
                {money(annual ? annualPremium(monthly) : monthly)}
              </strong>{" "}
              {annual ? "a year" : "a month"}
            </p>
          </>
        )}
      </section>

      <aside className="quote-aside" aria-label="Your schedule so far">
        <PolicySchedule
          title={done ? `Quote ${reference}` : "Draft schedule"}
          meta={[
            ["Policyholder", name || "—"],
            ["Policy", cover.name],
            ["Period", `${longDate(start)} – 12 months`],
          ]}
          lines={scheduleLines(input)}
          monthly={monthly}
          annual={annual}
          stamp={done ? "Quoted" : undefined}
          foot={
            <div className="billing" role="group" aria-label="Billing">
              <button
                type="button"
                aria-pressed={!annual}
                onClick={() => setAnnual(false)}
              >
                Monthly
              </button>
              <button
                type="button"
                aria-pressed={annual}
                onClick={() => setAnnual(true)}
              >
                Annual · save 8%
              </button>
            </div>
          }
        />
      </aside>
    </div>
  );
}
