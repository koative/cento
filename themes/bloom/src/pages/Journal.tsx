import { useState } from "react";
import { Link } from "../router";
import { posts, type Post } from "../content";

export const postDate = (iso: string) =>
  new Date(iso + "T12:00").toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

export function PostCard({
  post,
  large = false,
}: {
  post: Post;
  large?: boolean;
}) {
  return (
    <article className={"post-card" + (large ? " post-card-large" : "")}>
      <img
        src={post.image.src}
        alt=""
        width={post.image.w}
        height={post.image.h}
        loading="lazy"
      />
      <div>
        <p className="post-meta">
          {post.category} ·{" "}
          <time dateTime={post.date}>{postDate(post.date)}</time>
        </p>
        <h3>
          <Link to={"/journal/" + post.slug}>{post.title}</Link>
        </h3>
        <p>{post.excerpt}</p>
      </div>
    </article>
  );
}

export function Journal() {
  const categories = ["All", ...new Set(posts.map((p) => p.category))];
  const [cat, setCat] = useState("All");
  const list = posts.filter((p) => cat === "All" || p.category === cat);

  return (
    <>
      <header className="page-head">
        <h1>Journal</h1>
        <p className="lead">
          Notes from the bench: flower care that actually works, what's in
          season, and how the big days come together.
        </p>
      </header>
      <div className="section journal">
        <div className="pill-row" role="group" aria-label="Filter by topic">
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
        <p className="visually-hidden" aria-live="polite">
          {list.length} {list.length === 1 ? "story" : "stories"}
        </p>
        <h2 className="visually-hidden">Stories</h2>
        <div className="post-list">
          {list.map((p, i) => (
            <PostCard key={p.slug} post={p} large={i === 0} />
          ))}
        </div>
      </div>
    </>
  );
}
