import { useState } from "react";
import { changelogPage, releases } from "../content";

const tags = ["All", ...new Set(releases.map((r) => r.tag))];

export default function Changelog() {
  const [tag, setTag] = useState("All");
  const shown = releases.filter((r) => tag === "All" || r.tag === tag);
  return (
    <>
      <header className="page-head wrap">
        <h1>{changelogPage.heading}</h1>
        <p className="lede">{changelogPage.lede}</p>
      </header>
      <section className="wrap" aria-label="Releases">
        <div className="chips" role="group" aria-label="Filter by area">
          {tags.map((t) => (
            <button
              key={t}
              className="chip"
              aria-pressed={tag === t}
              onClick={() => setTag(t)}
            >
              {t}
            </button>
          ))}
        </div>
        <p className="result-count" role="status">
          {shown.length} release{shown.length === 1 ? "" : "s"}
        </p>
        <ol className="releases">
          {shown.map((r) => (
            <li key={r.version}>
              <div className="release-meta">
                <time className="num">{r.date}</time>
                <span className="num">v{r.version}</span>
                <span className="pill">{r.tag}</span>
              </div>
              <div className="release-body">
                <h2>{r.title}</h2>
                <p>{r.text}</p>
                <ul>
                  {r.items.map((i) => (
                    <li key={i}>{i}</li>
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
