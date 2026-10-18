import { ArrowUpRight } from "lucide-react";
import { Link } from "../router";
import type { CaseStudy } from "../content";

export function CaseCard({
  c,
  large = false,
  lazy = true,
}: {
  c: CaseStudy;
  large?: boolean;
  lazy?: boolean;
}) {
  return (
    <article className="case-card" data-large={large ? "" : undefined}>
      <div className="case-card-media">
        <img
          src={c.image}
          alt={c.imageAlt}
          loading={lazy ? "lazy" : undefined}
          width={1400}
          height={933}
        />
        <p className="case-card-figure">
          <strong>{c.figure}</strong>
          <span>{c.metric}</span>
        </p>
      </div>
      <div className="case-card-body">
        <p className="case-card-client">
          {c.client} <span>· {c.industry}</span>
        </p>
        <h3>
          <Link to={`/work/${c.slug}`} className="stretched">
            {c.headline}
          </Link>
        </h3>
        {large && <p>{c.summary}</p>}
        <ArrowUpRight className="case-card-arrow" aria-hidden="true" />
      </div>
    </article>
  );
}
