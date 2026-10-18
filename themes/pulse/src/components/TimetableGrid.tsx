import type { CSSProperties } from "react";
import { Check, Plus, TriangleAlert } from "lucide-react";
import { days, stages, type DayId } from "../content";
import {
  clashesWith,
  clock,
  dayWindow,
  setsOn,
  span,
  togglePick,
  usePlan,
} from "../lib/schedule";

/** Clash-finder grid for one day: stages down the side, hours across, every set a toggle. */
export function TimetableGrid({ day }: { day: DayId }) {
  const slugs = usePlan();
  const { from, to } = dayWindow(day);
  const sets = setsOn(day);
  const hours = Array.from(
    { length: (to - from) / 60 + 1 },
    (_, i) => from + i * 60,
  );
  const pos = (min: number) => `${((min - from) / (to - from)) * 100}%`;
  const dayName = days.find((d) => d.id === day)!.long;

  return (
    <div
      className="tt-scroll"
      role="region"
      aria-label={`${dayName} timetable — scroll sideways for later sets`}
      tabIndex={0}
    >
      <div
        className="tt-grid"
        style={{ "--hours": hours.length - 1 } as CSSProperties}
      >
        <div className="tt-axis" aria-hidden="true">
          {hours.map((h) => (
            <span key={h} style={{ left: pos(h) }}>
              {clock(h)}
            </span>
          ))}
        </div>
        {stages
          .filter((s) => sets.some((a) => a.stage === s.id))
          .map((stage) => (
            <div className="tt-row" key={stage.id} data-stage={stage.id}>
              <div className="tt-stage">
                <strong>{stage.name}</strong>
                <span>{stage.hours[day]}</span>
              </div>
              <ul className="tt-lane" aria-label={`${stage.name} sets`}>
                {hours.slice(1, -1).map((h) => (
                  <li
                    key={h}
                    className="tt-tick"
                    style={{ left: pos(h) }}
                    aria-hidden="true"
                  />
                ))}
                {sets
                  .filter((a) => a.stage === stage.id)
                  .map((a) => {
                    const [s, e] = span(a);
                    const on = slugs.includes(a.slug);
                    const clashes = on ? clashesWith(a, slugs) : [];
                    return (
                      <li
                        key={a.slug}
                        className="tt-slot"
                        style={{
                          left: pos(s),
                          width: `calc(${pos(e)} - ${pos(s)})`,
                        }}
                      >
                        <button
                          type="button"
                          className="tt-set"
                          aria-pressed={on}
                          data-clash={clashes.length ? "" : undefined}
                          onClick={() => togglePick(a.slug)}
                        >
                          <span className="tt-time">
                            {a.start}–{a.end}
                          </span>
                          <strong>{a.name}</strong>
                          <span className="tt-state" aria-hidden="true">
                            {clashes.length ? (
                              <TriangleAlert />
                            ) : on ? (
                              <Check />
                            ) : (
                              <Plus />
                            )}
                          </span>
                          <span className="sr-only">
                            , {stage.name}
                            {clashes.length
                              ? `, clashes with ${clashes.map((c) => c.name).join(" and ")}`
                              : ""}
                          </span>
                        </button>
                      </li>
                    );
                  })}
              </ul>
            </div>
          ))}
      </div>
    </div>
  );
}
