import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { planner } from "../content";
import { priorityRank } from "../lib/format";
import { Burndown } from "./Burndown";
import { PriorityIcon } from "./issue";

const VELOCITY =
  planner.velocity.reduce((a, b) => a + b, 0) / planner.velocity.length;
const PERSON_DAYS = planner.team * planner.days;

/** The signature moment: commit backlog cards to a cycle and watch capacity and the burndown answer back. */
export function Planner() {
  const [picked, setPicked] = useState<string[]>(planner.preselected);
  const [daysOff, setDaysOff] = useState(3);

  const capacity = Math.round(VELOCITY * (1 - daysOff / PERSON_DAYS));
  const chosen = planner.backlog.filter((b) => picked.includes(b.key));
  const committed = chosen.reduce((s, b) => s + b.points, 0);
  const over = committed - capacity;

  // Lowest priority first, larger cards first within a priority: the cuts a lead would suggest.
  const cuts: typeof chosen = [];
  if (over > 0) {
    let left = over;
    for (const b of [...chosen].sort(
      (a, z) =>
        priorityRank(z.priority) - priorityRank(a.priority) ||
        z.points - a.points,
    )) {
      if (left <= 0) break;
      cuts.push(b);
      left -= b.points;
    }
  }

  const scale = Math.max(capacity, committed, 1) * 1.08;
  const toggle = (key: string) =>
    setPicked((p) =>
      p.includes(key) ? p.filter((k) => k !== key) : [...p, key],
    );

  return (
    <div className="planner">
      <fieldset className="planner-backlog">
        <legend>Backlog, ranked</legend>
        <ul>
          {planner.backlog.map((b) => (
            <li key={b.key}>
              <label
                className="pick"
                data-on={picked.includes(b.key) ? "" : undefined}
              >
                <input
                  type="checkbox"
                  checked={picked.includes(b.key)}
                  onChange={() => toggle(b.key)}
                />
                <span className="pick-key">{b.key}</span>
                <span className="pick-title">{b.title}</span>
                <PriorityIcon priority={b.priority} />
                <span className="pick-pts" aria-label={`${b.points} points`}>
                  {b.points}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </fieldset>

      <div className="planner-readout">
        <div className="planner-off">
          <span id="off-label">Person-days out this cycle</span>
          <div className="stepper" role="group" aria-labelledby="off-label">
            <button
              type="button"
              onClick={() => setDaysOff((d) => Math.max(0, d - 1))}
              disabled={daysOff === 0}
              aria-label="One fewer day out"
            >
              <Minus size={16} aria-hidden />
            </button>
            <output aria-live="polite">{daysOff}</output>
            <button
              type="button"
              onClick={() => setDaysOff((d) => Math.min(20, d + 1))}
              disabled={daysOff === 20}
              aria-label="One more day out"
            >
              <Plus size={16} aria-hidden />
            </button>
          </div>
        </div>

        <div className="meter" data-over={over > 0 ? "" : undefined}>
          <div className="meter-track" aria-hidden="true">
            <span
              className="meter-fill"
              style={{
                width: `${(Math.min(committed, capacity) / scale) * 100}%`,
              }}
            />
            {over > 0 && (
              <span
                className="meter-over"
                style={{
                  left: `${(capacity / scale) * 100}%`,
                  width: `${(over / scale) * 100}%`,
                }}
              />
            )}
            <span
              className="meter-cap"
              style={{ left: `${(capacity / scale) * 100}%` }}
            />
          </div>
          <dl className="meter-nums">
            <div>
              <dt>Committed</dt>
              <dd>{committed} pts</dd>
            </div>
            <div>
              <dt>Capacity</dt>
              <dd>{capacity} pts</dd>
            </div>
            <div>
              <dt>Velocity, last 3</dt>
              <dd>{planner.velocity.join(" · ")}</dd>
            </div>
          </dl>
        </div>

        <p className="verdict" aria-live="polite">
          {committed === 0
            ? "Nothing committed yet. Tick cards from the backlog to start the cycle."
            : over > 0
              ? `Over by ${over} points. Moving ${cuts.map((c) => c.key).join(" and ")} to the next cycle would make it fit.`
              : over === 0
                ? "Exactly at capacity. It fits, with no room for the bug that arrives on Wednesday."
                : `Fits, with ${-over} points of slack for whatever arrives mid-cycle.`}
        </p>

        <Burndown
          total={committed}
          days={planner.days}
          rate={capacity / planner.days}
          label={`Projected burndown: ${committed} points over ${planner.days} working days at ${capacity} points per cycle`}
        />
        <p className="planner-legend">
          <span className="lg lg-ideal" aria-hidden="true" /> Ideal
          <span className="lg lg-proj" aria-hidden="true" /> Projected at your
          velocity
        </p>
      </div>
    </div>
  );
}
