import { useState } from "react";
import { events, eventTypes, type EventType } from "../content";
import { parseDay } from "../lib/util";
import { EventRow } from "../components/Tiles";

export function Events() {
  const [type, setType] = useState<EventType | "all">("all");
  const [free, setFree] = useState(false);
  const list = events.filter(
    (e) => (type === "all" || e.type === type) && (!free || e.price === 0),
  );

  const months = list.reduce<{ label: string; items: typeof list }[]>(
    (acc, e) => {
      const label = parseDay(e.date).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
      const last = acc.at(-1);
      if (last?.label === label) last.items.push(e);
      else acc.push({ label, items: [e] });
      return acc;
    },
    [],
  );

  return (
    <>
      <header className="page-head wrap">
        <h1>What's on</h1>
        <p className="lede">
          Trivia every Tuesday, run club every Thursday, and something louder
          most weekends. Everything is walk-in unless it says otherwise;
          ticketed nights sell at the bar and by email.
        </p>
      </header>

      <div className="wrap page-end">
        <div className="filters" role="search" aria-label="Filter events">
          <fieldset className="chips">
            <legend className="sr-only">Event type</legend>
            {[{ id: "all" as const, label: "Everything" }, ...eventTypes].map(
              (t) => (
                <label key={t.id} className="chip">
                  <input
                    type="radio"
                    name="event-type"
                    checked={type === t.id}
                    onChange={() => setType(t.id)}
                  />
                  <span>{t.label}</span>
                </label>
              ),
            )}
          </fieldset>
          <div className="filter-row">
            <label className="check">
              <input
                type="checkbox"
                checked={free}
                onChange={(e) => setFree(e.target.checked)}
              />
              Free entry only
            </label>
          </div>
        </div>
        <p className="result-count" aria-live="polite">
          {list.length} {list.length === 1 ? "event" : "events"}
        </p>

        {months.length ? (
          months.map((m) => (
            <section
              key={m.label}
              className="month"
              aria-labelledby={`m-${m.label.replace(" ", "-")}`}
            >
              <h2 id={`m-${m.label.replace(" ", "-")}`} className="month-title">
                {m.label}
              </h2>
              <div className="event-list">
                {m.items.map((e) => (
                  <EventRow key={e.id} event={e} />
                ))}
              </div>
            </section>
          ))
        ) : (
          <div className="empty">
            <h2>Nothing like that on the calendar yet.</h2>
            <p>
              Pick another type, or sign up to The Brew Sheet below to hear
              about new dates first.
            </p>
            <button
              type="button"
              className="btn btn-ink"
              onClick={() => (setType("all"), setFree(false))}
            >
              Show everything
            </button>
          </div>
        )}
      </div>
    </>
  );
}
