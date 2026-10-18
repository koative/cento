import { useState } from "react";
import { changelogPage, releases, type Release } from "../content";
import { formatDay } from "../lib/format";

const kinds: ("All" | Release["kind"])[] = ["All", "New", "Improved", "Fixed"];

export default function Changelog() {
  const [kind, setKind] = useState<(typeof kinds)[number]>("All");
  const shown = releases.filter((r) => kind === "All" || r.kind === kind);

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <h1>{changelogPage.h1}</h1>
          <p className="lede">{changelogPage.lede}</p>
        </div>
      </section>
      <section className="section">
        <div className="wrap changelog">
          <fieldset className="chips">
            <legend>Show</legend>
            {kinds.map((k) => (
              <label key={k}>
                <input
                  type="radio"
                  name="kind"
                  checked={kind === k}
                  onChange={() => setKind(k)}
                />
                <span>{k}</span>
              </label>
            ))}
          </fieldset>
          <p className="sr-only" aria-live="polite">
            {shown.length} releases shown
          </p>
          <ol className="releases">
            {shown.map((r) => (
              <li key={r.version} className="release">
                <div className="release-side">
                  <time dateTime={r.date}>{formatDay(r.date)}</time>
                  <span className="num">v{r.version}</span>
                </div>
                <div className="release-body">
                  <span className="tag" data-kind={r.kind}>
                    {r.kind}
                  </span>
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
        </div>
      </section>
    </>
  );
}
