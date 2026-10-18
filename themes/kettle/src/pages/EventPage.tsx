import { useState } from "react";
import { ArrowLeft, CalendarPlus, Mail } from "lucide-react";
import { Link } from "../router";
import { beers, brand, events, eventTypes, type KettleEvent } from "../content";
import { beerColor, eventTime, icsFor, longDate, money } from "../lib/util";
import { Glass } from "../components/Art";
import { EventRow } from "../components/Tiles";

export function EventPage({ event }: { event: KettleEvent }) {
  const [saved, setSaved] = useState(false);
  const pouring = event.pouring.map((s) => beers.find((b) => b.slug === s)!);
  const others = events.filter((e) => e.id !== event.id).slice(0, 3);
  const type = eventTypes.find((t) => t.id === event.type)!;

  const addToCalendar = () => {
    const file = new Blob(
      [icsFor(event, `${brand.legal}, ${brand.street}, ${brand.city}`)],
      { type: "text/calendar" },
    );
    const a = document.createElement("a");
    a.href = URL.createObjectURL(file);
    a.download = `${event.id}.ics`;
    a.click();
    URL.revokeObjectURL(a.href);
    setSaved(true);
  };

  return (
    <>
      <div className="wrap crumbs">
        <Link to="/events" className="link-back">
          <ArrowLeft aria-hidden="true" /> All events
        </Link>
      </div>

      <section className="wrap event-hero">
        <div className="event-hero-copy">
          <h1>{event.title}</h1>
          <dl className="spec-strip">
            <div>
              <dt>Date</dt>
              <dd>{longDate(event.date)}</dd>
            </div>
            <div>
              <dt>Time</dt>
              <dd className="tnum">{eventTime(event)}</dd>
            </div>
            <div>
              <dt>Entry</dt>
              <dd className="tnum">
                {event.price ? money(event.price) : "Free"}
              </dd>
            </div>
            <div>
              <dt>Type</dt>
              <dd>
                {event.repeats
                  ? `${type.label}, ${event.repeats.toLowerCase()}`
                  : type.label}
              </dd>
            </div>
          </dl>
          <p className="lede">{event.summary}</p>
          <div className="actions">
            <button
              type="button"
              className="btn btn-copper"
              onClick={addToCalendar}
            >
              <CalendarPlus aria-hidden="true" /> Add to calendar
            </button>
            {event.price > 0 && (
              <a
                className="btn btn-line"
                href={`mailto:${brand.email}?subject=${encodeURIComponent(`Tickets: ${event.title}`)}`}
              >
                <Mail aria-hidden="true" /> Reserve by email
              </a>
            )}
          </div>
          <p className="quiet-note" aria-live="polite">
            {saved &&
              `Saved ${event.id}.ics — open it to add the event to your calendar.`}
          </p>
        </div>
        <figure className="event-hero-figure">
          <img src={event.image} alt="" width={1600} height={1100} />
        </figure>
      </section>

      <section className="section" aria-labelledby="about-event">
        <div className="wrap event-body">
          <div className="prose">
            <h2 id="about-event">What to expect</h2>
            {event.body.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
            <ul className="ticks">
              {event.details.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
          <aside className="pouring" aria-labelledby="pouring-title">
            <h2 id="pouring-title">Pouring that night</h2>
            <ul>
              {pouring.map((b) => (
                <li key={b.slug}>
                  <Glass
                    shape={b.glass}
                    color={beerColor(b)}
                    id={`ev-${b.slug}`}
                    className="glass glass-mini"
                  />
                  <div>
                    <Link to={`/beers/${b.slug}`}>{b.name}</Link>
                    <span className="tnum">
                      {b.style} · {b.abv.toFixed(1)}%
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="section" aria-labelledby="more-events">
        <div className="wrap">
          <div className="section-head section-head-row">
            <h2 id="more-events">Also coming up</h2>
            <Link to="/events">Full calendar</Link>
          </div>
          <div className="event-list">
            {others.map((e) => (
              <EventRow key={e.id} event={e} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
