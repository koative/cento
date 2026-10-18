import type { KeyboardEvent } from "react";
import { areas, tiers } from "../content";

/* Street-grid corners of the drawn city, rows × columns; each area is the quad between four of them. */
const nodes = [
  [
    [12, 14],
    [160, 10],
    [318, 18],
    [468, 12],
    [588, 16],
  ],
  [
    [10, 150],
    [168, 138],
    [306, 128],
    [452, 156],
    [590, 140],
  ],
  [
    [14, 282],
    [176, 292],
    [318, 270],
    [446, 288],
    [586, 280],
  ],
  [
    [12, 408],
    [158, 410],
    [322, 406],
    [462, 410],
    [588, 404],
  ],
];

const cells = areas.map((a) => {
  const [r, c] = a.cell;
  const pts = [
    nodes[r][c],
    nodes[r][c + 1],
    nodes[r + 1][c + 1],
    nodes[r + 1][c],
  ];
  return {
    area: a,
    points: pts.map((p) => p.join(",")).join(" "),
    x: pts.reduce((s, p) => s + p[0], 0) / 4,
    // Labels sit in the upper half of each block so the river never runs through them.
    y: pts.reduce((s, p) => s + p[1], 0) / 4 - (r === 1 ? 26 : 0),
  };
});

type Props = { selected?: string; onSelect?: (slug: string) => void };

/** Authored map of Calder's service zones. Interactive (keyboard too) when `onSelect` is given. */
export function AreaMap({ selected, onSelect }: Props) {
  const onKey = (slug: string) => (e: KeyboardEvent) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    onSelect?.(slug);
  };

  return (
    <svg
      className="area-map"
      viewBox="0 0 600 420"
      role={onSelect ? "group" : undefined}
      aria-label={
        onSelect ? "Map of service zones — choose a neighbourhood" : undefined
      }
      aria-hidden={onSelect ? undefined : true}
    >
      <defs>
        <pattern
          id="map-hatch"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line x1="0" y1="0" x2="0" y2="8" className="map-hatch-line" />
        </pattern>
      </defs>
      {cells.map(({ area: a, points }) => {
        const interactive = onSelect && a.tier !== "none";
        return (
          <g
            key={a.slug}
            className="map-cell"
            data-tier={a.tier}
            data-selected={selected === a.slug ? "" : undefined}
            role={interactive ? "button" : undefined}
            tabIndex={interactive ? 0 : undefined}
            aria-pressed={interactive ? selected === a.slug : undefined}
            aria-label={
              interactive ? `${a.name}, ${tiers[a.tier].label}` : undefined
            }
            onClick={interactive ? () => onSelect(a.slug) : undefined}
            onKeyDown={interactive ? onKey(a.slug) : undefined}
          >
            <polygon points={points} />
          </g>
        );
      })}
      <path
        className="map-river"
        d="M0 214 C 110 196, 190 250, 300 222 S 470 246, 600 312"
      />
      <g className="map-labels" aria-hidden="true">
        {cells.map(({ area: a, x, y }) => (
          <text
            key={a.slug}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            data-tier={a.tier}
          >
            {a.name}
          </text>
        ))}
      </g>
      <g
        className="map-depot"
        transform="translate(222 258)"
        aria-hidden="true"
      >
        <rect x="-7" y="-7" width="14" height="14" />
        <text x="13" y="1" dominantBaseline="middle">
          Depot
        </text>
      </g>
    </svg>
  );
}
