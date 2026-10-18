import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "../router";
import { customersPage, stories, type Story } from "../content";
import { LoopTimeline } from "../components/Loop";

export default function Customer({ story: s }: { story: Story }) {
  const related = [...stories.filter((x) => x.slug !== s.slug)]
    .sort(
      (a, b) =>
        Number(b.industry === s.industry) - Number(a.industry === s.industry),
    )
    .slice(0, 3);

  return (
    <>
      <section className="wrap story-hero">
        <Link to="/customers" className="text-link back">
          <ArrowLeft size={16} aria-hidden /> All customer stories
        </Link>
        <h1>{s.headline}</h1>
        <p className="lede">{s.summary}</p>
      </section>
      <figure className="wrap story-photo">
        <img src={s.image} alt={s.imageAlt} width={1400} height={933} />
      </figure>

      <div className="wrap story-body">
        <aside className="story-facts" aria-label={`${s.company} at a glance`}>
          <dl>
            <div>
              <dt>Company</dt>
              <dd>{s.company}</dd>
            </div>
            <div>
              <dt>Industry</dt>
              <dd>{s.industry}</dd>
            </div>
            <div>
              <dt>Size</dt>
              <dd>{s.size}</dd>
            </div>
            <div>
              <dt>Based in</dt>
              <dd>{s.location}</dd>
            </div>
            <div>
              <dt>On Cadence since</dt>
              <dd className="num">{s.since}</dd>
            </div>
            {s.facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd className="num">{f.value}</dd>
              </div>
            ))}
          </dl>
        </aside>

        <article className="prose">
          <h2>The challenge</h2>
          {s.challenge.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <h2>What they changed</h2>
          {s.approach.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <ul className="ticks">
            {s.practices.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <h2>
            Their loop for {/^[aeiou]/i.test(s.loop.role) ? "an" : "a"}{" "}
            {s.loop.role.toLowerCase()}
          </h2>
          <LoopTimeline
            stepIds={s.loop.steps}
            pace={s.loop.pace}
            label={`${s.company} interview loop for ${s.loop.role}`}
          />
          <blockquote className="pull">
            <p>“{s.quote.text}”</p>
            <footer>
              {s.quote.by}, {s.quote.role}
            </footer>
          </blockquote>
          <h2>The outcome</h2>
          {s.outcome.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </article>
      </div>

      <section className="wrap section" aria-labelledby="h-related">
        <h2 id="h-related">More stories</h2>
        <ul className="story-rows">
          {related.map((r) => (
            <li key={r.slug}>
              <Link to={`/customers/${r.slug}`}>
                <img
                  src={r.image}
                  alt=""
                  width={320}
                  height={220}
                  loading="lazy"
                />
                <span>
                  <strong>{r.company}</strong>
                  <span>{r.summary}</span>
                </span>
                <ArrowRight size={18} aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="close" aria-labelledby="h-close">
        <div className="wrap">
          <h2 id="h-close">{customersPage.close.title}</h2>
          <p>{customersPage.close.body}</p>
          <div className="actions">
            <Link to="/signin" className="btn btn-primary btn-lg">
              Start free
            </Link>
            <Link to="/demo" className="btn btn-light btn-lg">
              Book a walkthrough
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
