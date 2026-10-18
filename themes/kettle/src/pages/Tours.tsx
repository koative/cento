import { useEffect, useRef, useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { Link } from "../router";
import { images, tourNotes, tours } from "../content";
import {
  clock,
  dateParts,
  longDate,
  money,
  pause,
  reference,
  spotsLeft,
  tourDates,
  validate,
  type Errors,
} from "../lib/util";
import { Field, useErrors } from "../components/Field";

type Booked = {
  ref: string;
  tour: string;
  date: string;
  time: string;
  guests: number;
  total: number;
  email: string;
};

const messages = {
  date: "Pick a date for your tour.",
  time: "Pick a start time. Greyed-out times are full.",
  name: "Add the name the booking should be under.",
  email: "Enter an email like you@example.com for your confirmation.",
  phone:
    "Enter a phone number with at least 10 digits, like 555 014 7720, in case we need to reach you on the day.",
  id: "Confirm that everyone tasting is 21 or older and will bring photo ID.",
};

export function Tours() {
  const [tourId, setTourId] = useState(tours[0].id);
  const tour = tours.find((t) => t.id === tourId)!;
  const dates = tourDates(tour);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(2);
  const [sending, setSending] = useState(false);
  const [booked, setBooked] = useState<Booked | null>(null);
  const { errors, setErrors, onChange } = useErrors();
  const done = useRef<HTMLHeadingElement>(null);

  const min = tour.min ?? 1;
  const left = date && time ? spotsLeft(tour, date, time) : tour.capacity;
  const total = guests * tour.price;

  useEffect(() => {
    if (booked) done.current?.focus();
  }, [booked]);

  const chooseTour = (id: string) => {
    const next = tours.find((t) => t.id === id)!;
    setTourId(id);
    setDate("");
    setTime("");
    setGuests(Math.max(next.min ?? 1, Math.min(guests, next.capacity)));
  };

  const pickDate = (d: string) => {
    setDate(d);
    setTime("");
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const extra: Errors = {};
    if (!guests || guests < min)
      extra.guests = tour.min
        ? `The ${tour.name.toLowerCase()} needs at least ${min} guests. Add ${min - guests} more, or choose the brewhouse tour.`
        : `Enter how many people are coming, from 1 to ${tour.capacity}.`;
    else if (guests > tour.capacity)
      extra.guests = `Up to ${tour.capacity} per booking. For bigger groups, book the private group tour.`;
    else if (date && time && guests > left)
      extra.guests = `Only ${left} ${left === 1 ? "place is" : "places are"} left at ${clock(time)}. Lower the group size or pick another time.`;
    const found = validate(form, messages, extra);
    setErrors(found);
    if (Object.keys(found).length) return;
    setSending(true);
    await pause();
    const data = new FormData(form);
    setBooked({
      ref: reference("KT"),
      tour: tour.name,
      date,
      time,
      guests,
      total,
      email: String(data.get("email")),
    });
    setSending(false);
  };

  if (booked) {
    return (
      <section className="wrap confirm" aria-live="polite">
        <span className="confirm-icon" aria-hidden="true">
          <Check />
        </span>
        <h1 ref={done} tabIndex={-1}>
          You're booked in.
        </h1>
        <p className="lede">
          {booked.tour} for {booked.guests} on {longDate(booked.date)} at{" "}
          {clock(booked.time)}. Reference{" "}
          <strong className="tnum">{booked.ref}</strong>.
        </p>
        <dl className="spec-strip">
          <div>
            <dt>Pay on the day</dt>
            <dd className="tnum">{money(booked.total)}</dd>
          </div>
          <div>
            <dt>Confirmation to</dt>
            <dd>{booked.email}</dd>
          </div>
          <div>
            <dt>Meet at</dt>
            <dd>The bar, 10 min early</dd>
          </div>
        </dl>
        <p className="quiet-note">
          This is a demo: nothing was sent or charged.
        </p>
        <div className="actions">
          <Link to="/taproom" className="btn btn-copper">
            Plan your flight
          </Link>
          <button
            type="button"
            className="btn btn-line"
            onClick={() => setBooked(null)}
          >
            Book another tour
          </button>
        </div>
      </section>
    );
  }

  return (
    <>
      <header className="page-head wrap page-head-split">
        <div>
          <h1>Brewery tours</h1>
          <p className="lede">
            Walk the line from grain room to bright tank with the people who
            brew here. Every tour ends at the bar with a taste of what you've
            just seen being made.
          </p>
          <ul className="ticks">
            {tourNotes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </div>
        <figure className="page-head-figure">
          <img
            src={images.tour}
            alt="Copper kettles on white tiled plinths along a brewhouse floor"
            width={1800}
            height={1350}
          />
        </figure>
      </header>

      <form
        className="wrap booking"
        noValidate
        onSubmit={submit}
        onChange={onChange}
        aria-labelledby="book-title"
      >
        <div className="booking-main">
          <h2 id="book-title">Book a tour</h2>

          <fieldset className="step">
            <legend>Tour</legend>
            <div className="tour-options">
              {tours.map((t) => (
                <label key={t.id} className="tour-option">
                  <input
                    type="radio"
                    name="tour"
                    value={t.id}
                    checked={tourId === t.id}
                    onChange={() => chooseTour(t.id)}
                  />
                  <span className="tour-option-body">
                    <span className="tour-option-name">{t.name}</span>
                    <span className="tour-option-meta tnum">
                      {t.minutes} min · {money(t.price)} per person
                      {t.min ? ` · ${t.min}+ guests` : ""}
                    </span>
                    <span className="tour-option-text">{t.summary}</span>
                    <span className="tour-option-inc">
                      {t.includes.join(" · ")}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset
            className="step"
            aria-describedby={errors.date ? "date-err" : undefined}
            data-invalid={errors.date ? "" : undefined}
          >
            <legend>Date</legend>
            <div className="date-strip">
              {dates.map((d) => {
                const p = dateParts(d);
                return (
                  <label key={d} className="date-chip">
                    <input
                      type="radio"
                      name="date"
                      value={d}
                      required
                      checked={date === d}
                      onChange={() => pickDate(d)}
                    />
                    <span>
                      <span>{p.weekday}</span>
                      <strong className="tnum">{p.day}</strong>
                      <span>{p.month}</span>
                    </span>
                  </label>
                );
              })}
            </div>
            {errors.date && (
              <p className="field-error" id="date-err">
                {errors.date}
              </p>
            )}
          </fieldset>

          <fieldset
            className="step"
            aria-describedby={errors.time ? "time-err" : undefined}
            data-invalid={errors.time ? "" : undefined}
          >
            <legend>Start time</legend>
            {date ? (
              <div className="time-strip">
                {tour.times.map((t) => {
                  const n = spotsLeft(tour, date, t);
                  return (
                    <label key={t} className="time-chip">
                      <input
                        type="radio"
                        name="time"
                        value={t}
                        required
                        disabled={n === 0}
                        checked={time === t}
                        onChange={() => setTime(t)}
                      />
                      <span>
                        <strong className="tnum">{clock(t)}</strong>
                        <span>
                          {n === 0
                            ? "Full"
                            : `${n} ${n === 1 ? "place" : "places"} left`}
                        </span>
                      </span>
                    </label>
                  );
                })}
              </div>
            ) : (
              <p className="quiet-note">Pick a date to see start times.</p>
            )}
            {errors.time && (
              <p className="field-error" id="time-err">
                {errors.time}
              </p>
            )}
          </fieldset>

          <fieldset className="step">
            <legend>Your group</legend>
            <div className="form-grid">
              <Field
                label="Guests"
                name="guests"
                type="number"
                inputMode="numeric"
                min={1}
                max={tour.capacity}
                value={guests}
                onChange={(e) => setGuests(Number(e.currentTarget.value))}
                hint={
                  tour.min
                    ? `Minimum ${tour.min}, up to ${tour.capacity}.`
                    : `Up to ${tour.capacity} per booking.`
                }
                error={errors.guests}
              />
              <Field
                label="Full name"
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
                label="Phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                pattern="[\d\s\(\)\+\-\.]{10,}"
                placeholder="555 014 7720"
                error={errors.phone}
              />
              <Field
                label="Anything we should know?"
                name="notes"
                className="span-2"
                hint="Optional: accessibility needs, a birthday, a non-drinker in the group."
              >
                <textarea rows={3} />
              </Field>
            </div>
            <label
              className="check check-block"
              data-invalid={errors.id ? "" : undefined}
            >
              <input
                type="checkbox"
                name="id"
                required
                aria-describedby={errors.id ? "id-err" : undefined}
                aria-invalid={errors.id ? true : undefined}
              />
              Everyone tasting is 21 or older and will bring photo ID.
            </label>
            {errors.id && (
              <p className="field-error" id="id-err">
                {errors.id}
              </p>
            )}
          </fieldset>
        </div>

        <aside className="booking-summary" aria-label="Booking summary">
          <h2>Your tour</h2>
          <dl>
            <div>
              <dt>Tour</dt>
              <dd>{tour.name}</dd>
            </div>
            <div>
              <dt>When</dt>
              <dd>
                {date
                  ? `${longDate(date)}${time ? `, ${clock(time)}` : ""}`
                  : "Choose a date"}
              </dd>
            </div>
            <div>
              <dt>Guests</dt>
              <dd className="tnum">
                {guests} × {money(tour.price)}
              </dd>
            </div>
            <div className="summary-total">
              <dt>Pay on the day</dt>
              <dd className="tnum">
                {money(Number.isFinite(total) ? total : 0)}
              </dd>
            </div>
          </dl>
          <button
            type="submit"
            className="btn btn-copper btn-block"
            disabled={sending}
          >
            {sending ? "Booking…" : "Book this tour"}
          </button>
          <p className="quiet-note">
            Demo booking: nothing is sent and no card is needed.
          </p>
        </aside>
      </form>
    </>
  );
}
