import { useState } from "react";
import { Play, RotateCcw } from "lucide-react";
import type { SampleField, Step } from "../content";
import { formatValue, useTestRun } from "../lib/flow";
import { FlowCanvas } from "./FlowCanvas";

/** Read-only workflow with an editable sample record and a test run: used on Home and template pages. */
export function LiveFlow({
  steps,
  sample: initial,
  title,
}: {
  steps: Step[];
  sample: SampleField[];
  title: string;
}) {
  const [sample, setSample] = useState(initial);
  const run = useTestRun(steps, sample);
  const field = sample[0];
  const max = Math.max(10, initial[0].value * 3);

  return (
    <div className="bench">
      <div className="bench-head">
        <span className="bench-title">{title}</span>
        <span className="bench-tag">Test run · nothing is sent</span>
      </div>
      <FlowCanvas steps={steps} sample={sample} states={run.states} />
      <div className="bench-controls">
        <label className="bench-field">
          <span>
            Sample {field.label.toLowerCase()}
            <output className="num">{formatValue(field, field.value)}</output>
          </span>
          <input
            type="range"
            min={0}
            max={max}
            step={max > 1000 ? 100 : 1}
            value={field.value}
            onChange={(e) =>
              setSample([
                { ...field, value: Number(e.target.value) },
                ...sample.slice(1),
              ])
            }
          />
        </label>
        <button
          type="button"
          className="btn btn-plum"
          onClick={run.run}
          disabled={run.running}
        >
          {run.done ? (
            <RotateCcw size={16} aria-hidden />
          ) : (
            <Play size={16} aria-hidden />
          )}
          {run.running ? "Running…" : run.done ? "Run again" : "Run test"}
        </button>
      </div>
      <p
        className="bench-result"
        aria-live="polite"
        data-outcome={
          run.done ? (run.stoppedAt >= 0 ? "stopped" : "done") : undefined
        }
      >
        {run.done
          ? run.stoppedAt >= 0
            ? `Stopped at step ${run.stoppedAt + 1}: the condition was not met, so ${steps.length - run.stoppedAt - 1} action${steps.length - run.stoppedAt - 1 === 1 ? "" : "s"} skipped.`
            : `All ${steps.length} steps completed. In a live run, these actions would now have happened.`
          : "Move the slider, then run the test to see which path the record takes."}
      </p>
    </div>
  );
}
