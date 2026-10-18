import { useState } from "react";
import { eventKinds, events, eventsPage, type EventKind } from "../content";
import { toDate } from "../lib/format";
import { EventRow } from "../components/Cards";

export function Events() {
  const [kind, setKind] = useState<EventKind | "all">("all");
  const shown = events.filter((e) => kind === "all" || e.kind === kind);
  const months = [...new Set(shown.map((e) => e.date.slice(0, 7)))];

  return (
    <>
      <header className="page-head wrap">
        <h1>Events</h1>
        <p className="lede">{eventsPage.intro}</p>
      </header>

      <div className="wrap">
        <div className="filters">
          <div className="chips" role="group" aria-label="Type of event">
            {(["all", ...eventKinds] as const).map((k) => (
              <button
                key={k}
                type="button"
                className="chip"
                aria-pressed={kind === k}
                onClick={() => setKind(k)}
              >
                {k === "all"
                  ? "Everything"
                  : k === "Live"
                    ? "Live music"
                    : `${k}s`}
              </button>
            ))}
          </div>
          <p className="filter-count" aria-live="polite">
            {shown.length} {shown.length === 1 ? "event" : "events"} coming up
          </p>
        </div>

        {months.map((m) => (
          <section key={m} className="month" aria-labelledby={`m-${m}`}>
            <h2 id={`m-${m}`} className="month-title">
              {toDate(`${m}-01`).toLocaleDateString("en-GB", {
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
          </section>
        ))}
      </div>

      <section className="section section-walnut">
        <div className="wrap split split-text">
          <div>
            <h2>{eventsPage.weekTitle}</h2>
            <p className="lede">{eventsPage.weekText}</p>
          </div>
          <dl className="spec-list">
            {eventsPage.week.map((w) => (
              <div key={w.day}>
                <dt>{w.day}</dt>
                <dd>{w.what}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
