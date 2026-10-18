import { useState } from "react";
import { Search } from "lucide-react";
import { films, filmsPage, statuses, subjects, type Film } from "../content";
import { FilmCard } from "../components/FilmCard";

const sorts: Record<string, (a: Film, b: Film) => number> = {
  "Newest first": (a, b) => b.year - a.year,
  "Oldest first": (a, b) => a.year - b.year,
  "Shortest first": (a, b) => a.runtime - b.runtime,
  "Longest first": (a, b) => b.runtime - a.runtime,
  "Title A–Z": (a, b) => a.title.localeCompare(b.title),
};

export function Films() {
  const [status, setStatus] = useState("All");
  const [subject, setSubject] = useState("All subjects");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("Newest first");

  const q = query.trim().toLowerCase();
  const shown = films
    .filter((f) => status === "All" || f.status === status)
    .filter((f) => subject === "All subjects" || f.subject === subject)
    .filter(
      (f) =>
        !q ||
        `${f.title} ${f.logline} ${f.director} ${f.location}`
          .toLowerCase()
          .includes(q),
    )
    .sort(sorts[sort]);

  const reset = () => {
    setStatus("All");
    setSubject("All subjects");
    setQuery("");
  };

  return (
    <>
      <header className="wrap page-head">
        <h1 className="h-display">{filmsPage.title}</h1>
        <p className="lede">{filmsPage.intro}</p>
      </header>

      <div className="wrap filters">
        <div className="chips" role="group" aria-label="Filter by stage">
          {["All", ...statuses].map((s) => (
            <button
              key={s}
              type="button"
              className="chip"
              aria-pressed={status === s}
              onClick={() => setStatus(s)}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="filter-row">
          <label className="search">
            <Search aria-hidden="true" />
            <span className="sr-only">Search films</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search title, place or director"
            />
          </label>
          <label className="select">
            <span>Subject</span>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              {["All subjects", ...subjects].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          <label className="select">
            <span>Sort</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              {Object.keys(sorts).map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
        </div>
        <p className="count" aria-live="polite">
          {shown.length} {shown.length === 1 ? "film" : "films"}
        </p>
      </div>

      <section className="wrap section-tight" aria-label="Results">
        {shown.length ? (
          <div className="film-grid">
            {shown.map((f) => (
              <FilmCard key={f.slug} film={f} heading="h2" />
            ))}
          </div>
        ) : (
          <div className="empty">
            <p>No films match those filters.</p>
            <button type="button" className="btn btn-ghost" onClick={reset}>
              Clear filters
            </button>
          </div>
        )}
      </section>
    </>
  );
}
