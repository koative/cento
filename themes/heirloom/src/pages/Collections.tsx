import { useState } from "react";
import { Link } from "../router";
import {
  collections,
  gems,
  metals,
  pieces,
  type Gem,
  type Metal,
} from "../content";
import { PieceCard } from "../components/PieceCard";

type Sort = "featured" | "low" | "high" | "new";
const budgets = [
  { id: "any", label: "Any price", max: Infinity },
  { id: "1500", label: "Under $1,500", max: 1500 },
  { id: "3000", label: "Under $3,000", max: 3000 },
  { id: "5000", label: "Under $5,000", max: 5000 },
];

export function Collections({
  collection,
}: {
  collection?: (typeof collections)[number];
}) {
  const [metal, setMetal] = useState<Metal | "any">("any");
  const [gem, setGem] = useState<Gem | "none" | "any">("any");
  const [budget, setBudget] = useState("any");
  const [ready, setReady] = useState(false);
  const [sort, setSort] = useState<Sort>("featured");

  const max = budgets.find((b) => b.id === budget)!.max;
  const shown = pieces
    .filter((p) => !collection || p.collection === collection.id)
    .filter((p) => metal === "any" || p.metals.includes(metal))
    .filter(
      (p) => gem === "any" || (gem === "none" ? !p.art.gem : p.art.gem === gem),
    )
    .filter((p) => p.price < max)
    .filter((p) => !ready || p.lead.startsWith("Ready"))
    .sort((a, b) =>
      sort === "low"
        ? a.price - b.price
        : sort === "high"
          ? b.price - a.price
          : sort === "new"
            ? Number(!!b.isNew) - Number(!!a.isNew) || a.rank - b.rank
            : a.rank - b.rank,
    );
  const filtered =
    metal !== "any" || gem !== "any" || budget !== "any" || ready;

  function reset() {
    setMetal("any");
    setGem("any");
    setBudget("any");
    setReady(false);
  }

  return (
    <div className="wrap page">
      <header className="page-head">
        <h1>{collection ? collection.title : "The collections"}</h1>
        <p className="lede">
          {collection
            ? collection.intro
            : "Every piece below is made at our benches in Providence, to order or from a small stock we keep ready. Prices include insured delivery within the United States."}
        </p>
      </header>

      <nav className="tabs" aria-label="Collections">
        <Link to="/collections">All</Link>
        {collections.map((c) => (
          <Link key={c.id} to={`/collections/${c.id}`}>
            {c.name}
          </Link>
        ))}
      </nav>

      <form
        className="filters"
        onSubmit={(e) => e.preventDefault()}
        aria-label="Filter and sort"
      >
        <label>
          Metal
          <select
            value={metal}
            onChange={(e) => setMetal(e.target.value as Metal | "any")}
          >
            <option value="any">Any metal</option>
            {(Object.keys(metals) as Metal[]).map((m) => (
              <option key={m} value={m}>
                {metals[m].name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Stone
          <select
            value={gem}
            onChange={(e) => setGem(e.target.value as Gem | "none" | "any")}
          >
            <option value="any">Any stone</option>
            {(Object.keys(gems) as Gem[]).map((g) => (
              <option key={g} value={g}>
                {gems[g].name}
              </option>
            ))}
            <option value="none">No stone</option>
          </select>
        </label>
        <label>
          Price
          <select value={budget} onChange={(e) => setBudget(e.target.value)}>
            {budgets.map((b) => (
              <option key={b.id} value={b.id}>
                {b.label}
              </option>
            ))}
          </select>
        </label>
        <label className="check">
          <input
            type="checkbox"
            checked={ready}
            onChange={(e) => setReady(e.target.checked)}
          />
          Ready to ship
        </label>
        <label className="sort">
          Sort by
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
          >
            <option value="featured">Featured</option>
            <option value="new">Newest first</option>
            <option value="low">Price, low to high</option>
            <option value="high">Price, high to low</option>
          </select>
        </label>
      </form>

      <p className="result-count" aria-live="polite">
        {shown.length} {shown.length === 1 ? "piece" : "pieces"}
        {filtered && (
          <button type="button" className="text-button" onClick={reset}>
            Clear filters
          </button>
        )}
      </p>

      {shown.length ? (
        <div className="piece-grid">
          {shown.map((p) => (
            <PieceCard key={p.slug} piece={p} headingLevel={2} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>Nothing in this drawer</h2>
          <p>
            No piece matches every filter. Clear one, or draw exactly what you
            want in the ring builder.
          </p>
          <div className="actions">
            <button type="button" className="btn" onClick={reset}>
              Clear filters
            </button>
            <Link to="/ring-builder" className="btn btn-quiet">
              Open the ring builder
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
