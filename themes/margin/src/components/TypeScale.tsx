import { useState } from "react";
import { playground } from "../content";

export function TypeScale() {
  const { ratios, samples } = playground.scale;
  const [base, setBase] = useState(16);
  const [ratio, setRatio] = useState(ratios[1].value);
  const steps = [5, 4, 3, 2, 1, 0].map((n) => base * ratio ** n);

  return (
    <div className="tool scale">
      <div className="scale-controls">
        <label className="duration">
          <span>
            Base size <output>{base} px</output>
          </span>
          <input
            type="range"
            min="14"
            max="20"
            step="1"
            value={base}
            onChange={(e) => setBase(Number(e.target.value))}
          />
        </label>
        <fieldset className="presets">
          <legend>Ratio</legend>
          {ratios.map((r) => (
            <label key={r.name} className="chip">
              <input
                type="radio"
                name="ratio"
                checked={ratio === r.value}
                onChange={() => setRatio(r.value)}
              />
              {r.name} <span className="num">{r.value}</span>
            </label>
          ))}
        </fieldset>
      </div>
      <ol className="scale-steps">
        {steps.map((px, i) => (
          <li key={i}>
            <span className="scale-meta num">
              {(px / 16).toFixed(3)} rem
              <br />
              {px.toFixed(1)} px
            </span>
            <span
              className={"scale-sample" + (i < 3 ? " serif" : "")}
              style={{ fontSize: px }}
            >
              {samples[i]}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
