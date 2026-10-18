import { Check, Plus } from "lucide-react";
import { Link } from "../router";
import {
  levels,
  stylists,
  type Look,
  type Product,
  type Stylist,
} from "../content";
import { money } from "../lib/plan";
import { toggleProduct, useVisit } from "../lib/visit";
import { ProductArt } from "./ProductArt";

export function LookTile({
  look,
  lazy = true,
}: {
  look: Look;
  lazy?: boolean;
}) {
  const by = stylists.find((s) => s.id === look.stylist);
  return (
    <Link to={`/lookbook/${look.id}`} className="look-tile">
      <span className="look-frame">
        <img
          src={look.photo.src}
          alt={look.photo.alt}
          width={look.photo.w}
          height={look.photo.h}
          loading={lazy ? "lazy" : undefined}
        />
      </span>
      <span className="look-name">{look.name}</span>
      <span className="look-meta">
        {look.category} · {by?.name}
      </span>
    </Link>
  );
}

export function StylistTile({ stylist }: { stylist: Stylist }) {
  return (
    <Link to={`/stylists/${stylist.id}`} className="stylist-tile">
      <span className="stylist-frame">
        <img
          src={stylist.photo.src}
          alt=""
          width={stylist.photo.w}
          height={stylist.photo.h}
          loading="lazy"
        />
      </span>
      <span className="stylist-name">{stylist.name}</span>
      <span className="stylist-role">
        {stylist.role} · {levels[stylist.level].label}
      </span>
      <span className="stylist-short">{stylist.short}</span>
    </Link>
  );
}

export function ProductItem({ product }: { product: Product }) {
  const { products } = useVisit();
  const held = products.includes(product.id);
  return (
    <article className="product" data-held={held ? "" : undefined}>
      <ProductArt product={product} />
      <div className="product-body">
        <h3>{product.name}</h3>
        <p className="product-kind">
          {product.kind} · {product.size}
        </p>
        <p>{product.blurb}</p>
        <p className="product-use">{product.use}</p>
      </div>
      <div className="product-foot">
        <span className="price num">{money(product.price)}</span>
        <button
          type="button"
          className="btn btn-small"
          aria-pressed={held}
          onClick={() => toggleProduct(product.id)}
        >
          {held ? (
            <Check aria-hidden="true" size={16} />
          ) : (
            <Plus aria-hidden="true" size={16} />
          )}
          Set aside
        </button>
      </div>
    </article>
  );
}
