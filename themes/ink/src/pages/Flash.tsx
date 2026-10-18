import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { artists, flash, styles, type Design, type Style } from "../content";
import { FlashCard } from "../components/FlashCard";

const sorts = {
  number: { label: "Sheet number", fn: (a: Design, b: Design) => a.no - b.no },
  "price-asc": {
    label: "Price, low to high",
    fn: (a: Design, b: Design) => a.price - b.price,
  },
  "size-asc": {
    label: "Smallest first",
    fn: (a: Design, b: Design) => a.minCm - b.minCm,
  },
};
type SortKey = keyof typeof sorts;

export function Flash() {
  const [style, setStyle] = useState<Style | "All">("All");
  const [artist, setArtist] = useState("all");
  const [available, setAvailable] = useState(false);
  const [sort, setSort] = useState<SortKey>("number");
  const [query, setQuery] = useState("");

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return flash
      .filter((d) => style === "All" || d.styles.includes(style))
      .filter((d) => artist === "all" || d.artist === artist)
      .filter((d) => !available || d.availability !== "claimed")
      .filter(
        (d) =>
          !q ||
          d.name.toLowerCase().includes(q) ||
          d.blurb.toLowerCase().includes(q),
      )
      .sort(sorts[sort].fn);
  }, [style, artist, available, sort, query]);

  const reset = () => {
    setStyle("All");
    setArtist("all");
    setAvailable(false);
    setQuery("");
  };

  return (
    <div className="page">
      <header className="page-head wrap">
        <h1>The flash book</h1>
        <p className="lede">
          Every sheet on our wall, drawn in the studio. Prices are for the
          starting size; open a sheet to scale it to your placement. Repeatables
          can be tattooed again, one-offs come down once they are worn.
        </p>
      </header>

      <div className="wrap filters" role="search">
        <div className="chips" role="group" aria-label="Filter by style">
          {(["All", ...styles] as const).map((s) => (
            <button
              key={s}
              type="button"
              className="chip-btn"
              aria-pressed={style === s}
              onClick={() => setStyle(s)}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="filter-row">
          <label className="search">
            <Search aria-hidden="true" />
            <span className="sr-only">Search designs</span>
            <input
              type="search"
              placeholder="Search moon, ring, band…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
          <label className="select">
            <span>Artist</span>
            <select value={artist} onChange={(e) => setArtist(e.target.value)}>
              <option value="all">All artists</option>
              {artists.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </label>
          <label className="select">
            <span>Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
            >
              {Object.entries(sorts).map(([k, v]) => (
                <option key={k} value={k}>
                  {v.label}
                </option>
              ))}
            </select>
          </label>
          <label className="check">
            <input
              type="checkbox"
              checked={available}
              onChange={(e) => setAvailable(e.target.checked)}
            />
            <span>Hide claimed</span>
          </label>
        </div>
        <p className="result-count" aria-live="polite">
          {shown.length} of {flash.length} sheets
        </p>
      </div>

      <div className="wrap">
        {shown.length ? (
          <div className="flash-grid">
            {shown.map((d) => (
              <FlashCard key={d.id} design={d} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <p>
              No sheets match those filters. Most designs can be redrawn in
              another style — or start from scratch.
            </p>
            <button type="button" className="btn btn-line" onClick={reset}>
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
