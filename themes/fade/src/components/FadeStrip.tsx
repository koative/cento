import type { Chart } from "../content";
import { BANDS, bands, density, describe, zoneNames } from "../lib/fade";

const BAND = 30;
const H = BANDS * BAND;
const BAR_X = 214;
/** px per √mm, so 100 mm spans 190 px and a #0.5 is still visible. */
const K = 19;
const ticks = [0, 3, 10, 25, 50, 100];

const tone = (mm: number) => ({
  fill: `color-mix(in oklab, var(--hair) ${Math.round(density(mm) * 100)}%, var(--skin))`,
});

/** The cut drawn from neckline (bottom) to crown (top): a tone strip plus a length ruler. */
export function FadeStrip({
  chart,
  compact = false,
}: {
  chart: Chart;
  compact?: boolean;
}) {
  const rows = bands(chart);

  if (compact) {
    return (
      <svg
        className="fade-strip compact"
        viewBox={`0 0 60 ${H}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {rows.map((r, i) => (
          <rect
            key={i}
            x="0"
            y={H - (i + 1) * BAND}
            width="60"
            height={BAND + 0.5}
            style={{ ...tone(r.mm), transitionDelay: `${i * 30}ms` }}
          />
        ))}
      </svg>
    );
  }

  return (
    <svg
      className="fade-strip"
      viewBox={`0 0 420 ${H + 40}`}
      role="img"
      aria-label={`Fade chart: ${describe(chart)}`}
    >
      {rows.map((r, i) => {
        const y = H - (i + 1) * BAND;
        const w = Math.max(2, K * Math.sqrt(r.mm));
        const inside = w > 130;
        return (
          <g key={i}>
            <rect
              x="0"
              y={y}
              width="88"
              height={BAND + 0.5}
              style={{ ...tone(r.mm), transitionDelay: `${i * 35}ms` }}
              className="band"
            />
            {zoneNames[i] && (
              <text x="100" y={y + BAND / 2 + 4} className="zone">
                {zoneNames[i]}
              </text>
            )}
            <rect
              x={BAR_X}
              y={y + 7}
              height={BAND - 14}
              className="bar"
              style={{ width: w, transitionDelay: `${i * 35}ms` }}
            />
            <text
              x={inside ? BAR_X + w - 6 : BAR_X + w + 6}
              y={y + BAND / 2 + 4}
              className={inside ? "len len-in" : "len"}
            >
              {r.mm === 0 ? "Skin" : r.label}
            </text>
          </g>
        );
      })}
      <line
        x1="0"
        x2="420"
        y1={H - 8 * BAND}
        y2={H - 8 * BAND}
        className="split"
      />
      <line
        x1={BAR_X}
        x2={BAR_X + K * 10}
        y1={H + 10}
        y2={H + 10}
        className="axis"
      />
      {ticks.map((t) => (
        <g key={t}>
          <line
            x1={BAR_X + K * Math.sqrt(t)}
            x2={BAR_X + K * Math.sqrt(t)}
            y1={H + 6}
            y2={H + 14}
            className="axis"
          />
          <text
            x={BAR_X + K * Math.sqrt(t)}
            y={H + 30}
            className={t === 100 ? "tick tick-end" : "tick"}
          >
            {t === 100 ? "100 mm" : t}
          </text>
        </g>
      ))}
    </svg>
  );
}
