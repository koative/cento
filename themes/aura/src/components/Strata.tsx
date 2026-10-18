import type { CSSProperties } from "react";
import { Link } from "../router";
import { steps, type Step } from "../content";
import type { RitualStep } from "../lib/ritual";

type Props = {
  ritual: RitualStep[];
  onSwap?: (step: Step, id: string) => void;
};

/**
 * The ritual drawn as layers on skin: first step at the bottom, each band as thick as its texture.
 * DOM order is application order; the column is reversed visually so layers build upward.
 */
export function Strata({ ritual, onSwap }: Props) {
  return (
    <ol className="strata">
      {ritual.map(({ step, product, options }, i) => (
        <li
          key={step + product.id}
          className="stratum"
          style={
            {
              "--tint": product.tint,
              "--w": product.weight,
              "--i": i,
            } as CSSProperties
          }
        >
          <span className="stratum-n" aria-hidden="true">
            {i + 1}
          </span>
          <div className="stratum-text">
            <span className="stratum-step">
              <span className="visually-hidden">Step {i + 1}: </span>
              {steps.find((s) => s.id === step)?.verb}
            </span>
            <Link to={"/shop/" + product.id} className="stratum-name">
              {product.name}
            </Link>
            <span className="stratum-how">
              {product.amount} ·{" "}
              {product.seconds < 60
                ? `${product.seconds} sec`
                : `${product.seconds / 60} min`}
            </span>
          </div>
          {onSwap && options.length > 1 && (
            <label className="stratum-swap">
              <span className="visually-hidden">
                Choose the{" "}
                {steps.find((s) => s.id === step)?.label.toLowerCase()} product
              </span>
              <select
                value={product.id}
                onChange={(e) => onSwap(step, e.target.value)}
              >
                {options.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.name}
                  </option>
                ))}
              </select>
            </label>
          )}
        </li>
      ))}
    </ol>
  );
}
