import { useState } from "react";
import { products, shipping, type Product } from "../content";
import { money } from "../lib/format";
import { ProductCard } from "../components/ProductCard";

const groups: { id: string; label: string; test: (p: Product) => boolean }[] = [
  { id: "all", label: "Everything", test: () => true },
  { id: "jerseys", label: "Jerseys", test: (p) => p.kind === "jersey" },
  {
    id: "apparel",
    label: "Apparel",
    test: (p) => ["hoodie", "tee", "cap", "scarf"].includes(p.kind),
  },
  { id: "desk", label: "Desk", test: (p) => p.kind === "mat" },
];

const sorts = {
  featured: { label: "Featured", fn: () => 0 },
  low: {
    label: "Price: low to high",
    fn: (a: Product, b: Product) => a.price - b.price,
  },
  high: {
    label: "Price: high to low",
    fn: (a: Product, b: Product) => b.price - a.price,
  },
};

export function Shop() {
  const [group, setGroup] = useState("all");
  const [sort, setSort] = useState<keyof typeof sorts>("featured");
  const test = groups.find((g) => g.id === group)!.test;
  const list = products.filter(test).sort(sorts[sort].fn);

  return (
    <>
      <header className="page-head wrap">
        <h1>Shop</h1>
        <p className="lede">
          The kit the team wears on stage and the things we make for match
          nights. Designed at Clutch House, shipped from Rotterdam. Free
          shipping over {money(shipping.freeOver)}.
        </p>
      </header>

      <section className="wrap" aria-label="Products">
        <div className="toolbar">
          <div className="segmented" role="group" aria-label="Category">
            {groups.map((g) => (
              <button
                key={g.id}
                type="button"
                aria-pressed={group === g.id}
                onClick={() => setGroup(g.id)}
              >
                {g.label}
              </button>
            ))}
          </div>
          <label className="select">
            <span>Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as keyof typeof sorts)}
            >
              {Object.entries(sorts).map(([k, s]) => (
                <option key={k} value={k}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
          <p className="toolbar-count num" aria-live="polite">
            {list.length} {list.length === 1 ? "item" : "items"}
          </p>
        </div>

        <ul className="product-grid">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </ul>
        <p className="quiet">{shipping.note}</p>
      </section>
    </>
  );
}
