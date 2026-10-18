import { useState } from "react";
import { Search } from "lucide-react";
import {
  categories,
  diets,
  products,
  type Category,
  type Diet,
} from "../content";
import { ProductCard } from "../components/ProductCard";

const sorts = {
  popular: "Most ordered",
  "price-asc": "Price, low to high",
  "price-desc": "Price, high to low",
  notice: "Shortest notice",
} as const;
type Sort = keyof typeof sorts;

const fromPrice = (p: (typeof products)[number]) =>
  Math.min(...p.sizes.map((s) => s.price));

export function Shop() {
  const [category, setCategory] = useState<Category | "All">("All");
  const [diet, setDiet] = useState<Diet[]>([]);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("popular");

  const q = query.trim().toLowerCase();
  const list = products
    .filter((p) => category === "All" || p.category === category)
    .filter((p) => diet.every((d) => p.diet.includes(d)))
    .filter((p) => !q || `${p.name} ${p.blurb}`.toLowerCase().includes(q))
    .sort((a, b) =>
      sort === "price-asc"
        ? fromPrice(a) - fromPrice(b)
        : sort === "price-desc"
          ? fromPrice(b) - fromPrice(a)
          : sort === "notice"
            ? a.leadDays - b.leadDays || a.rank - b.rank
            : a.rank - b.rank,
    );

  const reset = () => {
    setCategory("All");
    setDiet([]);
    setQuery("");
  };

  return (
    <>
      <header className="page-head">
        <h1>Order ahead</h1>
        <p className="lede">
          Everything we bake to order, for pickup at the side window. Most
          things need one night's notice; celebration cakes need two.
        </p>
      </header>

      <section className="section shop" aria-label="Products">
        <div className="filters">
          <fieldset className="chips">
            <legend>Category</legend>
            {(["All", ...categories] as const).map((c) => (
              <label key={c} className="chip">
                <input
                  type="radio"
                  name="category"
                  checked={category === c}
                  onChange={() => setCategory(c)}
                />
                {c}
              </label>
            ))}
          </fieldset>
          <fieldset className="chips">
            <legend>Dietary</legend>
            {diets.map((d) => (
              <label key={d} className="chip">
                <input
                  type="checkbox"
                  checked={diet.includes(d)}
                  onChange={(e) =>
                    setDiet(
                      e.target.checked
                        ? [...diet, d]
                        : diet.filter((x) => x !== d),
                    )
                  }
                />
                {d}
              </label>
            ))}
          </fieldset>
          <div className="filter-row">
            <div className="search">
              <label htmlFor="shop-search">Search the bake</label>
              <Search size={18} aria-hidden="true" />
              <input
                id="shop-search"
                type="search"
                value={query}
                placeholder="rye, cardamom, cake…"
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="sort">
              <label htmlFor="shop-sort">Sort</label>
              <select
                id="shop-sort"
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
              >
                {Object.entries(sorts).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <p className="result-count" aria-live="polite">
          {list.length} {list.length === 1 ? "item" : "items"}
        </p>
        {list.length ? (
          <div className="product-grid">
            {list.map((p, i) => (
              <ProductCard key={p.id} product={p} eager={i < 4} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <p>
              Nothing on the list matches that. Try fewer filters — or ask us at
              the counter, we take odd requests.
            </p>
            <button type="button" className="btn btn-ghost" onClick={reset}>
              Clear filters
            </button>
          </div>
        )}
      </section>
    </>
  );
}
