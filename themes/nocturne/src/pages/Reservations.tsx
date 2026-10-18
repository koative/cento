import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { Link } from "../router";
import { brand, hours, reservations, zones } from "../content";
import { hhmm, isoOf, longDate, toDate, toMin } from "../lib/format";
import { pause, reference, validate } from "../lib/forms";
import { Field, useErrors } from "../components/Field";
import { FloorPlan } from "../components/FloorPlan";

type Slot = { time: string; full: boolean };

/** Half-hour arrival slots from opening until two hours before close. Some are booked out, the same way every time for a given date. */
function slotsFor(iso: string, guests: number): Slot[] {
  const h = hours[toDate(iso).getDay()];
  if (!h) return [];
  const open = toMin(h[0]);
  const close = toMin(h[1]) <= open ? toMin(h[1]) + 1440 : toMin(h[1]);
  const slots: Slot[] = [];
  for (let m = open; m <= close - 120; m += 30) {
    let seed = 0;
    for (const c of `${iso}${m}${guests > 4 ? "big" : ""}`)
      seed = (seed * 31 + c.charCodeAt(0)) % 997;
    slots.push({ time: hhmm(m), full: seed % 4 === 0 });
  }
  return slots;
}

export function Reservations() {
  const { errors, setErrors, onChange } = useErrors();
  const today = new Date();
  const min = isoOf(today);
  const max = isoOf(
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 60),
  );
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(2);
  const [time, setTime] = useState("");
  const [zone, setZone] = useState("listening");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<{
    ref: string;
    name: string;
    email: string;
    date: string;
    time: string;
    guests: number;
    zone: string;
  } | null>(null);

  const closed = date !== "" && !hours[toDate(date).getDay()];
  const slots = date && !closed ? slotsFor(date, guests) : [];

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const extra: Record<string, string> = {};
    if (closed)
      extra.date =
        "We're closed on Mondays and Tuesdays. Pick a Wednesday to Sunday.";
    if (date && !closed && !time)
      extra.time = "Choose an arrival time; greyed-out times are fully booked.";
    const found = validate(
      form,
      {
        date: `Pick a date between today and ${longDate(max)}.`,
        time: "Choose an arrival time; greyed-out times are fully booked.",
        name: "Add the name the table should be under.",
        email:
          "Enter an email like you@example.com so we can send your confirmation.",
        phone:
          "Use digits only, with an optional + at the start, so we can call if you're running late.",
        policy: "Please confirm you've read the table policy.",
      },
      extra,
    );
    setErrors(found);
    if (Object.keys(found).length) return;
    const data = new FormData(form);
    setBusy(true);
    await pause(1100);
    setBusy(false);
    setDone({
      ref: reference(),
      name: String(data.get("name")).split(" ")[0],
      email: String(data.get("email")),
      date,
      time,
      guests,
      zone: zones.find((z) => z.id === zone)!.label.toLowerCase(),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const reset = () => {
    setDone(null);
    setDate("");
    setTime("");
    setErrors({});
  };

  return (
    <>
      <header className="page-head wrap">
        <h1>Book a table</h1>
        <p className="lede">{reservations.intro}</p>
      </header>

      <div className="wrap booking">
        <div className="booking-main" aria-live="polite">
          {done ? (
            <div className="confirm">
              <Check aria-hidden="true" className="confirm-icon" />
              <h2>
                See you on {longDate(done.date)}, {done.name}.
              </h2>
              <p className="lede">
                A table for {done.guests} in the {done.zone}, arriving at{" "}
                {done.time}. We've sent the details to {done.email}.
              </p>
              <dl className="confirm-slip">
                <div>
                  <dt>Reference</dt>
                  <dd>{done.ref}</dd>
                </div>
                <div>
                  <dt>Table held until</dt>
                  <dd>{hhmm(toMin(done.time) + 15)}</dd>
                </div>
                <div>
                  <dt>Address</dt>
                  <dd>
                    {brand.street}, {brand.city}
                  </dd>
                </div>
              </dl>
              <p className="form-note">
                Demo only: no table was reserved and no email was sent.
              </p>
              <div className="hero-actions">
                <button type="button" className="btn btn-ghost" onClick={reset}>
                  Make another booking
                </button>
                <Link to="/menu" className="btn btn-brass">
                  Read the drinks menu
                </Link>
              </div>
            </div>
          ) : (
            <form
              noValidate
              onSubmit={submit}
              onChange={onChange}
              className="booking-form"
              aria-busy={busy}
            >
              <fieldset>
                <legend>When</legend>
                <div className="form-grid">
                  <Field
                    label="Date"
                    name="date"
                    type="date"
                    required
                    min={min}
                    max={max}
                    value={date}
                    onChange={(e) => {
                      setDate(e.target.value);
                      setTime("");
                    }}
                    error={errors.date}
                    hint="Wednesday to Sunday, up to 60 days ahead"
                  />
                  <Field
                    label="Guests"
                    name="guests"
                    hint="Seven or more? See private hire"
                    error={errors.guests}
                  >
                    <select
                      value={guests}
                      onChange={(e) => {
                        const n = Number(e.target.value);
                        setGuests(n);
                        if (n > zones.find((z) => z.id === zone)!.max)
                          setZone("booth");
                      }}
                    >
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? "guest" : "guests"}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <div
                  className="field"
                  data-invalid={errors.time ? "" : undefined}
                >
                  <p className="field-label" id="time-label">
                    Arrival time
                  </p>
                  {!date && (
                    <p className="field-hint">
                      Pick a date to see the times we have.
                    </p>
                  )}
                  {closed && (
                    <p className="field-hint">
                      We're closed that day. Try a Wednesday to Sunday.
                    </p>
                  )}
                  {slots.length > 0 && (
                    <div
                      className="slots"
                      role="radiogroup"
                      aria-labelledby="time-label"
                      aria-describedby={errors.time ? "time-err" : undefined}
                    >
                      {slots.map((s) => (
                        <label
                          key={s.time}
                          className="slot"
                          data-full={s.full ? "" : undefined}
                        >
                          <input
                            type="radio"
                            name="time"
                            value={s.time}
                            required
                            disabled={s.full}
                            checked={time === s.time}
                            onChange={() => setTime(s.time)}
                          />
                          <span>{s.time}</span>
                          {s.full && (
                            <span className="sr-only">, fully booked</span>
                          )}
                        </label>
                      ))}
                    </div>
                  )}
                  {errors.time && (
                    <p className="field-error" id="time-err">
                      {errors.time}
                    </p>
                  )}
                </div>
              </fieldset>

              <fieldset>
                <legend>Where</legend>
                <div className="zones-wrap">
                  <div className="zones" role="radiogroup" aria-label="Seating">
                    {zones.map((z) => {
                      const tooMany = guests > z.max;
                      return (
                        <label
                          key={z.id}
                          className="zone"
                          data-disabled={tooMany ? "" : undefined}
                        >
                          <input
                            type="radio"
                            name="zone"
                            value={z.id}
                            checked={zone === z.id}
                            disabled={tooMany}
                            onChange={() => setZone(z.id)}
                          />
                          <span className="zone-text">
                            <strong>{z.label}</strong>
                            <span>
                              {tooMany
                                ? `Up to ${z.max} guests; pick a booth for ${guests}.`
                                : z.text}
                            </span>
                          </span>
                          <span className="zone-seats">{z.seats}</span>
                        </label>
                      );
                    })}
                  </div>
                  <FloorPlan zone={zone} />
                </div>
              </fieldset>

              <fieldset>
                <legend>Who</legend>
                <div className="form-grid">
                  <Field
                    label="Name"
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
                    placeholder="you@example.com"
                    error={errors.email}
                  />
                  <Field
                    label="Phone (optional)"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    pattern="\+?[0-9 ]{6,20}"
                    placeholder="+45 12 34 56 78"
                    error={errors.phone}
                  />
                  <Field label="Occasion (optional)" name="occasion">
                    <select defaultValue="">
                      <option value="">Just a night out</option>
                      <option>Birthday</option>
                      <option>Anniversary</option>
                      <option>First date</option>
                      <option>Celebrating something</option>
                    </select>
                  </Field>
                </div>
                <Field
                  label="Anything we should know? (optional)"
                  name="notes"
                  hint="Accessibility needs, allergies, a record you'd love to hear"
                >
                  <textarea rows={3} maxLength={300} />
                </Field>
                <div
                  className="field check"
                  data-invalid={errors.policy ? "" : undefined}
                >
                  <label>
                    <input
                      type="checkbox"
                      name="policy"
                      required
                      aria-describedby={
                        errors.policy ? "policy-err" : undefined
                      }
                    />
                    <span>
                      I understand the table is held for 15 minutes and is ours
                      for two hours.
                    </span>
                  </label>
                  {errors.policy && (
                    <p className="field-error" id="policy-err">
                      {errors.policy}
                    </p>
                  )}
                </div>
              </fieldset>

              <button
                type="submit"
                className="btn btn-brass btn-block"
                disabled={busy}
              >
                {busy ? "Checking the book…" : "Request this table"}
              </button>
              <p className="form-note">
                Demo only: nothing is sent and no table is reserved.
              </p>
            </form>
          )}
        </div>

        <aside className="booking-side" aria-labelledby="policy-title">
          <h2 id="policy-title">Before you book</h2>
          <dl className="spec-list spec-list-tight">
            {reservations.policies.map((p) => (
              <div key={p.term}>
                <dt>{p.term}</dt>
                <dd>{p.text}</dd>
              </div>
            ))}
          </dl>
          <p className="muted">
            Seven or more? <Link to="/private-hire">Take the back room</Link>,
            or call <a href={brand.phoneHref}>{brand.phone}</a>.
          </p>
        </aside>
      </div>
    </>
  );
}
