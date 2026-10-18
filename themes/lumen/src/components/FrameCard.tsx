import { Minus, Plus } from "lucide-react";
import { Link } from "../router";
import { shapes, type Frame, type Size } from "../content";
import { money } from "../lib/cart";
import { FrameArt } from "./FrameArt";

/** The measurements printed inside a temple: lens □ bridge – temple, in millimetres. */
export const stamp = (s: Size) => `${s.lens}□${s.bridge}-${s.temple}`;

export const shapeLabel = (frame: Frame) =>
  shapes.find((s) => s.id === frame.shape)?.label ?? frame.shape;

export function FrameCard({
  frame,
  headingLevel = 3,
}: {
  frame: Frame;
  headingLevel?: 2 | 3;
}) {
  const H = `h${headingLevel}` as const;
  return (
    <article className="frame-card">
      <Link to={`/frames/${frame.id}`} className="frame-card-link">
        <div className="frame-tile">
          <FrameArt
            frame={frame}
            colour={frame.colours[0]}
            className="frame-art"
          />
          {frame.isNew && <span className="tag">New</span>}
        </div>
        <div className="frame-card-text">
          <H>{frame.name}</H>
          <p className="price">{money(frame.price)}</p>
          <p className="frame-meta">
            {shapeLabel(frame)} · {frame.material} ·{" "}
            {frame.line === "sun" ? "Sun" : "Optical"}
          </p>
          <p className="frame-swatches">
            <span aria-hidden="true">
              {frame.colours.map((c) => (
                <i key={c.code} style={{ background: c.rim }} />
              ))}
            </span>
            {frame.colours.length} colours ·{" "}
            {frame.sizes.map((s) => s.label).join(", ")}
          </p>
        </div>
      </Link>
    </article>
  );
}

export function Qty({
  value,
  onChange,
  label,
  min = 0,
}: {
  value: number;
  onChange: (n: number) => void;
  label: string;
  min?: number;
}) {
  return (
    <div className="qty" role="group" aria-label={label}>
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label={value === 1 && !min ? `Remove ${label}` : "One fewer"}
      >
        <Minus size={16} aria-hidden="true" />
      </button>
      <output aria-live="polite">{value}</output>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= 10}
        aria-label="One more"
      >
        <Plus size={16} aria-hidden="true" />
      </button>
    </div>
  );
}
