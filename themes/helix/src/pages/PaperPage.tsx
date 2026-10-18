import { useState } from "react";
import { ArrowLeft, Copy } from "lucide-react";
import { Link } from "../router";
import { brand, papers, systems, type Paper } from "../content";
import { Plot } from "../components/Plot";
import { PaperRow } from "../components/PaperRow";
import { longDate } from "../lib/format";

export default function PaperPage({ paper }: { paper: Paper }) {
  const [copied, setCopied] = useState(false);
  const used = systems.filter((s) => paper.systems.includes(s.slug));
  const related = papers
    .filter((p) => p.slug !== paper.slug)
    .sort(
      (a, b) =>
        Number(b.topic === paper.topic) - Number(a.topic === paper.topic) ||
        b.date.localeCompare(a.date),
    )
    .slice(0, 3);
  const year = paper.date.slice(0, 4);
  const bibtex = `@article{${paper.report.toLowerCase().replaceAll("-", "")},
  title   = {${paper.title}},
  author  = {${paper.authors.join(" and ")}},
  journal = {${paper.venue}},
  year    = {${year}},
  pages   = {${paper.pages}},
  note    = {${brand.name} report ${paper.report}}
}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(bibtex);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <article className="paper wrap">
      <Link to="/research" className="back-link">
        <ArrowLeft size={16} aria-hidden /> Papers library
      </Link>
      <header className="paper-head">
        <p className="paper-meta">
          <span>{paper.topic}</span>
          <span>{paper.report}</span>
          <span>{paper.pages} pages</span>
        </p>
        <h1>{paper.title}</h1>
        <p className="paper-authors">{paper.authors.join(", ")}</p>
        <p className="paper-venue">
          <em>{paper.venue}</em> · published{" "}
          <time dateTime={paper.date}>{longDate(paper.date)}</time>
        </p>
      </header>

      <div className="paper-body">
        <div className="paper-main">
          <section aria-labelledby="abs-h">
            <h2 id="abs-h">Abstract</h2>
            <p className="abstract">{paper.abstract}</p>
          </section>
          <Plot figure={paper.figure} label="Fig. 1" />
          <section aria-labelledby="find-h">
            <h2 id="find-h">Key results</h2>
            <ul className="ticks">
              {paper.findings.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="paper-side" aria-label="Paper details">
          <h2>Hardware</h2>
          <ul className="side-list">
            {used.map((s) => (
              <li key={s.slug}>
                <Link to={`/systems/${s.slug}`}>{s.name}</Link>
                <span>
                  {s.qubits} qubits · {s.f2q}% 2Q
                </span>
              </li>
            ))}
          </ul>
          <h2>Cite</h2>
          <pre className="bibtex" tabIndex={0} aria-label="BibTeX citation">
            {bibtex}
          </pre>
          <button type="button" className="btn btn-quiet" onClick={copy}>
            <Copy size={16} aria-hidden /> Copy BibTeX
          </button>
          <p className="quiet-note" aria-live="polite">
            {copied ? "Citation copied to the clipboard." : ""}
          </p>
          <h2>Data and code</h2>
          <p>
            Raw data and analysis notebooks are available on request from{" "}
            <a href={`mailto:${brand.press}?subject=${paper.report}`}>
              {brand.press}
            </a>
            .
          </p>
        </aside>
      </div>

      <section className="section" aria-labelledby="rel-h">
        <h2 id="rel-h">Related papers</h2>
        <ul className="paper-list">
          {related.map((p) => (
            <PaperRow key={p.slug} paper={p} />
          ))}
        </ul>
      </section>
    </article>
  );
}
