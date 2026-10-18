import { Link } from "../router";
import { locations, type CommonsEvent } from "../content";
import { clock, money, parseDate } from "../lib";

export function EventRow({ event }: { event: CommonsEvent }) {
  const d = parseDate(event.date);
  const place = locations.find((l) => l.id === event.locationId);
  const left = event.capacity - event.taken;
  return (
    <li className="event-row">
      <time className="event-date" dateTime={event.date}>
        <span>{d.toLocaleDateString("en-US", { month: "short" })}</span>
        <strong>{d.getDate()}</strong>
        <span>{d.toLocaleDateString("en-US", { weekday: "short" })}</span>
      </time>
      <div className="event-main">
        <h3 className="event-title">
          <Link to={`/events/${event.id}`}>{event.title}</Link>
        </h3>
        <p className="event-meta">
          <span className="tag" data-kind={event.kind}>
            {event.kind}
          </span>
          {place?.name} · {clock(event.start)} – {clock(event.end)}
        </p>
        <p className="event-summary">{event.summary}</p>
      </div>
      <p className="event-side">
        <strong>{event.price ? `${money(event.price)} guests` : "Free"}</strong>
        <span>
          {left < 10
            ? `${left} places left`
            : `${left} of ${event.capacity} places`}
        </span>
      </p>
    </li>
  );
}
