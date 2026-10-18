import { useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { Link } from "../router";
import { customers, stories, type Story } from "../content";
import { metricLine } from "../components/format";

const industries = ["All", ...new Set(stories.map((s) => s.industry))];
const sorts: Record<string, (a: Story, b: Story) => number> = {
  "Newest customers": (a, b) => b.since - a.since,
  "Longest with Signal": (a, b) => a.since - b.since,
  "Company A–Z": (a, b) => a.company.localeCompare(b.company),
};

export default function Customers() {
  const [industry, setIndustry] = useState("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState(Object.keys(sorts)[0]);

  const q = query.trim().toLowerCase();
  const list = stories
    .filter((s) => industry === "All" || s.industry === industry)
    .filter(
      (s) =>
        !q ||
        [s.company, s.headline, s.summary, s.stack.join(" ")]
          .join(" ")
          .toLowerCase()
          .includes(q),
    )
    .sort(sorts[sort]);

  return (
    <>
      <header className="page-head wrap">
        <h1>{customers.heading}</h1>
        <p className="lede">{customers.intro}</p>
      </header>

      <section className="wrap section-tight" aria-label="Customer stories">
        <div className="toolbar">
          <div className="chips" role="group" aria-label="Filter by industry">
            {industries.map((i) => (
              <button
                key={i}
                type="button"
                aria-pressed={industry === i}
                onClick={() => setIndustry(i)}
              >
                {i}
              </button>
            ))}
          </div>
          <div className="toolbar-right">
            <label className="search">
              <Search size={16} aria-hidden />
              <span className="visually-hidden">Search stories</span>
              <input
                type="search"
                placeholder="Search stories or stack"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
            <label className="select-inline">
              <span>Sort</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                {Object.keys(sorts).map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
          </div>
        </div>
        <p className="result-count" aria-live="polite">
          {list.length} {list.length === 1 ? "story" : "stories"}
        </p>

        {list.length ? (
          <ul className="story-grid">
            {list.map((s) => (
              <li key={s.slug}>
                <Link to={`/customers/${s.slug}`} className="story-card">
                  <span className="story-top">
                    <span className="monogram" aria-hidden>
                      {s.company[0]}
                    </span>
                    <span>
                      <strong>{s.company}</strong>
                      <small>{s.description}</small>
                    </span>
                  </span>
                  <span className="story-card-headline">{s.headline}</span>
                  <span className="story-metric">
                    <span>{s.metric.label}</span>
                    <strong className="num">{metricLine(s.metric)}</strong>
                  </span>
                  <span className="story-meta">
                    {s.industry} · {s.plan} plan · since {s.since}
                    <ArrowRight size={16} aria-hidden />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty-state">
            <p>
              No stories match “{query}” in{" "}
              {industry === "All" ? "any industry" : industry}.
            </p>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => {
                setQuery("");
                setIndustry("All");
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      <section className="wrap section price-teaser">
        <h2>{customers.closeTitle}</h2>
        <div className="actions">
          <Link to="/demo" className="btn btn-primary btn-lg">
            Book a demo
          </Link>
          <Link to="/app" className="text-link">
            Or explore the demo workspace <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
      </section>
    </>
  );
}
