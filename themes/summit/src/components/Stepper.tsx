import { Minus, Plus } from "lucide-react";

type Props = {
  label: string;
  hint?: string;
  value: number;
  min?: number;
  max: number;
  onChange: (n: number) => void;
};

/** Count control with − / + buttons; the value is announced as it changes. */
export function Stepper({ label, hint, value, min = 0, max, onChange }: Props) {
  return (
    <div className="stepper-field" role="group" aria-label={label}>
      <span className="sf-label">
        {label}
        {hint && <small>{hint}</small>}
      </span>
      <span className="sf-controls">
        <button
          type="button"
          className="icon-btn"
          aria-label={`One fewer: ${label}`}
          disabled={value <= min}
          onClick={() => onChange(value - 1)}
        >
          <Minus aria-hidden="true" />
        </button>
        <output aria-live="polite" className="num">
          {value}
        </output>
        <button
          type="button"
          className="icon-btn"
          aria-label={`One more: ${label}`}
          disabled={value >= max}
          onClick={() => onChange(value + 1)}
        >
          <Plus aria-hidden="true" />
        </button>
      </span>
    </div>
  );
}
