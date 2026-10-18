import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Link } from "../router";
import { stories, type Story } from "../content";

export default function Customer({ story }: { story: Story }) {
  const related = stories.filter(
    (s) =>
      s.slug !== story.slug &&
      (s.size === story.size || s.industry === story.industry),
  );
  const more = [
    ...related,
    ...stories.filter((s) => s.slug !== story.slug && !related.includes(s)),
  ].slice(0, 2);

  return (
    <>
      <section className="page-head story-head">
        <div className="wrap">
          <Link to="/customers" className="text-link back">
            <ArrowLeft size={16} aria-hidden /> All customer stories
          </Link>
          <h1>{story.headline}</h1>
          <p className="lede">{story.summary}</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap story-layout">
          <aside className="facts" aria-label="At a glance">
            <dl>
              <div>
                <dt>Company</dt>
                <dd>{story.company}</dd>
              </div>
              <div>
                <dt>Industry</dt>
                <dd>{story.industry}</dd>
              </div>
              <div>
                <dt>Team</dt>
                <dd>{story.teamSize} people</dd>
              </div>
              <div>
                <dt>Based in</dt>
                <dd>{story.city}</dd>
              </div>
              <div>
                <dt>Before Sprint</dt>
                <dd>{story.before}</dd>
              </div>
              {story.facts.map((f) => (
                <div key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          </aside>

          <div className="story-body">
            <h2>Their board</h2>
            <div
              className="mini-board"
              role="img"
              aria-label={`${story.company} board columns: ${story.workflow.map((w) => (w.limit ? `${w.name}, limit ${w.limit}` : w.name)).join("; ")}`}
            >
              {story.workflow.map((w) => (
                <div key={w.name} className="mini-col">
                  <span className="mini-name">{w.name}</span>
                  <span className="mini-limit">
                    {w.limit ? `limit ${w.limit}` : "no limit"}
                  </span>
                </div>
              ))}
            </div>

            {story.body.map((b) => (
              <div key={b.title} className="prose">
                <h2>{b.title}</h2>
                {b.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            ))}

            <figure className="quote quote-inline">
              <blockquote>
                <p>{story.quote}</p>
              </blockquote>
              <figcaption>
                <strong>{story.person}</strong> {story.role}, {story.company}
              </figcaption>
            </figure>

            <h2>How they set it up</h2>
            <ul className="ticks">
              {story.setup.map((s) => (
                <li key={s}>
                  <Check size={18} aria-hidden />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section related">
        <div className="wrap">
          <h2>More teams like this one</h2>
          <ul className="stories stories-2">
            {more.map((s) => (
              <li key={s.slug} className="story">
                <p className="story-mark">{s.company}</p>
                <p className="story-meta">
                  {s.industry} · {s.teamSize} people
                </p>
                <h3>
                  <Link to={`/customers/${s.slug}`}>{s.headline}</Link>
                </h3>
                <span className="text-link" aria-hidden="true">
                  Read the story <ArrowRight size={16} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section cta-band">
        <div className="wrap cta-row">
          <h2>Copy {story.company}’s setup into a free workspace.</h2>
          <div className="actions">
            <Link to="/signup" className="btn btn-primary btn-lg">
              Start free
            </Link>
            <Link to="/contact" className="btn btn-line btn-lg">
              Talk to sales
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
