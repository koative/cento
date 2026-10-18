import { useState, type CSSProperties } from "react";
import { shadeLevels } from "../content";

/** The colourist's swatch ring, laid flat: pick a level to read what it means at the chair. */
export function ShadeChart() {
  const [picked, setPicked] = useState(6);
  const shade = shadeLevels[picked - 1];
  return (
    <div className="shade-chart">
      <div className="tufts" role="group" aria-label="Hair levels 1 to 10">
        {shadeLevels.map((s) => (
          <button
            key={s.level}
            type="button"
            className="tuft"
            aria-pressed={s.level === picked}
            aria-label={`Level ${s.level}, ${s.name}`}
            style={{ "--tuft": s.hex } as CSSProperties}
            onClick={() => setPicked(s.level)}
          >
            <span className="tuft-hair" />
            <span className="tuft-num num">{s.level}</span>
          </button>
        ))}
      </div>
      <p className="shade-read" aria-live="polite">
        <strong>
          Level {shade.level} · {shade.name}
        </strong>
        {shade.note}
      </p>
    </div>
  );
}
