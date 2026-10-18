import { useState } from "react";
import { eventKinds, events, type EventKind } from "../content";
import { Link } from "../router";
import { longDate, money, toDate } from "../lib/format";

export function Events() {
  const [kind, setKind] = useState<EventKind | "">("");
  const shown = events
    .filter((e) => !kind || e.kind === kind)
    .sort((a, b) => a.date.localeCompare(b.date));

  return (
    <>
      <section className="page-head wrap">
        <h1>Events</h1>
        <p className="lead">
          League nights, setters' walk-throughs, clinics, film screenings and
          days out on real rock. Most are free for members; all of them are
          better with friends.
        </p>
      </section>

      <section className="wrap" aria-labelledby="ev-title">
        <div className="list-toolbar">
          <h2 id="ev-title" className="h-sm">
            {shown.length} {shown.length === 1 ? "event" : "events"} this season
          </h2>
          <div className="seg" role="group" aria-label="Event type">
            <button
              type="button"
              aria-pressed={!kind}
              onClick={() => setKind("")}
            >
              All
            </button>
            {eventKinds.map((k) => (
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
        </div>
        <p className="sr-only" aria-live="polite">
          {shown.length} events shown
        </p>
        <ul className="event-cards">
          {shown.map((e) => {
            const left = e.capacity - e.taken;
            return (
              <li key={e.id}>
                <Link to={`/events/${e.id}`} className="event-card">
                  <img
                    src={e.image}
                    alt=""
                    width={640}
                    height={480}
                    loading="lazy"
                  />
                  <span className="ec-date">
                    <strong>{toDate(e.date).getDate()}</strong>
                    {toDate(e.date).toLocaleString("en-US", { month: "short" })}
                  </span>
                  <span className="ec-body">
                    <span className="ev-kind">{e.kind}</span>
                    <span className="ev-title">{e.title}</span>
                    <span className="ev-summary">{e.summary}</span>
                    <span className="ec-foot">
                      <span>
                        {longDate(e.date)} · {e.start}–{e.end}
                      </span>
                      <span className="num">{money(e.price)}</span>
                      <span data-low={left <= 5 ? "" : undefined}>
                        {left <= 5 ? `${left} places left` : `${left} places`}
                      </span>
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
