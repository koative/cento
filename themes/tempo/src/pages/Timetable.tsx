import { useState } from "react";
import {
  classes,
  levels,
  studios,
  styles,
  weekdays,
  type Level,
  type StyleSlug,
} from "../content";
import { overlaps, queryParam, todayIndex } from "../lib/util";
import { useWeek } from "../lib/week";
import { ClassItem } from "../components/ClassItem";
import { WeekPanel } from "../components/WeekPanel";
import { PageHead } from "../components/Lists";

export function Timetable() {
  const week = useWeek();
  const initialStyle = styles.some((s) => s.slug === queryParam("style"))
    ? (queryParam("style") as StyleSlug)
    : "all";
  const [style, setStyle] = useState<StyleSlug | "all">(initialStyle);
  const [level, setLevel] = useState<Level | "all">("all");
  const [day, setDay] = useState(todayIndex());

  const shown = classes
    .filter(
      (c) =>
        (style === "all" || c.style === style) &&
        (level === "all" || c.level === level),
    )
    .sort((a, b) => a.start.localeCompare(b.start));
  const picked = classes.filter((c) => week.includes(c.id));
  const clashOf = (id: string) => {
    const c = classes.find((x) => x.id === id)!;
    return picked.find((p) => p.id !== id && overlaps(p, c))?.title;
  };

  return (
    <>
      <PageHead
        title="This week on the floor."
        intro={`${classes.length} classes across three studios, Monday to Sunday. Add the ones you like to My week and we'll price it up — the board remembers your picks on this device.`}
      />

      <div className="wrap tt-filters">
        <fieldset className="chips">
          <legend>Style</legend>
          {[{ slug: "all" as const, name: "All styles" }, ...styles].map(
            (s) => (
              <label key={s.slug} className="chip">
                <input
                  type="radio"
                  name="style"
                  value={s.slug}
                  checked={style === s.slug}
                  onChange={() => setStyle(s.slug)}
                />
                <span>{s.name}</span>
              </label>
            ),
          )}
        </fieldset>
        <div className="select-field">
          <label htmlFor="tt-level">Level</label>
          <select
            id="tt-level"
            value={level}
            onChange={(e) => setLevel(e.target.value as Level | "all")}
          >
            <option value="all">Every level</option>
            {levels.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>
        <p className="tt-count" aria-live="polite">
          Showing {shown.length} of {classes.length} classes
        </p>
      </div>

      <div className="wrap tt-layout">
        <div className="tt-board-wrap">
          <div className="day-tabs" role="group" aria-label="Day">
            {weekdays.map((d, i) => (
              <button
                key={d}
                type="button"
                aria-pressed={day === i}
                onClick={() => setDay(i)}
              >
                {d.slice(0, 3)}
              </button>
            ))}
          </div>
          <div className="tt-board">
            {weekdays.map((d, i) => {
              const items = shown.filter((c) => c.day === i);
              return (
                <section
                  key={d}
                  className="tt-day"
                  data-active={day === i ? "" : undefined}
                  aria-labelledby={`day-${i}`}
                >
                  <h2 id={`day-${i}`}>
                    {d}
                    {i === todayIndex() && (
                      <span className="today-tag">Today</span>
                    )}
                  </h2>
                  {items.length ? (
                    items.map((c) => (
                      <ClassItem
                        key={c.id}
                        c={c}
                        picked={week.includes(c.id)}
                        clash={week.includes(c.id) ? clashOf(c.id) : undefined}
                      />
                    ))
                  ) : (
                    <p className="tt-empty">Nothing matching on {d}.</p>
                  )}
                </section>
              );
            })}
          </div>
          <ul className="studio-key">
            {Object.entries(studios).map(([id, text]) => (
              <li key={id}>{text}</li>
            ))}
          </ul>
        </div>
        <WeekPanel />
      </div>
    </>
  );
}
