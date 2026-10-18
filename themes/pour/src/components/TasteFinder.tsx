import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { Plus } from "lucide-react";
import { Link } from "../router";
import { colours, finder, wines, type Colour, type Wine } from "../content";
import { addLine, money } from "../lib/cart";
import { Bottle } from "./Bottle";

type Point = { body: number; wild: number };

const clamp = (n: number) => Math.min(10, Math.max(0, Math.round(n * 2) / 2));

function why(w: Wine, p: Point) {
  const parts: string[] = [];
  const db = w.body - p.body;
  const dw = w.wild - p.wild;
  parts.push(
    Math.abs(db) < 1.5
      ? "right weight"
      : db > 0
        ? "a little fuller"
        : "a little lighter",
  );
  parts.push(
    Math.abs(dw) < 1.5
      ? "just as wild"
      : dw > 0
        ? "a touch wilder"
        : "a touch cleaner",
  );
  return parts.join(", ");
}

/** The palate map: drag (or arrow-key) a glass across body × wildness and the closest bottles surface. */
export function TasteFinder({
  start = { body: 4, wild: 4 },
}: {
  start?: Point;
}) {
  const [point, setPoint] = useState<Point>(start);
  const [colour, setColour] = useState<Colour | "Any">("Any");
  const [max, setMax] = useState(60);
  const plane = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const pool = wines.filter(
    (w) => (colour === "Any" || w.colour === colour) && w.price <= max,
  );
  const ranked = pool
    .map((w) => ({
      w,
      d: Math.hypot(w.body - point.body, w.wild - point.wild),
    }))
    .sort((a, b) => a.d - b.d)
    .slice(0, 3);

  function fromPointer(e: PointerEvent) {
    const r = plane.current!.getBoundingClientRect();
    setPoint({
      body: clamp(((e.clientX - r.left) / r.width) * 10),
      wild: clamp((1 - (e.clientY - r.top) / r.height) * 10),
    });
  }

  function onKey(e: KeyboardEvent) {
    const step = e.shiftKey ? 2 : 0.5;
    const moves: Record<string, Point> = {
      ArrowLeft: { body: point.body - step, wild: point.wild },
      ArrowRight: { body: point.body + step, wild: point.wild },
      ArrowUp: { body: point.body, wild: point.wild + step },
      ArrowDown: { body: point.body, wild: point.wild - step },
    };
    const next = moves[e.key];
    if (!next) return;
    e.preventDefault();
    setPoint({ body: clamp(next.body), wild: clamp(next.wild) });
  }

  const describe = (p: Point) =>
    `${p.body <= 3 ? "light" : p.body >= 7 ? "full" : "medium"}-bodied, ${p.wild <= 3 ? "clean" : p.wild >= 7 ? "wild" : "a little wild"}`;

  return (
    <div className="finder">
      <div className="finder-controls">
        <fieldset className="chips">
          <legend>Colour</legend>
          {(["Any", ...colours] as const).map((c) => (
            <button
              key={c}
              type="button"
              className="chip"
              aria-pressed={colour === c}
              onClick={() => setColour(c)}
            >
              {c}
            </button>
          ))}
        </fieldset>
        <div className="range-field">
          <label htmlFor="finder-max">
            Up to <b className="num">{money(max)}</b> a bottle
          </label>
          <input
            id="finder-max"
            type="range"
            min={22}
            max={60}
            step={2}
            value={max}
            onChange={(e) => setMax(Number(e.target.value))}
          />
        </div>
        <fieldset className="presets">
          <legend>Or start from a mood</legend>
          {finder.presets.map((p) => (
            <button
              key={p.label}
              type="button"
              className="preset"
              aria-pressed={p.body === point.body && p.wild === point.wild}
              onClick={() => setPoint({ body: p.body, wild: p.wild })}
            >
              {p.label}
            </button>
          ))}
        </fieldset>
      </div>

      <div className="palate-wrap">
        <div
          className="palate"
          ref={plane}
          onPointerDown={(e) => {
            dragging.current = true;
            e.currentTarget.setPointerCapture(e.pointerId);
            fromPointer(e);
          }}
          onPointerMove={(e) => dragging.current && fromPointer(e)}
          onPointerUp={() => (dragging.current = false)}
          onPointerCancel={() => (dragging.current = false)}
        >
          <span className="axis axis-x-low">{finder.axes.body.low}</span>
          <span className="axis axis-x-high">{finder.axes.body.high}</span>
          <span className="axis axis-y-high">{finder.axes.wild.high}</span>
          <span className="axis axis-y-low">{finder.axes.wild.low}</span>
          {wines.map((w) => {
            const rank = ranked.findIndex((r) => r.w === w);
            return (
              <span
                key={w.id}
                className="dot"
                data-colour={w.colour}
                data-out={pool.includes(w) ? undefined : ""}
                data-rank={rank >= 0 ? rank + 1 : undefined}
                style={{
                  left: w.body * 10 + "%",
                  top: 100 - w.wild * 10 + "%",
                }}
                aria-hidden="true"
              >
                {rank >= 0 && <i>{rank + 1}</i>}
              </span>
            );
          })}
          <button
            type="button"
            className="glass-marker"
            style={{
              left: point.body * 10 + "%",
              top: 100 - point.wild * 10 + "%",
            }}
            aria-label={`Your taste: ${describe(point)}. Use the arrow keys to move.`}
            aria-describedby="finder-help"
            onKeyDown={onKey}
          >
            <svg viewBox="0 0 24 32" aria-hidden="true">
              <path d="M4 2h16l-1 10a7 7 0 0 1-14 0Z" />
              <path d="M12 19v10M7 30h10" />
            </svg>
          </button>
        </div>
        <p id="finder-help" className="quiet">
          Drag the glass, tap anywhere on the map, or focus it and use the arrow
          keys (Shift for bigger steps).
        </p>
      </div>

      <div className="finder-results">
        <h3 aria-live="polite">
          {ranked.length
            ? `Closest to ${describe(point)}`
            : "Nothing on the shelf matches those filters"}
        </h3>
        {ranked.length ? (
          <ol>
            {ranked.map(({ w, d }, i) => (
              <li key={w.id} className="match">
                <span className="match-rank" aria-hidden="true">
                  {i + 1}
                </span>
                <Bottle wine={w} className="bottle-mini" />
                <div className="match-body">
                  <Link to={"/wines/" + w.id} className="match-name">
                    {w.name}
                  </Link>
                  <p>
                    {w.colour} · {w.grapes} · {w.region}
                  </p>
                  <p className="match-why">
                    {Math.max(0, Math.round(100 - d * 9))}% match:{" "}
                    {why(w, point)}.
                  </p>
                </div>
                <button
                  type="button"
                  className="btn btn-small btn-ghost"
                  onClick={() =>
                    addLine({
                      kind: "wine",
                      id: w.id,
                      name: w.name,
                      detail: "75 cl",
                      unit: w.price,
                      qty: 1,
                    })
                  }
                  aria-label={`Add ${w.name} to your case, ${money(w.price)}`}
                >
                  <span className="num">{money(w.price)}</span>{" "}
                  <Plus size={16} aria-hidden="true" />
                </button>
              </li>
            ))}
          </ol>
        ) : (
          <p>
            Try another colour or raise the price limit.{" "}
            <button
              type="button"
              className="text-btn"
              onClick={() => (setColour("Any"), setMax(60))}
            >
              Clear filters
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
