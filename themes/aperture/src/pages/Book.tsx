import { useEffect, useState, type FormEvent } from "react";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import { Link } from "../router";
import { films, pricing, ticketTypes, type TicketId } from "../content";
import { Field, useErrors } from "../components/Field";
import { DayStrip, FilmRow } from "../components/Listing";
import { SeatMap, Sightline } from "../components/SeatMap";
import { pause, reference, validate } from "../lib/forms";
import {
  dayLong,
  doorsAt,
  endsAt,
  findScreening,
  isTuesday,
  money,
  priceOf,
  takenSeats,
  type Screening,
  type Seat,
} from "../lib/programme";

const readId = () =>
  new URLSearchParams(window.location.hash.split("?")[1] ?? "").get("s");

export function Book() {
  const [id, setId] = useState(readId);
  useEffect(() => {
    const onHash = () => setId(readId());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  const screening = findScreening(id);
  const usable = screening && !screening.past && !screening.soldOut;
  return usable ? (
    <Booking key={screening.id} s={screening} />
  ) : (
    <Chooser missing={!!id} />
  );
}

function Chooser({ missing }: { missing: boolean }) {
  const [day, setDay] = useState(0);
  const playing = films.filter((f) => f.showings.some((s) => s.day === day));
  return (
    <div className="wrap page-pad">
      <header className="page-head">
        <h1>Book tickets</h1>
        <p className="lede">
          Choose a screening, then choose your seats. {pricing.bookingFee}{" "}
          {pricing.tuesdayLine}
        </p>
        {missing && (
          <p className="notice" role="status">
            That screening has already started or is sold out. Here is
            everything else we are showing.
          </p>
        )}
      </header>
      <DayStrip value={day} onChange={setDay} />
      <h2 className="listing-day">{dayLong(day)}</h2>
      <div className="listing">
        {playing.map((f) => (
          <FilmRow key={f.slug} film={f} day={day} />
        ))}
      </div>
    </div>
  );
}

type Counts = Record<TicketId, number>;
const none: Counts = { standard: 0, concession: 0, under16: 0, member: 0 };

function Booking({ s }: { s: Screening }) {
  const [taken] = useState(() => takenSeats(s));
  const [seats, setSeats] = useState<string[]>([]);
  const [counts, setCounts] = useState<Counts>(none);
  const [active, setActive] = useState(Math.floor(s.screen.rows.length * 0.6));
  const [step, setStep] = useState<"seats" | "details" | "done">("seats");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [ref, setRef] = useState("");
  const { errors, setErrors, onChange } = useErrors();

  const total = ticketTypes.reduce(
    (sum, t) => sum + counts[t.id] * priceOf(t.id, s.day),
    0,
  );
  const free = s.screen.rows.length * s.screen.perRow - taken.size;

  const toggle = (seat: Seat) => {
    setActive(s.screen.rows.indexOf(seat.row));
    if (seats.includes(seat.id)) {
      setSeats(seats.filter((x) => x !== seat.id));
      // Give the seat back from Standard first, then from whichever type was added last.
      const from = counts.standard
        ? "standard"
        : [...ticketTypes].reverse().find((t) => counts[t.id])!.id;
      setCounts({ ...counts, [from]: counts[from] - 1 });
      setMessage(`Row ${seat.row}, seat ${seat.n} released.`);
      return;
    }
    if (seats.length >= pricing.maxSeats) {
      setMessage(
        `You can book up to ${pricing.maxSeats} seats at once. For groups, call the box office.`,
      );
      return;
    }
    setSeats([...seats, seat.id]);
    setCounts({ ...counts, standard: counts.standard + 1 });
    setMessage(
      `Row ${seat.row}, seat ${seat.n} added. ${seats.length + 1} selected.`,
    );
  };

  const shift = (type: TicketId, by: 1 | -1) => {
    if (by === 1 && !counts.standard) return;
    if (by === -1 && !counts[type]) return;
    setCounts({
      ...counts,
      [type]: counts[type] + by,
      standard: counts.standard - by,
    });
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, {
      name: "Add the name the tickets should be under.",
      email: "Enter an email like you@example.com for your e-tickets.",
      phone:
        "Use digits and spaces only, e.g. 07700 900123, or leave it blank.",
      member:
        "Member numbers look like AP20417: two letters and five digits, on the back of your card.",
      terms: "Tick the box to confirm you have read the swap policy.",
    });
    setErrors(found);
    if (Object.keys(found).length) return;
    setBusy(true);
    await pause();
    setBusy(false);
    setRef(reference());
    setStep("done");
    window.scrollTo({ top: 0 });
  };

  const picked = [...seats].sort((a, b) =>
    a.localeCompare(b, "en", { numeric: true }),
  );
  const lines = ticketTypes.filter((t) => counts[t.id]);

  return (
    <div className="wrap page-pad book">
      <header className="book-head">
        <Link to="/book" className="back-link">
          <ArrowLeft aria-hidden="true" /> All screenings
        </Link>
        <h1>{s.film.title}</h1>
        <p className="book-when">
          <span>{dayLong(s.day)}</span>
          <span>
            {s.time}–{endsAt(s)}
          </span>
          <span>{s.screen.name}</span>
          <span>
            {s.film.format === "Digital"
              ? `${s.film.cert} · Digital`
              : `${s.film.cert} · ${s.film.format} print`}
          </span>
          {s.note && <span className="tag">{s.note}</span>}
        </p>
        <ol className="steps" aria-label="Booking steps">
          {(["Seats", "Your details", "Confirmed"] as const).map((label, i) => {
            const current = ["seats", "details", "done"].indexOf(step);
            return (
              <li
                key={label}
                data-state={
                  i < current ? "done" : i === current ? "now" : "next"
                }
                aria-current={i === current ? "step" : undefined}
              >
                <span className="tnum">{i + 1}</span> {label}
              </li>
            );
          })}
        </ol>
        <p className="sr-only" aria-live="polite">
          {step === "done" && `Booking confirmed. Reference ${ref}.`}
        </p>
      </header>

      {step === "done" ? (
        <section className="confirm" aria-labelledby="confirm-h">
          <div>
            <h2 id="confirm-h">You are booked. Reference {ref}</h2>
            <p>
              {picked.length} {picked.length === 1 ? "seat" : "seats"} for{" "}
              {s.film.title}, {dayLong(s.day)} at {s.time}. Show this reference
              or your name at the box office; doors open at {doorsAt(s)}.
            </p>
          </div>
          <ol className="stubs">
            {picked.map((seat, i) => {
              const type = ticketTypes.flatMap((t) =>
                Array(counts[t.id]).fill(t),
              )[i];
              return (
                <li className="stub" key={seat}>
                  <div className="stub-main">
                    <span className="stub-house">
                      Aperture · {s.screen.name}
                    </span>
                    <strong>{s.film.title}</strong>
                    <span>
                      {dayLong(s.day)} · {s.time}
                    </span>
                  </div>
                  <div className="stub-tear">
                    <span>Row {seat.match(/^[A-Z]/)![0]}</span>
                    <strong className="tnum">{seat.slice(1)}</strong>
                    <span>
                      {type.label} · {money(priceOf(type.id, s.day))}
                    </span>
                  </div>
                </li>
              );
            })}
          </ol>
          <p className="quiet">
            This is a demo: nothing was reserved, charged or sent.
          </p>
          <div className="actions">
            <Link to="/whats-on" className="btn btn-ink">
              Back to what's on
            </Link>
            <Link to="/visit" className="btn btn-line">
              Getting here
            </Link>
          </div>
        </section>
      ) : (
        <div className="book-grid">
          {step === "seats" ? (
            <section className="book-seats" aria-labelledby="seats-h">
              <h2 id="seats-h" className="sr-only">
                Choose your seats
              </h2>
              <SeatMap
                screen={s.screen}
                taken={taken}
                selected={seats}
                onToggle={toggle}
                onActive={(seat) => setActive(s.screen.rows.indexOf(seat.row))}
              />
              <Sightline screen={s.screen} row={active} />
            </section>
          ) : (
            <section className="book-details" aria-labelledby="details-h">
              <h2 id="details-h">Your details</h2>
              <form
                noValidate
                onSubmit={submit}
                onChange={onChange}
                className="form-grid"
                aria-busy={busy}
              >
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
                  hint="Your e-tickets go here."
                  error={errors.email}
                />
                <Field
                  label="Phone (optional)"
                  name="phone"
                  type="tel"
                  pattern="[0-9 +]{7,16}"
                  autoComplete="tel"
                  error={errors.phone}
                />
                {counts.member > 0 && (
                  <Field
                    label="Member number"
                    name="member"
                    required
                    pattern="[A-Za-z]{2}[0-9]{5}"
                    hint="On the back of your card, e.g. AP20417."
                    error={errors.member}
                  />
                )}
                <Field
                  label="Access needs (optional)"
                  name="access"
                  className="span-2"
                  hint="Carer tickets, a seat near the door, a booster cushion: we will have it ready."
                >
                  <textarea rows={3} />
                </Field>
                <div
                  className="field span-2 check"
                  data-invalid={errors.terms ? "" : undefined}
                >
                  <label>
                    <input
                      type="checkbox"
                      name="terms"
                      required
                      aria-invalid={errors.terms ? true : undefined}
                      aria-describedby={
                        errors.terms ? "f-terms-err" : undefined
                      }
                    />
                    I understand tickets can be swapped up to an hour before the
                    film, and refunds are given as credit.
                  </label>
                  {errors.terms && (
                    <p className="field-error" id="f-terms-err">
                      {errors.terms}
                    </p>
                  )}
                </div>
                <div className="actions span-2">
                  <button
                    type="button"
                    className="btn btn-line"
                    onClick={() => setStep("seats")}
                  >
                    Change seats
                  </button>
                  <button type="submit" className="btn btn-red" disabled={busy}>
                    {busy ? "Confirming…" : `Confirm and pay ${money(total)}`}
                  </button>
                </div>
                <p className="quiet span-2">
                  Demo only: no card is taken and nothing is sent.
                </p>
              </form>
            </section>
          )}

          <aside className="basket" aria-labelledby="basket-h">
            <h2 id="basket-h">Your tickets</h2>
            <p className="basket-free">
              {free} of {s.screen.rows.length * s.screen.perRow} seats free
              {isTuesday(s.day) && <span className="tag">Cheap Tuesday</span>}
            </p>
            {picked.length ? (
              <ul className="chips" aria-label="Selected seats">
                {picked.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            ) : (
              <p className="basket-empty">
                No seats yet. Tap any light seat on the map.
              </p>
            )}
            {step === "seats" && picked.length > 0 && (
              <div className="ticket-types">
                {ticketTypes.map((t) => (
                  <div className="ticket-type" key={t.id}>
                    <div>
                      <strong>{t.label}</strong>
                      <span>{t.note || "Adults"}</span>
                    </div>
                    <span className="tnum price">
                      {money(priceOf(t.id, s.day))}
                    </span>
                    {t.id === "standard" ? (
                      <output
                        className="tnum count"
                        aria-label={`${t.label} tickets`}
                      >
                        {counts.standard}
                      </output>
                    ) : (
                      <div className="stepper">
                        <button
                          type="button"
                          aria-label={`One fewer ${t.label} ticket`}
                          disabled={!counts[t.id]}
                          onClick={() => shift(t.id, -1)}
                        >
                          <Minus aria-hidden="true" />
                        </button>
                        <output
                          className="tnum count"
                          aria-label={`${t.label} tickets`}
                        >
                          {counts[t.id]}
                        </output>
                        <button
                          type="button"
                          aria-label={`One more ${t.label} ticket`}
                          disabled={!counts.standard}
                          onClick={() => shift(t.id, 1)}
                        >
                          <Plus aria-hidden="true" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            {step === "details" && (
              <ul className="basket-lines">
                {lines.map((t) => (
                  <li key={t.id}>
                    <span>
                      {counts[t.id]} × {t.label}
                    </span>
                    <span className="tnum">
                      {money(counts[t.id] * priceOf(t.id, s.day))}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            <p className="basket-total">
              <span>Total</span>
              <strong className="tnum">{money(total)}</strong>
            </p>
            <p className="quiet">{pricing.bookingFee}</p>
            {step === "seats" && (
              <button
                type="button"
                className="btn btn-red btn-block"
                onClick={() => {
                  if (!seats.length)
                    return setMessage(
                      "Choose at least one seat on the map to continue.",
                    );
                  setMessage("");
                  setStep("details");
                }}
              >
                Continue with {seats.length || "no"}{" "}
                {seats.length === 1 ? "seat" : "seats"}
              </button>
            )}
            <p className="basket-msg" aria-live="polite">
              {message}
            </p>
          </aside>
        </div>
      )}
    </div>
  );
}
