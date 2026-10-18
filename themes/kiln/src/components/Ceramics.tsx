import { useId } from "react";
import {
  clayById,
  glazeById,
  type ClayId,
  type FormId,
  type GlazeId,
} from "../content";

/* Profiles: [y, radius] pairs from rim to foot in a 200 × 240 drawing, centre line x = 100. */
const PROFILES: Record<FormId, [number, number][]> = {
  cup: [
    [52, 44],
    [70, 46],
    [130, 47],
    [190, 45],
    [214, 40],
    [222, 36],
  ],
  bowl: [
    [104, 88],
    [118, 85],
    [148, 72],
    [180, 54],
    [206, 38],
    [222, 32],
  ],
  jug: [
    [44, 32],
    [62, 28],
    [96, 40],
    [140, 60],
    [182, 58],
    [210, 48],
    [222, 42],
  ],
  vase: [
    [26, 24],
    [42, 21],
    [74, 30],
    [114, 50],
    [170, 52],
    [210, 46],
    [222, 44],
  ],
};
const BASE = 222;

/** Cosine-eased radius between key points, so profiles curve like thrown walls. */
function sample(profile: [number, number][], steps = 56) {
  const top = profile[0][0];
  const pts: [number, number][] = [];
  for (let i = 0; i <= steps; i++) {
    const y = top + ((BASE - top) * i) / steps;
    const k = Math.max(0, profile.findIndex(([py]) => py >= y) - 1);
    const [y0, r0] = profile[k];
    const [y1, r1] = profile[Math.min(k + 1, profile.length - 1)];
    const t = y1 === y0 ? 0 : (y - y0) / (y1 - y0);
    pts.push([y, r0 + ((r1 - r0) * (1 - Math.cos(Math.PI * t))) / 2]);
  }
  return pts;
}

function outline(form: FormId) {
  const pts = sample(PROFILES[form]);
  const right = pts.map(([y, r]) => `${(100 + r).toFixed(1)} ${y.toFixed(1)}`);
  const left = [...pts]
    .reverse()
    .map(([y, r]) => `${(100 - r).toFixed(1)} ${y.toFixed(1)}`);
  return `M${right.join(" L")} L${left.join(" L")} Z`;
}

/** The lower edge of a dipped glaze: a slow wave plus a few drips. */
function dipEdge(y: number) {
  let d = `M0 0 H200 V${y.toFixed(1)}`;
  for (let x = 200; x >= 0; x -= 5) {
    const drip = [38, 92, 141, 168].some((dx) => Math.abs(x - dx) < 4) ? 7 : 0;
    d += ` L${x} ${(y + 2.6 * Math.sin(x / 13) + 1.6 * Math.sin(x / 5.3) + drip).toFixed(1)}`;
  }
  return d + " Z";
}

const SPECKS = Array.from({ length: 70 }, (_, i) => [
  (i * 73.7) % 200,
  20 + ((i * 47.3) % 205),
  0.7 + ((i * 13) % 5) / 6,
]);

type VesselProps = {
  form: FormId;
  glaze: GlazeId;
  clay: ClayId;
  dip: number;
  className?: string;
  label?: string;
};

/** A flat profile drawing of a dipped pot: raw clay below, glaze above, the rim where the glaze breaks thin. */
export function Vessel({
  form,
  glaze,
  clay,
  dip,
  className,
  label,
}: VesselProps) {
  const id = useId();
  const g = glazeById(glaze);
  const c = clayById(clay);
  const rim = PROFILES[form][0][0];
  const line = Math.min(BASE - 10, rim + ((BASE - rim) * dip) / 100);
  const path = outline(form);
  const handleGlazed = line > (rim + BASE) / 2;
  return (
    <svg
      viewBox="0 0 200 240"
      className={className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <clipPath id={id}>
        <path d={path} />
      </clipPath>
      {form === "cup" && (
        <path
          d="M144 84 C 184 84, 186 158, 145 160"
          className="vessel-handle"
          stroke={handleGlazed ? g.color : c.color}
        />
      )}
      {form === "jug" && (
        <>
          <path
            d="M131 74 C 170 76, 176 150, 156 168"
            className="vessel-handle"
            stroke={handleGlazed ? g.color : c.color}
          />
          <path
            d="M70 46 L48 36 L69 62 Z"
            fill={g.color}
            stroke="var(--ink)"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </>
      )}
      <path d={path} fill={c.color} />
      <g clipPath={`url(#${id})`}>
        <path
          d={dipEdge(line)}
          fill={g.color}
          fillOpacity={g.cover}
          className="vessel-glaze"
        />
        <rect x="0" y={rim} width="200" height="5" fill={g.edge} />
        {clay === "speckled" &&
          SPECKS.map(([x, y, r], i) => (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={r}
              fill={c.fleck}
              opacity={y < line ? 0.45 : 0.8}
            />
          ))}
      </g>
      <path d={path} fill="none" stroke="var(--ink)" strokeWidth="1.2" />
      <line
        x1="30"
        x2="170"
        y1={BASE + 0.6}
        y2={BASE + 0.6}
        stroke="var(--ink)"
        strokeWidth="1.2"
      />
    </svg>
  );
}

type TileProps = { glaze: GlazeId; clay: ClayId; className?: string };

/** A glaze test tile: dipped two thirds, a ridge to show how the glaze breaks, a hole for hanging. */
export function GlazeTile({ glaze, clay, className }: TileProps) {
  const id = useId();
  const g = glazeById(glaze);
  const c = clayById(clay);
  return (
    <svg viewBox="0 0 60 90" className={className} aria-hidden="true">
      <mask id={id}>
        <rect width="60" height="90" rx="4" fill="#fff" />
        <circle cx="30" cy="10" r="4" fill="#000" />
      </mask>
      <g mask={`url(#${id})`}>
        <rect width="60" height="90" fill={c.color} />
        <path
          d="M0 0 H60 V60 L54 61.5 L50 66 L46 61 L38 62.5 L30 60.5 L22 62 L18 67 L14 61.5 L6 62 L0 60.5 Z"
          fill={g.color}
          fillOpacity={g.cover}
        />
        <rect y="34" width="60" height="3" fill={g.edge} />
        <rect width="60" height="2.5" fill={g.edge} />
        {clay === "speckled" &&
          SPECKS.slice(0, 26).map(([x, y, r], i) => (
            <circle
              key={i}
              cx={(x * 0.3) % 60}
              cy={(y * 0.42) % 90}
              r={r * 0.55}
              fill={c.fleck}
              opacity="0.6"
            />
          ))}
      </g>
    </svg>
  );
}
