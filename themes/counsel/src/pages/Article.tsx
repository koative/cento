import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { brand, insights, type Insight } from "../content";
import { areaBySlug, longDate, personBySlug } from "../lib/util";
import { InsightList } from "../components/InsightList";
import { Closing } from "../components/Closing";

/** An insight set as a firm memorandum: memo block, numbered sections and paragraphs for citation. */
export function Article({ insight }: { insight: Insight }) {
  const author = personBySlug(insight.author);
  const area = areaBySlug(insight.area);
  const related = insights
    .filter((i) => i.slug !== insight.slug && i.area !== insight.area)
    .slice(0, 2);

  return (
    <>
      <article className="memo wrap">
        <nav aria-label="Breadcrumb" className="crumbs">
          <ol>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/insights">Insights</Link>
            </li>
          </ol>
        </nav>
        <h1>{insight.title}</h1>

        <dl className="memo-block">
          <div>
            <dt>From</dt>
            <dd>
              {author && (
                <Link to={`/people/${author.slug}`}>{author.name}</Link>
              )}
              , {author?.role}
            </dd>
          </div>
          <div>
            <dt>Date</dt>
            <dd>
              <time dateTime={insight.date}>{longDate(insight.date)}</time>
            </dd>
          </div>
          <div>
            <dt>Re</dt>
            <dd>
              {area && <Link to={`/practice/${area.slug}`}>{area.name}</Link>}
            </dd>
          </div>
          <div>
            <dt>Format</dt>
            <dd>
              {insight.type}, {insight.minutes} minute read
            </dd>
          </div>
        </dl>

        <p className="memo-stand">{insight.standfirst}</p>

        <div className="memo-body">
          <aside className="in-brief" aria-labelledby="brief-title">
            <h2 id="brief-title">In brief</h2>
            <ul>
              {insight.keyPoints.map((k) => (
                <li key={k}>{k}</li>
              ))}
            </ul>
          </aside>

          <div className="memo-text">
            {insight.sections.map((s, si) => (
              <section key={s.heading}>
                <h2>
                  <span className="para-n">{si + 1}.</span> {s.heading}
                </h2>
                {s.paras.map((p, pi) => (
                  <p key={p}>
                    <span className="para-n" aria-hidden="true">
                      {si + 1}.{pi + 1}
                    </span>
                    {p}
                  </p>
                ))}
              </section>
            ))}
            <p className="memo-disclaimer">{brand.disclaimer}</p>

            {author && (
              <div className="memo-author">
                <img
                  src={author.image}
                  alt=""
                  width={800}
                  height={1000}
                  loading="lazy"
                />
                <div>
                  <p>
                    <Link to={`/people/${author.slug}`}>{author.name}</Link>
                  </p>
                  <p className="muted">
                    {author.role}, {author.office}
                  </p>
                  <Link
                    to={`/enquiry?lawyer=${author.slug}&area=${insight.area}`}
                    className="text-link"
                  >
                    Ask {author.name.split(" ")[0]} about this{" "}
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </article>

      <section className="section wrap" aria-labelledby="more-title">
        <h2 id="more-title" className="section-title">
          More from the firm
        </h2>
        <InsightList items={related} />
      </section>

      <Closing />
    </>
  );
}
