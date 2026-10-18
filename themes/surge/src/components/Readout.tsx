import type { CSSProperties } from "react";
import type { Experiment } from "../content";
import { change, isWin, reading } from "../lib/format";

type Row = Pick<
  Experiment,
  "name" | "metric" | "control" | "variant" | "confidence" | "lowerIsBetter"
> & {
  unit?: Experiment["unit"];
  client?: string;
  hypothesis?: string;
};

/** Control vs variant, drawn as two bars; the variant grows out of the control's length. */
export function Readout({
  rows,
  compact = false,
}: {
  rows: Row[];
  compact?: boolean;
}) {
  return (
    <ol className="readout" data-compact={compact ? "" : undefined}>
      {rows.map((r) => {
        const max = Math.max(r.control, r.variant);
        const win = isWin(r);
        const unit = r.unit ?? "%";
        return (
          <li
            key={r.name}
            className="readout-row"
            data-win={win ? "" : undefined}
          >
            <div className="readout-test">
              {r.client && <p className="readout-client">{r.client}</p>}
              <h3>{r.name}</h3>
              {r.hypothesis && <p className="readout-hyp">{r.hypothesis}</p>}
              <p className="readout-metric">
                {r.metric}
                {r.lowerIsBetter ? " · lower is better" : ""}
              </p>
            </div>
            <div className="bars" aria-hidden="true">
              <span
                className="bar bar-control"
                style={{ "--w": r.control / max } as CSSProperties}
              >
                <span>A {reading(r.control, unit)}</span>
              </span>
              <span
                className="bar bar-variant"
                style={
                  {
                    "--w": r.variant / max,
                    "--from": r.control / max,
                  } as CSSProperties
                }
              >
                <span>B {reading(r.variant, unit)}</span>
              </span>
            </div>
            <p className="sr-only">
              Control {reading(r.control, unit)}, variant{" "}
              {reading(r.variant, unit)}.
            </p>
            <div className="readout-call">
              <strong className="lift">{change(r.control, r.variant)}</strong>
              <span>{r.confidence}% sure</span>
              <span className="call">{win ? "Ship it" : "Inconclusive"}</span>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
