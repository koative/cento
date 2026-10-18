import { ArrowRight, Clock } from "lucide-react";
import { Link } from "../router";
import { categories, flows, threads, type Category } from "../content";
import { articlesIn, chapterOf, codeOf, formatDay } from "../lib/manual";
import { ThumbIndex } from "../components/ThumbIndex";

export function CategoryPage({ category }: { category: Category }) {
  const n = chapterOf(category.slug);
  const list = articlesIn(category.slug);
  const chapterFlows = flows.filter((f) => f.category === category.slug);
  const chapterThreads = threads
    .filter((t) => t.category === category.slug)
    .slice(0, 3);
  const next = categories[n % categories.length];

  return (
    <div className="page-with-thumbs">
      <ThumbIndex current={category.slug} />
      <div className="wrap narrow-wide">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/categories">Contents</Link>{" "}
          <span aria-hidden="true">/</span> <span>Chapter {n}</span>
        </nav>
        <header className="chapter-head">
          <span className="chapter-num" aria-hidden="true">
            {n}
          </span>
          <div>
            <h1>{category.title}</h1>
            <p className="lead">{category.summary}</p>
          </div>
        </header>

        <div className="chapter-layout">
          <ol className="article-list">
            {list.map((a) => (
              <li key={a.slug}>
                <span className="code">{codeOf(a)}</span>
                <div>
                  <h2>
                    <Link to={`/articles/${a.slug}`}>{a.title}</Link>
                  </h2>
                  <p>{a.summary}</p>
                  <p className="meta">
                    <Clock aria-hidden="true" /> {a.minutes} min read · revised{" "}
                    <time dateTime={a.updated}>{formatDay(a.updated)}</time>
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <aside className="chapter-aside">
            {chapterFlows.length > 0 && (
              <section aria-labelledby="aside-flows">
                <h2 id="aside-flows">Troubleshooters</h2>
                <ul>
                  {chapterFlows.map((f) => (
                    <li key={f.id}>
                      <Link to={`/troubleshoot/${f.id}`}>{f.title}</Link>
                      <p className="muted">{f.summary}</p>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            {chapterThreads.length > 0 && (
              <section aria-labelledby="aside-threads">
                <h2 id="aside-threads">Asked in the community</h2>
                <ul>
                  {chapterThreads.map((t) => (
                    <li key={t.id}>
                      <Link to={`/community/${t.id}`}>{t.title}</Link>
                      <p className="muted">
                        {t.replies.length}{" "}
                        {t.replies.length === 1 ? "reply" : "replies"} ·{" "}
                        {t.shop}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            <section aria-labelledby="aside-help">
              <h2 id="aside-help">Not covered here?</h2>
              <p className="muted">
                Tell us what you were trying to do. If three shops ask, it
                becomes an article.
              </p>
              <Link to="/contact" className="btn btn-ink">
                Contact support
              </Link>
            </section>
          </aside>
        </div>

        <Link to={`/categories/${next.slug}`} className="next-chapter">
          <span className="muted">Next chapter</span>
          <span>
            {chapterOf(next.slug)} {next.title}{" "}
            <ArrowRight aria-hidden="true" />
          </span>
        </Link>
      </div>
    </div>
  );
}
