import { ArrowLeft } from "lucide-react";
import { Link } from "../router";
import { articles, type Article } from "../content";
import { longDate } from "../lib/format";

export function ArticlePage({ article: a }: { article: Article }) {
  const related = articles
    .filter((x) => x.slug !== a.slug && x.category === a.category)
    .concat(articles.filter((x) => x.category !== a.category))
    .slice(0, 3);

  return (
    <article>
      <header className="wrap article-head">
        <Link to="/news" className="text-link back">
          <ArrowLeft aria-hidden="true" /> All news
        </Link>
        <h1>{a.title}</h1>
        <p className="lede">{a.dek}</p>
        <p className="article-meta">
          <span>{a.category}</span>
          <span>{longDate(a.date)}</span>
          <span>By {a.author}</span>
        </p>
      </header>

      <figure className="wrap article-figure">
        <img
          src={a.image}
          alt={a.imageAlt}
          width={1800}
          height={1200}
          className="cut"
        />
      </figure>

      <div className="wrap article-body prose">
        {a.body.map((b, i) =>
          b.type === "h2" ? (
            <h2 key={i}>{b.text}</h2>
          ) : b.type === "quote" ? (
            <blockquote key={i}>
              <p>“{b.text}”</p>
              <footer>— {b.cite}</footer>
            </blockquote>
          ) : (
            <p key={i}>{b.text}</p>
          ),
        )}
      </div>

      <aside className="wrap section" aria-labelledby="related-h">
        <h2 id="related-h">Read next</h2>
        <ul className="news-grid">
          {related.map((r) => (
            <li key={r.slug}>
              <Link to={`/news/${r.slug}`}>
                <img
                  src={r.image}
                  alt=""
                  width={1800}
                  height={1200}
                  loading="lazy"
                />
                <span className="news-cat">
                  {r.category} · {longDate(r.date)}
                </span>
                <strong>{r.title}</strong>
                <span>{r.dek}</span>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </article>
  );
}
