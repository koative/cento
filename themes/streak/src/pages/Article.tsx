import { ArrowLeft } from "lucide-react";
import { Link } from "../router";
import { posts, type Post } from "../content";
import { formatDate } from "../lib/format";
import { Cover, PostCard, StoreButtons } from "../components/Parts";

export default function Article({ post }: { post: Post }) {
  const related = posts
    .filter((p) => p.slug !== post.slug)
    .sort(
      (a, b) => Number(b.topic === post.topic) - Number(a.topic === post.topic),
    )
    .slice(0, 3);

  return (
    <div className="page">
      <article className="article">
        <header className="article-head wrap">
          <Link to="/blog" className="back">
            <ArrowLeft size={18} aria-hidden="true" /> All posts
          </Link>
          <p className="post-meta">
            <span className="tag">{post.topic}</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>{post.minutes} min read</span>
          </p>
          <h1>{post.title}</h1>
          <p className="lede">{post.excerpt}</p>
          <p className="byline">By {post.author}</p>
        </header>
        <div className="article-cover wrap">
          <Cover post={post} eager />
        </div>
        <div className="prose wrap">
          {post.body.map((b, i) =>
            b.type === "list" ? (
              <ul key={i}>
                {b.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            ) : b.type === "h2" ? (
              <h2 key={i}>{b.text}</h2>
            ) : b.type === "quote" ? (
              <blockquote key={i}>{b.text}</blockquote>
            ) : (
              <p key={i}>{b.text}</p>
            ),
          )}
        </div>
      </article>

      <aside className="article-cta wrap" aria-labelledby="try-title">
        <h2 id="try-title">Start a chain tonight</h2>
        <p>
          Streak is free for three habits. Name one, tick it before midnight,
          and see how tomorrow feels.
        </p>
        <StoreButtons />
      </aside>

      <section className="latest wrap" aria-labelledby="related-title">
        <h2 id="related-title">Keep reading</h2>
        <div className="post-grid">
          {related.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
