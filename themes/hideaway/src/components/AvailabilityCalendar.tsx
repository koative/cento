import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { navigate } from "../router";
import { seasons, type Villa } from "../content";
import {
  addDays,
  fmtDay,
  fmtLong,
  fmtMonth,
  iso,
  mondayIndex,
  toDate,
  today,
} from "../lib/dates";
import {
  canArrive,
  checkStay,
  isBooked,
  isSaturdayRule,
  money,
  quoteFor,
  rateOn,
  seasonOf,
  setStay,
  useStay,
} from "../lib/stay";

const WEEKDAYS = [
  ["Mon", "Monday"],
  ["Tue", "Tuesday"],
  ["Wed", "Wednesday"],
  ["Thu", "Thursday"],
  ["Fri", "Friday"],
  ["Sat", "Saturday"],
  ["Sun", "Sunday"],
];
const MONTHS_AHEAD = 13;

function monthOf(offset: number) {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + offset, 1);
}

function offsetOf(day: string) {
  const now = new Date();
  const d = toDate(day);
  return (
    (d.getFullYear() - now.getFullYear()) * 12 + d.getMonth() - now.getMonth()
  );
}

function monthDays(first: Date) {
  const count = new Date(
    first.getFullYear(),
    first.getMonth() + 1,
    0,
  ).getDate();
  const days = Array.from({ length: count }, (_, i) =>
    iso(new Date(first.getFullYear(), first.getMonth(), i + 1)),
  );
  const cells: (string | null)[] = [
    ...Array(mondayIndex(days[0])).fill(null),
    ...days,
  ];
  while (cells.length % 7) cells.push(null);
  return {
    days,
    weeks: Array.from({ length: cells.length / 7 }, (_, i) =>
      cells.slice(i * 7, i * 7 + 7),
    ),
  };
}

export function AvailabilityCalendar({ villa }: { villa: Villa }) {
  const stay = useStay();
  const mine = stay.villa === villa.slug;
  const first = today();
  const [arrival, setArrival] = useState(mine ? stay.arrival : "");
  const [departure, setDeparture] = useState(mine ? stay.departure : "");
  const [hover, setHover] = useState("");
  const [adults, setAdults] = useState(Math.min(stay.adults, villa.sleeps));
  const [children, setChildren] = useState(
    Math.min(stay.children, villa.sleeps - Math.min(stay.adults, villa.sleeps)),
  );
  const [offset, setOffset] = useState(() =>
    Math.max(0, Math.min(MONTHS_AHEAD - 2, arrival ? offsetOf(arrival) : 0)),
  );
  const [focusDay, setFocusDay] = useState(arrival || first);
  const [message, setMessage] = useState("");
  const root = useRef<HTMLDivElement>(null);
  const keyed = useRef(false);

  const months = [monthOf(offset), monthOf(offset + 1)].map(monthDays);
  const visible = months.flatMap((m) => m.days);
  const tabbable =
    visible.includes(focusDay) && focusDay >= first
      ? focusDay
      : (visible.find((d) => d >= first) ?? visible[0]);
  const choosingDeparture = !!arrival && !departure;
  const end = departure || (choosingDeparture && hover > arrival ? hover : "");

  useEffect(() => {
    if (!keyed.current) return;
    keyed.current = false;
    root.current
      ?.querySelector<HTMLButtonElement>(`[data-date="${focusDay}"]`)
      ?.focus();
  }, [focusDay, offset]);

  function pick(day: string) {
    setFocusDay(day);
    if (day < first)
      return setMessage(
        "That day has passed. Choose a date from today onwards.",
      );
    if (choosingDeparture && day > arrival) {
      const problem = checkStay(villa, arrival, day);
      if (problem) return setMessage(problem);
      setDeparture(day);
      const q = quoteFor(villa, arrival, day, adults);
      return setMessage(
        `${q.nights} nights, ${fmtDay(arrival)} to ${fmtDay(day)}: ${money(q.total)} in total.`,
      );
    }
    if (!canArrive(villa, day)) {
      if (isBooked(villa, day))
        return setMessage(
          `${villa.name} is booked on the night of ${fmtDay(day)}. Choose another arrival.`,
        );
      return setMessage(
        `In July and August stays at ${villa.name} start on a Saturday. Choose a Saturday arrival.`,
      );
    }
    setArrival(day);
    setDeparture("");
    setMessage(
      `Arriving ${fmtLong(day)}. Now choose your departure. ${seasons[seasonOf(day)].note}`,
    );
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const target = e.target as HTMLElement;
    const day = target.dataset.date;
    if (!day) return;
    const steps: Record<string, number> = {
      ArrowLeft: -1,
      ArrowRight: 1,
      ArrowUp: -7,
      ArrowDown: 7,
      Home: -mondayIndex(day),
      End: 6 - mondayIndex(day),
    };
    let next: string | undefined;
    if (e.key in steps) next = addDays(day, steps[e.key]);
    else if (e.key === "PageUp" || e.key === "PageDown") {
      const d = toDate(day);
      next = iso(
        new Date(
          d.getFullYear(),
          d.getMonth() + (e.key === "PageUp" ? -1 : 1),
          Math.min(d.getDate(), 28),
        ),
      );
    }
    if (!next) return;
    e.preventDefault();
    const o = offsetOf(next);
    if (o < 0 || o >= MONTHS_AHEAD) return;
    if (o < offset) setOffset(o);
    else if (o > offset + 1) setOffset(o - 1);
    keyed.current = true;
    setFocusDay(next);
  }

  function clear() {
    setArrival("");
    setDeparture("");
    setMessage("Dates cleared. Choose an arrival day.");
  }

  function reserve() {
    setStay({ villa: villa.slug, arrival, departure, adults, children });
    navigate("/book");
  }

  const quote =
    arrival && departure ? quoteFor(villa, arrival, departure, adults) : null;

  return (
    <div className="calendar" ref={root}>
      <div className="cal-board">
        <div className="cal-nav">
          <button
            type="button"
            className="icon-btn"
            onClick={() => setOffset((o) => o - 1)}
            disabled={offset === 0}
            aria-label="Previous month"
          >
            <ChevronLeft aria-hidden="true" />
          </button>
          <p className="cal-range" aria-live="polite">
            {fmtMonth(visible[0])} – {fmtMonth(months[1].days[0])}
          </p>
          <button
            type="button"
            className="icon-btn"
            onClick={() => setOffset((o) => o + 1)}
            disabled={offset >= MONTHS_AHEAD - 2}
            aria-label="Next month"
          >
            <ChevronRight aria-hidden="true" />
          </button>
        </div>

        <div
          className="cal-months"
          onKeyDown={onKeyDown}
          onPointerLeave={() => setHover("")}
        >
          {months.map(({ days, weeks }) => {
            const id = `cal-${days[0]}`;
            return (
              <table
                key={id}
                className="cal-month"
                role="grid"
                aria-labelledby={id}
              >
                <caption id={id}>{fmtMonth(days[0])}</caption>
                <thead>
                  <tr>
                    {WEEKDAYS.map(([s, l]) => (
                      <th key={s} scope="col" abbr={l}>
                        {s}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {weeks.map((week, w) => (
                    <tr key={w}>
                      {week.map((day, i) => {
                        if (!day) return <td key={i} />;
                        const past = day < first;
                        const booked = isBooked(villa, day);
                        const isStart = day === arrival;
                        const isEnd = day === departure;
                        const inRange =
                          !!arrival && !!end && day > arrival && day < end;
                        const departOk =
                          choosingDeparture &&
                          day > arrival &&
                          checkStay(villa, arrival, day) === null;
                        const satOnly =
                          !past &&
                          !booked &&
                          isSaturdayRule(day) &&
                          toDate(day).getDay() !== 6;
                        const unavailable = past || (booked && !departOk);
                        const state = isStart
                          ? "your arrival"
                          : isEnd
                            ? "your departure"
                            : past
                              ? "past"
                              : departOk
                                ? `available to leave, ${money(rateOn(villa, day))} a night`
                                : booked
                                  ? "booked"
                                  : satOnly
                                    ? "Saturday arrivals only"
                                    : `available, ${money(rateOn(villa, day))} a night`;
                        return (
                          <td key={day}>
                            <button
                              type="button"
                              className="cal-day"
                              data-date={day}
                              data-past={past ? "" : undefined}
                              data-booked={booked ? "" : undefined}
                              data-start={isStart ? "" : undefined}
                              data-end={isEnd ? "" : undefined}
                              data-range={inRange ? "" : undefined}
                              data-ok={departOk ? "" : undefined}
                              data-sat={satOnly ? "" : undefined}
                              aria-disabled={unavailable || undefined}
                              aria-pressed={isStart || isEnd}
                              aria-label={`${fmtLong(day)}, ${state}`}
                              tabIndex={day === tabbable ? 0 : -1}
                              onClick={() => pick(day)}
                              onPointerEnter={() => setHover(day)}
                            >
                              <span className="cal-num">
                                {toDate(day).getDate()}
                              </span>
                              {!past && !booked && (
                                <span className="cal-rate">
                                  {money(rateOn(villa, day))}
                                </span>
                              )}
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            );
          })}
        </div>

        <ul className="cal-legend">
          <li>
            <span className="swatch swatch-free" aria-hidden="true" /> Free,
            nightly rate below
          </li>
          <li>
            <span className="swatch swatch-booked" aria-hidden="true" /> Booked
          </li>
          <li>
            <span className="swatch swatch-stay" aria-hidden="true" /> Your stay
          </li>
          <li>
            <span className="swatch swatch-sat" aria-hidden="true" /> July &
            August: Saturday to Saturday
          </li>
        </ul>
        <p className="cal-status" aria-live="polite">
          {message}
        </p>
      </div>

      <aside className="quote" aria-label="Your stay">
        <h3>Your stay at {villa.name}</h3>
        <dl className="quote-dates">
          <div>
            <dt>Arrive</dt>
            <dd>
              {arrival
                ? fmtDay(arrival, {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : "Choose a day"}
            </dd>
          </div>
          <div>
            <dt>Leave</dt>
            <dd>
              {departure
                ? fmtDay(departure, {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : arrival
                  ? "Choose a day"
                  : "—"}
            </dd>
          </div>
        </dl>
        <div className="quote-guests">
          <label>
            Adults
            <select
              value={adults}
              onChange={(e) => {
                const a = Number(e.target.value);
                setAdults(a);
                setChildren((c) => Math.min(c, villa.sleeps - a));
              }}
            >
              {Array.from({ length: villa.sleeps }, (_, i) => (
                <option key={i}>{i + 1}</option>
              ))}
            </select>
          </label>
          <label>
            Children
            <select
              value={children}
              onChange={(e) => setChildren(Number(e.target.value))}
            >
              {Array.from({ length: villa.sleeps - adults + 1 }, (_, i) => (
                <option key={i}>{i}</option>
              ))}
            </select>
          </label>
        </div>

        {quote ? (
          <>
            <table className="quote-lines">
              <tbody>
                {quote.lines.map((l) => (
                  <tr key={l.season}>
                    <th scope="row">
                      {l.nights} {l.nights === 1 ? "night" : "nights"} ·{" "}
                      {seasons[l.season].label.toLowerCase()} at {money(l.rate)}
                    </th>
                    <td>{money(l.nights * l.rate)}</td>
                  </tr>
                ))}
                <tr>
                  <th scope="row">Final clean and linen</th>
                  <td>{money(quote.cleaning)}</td>
                </tr>
                <tr>
                  <th scope="row">
                    Tourist tax · {adults} {adults === 1 ? "adult" : "adults"}
                  </th>
                  <td>{money(quote.tax)}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th scope="row">Total</th>
                  <td>{money(quote.total)}</td>
                </tr>
              </tfoot>
            </table>
            <p className="quote-note">
              {money(quote.deposit)} today to hold the dates, the rest eight
              weeks before you arrive.
            </p>
            <div className="quote-actions">
              <button
                type="button"
                className="btn btn-primary"
                onClick={reserve}
              >
                Reserve these dates
              </button>
              <button type="button" className="btn btn-link" onClick={clear}>
                Clear dates
              </button>
            </div>
          </>
        ) : (
          <p className="quote-note">
            {arrival
              ? `Now pick the day you leave. ${seasons[seasonOf(arrival)].note}`
              : "Pick the day you arrive on the calendar. Prices are per house, per night, and change with the season."}
          </p>
        )}
      </aside>
    </div>
  );
}
