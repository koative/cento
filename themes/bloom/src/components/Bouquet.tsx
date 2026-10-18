import type { ReactNode } from "react";
import { stems, type Glyph, type Stem } from "../content";

const GOLDEN = 137.508;
const SCALE: Record<Glyph, number> = {
  rose: 1.18,
  ranunculus: 1,
  anemone: 1,
  tulip: 0.92,
  lisianthus: 0.9,
  sweetpea: 0.74,
  eucalyptus: 0.86,
  waxflower: 0.6,
};
const FOLIAGE: Glyph[] = ["eucalyptus", "waxflower"];

function petals(n: number, draw: (deg: number) => ReactNode) {
  return Array.from({ length: n }, (_, i) => draw((360 / n) * i));
}

/** Each stem seen from above, drawn in a unit circle. */
function Flower({ s }: { s: Stem }) {
  const fill = s.colour;
  const mid = s.centre;
  switch (s.glyph) {
    case "ranunculus":
      return (
        <>
          <circle r="1" fill={fill} />
          <circle
            r="0.74"
            fill="none"
            stroke={mid}
            strokeOpacity=".45"
            strokeWidth=".07"
          />
          <circle
            r="0.5"
            fill="none"
            stroke={mid}
            strokeOpacity=".6"
            strokeWidth=".07"
          />
          <circle r="0.24" fill={mid} />
        </>
      );
    case "rose":
      return (
        <>
          {petals(5, (d) => (
            <ellipse
              key={d}
              cy="-.42"
              rx=".52"
              ry=".6"
              fill={fill}
              stroke={mid}
              strokeWidth=".05"
              transform={`rotate(${d})`}
            />
          ))}
          <circle r=".46" fill={mid} />
          <path
            d="M0 -.28a.28 .28 0 1 1 -.22 .44M.05 -.1a.12 .12 0 1 1 -.12 .14"
            fill="none"
            stroke={fill}
            strokeWidth=".06"
          />
        </>
      );
    case "tulip":
      return (
        <>
          {petals(3, (d) => (
            <ellipse
              key={d}
              cy="-.3"
              rx=".5"
              ry=".74"
              fill={fill}
              stroke="#00000022"
              strokeWidth=".05"
              transform={`rotate(${d})`}
            />
          ))}
          <circle r=".22" fill={mid} />
        </>
      );
    case "anemone":
      return (
        <>
          {petals(6, (d) => (
            <circle
              key={d}
              cy="-.56"
              r=".44"
              fill={fill}
              stroke="#00000018"
              strokeWidth=".04"
              transform={`rotate(${d})`}
            />
          ))}
          <circle r=".36" fill={mid} />
          {petals(10, (d) => (
            <circle
              key={d}
              cy="-.44"
              r=".05"
              fill={mid}
              transform={`rotate(${d})`}
            />
          ))}
        </>
      );
    case "sweetpea":
      return (
        <>
          <circle
            cx="-.28"
            r=".62"
            fill={fill}
            stroke={mid}
            strokeWidth=".05"
          />
          <circle
            cx=".32"
            cy=".12"
            r=".5"
            fill={fill}
            stroke={mid}
            strokeWidth=".05"
          />
          <ellipse cx=".05" cy=".1" rx=".18" ry=".3" fill={mid} />
        </>
      );
    case "lisianthus":
      return (
        <>
          {petals(5, (d) => (
            <ellipse
              key={d}
              cx=".18"
              cy="-.46"
              rx=".42"
              ry=".56"
              fill={fill}
              stroke={mid}
              strokeWidth=".05"
              transform={`rotate(${d})`}
            />
          ))}
          <circle r=".22" fill="#f3eef8" />
        </>
      );
    case "eucalyptus":
      return (
        <>
          <path
            d="M0 0L0 -1.1M0 0L.95 .55M0 0L-.95 .55"
            stroke={mid}
            strokeWidth=".06"
          />
          {petals(3, (d) => (
            <circle
              key={d}
              cy="-.62"
              r=".42"
              fill={fill}
              stroke={mid}
              strokeWidth=".04"
              transform={`rotate(${d})`}
            />
          ))}
        </>
      );
    case "waxflower":
      return (
        <>
          {[
            [0, 0],
            [0.62, -0.3],
            [-0.6, -0.36],
            [0.2, 0.66],
            [-0.5, 0.5],
          ].map(([x, y]) => (
            <g key={`${x}${y}`} transform={`translate(${x} ${y})`}>
              <circle r=".3" fill={fill} stroke={mid} strokeWidth=".04" />
              <circle r=".1" fill={mid} />
            </g>
          ))}
        </>
      );
  }
}

/** Stable pseudo-random order, so varieties scatter through the spiral instead of forming spokes. */
function scatter(key: string) {
  let h = 2166136261;
  for (let i = 0; i < key.length; i++)
    h = Math.imul(h ^ key.charCodeAt(i), 16777619);
  return h >>> 0;
}

function arrange(counts: Record<string, number>) {
  return stems
    .flatMap((s) =>
      Array.from({ length: counts[s.id] ?? 0 }, (_, n) => ({
        s,
        key: `${s.id}-${n}`,
      })),
    )
    .sort((a, b) => scatter(a.key) - scatter(b.key));
}

type Props = {
  counts: Record<string, number>;
  wrap: string;
  label: string;
  className?: string;
};

/** A hand-tied bouquet seen from above: every stem on a golden-angle spiral, inside its wrap. */
export function Bouquet({ counts, wrap, label, className = "" }: Props) {
  const items = arrange(counts);
  const step = 62 / Math.sqrt(Math.max(items.length, 14));
  const placed = items.map((it, i) => {
    const r = step * Math.sqrt(i + 0.6);
    const a = (i * GOLDEN * Math.PI) / 180;
    return {
      ...it,
      x: r * Math.cos(a),
      y: r * Math.sin(a),
      size: step * 0.98 * SCALE[it.s.glyph],
      turn: (i * 47) % 360,
    };
  });
  // Foliage sits underneath the blooms.
  placed.sort(
    (a, b) =>
      Number(FOLIAGE.includes(b.s.glyph)) - Number(FOLIAGE.includes(a.s.glyph)),
  );

  return (
    <svg
      className={"bouquet " + className}
      viewBox="-100 -100 200 200"
      role="img"
      aria-label={label}
    >
      <g className="bouquet-wrap">
        {petals(9, (d) => (
          <ellipse
            key={d}
            cy="-58"
            rx="34"
            ry="40"
            fill={wrap}
            transform={`rotate(${d + 10})`}
          />
        ))}
        <circle r="70" fill={wrap} />
        <circle r="70" fill="#000" opacity=".06" />
      </g>
      {placed.length === 0 && (
        <text className="bouquet-empty" textAnchor="middle" y="4">
          Add a stem to begin
        </text>
      )}
      {placed.map((p) => (
        <g
          key={p.key}
          className="stem"
          style={{ transform: `translate(${p.x}px, ${p.y}px)` }}
        >
          <g className="stem-in">
            <g transform={`rotate(${p.turn}) scale(${p.size})`}>
              <Flower s={p.s} />
            </g>
          </g>
        </g>
      ))}
    </svg>
  );
}
