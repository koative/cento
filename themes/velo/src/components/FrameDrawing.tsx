import { useId } from "react";
import type { Bar, Geometry } from "../content";
import { points } from "../lib/geometry";

type Props = {
  geometry: Geometry;
  tyre: number;
  finish: string;
  bar: Bar;
  label: string;
  deepRims?: boolean;
  mudguards?: boolean;
  rack?: boolean;
  dims?: boolean;
  /** Changing this replays the line-drawing animation (use the size or platform). */
  drawKey?: string;
};

type Pt = { x: number; y: number };
const INK = "#1f2421";
const along = (a: Pt, b: Pt, t: number): Pt => ({
  x: a.x + (b.x - a.x) * t,
  y: a.y + (b.y - a.y) * t,
});
const L = (...pts: Pt[]) =>
  "M" + pts.map((p) => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" L");

/** Arc over the top of a wheel, angles in degrees with 0 = forward and 90 = up. */
function arc(c: Pt, r: number, from: number, to: number) {
  const at = (deg: number) => ({
    x: c.x + r * Math.cos((deg * Math.PI) / 180),
    y: c.y - r * Math.sin((deg * Math.PI) / 180),
  });
  const a = at(from);
  const b = at(to);
  return `M${a.x.toFixed(1)} ${a.y.toFixed(1)} A${r} ${r} 0 ${to - from > 180 ? 1 : 0} 0 ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
}

function Wheel({
  c,
  r,
  tyre,
  deep,
}: {
  c: Pt;
  r: number;
  tyre: number;
  deep?: boolean;
}) {
  const rim = 311 - (deep ? 26 : 9);
  return (
    <g className="wheel">
      <circle
        cx={c.x}
        cy={c.y}
        r={r - tyre / 2}
        fill="none"
        stroke={INK}
        strokeWidth={tyre}
      />
      <circle
        cx={c.x}
        cy={c.y}
        r={rim}
        fill="none"
        stroke="#3a403b"
        strokeWidth={deep ? 52 : 18}
      />
      <g stroke={INK} strokeWidth="2.5" opacity=".55">
        {Array.from({ length: 16 }, (_, i) => {
          const a = (i * Math.PI) / 8;
          return (
            <line
              key={i}
              x1={c.x}
              y1={c.y}
              x2={c.x + Math.cos(a) * (rim - 10)}
              y2={c.y + Math.sin(a) * (rim - 10)}
            />
          );
        })}
      </g>
      <circle cx={c.x} cy={c.y} r="24" fill={INK} />
    </g>
  );
}

export function FrameDrawing({
  geometry: g,
  tyre,
  finish,
  bar,
  label,
  deepRims,
  mudguards,
  rack,
  dims,
  drawKey,
}: Props) {
  const grid = useId();
  const p = points(g, tyre);
  const r = p.radius;
  const bb = { x: 0, y: 0 };
  const seatLow = along(bb, p.seat, 0.94);
  const headTT = { x: p.head.x + 24 * p.down.x, y: p.head.y + 24 * p.down.y };
  const headDT = {
    x: p.headLow.x - 20 * p.down.x,
    y: p.headLow.y - 20 * p.down.y,
  };
  const forkBend = { x: p.axis.x - 40 * p.down.x, y: p.axis.y - 40 * p.down.y };
  const ground = p.rear.y + r;
  const top = Math.min(p.saddle.y - 50, dims ? p.head.y - 210 : Infinity);
  const minX = p.rear.x - r - 30;
  const maxX = Math.max(p.front.x + r + (dims ? 170 : 30), p.bar.x + 130);
  const maxY = ground + (dims ? 120 : 24);
  const light = isLight(finish);

  const tubes: [string, number][] = [
    [L(bb, p.rear), 17],
    [L(seatLow, p.rear), 15],
    [L(bb, p.seat), 27],
    [L(seatLow, headTT), 25],
    [L(bb, headDT), 33],
    [L(p.head, p.headLow), 38],
    [
      `M${p.headLow.x} ${p.headLow.y} Q${forkBend.x} ${forkBend.y} ${p.front.x} ${p.front.y}`,
      18,
    ],
  ];

  const bars: Record<Bar, string> = {
    drop: `M${p.bar.x} ${p.bar.y} l40 0 c55 0 55 110 -5 125`,
    flat: `M${p.bar.x - 20} ${p.bar.y + 4} l50 -10`,
    swept: `M${p.bar.x} ${p.bar.y} c30 -55 -40 -80 -120 -66`,
  };

  const s = p.saddle;
  const crank = { x: 62, y: 158 };
  const rackY = p.rear.y - r - 48;

  return (
    <svg
      className="frame-drawing"
      viewBox={`${minX} ${top} ${maxX - minX} ${maxY - top}`}
      role="img"
      aria-label={label}
    >
      <defs>
        <pattern
          id={grid}
          width="100"
          height="100"
          patternUnits="userSpaceOnUse"
          x={0}
          y={0}
        >
          <path
            d="M100 0H0V100"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            opacity=".14"
          />
        </pattern>
      </defs>
      <rect
        x={minX}
        y={top}
        width={maxX - minX}
        height={maxY - top}
        fill={`url(#${grid})`}
      />
      <line
        x1={minX}
        x2={maxX}
        y1={ground}
        y2={ground}
        stroke={INK}
        strokeWidth="2"
        strokeDasharray="10 8"
        opacity=".4"
      />

      <Wheel c={p.rear} r={r} tyre={tyre} deep={deepRims} />
      <Wheel c={p.front} r={r} tyre={tyre} deep={deepRims} />

      {mudguards && (
        <g
          fill="none"
          stroke="#8d918a"
          strokeWidth="14"
          strokeLinecap="round"
          className="add-on"
        >
          <path d={arc(p.rear, r + 16, -12, 200)} />
          <path d={arc(p.front, r + 16, 15, 225)} />
        </g>
      )}

      <g stroke={INK} strokeLinecap="round" fill="none">
        <circle cx="0" cy="0" r="100" strokeWidth="11" />
        <circle cx={p.rear.x} cy={p.rear.y} r="42" strokeWidth="9" />
        <path
          d={L({ x: 0, y: -100 }, { x: p.rear.x, y: p.rear.y - 42 })}
          strokeWidth="5"
        />
        <path
          d={L({ x: 0, y: 100 }, { x: p.rear.x, y: p.rear.y + 42 })}
          strokeWidth="5"
        />
        <path d={L(bb, crank)} strokeWidth="20" />
        <path d={`M${crank.x - 40} ${crank.y} h80`} strokeWidth="14" />
        <path d={L(p.seat, s)} stroke="#9a9d95" strokeWidth="15" />
        <path d={L(p.head, p.steerer, p.bar)} strokeWidth="19" />
        <path d={bars[bar]} strokeWidth="18" />
        {bar === "drop" && (
          <path d={`M${p.bar.x + 64} ${p.bar.y - 4} l22 38`} strokeWidth="14" />
        )}
      </g>
      <path
        d={`M${s.x - 145} ${s.y - 18} C${s.x - 160} ${s.y - 30} ${s.x - 150} ${s.y + 2} ${s.x - 120} ${s.y + 2} L${s.x + 100} ${s.y - 4} C${s.x + 122} ${s.y - 6} ${s.x + 118} ${s.y - 24} ${s.x + 96} ${s.y - 24} Z`}
        fill={INK}
      />

      {rack && (
        <g
          stroke="#5c615b"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
          className="add-on"
        >
          <path
            d={L(
              { x: p.rear.x - 170, y: rackY },
              { x: p.rear.x + 120, y: rackY },
            )}
          />
          <path
            d={L(
              { x: p.rear.x - 140, y: rackY },
              { x: p.rear.x - 8, y: p.rear.y - 8 },
            )}
          />
          <path
            d={L({ x: p.rear.x + 110, y: rackY }, along(seatLow, p.rear, 0.55))}
          />
        </g>
      )}

      <g
        className="frame-tubes"
        key={drawKey}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {tubes.map(([d, w], i) => (
          <path
            key={"o" + i}
            d={d}
            stroke={INK}
            strokeWidth={w + (light ? 6 : 0)}
            pathLength={1}
          />
        ))}
        {tubes.map(([d, w], i) => (
          <path
            key={"f" + i}
            d={d}
            stroke={finish}
            strokeWidth={w}
            pathLength={1}
            className="finish"
          />
        ))}
      </g>

      {dims && (
        <g
          className="dims"
          stroke="currentColor"
          strokeWidth="2.5"
          fill="currentColor"
        >
          <Dim
            from={{ x: 0, y: p.head.y - 150 }}
            to={{ x: p.head.x, y: p.head.y - 150 }}
            label={`Reach ${g.reach}`}
            ticks={[bb, p.head]}
          />
          <Dim
            from={{ x: p.front.x + r + 70, y: 0 }}
            to={{ x: p.front.x + r + 70, y: p.head.y }}
            label={`Stack ${g.stack}`}
            ticks={[bb, p.head]}
            vertical
          />
          <Dim
            from={{ x: p.rear.x, y: ground + 70 }}
            to={{ x: p.front.x, y: ground + 70 }}
            label={`Wheelbase ${Math.round(p.front.x - p.rear.x)}`}
            ticks={[p.rear, p.front]}
          />
        </g>
      )}
    </svg>
  );
}

function Dim({
  from,
  to,
  label,
  ticks,
  vertical,
}: {
  from: Pt;
  to: Pt;
  label: string;
  ticks: [Pt, Pt];
  vertical?: boolean;
}) {
  const mid = along(from, to, 0.5);
  return (
    <g>
      {ticks.map((t, i) => {
        const end = i === 0 ? from : to;
        return (
          <line
            key={i}
            x1={t.x}
            y1={t.y}
            x2={end.x}
            y2={end.y}
            strokeDasharray="6 8"
            opacity=".45"
            strokeWidth="2"
          />
        );
      })}
      <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} />
      {[from, to].map((e, i) => (
        <circle key={i} cx={e.x} cy={e.y} r="7" stroke="none" />
      ))}
      <text
        x={mid.x}
        y={mid.y}
        dy={vertical ? 0 : -16}
        stroke="none"
        textAnchor="middle"
        transform={
          vertical
            ? `rotate(-90 ${mid.x} ${mid.y}) translate(0 -16)`
            : undefined
        }
      >
        {label}
      </text>
    </g>
  );
}

/** Light finishes get an ink outline so the frame still reads on paper. */
function isLight(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  return 0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255) > 170;
}
