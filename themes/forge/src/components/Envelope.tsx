import type { Envelope as Env } from "../content";

const C = Math.cos(Math.PI / 6);
const S = 0.5;

/** Isometric work envelope drawn to the machine's real proportions. */
export function Envelope({ env, label }: { env: Env; label: string }) {
  if (env.kind === "cylinder") {
    const k = 280 / env.l;
    const l = env.l * k;
    const r = (env.d / 2) * k;
    const x0 = 60;
    const cy = 100;
    return (
      <svg
        className="envelope"
        viewBox="0 0 420 200"
        role="img"
        aria-label={`Work envelope ${label}`}
      >
        <ellipse className="env-face" cx={x0} cy={cy} rx={r * 0.35} ry={r} />
        <path
          className="env-edge"
          d={`M${x0},${cy - r} H${x0 + l} M${x0},${cy + r} H${x0 + l}`}
        />
        <ellipse
          className="env-edge"
          cx={x0 + l}
          cy={cy}
          rx={r * 0.35}
          ry={r}
        />
        <line
          className="env-cl"
          x1={x0 - 20}
          y1={cy}
          x2={x0 + l + 24}
          y2={cy}
        />
        <text x={x0 + l / 2} y={cy + r + 26} textAnchor="middle">
          L {env.l.toLocaleString("en-US")}
        </text>
        <text x={x0 + l + r * 0.35 + 8} y={cy - r + 4}>
          Ø{env.d}
        </text>
      </svg>
    );
  }
  const max = Math.max(env.x, env.y, env.z);
  const k = 170 / max;
  const [x, y, z] = [env.x * k, env.y * k, env.z * k];
  const p = (a: number, b: number, c: number) =>
    `${200 + (a - b) * C},${20 + z + (a + b) * S * 0.5 - c}`;
  const pt = (a: number, b: number, c: number) =>
    p(a, b, c).split(",").map(Number) as [number, number];
  const top = [p(0, 0, z), p(x, 0, z), p(x, y, z), p(0, y, z)].join(" ");
  const left = [p(0, y, 0), p(x, y, 0), p(x, y, z), p(0, y, z)].join(" ");
  const right = [p(x, 0, 0), p(x, y, 0), p(x, y, z), p(x, 0, z)].join(" ");
  const [ax, ay] = pt(x / 2, y + 14 / k, 0);
  const [bx, by] = pt(x + 14 / k, y / 2, 0);
  const [cx, cy] = pt(0, y, z / 2);
  return (
    <svg
      className="envelope"
      viewBox="0 0 420 260"
      role="img"
      aria-label={`Work envelope ${label}`}
    >
      <polygon className="env-face" points={top} />
      <polygon className="env-side" points={left} />
      <polygon className="env-side env-side-2" points={right} />
      <polyline
        className="env-hidden"
        points={[p(0, 0, 0), p(x, 0, 0)].join(" ")}
      />
      <polyline
        className="env-hidden"
        points={[p(0, 0, 0), p(0, y, 0)].join(" ")}
      />
      <polyline
        className="env-hidden"
        points={[p(0, 0, 0), p(0, 0, z)].join(" ")}
      />
      <text x={ax - 6} y={ay + 12} textAnchor="end">
        X {env.x.toLocaleString("en-US")}
      </text>
      <text x={bx + 6} y={by + 12} textAnchor="start">
        Y {env.y.toLocaleString("en-US")}
      </text>
      <text x={cx - 10} y={cy + 4} textAnchor="end">
        Z {env.z.toLocaleString("en-US")}
      </text>
    </svg>
  );
}
