import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import type { BarEvent, Drink, Night } from "../content";
import { dateParts, hhmm, longDate, money, slipOf } from "../lib/format";
import { Glass } from "./Art";

/** A drink as a line on the printed menu: glass, name, what's in it, price. */
export function DrinkLine({ drink }: { drink: Drink }) {
  return (
    <li className="drink-line">
      <Link to={`/menu/${drink.id}`}>
        <Glass kind={drink.glass} color={drink.color} />
        <span className="drink-line-text">
          <span className="drink-line-name">{drink.name}</span>
          <span className="drink-line-notes">{drink.notes}</span>
        </span>
        <span className="drink-line-price">{drink.price}</span>
      </Link>
    </li>
  );
}

/** A drink with its photograph, for the home page and related lists. */
export function DrinkCard({ drink }: { drink: Drink }) {
  return (
    <article className="drink-card">
      <div className="drink-card-media">
        {drink.image ? (
          <img
            src={drink.image.src}
            alt=""
            width={drink.image.w}
            height={drink.image.h}
            loading="lazy"
          />
        ) : (
          <Glass kind={drink.glass} color={drink.color} />
        )}
      </div>
      <h3>
        <Link to={`/menu/${drink.id}`}>{drink.name}</Link>
      </h3>
      <p>{drink.notes}</p>
      <p className="drink-card-price">{money(drink.price)}</p>
    </article>
  );
}

export function EventRow({ event }: { event: BarEvent }) {
  const d = dateParts(event.date);
  const left = event.capacity - event.taken;
  return (
    <li className="event-row">
      <p className="event-date" aria-hidden="true">
        <span>{d.weekday}</span>
        <strong>{d.day}</strong>
        <span>{d.month}</span>
      </p>
      <div className="event-row-body">
        <p className="event-kind">
          {event.kind} · {event.start}
          <span className="sr-only">
            , {`${d.weekday} ${d.day} ${d.month}`}
          </span>
        </p>
        <h3>
          <Link to={`/events/${event.id}`}>{event.title}</Link>
        </h3>
        <p>{event.summary}</p>
      </div>
      <p className="event-row-meta">
        <span>{money(event.price)}</span>
        <span data-low={left === 0 ? "out" : left <= 8 ? "" : undefined}>
          {left === 0
            ? "Sold out"
            : left <= 8
              ? `${left} places left`
              : "Places available"}
        </span>
        <ArrowRight aria-hidden="true" />
      </p>
    </li>
  );
}

/** A printed slip in miniature: first and last record, and the shape of the night as coloured bands. */
export function SlipCard({ night }: { night: Night }) {
  const { entries, start, end } = slipOf(night);
  const first = entries[0].album;
  const last = entries[entries.length - 1].album;
  return (
    <li className="slip-card">
      <p className="slip-card-date">{longDate(night.date)}</p>
      <h3>
        <Link to={`/records/${night.id}`}>{night.title}</Link>
      </h3>
      <p className="slip-card-by">
        {night.selector} · {hhmm(start)}–{hhmm(end)}
      </p>
      <span className="slip-bands" aria-hidden="true">
        {entries.map((e, i) => (
          <span
            key={i}
            style={{ flexGrow: e.length, background: e.album.color }}
          />
        ))}
      </span>
      <p className="slip-card-ends">
        Opened with <em>{first.title}</em>, closed with <em>{last.title}</em>.
      </p>
    </li>
  );
}
