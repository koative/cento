import { ArrowLeft } from "lucide-react";
import { Link } from "../router";
import { brand, posts, type Post as P } from "../content";
import { Code } from "../components/Blocks";
import { formatDate, readingMinutes } from "../lib/format";

export function Post({ post }: { post: P }) {
  const i = posts.indexOf(post);
  const newer = posts[i - 1];
  const older = posts[i + 1];
  const headings = post.body.flatMap((b, n) =>
    "h" in b ? [{ text: b.h, id: "h-" + n }] : [],
  );

  return (
    <article className="post wrap">
      <header className="post-head">
        <Link to="/writing" className="back">
          <ArrowLeft size={16} aria-hidden="true" /> Writing
        </Link>
        <h1>{post.title}</h1>
        <p className="post-byline">
          <time dateTime={post.date}>{formatDate(post.date)}</time> ·{" "}
          {readingMinutes(post)} min read · {post.tags.join(", ")}
        </p>
        <p className="lead">{post.summary}</p>
      </header>

      <div className="post-grid">
        {headings.length > 0 && (
          <nav className="toc" aria-label="On this page">
            <p>On this page</p>
            <ul>
              {headings.map((h) => (
                <li key={h.id}>
                  <button
                    type="button"
                    onClick={() => {
                      const el = document.getElementById(h.id);
                      const reduce = window.matchMedia(
                        "(prefers-reduced-motion: reduce)",
                      ).matches;
                      el?.scrollIntoView({
                        behavior: reduce ? "auto" : "smooth",
                      });
                      el?.focus({ preventScroll: true });
                    }}
                  >
                    {h.text}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}
        <div className="prose post-body">
          {post.body.map((b, n) => {
            if ("h" in b)
              return (
                <h2 key={n} id={"h-" + n} tabIndex={-1}>
                  {b.h}
                </h2>
              );
            if ("p" in b) return <p key={n}>{b.p}</p>;
            if ("code" in b)
              return <Code key={n} file={b.file} body={b.code} />;
            if ("list" in b)
              return (
                <ul key={n}>
                  {b.list.map((li) => (
                    <li key={li}>{li}</li>
                  ))}
                </ul>
              );
            return (
              <blockquote key={n}>
                <p>{b.quote}</p>
              </blockquote>
            );
          })}
          <p className="reply">
            Thoughts or corrections?{" "}
            <a
              href={`mailto:${brand.email}?subject=${encodeURIComponent("Re: " + post.title)}`}
            >
              Reply by email
            </a>
            . I read everything and update posts when I am wrong.
          </p>
        </div>
      </div>

      <nav className="pager" aria-label="More posts">
        {older ? (
          <Link to={`/writing/${older.slug}`}>
            <span>Older</span>
            {older.title}
          </Link>
        ) : (
          <span />
        )}
        {newer && (
          <Link to={`/writing/${newer.slug}`} className="pager-next">
            <span>Newer</span>
            {newer.title}
          </Link>
        )}
      </nav>
    </article>
  );
}
