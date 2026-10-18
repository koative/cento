import { useRef, useState, type KeyboardEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { addDays, fromIso, longDate, monthLabel, today } from "../lib/stay";

type Props = {
  checkIn: string | null;
  checkOut: string | null;
  /** Rate to print under a day, or null when nothing is free that night. */
  priceOf: (d: string) => number | null;
  enabled: (d: string) => boolean;
  onPick: (d: string) => void;
};

const weekdays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

function monthStart(s: string) {
  return s.slice(0, 8) + "01";
}

function shiftMonth(s: string, n: number) {
  const d = fromIso(s);
  d.setUTCMonth(d.getUTCMonth() + n);
  return d.toISOString().slice(0, 10);
}

function monthDays(first: string) {
  const offset = (fromIso(first).getUTCDay() + 6) % 7;
  const days: (string | null)[] = Array(offset).fill(null);
  for (let d = first; d.slice(0, 7) === first.slice(0, 7); d = addDays(d, 1))
    days.push(d);
  return days;
}

export function Calendar({
  checkIn,
  checkOut,
  priceOf,
  enabled,
  onPick,
}: Props) {
  const now = today();
  const [first, setFirst] = useState(monthStart(checkIn ?? now));
  const [focus, setFocus] = useState(checkIn ?? now);
  const grid = useRef<HTMLDivElement>(null);
  const months = [first, shiftMonth(first, 1)];
  const canGoBack = first > monthStart(now);
  const visible = months.some((m) => m.slice(0, 7) === focus.slice(0, 7));
  const tabDate = visible ? focus : first < now ? now : first;

  function move(e: KeyboardEvent<HTMLDivElement>) {
    const step = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }[
      e.key
    ];
    if (!step) return;
    e.preventDefault();
    const next = addDays(tabDate, step);
    if (next < now) return;
    if (next.slice(0, 7) > months[1].slice(0, 7))
      setFirst(shiftMonth(first, 1));
    if (next.slice(0, 7) < first.slice(0, 7)) setFirst(shiftMonth(first, -1));
    setFocus(next);
    requestAnimationFrame(() =>
      grid.current
        ?.querySelector<HTMLButtonElement>(`[data-date="${next}"]`)
        ?.focus(),
    );
  }

  return (
    <div className="calendar">
      <div className="calendar-nav">
        <button
          type="button"
          className="icon-btn"
          onClick={() => setFirst(shiftMonth(first, -1))}
          disabled={!canGoBack}
          aria-label="Previous month"
        >
          <ChevronLeft aria-hidden="true" />
        </button>
        <button
          type="button"
          className="icon-btn"
          onClick={() => setFirst(shiftMonth(first, 1))}
          aria-label="Next month"
        >
          <ChevronRight aria-hidden="true" />
        </button>
      </div>
      <div className="calendar-months" ref={grid} onKeyDown={move}>
        {months.map((m) => (
          <div key={m} className="month">
            <h3 className="month-name">{monthLabel(m)}</h3>
            <div className="month-grid" role="group" aria-label={monthLabel(m)}>
              {weekdays.map((w) => (
                <span key={w} className="weekday" aria-hidden="true">
                  {w}
                </span>
              ))}
              {monthDays(m).map((d, i) => {
                if (!d) return <span key={`x${i}`} aria-hidden="true" />;
                const price = d >= now ? priceOf(d) : null;
                const on = enabled(d);
                const edge = d === checkIn || d === checkOut;
                const inRange =
                  !!checkIn && !!checkOut && d > checkIn && d < checkOut;
                const label = `${longDate(d)}${d === checkIn ? ", arrival" : d === checkOut ? ", departure" : ""}${price ? `, from CHF ${price}` : ", no rooms"}`;
                return (
                  <button
                    key={d}
                    type="button"
                    className="day"
                    data-date={d}
                    data-edge={edge ? "" : undefined}
                    data-range={inRange ? "" : undefined}
                    data-past={d < now ? "" : undefined}
                    aria-disabled={!on}
                    aria-pressed={edge}
                    aria-label={label}
                    tabIndex={d === tabDate ? 0 : -1}
                    onFocus={() => setFocus(d)}
                    onClick={() => on && onPick(d)}
                  >
                    <span className="day-num num">{Number(d.slice(8))}</span>
                    <span className="day-price num" aria-hidden="true">
                      {price ?? "–"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
