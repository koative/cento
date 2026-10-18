import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { articles, brand, helpCategories, type Article } from "../content";

export function HelpArticle({ article }: { article: Article }) {
  const [vote, setVote] = useState<"yes" | "no" | null>(null);
  const category = helpCategories.find((c) => c.id === article.category)!;
  const related = articles.filter(
    (a) => a.category === article.category && a.slug !== article.slug,
  );
  const updated = new Date(article.updated + "T12:00").toLocaleDateString(
    "en-US",
    { month: "long", day: "numeric", year: "numeric" },
  );

  return (
    <article className="wrap help-article">
      <div className="prose">
        <p className="crumbs">
          <Link to="/help">Help centre</Link> <span aria-hidden="true">/</span>{" "}
          {category.label}
        </p>
        <h1>{article.title}</h1>
        <p className="lede">{article.summary}</p>
        <p className="fine">Updated {updated}</p>
        {article.body.map((b, i) => (
          <div key={i}>
            {b.heading && <h2>{b.heading}</h2>}
            <p>{b.text}</p>
            {b.list && (
              <ul>
                {b.list.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            )}
          </div>
        ))}

        <div className="feedback">
          <p id="fb-q">Did this answer your question?</p>
          <p aria-live="polite" className="form-done">
            {vote &&
              (vote === "yes"
                ? "Thanks — glad it helped."
                : `Sorry about that. The policy desk can answer it directly on ${brand.phone}.`)}
          </p>
          {!vote && (
            <div className="actions" role="group" aria-labelledby="fb-q">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setVote("yes")}
              >
                Yes
              </button>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setVote("no")}
              >
                Not really
              </button>
            </div>
          )}
        </div>
      </div>

      <aside className="article-aside" aria-labelledby="more-h">
        <h2 id="more-h">More in {category.label.toLowerCase()}</h2>
        <ul>
          {related.map((a) => (
            <li key={a.slug}>
              <Link to={`/help/${a.slug}`}>{a.title}</Link>
            </li>
          ))}
          <li>
            <Link to="/help">
              All help articles <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </li>
        </ul>
        <p>
          Ready to see a price? <Link to="/quote">Start a quote</Link>.
        </p>
      </aside>
    </article>
  );
}
