import { useState, type CSSProperties } from "react";
import { Check, Plus } from "lucide-react";
import { Link } from "../router";
import type { Material } from "../content";
import {
  BOARD_MAX,
  boardMaterials,
  role,
  toggle,
  useBoard,
} from "../lib/board";

export function AddToBoard({
  material,
  compact = false,
}: {
  material: Material;
  compact?: boolean;
}) {
  const board = useBoard();
  const on = board.includes(material.id);
  const full = !on && board.length >= BOARD_MAX;
  return (
    <button
      type="button"
      className={"add-sample" + (compact ? " add-sample-compact" : "")}
      aria-pressed={on}
      disabled={full}
      title={
        full
          ? `Your board holds ${BOARD_MAX} samples — remove one first`
          : undefined
      }
      onClick={() => toggle(material.id)}
    >
      {on ? (
        <Check size={16} aria-hidden="true" />
      ) : (
        <Plus size={16} aria-hidden="true" />
      )}
      <span className={compact ? "visually-hidden" : undefined}>
        {on ? "On your board" : full ? "Board full" : "Add to board"}
      </span>
      {compact && <span className="visually-hidden"> — {material.name}</span>}
    </button>
  );
}

export function MaterialCard({
  material,
  eager = false,
}: {
  material: Material;
  eager?: boolean;
}) {
  return (
    <article className="material-card">
      <Link to={`/materials/${material.id}`} className="material-card-link">
        <img
          src={material.image}
          alt=""
          width={800}
          height={800}
          loading={eager ? undefined : "lazy"}
        />
        <h3>{material.name}</h3>
      </Link>
      <p className="material-card-meta">
        {material.family} · {material.finish}
      </p>
      <p className="material-card-price">
        ${material.price} <span>/ {material.unit}</span>
      </p>
      <AddToBoard material={material} compact />
    </article>
  );
}

/* Rows of the composition: field + secondary + first accent sit in a fixed block, later accents fill rows of up to three. */
function spans(count: number) {
  const out: [number, number][] = [
    [4, 3],
    [2, 2],
    [2, 1],
  ].slice(0, count) as [number, number][];
  if (count === 1) out[0] = [6, 3];
  if (count === 2) out[1] = [2, 3];
  const rest = count - 3;
  for (let i = 0; i < rest; i += 3) {
    const row = Math.min(3, rest - i);
    for (let j = 0; j < row; j++) out.push([6 / row, 1]);
  }
  return out;
}

const LIGHTS = [
  { at: 0, label: "North light, 9am" },
  { at: 50, label: "Midday" },
  { at: 100, label: "Lamplight, 8pm" },
];

/** The composed sample board, with a daylight dial that re-lights every sample at once. */
export function BoardView({ ids }: { ids: string[] }) {
  const [light, setLight] = useState(50);
  const items = boardMaterials(ids);
  const layout = spans(items.length);
  const near = LIGHTS.reduce((a, b) =>
    Math.abs(b.at - light) < Math.abs(a.at - light) ? b : a,
  );
  const warm = Math.max(0, (light - 50) / 50);
  const cool = Math.max(0, (50 - light) / 50);
  const style = {
    "--warm": warm,
    "--cool": cool,
    "--light-filter": `brightness(${1 - warm * 0.2 + cool * 0.03}) saturate(${1 + warm * 0.15 - cool * 0.2}) sepia(${warm * 0.2})`,
  } as CSSProperties;

  if (!items.length) return null;
  return (
    <div className="board">
      <div className="board-surface" style={style}>
        <ol className="board-grid" aria-label="Sample board">
          {items.map((m, i) => (
            <li
              key={m.id}
              className="board-tile"
              style={{
                gridColumn: `span ${layout[i][0]}`,
                gridRow: `span ${layout[i][1]}`,
              }}
            >
              <img src={m.image} alt="" />
              <span className="board-tag">
                <b>{role(i)}</b> {m.name}
              </span>
            </li>
          ))}
        </ol>
        <span className="board-light" aria-hidden="true" />
      </div>
      <div className="light-dial">
        <label htmlFor="light">See it in</label>
        <input
          id="light"
          type="range"
          min={0}
          max={100}
          step={1}
          value={light}
          onChange={(e) => setLight(+e.target.value)}
          aria-valuetext={near.label}
        />
        <output htmlFor="light">{near.label}</output>
      </div>
    </div>
  );
}
