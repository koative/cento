import type { Product } from "../content";
import { Link } from "../router";
import { money } from "../lib/cart";
import { buyable, dayLabel, at, dropOf, soldOut, useNow } from "../lib/time";
import { Flat } from "./Flat";

export function ProductCard({ product }: { product: Product }) {
  const now = useNow();
  const drop = dropOf(product);
  const live = buyable(product, now);
  const status = !live
    ? drop.mode === "raffle"
      ? "Raffle only"
      : `Drops ${dayLabel(at(drop.date))}`
    : soldOut(product)
      ? "Sold out"
      : product.stock.reduce((a, b) => a + b, 0) <= 6
        ? "Last few"
        : null;

  return (
    <article
      className="product-card"
      data-soldout={live && soldOut(product) ? "" : undefined}
    >
      <Link to={`/shop/${product.id}`} className="product-card-link">
        <div className="plate">
          <Flat product={product} />
          {status && <span className="tag">{status}</span>}
        </div>
        <h3>{product.name}</h3>
      </Link>
      <p className="product-card-meta">
        <span className="num">{money(product.price)}</span>
        <span>
          {product.colors.length}{" "}
          {product.colors.length === 1 ? "colour" : "colours"}
        </span>
      </p>
    </article>
  );
}
