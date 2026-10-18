import type { Product } from "../content";
import { Link } from "../router";
import { money } from "../lib/cart";
import { noticeLabel } from "../lib/time";

export function ProductCard({
  product,
  eager = false,
}: {
  product: Product;
  eager?: boolean;
}) {
  const from = Math.min(...product.sizes.map((s) => s.price));
  return (
    <article className="product-card">
      <img
        src={product.image}
        alt=""
        width={600}
        height={450}
        loading={eager ? "eager" : "lazy"}
      />
      <div className="product-card-body">
        <h3>
          <Link to={`/shop/${product.id}`}>{product.name}</Link>
        </h3>
        <p>{product.blurb}</p>
        <p className="tag">
          <span>
            {product.sizes.length > 1 ? `from ${money(from)}` : money(from)}
          </span>
          <span>{noticeLabel(product.leadDays)}</span>
        </p>
      </div>
    </article>
  );
}
