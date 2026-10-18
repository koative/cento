import { useState } from "react";
import { Search } from "lucide-react";
import { Link } from "../router";
import { guides, guidesPage } from "../content";

const topics = ["All", ...new Set(guides.map((g) => g.topic))];

export default function Guides() {
  const [topic, setTopic] = useState("All");
  const [q, setQ] = useState("");
  const needle = q.trim().toLowerCase();
  const list = guides.filter(
    (g) =>
      (topic === "All" || g.topic === topic) &&
      (!needle || `${g.title} ${g.excerpt}`.toLowerCase().includes(needle)),
  );
  const [lead, ...rest] = list;

  return (
    <>
      <header className="page-head wrap">
        <h1>{guidesPage.heading}</h1>
        <p className="lede">{guidesPage.lede}</p>
      </header>

      <div className="wrap guide-tools">
        <div className="chips" role="group" aria-label="Filter by topic">
          {topics.map((t) => (
            <button
              key={t}
              type="button"
              className="chip"
              aria-pressed={topic === t}
              onClick={() => setTopic(t)}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="search">
          <Search size={17} aria-hidden />
          <label htmlFor="guide-q" className="sr-only">
            Search guides
          </label>
          <input
            id="guide-q"
            type="search"
            placeholder="Search guides"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
      </div>
      <p className="wrap result-count" role="status">
        {list.length === 1 ? "1 guide" : `${list.length} guides`}
        {topic !== "All" && ` in ${topic}`}
        {needle && ` matching “${q.trim()}”`}
      </p>

      <div className="wrap">
        {lead ? (
          <>
            <Link to={`/guides/${lead.slug}`} className="guide-lead">
              <strong>{lead.title}</strong>
              <span>{lead.excerpt}</span>
              <span className="guide-meta">
                {lead.topic} · {lead.minutes} min read · {lead.author},{" "}
                {lead.date}
              </span>
            </Link>
            <ul className="guide-rows">
              {rest.map((g) => (
                <li key={g.slug}>
                  <Link to={`/guides/${g.slug}`}>
                    <strong>{g.title}</strong>
                    <span className="guide-excerpt">{g.excerpt}</span>
                    <span className="guide-topic">{g.topic}</span>
                    <span className="guide-time num">{g.minutes} min</span>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div className="empty">
            <p>
              No guides match that. Try a shorter word, or clear the filters.
            </p>
            <button
              type="button"
              className="btn btn-quiet"
              onClick={() => {
                setQ("");
                setTopic("All");
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </>
  );
}
