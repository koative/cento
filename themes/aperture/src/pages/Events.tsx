import { useState } from "react";
import { Link } from "../router";
import { events, images, season, type EventKind } from "../content";
import {
  allScreenings,
  bookHref,
  bookable,
  dayTiny,
  weekday,
} from "../lib/programme";

const kinds = ["All", ...new Set(events.map((e) => e.kind))] as (
  EventKind | "All"
)[];

export function Events() {
  const [kind, setKind] = useState<EventKind | "All">("All");
  const screenings = allScreenings();
  const list = events
    .filter((e) => kind === "All" || e.kind === kind)
    .sort((a, b) => a.day - b.day || a.time.localeCompare(b.time));

  return (
    <div className="wrap page-pad">
      <header className="page-head">
        <h1>Events &amp; Q&amp;As</h1>
        <p className="lede">
          Directors in the room, introductions before the film, a quiz in the
          bar and a tour of the projection box. Most events are screenings with
          standard ticket prices; book them like any other film.
        </p>
      </header>

      <div className="chip-filter" role="group" aria-label="Filter events">
        {kinds.map((k) => (
          <button
            key={k}
            type="button"
            aria-pressed={kind === k}
            onClick={() => setKind(k)}
          >
            {k}
          </button>
        ))}
      </div>
      <p className="result-count" aria-live="polite">
        {list.length} {list.length === 1 ? "event" : "events"} in the next seven
        days
      </p>

      <ol className="event-list">
        {list.map((e) => {
          const s = screenings.find(
            (x) =>
              x.film.slug === e.film && x.day === e.day && x.time === e.time,
          );
          return (
            <li key={e.id} className="event">
              <p className="event-date">
                <strong>{weekday(e.day)}</strong>
                <span>{dayTiny(e.day)}</span>
                <span className="tnum">{e.time}</span>
              </p>
              <div className="event-body">
                <h2>{e.title}</h2>
                <p>{e.text}</p>
                <p className="event-meta">
                  <span className="tag">{e.kind}</span> {e.place} · {e.price}
                </p>
              </div>
              <div className="event-action">
                {s && bookable(s) ? (
                  <Link to={bookHref(s)} className="btn btn-red">
                    Choose seats
                  </Link>
                ) : s ? (
                  <span className="event-off">
                    {s.soldOut ? "Sold out" : "Started"}
                  </span>
                ) : (
                  <span className="event-off">No booking needed</span>
                )}
                {e.film && (
                  <Link to={`/films/${e.film}`} className="text-link">
                    About the film
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ol>

      <section className="split season-band" aria-labelledby="season-h">
        <img
          src={images.projector.src}
          alt={images.projector.alt}
          width={images.projector.w}
          height={images.projector.h}
          loading="lazy"
        />
        <div>
          <h2 id="season-h">{season.title}</h2>
          <p className="season-dates">{season.dates}</p>
          <p>{season.intro}</p>
          <Link to="/whats-on" className="btn btn-ink">
            See the season
          </Link>
        </div>
      </section>
    </div>
  );
}
