import { useState } from "react";
import { Link } from "../router";
import { posts, type Post } from "../content";

export const formatDate = (iso: string) =>
  new Date(iso + "T12:00:00").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const topics = [...new Set(posts.map((p) => p.topic))];

export function Journal() {
  const [topic, setTopic] = useState<Post["topic"] | "">("");
  const list = posts.filter((p) => !topic || p.topic === topic);

  return (
    <div className="page journal-page">
      <header className="page-head">
        <h1 className="display">Journal</h1>
        <p className="lede">
          Notes from the atelier, the mills and the shops: how the clothes are
          made, and how to keep them.
        </p>
      </header>

      <div className="category-tabs" role="group" aria-label="Topic">
        <button
          type="button"
          aria-pressed={!topic}
          onClick={() => setTopic("")}
        >
          All entries
        </button>
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
      <p className="visually-hidden" aria-live="polite">
        {list.length} {list.length === 1 ? "entry" : "entries"}
      </p>

      <ol className="post-list">
        {list.map((p, i) => (
          <li key={p.slug} className={i === 0 ? "post-row first" : "post-row"}>
            <Link
              to={`/journal/${p.slug}`}
              className="post-row-media"
              tabIndex={-1}
              aria-hidden="true"
            >
              <img src={p.image} alt="" loading={i === 0 ? "eager" : "lazy"} />
            </Link>
            <div className="post-row-text">
              <h2>
                <Link to={`/journal/${p.slug}`}>{p.title}</Link>
              </h2>
              <p>{p.dek}</p>
              <p className="post-meta">
                {p.author} · {p.topic} ·{" "}
                <time dateTime={p.date}>{formatDate(p.date)}</time> ·{" "}
                {p.minutes} min read
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
