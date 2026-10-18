import { useState } from "react";
import { workspace } from "../content";

/** Worked example from "Learning to See": one photograph, read through three lenses. */
export function LensStudy() {
  const [lens, setLens] = useState(0);
  const current = workspace.lenses[lens];
  return (
    <div className="lens-study">
      <div className="lens-image">
        <img
          src={workspace.studyImage}
          alt={workspace.studyAlt}
          width={1600}
          height={890}
          style={{
            objectPosition: current.position,
            transform: `scale(${current.zoom})`,
          }}
        />
      </div>
      <div className="lens-guide">
        <h2>Look a little closer.</h2>
        <p aria-live="polite">{current.text}</p>
        <div
          className="lens-buttons"
          role="group"
          aria-label="Observation lens"
        >
          {workspace.lenses.map((l, i) => (
            <button
              key={l.name}
              type="button"
              aria-pressed={lens === i}
              onClick={() => setLens(i)}
            >
              {l.name}
            </button>
          ))}
        </div>
        <p className="lens-note">
          A worked example. Try the same three lenses on the view from your
          window.
        </p>
      </div>
    </div>
  );
}
