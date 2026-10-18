import type { ReactNode } from "react";
import { Link } from "../router";
import type { Product } from "../content";
import { money } from "../lib/format";
import { AgeBadge } from "./Block";

export function PriceTag({
  price,
  children,
}: {
  price: number;
  children?: ReactNode;
}) {
  return (
    <span className="price-tag">
      {children}
      {money(price)}
    </span>
  );
}

export function ProductCard({
  product,
  extra,
}: {
  product: Product;
  extra?: ReactNode;
}) {
  return (
    <article className="product-card">
      <div className="product-card-media">
        <img
          src={product.image.src}
          alt=""
          width={product.image.w}
          height={product.image.h}
          loading="lazy"
        />
        <AgeBadge ageMin={product.ageMin} ageMax={product.ageMax} />
      </div>
      <div className="product-card-body">
        <h3>
          <Link to={`/shop/${product.id}`}>{product.name}</Link>
        </h3>
        <p>{product.blurb}</p>
        <div className="product-card-foot">
          <PriceTag price={product.price}>
            {product.option?.values.some((v) => v.add) ? "from " : ""}
          </PriceTag>
          {product.stock <= 5 && (
            <span className="low-stock">Only {product.stock} left</span>
          )}
        </div>
        {extra}
      </div>
    </article>
  );
}
