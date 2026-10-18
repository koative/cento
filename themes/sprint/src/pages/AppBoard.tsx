import {
  useEffect,
  useRef,
  useState,
  type DragEvent,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { Plus } from "lucide-react";
import { Link, navigate } from "../router";
import { people, statuses, workspace, type Status } from "../content";
import { addIssue, moveIssue, useDemo } from "../lib/store";
import { statusName } from "../lib/format";
import { Avatar, PriorityIcon, StatusIcon } from "../components/issue";

const order = statuses.map((s) => s.id);

export default function AppBoard() {
  const { issues, limits } = useDemo();
  const [who, setWho] = useState<string[]>([]);
  const [said, setSaid] = useState("");
  const [moved, setMoved] = useState<string | null>(null);
  const [drag, setDrag] = useState<{
    key: string;
    over: Status | null;
    index: number;
  } | null>(null);
  const [adding, setAdding] = useState<Status | null>(null);
  const focusKey = useRef<string | null>(null);

  const visible = issues.filter(
    (i) => !who.length || who.includes(i.assignee ?? ""),
  );
  const column = (s: Status) => issues.filter((i) => i.status === s);
  const shown = (s: Status) => visible.filter((i) => i.status === s);

  useEffect(() => {
    if (!focusKey.current) return;
    document
      .querySelector<HTMLElement>(`[data-card="${focusKey.current}"] a`)
      ?.focus();
    focusKey.current = null;
  });

  /** Place `key` in `status` where the visible card at `slot` sits now (or at the end). */
  function place(
    key: string,
    status: Status,
    slot: number,
    how: "key" | "drag",
  ) {
    const target = shown(status).filter((i) => i.key !== key)[slot];
    const full = column(status).filter((i) => i.key !== key);
    const index = target ? full.indexOf(target) : full.length;
    moveIssue(key, status, index);
    setMoved(key);
    if (how === "key") focusKey.current = key;
    const total = full.length + 1;
    setSaid(
      `${key} moved to ${statusName(status)}, position ${Math.min(index, full.length) + 1} of ${total}.`,
    );
  }

  function onKey(e: KeyboardEvent, key: string, status: Status, slot: number) {
    if (!e.shiftKey) return;
    const col = order.indexOf(status);
    const moves: Record<string, () => void> = {
      ArrowLeft: () => col > 0 && place(key, order[col - 1], slot, "key"),
      ArrowRight: () =>
        col < order.length - 1 && place(key, order[col + 1], slot, "key"),
      ArrowUp: () => slot > 0 && place(key, status, slot - 1, "key"),
      ArrowDown: () =>
        slot < shown(status).length - 1 && place(key, status, slot + 1, "key"),
    };
    if (!moves[e.key]) return;
    e.preventDefault();
    moves[e.key]();
  }

  function onDragOver(e: DragEvent<HTMLElement>, status: Status) {
    if (!drag) return;
    e.preventDefault();
    const cards = [
      ...e.currentTarget.querySelectorAll<HTMLElement>("[data-card]"),
    ].filter((c) => c.dataset.card !== drag.key);
    const index = cards.findIndex((c) => {
      const r = c.getBoundingClientRect();
      return e.clientY < r.top + r.height / 2;
    });
    const next = index === -1 ? cards.length : index;
    if (drag.over !== status || drag.index !== next)
      setDrag({ ...drag, over: status, index: next });
  }

  function onAdd(e: FormEvent<HTMLFormElement>, status: Status) {
    e.preventDefault();
    const title = new FormData(e.currentTarget).get("title")?.toString().trim();
    if (!title) return;
    const key = addIssue(title, status);
    setAdding(null);
    setMoved(key);
    setSaid(`${key} created in ${statusName(status)}.`);
  }

  return (
    <div className="board-page">
      <div className="app-head">
        <div>
          <h1>Board</h1>
          <p className="app-sub">
            {workspace.cycle.name} · {visible.length} issues
          </p>
        </div>
        <fieldset className="who">
          <legend className="sr-only">Filter by assignee</legend>
          {people.map((p) => (
            <button
              key={p.id}
              type="button"
              aria-pressed={who.includes(p.id)}
              aria-label={`Only ${p.name}`}
              onClick={() =>
                setWho((w) =>
                  w.includes(p.id) ? w.filter((x) => x !== p.id) : [...w, p.id],
                )
              }
            >
              <Avatar id={p.id} size={28} />
            </button>
          ))}
          {who.length > 0 && (
            <button
              type="button"
              className="btn btn-quiet btn-sm"
              onClick={() => setWho([])}
            >
              Clear
            </button>
          )}
        </fieldset>
      </div>
      <p className="board-hint" id="move-hint">
        <span className="hint-pointer">
          Drag a card, or focus its title and press <kbd>Shift</kbd> + arrow
          keys to move it.
        </span>
        <span className="hint-touch">
          Use the column picker on a card to move it; swipe to see every column.
        </span>
      </p>
      <p className="sr-only" aria-live="assertive">
        {said}
      </p>

      <div className="board">
        {statuses.map((s) => {
          const cards = shown(s.id);
          const count = column(s.id).length;
          const limit = limits[s.id];
          const over = limit !== null && count > limit;
          return (
            <section
              key={s.id}
              className="column"
              aria-labelledby={`col-${s.id}`}
              data-drop={drag?.over === s.id ? "" : undefined}
              onDragOver={(e) => onDragOver(e, s.id)}
              onDragLeave={(e) =>
                !e.currentTarget.contains(e.relatedTarget as Node) &&
                drag &&
                setDrag({ ...drag, over: null })
              }
              onDrop={(e) => {
                e.preventDefault();
                if (drag) place(drag.key, s.id, drag.index, "drag");
                setDrag(null);
              }}
            >
              <h2
                className="col-head"
                id={`col-${s.id}`}
                data-over={over ? "" : undefined}
              >
                <StatusIcon status={s.id} />
                {s.name}
                <span
                  className="col-count"
                  aria-label={
                    limit !== null
                      ? `${count} of limit ${limit}${over ? ", over limit" : ""}`
                      : `${count} issues`
                  }
                >
                  {count}
                  {limit !== null && ` / ${limit}`}
                </span>
              </h2>
              <ol className="cards">
                {cards.map((i, slot) => (
                  <li key={i.key}>
                    {drag?.over === s.id &&
                      drag.key !== i.key &&
                      drag.index ===
                        cards.filter((c) => c.key !== drag.key).indexOf(i) && (
                        <div className="drop-line" />
                      )}
                    <article
                      className="card"
                      data-card={i.key}
                      data-moved={moved === i.key ? "" : undefined}
                      data-dragging={drag?.key === i.key ? "" : undefined}
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.effectAllowed = "move";
                        e.dataTransfer.setData("text/plain", i.key);
                        setDrag({ key: i.key, over: s.id, index: slot });
                      }}
                      onDragEnd={() => setDrag(null)}
                      onKeyDown={(e) => onKey(e, i.key, s.id, slot)}
                      onDoubleClick={() => navigate(`/app/issues/${i.key}`)}
                    >
                      <span className="card-key">{i.key}</span>
                      <Link
                        to={`/app/issues/${i.key}`}
                        className="card-title"
                        aria-describedby="move-hint"
                      >
                        {i.title}
                      </Link>
                      <span className="card-meta">
                        <PriorityIcon priority={i.priority} />
                        {i.labels.slice(0, 2).map((l) => (
                          <span key={l} className="tag">
                            {l}
                          </span>
                        ))}
                        <span
                          className="card-pts"
                          aria-label={`${i.estimate} points`}
                        >
                          {i.estimate}
                        </span>
                        <Avatar id={i.assignee} size={22} />
                      </span>
                      <select
                        className="card-move"
                        aria-label={`Move ${i.key} to column`}
                        value={s.id}
                        onChange={(e) =>
                          place(i.key, e.target.value as Status, 0, "drag")
                        }
                      >
                        {statuses.map((x) => (
                          <option key={x.id} value={x.id}>
                            {x.name}
                          </option>
                        ))}
                      </select>
                    </article>
                  </li>
                ))}
                {drag?.over === s.id &&
                  drag.index >=
                    cards.filter((c) => c.key !== drag.key).length && (
                    <li className="drop-line" aria-hidden="true" />
                  )}
              </ol>
              {adding === s.id ? (
                <form className="add-form" onSubmit={(e) => onAdd(e, s.id)}>
                  <label htmlFor={`add-${s.id}`} className="sr-only">
                    New issue title in {s.name}
                  </label>
                  <input
                    id={`add-${s.id}`}
                    name="title"
                    autoFocus
                    placeholder="What needs doing?"
                    onKeyDown={(e) => e.key === "Escape" && setAdding(null)}
                  />
                  <div className="add-actions">
                    <button className="btn btn-primary btn-sm">Add</button>
                    <button
                      type="button"
                      className="btn btn-quiet btn-sm"
                      onClick={() => setAdding(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  type="button"
                  className="add-card"
                  onClick={() => setAdding(s.id)}
                >
                  <Plus size={16} aria-hidden /> Add issue
                </button>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
