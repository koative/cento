import { useState } from "react";
import { AlertTriangle, ArrowLeft, ArrowRight, Lightbulb } from "lucide-react";
import { Link } from "../router";
import { guides, type Guide as GuideT } from "../content";
import { CodeBlock, Inline } from "../components/Code";
import { DocsLayout } from "../components/DocsLayout";
import { BackoffChart, LifecycleDiagram } from "../components/Figures";

function Helpful() {
  const [answer, setAnswer] = useState<"yes" | "no" | null>(null);
  return (
    <div className="helpful">
      <p id="helpful-q">Was this guide useful?</p>
      {answer === null ? (
        <div role="group" aria-labelledby="helpful-q" className="seg">
          <button type="button" onClick={() => setAnswer("yes")}>
            Yes
          </button>
          <button type="button" onClick={() => setAnswer("no")}>
            No
          </button>
        </div>
      ) : null}
      <p role="status" className="quiet-note">
        {answer === "yes" && "Thanks. Marta reads every response."}
        {answer === "no" && (
          <>
            Sorry about that.{" "}
            <Link to="/support">Tell us what was missing</Link> and we'll fix
            the page.
          </>
        )}
      </p>
    </div>
  );
}

export default function Guide({ guide }: { guide: GuideT }) {
  const i = guides.indexOf(guide);
  const prev = guides[i - 1];
  const next = guides[i + 1];

  return (
    <DocsLayout
      toc={guide.sections.map((s) => ({ id: s.id, label: s.heading }))}
    >
      <article className="doc">
        <header className="doc-head">
          <p className="crumbs">
            <Link to="/guides">Guides</Link> <span aria-hidden>/</span>{" "}
            {guide.topic}
          </p>
          <h1>{guide.title}</h1>
          <p className="lead">{guide.summary}</p>
          <p className="doc-meta">
            <span>{guide.level}</span>
            <span className="tabular">{guide.minutes} min read</span>
            <span>
              Updated <time dateTime={guide.updated}>{guide.updated}</time>
            </span>
          </p>
        </header>

        {guide.sections.map((s) => (
          <section
            key={s.id}
            id={s.id}
            className="doc-section"
            aria-labelledby={`${s.id}-h`}
          >
            <h2 id={`${s.id}-h`}>{s.heading}</h2>
            {s.body.map((p) => (
              <p key={p}>
                <Inline text={p} />
              </p>
            ))}
            {s.figure === "lifecycle" && <LifecycleDiagram />}
            {s.figure === "backoff" && <BackoffChart />}
            {s.code && <CodeBlock code={s.code} />}
            {s.steps && (
              <ol className="steps">
                {s.steps.map((step) => (
                  <li key={step}>
                    <Inline text={step} />
                  </li>
                ))}
              </ol>
            )}
            {s.note && (
              <aside
                className={`note note-${s.note.kind}`}
                aria-label={s.note.kind === "tip" ? "Tip" : "Warning"}
              >
                {s.note.kind === "tip" ? (
                  <Lightbulb size={18} aria-hidden />
                ) : (
                  <AlertTriangle size={18} aria-hidden />
                )}
                <p>
                  <Inline text={s.note.text} />
                </p>
              </aside>
            )}
          </section>
        ))}

        <Helpful />

        <nav className="pager" aria-label="Guides">
          {prev ? (
            <Link to={`/guides/${prev.slug}`} className="pager-prev">
              <span>
                <ArrowLeft size={14} aria-hidden /> Previous
              </span>
              {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link to={`/guides/${next.slug}`} className="pager-next">
              <span>
                Next <ArrowRight size={14} aria-hidden />
              </span>
              {next.title}
            </Link>
          )}
        </nav>
      </article>
    </DocsLayout>
  );
}
