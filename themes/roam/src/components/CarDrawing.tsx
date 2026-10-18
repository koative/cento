import { useId } from "react";
import type { Body, Car } from "../content";

/*
 * Side elevations built from exact geometry, the way a rental counter's group board draws its classes.
 * Points are [fraction of length from the rear, fraction of height above the ground].
 */
type Profile = {
  body: [number, number][];
  glass: [number, number][];
  pillars: number[];
  /** Load space: rear x, front x, floor, ceiling. */
  cargo: [number, number, number, number];
  wheels: [number, number];
  wheel: number;
  open?: boolean;
};

const profiles: Record<Body, Profile> = {
  hatch: {
    body: [
      [0, 0.2],
      [0, 0.58],
      [0.03, 0.7],
      [0.1, 0.97],
      [0.16, 1],
      [0.56, 1],
      [0.63, 0.95],
      [0.78, 0.64],
      [0.96, 0.56],
      [1, 0.46],
      [1, 0.2],
    ],
    glass: [
      [0.06, 0.68],
      [0.12, 0.93],
      [0.56, 0.93],
      [0.74, 0.65],
    ],
    pillars: [0.38],
    cargo: [0.02, 0.22, 0.22, 0.66],
    wheels: [0.17, 0.82],
    wheel: 0.08,
  },
  sedan: {
    body: [
      [0, 0.2],
      [0, 0.58],
      [0.04, 0.64],
      [0.14, 0.68],
      [0.32, 0.98],
      [0.4, 1],
      [0.58, 1],
      [0.64, 0.96],
      [0.79, 0.66],
      [0.96, 0.56],
      [1, 0.46],
      [1, 0.2],
    ],
    glass: [
      [0.18, 0.7],
      [0.34, 0.94],
      [0.58, 0.94],
      [0.75, 0.67],
    ],
    pillars: [0.47],
    cargo: [0.02, 0.26, 0.22, 0.64],
    wheels: [0.18, 0.81],
    wheel: 0.075,
  },
  wagon: {
    body: [
      [0, 0.2],
      [0, 0.6],
      [0.02, 0.92],
      [0.06, 1],
      [0.6, 1],
      [0.67, 0.95],
      [0.8, 0.64],
      [0.96, 0.56],
      [1, 0.46],
      [1, 0.2],
    ],
    glass: [
      [0.03, 0.66],
      [0.05, 0.93],
      [0.6, 0.93],
      [0.76, 0.65],
    ],
    pillars: [0.22, 0.42],
    cargo: [0.02, 0.26, 0.22, 0.66],
    wheels: [0.17, 0.81],
    wheel: 0.075,
  },
  suv: {
    body: [
      [0, 0.18],
      [0, 0.62],
      [0.02, 0.94],
      [0.06, 1],
      [0.62, 1],
      [0.7, 0.94],
      [0.8, 0.68],
      [0.96, 0.62],
      [1, 0.52],
      [1, 0.18],
    ],
    glass: [
      [0.03, 0.68],
      [0.05, 0.94],
      [0.62, 0.94],
      [0.76, 0.69],
    ],
    pillars: [0.22, 0.44],
    cargo: [0.02, 0.24, 0.2, 0.68],
    wheels: [0.17, 0.81],
    wheel: 0.088,
  },
  van: {
    body: [
      [0, 0.14],
      [0, 0.96],
      [0.02, 1],
      [0.78, 1],
      [0.86, 0.9],
      [0.94, 0.6],
      [1, 0.52],
      [1, 0.14],
    ],
    glass: [
      [0.03, 0.62],
      [0.03, 0.92],
      [0.78, 0.92],
      [0.88, 0.62],
    ],
    pillars: [0.2, 0.42, 0.62],
    cargo: [0.02, 0.2, 0.16, 0.62],
    wheels: [0.16, 0.84],
    wheel: 0.072,
  },
  convertible: {
    body: [
      [0, 0.22],
      [0, 0.66],
      [0.05, 0.72],
      [0.66, 0.72],
      [0.82, 0.66],
      [0.97, 0.58],
      [1, 0.48],
      [1, 0.22],
    ],
    glass: [
      [0.655, 0.72],
      [0.565, 0.98],
      [0.585, 0.98],
      [0.675, 0.72],
    ],
    pillars: [],
    cargo: [0.02, 0.22, 0.24, 0.66],
    wheels: [0.17, 0.81],
    wheel: 0.08,
    open: true,
  },
  pickup: {
    body: [
      [0, 0.18],
      [0, 0.66],
      [0.38, 0.66],
      [0.4, 0.98],
      [0.44, 1],
      [0.66, 1],
      [0.72, 0.94],
      [0.8, 0.68],
      [0.96, 0.62],
      [1, 0.52],
      [1, 0.18],
    ],
    glass: [
      [0.42, 0.68],
      [0.44, 0.94],
      [0.66, 0.94],
      [0.77, 0.69],
    ],
    pillars: [0.55],
    cargo: [0.02, 0.37, 0.22, 0.66],
    wheels: [0.16, 0.82],
    wheel: 0.085,
  },
};

const W = 400;
const GROUND = 132;
const SCALE_X = 1.65;
const SCALE_Y = 1.55;

type Props = {
  car: Car;
  /** Bag check: how full the load space is (1 = exactly full) and whether it all fits. */
  load?: { pct: number; ok: boolean };
  dims?: boolean;
  className?: string;
};

export function CarDrawing({ car, load, dims, className }: Props) {
  const id = useId().replace(/:/g, "");
  const p = profiles[car.body];
  const L = car.dims.length * SCALE_X;
  const H = car.dims.height * SCALE_Y;
  const x0 = (W - L) / 2;
  const X = (f: number) => x0 + f * L;
  const Y = (f: number) => GROUND - f * H;
  const poly = (pts: [number, number][]) =>
    pts
      .map(
        ([fx, fy], i) =>
          `${i ? "L" : "M"}${X(fx).toFixed(1)} ${Y(fy).toFixed(1)}`,
      )
      .join(" ") + " Z";
  const r = p.wheel * L;
  const [cx0, cx1, cf, cc] = p.cargo;
  const fill = load ? Math.min(load.pct, 1) : 0;
  const height = dims ? 172 : 146;

  return (
    <svg
      className={`car-drawing ${className ?? ""}`}
      viewBox={dims ? `-36 0 ${W + 72} ${height}` : `0 0 ${W} ${height}`}
      role="img"
      aria-label={`${car.name}, ${car.className.toLowerCase()} side view`}
    >
      <defs>
        <mask id={`arch-${id}`}>
          <rect x={-40} width={W + 80} height={height} fill="#fff" />
          {p.wheels.map((w) => (
            <circle key={w} cx={X(w)} cy={GROUND - r} r={r + 4.5} fill="#000" />
          ))}
        </mask>
        <clipPath id={`shell-${id}`}>
          <path d={poly(p.body)} />
        </clipPath>
      </defs>

      <line
        className="car-ground"
        x1={x0 - 18}
        x2={X(1) + 18}
        y1={GROUND + 0.5}
        y2={GROUND + 0.5}
      />

      <g mask={`url(#arch-${id})`}>
        <path className="car-body" d={poly(p.body)} fill={car.paint} />
        <path className="car-glass" d={poly(p.glass)} />
        {p.pillars.map((f) => (
          <line
            key={f}
            className="car-pillar"
            x1={X(f)}
            x2={X(f)}
            y1={Y(0.62)}
            y2={Y(0.99)}
            stroke={car.paint}
          />
        ))}
        {load && (
          <g clipPath={`url(#shell-${id})`}>
            <rect
              className="car-load"
              data-over={load.ok ? undefined : ""}
              x={X(cx0)}
              width={X(cx1) - X(cx0)}
              y={Y(cc)}
              height={Y(cf) - Y(cc)}
              style={{ transform: `scaleY(${fill})` }}
            />
            <rect
              className="car-load-edge"
              x={X(cx0)}
              y={Y(cc)}
              width={X(cx1) - X(cx0)}
              height={Y(cf) - Y(cc)}
            />
          </g>
        )}
        <rect
          className="car-lamp-front"
          x={X(1) - 9}
          y={Y(p.body[p.body.length - 2][1]) + 3}
          width={8}
          height={5}
          rx={2}
        />
        <rect
          className="car-lamp-rear"
          x={X(0) + 1}
          y={Y(0.56)}
          width={5}
          height={9}
          rx={2}
        />
      </g>

      {p.open && (
        <g className="car-open">
          <rect
            x={X(0.07)}
            y={Y(0.79)}
            width={0.13 * L}
            height={0.07 * H}
            rx={3}
          />
          {[0.36, 0.5].map((f) => (
            <rect
              key={f}
              x={X(f)}
              y={Y(0.88)}
              width={0.035 * L}
              height={0.16 * H}
              rx={4}
            />
          ))}
        </g>
      )}

      {p.wheels.map((w) => (
        <g key={w} className="car-wheel">
          <circle cx={X(w)} cy={GROUND - r} r={r} />
          <circle className="car-hub" cx={X(w)} cy={GROUND - r} r={r * 0.52} />
        </g>
      ))}

      {load && !load.ok && load.pct > 1 && (
        <g className="car-curb">
          {Array.from(
            { length: Math.min(3, Math.ceil((load.pct - 1) * 4)) },
            (_, i) => (
              <rect
                key={i}
                x={x0 - 30 - i * 2}
                y={GROUND - 16 - i * 15}
                width={22}
                height={14}
                rx={3}
              />
            ),
          )}
        </g>
      )}

      {dims && (
        <g className="car-dims">
          <line x1={X(0)} x2={X(1)} y1={GROUND + 18} y2={GROUND + 18} />
          <line x1={X(0)} x2={X(0)} y1={GROUND + 12} y2={GROUND + 24} />
          <line x1={X(1)} x2={X(1)} y1={GROUND + 12} y2={GROUND + 24} />
          <text x={W / 2} y={GROUND + 34} textAnchor="middle">
            {car.dims.length} in long
          </text>
          <line x1={X(0) - 12} x2={X(0) - 12} y1={Y(1)} y2={GROUND} />
          <text x={X(0) - 16} y={Y(0.5)} textAnchor="end">
            {car.dims.height} in
          </text>
        </g>
      )}
    </svg>
  );
}
