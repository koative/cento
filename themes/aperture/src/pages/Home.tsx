import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import {
  brand,
  events,
  films,
  home,
  hours,
  images,
  screens,
  season,
  spaces,
  tiers,
} from "../content";
import { FilmMeta, TimeLink } from "../components/Listing";
import { Sightline } from "../components/SeatMap";
import { Iris } from "../components/Logo";
import {
  allScreenings,
  bookable,
  bookHref,
  dayLong,
  dayName,
  dayTiny,
  money,
  nextScreening,
  weekday,
} from "../lib/programme";

export function Home() {
  const featured = films.find((f) => f.slug === home.featured)!;
  const featuredNext = nextScreening(featured);
  const screenings = allScreenings();
  // The board shows today; after the last show it flips to tomorrow.
  const boardDay = screenings.some((s) => s.day === 0 && bookable(s)) ? 0 : 1;
  const board = screenings.filter((s) => s.day === boardDay);
  const fresh = films
    .filter((f) => f.strand === "New release" && f.slug !== featured.slug)
    .slice(0, 3);
  const nightShift = films.filter((f) => f.strand === "Night Shift");
  const upcoming = [...events]
    .sort((a, b) => a.day - b.day || a.time.localeCompare(b.time))
    .slice(0, 4);
  const [row, setRow] = useState(5);
  const one = screens[1];

  return (
    <>
      <section className="hero wrap" aria-labelledby="hero-h">
        <div className="hero-text">
          <h1 id="hero-h">{home.title}</h1>
          <p className="lede">{home.intro}</p>
          <div className="actions">
            <Link to="/whats-on" className="btn btn-red">
              See what's on
            </Link>
            <Link to="/membership" className="btn btn-line">
              Become a member
            </Link>
          </div>
        </div>
        <figure className="projection">
          <img
            src={featured.image.src}
            alt={featured.image.alt}
            width={featured.image.w}
            height={featured.image.h}
          />
          <figcaption>
            <span className="projection-top">
              <span>{screens[featured.screen].name}</span>
              <span>
                {featured.language.includes("subtitles")
                  ? "Subtitled"
                  : featured.language}
              </span>
            </span>
            <strong className="projection-title">
              <Link to={`/films/${featured.slug}`}>{featured.title}</Link>
            </strong>
            <span className="projection-bottom">
              <span>
                Programmer's pick · {featured.director} · {featured.runtime} min
                · {featured.cert}
              </span>
              {featuredNext && (
                <Link to={bookHref(featuredNext)}>
                  Next: {dayName(featuredNext.day)} {featuredNext.time}{" "}
                  <ArrowRight aria-hidden="true" />
                </Link>
              )}
            </span>
          </figcaption>
        </figure>
      </section>

      <section className="board-wrap" aria-labelledby="board-h">
        <div className="wrap">
          <div className="board-head">
            <h2 id="board-h">
              {boardDay === 0 ? "On the board today" : "On the board tomorrow"}
            </h2>
            <p>
              {dayLong(boardDay)} · {board.length} screenings ·{" "}
              <Link to="/whats-on">Full programme</Link>
            </p>
          </div>
          <ol className="board">
            {board.map((s) => (
              <li key={s.id} data-off={s.past || s.soldOut ? "" : undefined}>
                <span className="board-time tnum">{s.time}</span>
                <Link to={`/films/${s.film.slug}`} className="board-title">
                  {s.film.title}
                </Link>
                <span className="board-meta">
                  {s.screen.name.replace("Screen ", "Scr. ")} ·{" "}
                  {s.film.format === "Digital" ? s.film.cert : s.film.format}
                  {s.note && ` · ${s.note}`}
                </span>
                {s.past || s.soldOut ? (
                  <span className="board-book">
                    {s.soldOut ? "Sold out" : "Started"}
                  </span>
                ) : (
                  <Link
                    to={bookHref(s)}
                    className="board-book"
                    aria-label={`Book ${s.film.title} at ${s.time}`}
                  >
                    Book
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="wrap fresh" aria-labelledby="fresh-h">
        <div className="section-head">
          <h2 id="fresh-h">New this week</h2>
          <Link to="/whats-on" className="text-link">
            All films <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <ul className="fresh-grid">
          {fresh.map((f) => {
            const next = nextScreening(f);
            return (
              <li key={f.slug}>
                <img
                  src={f.image.src}
                  alt=""
                  width={f.image.w}
                  height={f.image.h}
                  loading="lazy"
                />
                <h3>
                  <Link to={`/films/${f.slug}`}>{f.title}</Link>
                </h3>
                <FilmMeta film={f} />
                <p>{f.logline}</p>
                {next && <TimeLink s={next} withDay />}
              </li>
            );
          })}
        </ul>
      </section>

      <section className="season" aria-labelledby="season-h">
        <div className="wrap season-grid">
          <div className="season-text">
            <h2 id="season-h">{season.title}</h2>
            <p className="season-dates">{season.dates}</p>
            <p>{season.intro}</p>
          </div>
          <ol className="season-films">
            {nightShift.map((f) => (
              <li key={f.slug}>
                <img
                  src={f.image.src}
                  alt=""
                  width={f.image.w}
                  height={f.image.h}
                  loading="lazy"
                />
                <div>
                  <h3>
                    <Link to={`/films/${f.slug}`}>{f.title}</Link>
                  </h3>
                  <p>
                    {f.director}, {f.year} · {f.format} · {f.runtime} min
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="wrap seat-teaser" aria-labelledby="seat-h">
        <div>
          <h2 id="seat-h">{home.seatTitle}</h2>
          <p>{home.seatText}</p>
          <label className="row-range">
            <span>
              Try a row in {one.name}: <strong>{one.rows[row]}</strong>
            </span>
            <input
              type="range"
              min={0}
              max={one.rows.length - 1}
              value={row}
              onChange={(e) => setRow(Number(e.target.value))}
            />
          </label>
          <Link to="/book" className="btn btn-ink">
            Choose a screening
          </Link>
        </div>
        <Sightline screen={one} row={row} />
      </section>

      <section className="wrap home-events" aria-labelledby="events-h">
        <div className="section-head">
          <h2 id="events-h">In person</h2>
          <Link to="/events" className="text-link">
            All events <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <ul className="mini-events">
          {upcoming.map((e) => (
            <li key={e.id}>
              <p className="event-date">
                <strong>{weekday(e.day)}</strong>
                <span>
                  {dayTiny(e.day)} · {e.time}
                </span>
              </p>
              <h3>{e.title}</h3>
              <p>
                {e.kind} · {e.place}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="rooms" aria-labelledby="rooms-h">
        <div className="wrap rooms-grid">
          <h2 id="rooms-h">Two screens and a bar</h2>
          <figure className="room room-main">
            <img
              src={images.auditorium.src}
              alt={images.auditorium.alt}
              width={images.auditorium.w}
              height={images.auditorium.h}
              loading="lazy"
            />
            <figcaption>
              <strong>{screens[1].name}</strong>
              {screens[1].specs.join(" · ")}
            </figcaption>
          </figure>
          <figure className="room">
            <img
              src={images.screenTwo.src}
              alt={images.screenTwo.alt}
              width={images.screenTwo.w}
              height={images.screenTwo.h}
              loading="lazy"
            />
            <figcaption>
              <strong>{screens[2].name}</strong>
              {screens[2].specs.join(" · ")}
            </figcaption>
          </figure>
          <figure className="room">
            <img
              src={images.bar.src}
              alt={images.bar.alt}
              width={images.bar.w}
              height={images.bar.h}
              loading="lazy"
            />
            <figcaption>
              <strong>The Bar</strong>
              {hours[1].value}
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="manifesto wrap" aria-labelledby="manifesto-h">
        <h2 id="manifesto-h">{home.manifesto}</h2>
        <p>{home.manifestoText}</p>
      </section>

      <section className="wrap member-band" aria-labelledby="member-h">
        <h2 id="member-h">{home.membershipTitle}</h2>
        <ul>
          {tiers.map((t) => (
            <li key={t.id}>
              <strong>{t.name}</strong>
              <span className="tnum">{money(t.monthly)} a month</span>
              <span>{t.pitch}</span>
            </li>
          ))}
        </ul>
        <Link to="/membership" className="btn btn-red">
          Join Aperture
        </Link>
      </section>

      <section className="wrap split hire-teaser" aria-labelledby="hire-h">
        <img
          src={spaces[2].image.src}
          alt={spaces[2].image.alt}
          width={spaces[2].image.w}
          height={spaces[2].image.h}
          loading="lazy"
        />
        <div>
          <h2 id="hire-h">{home.hireTitle}</h2>
          <p>{home.hireText}</p>
          <Link to="/hire" className="btn btn-ink">
            Venue hire
          </Link>
        </div>
      </section>

      <section className="close" aria-labelledby="close-h">
        <div className="wrap close-grid">
          <Iris className="iris iris-big" />
          <div>
            <h2 id="close-h">Doors open thirty minutes before every film.</h2>
            <p>
              {brand.street}, {brand.town}. Step-free throughout, hearing loops
              in both screens, and the bar is open from noon.
            </p>
          </div>
          <Link to="/visit" className="btn btn-paper">
            Plan your visit
          </Link>
        </div>
      </section>
    </>
  );
}
