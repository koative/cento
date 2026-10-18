import { useState } from "react";
import { X } from "lucide-react";
import { Link } from "../router";
import { pageCopy, productNotes, products, type Need } from "../content";
import { money } from "../lib/plan";
import { toggleProduct, useVisit } from "../lib/visit";
import { ProductItem } from "../components/Tiles";

const needs: ("All" | Need)[] = [
  "All",
  "Colour care",
  "Curls",
  "Repair",
  "Styling",
];
const sorts = {
  shelf: { label: "Shelf order", fn: () => 0 },
  low: {
    label: "Price, low to high",
    fn: (a: { price: number }, b: { price: number }) => a.price - b.price,
  },
  high: {
    label: "Price, high to low",
    fn: (a: { price: number }, b: { price: number }) => b.price - a.price,
  },
};

export function Products() {
  const [need, setNeed] = useState<(typeof needs)[number]>("All");
  const [sort, setSort] = useState<keyof typeof sorts>("shelf");
  const { products: held } = useVisit();
  const shown = products
    .filter((p) => need === "All" || p.need === need)
    .sort(sorts[sort].fn);
  const heldItems = products.filter((p) => held.includes(p.id));

  return (
    <div className="page">
      <header className="page-head wrap">
        <h1>{pageCopy.products.title}</h1>
        <p className="lede">{productNotes.intro}</p>
      </header>

      <div className="wrap filters">
        <div
          className="chips"
          role="group"
          aria-label="Filter by what your hair needs"
        >
          {needs.map((n) => (
            <button
              key={n}
              type="button"
              className="chip"
              aria-pressed={need === n}
              onClick={() => setNeed(n)}
            >
              {n}
            </button>
          ))}
        </div>
        <label className="select-inline">
          <span>Sort</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as keyof typeof sorts)}
          >
            {Object.entries(sorts).map(([k, v]) => (
              <option key={k} value={k}>
                {v.label}
              </option>
            ))}
          </select>
        </label>
        <p className="count" aria-live="polite">
          {shown.length} {shown.length === 1 ? "product" : "products"}
        </p>
      </div>

      <div className="wrap products-layout">
        <div className="product-grid">
          {shown.map((p) => (
            <ProductItem key={p.id} product={p} />
          ))}
        </div>

        <aside className="held" aria-labelledby="held-h">
          <h2 id="held-h">Set aside for your visit</h2>
          {heldItems.length ? (
            <>
              <ul>
                {heldItems.map((p) => (
                  <li key={p.id}>
                    <span>{p.name}</span>
                    <span className="num">{money(p.price)}</span>
                    <button
                      type="button"
                      className="icon-btn"
                      aria-label={`Remove ${p.name}`}
                      onClick={() => toggleProduct(p.id)}
                    >
                      <X aria-hidden="true" size={16} />
                    </button>
                  </li>
                ))}
              </ul>
              <p className="held-total">
                <span>Pay in salon</span>
                <strong className="num">
                  {money(heldItems.reduce((n, p) => n + p.price, 0))}
                </strong>
              </p>
              <Link to="/book" className="btn btn-primary">
                Add to an appointment
              </Link>
            </>
          ) : (
            <p className="muted">
              Nothing yet. Tap “Set aside” on anything you'd like waiting at the
              desk.
            </p>
          )}
          <p className="fine">{productNotes.pickup}</p>
        </aside>
      </div>
    </div>
  );
}
