import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { Check } from "lucide-react";
import { Link } from "../router";
import {
  brand,
  joiningFee,
  plans,
  slots,
  trainers,
  type Plan,
} from "../content";
import {
  clock,
  hashParams,
  money,
  pause,
  trainerById,
  validate,
  weekday,
  type Errors,
} from "../lib";
import { Field } from "../components/Field";

type Data = Record<string, string>;
const steps = ["Plan", "First session", "Your details"];
const iso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const addDays = (d: Date, n: number) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
const longDate = (d: Date) =>
  d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
const parse = (s: string) => {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
};

const health = [
  {
    name: "h_heart",
    q: "Has a doctor ever told you not to exercise because of your heart or blood pressure?",
  },
  {
    name: "h_injury",
    q: "Are you recovering from an injury or surgery in the last six months?",
  },
  {
    name: "h_pregnant",
    q: "Are you pregnant or have you given birth in the last six months?",
  },
];

/** Foundations groups starting on or after the chosen start date. */
function foundationsFrom(start: Date) {
  const times = slots.filter((s) => s.classId === "foundations");
  const out: { value: string; label: string; coach: string }[] = [];
  for (let i = 0; i < 21 && out.length < 6; i++) {
    const date = addDays(start, i);
    for (const s of times.filter((t) => t.day === weekday(date))) {
      out.push({
        value: `${iso(date)} ${s.time}`,
        label: `${longDate(date)}, ${clock(s.time)}`,
        coach: trainerById(s.trainerId)!.name,
      });
    }
  }
  return out.slice(0, 6);
}

export function Join() {
  const today = new Date();
  const [data, setData] = useState<Data>(() => {
    const q = hashParams();
    const plan = plans.some((p) => p.id === q.get("plan"))
      ? q.get("plan")!
      : "classes";
    const coach = trainers.some((t) => t.id === q.get("coach"))
      ? q.get("coach")!
      : "any";
    return {
      plan,
      billing: q.get("billing") === "annual" ? "annual" : "monthly",
      start: iso(addDays(today, 3)),
      coach,
    };
  });
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  const head = useRef<HTMLHeadingElement>(null);

  const plan = plans.find((p) => p.id === data.plan) as Plan;
  const price = data.billing === "annual" ? plan.annual : plan.monthly;
  const dueToday = price + (data.billing === "monthly" ? joiningFee : 0);
  const groups = data.start ? foundationsFrom(parse(data.start)) : [];
  const group = groups.find((g) => g.value === data.group);

  const onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const t = e.target;
    const value =
      t instanceof HTMLInputElement && t.type === "checkbox"
        ? t.checked
          ? "yes"
          : ""
        : t.value;
    setData((d) => ({ ...d, [t.name]: value }));
    if (errors[t.name]) setErrors(({ [t.name]: _, ...rest }) => rest);
  };

  const go = (n: number) => {
    setStep(n);
    setErrors({});
    requestAnimationFrame(() => head.current?.focus());
  };

  const custom = (): Errors => {
    const extra: Errors = {};
    if (step === 0 && data.start) {
      const s = parse(data.start);
      // addDays(today, 0) is today at midnight.
      if (s < addDays(today, 0) || s > addDays(today, 60))
        extra.start =
          "Pick a start date between today and two months from now.";
    }
    if (step === 1 && data.group && !group)
      extra.group =
        "That group no longer fits your start date — choose another.";
    if (step === 2 && data.dob) {
      const dob = parse(data.dob);
      if (
        new Date(dob.getFullYear() + 18, dob.getMonth(), dob.getDate()) > today
      ) {
        extra.dob =
          "Members must be 18 or over. Under-18s can join our teen strength course at the desk.";
      }
    }
    return extra;
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(
      e.currentTarget,
      {
        start: "Choose the date you'd like your membership to begin.",
        group: "Choose a Foundations group so we can save you a place.",
        name: "Enter your full name as it appears on your ID.",
        email:
          "Enter an email like you@example.com — your membership card goes there.",
        phone:
          "Enter a phone number with at least 10 digits, like +1 555 0100 1234.",
        dob: "Enter your date of birth.",
        ec_name: "Tell us who to call in an emergency.",
        ec_phone: "Enter their phone number with at least 10 digits.",
        h_heart: "Answer yes or no.",
        h_injury: "Answer yes or no.",
        h_pregnant: "Answer yes or no.",
        terms: "Tick to confirm you've read the membership terms.",
      },
      custom(),
    );
    setErrors(found);
    if (Object.keys(found).length) return;
    if (step < 2) return go(step + 1);
    setBusy(true);
    await pause(1100);
    setBusy(false);
    setDone(`IRN-${String(Math.floor(10000 + Math.random() * 89999))}`);
    requestAnimationFrame(() => head.current?.focus());
  };

  const flagged = health.some((h) => data[h.name] === "yes");
  const startLabel = data.start ? longDate(parse(data.start)) : "—";

  if (done) {
    return (
      <section className="wrap join-done" aria-live="polite">
        <Check className="join-done-icon" aria-hidden="true" />
        <h1 ref={head} tabIndex={-1}>
          You're in, {data.name.split(" ")[0]}
        </h1>
        <p className="lede">
          Membership <strong>{done}</strong> · {plan.name},{" "}
          {data.billing === "annual" ? "paid yearly" : "paid monthly"}, starting{" "}
          {startLabel}.
        </p>
        <ol className="next-steps">
          <li>
            <strong>Foundations:</strong> {group?.label} with {group?.coach}.
            Arrive ten minutes early and bring flat shoes.
          </li>
          {plan.id === "coached" && (
            <li>
              <strong>Your coach:</strong>{" "}
              {data.coach === "any"
                ? "we'll match you within two working days"
                : `${trainerById(data.coach)!.name} will message you to book your first session`}
              .
            </li>
          )}
          {flagged && (
            <li>
              <strong>Health check:</strong> Sofia will call {data.phone} before
              your first session to talk through what you told us.
            </li>
          )}
          <li>
            <strong>The app:</strong> a sign-in link is on its way to{" "}
            {data.email}. Class booking opens once Foundations week one is done.
          </li>
        </ol>
        <p className="quiet">
          This is a demo: nothing was sent or charged, and no card was taken.
        </p>
        <div className="actions">
          <Link to="/timetable" className="btn btn-primary">
            See the timetable
          </Link>
          <Link to="/programme" className="btn btn-ghost">
            Build your first programme
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <header className="page-head wrap">
        <h1>Join Iron</h1>
        <p className="lede">
          Three short steps. Your first four weeks are the Foundations course,
          whatever plan you choose.
        </p>
      </header>

      <div className="wrap join">
        <div className="join-main">
          <ol className="stepper">
            {steps.map((s, i) => (
              <li
                key={s}
                aria-current={i === step ? "step" : undefined}
                data-done={i < step ? "" : undefined}
              >
                <span className="stepper-n">
                  {i < step ? <Check aria-hidden="true" /> : i + 1}
                </span>
                {i < step ? (
                  <button
                    type="button"
                    className="stepper-back"
                    onClick={() => go(i)}
                  >
                    {s}
                    <span className="sr-only"> (completed, edit)</span>
                  </button>
                ) : (
                  <span>{s}</span>
                )}
              </li>
            ))}
          </ol>

          <form
            noValidate
            onSubmit={submit}
            className="join-form"
            aria-labelledby="step-title"
          >
            <h2 id="step-title" ref={head} tabIndex={-1}>
              {steps[step]}
            </h2>

            {step === 0 && (
              <>
                <fieldset className="choice-set">
                  <legend>Membership</legend>
                  {plans.map((p) => (
                    <label key={p.id} className="choice">
                      <input
                        type="radio"
                        name="plan"
                        value={p.id}
                        checked={data.plan === p.id}
                        onChange={onChange}
                        required
                      />
                      <span>
                        <strong>
                          {p.name} <em>{money(p.monthly)}/mo</em>
                        </strong>
                        <span>{p.pitch}</span>
                      </span>
                    </label>
                  ))}
                </fieldset>
                <fieldset className="segmented">
                  <legend>Billing</legend>
                  <label>
                    <input
                      type="radio"
                      name="billing"
                      value="monthly"
                      checked={data.billing === "monthly"}
                      onChange={onChange}
                    />
                    <span>Monthly</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="billing"
                      value="annual"
                      checked={data.billing === "annual"}
                      onChange={onChange}
                    />
                    <span>Yearly, two months free</span>
                  </label>
                </fieldset>
                <Field
                  label="Start date"
                  name="start"
                  type="date"
                  required
                  min={iso(today)}
                  max={iso(addDays(today, 60))}
                  value={data.start}
                  onChange={onChange}
                  hint="Any day in the next two months. Billing starts on this date."
                  error={errors.start}
                />
              </>
            )}

            {step === 1 && (
              <>
                <fieldset
                  className="choice-set"
                  aria-describedby={errors.group ? "group-err" : undefined}
                  data-invalid={errors.group ? "" : undefined}
                >
                  <legend>Foundations group</legend>
                  <p className="field-hint">
                    Six people, one coach, four weeks — same day and time each
                    week.
                  </p>
                  {groups.map((g) => (
                    <label key={g.value} className="choice">
                      <input
                        type="radio"
                        name="group"
                        value={g.value}
                        checked={data.group === g.value}
                        onChange={onChange}
                        required
                      />
                      <span>
                        <strong>{g.label}</strong>
                        <span>with {g.coach} · 60 min · Platforms</span>
                      </span>
                    </label>
                  ))}
                  {errors.group && (
                    <p className="field-error" id="group-err">
                      {errors.group}
                    </p>
                  )}
                </fieldset>
                {plan.id === "coached" && (
                  <Field
                    label="Your coach"
                    name="coach"
                    error={errors.coach}
                    hint="Two personal sessions a month, booked with this coach."
                  >
                    <select value={data.coach} onChange={onChange}>
                      <option value="any">Match me with a coach</option>
                      {trainers.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.name} — {t.specialties[0]}
                        </option>
                      ))}
                    </select>
                  </Field>
                )}
                <Field
                  label="Anything your coach should know? (optional)"
                  name="notes"
                  hint="Old injuries, goals, the lift you're nervous about."
                >
                  <textarea
                    rows={4}
                    value={data.notes ?? ""}
                    onChange={onChange}
                    maxLength={600}
                  />
                </Field>
              </>
            )}

            {step === 2 && (
              <>
                <div className="field-row">
                  <Field
                    label="Full name"
                    name="name"
                    required
                    autoComplete="name"
                    value={data.name ?? ""}
                    onChange={onChange}
                    error={errors.name}
                  />
                  <Field
                    label="Date of birth"
                    name="dob"
                    type="date"
                    required
                    max={iso(today)}
                    value={data.dob ?? ""}
                    onChange={onChange}
                    error={errors.dob}
                  />
                </div>
                <div className="field-row">
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={data.email ?? ""}
                    onChange={onChange}
                    error={errors.email}
                  />
                  <Field
                    label="Mobile"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    pattern="\+?[\d\s\(\)\-]{10,}"
                    value={data.phone ?? ""}
                    onChange={onChange}
                    error={errors.phone}
                  />
                </div>
                <div className="field-row">
                  <Field
                    label="Emergency contact"
                    name="ec_name"
                    required
                    value={data.ec_name ?? ""}
                    onChange={onChange}
                    error={errors.ec_name}
                  />
                  <Field
                    label="Their phone"
                    name="ec_phone"
                    type="tel"
                    required
                    pattern="\+?[\d\s\(\)\-]{10,}"
                    value={data.ec_phone ?? ""}
                    onChange={onChange}
                    error={errors.ec_phone}
                  />
                </div>
                <fieldset className="health">
                  <legend>Three health questions</legend>
                  <p className="field-hint">
                    A yes doesn't stop you joining — it means a coach calls you
                    first.
                  </p>
                  {health.map((h) => (
                    <fieldset
                      key={h.name}
                      className="yn"
                      data-invalid={errors[h.name] ? "" : undefined}
                      aria-describedby={
                        errors[h.name] ? `${h.name}-err` : undefined
                      }
                    >
                      <legend>{h.q}</legend>
                      {["no", "yes"].map((v) => (
                        <label key={v}>
                          <input
                            type="radio"
                            name={h.name}
                            value={v}
                            checked={data[h.name] === v}
                            onChange={onChange}
                            required
                          />
                          <span>{v === "yes" ? "Yes" : "No"}</span>
                        </label>
                      ))}
                      {errors[h.name] && (
                        <p className="field-error" id={`${h.name}-err`}>
                          {errors[h.name]}
                        </p>
                      )}
                    </fieldset>
                  ))}
                </fieldset>
                <div
                  className="check"
                  data-invalid={errors.terms ? "" : undefined}
                >
                  <label>
                    <input
                      type="checkbox"
                      name="terms"
                      required
                      checked={data.terms === "yes"}
                      onChange={onChange}
                      aria-invalid={errors.terms ? true : undefined}
                      aria-describedby={errors.terms ? "terms-err" : undefined}
                    />
                    <span>
                      I've read the membership terms: 30 days' notice to cancel
                      monthly plans, freezes up to eight weeks a year.
                    </span>
                  </label>
                  {errors.terms && (
                    <p className="field-error" id="terms-err">
                      {errors.terms}
                    </p>
                  )}
                </div>
              </>
            )}

            <div className="join-nav">
              {step > 0 && (
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => go(step - 1)}
                  disabled={busy}
                >
                  Back
                </button>
              )}
              <button
                type="submit"
                className="btn btn-primary"
                disabled={busy}
                aria-busy={busy || undefined}
              >
                {busy
                  ? "Creating your membership…"
                  : step < 2
                    ? `Continue to ${steps[step + 1].toLowerCase()}`
                    : "Confirm membership"}
              </button>
            </div>
            <p className="sr-only" aria-live="polite">
              {Object.keys(errors).length
                ? `${Object.keys(errors).length} fields need attention.`
                : ""}
            </p>
            <p className="quiet">
              Demo only: nothing you enter is sent anywhere.
            </p>
          </form>
        </div>

        <aside className="join-summary" aria-label="Your membership">
          <h2>Summary</h2>
          <dl>
            <div>
              <dt>Plan</dt>
              <dd>{plan.name}</dd>
            </div>
            <div>
              <dt>Billing</dt>
              <dd>
                {money(price)}{" "}
                {data.billing === "annual" ? "a year" : "a month"}
              </dd>
            </div>
            <div>
              <dt>Joining fee</dt>
              <dd>
                {data.billing === "annual" ? "Waived" : money(joiningFee)}
              </dd>
            </div>
            <div>
              <dt>Starts</dt>
              <dd>{startLabel}</dd>
            </div>
            <div>
              <dt>Foundations</dt>
              <dd>
                {group
                  ? `${group.label.split(",")[0]}, ${group.label.split(", ").pop()}`
                  : "Choose in step 2"}
              </dd>
            </div>
            {plan.id === "coached" && (
              <div>
                <dt>Coach</dt>
                <dd>
                  {data.coach === "any"
                    ? "Matched for you"
                    : trainerById(data.coach)!.name}
                </dd>
              </div>
            )}
          </dl>
          <p className="join-due">
            <span>Due on your start date</span>
            <strong>{money(dueToday)}</strong>
          </p>
          <p className="quiet">
            Questions first? Call <a href={brand.phoneHref}>{brand.phone}</a> or
            read <Link to="/classes/foundations">what Foundations covers</Link>.
          </p>
        </aside>
      </div>
    </>
  );
}
