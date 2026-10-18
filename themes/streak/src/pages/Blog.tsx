import { useState } from "react";
import { Search } from "lucide-react";
import { blogPage, posts, topics } from "../content";
import { PageHead, PostCard } from "../components/Parts";

export default function Blog() {
  const [topic, setTopic] = useState<(typeof topics)[number]>("All");
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const shown = [...posts]
    .sort((a, b) => b.date.localeCompare(a.date))
    .filter(
      (p) =>
        (topic === "All" || p.topic === topic) &&
        (!q || `${p.title} ${p.excerpt} ${p.author}`.toLowerCase().includes(q)),
    );

  return (
    <div className="page">
      <PageHead title={blogPage.hero.title} lede={blogPage.hero.lede} />
      <section className="wrap" aria-label="Posts">
        <div className="filters">
          <div className="chips" role="group" aria-label="Topic">
            {topics.map((t) => (
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
          <label className="search">
            <Search size={18} aria-hidden="true" />
            <span className="sr-only">Search posts</span>
            <input
              type="search"
              placeholder="Search posts"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
        </div>
        <p className="result-count" role="status">
          {shown.length} {shown.length === 1 ? "post" : "posts"}
          {topic !== "All" ? ` in ${topic}` : ""}
          {q ? ` matching “${query.trim()}”` : ""}
        </p>
        {shown.length ? (
          <div className="post-grid">
            {shown.map((p) => (
              <PostCard key={p.slug} post={p} level={2} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <p>
              No posts match that yet. Try a shorter word, or clear the filters.
            </p>
            <button
              type="button"
              className="btn btn-quiet"
              onClick={() => {
                setTopic("All");
                setQuery("");
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
