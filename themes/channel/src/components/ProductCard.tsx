import { Link } from "../router";
import type { Product } from "../content";
import { money } from "../lib/format";
import { Mockup } from "./Mockup";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <Link to={"/shop/" + product.id} className="product-card-link">
        <div className="product-plate">
          <Mockup kind={product.kind} color={product.colors[0]} label="" />
          {product.tag && <span className="tag">{product.tag}</span>}
        </div>
        <h3>{product.name}</h3>
      </Link>
      <p className="product-meta">
        <span className="price">{money(product.price)}</span>
        {product.colors.length > 1 && (
          <span
            className="swatches"
            aria-label={product.colors.map((c) => c.name).join(", ")}
          >
            {product.colors.map((c) => (
              <span key={c.name} style={{ background: c.hex }} />
            ))}
          </span>
        )}
      </p>
    </article>
  );
}
