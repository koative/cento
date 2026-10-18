import type { Vehicle } from "../content";

const NS = { vectorEffect: "non-scaling-stroke" } as const;

/** Elevation drawing in metres. Base of stage 1 sits on y = 0, the rocket grows towards negative y. */
function Rocket({ v }: { v: Vehicle }) {
  const g = v.geometry;
  const r = g.diameter / 2;
  const fr = g.fairingDia / 2;
  const y1 = -g.stage1;
  const yi = y1 - g.interstage;
  const y2 = yi - g.stage2;
  const yb = y2 - 0.5; // boat-tail up to fairing diameter
  const yc = yb - g.fairing * 0.5; // end of fairing barrel
  const top = -g.height + 0.9;
  const nozzle = r * 0.7;
  const bells = Array.from(
    { length: g.engines },
    (_, i) => -r + (r * 2 * (i + 0.5)) / g.engines,
  );
  const bw = (r * 2) / g.engines / 2 - 0.06;

  return (
    <g className="rocket">
      {bells.map((x) => (
        <path
          key={x}
          {...NS}
          className="d-nozzle"
          d={`M ${x - bw * 0.45} 0 L ${x - bw} ${nozzle} L ${x + bw} ${nozzle} L ${x + bw * 0.45} 0 Z`}
        />
      ))}
      <rect
        {...NS}
        className="d-body"
        x={-r}
        y={y1}
        width={r * 2}
        height={g.stage1}
      />
      <rect
        {...NS}
        className="d-inter"
        x={-r}
        y={yi}
        width={r * 2}
        height={g.interstage}
      />
      <rect
        {...NS}
        className="d-body"
        x={-r}
        y={y2}
        width={r * 2}
        height={g.stage2}
      />
      <path
        {...NS}
        className="d-fairing"
        d={`M ${-r} ${y2} L ${-fr} ${yb} L ${-fr} ${yc} C ${-fr} ${yc - g.fairing * 0.32}, ${-fr * 0.3} ${top}, 0 ${-g.height} C ${fr * 0.3} ${top}, ${fr} ${yc - g.fairing * 0.32}, ${fr} ${yc} L ${fr} ${yb} L ${r} ${y2} Z`}
      />
      <line {...NS} className="d-seam" x1={0} x2={0} y1={y2} y2={-g.height} />
      <line
        {...NS}
        className="d-band"
        x1={-r}
        x2={r}
        y1={y1 + 0.9}
        y2={y1 + 0.9}
      />
      {g.legs && (
        <>
          <path
            {...NS}
            className="d-leg"
            d={`M ${-r} ${-g.stage1 * 0.28} L ${-r - 0.35} ${nozzle * 0.6} L ${-r - 0.15} ${nozzle}`}
          />
          <path
            {...NS}
            className="d-leg"
            d={`M ${r} ${-g.stage1 * 0.28} L ${r + 0.35} ${nozzle * 0.6} L ${r + 0.15} ${nozzle}`}
          />
          <rect
            {...NS}
            className="d-fin"
            x={-r - 0.9}
            y={y1 + 0.5}
            width={0.9}
            height={0.7}
          />
          <rect
            {...NS}
            className="d-fin"
            x={r}
            y={y1 + 0.5}
            width={0.9}
            height={0.7}
          />
        </>
      )}
    </g>
  );
}

/** Wayfarer: a bus with two deployed array wings, base on y = 0. */
function Tug({ v }: { v: Vehicle }) {
  const g = v.geometry;
  const r = g.diameter / 2;
  const span = 7.8 / 2;
  const mid = -g.height * 0.55;
  return (
    <g className="rocket">
      <line {...NS} className="d-seam" x1={-span} x2={span} y1={mid} y2={mid} />
      {[-1, 1].map((s) => (
        <g key={s}>
          <rect
            {...NS}
            className="d-array"
            x={s < 0 ? -span : r + 0.3}
            y={mid - 0.55}
            width={span - r - 0.3}
            height={1.1}
          />
          {[1, 2, 3].map((i) => {
            const x = s * (r + 0.3 + ((span - r - 0.3) * i) / 4);
            return (
              <line
                key={i}
                {...NS}
                className="d-seam"
                x1={x}
                x2={x}
                y1={mid - 0.55}
                y2={mid + 0.55}
              />
            );
          })}
        </g>
      ))}
      <rect
        {...NS}
        className="d-body"
        x={-r}
        y={-g.height}
        width={r * 2}
        height={g.height}
      />
      <rect
        {...NS}
        className="d-inter"
        x={-r}
        y={-0.35}
        width={r * 2}
        height={0.35}
      />
      {[-0.5, -0.15, 0.2, 0.55].map((x) => (
        <rect
          key={x}
          {...NS}
          className="d-port"
          x={-r}
          y={-g.height + 0.25 + (x + 0.5) * 1.5}
          width={0.18}
          height={0.28}
        />
      ))}
      <path
        {...NS}
        className="d-nozzle"
        d={`M -0.2 0 L -0.32 0.25 L 0.32 0.25 L 0.2 0 Z`}
      />
    </g>
  );
}

/** One vehicle at `k` units per metre in a column `frame` metres tall; nozzle exits share one ground line. */
export function VehicleSilhouette({
  v,
  k,
  frame,
}: {
  v: Vehicle;
  k: number;
  frame: number;
}) {
  const tug = v.kind === "tug";
  const halfW = tug
    ? 3.9
    : Math.max(v.geometry.fairingDia, v.geometry.diameter + 2) / 2;
  const foot = (tug ? 0.25 : v.geometry.diameter * 0.35) * k;
  const w = halfW * 2 * k + 8;
  const h = (frame + 2) * k;
  return (
    <svg
      className="vehicle-svg"
      viewBox={`0 0 ${w} ${h}`}
      width={w}
      height={h}
      aria-hidden="true"
    >
      <g transform={`translate(${w / 2} ${h - 0.3 * k - foot}) scale(${k})`}>
        {tug ? <Tug v={v} /> : <Rocket v={v} />}
      </g>
    </svg>
  );
}

/** Annotated elevation: overall height, diameter and stage call-outs. */
export function VehicleDrawing({ v }: { v: Vehicle }) {
  const g = v.geometry;
  const tug = v.kind === "tug";
  const k = tug ? 34 : 520 / g.height;
  const halfW = tug ? 3.9 : g.fairingDia / 2;
  const left = 70;
  const cx = left + halfW * k + 10;
  const right = cx + halfW * k + 150;
  const base = (tug ? g.height * k + 60 : 560) + 10;
  const H = base + 60;
  const calls: [string, number, number][] = tug
    ? [
        ["Bus", -g.height, 0],
        ["Array wing", -g.height * 0.55 - 0.55, -g.height * 0.55 + 0.55],
      ]
    : [
        ["Fairing", -g.height, -(g.stage1 + g.interstage + g.stage2)],
        [
          "Stage 2",
          -(g.stage1 + g.interstage + g.stage2),
          -(g.stage1 + g.interstage),
        ],
        ["Interstage", -(g.stage1 + g.interstage), -g.stage1],
        ["Stage 1", -g.stage1, 0],
      ];
  const wide = tug ? 7.8 : g.diameter;
  const lift = tug ? 0 : g.diameter * 0.35 * k; // nozzles hang below stage 1
  const yBot = base - lift;
  const yTop = yBot - g.height * k;

  return (
    <svg
      className="drawing"
      viewBox={`0 0 ${right} ${H}`}
      role="img"
      aria-label={`Elevation drawing of ${v.name}: ${g.height} m tall, ${wide} m wide`}
    >
      <line className="d-ground" x1={0} x2={right} y1={base} y2={base} />
      <g transform={`translate(${cx} ${yBot}) scale(${k})`}>
        {tug ? <Tug v={v} /> : <Rocket v={v} />}
      </g>

      <g className="d-dim">
        <line x1={left - 30} x2={left - 30} y1={yTop} y2={yBot} />
        <line x1={left - 38} x2={left - 22} y1={yTop} y2={yTop} />
        <line x1={left - 38} x2={left - 22} y1={yBot} y2={yBot} />
        <text
          x={left - 40}
          y={(yTop + yBot) / 2}
          transform={`rotate(-90 ${left - 40} ${(yTop + yBot) / 2})`}
          textAnchor="middle"
        >
          {g.height} m
        </text>
      </g>

      {/* width */}
      <g className="d-dim">
        <line
          x1={cx - (wide / 2) * k}
          x2={cx + (wide / 2) * k}
          y1={base + 26}
          y2={base + 26}
        />
        <line
          x1={cx - (wide / 2) * k}
          x2={cx - (wide / 2) * k}
          y1={base + 19}
          y2={base + 33}
        />
        <line
          x1={cx + (wide / 2) * k}
          x2={cx + (wide / 2) * k}
          y1={base + 19}
          y2={base + 33}
        />
        <text x={cx} y={base + 50} textAnchor="middle">
          ⌀ {wide} m
        </text>
      </g>

      {calls.map(([label, from, to]) => {
        const y = base - lift + ((from + to) / 2) * k;
        const x0 = cx + (tug ? 0.8 : g.diameter / 2) * k;
        return (
          <g key={label} className="d-call">
            <line x1={x0 + 4} x2={right - 120} y1={y} y2={y} />
            <circle cx={x0 + 4} cy={y} r={2.2} />
            <text x={right - 114} y={y - 4}>
              {label}
            </text>
            <text className="d-call-sub" x={right - 114} y={y + 12}>
              {Math.abs(to - from).toFixed(1)} m
            </text>
          </g>
        );
      })}
    </svg>
  );
}
