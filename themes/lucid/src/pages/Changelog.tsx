import { useState } from "react";
import { changelogPage, releases, type Release } from "../content";
import { date } from "../lib/text";

const tags: Release["tag"][] = ["New", "Improved", "Fixed"];

export default function Changelog() {
  const [tag, setTag] = useState<Release["tag"] | "">("");
  const shown = releases.filter((r) => !tag || r.tag === tag);

  return (
    <>
      <header className="page-head wrap">
        <h1 className="display">{changelogPage.heading}</h1>
        <p className="lede">{changelogPage.lede}</p>
        <div
          className="seg"
          role="group"
          aria-label={`${changelogPage.filterLabel} releases`}
        >
          <button
            type="button"
            aria-pressed={tag === ""}
            onClick={() => setTag("")}
          >
            All
          </button>
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
        <p className="sr-only" aria-live="polite">
          {shown.length} releases shown
        </p>
      </header>

      <ol className="wrap releases">
        {shown.map((r) => (
          <li key={r.version} className="release">
            <div className="release-meta">
              <time dateTime={r.date} className="num">
                {date(r.date, {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
              <span className="num">Version {r.version}</span>
              <span className="tag" data-tag={r.tag}>
                {r.tag}
              </span>
            </div>
            <div className="release-body">
              <h2>{r.title}</h2>
              <p>{r.text}</p>
              <ul className="ticks">
                {r.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}
