import { Minus, Plus } from "lucide-react";

type Props = {
  value: number;
  onChange: (n: number) => void;
  label: string;
  min?: number;
  max?: number;
};

export function Qty({ value, onChange, label, min = 1, max = 20 }: Props) {
  return (
    <div className="qty" role="group" aria-label={label}>
      <button
        type="button"
        aria-label={"Decrease " + label}
        disabled={value <= min}
        onClick={() => onChange(value - 1)}
      >
        <Minus size={16} aria-hidden="true" />
      </button>
      <output aria-live="polite">{value}</output>
      <button
        type="button"
        aria-label={"Increase " + label}
        disabled={value >= max}
        onClick={() => onChange(value + 1)}
      >
        <Plus size={16} aria-hidden="true" />
      </button>
    </div>
  );
}
