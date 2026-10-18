import { useState } from "react";
import { Link } from "../router";
import { courses, glosses, languages, type LangId } from "../content";
import { langStyle, PageHead } from "../components/Bits";
import { days, langOf, levelText, minutes } from "../lib/format";

const times = {
  all: { label: "Any time", fits: () => true },
  morning: {
    label: "Mornings",
    fits: (start: number, day: number) => day < 5 && start < 12 * 60,
  },
  lunch: {
    label: "Lunchtime",
    fits: (start: number) => start >= 12 * 60 && start < 14 * 60,
  },
  evening: { label: "Evenings", fits: (start: number) => start >= 17 * 60 },
  weekend: { label: "Saturdays", fits: (_: number, day: number) => day === 5 },
};

const sessions = courses
  .flatMap((course) => course.sessions.map((session) => ({ course, session })))
  .sort((a, b) => minutes(a.session.start) - minutes(b.session.start));

export function Timetable() {
  const [lang, setLang] = useState<LangId | "">("");
  const [time, setTime] = useState<keyof typeof times>("all");
  const shown = sessions.filter(
    ({ course, session }) =>
      (!lang || course.lang === lang) &&
      times[time].fits(minutes(session.start), session.day),
  );

  return (
    <div className="wrap page">
      <PageHead
        title="The week at Calder Street"
        lead="Every group session in the winter term, Monday to Saturday. The school is closed on Sundays; online groups meet from wherever you are."
        gloss={glosses.timetable}
      />

      <div className="filters">
        <div className="chips" role="group" aria-label="Language">
          <button
            type="button"
            aria-pressed={lang === ""}
            onClick={() => setLang("")}
          >
            All languages
          </button>
          {languages.map((l) => (
            <button
              key={l.id}
              type="button"
              aria-pressed={lang === l.id}
              onClick={() => setLang(l.id)}
              style={langStyle(l.color)}
            >
              {l.name}
            </button>
          ))}
        </div>
        <div className="chips" role="group" aria-label="Time of day">
          {Object.entries(times).map(([k, t]) => (
            <button
              key={k}
              type="button"
              aria-pressed={time === k}
              onClick={() => setTime(k as keyof typeof times)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <p className="result-count" aria-live="polite">
        {shown.length} {shown.length === 1 ? "session" : "sessions"} a week
      </p>

      <div className="week">
        {days.slice(0, 6).map((day, d) => {
          const today = shown.filter((s) => s.session.day === d);
          return (
            <section
              key={day}
              className="week-day"
              aria-labelledby={`day-${d}`}
            >
              <h2 id={`day-${d}`}>{day}</h2>
              {today.length ? (
                <ul>
                  {today.map(({ course, session }) => {
                    const l = langOf(course.lang);
                    return (
                      <li
                        key={course.id}
                        className="slot"
                        style={langStyle(l.color)}
                      >
                        <p className="slot-time num">
                          {session.start}–{session.end}
                        </p>
                        <Link to={`/courses/${course.id}`}>{course.title}</Link>
                        <p className="slot-meta">
                          <span className="lang-name">{l.name}</span>{" "}
                          {levelText(course)} · {course.room}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="slot-empty">Nothing that matches.</p>
              )}
            </section>
          );
        })}
      </div>

      <aside className="aside-note">
        <h2>Need a different time?</h2>
        <p>
          One-to-one lessons fit around you, in person or online, at any level.
          See <Link to="/fees">fees and terms</Link> or write to the office when
          you <Link to="/enrol">enrol</Link>.
        </p>
      </aside>
    </div>
  );
}
