import { ArrowLeft, ArrowRight, Printer } from "lucide-react";
import { Link } from "../router";
import { flows, type Article } from "../content";
import {
  articleBySlug,
  articlesIn,
  categoryOf,
  chapterOf,
  codeOf,
  formatDay,
  slugify,
} from "../lib/manual";
import { ArticleBody } from "../components/ArticleBody";
import { Feedback } from "../components/Feedback";
import { ThumbIndex } from "../components/ThumbIndex";

export function ArticlePage({ article }: { article: Article }) {
  const category = categoryOf(article.category);
  const siblings = articlesIn(article.category);
  const at = siblings.indexOf(article);
  const prev = siblings[at - 1];
  const next = siblings[at + 1];
  const headings = article.body.flatMap((b) => (b.t === "h" ? [b.text] : []));
  const related = article.related
    .map(articleBySlug)
    .filter((a): a is Article => !!a);
  const flow = flows.find((f) => f.category === article.category);

  const jump = (text: string) => {
    const el = document.getElementById(slugify(text));
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
    el?.focus({ preventScroll: true });
  };

  return (
    <div className="page-with-thumbs">
      <ThumbIndex current={article.category} />
      <div className="wrap article-layout">
        <nav
          className="chapter-nav"
          aria-label={`Chapter ${chapterOf(article.category)}: ${category?.title}`}
        >
          <p className="chapter-nav-title">
            <Link to={`/categories/${article.category}`}>
              <span className="code">{chapterOf(article.category)}</span>{" "}
              {category?.title}
            </Link>
          </p>
          <ol>
            {siblings.map((a) => (
              <li key={a.slug}>
                <Link to={`/articles/${a.slug}`}>
                  <span className="code">{codeOf(a)}</span> {a.title}
                </Link>
              </li>
            ))}
          </ol>
        </nav>

        <article className="sheet">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link to="/categories">Contents</Link>{" "}
            <span aria-hidden="true">/</span>{" "}
            <Link to={`/categories/${article.category}`}>
              {category?.title}
            </Link>{" "}
            <span aria-hidden="true">/</span> <span>{codeOf(article)}</span>
          </nav>
          <header className="article-head">
            <span className="article-code">{codeOf(article)}</span>
            <h1>{article.title}</h1>
            <p className="lead">{article.summary}</p>
            <p className="meta">
              Revised{" "}
              <time dateTime={article.updated}>
                {formatDay(article.updated)}
              </time>{" "}
              · {article.minutes} min read ·{" "}
              {article.reads.toLocaleString("en-US")} reads this week
            </p>
          </header>

          <ArticleBody body={article.body} />

          <Feedback title={article.title} />

          <nav className="pager" aria-label="In this chapter">
            {prev ? (
              <Link to={`/articles/${prev.slug}`} className="pager-link">
                <span className="muted">
                  <ArrowLeft aria-hidden="true" /> Previous · {codeOf(prev)}
                </span>
                <span>{prev.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link
                to={`/articles/${next.slug}`}
                className="pager-link pager-next"
              >
                <span className="muted">
                  Next · {codeOf(next)} <ArrowRight aria-hidden="true" />
                </span>
                <span>{next.title}</span>
              </Link>
            )}
          </nav>
        </article>

        <aside className="article-aside">
          {headings.length > 0 && (
            <nav aria-labelledby="otp">
              <h2 id="otp">On this page</h2>
              <ul>
                {headings.map((h) => (
                  <li key={h}>
                    <button
                      type="button"
                      className="link-btn"
                      onClick={() => jump(h)}
                    >
                      {h}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          )}
          <button
            type="button"
            className="btn btn-quiet"
            onClick={() => window.print()}
          >
            <Printer aria-hidden="true" /> Print article
          </button>
          {related.length > 0 && (
            <section aria-labelledby="related">
              <h2 id="related">See also</h2>
              <ul>
                {related.map((a) => (
                  <li key={a.slug}>
                    <Link to={`/articles/${a.slug}`}>
                      <span className="code">{codeOf(a)}</span> {a.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
          <section aria-labelledby="stuck" className="stuck">
            <h2 id="stuck">Still stuck?</h2>
            {flow && (
              <p>
                <Link to={`/troubleshoot/${flow.id}`}>
                  Try the “{flow.title}” troubleshooter
                </Link>
              </p>
            )}
            <Link to="/contact" className="btn btn-ink">
              Contact support
            </Link>
          </section>
        </aside>
      </div>
    </div>
  );
}
