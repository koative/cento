import { ArrowRight } from "lucide-react";
import { insights, type Insight } from "../content";
import { capabilityBySlug, longDate, personById } from "../lib/format";
import { Link } from "../router";
import { Exhibit } from "../components/Exhibit";
import { InsightItem } from "../components/InsightItem";

export function Article({ post }: { post: Insight }) {
  const author = personById(post.author);
  const cap = capabilityBySlug(post.capability);
  const related = [
    ...insights.filter(
      (p) => p.slug !== post.slug && p.capability === post.capability,
    ),
    ...insights.filter(
      (p) => p.slug !== post.slug && p.capability !== post.capability,
    ),
  ].slice(0, 3);
  let exhibits = 0;

  return (
    <>
      <article className="article">
        <header className="wrap article-head">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link to="/insights">Insights</Link>
          </nav>
          <h1 className="display-2">{post.title}</h1>
          <p className="lede">{post.dek}</p>
          <p className="insight-meta">
            <span className="insight-type">{post.type}</span>
            {cap && <Link to={`/capabilities/${cap.slug}`}>{cap.name}</Link>}
            <time dateTime={post.date}>{longDate(post.date)}</time>
            <span>
              <span className="num">{post.minutes}</span> min read
            </span>
          </p>
          {author && (
            <div className="byline">
              {author.photo && (
                <img src={author.photo} alt="" width={240} height={320} />
              )}
              <p>
                <span className="byline-name">{author.name}</span>
                <span className="byline-role">
                  {author.role}, {author.office}
                </span>
              </p>
            </div>
          )}
        </header>

        {post.image && (
          <figure className="wrap article-photo photo">
            <img src={post.image} alt="" width={960} height={640} />
          </figure>
        )}

        <div className="wrap prose">
          {post.body.map((b, i) => {
            if ("p" in b) return <p key={i}>{b.p}</p>;
            if ("h" in b) return <h2 key={i}>{b.h}</h2>;
            if ("list" in b)
              return (
                <ul key={i}>
                  {b.list.map((li) => (
                    <li key={li}>{li}</li>
                  ))}
                </ul>
              );
            if ("quote" in b)
              return (
                <blockquote key={i} className="pull">
                  <p>{b.quote}</p>
                  <footer>{b.by}</footer>
                </blockquote>
              );
            return <Exhibit key={i} data={b.exhibit} n={++exhibits} />;
          })}
          <p className="prose-note">
            Figures are drawn from Quadrant client work and disguised to protect
            client confidentiality.
          </p>
        </div>

        {author && (
          <aside className="wrap author-box" aria-labelledby="about-author">
            <h2 className="h4" id="about-author">
              About the author
            </h2>
            <p>{author.bio[0]}</p>
            <Link to="/people" className="link-arrow">
              {author.name} and the rest of the firm{" "}
              <ArrowRight aria-hidden="true" />
            </Link>
          </aside>
        )}
      </article>

      <section className="wrap section" aria-labelledby="more-title">
        <div className="split">
          <h2 className="h2" id="more-title">
            Read next
          </h2>
          <Link to="/contact" className="link-arrow">
            Talk to the author about your situation{" "}
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <div className="insight-grid">
          {related.map((p) => (
            <InsightItem key={p.slug} post={p} />
          ))}
        </div>
      </section>
    </>
  );
}
