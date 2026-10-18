import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "../router";
import { articles, fixtures, type Article } from "../content";
import { fmtDate, teamOf } from "../lib/club";
import { ArticleCard, Img } from "../components/Bits";
import { FixtureRow } from "../components/Match";

export function ArticlePage({ article }: { article: Article }) {
  const team = article.team ? teamOf(article.team) : undefined;
  const match = fixtures.find((f) => f.report === article.slug);
  const related = articles
    .filter((a) => a.slug !== article.slug)
    .sort(
      (a, b) =>
        Number(b.category === article.category) -
        Number(a.category === article.category),
    )
    .slice(0, 3);

  return (
    <>
      <article className="article">
        <header className="wrap article-head">
          <p className="crumbs">
            <Link to="/news">News</Link> / {article.category}
          </p>
          <h1>{article.title}</h1>
          <p className="standfirst">{article.standfirst}</p>
          <p className="byline">
            By {article.author} ·{" "}
            <time dateTime={article.date}>{fmtDate(article.date, "long")}</time>
          </p>
        </header>
        <div className="wrap">
          <Img photo={article.photo} lazy={false} className="article-photo" />
        </div>
        <div className="wrap article-body">
          <div className="prose">
            {article.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <aside className="article-side">
            {match && (
              <>
                <h2>The match</h2>
                <ol className="fixture-list">
                  <FixtureRow f={match} />
                </ol>
              </>
            )}
            {team && (
              <Link to={`/teams/${team.slug}`} className="text-link">
                {team.name}: squad, fixtures &amp; team sheet{" "}
                <ArrowRight aria-hidden="true" size={16} />
              </Link>
            )}
            <Link to="/news" className="text-link">
              <ArrowLeft aria-hidden="true" size={16} /> All club news
            </Link>
          </aside>
        </div>
      </article>

      <section className="section paper-2" aria-labelledby="more-title">
        <div className="wrap">
          <h2 id="more-title">More from the club</h2>
          <div className="news-grid">
            {related.map((a) => (
              <ArticleCard key={a.slug} a={a} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
