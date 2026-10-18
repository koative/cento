import type { CSSProperties } from "react";

type Option = { id: string; name: string; hex: string; price?: number };

type Props = {
  legend: string;
  name: string;
  options: Option[];
  value: string;
  onChange: (id: string) => void;
  showPrice?: (price: number) => string;
};

/** Native radios drawn as paint chips, so arrow keys and forms work as usual. */
export function Swatches({
  legend,
  name,
  options,
  value,
  onChange,
  showPrice,
}: Props) {
  const current = options.find((o) => o.id === value) ?? options[0];
  return (
    <fieldset className="swatches">
      <legend>
        {legend} <strong>{current.name}</strong>
        {showPrice && current.price !== undefined && (
          <span className="num"> {showPrice(current.price)}</span>
        )}
      </legend>
      <div className="swatch-row">
        {options.map((o) => (
          <label
            key={o.id}
            className="swatch"
            style={{ "--swatch": o.hex } as CSSProperties}
            title={o.name}
          >
            <input
              type="radio"
              name={name}
              value={o.id}
              checked={o.id === value}
              onChange={() => onChange(o.id)}
            />
            <span className="sr-only">{o.name}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
