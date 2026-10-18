import { useState } from "react";
import { Link } from "../router";
import { films, img, licences, screenings, screeningsPage } from "../content";
import { dayLabel, filmBySlug, hashParam, monthLabel } from "../lib/format";

export function Screenings() {
  const [film, setFilm] = useState(() => {
    const asked = hashParam("film");
    return asked && filmBySlug(asked) ? asked : "all";
  });
  const [city, setCity] = useState("all");
  const cities = [...new Set(screenings.map((s) => s.city))].sort();
  const shownFilms = films.filter((f) =>
    screenings.some((s) => s.film === f.slug),
  );

  const shown = screenings.filter(
    (s) =>
      (film === "all" || s.film === film) &&
      (city === "all" || s.city === city),
  );
  const months = [...new Set(shown.map((s) => monthLabel(s.date)))];

  return (
    <>
      <header className="wrap page-head">
        <h1 className="h-display">{screeningsPage.title}</h1>
        <p className="lede">{screeningsPage.intro}</p>
      </header>

      <div className="wrap filters">
        <div className="filter-row">
          <label className="select">
            <span>Film</span>
            <select value={film} onChange={(e) => setFilm(e.target.value)}>
              <option value="all">All films</option>
              {shownFilms.map((f) => (
                <option key={f.slug} value={f.slug}>
                  {f.title}
                </option>
              ))}
            </select>
          </label>
          <label className="select">
            <span>City</span>
            <select value={city} onChange={(e) => setCity(e.target.value)}>
              <option value="all">All cities</option>
              {cities.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
        </div>
        <p className="count" aria-live="polite">
          {shown.length} {shown.length === 1 ? "screening" : "screenings"}
        </p>
      </div>

      <section className="wrap section-tight" aria-label="Upcoming screenings">
        {months.map((m) => (
          <div key={m} className="month">
            <h2 className="month-h">{m}</h2>
            <ul className="programme">
              {shown
                .filter((s) => monthLabel(s.date) === m)
                .map((s) => {
                  const f = filmBySlug(s.film)!;
                  return (
                    <li key={s.id}>
                      <time
                        dateTime={`${s.date}T${s.time}`}
                        className="prog-when"
                      >
                        <span>{dayLabel(s.date)}</span>
                        <span>{s.time}</span>
                      </time>
                      <div className="prog-what">
                        <Link to={`/films/${f.slug}`} className="prog-film">
                          {f.title}
                        </Link>
                        <p>{s.note}</p>
                      </div>
                      <p className="prog-where">
                        <strong>{s.city}</strong>
                        {s.venue}
                      </p>
                      <span className="prog-kind">{s.kind}</span>
                      <span className="tickets" data-state={s.tickets}>
                        {s.tickets}
                      </span>
                    </li>
                  );
                })}
            </ul>
          </div>
        ))}
        {!shown.length && (
          <div className="empty">
            <p>No public dates for that combination yet.</p>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => {
                setFilm("all");
                setCity("all");
              }}
            >
              Show every date
            </button>
          </div>
        )}
      </section>

      <section className="host">
        <img
          src={img.seats.src}
          alt={img.seats.alt}
          width={img.seats.w}
          height={img.seats.h}
          loading="lazy"
        />
        <div className="host-copy">
          <h2 className="h-section">{screeningsPage.hostHeading}</h2>
          <p>{screeningsPage.hostText}</p>
          <table className="licences">
            <caption className="sr-only">Screening licences</caption>
            <thead>
              <tr>
                <th scope="col">Licence</th>
                <th scope="col">For</th>
                <th scope="col">Fee</th>
              </tr>
            </thead>
            <tbody>
              {licences.map((l) => (
                <tr key={l.name}>
                  <th scope="row">{l.name}</th>
                  <td>
                    {l.who}
                    <span>{l.includes}</span>
                  </td>
                  <td className="num">{l.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link to="/contact?type=screening" className="btn btn-primary">
            Request a screening
          </Link>
        </div>
      </section>
    </>
  );
}
