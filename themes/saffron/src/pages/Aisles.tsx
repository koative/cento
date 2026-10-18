import { useState } from "react";
import { Search } from "lucide-react";
import { Link } from "../router";
import {
  aisles,
  products,
  tags,
  type Aisle,
  type Product,
  type Tag,
} from "../content";
import { ProductCard } from "../components/Shelf";

const sorts: Record<
  string,
  { label: string; fn: (a: Product, b: Product) => number }
> = {
  pick: { label: "Market pick", fn: (a, b) => a.rank - b.rank },
  low: {
    label: "Price, low to high",
    fn: (a, b) => a.variants[0].price - b.variants[0].price,
  },
  high: {
    label: "Price, high to low",
    fn: (a, b) => b.variants[0].price - a.variants[0].price,
  },
  near: {
    label: "Nearest grower",
    fn: (a, b) => (a.miles ?? 9999) - (b.miles ?? 9999),
  },
  name: { label: "A to Z", fn: (a, b) => a.name.localeCompare(b.name) },
};

export function Aisles({ aisle }: { aisle?: Aisle }) {
  const [query, setQuery] = useState("");
  const [picked, setPicked] = useState<Tag[]>([]);
  const [sort, setSort] = useState("pick");

  const q = query.trim().toLowerCase();
  const shown = products
    .filter((p) => !aisle || p.aisle === aisle.id)
    .filter((p) => picked.every((t) => p.tags.includes(t)))
    .filter(
      (p) => !q || `${p.name} ${p.grower} ${p.blurb}`.toLowerCase().includes(q),
    )
    .sort(sorts[sort].fn);

  const toggle = (t: Tag) =>
    setPicked(
      picked.includes(t) ? picked.filter((x) => x !== t) : [...picked, t],
    );
  const reset = () => {
    setQuery("");
    setPicked([]);
  };

  return (
    <div className="page aisles-page">
      <header className="page-head" data-tone={aisle?.id}>
        <h1>{aisle ? aisle.name : "Every aisle"}</h1>
        <p className="lede">
          {aisle
            ? aisle.blurb
            : "Twenty things we would put in our own basket this week, from the field, the bakehouse, the boats and the pantry shelf."}
        </p>
      </header>

      <nav className="aisle-tabs" aria-label="Aisles">
        <Link to="/aisles">All</Link>
        {aisles.map((a) => (
          <Link key={a.id} to={"/aisles/" + a.id} data-tone={a.id}>
            {a.short}
          </Link>
        ))}
      </nav>

      <div className="filters" role="search">
        <div className="search-field">
          <label htmlFor="aisle-search" className="visually-hidden">
            Search {aisle ? aisle.name.toLowerCase() : "all aisles"}
          </label>
          <Search size={18} aria-hidden="true" />
          <input
            id="aisle-search"
            type="search"
            placeholder={
              aisle
                ? `Search ${aisle.short.toLowerCase()}`
                : "Search tomatoes, sourdough, saffron…"
            }
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <fieldset className="tag-filter">
          <legend className="visually-hidden">Only show</legend>
          {tags.map((t) => (
            <label key={t} className="chip">
              <input
                type="checkbox"
                checked={picked.includes(t)}
                onChange={() => toggle(t)}
              />
              {t}
            </label>
          ))}
        </fieldset>
        <div className="sort-field">
          <label htmlFor="aisle-sort">Sort</label>
          <select
            id="aisle-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            {Object.entries(sorts).map(([k, s]) => (
              <option key={k} value={k}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="result-count" aria-live="polite">
        {shown.length} {shown.length === 1 ? "item" : "items"}
        {picked.length ? ` · ${picked.join(", ")}` : ""}
      </p>

      {shown.length ? (
        <div className="product-grid">
          {shown.map((p, i) => (
            <ProductCard product={p} key={p.id} eager={i < 4} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>Nothing on this shelf matches</h2>
          <p>
            Try fewer filters, or search for something simpler like "tomato".
          </p>
          <button type="button" className="btn btn-ghost" onClick={reset}>
            Clear search and filters
          </button>
        </div>
      )}
    </div>
  );
}
