import { ArrowLeft } from "lucide-react";
import { posts, type Post } from "../content";
import { Link } from "../router";
import { postDate } from "../lib/stay";

export function Article({ post }: { post: Post }) {
  const others = posts.filter((p) => p.slug !== post.slug).slice(0, 2);
  return (
    <article>
      <div className="wrap crumbs">
        <Link to="/journal" className="back-link">
          <ArrowLeft aria-hidden="true" /> Journal
        </Link>
      </div>
      <header className="wrap article-head">
        <h1>{post.title}</h1>
        <p className="lede">{post.dek}</p>
        <p className="meta">
          <time dateTime={post.date}>{postDate(post.date)}</time> ·{" "}
          {post.author} · {post.minutes} min read
        </p>
      </header>
      <figure className="wrap article-figure">
        <img
          src={post.image.src}
          alt={post.image.alt}
          width={1280}
          height={853}
        />
      </figure>
      <div className="wrap">
        <div className="prose article-body">
          {post.body.map((b, i) =>
            "h" in b ? (
              <h2 key={i}>{b.h}</h2>
            ) : "q" in b ? (
              <blockquote key={i}>
                <p>{b.q}</p>
              </blockquote>
            ) : (
              <p key={i}>{b.p}</p>
            ),
          )}
        </div>
      </div>
      <aside className="section wrap" aria-labelledby="next-h">
        <h2 id="next-h">Keep reading</h2>
        <ul className="journal-list">
          {others.map((p) => (
            <li key={p.slug}>
              <Link to={`/journal/${p.slug}`}>
                <img
                  src={p.image.src}
                  alt={p.image.alt}
                  width={1280}
                  height={853}
                  loading="lazy"
                />
                <h3>{p.title}</h3>
              </Link>
              <p>{p.dek}</p>
            </li>
          ))}
        </ul>
      </aside>
    </article>
  );
}
