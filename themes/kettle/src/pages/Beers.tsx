import { useState } from "react";
import { Search } from "lucide-react";
import { beers, families, type Family } from "../content";
import { BeerTile } from "../components/Tiles";

type Sort = "tap" | "abv-desc" | "abv-asc" | "ibu-desc" | "name";

export function Beers() {
  const [family, setFamily] = useState<Family | "all">("all");
  const [tapOnly, setTapOnly] = useState(false);
  const [cansOnly, setCansOnly] = useState(false);
  const [sort, setSort] = useState<Sort>("tap");
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const list = beers
    .filter((b) => family === "all" || b.family === family)
    .filter((b) => !tapOnly || b.tap !== null)
    .filter((b) => !cansOnly || !!b.shopId)
    .filter(
      (b) =>
        !q ||
        [b.name, b.style, ...b.hops.map((h) => h.name)].some((s) =>
          s.toLowerCase().includes(q),
        ),
    )
    .sort((a, b) => {
      if (sort === "abv-desc") return b.abv - a.abv;
      if (sort === "abv-asc") return a.abv - b.abv;
      if (sort === "ibu-desc") return b.ibu - a.ibu;
      if (sort === "name") return a.name.localeCompare(b.name);
      return (a.tap ?? 99) - (b.tap ?? 99);
    });

  const reset = () => {
    setFamily("all");
    setTapOnly(false);
    setCansOnly(false);
    setQuery("");
  };

  return (
    <>
      <header className="page-head wrap">
        <h1>The beers</h1>
        <p className="lede">
          Twelve recipes, eleven on tap right now. Every one is brewed in the
          same copper kettle and poured from the tanks behind the bar. Tap a
          glass for the full brew sheet: grain bill, hops, yeast and what to eat
          with it.
        </p>
      </header>

      <div className="wrap">
        <div className="filters" role="search" aria-label="Filter beers">
          <fieldset className="chips">
            <legend className="sr-only">Style family</legend>
            {[{ id: "all" as const, label: "All styles" }, ...families].map(
              (f) => (
                <label key={f.id} className="chip">
                  <input
                    type="radio"
                    name="family"
                    checked={family === f.id}
                    onChange={() => setFamily(f.id)}
                  />
                  <span>{f.label}</span>
                </label>
              ),
            )}
          </fieldset>
          <div className="filter-row">
            <label className="search">
              <Search aria-hidden="true" />
              <span className="sr-only">Search beers, styles or hops</span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, style or hop"
              />
            </label>
            <label className="check">
              <input
                type="checkbox"
                checked={tapOnly}
                onChange={(e) => setTapOnly(e.target.checked)}
              />
              On tap now
            </label>
            <label className="check">
              <input
                type="checkbox"
                checked={cansOnly}
                onChange={(e) => setCansOnly(e.target.checked)}
              />
              In cans
            </label>
            <label className="select">
              <span>Sort</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
              >
                <option value="tap">Tap number</option>
                <option value="abv-asc">ABV, low to high</option>
                <option value="abv-desc">ABV, high to low</option>
                <option value="ibu-desc">Most bitter first</option>
                <option value="name">Name, A–Z</option>
              </select>
            </label>
          </div>
        </div>

        <p className="result-count" aria-live="polite">
          {list.length} {list.length === 1 ? "beer" : "beers"}
        </p>

        {list.length ? (
          <div className="beer-shelf">
            {list.map((b) => (
              <BeerTile key={b.slug} beer={b} headingLevel={2} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>Nothing on the board matches that.</h2>
            <p>
              Try another style, or clear the filters to see all twelve beers.
            </p>
            <button type="button" className="btn btn-ink" onClick={reset}>
              Clear filters
            </button>
          </div>
        )}
      </div>
    </>
  );
}
