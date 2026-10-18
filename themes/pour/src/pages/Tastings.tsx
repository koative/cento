import { useState } from "react";
import { Link } from "../router";
import { eventKinds, events, images, type EventKind } from "../content";
import { money } from "../lib/cart";
import { dayParts } from "../lib/format";

export function Tastings() {
  const [kind, setKind] = useState<EventKind | "All">("All");
  const list = events.filter((e) => kind === "All" || e.kind === kind);

  return (
    <div className="page">
      <header className="page-head with-photo">
        <div>
          <h1>Tastings & events</h1>
          <p className="lead">
            Small rooms, real winemakers and enough bread to keep everyone
            honest. Seats go into your case like a bottle; most nights sell out
            a week ahead.
          </p>
        </div>
        <img
          src={images.tasting}
          alt="Guests in carnival masks tasting red wine blind around a table"
          width={1400}
          height={1050}
        />
      </header>

      <fieldset className="chips">
        <legend>Show</legend>
        {(["All", ...eventKinds] as const).map((k) => (
          <button
            key={k}
            type="button"
            className="chip"
            aria-pressed={kind === k}
            onClick={() => setKind(k)}
          >
            {k === "All" ? "Everything" : k}
          </button>
        ))}
      </fieldset>
      <p className="visually-hidden" aria-live="polite">
        {list.length} events shown
      </p>

      <ul className="event-list big">
        {list.map((e) => {
          const d = dayParts(e.date);
          return (
            <li key={e.id}>
              <span className="event-date">
                <small>{d.weekday}</small>
                <b>{d.day}</b>
                <small>{d.month}</small>
              </span>
              <div>
                <p className="event-kind">
                  {e.kind} · {e.time} · {e.length} · with {e.host}
                </p>
                <h2>
                  <Link to={"/tastings/" + e.id}>{e.title}</Link>
                </h2>
                <p>{e.summary}</p>
              </div>
              <span className="event-price">
                <b className="num">{money(e.price)}</b>
                <small data-low={e.left <= 6 || undefined}>
                  {e.left <= 6
                    ? `${e.left} of ${e.seats} seats left`
                    : `${e.left} seats free`}
                </small>
              </span>
            </li>
          );
        })}
      </ul>

      <section className="section split-note">
        <h2>Private tastings</h2>
        <p>
          The back room seats twenty for birthdays, team nights and the friend
          who has just discovered orange wine. Tell us a date, a headcount and a
          budget per person and we will build the flight.{" "}
          <a href="mailto:hello@pour.example?subject=Private%20tasting">
            hello@pour.example
          </a>
        </p>
      </section>
    </div>
  );
}
