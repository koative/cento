import { ArrowRight } from "lucide-react";
import { capabilities, insights, type Capability } from "../content";
import { personById } from "../lib/format";
import { Link } from "../router";
import { Exhibit } from "../components/Exhibit";
import { InsightItem } from "../components/InsightItem";

export function CapabilityPage({ cap }: { cap: Capability }) {
  const lead = personById(cap.lead);
  const related = [
    ...insights.filter((p) => p.capability === cap.slug),
    ...insights.filter((p) => p.capability !== cap.slug),
  ].slice(0, 3);
  const others = capabilities.filter((c) => c.slug !== cap.slug);

  return (
    <>
      <header className="page-head wrap">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/capabilities">Capabilities</Link>
        </nav>
        <h1 className="display">{cap.name}</h1>
        <p className="action-title">{cap.title}</p>
        <p className="lede">{cap.intro}</p>
      </header>

      <section className="wrap section-tight split split-top">
        <h2 className="h3">Questions clients bring us</h2>
        <ul className="question-list">
          {cap.questions.map((q) => (
            <li key={q}>{q}</li>
          ))}
        </ul>
      </section>

      <section className="wrap section evidence">
        <Exhibit data={cap.exhibit} n={1} />
        <aside className="story" aria-labelledby="story-title">
          <h2 className="h3" id="story-title">
            Recent work
          </h2>
          <p className="story-client">{cap.story.client}</p>
          <p>{cap.story.situation}</p>
          <p className="story-result">{cap.story.result}</p>
        </aside>
      </section>

      <section className="wrap section" aria-labelledby="approach-title">
        <h2 className="h2" id="approach-title">
          How a {cap.name.toLowerCase()} engagement runs
        </h2>
        <ol className="phases">
          {cap.approach.map((p) => (
            <li key={p.name}>
              <span className="phase-weeks num">{p.weeks}</span>
              <h3>{p.name}</h3>
              <p>{p.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap section engagement">
        <div>
          <h2 className="h3">What you keep</h2>
          <ul className="ruled-list">
            {cap.deliverables.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>
        <dl className="spec">
          <div>
            <dt>Typical length</dt>
            <dd>{cap.duration}</dd>
          </div>
          <div>
            <dt>Team</dt>
            <dd>{cap.team}</dd>
          </div>
          <div>
            <dt>Fees</dt>
            <dd>
              Fixed per phase, with part of the fee at risk against agreed
              outcomes.
            </dd>
          </div>
        </dl>
        {lead && (
          <div className="lead-card">
            {lead.photo && (
              <img
                src={lead.photo}
                alt={`Portrait of ${lead.name}`}
                width={240}
                height={320}
                loading="lazy"
              />
            )}
            <div>
              <p className="lead-name">{lead.name}</p>
              <p className="lead-role">
                {lead.role}, {lead.office}
              </p>
              <Link to="/contact" className="btn btn-primary">
                Discuss a problem with {lead.name.split(" ")[0]}
              </Link>
            </div>
          </div>
        )}
      </section>

      <section className="wrap section" aria-labelledby="related-title">
        <h2 className="h2" id="related-title">
          Further reading
        </h2>
        <div className="insight-grid">
          {related.map((p) => (
            <InsightItem key={p.slug} post={p} />
          ))}
        </div>
      </section>

      <nav className="wrap section other-caps" aria-labelledby="other-title">
        <h2 className="h3" id="other-title">
          Other capabilities
        </h2>
        <ul>
          {others.map((c) => (
            <li key={c.slug}>
              <Link to={`/capabilities/${c.slug}`} className="link-arrow">
                {c.name} <ArrowRight aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
