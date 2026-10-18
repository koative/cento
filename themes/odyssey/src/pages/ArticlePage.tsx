import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import {
  articles,
  destinationBySlug,
  planners,
  type Article,
} from "../content";
import { longDate } from "../lib/plan";

export function ArticlePage({ a }: { a: Article }) {
  const d = destinationBySlug(a.destination);
  const author = planners.find((p) => p.name === a.author);
  const next = articles.filter((x) => x.slug !== a.slug).slice(0, 2);

  return (
    <article className="article">
      <header className="wrap article-head">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/journal">Journal</Link> <span aria-hidden="true">/</span>{" "}
          <span>{d?.name}</span>
        </nav>
        <h1>{a.title}</h1>
        <p className="lede">{a.dek}</p>
        <p className="byline">
          {a.author} · <time dateTime={a.date}>{longDate(a.date)}</time> ·{" "}
          {a.minutes} min read
        </p>
      </header>
      <figure className="wrap article-photo">
        <img src={a.photo.src} alt={a.photo.alt} />
      </figure>
      <div className="wrap article-body">
        <div className="prose">
          {a.body.map((s, i) => (
            <section key={i}>
              {s.heading && <h2>{s.heading}</h2>}
              {s.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </section>
          ))}
        </div>
        <aside className="article-aside">
          {author && (
            <div className="author">
              <span className="stamp" aria-hidden="true">
                {author.initials}
              </span>
              <p>
                <strong>{author.name}</strong> plans {author.regions} for
                Odyssey and has been with us since {author.since}.
              </p>
            </div>
          )}
          {d && (
            <Link to={`/destinations/${d.slug}`} className="aside-dest">
              <img src={d.photo.src} alt="" loading="lazy" />
              <span>
                Read the guide to <span className="place">{d.name}</span>{" "}
                <ArrowRight aria-hidden="true" />
              </span>
            </Link>
          )}
        </aside>
      </div>
      <section className="wrap section">
        <h2>Keep reading</h2>
        <div className="article-grid article-grid--two">
          {next.map((x) => (
            <article key={x.slug} className="article-card">
              <img src={x.photo.src} alt="" loading="lazy" />
              <h3>
                <Link to={`/journal/${x.slug}`} className="stretched">
                  {x.title}
                </Link>
              </h3>
              <p>{x.dek}</p>
            </article>
          ))}
        </div>
      </section>
    </article>
  );
}
