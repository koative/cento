import { useState } from "react";
import { Search } from "lucide-react";
import { brand, genres, productions, type Genre, type Stage } from "../content";
import { day } from "../lib/util";
import { ProductionRow } from "../components/ProductionRow";

const monthOf = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
});

export function Season() {
  const [stage, setStage] = useState<Stage | "All">("All");
  const [genre, setGenre] = useState<Genre | null>(null);
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const shown = productions.filter(
    (p) =>
      (stage === "All" || p.stage === stage) &&
      (!genre || p.genre === genre) &&
      (!q ||
        [p.title, p.credit, p.logline, ...p.cast.map((c) => c.name)]
          .join(" ")
          .toLowerCase()
          .includes(q)),
  );
  const months = [...new Set(shown.map((p) => monthOf.format(day(p.opens))))];
  const reset = () => {
    setStage("All");
    setGenre(null);
    setQuery("");
  };

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <h1 className="display">The {brand.season} season</h1>
          <p className="lede">
            Nine productions from October to July: new plays and a new musical
            on the Mainstage, Chekhov and a council-meeting comedy in the
            Studio, and a holiday show with real snow.
          </p>
        </div>
      </section>

      <section className="wrap filters" aria-label="Filter the season">
        <div className="seg" role="group" aria-label="Stage">
          {(["All", "Mainstage", "Studio"] as const).map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={stage === s}
              onClick={() => setStage(s)}
            >
              {s === "All" ? "Both stages" : s}
            </button>
          ))}
        </div>
        <div className="chips" role="group" aria-label="Genre">
          {genres.map((g) => (
            <button
              key={g}
              type="button"
              className="chip"
              aria-pressed={genre === g}
              onClick={() => setGenre(genre === g ? null : g)}
            >
              {g}
            </button>
          ))}
        </div>
        <label className="search">
          <Search aria-hidden="true" />
          <span className="sr-only">Search productions, writers and cast</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search titles, writers, cast"
          />
        </label>
      </section>

      <div className="wrap season-list">
        <p className="result-count" aria-live="polite">
          {shown.length === productions.length
            ? `All ${shown.length} productions`
            : `${shown.length} of ${productions.length} productions`}
        </p>
        {months.map((m) => (
          <section key={m} className="month">
            <h2>{m}</h2>
            <div className="bill">
              {shown
                .filter((p) => monthOf.format(day(p.opens)) === m)
                .map((p) => (
                  <ProductionRow key={p.slug} p={p} />
                ))}
            </div>
          </section>
        ))}
        {shown.length === 0 && (
          <div className="empty">
            <h2>Nothing on that bill</h2>
            <p>
              No production matches those filters. Try another genre, or both
              stages.
            </p>
            <button type="button" className="btn btn-line" onClick={reset}>
              Clear filters
            </button>
          </div>
        )}
      </div>
    </>
  );
}
