import { useMemo } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "../router";
import { useCases, type UseCase } from "../content";
import { TrackedChanges } from "../components/TrackedChanges";
import { diffWords } from "../lib/diff";
import { readingGrade, words } from "../lib/text";

export default function UseCasePage({ useCase: u }: { useCase: UseCase }) {
  const parts = useMemo(() => diffWords(u.before, u.after), [u]);
  const related = useCases.filter((x) => x.slug !== u.slug).slice(0, 3);

  return (
    <>
      <header className="page-head wrap">
        <Link to="/use-cases" className="back-link">
          <ArrowLeft size={16} aria-hidden /> All use cases
        </Link>
        <h1 className="display">{u.heading}</h1>
        <p className="lede">{u.summary}</p>
        <p className="page-meta">
          For {u.team.toLowerCase()} · {u.docTypes.join(", ")}
        </p>
      </header>

      <section className="wrap uc-demo" aria-labelledby="uc-demo-title">
        <div className="uc-demo-side">
          <h2 id="uc-demo-title">A real draft, reviewed</h2>
          <p className="uc-prompt">
            <span>Instruction</span>
            <q>{u.instruction}</q>
          </p>
          <dl className="stats num">
            <div>
              <dt>Words</dt>
              <dd>
                {words(u.before).length}{" "}
                <ArrowRight size={14} aria-hidden className="arrow" />
                <span className="sr-only">to</span> {words(u.after).length}
              </dd>
            </div>
            <div>
              <dt>Reading grade</dt>
              <dd>
                {readingGrade(u.before)}{" "}
                <ArrowRight size={14} aria-hidden className="arrow" />
                <span className="sr-only">to</span> {readingGrade(u.after)}
              </dd>
            </div>
          </dl>
        </div>
        <div className="sheet">
          <div className="sheet-body">
            <TrackedChanges parts={parts} />
          </div>
        </div>
      </section>

      <div className="wrap uc-columns">
        <section aria-labelledby="pains-title">
          <h2 id="pains-title">What goes wrong today</h2>
          <ul className="pains">
            {u.pains.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="rules-title">
          <h2 id="rules-title">House style rules teams add first</h2>
          <table className="terms-table">
            <thead>
              <tr>
                <th scope="col">Avoid</th>
                <th scope="col">Prefer</th>
              </tr>
            </thead>
            <tbody>
              {u.rules.map((r) => (
                <tr key={r.avoid}>
                  <td>
                    <del>{r.avoid}</del>
                  </td>
                  <td>
                    <ins>{r.prefer}</ins>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>

      <section className="wrap workflow" aria-labelledby="workflow-title">
        <h2 id="workflow-title">How the team works with Lucid</h2>
        <ol className="steps">
          {u.workflow.map((w) => (
            <li key={w.step}>
              <h3>{w.step}</h3>
              <p>{w.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap" aria-label="Customer quote">
        <blockquote className="quote-lead">
          <p>{u.quote.text}</p>
          <footer>
            <cite>{u.quote.name}</cite>, {u.quote.role}
          </footer>
        </blockquote>
      </section>

      <section className="wrap related" aria-labelledby="related-title">
        <div className="section-head">
          <h2 id="related-title">Other teams</h2>
          <Link to="/contact" className="btn btn-primary">
            Set up a trial for {u.team.toLowerCase()}
          </Link>
        </div>
        <ul className="index-list">
          {related.map((r) => (
            <li key={r.slug}>
              <Link to={`/use-cases/${r.slug}`} className="index-row">
                <span className="index-team">{r.team}</span>
                <span className="index-heading">{r.heading}</span>
                <span className="index-docs">{r.docTypes.join(", ")}</span>
                <ArrowRight size={18} aria-hidden className="index-arrow" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
