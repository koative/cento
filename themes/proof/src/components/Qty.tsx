import { Minus, Plus } from "lucide-react";
import { MAX_QTY } from "../lib/cart";

type Props = {
  value: number;
  onChange: (n: number) => void;
  label: string;
  min?: number;
};

export function Qty({ value, onChange, label, min = 1 }: Props) {
  return (
    <div className="qty" role="group" aria-label={`Quantity of ${label}`}>
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label={`One fewer ${label}`}
      >
        <Minus size={16} aria-hidden="true" />
      </button>
      <output aria-live="polite">{value}</output>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= MAX_QTY}
        aria-label={`One more ${label}`}
      >
        <Plus size={16} aria-hidden="true" />
      </button>
    </div>
  );
}
