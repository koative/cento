import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, Minus, Plus, Ticket } from "lucide-react";
import { Link } from "../router";
import {
  brand,
  membership,
  slotCapacity,
  slots,
  ticketNotes,
  ticketTypes,
} from "../content";
import {
  clock,
  longDate,
  money,
  openDays,
  placesLeft,
  todayIso,
  toMin,
} from "../lib/format";
import {
  pause,
  reference,
  useErrors,
  validate,
  type Errors,
} from "../lib/forms";
import { Field } from "../components/Field";
import { Mark } from "../components/Shape";

type Booking = {
  ref: string;
  date: string;
  slot: string;
  qty: Record<string, number>;
  name: string;
  email: string;
  total: number;
};

const initialSlot = () => {
  const s = new URLSearchParams(window.location.hash.split("?")[1] ?? "").get(
    "slot",
  );
  return s && slots.includes(s) ? s : "";
};

export function Tickets() {
  const now = new Date();
  // After the last arrival slot, booking starts tomorrow.
  const dates = openDays(
    12,
    now.getHours() * 60 + now.getMinutes() > toMin(slots[slots.length - 1])
      ? new Date(now.getTime() + 864e5)
      : now,
  );
  const [date, setDate] = useState(dates[0]);
  const [slot, setSlot] = useState(initialSlot);
  const [qty, setQty] = useState<Record<string, number>>({
    adult: 2,
    child: 2,
    toddler: 0,
    carer: 0,
  });
  const [state, setState] = useState<"idle" | "sending">("idle");
  const [booking, setBooking] = useState<Booking | null>(null);
  const { errors, setErrors, onChange } = useErrors();
  const done = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (booking) done.current?.focus();
  }, [booking]);

  const people = Object.values(qty).reduce((a, b) => a + b, 0);
  const total = ticketTypes.reduce(
    (sum, t) => sum + t.price * (qty[t.id] ?? 0),
    0,
  );
  const isToday = date === todayIso();
  const left = (s: string) =>
    isToday && toMin(s) < now.getHours() * 60 + now.getMinutes()
      ? 0
      : placesLeft(date, s, slotCapacity);

  function setCount(id: string, n: number, max: number) {
    setQty((q) => ({ ...q, [id]: Math.max(0, Math.min(max, n)) }));
    setErrors(({ "qty-adult": _a, tickets: _t, ...rest }) => rest);
  }

  function rules(): Errors {
    const out: Errors = {};
    const kids = qty.child + qty.toddler;
    if (people === 0) out["qty-adult"] = "Add at least one ticket to continue.";
    else if (kids > 0 && qty.adult === 0)
      out["qty-adult"] =
        "Add at least one adult: every child visits with a grown-up.";
    else if (kids > qty.adult * 4) {
      const more = Math.ceil(kids / 4) - qty.adult;
      out["qty-adult"] =
        `One adult can bring up to four children. Add ${more} more adult ${more === 1 ? "ticket" : "tickets"}.`;
    }
    if (slot && people > left(slot))
      out.slot = `Only ${left(slot)} ${left(slot) === 1 ? "place" : "places"} left at ${clock(slot)}. Pick another time or fewer tickets.`;
    return out;
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(
      form,
      {
        slot: "Choose an arrival time for your group.",
        name: "Add the name the booking should be under.",
        email:
          "Add an email like name@example.com so we can send your tickets.",
        phone: "Use digits only, with an area code, like 555 013 4221.",
        rules: "Tick to confirm you have read the visit rules.",
      },
      rules(),
    );
    setErrors(found);
    if (Object.keys(found).length) return;
    setState("sending");
    await pause(1100);
    const data = new FormData(form);
    setBooking({
      ref: reference("FBL"),
      date,
      slot,
      qty,
      name: String(data.get("name")),
      email: String(data.get("email")),
      total,
    });
    setState("idle");
    window.scrollTo({ top: 0 });
  }

  if (booking)
    return (
      <section className="wrap confirm" aria-live="polite">
        <h1 ref={done} tabIndex={-1}>
          You’re booked, {booking.name.split(" ")[0]}!
        </h1>
        <p className="lede">
          Your tickets are on their way to <strong>{booking.email}</strong>.
          Show the code at the yellow doors — on a phone is fine.
        </p>
        <div className="stub">
          <div className="stub-main">
            <p className="stub-brand">
              <Mark /> {brand.name.toLowerCase()}
            </p>
            <p className="stub-date">{longDate(booking.date)}</p>
            <p className="stub-time tnum">Arrive {clock(booking.slot)}</p>
            <ul>
              {ticketTypes
                .filter((t) => booking.qty[t.id])
                .map((t) => (
                  <li key={t.id}>
                    {booking.qty[t.id]} × {t.label}
                  </li>
                ))}
            </ul>
          </div>
          <div className="stub-side">
            <p className="stub-label">Booking</p>
            <p className="stub-ref tnum">{booking.ref}</p>
            <p className="stub-label">Pay at the desk</p>
            <p className="stub-total tnum">{money(booking.total)}</p>
          </div>
        </div>
        <p className="quiet-note">
          Demo booking: nothing was reserved, sent or charged.
        </p>
        <div className="hero-actions">
          <Link to="/visit" className="btn btn-ink">
            Plan the day inside <ArrowRight aria-hidden="true" />
          </Link>
          <button
            type="button"
            className="btn btn-line"
            onClick={() => setBooking(null)}
          >
            Book another visit
          </button>
        </div>
      </section>
    );

  return (
    <>
      <section className="page-hero wrap">
        <h1>Tickets</h1>
        <p className="lede">
          Choose a day and an arrival time, then stay as long as you like.
          Booking ahead guarantees entry on busy days.
        </p>
      </section>

      <form
        className="wrap booking"
        noValidate
        onSubmit={submit}
        onChange={onChange}
      >
        <div className="booking-steps">
          <fieldset className="step">
            <legend>
              <span className="step-n" aria-hidden="true">
                1
              </span>{" "}
              Pick a day
            </legend>
            <div className="date-grid">
              {dates.map((d) => {
                const dt = new Date(d + "T00:00");
                return (
                  <label key={d} className="date-chip">
                    <input
                      type="radio"
                      name="date"
                      value={d}
                      checked={date === d}
                      onChange={() => setDate(d)}
                    />
                    <span>
                      <small>
                        {dt.toLocaleDateString("en-US", { weekday: "short" })}
                      </small>
                      <strong className="tnum">{dt.getDate()}</strong>
                      <small>
                        {dt.toLocaleDateString("en-US", { month: "short" })}
                      </small>
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <fieldset
            className="step"
            aria-describedby={errors.slot ? "slot-err" : undefined}
          >
            <legend>
              <span className="step-n" aria-hidden="true">
                2
              </span>{" "}
              Choose an arrival time
            </legend>
            <div className="slot-grid">
              {slots.map((s) => {
                const n = left(s);
                return (
                  <label
                    key={s}
                    className="slot-chip"
                    data-full={n === 0 ? "" : undefined}
                  >
                    <input
                      type="radio"
                      name="slot"
                      value={s}
                      required
                      checked={slot === s}
                      disabled={n === 0}
                      onChange={() => setSlot(s)}
                    />
                    <span>
                      <strong className="tnum">{clock(s)}</strong>
                      <small>
                        {n === 0
                          ? "Full"
                          : n < 10
                            ? `${n} left`
                            : "Plenty of space"}
                      </small>
                    </span>
                  </label>
                );
              })}
            </div>
            {errors.slot && (
              <p className="field-error" id="slot-err">
                {errors.slot}
              </p>
            )}
          </fieldset>

          <fieldset
            className="step"
            aria-describedby={errors["qty-adult"] ? "qty-err" : undefined}
          >
            <legend>
              <span className="step-n" aria-hidden="true">
                3
              </span>{" "}
              Who’s coming?
            </legend>
            <ul className="qty-list">
              {ticketTypes.map((t) => (
                <li key={t.id}>
                  <label htmlFor={`qty-${t.id}`}>
                    <strong>{t.label}</strong>
                    <small>
                      {t.note}
                      {t.price > 0 && ` · ${money(t.price)}`}
                    </small>
                  </label>
                  <div className="stepper">
                    <button
                      type="button"
                      className="icon-btn"
                      aria-label={`One fewer ${t.label}`}
                      disabled={!qty[t.id]}
                      onClick={() => setCount(t.id, qty[t.id] - 1, t.max)}
                    >
                      <Minus aria-hidden="true" />
                    </button>
                    <input
                      id={`qty-${t.id}`}
                      name={`qty-${t.id}`}
                      type="number"
                      inputMode="numeric"
                      min={0}
                      max={t.max}
                      value={qty[t.id]}
                      onChange={(e) =>
                        setCount(t.id, Number(e.target.value) || 0, t.max)
                      }
                      className="tnum"
                    />
                    <button
                      type="button"
                      className="icon-btn"
                      aria-label={`One more ${t.label}`}
                      disabled={qty[t.id] >= t.max}
                      onClick={() => setCount(t.id, qty[t.id] + 1, t.max)}
                    >
                      <Plus aria-hidden="true" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            {errors["qty-adult"] && (
              <p className="field-error" id="qty-err">
                {errors["qty-adult"]}
              </p>
            )}
          </fieldset>

          <fieldset className="step">
            <legend>
              <span className="step-n" aria-hidden="true">
                4
              </span>{" "}
              Your details
            </legend>
            <div className="field-grid">
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
                error={errors.email}
                hint="Tickets arrive here."
              />
              <Field
                label="Mobile (optional)"
                name="phone"
                type="tel"
                autoComplete="tel"
                pattern="[0-9 ()+\-]{10,}"
                error={errors.phone}
                hint="Only used if we have to close early."
              />
            </div>
            <div className="check" data-invalid={errors.rules ? "" : undefined}>
              <label>
                <input
                  type="checkbox"
                  name="rules"
                  required
                  aria-invalid={errors.rules ? true : undefined}
                  aria-describedby={errors.rules ? "f-rules-err" : undefined}
                />
                <span>
                  I understand every child must stay with an adult from our
                  group.
                </span>
              </label>
              {errors.rules && (
                <p className="field-error" id="f-rules-err">
                  {errors.rules}
                </p>
              )}
            </div>
          </fieldset>
        </div>

        <aside className="summary" aria-labelledby="summary-title">
          <h2 id="summary-title">Your visit</h2>
          <p className="summary-when">
            {longDate(date)}
            <br />
            <strong>
              {slot ? `Arriving ${clock(slot)}` : "Arrival time not chosen"}
            </strong>
          </p>
          <ul className="summary-lines">
            {ticketTypes
              .filter((t) => qty[t.id])
              .map((t) => (
                <li key={t.id}>
                  <span>
                    {qty[t.id]} × {t.label}
                  </span>
                  <span className="tnum">{money(t.price * qty[t.id])}</span>
                </li>
              ))}
          </ul>
          <p className="summary-total" aria-live="polite">
            <span>Total</span>
            <strong className="tnum">{money(total)}</strong>
          </p>
          <button
            className="btn btn-coral btn-lg btn-block"
            disabled={state === "sending"}
          >
            <Ticket aria-hidden="true" />{" "}
            {state === "sending" ? "Booking your slot…" : "Book tickets"}
          </button>
          <p className="quiet-note">
            Demo form: nothing is reserved, sent or charged.
          </p>
        </aside>
      </form>

      <section className="section wrap ticket-info">
        <div>
          <h2>Before you book</h2>
          <ul className="ticks">
            {ticketNotes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </div>
        <aside className="pass">
          <h3>{membership.name}</h3>
          <p className="pass-price tnum">{money(membership.price)} a year</p>
          <p>{membership.blurb}</p>
          <p>
            Ask at the desk on your visit and we’ll take today’s tickets off the
            price, or email <a href={`mailto:${brand.email}`}>{brand.email}</a>.
          </p>
        </aside>
      </section>
    </>
  );
}
