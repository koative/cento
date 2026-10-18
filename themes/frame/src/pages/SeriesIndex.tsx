import { useState } from "react";
import { Grid2X2, Rows3 } from "lucide-react";
import { Link } from "../router";
import { series, subjects, type Subject } from "../content";

export function SeriesIndex() {
  const [subject, setSubject] = useState<Subject | "All">("All");
  const [layout, setLayout] = useState<"grid" | "sheet">("grid");
  const shown = series.filter(
    (s) => subject === "All" || s.subject === subject,
  );

  return (
    <div className="page">
      <header className="page-head">
        <h1>Series</h1>
        <p className="lede">
          Long projects made between commissions, some over several years. Each
          one opens on a contact sheet: move through the frames with the arrow
          keys and circle the ones you want to talk about.
        </p>
      </header>

      <div className="toolbar">
        <div className="chips" role="group" aria-label="Filter by subject">
          {(["All", ...subjects] as const).map((c) => (
            <button
              key={c}
              type="button"
              className="chip"
              aria-pressed={c === subject}
              onClick={() => setSubject(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="layout-toggle" role="group" aria-label="Layout">
          <button
            type="button"
            className="icon-btn"
            aria-pressed={layout === "grid"}
            onClick={() => setLayout("grid")}
            aria-label="Covers"
          >
            <Grid2X2 size={18} strokeWidth={1.5} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="icon-btn"
            aria-pressed={layout === "sheet"}
            onClick={() => setLayout("sheet")}
            aria-label="Contact strips"
          >
            <Rows3 size={18} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
      </div>
      <p className="result-count" aria-live="polite">
        {shown.length} series
        {subject !== "All" && ` in ${subject.toLowerCase()}`}
      </p>

      {layout === "grid" ? (
        <ul className="series-grid">
          {shown.map((s) => (
            <li key={s.slug}>
              <Link to={`/series/${s.slug}`} className="series-card">
                <span className="series-card-img">
                  <img
                    src={s.frames[0].src}
                    alt=""
                    width={s.frames[0].w}
                    height={s.frames[0].h}
                    loading="lazy"
                  />
                </span>
                <span className="series-card-text">
                  <span className="series-card-title">{s.title}</span>
                  <span className="series-card-meta">
                    {s.subject} · {s.years} · {s.frames.length} frames
                  </span>
                  <span className="series-card-summary">{s.summary}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="series-sheets">
          {shown.map((s) => (
            <li key={s.slug}>
              <Link to={`/series/${s.slug}`} className="series-sheet">
                <span className="series-sheet-text">
                  <span className="series-card-title">{s.title}</span>
                  <span className="series-card-meta">
                    {s.place} · {s.years}
                  </span>
                </span>
                <span className="series-sheet-strip">
                  {s.frames.map((f) => (
                    <img
                      key={f.id}
                      src={f.src}
                      alt=""
                      width={f.w}
                      height={f.h}
                      loading="lazy"
                    />
                  ))}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
