import { Link } from "../router";
import type { Film } from "../content";
import {
  bookHref,
  dayName,
  days,
  screeningsOf,
  type Screening,
} from "../lib/programme";

/** One screening time: a booking link, or a struck-out time when it has started or sold out. */
export function TimeLink({
  s,
  withDay = false,
}: {
  s: Screening;
  withDay?: boolean;
}) {
  const label = (
    <>
      {withDay && <span className="time-day">{dayName(s.day)}</span>}
      <span className="time-clock">{s.time}</span>
      {s.note && <span className="time-note">{s.note}</span>}
    </>
  );
  if (s.past || s.soldOut)
    return (
      <span className="time" data-off="">
        {label}
        <span className="time-note">{s.soldOut ? "Sold out" : "Started"}</span>
      </span>
    );
  return (
    <Link
      to={bookHref(s)}
      className="time"
      aria-label={`Book ${s.film.title}, ${dayName(s.day)} at ${s.time}${s.note ? `, ${s.note}` : ""}`}
    >
      {label}
    </Link>
  );
}

export function FilmMeta({ film }: { film: Film }) {
  return (
    <p className="film-meta">
      <span>{film.director}</span>
      <span>{film.country}</span>
      <span>{film.runtime} min</span>
      <span className="cert">{film.cert}</span>
      {film.format !== "Digital" && (
        <span className="format">{film.format}</span>
      )}
    </p>
  );
}

/** A programme row: still, title, credits and the day's times. */
export function FilmRow({
  film,
  day,
  headingLevel = 3,
}: {
  film: Film;
  day: number;
  headingLevel?: 2 | 3;
}) {
  const H = `h${headingLevel}` as const;
  const shows = screeningsOf(film).filter((s) => s.day === day);
  return (
    <article className="film-row">
      <Link
        to={`/films/${film.slug}`}
        className="film-row-still"
        tabIndex={-1}
        aria-hidden="true"
      >
        <img
          src={film.image.src}
          alt=""
          width={film.image.w}
          height={film.image.h}
          loading="lazy"
        />
      </Link>
      <div className="film-row-body">
        <H className="film-row-title">
          <Link to={`/films/${film.slug}`}>{film.title}</Link>
        </H>
        <FilmMeta film={film} />
        <p className="film-row-line">{film.logline}</p>
      </div>
      <div className="times" aria-label={`${film.title} times`}>
        {shows.map((s) => (
          <TimeLink key={s.id} s={s} />
        ))}
      </div>
    </article>
  );
}

export function DayStrip({
  value,
  onChange,
  label = "Choose a day",
}: {
  value: number;
  onChange: (d: number) => void;
  label?: string;
}) {
  return (
    <div className="day-strip" role="group" aria-label={label}>
      {days.map((d) => (
        <button
          key={d}
          type="button"
          aria-pressed={value === d}
          onClick={() => onChange(d)}
        >
          {dayName(d)}
        </button>
      ))}
    </div>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="faq">
      {items.map((f) => (
        <details key={f.q}>
          <summary>{f.q}</summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}
