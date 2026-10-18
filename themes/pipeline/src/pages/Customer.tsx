import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "../router";
import { stories, type Story } from "../content";

export default function Customer({ story }: { story: Story }) {
  const related = stories
    .filter(
      (s) =>
        s.slug !== story.slug &&
        (s.size === story.size || s.switchedFrom === story.switchedFrom),
    )
    .slice(0, 2);
  const more = related.length
    ? related
    : stories.filter((s) => s.slug !== story.slug).slice(0, 2);

  return (
    <article>
      <header className="page-head wrap story-top">
        <Link to="/customers" className="text-link back">
          <ArrowLeft size={16} aria-hidden /> All customers
        </Link>
        <h1>{story.headline}</h1>
        <p className="lede">{story.summary}</p>
      </header>

      <div className="wrap story-layout">
        <aside className="story-facts" aria-label="At a glance">
          <dl>
            <div>
              <dt>Industry</dt>
              <dd>{story.industry}</dd>
            </div>
            <div>
              <dt>Sales team</dt>
              <dd>{story.reps} reps</dd>
            </div>
            <div>
              <dt>Region</dt>
              <dd>{story.region}</dd>
            </div>
            <div>
              <dt>Before Pipeline</dt>
              <dd>{story.switchedFrom}</dd>
            </div>
            <div>
              <dt>Uses</dt>
              <dd>{story.used.join(", ")}</dd>
            </div>
          </dl>
        </aside>

        <div className="prose">
          <section aria-labelledby="h-results">
            <h2 id="h-results">What changed</h2>
            <ul className="results">
              {story.results.map((r) => (
                <li key={r.label}>
                  <span className="num result-value">{r.value}</span>
                  <span>{r.label}</span>
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="h-before">
            <h2 id="h-before">Before</h2>
            {story.challenge.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </section>
          <figure className="pull">
            <blockquote>
              <p>“{story.quote.text}”</p>
            </blockquote>
            <figcaption>
              <strong>{story.quote.name}</strong>, {story.quote.role},{" "}
              {story.company}
            </figcaption>
          </figure>
          <section aria-labelledby="h-how">
            <h2 id="h-how">How they rolled it out</h2>
            {story.approach.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </section>
        </div>
      </div>

      <section className="wrap section" aria-labelledby="h-more">
        <h2 id="h-more">Teams like {story.company}</h2>
        <ul className="story-list">
          {more.map((s) => (
            <li key={s.slug}>
              <Link to={`/customers/${s.slug}`} className="story-row">
                <span className="story-co">{s.company}</span>
                <span className="story-head">{s.headline}</span>
                <span className="story-meta">
                  {s.industry} · {s.reps} reps
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap close" aria-labelledby="h-close">
        <h2 id="h-close">Run your next Thursday call in Pipeline.</h2>
        <div className="cta-row">
          <Link to="/demo" className="btn btn-primary btn-lg">
            Book a demo <ArrowRight size={18} aria-hidden />
          </Link>
          <Link to="/app" className="btn btn-quiet btn-lg">
            Open the demo board
          </Link>
        </div>
      </section>
    </article>
  );
}
