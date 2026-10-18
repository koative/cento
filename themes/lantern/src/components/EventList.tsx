import { Link } from "../router";
import type { LanternEvent } from "../content";
import { formatDate } from "../lib/format";
import { rsvps } from "../lib/giving";

export function placesLeft(e: LanternEvent, held: Record<string, number>) {
  return Math.max(e.capacity - e.booked - (held[e.id] ?? 0), 0);
}

export function EventList({ items }: { items: LanternEvent[] }) {
  const held = rsvps.use();
  return (
    <ul className="event-list">
      {items.map((e) => {
        const left = placesLeft(e, held);
        return (
          <li key={e.id} className="event-row">
            <p className="event-date" aria-hidden="true">
              <span>{formatDate(e.date, { month: "short" })}</span>
              <strong>{formatDate(e.date, { day: "numeric" })}</strong>
              <span>{formatDate(e.date, { weekday: "short" })}</span>
            </p>
            <div className="event-main">
              <h3>
                <Link to={`/events/${e.id}`}>{e.title}</Link>
              </h3>
              <p className="event-when">
                <span className="visually-hidden">
                  {formatDate(e.date, {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })}
                  ,{" "}
                </span>
                {e.time} · {e.place}
              </p>
              <p className="event-summary">{e.summary}</p>
            </div>
            <p className="event-side">
              <span className="pill">{e.kind}</span>
              <span className={left ? "places" : "places places-full"}>
                {left
                  ? `${left.toLocaleString("en-US")} places left`
                  : "Full, waiting list open"}
              </span>
            </p>
          </li>
        );
      })}
    </ul>
  );
}
