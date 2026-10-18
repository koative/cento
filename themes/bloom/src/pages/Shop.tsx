import { useState } from "react";
import {
  colours,
  occasions,
  products,
  productTypes,
  sortOptions,
  type Colour,
} from "../content";
import { ProductCard } from "../components/ProductCard";
import { Link } from "../router";

type Sort = (typeof sortOptions)[number]["id"];
const fromPrice = (sizes: { price: number }[]) =>
  Math.min(...sizes.map((s) => s.price));

export function Shop() {
  const [type, setType] = useState("All");
  const [picked, setPicked] = useState<Colour[]>([]);
  const [occasion, setOccasion] = useState("");
  const [sort, setSort] = useState<Sort>("featured");

  const list = products
    .filter((p) => type === "All" || p.type === type)
    .filter((p) => !picked.length || picked.includes(p.colour))
    .filter(
      (p) =>
        !occasion ||
        p.occasions.includes(occasion as (typeof occasions)[number]),
    )
    .sort((a, b) => {
      if (sort === "price-asc") return fromPrice(a.sizes) - fromPrice(b.sizes);
      if (sort === "price-desc") return fromPrice(b.sizes) - fromPrice(a.sizes);
      if (sort === "name") return a.name.localeCompare(b.name);
      return a.featured - b.featured;
    });

  const filtered = type !== "All" || picked.length > 0 || occasion !== "";
  const reset = () => {
    setType("All");
    setPicked([]);
    setOccasion("");
  };

  return (
    <>
      <header className="page-head">
        <h1>Shop flowers</h1>
        <p className="lead">
          Hand-tied bouquets, vase arrangements, dried bunches and flowering
          plants. Everything is made to order on the morning it leaves the
          studio.
        </p>
      </header>

      <div className="shop">
        <aside className="filters" aria-label="Filter flowers">
          <fieldset>
            <legend>Kind</legend>
            <div className="pill-row">
              {["All", ...productTypes].map((t) => (
                <label key={t} className="pill">
                  <input
                    type="radio"
                    name="kind"
                    value={t}
                    checked={type === t}
                    onChange={() => setType(t)}
                  />
                  <span>{t === "All" ? "Everything" : t}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend>Colour</legend>
            <div className="swatch-row">
              {colours.map((c) => (
                <label key={c.id} className="swatch">
                  <input
                    type="checkbox"
                    checked={picked.includes(c.id)}
                    onChange={(e) =>
                      setPicked(
                        e.target.checked
                          ? [...picked, c.id]
                          : picked.filter((x) => x !== c.id),
                      )
                    }
                  />
                  <span
                    className="swatch-chip"
                    style={{ background: c.swatch }}
                    aria-hidden="true"
                  />
                  <span>{c.id}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <div className="field">
            <label htmlFor="occasion">Occasion</label>
            <select
              id="occasion"
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
            >
              <option value="">Any occasion</option>
              {occasions.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
          {filtered && (
            <button type="button" className="text-button" onClick={reset}>
              Clear filters
            </button>
          )}
        </aside>

        <section className="shop-results" aria-labelledby="results-count">
          <div className="results-bar">
            <p id="results-count" aria-live="polite">
              {list.length} {list.length === 1 ? "arrangement" : "arrangements"}
            </p>
            <div className="field field-inline">
              <label htmlFor="sort">Sort</label>
              <select
                id="sort"
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
              >
                {sortOptions.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {list.length ? (
            <div className="product-grid product-grid-3">
              {list.map((p, i) => (
                <ProductCard key={p.id} product={p} eager={i < 3} />
              ))}
            </div>
          ) : (
            <div className="empty">
              <h2>Nothing in that combination today.</h2>
              <p>
                Try another colour, or{" "}
                <Link to="/builder">build a bouquet</Link> from exactly the
                stems you want.
              </p>
              <button type="button" className="btn btn-ghost" onClick={reset}>
                Show everything
              </button>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
