import { Minus, Plus } from "lucide-react";

/** A − n + stepper; the number is announced through the group label. */
export function Qty({
  value,
  max,
  onChange,
  label,
}: {
  value: number;
  max: number;
  onChange: (n: number) => void;
  label: string;
}) {
  return (
    <div className="qty" role="group" aria-label={label}>
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= 1}
        aria-label="One fewer"
      >
        <Minus size={16} aria-hidden="true" />
      </button>
      <output aria-live="polite">{value}</output>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label="One more"
      >
        <Plus size={16} aria-hidden="true" />
      </button>
    </div>
  );
}
