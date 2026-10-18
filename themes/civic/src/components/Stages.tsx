import type { CSSProperties } from "react";
import { stages } from "../content";

/** Received → Assigned → Scheduled → Fixed, as an ordered list so the sequence is read out. */
export function Stages({ stage }: { stage: number }) {
  return (
    <ol
      className="stages"
      style={{ "--done": stage / (stages.length - 1) } as CSSProperties}
    >
      {stages.map((s, i) => (
        <li
          key={s}
          data-state={i < stage ? "done" : i === stage ? "current" : "todo"}
          aria-current={i === stage ? "step" : undefined}
        >
          <span className="stage-dot" aria-hidden="true" />
          {s}
        </li>
      ))}
    </ol>
  );
}
