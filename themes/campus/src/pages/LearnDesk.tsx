import { ArrowRight, CalendarClock, RotateCcw } from "lucide-react";
import { Link } from "../router";
import { courses, workspace } from "../content";
import { progress, useProgress } from "../lib/progress";
import { duration } from "../lib/plan";

const course = courses.find((c) => c.slug === workspace.courseSlug)!;

function greeting() {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
}

export default function LearnDesk() {
  const state = useProgress();
  const lessons = workspace.lessons;
  const finished = lessons.filter((l) => state.done.includes(l.id)).length;
  const resume =
    lessons.find((l) => l.id === state.last && !state.done.includes(l.id)) ??
    lessons.find((l) => !state.done.includes(l.id));
  const notes = lessons.filter((l) => state.notes[l.id]);
  const studied = workspace.week.reduce((s, d) => s + d.minutes, 0);
  const peak = Math.max(
    ...workspace.week.map((d) => d.minutes),
    workspace.weeklyGoal / 3,
  );

  return (
    <div className="desk">
      <header className="desk-head">
        <h1>
          {greeting()}, {workspace.learner.split(" ")[0]}.
        </h1>
        <p className="muted">
          {resume
            ? `You're ${finished} of ${lessons.length} lessons into ${course.title}.`
            : `You've finished every lesson in ${course.title}.`}
        </p>
      </header>

      <section className="desk-resume" aria-labelledby="resume-head">
        {resume ? (
          <>
            <p className="desk-label">
              {state.last === resume.id
                ? "Pick up where you left off"
                : "Up next"}
            </p>
            <h2 id="resume-head">{resume.title}</h2>
            <p>
              Lesson {lessons.indexOf(resume) + 1} of {lessons.length} ·{" "}
              <span className="num">{resume.minutes} min</span>
            </p>
            <Link to={`/learn/${resume.id}`} className="btn btn-marker btn-lg">
              {state.last === resume.id ? "Resume lesson" : "Start lesson"}{" "}
              <ArrowRight size={18} aria-hidden />
            </Link>
          </>
        ) : (
          <>
            <h2 id="resume-head">Course complete — well done.</h2>
            <p>
              Bring your experiment to Thursday's live critique, or start
              something new.
            </p>
            <Link to="/courses" className="btn btn-marker btn-lg">
              Find your next course <ArrowRight size={18} aria-hidden />
            </Link>
          </>
        )}
      </section>

      <div className="desk-grid">
        <section className="desk-panel" aria-labelledby="courses-head">
          <h2 id="courses-head">Your courses</h2>
          <ul className="desk-courses">
            <li>
              <Link to={`/courses/${course.slug}`}>{course.title}</Link>
              <span className="meter" aria-hidden="true">
                <span
                  style={{ width: `${(finished / lessons.length) * 100}%` }}
                />
              </span>
              <span className="num muted">
                {Math.round((finished / lessons.length) * 100)}% · this demo
              </span>
            </li>
            {workspace.otherCourses.map((o) => {
              const c = courses.find((x) => x.slug === o.slug)!;
              return (
                <li key={o.slug}>
                  <Link to={`/courses/${c.slug}`}>{c.title}</Link>
                  <span className="meter" aria-hidden="true">
                    <span style={{ width: `${o.progress * 100}%` }} />
                  </span>
                  <span className="num muted">
                    {Math.round(o.progress * 100)}% · next: {o.next}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="desk-panel" aria-labelledby="week-head">
          <h2 id="week-head">This week</h2>
          <p className="desk-week-total">
            <span className="num">{duration(studied)}</span> of a{" "}
            {duration(workspace.weeklyGoal)} goal
          </p>
          <svg
            className="week-chart"
            viewBox="0 0 280 130"
            role="img"
            aria-label={`Minutes studied each day this week, ${studied} in total`}
          >
            <line
              x1="0"
              x2="280"
              y1={100 - (workspace.weeklyGoal / 7 / peak) * 90}
              y2={100 - (workspace.weeklyGoal / 7 / peak) * 90}
              className="chart-goal"
            />
            {workspace.week.map((d, i) => {
              const h = (d.minutes / peak) * 90;
              return (
                <g key={d.day}>
                  <rect
                    x={i * 40 + 8}
                    y={100 - h}
                    width="24"
                    height={Math.max(h, 2)}
                    rx="3"
                    className={d.minutes ? "chart-bar" : "chart-bar empty"}
                  />
                  <text
                    x={i * 40 + 20}
                    y="120"
                    textAnchor="middle"
                    className="chart-label"
                  >
                    {d.day}
                  </text>
                </g>
              );
            })}
          </svg>
          <p className="muted small">
            Dashed line: daily share of your weekly goal.
          </p>
        </section>

        <section className="desk-panel" aria-labelledby="up-head">
          <h2 id="up-head">Coming up</h2>
          <ul className="desk-upcoming">
            {workspace.upcoming.map((u) => (
              <li key={u.what}>
                <CalendarClock size={18} aria-hidden />
                <span>
                  <strong>{u.what}</strong>
                  <span className="muted">
                    {u.when} · {u.who}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="desk-panel" aria-labelledby="notes-head">
          <h2 id="notes-head">Recent notes</h2>
          {notes.length ? (
            <ul className="desk-notes">
              {notes.slice(0, 3).map((l) => (
                <li key={l.id}>
                  <Link to={`/learn/${l.id}`}>{l.title}</Link>
                  <p>{state.notes[l.id].text}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="muted">
              No notes yet. Open a lesson and write beside it — notes appear
              here and in your notebook.
            </p>
          )}
          <Link to="/learn/notes" className="text-link">
            Open notebook <ArrowRight size={16} aria-hidden />
          </Link>
        </section>
      </div>

      <p className="desk-foot">
        Demo workspace: progress and notes are kept in this browser only.{" "}
        <button type="button" className="link-button" onClick={progress.reset}>
          <RotateCcw size={14} aria-hidden /> Reset demo
        </button>
      </p>
    </div>
  );
}
