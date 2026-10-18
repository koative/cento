import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { Link } from "../router";
import { solutions, type Solution } from "../content";

export default function SolutionPage({ solution: s }: { solution: Solution }) {
  const related = [
    ...solutions.filter((x) => x.slug !== s.slug && x.team === s.team),
    ...solutions.filter((x) => x.team !== s.team),
  ].slice(0, 3);
  return (
    <>
      <header className="page-head wrap">
        <Link to="/solutions" className="back-link">
          <ArrowLeft size={16} aria-hidden /> All solutions
        </Link>
        <h1>{s.name}</h1>
        <p className="lede">{s.summary}</p>
        <dl className="meta-row">
          <div>
            <dt>Owned by</dt>
            <dd>{s.team}</dd>
          </div>
          <div>
            <dt>Frameworks</dt>
            <dd>{s.frameworks.join(", ")}</dd>
          </div>
          <div>
            <dt>Steps</dt>
            <dd>{s.steps.length}</dd>
          </div>
        </dl>
      </header>

      <section className="wrap solution-body">
        <div className="solution-main">
          <h2>The problem</h2>
          <p className="prose">{s.problem}</p>

          <h2>How Cipher handles it</h2>
          <ol className="steps">
            {s.steps.map((st) => (
              <li key={st.title}>
                <h3>{st.title}</h3>
                <p>{st.text}</p>
              </li>
            ))}
          </ol>

          <h2>Evidence you hand the auditor</h2>
          <ul className="tick-list">
            {s.evidence.map((e) => (
              <li key={e}>
                <Check size={16} aria-hidden /> {e}
              </li>
            ))}
          </ul>
        </div>

        <aside className="rule-card" aria-label="Campaign rule">
          <p className="rule-name">{s.rule.name}</p>
          <dl>
            <div>
              <dt>Scope</dt>
              <dd>{s.rule.scope}</dd>
            </div>
            <div>
              <dt>When</dt>
              <dd>{s.rule.when}</dd>
            </div>
            <div>
              <dt>Then</dt>
              <dd>{s.rule.then}</dd>
            </div>
          </dl>
          <p className="quiet small">
            Ships as a campaign template. Every field is editable.
          </p>
          <Link to="/demo" className="btn btn-primary">
            Set this up on a call
          </Link>
          <Link to="/app/review" className="btn btn-quiet">
            Try the review queue
          </Link>
        </aside>
      </section>

      {s.quote && (
        <section className="pull wrap" aria-label="Customer quote">
          <figure>
            <blockquote>
              <p>{s.quote.text}</p>
            </blockquote>
            <figcaption>
              <strong>{s.quote.name}</strong>
              <span>{s.quote.role}</span>
            </figcaption>
          </figure>
        </section>
      )}

      <section className="index-section wrap" aria-labelledby="related-title">
        <h2 id="related-title">Related solutions</h2>
        <ul className="index-list">
          {related.map((r) => (
            <li key={r.slug}>
              <Link to={`/solutions/${r.slug}`}>
                <span className="index-name">{r.name}</span>
                <span className="index-summary">{r.summary}</span>
                <span className="index-meta">{r.team}</span>
                <ArrowUpRight size={18} aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
