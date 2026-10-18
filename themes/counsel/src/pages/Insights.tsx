import { useState } from "react";
import { Search } from "lucide-react";
import { areas, insights, type Insight } from "../content";
import { PageHead } from "../components/PageHead";
import { InsightList } from "../components/InsightList";
import { Closing } from "../components/Closing";

const types: (Insight["type"] | "All")[] = [
  "All",
  "Briefing",
  "Analysis",
  "Guide",
];

export function Insights() {
  const [type, setType] = useState<Insight["type"] | "All">("All");
  const [area, setArea] = useState("all");
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const shown = insights.filter(
    (i) =>
      (type === "All" || i.type === type) &&
      (area === "all" || i.area === area) &&
      (!q || (i.title + " " + i.standfirst).toLowerCase().includes(q)),
  );

  return (
    <>
      <PageHead
        title="Insights"
        lede="Briefings when the law changes, analysis when it matters to a deal, and guides for the questions clients ask us most."
      />

      <section className="wrap section-tight" aria-label="Insights archive">
        <div className="filters">
          <div className="field field-search">
            <label htmlFor="insights-q">Search insights</label>
            <div className="input-icon">
              <Search size={16} aria-hidden="true" />
              <input
                id="insights-q"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. lease, trust, non-compete"
              />
            </div>
          </div>
          <div className="field">
            <label htmlFor="insights-area">Practice area</label>
            <select
              id="insights-area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
            >
              <option value="all">All practice areas</option>
              {areas.map((a) => (
                <option key={a.slug} value={a.slug}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>
          <div className="segmented" role="group" aria-label="Type">
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
        </div>

        <p className="result-count" aria-live="polite">
          {shown.length} of {insights.length} pieces
        </p>

        {shown.length ? (
          <InsightList items={shown} level={2} />
        ) : (
          <div className="empty">
            <p>
              Nothing matches yet. Try a broader word, or clear the filters.
            </p>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => {
                setType("All");
                setArea("all");
                setQuery("");
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      <Closing />
    </>
  );
}
