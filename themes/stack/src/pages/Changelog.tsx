import { useState } from "react";
import { changelogPage, releases, type ChangeType } from "../content";
import { Inline } from "../components/Code";

const TYPES: ChangeType[] = ["Added", "Changed", "Fixed", "Deprecated"];

export default function Changelog() {
  const [type, setType] = useState<ChangeType | "All">("All");
  const shown = releases
    .map((r) => ({
      ...r,
      changes: r.changes.filter((c) => type === "All" || c.type === type),
    }))
    .filter((r) => r.changes.length);

  return (
    <div className="wrap page changelog">
      <header className="page-head">
        <h1>{changelogPage.h1}</h1>
        <p className="lead">{changelogPage.lead}</p>
      </header>

      <div role="group" aria-label="Show changes of type" className="chips">
        {(["All", ...TYPES] as const).map((t) => (
          <button
            key={t}
            type="button"
            aria-pressed={type === t}
            onClick={() => setType(t)}
          >
            {t}
          </button>
        ))}
      </div>
      <p className="result-count" role="status">
        {type === "All"
          ? `${releases.length} releases`
          : `${shown.length} releases with ${type.toLowerCase()} entries`}
      </p>

      <ol className="releases">
        {shown.map((r) => (
          <li key={r.version} className="release">
            <div className="release-side">
              <span className="release-v">{r.version}</span>
              <time dateTime={r.date}>{r.date}</time>
              {r.breaking && <span className="pill pill-alert">Breaking</span>}
            </div>
            <div className="release-body">
              <h2>{r.title}</h2>
              <p>{r.body}</p>
              <ul>
                {r.changes.map((c) => (
                  <li key={c.text}>
                    <span className={`change change-${c.type.toLowerCase()}`}>
                      {c.type}
                    </span>
                    <span>
                      <Inline text={c.text} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
