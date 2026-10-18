import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { events, eventTypes, type EventType, type ShopEvent } from "../content";
import { Link } from "../router";
import { day, money, monthYear } from "../lib/format";

export function EventRow({ event }: { event: ShopEvent }) {
  const d = day(event.date);
  const left = event.seats - event.taken;
  return (
    <li className="event-row">
      <p className="event-date" aria-hidden="true">
        <span>{d.toLocaleDateString("en-US", { month: "short" })}</span>
        <strong>{d.getDate()}</strong>
        <span>{d.toLocaleDateString("en-US", { weekday: "short" })}</span>
      </p>
      <div className="event-main">
        <h3>
          <Link to={`/events/${event.slug}`}>{event.title}</Link>
        </h3>
        <p>{event.summary}</p>
      </div>
      <p className="event-meta">
        <span className="visually-hidden">
          {d.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
          ,{" "}
        </span>
        <span className="event-type">{event.type}</span>
        <br />
        {event.start}–{event.end} · {event.room}
        <br />
        {event.price ? money(event.price) : "Free"} ·{" "}
        {left <= 5 ? <strong>{left} seats left</strong> : `${left} seats left`}
      </p>
    </li>
  );
}

export function Events() {
  const [type, setType] = useState<EventType | "all">("all");
  const shown = events.filter((e) => type === "all" || e.type === type);
  const months = [...new Set(shown.map((e) => e.date.slice(0, 7)))];

  return (
    <div className="page events-page">
      <header className="page-head">
        <h1>Events &amp; readings</h1>
        <p className="lede">
          Around forty evenings a year in Room Three: authors in conversation,
          the Index Club, workshops, a poetry open mic and Saturday story hour.
          Most are free; reserve a chair so we know how many to unfold.
        </p>
      </header>

      <div className="chips" role="group" aria-label="Filter events by type">
        <button
          type="button"
          aria-pressed={type === "all"}
          onClick={() => setType("all")}
        >
          Everything
        </button>
        {eventTypes.map((t) => (
          <button
            key={t}
            type="button"
            aria-pressed={type === t}
            onClick={() => setType(t)}
          >
            {t}
          </button>
        ))}
      </div>

      <p className="visually-hidden" aria-live="polite">
        {shown.length} events shown
      </p>

      {months.map((m) => (
        <section key={m} className="month" aria-labelledby={`m-${m}`}>
          <h2 id={`m-${m}`}>{monthYear(m)}</h2>
          <ol className="event-list">
            {shown
              .filter((e) => e.date.startsWith(m))
              .map((e) => (
                <EventRow key={e.slug} event={e} />
              ))}
          </ol>
        </section>
      ))}

      <aside className="note-panel">
        <h2>Hosting an event with us</h2>
        <p>
          Authors, publishers and reading groups: Room Three seats sixty and
          costs nothing if books are sold on the night. Write to Dot with a date
          and a title.
        </p>
        <Link to="/about" className="text-link">
          See the rooms <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </aside>
    </div>
  );
}
