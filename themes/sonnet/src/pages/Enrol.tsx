import { useRef, useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "../router";
import { courses, enrol, fees, glosses, type Level } from "../content";
import { PageHead } from "../components/Bits";
import { Field, SelectField, validate, type Errors } from "../components/Field";
import { langOf, longDate, money, schedule } from "../lib/format";
import { loadPlacement } from "../lib/placement";

const discounts = [
  { id: "none", label: "No discount", off: () => 0 },
  {
    id: "concession",
    label: "Student or over-65 (10%)",
    off: (p: number) => Math.round(p * 0.1),
  },
  { id: "friend", label: "Enrolling with a friend ($40)", off: () => 40 },
  { id: "returning", label: "Returning student ($30)", off: () => 30 },
];

const messages = {
  course: { missing: "Choose the course you would like to join." },
  level: { missing: "Tell us roughly where you are, or choose “Not sure”." },
  first: { missing: "Enter your first name." },
  last: { missing: "Enter your last name." },
  email: {
    missing: "Enter an email so we can confirm your place.",
    invalid: "That email looks incomplete: check the @ and the part after it.",
  },
  phone: {
    missing: "",
    invalid: "Use digits, spaces and an optional + only, e.g. +1 555 0123.",
  },
  payment: { missing: "Choose how you would like to pay." },
  billing: {
    missing: "Add your employer's billing email.",
    invalid: "That billing email looks incomplete.",
  },
  terms: {
    missing:
      "Tick the box to confirm you have read the refund and switching policy.",
  },
};

export function Enrol() {
  const placement = loadPlacement();
  const [courseId, setCourseId] = useState(() => {
    const q = new URLSearchParams(window.location.hash.split("?")[1]).get(
      "course",
    );
    return courses.some((c) => c.id === q) ? q! : "";
  });
  const [discount, setDiscount] = useState("none");
  const [payment, setPayment] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [ref, setRef] = useState("");
  const [name, setName] = useState("");
  const doneRef = useRef<HTMLHeadingElement>(null);

  const course = courses.find((c) => c.id === courseId);
  const off = course
    ? discounts.find((d) => d.id === discount)!.off(course.price)
    : 0;
  const total = course ? course.price - off : 0;
  const suggested =
    placement && course && placement.lang === course.lang
      ? placement.level
      : undefined;

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, messages);
    setErrors(found);
    if (Object.keys(found).length) return;
    setName((form.elements.namedItem("first") as HTMLInputElement).value);
    setState("sending");
    window.setTimeout(() => {
      setRef("SON-" + String(Math.floor(1000 + Math.random() * 9000)));
      setState("done");
      requestAnimationFrame(() => doneRef.current?.focus());
    }, 900);
  }

  if (state === "done" && course) {
    return (
      <div className="wrap page enrol-done" aria-live="polite">
        <div className="done-card">
          <Check
            className="done-tick"
            size={40}
            strokeWidth={2.25}
            aria-hidden="true"
          />
          <h1 ref={doneRef} tabIndex={-1}>
            Your place is held, {name}.
          </h1>
          <p className="lead">
            We are holding a place on <b>{course.title}</b> for 48 hours. A
            confirmation with your payment link would go to your inbox within
            the hour.
          </p>
          <dl className="ledger">
            <div>
              <dt>Reference</dt>
              <dd className="num">{ref}</dd>
            </div>
            <div>
              <dt>First session</dt>
              <dd>
                {longDate(course.start)}, {course.sessions[0].start} ·{" "}
                {course.room}
              </dd>
            </div>
            <div>
              <dt>To pay</dt>
              <dd className="num">
                {payment === "instalments"
                  ? `${money(Math.ceil(total / 2))} now, ${money(Math.floor(total / 2))} by week four`
                  : money(total)}
              </dd>
            </div>
          </dl>
          <p className="fine">
            This is a demo: nothing was sent, stored or charged.
          </p>
          <div className="actions">
            <Link to={`/courses/${course.id}`} className="btn">
              Back to the course
            </Link>
            <Link to="/timetable" className="btn btn-ghost">
              See the timetable
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wrap page">
      <PageHead title={enrol.title} lead={enrol.lead} gloss={glosses.enrol} />
      <div className="enrol-grid">
        <form
          className="enrol-form"
          noValidate
          onSubmit={submit}
          aria-busy={state === "sending"}
        >
          <fieldset>
            <legend>The course</legend>
            <SelectField
              label="Course"
              name="course"
              required
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              error={errors.course}
            >
              <option value="">Choose a course…</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {langOf(c.lang).name} {c.levels.join("–")} · {c.title}
                </option>
              ))}
            </SelectField>
            <SelectField
              label="Your level in this language"
              name="level"
              required
              defaultValue={suggested ?? ""}
              key={suggested ?? "none"}
              error={errors.level}
              hint={
                suggested ? (
                  `Your level test said ${suggested}. We have chosen it for you.`
                ) : (
                  <>
                    Not sure?{" "}
                    <Link to="/level-test">Take the ten-minute level test</Link>
                    .
                  </>
                )
              }
            >
              <option value="" disabled>
                Choose a level…
              </option>
              <option value="beginner">Complete beginner</option>
              {(["A1", "A2", "B1", "B2", "C1"] as Level[]).map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
              <option value="unsure">Not sure</option>
            </SelectField>
          </fieldset>

          <fieldset>
            <legend>About you</legend>
            <div className="field-row">
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
            </div>
            <div className="field-row">
              <Field
                label="Email"
                name="email"
                type="email"
                pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
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
                pattern="[+]?[0-9 ]{7,}"
                hint="Only used if your class is moved at short notice."
                error={errors.phone}
              />
            </div>
            <div className="field">
              <label htmlFor="f-notes">
                Anything your teacher should know? (optional)
              </label>
              <textarea
                id="f-notes"
                name="notes"
                rows={3}
                placeholder="E.g. I lived in Lisbon for a year but never had lessons."
              />
            </div>
          </fieldset>

          <fieldset aria-describedby={errors.payment ? "pay-error" : undefined}>
            <legend>Payment</legend>
            <div className="radio-list">
              {[
                ["full", "Pay in full"],
                ["instalments", "Two instalments: half now, half by week four"],
                ["invoice", "Invoice my employer"],
              ].map(([v, label]) => (
                <label key={v} className="option">
                  <input
                    type="radio"
                    name="payment"
                    value={v}
                    required
                    checked={payment === v}
                    onChange={() => setPayment(v)}
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
            {errors.payment && (
              <p className="field-error" id="pay-error">
                {errors.payment}
              </p>
            )}
            {payment === "invoice" && (
              <Field
                label="Employer's billing email"
                name="billing"
                type="email"
                pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                required
                error={errors.billing}
              />
            )}
            <SelectField
              label="Discount"
              name="discount"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            >
              {discounts.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.label}
                </option>
              ))}
            </SelectField>
            <div className="field check">
              <label>
                <input
                  type="checkbox"
                  name="terms"
                  required
                  aria-invalid={errors.terms ? true : undefined}
                  aria-describedby={errors.terms ? "terms-error" : undefined}
                />
                <span>
                  I have read the{" "}
                  <Link to="/fees">refund and switching policy</Link>.
                </span>
              </label>
              {errors.terms && (
                <p className="field-error" id="terms-error">
                  {errors.terms}
                </p>
              )}
            </div>
          </fieldset>

          <button
            type="submit"
            className="btn btn-block"
            disabled={state === "sending"}
          >
            {state === "sending" ? "Holding your place…" : "Hold my place"}{" "}
            {state !== "sending" && <ArrowRight size={18} aria-hidden="true" />}
          </button>
          <p className="fine">
            Demo form: nothing is sent and no payment is taken.
          </p>
        </form>

        <aside
          className="enrol-summary"
          aria-labelledby="sum-h"
          aria-live="polite"
        >
          <h2 id="sum-h">Your enrolment</h2>
          {course ? (
            <>
              <p className="sum-title">{course.title}</p>
              <dl className="ledger">
                <div>
                  <dt>When</dt>
                  <dd>{schedule(course.sessions)}</dd>
                </div>
                <div>
                  <dt>Starts</dt>
                  <dd>{longDate(course.start)}</dd>
                </div>
                <div>
                  <dt>Course fee</dt>
                  <dd className="num">{money(course.price)}</dd>
                </div>
                {off > 0 && (
                  <div>
                    <dt>Discount</dt>
                    <dd className="num">−{money(off)}</dd>
                  </div>
                )}
                <div className="sum-total">
                  <dt>Total</dt>
                  <dd className="num">{money(total)}</dd>
                </div>
              </dl>
              {course.seatsLeft <= 2 && (
                <p className="low">
                  Only {course.seatsLeft}{" "}
                  {course.seatsLeft === 1 ? "place" : "places"} left in this
                  group.
                </p>
              )}
            </>
          ) : (
            <p>
              Choose a course to see its dates and price. Fees start at{" "}
              {money(fees.plans[0].term)} a term, materials included.
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}
