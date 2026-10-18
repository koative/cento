import { Minus, Plus } from "lucide-react";

export function Qty({
  value,
  onChange,
  label,
  min = 1,
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
        aria-label="One fewer"
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
