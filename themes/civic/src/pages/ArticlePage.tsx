import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { articles, services, type Article } from "../content";
import { shortDate } from "../lib/city";
import { PageHead } from "../components/PageHead";

export function ArticlePage({ article: a }: { article: Article }) {
  const service = services.find((s) => s.slug === a.service);
  const more = articles.filter((x) => x.slug !== a.slug).slice(0, 3);

  return (
    <>
      <PageHead
        title={a.title}
        lede={a.dek}
        crumbs={[{ to: "/news", label: "News" }]}
      >
        <p className="head-meta">
          {a.topic} · <time dateTime={a.date}>{shortDate(a.date)}</time> · From{" "}
          {a.from}
        </p>
      </PageHead>
      <article className="wrap article">
        <img
          className="article-img"
          src={a.image.src}
          alt={a.image.alt}
          width={a.image.w}
          height={a.image.h}
        />
        <div className="article-body">
          {a.body.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
          {service && (
            <aside className="article-service" aria-label="Related service">
              <p>
                <strong>{service.name}</strong> {service.summary}
              </p>
              <Link to={`/services/${service.slug}`} className="arrow-link">
                Go to the service <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </aside>
          )}
        </div>
      </article>
      <section className="band band-mist" aria-labelledby="more-news">
        <div className="wrap">
          <h2 id="more-news">More news</h2>
          <ul className="news-side news-side-row">
            {more.map((x) => (
              <li key={x.slug}>
                <p className="meta">
                  {x.topic} · <time dateTime={x.date}>{shortDate(x.date)}</time>
                </p>
                <h3>
                  <Link to={`/news/${x.slug}`}>{x.title}</Link>
                </h3>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
