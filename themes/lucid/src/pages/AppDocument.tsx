import { useState } from "react";
import { ArrowLeft, Check, Flag, RotateCcw, X } from "lucide-react";
import { Link } from "../router";
import {
  editKinds,
  type Doc,
  type DocStatus,
  type Edit,
  type EditKind,
} from "../content";
import { Markup, pressable } from "../components/TrackedChanges";
import {
  docStats,
  editsOf,
  segments,
  update,
  useWorkspace,
  type Decision,
} from "../lib/workspace";
import { date, num } from "../lib/text";

const isFlag = (e: Edit) => e.from === e.to;

export default function AppDocument({ doc }: { doc: Doc }) {
  const ws = useWorkspace();
  const decisions = ws.decisions[doc.id] ?? {};
  const stats = docStats(doc, ws);
  const edits = editsOf(doc);
  const [kind, setKind] = useState<EditKind | "">("");
  const [selected, setSelected] = useState<string | null>(
    edits.find((e) => !decisions[e.key])?.key ?? null,
  );
  const [announce, setAnnounce] = useState("");

  const visible = edits.filter((e) => !kind || e.edit.kind === kind);
  const pending = visible.filter((e) => !decisions[e.key]);
  const reviewed = visible.filter((e) => decisions[e.key]);

  function decide(keys: string[], d: Decision | null) {
    update((s) => {
      const next = { ...(s.decisions[doc.id] ?? {}) };
      for (const k of keys) d ? (next[k] = d) : delete next[k];
      return { decisions: { ...s.decisions, [doc.id]: next } };
    });
    const left = pending.filter((e) => !keys.includes(e.key));
    if (d) setSelected(left[0]?.key ?? null);
    setAnnounce(
      d === null
        ? "Decision undone."
        : `${keys.length === 1 ? "Suggestion" : `${keys.length} suggestions`} ${d}. ${left.length} left${kind ? ` in ${kind}` : ""}.`,
    );
  }

  function select(key: string) {
    setSelected(key);
    document
      .getElementById(`edit-${key}`)
      ?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }

  function setStatus(status: DocStatus) {
    update((s) => ({ status: { ...s.status, [doc.id]: status } }));
  }

  return (
    <div className="app-page editor-page">
      <header className="editor-head">
        <Link to="/app/documents" className="back-link">
          <ArrowLeft size={16} aria-hidden /> Documents
        </Link>
        <div className="editor-title">
          <h1>{doc.title}</h1>
          <div className="field field-inline">
            <label htmlFor="doc-status">Status</label>
            <select
              id="doc-status"
              value={stats.status}
              onChange={(e) => setStatus(e.target.value as DocStatus)}
            >
              <option>Draft</option>
              <option>In review</option>
              <option>Ready</option>
            </select>
          </div>
        </div>
        <dl className="editor-meta num">
          <div>
            <dt>Type</dt>
            <dd>{doc.type}</dd>
          </div>
          <div>
            <dt>Owner</dt>
            <dd>{doc.owner}</dd>
          </div>
          <div>
            <dt>Updated</dt>
            <dd>{date(doc.updated)}</dd>
          </div>
          <div>
            <dt>Words</dt>
            <dd>{num(stats.words)}</dd>
          </div>
          <div>
            <dt>Reading grade</dt>
            <dd data-over={stats.grade > doc.target ? "" : undefined}>
              {stats.grade} <small>target {doc.target}</small>
            </dd>
          </div>
        </dl>
      </header>

      <div className="editor-grid">
        <article className="page" aria-label={`${doc.title}, with suggestions`}>
          {doc.body.map((p, i) => {
            const body = segments(p, i).map((s, k) => {
              if ("text" in s) return <span key={k}>{s.text}</span>;
              const d = decisions[s.key];
              if (d)
                return (
                  <span key={k} className="resolved" data-state={d}>
                    {d === "accepted" ? s.edit.to : s.edit.from}
                  </span>
                );
              return (
                <span
                  key={k}
                  {...pressable(() => select(s.key))}
                  className={isFlag(s.edit) ? "hunk hunk-flag" : "hunk"}
                  aria-pressed={selected === s.key}
                  aria-label={`${s.edit.kind}: ${isFlag(s.edit) ? `check “${s.edit.from}”` : `replace “${s.edit.from}” with “${s.edit.to}”`}`}
                  data-dim={kind && s.edit.kind !== kind ? "" : undefined}
                >
                  {isFlag(s.edit) ? (
                    <mark>{s.edit.from}</mark>
                  ) : (
                    <>
                      <del>{s.edit.from}</del>
                      <ins>{s.edit.to}</ins>
                    </>
                  )}
                </span>
              );
            });
            return p.heading ? <h2 key={i}>{body}</h2> : <p key={i}>{body}</p>;
          })}
        </article>

        <aside className="rail" aria-labelledby="rail-title">
          <div className="rail-head">
            <h2 id="rail-title">
              Suggestions{" "}
              <span className="num">
                {edits.filter((e) => !decisions[e.key]).length} open
              </span>
            </h2>
            {pending.length > 1 && (
              <button
                type="button"
                className="btn btn-small btn-quiet"
                onClick={() =>
                  decide(
                    pending.map((e) => e.key),
                    "accepted",
                  )
                }
              >
                Accept {pending.length}
              </button>
            )}
          </div>
          <div
            className="seg seg-wrap"
            role="group"
            aria-label="Filter suggestions by kind"
          >
            <button
              type="button"
              aria-pressed={kind === ""}
              onClick={() => setKind("")}
            >
              All
            </button>
            {editKinds.map((k) => (
              <button
                key={k}
                type="button"
                aria-pressed={kind === k}
                onClick={() => setKind(k)}
              >
                {k}{" "}
                <span className="num">
                  {edits.filter((e) => e.edit.kind === k).length}
                </span>
              </button>
            ))}
          </div>
          <p className="sr-only" aria-live="polite">
            {announce}
          </p>

          {pending.length === 0 && (
            <p className="empty">
              {visible.length
                ? "All reviewed. This document is ready to share."
                : `No ${kind.toLowerCase()} suggestions in this document.`}
            </p>
          )}
          <ul className="suggestions">
            {pending.map((e) => (
              <li
                key={e.key}
                id={`edit-${e.key}`}
                className="suggestion"
                data-selected={selected === e.key ? "" : undefined}
              >
                <button
                  type="button"
                  className="suggestion-pick"
                  onClick={() => select(e.key)}
                  aria-pressed={selected === e.key}
                  aria-label={`${e.edit.kind}: ${isFlag(e.edit) ? `check “${e.edit.from}”` : `replace “${e.edit.from}” with “${e.edit.to}”`}`}
                >
                  <span className="kind" data-kind={e.edit.kind}>
                    {isFlag(e.edit) && <Flag size={13} aria-hidden />}{" "}
                    {e.edit.kind}
                  </span>
                  <span className="suggestion-change">
                    {isFlag(e.edit) ? (
                      <mark>{e.edit.from}</mark>
                    ) : (
                      <Markup before={e.edit.from} after={e.edit.to} />
                    )}
                  </span>
                </button>
                <p className="why">{e.edit.why}</p>
                <div className="suggestion-actions">
                  <button
                    type="button"
                    className="btn btn-small btn-quiet"
                    onClick={() => decide([e.key], "rejected")}
                  >
                    <X size={15} aria-hidden />{" "}
                    {isFlag(e.edit) ? "Dismiss" : "Reject"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-small btn-primary"
                    onClick={() => decide([e.key], "accepted")}
                  >
                    <Check size={15} aria-hidden />{" "}
                    {isFlag(e.edit) ? "Mark checked" : "Accept"}
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {reviewed.length > 0 && (
            <details className="reviewed">
              <summary>Reviewed ({reviewed.length})</summary>
              <ul>
                {reviewed.map((e) => (
                  <li key={e.key}>
                    <span>
                      <span className="num">
                        {decisions[e.key] === "accepted"
                          ? "Accepted"
                          : "Rejected"}
                        :
                      </span>{" "}
                      {isFlag(e.edit)
                        ? e.edit.from
                        : decisions[e.key] === "accepted"
                          ? e.edit.to
                          : e.edit.from}
                    </span>
                    <button
                      type="button"
                      className="icon-btn"
                      aria-label={`Undo decision on “${e.edit.from}”`}
                      onClick={() => decide([e.key], null)}
                    >
                      <RotateCcw size={15} aria-hidden />
                    </button>
                  </li>
                ))}
              </ul>
            </details>
          )}
        </aside>
      </div>
    </div>
  );
}
