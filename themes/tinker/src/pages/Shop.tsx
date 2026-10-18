import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { ages, aisles, pages, products, type Product } from "../content";
import { fitsBand } from "../lib/format";
import { Block } from "../components/Block";
import { ProductCard } from "../components/ProductCard";

const sorts: Record<
  string,
  { label: string; compare: (a: Product, b: Product) => number }
> = {
  picks: { label: "Our picks", compare: (a, b) => a.pick - b.pick },
  "price-asc": {
    label: "Price: low to high",
    compare: (a, b) => a.price - b.price,
  },
  "price-desc": {
    label: "Price: high to low",
    compare: (a, b) => b.price - a.price,
  },
  newest: {
    label: "Newest arrivals",
    compare: (a, b) => b.added.localeCompare(a.added),
  },
  youngest: {
    label: "Youngest first",
    compare: (a, b) => a.ageMin - b.ageMin || a.pick - b.pick,
  },
};

const budgets = [
  { value: "", label: "Any price" },
  { value: "20", label: "Under $20" },
  { value: "35", label: "Under $35" },
  { value: "50", label: "Under $50" },
];

export function Shop() {
  const [query, setQuery] = useState("");
  const [band, setBand] = useState("");
  const [aisle, setAisle] = useState("");
  const [budget, setBudget] = useState("");
  const [sort, setSort] = useState("picks");

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    const b = ages.find((a) => a.id === band);
    return products
      .filter(
        (p) =>
          (!b || fitsBand(p, b)) &&
          (!aisle || p.aisle === aisle) &&
          (!budget || p.price < Number(budget)) &&
          (!q ||
            `${p.name} ${p.blurb} ${p.aisle} ${p.interests.join(" ")}`
              .toLowerCase()
              .includes(q)),
      )
      .sort(sorts[sort].compare);
  }, [query, band, aisle, budget, sort]);

  const filtered = query || band || aisle || budget;
  function clear() {
    setQuery("");
    setBand("");
    setAisle("");
    setBudget("");
  }

  return (
    <div className="page shop-page">
      <header className="page-head">
        <h1>{pages.shop.title}</h1>
        <p className="lead">{pages.shop.lead}</p>
      </header>

      <div className="filters" role="search">
        <fieldset className="age-filter">
          <legend>Age</legend>
          <label className="chip">
            <input
              type="radio"
              name="band"
              value=""
              checked={band === ""}
              onChange={() => setBand("")}
            />
            <span>All ages</span>
          </label>
          {ages.map((a) => (
            <label key={a.id} className="chip">
              <input
                type="radio"
                name="band"
                value={a.id}
                checked={band === a.id}
                onChange={() => setBand(a.id)}
              />
              <span>
                <Block shape={a.shape} color={a.color} size={14} />
                {a.label}
              </span>
            </label>
          ))}
        </fieldset>
        <div className="filter-row">
          <div className="field search-field">
            <label htmlFor="shop-search">Search</label>
            <span className="input-icon">
              <Search size={18} aria-hidden="true" />
              <input
                id="shop-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Trains, paint, bear…"
              />
            </span>
          </div>
          <div className="field">
            <label htmlFor="shop-aisle">Aisle</label>
            <select
              id="shop-aisle"
              value={aisle}
              onChange={(e) => setAisle(e.target.value)}
            >
              <option value="">Every aisle</option>
              {aisles.map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="shop-budget">Price</label>
            <select
              id="shop-budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            >
              {budgets.map((b) => (
                <option key={b.value} value={b.value}>
                  {b.label}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="shop-sort">Sort by</label>
            <select
              id="shop-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              {Object.entries(sorts).map(([id, s]) => (
                <option key={id} value={id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="filter-status">
          <p aria-live="polite">
            {shown.length} {shown.length === 1 ? "toy" : "toys"}
            {filtered ? " match" : " on the shelves"}
          </p>
          {filtered && (
            <button type="button" className="text-button" onClick={clear}>
              Clear filters
            </button>
          )}
        </div>
      </div>

      {shown.length ? (
        <div className="product-grid">
          {shown.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p className="lead">
            Nothing on that shelf matches. Try a different age or price, or ask
            us: we may have it in the back.
          </p>
          <button type="button" className="btn" onClick={clear}>
            Show every toy
          </button>
        </div>
      )}
    </div>
  );
}
