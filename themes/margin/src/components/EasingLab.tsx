import {
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { Copy, Play } from "lucide-react";
import { playground } from "../content";

type Curve = [number, number, number, number];
const S = 200; // plot size in viewBox units
const VB = { x: -16, y: -64, w: 232, h: 328 };
const clamp = (n: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, n));

export function EasingLab({ showPresets = true }: { showPresets?: boolean }) {
  const [p, setP] = useState<Curve>(playground.easing.presets[0].value);
  const [ms, setMs] = useState(700);
  const [moved, setMoved] = useState(false);
  const [copied, setCopied] = useState("");
  const svg = useRef<SVGSVGElement>(null);
  const css = `cubic-bezier(${p.join(", ")})`;

  function drag(handle: 0 | 1) {
    return (e: ReactPointerEvent<SVGCircleElement>) => {
      const target = e.currentTarget;
      target.setPointerCapture(e.pointerId);
      const move = (ev: PointerEvent) => {
        const r = svg.current!.getBoundingClientRect();
        const vx = VB.x + ((ev.clientX - r.left) / r.width) * VB.w;
        const vy = VB.y + ((ev.clientY - r.top) / r.height) * VB.h;
        const x = Math.round(clamp(vx / S, 0, 1) * 100) / 100;
        const y = Math.round(clamp((S - vy) / S, -0.3, 1.3) * 100) / 100;
        setP((old) =>
          handle === 0 ? [x, y, old[2], old[3]] : [old[0], old[1], x, y],
        );
      };
      const up = () => {
        target.removeEventListener("pointermove", move);
        target.removeEventListener("pointerup", up);
      };
      target.addEventListener("pointermove", move);
      target.addEventListener("pointerup", up);
    };
  }

  function set(i: number, value: string) {
    const n = Number(value);
    if (Number.isNaN(n)) return;
    const next = [...p] as Curve;
    next[i] = i % 2 === 0 ? clamp(n, 0, 1) : clamp(n, -0.3, 1.3);
    setP(next);
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(css);
      setCopied(`Copied ${css}`);
    } catch {
      setCopied("Copy isn't available here — select the value above instead.");
    }
  }

  const [x1, y1, x2, y2] = p.map((v, i) => (i % 2 === 0 ? v * S : S - v * S));
  const run = { transition: `transform ${ms}ms ${css}` };
  const linear = { transition: `transform ${ms}ms linear` };

  return (
    <div className="tool easing">
      <svg
        ref={svg}
        className="easing-plot"
        viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`}
        role="img"
        aria-label={`Curve ${css}`}
      >
        <rect x="0" y="0" width={S} height={S} className="plot-frame" />
        <path d={`M0 ${S} L${S} 0`} className="plot-linear" />
        <line x1="0" y1={S} x2={x1} y2={y1} className="plot-arm" />
        <line x1={S} y1="0" x2={x2} y2={y2} className="plot-arm" />
        <path
          d={`M0 ${S} C${x1} ${y1} ${x2} ${y2} ${S} 0`}
          className="plot-curve"
        />
        <circle
          cx={x1}
          cy={y1}
          r="9"
          className="plot-handle"
          onPointerDown={drag(0)}
        />
        <circle
          cx={x2}
          cy={y2}
          r="9"
          className="plot-handle"
          onPointerDown={drag(1)}
        />
      </svg>
      <div className="easing-side">
        <fieldset className="easing-inputs">
          <legend>Control points</legend>
          {["x1", "y1", "x2", "y2"].map((k, i) => (
            <label key={k}>
              <span>{k}</span>
              <input
                type="number"
                step="0.01"
                min={i % 2 === 0 ? 0 : -0.3}
                max={i % 2 === 0 ? 1 : 1.3}
                value={p[i]}
                onChange={(e) => set(i, e.target.value)}
              />
            </label>
          ))}
        </fieldset>
        {showPresets && (
          <div className="presets" role="group" aria-label="Presets">
            {playground.easing.presets.map((pr) => (
              <button
                key={pr.name}
                type="button"
                className="chip"
                aria-pressed={pr.value.join() === p.join()}
                onClick={() => setP(pr.value)}
              >
                {pr.name}
              </button>
            ))}
          </div>
        )}
        <label className="duration">
          <span>
            Duration <output>{ms} ms</output>
          </span>
          <input
            type="range"
            min="150"
            max="1500"
            step="50"
            value={ms}
            onChange={(e) => setMs(Number(e.target.value))}
          />
        </label>
        <div className="lanes" aria-hidden="true">
          <span className="lane">
            <span
              className="puck"
              data-moved={moved || undefined}
              style={run}
            />
          </span>
          <span className="lane lane-linear">
            <span
              className="puck"
              data-moved={moved || undefined}
              style={linear}
            />
          </span>
        </div>
        <p className="lane-key">
          Top: your curve. Bottom: linear, for comparison.
        </p>
        <code className="easing-value">{css}</code>
        <div className="tool-actions">
          <button
            type="button"
            className="btn"
            onClick={() => setMoved(!moved)}
          >
            <Play size={16} aria-hidden="true" /> Run
          </button>
          <button type="button" className="btn btn-line" onClick={copy}>
            <Copy size={16} aria-hidden="true" /> Copy CSS
          </button>
        </div>
        <p className="tool-status" aria-live="polite">
          {copied}
        </p>
      </div>
    </div>
  );
}
