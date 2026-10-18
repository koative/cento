import { useRef, useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Link } from "../router";
import { apply, brand, images, programmes } from "../content";
import { pause, validate, type Errors } from "../lib/forms";
import { longDate, money } from "../lib/format";
import { upcoming } from "../lib/programmes";
import { describeScores, ranked, useWheel } from "../lib/wheel";
import { Field, useErrors } from "../components/Field";

const steps = ["You", "Your team", "What you want", "Check and send"];

const timezones = [
  "Pacific (US)",
  "Mountain (US)",
  "Central (US)",
  "Eastern (US)",
  "UK & Ireland",
  "Central Europe",
  "East Africa",
  "India",
  "Singapore & Perth",
  "Australia East",
  "Somewhere else",
];
const tenures = [
  "Starting in the next month",
  "Less than 6 months",
  "6 to 18 months",
  "18 months to 3 years",
  "More than 3 years",
];

const messages: Record<string, string> = {
  name: "Add your name so I know who I'm writing back to.",
  email: "Enter an email like you@example.com; my reply goes there.",
  timezone: "Choose your time zone so I suggest call times you can make.",
  linkedin:
    "That doesn't look like a web address. Paste the full link starting with https://, or leave it empty.",
  role: "Add your job title, even if it's new.",
  reports: "Enter how many people report to you directly, from 1 to 200.",
  tenure: "Choose how long you've managed people.",
  managers: "Tell me whether anyone who reports to you manages people.",
  hard: "Give me at least a couple of sentences (40 characters or more) about what's hard right now.",
  different:
    "Describe what would be different in three months, in a sentence or more.",
  payer: "Choose who'd pay, or “Not sure yet”.",
  consent: "Tick the box so I'm allowed to email you about this application.",
};

/** Three working days from today, for the reply promise. */
function replyBy() {
  const d = new Date();
  for (let n = 0; n < 3;) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() !== 0 && d.getDay() !== 6) n++;
  }
  return longDate(d.toISOString().slice(0, 10));
}

type Review = Record<string, string>;

export function Apply() {
  const [query] = useState(
    () => new URLSearchParams(window.location.hash.split("?")[1] ?? ""),
  );
  const [step, setStep] = useState(0);
  const [slug, setSlug] = useState(
    programmes.some((p) => p.slug === query.get("programme"))
      ? query.get("programme")!
      : "not-sure",
  );
  const [review, setReview] = useState<Review>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<{ name: string; email: string } | null>(
    null,
  );
  const { errors, setErrors, onChange } = useErrors();
  const formRef = useRef<HTMLFormElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const { scores, touched } = useWheel();

  const programme = programmes.find((p) => p.slug === slug);
  const cohorts = programme
    ? upcoming(programme).filter((c) => c.left > 0)
    : [];

  const currentStep = () =>
    formRef.current!.querySelector<HTMLElement>(`[data-step="${step}"]`)!;

  /** Rules the browser can't express: they depend on two answers together. */
  const crossCheck = (data: FormData): Errors => {
    const extra: Errors = {};
    if (
      step === 2 &&
      slug === "leading-managers" &&
      data.get("managers") === "no"
    ) {
      extra.programme =
        "Leading Managers is for people whose reports manage people. Choose New Manager Cohort, or “Not sure yet” and I'll suggest one.";
    }
    return extra;
  };

  const go = (to: number) => {
    setStep(to);
    requestAnimationFrame(() => headRef.current?.focus());
  };

  const next = () => {
    const data = new FormData(formRef.current!);
    const found = validate(currentStep(), messages, crossCheck(data));
    setErrors(found);
    if (Object.keys(found).length) return;
    if (step === 2)
      setReview(
        Object.fromEntries(
          Array.from(data.entries()).map(([k, v]) => [k, String(v)]),
        ),
      );
    go(step + 1);
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step < steps.length - 1) return next();
    const found = validate(currentStep(), messages);
    setErrors(found);
    if (Object.keys(found).length) return;
    setSending(true);
    await pause(1100);
    setSending(false);
    setSent({ name: review.name.split(" ")[0], email: review.email });
    requestAnimationFrame(() => document.getElementById("done-h")?.focus());
  };

  const programmeLabel = programme
    ? programme.name
    : "Not sure yet: please recommend one";
  const lowest = ranked(scores).slice(0, 2);

  return (
    <div className="page apply-page">
      <header className="page-head wrap">
        <h1>{apply.title}</h1>
        <p className="lede">{apply.intro}</p>
      </header>

      <div className="wrap apply-layout">
        <div className="apply-main">
          <p className="sr-only" aria-live="polite">
            {sent
              ? `Application sent. Margo will reply to ${sent.email} by ${replyBy()}.`
              : ""}
          </p>
          {sent ? (
            <section className="apply-done" aria-labelledby="done-h">
              <Check aria-hidden="true" className="done-tick" />
              <h2 id="done-h" tabIndex={-1}>
                Thank you, {sent.name}. It's on my desk.
              </h2>
              <p className="lede">
                I'll read it properly and reply to {sent.email} by {replyBy()},
                with a recommendation and, if it fits, a link to book our free
                30-minute call.
              </p>
              <p>
                In the meantime, the free worksheets are a good place to start.
              </p>
              <div className="hero-actions">
                <Link to="/resources" className="btn btn-ink">
                  Browse free resources <ArrowRight aria-hidden="true" />
                </Link>
                <Link to="/podcast" className="btn btn-line">
                  Listen to the podcast
                </Link>
              </div>
              <p className="form-small">
                Demo only: nothing was sent anywhere.
              </p>
            </section>
          ) : (
            <>
              <ol className="stepper" aria-label="Application steps">
                {steps.map((s, i) => (
                  <li
                    key={s}
                    aria-current={i === step ? "step" : undefined}
                    data-done={i < step ? "" : undefined}
                  >
                    <span className="num">{i + 1}</span>
                    {s}
                  </li>
                ))}
              </ol>

              <form
                ref={formRef}
                noValidate
                onSubmit={submit}
                onChange={onChange}
                className="apply-form"
              >
                <h2 ref={headRef} tabIndex={-1} className="step-title">
                  Step {step + 1} of {steps.length}: {steps[step]}
                </h2>

                <fieldset data-step="0" hidden={step !== 0} className="step">
                  <legend className="sr-only">You</legend>
                  <div className="form-grid">
                    <Field
                      label="Your name"
                      name="name"
                      required
                      autoComplete="name"
                      error={errors.name}
                    />
                    <Field
                      label="Email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      error={errors.email}
                    />
                    <Field
                      label="Time zone"
                      name="timezone"
                      error={errors.timezone}
                    >
                      <select required defaultValue="">
                        <option value="" disabled>
                          Choose one
                        </option>
                        {timezones.map((t) => (
                          <option key={t}>{t}</option>
                        ))}
                      </select>
                    </Field>
                    <Field
                      label="LinkedIn (optional)"
                      name="linkedin"
                      type="url"
                      placeholder="https://"
                      hint="Helps me understand your context. Never shared."
                      error={errors.linkedin}
                    />
                  </div>
                </fieldset>

                <fieldset data-step="1" hidden={step !== 1} className="step">
                  <legend className="sr-only">Your team</legend>
                  <div className="form-grid">
                    <Field
                      label="Job title"
                      name="role"
                      required
                      autoComplete="organization-title"
                      error={errors.role}
                    />
                    <Field
                      label="People reporting to you directly"
                      name="reports"
                      type="number"
                      inputMode="numeric"
                      min={1}
                      max={200}
                      required
                      error={errors.reports}
                    />
                    <Field
                      label="How long you've managed people"
                      name="tenure"
                      error={errors.tenure}
                      className="span-2"
                    >
                      <select required defaultValue="">
                        <option value="" disabled>
                          Choose one
                        </option>
                        {tenures.map((t) => (
                          <option key={t}>{t}</option>
                        ))}
                      </select>
                    </Field>
                  </div>
                  <fieldset
                    className="radios"
                    aria-describedby={
                      errors.managers ? "managers-err" : undefined
                    }
                    data-invalid={errors.managers ? "" : undefined}
                  >
                    <legend>
                      Does anyone who reports to you manage people?
                    </legend>
                    <label>
                      <input
                        type="radio"
                        name="managers"
                        value="yes"
                        required
                      />{" "}
                      Yes
                    </label>
                    <label>
                      <input type="radio" name="managers" value="no" /> No, not
                      yet
                    </label>
                    {errors.managers && (
                      <p className="field-error" id="managers-err">
                        {errors.managers}
                      </p>
                    )}
                  </fieldset>
                </fieldset>

                <fieldset data-step="2" hidden={step !== 2} className="step">
                  <legend className="sr-only">What you want</legend>
                  <div className="form-grid">
                    <Field
                      label="Programme"
                      name="programme"
                      error={errors.programme}
                      className={cohorts.length ? "" : "span-2"}
                    >
                      <select
                        value={slug}
                        onChange={(e) => {
                          setSlug(e.target.value);
                          setErrors(({ programme: _, ...rest }) => rest);
                        }}
                      >
                        <option value="not-sure">
                          Not sure yet: please recommend one
                        </option>
                        {programmes.map((p) => (
                          <option key={p.slug} value={p.slug}>
                            {p.name} ({p.priceNote ? "from " : ""}
                            {money(p.price)})
                          </option>
                        ))}
                      </select>
                    </Field>
                    {cohorts.length > 0 && (
                      <Field label="Start date" name="cohort">
                        <select
                          key={slug}
                          defaultValue={query.get("cohort") ?? cohorts[0].start}
                        >
                          {cohorts.map((c) => (
                            <option key={c.start} value={c.start}>
                              {longDate(c.start)} ({c.left} places left)
                            </option>
                          ))}
                        </select>
                      </Field>
                    )}
                    <Field
                      label="What's hard right now?"
                      name="hard"
                      error={errors.hard}
                      className="span-2"
                      hint="The real version. It stays between us."
                    >
                      <textarea rows={5} required minLength={40} />
                    </Field>
                    <Field
                      label="What would be different in three months if this worked?"
                      name="different"
                      error={errors.different}
                      className="span-2"
                    >
                      <textarea rows={3} required minLength={20} />
                    </Field>
                  </div>

                  <fieldset
                    className="radios"
                    aria-describedby={errors.payer ? "payer-err" : undefined}
                    data-invalid={errors.payer ? "" : undefined}
                  >
                    <legend>Who would pay?</legend>
                    {["Me", "My company", "Not sure yet"].map((v) => (
                      <label key={v}>
                        <input type="radio" name="payer" value={v} required />{" "}
                        {v}
                      </label>
                    ))}
                    {errors.payer && (
                      <p className="field-error" id="payer-err">
                        {errors.payer}
                      </p>
                    )}
                  </fieldset>

                  {programme?.plan && (
                    <fieldset className="radios" key={slug}>
                      <legend>Payment</legend>
                      <label>
                        <input
                          type="radio"
                          name="pay"
                          value="full"
                          defaultChecked={query.get("pay") !== "plan"}
                        />{" "}
                        In full, {money(programme.price)}
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="pay"
                          value="plan"
                          defaultChecked={query.get("pay") === "plan"}
                        />{" "}
                        {programme.plan.count} monthly payments of{" "}
                        {money(programme.plan.amount)}
                      </label>
                    </fieldset>
                  )}

                  {touched ? (
                    <label className="check wheel-attach">
                      <input
                        type="checkbox"
                        name="wheel"
                        value={describeScores(scores)}
                        defaultChecked
                      />
                      <span>
                        Attach my Manager's Wheel (lowest:{" "}
                        {lowest
                          .map((s) => `${s.label} ${scores[s.id]}`)
                          .join(", ")}
                        )
                      </span>
                    </label>
                  ) : (
                    <p className="form-small">
                      Tip: score your <Link to="/">Manager's Wheel</Link> first
                      and it attaches here automatically.
                    </p>
                  )}
                </fieldset>

                <fieldset data-step="3" hidden={step !== 3} className="step">
                  <legend className="sr-only">Check and send</legend>
                  <dl className="review">
                    {[
                      ["Name", review.name],
                      ["Email", review.email],
                      ["Time zone", review.timezone],
                      [
                        "Role",
                        `${review.role ?? ""}, ${review.reports ?? ""} direct reports`,
                      ],
                      ["Managing for", review.tenure],
                      [
                        "Programme",
                        programmeLabel +
                          (review.cohort
                            ? `, starting ${longDate(review.cohort)}`
                            : ""),
                      ],
                      [
                        "Who pays",
                        review.payer +
                          (review.pay === "plan" && programme?.plan
                            ? `, ${programme.plan.count} monthly payments`
                            : ""),
                      ],
                      ["What's hard", review.hard],
                      ["In three months", review.different],
                      [
                        "Manager's Wheel",
                        review.wheel ? "Attached" : "Not attached",
                      ],
                    ].map(([k, v]) => (
                      <div key={k}>
                        <dt>{k}</dt>
                        <dd>{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <div
                    className="field consent"
                    data-invalid={errors.consent ? "" : undefined}
                  >
                    <label className="check">
                      <input
                        type="checkbox"
                        name="consent"
                        required
                        aria-invalid={errors.consent ? true : undefined}
                        aria-describedby={
                          errors.consent ? "consent-err" : undefined
                        }
                      />
                      <span>
                        I'm happy for Margo to email me about this application.
                      </span>
                    </label>
                    {errors.consent && (
                      <p className="field-error" id="consent-err">
                        {errors.consent}
                      </p>
                    )}
                  </div>
                </fieldset>

                <div className="step-actions">
                  {step > 0 && (
                    <button
                      type="button"
                      className="btn btn-line"
                      onClick={() => go(step - 1)}
                      disabled={sending}
                    >
                      <ArrowLeft aria-hidden="true" /> Back
                    </button>
                  )}
                  <button
                    type="submit"
                    className="btn btn-ink"
                    disabled={sending}
                    aria-busy={sending}
                  >
                    {step < steps.length - 1 ? (
                      <>
                        Continue <ArrowRight aria-hidden="true" />
                      </>
                    ) : sending ? (
                      "Sending…"
                    ) : (
                      "Send application"
                    )}
                  </button>
                </div>
                <p className="form-small">
                  Demo form: nothing you type leaves this browser.
                </p>
              </form>
            </>
          )}
        </div>

        <aside className="apply-aside">
          <img
            src={images.call.src}
            alt={images.call.alt}
            width={images.call.w}
            height={images.call.h}
            loading="lazy"
          />
          <h2>What happens next</h2>
          <ol className="next-steps">
            {apply.next.map((n) => (
              <li key={n.title}>
                <strong>{n.title}</strong>
                {n.text}
              </li>
            ))}
          </ol>
          <h2>Before you start</h2>
          {apply.faq.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
          <p className="form-small">
            Questions first? <a href={`mailto:${brand.email}`}>{brand.email}</a>
          </p>
        </aside>
      </div>
    </div>
  );
}
