import { Minus, Plus } from "lucide-react";
import { Link } from "../router";
import type { Product } from "../content";
import { money } from "../lib/cart";

export function ProductCard({
  product,
  eager = false,
}: {
  product: Product;
  eager?: boolean;
}) {
  const img = product.images[0];
  const from = Math.min(...product.sizes.map((s) => s.price));
  return (
    <article className="product-card">
      <div className="product-card-img">
        <img
          src={img.src}
          alt=""
          width={img.w}
          height={img.h}
          loading={eager ? "eager" : "lazy"}
        />
        {product.note && <span className="product-note">{product.note}</span>}
      </div>
      <h3>
        <Link to={"/shop/" + product.id}>{product.name}</Link>
      </h3>
      <p className="product-card-short">{product.short}</p>
      <p className="tag">from {money(from)}</p>
    </article>
  );
}

export function Qty({
  value,
  onChange,
  label,
  max = 12,
}: {
  value: number;
  onChange: (n: number) => void;
  label: string;
  max?: number;
}) {
  return (
    <div className="qty" role="group" aria-label={label}>
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= 1}
        aria-label={`Decrease ${label.toLowerCase()}`}
      >
        <Minus size={16} aria-hidden="true" />
      </button>
      <output aria-live="polite">{value}</output>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label={`Increase ${label.toLowerCase()}`}
      >
        <Plus size={16} aria-hidden="true" />
      </button>
    </div>
  );
}
