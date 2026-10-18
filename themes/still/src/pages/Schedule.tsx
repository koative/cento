import { useState } from "react";
import { focuses, teachers, type Focus } from "../content";
import { SessionRow } from "../components/SessionRow";
import { classOf, sessionsOn, upcomingDays, type Slot } from "../lib/week";

const times = [
  { id: "any", label: "Any time" },
  { id: "morning", label: "Morning, before 12:00" },
  { id: "midday", label: "Midday, 12:00 – 17:00" },
  { id: "evening", label: "Evening, after 17:00" },
];

export function Schedule() {
  const days = upcomingDays();
  const [dayIdx, setDayIdx] = useState(0);
  const [focus, setFocus] = useState<Focus | "All">("All");
  const [teacher, setTeacher] = useState("any");
  const [time, setTime] = useState("any");
  const [hideFull, setHideFull] = useState(false);

  const keep = (s: Slot) => {
    const h = Number(s.session.time.slice(0, 2));
    return (
      (focus === "All" || classOf(s.session).focus === focus) &&
      (teacher === "any" || s.session.teacher === teacher) &&
      (time === "any" ||
        (time === "morning"
          ? h < 12
          : time === "midday"
            ? h >= 12 && h < 17
            : h >= 17)) &&
      (!hideFull || (s.left > 0 && !s.started))
    );
  };
  const perDay = days.map((d) => sessionsOn(d).filter(keep));
  const list = perDay[dayIdx];
  const filtered =
    focus !== "All" || teacher !== "any" || time !== "any" || hideFull;
  const clear = () => {
    setFocus("All");
    setTeacher("any");
    setTime("any");
    setHideFull(false);
  };

  return (
    <>
      <header className="page-head wrap">
        <h1>This week at Still</h1>
        <p className="lead">
          Every class for the next seven days, starting today. Book up to a week
          ahead, or two weeks with Unlimited. The doors close when class begins.
        </p>
      </header>

      <section className="wrap schedule" aria-label="Timetable">
        <div className="filters">
          <fieldset className="chips">
            <legend>Kind of class</legend>
            {(["All", ...focuses.map((f) => f.id)] as const).map((f) => (
              <button
                key={f}
                type="button"
                className="chip"
                aria-pressed={focus === f}
                onClick={() => setFocus(f)}
              >
                {f}
              </button>
            ))}
          </fieldset>
          <div className="filter-selects">
            <label>
              Teacher
              <select
                value={teacher}
                onChange={(e) => setTeacher(e.target.value)}
              >
                <option value="any">Any teacher</option>
                {teachers.map((t) => (
                  <option key={t.slug} value={t.slug}>
                    {t.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Time of day
              <select value={time} onChange={(e) => setTime(e.target.value)}>
                {times.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="check">
              <input
                type="checkbox"
                checked={hideFull}
                onChange={(e) => setHideFull(e.target.checked)}
              />
              Only classes I can book
            </label>
          </div>
        </div>

        <div className="daystrip" role="group" aria-label="Day">
          {days.map((d, i) => (
            <button
              key={d.iso}
              type="button"
              aria-pressed={i === dayIdx}
              onClick={() => setDayIdx(i)}
            >
              <span className="daystrip-label">
                <span className="full">{d.label}</span>
                <span className="abbr" aria-hidden="true">
                  {d.short}
                </span>
              </span>
              <span className="daystrip-date">{d.date.getDate()}</span>
              <span className="daystrip-count">
                {perDay[i].length}{" "}
                {perDay[i].length === 1 ? "class" : "classes"}
              </span>
            </button>
          ))}
        </div>

        <div className="schedule-day">
          <h2 aria-live="polite">
            {days[dayIdx].long}
            <span>
              {list.length} {list.length === 1 ? "class" : "classes"}
              {filtered && " match your filters"}
            </span>
          </h2>
          {list.length ? (
            <ul className="sessions">
              {list.map((s) => (
                <SessionRow key={s.session.id} slot={s} />
              ))}
            </ul>
          ) : (
            <div className="empty">
              <p>
                Nothing on{" "}
                {days[dayIdx].label === "Today" ||
                days[dayIdx].label === "Tomorrow"
                  ? days[dayIdx].label.toLowerCase()
                  : days[dayIdx].short}{" "}
                matches those filters.
              </p>
              <button type="button" className="btn btn-ghost" onClick={clear}>
                Clear filters
              </button>
            </div>
          )}
          <p className="fine">
            Places shown are demonstration data and change from day to day.
          </p>
        </div>
      </section>
    </>
  );
}
