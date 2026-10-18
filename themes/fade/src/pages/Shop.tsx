import { useState } from "react";
import { categories, products, shopPage } from "../content";
import { PageHead } from "../components/PageHead";
import { ProductCard } from "../components/ProductCard";

const sorts = {
  shelf: { label: "As on the shelf", fn: () => 0 },
  low: { label: "Price, low to high", fn: (a: number, b: number) => a - b },
  high: { label: "Price, high to low", fn: (a: number, b: number) => b - a },
};

export function Shop() {
  const [cat, setCat] = useState<string>("all");
  const [sort, setSort] = useState<keyof typeof sorts>("shelf");
  const from = (id: string) =>
    Math.min(
      ...products.find((p) => p.id === id)!.variants.map((v) => v.price),
    );
  const shown = products
    .filter((p) => cat === "all" || p.category === cat)
    .sort((a, b) => sorts[sort].fn(from(a.id), from(b.id)));

  return (
    <>
      <PageHead title={shopPage.title} intro={shopPage.intro} />
      <div className="wrap filters">
        <div className="chips" role="group" aria-label="Category">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              className="chip"
              aria-pressed={cat === c.id}
              onClick={() => setCat(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>
        <label className="select-field">
          <span>Sort</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as keyof typeof sorts)}
          >
            {Object.entries(sorts).map(([id, s]) => (
              <option key={id} value={id}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
        <p className="result-count" aria-live="polite">
          {shown.length} {shown.length === 1 ? "product" : "products"}
        </p>
      </div>
      <div className="wrap product-grid shop-grid">
        {shown.map((p) => (
          <ProductCard key={p.id} product={p} headingLevel={2} />
        ))}
      </div>
    </>
  );
}
