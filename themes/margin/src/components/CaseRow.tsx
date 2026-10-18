import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import type { Case } from "../content";
import { Mockup } from "./Mockup";

export function CaseRow({ c, level = 3 }: { c: Case; level?: 2 | 3 }) {
  const H = level === 2 ? "h2" : "h3";
  return (
    <article className="sheet case-row">
      <dl className="aside meta">
        <div>
          <dt>Year</dt>
          <dd className="num">{c.year}</dd>
        </div>
        <div>
          <dt>Client</dt>
          <dd>{c.client}</dd>
        </div>
        <div>
          <dt>Role</dt>
          <dd>{c.role}</dd>
        </div>
      </dl>
      <div className="col case-row-body">
        <div className="mat" data-device={c.screens[0].device}>
          <Mockup screen={c.screens[0]} accent={c.accent} />
        </div>
        <div className="case-row-text">
          <H className="case-row-title">
            <Link to={`/work/${c.slug}`}>{c.title}</Link>
          </H>
          <p className="case-row-client">
            {c.client} · {c.sector} · {c.platform}
          </p>
          <p>{c.outcomeLine}</p>
          <p className="tags">
            {c.disciplines.map((d) => (
              <span key={d}>{d}</span>
            ))}
          </p>
          <span className="more" aria-hidden="true">
            Read the case study <ArrowRight size={16} />
          </span>
        </div>
      </div>
    </article>
  );
}
