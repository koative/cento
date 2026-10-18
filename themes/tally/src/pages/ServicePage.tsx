import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { services, stories, type Service } from "../content";
import { upcoming } from "../lib/deadlines";
import { dollars } from "../lib/format";
import {
  DeadlineRows,
  Faq,
  Img,
  ServiceRow,
  TickList,
} from "../components/Bits";

export function ServicePage({ service: s }: { service: Service }) {
  const seen = new Set<string>();
  const deadlines = upcoming((r) => s.deadlines.includes(r.id))
    .filter((d) => !seen.has(d.rule.id) && seen.add(d.rule.id))
    .slice(0, 4);
  const story = stories.find((x) => x.services.includes(s.slug));
  const related = s.related
    .map((slug) => services.find((x) => x.slug === slug))
    .filter((x): x is Service => !!x);

  return (
    <>
      <header className="page-head wrap svc-head">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/services">Services</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{s.name}</span>
        </nav>
        <div className="svc-head-grid">
          <div>
            <h1>{s.name}</h1>
            <p className="lede">{s.summary}</p>
          </div>
          <dl className="fact-card">
            <div>
              <dt>From</dt>
              <dd className="fact-price">
                {dollars(s.from)}
                <small>{s.unit}</small>
              </dd>
            </div>
            <div>
              <dt>Cadence</dt>
              <dd>{s.group}</dd>
            </div>
            <div>
              <dt>Turnaround</dt>
              <dd>{s.turnaround}</dd>
            </div>
            <Link to="/book" className="btn btn-primary">
              Book a call about this
            </Link>
          </dl>
        </div>
      </header>

      <section className="wrap section svc-body" aria-labelledby="inc-h">
        <div className="svc-for">
          <h2>Who it's for</h2>
          <p>{s.forWho}</p>
        </div>
        <div>
          <h2 id="inc-h">What's included</h2>
          <TickList items={s.included} />
        </div>
      </section>

      <section className="band band-paper" aria-labelledby="how-h">
        <div className="wrap section">
          <h2 id="how-h" className="section-title">
            How it runs
          </h2>
          <ol className="steps is-three">
            {s.steps.map((st, i) => (
              <li key={st.title}>
                <span className="step-when">Step {i + 1}</span>
                <h3>{st.title}</h3>
                <p>{st.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {deadlines.length > 0 && (
        <section className="wrap section due-grid" aria-labelledby="sd-h">
          <div>
            <h2 id="sd-h">Deadlines this covers</h2>
            <p>
              The next date for each filing we handle as part of{" "}
              {s.name.toLowerCase()}.
            </p>
            <Link to="/calendar" className="text-link">
              See your full tax calendar <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <DeadlineRows items={deadlines} compact />
        </section>
      )}

      {story && (
        <section className="band band-ink" aria-labelledby="cs-h">
          <div className="wrap section story-lead">
            <Img photo={story.photo} className="story-lead-img" />
            <div className="story-lead-copy">
              <h2 id="cs-h" className="sr-only">
                Client story: {story.business}
              </h2>
              <blockquote>
                <p>“{story.quote}”</p>
              </blockquote>
              <p className="story-who">
                <strong>{story.owner}</strong>, {story.business} — {story.trade}
              </p>
              <p className="story-outcome">{story.outcome}</p>
            </div>
          </div>
        </section>
      )}

      <section className="wrap section faq-section" aria-labelledby="sf-h">
        <h2 id="sf-h">Common questions</h2>
        <Faq items={s.faq} />
      </section>

      <section className="wrap section" aria-labelledby="rel-h">
        <h2 id="rel-h" className="section-title">
          Often paired with
        </h2>
        <ul className="ledger-list">
          {related.map((r) => (
            <ServiceRow key={r.slug} s={r} />
          ))}
        </ul>
      </section>
    </>
  );
}
