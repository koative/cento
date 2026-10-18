import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import {
  categories,
  eras,
  grades,
  pieces,
  type Category,
  type Piece,
} from "../content";
import { PieceCard } from "../components/Tag";
import { money } from "../lib/cart";

const year = (p: Piece) => Number(p.date.match(/\d{4}/)?.[0] ?? 0);

const sorts: Record<
  string,
  { label: string; fn: (a: Piece, b: Piece) => number }
> = {
  newest: {
    label: "Newest on the floor",
    fn: (a, b) => b.arrived.localeCompare(a.arrived),
  },
  "price-asc": { label: "Price, low to high", fn: (a, b) => a.price - b.price },
  "price-desc": {
    label: "Price, high to low",
    fn: (a, b) => b.price - a.price,
  },
  oldest: { label: "Oldest first", fn: (a, b) => year(a) - year(b) },
  narrowest: { label: "Narrowest first", fn: (a, b) => a.dims.w - b.dims.w },
};
type SortKey = keyof typeof sorts;

const PRICE_CAP =
  Math.ceil(Math.max(...pieces.map((p) => p.price)) / 500) * 500;

/** Home links here as #/shop?category=Seating. */
function categoryFromHash(): Category | "" {
  const value = new URLSearchParams(
    window.location.hash.split("?")[1] ?? "",
  ).get("category");
  return categories.find((c) => c === value) ?? "";
}

export function Shop() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category | "">(categoryFromHash);
  const [era, setEra] = useState("");
  const [grade, setGrade] = useState("");
  const [maxPrice, setMaxPrice] = useState(PRICE_CAP);
  const [showSold, setShowSold] = useState(true);
  const [sort, setSort] = useState<SortKey>("newest");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return pieces
      .filter(
        (p) =>
          (!category || p.category === category) &&
          (!era || p.era === era) &&
          (!grade || p.grade === grade) &&
          p.price <= maxPrice &&
          (showSold || !p.sold) &&
          (!q ||
            [p.name, p.materials, p.origin, p.stock, p.date]
              .join(" ")
              .toLowerCase()
              .includes(q)),
      )
      .sort(sorts[sort].fn);
  }, [query, category, era, grade, maxPrice, showSold, sort]);

  const active =
    [category, era, grade, query].filter(Boolean).length +
    (maxPrice < PRICE_CAP ? 1 : 0) +
    (showSold ? 0 : 1);

  function reset() {
    setQuery("");
    setCategory("");
    setEra("");
    setGrade("");
    setMaxPrice(PRICE_CAP);
    setShowSold(true);
  }

  return (
    <div className="page shop">
      <header className="page-head">
        <h1>The floor</h1>
        <p className="lead">
          Everything in the warehouse this week, with the dimensions from the
          tag. Sold pieces stay listed for a season so you can see what passes
          through.
        </p>
      </header>

      <div className="shop-layout">
        <div className="shop-filters-toggle">
          <button
            type="button"
            className="btn btn-ghost"
            aria-expanded={filtersOpen}
            aria-controls="shop-filters"
            onClick={() => setFiltersOpen(!filtersOpen)}
          >
            <SlidersHorizontal size={18} aria-hidden="true" /> Filters
            {active ? ` (${active})` : ""}
          </button>
        </div>

        <aside
          id="shop-filters"
          className="shop-filters"
          data-open={filtersOpen || undefined}
          aria-label="Filters"
        >
          <div className="field search-field">
            <label htmlFor="shop-search">Search the floor</label>
            <span className="input-icon">
              <Search size={18} aria-hidden="true" />
              <input
                id="shop-search"
                type="search"
                placeholder="Teak, cane, P-0418…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </span>
          </div>

          <fieldset className="chips">
            <legend>What it is</legend>
            {(["", ...categories] as const).map((c) => (
              <label key={c || "all"} className="chip">
                <input
                  type="radio"
                  name="category"
                  checked={category === c}
                  onChange={() => setCategory(c)}
                />
                <span>{c || "Everything"}</span>
              </label>
            ))}
          </fieldset>

          <div className="field">
            <label htmlFor="shop-era">Period</label>
            <select
              id="shop-era"
              value={era}
              onChange={(e) => setEra(e.target.value)}
            >
              <option value="">Any period</option>
              {eras.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.label}, {e.span}
                </option>
              ))}
            </select>
          </div>

          <fieldset className="chips">
            <legend>Condition</legend>
            {["", ...grades.map((g) => g.id)].map((g) => (
              <label key={g || "any"} className="chip">
                <input
                  type="radio"
                  name="grade"
                  checked={grade === g}
                  onChange={() => setGrade(g)}
                />
                <span>{g ? "Grade " + g : "Any grade"}</span>
              </label>
            ))}
          </fieldset>

          <div className="field">
            <label htmlFor="shop-price">
              Up to <output htmlFor="shop-price">{money(maxPrice)}</output>
            </label>
            <input
              id="shop-price"
              type="range"
              min={500}
              max={PRICE_CAP}
              step={250}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
          </div>

          <label className="check">
            <input
              type="checkbox"
              checked={showSold}
              onChange={(e) => setShowSold(e.target.checked)}
            />
            <span>Show sold pieces</span>
          </label>

          {active > 0 && (
            <button type="button" className="text-button" onClick={reset}>
              Clear all filters
            </button>
          )}
        </aside>

        <div className="shop-results">
          <div className="shop-bar">
            <p aria-live="polite">
              {results.length} {results.length === 1 ? "piece" : "pieces"}
              {category ? ` in ${category.toLowerCase()}` : ""}
            </p>
            <div className="field field-inline">
              <label htmlFor="shop-sort">Sort</label>
              <select
                id="shop-sort"
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
              >
                {Object.entries(sorts).map(([key, s]) => (
                  <option key={key} value={key}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {results.length ? (
            <div className="piece-grid">
              {results.map((p, i) => (
                <PieceCard key={p.id} piece={p} eager={i < 3} />
              ))}
            </div>
          ) : (
            <div className="empty">
              <h2>Nothing on the floor matches that.</h2>
              <p>
                Try a wider price or another period — or tell us what you are
                looking for and we will watch for it.
              </p>
              <button type="button" className="btn" onClick={reset}>
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
