import { useState } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";
import { Link } from "../router";
import { concerns, treatments, type ConcernId } from "../content";
import { money } from "../lib/format";
import { lowerArch, toothName, toothWidth, upperArch } from "../lib/teeth";

/* Arch geometry in a 400 × 340 box: half an ellipse, wider at the back where the molars sit. */
const W = 400;
const H = 340;
const RX = 162;
const RY = 286;
const CY = 322;
const GAP = 0.07;

type Placed = { n: number; x: number; y: number; angle: number; w: number };

/* Arc-length table along the ellipse, so each tooth gets space in proportion to its real width. */
const SAMPLES = 600;
const thetaAt = (i: number) =>
  Math.PI + GAP + (i / SAMPLES) * (Math.PI - 2 * GAP);
const lengths = [0];
for (let i = 1; i <= SAMPLES; i++) {
  const [a, b] = [thetaAt(i - 1), thetaAt(i)];
  lengths.push(
    lengths[i - 1] +
      Math.hypot(
        RX * (Math.cos(b) - Math.cos(a)),
        RY * (Math.sin(b) - Math.sin(a)),
      ),
  );
}

function place(arch: number[], lower: boolean): Placed[] {
  const total = arch.reduce((s, n) => s + toothWidth(n), 0);
  let run = 0;
  return arch.map((n) => {
    const w = toothWidth(n);
    const target = ((run + w / 2) / total) * lengths[SAMPLES];
    run += w;
    const theta = thetaAt(lengths.findIndex((l) => l >= target));
    const x = W / 2 + RX * Math.cos(theta);
    const yUp = CY + RY * Math.sin(theta);
    const tangent =
      (Math.atan2(RY * Math.cos(theta), -RX * Math.sin(theta)) * 180) / Math.PI;
    return {
      n,
      x,
      y: lower ? H - yUp : yUp,
      angle: lower ? -tangent : tangent,
      w,
    };
  });
}

const arches = {
  upper: place(upperArch, false),
  lower: place(lowerArch, true),
};
const gumPath = (lower: boolean) => {
  const a = Math.PI + GAP;
  const b = 2 * Math.PI - GAP;
  const pt = (th: number) => [
    W / 2 + RX * Math.cos(th),
    lower ? H - (CY + RY * Math.sin(th)) : CY + RY * Math.sin(th),
  ];
  const [x1, y1] = pt(a);
  const [x2, y2] = pt(b);
  return `M${x1} ${y1} A${RX} ${RY} 0 0 ${lower ? 0 : 1} ${x2} ${y2}`;
};

type Marks = Record<number, ConcernId>;

export function ToothMap() {
  const [jaw, setJaw] = useState<"upper" | "lower">("upper");
  const [pen, setPen] = useState<ConcernId>("pain");
  const [marks, setMarks] = useState<Marks>({});

  const toggle = (n: number) =>
    setMarks(({ [n]: had, ...rest }) =>
      had === pen ? rest : { ...rest, [n]: pen },
    );

  const marked = Object.entries(marks).map(([n, c]) => ({ n: Number(n), c }));
  const groups = concerns
    .map((c) => {
      const teeth = marked
        .filter((m) => m.c === c.id)
        .map((m) => m.n)
        .sort((a, b) => a - b);
      const t = treatments.find((x) => x.slug === c.treatment)!;
      const times = c.perTooth ? teeth.length : 1;
      return {
        concern: c,
        teeth,
        treatment: t,
        low: t.price * times,
        high: (t.priceTo ?? t.price) * times,
      };
    })
    .filter((g) => g.teeth.length);
  const low = groups.reduce((s, g) => s + g.low, 0);
  const high = groups.reduce((s, g) => s + g.high, 0);
  const counts = {
    upper: marked.filter((m) => upperArch.includes(m.n)).length,
    lower: marked.filter((m) => lowerArch.includes(m.n)).length,
  };
  const bookTo = groups.length
    ? `/book?t=${groups[0].treatment.slug}&teeth=${marked
        .map((m) => m.n)
        .sort((a, b) => a - b)
        .join(",")}`
    : "/book";
  const penConcern = concerns.find((c) => c.id === pen)!;

  return (
    <div className="toothmap">
      <fieldset className="pens">
        <legend>1. What do you notice?</legend>
        {concerns.map((c) => (
          <label
            key={c.id}
            className="pen"
            data-ink={c.ink}
            data-on={pen === c.id ? "" : undefined}
          >
            <input
              type="radio"
              name="pen"
              value={c.id}
              checked={pen === c.id}
              onChange={() => setPen(c.id)}
            />
            <span className="pen-swatch" aria-hidden="true" />
            <span className="pen-text">
              <strong>{c.label}</strong>
              <small>{c.hint}</small>
            </span>
          </label>
        ))}
      </fieldset>

      <div className="chart">
        <div className="chart-head">
          <p className="chart-step" id="tm-step">
            2. Tap the teeth — marking as{" "}
            <strong>{penConcern.label.toLowerCase()}</strong>
          </p>
          <div className="jaw-toggle" role="group" aria-label="Which teeth">
            {(["upper", "lower"] as const).map((j) => (
              <button
                key={j}
                type="button"
                aria-pressed={jaw === j}
                onClick={() => setJaw(j)}
              >
                {j === "upper" ? "Upper teeth" : "Lower teeth"}
                {counts[j] > 0 && <span className="count">{counts[j]}</span>}
              </button>
            ))}
          </div>
        </div>

        <div
          className="arch"
          data-jaw={jaw}
          style={{ aspectRatio: `${W} / ${H}` }}
        >
          <svg viewBox={`0 0 ${W} ${H}`} aria-hidden="true" className="arch-bg">
            <path d={gumPath(jaw === "lower")} className="gum" />
            <line
              x1={W / 2}
              x2={W / 2}
              y1={jaw === "upper" ? 10 : 90}
              y2={jaw === "upper" ? 250 : 330}
              className="midline"
            />
            <text x="14" y={jaw === "upper" ? H - 6 : 22} className="side">
              Your right
            </text>
            <text
              x={W - 14}
              y={jaw === "upper" ? H - 6 : 22}
              textAnchor="end"
              className="side"
            >
              Your left
            </text>
          </svg>
          {arches[jaw].map((t) => {
            const c = marks[t.n];
            const ink = c ? concerns.find((x) => x.id === c)!.ink : undefined;
            const kind = t.n % 10;
            return (
              <button
                key={t.n}
                type="button"
                className="tooth"
                data-kind={
                  kind >= 6
                    ? "molar"
                    : kind >= 4
                      ? "premolar"
                      : kind === 3
                        ? "canine"
                        : "incisor"
                }
                data-ink={ink}
                aria-pressed={!!c}
                aria-describedby="tm-step"
                aria-label={`${t.n}, ${toothName(t.n)}${c ? `, marked ${concerns.find((x) => x.id === c)!.label.toLowerCase()}` : ""}`}
                style={{
                  left: `${(t.x / W) * 100}%`,
                  top: `${(t.y / H) * 100}%`,
                  ["--w" as string]: t.w,
                  ["--r" as string]: `${t.angle}deg`,
                }}
                onClick={() => toggle(t.n)}
              >
                <span className="crown" aria-hidden="true" />
                <span className="num" aria-hidden="true">
                  {t.n}
                </span>
              </button>
            );
          })}
        </div>
        <p className="legend">
          <span data-ink="mark">Red — needs attention</span>
          <span data-ink="note">Blue — cosmetic or a question</span>
          <span>Numbers follow the FDI chart your dentist uses.</span>
        </p>
      </div>

      <div className="plan" aria-live="polite">
        <h3>3. What we'd suggest</h3>
        {groups.length === 0 ? (
          <p className="plan-empty">
            Nothing marked yet. Choose what you notice, then tap the teeth on
            the chart — we'll match them to a treatment and a price range.
          </p>
        ) : (
          <>
            <ul>
              {groups.map((g) => (
                <li key={g.concern.id} data-ink={g.concern.ink}>
                  <p className="plan-teeth">
                    {g.concern.label} ·{" "}
                    <span className="tnum">{g.teeth.join(", ")}</span>
                  </p>
                  <p className="plan-line">
                    <Link to={`/treatments/${g.treatment.slug}`}>
                      {g.treatment.name}
                    </Link>
                    <span className="tnum">
                      {g.low === g.high
                        ? money(g.low)
                        : `${money(g.low)}–${money(g.high)}`}
                    </span>
                  </p>
                  <p className="plan-advice">{g.concern.advice}</p>
                </li>
              ))}
            </ul>
            <p className="plan-total">
              <span>Rough estimate</span>
              <span className="tnum">
                {low === high ? money(low) : `${money(low)}–${money(high)}`}
              </span>
            </p>
            <p className="plan-note">
              A guide, not a quote: your dentist confirms the plan and prices
              after an exam.
            </p>
            <div className="plan-actions">
              <Link to={bookTo} className="btn btn-primary">
                Book for these teeth <ArrowRight aria-hidden="true" />
              </Link>
              <button
                type="button"
                className="btn btn-quiet"
                onClick={() => setMarks({})}
              >
                <RotateCcw aria-hidden="true" /> Clear chart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
