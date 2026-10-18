import { useState } from "react";
import { Search } from "lucide-react";
import { Link } from "../router";
import { films, pricing, strands, type Format, type Strand } from "../content";
import { DayStrip, FilmMeta, FilmRow, TimeLink } from "../components/Listing";
import { dayLong, nextScreening, screeningsOf } from "../lib/programme";

const formats: (Format | "All")[] = ["All", "35mm", "70mm", "Digital"];

export function WhatsOn() {
  const [view, setView] = useState<"day" | "az">("day");
  const [day, setDay] = useState(0);
  const [format, setFormat] = useState<Format | "All">("All");
  const [strand, setStrand] = useState<Strand | "All">("All");
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const matching = films.filter(
    (f) =>
      (format === "All" || f.format === format) &&
      (strand === "All" || f.strand === strand) &&
      (!q ||
        `${f.title} ${f.original ?? ""} ${f.director} ${f.country} ${f.language}`
          .toLowerCase()
          .includes(q)),
  );
  const shown =
    view === "day"
      ? matching.filter((f) => f.showings.some((s) => s.day === day))
      : [...matching].sort((a, b) => a.title.localeCompare(b.title));
  const reset = () => (setFormat("All"), setStrand("All"), setQuery(""));

  return (
    <div className="wrap page-pad">
      <header className="page-head">
        <h1>What's on</h1>
        <p className="lede">
          Seven days of films across two screens. Listed times are when the
          trailers start; the film follows within six minutes.{" "}
          {pricing.tuesdayLine}
        </p>
      </header>

      <div className="filters">
        <div className="seg" role="group" aria-label="View">
          <button
            type="button"
            aria-pressed={view === "day"}
            onClick={() => setView("day")}
          >
            By day
          </button>
          <button
            type="button"
            aria-pressed={view === "az"}
            onClick={() => setView("az")}
          >
            Films A–Z
          </button>
        </div>
        <label className="search">
          <span className="sr-only">Search films, directors or countries</span>
          <Search aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search films, directors, countries"
          />
        </label>
        <label className="select">
          <span>Format</span>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value as Format | "All")}
          >
            {formats.map((f) => (
              <option key={f}>{f}</option>
            ))}
          </select>
        </label>
        <label className="select">
          <span>Strand</span>
          <select
            value={strand}
            onChange={(e) => setStrand(e.target.value as Strand | "All")}
          >
            <option>All</option>
            {strands.map((s) => (
              <option key={s.name}>{s.name}</option>
            ))}
          </select>
        </label>
      </div>

      {view === "day" && <DayStrip value={day} onChange={setDay} />}

      <p className="result-count" aria-live="polite">
        {shown.length} {shown.length === 1 ? "film" : "films"}
        {view === "day"
          ? ` showing ${day === 0 ? "today" : `on ${dayLong(day)}`}`
          : " this week"}
      </p>

      {shown.length === 0 ? (
        <div className="empty">
          <p>
            Nothing matches on this day. Try another day, or clear the filters.
          </p>
          <button type="button" className="btn btn-line" onClick={reset}>
            Clear filters
          </button>
        </div>
      ) : view === "day" ? (
        <section aria-labelledby="day-h">
          <h2 id="day-h" className="listing-day">
            {dayLong(day)}
          </h2>
          <div className="listing">
            {shown.map((f) => (
              <FilmRow key={f.slug} film={f} day={day} />
            ))}
          </div>
        </section>
      ) : (
        <ul className="film-grid">
          {shown.map((f) => {
            const next = nextScreening(f);
            return (
              <li key={f.slug} className="film-card">
                <img
                  src={f.image.src}
                  alt=""
                  width={f.image.w}
                  height={f.image.h}
                  loading="lazy"
                />
                <h2>
                  <Link to={`/films/${f.slug}`}>{f.title}</Link>
                </h2>
                <FilmMeta film={f} />
                <p>{f.logline}</p>
                <p className="film-card-next">
                  {next ? (
                    <>
                      <span>Next</span> <TimeLink s={next} withDay />
                    </>
                  ) : (
                    "No more screenings this week"
                  )}
                  <span className="film-card-count">
                    {screeningsOf(f).length} screenings
                  </span>
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
