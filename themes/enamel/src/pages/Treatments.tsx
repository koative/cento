import { useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { Link } from "../router";
import { categories, treatments, type Category } from "../content";
import { priceRange } from "../lib/format";

type Sort = "category" | "price-asc" | "price-desc" | "time";
const sorts: Record<Sort, string> = {
  category: "By type",
  "price-asc": "Price, low to high",
  "price-desc": "Price, high to low",
  time: "Shortest first",
};

export function Treatments() {
  const [cat, setCat] = useState<Category | "All">("All");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<Sort>("category");

  const needle = q.trim().toLowerCase();
  const list = treatments
    .filter((t) => cat === "All" || t.category === cat)
    .filter(
      (t) =>
        !needle ||
        `${t.name} ${t.short} ${t.category}`.toLowerCase().includes(needle),
    )
    .sort((a, b) =>
      sort === "price-asc"
        ? a.price - b.price
        : sort === "price-desc"
          ? b.price - a.price
          : sort === "time"
            ? a.minutes - b.minutes
            : categories.indexOf(a.category) - categories.indexOf(b.category),
    );

  return (
    <div className="page">
      <header className="page-head wrap">
        <h1>Treatments</h1>
        <p className="lede">
          {treatments.length} treatments, each with its length, number of visits
          and a price you can plan around. Not sure what you need? Start with a
          check-up — or <Link to="/">mark the tooth on our chart</Link>.
        </p>
      </header>

      <div className="wrap list-tools">
        <div className="chips" role="group" aria-label="Filter by type">
          {(["All", ...categories] as const).map((c) => (
            <button
              key={c}
              type="button"
              className="chip"
              aria-pressed={cat === c}
              onClick={() => setCat(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="tool-row">
          <label className="search">
            <span className="sr-only">Search treatments</span>
            <Search aria-hidden="true" />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search: crown, gums, braces…"
            />
          </label>
          <label className="sort">
            <span>Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
            >
              {Object.entries(sorts).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </select>
          </label>
        </div>
        <p className="result-count" aria-live="polite">
          {list.length} {list.length === 1 ? "treatment" : "treatments"}
        </p>
      </div>

      <section className="wrap" aria-label="Treatment list">
        {list.length === 0 ? (
          <div className="empty">
            <p>
              Nothing matches “{q}”. Try a simpler word like “tooth” or “gum”,
              or call the desk and describe it.
            </p>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => (setQ(""), setCat("All"))}
            >
              Show all treatments
            </button>
          </div>
        ) : (
          <ul className="treat-list">
            {list.map((t) => (
              <li key={t.slug}>
                <Link to={`/treatments/${t.slug}`} className="treat-row">
                  <span className="tr-cat">{t.category}</span>
                  <span className="tr-main">
                    <span className="tr-title">{t.name}</span>
                    <span className="tr-short">{t.short}</span>
                  </span>
                  <span className="tr-time tnum">
                    {t.minutes} min
                    <small>{t.visits}</small>
                  </span>
                  <span className="tr-price tnum">
                    {priceRange(t)}
                    <small>{t.unit}</small>
                  </span>
                  <ArrowRight aria-hidden="true" className="tr-go" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
