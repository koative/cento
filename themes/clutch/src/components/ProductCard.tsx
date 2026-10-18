import { Link } from "../router";
import type { Product } from "../content";
import { money } from "../lib/format";
import { MerchArt } from "./MerchArt";

export function ProductCard({ product: p }: { product: Product }) {
  return (
    <li>
      <Link to={`/shop/${p.id}`} className="product-card">
        <span className="product-stage cut">
          <MerchArt product={p} />
          {p.badge && <span className="badge">{p.badge}</span>}
        </span>
        <strong>{p.name}</strong>
        <span className="product-line">
          <span className="num">{money(p.price)}</span>
          <span>
            {p.nameplate
              ? "Name print available"
              : p.sizes.length > 1
                ? `${p.sizes.length} sizes`
                : p.sizes[0]}
          </span>
        </span>
      </Link>
    </li>
  );
}
