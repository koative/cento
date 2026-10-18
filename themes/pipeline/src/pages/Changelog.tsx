import { useState } from "react";
import { changelog } from "../content";
import { longDate } from "../lib/format";

export default function Changelog() {
  const tags = ["All", ...new Set(changelog.entries.flatMap((e) => e.tags))];
  const [tag, setTag] = useState("All");
  const list = changelog.entries.filter(
    (e) => tag === "All" || e.tags.includes(tag),
  );

  return (
    <>
      <header className="page-head wrap">
        <h1>{changelog.h1}</h1>
        <p className="lede">{changelog.lede}</p>
      </header>
      <section className="wrap section-tight" aria-labelledby="h-releases">
        <h2 id="h-releases" className="sr-only">
          Releases
        </h2>
        <fieldset className="segmented segmented-wrap">
          <legend className="sr-only">Filter by area</legend>
          {tags.map((t) => (
            <label key={t}>
              <input
                type="radio"
                name="tag"
                checked={tag === t}
                onChange={() => setTag(t)}
              />
              <span>{t}</span>
            </label>
          ))}
        </fieldset>
        <ol className="releases">
          {list.map((e) => (
            <li key={e.version}>
              <div className="release-when">
                <time dateTime={e.date}>{longDate(e.date)}</time>
                <span className="num">v{e.version}</span>
              </div>
              <div className="release-body">
                <h3>{e.title}</h3>
                <p>{e.body}</p>
                <ul className="tags">
                  {e.tags.map((t) => (
                    <li key={t}>{t}</li>
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
