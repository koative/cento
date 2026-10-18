import { Minus, Plus } from "lucide-react";

type Props = {
  label: string;
  value: number;
  min?: number;
  max: number;
  onChange: (n: number) => void;
  detail?: string;
};

/** A labelled −/+ counter; the number is announced on change. */
export function Stepper({
  label,
  value,
  min = 0,
  max,
  onChange,
  detail,
}: Props) {
  return (
    <div className="stepper" role="group" aria-label={label}>
      <span className="stepper-label">
        {label}
        {detail && <small>{detail}</small>}
      </span>
      <span className="stepper-controls">
        <button
          type="button"
          aria-label={`Fewer: ${label}`}
          disabled={value <= min}
          onClick={() => onChange(value - 1)}
        >
          <Minus aria-hidden="true" />
        </button>
        <output aria-live="polite">{value}</output>
        <button
          type="button"
          aria-label={`More: ${label}`}
          disabled={value >= max}
          onClick={() => onChange(value + 1)}
        >
          <Plus aria-hidden="true" />
        </button>
      </span>
    </div>
  );
}
