import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowLeft, Lock } from "lucide-react";
import { Link } from "../router";
import { brand, campaigns, donate, pagesCopy } from "../content";
import { formatDate, money } from "../lib/format";
import { draft, gifts, progress, type Gift } from "../lib/giving";
import {
  clearError,
  Field,
  SelectField,
  TextField,
  validate,
  type Errors,
} from "../components/Field";
import { Bar, Board } from "../components/Board";

const steps = ["Your gift", "About you", "Card"];

type Details = {
  first: string;
  last: string;
  email: string;
  zip: string;
  offBoard: boolean;
  dedication: string;
};

/** Luhn checksum: catches a mistyped digit before the card network would. */
function luhn(value: string) {
  const digits = value.replace(/\s/g, "");
  if (!/^\d{13,19}$/.test(digits)) return false;
  let sum = 0;
  for (let i = 0; i < digits.length; i++) {
    let d = Number(digits[digits.length - 1 - i]);
    if (i % 2) d = d * 2 > 9 ? d * 2 - 9 : d * 2;
    sum += d;
  }
  return sum % 10 === 0;
}

/** MM/YY, not earlier than this month. */
function validExpiry(value: string) {
  const m = /^(0[1-9]|1[0-2])\s*\/\s*(\d{2})$/.exec(value);
  if (!m) return false;
  const [y, mo] = brand.asOf.split("-").map(Number);
  const year = 2000 + Number(m[2]);
  return year > y || (year === y && Number(m[1]) >= mo);
}

export function Donate() {
  const open = campaigns.filter((c) => c.raised < c.goal);
  const [initial] = useState(() => draft.current);
  useEffect(() => {
    draft.current = null;
  }, []);

  const [step, setStep] = useState(0);
  const stepHeading = useRef<HTMLHeadingElement>(null);
  const shownStep = useRef(step);
  useEffect(() => {
    // Move focus to the new step's heading when the step changes (not on first render).
    if (shownStep.current !== step) stepHeading.current?.focus();
    shownStep.current = step;
  }, [step]);
  const [monthly, setMonthly] = useState(initial?.monthly ?? false);
  const presets = monthly ? donate.monthlyPresets : donate.presets;
  const startAmount = initial?.amount ?? 35;
  const [choice, setChoice] = useState<number | "other">(
    presets.includes(startAmount) ? startAmount : "other",
  );
  const [other, setOther] = useState(
    presets.includes(startAmount) ? "" : String(startAmount),
  );
  const [target, setTarget] = useState(initial?.campaign ?? "");
  const [cover, setCover] = useState(false);
  const [details, setDetails] = useState<Details>({
    first: "",
    last: "",
    email: "",
    zip: "",
    offBoard: false,
    dedication: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<Gift | null>(null);

  const amount = choice === "other" ? Number(other) || 0 : choice;
  const fee = cover ? Math.max(1, Math.round(amount * 0.03)) : 0;
  const campaign = campaigns.find((c) => c.slug === target);
  const all = gifts.use();
  const copy = pagesCopy.donate;

  function switchFrequency(next: boolean) {
    setMonthly(next);
    const list = next ? donate.monthlyPresets : donate.presets;
    if (choice !== "other" && !list.includes(choice)) setChoice(list[1]);
  }

  function nextFromGift(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found =
      choice === "other"
        ? validate(e.currentTarget, {
            "other-amount": {
              missing: "Enter an amount, or pick one of the buttons above.",
              invalid:
                "Gifts start at $5 and go up to $10,000 online. For more, call the window.",
            },
          })
        : {};
    setErrors(found);
    if (!Object.keys(found).length) setStep(1);
  }

  function nextFromDetails(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, {
      first: {
        missing: "Add your first name so the receipt is made out to you.",
      },
      last: { missing: "Add your last name for the tax receipt." },
      email: {
        missing: "Add an email address; the receipt goes there.",
        invalid:
          "That email is missing something. Check the @ and the part after it.",
      },
      zip: { missing: "", invalid: "ZIP codes are five digits, like 04112." },
    });
    setErrors(found);
    if (Object.keys(found).length) return;
    const data = new FormData(form);
    setDetails({
      first: String(data.get("first")).trim(),
      last: String(data.get("last")).trim(),
      email: String(data.get("email")).trim(),
      zip: String(data.get("zip")).trim(),
      offBoard: data.get("offBoard") === "on",
      dedication: String(data.get("dedication")).trim(),
    });
    setStep(2);
  }

  function pay(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(e.currentTarget, {
      "card-name": {
        missing: "Add the name exactly as it appears on the card.",
      },
      "card-number": {
        missing: "Add the long number on the front of the card.",
        invalid:
          "That card number doesn't add up. Check for a missing or swapped digit.",
        check: luhn,
      },
      "card-expiry": {
        missing: "Add the expiry date as MM/YY.",
        invalid: "Use MM/YY and a date that hasn't passed, like 08/29.",
        check: validExpiry,
      },
      "card-cvc": {
        missing: "Add the 3 or 4 digits from the back of the card.",
        invalid: "The security code is 3 digits (4 on American Express).",
      },
    });
    setErrors(found);
    if (Object.keys(found).length) return;
    setBusy(true);
    window.setTimeout(() => {
      const gift: Gift = {
        ref: "LN-" + Math.random().toString(36).slice(2, 7).toUpperCase(),
        campaign: campaign?.slug ?? null,
        amount,
        monthly,
        name: details.offBoard ? "A neighbour" : details.first,
        onBoard: !details.offBoard,
        date: brand.asOf,
      };
      gifts.set([...gifts.get(), gift]);
      setBusy(false);
      setDone(gift);
      window.scrollTo({ top: 0 });
    }, 1100);
  }

  if (done) {
    const c = campaigns.find((x) => x.slug === done.campaign);
    return (
      <div className="wrap donate-done" aria-live="polite">
        <div className="receipt">
          <h1>Thank you, {details.first}.</h1>
          <p>
            Your {done.monthly ? "monthly " : ""}gift of{" "}
            <strong>{money(done.amount)}</strong>{" "}
            {c ? `is on the board for ${c.title}` : "is in the general fund"}. A
            receipt is on its way to {details.email}.
          </p>
          <dl className="receipt-lines">
            <div>
              <dt>Reference</dt>
              <dd>{done.ref}</dd>
            </div>
            <div>
              <dt>Date</dt>
              <dd>{formatDate(done.date)}</dd>
            </div>
            <div>
              <dt>Gift</dt>
              <dd>
                {money(done.amount)}
                {done.monthly ? " a month" : ""}
              </dd>
            </div>
            {fee > 0 && (
              <div>
                <dt>Card fees covered</dt>
                <dd>{money(fee)}</dd>
              </div>
            )}
            <div>
              <dt>On the board as</dt>
              <dd>{done.name}</dd>
            </div>
          </dl>
          <p className="quiet">{copy.demoNote}</p>
          <div className="btn-row">
            {c && (
              <Link to={`/campaigns/${c.slug}`} className="btn">
                See the board
              </Link>
            )}
            <Link to="/events/lantern-walk" className="btn btn-ghost">
              Walk with us on 14 November
            </Link>
          </div>
        </div>
        {c && <Board campaign={c} />}
      </div>
    );
  }

  return (
    <>
      <header className="page-head wrap">
        <h1>{copy.title}</h1>
        <p>{copy.text}</p>
      </header>

      <div className="wrap donate-grid">
        <div className="donate-flow">
          <ol className="steps" aria-label="Donation steps">
            {steps.map((s, i) => (
              <li
                key={s}
                aria-current={i === step ? "step" : undefined}
                data-done={i < step || undefined}
              >
                <span className="step-num">{i + 1}</span> {s}
              </li>
            ))}
          </ol>

          {step === 0 && (
            <form
              noValidate
              onSubmit={nextFromGift}
              onInput={clearError(setErrors)}
              className="flow-form"
            >
              <h2 ref={stepHeading} tabIndex={-1}>
                Your gift
              </h2>
              <fieldset className="segmented">
                <legend>How often</legend>
                <label>
                  <input
                    type="radio"
                    name="frequency"
                    checked={!monthly}
                    onChange={() => switchFrequency(false)}
                  />{" "}
                  <span>Once</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="frequency"
                    checked={monthly}
                    onChange={() => switchFrequency(true)}
                  />{" "}
                  <span>Monthly</span>
                </label>
              </fieldset>
              <fieldset className="amount-grid">
                <legend>Amount{monthly ? " each month" : ""}</legend>
                {presets.map((p) => (
                  <label key={p} className="amount-tile">
                    <input
                      type="radio"
                      name="amount"
                      checked={choice === p}
                      onChange={() => setChoice(p)}
                    />
                    <span>{money(p)}</span>
                  </label>
                ))}
                <label className="amount-tile">
                  <input
                    type="radio"
                    name="amount"
                    checked={choice === "other"}
                    onChange={() => setChoice("other")}
                  />
                  <span>Other</span>
                </label>
              </fieldset>
              {choice === "other" && (
                <Field
                  label="Other amount, in dollars"
                  name="other-amount"
                  type="number"
                  inputMode="numeric"
                  min={5}
                  max={10000}
                  step={1}
                  required
                  value={other}
                  onChange={(e) => setOther(e.target.value)}
                  error={errors["other-amount"]}
                  autoFocus
                />
              )}
              <SelectField
                label="Give to"
                name="target"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                hint="Campaign gifts are restricted: they are only spent on that campaign."
              >
                <option value="">{donate.general}</option>
                {open.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.title}
                  </option>
                ))}
              </SelectField>
              <label className="check">
                <input
                  type="checkbox"
                  checked={cover}
                  onChange={(e) => setCover(e.target.checked)}
                />
                <span>
                  Add {money(Math.max(1, Math.round(amount * 0.03)))} to cover
                  card fees, so all of my gift reaches the campaign
                </span>
              </label>
              <div className="flow-actions">
                <button type="submit" className="btn btn-flame">
                  Continue
                </button>
              </div>
            </form>
          )}

          {step === 1 && (
            <form
              noValidate
              onSubmit={nextFromDetails}
              onInput={clearError(setErrors)}
              className="flow-form"
            >
              <h2 ref={stepHeading} tabIndex={-1}>
                About you
              </h2>
              <div className="field-row">
                <Field
                  label="First name"
                  name="first"
                  autoComplete="given-name"
                  required
                  defaultValue={details.first}
                  error={errors.first}
                />
                <Field
                  label="Last name"
                  name="last"
                  autoComplete="family-name"
                  required
                  defaultValue={details.last}
                  error={errors.last}
                />
              </div>
              <Field
                label="Email"
                name="email"
                type="email"
                autoComplete="email"
                required
                defaultValue={details.email}
                error={errors.email}
                hint="For your receipt. We send The Window only if you ask."
              />
              <Field
                label="ZIP code (optional)"
                name="zip"
                inputMode="numeric"
                autoComplete="postal-code"
                pattern="\d{5}"
                defaultValue={details.zip}
                error={errors.zip}
                className="field-short"
              />
              <TextField
                label="In honour or memory of (optional)"
                name="dedication"
                defaultValue={details.dedication}
                rows={2}
                hint="We'll write it on the board next to your gift."
              />
              <label className="check">
                <input
                  type="checkbox"
                  name="offBoard"
                  defaultChecked={details.offBoard}
                />
                <span>
                  Keep me off the board. I'll appear as “A neighbour”.
                </span>
              </label>
              <div className="flow-actions">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setStep(0)}
                >
                  <ArrowLeft size={18} aria-hidden="true" /> Back
                </button>
                <button type="submit" className="btn btn-flame">
                  Continue
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form
              noValidate
              onSubmit={pay}
              onInput={clearError(setErrors)}
              className="flow-form"
              aria-busy={busy}
            >
              <h2 ref={stepHeading} tabIndex={-1}>
                Card
              </h2>
              <Field
                label="Name on card"
                name="card-name"
                autoComplete="cc-name"
                required
                defaultValue={`${details.first} ${details.last}`}
                error={errors["card-name"]}
              />
              <Field
                label="Card number"
                name="card-number"
                autoComplete="cc-number"
                inputMode="numeric"
                required
                placeholder="4242 4242 4242 4242"
                error={errors["card-number"]}
              />
              <div className="field-row">
                <Field
                  label="Expiry (MM/YY)"
                  name="card-expiry"
                  autoComplete="cc-exp"
                  required
                  placeholder="08/29"
                  error={errors["card-expiry"]}
                />
                <Field
                  label="Security code"
                  name="card-cvc"
                  autoComplete="cc-csc"
                  inputMode="numeric"
                  pattern="\d{3,4}"
                  required
                  error={errors["card-cvc"]}
                />
              </div>
              <p className="quiet">
                <Lock size={14} aria-hidden="true" /> {copy.demoNote}
              </p>
              <div className="flow-actions">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setStep(1)}
                  disabled={busy}
                >
                  <ArrowLeft size={18} aria-hidden="true" /> Back
                </button>
                <button type="submit" className="btn btn-flame" disabled={busy}>
                  {busy
                    ? "Lighting the board…"
                    : `Give ${money(amount + fee)}${monthly ? " a month" : ""}`}
                </button>
              </div>
            </form>
          )}
        </div>

        <aside className="donate-summary" aria-label="Gift summary">
          <h2>Your gift</h2>
          <p className="summary-amount">
            {money(amount + fee)}
            <span>{monthly ? " a month" : " once"}</span>
          </p>
          <p>To {campaign ? campaign.title : donate.general.toLowerCase()}</p>
          {campaign ? (
            <>
              <Bar campaign={campaign} />
              <p className="quiet">
                {progress(campaign, all).raised + amount >= campaign.goal
                  ? "Your gift fills this board."
                  : `${money(campaign.goal - progress(campaign, all).raised - amount)} left to raise after yours.`}
              </p>
            </>
          ) : (
            <p className="quiet">
              The general fund answers small grants within a week: rent arrears,
              a fridge after a flood, a school uniform.
            </p>
          )}
          <p className="quiet">{donate.promise}</p>
        </aside>
      </div>

      <section className="section wrap faq">
        <h2>Before you give</h2>
        <div className="faq-list">
          {donate.faq.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
