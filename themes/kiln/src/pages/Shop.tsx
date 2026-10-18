import { useEffect, useState } from "react";
import {
  categories,
  firing,
  glazes,
  products,
  type CategoryId,
  type GlazeId,
} from "../content";
import { ProductCard } from "../components/ProductCard";
import { Link } from "../router";

type Sort = "featured" | "new" | "low" | "high";

function fromHash() {
  const q = new URLSearchParams(window.location.hash.split("?")[1] ?? "");
  const c = q.get("c");
  const g = q.get("glaze");
  return {
    cat: (categories.some((x) => x.id === c) ? c : "all") as CategoryId | "all",
    glaze: (glazes.some((x) => x.id === g) ? g : "all") as GlazeId | "all",
  };
}

export function Shop() {
  const [cat, setCat] = useState(() => fromHash().cat);
  const [glaze, setGlaze] = useState(() => fromHash().glaze);
  const [ready, setReady] = useState(false);
  const [sort, setSort] = useState<Sort>("featured");

  // Footer and glaze-bench links change only the query, which keeps this page mounted.
  useEffect(() => {
    const sync = () => {
      const next = fromHash();
      setCat(next.cat);
      setGlaze(next.glaze);
    };
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const list = products
    .filter(
      (p) =>
        (cat === "all" || p.category === cat) &&
        (glaze === "all" || p.glazes.includes(glaze)) &&
        (!ready || p.stock !== "made"),
    )
    .sort((a, b) =>
      sort === "low"
        ? a.price - b.price
        : sort === "high"
          ? b.price - a.price
          : sort === "new"
            ? b.added.localeCompare(a.added)
            : 0,
    );

  function clear() {
    setCat("all");
    setGlaze("all");
    setReady(false);
  }

  return (
    <div className="page shop">
      <header className="page-head">
        <h1>Shop</h1>
        <p className="lead">
          Everything on the shelf after the last firing, plus a few pieces we
          make to order. {firing.madeToOrder}
        </p>
      </header>
      <div className="shop-layout">
        <aside className="filters" aria-label="Filter and sort">
          <fieldset>
            <legend>Category</legend>
            <div className="chips">
              {[{ id: "all" as const, label: "Everything" }, ...categories].map(
                (c) => (
                  <label key={c.id} className="chip">
                    <input
                      type="radio"
                      name="cat"
                      checked={cat === c.id}
                      onChange={() => setCat(c.id)}
                    />
                    <span>{c.label}</span>
                  </label>
                ),
              )}
            </div>
          </fieldset>
          <fieldset>
            <legend>Glaze</legend>
            <div className="swatches">
              <label className="swatch">
                <input
                  type="radio"
                  name="glaze"
                  checked={glaze === "all"}
                  onChange={() => setGlaze("all")}
                />
                <span>
                  <i className="swatch-any" aria-hidden="true" />
                  Any glaze
                </span>
              </label>
              {glazes.map((g) => (
                <label key={g.id} className="swatch">
                  <input
                    type="radio"
                    name="glaze"
                    checked={glaze === g.id}
                    onChange={() => setGlaze(g.id)}
                  />
                  <span>
                    <i
                      style={{ background: g.color, borderColor: g.edge }}
                      aria-hidden="true"
                    />
                    {g.name}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
          <label className="check">
            <input
              type="checkbox"
              checked={ready}
              onChange={(e) => setReady(e.target.checked)}
            />
            Ready to ship only
          </label>
        </aside>
        <div className="shop-results">
          <div className="results-bar">
            <p aria-live="polite">
              {list.length} {list.length === 1 ? "object" : "objects"}
            </p>
            <h2 className="visually-hidden">Objects</h2>
            <label className="sort">
              Sort by
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
              >
                <option value="featured">Studio order</option>
                <option value="new">Newest firing</option>
                <option value="low">Price, low to high</option>
                <option value="high">Price, high to low</option>
              </select>
            </label>
          </div>
          {list.length ? (
            <div className="object-grid object-grid-3">
              {list.map((p, i) => (
                <ProductCard key={p.id} product={p} lazy={i > 2} />
              ))}
            </div>
          ) : (
            <div className="empty">
              <h2>Nothing on the shelf like that</h2>
              <p>
                Try another glaze, or have exactly that combination made on the{" "}
                <Link to="/glazes">glaze bench</Link>.
              </p>
              <button type="button" className="btn btn-ghost" onClick={clear}>
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
