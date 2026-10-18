import { useState } from "react";
import { brand, productCategories, products, type Product } from "../content";
import { ProductCard } from "../components/ProductCard";

const sorts: Record<
  string,
  { label: string; fn: (a: Product, b: Product) => number }
> = {
  featured: { label: "Featured", fn: () => 0 },
  newest: { label: "Newest", fn: (a, b) => b.added.localeCompare(a.added) },
  low: { label: "Price, low to high", fn: (a, b) => a.price - b.price },
  high: { label: "Price, high to low", fn: (a, b) => b.price - a.price },
};

export function Shop() {
  const [cat, setCat] = useState("all");
  const [sort, setSort] = useState("featured");
  const list = products
    .filter((p) => cat === "all" || p.category === cat)
    .sort(sorts[sort].fn);

  return (
    <>
      <header className="page-head wrap">
        <h1>Merch from the shop</h1>
        <p className="lead">
          Heavy cotton that survives spatter, gear that gets used on camera, and
          small batches cut and ground in Bay 2. Every order keeps a build on
          the schedule.
        </p>
        <p className="page-note">{brand.shipping}</p>
      </header>

      <section className="wrap" aria-label="Products">
        <div className="toolbar">
          <div className="chips" role="group" aria-label="Filter by category">
            {["all", ...productCategories].map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={cat === c}
                onClick={() => setCat(c)}
              >
                {c === "all" ? "Everything" : c}
              </button>
            ))}
          </div>
          <div className="sort">
            <label htmlFor="shop-sort">Sort</label>
            <select
              id="shop-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              {Object.entries(sorts).map(([k, s]) => (
                <option key={k} value={k}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <p className="result-count" aria-live="polite">
          {list.length} {list.length === 1 ? "item" : "items"}
        </p>
        <div className="product-grid">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}
