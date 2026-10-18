import { useState } from "react";
import { Search } from "lucide-react";
import { Link } from "../router";
import { categories, connectors } from "../content";
import { ConnectorMark } from "../components/Marks";

export default function Integrations() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("popular");

  const q = query.trim().toLowerCase();
  const shown = connectors
    .filter((c) => category === "All" || c.category === category)
    .filter(
      (c) =>
        !q ||
        [c.name, c.blurb, ...c.triggers, ...c.actions].some((t) =>
          t.toLowerCase().includes(q),
        ),
    )
    .sort((a, b) =>
      sort === "name"
        ? a.name.localeCompare(b.name)
        : b.workspaces - a.workspaces,
    );

  return (
    <>
      <header className="page-head wrap">
        <h1>Integrations</h1>
        <p className="lede">
          {connectors.length} connectors, each with its exact triggers and
          actions listed. If a tool is missing, the webhook connector catches
          and sends anything that speaks HTTP.
        </p>
      </header>
      <section className="wrap directory" aria-label="Integration directory">
        <div className="filters">
          <label className="search">
            <Search size={18} aria-hidden />
            <span className="sr-only">Search integrations</span>
            <input
              type="search"
              placeholder="Search apps, triggers, actions"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
          <label className="sort">
            Sort by
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="popular">Most used</option>
              <option value="name">Name, A–Z</option>
            </select>
          </label>
        </div>
        <div className="chips" role="group" aria-label="Category">
          {["All", ...categories].map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <p className="result-count" aria-live="polite">
          {shown.length === 1 ? "1 connector" : `${shown.length} connectors`}
          {category !== "All" && ` in ${category}`}
          {q && ` matching “${query.trim()}”`}
        </p>
        {shown.length ? (
          <ul className="connector-grid">
            {shown.map((c) => (
              <li key={c.slug} className="connector-item">
                <ConnectorMark slug={c.slug} size={44} />
                <div>
                  <h2>
                    <Link to={`/integrations/${c.slug}`} className="stretch">
                      {c.name}
                    </Link>
                  </h2>
                  <p>{c.blurb}</p>
                  <p className="connector-meta">
                    {c.category} · {c.triggers.length} triggers ·{" "}
                    {c.actions.length} actions · {c.plan}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty">
            <p>
              No connector matches that. Try a broader word, or use Webhooks for
              any tool with an API.
            </p>
            <button
              type="button"
              className="btn btn-line"
              onClick={() => {
                setQuery("");
                setCategory("All");
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
    </>
  );
}
