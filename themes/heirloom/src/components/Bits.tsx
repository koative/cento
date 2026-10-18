import { Minus, Plus } from "lucide-react";
import { metals as metalInfo, type Metal } from "../content";

/** Quantity stepper; label names the item so screen readers know which line they change. */
export function Qty({
  value,
  onChange,
  label,
  max,
  min = 1,
}: {
  value: number;
  onChange: (n: number) => void;
  label: string;
  max: number;
  min?: number;
}) {
  return (
    <div className="qty" role="group" aria-label={`Quantity, ${label}`}>
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        aria-label={value - 1 < 1 ? "Remove" : "One fewer"}
        disabled={value <= min}
      >
        <Minus size={16} aria-hidden="true" />
      </button>
      <output aria-live="polite">{value}</output>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        aria-label="One more"
        disabled={value >= max}
      >
        <Plus size={16} aria-hidden="true" />
      </button>
    </div>
  );
}

/** Metal swatches as a native radio group: arrow keys move between them. */
export function MetalPicker({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: Metal[];
  value: Metal;
  onChange: (m: Metal) => void;
}) {
  return (
    <fieldset className="choice-set">
      <legend>
        Metal <span>{metalInfo[value].name}</span>
      </legend>
      <div className="swatches">
        {options.map((m) => (
          <label key={m} className="swatch" data-metal={m}>
            <input
              type="radio"
              name={name}
              value={m}
              checked={value === m}
              onChange={() => onChange(m)}
            />
            <span className="swatch-chip" aria-hidden="true" />
            <span className="swatch-name">
              {metalInfo[m].short}
              {metalInfo[m].surcharge > 0 && (
                <small> +${metalInfo[m].surcharge}</small>
              )}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="faq">
      {items.map((f) => (
        <details key={f.q}>
          <summary>{f.q}</summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}
