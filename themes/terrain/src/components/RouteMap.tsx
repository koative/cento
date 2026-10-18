import { useMemo } from "react";
import type { Trip } from "../content";

type Pt = [number, number];

/** Smooth path through points (Catmull-Rom converted to cubic Béziers). */
function smooth(p: Pt[]) {
  let d = `M${p[0][0]},${p[0][1]}`;
  for (let i = 0; i < p.length - 1; i++) {
    const [a, b, c, e] = [
      p[i - 1] ?? p[i],
      p[i],
      p[i + 1],
      p[i + 2] ?? p[i + 1],
    ];
    const c1 = [b[0] + (c[0] - a[0]) / 6, b[1] + (c[1] - a[1]) / 6];
    const c2 = [c[0] - (e[0] - b[0]) / 6, c[1] - (e[1] - b[1]) / 6];
    d += ` C${c1[0].toFixed(2)},${c1[1].toFixed(2)} ${c2[0].toFixed(2)},${c2[1].toFixed(2)} ${c[0]},${c[1]}`;
  }
  return d;
}

/** Five wobbly closed contour rings around each summit; the ring shape is seeded by its position. */
function contours(peaks: Trip["map"]["peaks"]) {
  return peaks.flatMap(([cx, cy, size], k) =>
    [1, 2, 3, 4, 5].map((ring) => {
      const r = (size * ring) / 4.2;
      const pts: string[] = [];
      for (let s = 0; s < 48; s++) {
        const t = (s / 48) * Math.PI * 2;
        const wobble =
          1 +
          0.13 * Math.sin(3 * t + k * 1.7 + ring * 0.4) +
          0.07 * Math.sin(5 * t + cx);
        pts.push(
          `${(cx + Math.cos(t) * r * 1.35 * wobble).toFixed(2)},${(cy + Math.sin(t) * r * wobble).toFixed(2)}`,
        );
      }
      return { d: `M${pts.join(" L")} Z`, index: ring === 3 };
    }),
  );
}

/** Illustrative topo sheet with one line per day; the active day is drawn in the trail colour. */
export function RouteMap({
  trip,
  active = null,
  onSelect,
}: {
  trip: Trip;
  active?: number | null;
  onSelect?: (i: number) => void;
}) {
  const rings = useMemo(() => contours(trip.map.peaks), [trip]);
  const legs = trip.map.legs;
  const marker = (leg: Pt[]) => {
    const loop =
      leg[0][0] === leg[leg.length - 1][0] &&
      leg[0][1] === leg[leg.length - 1][1];
    return loop ? leg[Math.floor(leg.length / 2)] : leg[leg.length - 1];
  };

  return (
    <figure className="route-map">
      <svg
        viewBox="0 0 100 64"
        role="img"
        aria-label={`Illustrative map of the ${trip.name} route, ${legs.length} days`}
      >
        <rect className="map-sheet" x="0" y="0" width="100" height="64" />
        {Array.from({ length: 9 }, (_, i) => (
          <g key={i} className="map-tick">
            <line x1={(i + 1) * 10} x2={(i + 1) * 10} y1="0" y2="1.4" />
            <line x1={(i + 1) * 10} x2={(i + 1) * 10} y1="62.6" y2="64" />
          </g>
        ))}
        {rings.map((r, i) => (
          <path
            key={i}
            className="map-contour"
            data-index={r.index ? "" : undefined}
            d={r.d}
          />
        ))}
        {trip.map.peaks.map(([px, py], i) => (
          <path
            key={i}
            className="map-summit"
            d={`M${px - 1.2},${py + 1} L${px},${py - 1} L${px + 1.2},${py + 1} Z`}
          />
        ))}
        {legs.slice(1).map((leg, i) => {
          const [a, b] = [legs[i][legs[i].length - 1], leg[0]];
          return a[0] === b[0] && a[1] === b[1] ? null : (
            <line
              key={i}
              className="map-transfer"
              x1={a[0]}
              y1={a[1]}
              x2={b[0]}
              y2={b[1]}
            />
          );
        })}
        {legs.map((leg, i) => (
          <path
            key={`${trip.slug}-${i}-${active === i}`}
            className="map-leg"
            data-active={active === i ? "" : undefined}
            d={smooth(leg)}
            pathLength={1}
          />
        ))}
        <rect
          className="map-start"
          x={legs[0][0][0] - 1.3}
          y={legs[0][0][1] - 1.3}
          width="2.6"
          height="2.6"
        />
        {legs.map((leg, i) => {
          const [mx, my] = marker(leg);
          return (
            <g
              key={i}
              className="map-marker"
              data-active={active === i ? "" : undefined}
              onClick={onSelect && (() => onSelect(i))}
            >
              <circle cx={mx} cy={my} r="2.5" />
              <text x={mx} y={my + 0.95}>
                {i + 1}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption>
        Illustrative route, not for navigation. The square marks the start;
        numbers mark each day, dashes are transfers.
      </figcaption>
    </figure>
  );
}
