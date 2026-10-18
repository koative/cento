import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import {
  audiences,
  events,
  images,
  type Audience,
  type Event,
} from "../content";
import { parseIso } from "../lib/format";

export function EventRow({
  event: e,
  level = 3,
}: {
  event: Event;
  level?: 3 | 4;
}) {
  const H = level === 3 ? "h3" : "h4";
  const d = parseIso(e.date);
  const isRoute = e.action.to.startsWith("/");
  return (
    <li className="event">
      <p className="event-date" aria-hidden="true">
        <span>{d.toLocaleDateString("en-US", { month: "short" })}</span>
        <strong className="tnum">{d.getDate()}</strong>
        <span>{d.toLocaleDateString("en-US", { weekday: "short" })}</span>
      </p>
      <div className="event-body">
        <H>{e.title}</H>
        <p className="event-when">
          <span className="sr-only">
            {d.toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
            ,{" "}
          </span>
          {e.time} · {e.place}
        </p>
        <p>{e.blurb}</p>
        <p className="event-tags">
          {e.audience.map((a) => (
            <span key={a} className="tag">
              {audiences.find((x) => x.id === a)?.label}
            </span>
          ))}
          <span className="event-price">{e.price}</span>
        </p>
      </div>
      {isRoute ? (
        <Link to={e.action.to} className="btn btn-line event-cta">
          {e.action.label}
        </Link>
      ) : (
        <a href={e.action.to} className="btn btn-line event-cta">
          {e.action.label}
        </a>
      )}
    </li>
  );
}

export function Events() {
  const [filter, setFilter] = useState<Audience | "all">("all");
  const shown = events.filter(
    (e) => filter === "all" || e.audience.includes(filter),
  );
  const months = [...new Set(shown.map((e) => e.date.slice(0, 7)))];

  return (
    <>
      <section className="page-hero page-hero-photo wrap">
        <div>
          <h1>Events &amp; camps</h1>
          <p className="lede">
            Starlight Fridays, rhyme times, sensory hours, grown-ups nights and
            holiday camps. Most events are included with admission.
          </p>
        </div>
        <img
          src={images.sky}
          alt="Families in a darkened room watch a glowing globe projection."
          width={1280}
          height={850}
        />
      </section>

      <section className="section wrap" aria-labelledby="cal-title">
        <h2 id="cal-title" className="sr-only">
          Calendar
        </h2>
        <div
          className="filter-bar"
          role="group"
          aria-label="Filter events by audience"
        >
          {[{ id: "all" as const, label: "Everything" }, ...audiences].map(
            (a) => (
              <button
                key={a.id}
                type="button"
                className="chip-btn"
                aria-pressed={filter === a.id}
                onClick={() => setFilter(a.id)}
              >
                {a.label}
              </button>
            ),
          )}
        </div>
        <p className="result-count" aria-live="polite">
          {shown.length} {shown.length === 1 ? "event" : "events"}
        </p>
        {months.map((m) => (
          <div key={m} className="month">
            <h3 className="month-title">
              {parseIso(m + "-01").toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </h3>
            <ul className="event-list">
              {shown
                .filter((e) => e.date.startsWith(m))
                .map((e) => (
                  <EventRow key={e.id} event={e} level={4} />
                ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="section wrap split-note">
        <h2>Every Friday until 7 pm</h2>
        <p>
          Friday Lates keep the galleries open two extra hours, with the Lookout
          telescope on clear nights. Book a 3:30 pm arrival and stay for the
          lot.
        </p>
        <Link to="/tickets" className="text-link">
          Book a Friday slot <ArrowRight aria-hidden="true" />
        </Link>
      </section>
    </>
  );
}
