import { useId, type CSSProperties } from "react";
import { wheels, type Profile, type WheelDesign } from "../content";

/*
 * Side elevation of a Vector, drawn from the profile points in content.ts
 * (millimetres from the rear bumper, height above ground). Every profile has
 * the same number of points, so switching models morphs the outline.
 */
const S = 0.2; // px per mm — every model is drawn to the same scale
const W = 1200;
const G = 430; // ground line
const H = 500;

type Pt = readonly [number, number];

const r = (n: number) => Math.round(n * 10) / 10;

/** Catmull-Rom through the points as cubic Béziers (endpoints keep their tangents short). */
function spline(pts: Pt[]) {
  let d = "";
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    d += ` C${r(p1[0] + (p2[0] - p0[0]) / 6)} ${r(p1[1] + (p2[1] - p0[1]) / 6)} ${r(p2[0] - (p3[0] - p1[0]) / 6)} ${r(p2[1] - (p3[1] - p1[1]) / 6)} ${r(p2[0])} ${r(p2[1])}`;
  }
  return d;
}

function geometry(p: Profile) {
  const ox = (W - p.length * S) / 2;
  const at = ([x, y]: Pt): Pt => [ox + x * S, G - y * S];
  const body = p.body.map(at);
  const glass = p.glass.map(at);
  const tireR = (p.tire / 2) * S;
  const archR = tireR + 9;
  const sill = G - p.sill * S;
  const rear = ox + p.rearAxle * S;
  const front = rear + p.wheelbase * S;
  const cy = G - tireR;
  const dx = Math.sqrt(archR ** 2 - (sill - cy) ** 2);
  const arc = (cx: number) =>
    `A${r(archR)} ${r(archR)} 0 0 0 ${r(cx - dx)} ${r(sill)}`;
  const start = (cx: number) => `${r(cx + dx)} ${r(sill)}`;
  const outline = `M${r(body[0][0])} ${r(body[0][1])}${spline(body)} L${start(front)} ${arc(front)} L${start(rear)} ${arc(rear)} Z`;
  const glassPath = `M${r(glass[0][0])} ${r(glass[0][1])}${spline(glass)} Z`;
  const wells = `M${start(front)} ${arc(front)} Z M${start(rear)} ${arc(rear)} Z`;

  // Belt height at x, read off the straight lower edge of the glass.
  const [g0, g1] = [glass[0], glass[glass.length - 1]];
  const belt = (x: number) =>
    g0[1] + ((x - g0[0]) / (g1[0] - g0[0])) * (g1[1] - g0[1]);

  return {
    ox,
    body,
    outline,
    glassPath,
    wells,
    tireR,
    sill,
    rear,
    front,
    cy,
    belt,
    end: ox + p.length * S,
    top: G - p.height * S,
  };
}

const pathStyle = (d: string) => ({ d: `path("${d}")` }) as CSSProperties;
const fmt = (n: number) => n.toLocaleString("en-US");
const inches = (mm: number) => (mm / 25.4).toFixed(1);

type Props = {
  profile: Profile;
  paint: string;
  wheel?: WheelDesign;
  dims?: boolean;
  label: string;
  className?: string;
};

export function Elevation({
  profile,
  paint,
  wheel = "aero",
  dims = false,
  label,
  className = "",
}: Props) {
  const id = useId().replace(/:/g, "");
  const g = geometry(profile);
  const x = (mm: number) => g.ox + mm * S;

  return (
    <svg
      className={`elevation ${className}`}
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={label}
      style={{ "--paint": paint } as CSSProperties}
    >
      <defs>
        <linearGradient id={`sheen-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.38" />
          <stop offset="0.42" stopColor="#fff" stopOpacity="0.06" />
          <stop offset="0.55" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.32" />
        </linearGradient>
        <linearGradient id={`glass-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2b3238" />
          <stop offset="0.55" stopColor="#14181b" />
          <stop offset="1" stopColor="#262c31" />
        </linearGradient>
        <filter id={`blur-${id}`} x="-10%" y="-200%" width="120%" height="500%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <clipPath id={`clip-${id}`}>
          <path d={g.glassPath} style={pathStyle(g.glassPath)} />
        </clipPath>
      </defs>

      <ellipse
        className="el-shadow"
        cx={(g.ox + g.end) / 2}
        cy={G + 2}
        rx={(g.end - g.ox) / 2 + 10}
        ry="7"
        filter={`url(#blur-${id})`}
      />
      <line className="el-ground" x1="0" x2={W} y1={G} y2={G} />

      <path className="el-well" d={g.wells} style={pathStyle(g.wells)} />
      <path className="el-body" d={g.outline} style={pathStyle(g.outline)} />
      <path
        className="el-sheen"
        d={g.outline}
        style={pathStyle(g.outline)}
        fill={`url(#sheen-${id})`}
      />
      <path
        className="el-glass"
        d={g.glassPath}
        style={pathStyle(g.glassPath)}
        fill={`url(#glass-${id})`}
      />
      <g clipPath={`url(#clip-${id})`}>
        {profile.pillars.map((px) => (
          <rect
            key={`p${px}`}
            className="el-pillar"
            x={x(px) - 7}
            y={g.top}
            width="14"
            height={G - g.top}
          />
        ))}
      </g>
      {profile.doors.map((dx) => {
        const top = g.belt(x(dx)) - 4;
        return (
          <path
            key={`d${dx}`}
            className="el-seam"
            d={`M${x(dx)} ${top} C${x(dx) + 6} ${top + 40} ${x(dx) + 4} ${g.sill - 30} ${x(dx) - 2} ${g.sill - 6}`}
          />
        );
      })}
      {profile.handles.map((hx) => (
        <rect
          key={`h${hx}`}
          className="el-handle"
          x={x(hx)}
          y={g.belt(x(hx)) + 14}
          width="26"
          height="4"
          rx="2"
        />
      ))}
      <path
        className="el-glass-edge"
        d={g.glassPath}
        style={pathStyle(g.glassPath)}
      />
      <path
        className="el-outline"
        d={g.outline}
        style={pathStyle(g.outline)}
        pathLength={1}
      />

      <path
        className="el-lamp el-lamp-front"
        d={`M${g.body[9][0]} ${g.body[9][1] + 10} L${g.body[10][0] - 4} ${g.body[10][1] + 8}`}
      />
      <path
        className="el-lamp el-lamp-rear"
        d={`M${g.body[2][0] + 2} ${g.body[2][1] + 6} L${g.body[3][0]} ${g.body[3][1] + 8}`}
      />

      {[g.rear, g.front].map((cx, i) => (
        <g
          key={i}
          className="el-wheel"
          style={{ transform: `translate(${r(cx)}px, ${r(g.cy)}px)` }}
        >
          <circle className="el-tyre" r={g.tireR} />
          <Wheel
            design={wheel}
            radius={
              g.tireR *
              (0.62 + 0.05 * (wheels.find((w) => w.id === wheel)?.step ?? 0))
            }
          />
        </g>
      ))}

      {dims && (
        <g className="el-dims" aria-hidden="true">
          {[g.rear, g.front].map((cx, i) => (
            <g key={i}>
              <line x1={cx} x2={cx} y1={g.cy - 12} y2={G + 34} />
              <line x1={cx - 12} x2={cx + 12} y1={g.cy} y2={g.cy} />
            </g>
          ))}
          <Dim
            x1={g.rear}
            x2={g.front}
            y={G + 26}
            text={`Wheelbase ${fmt(profile.wheelbase)} mm · ${inches(profile.wheelbase)} in`}
          />
          <line x1={g.ox} x2={g.ox} y1={G - 30} y2={G + 64} />
          <line x1={g.end} x2={g.end} y1={G - 30} y2={G + 64} />
          <Dim
            x1={g.ox}
            x2={g.end}
            y={G + 56}
            text={`Length ${fmt(profile.length)} mm · ${inches(profile.length)} in`}
          />
          <line x1={g.end - 120} x2={g.end + 46} y1={g.top} y2={g.top} />
          <line x1={g.end + 30} x2={g.end + 30} y1={g.top} y2={G} />
          <text
            className="el-dim-text"
            x={g.end + 40}
            y={g.top - 10}
            textAnchor="end"
          >
            Height {fmt(profile.height)} mm · {inches(profile.height)} in
          </text>
        </g>
      )}
    </svg>
  );
}

function Dim({
  x1,
  x2,
  y,
  text,
}: {
  x1: number;
  x2: number;
  y: number;
  text: string;
}) {
  const mid = (x1 + x2) / 2;
  return (
    <g>
      <line x1={x1} x2={x2} y1={y} y2={y} />
      <path
        d={`M${x1 + 9} ${y - 5} L${x1} ${y} L${x1 + 9} ${y + 5} M${x2 - 9} ${y - 5} L${x2} ${y} L${x2 - 9} ${y + 5}`}
      />
      <rect
        className="el-dim-bg"
        x={mid - text.length * 4.1 - 10}
        y={y - 11}
        width={text.length * 8.2 + 20}
        height="22"
      />
      <text className="el-dim-text" x={mid} y={y + 5} textAnchor="middle">
        {text}
      </text>
    </g>
  );
}

function Wheel({ design, radius: R }: { design: WheelDesign; radius: number }) {
  const turns = (n: number) =>
    Array.from({ length: n }, (_, i) => (360 / n) * i);
  return (
    <g className={`el-rim el-rim-${design}`}>
      <circle className="el-rim-face" r={R} />
      {design === "aero" &&
        turns(5).map((a) => (
          <rect
            key={a}
            className="el-rim-cut"
            x={-4}
            y={-R * 0.88}
            width="8"
            height={R * 0.32}
            rx="4"
            transform={`rotate(${a})`}
          />
        ))}
      {design === "spoke" &&
        turns(5).map((a) => (
          <g key={a} transform={`rotate(${a})`}>
            <path
              className="el-rim-cut"
              d={`M-3 ${-R * 0.3} L-9 ${-R * 0.92} L-3 ${-R * 0.92} L1 ${-R * 0.3} Z`}
            />
            <path
              className="el-rim-cut"
              d={`M5 ${-R * 0.3} L5 ${-R * 0.92} L11 ${-R * 0.92} L9 ${-R * 0.3} Z`}
            />
          </g>
        ))}
      {design === "turbine" &&
        turns(12).map((a) => (
          <path
            key={a}
            className="el-rim-blade"
            d={`M0 ${-R * 0.28} Q${R * 0.32} ${-R * 0.55} ${R * 0.1} ${-R * 0.95}`}
            transform={`rotate(${a})`}
          />
        ))}
      <circle className="el-hub" r={R * 0.2} />
    </g>
  );
}
