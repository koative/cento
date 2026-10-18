import { useState } from "react";
import { changelog } from "../content";
import { longDate } from "../lib/format";

const tags = ["All", "New", "Improved", "Fixed"];

export default function Changelog() {
  const [tag, setTag] = useState("All");
  const list = changelog.entries.filter((e) => tag === "All" || e.tag === tag);

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <h1>{changelog.h1}</h1>
          <p className="lede">{changelog.lead}</p>
        </div>
      </section>
      <section className="section-tight">
        <div className="wrap changelog">
          <div className="chips" role="group" aria-label="Filter by type">
            {tags.map((t) => (
              <button
                key={t}
                type="button"
                className="chip"
                aria-pressed={tag === t}
                onClick={() => setTag(t)}
              >
                {t}
              </button>
            ))}
          </div>
          <ol className="log">
            {list.map((e) => (
              <li key={e.version}>
                <div className="log-meta">
                  <time dateTime={e.date} className="num">
                    {longDate(e.date)}
                  </time>
                  <span className="num">v{e.version}</span>
                  <span
                    className={`pill pill-${e.tag === "Fixed" ? "neutral" : e.tag === "New" ? "accent" : "info"}`}
                  >
                    {e.tag}
                  </span>
                </div>
                <div>
                  <h2>{e.title}</h2>
                  <ul>
                    {e.items.map((i) => (
                      <li key={i}>{i}</li>
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
