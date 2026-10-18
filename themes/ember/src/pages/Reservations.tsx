import { useRef, useState, type FormEvent } from "react";
import { Link } from "../router";
import { photos, reservations as r, week } from "../content";
import { Field, useErrors } from "../components/Field";
import { Photo } from "../components/Photo";
import { pause, reference, validate } from "../lib/forms";
import { countOf, linesOf, totalOf, usePlan } from "../lib/table";
import {
  clock,
  day,
  isoDate,
  longDate,
  money,
  slotsFor,
  span,
} from "../lib/time";

type Booking = {
  ref: string;
  name: string;
  date: string;
  time: string;
  party: number;
  seating: string;
  plan?: string;
};

const today = new Date();
const minDate = isoDate(today);
const maxDate = isoDate(
  new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30),
);

export function Reservations() {
  const plan = usePlan();
  const planCount = countOf(plan);
  const { errors, setErrors, onChange } = useErrors();
  const [date, setDate] = useState("");
  const [party, setParty] = useState(String(Math.min(plan.guests, r.maxParty)));
  const [time, setTime] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<Booking | null>(null);
  const doneHeading = useRef<HTMLHeadingElement>(null);

  const big = party === "9+";
  const size = big ? 9 : Number(party);
  const closedDay =
    date && !week[day(date).getDay()].dinner
      ? week[day(date).getDay()].day
      : "";
  const slots = date && !closedDay ? slotsFor(date, size) : [];
  const groups = ["Brunch", "Dinner"]
    .map((s) => ({ service: s, slots: slots.filter((x) => x.service === s) }))
    .filter((g) => g.slots.length);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const extra: Record<string, string> = {};
    if (closedDay)
      extra.date = `We're closed on ${closedDay}s. Pick a Tuesday through Sunday.`;
    if (data.get("seating") === "counter" && size > 3)
      extra.seating =
        "The counter seats up to three. Choose the dining room or terrace for a bigger party.";
    const found = validate(
      form,
      {
        date: "Choose a date in the next 30 days.",
        time: "Pick one of the open times above.",
        seating: "Choose where you'd like to sit.",
        name: "Tell us whose name the table is under.",
        email: "Enter an email like you@example.com for your confirmation.",
        phone:
          "Add a phone number with at least 7 digits, in case we need to reach you.",
      },
      extra,
    );
    setErrors(found);
    if (Object.keys(found).length) return;
    setBusy(true);
    await pause();
    const attach = data.get("attach") === "on" && planCount > 0;
    setDone({
      ref: reference("EMB"),
      name: String(data.get("name")).trim(),
      date,
      time,
      party: size,
      seating: r.seating.find((s) => s.id === data.get("seating"))!.label,
      plan: attach
        ? `${planCount} dishes, about ${money(totalOf(plan))}`
        : undefined,
    });
    setBusy(false);
    requestAnimationFrame(() => doneHeading.current?.focus());
  };

  const reset = () => {
    setDone(null);
    setDate("");
    setTime("");
    setErrors({});
  };

  return (
    <div className="reserve-page">
      <header className="page-head wrap">
        <h1>{r.title}</h1>
        <p className="lede">{r.intro}</p>
      </header>

      <div className="wrap reserve-grid">
        <div className="reserve-main">
          <p className="sr-only" aria-live="polite">
            {busy
              ? "Checking the book…"
              : done
                ? `Booked. Reference ${done.ref}.`
                : ""}
          </p>
          {done ? (
            <div className="confirm">
              <h2 ref={doneHeading} tabIndex={-1}>
                You're booked in, {done.name.split(" ")[0]}.
              </h2>
              <p>
                We'll hold the table for fifteen minutes past your time. Running
                late? Call us and we'll keep it warm.
              </p>
              <dl className="confirm-list">
                <div>
                  <dt>Reference</dt>
                  <dd className="num">{done.ref}</dd>
                </div>
                <div>
                  <dt>When</dt>
                  <dd>
                    {longDate(done.date)}, {clock(done.time)}
                  </dd>
                </div>
                <div>
                  <dt>Party</dt>
                  <dd>
                    {done.party} {done.party === 1 ? "guest" : "guests"} ·{" "}
                    {done.seating}
                  </dd>
                </div>
                {done.plan && (
                  <div>
                    <dt>Table plan</dt>
                    <dd>{done.plan} — the kitchen will see it on the night</dd>
                  </div>
                )}
              </dl>
              <div className="actions">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={reset}
                >
                  Make another booking
                </button>
                <Link to="/menu/dinner" className="btn btn-ghost">
                  {done.plan
                    ? "Adjust your table plan"
                    : "Plan what you'll eat"}
                </Link>
              </div>
              <p className="fine">
                Demo confirmation: no table was held and nothing was sent.
              </p>
            </div>
          ) : (
            <form
              className="reserve-form"
              noValidate
              onSubmit={submit}
              onChange={onChange}
            >
              <fieldset className="step">
                <legend>When, and how many</legend>
                <div className="row-2">
                  <Field
                    label="Date"
                    name="date"
                    type="date"
                    required
                    min={minDate}
                    max={maxDate}
                    value={date}
                    error={errors.date}
                    hint="Up to 30 days ahead. Closed Mondays."
                    onChange={(e) => {
                      setDate(e.target.value);
                      setTime("");
                    }}
                  />
                  <Field label="Guests" name="party">
                    <select
                      value={party}
                      onChange={(e) => {
                        setParty(e.target.value);
                        setTime("");
                      }}
                    >
                      {Array.from({ length: r.maxParty }, (_, i) => i + 1).map(
                        (n) => (
                          <option key={n} value={n}>
                            {n} {n === 1 ? "guest" : "guests"}
                          </option>
                        ),
                      )}
                      <option value="9+">9 or more</option>
                    </select>
                  </Field>
                </div>
              </fieldset>

              {big ? (
                <div className="notice">
                  <p>
                    Nine or more is a party, and parties get the Larder table or
                    the front room with a set feast. Tell us the date and we'll
                    hold it.
                  </p>
                  <Link to="/private-dining" className="btn btn-primary">
                    Enquire about private dining
                  </Link>
                </div>
              ) : (
                <>
                  <fieldset
                    className="step"
                    aria-describedby={errors.time ? "f-time-err" : undefined}
                  >
                    <legend>Time</legend>
                    {!date && (
                      <p className="field-hint">
                        Pick a date to see open tables.
                      </p>
                    )}
                    {closedDay && (
                      <p className="field-hint">
                        Closed on {closedDay}s — the kitchen team's weekend.
                      </p>
                    )}
                    {groups.map((g) => (
                      <div key={g.service} className="slot-group">
                        {groups.length > 1 && (
                          <p className="slot-label">{g.service}</p>
                        )}
                        <div className="slots">
                          {g.slots.map((s) => (
                            <label
                              key={s.time}
                              className="slot"
                              data-full={s.left ? undefined : ""}
                            >
                              <input
                                type="radio"
                                name="time"
                                value={s.time}
                                required
                                disabled={!s.left}
                                checked={time === s.time}
                                onChange={() => setTime(s.time)}
                              />
                              <span className="slot-time num">
                                {clock(s.time)}
                              </span>
                              <span className="slot-left">
                                {s.left
                                  ? s.left === 1
                                    ? "Last table"
                                    : `${s.left} tables`
                                  : "Full"}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                    {errors.time && (
                      <p className="field-error" id="f-time-err">
                        {errors.time}
                      </p>
                    )}
                  </fieldset>

                  <fieldset
                    className="step"
                    aria-describedby={
                      errors.seating ? "f-seating-err" : undefined
                    }
                  >
                    <legend>Where you'd like to sit</legend>
                    <div className="seat-options">
                      {r.seating.map((s, i) => (
                        <label key={s.id} className="seat">
                          <input
                            type="radio"
                            name="seating"
                            value={s.id}
                            required
                            defaultChecked={i === 0}
                          />
                          <span>
                            <strong>{s.label}</strong>
                            <span>{s.hint}</span>
                          </span>
                        </label>
                      ))}
                    </div>
                    {errors.seating && (
                      <p className="field-error" id="f-seating-err">
                        {errors.seating}
                      </p>
                    )}
                  </fieldset>

                  <fieldset className="step">
                    <legend>Your details</legend>
                    <div className="row-2">
                      <Field
                        label="Name"
                        name="name"
                        required
                        autoComplete="name"
                        error={errors.name}
                      />
                      <Field label="Occasion" name="occasion">
                        <select defaultValue={r.occasions[0]}>
                          {r.occasions.map((o) => (
                            <option key={o}>{o}</option>
                          ))}
                        </select>
                      </Field>
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
                        pattern="[\d\s\+\(\)\-]{7,}"
                        placeholder="+1 555 000 0000"
                        error={errors.phone}
                      />
                    </div>
                    <Field
                      label="Anything we should know?"
                      name="notes"
                      hint="Allergies, a high chair, a surprise. Optional."
                    >
                      <textarea rows={3} maxLength={300} />
                    </Field>
                    {planCount > 0 && (
                      <label className="check">
                        <input type="checkbox" name="attach" defaultChecked />
                        <span>
                          Attach my table plan:{" "}
                          {linesOf(plan)
                            .map((l) => l.dish.name)
                            .slice(0, 3)
                            .join(", ")}
                          {planCount > 3 ? "…" : ""} ({planCount} dishes,{" "}
                          {money(totalOf(plan))})
                        </span>
                      </label>
                    )}
                  </fieldset>

                  <div className="submit-row">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg"
                      disabled={busy}
                      aria-busy={busy}
                    >
                      {busy
                        ? "Checking the book…"
                        : time
                          ? `Book ${clock(time)} for ${size}`
                          : "Book the table"}
                    </button>
                    <p className="fine">
                      Demo form — nothing is sent and no table is held.
                    </p>
                  </div>
                </>
              )}
            </form>
          )}
        </div>

        <aside className="reserve-side">
          <Photo photo={photos.pizzaiolo} className="arch" />
          <h2>Good to know</h2>
          <ul className="plain-list">
            <li>We hold tables for 15 minutes past your time.</li>
            <li>Free to change or cancel up to 24 hours ahead.</li>
            <li>
              Eight counter seats by the oven are kept for walk-ins every night.
            </li>
            <li>
              Nine or more? See <Link to="/private-dining">private dining</Link>
              .
            </li>
          </ul>
          <h2>Kitchen hours</h2>
          <dl className="hours-mini">
            {week.map((d) => (
              <div key={d.day}>
                <dt>{d.short}</dt>
                <dd className="num">{d.dinner ? span(d.dinner) : "Closed"}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </div>
  );
}
