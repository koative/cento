import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "../router";
import { customers, stories, type Story } from "../content";
import { LineChart } from "../components/Charts";
import { metricLine } from "../components/format";

export default function Customer({ story }: { story: Story }) {
  const related = stories
    .filter((s) => s.slug !== story.slug)
    .sort(
      (a, b) =>
        Number(b.industry === story.industry) -
          Number(a.industry === story.industry) || b.since - a.since,
    )
    .slice(0, 2);
  const m = story.metric;
  const facts = [
    ["Industry", story.industry],
    ["Team", story.size],
    ["Based in", story.region],
    ["Plan", story.plan],
    ["Volume", story.volume],
    ["Customer since", String(story.since)],
  ];

  return (
    <article>
      <header className="page-head wrap story-head">
        <Link to="/customers" className="back-link">
          <ArrowLeft size={16} aria-hidden /> All customer stories
        </Link>
        <p className="story-company-line">
          <span className="monogram" aria-hidden>
            {story.company[0]}
          </span>
          {story.company} · {story.description}
        </p>
        <h1>{story.headline}</h1>
        <p className="lede">{story.summary}</p>
      </header>

      <section className="wrap story-result" aria-label="Result">
        <div className="panel">
          <div className="panel-head">
            <h2>{m.label}</h2>
            <span className="num story-result-line">{metricLine(m)}</span>
          </div>
          <LineChart
            label={`${m.label}, weekly, over twelve weeks`}
            labels={story.weekly.map((_, i) => `Week ${i + 1}`)}
            format={(n) => `${+n.toFixed(1)}${m.unit}`}
            series={[{ label: m.label, values: story.weekly }]}
            annotations={[{ index: story.shipWeek, label: "Fix shipped" }]}
          />
        </div>
        <dl className="spec-table">
          {facts.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
          <div>
            <dt>Stack</dt>
            <dd className="mono">{story.stack.join(", ")}</dd>
          </div>
        </dl>
      </section>

      <div className="wrap story-body">
        <section>
          <h2>{customers.story.problem}</h2>
          {story.challenge.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </section>
        <section>
          <h2>{customers.story.changed}</h2>
          {story.approach.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </section>
        <figure className="pull-quote">
          <blockquote>
            <p>“{story.quote.text}”</p>
          </blockquote>
          <figcaption>
            <strong>{story.quote.name}</strong> {story.quote.role},{" "}
            {story.company}
          </figcaption>
        </figure>
        <section>
          <h2>{customers.story.built}</h2>
          <ul className="ticks">
            {story.built.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </section>
      </div>

      <section className="wrap section">
        <h2 className="section-title">{customers.story.more}</h2>
        <ul className="story-rows">
          {related.map((s) => (
            <li key={s.slug}>
              <Link to={`/customers/${s.slug}`}>
                <span className="story-company">{s.company}</span>
                <span className="story-headline">{s.headline}</span>
                <span className="story-industry">{s.industry}</span>
                <ArrowRight size={18} aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="close-band">
        <div className="wrap close">
          <h2>{customers.story.closeTitle}</h2>
          <p>{customers.story.closeText}</p>
          <div className="actions">
            <Link to="/demo" className="btn btn-primary btn-lg">
              Book a demo
            </Link>
            <Link to="/app/funnels" className="btn btn-ghost-light btn-lg">
              Try the funnel builder
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
