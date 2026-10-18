import { useState } from "react";
import {
  images,
  pickup,
  productKinds,
  products,
  type ProductKind,
} from "../content";
import { ProductTile } from "../components/Tiles";

type Sort = "featured" | "price-asc" | "price-desc";

export function Shop() {
  const [kind, setKind] = useState<ProductKind | "all">("all");
  const [sort, setSort] = useState<Sort>("featured");
  const low = (p: (typeof products)[number]) =>
    Math.min(...p.variants.map((v) => v.price));
  const list = products
    .filter((p) => kind === "all" || p.kind === kind)
    .sort((a, b) =>
      sort === "price-asc"
        ? low(a) - low(b)
        : sort === "price-desc"
          ? low(b) - low(a)
          : 0,
    );

  return (
    <>
      <header className="page-head wrap page-head-split">
        <div>
          <h1>Shop for pickup</h1>
          <p className="lede">
            Fresh cans off our own line, bottle pre-orders and the glassware
            from behind the bar. Order here, collect at the taproom.
          </p>
          <p className="status-line">
            <strong>{pickup.title}.</strong> {pickup.text}
          </p>
        </div>
        <figure className="page-head-figure">
          <img
            src={images.canning}
            alt="Empty aluminium cans riding a steel rail into the canning line"
            width={1400}
            height={1050}
          />
        </figure>
      </header>

      <div className="wrap page-end">
        <div className="filters" role="search" aria-label="Filter products">
          <fieldset className="chips">
            <legend className="sr-only">Product type</legend>
            {[{ id: "all" as const, label: "Everything" }, ...productKinds].map(
              (k) => (
                <label key={k.id} className="chip">
                  <input
                    type="radio"
                    name="kind"
                    checked={kind === k.id}
                    onChange={() => setKind(k.id)}
                  />
                  <span>{k.label}</span>
                </label>
              ),
            )}
          </fieldset>
          <div className="filter-row">
            <label className="select">
              <span>Sort</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price, low to high</option>
                <option value="price-desc">Price, high to low</option>
              </select>
            </label>
          </div>
        </div>
        <p className="result-count" aria-live="polite">
          {list.length} {list.length === 1 ? "item" : "items"}
        </p>
        <div className="product-grid">
          {list.map((p) => (
            <ProductTile key={p.id} product={p} headingLevel={2} />
          ))}
        </div>
      </div>
    </>
  );
}
