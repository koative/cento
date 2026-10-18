import { Link } from "../router";
import { events, films, screens, type Film } from "../content";
import { FilmMeta, TimeLink } from "../components/Listing";
import {
  bookHref,
  dayLong,
  days,
  nextScreening,
  screeningsOf,
} from "../lib/programme";

export function FilmPage({ film }: { film: Film }) {
  const shows = screeningsOf(film);
  const related = films
    .filter((f) => f.slug !== film.slug)
    .sort(
      (a, b) =>
        Number(b.strand === film.strand) - Number(a.strand === film.strand),
    )
    .slice(0, 3);
  const next = nextScreening(film);
  const linked = events.filter((e) => e.film === film.slug);
  const screen = screens[film.screen];

  return (
    <article className="film">
      <header className="film-hero">
        <div className="wrap">
          <div className="scope">
            <img
              src={film.image.src}
              alt={film.image.alt}
              width={film.image.w}
              height={film.image.h}
            />
          </div>
          <div className="film-hero-text">
            <div>
              <h1>{film.title}</h1>
              {film.original && (
                <p className="film-original">{film.original}</p>
              )}
              <FilmMeta film={film} />
            </div>
            {next ? (
              <Link to={bookHref(next)} className="btn btn-red">
                Book {dayLong(next.day)}, {next.time}
              </Link>
            ) : (
              <p className="film-none">No more screenings this week.</p>
            )}
          </div>
        </div>
      </header>

      <div className="wrap film-body">
        <div className="film-copy">
          <p className="film-logline">{film.logline}</p>
          {film.synopsis.map((p) => (
            <p key={p.slice(0, 20)}>{p}</p>
          ))}
          <blockquote className="note">
            <p>{film.note.text}</p>
            <footer>{film.note.by}</footer>
          </blockquote>
          {linked.map((e) => (
            <p className="film-event" key={e.id}>
              <strong>{e.kind}:</strong> {e.title}, {dayLong(e.day)} at {e.time}
              . <Link to="/events">All events</Link>
            </p>
          ))}
        </div>

        <aside className="film-side">
          <section aria-labelledby="times-h">
            <h2 id="times-h">Screenings this week</h2>
            {days
              .filter((d) => shows.some((s) => s.day === d))
              .map((d) => (
                <div className="side-day" key={d}>
                  <h3>{dayLong(d)}</h3>
                  <div className="times">
                    {shows
                      .filter((s) => s.day === d)
                      .map((s) => (
                        <TimeLink key={s.id} s={s} />
                      ))}
                  </div>
                </div>
              ))}
          </section>
          <section aria-labelledby="specs-h">
            <h2 id="specs-h">Details</h2>
            <dl className="specs">
              <dt>Director</dt>
              <dd>{film.director}</dd>
              <dt>Cast</dt>
              <dd>{film.cast.join(", ")}</dd>
              <dt>Country</dt>
              <dd>{film.country}</dd>
              <dt>Year</dt>
              <dd className="tnum">{film.year}</dd>
              <dt>Language</dt>
              <dd>{film.language}</dd>
              <dt>Running time</dt>
              <dd className="tnum">{film.runtime} minutes</dd>
              <dt>Certificate</dt>
              <dd>{film.cert}</dd>
              <dt>Format</dt>
              <dd>
                {film.format === "Digital"
                  ? "Digital (DCP)"
                  : `${film.format} print`}
              </dd>
              <dt>Screen</dt>
              <dd>
                {screen.name}, {screen.specs[0]}
              </dd>
              <dt>Strand</dt>
              <dd>{film.strand}</dd>
            </dl>
          </section>
        </aside>
      </div>

      <section className="wrap related" aria-labelledby="related-h">
        <h2 id="related-h">Also showing</h2>
        <ul className="related-list">
          {related.map((f) => (
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
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
