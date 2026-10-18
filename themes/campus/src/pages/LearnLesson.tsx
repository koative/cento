import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  PenLine,
} from "lucide-react";
import { Link } from "../router";
import { courses, workspace, type WorkspaceLesson } from "../content";
import { progress, useProgress } from "../lib/progress";
import { LensStudy } from "../components/LensStudy";

const course = courses.find((c) => c.slug === workspace.courseSlug)!;
const time = (iso: string) =>
  new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

export default function LearnLesson({ lesson }: { lesson: WorkspaceLesson }) {
  const state = useProgress();
  const index = workspace.lessons.findIndex((l) => l.id === lesson.id);
  const prev = workspace.lessons[index - 1];
  const next = workspace.lessons[index + 1];
  const done = state.done.includes(lesson.id);
  const saved = state.notes[lesson.id];
  const answer = state.answers[lesson.id];
  const [draft, setDraft] = useState(saved?.text ?? "");
  const [justSaved, setJustSaved] = useState(false);
  const dirty = draft.trim() !== (saved?.text ?? "");

  useEffect(() => progress.visit(lesson.id), [lesson.id]);

  return (
    <article className="lesson">
      <header className="lesson-head">
        <p className="lesson-crumb">
          <Link to={`/courses/${course.slug}`}>{course.title}</Link> · Lesson{" "}
          {index + 1} of {workspace.lessons.length} ·{" "}
          <span className="num">{lesson.minutes} min</span>
        </p>
        <h1>{lesson.heading}</h1>
        <p className="lesson-title">{lesson.title}</p>
      </header>

      {lesson.study && <LensStudy />}

      <div className="lesson-body">
        {lesson.body.map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
      </div>

      <section className="exercise" aria-labelledby="try-head">
        <PenLine size={22} aria-hidden />
        <div>
          <h2 id="try-head">Try this</h2>
          <p>{lesson.task}</p>
        </div>
      </section>

      <section className="check" aria-labelledby="check-head">
        <h2 id="check-head">Check your understanding</h2>
        <fieldset>
          <legend>{lesson.check.question}</legend>
          {lesson.check.options.map((o, i) => (
            <label
              key={o}
              className="check-option"
              data-state={
                answer === undefined
                  ? undefined
                  : i === lesson.check.answer
                    ? "right"
                    : answer === i
                      ? "wrong"
                      : undefined
              }
            >
              <input
                type="radio"
                name={`check-${lesson.id}`}
                checked={answer === i}
                onChange={() => progress.answer(lesson.id, i)}
              />
              <span>{o}</span>
            </label>
          ))}
        </fieldset>
        <p className="check-feedback" aria-live="polite">
          {answer === undefined
            ? ""
            : answer === lesson.check.answer
              ? `Right. ${lesson.check.why}`
              : `Not quite — have another look. ${lesson.check.why}`}
        </p>
      </section>

      <section className="notebook" aria-labelledby="notes-head">
        <h2 id="notes-head">Your notes</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            progress.saveNote(lesson.id, draft);
            setJustSaved(true);
          }}
        >
          <label htmlFor="lesson-note" className="sr-only">
            Notes for {lesson.title}
          </label>
          <textarea
            id="lesson-note"
            rows={5}
            value={draft}
            placeholder="What did you notice? Notes stay beside this lesson and in your notebook."
            onChange={(e) => {
              setDraft(e.target.value);
              setJustSaved(false);
            }}
          />
          <div className="notebook-foot">
            <p className="muted small" aria-live="polite">
              {justSaved
                ? draft.trim()
                  ? `Saved at ${time(saved?.saved ?? new Date().toISOString())}.`
                  : "Note cleared."
                : saved
                  ? `Last saved ${time(saved.saved)}${dirty ? " — unsaved changes" : ""}`
                  : "Not saved yet"}
            </p>
            <button className="btn btn-quiet" disabled={!dirty}>
              <Check size={16} aria-hidden /> Save note
            </button>
          </div>
        </form>
      </section>

      <footer className="lesson-foot">
        <button
          type="button"
          className={done ? "btn btn-quiet" : "btn btn-primary"}
          aria-pressed={done}
          onClick={() => progress.toggleDone(lesson.id)}
        >
          <CheckCircle2 size={18} aria-hidden />{" "}
          {done ? "Completed — undo" : "Mark lesson complete"}
        </button>
        <p className="sr-only" aria-live="polite">
          {done ? `${lesson.title} marked complete.` : ""}
        </p>
        <nav className="lesson-pager" aria-label="Lesson navigation">
          {prev ? (
            <Link to={`/learn/${prev.id}`} className="text-link">
              <ArrowLeft size={16} aria-hidden /> {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link to={`/learn/${next.id}`} className="text-link">
              {next.title} <ArrowRight size={16} aria-hidden />
            </Link>
          ) : (
            <Link to="/learn" className="text-link">
              Back to your desk <ArrowRight size={16} aria-hidden />
            </Link>
          )}
        </nav>
      </footer>
    </article>
  );
}
