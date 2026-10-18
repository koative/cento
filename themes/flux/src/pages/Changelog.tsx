import { useState } from "react";
import { changelog } from "../content";

const kinds = ["All", "New", "Improved", "Fixed"];

export default function Changelog() {
  const [kind, setKind] = useState("All");
  const shown = changelog.entries.filter(
    (e) => kind === "All" || e.kind === kind,
  );

  return (
    <>
      <header className="page-head wrap">
        <h1>{changelog.heading}</h1>
        <p className="lede">{changelog.lede}</p>
        <div className="chips" role="group" aria-label="Type of change">
          {kinds.map((k) => (
            <button
              key={k}
              type="button"
              aria-pressed={kind === k}
              onClick={() => setKind(k)}
            >
              {k}
            </button>
          ))}
        </div>
      </header>
      <ol className="wrap release-list" aria-live="polite">
        {shown.map((e) => (
          <li key={e.version} className="release">
            <div className="release-meta">
              <span className="release-version num">v{e.version}</span>
              <time className="num">{e.date}</time>
              <span className="release-kind" data-kind={e.kind}>
                {e.kind}
              </span>
            </div>
            <div className="release-body">
              <h2>{e.title}</h2>
              <ul>
                {e.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}
