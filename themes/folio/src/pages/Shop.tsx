import { useState } from "react";
import { images, shipping, shop, type ShopKind } from "../content";
import { money } from "../lib/format";
import { ShopCard } from "../components/Cards";

const kinds: (ShopKind | "All")[] = ["All", "Editions", "Books", "Posters"];
type Sort = "new" | "low" | "high";

export function Shop() {
  const [kind, setKind] = useState<ShopKind | "All">("All");
  const [sort, setSort] = useState<Sort>("new");
  const shown = shop
    .filter((s) => kind === "All" || s.kind === kind)
    .sort((a, b) =>
      sort === "low"
        ? a.price - b.price
        : sort === "high"
          ? b.price - a.price
          : b.added.localeCompare(a.added),
    );

  return (
    <div className="page">
      <header className="page-head shop-head">
        <div>
          <h1 className="display">Editions &amp; books</h1>
          <p className="lede">
            Signed editions made with our artists, and the books we publish
            alongside every exhibition. Delivery is {money(shipping.flat)} in
            the US and free over {money(shipping.freeOver)}, or collect from the
            front desk.
          </p>
        </div>
        <img
          src={images.studio}
          alt="A crowded studio table of paint tins, jars and brushes"
          width={1600}
          height={1067}
        />
      </header>

      <div className="vr-tools">
        <div className="filter-bar" role="group" aria-label="Show">
          {kinds.map((k) => (
            <button
              key={k}
              type="button"
              className="chip"
              aria-pressed={kind === k}
              onClick={() => setKind(k)}
            >
              {k}
            </button>
          ))}
        </div>
        <label className="select">
          <span>Sort</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
          >
            <option value="new">Newest first</option>
            <option value="low">Price, low to high</option>
            <option value="high">Price, high to low</option>
          </select>
        </label>
      </div>
      <p className="visually-hidden" aria-live="polite">
        {shown.length} items shown
      </p>

      <div className="shop-grid shop-grid-full">
        {shown.map((item) => (
          <ShopCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
