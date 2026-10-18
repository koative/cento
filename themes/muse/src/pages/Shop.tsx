import { useEffect, useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { categories, products, type CategoryId } from "../content";
import { ProductCard } from "../components/ProductCard";

type Sort = "featured" | "new" | "price-asc" | "price-desc";

const sorts: { id: Sort; label: string }[] = [
  { id: "featured", label: "As shown in the collection" },
  { id: "new", label: "New first" },
  { id: "price-asc", label: "Price, low to high" },
  { id: "price-desc", label: "Price, high to low" },
];

const allColours = [
  ...new Map(
    products.flatMap((p) => p.colours).map((c) => [c.name, c]),
  ).values(),
];
const sizesOf = (shoes: boolean) => [
  ...new Set(
    products
      .filter((p) => (p.category === "shoes") === shoes && p.sizes.length > 1)
      .flatMap((p) => p.sizes),
  ),
];
const sizeGroups = [
  { label: "Clothing (FR)", system: "fr", sizes: sizesOf(false) },
  { label: "Shoes (EU)", system: "eu", sizes: sizesOf(true) },
];

/** size is "fr:38" or "eu:38": FR 38 and EU 38 are different garments. */
function fits(p: (typeof products)[number], size: string) {
  const [system, s] = size.split(":");
  return (
    (system === "eu") === (p.category === "shoes") &&
    p.sizes.includes(s) &&
    !p.soldOut?.includes(s)
  );
}

function categoryFromHash(): CategoryId | "" {
  const c = new URLSearchParams(window.location.hash.split("?")[1] ?? "").get(
    "c",
  );
  return categories.some((x) => x.id === c) ? (c as CategoryId) : "";
}

export function Shop() {
  const [category, setCategory] = useState(categoryFromHash);
  const [colours, setColours] = useState<string[]>([]);
  const [size, setSize] = useState("");
  const [sort, setSort] = useState<Sort>("featured");
  const [panel, setPanel] = useState(false);

  // Footer and home links change only the query (?c=), which the router does not treat as a new page.
  useEffect(() => {
    const sync = () => setCategory(categoryFromHash());
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  function pickCategory(c: CategoryId | "") {
    setCategory(c);
    history.replaceState(null, "", c ? `#/shop?c=${c}` : "#/shop");
  }

  const list = useMemo(() => {
    const found = products.filter(
      (p) =>
        (!category || p.category === category) &&
        (!colours.length || p.colours.some((c) => colours.includes(c.name))) &&
        (!size || fits(p, size)),
    );
    if (sort === "new")
      return [...found].sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew));
    if (sort === "price-asc")
      return [...found].sort((a, b) => a.price - b.price);
    if (sort === "price-desc")
      return [...found].sort((a, b) => b.price - a.price);
    return found;
  }, [category, colours, size, sort]);

  const active = (category ? 1 : 0) + colours.length + (size ? 1 : 0);
  const current = categories.find((c) => c.id === category);

  function clear() {
    pickCategory("");
    setColours([]);
    setSize("");
  }

  return (
    <div className="page shop-page">
      <header className="page-head shop-head">
        <h1 className="display">{current ? current.label : "The shop"}</h1>
        <p className="lede">
          {current
            ? current.line
            : "The full Autumn / Winter 2026 collection. Every piece made in small runs, with free alterations in store."}
        </p>
      </header>

      <div className="category-tabs" role="group" aria-label="Category">
        <button
          type="button"
          aria-pressed={!category}
          onClick={() => pickCategory("")}
        >
          Everything
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            aria-pressed={category === c.id}
            onClick={() => pickCategory(c.id)}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="shop-layout">
        <div className="shop-tools">
          <button
            type="button"
            className="btn btn-line filter-toggle"
            aria-expanded={panel}
            aria-controls="filters"
            onClick={() => setPanel(!panel)}
          >
            <SlidersHorizontal size={16} aria-hidden="true" /> Filter
            {active ? ` (${active})` : ""}
          </button>
          <div className="sort">
            <label htmlFor="sort">Sort</label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
            >
              {sorts.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <aside
          id="filters"
          className="filters"
          data-open={panel || undefined}
          aria-label="Filters"
        >
          <fieldset>
            <legend>Colour</legend>
            {allColours.map((c) => (
              <label key={c.name} className="check">
                <input
                  type="checkbox"
                  checked={colours.includes(c.name)}
                  onChange={(e) =>
                    setColours(
                      e.target.checked
                        ? [...colours, c.name]
                        : colours.filter((x) => x !== c.name),
                    )
                  }
                />
                <span
                  className="swatch"
                  style={{ background: c.hex }}
                  aria-hidden="true"
                />
                {c.name}
              </label>
            ))}
          </fieldset>
          <div className="filter-size">
            <label htmlFor="size-filter">Size in stock</label>
            <select
              id="size-filter"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              <option value="">Any size</option>
              {sizeGroups.map((g) => (
                <optgroup key={g.system} label={g.label}>
                  {g.sizes.map((s) => (
                    <option key={s} value={`${g.system}:${s}`}>
                      {g.system.toUpperCase()} {s}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
          {active > 0 && (
            <button type="button" className="text-button" onClick={clear}>
              Clear all filters
            </button>
          )}
        </aside>

        <section className="shop-results" aria-labelledby="results-count">
          <p id="results-count" className="results-count" aria-live="polite">
            {list.length} {list.length === 1 ? "piece" : "pieces"}
          </p>
          {list.length ? (
            <div className="product-grid">
              {list.map((p, i) => (
                <ProductCard key={p.id} product={p} eager={i < 3} />
              ))}
            </div>
          ) : (
            <div className="empty">
              <h2>Nothing in that combination</h2>
              <p>
                Try another colour or size, or clear the filters to see all{" "}
                {products.length} pieces.
              </p>
              <button type="button" className="btn btn-ink" onClick={clear}>
                Clear filters
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
