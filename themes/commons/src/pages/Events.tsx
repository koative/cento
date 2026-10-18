import { useState } from "react";
import { eventKinds, events, locations, type EventKind } from "../content";
import { parseDate } from "../lib";
import { EventRow } from "../components/EventRow";

export function Events() {
  const [kind, setKind] = useState<EventKind | "all">("all");
  const [house, setHouse] = useState("all");
  const shown = events.filter(
    (e) =>
      (kind === "all" || e.kind === kind) &&
      (house === "all" || e.locationId === house),
  );
  const months = [...new Set(shown.map((e) => e.date.slice(0, 7)))];

  return (
    <>
      <header className="page-head wrap">
        <h1>Events</h1>
        <p className="lede">
          Suppers, short talks, clinics and quiet mornings across all four
          houses. Members come free unless it says otherwise; guests are welcome
          at most things.
        </p>
      </header>

      <section className="wrap" aria-label="Event calendar">
        <div className="filter-bar">
          <div className="chips" role="group" aria-label="Type of event">
            {(["all", ...eventKinds] as const).map((k) => (
              <button
                key={k}
                type="button"
                className="chip"
                aria-pressed={kind === k}
                onClick={() => setKind(k)}
              >
                {k === "all" ? "Everything" : k}
              </button>
            ))}
          </div>
          <div className="field field-inline">
            <label htmlFor="house-filter">House</label>
            <select
              id="house-filter"
              value={house}
              onChange={(e) => setHouse(e.target.value)}
            >
              <option value="all">All four houses</option>
              {locations.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.name}
                </option>
              ))}
            </select>
          </div>
          <p className="filter-count" aria-live="polite">
            {shown.length} {shown.length === 1 ? "event" : "events"}
          </p>
        </div>

        {months.length ? (
          months.map((m) => (
            <div key={m} className="month">
              <h2 className="month-title">
                {parseDate(`${m}-01`).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </h2>
              <ul className="event-list">
                {shown
                  .filter((e) => e.date.startsWith(m))
                  .map((e) => (
                    <EventRow key={e.id} event={e} />
                  ))}
              </ul>
            </div>
          ))
        ) : (
          <div className="empty">
            <p>
              Nothing of that kind at that house this season. Try another house,
              or suggest one: members run half our calendar.
            </p>
            <button
              type="button"
              className="btn btn-quiet"
              onClick={() => (setKind("all"), setHouse("all"))}
            >
              Show everything
            </button>
          </div>
        )}
      </section>
    </>
  );
}
