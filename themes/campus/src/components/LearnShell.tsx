import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  Check,
  LayoutDashboard,
  Menu,
  NotebookPen,
  X,
} from "lucide-react";
import { Link, useRoute } from "../router";
import { courses, workspace } from "../content";
import { useProgress } from "../lib/progress";
import { Logo } from "./Logo";

const course = courses.find((c) => c.slug === workspace.courseSlug)!;

/** App shell for the learning workspace demo: syllabus rail on the left, collapsible on small screens. */
export function LearnShell() {
  const path = useRoute();
  const { done } = useProgress();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const total = workspace.lessons.length;
  const finished = workspace.lessons.filter((l) => done.includes(l.id)).length;

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      button.current?.focus();
    };
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [open]);

  return (
    <aside className="desk-rail" aria-label="Workspace" ref={ref}>
      <div className="desk-rail-top">
        <Link to="/" className="logo-link" aria-label="Campus home">
          <Logo />
        </Link>
        <button
          ref={button}
          className="menu-button"
          aria-expanded={open}
          aria-controls="desk-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
          <span>Lessons</span>
        </button>
      </div>

      <div
        className="desk-menu"
        id="desk-menu"
        data-open={open ? "" : undefined}
      >
        <nav aria-label="Workspace sections">
          <ul className="desk-nav">
            <li>
              <Link to="/learn">
                <LayoutDashboard size={18} aria-hidden /> Your desk
              </Link>
            </li>
            <li>
              <Link to="/learn/notes">
                <NotebookPen size={18} aria-hidden /> Notebook
              </Link>
            </li>
            <li>
              <Link to={`/courses/${course.slug}`}>
                <BookOpen size={18} aria-hidden /> Course page
              </Link>
            </li>
          </ul>
        </nav>

        <div className="desk-course">
          <p className="desk-course-title">{course.title}</p>
          <div
            className="meter"
            role="img"
            aria-label={`${finished} of ${total} lessons complete`}
          >
            <span style={{ width: `${(finished / total) * 100}%` }} />
          </div>
          <p className="desk-course-count num">
            {finished} of {total} lessons complete
          </p>
          <nav aria-label="Course lessons">
            <ol className="syllabus">
              {workspace.lessons.map((l, i) => (
                <li key={l.id}>
                  <Link to={`/learn/${l.id}`}>
                    <span
                      className="syllabus-mark"
                      data-done={done.includes(l.id) ? "" : undefined}
                    >
                      {done.includes(l.id) ? (
                        <Check size={14} aria-label="Completed" />
                      ) : (
                        i + 1
                      )}
                    </span>
                    <span>
                      {l.title}
                      <small className="num">{l.minutes} min</small>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        </div>

        <Link to="/" className="desk-back">
          <ArrowLeft size={16} aria-hidden /> Back to the Campus site
        </Link>
      </div>
    </aside>
  );
}
