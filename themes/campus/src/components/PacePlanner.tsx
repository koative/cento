import { useId, useMemo, useState, type CSSProperties } from "react";
import type { Course } from "../content";
import {
  duration,
  fromInput,
  longDate,
  nextMonday,
  planCourse,
  shortDate,
  weekdays,
} from "../lib/plan";

/** Signature interaction: turn the evenings you have into a dated, week-by-week study plan. */
export function PacePlanner({ course }: { course: Course }) {
  const id = useId();
  const [hours, setHours] = useState(course.pace);
  const [days, setDays] = useState([0, 2, 5]);
  const [start, setStart] = useState(nextMonday);

  const plan = useMemo(
    () =>
      days.length && start
        ? planCourse(course, hours, days, fromInput(start))
        : null,
    [course, hours, days, start],
  );

  const toggle = (d: number) =>
    setDays((cur) =>
      cur.includes(d)
        ? cur.filter((x) => x !== d)
        : [...cur, d].sort((a, b) => a - b),
    );

  const cols = plan ? Math.max(plan.weeks, 1) : 1;

  return (
    <div className="planner">
      <div className="planner-controls">
        <div className="planner-field">
          <label htmlFor={`${id}-hours`}>
            Hours a week{" "}
            <output htmlFor={`${id}-hours`} className="num">
              {hours}
            </output>
          </label>
          <input
            id={`${id}-hours`}
            type="range"
            min={1}
            max={8}
            step={0.5}
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
          />
          <p className="field-hint">
            Suggested for this course: {course.pace} h
          </p>
        </div>

        <fieldset className="planner-field">
          <legend>Study days</legend>
          <div className="day-toggles">
            {weekdays.map((d, i) => (
              <button
                key={d}
                type="button"
                aria-pressed={days.includes(i)}
                onClick={() => toggle(i)}
              >
                {d}
              </button>
            ))}
          </div>
          {!days.length && (
            <p className="field-error">Pick at least one day you can study.</p>
          )}
        </fieldset>

        <div className="planner-field">
          <label htmlFor={`${id}-start`}>Start on</label>
          <input
            id={`${id}-start`}
            type="date"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
          {!start && (
            <p className="field-error">
              Choose a start date to see your finish date.
            </p>
          )}
        </div>
      </div>

      <div className="planner-result" aria-live="polite">
        {plan ? (
          <>
            <p className="planner-finish">
              You would finish on{" "}
              <mark className="hl">{longDate(plan.finish)}</mark>
            </p>
            <p className="planner-sub">
              {plan.weeks} {plan.weeks === 1 ? "week" : "weeks"} ·{" "}
              {plan.sessions.length} study sessions of about{" "}
              {duration((hours * 60) / days.length)}
            </p>
          </>
        ) : (
          <p className="planner-sub">
            Your plan appears here once you pick days and a start date.
          </p>
        )}
      </div>

      {plan && (
        <figure className="planner-chart">
          <figcaption className="sr-only">
            Modules across the weeks of your plan
          </figcaption>
          <div className="gantt" style={{ "--weeks": cols } as CSSProperties}>
            <div className="gantt-row gantt-head" aria-hidden="true">
              <span />
              <span className="gantt-track">
                {Array.from({ length: cols }, (_, w) => (
                  <span key={w} className="num">
                    {cols > 12 && w % 2 ? "" : `W${w + 1}`}
                  </span>
                ))}
              </span>
            </div>
            {plan.modules.map((m, i) => (
              <div className="gantt-row" key={m.title}>
                <span className="gantt-label">{m.title}</span>
                <span className="gantt-track">
                  <span
                    className={i % 2 ? "gantt-bar alt" : "gantt-bar"}
                    style={{ gridColumn: `${m.from + 1} / ${m.to + 2}` }}
                  />
                </span>
                <span className="sr-only">
                  {m.from === m.to
                    ? `week ${m.from + 1}`
                    : `weeks ${m.from + 1} to ${m.to + 1}`}
                </span>
              </div>
            ))}
          </div>
        </figure>
      )}

      {plan && (
        <div className="planner-sessions">
          <h3>Your first sessions</h3>
          <ul>
            {plan.sessions.slice(0, Math.max(days.length, 2)).map((s) => (
              <li key={s.date.toISOString()}>
                <span className="num">{shortDate(s.date)}</span>
                <span>{s.lessons.map((l) => l.title).join(" · ")}</span>
                <span className="num muted">{duration(s.minutes)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
