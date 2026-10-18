import { useRef, useState, type KeyboardEvent } from "react";
import { planner } from "../content";

type Props = {
  panels: number[];
  onChange: (panels: number[]) => void;
  facing: string;
};

const { cols, rows, blocked } = planner.roof;
const blockedAt = Object.fromEntries(
  blocked.map((b) => [b.cell[0] * cols + b.cell[1], b.label]),
);

/**
 * Top-down drawing of one roof face. Each slot is a toggle button; arrow keys move between slots
 * (one tab stop for the whole roof), Space or Enter places or lifts a panel.
 */
export function RoofPlan({ panels, onChange, facing }: Props) {
  const [focus, setFocus] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const on = new Set(panels);

  function toggle(i: number) {
    onChange(
      on.has(i)
        ? panels.filter((p) => p !== i)
        : [...panels, i].sort((a, b) => a - b),
    );
  }

  function move(e: KeyboardEvent, i: number) {
    const step = {
      ArrowRight: 1,
      ArrowLeft: -1,
      ArrowDown: cols,
      ArrowUp: -cols,
    }[e.key];
    if (!step) return;
    e.preventDefault();
    let next = i + step;
    while (next >= 0 && next < cols * rows && blockedAt[next]) next += step;
    if (next < 0 || next >= cols * rows) return;
    setFocus(next);
    refs.current[next]?.focus();
  }

  return (
    <div className="roof">
      <div className="roof-ridge" aria-hidden="true">
        <span>Ridge</span>
      </div>
      <div
        className="roof-face"
        role="group"
        aria-label={`Roof face, ${facing}-facing. ${panels.length} of ${cols * rows - blocked.length} slots hold panels.`}
      >
        {Array.from({ length: cols * rows }, (_, i) => {
          const label = blockedAt[i];
          const r = Math.floor(i / cols) + 1;
          const c = (i % cols) + 1;
          if (label)
            return (
              <div key={i} className="slot slot-blocked" title={label}>
                <span>{label}</span>
              </div>
            );
          return (
            <button
              key={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              type="button"
              className="slot"
              aria-pressed={on.has(i)}
              aria-label={`Row ${r}, slot ${c}`}
              tabIndex={i === focus ? 0 : -1}
              onFocus={() => setFocus(i)}
              onKeyDown={(e) => move(e, i)}
              onClick={() => toggle(i)}
            >
              <span className="cells" aria-hidden="true" />
            </button>
          );
        })}
      </div>
      <div className="roof-gutter" aria-hidden="true">
        <span>Gutter · {facing}</span>
      </div>
    </div>
  );
}

export const roofSlots = Array.from(
  { length: cols * rows },
  (_, i) => i,
).filter((i) => !blockedAt[i]);
