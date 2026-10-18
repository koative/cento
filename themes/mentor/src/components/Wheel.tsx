import { ArrowRight, RotateCcw } from "lucide-react";
import { Link, navigate } from "../router";
import { skills, wheel } from "../content";
import {
  average,
  recommend,
  resetWheel,
  setScore,
  useWheel,
} from "../lib/wheel";

const C = 220; // centre of the 440 × 440 drawing
const R = 150; // radius of a 10
const STEP = (Math.PI * 2) / skills.length;
const START = -Math.PI / 2 - STEP / 2; // first spoke centred at twelve o'clock

const xy = (r: number, a: number) =>
  [C + r * Math.cos(a), C + r * Math.sin(a)] as const;
const pt = (r: number, a: number) =>
  xy(r, a)
    .map((n) => n.toFixed(2))
    .join(" ");

/** Annular sector between radii r0..r1 and angles a0..a1 (r0 = 0 gives a wedge). */
function sector(r0: number, r1: number, a0: number, a1: number) {
  const inner =
    r0 > 0 ? `L${pt(r0, a1)} A${r0} ${r0} 0 0 0 ${pt(r0, a0)}` : `L${C} ${C}`;
  return `M${pt(r1, a0)} A${r1} ${r1} 0 0 1 ${pt(r1, a1)} ${inner} Z`;
}

export function Wheel() {
  const { scores, touched } = useWheel();
  const rec = recommend(scores);
  const lowLabels = rec.low.map((id) => skills.find((s) => s.id === id)!.label);

  return (
    <div className="wheel">
      <div className="wheel-sheet">
        <svg viewBox="-66 22 576 396" className="wheel-svg" aria-hidden="true">
          {Array.from({ length: 10 }, (_, i) => (
            <circle
              key={i}
              cx={C}
              cy={C}
              r={(R / 10) * (i + 1)}
              className={i === 9 ? "wheel-rim" : "wheel-ring"}
            />
          ))}
          {skills.map((s, i) => {
            const a0 = START + i * STEP;
            const a1 = a0 + STEP;
            const mid = a0 + STEP / 2;
            const [sx, sy] = xy(R, a0);
            const [lx, ly] = xy(R + 30, mid);
            const anchor =
              Math.abs(Math.cos(mid)) < 0.3
                ? "middle"
                : Math.cos(mid) > 0
                  ? "start"
                  : "end";
            return (
              <g key={s.id}>
                <path
                  d={sector(0, R, a0, a1)}
                  className="wheel-fill"
                  data-low={touched && rec.low.includes(s.id) ? "" : undefined}
                  style={{ transform: `scale(${scores[s.id] / 10})` }}
                />
                <line x1={C} y1={C} x2={sx} y2={sy} className="wheel-spoke" />
                {Array.from({ length: 10 }, (_, l) => (
                  <path
                    key={l}
                    d={sector((R / 10) * l, (R / 10) * (l + 1), a0, a1)}
                    className="wheel-hit"
                    onClick={() => setScore(s.id, l + 1)}
                  />
                ))}
                <text
                  x={lx}
                  y={ly}
                  textAnchor={anchor}
                  dominantBaseline="middle"
                  className="wheel-label"
                >
                  {s.label}
                  <tspan className="wheel-score"> {scores[s.id]}</tspan>
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <fieldset className="wheel-controls">
        <legend className="sr-only">
          Score each part of the job from 1 to 10
        </legend>
        {skills.map((s) => (
          <div key={s.id} className="wheel-row">
            <label htmlFor={`w-${s.id}`}>
              <span className="wheel-row-name">{s.label}</span>
              <span className="wheel-row-prompt">{s.prompt}</span>
            </label>
            <input
              id={`w-${s.id}`}
              type="range"
              min={1}
              max={10}
              value={scores[s.id]}
              aria-valuetext={`${scores[s.id]} out of 10`}
              onChange={(e) => setScore(s.id, Number(e.target.value))}
            />
            <output htmlFor={`w-${s.id}`} className="wheel-row-value">
              {scores[s.id]}
            </output>
          </div>
        ))}
      </fieldset>

      <div className="wheel-result">
        <p className="wheel-verdict" aria-live="polite">
          {touched ? (
            <>
              Start with <mark>{lowLabels[0]}</mark> and{" "}
              <mark>{lowLabels[1]}</mark>.
            </>
          ) : (
            "Move a slider or click a ring to score your first spoke."
          )}
        </p>
        {touched ? (
          <>
            <p className="wheel-avg">
              Average <span className="num">{average(scores).toFixed(1)}</span>{" "}
              / 10. {skills.find((s) => s.id === rec.low[0])!.low}
            </p>
            <ul className="wheel-recs">
              <li>
                <span>Programme</span>
                <Link to={`/programmes/${rec.programme.slug}`}>
                  {rec.programme.name}
                </Link>
              </li>
              {rec.resources.map((r) => (
                <li key={r.slug}>
                  <span>Free {r.type.toLowerCase()}</span>
                  <Link to={`/resources/${r.slug}`}>{r.title}</Link>
                </li>
              ))}
              <li>
                <span>Listen</span>
                <Link to={`/podcast/${rec.episode.slug}`}>
                  Ep. {rec.episode.number}: {rec.episode.title}
                </Link>
              </li>
            </ul>
            <div className="wheel-actions">
              <button
                type="button"
                className="btn btn-ink"
                onClick={() => navigate("/apply")}
              >
                Bring my wheel to an application{" "}
                <ArrowRight aria-hidden="true" />
              </button>
              <button type="button" className="btn-text" onClick={resetWheel}>
                <RotateCcw aria-hidden="true" /> Start again
              </button>
            </div>
          </>
        ) : (
          <p className="wheel-note">{wheel.note}</p>
        )}
      </div>
    </div>
  );
}
