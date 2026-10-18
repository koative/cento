import type { ReactElement } from "react";
import type { Art } from "../content";

type Props = { art: Art; dims?: { w: string; h: string }; className?: string };

// Body outline of each drawing as [left, top, right, bottom], so dimension lines measure the object itself.
const bounds: Record<Art, [number, number, number, number]> = {
  panel: [40, 24, 200, 262],
  "panel-compact": [40, 44, 200, 262],
  battery: [62, 24, 178, 262],
  "battery-stack": [44, 60, 196, 262],
  inverter: [50, 54, 190, 234],
  micro: [60, 98, 180, 202],
  charger: [70, 30, 170, 180],
  gateway: [44, 64, 196, 234],
};

/** Datasheet-style front elevations, drawn to rough proportion, with optional dimension lines. */
export function ProductArt({ art, dims, className }: Props) {
  const [l, t, r, b] = bounds[art];
  const dy = Math.min(b + 22, 288);
  const dx = r + 18;
  const mid = (t + b) / 2;
  return (
    <svg
      viewBox="0 0 240 300"
      className={`product-art ${className ?? ""}`}
      aria-hidden="true"
    >
      {drawings[art]}
      {dims && (
        <g className="dim">
          <path
            d={`M${l},${dy} H${r} M${l},${dy - 6} V${dy + 6} M${r},${dy - 6} V${dy + 6}`}
          />
          <text x={(l + r) / 2} y={dy - 6} textAnchor="middle">
            {dims.w}
          </text>
          <path
            d={`M${dx},${t} V${b} M${dx - 6},${t} H${dx + 6} M${dx - 6},${b} H${dx + 6}`}
          />
          <text
            x={dx + 14}
            y={mid}
            textAnchor="middle"
            transform={`rotate(-90 ${dx + 14} ${mid})`}
          >
            {dims.h}
          </text>
        </g>
      )}
    </svg>
  );
}

function cellGrid(
  x: number,
  y: number,
  w: number,
  h: number,
  cols: number,
  rows: number,
) {
  const cw = w / cols;
  const ch = h / rows;
  return (
    <g className="pv">
      <rect x={x} y={y} width={w} height={h} rx="2" className="pv-glass" />
      {Array.from({ length: cols - 1 }, (_, i) => (
        <line
          key={`c${i}`}
          x1={x + cw * (i + 1)}
          x2={x + cw * (i + 1)}
          y1={y}
          y2={y + h}
        />
      ))}
      {Array.from({ length: rows - 1 }, (_, i) => (
        <line
          key={`r${i}`}
          x1={x}
          x2={x + w}
          y1={y + ch * (i + 1)}
          y2={y + ch * (i + 1)}
          className={i === rows / 2 - 1 ? "pv-split" : undefined}
        />
      ))}
    </g>
  );
}

const drawings: Record<Art, ReactElement> = {
  panel: (
    <g>
      <rect x="40" y="24" width="160" height="238" rx="4" className="frame" />
      {cellGrid(46, 30, 148, 226, 6, 18)}
    </g>
  ),
  "panel-compact": (
    <g>
      <rect x="40" y="44" width="160" height="218" rx="4" className="frame" />
      {cellGrid(46, 50, 148, 206, 6, 16)}
    </g>
  ),
  battery: (
    <g>
      <rect x="62" y="24" width="116" height="238" rx="10" className="body" />
      <rect
        x="112"
        y="60"
        width="16"
        height="70"
        rx="8"
        className="led-track"
      />
      <rect x="112" y="90" width="16" height="40" rx="8" className="led" />
      <text x="120" y="232" textAnchor="middle" className="mark">
        STORE 13
      </text>
    </g>
  ),
  "battery-stack": (
    <g>
      {[0, 1].map((i) => (
        <g key={i}>
          <rect
            x="44"
            y={60 + i * 74}
            width="152"
            height="68"
            rx="6"
            className="body"
          />
          <rect
            x="60"
            y={90 + i * 74}
            width="40"
            height="6"
            rx="3"
            className={i ? "led" : "led-track"}
          />
        </g>
      ))}
      <rect
        x="44"
        y="208"
        width="152"
        height="54"
        rx="6"
        className="body body-dark"
      />
      <text x="120" y="240" textAnchor="middle" className="mark mark-light">
        STORE 5 BASE
      </text>
    </g>
  ),
  inverter: (
    <g>
      <rect x="50" y="54" width="140" height="180" rx="8" className="body" />
      <rect x="72" y="80" width="96" height="42" rx="4" className="screen" />
      <path
        d="M82,108 l10,-12 l10,8 l12,-16 l12,10 l10,-6 l12,8"
        className="screen-line"
      />
      {[0, 1, 2, 3, 4].map((i) => (
        <line
          key={i}
          x1="72"
          x2="168"
          y1={146 + i * 12}
          y2={146 + i * 12}
          className="fin"
        />
      ))}
      <line x1="90" x2="90" y1="234" y2="262" className="cable" />
      <line x1="150" x2="150" y1="234" y2="262" className="cable" />
    </g>
  ),
  micro: (
    <g>
      <rect
        x="60"
        y="98"
        width="120"
        height="104"
        rx="8"
        className="body body-dark"
      />
      <rect
        x="80"
        y="122"
        width="80"
        height="56"
        rx="4"
        className="fin-plate"
      />
      <path
        d="M80,202 C80,240 40,236 40,262 M160,202 C160,240 200,236 200,262 M120,98 C120,60 150,58 150,24"
        className="cable"
      />
    </g>
  ),
  charger: (
    <g>
      <rect x="70" y="30" width="100" height="150" rx="14" className="body" />
      <circle cx="120" cy="82" r="14" className="led-ring" />
      <path
        d="M120,180 C120,240 40,230 52,190 C62,160 100,170 104,214 L104,248"
        className="cable cable-thick"
      />
      <rect
        x="94"
        y="244"
        width="20"
        height="26"
        rx="4"
        className="body body-dark"
      />
    </g>
  ),
  gateway: (
    <g>
      <rect x="44" y="64" width="152" height="170" rx="8" className="body" />
      <rect x="64" y="86" width="112" height="22" rx="3" className="screen" />
      {[0, 1, 2, 3].map((i) => (
        <circle
          key={i}
          cx={78 + i * 28}
          cy="150"
          r="5"
          className={i < 3 ? "led-dot" : "led-dot off"}
        />
      ))}
      <rect
        x="64"
        y="176"
        width="112"
        height="36"
        rx="3"
        className="fin-plate"
      />
      <line x1="120" x2="120" y1="234" y2="262" className="cable cable-thick" />
    </g>
  ),
};
