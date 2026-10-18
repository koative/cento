import { useId, type ReactNode } from "react";
import { families, finishes, materials, tolerances } from "../content";
import { holeDia, partNumber, type PartSpec } from "../lib/part";

const W = 800;
const H = 520;

/** Horizontal or vertical dimension with extension-free arrows and a centred value. */
function Dim({
  x1,
  y1,
  x2,
  y2,
  label,
  arrow,
  side = -6,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  label: string;
  arrow: string;
  side?: number;
}) {
  const vertical = x1 === x2;
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  return (
    <g className="dim">
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        markerStart={`url(#${arrow})`}
        markerEnd={`url(#${arrow})`}
      />
      {vertical ? (
        <text
          x={mx + side}
          y={my}
          transform={`rotate(-90 ${mx + side} ${my})`}
          textAnchor="middle"
        >
          {label}
        </text>
      ) : (
        <text x={mx} y={my + side} textAnchor="middle">
          {label}
        </text>
      )}
    </g>
  );
}

/** Leader line from a feature to a note, ending in a short shelf. */
function Leader({
  from,
  to,
  label,
  anchor = "start",
}: {
  from: [number, number];
  to: [number, number];
  label: string;
  anchor?: "start" | "end";
}) {
  const shelf = anchor === "start" ? 14 : -14;
  return (
    <g className="leader">
      <polyline
        points={`${from[0]},${from[1]} ${to[0]},${to[1]} ${to[0] + shelf},${to[1]}`}
      />
      <circle cx={from[0]} cy={from[1]} r={1.8} />
      <text
        x={to[0] + shelf + (anchor === "start" ? 4 : -4)}
        y={to[1] + 4}
        textAnchor={anchor}
      >
        {label}
      </text>
    </g>
  );
}

function Ext({
  x1,
  y1,
  x2,
  y2,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}) {
  return <line className="ext" x1={x1} y1={y1} x2={x2} y2={y2} />;
}

function flange(d: Record<string, number>, a: string): ReactNode {
  const s = 1.1;
  const cx = 230;
  const cy = 205;
  const r = (d.od / 2) * s;
  const rb = (d.bore / 2) * s;
  const pcd = (d.od + d.bore) / 2;
  const rp = (pcd / 2) * s;
  const hd = holeDia(d.od);
  const rh = (hd / 2) * s;
  const holes = Array.from({ length: d.holes }, (_, i) => {
    const ang = -Math.PI / 2 + (i * 2 * Math.PI) / d.holes;
    return [cx + rp * Math.cos(ang), cy + rp * Math.sin(ang)] as const;
  });
  const sx = 500;
  const tw = d.t * s;
  const diag = Math.SQRT1_2;
  return (
    <>
      <circle className="cl" cx={cx} cy={cy} r={rp} />
      <line className="cl" x1={cx - r - 14} y1={cy} x2={cx + r + 14} y2={cy} />
      <line className="cl" x1={cx} y1={cy - r - 14} x2={cx} y2={cy + r + 14} />
      <circle className="edge" cx={cx} cy={cy} r={r} />
      <circle className="edge" cx={cx} cy={cy} r={rb} />
      {holes.map(([x, y], i) => (
        <circle key={i} className="edge" cx={x} cy={y} r={rh} />
      ))}
      <Ext x1={cx - r} y1={cy + 6} x2={cx - r} y2={cy + r + 34} />
      <Ext x1={cx + r} y1={cy + 6} x2={cx + r} y2={cy + r + 34} />
      <Dim
        x1={cx - r}
        y1={cy + r + 28}
        x2={cx + r}
        y2={cy + r + 28}
        label={`Ø${d.od}`}
        arrow={a}
      />
      <Leader
        from={[cx + rb * diag, cy - rb * diag]}
        to={[cx + r * 0.75 + 16, cy - r - 18]}
        label={`Ø${d.bore} H7 THRU`}
      />
      <Leader
        from={[holes[0][0] - rh * diag, holes[0][1] - rh * diag]}
        to={[40, Math.max(48, cy - r - 18)]}
        label={`${d.holes}× Ø${hd} THRU EQ SP`}
      />
      <Leader
        from={[cx + rp * diag, cy + rp * diag]}
        to={[cx + r + 12, cy + r + 4]}
        label={`PCD ${pcd}`}
      />

      <line className="cl" x1={sx - 14} y1={cy} x2={sx + tw + 14} y2={cy} />
      <rect className="edge" x={sx} y={cy - r} width={tw} height={2 * r} />
      <line className="hidden" x1={sx} y1={cy - rb} x2={sx + tw} y2={cy - rb} />
      <line className="hidden" x1={sx} y1={cy + rb} x2={sx + tw} y2={cy + rb} />
      <line
        className="hidden"
        x1={sx}
        y1={cy - rp - rh}
        x2={sx + tw}
        y2={cy - rp - rh}
      />
      <line
        className="hidden"
        x1={sx}
        y1={cy - rp + rh}
        x2={sx + tw}
        y2={cy - rp + rh}
      />
      <Ext x1={sx} y1={cy - r - 4} x2={sx} y2={cy - r - 30} />
      <Ext x1={sx + tw} y1={cy - r - 4} x2={sx + tw} y2={cy - r - 30} />
      <Dim
        x1={sx - 26}
        y1={cy - r - 24}
        x2={sx}
        y2={cy - r - 24}
        label=""
        arrow={a}
      />
      <Dim
        x1={sx + tw}
        y1={cy - r - 24}
        x2={sx + tw + 26}
        y2={cy - r - 24}
        label=""
        arrow={a}
      />
      <text className="dim-text" x={sx + tw + 32} y={cy - r - 20}>
        {d.t}
      </text>
      <text className="view" x={cx} y={cy + r + 62} textAnchor="middle">
        VIEW A
      </text>
      <text
        className="view"
        x={sx + tw / 2}
        y={cy + r + 62}
        textAnchor="middle"
      >
        SIDE
      </text>
    </>
  );
}

function bracket(d: Record<string, number>, a: string): ReactNode {
  const s = 1.1;
  const y0 = 330;
  const x0 = 80;
  const w = d.w * s;
  const h = d.h * s;
  const t = d.t * s;
  const profile = `M${x0},${y0} H${x0 + w} V${y0 - t} H${x0 + t} V${y0 - h} H${x0} Z`;
  const x1 = 320;
  const len = d.len * s;
  const top = y0 - w;
  const rowY = (top + t + y0) / 2;
  const rh = 3.3 * s;
  const holes = Array.from(
    { length: d.holes },
    (_, i) => x1 + (len * (i + 1)) / (d.holes + 1),
  );
  return (
    <>
      <path className="edge" d={profile} />
      <line
        className="cl"
        x1={x0 + t / 2}
        y1={y0 - h - 12}
        x2={x0 + t / 2}
        y2={y0 + 8}
      />
      <Ext x1={x0 - 4} y1={y0 - h} x2={x0 - 30} y2={y0 - h} />
      <Ext x1={x0 - 4} y1={y0} x2={x0 - 30} y2={y0} />
      <Dim
        x1={x0 - 24}
        y1={y0 - h}
        x2={x0 - 24}
        y2={y0}
        label={`${d.h}`}
        arrow={a}
      />
      <Ext x1={x0} y1={y0 + 4} x2={x0} y2={y0 + 30} />
      <Ext x1={x0 + w} y1={y0 + 4} x2={x0 + w} y2={y0 + 30} />
      <Dim
        x1={x0}
        y1={y0 + 24}
        x2={x0 + w}
        y2={y0 + 24}
        label={`${d.w}`}
        arrow={a}
      />
      <Leader
        from={[x0 + t, y0 - h + 12]}
        to={[x0 + t + 34, y0 - h - 14]}
        label={`t = ${d.t}`}
      />

      <rect className="edge" x={x1} y={top} width={len} height={w} />
      <line className="edge" x1={x1} y1={top + t} x2={x1 + len} y2={top + t} />
      <line
        className="cl"
        x1={x1 - 10}
        y1={rowY}
        x2={x1 + len + 10}
        y2={rowY}
      />
      {holes.map((x) => (
        <g key={x}>
          <circle className="edge" cx={x} cy={rowY} r={rh} />
          <line
            className="cl"
            x1={x}
            y1={rowY - rh - 6}
            x2={x}
            y2={rowY + rh + 6}
          />
        </g>
      ))}
      <Ext x1={x1} y1={y0 + 4} x2={x1} y2={y0 + 30} />
      <Ext x1={x1 + len} y1={y0 + 4} x2={x1 + len} y2={y0 + 30} />
      <Dim
        x1={x1}
        y1={y0 + 24}
        x2={x1 + len}
        y2={y0 + 24}
        label={`${d.len}`}
        arrow={a}
      />
      <Leader
        from={[holes[0] + rh * 0.7, rowY - rh * 0.7]}
        to={[holes[0] + 26, top - 22]}
        label={`${d.holes}× Ø6.6 THRU`}
      />
      <text className="view" x={x0 + w / 2} y={y0 + 58} textAnchor="middle">
        END
      </text>
      <text className="view" x={x1 + len / 2} y={y0 + 58} textAnchor="middle">
        TOP
      </text>
    </>
  );
}

function shaft(d: Record<string, number>, a: string): ReactNode {
  const s = 0.95;
  const cy = 200;
  const len = d.len * s;
  const x0 = 370 - len / 2;
  const main = (d.len - d.l2) * s;
  const r = (d.d / 2) * s;
  const r2 = (d.d2 / 2) * s;
  const c = Math.min(2, d.d2 * 0.08) * s;
  const xs = x0 + main;
  const xe = x0 + len;
  const body = `M${x0 + c},${cy - r} H${xs} V${cy - r2} H${xe - c} L${xe},${cy - r2 + c} V${cy + r2 - c} L${xe - c},${cy + r2} H${xs} V${cy + r} H${x0 + c} L${x0},${cy + r - c} V${cy - r + c} Z`;
  const keyLen = Math.min(main * 0.5, 60 * s);
  const keyW = Math.max(3, d.d * 0.25 * s);
  const kx = x0 + main / 2 - keyLen / 2;
  const ex = 720;
  return (
    <>
      <line className="cl" x1={x0 - 12} y1={cy} x2={xe + 12} y2={cy} />
      <path className="edge" d={body} />
      <line className="edge" x1={x0 + c} y1={cy - r} x2={x0 + c} y2={cy + r} />
      <line
        className="edge"
        x1={xe - c}
        y1={cy - r2}
        x2={xe - c}
        y2={cy + r2}
      />
      <rect
        className="edge"
        x={kx}
        y={cy - keyW / 2}
        width={keyLen}
        height={keyW}
        rx={keyW / 2}
      />
      <Ext x1={x0} y1={cy + r + 4} x2={x0} y2={cy + r + 64} />
      <Ext x1={xe} y1={cy + r2 + 4} x2={xe} y2={cy + r + 64} />
      <Dim
        x1={x0}
        y1={cy + r + 58}
        x2={xe}
        y2={cy + r + 58}
        label={`${d.len}`}
        arrow={a}
      />
      <Ext x1={xs} y1={cy + r + 4} x2={xs} y2={cy + r + 34} />
      <Dim
        x1={xs}
        y1={cy + r + 28}
        x2={xe}
        y2={cy + r + 28}
        label={`${d.l2}`}
        arrow={a}
      />
      <Leader
        from={[x0 + main * 0.25, cy - r]}
        to={[x0 + main * 0.25 - 24, cy - r - 34]}
        label={`Ø${d.d} h6`}
        anchor="end"
      />
      <Leader
        from={[xs + (len - main) / 2, cy - r2]}
        to={[xs + (len - main) / 2 + 22, cy - r - 34]}
        label={`Ø${d.d2} g6`}
      />
      <Leader
        from={[kx, cy]}
        to={[kx - 20, cy + r + 12]}
        label="KEYWAY"
        anchor="end"
      />

      <line className="cl" x1={ex - r - 8} y1={cy} x2={ex + r + 8} y2={cy} />
      <line className="cl" x1={ex} y1={cy - r - 8} x2={ex} y2={cy + r + 8} />
      <circle className="edge" cx={ex} cy={cy} r={r} />
      <circle className="edge" cx={ex} cy={cy} r={r2} />
      <text
        className="view"
        x={x0 + len / 2}
        y={cy + r + 92}
        textAnchor="middle"
      >
        SIDE
      </text>
      <text className="view" x={ex} y={cy + r + 92} textAnchor="middle">
        END
      </text>
    </>
  );
}

export function PartDrawing({ spec }: { spec: PartSpec }) {
  const arrow = useId().replace(/:/g, "") + "arr";
  const fam = families.find((f) => f.id === spec.family)!;
  const mat = materials.find((m) => m.id === spec.material)!;
  const fin = finishes.find((f) => f.id === spec.finish)!;
  const tol = tolerances.find((t) => t.id === spec.tol)!;
  const pn = partNumber(spec);
  const view = { flange, bracket, shaft }[spec.family](spec.dims, arrow);
  const zones = 8;
  const block: [string, string, number, number, number][] = [
    ["PART NO", pn, 500, 412, 138],
    ["TITLE", fam.name.toUpperCase(), 638, 412, 138],
    ["MATERIAL", mat.name.toUpperCase(), 500, 440, 276],
    ["FINISH", fin.name.toUpperCase(), 500, 468, 138],
    ["TOL", tol.band, 638, 468, 70],
    ["QTY", String(spec.qty), 708, 468, 68],
  ];

  return (
    <svg
      className="drawing"
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={`Drawing ${pn}: ${fam.name}, ${fam.dims.map((d) => `${d.label.toLowerCase()} ${spec.dims[d.key]}${d.key === "holes" ? "" : " mm"}`).join(", ")}`}
    >
      <defs>
        <marker
          id={arrow}
          viewBox="0 0 10 10"
          refX="10"
          refY="5"
          markerWidth="9"
          markerHeight="9"
          orient="auto-start-reverse"
          markerUnits="userSpaceOnUse"
        >
          <path d="M0,1.5 L10,5 L0,8.5 Z" className="arrowhead" />
        </marker>
      </defs>
      <rect className="sheet" x="1" y="1" width={W - 2} height={H - 2} />
      <rect className="frame" x="24" y="24" width={W - 48} height={H - 48} />
      {Array.from({ length: zones }, (_, i) => {
        const x = 24 + ((W - 48) / zones) * (i + 0.5);
        return (
          <g key={i} className="zone">
            {i > 0 && (
              <line
                x1={24 + ((W - 48) / zones) * i}
                y1={10}
                x2={24 + ((W - 48) / zones) * i}
                y2={24}
              />
            )}
            <text x={x} y={20} textAnchor="middle">
              {zones - i}
            </text>
          </g>
        );
      })}
      {["D", "C", "B", "A"].map((l, i) => (
        <text
          key={l}
          className="zone"
          x={14}
          y={24 + ((H - 48) / 4) * (i + 0.5) + 3}
          textAnchor="middle"
        >
          {l}
        </text>
      ))}
      <g key={spec.family} className="views">
        {view}
      </g>
      {block.map(([k, v, x, y, w]) => (
        <g key={k} className="tb">
          <rect x={x} y={y} width={w} height={28} />
          <text className="tb-k" x={x + 5} y={y + 9}>
            {k}
          </text>
          <text className="tb-v" x={x + 5} y={y + 22}>
            {v}
          </text>
        </g>
      ))}
      <text className="zone" x={40} y={488}>
        DIMENSIONS IN MM · THIRD-ANGLE PROJECTION · ILLUSTRATIVE, NOT FOR
        MANUFACTURE
      </text>
    </svg>
  );
}
