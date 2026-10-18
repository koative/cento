import {
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import { RotateCcw, X } from "lucide-react";
import { matrix, type Initiative } from "../content";
import { capabilityBySlug } from "../lib/format";
import { Link } from "../router";

const MAX = 8;
const clamp = (n: number) => Math.round(Math.min(100, Math.max(0, n)));

/** Quadrant index in reading order: 0 top-left, 1 top-right, 2 bottom-left, 3 bottom-right. */
const quadrantOf = (i: Initiative) =>
  matrix.quadrants[(i.value >= 50 ? 0 : 2) + (i.readiness >= 50 ? 1 : 0)];

export function Matrix() {
  const [items, setItems] = useState<Initiative[]>(matrix.presets);
  const [announce, setAnnounce] = useState("");
  const [addError, setAddError] = useState("");
  const plot = useRef<HTMLDivElement>(null);
  const nextId = useRef(matrix.presets.length + 1);

  const update = (id: string, patch: Partial<Initiative>) =>
    setItems((list) => list.map((i) => (i.id === id ? { ...i, ...patch } : i)));

  const say = (i: Initiative) =>
    setAnnounce(
      `${i.name}: ${quadrantOf(i).name}. Readiness ${i.readiness}, value ${i.value}.`,
    );

  const fromPointer = (e: PointerEvent) => {
    const r = plot.current!.getBoundingClientRect();
    return {
      readiness: clamp(((e.clientX - r.left) / r.width) * 100),
      value: clamp(100 - ((e.clientY - r.top) / r.height) * 100),
    };
  };

  const onKey = (e: KeyboardEvent, i: Initiative) => {
    const step = e.shiftKey ? 10 : 2;
    const moves: Record<string, Partial<Initiative>> = {
      ArrowLeft: { readiness: clamp(i.readiness - step) },
      ArrowRight: { readiness: clamp(i.readiness + step) },
      ArrowUp: { value: clamp(i.value + step) },
      ArrowDown: { value: clamp(i.value - step) },
    };
    const patch = moves[e.key];
    if (!patch) return;
    e.preventDefault();
    update(i.id, patch);
    say({ ...i, ...patch });
  };

  const onAdd = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem(
      "initiative",
    ) as HTMLInputElement;
    const name = input.value.trim();
    if (!name)
      return setAddError(
        "Name the initiative first, for example “Close the Denver warehouse”.",
      );
    if (items.some((i) => i.name.toLowerCase() === name.toLowerCase()))
      return setAddError(
        "That initiative is already on the matrix — rename one of them.",
      );
    const item = { id: `i${nextId.current++}`, name, readiness: 50, value: 50 };
    setItems((list) => [...list, item]);
    setAddError("");
    setAnnounce(
      `${name} added at the centre. Drag it or use the arrow keys to place it.`,
    );
    input.value = "";
  };

  const groups = matrix.quadrants.map((q) => ({
    ...q,
    items: items.filter((i) => quadrantOf(i).id === q.id),
  }));
  const busiest = [...groups].sort(
    (a, b) => b.items.length - a.items.length,
  )[0];
  const lead = capabilityBySlug(busiest.capability);
  const moveNow = groups[1].items.length;

  return (
    <div className="matrix">
      <div className="matrix-figure">
        <p className="matrix-axis matrix-axis-y" aria-hidden="true">
          {matrix.axes.y} →
        </p>
        <div className="matrix-plot" ref={plot}>
          {groups.map((q) => (
            <div
              key={q.id}
              className="matrix-cell"
              data-q={q.id}
              aria-hidden="true"
            >
              <span>{q.name}</span>
            </div>
          ))}
          {items.map((i, n) => (
            <button
              key={i.id}
              type="button"
              className="dot"
              data-q={quadrantOf(i).id}
              data-flip={i.readiness > 55 ? "" : undefined}
              style={{ left: `${i.readiness}%`, top: `${100 - i.value}%` }}
              aria-label={`${n + 1}. ${i.name}: ${quadrantOf(i).name}, readiness ${i.readiness}, value ${i.value}`}
              aria-describedby="matrix-help"
              onKeyDown={(e) => onKey(e, i)}
              onPointerDown={(e) => {
                e.currentTarget.setPointerCapture(e.pointerId);
                e.currentTarget.dataset.dragging = "";
              }}
              onPointerMove={(e) => {
                if (e.currentTarget.hasPointerCapture(e.pointerId))
                  update(i.id, fromPointer(e));
              }}
              onPointerUp={(e) => {
                delete e.currentTarget.dataset.dragging;
                const p = fromPointer(e);
                update(i.id, p);
                say({ ...i, ...p });
              }}
            >
              <span className="dot-n num">{n + 1}</span>
              <span className="dot-name">{i.name}</span>
            </button>
          ))}
        </div>
        <p className="matrix-axis matrix-axis-x" aria-hidden="true">
          {matrix.axes.x} →
        </p>
        <p id="matrix-help" className="matrix-help">
          Drag a point, or focus it and use the arrow keys. Hold Shift to move
          faster.
        </p>
        <p className="sr-only" aria-live="polite">
          {announce}
        </p>
      </div>

      <div className="matrix-side">
        <ol className="initiatives">
          {items.map((i, n) => (
            <li key={i.id} data-q={quadrantOf(i).id}>
              <span className="dot-n num" aria-hidden="true">
                {n + 1}
              </span>
              <label className="sr-only" htmlFor={`name-${i.id}`}>
                Initiative {n + 1}
              </label>
              <input
                id={`name-${i.id}`}
                value={i.name}
                maxLength={48}
                onChange={(e) => update(i.id, { name: e.target.value })}
              />
              <span className="initiative-q">{quadrantOf(i).name}</span>
              <button
                type="button"
                className="icon-btn"
                aria-label={`Remove ${i.name || `initiative ${n + 1}`}`}
                onClick={() => {
                  setItems((list) => list.filter((x) => x.id !== i.id));
                  setAnnounce(`${i.name} removed.`);
                }}
              >
                <X aria-hidden="true" />
              </button>
            </li>
          ))}
        </ol>

        <form className="initiative-add" noValidate onSubmit={onAdd}>
          <label htmlFor="initiative">Add an initiative</label>
          <div className="add-row">
            <input
              id="initiative"
              name="initiative"
              maxLength={48}
              disabled={items.length >= MAX}
              aria-invalid={addError ? true : undefined}
              aria-describedby={
                addError
                  ? "initiative-err"
                  : items.length >= MAX
                    ? "initiative-max"
                    : undefined
              }
              onChange={() => addError && setAddError("")}
            />
            <button
              type="submit"
              className="btn btn-quiet"
              disabled={items.length >= MAX}
            >
              Add
            </button>
          </div>
          {addError && (
            <p className="field-error" id="initiative-err">
              {addError}
            </p>
          )}
          {items.length >= MAX && (
            <p className="field-hint" id="initiative-max">
              Eight is the most a leadership team can hold in its head. Remove
              one to add another.
            </p>
          )}
        </form>

        <section className="memo" aria-labelledby="memo-title">
          <h3 id="memo-title">Memo to the executive team</h3>
          {items.length === 0 ? (
            <p>
              The matrix is empty. Add the initiatives your team is debating, or
              restore the example agenda.
            </p>
          ) : (
            <>
              <dl className="memo-list">
                {groups.map((g) => (
                  <div key={g.id} data-q={g.id}>
                    <dt>
                      {g.name} <span className="num">({g.items.length})</span>
                    </dt>
                    <dd>
                      {g.items.length
                        ? g.items.map((i) => i.name || "Untitled").join("; ")
                        : "Nothing here."}
                    </dd>
                  </div>
                ))}
              </dl>
              <p>
                <strong>{busiest.name}</strong> holds the most initiatives.{" "}
                {busiest.verdict}
              </p>
              {moveNow > 3 && (
                <p className="memo-warn">
                  {moveNow} items in “Move now” usually means readiness was
                  scored generously. Ask who would run each one on Monday.
                </p>
              )}
              {lead && (
                <p>
                  Where we would start:{" "}
                  <Link to={`/capabilities/${lead.slug}`}>{lead.name}</Link>.
                </p>
              )}
            </>
          )}
          <button
            type="button"
            className="btn-text"
            onClick={() => {
              setItems(matrix.presets);
              setAnnounce("Example agenda restored.");
            }}
          >
            <RotateCcw aria-hidden="true" /> Restore the example agenda
          </button>
        </section>
      </div>
    </div>
  );
}
