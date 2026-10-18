import { useState } from "react";
import { Search } from "lucide-react";
import { Link } from "../router";
import { articles, topics, type Topic } from "../content";
import { ArticleRow } from "../components/Bits";

const byDate = [...articles].sort((a, b) => b.date.localeCompare(a.date));

export function Resources() {
  const [topic, setTopic] = useState<Topic | "All">("All");
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const shown = byDate.filter(
    (a) =>
      (topic === "All" || a.topic === topic) &&
      (!q ||
        `${a.title} ${a.dek} ${a.topic} ${a.format}`.toLowerCase().includes(q)),
  );
  const filtered = topic !== "All" || !!q;

  return (
    <>
      <header className="page-head wrap">
        <h1>Resources</h1>
        <p className="lede">
          Guides, checklists and plain-English explainers from the people who
          file the returns. Written for owners, not accountants.
        </p>
      </header>

      <div className="wrap res-tools">
        <fieldset className="chips">
          <legend className="sr-only">Topic</legend>
          {(["All", ...topics] as const).map((t) => (
            <label key={t}>
              <input
                type="radio"
                name="topic"
                checked={topic === t}
                onChange={() => setTopic(t)}
              />
              <span>{t}</span>
            </label>
          ))}
        </fieldset>
        <div className="search">
          <label htmlFor="res-q" className="sr-only">
            Search resources
          </label>
          <Search aria-hidden="true" />
          <input
            id="res-q"
            type="search"
            placeholder="Search, e.g. 1099 or payroll"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      <p className="wrap fine res-count" aria-live="polite">
        {shown.length} of {articles.length}{" "}
        {articles.length === 1 ? "resource" : "resources"}
        {topic !== "All" ? ` in ${topic}` : ""}
        {q ? ` matching “${query.trim()}”` : ""}
      </p>

      <section className="wrap section res-list" aria-label="Articles">
        {shown.length === 0 ? (
          <div className="empty">
            <p>Nothing matches that yet.</p>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => {
                setTopic("All");
                setQuery("");
              }}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            {!filtered && (
              <Link to={`/resources/${shown[0].slug}`} className="res-feature">
                <span className="ar-meta">
                  Latest · {shown[0].topic} · {shown[0].format}
                </span>
                <span className="rf-title">{shown[0].title}</span>
                <span className="ar-dek">{shown[0].dek}</span>
                <span className="ar-foot">
                  {shown[0].author} · {shown[0].minutes} min read
                </span>
              </Link>
            )}
            <ul className="article-list is-stack">
              {(filtered ? shown : shown.slice(1)).map((a) => (
                <ArticleRow key={a.slug} a={a} />
              ))}
            </ul>
          </>
        )}
      </section>

      <section className="band band-paper">
        <div className="wrap section cta-row">
          <h2>Need the dates, not the reading?</h2>
          <p>
            The tax calendar lists every filing for your setup and exports it to
            your calendar app.
          </p>
          <Link to="/calendar" className="btn btn-primary">
            Build your tax calendar
          </Link>
        </div>
      </section>
    </>
  );
}
