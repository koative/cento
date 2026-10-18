import { useEffect, useState } from "react";
import { Check, Minus, Plus } from "lucide-react";
import { Link } from "../router";
import type { Product } from "../content";
import { addItem, money, MAX_QTY } from "../lib/cart";

/** The hand-cut fluorescent price card every stall wears. */
export function PriceCard({
  product,
  variant = 0,
}: {
  product: Product;
  variant?: number;
}) {
  return (
    <span className="price-card" data-tone={product.aisle}>
      <strong>{money(product.variants[variant].price)}</strong>
      <small>
        {variant === 0 ? product.unit : product.variants[variant].label}
      </small>
    </span>
  );
}

/** Briefly true after `flash()`; drives "Added" button states. */
export function useFlash(ms = 1600) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (!on) return;
    const t = setTimeout(() => setOn(false), ms);
    return () => clearTimeout(t);
  }, [on, ms]);
  return [on, () => setOn(true)] as const;
}

export function ProductCard({
  product,
  eager = false,
}: {
  product: Product;
  eager?: boolean;
}) {
  const [added, flash] = useFlash();
  const href = `/aisles/${product.aisle}/${product.id}`;
  return (
    <article className="product-card">
      <Link
        to={href}
        className="product-media"
        tabIndex={-1}
        aria-hidden="true"
      >
        <img
          src={product.photo.src}
          alt=""
          width={product.photo.width}
          height={product.photo.height}
          loading={eager ? undefined : "lazy"}
        />
      </Link>
      <PriceCard product={product} />
      <div className="product-body">
        <h3>
          <Link to={href}>{product.name}</Link>
        </h3>
        <p className="product-grower">
          {product.grower}
          {product.miles !== null && product.miles <= 50 && (
            <span>
              {" "}
              · {product.miles ? product.miles + " mi" : "next door"}
            </span>
          )}
        </p>
        <button
          type="button"
          className="add-btn"
          data-added={added || undefined}
          onClick={() => {
            addItem(product.id, 0);
            flash();
          }}
          aria-label={`Add ${product.name}, ${product.variants[0].label}, to basket`}
        >
          {added ? (
            <Check size={18} aria-hidden="true" />
          ) : (
            <Plus size={18} aria-hidden="true" />
          )}
          {added ? "Added" : "Add"}
        </button>
      </div>
    </article>
  );
}

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
        disabled={value >= MAX_QTY}
        aria-label="One more"
      >
        <Plus size={16} aria-hidden="true" />
      </button>
    </div>
  );
}
