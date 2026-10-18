import { useState } from "react";
import { products, shipping, type Category } from "../content";
import { money } from "../lib/format";
import { ProductCard } from "../components/Cards";

const categories: ("All" | Category)[] = [
  "All",
  "Records",
  "Apparel",
  "Prints & bits",
];
type Sort = "featured" | "low" | "high";

export function Merch() {
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const [sort, setSort] = useState<Sort>("featured");
  const list = products.filter((p) => cat === "All" || p.category === cat);
  if (sort !== "featured")
    list.sort((a, b) =>
      sort === "low" ? a.price - b.price : b.price - a.price,
    );

  return (
    <>
      <header className="page-head wrap">
        <h1 className="display-xl">Merch</h1>
        <p className="lede">
          Everything is printed by hand in Baltimore and packed by the band
          between tours. Free shipping in the US over {money(shipping.freeOver)}
          , or pick up your order at the merch table on any show.
        </p>
      </header>

      <section className="wrap" aria-label="Products">
        <div className="toolbar">
          <div className="segmented" role="group" aria-label="Category">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={cat === c}
                onClick={() => setCat(c)}
              >
                {c}
              </button>
            ))}
          </div>
          <label className="select">
            <span>Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
            >
              <option value="featured">Featured</option>
              <option value="low">Price, low to high</option>
              <option value="high">Price, high to low</option>
            </select>
          </label>
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

      <section className="section wrap principles" aria-labelledby="ship">
        <h2 id="ship" className="display-md">
          Shipping & returns
        </h2>
        <dl>
          {shipping.methods.map((m) => (
            <div key={m.id}>
              <dt>
                {m.name} · {m.price ? money(m.price) : "Free"}
              </dt>
              <dd>{m.detail}</dd>
            </div>
          ))}
          <div>
            <dt>Returns</dt>
            <dd>
              Wrong size? Send it back unworn within 30 days and we'll swap it.
              Records are final sale unless they arrive warped.
            </dd>
          </div>
        </dl>
      </section>
    </>
  );
}
