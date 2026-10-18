import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import type { Event } from "../content";
import { clock, money, shortDate } from "../lib/time";

export const priceLabel = (e: Event) =>
  e.price ? `${money(e.price)} a seat` : "Free with a table";

export function EventRow({ event }: { event: Event }) {
  const d = shortDate(event.date);
  return (
    <li className="event-row">
      <p className="event-date" aria-hidden="true">
        <span>{d.dow}</span>
        <strong className="num">{d.date}</strong>
        <span>{d.month}</span>
      </p>
      <div className="event-main">
        <h3>
          <Link to={`/events/${event.id}`}>{event.title}</Link>
        </h3>
        <p className="event-meta">
          <span className="sr-only">
            {d.dow} {d.month} {d.date},{" "}
          </span>
          {event.kind} · {clock(event.start)} · {priceLabel(event)}
        </p>
        <p>{event.summary}</p>
      </div>
      <p className="event-seats" data-full={event.left ? undefined : ""}>
        {event.left
          ? `${event.left} of ${event.seats} seats left`
          : "Waiting list"}
        <ArrowRight aria-hidden="true" />
      </p>
    </li>
  );
}
