import { useState } from "react";
import { categories, drops, products, type Category } from "../content";
import { at, buyable, dropOf, soldOut, useNow } from "../lib/time";
import { ProductCard } from "../components/ProductCard";

type Availability = "all" | "now" | "coming";
type Sort = "newest" | "price-asc" | "price-desc" | "name";

const allSizes = [...new Set(products.flatMap((p) => p.sizes))];

export function Shop() {
  const now = useNow();
  const [category, setCategory] = useState<Category | "All">("All");
  const [size, setSize] = useState("");
  const [availability, setAvailability] = useState<Availability>("all");
  const [sort, setSort] = useState<Sort>("newest");

  const list = products
    .filter((p) => category === "All" || p.category === category)
    .filter((p) => !size || p.stock[p.sizes.indexOf(size)] > 0)
    .filter(
      (p) =>
        availability === "all" ||
        (availability === "now"
          ? buyable(p, now) && !soldOut(p)
          : !buyable(p, now)),
    )
    .sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "name") return a.name.localeCompare(b.name);
      return at(dropOf(b).date) - at(dropOf(a).date);
    });

  const reset = () => {
    setCategory("All");
    setSize("");
    setAvailability("all");
  };

  return (
    <div className="page">
      <header className="page-head">
        <h1>Shop</h1>
        <p className="lead">
          Everything from the last {drops.length} drops, plus what is coming.
          One run each, no restocks: if a size is gone, it is gone.
        </p>
      </header>

      <div className="filters">
        <div className="chips" role="group" aria-label="Category">
          {(["All", ...categories] as const).map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="filter-selects">
          <label>
            <span>Size</span>
            <select value={size} onChange={(e) => setSize(e.target.value)}>
              <option value="">Any size</option>
              {allSizes.map((s) => (
                <option key={s} value={s}>
                  {s} in stock
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>Show</span>
            <select
              value={availability}
              onChange={(e) => setAvailability(e.target.value as Availability)}
            >
              <option value="all">Everything</option>
              <option value="now">Available now</option>
              <option value="coming">Coming soon &amp; raffle</option>
            </select>
          </label>
          <label>
            <span>Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
            >
              <option value="newest">Newest drop</option>
              <option value="price-asc">Price, low to high</option>
              <option value="price-desc">Price, high to low</option>
              <option value="name">Name, A–Z</option>
            </select>
          </label>
        </div>
      </div>

      <p className="result-count" aria-live="polite">
        {list.length} {list.length === 1 ? "piece" : "pieces"}
      </p>

      {list.length ? (
        <div className="product-grid">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>
            Nothing matches that. Sizes sell through fast; try another size or
            show everything.
          </p>
          <button type="button" className="btn" onClick={reset}>
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
