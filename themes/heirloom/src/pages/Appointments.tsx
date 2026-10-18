import { useEffect, useRef, useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { Link } from "../router";
import { appointments, brand } from "../content";
import {
  Field,
  FieldNote,
  describedBy,
  validate,
  type Errors,
} from "../components/Field";

const iso = (d: Date) => d.toISOString().slice(0, 10);
const addDays = (n: number) => new Date(Date.now() + n * 86_400_000);
const dayOf = (value: string) => new Date(value + "T12:00:00");

/** Demo availability: a couple of slots per day are already taken, the same ones every time for a given date. */
function takenSlots(date: string) {
  if (!date) return [];
  const d = dayOf(date);
  const seed = d.getDate() + d.getMonth() * 31;
  const taken = [
    appointments.slots[seed % 5],
    appointments.slots[(seed * 3 + 1) % 5],
  ];
  return d.getDay() === 6 ? [...taken, "17:00"] : taken;
}

type Booking = {
  type: string;
  mode: string;
  date: string;
  time: string;
  name: string;
  email: string;
};

export function Appointments() {
  const [errors, setErrors] = useState<Errors>({});
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [sending, setSending] = useState(false);
  const [booked, setBooked] = useState<Booking | null>(null);
  const taken = takenSlots(date);
  const confirmation = useRef<HTMLDivElement>(null);

  // Bring the confirmation into view: the form it replaces was much taller.
  useEffect(() => {
    if (booked) confirmation.current?.focus();
  }, [booked]);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, {
      type: { missing: "Choose what the appointment is for." },
      date: {
        missing: "Choose a date for your visit.",
        invalid: "Choose a date between tomorrow and eight weeks from now.",
        check: (v) =>
          [0, 1].includes(dayOf(v).getDay())
            ? "We are at the bench on Sundays and Mondays; choose Tuesday to Saturday."
            : undefined,
      },
      time: { missing: "Pick one of the open times for that day." },
      name: { missing: "Tell us your name so we know who to expect." },
      email: {
        missing: "Enter an email for your confirmation.",
        invalid: "That email looks incomplete; check the @ and the domain.",
      },
      phone: {
        missing: "",
        invalid:
          "Use digits, spaces, brackets, dashes or +, e.g. +1 555 014 2290.",
      },
    });
    setErrors(found);
    if (Object.keys(found).length) return;
    const data = new FormData(form);
    setSending(true);
    // Demo only: nothing leaves the browser.
    setTimeout(() => {
      setSending(false);
      setBooked({
        type: appointments.types.find((t) => t.id === data.get("type"))!.name,
        mode: String(data.get("mode")),
        date: dayOf(String(data.get("date"))).toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        }),
        time: String(data.get("time")),
        name: String(data.get("name")),
        email: String(data.get("email")),
      });
    }, 900);
  }

  return (
    <div className="wrap page">
      <header className="page-head">
        <h1>{appointments.title}</h1>
        <p className="lede">{appointments.intro}</p>
      </header>

      <div className="booking">
        <div aria-live="polite" className="booking-main">
          {booked ? (
            <div
              className="confirmation"
              role="status"
              tabIndex={-1}
              ref={confirmation}
            >
              <Check size={28} aria-hidden="true" />
              <h2>We will see you on {booked.date}</h2>
              <p>
                {booked.type},{" "}
                {booked.mode === "video" ? "by video" : "at the atelier"}, at{" "}
                {booked.time}. A confirmation is on its way to {booked.email},{" "}
                {booked.name.split(" ")[0]}, with directions and a note of what
                to bring.
              </p>
              <p className="field-hint">
                Demo booking: nothing was sent or reserved.
              </p>
              <div className="actions">
                <Link to="/collections" className="btn">
                  Browse before you come
                </Link>
                <button
                  type="button"
                  className="btn btn-quiet"
                  onClick={() => (setBooked(null), setDate(""), setTime(""))}
                >
                  Book another appointment
                </button>
              </div>
            </div>
          ) : (
            <form className="form" noValidate onSubmit={submit}>
              <fieldset
                className="choice-set"
                aria-describedby={describedBy("type", undefined, errors.type)}
              >
                <legend>What would you like to talk about?</legend>
                <div className="type-options">
                  {appointments.types.map((t) => (
                    <label key={t.id} className="type-option">
                      <input type="radio" name="type" value={t.id} required />
                      <span>
                        <strong>{t.name}</strong>
                        <small>
                          {t.length} · {t.note}
                        </small>
                      </span>
                    </label>
                  ))}
                </div>
                <FieldNote name="type" error={errors.type} />
              </fieldset>

              <fieldset className="choice-set">
                <legend>Where</legend>
                <div className="options">
                  <label className="option">
                    <input
                      type="radio"
                      name="mode"
                      value="atelier"
                      defaultChecked
                    />
                    <span>At the atelier</span>
                  </label>
                  <label className="option">
                    <input type="radio" name="mode" value="video" />
                    <span>By video</span>
                  </label>
                </div>
              </fieldset>

              <Field
                label="Date"
                name="date"
                type="date"
                required
                min={iso(addDays(1))}
                max={iso(addDays(56))}
                value={date}
                onChange={(e) => (setDate(e.target.value), setTime(""))}
                hint="Tuesday to Saturday. Saturdays close at 17:00."
                error={errors.date}
              />

              <fieldset
                className="choice-set"
                aria-describedby={describedBy("time", !date, errors.time)}
              >
                <legend>Time</legend>
                <div className="options slots">
                  {appointments.slots.map((s) => {
                    const off = !date || taken.includes(s);
                    return (
                      <label
                        key={s}
                        className="option"
                        data-off={off || undefined}
                      >
                        <input
                          type="radio"
                          name="time"
                          value={s}
                          required
                          disabled={off}
                          checked={time === s}
                          onChange={() => setTime(s)}
                        />
                        <span>
                          {s}
                          {date && taken.includes(s) && <small> taken</small>}
                        </span>
                      </label>
                    );
                  })}
                </div>
                <FieldNote
                  name="time"
                  hint={!date && "Choose a date to see open times."}
                  error={errors.time}
                />
              </fieldset>

              <div className="field-row">
                <Field
                  label="Your name"
                  name="name"
                  autoComplete="name"
                  required
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
              <div className="field-row">
                <Field
                  label="Phone (optional)"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  pattern="[0-9+\(\)\- ]{7,}"
                  error={errors.phone}
                />
                <div className="field">
                  <label htmlFor="f-budget">Budget (optional)</label>
                  <select id="f-budget" name="budget" defaultValue="">
                    <option value="">Rather not say</option>
                    <option>Under $2,000</option>
                    <option>$2,000 – $5,000</option>
                    <option>$5,000 – $10,000</option>
                    <option>Over $10,000</option>
                  </select>
                </div>
              </div>
              <div className="field">
                <label htmlFor="f-notes">
                  Anything we should prepare? (optional)
                </label>
                <textarea
                  id="f-notes"
                  name="notes"
                  rows={4}
                  maxLength={600}
                  placeholder="A stone you have in mind, a ring you are bringing, a date you are working towards…"
                />
              </div>
              <button
                className="btn btn-wide"
                type="submit"
                disabled={sending}
                aria-busy={sending}
              >
                {sending ? "Checking the diary…" : "Request this appointment"}
              </button>
              <p className="field-hint">
                This is a demo form: nothing is sent and no appointment is made.
              </p>
            </form>
          )}
        </div>

        <aside className="booking-aside">
          <h2>Before you come</h2>
          <ul className="ticks">
            {appointments.bring.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <h2>Finding us</h2>
          <address>
            {brand.street}
            <br />
            {brand.city}
            <br />
            <a href={brand.phoneHref}>{brand.phone}</a>
          </address>
          <dl className="hours">
            {brand.hours.map(([d, h]) => (
              <div key={d}>
                <dt>{d}</dt>
                <dd>{h}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </div>
  );
}
