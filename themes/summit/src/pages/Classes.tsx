import { useState } from "react";
import { classes, days, levels, type ClassKind, type Level } from "../content";
import { Link } from "../router";
import { money, shortDate } from "../lib/format";
import { upcomingSessions } from "../lib/schedule";

const kinds: ClassKind[] = ["One-off", "Course", "Drop-in"];
const week = [1, 2, 3, 4, 5, 6, 0];

export function Classes() {
  const [level, setLevel] = useState<Level | "">("");
  const [kind, setKind] = useState<ClassKind | "">("");
  const shown = classes.filter(
    (c) => (!level || c.level === level) && (!kind || c.kind === kind),
  );

  return (
    <>
      <section className="page-head wrap">
        <h1>Classes & courses</h1>
        <p className="lead">
          From your first ninety minutes on the wall to your lead card, plus
          weekly drop-ins on technique and strength. Small groups, coaches who
          set the problems you'll be climbing.
        </p>
      </section>

      <section className="wrap timetable-wrap" aria-labelledby="tt-title">
        <h2 id="tt-title" className="h-sm">
          Weekly timetable
        </h2>
        <div className="timetable" role="list">
          {week.map((d) => {
            const slots = classes
              .flatMap((c) =>
                c.schedule
                  .filter((s) => s.day === d)
                  .map((s) => ({ c, time: s.time })),
              )
              .sort((a, b) => a.time.localeCompare(b.time));
            return (
              <div key={d} className="tt-day" role="listitem">
                <h3>{days[d].slice(0, 3)}</h3>
                <ul>
                  {slots.map(({ c, time }) => (
                    <li
                      key={c.id + time}
                      data-dim={shown.includes(c) ? undefined : ""}
                    >
                      <span className="num">{time}</span>
                      <Link to={`/classes/${c.id}`}>{c.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <section className="wrap" aria-labelledby="list-title">
        <div className="list-toolbar">
          <h2 id="list-title" className="h-sm">
            {shown.length} {shown.length === 1 ? "class" : "classes"}
          </h2>
          <div className="seg" role="group" aria-label="Level">
            <button
              type="button"
              aria-pressed={!level}
              onClick={() => setLevel("")}
            >
              All levels
            </button>
            {levels
              .filter((l) => l !== "All levels")
              .map((l) => (
                <button
                  key={l}
                  type="button"
                  aria-pressed={level === l}
                  onClick={() => setLevel(l)}
                >
                  {l}
                </button>
              ))}
          </div>
          <label className="select-label">
            Format
            <select
              value={kind}
              onChange={(e) => setKind(e.target.value as ClassKind | "")}
            >
              <option value="">Any format</option>
              {kinds.map((k) => (
                <option key={k}>{k}</option>
              ))}
            </select>
          </label>
        </div>
        <p className="sr-only" aria-live="polite">
          {shown.length} classes shown
        </p>
        {shown.length ? (
          <ul className="class-grid">
            {shown.map((c) => {
              const next = upcomingSessions(14, c)[0];
              return (
                <li key={c.id}>
                  <Link to={`/classes/${c.id}`} className="class-card">
                    <img
                      src={c.image}
                      alt=""
                      width={640}
                      height={480}
                      loading="lazy"
                    />
                    <span className="cc-meta">
                      {c.kind} · {c.level} · {c.duration}
                    </span>
                    <span className="cc-name">{c.name}</span>
                    <span className="cc-summary">{c.summary}</span>
                    <span className="cc-foot">
                      <span className="num">{money(c.price)}</span>
                      {next && (
                        <span>
                          Next: {shortDate(next.date)}, {next.time}
                        </span>
                      )}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="empty-state">
            <p>
              No {kind.toLowerCase()} classes for {level.toLowerCase()} climbers
              right now.
            </p>
            <button
              type="button"
              className="btn btn-line"
              onClick={() => {
                setLevel("");
                setKind("");
              }}
            >
              Show all classes
            </button>
          </div>
        )}
      </section>

      <section className="wrap note-band">
        <h2 className="h-sm">Private coaching</h2>
        <p>
          One-to-one or small-group sessions with any of our coaches, $70 an
          hour. Ask at the desk or <Link to="/visit">come and see us</Link>.
          Members get up to 15% off every class on the timetable.
        </p>
      </section>
    </>
  );
}
