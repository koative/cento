import type { CSSProperties } from "react";
import { Link } from "../router";
import { rooms } from "../content";

const SPAN = 96; // months shown: birth to 8 years
const pct = (months: number) =>
  `${(Math.min(Math.max(months, 0), SPAN) / SPAN) * 100}%`;

/** Rooms laid out on a growth ruler from birth to eight, like the height chart on the hall wall. */
export function GrowthChart({
  age,
  caption,
}: {
  age?: number | null;
  caption?: string;
}) {
  const inRange = age != null && age >= 0;
  return (
    <figure
      className="growth"
      data-age={inRange ? "" : undefined}
      style={
        { "--m": inRange ? Math.min(age, SPAN) / SPAN : 0 } as CSSProperties
      }
    >
      <ol className="growth-rows">
        {rooms.map((r) => {
          const here = inRange && age >= r.minMonths && age < r.maxMonths;
          return (
            <li
              key={r.id}
              className="growth-row"
              data-here={here ? "" : undefined}
            >
              <Link to={`/rooms/${r.id}`} className="growth-label">
                <span
                  className="dot"
                  style={{ background: r.color }}
                  aria-hidden="true"
                />
                <span>{r.name}</span>
                <span className="growth-ages">{r.ages.split(" · ")[0]}</span>
              </Link>
              <span className="growth-track" aria-hidden="true">
                <span
                  className="growth-band"
                  style={{
                    left: pct(r.minMonths),
                    width: `calc(${pct(r.maxMonths)} - ${pct(r.minMonths)})`,
                    background: r.color,
                  }}
                />
              </span>
            </li>
          );
        })}
      </ol>
      <div className="growth-scale" aria-hidden="true">
        <span className="growth-scale-pad" />
        <span className="growth-ticks">
          {Array.from({ length: 9 }, (_, y) => (
            <span key={y} style={{ left: pct(y * 12) }}>
              {y === 0 ? "birth" : `${y}y`}
            </span>
          ))}
        </span>
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
