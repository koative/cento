import { Link } from "../router";
import type { Product } from "../content";
import { money } from "../lib/format";
import { ProductArt } from "./ProductArt";

export function ProductCard({
  product,
  headingLevel = 3,
}: {
  product: Product;
  headingLevel?: 2 | 3;
}) {
  const H = `h${headingLevel}` as const;
  const from = Math.min(...product.variants.map((v) => v.price));
  return (
    <article className="product-card">
      <div className="shelf">
        <ProductArt product={product} />
      </div>
      <H className="product-name">
        <Link to={`/shop/${product.id}`}>{product.name}</Link>
      </H>
      <p className="product-short">{product.short}</p>
      <p className="product-price">
        {product.variants.length > 1 ? "from " : ""}
        {money(from)}
      </p>
    </article>
  );
}
