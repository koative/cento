import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "../router";
import { helpArticles, type HelpArticle as Article } from "../content";
import { formatDate } from "../lib/format";

export default function HelpArticle({ article }: { article: Article }) {
  const [vote, setVote] = useState<"yes" | "no" | null>(null);
  const related = helpArticles.filter(
    (a) => a.slug !== article.slug && a.category === article.category,
  );
  const more = related.length
    ? related
    : helpArticles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <div className="page">
      <div className="help-article wrap">
        <article>
          <Link to="/help" className="back">
            <ArrowLeft size={18} aria-hidden="true" /> Help centre
          </Link>
          <p className="post-meta">
            <span className="tag">{article.category}</span>
            <span>Updated {formatDate(article.updated)}</span>
          </p>
          <h1>{article.title}</h1>
          <p className="lede">{article.summary}</p>
          {article.steps && (
            <ol className="how">
              {article.steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
          )}
          <div className="prose prose-tight">
            {article.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <div className="vote">
            <p role="status">
              {vote === "yes" && "Thanks. Glad it helped."}
              {vote === "no" && (
                <>
                  Sorry about that.{" "}
                  <Link to="/contact">Tell support what's missing</Link> and
                  we'll improve this page.
                </>
              )}
            </p>
            {!vote && (
              <>
                <p id="vote-q">Did this answer your question?</p>
                <div role="group" aria-labelledby="vote-q">
                  <button
                    type="button"
                    className="btn btn-quiet btn-small"
                    onClick={() => setVote("yes")}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    className="btn btn-quiet btn-small"
                    onClick={() => setVote("no")}
                  >
                    Not really
                  </button>
                </div>
              </>
            )}
          </div>
        </article>

        <aside className="help-aside" aria-labelledby="aside-title">
          <h2 id="aside-title">
            {related.length ? `More in ${article.category}` : "Other articles"}
          </h2>
          <ul>
            {more.map((a) => (
              <li key={a.slug}>
                <Link to={`/help/${a.slug}`}>{a.title}</Link>
              </li>
            ))}
          </ul>
          <p>
            Can't find it? <Link to="/contact">Contact support</Link>
          </p>
        </aside>
      </div>
    </div>
  );
}
