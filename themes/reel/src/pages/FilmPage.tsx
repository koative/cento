import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "../router";
import { films, screenings, type Film } from "../content";
import { dayLabel, runtimeLabel } from "../lib/format";
import { TrailerPlayer } from "../components/TrailerPlayer";
import { FilmCard } from "../components/FilmCard";

export function FilmPage({ film }: { film: Film }) {
  const dates = screenings.filter((s) => s.film === film.slug);
  const related = [
    ...films.filter((f) => f !== film && f.subject === film.subject),
    ...films.filter((f) => f !== film && f.subject !== film.subject),
  ].slice(0, 3);
  const released = film.status === "Released";
  const facts: [string, string][] = [
    ["Directed by", film.director],
    ["Year", String(film.year)],
    ["Running time", `${runtimeLabel(film.runtime)} · ${film.form}`],
    ["Shot in", film.location],
    ["Language", film.language],
    ["Format", film.format],
    ["Status", film.status],
  ];

  return (
    <>
      <header className="wrap film-head">
        <Link to="/films" className="text-link back">
          <ArrowLeft aria-hidden="true" /> All films
        </Link>
        <h1 className="h-display">{film.title}</h1>
        <p className="lede">{film.logline}</p>
      </header>

      <div className="wrap film-player">
        <TrailerPlayer film={film} />
      </div>

      <section className="wrap film-body">
        <dl className="facts">
          {facts.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        <div className="synopsis">
          <h2 className="h-section">Synopsis</h2>
          {film.synopsis.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <h2 className="h-section">From the director</h2>
          <blockquote className="statement">
            <p>“{film.statement}”</p>
            <footer>— {film.director}</footer>
          </blockquote>
        </div>
      </section>

      <section className="wrap section-tight" aria-labelledby="stills-h">
        <h2 id="stills-h" className="h-section">
          Stills
        </h2>
        <div className="stills" data-count={film.stills.length}>
          {film.stills.map((s) => (
            <figure key={s.src}>
              <img
                src={s.src}
                alt={s.alt}
                width={s.w}
                height={s.h}
                loading="lazy"
              />
            </figure>
          ))}
        </div>
      </section>

      <section
        className="wrap section billing-wrap"
        aria-labelledby="credits-h"
      >
        <h2 id="credits-h" className="sr-only">
          Credits
        </h2>
        <dl className="billing">
          {film.credits.map((c) => (
            <div key={c.role}>
              <dt>{c.role}</dt>
              <dd>{c.name}</dd>
            </div>
          ))}
        </dl>
        {film.press && (
          <figure className="film-press">
            <blockquote>“{film.press.quote}”</blockquote>
            <figcaption>{film.press.source}</figcaption>
          </figure>
        )}
        {film.festivals.length > 0 && (
          <ul className="film-festivals" aria-label="Festivals and awards">
            {film.festivals.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        )}
      </section>

      <section className="band">
        <div className="wrap film-cta">
          <div>
            <h2 className="h-section">
              {released ? "Screen this film" : "Partner on this film"}
            </h2>
            <p>
              {released
                ? `${film.release}. Community licences start at £95; schools, cinemas and festivals can book through the same form.`
                : `${film.release}. We are talking to broadcasters, funds and co-producers now.`}
            </p>
            <Link
              to={`/contact?type=${released ? "screening" : "coproduction"}&film=${film.slug}`}
              className="btn btn-primary"
            >
              {released ? "Request a screening" : "Start a conversation"}
            </Link>
          </div>
          <div>
            <h2 className="h-section">Upcoming dates</h2>
            {dates.length ? (
              <ul className="dates">
                {dates.map((s) => (
                  <li key={s.id}>
                    <span className="dates-day">{dayLabel(s.date)}</span>
                    <span className="dates-place">
                      <strong>{s.city}</strong> {s.venue}
                    </span>
                    <span className="tickets" data-state={s.tickets}>
                      {s.tickets}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="quiet">
                No public dates yet. Sign up to the screening sheet below to
                hear first.
              </p>
            )}
            {dates.length > 0 && (
              <Link to={`/screenings?film=${film.slug}`} className="text-link">
                All dates for {film.title} <ArrowRight aria-hidden="true" />
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="wrap section">
        <h2 className="h-section">More from the slate</h2>
        <div className="film-grid">
          {related.map((f) => (
            <FilmCard key={f.slug} film={f} logline={false} />
          ))}
        </div>
      </section>
    </>
  );
}
