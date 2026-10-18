import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { composer, home, stages, stories } from "../content";
import { LoopComposer } from "../components/Loop";
import { PipelinePreview, ScorecardSample } from "../components/Visuals";

export default function Home() {
  const [lead, ...rest] = stories;
  return (
    <>
      <section className="hero wrap">
        <div className="hero-copy">
          <h1>{home.hero.title}</h1>
          <p className="lede">{home.hero.lede}</p>
          <div className="actions">
            <Link to="/app" className="btn btn-primary btn-lg">
              Open the live demo <ArrowRight size={18} aria-hidden />
            </Link>
            <Link to="/demo" className="btn btn-quiet btn-lg">
              Book a walkthrough
            </Link>
          </div>
          <p className="quiet-note">{home.hero.note}</p>
        </div>
        <PipelinePreview />
      </section>

      <section className="wrap section" aria-labelledby="h-stages">
        <div className="section-head">
          <h2 id="h-stages">{home.pipeline.title}</h2>
          <p>{home.pipeline.body}</p>
        </div>
        <ol className="stage-strip">
          {stages.map((s) => (
            <li key={s.id}>
              <h3>{s.label}</h3>
              <p>{s.promise}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="band band-ink" aria-labelledby="h-composer">
        <div className="wrap section">
          <div className="section-head">
            <h2 id="h-composer">{composer.title}</h2>
            <p>{composer.body}</p>
          </div>
          <LoopComposer />
        </div>
      </section>

      <section className="wrap section split" aria-labelledby="h-kits">
        <div>
          <h2 id="h-kits">{home.kits.title}</h2>
          <p>{home.kits.body}</p>
          <ul className="ticks">
            {home.kits.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <Link to="/product" className="text-link">
            How kits and scorecards work <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
        <ScorecardSample />
      </section>

      <section className="band band-sunk" aria-labelledby="h-messages">
        <div className="wrap section split split-reverse">
          <div>
            <h2 id="h-messages">{home.messages.title}</h2>
            <p>{home.messages.body}</p>
          </div>
          <ol className="thread">
            {home.messages.timeline.map((m) => (
              <li key={m.when}>
                <span className="thread-meta">
                  <span className="num">{m.when}</span> · {m.who}
                </span>
                <p>{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="feature-story" aria-labelledby="h-lead-story">
        <img
          src={lead.image}
          alt={lead.imageAlt}
          width={1400}
          height={1050}
          loading="lazy"
        />
        <div className="feature-story-copy">
          <h2 id="h-lead-story">{lead.headline}</h2>
          <blockquote>
            <p>“{lead.quote.text}”</p>
            <footer>
              {lead.quote.by}, {lead.quote.role}
            </footer>
          </blockquote>
          <Link to={`/customers/${lead.slug}`} className="btn btn-light">
            Read the {lead.company} story <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
      </section>

      <section className="wrap section" aria-labelledby="h-fair">
        <div className="section-head">
          <h2 id="h-fair">{home.fair.title}</h2>
          <p>{home.fair.body}</p>
        </div>
        <dl className="ruled-list">
          {home.fair.items.map((f) => (
            <div key={f.title}>
              <dt>{f.title}</dt>
              <dd>{f.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="wrap section" aria-labelledby="h-more">
        <div className="section-head section-head-row">
          <h2 id="h-more">{home.storiesTitle}</h2>
          <Link to="/customers" className="text-link">
            All customer stories <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
        <ul className="story-rows">
          {rest.slice(0, 3).map((s) => (
            <li key={s.slug}>
              <Link to={`/customers/${s.slug}`}>
                <img
                  src={s.image}
                  alt=""
                  width={320}
                  height={220}
                  loading="lazy"
                />
                <span>
                  <strong>{s.company}</strong>
                  <span>{s.summary}</span>
                </span>
                <ArrowRight size={18} aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap section quiet-block" aria-labelledby="h-price">
        <h2 id="h-price">{home.pricingTeaser.title}</h2>
        <p>{home.pricingTeaser.body}</p>
        <Link to="/pricing" className="text-link">
          See plans and the full comparison <ArrowRight size={16} aria-hidden />
        </Link>
      </section>

      <section className="close" aria-labelledby="h-close">
        <div className="wrap">
          <h2 id="h-close">{home.close.title}</h2>
          <p>{home.close.body}</p>
          <div className="actions">
            <Link to="/signin" className="btn btn-primary btn-lg">
              Start free
            </Link>
            <Link to="/app" className="btn btn-light btn-lg">
              Explore the demo workspace
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
