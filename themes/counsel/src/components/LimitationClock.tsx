import { useId, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { limitations } from "../content";
import {
  addPeriod,
  areaBySlug,
  daysBetween,
  fromISO,
  longDate,
  shortDate,
  toISO,
  today,
} from "../lib/util";

/**
 * The signature tool: pick what happened and when, and see the illustrative limitation
 * period drawn as a ruled timeline with today marked on it.
 */
export function LimitationClock({ area }: { area?: string }) {
  const options = area
    ? limitations.filter((l) => l.area === area)
    : limitations;
  const uid = useId();
  const now = today();
  const [id, setId] = useState(options[0].id);
  const [date, setDate] = useState(() => {
    const d = new Date(now);
    d.setMonth(d.getMonth() - 14);
    return toISO(d);
  });

  const period = options.find((o) => o.id === id) ?? options[0];
  const start = date ? fromISO(date) : now;
  const end = addPeriod(start, period.amount, period.unit);
  const total = Math.max(1, daysBetween(start, end));
  const left = daysBetween(now, end);
  const elapsed = Math.min(1, Math.max(0, daysBetween(start, now) / total));
  const state = left < 0 ? "lapsed" : left / total <= 0.25 ? "close" : "open";
  const future = start > now;

  // One tick per year, month or (for day-counted periods) per 30 days; skipped when they would crowd.
  const tickCount =
    period.unit === "days" ? Math.floor(period.amount / 30) : period.amount;
  const ticks =
    tickCount > 1 && tickCount <= 24
      ? Array.from({ length: tickCount - 1 }, (_, i) => (i + 1) / tickCount)
      : [];
  const unitLabel =
    period.amount === 1 ? period.unit.slice(0, -1) : period.unit;

  return (
    <div className="clock" data-state={state}>
      <div className="clock-controls">
        {options.length > 1 ? (
          <div className="field">
            <label htmlFor={uid + "-what"}>What happened?</label>
            <select
              id={uid + "-what"}
              value={id}
              onChange={(e) => setId(e.target.value)}
            >
              {options.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <p className="clock-single">{period.label}</p>
        )}
        <div className="field">
          <label htmlFor={uid + "-when"}>Date of {period.from}</label>
          <input
            id={uid + "-when"}
            type="date"
            value={date}
            max={toISO(now)}
            required
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>

      <div className="clock-result" aria-live="polite">
        <p className="clock-figure">
          {future ? (
            "Choose a date in the past"
          ) : state === "lapsed" ? (
            <>
              Ended{" "}
              <span className="num">
                {Math.abs(left).toLocaleString("en-US")}
              </span>{" "}
              days ago
            </>
          ) : (
            <>
              <span className="num">{left.toLocaleString("en-US")}</span>{" "}
              {left === 1 ? "day" : "days"} left
            </>
          )}
        </p>
        <p className="clock-deadline">
          {period.amount} {unitLabel} from {period.from} runs to{" "}
          <strong>{longDate(toISO(end))}</strong>. {period.note}
        </p>
      </div>

      <div className="clock-line" aria-hidden="true">
        <div className="clock-track">
          {ticks.map((t) => (
            <span
              key={t}
              className="clock-tick"
              style={{ left: `${t * 100}%` }}
            />
          ))}
          <span className="clock-fill" style={{ width: `${elapsed * 100}%` }} />
          {!future && state !== "lapsed" && (
            <span className="clock-today" style={{ left: `${elapsed * 100}%` }}>
              Today
            </span>
          )}
        </div>
        <div className="clock-ends">
          <span>{shortDate(toISO(start))}</span>
          <span>{shortDate(toISO(end))}</span>
        </div>
      </div>

      <div className="clock-foot">
        <Link
          to={
            `/enquiry?area=${period.area}` +
            (state === "lapsed" || future ? "" : `&date=${toISO(end)}`)
          }
          className="btn btn-seal"
        >
          {state === "lapsed"
            ? "Ask us about exceptions"
            : `Enquire about ${areaBySlug(period.area)?.name.toLowerCase()}`}
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
        <p>
          Illustrative periods for a fictional jurisdiction. Real deadlines turn
          on facts we would need to hear, so treat this as a prompt to call, not
          as advice.
        </p>
      </div>
    </div>
  );
}
