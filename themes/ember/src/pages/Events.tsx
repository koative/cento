import { useState } from "react";
import { events, eventsPage, photos, type Event } from "../content";
import { EventRow } from "../components/EventRow";
import { Photo } from "../components/Photo";

const kinds: Event["kind"][] = ["Supper club", "Class", "Tasting", "Music"];

export function Events() {
  const [kind, setKind] = useState<Event["kind"] | "All">("All");
  const shown = events.filter((e) => kind === "All" || e.kind === kind);

  return (
    <div className="events-page">
      <header className="page-head wrap page-head-split">
        <div>
          <h1>{eventsPage.title}</h1>
          <p className="lede">{eventsPage.intro}</p>
        </div>
        <Photo photo={photos.firewood} className="arch head-img" eager />
      </header>

      <div className="wrap">
        <div className="chips" role="group" aria-label="Filter events">
          {(["All", ...kinds] as const).map((k) => (
            <button
              key={k}
              type="button"
              className="chip"
              aria-pressed={kind === k}
              onClick={() => setKind(k)}
            >
              {k}
            </button>
          ))}
        </div>
        <p className="result-count" aria-live="polite">
          {shown.length} {shown.length === 1 ? "event" : "events"} this season
        </p>
        <ul className="event-list">
          {shown.map((e) => (
            <EventRow key={e.id} event={e} />
          ))}
        </ul>
      </div>
    </div>
  );
}
