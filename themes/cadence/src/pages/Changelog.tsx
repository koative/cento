import { useState } from "react";
import { changelog } from "../content";
import { formatDate } from "../lib/format";

const kinds = ["All", "New", "Improved", "Fixed"] as const;

export default function Changelog() {
  const [kind, setKind] = useState<(typeof kinds)[number]>("All");
  const shown = changelog.releases.filter(
    (r) => kind === "All" || r.kind === kind,
  );

  return (
    <>
      <section className="page-hero wrap">
        <h1>{changelog.hero.title}</h1>
        <p className="lede">{changelog.hero.lede}</p>
      </section>
      <section className="wrap section-tight" aria-label="Releases">
        <div
          className="chips"
          role="group"
          aria-label="Filter by type of change"
        >
          {kinds.map((k) => (
            <button
              key={k}
              type="button"
              className="chip"
              aria-pressed={kind === k}
              onClick={() => setKind(k)}
            >
              {k}
            </button>
          ))}
        </div>
        <p className="result-count" aria-live="polite">
          {shown.length} {shown.length === 1 ? "release" : "releases"}
        </p>
        <ol className="releases">
          {shown.map((r) => (
            <li key={r.version}>
              <div className="release-meta">
                <time dateTime={r.date}>{formatDate(r.date, true)}</time>
                <span className="num">v{r.version}</span>
                <span className="tag" data-kind={r.kind}>
                  {r.kind}
                </span>
              </div>
              <div>
                <h2>{r.title}</h2>
                <ul>
                  {r.notes.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
