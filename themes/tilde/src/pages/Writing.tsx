import { useState } from "react";
import { posts } from "../content";
import { PostList } from "../components/Blocks";

const tags = [...new Set(posts.flatMap((p) => p.tags))].sort();

export function Writing() {
  const [tag, setTag] = useState("");
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const shown = posts.filter(
    (p) =>
      (!tag || p.tags.includes(tag)) &&
      (!q || (p.title + " " + p.summary).toLowerCase().includes(q)),
  );
  const years = [...new Set(shown.map((p) => p.date.slice(0, 4)))];

  return (
    <>
      <header className="page-head wrap">
        <h1>Writing</h1>
        <p className="lead">
          Notes on sync, databases, performance and working independently. Long
          enough to be useful, short enough to finish on a train.
        </p>
      </header>
      <div className="wrap">
        <div className="toolbar">
          <div className="segmented" role="group" aria-label="Topic">
            <button
              type="button"
              aria-pressed={!tag}
              onClick={() => setTag("")}
            >
              all
            </button>
            {tags.map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={tag === t}
                onClick={() => setTag(t)}
              >
                {t}
              </button>
            ))}
          </div>
          <label className="search">
            <span className="visually-hidden">Search posts</span>
            <input
              type="search"
              placeholder="Search titles and summaries"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
        </div>
        <p className="count" aria-live="polite">
          {shown.length} of {posts.length} posts
        </p>
        {years.map((y) => (
          <section key={y} className="year">
            <h2>{y}</h2>
            <PostList items={shown.filter((p) => p.date.startsWith(y))} />
          </section>
        ))}
        {!shown.length && (
          <div className="empty">
            <p>
              Nothing matches that yet. Try another topic, or clear the search.
            </p>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => {
                setTag("");
                setQuery("");
              }}
            >
              Show all posts
            </button>
          </div>
        )}
      </div>
    </>
  );
}
