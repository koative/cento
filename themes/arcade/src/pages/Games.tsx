import { useState } from "react";
import {
  games,
  statusLabel,
  type Game,
  type GameStatus,
  type Platform,
} from "../content";
import { Cartridge } from "../components/Cartridge";

const PLATFORMS: Platform[] = ["PC", "Mac", "Switch", "PS5", "Browser"];
const SORTS: Record<
  string,
  { label: string; fn: (a: Game, b: Game) => number }
> = {
  newest: { label: "Newest first", fn: (a, b) => b.date.localeCompare(a.date) },
  oldest: { label: "Oldest first", fn: (a, b) => a.date.localeCompare(b.date) },
  name: { label: "Name, A–Z", fn: (a, b) => a.name.localeCompare(b.name) },
};

export function Games() {
  const [status, setStatus] = useState<GameStatus | "all">("all");
  const [platform, setPlatform] = useState<Platform | "all">("all");
  const [sort, setSort] = useState("newest");
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const shown = games
    .filter((g) => status === "all" || g.status === status)
    .filter((g) => platform === "all" || g.platforms.includes(platform))
    .filter(
      (g) =>
        !q || `${g.name} ${g.genre} ${g.tagline}`.toLowerCase().includes(q),
    )
    .sort(SORTS[sort].fn);

  const reset = () => {
    setStatus("all");
    setPlatform("all");
    setQuery("");
  };

  return (
    <div className="page wrap">
      <header className="page-head">
        <h1>Games</h1>
        <p className="lede">
          Seven games since 2019. Short ones, kind ones, a couple you can play
          in this browser tab. Pick a cartridge.
        </p>
      </header>

      <div className="filters" role="search" aria-label="Filter games">
        <fieldset className="chips">
          <legend className="sr-only">Status</legend>
          {(["all", "out", "soon", "free"] as const).map((s) => (
            <label key={s} className="chip">
              <input
                type="radio"
                name="status"
                value={s}
                checked={status === s}
                onChange={() => setStatus(s)}
              />
              <span>{s === "all" ? "All games" : statusLabel[s]}</span>
            </label>
          ))}
        </fieldset>
        <div className="filter-fields">
          <label className="mini-field">
            <span>Search</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Fishing, puzzle, cats…"
            />
          </label>
          <label className="mini-field">
            <span>Platform</span>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value as Platform | "all")}
            >
              <option value="all">Any platform</option>
              {PLATFORMS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </label>
          <label className="mini-field">
            <span>Sort</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              {Object.entries(SORTS).map(([k, v]) => (
                <option key={k} value={k}>
                  {v.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <p className="result-count" aria-live="polite">
        {shown.length === 1 ? "1 game" : `${shown.length} games`}
      </p>

      {shown.length ? (
        <div className="shelf-row shelf-grid">
          {shown.map((g) => (
            <Cartridge key={g.slug} game={g} headingLevel={2} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <p>
            No games match those filters. Nothing on the shelf runs on that
            combination yet.
          </p>
          <button type="button" className="btn btn-ghost" onClick={reset}>
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
