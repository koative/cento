import { useEffect, useState, type CSSProperties } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { Link } from "../router";
import { findFrame, type Series } from "../content";
import { marks, toggleMark } from "../lib/store";

/** The red china-marker box a photographer draws around a keeper on the contact sheet. */
export function GreaseMark() {
  return (
    <svg
      className="grease"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="96" height="96" rx="5" />
    </svg>
  );
}

/** The series viewer: a light-table stage, a contact sheet beneath it, arrow keys to move and M to mark. */
export function Viewer({ series }: { series: Series }) {
  const frames = series.frames;
  const wanted = () =>
    frames.findIndex(
      (f) =>
        f.id ===
        new URLSearchParams(window.location.hash.split("?")[1]).get("frame"),
    );
  const [index, setIndex] = useState(() => Math.max(0, wanted()));
  const marked = marks.use();
  const frame = frames[index];
  const isMarked = marked.includes(frame.id);
  const n = frames.length;

  useEffect(() => {
    // Links from the marks tray may point at another frame of this same series.
    const sync = () => {
      const k = wanted();
      if (k >= 0) setIndex(k);
    };
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (
        e.altKey ||
        e.metaKey ||
        e.ctrlKey ||
        (e.target as HTMLElement).closest("input, textarea, select")
      )
        return;
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % n);
      else if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + n) % n);
      else if (e.key === "m" || e.key === "M") toggleMark(frames[index].id);
      else return;
      e.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [frames, index, n]);

  return (
    <section
      className="viewer"
      aria-label={`${series.title}: viewer and contact sheet`}
    >
      <div className="stage">
        <figure className="stage-figure">
          <div
            className="stage-print"
            style={{ "--ar": frame.w / frame.h } as CSSProperties}
          >
            <img
              key={frame.id}
              className="develop"
              src={frame.src}
              width={frame.w}
              height={frame.h}
              alt={frame.alt}
            />
            {isMarked && <GreaseMark />}
          </div>
          <figcaption className="label">
            <span className="label-title">{frame.title}</span>
            <span>
              {frame.place}, {frame.date}
            </span>
            <span className="label-code">{frame.code}</span>
          </figcaption>
        </figure>
        <div className="stage-controls">
          <button
            type="button"
            className="icon-btn"
            onClick={() => setIndex((index - 1 + n) % n)}
            aria-label="Previous frame"
          >
            <ArrowLeft size={20} strokeWidth={1.5} aria-hidden="true" />
          </button>
          <span className="counter">
            {index + 1} / {n}
          </span>
          <button
            type="button"
            className="icon-btn"
            onClick={() => setIndex((index + 1) % n)}
            aria-label="Next frame"
          >
            <ArrowRight size={20} strokeWidth={1.5} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="mark-btn"
            aria-pressed={isMarked}
            onClick={() => toggleMark(frame.id)}
          >
            <span className="mark-swatch" aria-hidden="true" />
            {isMarked ? "Marked — press again to clear" : "Mark this frame"}
            <kbd>M</kbd>
          </button>
        </div>
        <p className="visually-hidden" aria-live="polite">
          {`Frame ${index + 1} of ${n}: ${frame.title}${isMarked ? ", marked" : ""}`}
        </p>
      </div>

      <div className="sheet">
        <p className="sheet-head">
          <span>Contact sheet</span>
          <span>{series.format}</span>
          <span className="sheet-keys">Arrow keys move · M marks</span>
        </p>
        <ol className="sheet-strip">
          {frames.map((fr, k) => {
            const on = marked.includes(fr.id);
            return (
              <li key={fr.id}>
                <button
                  type="button"
                  aria-current={k === index || undefined}
                  aria-label={`Frame ${k + 1}: ${fr.title}${on ? " (marked)" : ""}`}
                  onClick={() => setIndex(k)}
                >
                  <span className="edge" aria-hidden="true">
                    {fr.code}
                  </span>
                  <span className="sheet-thumb">
                    <img
                      src={fr.src}
                      alt=""
                      width={fr.w}
                      height={fr.h}
                      loading="lazy"
                    />
                    {on && <GreaseMark />}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/** Frames the visitor has circled, across every series; they travel with the contact form. */
export function MarksTray({ withCta }: { withCta?: boolean }) {
  const marked = marks.use();
  const frames = marked.map(findFrame).filter((f) => f !== undefined);
  return (
    <div className="tray">
      <p className="tray-count" aria-live="polite">
        {frames.length
          ? `${frames.length} ${frames.length === 1 ? "frame" : "frames"} marked`
          : "Nothing marked yet. Circle frames on any contact sheet and they travel with your enquiry."}
      </p>
      {frames.length > 0 && (
        <ul className="tray-list">
          {frames.map((f) => (
            <li key={f.id}>
              <Link
                to={`/series/${f.series.slug}?frame=${f.id}`}
                className="tray-thumb"
              >
                <img
                  src={f.src}
                  alt=""
                  width={f.w}
                  height={f.h}
                  loading="lazy"
                />
                <span>{f.title}</span>
              </Link>
              <button
                type="button"
                className="tray-remove"
                onClick={() => toggleMark(f.id)}
                aria-label={`Clear mark from ${f.title}`}
              >
                <X size={16} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}
      {withCta && frames.length > 0 && (
        <Link to="/contact?type=licensing" className="btn">
          Ask about these frames
        </Link>
      )}
    </div>
  );
}
