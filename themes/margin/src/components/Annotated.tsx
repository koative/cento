import {
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import type { Screen } from "../content";
import { Mockup } from "./Mockup";

type Box = { top: number; left: number; width: number; height: number };

/**
 * The signature: a client screen with a design-review redline overlay.
 * Toggle redlines to measure every block and the gaps between them (read live from layout),
 * then step through the numbered pins; each pin pairs with a note in the margin.
 */
export function Annotated({
  screen,
  accent,
  initial = true,
}: {
  screen: Screen;
  accent: string;
  initial?: boolean;
}) {
  const [on, setOn] = useState(initial);
  const [active, setActive] = useState<number | null>(null);
  const [boxes, setBoxes] = useState<Box[]>([]);
  const stage = useRef<HTMLDivElement>(null);
  const uid = useId();

  useLayoutEffect(() => {
    const el = stage.current;
    if (!on || !el) return;
    const measure = () => {
      const origin = el.getBoundingClientRect();
      setBoxes(
        [...el.querySelectorAll<HTMLElement>("[data-blk]")].map((b) => {
          const r = b.getBoundingClientRect();
          return {
            top: r.top - origin.top,
            left: r.left - origin.left,
            width: r.width,
            height: r.height,
          };
        }),
      );
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    document.fonts?.ready.then(measure);
    return () => ro.disconnect();
  }, [on]);

  const activeBlock = active === null ? null : screen.notes[active].at;

  function pick(i: number) {
    setOn(true);
    setActive(active === i ? null : i);
  }

  return (
    <figure className="annotated" data-device={screen.device}>
      <div className="annotated-tools">
        <figcaption>{screen.label}</figcaption>
        <button
          type="button"
          className="redline-toggle"
          aria-pressed={on}
          onClick={() => setOn(!on)}
        >
          <span className="switch" aria-hidden="true" />
          Redlines
        </button>
      </div>
      <div className="annotated-body">
        <div className="stage" ref={stage} data-redlines={on || undefined}>
          <Mockup screen={screen} accent={accent} />
          {on && boxes.length > 0 && (
            <div className="rl-layer">
              {boxes.map((b, i) => {
                const next = boxes[i + 1];
                const gap = next
                  ? Math.round(next.top - (b.top + b.height))
                  : 0;
                // Drawn 2px outside the block so the dashed line never sits on its text; labels report the true size.
                const style = {
                  top: b.top - 2,
                  left: b.left - 2,
                  width: b.width + 4,
                  height: b.height + 4,
                  "--i": i,
                } as CSSProperties;
                return (
                  <div key={i}>
                    <div
                      className="rl-box"
                      style={style}
                      data-active={activeBlock === i || undefined}
                    >
                      {activeBlock === i && (
                        <span className="rl-size">
                          {Math.round(b.width)} × {Math.round(b.height)}
                        </span>
                      )}
                    </div>
                    {gap >= 6 && (
                      <span
                        className="rl-gap"
                        style={
                          {
                            top: b.top + b.height,
                            left: b.left + b.width * 0.72,
                            height: gap,
                            "--i": i,
                          } as CSSProperties
                        }
                      >
                        <span>{gap}</span>
                      </span>
                    )}
                  </div>
                );
              })}
              {screen.notes.map((n, i) => {
                const b = boxes[n.at];
                if (!b) return null;
                const stack = screen.notes
                  .slice(0, i)
                  .filter((o) => o.at === n.at).length;
                return (
                  <button
                    key={i}
                    type="button"
                    className="rl-pin"
                    style={
                      {
                        top: b.top - 11,
                        left: b.left + b.width - 14 - stack * 26,
                        "--i": i,
                      } as CSSProperties
                    }
                    aria-pressed={active === i}
                    aria-label={`Note ${i + 1}`}
                    aria-describedby={`${uid}-n${i}`}
                    onClick={() => pick(i)}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
          )}
        </div>
        <ol className="margin-notes">
          {screen.notes.map((n, i) => (
            <li key={i}>
              <button
                type="button"
                className="note"
                aria-pressed={active === i}
                onClick={() => pick(i)}
              >
                <span className="note-num" aria-hidden="true">
                  {i + 1}
                </span>
                <span id={`${uid}-n${i}`}>{n.text}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </figure>
  );
}
