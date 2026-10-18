import { useState } from "react";
import { Search } from "lucide-react";
import {
  capabilities,
  images,
  insights,
  insightsPage,
  type Insight,
} from "../content";
import { InsightItem } from "../components/InsightItem";

const types: ("All" | Insight["type"])[] = [
  "All",
  "Article",
  "Research",
  "Briefing",
];

export function Insights() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<(typeof types)[number]>("All");
  const [cap, setCap] = useState("");
  const [sort, setSort] = useState<"new" | "old" | "short">("new");

  const q = query.trim().toLowerCase();
  const shown = insights
    .filter((p) => type === "All" || p.type === type)
    .filter((p) => !cap || p.capability === cap)
    .filter((p) => !q || `${p.title} ${p.dek}`.toLowerCase().includes(q))
    .sort((a, b) =>
      sort === "short"
        ? a.minutes - b.minutes
        : sort === "old"
          ? a.date.localeCompare(b.date)
          : b.date.localeCompare(a.date),
    );

  const reset = () => {
    setQuery("");
    setType("All");
    setCap("");
  };

  return (
    <>
      <header className="page-head wrap page-head-photo">
        <div>
          <h1 className="display">{insightsPage.title}</h1>
          <p className="lede">{insightsPage.lede}</p>
        </div>
        <figure className="photo">
          <img
            src={images.chart}
            alt="A hand drawing a rising line chart on a whiteboard with a marker."
            width={960}
            height={640}
          />
        </figure>
      </header>

      <section className="wrap section-tight" aria-label="Filter insights">
        <div className="filters">
          <div className="search">
            <label htmlFor="q">Search</label>
            <div className="search-box">
              <Search aria-hidden="true" />
              <input
                id="q"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Pricing, inventory, steering…"
              />
            </div>
          </div>
          <fieldset className="segmented">
            <legend>Format</legend>
            <div>
              {types.map((t) => (
                <button
                  key={t}
                  type="button"
                  aria-pressed={type === t}
                  onClick={() => setType(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </fieldset>
          <div className="field-inline">
            <label htmlFor="cap">Capability</label>
            <select
              id="cap"
              value={cap}
              onChange={(e) => setCap(e.target.value)}
            >
              <option value="">All capabilities</option>
              {capabilities.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className="field-inline">
            <label htmlFor="sort">Sort</label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
            >
              <option value="new">Newest first</option>
              <option value="old">Oldest first</option>
              <option value="short">Shortest read</option>
            </select>
          </div>
        </div>
        <p className="results-count" aria-live="polite">
          <span className="num">{shown.length}</span> of{" "}
          <span className="num">{insights.length}</span> pieces
        </p>

        {shown.length ? (
          <div className="insight-grid">
            {shown.map((p) => (
              <InsightItem key={p.slug} post={p} level={2} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <p>
              Nothing matches “{query || type}”. Try a broader word, or clear
              the filters.
            </p>
            <button type="button" className="btn btn-quiet" onClick={reset}>
              Clear filters
            </button>
          </div>
        )}
      </section>
    </>
  );
}
