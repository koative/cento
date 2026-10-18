import { Link } from "../router";
import type { UniEvent } from "../content";
import { dateParts } from "../lib/format";

/** A calendar line: torn-off date block, title, time and place. */
export function EventRow({ e }: { e: UniEvent }) {
  const d = dateParts(e.date);
  return (
    <li className="ev-row">
      <Link to={`/events/${e.id}`}>
        <time className="ev-date" dateTime={e.date}>
          <span className="ev-day">{d.day}</span>
          <span className="ev-month">
            {d.month} {d.year}
          </span>
        </time>
        <span className="ev-main">
          <span className="ev-title">{e.title}</span>
          <span className="ev-where">
            <strong>{e.type}</strong> · {d.weekday} · {e.time} · {e.venue}
          </span>
        </span>
        <span className="ev-price">{e.price ? `£${e.price}` : "Free"}</span>
      </Link>
    </li>
  );
}
