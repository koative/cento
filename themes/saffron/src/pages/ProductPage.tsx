import { useState } from "react";
import { ArrowRight, Check, Clock, MapPin } from "lucide-react";
import { Link } from "../router";
import { aisles, products, recipes, type Product } from "../content";
import { PriceCard, ProductCard, Qty, useFlash } from "../components/Shelf";
import { addItem, money } from "../lib/cart";

export function ProductPage({ product }: { product: Product }) {
  const aisle = aisles.find((a) => a.id === product.aisle)!;
  const [variant, setVariant] = useState(0);
  const [qty, setQty] = useState(1);
  const [swap, setSwap] = useState(true);
  const [added, flash] = useFlash(4000);
  const option = product.variants[variant];

  const usedIn = recipes.filter((r) =>
    r.ingredients.some((i) => i.product?.id === product.id),
  );
  const related = products
    .filter((p) => p.aisle === product.aisle && p.id !== product.id)
    .slice(0, 4);
  const fill =
    related.length < 4
      ? products
          .filter((p) => p.aisle !== product.aisle)
          .slice(0, 4 - related.length)
      : [];

  return (
    <div className="page product-page">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/aisles">Aisles</Link>
        <span aria-hidden="true">/</span>
        <Link to={"/aisles/" + aisle.id}>{aisle.name}</Link>
      </nav>

      <div className="product-layout">
        <figure className="product-photo">
          <img {...product.photo} />
          <PriceCard product={product} variant={variant} />
        </figure>

        <div className="product-buy">
          <h1>{product.name}</h1>
          <p className="lede">{product.blurb}</p>
          <p className="origin">
            <MapPin size={16} aria-hidden="true" /> {product.grower} ·{" "}
            {product.origin}
          </p>
          {product.tags.length > 0 && (
            <ul className="tag-list" aria-label="Labels">
              {product.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          )}

          <fieldset className="variants">
            <legend>Choose</legend>
            {product.variants.map((v, i) => (
              <label key={v.label} className="variant">
                <input
                  type="radio"
                  name="variant"
                  checked={variant === i}
                  onChange={() => setVariant(i)}
                />
                <span>{v.label}</span>
                <strong>{money(v.price)}</strong>
              </label>
            ))}
          </fieldset>

          <div className="buy-row">
            <Qty
              value={qty}
              onChange={setQty}
              label={`Quantity of ${product.name}`}
            />
            <button
              type="button"
              className="btn btn-lg"
              onClick={() => {
                addItem(product.id, variant, qty, swap);
                flash();
              }}
            >
              {added ? <Check size={20} aria-hidden="true" /> : null}
              {added
                ? "In your basket"
                : `Add to basket · ${money(option.price * qty)}`}
            </button>
          </div>

          <label className="check">
            <input
              type="checkbox"
              checked={swap}
              onChange={(e) => setSwap(e.target.checked)}
            />
            <span>
              If it's out on the day, let my picker choose the closest match at
              the same price or less.
            </span>
          </label>

          <p className="added-note" aria-live="polite">
            {added && (
              <>
                Added {qty} × {option.label}.{" "}
                <Link to="/basket" className="text-link">
                  View basket <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </>
            )}
          </p>
        </div>
      </div>

      <section className="product-details">
        <div>
          <h2>About it</h2>
          <p>{product.description}</p>
        </div>
        <dl className="spec">
          <div>
            <dt>Grown or made by</dt>
            <dd>{product.grower}</dd>
          </div>
          <div>
            <dt>From</dt>
            <dd>{product.origin}</dd>
          </div>
          <div>
            <dt>Keeping it</dt>
            <dd>{product.storage}</dd>
          </div>
          <div>
            <dt>Allergens</dt>
            <dd>{product.allergens ?? "None of the 14 major allergens."}</dd>
          </div>
        </dl>
      </section>

      {usedIn.length > 0 && (
        <section className="section used-in">
          <h2>Cook it</h2>
          <ul>
            {usedIn.map((r) => (
              <li key={r.slug}>
                <Link to={"/recipes/" + r.slug} className="used-in-row">
                  <img
                    src={r.photo.src}
                    alt=""
                    width={r.photo.width}
                    height={r.photo.height}
                    loading="lazy"
                  />
                  <span>{r.name}</span>
                  <span className="meta">
                    <Clock size={14} aria-hidden="true" /> {r.minutes} min
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="section">
        <h2>Also on the shelf</h2>
        <div className="product-grid">
          {[...related, ...fill].map((p) => (
            <ProductCard product={p} key={p.id} />
          ))}
        </div>
      </section>
    </div>
  );
}
