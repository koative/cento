import { useState } from "react";
import { changelog, changelogPage, type ChangeTag } from "../content";

const tags: ("All" | ChangeTag)[] = ["All", "New", "Improved", "Fixed"];

export default function Changelog() {
  const [tag, setTag] = useState<(typeof tags)[number]>("All");
  const list = changelog.filter((c) => tag === "All" || c.tag === tag);

  return (
    <>
      <header className="page-head wrap">
        <h1>{changelogPage.heading}</h1>
        <p className="lede">{changelogPage.intro}</p>
      </header>
      <section className="wrap section-tight changelog" aria-label="Releases">
        <div className="chips" role="group" aria-label="Filter by type">
          {tags.map((t) => (
            <button
              key={t}
              type="button"
              aria-pressed={tag === t}
              onClick={() => setTag(t)}
            >
              {t}
            </button>
          ))}
        </div>
        <p className="result-count" aria-live="polite">
          {list.length} releases
        </p>
        <ol className="releases">
          {list.map((c) => (
            <li key={c.version}>
              <div className="release-meta">
                <time>{c.date}</time>
                <span className="mono">v{c.version}</span>
              </div>
              <div className="release-body">
                <h2>
                  <span className="tag" data-tag={c.tag}>
                    {c.tag}
                  </span>
                  {c.title}
                </h2>
                <p>{c.body}</p>
                {c.items.length > 0 && (
                  <ul className="ticks">
                    {c.items.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
