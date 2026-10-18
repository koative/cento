import { Minus, Plus } from "lucide-react";
import { Link } from "../router";
import type { Colour, Product } from "../content";
import { money } from "../lib/cart";
import { ProductArt } from "./ProductArt";

export function ProductCard({
  product,
  headingLevel = 3,
}: {
  product: Product;
  headingLevel?: 2 | 3;
}) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className="product-card">
      <Link to={"/shop/" + product.id} className="product-card-link">
        <div className="art-tile">
          <ProductArt kind={product.kind} colour={product.colours[0]} />
          {product.badge && <span className="badge">{product.badge}</span>}
        </div>
        <H>{product.name}</H>
      </Link>
      <p className="card-line">{product.line}</p>
      <p className="card-meta">
        <span className="num">{money(product.price)}</span>
        <span
          className="mini-swatches"
          role="img"
          aria-label={`${product.colours.length} colours: ${product.colours.map((c) => c.name).join(", ")}`}
        >
          {product.colours.map((c) => (
            <span key={c.name} style={{ background: c.shell }} />
          ))}
        </span>
      </p>
    </article>
  );
}

export function Swatches({
  colours,
  value,
  onChange,
  name,
}: {
  colours: Colour[];
  value: string;
  onChange: (c: Colour) => void;
  name: string;
}) {
  return (
    <fieldset className="swatches">
      <legend>
        Colour <b>{value}</b>
      </legend>
      <div>
        {colours.map((c) => (
          <label key={c.name} title={c.name}>
            <input
              type="radio"
              name={name}
              value={c.name}
              checked={c.name === value}
              onChange={() => onChange(c)}
            />
            <span style={{ background: c.shell }} aria-hidden="true" />
            <span className="visually-hidden">{c.name}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function Qty({
  value,
  onChange,
  label,
  max = 10,
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
        aria-label="Decrease quantity"
      >
        <Minus size={16} aria-hidden="true" />
      </button>
      <output className="num" aria-live="polite">
        {value}
      </output>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        <Plus size={16} aria-hidden="true" />
      </button>
    </div>
  );
}
