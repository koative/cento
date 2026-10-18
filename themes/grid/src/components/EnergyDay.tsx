import { useId, useState } from "react";
import {
  BatteryCharging,
  House,
  Sun,
  UtilityPole,
  type LucideIcon,
} from "lucide-react";
import { clock, kw, type Hour } from "../lib/energy";

type Props = { hours: Hour[]; capacity: number; start?: number };

/** One average day: drag the hour, watch power move between roof, home, battery and the grid. */
export function EnergyDay({ hours, capacity, start = 14 }: Props) {
  const [hour, setHour] = useState(start);
  const id = useId();
  const h = hours[hour];
  const peak = Math.max(...hours.map((x) => Math.max(x.gen, x.use)), 0.5);

  // Chart geometry: 24 columns 20 units wide; values plotted into the band y 20–160.
  const X = (i: number) => i * 20 + 10;
  const path = (k: keyof Hour, top: number) =>
    hours.map((x, i) => `L${X(i)},${160 - (x[k] / top) * 140}`).join("");
  const area = (k: keyof Hour) => `M${X(0)},160${path(k, peak)}L${X(23)},160Z`;

  // Orthogonal wiring, as on a single-line diagram.
  const flows = [
    { k: "direct", d: "M180,106 V234", v: h.direct },
    { k: "charge", d: "M154,80 H60 V144", v: h.charge },
    { k: "export", d: "M206,80 H300 V144", v: h.exported },
    { k: "discharge", d: "M60,196 V260 H154", v: h.discharge },
    { k: "import", d: "M300,196 V260 H206", v: h.imported },
  ];

  // The sun rides an arc from 06:00 to 20:00.
  const t = (hour + 0.5 - 6) / 14;
  const sunUp = t > 0 && t < 1 && h.gen > 0.01;

  const sentence = [
    h.gen > 0.05 ? `the roof is making ${kw(h.gen)}` : "the roof is dark",
    `the home is using ${kw(h.use)}`,
    h.charge > 0.05 && `${kw(h.charge)} is charging the battery`,
    h.discharge > 0.05 && `the battery is supplying ${kw(h.discharge)}`,
    h.exported > 0.05 && `${kw(h.exported)} is exported`,
    h.imported > 0.05 && `${kw(h.imported)} is bought from the grid`,
  ].filter(Boolean);

  return (
    <div className="energy-day">
      <figure className="flow">
        <svg viewBox="0 0 360 320" role="img" aria-labelledby={`${id}-flow`}>
          <title id={`${id}-flow`}>{`Energy flow at ${clock(hour)}`}</title>
          <path d="M30,44 Q180,-8 330,44" className="sun-arc" />
          {sunUp && (
            <circle
              cx={30 + t * 300}
              cy={44 - Math.sin(t * Math.PI) * 26}
              r="8"
              className="sun-dot"
            />
          )}
          {flows.map((f) => (
            <path
              key={f.k}
              d={f.d}
              className="wire"
              data-on={f.v > 0.05 ? "" : undefined}
              data-kind={f.k}
              style={{ strokeWidth: 2 + Math.min(f.v, 8) * 0.9 }}
            />
          ))}
          <Node
            x={180}
            y={80}
            side="top"
            label="Roof"
            value={kw(h.gen)}
            Icon={Sun}
            on={h.gen > 0.05}
          />
          <Node
            x={60}
            y={170}
            side="right"
            label="Battery"
            value={
              capacity ? `${Math.round((h.soc / capacity) * 100)}%` : "None"
            }
            Icon={BatteryCharging}
            on={capacity > 0}
          />
          <Node
            x={300}
            y={170}
            side="left"
            label="Grid"
            value={h.exported > 0.05 ? `−${kw(h.exported)}` : kw(h.imported)}
            Icon={UtilityPole}
            on
          />
          <Node
            x={180}
            y={260}
            side="bottom"
            label="Home"
            value={kw(h.use)}
            Icon={House}
            on
          />
        </svg>
        <figcaption>
          <strong className="num">{clock(hour)}</strong> {sentence.join(", ")}.
        </figcaption>
      </figure>

      <div className="day-chart">
        <svg viewBox="0 0 480 186" role="img" aria-labelledby={`${id}-chart`}>
          <title id={`${id}-chart`}>
            Solar production and home use across an average day
          </title>
          {[0, 6, 12, 18].map((m) => (
            <g key={m}>
              <line x1={m * 20} x2={m * 20} y1="14" y2="160" className="tick" />
              <text x={m * 20 + 4} y="178" className="axis">
                {clock(m)}
              </text>
            </g>
          ))}
          <path d={area("gen")} className="area-gen" />
          <path d={area("direct")} className="area-direct" />
          <path d={"M" + path("use", peak).slice(1)} className="line-use" />
          {capacity > 0 && (
            <path
              d={"M" + path("soc", capacity * 1.02).slice(1)}
              className="line-soc"
            />
          )}
          <rect
            x={hour * 20}
            y="14"
            width="20"
            height="146"
            className="cursor"
          />
          <line x1="0" x2="480" y1="160" y2="160" className="baseline" />
        </svg>
        <ul className="legend">
          <li data-k="gen">Solar produced</li>
          <li data-k="direct">Used straight away</li>
          <li data-k="use">Home demand</li>
          {capacity > 0 && <li data-k="soc">Battery charge</li>}
        </ul>
        <label className="range-field day-range">
          <span>
            Time of day <output className="num">{clock(hour)}</output>
          </span>
          <input
            type="range"
            min={0}
            max={23}
            value={hour}
            aria-valuetext={clock(hour)}
            onChange={(e) => setHour(+e.target.value)}
          />
        </label>
      </div>
    </div>
  );
}

type Side = "top" | "right" | "bottom" | "left";
const labelAt: Record<
  Side,
  { x: number; y: number; anchor: "start" | "middle" | "end" }
> = {
  top: { x: 0, y: -46, anchor: "middle" },
  bottom: { x: 0, y: 42, anchor: "middle" },
  right: { x: 34, y: -4, anchor: "start" },
  left: { x: -34, y: -4, anchor: "end" },
};

function Node(p: {
  x: number;
  y: number;
  side: Side;
  label: string;
  value: string;
  Icon: LucideIcon;
  on: boolean;
}) {
  const l = labelAt[p.side];
  return (
    <g
      className="node"
      data-on={p.on ? "" : undefined}
      transform={`translate(${p.x} ${p.y})`}
    >
      <circle r="24" />
      <p.Icon x={-11} y={-11} size={22} className="node-icon" aria-hidden />
      <text x={l.x} y={l.y} textAnchor={l.anchor} className="node-label">
        {p.label}
        <tspan x={l.x} dy="17" className="node-value">
          {p.value}
        </tspan>
      </text>
    </g>
  );
}
