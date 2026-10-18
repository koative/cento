import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import {
  categories,
  menu,
  menuSorts,
  tagLabels,
  type CategoryId,
  type Tag,
} from "../content";
import { kcalOf, priceOf } from "../lib";
import { MenuCard } from "../components/MenuCard";

type Sort = (typeof menuSorts)[number]["id"];
const filterTags: Tag[] = ["veg", "spicy", "gf"];

export function Menu() {
  const [cat, setCat] = useState<CategoryId | "all">("all");
  const [tags, setTags] = useState<Tag[]>([]);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("board");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = menu.filter(
      (m) =>
        (cat === "all" || m.category === cat) &&
        tags.every((t) => m.tags.includes(t)) &&
        (!q || `${m.name} ${m.blurb}`.toLowerCase().includes(q)),
    );
    const by: Record<
      Sort,
      (a: (typeof menu)[number], b: (typeof menu)[number]) => number
    > = {
      board: () => 0,
      popular: (a, b) => a.rank - b.rank,
      "price-asc": (a, b) => priceOf(a) - priceOf(b),
      "price-desc": (a, b) => priceOf(b) - priceOf(a),
      kcal: (a, b) => kcalOf(a) - kcalOf(b),
    };
    return [...list].sort(by[sort]);
  }, [cat, tags, query, sort]);

  const grouped = sort === "board";
  const reset = () => (setCat("all"), setTags([]), setQuery(""));

  return (
    <div className="page menu-page">
      <header className="page-head wrap">
        <h1>Menu</h1>
        <p className="lede">
          Fewer than twenty things, all cooked to order. Tap any item to change
          it, or hit Add for the house build.
        </p>
      </header>

      <div className="filters-bar">
        <div className="wrap filters">
          <div className="cat-tabs" role="group" aria-label="Category">
            {[{ id: "all" as const, label: "Everything" }, ...categories].map(
              (c) => (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={cat === c.id}
                  onClick={() => setCat(c.id)}
                >
                  {c.label}
                </button>
              ),
            )}
          </div>
          <div className="filter-row">
            <label className="search">
              <Search aria-hidden="true" />
              <span className="sr-only">Search the menu</span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search: bacon, honey, malt…"
              />
            </label>
            <div className="tag-toggles" role="group" aria-label="Dietary">
              {filterTags.map((t) => (
                <label key={t} className="chip">
                  <input
                    type="checkbox"
                    checked={tags.includes(t)}
                    onChange={() =>
                      setTags((cur) =>
                        cur.includes(t)
                          ? cur.filter((x) => x !== t)
                          : [...cur, t],
                      )
                    }
                  />
                  {tagLabels[t]}
                </label>
              ))}
            </div>
            <label className="sort">
              <span>Sort</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
              >
                {menuSorts.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </div>

      <div className="wrap menu-results">
        <p className="result-count" aria-live="polite">
          {results.length} {results.length === 1 ? "item" : "items"}
        </p>

        {results.length === 0 && (
          <div className="empty">
            <h2>Nothing on the board matches that.</h2>
            <p>
              Try fewer filters, or search for something simpler like “cheese”.
            </p>
            <button type="button" className="btn btn-primary" onClick={reset}>
              Clear filters
            </button>
          </div>
        )}

        {grouped
          ? categories
              .filter((c) => results.some((m) => m.category === c.id))
              .map((c) => (
                <section
                  key={c.id}
                  className="menu-section"
                  aria-labelledby={`cat-${c.id}`}
                >
                  <div className="menu-section-head">
                    <h2 id={`cat-${c.id}`}>{c.label}</h2>
                    <p>{c.note}</p>
                  </div>
                  <div className="card-grid">
                    {results
                      .filter((m) => m.category === c.id)
                      .map((m) => (
                        <MenuCard key={m.id} item={m} />
                      ))}
                  </div>
                </section>
              ))
          : results.length > 0 && (
              <section aria-label="Sorted results">
                <h2 className="sr-only">Results</h2>
                <div className="card-grid">
                  {results.map((m) => (
                    <MenuCard key={m.id} item={m} />
                  ))}
                </div>
              </section>
            )}
      </div>
    </div>
  );
}
