import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import {
  faces,
  frames,
  materials,
  shapes,
  shopCopy,
  type FaceShape,
  type Frame,
  type Shape,
} from "../content";
import { FrameCard } from "../components/FrameCard";
import { plural } from "../lib/cart";

const sorts: Record<
  string,
  { label: string; fn: (a: Frame, b: Frame) => number }
> = {
  featured: { label: "Featured", fn: () => 0 },
  "price-asc": { label: "Price, low to high", fn: (a, b) => a.price - b.price },
  "price-desc": {
    label: "Price, high to low",
    fn: (a, b) => b.price - a.price,
  },
  light: { label: "Lightest first", fn: (a, b) => a.weight - b.weight },
  name: { label: "Name, A to Z", fn: (a, b) => a.name.localeCompare(b.name) },
};

const lines = [
  { id: "all", label: "All" },
  { id: "optical", label: "Optical" },
  { id: "sun", label: "Sun" },
];

const widths = ["Narrow", "Medium", "Wide"] as const;

export function Frames() {
  const query = new URLSearchParams(window.location.hash.split("?")[1]);
  const [line, setLine] = useState(query.get("line") === "sun" ? "sun" : "all");
  const [face, setFace] = useState<FaceShape | "any">(
    (faces.find((f) => f.id === query.get("face"))?.id as FaceShape) ?? "any",
  );
  const [picked, setPicked] = useState<Shape[]>([]);
  const [mats, setMats] = useState<string[]>([]);
  const [width, setWidth] = useState("any");
  const [sort, setSort] = useState("featured");
  const [open, setOpen] = useState(false);

  const toggle = <T,>(list: T[], value: T) =>
    list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

  const results = frames
    .filter(
      (f) =>
        (line === "all" || f.line === line) &&
        (face === "any" || f.faces.includes(face)) &&
        (!picked.length || picked.includes(f.shape)) &&
        (!mats.length || mats.includes(f.material)) &&
        (width === "any" || f.sizes.some((s) => s.label === width)),
    )
    .sort(sorts[sort].fn);

  const active =
    Number(line !== "all") +
    Number(face !== "any") +
    picked.length +
    mats.length +
    Number(width !== "any");

  function reset() {
    setLine("all");
    setFace("any");
    setPicked([]);
    setMats([]);
    setWidth("any");
  }

  return (
    <div className="page shop">
      <header className="page-head">
        <h1>{shopCopy.title}</h1>
        <p className="lede">{shopCopy.intro}</p>
      </header>

      <div className="shop-bar">
        <div className="segmented" role="radiogroup" aria-label="Range">
          {lines.map((l) => (
            <label key={l.id}>
              <input
                type="radio"
                name="line"
                value={l.id}
                checked={line === l.id}
                onChange={() => setLine(l.id)}
              />
              <span>{l.label}</span>
            </label>
          ))}
        </div>
        <button
          type="button"
          className="btn btn-quiet filter-toggle"
          aria-expanded={open}
          aria-controls="filters"
          onClick={() => setOpen(!open)}
        >
          <SlidersHorizontal size={18} aria-hidden="true" /> Filters
          {active ? ` (${active})` : ""}
        </button>
        <label className="sort">
          <span>Sort by</span>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            {Object.entries(sorts).map(([key, s]) => (
              <option key={key} value={key}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="shop-body">
        <aside
          id="filters"
          className="filters"
          data-open={open || undefined}
          aria-label="Filters"
        >
          <fieldset>
            <legend>Face shape</legend>
            <select
              aria-label="Face shape"
              value={face}
              onChange={(e) => setFace(e.target.value as FaceShape | "any")}
            >
              <option value="any">Any face shape</option>
              {faces.map((f) => (
                <option key={f.id} value={f.id}>
                  Suits {f.name.toLowerCase()} faces
                </option>
              ))}
            </select>
          </fieldset>
          <fieldset>
            <legend>Shape</legend>
            {shapes.map((s) => (
              <label key={s.id} className="check">
                <input
                  type="checkbox"
                  checked={picked.includes(s.id)}
                  onChange={() => setPicked(toggle(picked, s.id))}
                />
                {s.label}
                <span className="check-count">
                  {frames.filter((f) => f.shape === s.id).length}
                </span>
              </label>
            ))}
          </fieldset>
          <fieldset>
            <legend>Material</legend>
            {materials.map((m) => (
              <label key={m} className="check">
                <input
                  type="checkbox"
                  checked={mats.includes(m)}
                  onChange={() => setMats(toggle(mats, m))}
                />
                {m}
              </label>
            ))}
          </fieldset>
          <fieldset>
            <legend>Available width</legend>
            {["any", ...widths].map((w) => (
              <label key={w} className="check">
                <input
                  type="radio"
                  name="width"
                  checked={width === w}
                  onChange={() => setWidth(w)}
                />
                {w === "any" ? "Any width" : w}
              </label>
            ))}
            <p className="field-hint">{shopCopy.fitNote}</p>
          </fieldset>
          <button
            type="button"
            className="text-button"
            onClick={reset}
            disabled={!active}
          >
            Clear all filters
          </button>
        </aside>

        <section className="results" aria-labelledby="results-count">
          <h2 id="results-count" className="results-count" aria-live="polite">
            {plural(results.length, "frame")}
          </h2>
          {results.length ? (
            <div className="frame-grid">
              {results.map((f) => (
                <FrameCard key={f.id} frame={f} />
              ))}
            </div>
          ) : (
            <div className="empty">
              <p>
                No frames match all of those filters. Try removing a shape or
                widening the material.
              </p>
              <button type="button" className="btn" onClick={reset}>
                Clear all filters
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
