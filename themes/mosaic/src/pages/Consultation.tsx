import { useMemo, useRef, useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { Link } from "../router";
import { brand, budgets, consultationTypes, projectKinds } from "../content";
import { Field, validate, type Errors } from "../components/Field";
import { boardMaterials, useBoard } from "../lib/board";
import { availability, formatDay, formatLong } from "../lib/slots";

type Booking = {
  ref: string;
  type: string;
  when: string;
  email: string;
  samples: number;
};

const boardLabel: Record<string, string> = {
  library: "Lay my sample board out on the table for the visit",
  home: "Bring the samples on my board to the visit",
  video: "Post the samples on my board before the call (free, up to six)",
};

export function Consultation() {
  const board = boardMaterials(useBoard());
  const [type, setType] = useState("");
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [withBoard, setWithBoard] = useState(true);
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [booked, setBooked] = useState<Booking | null>(null);
  const status = useRef<HTMLDivElement>(null);

  const days = useMemo(() => (type ? availability(type) : []), [type]);
  const chosenDay = days.find((d) => d.iso === day);
  const needsAddress =
    type === "home" || (type === "video" && withBoard && board.length > 0);

  function pick(next: string) {
    setType(next);
    setDay("");
    setTime("");
    setErrors((e) => ({ ...e, type: "" }));
  }

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const found: Errors = {};
    if (!type)
      found.type =
        "Choose how you would like to meet — library, home or video.";
    else if (!day) found.day = "Choose a day from the list.";
    else if (!time)
      found.time = "Choose a time on " + formatDay(chosenDay!.date) + ".";
    const fields = validate(form, {
      name: { missing: "Tell us your name so we know who to expect." },
      email: {
        missing: "Enter an email for the confirmation.",
        invalid:
          "Check the email — it needs an @ and a domain, like ada@home.com.",
      },
      phone: {
        missing: "",
        invalid: "Use digits, spaces and + only, e.g. +1 555 0100.",
      },
      address: {
        missing:
          needsAddress && type === "home"
            ? "Add the address we are visiting."
            : "Add an address so we can post your samples.",
      },
      kind: { missing: "Choose what kind of project this is." },
      budget: { missing: "Choose a budget range — 'Not sure yet' is fine." },
      message: {
        missing: "Tell us a little about the rooms.",
        invalid: "A couple of sentences more, please — at least 20 characters.",
      },
      consent: { missing: "Tick the box so we can email you to confirm." },
    });
    Object.assign(found, fields);
    for (const k of Object.keys(found)) if (!found[k]) delete found[k];
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first === "type" || first === "day" || first === "time") {
      form
        .querySelector<HTMLInputElement>(
          `input[name="${first}"]:not(:disabled)`,
        )
        ?.focus();
    }
    if (first) return;

    setSending(true);
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    window.setTimeout(() => {
      setSending(false);
      setBooked({
        ref:
          "MC-" + day.replace(/-/g, "").slice(2) + "-" + time.replace(":", ""),
        type: consultationTypes.find((c) => c.id === type)!.label,
        when: `${formatLong(chosenDay!.date)} at ${time}`,
        email,
        samples: withBoard ? board.length : 0,
      });
      window.setTimeout(() => status.current?.focus(), 0);
    }, 1100);
  }

  if (booked) {
    return (
      <section className="confirm" aria-live="polite">
        <div ref={status} tabIndex={-1} className="confirm-inner">
          <span className="confirm-mark" aria-hidden="true">
            <Check size={28} />
          </span>
          <h1>You are booked in.</h1>
          <p className="lede">
            {booked.type}, {booked.when}. A confirmation is on its way to{" "}
            {booked.email}.
          </p>
          <dl className="facts">
            <div>
              <dt>Reference</dt>
              <dd className="tabular">{booked.ref}</dd>
            </div>
            <div>
              <dt>Samples</dt>
              <dd>
                {booked.samples
                  ? `${booked.samples} from your board`
                  : "We will choose some for you"}
              </dd>
            </div>
            <div>
              <dt>Questions</dt>
              <dd>
                <a href={brand.phoneHref}>{brand.phone}</a>
              </dd>
            </div>
          </dl>
          <p className="fine">
            Demo only — nothing was sent, and no appointment exists.
          </p>
          <div className="actions">
            <Link to="/projects" className="btn">
              Look at projects while you wait
            </Link>
            <button
              type="button"
              className="text-button"
              onClick={() => setBooked(null)}
            >
              Book another time
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <header className="page-head">
        <h1>Book a consultation</h1>
        <p className="lede">
          The first library visit is free. Choose how to meet and a time that
          suits you; we confirm within one working day and pull samples before
          you arrive.
        </p>
      </header>

      <form
        className="booking section"
        noValidate
        onSubmit={submit}
        aria-describedby="booking-note"
      >
        <fieldset
          className="step"
          aria-describedby={errors.type ? "type-error" : undefined}
        >
          <legend>How would you like to meet?</legend>
          <div className="type-options">
            {consultationTypes.map((c) => (
              <label key={c.id} className="option">
                <input
                  type="radio"
                  name="type"
                  value={c.id}
                  checked={type === c.id}
                  onChange={() => pick(c.id)}
                />
                <span className="option-body">
                  <strong>{c.label}</strong>
                  <span>{c.detail}</span>
                  <span className="option-fee">{c.fee}</span>
                </span>
              </label>
            ))}
          </div>
          {errors.type && (
            <p className="field-error" id="type-error">
              {errors.type}
            </p>
          )}
        </fieldset>

        <fieldset
          className="step"
          disabled={!type}
          aria-describedby={
            errors.day || errors.time ? "slot-error" : undefined
          }
        >
          <legend>Choose a time</legend>
          {!type && (
            <p className="fine">
              Choose a way to meet first — library visits run Thursday to
              Saturday, home visits and calls Monday to Friday.
            </p>
          )}
          {type && (
            <>
              <div className="day-options" role="radiogroup" aria-label="Day">
                {days.map((d) => (
                  <label key={d.iso} className="day">
                    <input
                      type="radio"
                      name="day"
                      value={d.iso}
                      checked={day === d.iso}
                      onChange={() => {
                        setDay(d.iso);
                        setTime("");
                      }}
                    />
                    <span>
                      <span className="day-week">
                        {d.date.toLocaleDateString("en-US", {
                          weekday: "short",
                        })}
                      </span>
                      <span className="day-num tabular">
                        {d.date.getDate()}
                      </span>
                      <span className="day-month">
                        {d.date.toLocaleDateString("en-US", { month: "short" })}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
              <div className="time-options" role="radiogroup" aria-label="Time">
                {(chosenDay?.times ?? []).map((t) => (
                  <label key={t.time} className="time">
                    <input
                      type="radio"
                      name="time"
                      value={t.time}
                      disabled={t.taken}
                      checked={time === t.time}
                      onChange={() => setTime(t.time)}
                    />
                    <span className="tabular">
                      {t.time}
                      {t.taken && (
                        <span className="visually-hidden"> (taken)</span>
                      )}
                    </span>
                  </label>
                ))}
                {!chosenDay && (
                  <p className="fine">Pick a day to see open times.</p>
                )}
              </div>
            </>
          )}
          {(errors.day || errors.time) && (
            <p className="field-error" id="slot-error">
              {errors.day || errors.time}
            </p>
          )}
        </fieldset>

        <fieldset className="step">
          <legend>About you and the project</legend>
          <div className="field-grid">
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
              label="Phone (optional)"
              name="phone"
              type="tel"
              autoComplete="tel"
              pattern="[0-9 +()\-]{7,}"
              error={errors.phone}
              hint="Only if you would rather we call."
            />
            {needsAddress && (
              <Field
                label={
                  type === "home"
                    ? "Address for the visit"
                    : "Postal address for samples"
                }
                name="address"
                required
                autoComplete="street-address"
                error={errors.address}
              />
            )}
            <Field
              as="select"
              label="Kind of project"
              name="kind"
              required
              defaultValue=""
              error={errors.kind}
            >
              <option value="" disabled>
                Choose one
              </option>
              {projectKinds.map((k) => (
                <option key={k}>{k}</option>
              ))}
            </Field>
            <Field
              as="select"
              label="Budget, build and furnishing"
              name="budget"
              required
              defaultValue=""
              error={errors.budget}
            >
              <option value="" disabled>
                Choose a range
              </option>
              {budgets.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </Field>
            <Field
              as="textarea"
              className="field-wide"
              label="Tell us about the rooms"
              name="message"
              required
              minLength={20}
              rows={5}
              error={errors.message}
              hint="What is wrong with them now, and what you would like them to feel like."
            />
          </div>
        </fieldset>

        {board.length > 0 && type && (
          <div className="attach">
            <label className="check">
              <input
                type="checkbox"
                checked={withBoard}
                onChange={(e) => setWithBoard(e.target.checked)}
              />
              <span>{boardLabel[type]}</span>
            </label>
            <ul className="attach-chips" aria-label="Samples on your board">
              {board.map((m) => (
                <li key={m.id}>
                  <img src={m.image} alt="" />
                  {m.name}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="submit-row">
          <div className="field">
            <label className="check">
              <input
                type="checkbox"
                name="consent"
                id="f-consent"
                required
                aria-invalid={errors.consent ? true : undefined}
                aria-describedby={
                  errors.consent ? "f-consent-error" : undefined
                }
              />
              <span>
                Email me to confirm the appointment. We do not add you to any
                list.
              </span>
            </label>
            {errors.consent && (
              <p className="field-error" id="f-consent-error">
                {errors.consent}
              </p>
            )}
          </div>
          <button className="btn" type="submit" disabled={sending}>
            {sending ? "Booking…" : "Book the consultation"}
          </button>
          <p className="fine" id="booking-note">
            Demo form: nothing you enter is sent or stored.
          </p>
          <p className="visually-hidden" aria-live="polite">
            {sending
              ? "Booking your consultation…"
              : Object.keys(errors).length
                ? `${Object.keys(errors).length} things need fixing before we can book.`
                : ""}
          </p>
        </div>
      </form>
    </>
  );
}
