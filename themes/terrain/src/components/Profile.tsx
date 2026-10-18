import { useId } from "react";
import type { Day } from "../content";
import { num } from "../lib/trips";

const W = 1000;

/** Elevation profile of a whole trip; each day's samples are spread across that day's distance. */
export function Profile({
  days,
  active = null,
  compact = false,
  onSelect,
}: {
  days: Day[];
  active?: number | null;
  compact?: boolean;
  onSelect?: (i: number) => void;
}) {
  const clip = useId();
  const H = compact ? 120 : 220;
  const total = days.reduce((s, d) => s + d.km, 0);
  const alts = days.flatMap((d) => d.profile);
  const lo = Math.max(0, Math.floor(Math.min(...alts) / 250) * 250);
  const hi = Math.ceil(Math.max(...alts) / 250) * 250 + 100;
  const x = (km: number) => (km / total) * W;
  const y = (alt: number) => H - 6 - ((alt - lo) / (hi - lo)) * (H - 12);

  const starts: number[] = [];
  const pts: string[] = [];
  days.reduce((cum, d) => {
    starts.push(cum);
    d.profile.forEach((a, j) =>
      pts.push(
        `${x(cum + (d.km * j) / (d.profile.length - 1)).toFixed(1)},${y(a).toFixed(1)}`,
      ),
    );
    return cum + d.km;
  }, 0);
  const line = "M" + pts.join(" L");
  const area = `${line} L${W},${H} L0,${H} Z`;
  const peak = Math.max(...alts);

  return (
    <figure className="profile" data-compact={compact ? "" : undefined}>
      <div className="profile-plot">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <clipPath id={clip}>
              {active !== null && (
                <rect
                  x={x(starts[active])}
                  width={x(days[active].km)}
                  y="0"
                  height={H}
                />
              )}
            </clipPath>
          </defs>
          {[0.25, 0.5, 0.75].map((f) => (
            <line
              key={f}
              className="profile-grid"
              x1="0"
              x2={W}
              y1={H * f}
              y2={H * f}
              vectorEffect="non-scaling-stroke"
            />
          ))}
          <path className="profile-area" d={area} />
          <path
            className="profile-line"
            d={line}
            vectorEffect="non-scaling-stroke"
          />
          {active !== null && (
            <g clipPath={`url(#${clip})`}>
              <path className="profile-area is-active" d={area} />
              <path
                className="profile-line is-active"
                d={line}
                vectorEffect="non-scaling-stroke"
              />
            </g>
          )}
          {starts.slice(1).map((s) => (
            <line
              key={s}
              className="profile-day"
              x1={x(s)}
              x2={x(s)}
              y1="0"
              y2={H}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>
        {!compact && (
          <div className="profile-days">
            {days.map((d, i) => (
              <div
                key={i}
                className="profile-hit"
                data-active={active === i ? "" : undefined}
                style={{
                  left: `${(starts[i] / total) * 100}%`,
                  width: `${(d.km / total) * 100}%`,
                }}
                onClick={onSelect && (() => onSelect(i))}
              >
                <span>{i + 1}</span>
              </div>
            ))}
          </div>
        )}
        <span className="profile-alt profile-alt-hi">{num(hi)} m</span>
        <span className="profile-alt profile-alt-lo">{num(lo)} m</span>
      </div>
      <figcaption className={compact ? "sr-only" : "profile-caption"}>
        <span>0 km</span>
        <span>
          Elevation profile • highest point {num(peak)} m • {Math.round(total)}{" "}
          km in {days.length} days
        </span>
        <span>{Math.round(total)} km</span>
      </figcaption>
    </figure>
  );
}
