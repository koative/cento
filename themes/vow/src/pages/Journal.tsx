import { useState } from "react";
import { Link } from "../router";
import { journalCategories, posts, type JournalCategory } from "../content";
import { Img, PostCard } from "../components/Cards";
import { longDate } from "../lib/plan";

export function Journal() {
  const [topic, setTopic] = useState<JournalCategory | "All">("All");
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const list = posts.filter(
    (p) =>
      (topic === "All" || p.category === topic) &&
      (!q || `${p.title} ${p.excerpt}`.toLowerCase().includes(q)),
  );
  const [lead, ...rest] = list;

  return (
    <div className="page journal-page">
      <header className="page-head">
        <h1>The journal</h1>
        <p className="lede">
          Notes from the studio on order, money, weather and the small decisions
          that make a day run.
        </p>
      </header>

      <div className="toolbar">
        <div className="segmented" role="group" aria-label="Filter by topic">
          {(["All", ...journalCategories] as const).map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={topic === c}
              onClick={() => setTopic(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="field inline">
          <label htmlFor="j-search">Search</label>
          <input
            id="j-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Budget, rain, permits…"
          />
        </div>
      </div>
      <p className="count" aria-live="polite">
        {list.length
          ? `${list.length} ${list.length === 1 ? "article" : "articles"}`
          : "No articles match. Try another word or topic."}
      </p>

      {lead && (
        <article className="post-lead">
          <Link
            to={`/journal/${lead.slug}`}
            className="frame"
            tabIndex={-1}
            aria-hidden="true"
          >
            <Img photo={lead.image} lazy={false} />
          </Link>
          <div className="post-lead-copy">
            <Link to={`/journal/${lead.slug}`} className="post-lead-link">
              <h2>{lead.title}</h2>
            </Link>
            <p className="meta">
              {lead.category} · {longDate(lead.date)} · {lead.minutes} min read
              · {lead.author}
            </p>
            <p>{lead.excerpt}</p>
          </div>
        </article>
      )}

      <div className="post-grid">
        {rest.map((p) => (
          <PostCard key={p.slug} p={p} />
        ))}
      </div>
    </div>
  );
}
