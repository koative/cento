import { useState } from "react";
import {
  products,
  types,
  uses,
  type Product,
  type Type,
  type Use,
} from "../content";
import { ProductCard } from "../components/ProductCard";

const sorts: Record<
  string,
  { label: string; fn: (a: Product, b: Product) => number }
> = {
  featured: { label: "Featured", fn: () => 0 },
  "price-asc": { label: "Price, low to high", fn: (a, b) => a.price - b.price },
  "price-desc": {
    label: "Price, high to low",
    fn: (a, b) => b.price - a.price,
  },
  quietest: {
    label: "Quietest first",
    fn: (a, b) => (b.specs?.anc ?? -1) - (a.specs?.anc ?? -1),
  },
  battery: {
    label: "Longest battery",
    fn: (a, b) => (b.specs?.batteryHours ?? -1) - (a.specs?.batteryHours ?? -1),
  },
};

export function Shop() {
  const [type, setType] = useState<Type | "All">("All");
  const [use, setUse] = useState<Use | "Any">("Any");
  const [sort, setSort] = useState("featured");

  const list = products
    .filter(
      (p) =>
        (type === "All" || p.type === type) &&
        (use === "Any" || p.uses.includes(use)),
    )
    .sort(sorts[sort].fn);

  return (
    <div className="page shop-page">
      <header className="page-head">
        <h1>Headphones and parts</h1>
        <p className="lead">
          Seven headphones, every one with a 45-day home trial, and the parts to
          keep them going for a decade.
        </p>
      </header>

      <div className="toolbar">
        <fieldset className="chips">
          <legend className="visually-hidden">Type</legend>
          {(["All", ...types] as const).map((t) => (
            <label key={t}>
              <input
                type="radio"
                name="type"
                value={t}
                checked={type === t}
                onChange={() => setType(t)}
              />
              <span>{t}</span>
            </label>
          ))}
        </fieldset>
        <div className="toolbar-selects">
          <label>
            <span>Wear it for</span>
            <select
              value={use}
              onChange={(e) => setUse(e.target.value as Use | "Any")}
            >
              <option>Any</option>
              {uses.map((u) => (
                <option key={u}>{u}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Sort</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              {Object.entries(sorts).map(([k, s]) => (
                <option key={k} value={k}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <p className="result-count" aria-live="polite">
        {list.length} {list.length === 1 ? "product" : "products"}
      </p>

      {list.length ? (
        <div className="product-grid">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} headingLevel={2} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>
            Nothing matches {type.toLowerCase()} headphones for{" "}
            {use.toLowerCase()} yet.
          </p>
          <button
            type="button"
            className="btn btn-quiet"
            onClick={() => {
              setType("All");
              setUse("Any");
            }}
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
