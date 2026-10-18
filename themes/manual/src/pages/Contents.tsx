import { useState } from "react";
import { Link } from "../router";
import { articles, categories, type Article } from "../content";
import { codeOf, formatDay, terms } from "../lib/manual";
import { Highlight } from "../components/Inline";
import { ThumbIndex } from "../components/ThumbIndex";

type Sort = "manual" | "revised" | "read";

function Row({ a, ts }: { a: Article; ts: string[] }) {
  return (
    <li className="toc-row">
      <Link to={`/articles/${a.slug}`}>
        <span className="code">{codeOf(a)}</span>
        <span className="toc-title">
          <Highlight text={a.title} terms={ts} />
        </span>
        <span className="toc-leader" aria-hidden="true" />
        <time dateTime={a.updated}>{formatDay(a.updated)}</time>
      </Link>
    </li>
  );
}

export function Contents() {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<Sort>("manual");
  const ts = terms(q);
  const shown = articles.filter((a) => {
    const hay = `${a.title} ${a.tags.join(" ")}`.toLowerCase();
    return ts.every((t) => hay.includes(t));
  });
  const sorted =
    sort === "revised"
      ? [...shown].sort((a, b) => b.updated.localeCompare(a.updated))
      : sort === "read"
        ? [...shown].sort((a, b) => b.reads - a.reads)
        : shown;

  return (
    <div className="page-with-thumbs">
      <ThumbIndex />
      <div className="wrap narrow-wide">
        <header className="page-head">
          <h1>Contents</h1>
          <p className="lead">
            Six chapters, {articles.length} articles. Numbers stay put when
            articles are revised, so support can point you to “article 2.2” on
            the phone.
          </p>
        </header>

        <div className="toolbar">
          <div className="field field-inline">
            <label htmlFor="toc-filter">Filter by title</label>
            <input
              id="toc-filter"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="printer, refund, PIN…"
            />
          </div>
          <div className="field field-inline">
            <label htmlFor="toc-sort">Order</label>
            <select
              id="toc-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
            >
              <option value="manual">Chapter order</option>
              <option value="revised">Recently revised</option>
              <option value="read">Most read this week</option>
            </select>
          </div>
          <p className="toolbar-count" aria-live="polite">
            {shown.length} of {articles.length} articles
          </p>
        </div>

        {shown.length === 0 && (
          <div className="empty">
            <h2>Nothing in the contents matches “{q}”</h2>
            <p>
              Titles are short; full-text{" "}
              <Link to={`/search?q=${encodeURIComponent(q)}`}>
                search the manual
              </Link>{" "}
              also reads every step and table.
            </p>
          </div>
        )}

        {sort === "manual" ? (
          categories.map((c, i) => {
            const list = sorted.filter((a) => a.category === c.slug);
            if (!list.length) return null;
            return (
              <section
                key={c.slug}
                className="toc-chapter"
                aria-labelledby={`ch-${c.slug}`}
              >
                <h2 id={`ch-${c.slug}`}>
                  <span className="chapter-tab" aria-hidden="true">
                    {i + 1}
                  </span>
                  <Link to={`/categories/${c.slug}`}>{c.title}</Link>
                </h2>
                <p className="muted">{c.summary}</p>
                <ol className="toc">
                  {list.map((a) => (
                    <Row key={a.slug} a={a} ts={ts} />
                  ))}
                </ol>
              </section>
            );
          })
        ) : (
          <ol className="toc toc-flat">
            {sorted.map((a) => (
              <Row key={a.slug} a={a} ts={ts} />
            ))}
          </ol>
        )}
        {sort !== "manual" && shown.length > 0 && (
          <p className="muted toc-foot">
            Chapter names:{" "}
            {categories.map((c, i) => `${i + 1} ${c.title}`).join(" · ")}
          </p>
        )}
      </div>
    </div>
  );
}
