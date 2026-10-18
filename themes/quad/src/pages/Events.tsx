import { useState } from "react";
import { events, eventTypes, type EventType } from "../content";
import { EventRow } from "../components/EventRow";

const monthKey = (iso: string) => iso.slice(0, 7);
const monthLabel = (key: string) =>
  new Date(key + "-15").toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });

export function Events() {
  const [type, setType] = useState<EventType | "all">("all");
  const [month, setMonth] = useState("all");
  const months = [...new Set(events.map((e) => monthKey(e.date)))];

  const list = events.filter(
    (e) =>
      (type === "all" || e.type === type) &&
      (month === "all" || monthKey(e.date) === month),
  );
  const groups = months
    .map((m) => ({ m, items: list.filter((e) => monthKey(e.date) === m) }))
    .filter((g) => g.items.length);

  return (
    <>
      <header className="page-head wrap">
        <h1>Events & open days</h1>
        <p className="lead">
          Open days, free public lectures, concerts and exhibitions across the
          campus. Everything is open to the public unless it says otherwise.
        </p>
      </header>

      <div className="wrap">
        <div className="ev-controls">
          <div className="chips" role="group" aria-label="Event type">
            {(["all", ...eventTypes] as const).map((t) => (
              <button
                key={t}
                type="button"
                className="chip"
                aria-pressed={type === t}
                onClick={() => setType(t)}
              >
                {t === "all" ? "Everything" : t}
              </button>
            ))}
          </div>
          <div className="field field-inline">
            <label htmlFor="ev-month">Month</label>
            <select
              id="ev-month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            >
              <option value="all">All months</option>
              {months.map((m) => (
                <option key={m} value={m}>
                  {monthLabel(m)}
                </option>
              ))}
            </select>
          </div>
        </div>
        <p className="results-count small" aria-live="polite">
          {list.length === 1 ? "1 event" : `${list.length} events`}
        </p>

        {groups.length ? (
          groups.map((g) => (
            <section
              key={g.m}
              className="ev-group"
              aria-labelledby={`m-${g.m}`}
            >
              <h2 id={`m-${g.m}`}>{monthLabel(g.m)}</h2>
              <ul className="ev-list">
                {g.items.map((e) => (
                  <EventRow key={e.id} e={e} />
                ))}
              </ul>
            </section>
          ))
        ) : (
          <div className="empty">
            <p>
              Nothing of that kind in that month. Try another month, or see
              everything coming up.
            </p>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => {
                setType("all");
                setMonth("all");
              }}
            >
              Show all events
            </button>
          </div>
        )}
      </div>
    </>
  );
}
