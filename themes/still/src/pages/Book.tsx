import { useEffect, useRef, useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { Link } from "../router";
import { intro, passes, plans, policies } from "../content";
import {
  Field,
  focusFirstError,
  useErrors,
  type Errors,
} from "../components/Field";
import {
  classOf,
  endTime,
  money,
  roomOf,
  sessionsOn,
  teacherOf,
  upcomingDays,
  type Slot,
} from "../lib/week";

const payOptions = [
  {
    id: "intro",
    name: intro.name,
    price: intro.price,
    note: "New students only. Fourteen days of every class.",
  },
  ...passes.map((p) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    note: p.detail,
  })),
  ...plans.map((p) => ({
    id: p.id,
    name: `${p.name} membership`,
    price: p.monthly,
    note: "First month today, then monthly.",
  })),
  {
    id: "member",
    name: "I already have a pass or membership",
    price: 0,
    note: "We'll use one of your credits.",
  },
];

const keyOf = (s: Slot) => `${s.session.id}|${s.day.iso}`;

type Booking = {
  slot: Slot;
  pay: (typeof payOptions)[number];
  name: string;
  email: string;
  first: boolean;
};

export function Book() {
  const query = new URLSearchParams(window.location.hash.split("?")[1] ?? "");
  const days = upcomingDays();
  const open = days.flatMap((d) => sessionsOn(d)).filter((s) => !s.started);
  const wanted = open.find(
    (s) =>
      s.session.id === query.get("session") &&
      (!query.get("date") || s.day.iso === query.get("date")),
  );

  const [key, setKey] = useState(keyOf(wanted ?? open[0]));
  const [pay, setPay] = useState(
    payOptions.some((p) => p.id === query.get("pay"))
      ? query.get("pay")!
      : "intro",
  );
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [booked, setBooked] = useState<Booking | null>(null);
  const { errors, setErrors, onChange } = useErrors();
  const done = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (status === "done") done.current?.focus();
  }, [status]);

  const slot = open.find((s) => keyOf(s) === key) ?? open[0];
  const option = payOptions.find((p) => p.id === pay)!;
  const full = slot.left === 0;

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const value = (n: string) => String(data.get(n) ?? "").trim();
    const next: Errors = {};
    if (value("name").length < 2)
      next.name = "Tell us your name so the teacher can greet you.";
    const email = form.elements.namedItem("email") as HTMLInputElement;
    if (!value("email"))
      next.email = "Enter your email address; your confirmation goes there.";
    else if (!email.checkValidity())
      next.email =
        "That email looks incomplete. Use the form name@example.com.";
    const phone = form.elements.namedItem("phone") as HTMLInputElement;
    if (!phone.checkValidity())
      next.phone =
        "Use digits, spaces and + only, like +1 555 014 2290, or leave it blank.";
    if (!value("first"))
      next.first = "Let us know whether this is your first class at Still.";
    else if (pay === "intro" && value("first") === "no")
      next.pay =
        "The First fortnight is for new students. Choose a pass or drop-in instead.";
    if (!data.get("agree"))
      next.agree = "Tick the box to agree to the 8-hour cancellation policy.";
    setErrors(next);
    if (Object.keys(next).length) {
      focusFirstError(form, next);
      return;
    }
    setStatus("sending");
    setTimeout(() => {
      setBooked({
        slot,
        pay: option,
        name: value("name").split(" ")[0],
        email: value("email"),
        first: value("first") === "yes",
      });
      setStatus("done");
    }, 1100);
  };

  if (status === "done" && booked) {
    const c = classOf(booked.slot.session);
    return (
      <section className="wrap book-done" aria-live="polite">
        <Check aria-hidden="true" className="done-mark" />
        <h1 ref={done} tabIndex={-1}>
          {booked.slot.left === 0
            ? `You're on the waitlist, ${booked.name}.`
            : `See you on the mat, ${booked.name}.`}
        </h1>
        <p className="lead">
          {c.name} with {teacherOf(booked.slot.session).name},{" "}
          {booked.slot.day.long}, {booked.slot.session.time} to{" "}
          {endTime(booked.slot.session)} in the{" "}
          {roomOf(booked.slot.session).name}.
          {booked.slot.left === 0 &&
            " If a place opens up before 2 hours ahead, we'll move you in and text you."}
        </p>
        <dl className="facts">
          <div>
            <dt>Paying with</dt>
            <dd>{booked.pay.name}</dd>
          </div>
          <div>
            <dt>Due at the desk</dt>
            <dd>{booked.pay.price ? money(booked.pay.price) : "Nothing"}</dd>
          </div>
          <div>
            <dt>Confirmation to</dt>
            <dd>{booked.email}</dd>
          </div>
        </dl>
        <p>
          {booked.first
            ? "Arrive ten minutes early for your first class. Shoes off in the lobby; we'll take it from there."
            : "Doors close when class begins, so aim to be on your mat five minutes before."}
        </p>
        <div className="actions">
          <Link to="/visit" className="btn btn-primary">
            Read the first-visit guide
          </Link>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => {
              setBooked(null);
              setStatus("idle");
            }}
          >
            Book another class
          </button>
        </div>
        <p className="fine">
          This is a demo: nothing was sent, booked or charged.
        </p>
      </section>
    );
  }

  const c = classOf(slot.session);
  return (
    <>
      <header className="page-head wrap">
        <h1>Book a class</h1>
        <p className="lead">
          Choose a class, choose how you'll pay, and tell us who's coming. You
          pay at the desk when you arrive.
        </p>
      </header>

      <div className="wrap book-grid">
        <form
          className="book-form"
          noValidate
          onSubmit={submit}
          onChange={onChange}
        >
          <fieldset>
            <legend>Your class</legend>
            <Field
              label="Class"
              name="session"
              hint="Classes that have already started today are not listed."
            >
              <select value={key} onChange={(e) => setKey(e.target.value)}>
                {days.map((d) => {
                  const list = open.filter((s) => s.day.iso === d.iso);
                  return list.length ? (
                    <optgroup key={d.iso} label={d.long}>
                      {list.map((s) => (
                        <option key={keyOf(s)} value={keyOf(s)}>
                          {s.session.time} {classOf(s.session).name} with{" "}
                          {teacherOf(s.session).name.split(" ")[0]}
                          {s.left === 0 ? " (full, waitlist)" : ""}
                        </option>
                      ))}
                    </optgroup>
                  ) : null;
                })}
              </select>
            </Field>
          </fieldset>

          <fieldset
            className="pay"
            aria-describedby={errors.pay ? "pay-err" : undefined}
            data-invalid={errors.pay ? "" : undefined}
          >
            <legend>How you'll pay</legend>
            {payOptions.map((p) => (
              <label key={p.id} className="pay-option">
                <input
                  type="radio"
                  name="pay"
                  value={p.id}
                  checked={pay === p.id}
                  onChange={() => setPay(p.id)}
                />
                <span className="pay-name">{p.name}</span>
                <span className="pay-price">
                  {p.price ? money(p.price) : "—"}
                </span>
                <span className="pay-note">{p.note}</span>
              </label>
            ))}
            {errors.pay && (
              <p className="field-error" id="pay-err">
                {errors.pay}
              </p>
            )}
          </fieldset>

          <fieldset>
            <legend>Who's coming</legend>
            <div className="field-pair">
              <Field
                label="Name"
                name="name"
                autoComplete="name"
                required
                minLength={2}
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
            </div>
            <Field
              label="Mobile (optional)"
              name="phone"
              type="tel"
              autoComplete="tel"
              pattern="[0-9+() \-]{7,}"
              hint="Only used to text you if you move up from a waitlist."
              error={errors.phone}
            />
            <fieldset
              className="inline-radios"
              aria-describedby={errors.first ? "first-err" : undefined}
              data-invalid={errors.first ? "" : undefined}
            >
              <legend>Is this your first class at Still?</legend>
              <label>
                <input type="radio" name="first" value="yes" required /> Yes,
                I'm new
              </label>
              <label>
                <input type="radio" name="first" value="no" /> No, I've been
                before
              </label>
              {errors.first && (
                <p className="field-error" id="first-err">
                  {errors.first}
                </p>
              )}
            </fieldset>
            <Field
              label="Anything the teacher should know? (optional)"
              name="notes"
              hint="Injuries, pregnancy, anything that helps us look after you."
            >
              <textarea rows={3} maxLength={400} />
            </Field>
            <div
              className="field check-field"
              data-invalid={errors.agree ? "" : undefined}
            >
              <label className="check">
                <input
                  type="checkbox"
                  name="agree"
                  required
                  aria-invalid={errors.agree ? true : undefined}
                  aria-describedby={errors.agree ? "agree-err" : undefined}
                />
                {policies[0].text}
              </label>
              {errors.agree && (
                <p className="field-error" id="agree-err">
                  {errors.agree}
                </p>
              )}
            </div>
          </fieldset>

          <button
            type="submit"
            className="btn btn-primary btn-wide"
            disabled={status === "sending"}
            aria-busy={status === "sending"}
          >
            {status === "sending"
              ? "Saving your place…"
              : full
                ? "Join the waitlist"
                : "Book my place"}
          </button>
          <p className="fine">Demo form: nothing is sent, stored or charged.</p>
        </form>

        <aside className="book-summary" aria-label="Your booking">
          <img src={c.image.src} alt="" width={c.image.w} height={c.image.h} />
          <div>
            <h2>{c.name}</h2>
            <p>
              {slot.day.long}
              <br />
              {slot.session.time} to {endTime(slot.session)} ·{" "}
              {roomOf(slot.session).name}
              <br />
              with {teacherOf(slot.session).name}
            </p>
            <p className="book-places" data-full={full ? "" : undefined}>
              {full
                ? "Full: you'll join the waitlist"
                : `${slot.left} ${slot.left === 1 ? "place" : "places"} left`}
            </p>
            <p className="book-total">
              <span>{option.name}</span>
              <strong>
                {option.price ? money(option.price) : "No charge"}
              </strong>
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
