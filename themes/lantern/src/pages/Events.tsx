import { useState } from "react";
import { eventKinds, events, pagesCopy, type EventKind } from "../content";
import { formatDate } from "../lib/format";
import { EventList } from "../components/EventList";

export function Events() {
  const [kind, setKind] = useState<EventKind | "all">("all");
  const copy = pagesCopy.events;
  const shown = events.filter((e) => kind === "all" || e.kind === kind);
  const months = [...new Set(shown.map((e) => e.date.slice(0, 7)))];

  return (
    <>
      <header className="page-head wrap">
        <h1>{copy.title}</h1>
        <p>{copy.text}</p>
      </header>
      <section className="wrap" aria-label="Event listings">
        <div className="chips" role="group" aria-label="Filter by type">
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
        <p className="result-count" aria-live="polite">
          {shown.length === 1 ? "1 event" : `${shown.length} events`}
        </p>
        {months.map((m) => (
          <div key={m} className="month-group">
            <h2>{formatDate(m + "-01", { month: "long", year: "numeric" })}</h2>
            <EventList items={shown.filter((e) => e.date.startsWith(m))} />
          </div>
        ))}
      </section>
      <section className="section wrap host">
        <h2>{copy.hostTitle}</h2>
        <p>
          {copy.hostText}{" "}
          <a href={"mailto:" + copy.hostEmail}>{copy.hostEmail}</a>
        </p>
      </section>
    </>
  );
}
