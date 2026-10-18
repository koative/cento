import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type RefObject,
} from "react";
import { Minus, Plus } from "lucide-react";
import {
  board,
  brand,
  extras,
  kindLabel,
  policies,
  rooms,
  type Room,
} from "../content";
import { Link } from "../router";
import {
  cheapest,
  longDate,
  money,
  nightsBetween,
  quote,
  resetDraft,
  setDraft,
  shortDate,
  stayFree,
  stayRate,
  takenNights,
  useDraft,
  type Draft,
} from "../lib/stay";
import { pause, useErrors, validate } from "../lib/forms";
import { Calendar } from "../components/Calendar";
import { Field } from "../components/Field";

const steps = ["Dates", "Room", "Extras", "Your details"];

type Confirmed = { ref: string; name: string; email: string; draft: Draft };

export function Book() {
  const d = useDraft();
  const [step, setStep] = useState(() => (d.checkIn && d.checkOut ? 1 : 0));
  const [msg, setMsg] = useState("");
  const [done, setDone] = useState<Confirmed | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const first = useRef(true);
  const room = rooms.find((r) => r.id === d.roomId) ?? null;

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    heading.current?.focus();
  }, [step, done]);

  const go = (n: number) => {
    setStep(n);
    setMsg(`Step ${n + 1} of ${steps.length}: ${steps[n]}.`);
  };

  if (done) return <Confirmation done={done} heading={heading} />;

  return (
    <>
      <header className="page-head wrap">
        <h1>Check availability</h1>
        <p className="lede">
          Choose your nights, then the room. Prices are per night for the room,
          with breakfast for everyone in it.
        </p>
      </header>

      <div className="wrap book">
        <ol className="stepper" aria-label="Booking steps">
          {steps.map((s, i) => (
            <li
              key={s}
              data-state={i < step ? "done" : i === step ? "current" : "todo"}
            >
              {i < step ? (
                <button type="button" onClick={() => go(i)}>
                  <span className="num">{i + 1}</span> {s}
                </button>
              ) : (
                <span aria-current={i === step ? "step" : undefined}>
                  <span className="num">{i + 1}</span> {s}
                </span>
              )}
            </li>
          ))}
        </ol>

        <div className="book-grid">
          <div className="book-main">
            {step === 0 && (
              <DatesStep heading={heading} setMsg={setMsg} next={() => go(1)} />
            )}
            {step === 1 && (
              <RoomStep
                heading={heading}
                back={() => go(0)}
                next={() => go(2)}
              />
            )}
            {step === 2 && room && (
              <ExtrasStep
                heading={heading}
                room={room}
                back={() => go(1)}
                next={() => go(3)}
              />
            )}
            {step === 3 && (
              <DetailsStep
                heading={heading}
                back={() => go(2)}
                onDone={(c) => {
                  setDone(c);
                  resetDraft();
                }}
              />
            )}
          </div>
          <Summary draft={d} />
        </div>
        <p className="sr-only" aria-live="polite">
          {msg}
        </p>
      </div>
    </>
  );
}

type StepProps = { heading: RefObject<HTMLHeadingElement | null> };

/* ------------------------------------------------------------ 1 · dates */

function Stepper({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="counter">
      <span className="counter-label" id={`c-${label}`}>
        {label}
      </span>
      <button
        type="button"
        className="icon-btn"
        aria-label={`Fewer ${label.toLowerCase()}`}
        disabled={value <= min}
        onClick={() => onChange(value - 1)}
      >
        <Minus aria-hidden="true" />
      </button>
      <output className="num" aria-labelledby={`c-${label}`} aria-live="polite">
        {value}
      </output>
      <button
        type="button"
        className="icon-btn"
        aria-label={`More ${label.toLowerCase()}`}
        disabled={value >= max}
        onClick={() => onChange(value + 1)}
      >
        <Plus aria-hidden="true" />
      </button>
    </div>
  );
}

function DatesStep({
  heading,
  setMsg,
  next,
}: StepProps & { setMsg: (m: string) => void; next: () => void }) {
  const d = useDraft();
  const guests = d.adults + d.children;
  const room = rooms.find((r) => r.id === d.roomId) ?? null;
  const [note, setNote] = useState("");
  const pickingEnd = !!d.checkIn && !d.checkOut;
  const fits = (r: Room) => r.sleeps >= guests;

  const priceOf = (day: string) => cheapest(day, guests, d.roomId);
  const canEnd = (day: string) =>
    pickingEnd &&
    day > d.checkIn! &&
    (room
      ? fits(room) && stayFree(room, d.checkIn!, day)
      : rooms.some((r) => fits(r) && stayFree(r, d.checkIn!, day)));

  function pick(day: string) {
    if (canEnd(day)) {
      const n = nightsBetween(d.checkIn!, day);
      if (n < 2) {
        setNote(
          "Stays are two nights or more. Choose a departure at least two days after arrival.",
        );
        return;
      }
      setDraft({ checkOut: day });
      setNote("");
      setMsg(`${n} nights, ${longDate(d.checkIn!)} to ${longDate(day)}.`);
      return;
    }
    setDraft({ checkIn: day, checkOut: null });
    setNote("");
    setMsg(`Arrival ${longDate(day)}. Now choose your departure.`);
  }

  function setParty(patch: Partial<Draft>) {
    const total = (patch.adults ?? d.adults) + (patch.children ?? d.children);
    if (room && room.sleeps < total) {
      setDraft({ ...patch, roomId: null });
      setMsg(
        `The ${room.name} sleeps ${room.sleeps}; showing every room instead.`,
      );
    } else setDraft(patch);
  }

  return (
    <section aria-labelledby="step-h">
      <h2 id="step-h" ref={heading} tabIndex={-1}>
        When are you coming?
      </h2>

      <div className="party">
        <Stepper
          label="Adults"
          value={d.adults}
          min={1}
          max={5 - d.children}
          onChange={(n) => setParty({ adults: n })}
        />
        <Stepper
          label="Children"
          value={d.children}
          min={0}
          max={5 - d.adults}
          onChange={(n) => setParty({ children: n })}
        />
      </div>

      {room && (
        <p className="filter-note">
          Showing nights when the {room.name} is free.{" "}
          <button
            type="button"
            className="text-btn"
            onClick={() => setDraft({ roomId: null })}
          >
            Show every room
          </button>
        </p>
      )}

      <Calendar
        checkIn={d.checkIn}
        checkOut={d.checkOut}
        priceOf={priceOf}
        enabled={(day) => priceOf(day) !== null || canEnd(day)}
        onPick={pick}
      />
      <p className="small calendar-key">
        Figures are the lowest nightly rate in CHF
        {room
          ? ` for the ${room.name}`
          : ` for ${guests} ${guests === 1 ? "guest" : "guests"}`}
        . A dash means fully booked or closed between seasons.
      </p>

      {note && (
        <p className="form-error-note" role="alert">
          {note}
        </p>
      )}

      <div className="step-actions">
        <p className="picked">
          {d.checkIn && d.checkOut
            ? `${shortDate(d.checkIn)} → ${shortDate(d.checkOut)} · ${nightsBetween(d.checkIn, d.checkOut)} nights`
            : d.checkIn
              ? `Arriving ${shortDate(d.checkIn)}. Now pick a departure.`
              : "Pick an arrival date."}
        </p>
        {d.checkIn && (
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => setDraft({ checkIn: null, checkOut: null })}
          >
            Clear dates
          </button>
        )}
        <button
          type="button"
          className="btn btn-primary"
          disabled={!d.checkIn || !d.checkOut}
          onClick={next}
        >
          Choose a room
        </button>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ 2 · room */

function RoomStep({
  heading,
  back,
  next,
}: StepProps & { back: () => void; next: () => void }) {
  const d = useDraft();
  const guests = d.adults + d.children;
  const checkIn = d.checkIn!;
  const checkOut = d.checkOut!;
  const nights = nightsBetween(checkIn, checkOut);
  const options = rooms.map((r) => {
    const reason =
      r.sleeps < guests
        ? `Sleeps ${r.sleeps}`
        : takenNights(r, checkIn, checkOut)
          ? `Taken on ${takenNights(r, checkIn, checkOut)} of your nights`
          : null;
    return { room: r, reason, total: stayRate(r, checkIn, checkOut) };
  });
  const chosen = options.find((o) => o.room.id === d.roomId && !o.reason);

  return (
    <section aria-labelledby="step-h">
      <h2 id="step-h" ref={heading} tabIndex={-1}>
        Which room?
      </h2>
      <p className="step-lede">
        {shortDate(checkIn)} to {shortDate(checkOut)}, {nights} nights, {guests}{" "}
        {guests === 1 ? "guest" : "guests"}.{" "}
        {options.filter((o) => !o.reason).length} of {rooms.length} rooms are
        free.
      </p>
      <fieldset className="room-options">
        <legend className="sr-only">Rooms for your dates</legend>
        {options.map(({ room, reason, total }) => (
          <label
            key={room.id}
            className="room-option"
            data-off={reason ? "" : undefined}
          >
            <input
              type="radio"
              name="room"
              value={room.id}
              checked={d.roomId === room.id && !reason}
              disabled={!!reason}
              onChange={() => setDraft({ roomId: room.id })}
            />
            <img
              src={room.image.src}
              alt=""
              width={160}
              height={120}
              loading="lazy"
            />
            <span className="room-option-text">
              <span className="room-option-name">{room.name}</span>
              <span className="room-option-facts">
                {kindLabel[room.kind]} · {room.size} m² · sleeps {room.sleeps} ·{" "}
                {room.beds}
              </span>
              {reason && <span className="room-option-reason">{reason}</span>}
            </span>
            <span className="room-option-price">
              {reason ? (
                <span className="muted">Not available</span>
              ) : (
                <>
                  <strong className="num">{money(total)}</strong>
                  <span className="num">
                    {money(Math.round(total / nights))} a night
                  </span>
                </>
              )}
            </span>
          </label>
        ))}
      </fieldset>
      <div className="step-actions">
        <button type="button" className="btn btn-outline" onClick={back}>
          Change dates
        </button>
        <button
          type="button"
          className="btn btn-primary"
          disabled={!chosen}
          onClick={next}
        >
          Add extras
        </button>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ 3 · extras */

function ExtrasStep({
  heading,
  room,
  back,
  next,
}: StepProps & { room: Room; back: () => void; next: () => void }) {
  const d = useDraft();
  const offered = extras.filter((e) => e.id !== "dog" || room.kind === "cabin");
  const per = {
    stay: "per stay",
    night: "a night",
    person: "per person a day",
  };

  return (
    <section aria-labelledby="step-h">
      <h2 id="step-h" ref={heading} tabIndex={-1}>
        Dinner and the small things
      </h2>
      <fieldset className="options">
        <legend>Board</legend>
        {board.map((b) => (
          <label key={b.id} className="option">
            <input
              type="radio"
              name="board"
              checked={d.board === b.id}
              onChange={() => setDraft({ board: b.id })}
            />
            <span>
              <span className="option-name">{b.label}</span>
              <span className="option-note">{b.note}</span>
            </span>
            <span className="option-price num">
              {b.price ? `+ ${money(b.price)} per person a night` : "Included"}
            </span>
          </label>
        ))}
      </fieldset>
      <fieldset className="options">
        <legend>Extras</legend>
        {offered.map((e) => (
          <label key={e.id} className="option">
            <input
              type="checkbox"
              checked={d.extras.includes(e.id)}
              onChange={(ev) =>
                setDraft({
                  extras: ev.target.checked
                    ? [...d.extras, e.id]
                    : d.extras.filter((x) => x !== e.id),
                })
              }
            />
            <span>
              <span className="option-name">{e.label}</span>
              <span className="option-note">{e.note}</span>
            </span>
            <span className="option-price num">
              {money(e.price)} {per[e.per]}
            </span>
          </label>
        ))}
      </fieldset>
      <div className="step-actions">
        <button type="button" className="btn btn-outline" onClick={back}>
          Change room
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            if (room.kind !== "cabin" && d.extras.includes("dog"))
              setDraft({ extras: d.extras.filter((x) => x !== "dog") });
            next();
          }}
        >
          Your details
        </button>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ 4 · details */

const messages = {
  firstName: "Enter your first name.",
  lastName: "Enter your last name.",
  email: "Enter an email address like name@example.com.",
  phone:
    "Enter a phone number of at least 7 digits, using only digits, spaces and +.",
  arrival: "Choose roughly when you will arrive, so we can light the stove.",
  terms: "Tick the box to accept the cancellation policy.",
};

function DetailsStep({
  heading,
  back,
  onDone,
}: StepProps & { back: () => void; onDone: (c: Confirmed) => void }) {
  const d = useDraft();
  const { errors, setErrors, onChange } = useErrors();
  const [sending, setSending] = useState(false);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(e.currentTarget, messages);
    setErrors(found);
    if (Object.keys(found).length) return;
    const data = new FormData(e.currentTarget);
    setSending(true);
    await pause(1200);
    onDone({
      ref: `HVN-${String(Math.floor(1000 + Math.random() * 9000))}`,
      name: String(data.get("firstName")),
      email: String(data.get("email")),
      draft: d,
    });
  }

  return (
    <section aria-labelledby="step-h">
      <h2 id="step-h" ref={heading} tabIndex={-1}>
        Who is coming?
      </h2>
      <form
        className="details-form"
        noValidate
        onSubmit={submit}
        onChange={onChange}
        aria-busy={sending}
      >
        <div className="form-row">
          <Field
            label="First name"
            name="firstName"
            required
            autoComplete="given-name"
            error={errors.firstName}
          />
          <Field
            label="Last name"
            name="lastName"
            required
            autoComplete="family-name"
            error={errors.lastName}
          />
        </div>
        <div className="form-row">
          <Field
            label="Email"
            name="email"
            type="email"
            required
            autoComplete="email"
            error={errors.email}
            hint="Your confirmation goes here."
          />
          <Field
            label="Phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            pattern="[0-9 +]{7,}"
            error={errors.phone}
            hint="For the day of travel only."
          />
        </div>
        <Field label="Arriving around" name="arrival" error={errors.arrival}>
          <select required defaultValue="">
            <option value="" disabled>
              Choose a time
            </option>
            <option>15:00–17:00</option>
            <option>17:00–19:00</option>
            <option>19:00–21:00</option>
            <option>After 21:00 (we leave a key)</option>
          </select>
        </Field>
        <Field
          label="Anything we should know?"
          name="requests"
          hint="Allergies, a birthday, a cot, a fear of ladders."
        >
          <textarea rows={4} maxLength={600} />
        </Field>
        <div
          className="check-field"
          data-invalid={errors.terms ? "" : undefined}
        >
          <input
            type="checkbox"
            id="f-terms"
            name="terms"
            required
            aria-invalid={errors.terms ? true : undefined}
            aria-describedby={errors.terms ? "f-terms-err" : undefined}
          />
          <label htmlFor="f-terms">
            I accept the cancellation policy:{" "}
            {policies[0].charAt(0).toLowerCase() + policies[0].slice(1)}
          </label>
          {errors.terms && (
            <p className="field-error" id="f-terms-err">
              {errors.terms}
            </p>
          )}
        </div>
        <p className="small">
          This is a demonstration: nothing is sent, stored or charged.
        </p>
        <div className="step-actions">
          <button
            type="button"
            className="btn btn-outline"
            onClick={back}
            disabled={sending}
          >
            Back to extras
          </button>
          <button className="btn btn-primary" disabled={sending}>
            {sending ? "Reserving your room…" : "Reserve, pay on arrival"}
          </button>
        </div>
      </form>
    </section>
  );
}

/* ------------------------------------------------------------ summary + confirmation */

function Summary({
  draft,
  title = "Your stay",
}: {
  draft: Draft;
  title?: string;
}) {
  const q = quote(draft);
  return (
    <aside className="summary" aria-label="Stay summary">
      <h2>{title}</h2>
      {!q ? (
        <p className="muted">Choose your dates to see prices.</p>
      ) : (
        <>
          {q.room && (
            <img src={q.room.image.src} alt="" width={480} height={320} />
          )}
          <dl className="summary-facts">
            <div>
              <dt>Arrive</dt>
              <dd>{shortDate(draft.checkIn!)}</dd>
            </div>
            <div>
              <dt>Leave</dt>
              <dd>{shortDate(draft.checkOut!)}</dd>
            </div>
            <div>
              <dt>Guests</dt>
              <dd className="num">
                {draft.adults} {draft.adults === 1 ? "adult" : "adults"}
                {draft.children
                  ? `, ${draft.children} ${draft.children === 1 ? "child" : "children"}`
                  : ""}
              </dd>
            </div>
            <div>
              <dt>Room</dt>
              <dd>{q.room?.name ?? "Not chosen yet"}</dd>
            </div>
          </dl>
          {q.room ? (
            <>
              <table className="summary-lines">
                <tbody>
                  {q.lines.map((l) => (
                    <tr key={l.label}>
                      <th scope="row">{l.label}</th>
                      <td className="num">{money(l.amount)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th scope="row">Total</th>
                    <td className="num">{money(q.total)}</td>
                  </tr>
                </tfoot>
              </table>
              <p className="small">
                Breakfast included. Pay at the house when you leave.
              </p>
            </>
          ) : (
            <p className="muted">
              {q.nights} {q.nights === 1 ? "night" : "nights"}. The total
              appears once you choose a room.
            </p>
          )}
        </>
      )}
    </aside>
  );
}

function Confirmation({
  done,
  heading,
}: {
  done: Confirmed;
  heading: StepProps["heading"];
}) {
  return (
    <section className="wrap confirmed" aria-live="polite">
      <header className="page-head">
        <h1>Your stay is reserved</h1>
      </header>
      <div className="book-grid">
        <div className="confirmed-main">
          <h2 ref={heading} tabIndex={-1}>
            See you on {longDate(done.draft.checkIn!)}, {done.name}
          </h2>
          <p className="lede">
            Your room is held under reference{" "}
            <strong className="num">{done.ref}</strong>. A confirmation would
            now be on its way to {done.email}; in this demo nothing was sent and
            nothing was charged.
          </p>
          <ul className="plain-list">
            <li>We light the stove an hour before your arrival time.</li>
            <li>
              Check-in from {brand.checkIn}; the boot room is to the left of the
              front door.
            </li>
            <li>
              Need to change anything? Write to {brand.email} or call{" "}
              {brand.phone}.
            </li>
          </ul>
          <div className="actions">
            <Link to="/plan" className="btn btn-primary">
              Getting here
            </Link>
            <Link to="/experiences" className="btn btn-outline">
              Plan your days
            </Link>
          </div>
        </div>
        <Summary draft={done.draft} title="Reserved" />
      </div>
    </section>
  );
}
