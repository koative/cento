import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
} from "react";
import {
  ArrowLeft,
  ArrowRight,
  CircleCheck,
  Hospital,
  Phone,
  Search,
  TriangleAlert,
} from "lucide-react";
import { Link } from "../router";
import {
  brand,
  clinicians,
  conditions,
  durations,
  insurers,
  plans,
  redFlags,
  severityWords,
  states,
  visitTypes,
  whileYouWait,
  type VisitType,
} from "../content";
import {
  money,
  pause,
  queueAt,
  recommend,
  useNow,
  validate,
  type Errors,
} from "../lib/care";
import { Field, useErrors } from "../components/Field";
import { Slip } from "../components/Slip";
import { visitIcon } from "../components/ConditionRow";

const stepNames = ["Who", "Reason", "Safety", "Symptoms", "Visit", "Details"];
type Who = "me" | "child" | "someone";
const whoLabel: Record<Who, string> = {
  me: "Me",
  child: "My child",
  someone: "Someone else, with them here",
};

export function CheckIn() {
  const preset = new URLSearchParams(
    window.location.hash.split("?")[1] ?? "",
  ).get("reason");
  const [code] = useState(
    () => `VT-${Math.floor(10000 + Math.random() * 89999)}`,
  );
  const [step, setStep] = useState(0);
  const [who, setWho] = useState<Who | "">("");
  const [age, setAge] = useState("");
  const [reason, setReason] = useState(
    conditions.some((c) => c.slug === preset) ? preset! : "",
  );
  const [other, setOther] = useState("");
  const [filter, setFilter] = useState("");
  const [flags, setFlags] = useState<string[]>([]);
  const [noFlags, setNoFlags] = useState(false);
  const [since, setSince] = useState("");
  const [severity, setSeverity] = useState(4);
  const [allergies, setAllergies] = useState("");
  const [visit, setVisit] = useState<VisitType | "">("");
  const [clinician, setClinician] = useState("first");
  const [pay, setPay] = useState<"insurance" | "self">("self");
  const [stepError, setStepError] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const { errors, setErrors, onChange } = useErrors();
  const heading = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);
  const queue = queueAt(useNow());

  const condition = conditions.find((c) => c.slug === reason);
  const route = recommend(condition, severity, flags);
  const options: VisitType[] = condition
    ? condition.visitTypes
    : ["video", "message", "scheduled"];
  const team = clinicians.filter(
    (c) => !condition || c.conditions.includes(condition.slug),
  );
  const doctor = clinicians.find((c) => c.slug === clinician);
  const severityWord = severityWords.find(([max]) => severity <= max)![1];
  const self = plans[0];
  const price =
    visit === "message"
      ? Math.min(condition?.price ?? self.message, self.message)
      : (condition?.price ?? self.visit);
  const filtered = conditions.filter(
    (c) =>
      !filter.trim() ||
      [c.name, ...c.symptoms].some((s) =>
        s.toLowerCase().includes(filter.trim().toLowerCase()),
      ),
  );

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    heading.current?.focus();
  }, [step, status]);

  const ageNum = Number(age);
  const checks: (() => string)[] = [
    () => {
      if (!who) return "Choose who the visit is for.";
      if (!age || !Number.isInteger(ageNum))
        return "Enter their age in whole years.";
      if (ageNum < 1)
        return "Vital sees children from age one. For a baby under one, call your pediatrician or 911.";
      if (who === "child" && ageNum > 17)
        return "For anyone 18 or over, choose “Me” or “Someone else”.";
      if (who !== "child" && ageNum < 18)
        return "For anyone under 18, choose “My child” so a parent joins the visit.";
      if (ageNum > 110) return "Check the age — it looks too high.";
      return "";
    },
    () =>
      !reason
        ? "Pick the closest match, or choose “Something else”."
        : reason === "other" && other.trim().length < 3
          ? "Describe what is going on in a few words."
          : "",
    () =>
      !flags.length && !noFlags
        ? "Tick any that apply, or confirm “None of these”."
        : "",
    () => (!since ? "Choose roughly how long this has been going on." : ""),
    () => (!visit ? "Choose how you would like to be seen." : ""),
  ];

  const next = () => {
    const problem = checks[step]();
    setStepError(problem);
    if (problem) return;
    setStep((s) => s + 1);
  };
  const back = () => {
    setStepError("");
    setStep((s) => s - 1);
  };

  const toggleFlag = (id: string) => {
    setNoFlags(false);
    setFlags((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const dob = String(new FormData(form).get("dob") ?? "");
    const extra: Errors =
      dob && new Date(dob) > new Date()
        ? {
            dob: "That date is in the future. Enter the date of birth as month, day, year.",
          }
        : {};
    const found = validate(
      form,
      {
        first:
          "Enter a first name so your clinician knows who they are calling.",
        last: "Enter a last name to match your pharmacy records.",
        dob: "Enter a date of birth — we use it to check prescriptions are safe.",
        email: "Enter an email like you@example.com for your visit note.",
        phone:
          "Enter a 10-digit phone number, like 555 013 4284, in case the video drops.",
        state:
          "Choose the state you are in right now — clinicians must be licensed there.",
        insurer: "Choose your insurance plan, or switch to self-pay.",
        member:
          "Enter the member ID from your card: 6 to 14 letters or numbers.",
        consent:
          "Tick to confirm you are in that state and agree to the telehealth consent.",
      },
      extra,
    );
    setErrors(found);
    if (Object.keys(found).length) return;
    setStatus("sending");
    await pause();
    setStatus("done");
  };

  const slipRows = [
    {
      label: "For",
      value: who
        ? `${who === "me" ? "You" : whoLabel[who].replace(", with them here", "")}${age ? `, ${age}` : ""}`
        : undefined,
    },
    {
      label: "Reason",
      value:
        reason === "other" ? other.trim() || "Something else" : condition?.name,
    },
    {
      label: "Red flags",
      value: flags.length
        ? "Stop — emergency care"
        : noFlags
          ? "None reported"
          : undefined,
      alert: flags.length > 0,
    },
    { label: "Since", value: since || undefined },
    { label: "Severity", value: step >= 3 ? `${severity} of 10` : undefined },
    {
      label: "Allergies",
      value: allergies.trim() || (step >= 4 ? "None listed" : undefined),
    },
    { label: "Visit", value: visit ? visitTypes[visit].label : undefined },
    {
      label: "Clinician",
      value: visit
        ? doctor
          ? `${doctor.name}, ${doctor.credentials}`
          : "First available"
        : undefined,
    },
  ];

  if (status === "done") {
    return (
      <section className="checkin">
        <div className="wrap checkin-done">
          <div aria-live="polite">
            <CircleCheck className="done-icon" aria-hidden="true" />
            <h1 ref={heading} tabIndex={-1}>
              You are checked in.
            </h1>
            <p className="lede">
              {visit === "message"
                ? `Your answers are with the care team. Expect a written plan by message within the hour.`
                : visit === "scheduled"
                  ? `${doctor ? doctor.name : "Your clinician"} will see you at ${doctor ? `${doctor.slots[0].day.toLowerCase()}, ${doctor.slots[0].times[0]}` : "the next open slot"}. We will text a reminder 15 minutes before.`
                  : queue.open
                    ? `You are third in the queue. ${doctor ? doctor.name : "The first available clinician"} should call in about ${queue.minutes} minutes.`
                    : `The video clinic ${queue.label.toLowerCase()}. You are first in the morning queue.`}
            </p>
            <h2 className="h3">While you wait</h2>
            <ul className="check-list">
              {whileYouWait.map((w) => (
                <li key={w}>
                  <CircleCheck aria-hidden="true" /> {w}
                </li>
              ))}
            </ul>
            <p className="footnote">
              This is a demo: nothing was sent, nobody will call and no card was
              charged.
            </p>
            <div className="actions">
              <Link to="/" className="btn btn-quiet">
                Back to home
              </Link>
              <Link to="/app" className="btn btn-primary">
                Get the app for your visit note
              </Link>
            </div>
          </div>
          <Slip
            code={code}
            rows={slipRows}
            footer={
              <span className="num">
                Due: {money(price)} · charged only after the visit
              </span>
            }
          />
        </div>
      </section>
    );
  }

  return (
    <section className="checkin">
      <div className="wrap">
        <div className="checkin-intro">
          <h1>Symptom check-in</h1>
          <p>
            Six short steps, about four minutes. Your answers build the visit
            slip a clinician reads before your visit. You pay nothing until they
            accept it.
          </p>
        </div>
        <ol className="progress" aria-label="Check-in steps">
          {stepNames.map((n, i) => (
            <li
              key={n}
              aria-current={i === step ? "step" : undefined}
              data-done={i < step ? "" : undefined}
            >
              <span className="num">{i + 1}</span> {n}
            </li>
          ))}
        </ol>

        <div className="checkin-grid">
          <div className="checkin-panel">
            {step === 0 && (
              <fieldset className="step">
                <legend>
                  <h2 ref={heading} tabIndex={-1}>
                    Who is this visit for?
                  </h2>
                </legend>
                <div className="choice-list">
                  {(Object.keys(whoLabel) as Who[]).map((w) => (
                    <label key={w} className="choice">
                      <input
                        type="radio"
                        name="who"
                        checked={who === w}
                        onChange={() => setWho(w)}
                      />
                      <span>{whoLabel[w]}</span>
                    </label>
                  ))}
                </div>
                <div className="field field-short">
                  <label htmlFor="ci-age">Their age</label>
                  <input
                    id="ci-age"
                    type="number"
                    inputMode="numeric"
                    min={1}
                    max={110}
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>
              </fieldset>
            )}

            {step === 1 && (
              <fieldset className="step">
                <legend>
                  <h2 ref={heading} tabIndex={-1}>
                    What is going on?
                  </h2>
                </legend>
                <div className="search">
                  <Search aria-hidden="true" />
                  <label className="sr-only" htmlFor="ci-filter">
                    Filter conditions
                  </label>
                  <input
                    id="ci-filter"
                    type="search"
                    placeholder="Type a symptom to narrow the list"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                  />
                </div>
                <div className="choice-list choice-grid">
                  {filtered.map((c) => (
                    <label key={c.slug} className="choice">
                      <input
                        type="radio"
                        name="reason"
                        checked={reason === c.slug}
                        onChange={() => (
                          setReason(c.slug),
                          setVisit(""),
                          setClinician("first")
                        )}
                      />
                      <span>
                        {c.name}
                        <small>{c.symptoms.slice(0, 2).join(", ")}</small>
                      </span>
                    </label>
                  ))}
                  <label className="choice">
                    <input
                      type="radio"
                      name="reason"
                      checked={reason === "other"}
                      onChange={() => (
                        setReason("other"),
                        setVisit(""),
                        setClinician("first")
                      )}
                    />
                    <span>
                      Something else
                      <small>Describe it in your own words</small>
                    </span>
                  </label>
                </div>
                {reason === "other" && (
                  <div className="field">
                    <label htmlFor="ci-other">
                      In a sentence, what is going on?
                    </label>
                    <textarea
                      id="ci-other"
                      rows={3}
                      maxLength={300}
                      value={other}
                      onChange={(e) => setOther(e.target.value)}
                    />
                  </div>
                )}
              </fieldset>
            )}

            {step === 2 && (
              <fieldset className="step">
                <legend>
                  <h2 ref={heading} tabIndex={-1}>
                    Right now, do you have any of these?
                  </h2>
                </legend>
                <p className="step-hint">
                  We ask everyone, every time. These need emergency care, not a
                  video visit.
                </p>
                <div className="choice-list">
                  {redFlags.map((f) => (
                    <label key={f.id} className="choice choice-flag">
                      <input
                        type="checkbox"
                        checked={flags.includes(f.id)}
                        onChange={() => toggleFlag(f.id)}
                      />
                      <span>{f.label}</span>
                    </label>
                  ))}
                  <label className="choice">
                    <input
                      type="checkbox"
                      checked={noFlags}
                      onChange={(e) => (
                        setNoFlags(e.target.checked),
                        e.target.checked && setFlags([])
                      )}
                    />
                    <span>None of these</span>
                  </label>
                </div>
                {route.kind === "emergency" && (
                  <div className="emergency" role="alert">
                    <TriangleAlert aria-hidden="true" />
                    <div>
                      <h3>Stop here and call 911.</h3>
                      <p>
                        {flags.includes("harm")
                          ? "If you are thinking about hurting yourself, call or text 988 to reach the Suicide & Crisis Lifeline, any time. If someone is in danger, call 911."
                          : "What you ticked can be serious and needs to be seen in person straight away. Do not drive yourself if you feel faint or have chest pain."}
                      </p>
                      <button
                        type="button"
                        className="btn btn-quiet"
                        onClick={() => setFlags([])}
                      >
                        I ticked one by mistake
                      </button>
                    </div>
                  </div>
                )}
              </fieldset>
            )}

            {step === 3 && (
              <fieldset className="step">
                <legend>
                  <h2 ref={heading} tabIndex={-1}>
                    How long, and how bad?
                  </h2>
                </legend>
                <div
                  className="segmented"
                  role="radiogroup"
                  aria-label="How long has this been going on?"
                >
                  {durations.map((d) => (
                    <label key={d}>
                      <input
                        type="radio"
                        name="since"
                        checked={since === d}
                        onChange={() => setSince(d)}
                      />
                      <span>{d}</span>
                    </label>
                  ))}
                </div>
                <div className="severity">
                  <label htmlFor="ci-sev">
                    How bad is it right now?{" "}
                    <strong className="num">{severity} of 10</strong>
                  </label>
                  <input
                    id="ci-sev"
                    type="range"
                    min={1}
                    max={10}
                    value={severity}
                    onChange={(e) => setSeverity(Number(e.target.value))}
                    aria-valuetext={`${severity} of 10, ${severityWord}`}
                    style={
                      {
                        "--fill": `${((severity - 1) / 9) * 100}%`,
                      } as CSSProperties
                    }
                  />
                  <p
                    className="severity-word"
                    data-high={
                      condition && severity >= condition.inPersonAt
                        ? ""
                        : undefined
                    }
                  >
                    {severityWord}
                  </p>
                </div>
                <div className="field">
                  <label htmlFor="ci-allergies">Medicine allergies</label>
                  <p className="field-hint" id="ci-allergies-hint">
                    Leave blank if none.
                  </p>
                  <input
                    id="ci-allergies"
                    aria-describedby="ci-allergies-hint"
                    value={allergies}
                    maxLength={120}
                    onChange={(e) => setAllergies(e.target.value)}
                    placeholder="For example, penicillin"
                  />
                </div>
              </fieldset>
            )}

            {step === 4 && (
              <fieldset className="step">
                <legend>
                  <h2 ref={heading} tabIndex={-1}>
                    How would you like to be seen?
                  </h2>
                </legend>
                {route.kind === "in-person" && (
                  <div className="advice" role="status">
                    <Hospital aria-hidden="true" />
                    <p>
                      At {severity} of 10, {condition?.name.toLowerCase()} is
                      usually better seen in person today, at urgent care or
                      your own doctor. You can still talk to a clinician first;
                      if they send you in within ten minutes, the visit is free.
                    </p>
                  </div>
                )}
                <div className="choice-list">
                  {options.map((t) => {
                    const Icon = visitIcon[t];
                    const wait =
                      t === "video"
                        ? queue.open
                          ? `${queue.minutes} min wait`
                          : queue.label
                        : t === "message"
                          ? "Reply ≈ 1 hr"
                          : "Pick a time";
                    return (
                      <label key={t} className="choice choice-visit">
                        <input
                          type="radio"
                          name="visit"
                          checked={visit === t}
                          onChange={() => setVisit(t)}
                        />
                        <Icon aria-hidden="true" />
                        <span>
                          {visitTypes[t].label}
                          <small>{visitTypes[t].text}</small>
                        </span>
                        <span className="choice-meta num">{wait}</span>
                      </label>
                    );
                  })}
                </div>
                <div className="field">
                  <label htmlFor="ci-clin">Clinician</label>
                  <select
                    id="ci-clin"
                    value={clinician}
                    onChange={(e) => setClinician(e.target.value)}
                  >
                    <option value="first">First available</option>
                    {team.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.name}, {c.credentials} — next{" "}
                        {c.slots[0].day.toLowerCase()} {c.slots[0].times[0]}
                      </option>
                    ))}
                  </select>
                </div>
              </fieldset>
            )}

            {step === 5 && (
              <form
                className="step"
                noValidate
                onSubmit={submit}
                onChange={onChange}
                aria-busy={status === "sending"}
              >
                <h2 ref={heading} tabIndex={-1}>
                  Last step: who should the clinician call?
                </h2>
                <div className="form-grid">
                  <Field
                    label="First name"
                    name="first"
                    required
                    autoComplete="given-name"
                    error={errors.first}
                  />
                  <Field
                    label="Last name"
                    name="last"
                    required
                    autoComplete="family-name"
                    error={errors.last}
                  />
                  <Field
                    label="Date of birth"
                    name="dob"
                    type="date"
                    required
                    autoComplete="bday"
                    error={errors.dob}
                  />
                  <Field
                    label="Mobile phone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    pattern="[\d\s\(\)\+\-]{10,16}"
                    placeholder="555 013 4284"
                    error={errors.phone}
                  />
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="span-2"
                    error={errors.email}
                  />
                  <Field
                    label="State you are in right now"
                    name="state"
                    error={errors.state}
                    className="span-2"
                  >
                    <select required defaultValue="">
                      <option value="" disabled>
                        Choose a state
                      </option>
                      {Object.entries(states).map(([abbr, name]) => (
                        <option key={abbr} value={abbr}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>
                <fieldset className="pay">
                  <legend>How are you paying?</legend>
                  <div className="segmented">
                    <label>
                      <input
                        type="radio"
                        name="pay"
                        checked={pay === "self"}
                        onChange={() => setPay("self")}
                      />
                      <span>Self-pay {money(price)}</span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="pay"
                        checked={pay === "insurance"}
                        onChange={() => setPay("insurance")}
                      />
                      <span>Insurance</span>
                    </label>
                  </div>
                  {pay === "insurance" && (
                    <div className="form-grid">
                      <Field
                        label="Insurance plan"
                        name="insurer"
                        error={errors.insurer}
                      >
                        <select required defaultValue="">
                          <option value="" disabled>
                            Choose your plan
                          </option>
                          {insurers.map((i) => (
                            <option key={i}>{i}</option>
                          ))}
                        </select>
                      </Field>
                      <Field
                        label="Member ID"
                        name="member"
                        required
                        pattern="[A-Za-z0-9]{6,14}"
                        autoComplete="off"
                        error={errors.member}
                      />
                    </div>
                  )}
                </fieldset>
                <div
                  className="field consent"
                  data-invalid={errors.consent ? "" : undefined}
                >
                  <label>
                    <input
                      type="checkbox"
                      name="consent"
                      required
                      aria-invalid={errors.consent ? true : undefined}
                      aria-describedby={
                        errors.consent ? "f-consent-err" : undefined
                      }
                    />
                    <span>
                      I am physically in the state above and agree to the
                      telehealth consent and privacy notice.
                    </span>
                  </label>
                  {errors.consent && (
                    <p className="field-error" id="f-consent-err">
                      {errors.consent}
                    </p>
                  )}
                </div>
                <div className="step-actions">
                  <button
                    type="button"
                    className="btn btn-quiet"
                    onClick={back}
                    disabled={status === "sending"}
                  >
                    <ArrowLeft aria-hidden="true" /> Back
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={status === "sending"}
                  >
                    {status === "sending" ? "Checking you in…" : "Check in now"}
                  </button>
                </div>
                <p className="footnote">
                  Demo only — nothing is sent anywhere and no one will call.
                </p>
              </form>
            )}

            {step < 5 && (
              <>
                <p className="step-error" role="alert">
                  {stepError}
                </p>
                <div className="step-actions">
                  {step > 0 ? (
                    <button
                      type="button"
                      className="btn btn-quiet"
                      onClick={back}
                    >
                      <ArrowLeft aria-hidden="true" /> Back
                    </button>
                  ) : (
                    <a className="btn btn-quiet" href={brand.phoneHref}>
                      <Phone aria-hidden="true" /> Rather call us?
                    </a>
                  )}
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={next}
                    disabled={route.kind === "emergency" && step === 2}
                  >
                    Continue <ArrowRight aria-hidden="true" />
                  </button>
                </div>
              </>
            )}
          </div>

          <aside className="checkin-slip" aria-label="Your visit slip so far">
            <Slip
              code={code}
              rows={slipRows}
              footer={
                visit ? (
                  <span className="num">
                    Self-pay {money(price)} · insurance copay shown at the last
                    step
                  </span>
                ) : (
                  <span>Fills in as you answer.</span>
                )
              }
            />
          </aside>
        </div>
      </div>
    </section>
  );
}
