import { Minus, Plus } from "lucide-react";

type Props = {
  value: number;
  onChange: (n: number) => void;
  label: string;
  min?: number;
  max?: number;
};

export function Qty({ value, onChange, label, min = 1, max = 10 }: Props) {
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
        disabled={value >= max}
        aria-label="One more"
      >
        <Plus size={16} aria-hidden="true" />
      </button>
    </div>
  );
}
