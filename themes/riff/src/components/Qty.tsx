import { Minus, Plus } from "lucide-react";
import { MAX_QTY } from "../lib/cart";

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
    <div className="qty" role="group" aria-label={`Quantity, ${label}`}>
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label={`One fewer: ${label}`}
      >
        <Minus aria-hidden="true" />
      </button>
      <output aria-live="polite">{value}</output>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= MAX_QTY}
        aria-label={`One more: ${label}`}
      >
        <Plus aria-hidden="true" />
      </button>
    </div>
  );
}
