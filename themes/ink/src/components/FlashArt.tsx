import { useId, type ReactNode } from "react";
import type { ArtKey } from "../content";

/* Authored flash: every design is plain geometry in a 200 × 200 box.
   .solid = packed black, .spot = the one red, .knock = paper-coloured fill that hides lines behind it. */

type Pt = readonly [number, number];

function polar(r: number, deg: number, cx = 100, cy = 100): Pt {
  const a = ((deg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
}

const pts = (list: Pt[]) =>
  list.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(" ");
const range = (n: number) => Array.from({ length: n }, (_, i) => i);

/** n-point star with outer radius R and inner radius r. */
function star(cx: number, cy: number, R: number, r: number, n = 4) {
  return pts(
    range(n * 2).map((i) => polar(i % 2 ? r : R, (i * 180) / n, cx, cy)),
  );
}

const art: Record<ArtKey, (id: string) => ReactNode> = {
  orbit: () => {
    const t = (-40 * Math.PI) / 180;
    const rot = (-28 * Math.PI) / 180;
    const [ex, ey] = [84 * Math.cos(t), 24 * Math.sin(t)];
    const moon: Pt = [
      100 + ex * Math.cos(rot) - ey * Math.sin(rot),
      100 + ex * Math.sin(rot) + ey * Math.cos(rot),
    ];
    return (
      <>
        <circle cx="100" cy="100" r="52" />
        <circle cx="100" cy="100" r="40" strokeDasharray="0.5 5" />
        <ellipse
          cx="100"
          cy="100"
          rx="84"
          ry="24"
          transform="rotate(-28 100 100)"
        />
        <circle className="spot" cx={moon[0]} cy={moon[1]} r="7" />
      </>
    );
  },
  undertow: () =>
    range(5).map((i) => (
      <path
        key={i}
        d={`M28 ${66 + i * 16} Q64 ${30 + i * 16} 100 ${66 + i * 16} T172 ${66 + i * 16}`}
      />
    )),
  threshold: () => (
    <>
      {range(4).map((i) => (
        <path
          key={i}
          d={`M${45 + i * 13} 165 V92 A${55 - i * 13} ${55 - i * 13} 0 0 1 ${155 - i * 13} 92 V165`}
        />
      ))}
      <path d="M28 165 H172" />
      <circle className="solid" cx="100" cy="122" r="4" />
    </>
  ),
  intervals: () =>
    range(5).map((i) => (
      <g key={i}>
        <circle cx="100" cy={52 + i * 24} r="24" />
        <circle className="solid" cx="100" cy={52 + i * 24} r="2.5" />
      </g>
    )),
  sunwheel: () => (
    <>
      {range(24).map((i) => {
        const [a, b] = [polar(46, i * 15), polar(i % 2 ? 70 : 88, i * 15)];
        return <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} />;
      })}
      <circle cx="100" cy="100" r="37" />
      <circle className="solid" cx="100" cy="100" r="27" />
    </>
  ),
  "night-watch": (id) => (
    <>
      <mask id={id}>
        <rect width="200" height="200" fill="white" />
        <circle cx="128" cy="82" r="52" fill="black" />
      </mask>
      <circle className="solid" cx="100" cy="102" r="64" mask={`url(#${id})`} />
      <polygon className="spot" points={star(148, 72, 13, 3.5)} />
      <polygon className="solid" points={star(128, 112, 8, 2.2)} />
      <polygon className="solid" points={star(168, 116, 6, 1.8)} />
      <circle className="solid" cx="112" cy="56" r="2" />
    </>
  ),
  seed: () => (
    <>
      <circle cx="100" cy="100" r="28" />
      {range(6).map((i) => {
        const [x, y] = polar(28, i * 60);
        return <circle key={i} cx={x} cy={y} r="28" />;
      })}
      <circle cx="100" cy="100" r="56" />
      <circle cx="100" cy="100" r="63" />
    </>
  ),
  lantern: () => (
    <>
      <path d="M100 12 V30 M100 160 V172" />
      {[64, 46, 28].map((s) => (
        <polygon
          key={s}
          points={pts([
            [100, 95 - s],
            [100 + s * 0.72, 95],
            [100, 95 + s],
            [100 - s * 0.72, 95],
          ])}
        />
      ))}
      <polygon
        className="solid"
        points={pts([
          [100, 85],
          [107, 95],
          [100, 105],
          [93, 95],
        ])}
      />
      <path
        className="spot"
        d="M100 176 C108 186 106 192 100 192 C94 192 92 186 100 176Z"
      />
    </>
  ),
  chainline: () =>
    range(6).map((i) =>
      i % 2 ? (
        <rect
          key={i}
          x={20 + i * 29}
          y="96"
          width="44"
          height="8"
          rx="4"
          className="solid"
        />
      ) : (
        <ellipse
          key={i}
          cx={42 + i * 29}
          cy="100"
          rx="22"
          ry="14"
          strokeWidth="5"
        />
      ),
    ),
  vesper: () => (
    <>
      <rect x="52" y="52" width="96" height="96" />
      <rect
        x="52"
        y="52"
        width="96"
        height="96"
        transform="rotate(45 100 100)"
      />
      <circle cx="100" cy="100" r="30" />
      <circle className="solid" cx="100" cy="100" r="9" />
      <circle
        cx="100"
        cy="100"
        r="84"
        strokeDasharray="0 7"
        strokeWidth="3.2"
      />
      <circle cx="100" cy="100" r="76" strokeDasharray="0 9" strokeWidth="2" />
    </>
  ),
  twelvefold: () => (
    <>
      {range(12).map((i) => (
        <path
          key={`o${i}`}
          d="M100 78 Q114 50 100 18 Q86 50 100 78Z"
          transform={`rotate(${i * 30} 100 100)`}
        />
      ))}
      {range(12).map((i) => (
        <path
          key={`i${i}`}
          className="solid"
          d="M100 80 Q106 66 100 54 Q94 66 100 80Z"
          transform={`rotate(${i * 30 + 15} 100 100)`}
        />
      ))}
      <circle cx="100" cy="100" r="20" />
      <circle className="spot" cx="100" cy="100" r="7" />
      {range(24).map((i) => {
        const [x, y] = polar(92, i * 15);
        return <circle key={`d${i}`} className="solid" cx={x} cy={y} r="1.8" />;
      })}
    </>
  ),
  phases: () => {
    const r = 15;
    const half = (x: number, sweep: 0 | 1) =>
      `M${x} ${100 - r} A${r} ${r} 0 0 ${sweep} ${x} ${100 + r}Z`;
    return (
      <>
        <path d="M18 128 H182" />
        {[30, 65, 100, 135, 170].map((x, i) => (
          <g key={x}>
            <circle
              cx={x}
              cy="100"
              r={r}
              className={i === 0 || i === 4 ? "solid" : undefined}
            />
            {i === 1 && <path className="solid" d={half(x, 1)} />}
            {i === 3 && <path className="solid" d={half(x, 0)} />}
            <circle className="solid" cx={x} cy="128" r="2.4" />
          </g>
        ))}
        <polygon className="spot" points={star(100, 62, 9, 2.4)} />
      </>
    );
  },
  spine: () => (
    <>
      <path d="M100 12 V188" />
      {range(8).map((k) => {
        const y = 30 + k * 20;
        const s = 4 + 11 * Math.sin((Math.PI * (k + 0.5)) / 8);
        return (
          <g key={k}>
            <polygon
              className={k % 2 ? "solid" : undefined}
              points={pts([
                [100, y - s],
                [100 + s, y],
                [100, y + s],
                [100 - s, y],
              ])}
            />
            <circle className="solid" cx={100 - s - 10} cy={y} r="1.8" />
            <circle className="solid" cx={100 + s + 10} cy={y} r="1.8" />
          </g>
        );
      })}
    </>
  ),
  "tide-eye": () => (
    <>
      {range(9).map((i) => {
        const deg = -64 + i * 16;
        const [a, b] = [polar(50, deg), polar(i % 2 ? 66 : 76, deg)];
        return <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} />;
      })}
      <path d="M22 104 Q100 38 178 104 Q100 168 22 104Z" />
      <circle cx="100" cy="104" r="26" />
      <circle className="solid" cx="100" cy="104" r="11" />
      <path
        className="spot"
        d="M100 146 C109 158 107 168 100 168 C93 168 91 158 100 146Z"
      />
    </>
  ),
  briar: () => {
    const w = 20.5;
    return (
      <>
        <path d="M16 80 H184 M16 120 H184" />
        {range(8).map((i) => (
          <polygon
            key={`u${i}`}
            className="solid"
            points={pts([
              [18 + i * w, 120],
              [18 + (i + 1) * w, 120],
              [18 + (i + 0.5) * w, 94],
            ])}
          />
        ))}
        {range(7).map((i) => (
          <polygon
            key={`d${i}`}
            className="solid"
            points={pts([
              [18 + (i + 0.5) * w, 80],
              [18 + (i + 1.5) * w, 80],
              [18 + (i + 1) * w, 104],
            ])}
          />
        ))}
      </>
    );
  },
  compass: () => (
    <>
      <circle cx="100" cy="100" r="62" />
      {range(32).map((i) => {
        const [a, b] = [
          polar(62, i * 11.25),
          polar(i % 4 ? 67 : 73, i * 11.25),
        ];
        return <line key={`t${i}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} />;
      })}
      {range(8).map((k) => {
        const deg = k * 45;
        const tip = polar(k % 2 ? 48 : 88, deg);
        const left = polar(15, deg - 22.5);
        const right = polar(15, deg + 22.5);
        return (
          <g key={k}>
            <polygon
              className={k === 0 ? "spot" : "solid"}
              points={pts([[100, 100], left, tip])}
            />
            <polygon className="knock" points={pts([[100, 100], tip, right])} />
          </g>
        );
      })}
    </>
  ),
  banner: () => (
    <>
      <polygon
        points={pts([
          [52, 96],
          [14, 96],
          [28, 113],
          [14, 130],
          [58, 130],
        ])}
      />
      <polygon
        points={pts([
          [148, 96],
          [186, 96],
          [172, 113],
          [186, 130],
          [142, 130],
        ])}
      />
      <polygon
        className="solid"
        points={pts([
          [40, 120],
          [58, 130],
          [58, 120],
        ])}
      />
      <polygon
        className="solid"
        points={pts([
          [160, 120],
          [142, 130],
          [142, 120],
        ])}
      />
      <rect className="knock" x="40" y="80" width="120" height="40" />
      <text x="100" y="109" textAnchor="middle" fontSize="27">
        Yours
      </text>
      <polygon className="spot" points={star(100, 58, 11, 3)} />
      <circle className="solid" cx="76" cy="62" r="2" />
      <circle className="solid" cx="124" cy="62" r="2" />
    </>
  ),
};

type Props = {
  art: ArtKey;
  label?: string;
  className?: string;
  strokeWidth?: number;
};

export function FlashArt({
  art: key,
  label,
  className = "",
  strokeWidth = 1.6,
}: Props) {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      className={`art ${className}`}
      viewBox="0 0 200 200"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {art[key](`m${id}`)}
    </svg>
  );
}

/** The bare drawing, for embedding inside another SVG (the stencil sizer). */
export function FlashArtGroup({ art: key }: { art: ArtKey }) {
  const id = useId().replace(/:/g, "");
  return <>{art[key](`m${id}`)}</>;
}
