import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { Link } from "../router";
import { steps, type Product } from "../content";
import { addLines, money } from "../lib/cart";
import { Vessel } from "./Vessel";

export function ProductCard({
  product,
  headingLevel = 3,
}: {
  product: Product;
  headingLevel?: 2 | 3;
}) {
  const [added, setAdded] = useState(false);
  const H = `h${headingLevel}` as const;
  const size = product.sizes[0];
  const from = product.sizes.length > 1 ? "from " : "";

  return (
    <article className="product-card">
      <Link
        to={"/shop/" + product.id}
        className={"tile tile-" + product.tile}
        tabIndex={-1}
        aria-hidden="true"
      >
        <Vessel product={product} />
      </Link>
      <div className="product-card-body">
        <p className="product-step">
          {steps.find((s) => s.id === product.step)?.label} ·{" "}
          {product.time.length === 2
            ? "AM & PM"
            : product.time[0].toUpperCase()}
        </p>
        <H className="product-name">
          <Link to={"/shop/" + product.id}>{product.name}</Link>
        </H>
        <p className="product-line">{product.line}</p>
        <div className="product-buy">
          <span className="price">
            {from}
            {money(size.price)}
          </span>
          <button
            type="button"
            className="add-quick"
            onClick={() => {
              addLines([
                {
                  id: product.id,
                  name: product.name,
                  size: size.label,
                  unit: size.price,
                  qty: 1,
                },
              ]);
              setAdded(true);
            }}
            aria-label={`Add ${product.name}, ${size.label}, to bag`}
          >
            {added ? (
              <Check size={16} aria-hidden="true" />
            ) : (
              <Plus size={16} aria-hidden="true" />
            )}
            {added ? "Added" : "Add"}
          </button>
        </div>
      </div>
    </article>
  );
}
