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
  const [first, second] = product.images;
  const colours = product.colours.map((c) => c.name).join(", ");
  return (
    <article className="product-card">
      <Link to={`/shop/${product.id}`} className="product-card-link">
        <div className="product-card-media">
          <img
            src={first}
            alt={product.alt}
            loading={eager ? "eager" : "lazy"}
          />
          {second && (
            <img
              className="product-card-alt"
              src={second}
              alt=""
              loading="lazy"
            />
          )}
          {product.isNew && <span className="tag">New</span>}
        </div>
        <h3>{product.name}</h3>
      </Link>
      <p className="product-card-meta">
        <span className="price">{money(product.price)}</span>
        <span
          className="swatches"
          role="img"
          aria-label={`Colours: ${colours}`}
        >
          {product.colours.map((c) => (
            <span
              key={c.name}
              className="swatch"
              style={{ background: c.hex }}
            />
          ))}
        </span>
      </p>
    </article>
  );
}
