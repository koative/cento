import { useState } from "react";
import { Link } from "../router";
import { exhibitions, type ExhibitionStatus } from "../content";
import { dateRange } from "../lib/format";
import { ExhibitionVisual, artistNames } from "../components/Cards";

const filters: { key: ExhibitionStatus | "all"; label: string }[] = [
  { key: "current", label: "On now" },
  { key: "upcoming", label: "Upcoming" },
  { key: "past", label: "Past" },
  { key: "all", label: "All" },
];

export function Exhibitions() {
  const [filter, setFilter] = useState<ExhibitionStatus | "all">("current");
  const shown = exhibitions.filter(
    (e) => filter === "all" || e.status === filter,
  );

  return (
    <div className="page">
      <header className="page-head">
        <h1 className="display">Exhibitions</h1>
        <p className="lede">
          Five or six exhibitions a year across Gallery 1, Gallery 2 and the
          Print Room, each open for eight weeks or more.
        </p>
      </header>

      <div className="filter-bar" role="group" aria-label="Show exhibitions">
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            className="chip"
            aria-pressed={filter === f.key}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
            <span className="chip-count">
              {f.key === "all"
                ? exhibitions.length
                : exhibitions.filter((e) => e.status === f.key).length}
            </span>
          </button>
        ))}
      </div>
      <p className="visually-hidden" aria-live="polite">
        {shown.length} exhibitions shown
      </p>

      <ol className="ex-list">
        {shown.map((ex) => (
          <li key={ex.slug} className="ex-row">
            <Link
              to={`/exhibitions/${ex.slug}`}
              className="ex-row-media"
              tabIndex={-1}
              aria-hidden="true"
            >
              <ExhibitionVisual ex={ex} />
            </Link>
            <div className="ex-row-text">
              <h2>
                <Link to={`/exhibitions/${ex.slug}`}>{ex.title}</Link>
              </h2>
              <p className="ex-artists">{artistNames(ex)}</p>
              <p className="ex-meta">
                <time dateTime={ex.opens}>
                  {dateRange(ex.opens, ex.closes)}
                </time>{" "}
                · {ex.space}
                {ex.status === "current" && <span className="tag">On now</span>}
                {ex.status === "upcoming" && (
                  <span className="tag tag-quiet">Opens soon</span>
                )}
              </p>
              <p>{ex.summary}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
