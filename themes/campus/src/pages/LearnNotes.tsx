import { useState } from "react";
import { Download, Search, Trash2 } from "lucide-react";
import { Link } from "../router";
import { courses, workspace } from "../content";
import { progress, useProgress } from "../lib/progress";

const course = courses.find((c) => c.slug === workspace.courseSlug)!;

export default function LearnNotes() {
  const { notes } = useProgress();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const all = workspace.lessons.filter((l) => notes[l.id]);
  const q = query.trim().toLowerCase();
  const shown = all.filter(
    (l) =>
      !q ||
      notes[l.id].text.toLowerCase().includes(q) ||
      l.title.toLowerCase().includes(q),
  );

  function exportNotes() {
    const text = all
      .map(
        (l) =>
          `${l.title}\n${"-".repeat(l.title.length)}\n${notes[l.id].text}\n`,
      )
      .join("\n");
    const url = URL.createObjectURL(
      new Blob([`${course.title} — notes\n\n${text}`], { type: "text/plain" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "campus-notes.txt";
    a.click();
    URL.revokeObjectURL(url);
    setStatus(
      `Exported ${all.length} ${all.length === 1 ? "note" : "notes"} as campus-notes.txt.`,
    );
  }

  return (
    <div className="desk">
      <header className="desk-head">
        <h1>Notebook</h1>
        <p className="muted">
          Every note you write beside a lesson in {course.title}, in course
          order.
        </p>
      </header>

      {all.length ? (
        <>
          <div className="notes-tools">
            <div className="field search-field">
              <label htmlFor="note-search">Search notes</label>
              <span className="input-icon">
                <Search size={18} aria-hidden />
                <input
                  id="note-search"
                  type="search"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setStatus("");
                  }}
                />
              </span>
            </div>
            <button
              type="button"
              className="btn btn-quiet"
              onClick={exportNotes}
            >
              <Download size={16} aria-hidden /> Export as text
            </button>
          </div>
          <p className="result-count" aria-live="polite">
            {status ||
              (q
                ? `${shown.length} of ${all.length} notes match`
                : `${all.length} ${all.length === 1 ? "note" : "notes"}`)}
          </p>
          <ul className="notes-list">
            {shown.map((l) => (
              <li key={l.id}>
                <div className="notes-item-head">
                  <h2>
                    <Link to={`/learn/${l.id}`}>{l.title}</Link>
                  </h2>
                  <span className="muted small num">
                    {new Date(notes[l.id].saved).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <p>{notes[l.id].text}</p>
                <button
                  type="button"
                  className="link-button"
                  onClick={() => {
                    progress.saveNote(l.id, "");
                    setStatus(`Deleted the note on “${l.title}”.`);
                  }}
                >
                  <Trash2 size={14} aria-hidden /> Delete note
                </button>
              </li>
            ))}
          </ul>
          {!shown.length && (
            <p className="empty-inline">
              No notes mention “{query}”. Try a shorter word.
            </p>
          )}
        </>
      ) : (
        <div className="empty">
          <h2>Your notebook is empty.</h2>
          <p>
            Open a lesson and write in the notes box beside it. Everything you
            save shows up here, ready to search or export.
          </p>
          <Link
            to={`/learn/${workspace.lessons[0].id}`}
            className="btn btn-primary"
          >
            Open lesson one
          </Link>
        </div>
      )}
    </div>
  );
}
