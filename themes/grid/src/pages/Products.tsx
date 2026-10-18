import { useState } from "react";
import { Link } from "../router";
import {
  categories,
  products,
  productsPage,
  type Category,
  type Product,
} from "../content";
import { money } from "../lib/energy";
import { ProductArt } from "../components/ProductArt";
import { PageHead } from "../components/Bits";

const sorts: Record<
  string,
  { label: string; fn: (a: Product, b: Product) => number }
> = {
  featured: { label: "Most fitted", fn: (a, b) => a.featured - b.featured },
  low: { label: "Price, low to high", fn: (a, b) => a.price - b.price },
  high: { label: "Price, high to low", fn: (a, b) => b.price - a.price },
  name: { label: "Name, A–Z", fn: (a, b) => a.name.localeCompare(b.name) },
};

export default function Products() {
  const initial = new URLSearchParams(window.location.hash.split("?")[1]).get(
    "c",
  ) as Category | null;
  const [cat, setCat] = useState<Category | "All">(
    initial && categories.includes(initial) ? initial : "All",
  );
  const [sort, setSort] = useState("featured");
  const list = products
    .filter((p) => cat === "All" || p.category === cat)
    .sort(sorts[sort].fn);

  return (
    <>
      <PageHead title={productsPage.title} lead={productsPage.intro} />
      <section className="wrap catalogue" aria-label="Product catalogue">
        <div className="filters">
          <div className="chips" role="group" aria-label="Filter by category">
            {(["All", ...categories] as const).map((c) => (
              <button
                key={c}
                type="button"
                className="chip"
                aria-pressed={cat === c}
                onClick={() => setCat(c)}
              >
                {c}
                <span className="num">
                  {c === "All"
                    ? products.length
                    : products.filter((p) => p.category === c).length}
                </span>
              </button>
            ))}
          </div>
          <label className="sort">
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
        <p className="result-count" role="status">
          {list.length} {list.length === 1 ? "product" : "products"}
          {cat !== "All" && ` in ${cat}`}
        </p>
        <ul className="product-grid">
          {list.map((p) => (
            <li key={p.id}>
              <Link to={`/products/${p.id}`} className="product-tile">
                <span className="tile-art">
                  <ProductArt art={p.art} />
                </span>
                <strong>{p.name}</strong>
                <span className="meta">{p.category}</span>
                <span>{p.summary}</span>
                <span className="num price">
                  {money(p.price)} <small>{p.unit}</small>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="quiet-note">{productsPage.note}</p>
      </section>
    </>
  );
}
