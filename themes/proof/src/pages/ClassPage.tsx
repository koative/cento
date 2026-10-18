import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { classes, type BakeClass } from "../content";
import {
  Field,
  SelectField,
  TextArea,
  useFormFlow,
  type Errors,
} from "../components/Field";
import { Link } from "../router";
import { money } from "../lib/cart";
import { dayLabel, fromIso } from "../lib/time";

type Booking = { name: string; email: string; date: string; seats: number };

export function ClassPage({ bakeClass: c }: { bakeClass: BakeClass }) {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [date, setDate] = useState("");
  const [seats, setSeats] = useState(1);
  const session = c.sessions.find((s) => s.date === date);
  const others = classes.filter((x) => x.id !== c.id).slice(0, 3);

  const form = useFormFlow(
    {
      date: { missing: "Choose a date — full sessions can't be selected." },
      seats: { missing: "Choose how many seats." },
      name: { missing: "Enter the name the booking should be under." },
      email: {
        missing: "Enter an email for the confirmation.",
        invalid: "That email looks incomplete — check for an @ and a domain.",
      },
    },
    (data) =>
      setBooking({
        name: String(data.get("name")),
        email: String(data.get("email")),
        date: String(data.get("date")),
        seats: Number(data.get("seats")),
      }),
    (data): Errors =>
      session && Number(data.get("seats")) > session.left
        ? {
            seats: `Only ${session.left} ${session.left === 1 ? "seat is" : "seats are"} left on that date — choose fewer.`,
          }
        : {},
  );

  return (
    <>
      <header className="class-head">
        <div>
          <Link to="/classes" className="back-link">
            <ArrowLeft size={16} aria-hidden="true" /> All classes
          </Link>
          <h1>{c.name}</h1>
          <p className="lede">{c.summary}</p>
          <dl className="facts facts-row">
            <div>
              <dt>Level</dt>
              <dd>{c.level}</dd>
            </div>
            <div>
              <dt>Length</dt>
              <dd>{c.duration}</dd>
            </div>
            <div>
              <dt>Price</dt>
              <dd>{money(c.price)} per seat</dd>
            </div>
            <div>
              <dt>Teacher</dt>
              <dd>{c.teacher}</dd>
            </div>
          </dl>
          <button
            type="button"
            className="btn jump-book"
            onClick={() =>
              document
                .getElementById("booking")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Book a seat · {money(c.price)}
          </button>
        </div>
        <img src={c.image} alt={c.alt} width={1400} height={1050} />
      </header>

      <div className="section class-body">
        <div className="class-info">
          {c.intro.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <h2>The day</h2>
          <ol className="agenda">
            {c.agenda.map(([time, step]) => (
              <li key={time}>
                <span>{time}</span>
                {step}
              </li>
            ))}
          </ol>
          <h2>You take home</h2>
          <ul className="plain-list ticks">
            {c.takeHome.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>

        <section
          className="booking panel"
          id="booking"
          aria-labelledby="book-title"
        >
          <h2 id="book-title">Book a seat</h2>
          <div aria-live="polite">
            {booking ? (
              <div className="form-success">
                <p className="success-title">
                  See you upstairs, {booking.name.split(" ")[0]}.
                </p>
                <p>
                  {booking.seats} {booking.seats === 1 ? "seat" : "seats"} on{" "}
                  {dayLabel(fromIso(booking.date), "long")} for {c.name}. Total{" "}
                  {money(booking.seats * c.price)}, paid on the day.
                  Confirmation (pretend) sent to {booking.email}.
                </p>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setBooking(null)}
                >
                  Book another date
                </button>
              </div>
            ) : (
              <form
                noValidate
                onSubmit={form.onSubmit}
                onChange={form.onChange}
              >
                <fieldset
                  className="options"
                  aria-describedby={
                    form.errors.date ? "f-date-error" : undefined
                  }
                >
                  <legend>Date</legend>
                  {c.sessions.map((s) => (
                    <label
                      key={s.date}
                      className="option"
                      data-full={s.left === 0 || undefined}
                    >
                      <input
                        type="radio"
                        name="date"
                        value={s.date}
                        required
                        disabled={s.left === 0}
                        checked={date === s.date}
                        onChange={() => setDate(s.date)}
                      />
                      <span>
                        {dayLabel(fromIso(s.date))}
                        <small>{s.time}</small>
                      </span>
                      <span className="option-price">
                        {s.left === 0 ? "Full" : `${s.left} left`}
                      </span>
                    </label>
                  ))}
                  {form.errors.date && (
                    <p className="field-error" id="f-date-error">
                      {form.errors.date}
                    </p>
                  )}
                </fieldset>
                <SelectField
                  label="Seats"
                  name="seats"
                  required
                  value={seats}
                  onChange={(e) => setSeats(Number(e.target.value))}
                  error={form.errors.seats}
                  hint={`${money(c.price * seats)} in total, paid on the day.`}
                >
                  {[1, 2, 3, 4].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </SelectField>
                <Field
                  label="Full name"
                  name="name"
                  required
                  autoComplete="name"
                  error={form.errors.name}
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  error={form.errors.email}
                />
                <TextArea
                  label="Allergies or access needs (optional)"
                  name="notes"
                  rows={3}
                />
                <button
                  className="btn btn-block"
                  type="submit"
                  disabled={form.sending}
                >
                  {form.sending ? "Holding your seat…" : "Book seats"}
                </button>
                <p className="quiet">
                  Demo booking — nothing is sent or charged.
                </p>
              </form>
            )}
          </div>
        </section>
      </div>

      <section className="section" aria-labelledby="more-title">
        <h2 id="more-title">Other classes</h2>
        <ul className="mini-list">
          {others.map((o) => (
            <li key={o.id}>
              <Link to={`/classes/${o.id}`}>{o.name}</Link>
              <span>
                {o.level} · {money(o.price)}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
