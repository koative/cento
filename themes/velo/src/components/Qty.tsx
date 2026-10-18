import { Minus, Plus } from "lucide-react";
import { MAX_QTY } from "../lib/cart";

export function Qty({
  value,
  onChange,
  label,
}: {
  value: number;
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
      <output className="num" aria-live="polite">
        {value}
      </output>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= MAX_QTY}
        aria-label="One more"
      >
        <Plus size={16} aria-hidden="true" />
      </button>
    </div>
  );
}
