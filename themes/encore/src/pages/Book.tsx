import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowLeft, Check, X } from "lucide-react";
import { Link } from "../router";
import {
  brand,
  maxSeats,
  ticketTypes,
  zoneNames,
  type Production,
} from "../content";
import {
  availability,
  performancesOf,
  seatPrice,
  type Performance,
  type Seat,
} from "../lib/house";
import { clock, longDate, money, pause, validate, weekDate } from "../lib/util";
import { Field, useErrors } from "../components/Field";
import { SeatMap } from "../components/SeatMap";
import { SightLine } from "../components/SightLine";

type Step = "date" | "seats" | "details" | "done";
type Pick = { seat: Seat; type: string };
type Filter = "all" | "evening" | "matinee" | "access";

const steps: { id: Step; label: string }[] = [
  { id: "date", label: "Date" },
  { id: "seats", label: "Seats" },
  { id: "details", label: "Your details" },
];

const filters: {
  id: Filter;
  label: string;
  test: (x: Performance) => boolean;
}[] = [
  { id: "all", label: "All", test: () => true },
  { id: "evening", label: "Evenings", test: (x) => x.time === "19:30" },
  { id: "matinee", label: "Matinees", test: (x) => x.time !== "19:30" },
  { id: "access", label: "Access performances", test: (x) => !!x.access },
];

const monthOf = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
});

export function Book({ p }: { p: Production }) {
  const perfs = performancesOf(p);
  const preset = perfs.find(
    (x) =>
      x.id ===
      new URLSearchParams(window.location.hash.split("?")[1] ?? "").get("p"),
  );
  const [perf, setPerf] = useState<Performance | undefined>(preset);
  const [step, setStep] = useState<Step>(preset ? "seats" : "date");
  const [filter, setFilter] = useState<Filter>("all");
  const [picks, setPicks] = useState<Pick[]>([]);
  const [look, setLook] = useState<Seat | null>(null);
  const [said, setSaid] = useState("");
  const [busy, setBusy] = useState(false);
  const [ref, setRef] = useState("");
  const { errors, setErrors, onChange } = useErrors();
  const heading = useRef<HTMLHeadingElement>(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    heading.current?.focus();
    heading.current?.scrollIntoView({ block: "start" });
  }, [step]);

  const total = picks.reduce(
    (sum, k) => sum + seatPrice(p, k.seat.zone, k.type),
    0,
  );
  const count = `${picks.length} ${picks.length === 1 ? "seat" : "seats"}`;

  const choose = (x: Performance) => {
    setPerf(x);
    setPicks([]);
    setLook(null);
    setStep("seats");
  };

  const toggle = (seat: Seat) => {
    const had = picks.some((k) => k.seat.id === seat.id);
    const next = had
      ? picks.filter((k) => k.seat.id !== seat.id)
      : [...picks, { seat, type: "full" }];
    setPicks(next);
    setLook(seat);
    const sum = next.reduce((s, k) => s + seatPrice(p, k.seat.zone, k.type), 0);
    setSaid(
      `Row ${seat.row} seat ${seat.number} ${had ? "removed" : "added"}. ${next.length} of ${maxSeats} seats, ${money(sum)}.`,
    );
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, {
      first: "Enter your first name as it should appear on the booking.",
      last: "Enter your last name — we use it to find your tickets at the box office.",
      email: "Enter an email like you@example.com; your e-tickets go there.",
      phone: "Use digits only, with an area code, like 555 013 4270.",
      terms: "Tick to confirm you've read the booking terms.",
    });
    setErrors(found);
    if (Object.keys(found).length) return;
    setBusy(true);
    await pause(1100);
    setBusy(false);
    setRef(
      `ENC-${perf!.id.slice(5, 10).replace("-", "")}-${Math.floor(1000 + Math.random() * 9000)}`,
    );
    setStep("done");
  };

  const restart = () => {
    setPicks([]);
    setPerf(undefined);
    setRef("");
    setStep("date");
  };

  const shown = perfs.filter(filters.find((f) => f.id === filter)!.test);
  const months = [
    ...new Set(
      shown.map((x) => monthOf.format(new Date(x.date + "T00:00:00"))),
    ),
  ];
  const view = look ?? picks[picks.length - 1]?.seat ?? null;
  const viewLabel = view
    ? `View from ${view.section} row ${view.row}, seat ${view.number}`
    : "View from the centre of the orchestra";

  return (
    <div className="book" data-house={step === "seats" ? "down" : undefined}>
      <section className="book-head">
        <div className="wrap">
          <Link to={`/season/${p.slug}`} className="back-link">
            <ArrowLeft aria-hidden="true" /> {p.title}
          </Link>
          <h1 className="book-title">Book {p.title}</h1>
          <p className="book-sub">
            {p.stage} · {p.runningTime}
            {perf && (
              <>
                {" "}
                ·{" "}
                <strong>
                  {longDate(perf.date)}, {clock(perf.time)}
                </strong>
              </>
            )}
          </p>
          {step !== "done" && (
            <ol className="stepper">
              {steps.map((s, i) => {
                const at = steps.findIndex((x) => x.id === step);
                const reachable = i < at;
                return (
                  <li
                    key={s.id}
                    aria-current={s.id === step ? "step" : undefined}
                    data-done={reachable ? "" : undefined}
                  >
                    {reachable ? (
                      <button type="button" onClick={() => setStep(s.id)}>
                        <span className="step-n">{i + 1}</span> {s.label}
                      </button>
                    ) : (
                      <span>
                        <span className="step-n">{i + 1}</span> {s.label}
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      </section>

      {step === "date" && (
        <section className="wrap book-step">
          <h2 ref={heading} tabIndex={-1}>
            Choose a performance
          </h2>
          {perfs.length === 0 ? (
            <div className="empty">
              <p>{p.title} has closed. Thank you to everyone who came.</p>
              <Link to="/season" className="btn btn-line">
                See what's on now
              </Link>
            </div>
          ) : (
            <>
              <div className="chips" role="group" aria-label="Show">
                {filters.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    className="chip"
                    aria-pressed={filter === f.id}
                    onClick={() => setFilter(f.id)}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
              {months.map((m) => (
                <div key={m} className="date-month">
                  <h3>{m}</h3>
                  <ul className="date-grid">
                    {shown
                      .filter(
                        (x) =>
                          monthOf.format(new Date(x.date + "T00:00:00")) === m,
                      )
                      .map((x) => {
                        const a = availability(x.soldPct);
                        return (
                          <li key={x.id}>
                            <button
                              type="button"
                              className="date-btn"
                              aria-pressed={perf?.id === x.id}
                              onClick={() => choose(x)}
                            >
                              <span className="db-date">
                                {weekDate(x.date)}
                              </span>
                              <span className="db-time num">
                                {clock(x.time)}
                              </span>
                              {(x.access || x.preview) && (
                                <span className="db-flag">
                                  {x.access ?? "Preview"}
                                </span>
                              )}
                              <span className="avail" data-level={a.level}>
                                {a.label}
                              </span>
                            </button>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              ))}
              {shown.length === 0 && (
                <p className="empty">
                  No performances of that kind are left in this run.
                </p>
              )}
            </>
          )}
        </section>
      )}

      {step === "seats" && perf && (
        <section className="wrap book-step seats-step">
          <div className="seats-main">
            <h2 ref={heading} tabIndex={-1}>
              Choose up to {maxSeats} seats
            </h2>
            <p className="seat-help">
              Click a seat, or use the arrow keys to move around the house and
              Enter to take it. Drag sideways on a phone.
            </p>
            <SeatMap
              production={p}
              perf={perf}
              selected={picks.map((k) => k.seat.id)}
              full={picks.length >= maxSeats}
              onToggle={toggle}
              onLook={setLook}
            />
            <ul className="legend" aria-label="Key">
              {(Object.keys(p.prices) as (keyof typeof p.prices)[]).map((z) => (
                <li key={z}>
                  <i className="seat" data-zone={z} aria-hidden="true" />
                  {zoneNames[z]}{" "}
                  <span className="num">{money(p.prices[z] ?? 0)}</span>
                </li>
              ))}
              <li>
                <i className="seat" data-sold="" aria-hidden="true" />
                Sold
              </li>
              <li>
                <i className="seat" data-picked="" aria-hidden="true" />
                Your seats
              </li>
            </ul>
          </div>
          <aside className="basket" aria-label="Your seats">
            <figure className="basket-view">
              <SightLine seat={view} label={viewLabel} />
              <figcaption>
                {viewLabel}
                {view && ` · ${zoneNames[view.zone]}`}
              </figcaption>
            </figure>
            <div className="basket-perf">
              <p>
                {weekDate(perf.date)}, {clock(perf.time)}
                {perf.access && ` · ${perf.access}`}
              </p>
              <button
                type="button"
                className="link-btn"
                onClick={() => setStep("date")}
              >
                Change date
              </button>
            </div>
            {picks.length === 0 ? (
              <p className="basket-empty">
                No seats yet. Pick any available seat on the plan.
              </p>
            ) : (
              <ul className="picks">
                {picks.map((k) => (
                  <li key={k.seat.id}>
                    <span className="pick-seat">
                      {k.seat.row}
                      {k.seat.number}
                      <small>
                        {k.seat.section} · {zoneNames[k.seat.zone]}
                      </small>
                    </span>
                    <label className="sr-only" htmlFor={`type-${k.seat.id}`}>
                      Ticket type for {k.seat.row}
                      {k.seat.number}
                    </label>
                    <select
                      id={`type-${k.seat.id}`}
                      value={k.type}
                      onChange={(e) =>
                        setPicks(
                          picks.map((x) =>
                            x.seat.id === k.seat.id
                              ? { ...x, type: e.target.value }
                              : x,
                          ),
                        )
                      }
                    >
                      {ticketTypes.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                    <span className="num pick-price">
                      {money(seatPrice(p, k.seat.zone, k.type))}
                    </span>
                    <button
                      type="button"
                      className="icon-btn"
                      aria-label={`Remove row ${k.seat.row} seat ${k.seat.number}`}
                      onClick={() => toggle(k.seat)}
                    >
                      <X aria-hidden="true" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <p className="basket-total">
              <span>{count}</span>
              <strong className="num">{money(total)}</strong>
            </p>
            <button
              type="button"
              className="btn btn-cream btn-block"
              disabled={!picks.length}
              onClick={() => setStep("details")}
            >
              Continue to your details
            </button>
            <p className="sr-only" aria-live="polite">
              {said}
            </p>
          </aside>
        </section>
      )}

      {step === "details" && perf && (
        <section className="wrap book-step details-step">
          <form
            noValidate
            onSubmit={submit}
            onChange={onChange}
            className="form"
            aria-busy={busy}
          >
            <h2 ref={heading} tabIndex={-1}>
              Your details
            </h2>
            <div className="form-row">
              <Field
                label="First name"
                name="first"
                required
                autoComplete="given-name"
                error={errors.first}
              />
              <Field
                label="Last name"
                name="last"
                required
                autoComplete="family-name"
                error={errors.last}
              />
            </div>
            <Field
              label="Email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              hint="Your e-tickets arrive here."
              error={errors.email}
            />
            <Field
              label="Phone (optional)"
              name="phone"
              type="tel"
              autoComplete="tel"
              pattern="[0-9 ()+\-]{10,}"
              hint="Only used if a performance is cancelled."
              error={errors.phone}
            />
            <Field
              label="Access requirements (optional)"
              name="access"
              hint="Tell us about wheelchair transfers, a companion seat, or anything else that helps."
            >
              <textarea rows={3} />
            </Field>
            <div
              className="field check"
              data-invalid={errors.terms ? "" : undefined}
            >
              <label>
                <input
                  type="checkbox"
                  name="terms"
                  required
                  aria-invalid={errors.terms ? true : undefined}
                  aria-describedby={errors.terms ? "f-terms-err" : undefined}
                />
                I've read the booking terms: latecomers are seated at a suitable
                break, and exchanges cost $4 a ticket.
              </label>
              {errors.terms && (
                <p className="field-error" id="f-terms-err">
                  {errors.terms}
                </p>
              )}
            </div>
            <button type="submit" className="btn btn-red" disabled={busy}>
              {busy
                ? "Confirming your seats…"
                : `Confirm booking · ${money(total)}`}
            </button>
            <p className="quiet">
              This is a demo: nothing is sent, held or charged.
            </p>
          </form>
          <aside className="order-card">
            <h2>Your booking</h2>
            <p>
              <strong>{p.title}</strong>
              <br />
              {longDate(perf.date)}, {clock(perf.time)}
              <br />
              {p.stage}, {brand.address[0]}
            </p>
            <ul className="picks picks-static">
              {picks.map((k) => (
                <li key={k.seat.id}>
                  <span>
                    {k.seat.section} {k.seat.row}
                    {k.seat.number} ·{" "}
                    {ticketTypes.find((t) => t.id === k.type)!.label}
                  </span>
                  <span className="num">
                    {money(seatPrice(p, k.seat.zone, k.type))}
                  </span>
                </li>
              ))}
            </ul>
            <p className="basket-total">
              <span>{count}</span>
              <strong className="num">{money(total)}</strong>
            </p>
            <button
              type="button"
              className="link-btn"
              onClick={() => setStep("seats")}
            >
              Change seats
            </button>
          </aside>
        </section>
      )}

      <div aria-live="polite">
        {step === "done" && perf && (
          <section className="wrap book-step done-step">
            <h2 ref={heading} tabIndex={-1}>
              <Check aria-hidden="true" /> You're booked.
            </h2>
            <p className="lede">
              Booking reference <strong className="num">{ref}</strong>. In a
              live site your e-tickets would be on their way; here, nothing has
              been sent or charged.
            </p>
            <ul className="tickets">
              {picks.map((k) => (
                <li key={k.seat.id} className="ticket">
                  <div className="ticket-main">
                    <span className="ticket-house">{brand.full}</span>
                    <strong className="ticket-title">{p.title}</strong>
                    <span>
                      {weekDate(perf.date)} · {clock(perf.time)} · {p.stage}
                    </span>
                  </div>
                  <div className="ticket-stub">
                    <span>{k.seat.section}</span>
                    <strong>
                      {k.seat.row}
                      {k.seat.number}
                    </strong>
                    <span className="num">
                      {money(seatPrice(p, k.seat.zone, k.type))}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="actions">
              <Link to="/visit" className="btn btn-red">
                Plan your visit
              </Link>
              <button type="button" className="btn btn-line" onClick={restart}>
                Book another performance
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
