import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { brand, classes, hours, prices } from "../content";
import { Link } from "../router";
import {
  isoOf,
  longDate,
  money,
  shortDate,
  slotsFor,
  toDate,
} from "../lib/format";
import { pause, useErrors, validate } from "../lib/forms";
import { upcomingSessions } from "../lib/schedule";
import { Field } from "../components/Field";
import { Stepper } from "../components/Stepper";

type Kind = "day" | "class";
type Booking = {
  ref: string;
  what: string;
  when: string;
  who: string;
  total: number;
  email: string;
};

/** Demo availability: a stable number of free places per date and time. */
function placesLeft(key: string, cap: number) {
  let h = 7;
  for (const ch of key) h = (h * 31 + ch.charCodeAt(0)) % 9973;
  return h % 6 === 0 ? 0 : 2 + (h % (cap - 1));
}

export function Book() {
  const query = new URLSearchParams(window.location.hash.split("?")[1] ?? "");
  const preset = classes.find((c) => c.id === query.get("class"));
  const today = new Date();
  const dates = Array.from({ length: 14 }, (_, i) =>
    isoOf(new Date(today.getFullYear(), today.getMonth(), today.getDate() + i)),
  );

  const [kind, setKind] = useState<Kind>(preset ? "class" : "day");
  const [classId, setClassId] = useState(preset?.id ?? classes[0].id);
  const [date, setDate] = useState(query.get("date") ?? "");
  const [slot, setSlot] = useState(() => {
    const d = query.get("date");
    return (
      (preset &&
        d &&
        preset.schedule.find((s) => s.day === toDate(d).getDay())?.time) ||
      ""
    );
  });
  const [adults, setAdults] = useState(1);
  const [youths, setYouths] = useState(0);
  const [shoes, setShoes] = useState(0);
  const { errors, setErrors, onChange } = useErrors();
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<Booking | null>(null);

  const item = classes.find((c) => c.id === classId)!;
  const sessions = upcomingSessions(28, item).slice(0, 8);
  const climbers = kind === "day" ? adults + youths : adults;
  const needsGuardian = kind === "day" ? youths > 0 : item.level === "Youth";
  const cap = kind === "day" ? 40 : item.capacity;
  const free =
    date && slot ? placesLeft(`${kind}${classId}${date}${slot}`, cap) : null;
  const total =
    kind === "day"
      ? adults * prices.dayAdult +
        youths * prices.dayYouth +
        shoes * prices.shoes
      : climbers * item.price;
  const what = kind === "day" ? "Day pass" : item.name;

  const pick = (d: string, t: string) => {
    setDate(d);
    setSlot(t);
    setErrors(({ when: _, ...rest }) => rest);
  };

  const pickKind = (k: Kind) => {
    setKind(k);
    setDate("");
    setSlot("");
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const extra: Record<string, string> = {};
    if (!date || !slot)
      extra.when =
        kind === "day"
          ? "Pick a date and an arrival time."
          : "Pick one of the session dates.";
    else if (free !== null && free < climbers)
      extra.when = `Only ${free} places left at ${slot}. Choose another time or fewer climbers.`;
    const found = validate(
      form,
      {
        name: "Add the lead booker's full name.",
        email:
          "Enter an email like you@example.com — your booking reference goes there.",
        phone: "Use digits, spaces and + only, e.g. +1 555 0100.",
        guardian: "Under 16s need a parent or guardian named on the booking.",
        experience:
          "Tell us if you've climbed before so we can plan your induction.",
        waiver:
          "Tick to confirm everyone has read the climbing waiver. It's required to climb.",
      },
      extra,
    );
    setErrors(found);
    if (found.when)
      document.getElementById("when")?.scrollIntoView({ block: "center" });
    if (Object.keys(found).length) return;
    const data = new FormData(form);
    setSending(true);
    await pause(1100);
    setSending(false);
    setDone({
      ref: `SUM-${String(Math.floor(1000 + Math.random() * 9000))}`,
      what,
      when: `${longDate(date)}, ${slot}`,
      who:
        kind === "day"
          ? `${adults} adult${adults === 1 ? "" : "s"}${youths ? `, ${youths} under 16` : ""}${shoes ? ` · ${shoes} shoe hire` : ""}`
          : `${climbers} ${climbers === 1 ? "place" : "places"}`,
      total,
      email: String(data.get("email")),
    });
    window.scrollTo({ top: 0 });
  };

  if (done)
    return (
      <section className="wrap booked" aria-live="polite">
        <h1>You're booked in.</h1>
        <div className="ticket">
          <p className="ticket-ref">
            Booking <strong>{done.ref}</strong>
          </p>
          <dl>
            <div>
              <dt>What</dt>
              <dd>{done.what}</dd>
            </div>
            <div>
              <dt>When</dt>
              <dd>{done.when}</dd>
            </div>
            <div>
              <dt>Who</dt>
              <dd>{done.who}</dd>
            </div>
            <div>
              <dt>Pay at the desk</dt>
              <dd className="num">{money(done.total)}</dd>
            </div>
          </dl>
          <p>
            A confirmation is on its way to {done.email}. Show the reference at
            the desk at {brand.street}; first-timers, arrive ten minutes early
            for the induction.
          </p>
        </div>
        <div className="actions">
          <Link to="/routes" className="btn btn-tape">
            See what's on the walls
          </Link>
          <button
            type="button"
            className="btn btn-line"
            onClick={() => setDone(null)}
          >
            Make another booking
          </button>
        </div>
        <p className="fine">Demo booking: nothing was sent or charged.</p>
      </section>
    );

  return (
    <>
      <section className="page-head wrap">
        <h1>Book a day pass</h1>
        <p className="lead">
          Walk-ins are always welcome, but booking guarantees your arrival slot
          at busy times and gets you through the desk faster. Pay when you
          arrive.
        </p>
      </section>

      <form
        noValidate
        onSubmit={submit}
        onChange={onChange}
        className="wrap booking"
      >
        <div className="booking-steps">
          <fieldset className="step">
            <legend>
              <span className="step-n">1</span> What are you booking?
            </legend>
            <div className="seg seg-lg" role="group" aria-label="Booking type">
              <button
                type="button"
                aria-pressed={kind === "day"}
                onClick={() => pickKind("day")}
              >
                Day pass
              </button>
              <button
                type="button"
                aria-pressed={kind === "class"}
                onClick={() => pickKind("class")}
              >
                A class
              </button>
            </div>
            {kind === "class" && (
              <label className="select-label block">
                Class
                <select
                  value={classId}
                  onChange={(e) => {
                    setClassId(e.target.value);
                    setDate("");
                    setSlot("");
                  }}
                >
                  {classes.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} · {money(c.price)}
                    </option>
                  ))}
                </select>
              </label>
            )}
          </fieldset>

          <fieldset
            className="step"
            id="when"
            data-invalid={errors.when ? "" : undefined}
            aria-describedby={errors.when ? "when-err" : undefined}
          >
            <legend>
              <span className="step-n">2</span> When?
            </legend>
            {kind === "day" ? (
              <>
                <div className="date-strip" role="group" aria-label="Date">
                  {dates.map((d) => (
                    <button
                      key={d}
                      type="button"
                      aria-pressed={date === d}
                      onClick={() => {
                        setDate(d);
                        setSlot("");
                      }}
                    >
                      <span>
                        {toDate(d).toLocaleString("en-US", {
                          weekday: "short",
                        })}
                      </span>
                      <strong>{toDate(d).getDate()}</strong>
                      <span>
                        {toDate(d).toLocaleString("en-US", { month: "short" })}
                      </span>
                    </button>
                  ))}
                </div>
                {date ? (
                  <div
                    className="slots"
                    role="group"
                    aria-label={`Arrival time on ${shortDate(date)}`}
                  >
                    {slotsFor(hours[toDate(date).getDay()]).map((t) => {
                      const left = placesLeft(`day${classId}${date}${t}`, 40);
                      return (
                        <button
                          key={t}
                          type="button"
                          aria-pressed={slot === t}
                          disabled={left === 0}
                          onClick={() => pick(date, t)}
                        >
                          <strong className="num">{t}</strong>
                          <span>{left === 0 ? "Full" : `${left} places`}</span>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <p className="field-hint">
                    Pick a date to see arrival times. You can stay until
                    closing.
                  </p>
                )}
              </>
            ) : (
              <div
                className="slots"
                role="group"
                aria-label={`Sessions of ${item.name}`}
              >
                {sessions.map((s) => {
                  const left = placesLeft(
                    `class${classId}${s.date}${s.time}`,
                    item.capacity,
                  );
                  const on = date === s.date && slot === s.time;
                  return (
                    <button
                      key={s.date + s.time}
                      type="button"
                      aria-pressed={on}
                      disabled={left === 0}
                      onClick={() => pick(s.date, s.time)}
                    >
                      <strong>{shortDate(s.date)}</strong>
                      <span>
                        <span className="num">{s.time}</span> ·{" "}
                        {left === 0 ? "Full" : `${left} left`}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
            {errors.when && (
              <p className="field-error" id="when-err">
                {errors.when}
              </p>
            )}
          </fieldset>

          <fieldset className="step">
            <legend>
              <span className="step-n">3</span> Who's climbing?
            </legend>
            {kind === "day" ? (
              <>
                <Stepper
                  label="Adults"
                  hint={`16 and over · ${money(prices.dayAdult)}`}
                  value={adults}
                  min={1}
                  max={8}
                  onChange={(n) => (
                    setAdults(n),
                    setShoes(Math.min(shoes, n + youths))
                  )}
                />
                <Stepper
                  label="Under 16"
                  hint={`With an adult · ${money(prices.dayYouth)}`}
                  value={youths}
                  max={6}
                  onChange={(n) => (
                    setYouths(n),
                    setShoes(Math.min(shoes, adults + n))
                  )}
                />
                <Stepper
                  label="Shoe hire"
                  hint={`${money(prices.shoes)} a pair`}
                  value={shoes}
                  max={climbers}
                  onChange={setShoes}
                />
              </>
            ) : (
              <Stepper
                label="Places"
                hint={`${money(item.price)} each · ages ${item.ages}`}
                value={adults}
                min={1}
                max={4}
                onChange={setAdults}
              />
            )}
          </fieldset>

          <fieldset className="step">
            <legend>
              <span className="step-n">4</span> Your details
            </legend>
            <div className="form-grid">
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
              />
              <Field
                label="Phone (optional)"
                name="phone"
                type="tel"
                autoComplete="tel"
                pattern="[0-9+ ()\-]{7,}"
                error={errors.phone}
              />
              {needsGuardian && (
                <Field
                  label="Parent or guardian"
                  name="guardian"
                  required
                  hint="Must be present for under 16s."
                  error={errors.guardian}
                />
              )}
              <Field
                label="Climbed before?"
                name="experience"
                error={errors.experience}
                className="span-2"
              >
                <select required defaultValue="">
                  <option value="" disabled>
                    Choose one
                  </option>
                  <option>First time ever</option>
                  <option>Climbed at another gym</option>
                  <option>Climbed at Summit before</option>
                </select>
              </Field>
            </div>
            <div
              className="field check-field"
              data-invalid={errors.waiver ? "" : undefined}
            >
              <label className="check">
                <input
                  type="checkbox"
                  name="waiver"
                  required
                  aria-invalid={errors.waiver ? true : undefined}
                  aria-describedby={errors.waiver ? "f-waiver-err" : undefined}
                />{" "}
                Everyone on this booking has read and accepts the climbing
                waiver and house rules.
              </label>
              {errors.waiver && (
                <p className="field-error" id="f-waiver-err">
                  {errors.waiver}
                </p>
              )}
            </div>
          </fieldset>
        </div>

        <aside className="booking-summary" aria-labelledby="sum-title">
          <h2 id="sum-title" className="h-sm">
            Your booking
          </h2>
          <dl>
            <div>
              <dt>What</dt>
              <dd>{what}</dd>
            </div>
            <div>
              <dt>When</dt>
              <dd>
                {date && slot
                  ? `${shortDate(date)}, ${slot}`
                  : "Not chosen yet"}
              </dd>
            </div>
            {kind === "day" ? (
              <>
                {adults > 0 && (
                  <div>
                    <dt>{adults} × adult</dt>
                    <dd className="num">{money(adults * prices.dayAdult)}</dd>
                  </div>
                )}
                {youths > 0 && (
                  <div>
                    <dt>{youths} × under 16</dt>
                    <dd className="num">{money(youths * prices.dayYouth)}</dd>
                  </div>
                )}
                {shoes > 0 && (
                  <div>
                    <dt>{shoes} × shoe hire</dt>
                    <dd className="num">{money(shoes * prices.shoes)}</dd>
                  </div>
                )}
              </>
            ) : (
              <div>
                <dt>
                  {climbers} × {item.name}
                </dt>
                <dd className="num">{money(total)}</dd>
              </div>
            )}
          </dl>
          <p className="sum-total">
            <span>Pay at the desk</span>
            <strong className="num">{money(total)}</strong>
          </p>
          <button
            type="submit"
            className="btn btn-tape btn-block"
            disabled={sending}
          >
            {sending ? (
              "Booking…"
            ) : (
              <>
                <Check aria-hidden="true" /> Confirm booking
              </>
            )}
          </button>
          <p className="fine">Demo form: nothing is sent or charged.</p>
        </aside>
      </form>
    </>
  );
}
