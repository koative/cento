import { useState } from "react";
import { Link } from "../router";
import { guides, guidesPage, guideTopics } from "../content";
import { DocsLayout } from "../components/DocsLayout";

const LEVELS = ["Any level", "Beginner", "Intermediate", "Advanced"];
const SORTS = {
  order: "Reading order",
  recent: "Recently updated",
  short: "Shortest first",
};

export default function Guides() {
  const [topic, setTopic] = useState("All");
  const [level, setLevel] = useState(LEVELS[0]);
  const [sort, setSort] = useState<keyof typeof SORTS>("order");

  const shown = guides
    .filter(
      (g) =>
        (topic === "All" || g.topic === topic) &&
        (level === LEVELS[0] || g.level === level),
    )
    .sort((a, b) =>
      sort === "recent"
        ? b.updated.localeCompare(a.updated)
        : sort === "short"
          ? a.minutes - b.minutes
          : 0,
    );

  return (
    <DocsLayout>
      <article className="doc">
        <header className="doc-head">
          <h1>{guidesPage.h1}</h1>
          <p className="lead">{guidesPage.lead}</p>
        </header>

        <div className="filters">
          <div role="group" aria-label="Topic" className="chips">
            {["All", ...guideTopics].map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={topic === t}
                onClick={() => setTopic(t)}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="filter-selects">
            <label>
              Level
              <select value={level} onChange={(e) => setLevel(e.target.value)}>
                {LEVELS.map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>
            </label>
            <label>
              Sort
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as keyof typeof SORTS)}
              >
                {Object.entries(SORTS).map(([v, l]) => (
                  <option key={v} value={v}>
                    {l}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <p className="result-count" role="status">
          {shown.length} {shown.length === 1 ? "guide" : "guides"}
        </p>

        {shown.length ? (
          <ol className="guide-list">
            {shown.map((g) => (
              <li key={g.slug}>
                <Link to={`/guides/${g.slug}`}>
                  <span className="guide-title">{g.title}</span>
                  <span className="guide-summary">{g.summary}</span>
                  <span className="guide-meta">
                    <span>{g.topic}</span>
                    <span>{g.level}</span>
                    <span className="tabular">{g.minutes} min</span>
                    <span>
                      Updated <time dateTime={g.updated}>{g.updated}</time>
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        ) : (
          <div className="empty">
            <p>
              No {level.toLowerCase()} guides in {topic} yet.
            </p>
            <button
              type="button"
              className="btn btn-quiet"
              onClick={() => {
                setTopic("All");
                setLevel(LEVELS[0]);
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </article>
    </DocsLayout>
  );
}
