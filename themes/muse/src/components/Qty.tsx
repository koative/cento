import { Minus, Plus } from "lucide-react";
import { MAX_QTY } from "../lib/cart";

/** Quantity stepper; `min` 0 lets the bag remove a line with the minus button. */
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
        aria-label="Decrease quantity"
      >
        <Minus size={14} aria-hidden="true" />
      </button>
      <output aria-live="polite">{value}</output>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= MAX_QTY}
        aria-label="Increase quantity"
      >
        <Plus size={14} aria-hidden="true" />
      </button>
    </div>
  );
}
