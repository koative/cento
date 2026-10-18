import { useState } from "react";
import { Search } from "lucide-react";
import {
  coffees,
  kinds,
  processes,
  roasts,
  shop,
  sortOptions,
  type SortValue,
} from "../content";
import { CoffeeCard } from "../components/CoffeeCard";

type Filters = { roast: string[]; kind: string[]; process: string[] };
const none: Filters = { roast: [], kind: [], process: [] };
const groups: { key: keyof Filters; label: string; options: string[] }[] = [
  { key: "roast", label: "Roast", options: roasts },
  { key: "kind", label: "Type", options: kinds },
  { key: "process", label: "Process", options: processes },
];

export function Shop() {
  const [filters, setFilters] = useState<Filters>(none);
  const [sort, setSort] = useState<SortValue>("featured");
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const list = coffees
    .filter(
      (c) =>
        (!filters.roast.length || filters.roast.includes(c.roast)) &&
        (!filters.kind.length || filters.kind.includes(c.kind)) &&
        (!filters.process.length || filters.process.includes(c.process)) &&
        (!q ||
          [c.name, c.origin, c.region, ...c.notes]
            .join(" ")
            .toLowerCase()
            .includes(q)),
    )
    .sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "roast-asc") return a.level - b.level;
      if (sort === "roast-desc") return b.level - a.level;
      return 0;
    });

  const toggle = (key: keyof Filters, value: string) =>
    setFilters((f) => ({
      ...f,
      [key]: f[key].includes(value)
        ? f[key].filter((v) => v !== value)
        : [...f[key], value],
    }));
  const active =
    filters.roast.length +
    filters.kind.length +
    filters.process.length +
    (q ? 1 : 0);

  return (
    <div className="page shop-page">
      <header className="page-head">
        <h1>{shop.title}</h1>
        <p className="lead">{shop.intro}</p>
      </header>

      <div className="shop-tools">
        <div className="shop-search">
          <label htmlFor="shop-q">Search by name, origin or flavour</label>
          <div className="search-input">
            <Search size={18} aria-hidden="true" />
            <input
              id="shop-q"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try “chocolate” or “Kenya”"
            />
          </div>
        </div>
        <div className="shop-sort">
          <label htmlFor="shop-sort">Sort</label>
          <select
            id="shop-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortValue)}
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        {groups.map((g) => (
          <fieldset key={g.key} className="chip-group">
            <legend>{g.label}</legend>
            {g.options.map((o) => (
              <label key={o} className="chip">
                <input
                  type="checkbox"
                  checked={filters[g.key].includes(o)}
                  onChange={() => toggle(g.key, o)}
                />
                {o}
              </label>
            ))}
          </fieldset>
        ))}
      </div>

      <div className="shop-status">
        <p aria-live="polite">
          {list.length} {list.length === 1 ? "coffee" : "coffees"}
        </p>
        {active > 0 && (
          <button
            type="button"
            className="text-button"
            onClick={() => {
              setFilters(none);
              setQuery("");
            }}
          >
            Clear filters
          </button>
        )}
      </div>

      {list.length ? (
        <div className="shop-grid">
          {list.map((c) => (
            <CoffeeCard key={c.id} coffee={c} />
          ))}
        </div>
      ) : (
        <p className="empty">
          Nothing matches those filters. Try removing one, or search for a
          flavour like “honey”.
        </p>
      )}
    </div>
  );
}
