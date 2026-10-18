import { useState } from "react";
import { Link } from "../router";
import { journalCopy, posts, type Post } from "../content";

export const formatDate = (iso: string) =>
  new Date(iso + "T12:00:00").toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

export function PostCard({
  post,
  lead = false,
}: {
  post: Post;
  lead?: boolean;
}) {
  return (
    <article className={"post-card" + (lead ? " post-lead" : "")}>
      <img src={post.image} alt="" loading="lazy" width={1400} height={1050} />
      <div>
        <p className="post-meta">
          {post.category} ·{" "}
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </p>
        <h3>
          <Link to={"/journal/" + post.slug}>{post.title}</Link>
        </h3>
        <p>{post.dek}</p>
      </div>
    </article>
  );
}

export function Journal() {
  const categories = ["All", ...new Set(posts.map((p) => p.category))];
  const [cat, setCat] = useState("All");
  const list = posts.filter((p) => cat === "All" || p.category === cat);
  const [lead, ...rest] = list;

  return (
    <div className="page journal-page">
      <header className="page-head">
        <h1>{journalCopy.title}</h1>
        <p className="lede">{journalCopy.text}</p>
      </header>
      <div
        className="chips journal-filter"
        role="group"
        aria-label="Filter by topic"
      >
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            className="chip"
            aria-pressed={cat === c}
            onClick={() => setCat(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <h2 className="visually-hidden" aria-live="polite">
        {cat === "All" ? "All stories" : cat + " stories"}
      </h2>
      {lead && <PostCard post={lead} lead />}
      <div className="post-grid">
        {rest.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </div>
    </div>
  );
}
