import { useState, type FormEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "../router";
import {
  people,
  priorities,
  statuses,
  workspace,
  type Issue,
  type Priority,
  type Status,
} from "../content";
import { addComment, toggleCheck, updateIssue, useDemo } from "../lib/store";
import { formatStamp, person, priorityName, statusName } from "../lib/format";
import { Avatar, PriorityIcon, StatusIcon } from "../components/issue";

const estimates = [1, 2, 3, 5, 8];

export default function AppIssue({ issue }: { issue: Issue }) {
  const { issues, comments, activity } = useDemo();
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");
  const [said, setSaid] = useState("");

  const at = issues.indexOf(issue);
  const prev = issues[at - 1];
  const next = issues[at + 1];
  const done = issue.checklist.filter((c) => c.done).length;
  const timeline = [
    ...comments
      .filter((c) => c.key === issue.key)
      .map((c) => ({ ...c, kind: "comment" as const })),
    ...activity
      .filter((a) => a.key === issue.key)
      .map((a) => ({ ...a, kind: "event" as const })),
  ].sort((a, b) => (a.at < b.at ? -1 : 1));

  function change(patch: Partial<Issue>, text: string) {
    updateIssue(issue.key, patch, text);
    setSaid(`Saved: ${text}.`);
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    if (draft.trim().length < 2) {
      setError("Write a comment before posting — even “on it” counts.");
      return;
    }
    addComment(issue.key, draft.trim());
    setDraft("");
    setError("");
    setSaid("Comment posted.");
  }

  return (
    <article className="issue-page">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/app">Board</Link>
        <ChevronRight size={14} aria-hidden />
        <span aria-current="page" className="num">
          {issue.key}
        </span>
        <span className="crumb-nav">
          {prev && (
            <Link
              to={`/app/issues/${prev.key}`}
              aria-label={`Previous issue, ${prev.key}`}
            >
              <ChevronLeft size={18} aria-hidden />
            </Link>
          )}
          {next && (
            <Link
              to={`/app/issues/${next.key}`}
              aria-label={`Next issue, ${next.key}`}
            >
              <ChevronRight size={18} aria-hidden />
            </Link>
          )}
        </span>
      </nav>

      <div className="issue-layout">
        <div className="issue-main">
          <div className="issue-card">
            <p className="card-key">{issue.key}</p>
            <h1>{issue.title}</h1>
            {issue.description.length ? (
              issue.description.map((p) => <p key={p}>{p}</p>)
            ) : (
              <p className="muted">
                No description yet. Most good issues get one before they reach
                In progress.
              </p>
            )}
          </div>

          {issue.checklist.length > 0 && (
            <section className="checklist" aria-labelledby="check-h">
              <h2 id="check-h">
                Checklist{" "}
                <span className="muted num">
                  {done} of {issue.checklist.length}
                </span>
              </h2>
              <ul>
                {issue.checklist.map((c, n) => (
                  <li key={c.text}>
                    <label>
                      <input
                        type="checkbox"
                        checked={c.done}
                        onChange={() => toggleCheck(issue.key, n)}
                      />
                      <span>{c.text}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="timeline" aria-labelledby="act-h">
            <h2 id="act-h">Activity</h2>
            <ol>
              {timeline.map((t, n) => {
                const who = person(t.who)?.name ?? "Someone";
                return t.kind === "comment" ? (
                  <li key={n} className="tl-comment">
                    <Avatar id={t.who} size={28} />
                    <div>
                      <p className="tl-meta">
                        <strong>{who}</strong>{" "}
                        <time dateTime={t.at}>{formatStamp(t.at)}</time>
                      </p>
                      <p>{t.text}</p>
                    </div>
                  </li>
                ) : (
                  <li key={n} className="tl-event">
                    <span className="tl-dot" aria-hidden="true" />
                    <p>
                      <strong>{who}</strong> {t.text} ·{" "}
                      <time dateTime={t.at}>{formatStamp(t.at)}</time>
                    </p>
                  </li>
                );
              })}
            </ol>
            <form className="comment-form" noValidate onSubmit={submit}>
              <label htmlFor="comment">Add a comment</label>
              <textarea
                id="comment"
                rows={3}
                value={draft}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? "comment-err" : undefined}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Ask a question, note a decision, or say it’s done."
              />
              {error && (
                <p className="field-error" id="comment-err">
                  {error}
                </p>
              )}
              <button className="btn btn-primary btn-sm">Post comment</button>
            </form>
          </section>
        </div>

        <aside className="issue-props" aria-label="Properties">
          <p className="sr-only" aria-live="polite">
            {said}
          </p>
          <label className="prop">
            <span>Status</span>
            <span className="prop-control">
              <StatusIcon status={issue.status} />
              <select
                value={issue.status}
                onChange={(e) => {
                  const s = e.target.value as Status;
                  change(
                    { status: s },
                    `moved from ${statusName(issue.status)} to ${statusName(s)}`,
                  );
                }}
              >
                {statuses.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </span>
          </label>
          <label className="prop">
            <span>Priority</span>
            <span className="prop-control">
              <PriorityIcon priority={issue.priority} />
              <select
                value={issue.priority}
                onChange={(e) => {
                  const p = e.target.value as Priority;
                  change({ priority: p }, `set priority to ${priorityName(p)}`);
                }}
              >
                {priorities.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </span>
          </label>
          <label className="prop">
            <span>Assignee</span>
            <span className="prop-control">
              <Avatar id={issue.assignee} size={20} />
              <select
                value={issue.assignee ?? ""}
                onChange={(e) => {
                  const id = e.target.value || null;
                  change(
                    { assignee: id },
                    id
                      ? `assigned to ${person(id)?.name}`
                      : "removed the assignee",
                  );
                }}
              >
                <option value="">Unassigned</option>
                {people.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </span>
          </label>
          <label className="prop">
            <span>Estimate</span>
            <span className="prop-control">
              <select
                value={issue.estimate}
                onChange={(e) =>
                  change(
                    { estimate: Number(e.target.value) },
                    `estimated ${e.target.value} points`,
                  )
                }
              >
                {estimates.map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? "point" : "points"}
                  </option>
                ))}
              </select>
            </span>
          </label>
          <dl className="prop-list">
            <div>
              <dt>Labels</dt>
              <dd>
                {issue.labels.length
                  ? issue.labels.map((l) => (
                      <span key={l} className="tag">
                        {l}
                      </span>
                    ))
                  : "None"}
              </dd>
            </div>
            <div>
              <dt>Cycle</dt>
              <dd>{workspace.cycle.name}</dd>
            </div>
            <div>
              <dt>Updated</dt>
              <dd className="num">{formatStamp(issue.updated)}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </article>
  );
}
