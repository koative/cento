import { useState } from "react";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { Link } from "../router";
import { beers, pickup, products, type Product } from "../content";
import { money } from "../lib/util";
import { addToCart } from "../lib/cart";
import { ProductArt } from "../components/Art";
import { ProductTile, Qty } from "../components/Tiles";

export function ProductPage({ product }: { product: Product }) {
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState("");
  const variant = product.variants.find((v) => v.id === variantId)!;
  const beer = beers.find((b) => b.slug === product.beer);
  // Bottle limits count bottles, so a "pair" uses two of them.
  const max = product.limit
    ? Math.floor(product.limit / (variant.id === "pair" ? 2 : 1))
    : 24;
  const related = products
    .filter((p) => p.id !== product.id && p.kind === product.kind)
    .concat(products.filter((p) => p.kind !== product.kind))
    .slice(0, 4);

  const choose = (id: string) => {
    setVariantId(id);
    setQty(1);
    setAdded("");
  };

  const add = () => {
    addToCart(product, variant, qty);
    setAdded(
      `Added ${qty} × ${product.name} (${variant.label}) to your pickup order.`,
    );
  };

  return (
    <>
      <div className="wrap crumbs">
        <Link to="/shop" className="link-back">
          <ArrowLeft aria-hidden="true" /> Shop
        </Link>
      </div>

      <section className="wrap product">
        <div className="product-art">
          <ProductArt product={product} />
        </div>
        <div className="product-copy">
          <h1>{product.name}</h1>
          {beer && (
            <p className="beer-hero-style">
              <Link to={`/beers/${beer.slug}`}>{beer.style}</Link> ·{" "}
              {beer.abv.toFixed(1)}% ABV · {beer.ibu} IBU
            </p>
          )}
          <p className="product-price tnum">{money(variant.price * qty)}</p>
          <p className="lede">{product.text}</p>

          <fieldset className="variant">
            <legend>{product.variantLabel}</legend>
            <div className="variant-options">
              {product.variants.map((v) => (
                <label key={v.id} className="variant-option">
                  <input
                    type="radio"
                    name="variant"
                    value={v.id}
                    checked={variantId === v.id}
                    onChange={() => choose(v.id)}
                  />
                  <span>
                    {v.label}
                    {product.kind !== "apparel" && product.kind !== "gift" && (
                      <span className="tnum"> {money(v.price)}</span>
                    )}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="buy-row">
            <Qty
              value={qty}
              onChange={setQty}
              label={`Quantity of ${product.name}`}
              max={max}
            />
            <button
              type="button"
              className="btn btn-copper btn-lg"
              onClick={add}
            >
              <ShoppingBag aria-hidden="true" /> Add to pickup order
            </button>
          </div>
          {product.limit && (
            <p className="quiet-note">
              Limit {product.limit} bottles per person, checked at pickup.
            </p>
          )}
          <p className="added" aria-live="polite">
            {added && (
              <>
                {added} <Link to="/cart">Review order</Link>
              </>
            )}
          </p>

          <ul className="ticks">
            {product.details.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
          <p className="status-line">
            <strong>{pickup.title}.</strong> {pickup.text}
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="more-title">
        <div className="wrap">
          <div className="section-head section-head-row">
            <h2 id="more-title">Also in the fridge</h2>
            <Link to="/shop">Whole shop</Link>
          </div>
          <div className="product-grid product-grid-short">
            {related.map((p) => (
              <ProductTile key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
