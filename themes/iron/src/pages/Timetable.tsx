import { useState } from "react";
import { Link } from "../router";
import {
  categories,
  dayNames,
  slots,
  trainers,
  type CategoryId,
} from "../content";
import {
  byTime,
  classById,
  clock,
  toMinutes,
  trainerById,
  weekday,
} from "../lib";
import { Disc } from "../components/Marks";

const times = [
  { id: "all", label: "Any time" },
  { id: "early", label: "Before 9am", test: (m: number) => m < 540 },
  {
    id: "midday",
    label: "9am – 5pm",
    test: (m: number) => m >= 540 && m < 1020,
  },
  { id: "evening", label: "5pm onwards", test: (m: number) => m >= 1020 },
];

export function Timetable() {
  const today = weekday();
  const [day, setDay] = useState(today);
  const [families, setFamilies] = useState<CategoryId[]>([]);
  const [coach, setCoach] = useState("all");
  const [time, setTime] = useState("all");

  const timeTest = times.find((t) => t.id === time)?.test;
  const shown = slots
    .filter((s) => {
      const c = classById(s.classId)!;
      return (
        (!families.length || families.includes(c.category)) &&
        (coach === "all" || s.trainerId === coach) &&
        (!timeTest || timeTest(toMinutes(s.time)))
      );
    })
    .sort(byTime);

  const toggle = (id: CategoryId) =>
    setFamilies((f) =>
      f.includes(id) ? f.filter((x) => x !== id) : [...f, id],
    );
  const reset = () => {
    setFamilies([]);
    setCoach("all");
    setTime("all");
  };
  const filtered = families.length > 0 || coach !== "all" || time !== "all";

  return (
    <>
      <header className="page-head wrap">
        <h1>Timetable</h1>
        <p className="lede">
          {slots.length} classes a week. Book in the app up to seven days ahead;
          Barbell Club and Olympic Lifting fill first.
        </p>
      </header>

      <section className="wrap tt" aria-label="Weekly timetable">
        <div className="tt-filters" role="group" aria-label="Filter classes">
          <fieldset className="chips">
            <legend>Class type</legend>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className="chip"
                aria-pressed={families.includes(cat.id)}
                onClick={() => toggle(cat.id)}
              >
                <Disc category={cat.id} />
                {cat.name}
              </button>
            ))}
          </fieldset>
          <div className="tt-selects">
            <label>
              <span>Coach</span>
              <select value={coach} onChange={(e) => setCoach(e.target.value)}>
                <option value="all">Any coach</option>
                {trainers.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>Time</span>
              <select value={time} onChange={(e) => setTime(e.target.value)}>
                {times.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
            </label>
            {filtered && (
              <button
                type="button"
                className="btn btn-ghost btn-small"
                onClick={reset}
              >
                Clear filters
              </button>
            )}
          </div>
          <p className="tt-count" aria-live="polite">
            Showing {shown.length} of {slots.length} classes
          </p>
        </div>

        <div className="tt-days" role="group" aria-label="Day">
          {dayNames.map((d, i) => (
            <button
              key={d}
              type="button"
              aria-pressed={day === i}
              onClick={() => setDay(i)}
            >
              <span>{d.slice(0, 3)}</span>
              <span className="tt-days-count">
                {shown.filter((s) => s.day === i).length}
              </span>
            </button>
          ))}
        </div>

        {shown.length === 0 ? (
          <div className="empty">
            <p>
              No classes match all of those. Try another coach or time of day.
            </p>
            <button type="button" className="btn btn-primary" onClick={reset}>
              Clear filters
            </button>
          </div>
        ) : (
          <div className="tt-grid">
            {dayNames.map((d, i) => {
              const items = shown.filter((s) => s.day === i);
              return (
                <section
                  key={d}
                  className="tt-col"
                  data-current={day === i ? "" : undefined}
                  data-today={today === i ? "" : undefined}
                  aria-labelledby={`day-${i}`}
                >
                  <h2 id={`day-${i}`}>
                    {d}
                    {today === i && <span className="tt-today">Today</span>}
                  </h2>
                  {items.length ? (
                    <ul>
                      {items.map((s) => {
                        const c = classById(s.classId)!;
                        return (
                          <li key={s.time + s.classId} className="tt-slot">
                            <span className="tt-time">{clock(s.time)}</span>
                            <span className="tt-name">
                              <Disc category={c.category} />
                              <Link to={`/classes/${c.id}`}>{c.name}</Link>
                            </span>
                            <span className="tt-meta">
                              {trainerById(s.trainerId)!.name} · {c.minutes} min
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className="tt-none">Nothing matching on {d}.</p>
                  )}
                </section>
              );
            })}
          </div>
        )}
      </section>

      <section className="wrap section tt-notes" aria-labelledby="tt-notes">
        <h2 id="tt-notes">Before you come</h2>
        <dl className="specs">
          <div>
            <dt>New here?</dt>
            <dd>
              Start with <Link to="/classes/foundations">Foundations</Link> — it
              unlocks every class above.
            </dd>
          </div>
          <div>
            <dt>Late cancellations</dt>
            <dd>
              Cancel up to two hours before. After that the spot is charged as a
              class from your pack, or $10 on unlimited plans.
            </dd>
          </div>
          <div>
            <dt>Open gym</dt>
            <dd>
              The racks not used by classes are open to members during all
              staffed hours.
            </dd>
          </div>
          <div>
            <dt>Holidays</dt>
            <dd>
              Public holidays run the Saturday timetable. We post changes on the
              Monday board.
            </dd>
          </div>
        </dl>
      </section>
    </>
  );
}
