import { useState } from "react";
import { changelog } from "../content";
import { date } from "../lib/format";

const kinds = ["All", "New", "Improved", "Fixed"] as const;

export default function Changelog() {
  const [kind, setKind] = useState<(typeof kinds)[number]>("All");
  const list = changelog.entries.filter(
    (e) => kind === "All" || e.kind === kind,
  );
  return (
    <div className="wrap page narrow">
      <header className="page-head">
        <h1>{changelog.heading}</h1>
        <p className="lede">{changelog.lede}</p>
      </header>
      <div className="chips" role="group" aria-label="Type of change">
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
        {list.length} entries
      </p>
      <ol className="releases">
        {list.map((e) => (
          <li key={e.version}>
            <div className="release-meta">
              <time dateTime={e.date} className="tabular">
                {date(e.date)}
              </time>
              <code>v{e.version}</code>
            </div>
            <article>
              <h2>
                <span className="tag" data-kind={e.kind}>
                  {e.kind}
                </span>
                {e.title}
              </h2>
              <p>{e.text}</p>
            </article>
          </li>
        ))}
      </ol>
    </div>
  );
}
