import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { customers, templates } from "../content";

export default function Customers() {
  return (
    <>
      <header className="page-head wrap">
        <h1>{customers.heading}</h1>
        <p className="lede">{customers.lede}</p>
      </header>
      <div className="wrap stories">
        {customers.stories.map((s) => (
          <article
            key={s.slug}
            className="story"
            style={{ "--story": s.color } as CSSProperties}
          >
            <div className="story-org">
              <span className="story-initial" aria-hidden="true">
                {s.company[0]}
              </span>
              <p>
                <strong>{s.company}</strong>
                {s.industry} · {s.size}
              </p>
            </div>
            <div className="story-body">
              <h2>{s.headline}</h2>
              <p>{s.text}</p>
              <figure>
                <blockquote>
                  <p>{s.quote}</p>
                </blockquote>
                <figcaption>
                  {s.person}, {s.role}
                </figcaption>
              </figure>
              <p className="story-uses">
                Started with:{" "}
                {s.templates.map((slug, i) => {
                  const t = templates.find((x) => x.slug === slug)!;
                  return (
                    <span key={slug}>
                      {i > 0 && " and "}
                      <Link to={`/templates/${slug}`}>
                        {t.name.toLowerCase()}
                      </Link>
                    </span>
                  );
                })}
              </p>
            </div>
          </article>
        ))}
      </div>
      <section className="close wrap" aria-labelledby="cust-close">
        <h2 id="cust-close">
          Your team's first workflow is probably on the templates page.
        </h2>
        <div className="actions">
          <Link to="/templates" className="btn btn-plum btn-lg">
            Browse templates <ArrowRight size={18} aria-hidden />
          </Link>
          <Link to="/contact" className="btn btn-line btn-lg">
            Talk to sales
          </Link>
        </div>
      </section>
    </>
  );
}
