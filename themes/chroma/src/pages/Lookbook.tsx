import { useState } from "react";
import { looks, pageCopy, stylists, type Focus } from "../content";
import { LookTile } from "../components/Tiles";

const filters: ("All" | Focus)[] = [
  "All",
  "Colour",
  "Cut",
  "Curls",
  "Occasion",
];

export function Lookbook() {
  const [focus, setFocus] = useState<(typeof filters)[number]>("All");
  const [by, setBy] = useState("all");
  const shown = looks.filter(
    (l) =>
      (focus === "All" || l.category === focus) &&
      (by === "all" || l.stylist === by),
  );

  return (
    <div className="page">
      <header className="page-head wrap">
        <h1>{pageCopy.lookbook.title}</h1>
        <p className="lede">{pageCopy.lookbook.lede}</p>
      </header>

      <div className="wrap filters">
        <div className="chips" role="group" aria-label="Filter by kind of work">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              className="chip"
              aria-pressed={focus === f}
              onClick={() => setFocus(f)}
            >
              {f}
            </button>
          ))}
        </div>
        <label className="select-inline">
          <span>Stylist</span>
          <select value={by} onChange={(e) => setBy(e.target.value)}>
            <option value="all">Everyone</option>
            {stylists.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </label>
        <p className="count" aria-live="polite">
          {shown.length} {shown.length === 1 ? "look" : "looks"}
        </p>
      </div>

      <div className="wrap">
        {shown.length ? (
          <div className="lookbook-grid">
            {shown.map((l, i) => (
              <LookTile key={l.id} look={l} lazy={i > 2} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <p>No looks match that pairing yet.</p>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => {
                setFocus("All");
                setBy("all");
              }}
            >
              Show every look
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
