import { useState } from "react";
import { Link } from "../router";
import { barbers, categories, products, type Product } from "../content";
import { addToBag } from "../lib/bag";
import { money } from "../lib/format";
import { ProductArt } from "../components/ProductArt";
import { ProductCard } from "../components/ProductCard";
import { Qty } from "../components/Qty";

function Meter({ label, value }: { label: string; value: number }) {
  return (
    <div className="meter">
      <dt>{label}</dt>
      <dd>
        <span className="meter-steps" aria-hidden="true">
          {[1, 2, 3, 4, 5].map((n) => (
            <span key={n} data-on={n <= value ? "" : undefined} />
          ))}
        </span>
        <span className="sr-only">{value} out of 5</span>
      </dd>
    </div>
  );
}

export function ProductPage({ product }: { product: Product }) {
  const [variant, setVariant] = useState(product.variants[0].id);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState("");
  const v = product.variants.find((x) => x.id === variant)!;
  const by = barbers.find((b) => b.id === product.barberNote.by)!;
  const related = [
    ...products.filter(
      (p) => p.id !== product.id && p.category === product.category,
    ),
    ...products.filter((p) => p.category !== product.category),
  ].slice(0, 3);

  const add = () => {
    addToBag(product, variant, qty);
    setAdded(
      `Added ${qty} × ${product.name}${product.variants.length > 1 ? ` (${v.label})` : ""} to your bag.`,
    );
    setQty(1);
  };

  return (
    <>
      <article className="wrap product">
        <div className="product-stage">
          <ProductArt product={product} />
        </div>
        <div className="product-info">
          <p className="crumbs">
            <Link to="/shop">Shop</Link> /{" "}
            {categories.find((c) => c.id === product.category)!.label}
          </p>
          <h1>{product.name}</h1>
          <p className="lede">{product.short}</p>
          <p className="product-big-price">{money(v.price)}</p>

          {product.variants.length > 1 && (
            <fieldset className="segmented">
              <legend>{product.variantName}</legend>
              <div className="seg-row">
                {product.variants.map((x) => (
                  <label key={x.id} className="seg">
                    <input
                      type="radio"
                      name="variant"
                      value={x.id}
                      checked={variant === x.id}
                      onChange={() => setVariant(x.id)}
                    />
                    <span>
                      {x.label} · {money(x.price)}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          <div className="buy-row">
            <Qty value={qty} onChange={setQty} label={product.name} />
            <button type="button" className="btn btn-red" onClick={add}>
              Add to bag · {money(v.price * qty)}
            </button>
          </div>
          <p className="added" aria-live="polite">
            {added && (
              <>
                {added} <Link to="/bag">View bag</Link>
              </>
            )}
          </p>

          {product.hold !== undefined && (
            <dl className="meters">
              <Meter label="Hold" value={product.hold} />
              <Meter label="Shine" value={product.shine ?? 0} />
            </dl>
          )}

          <blockquote className="barber-note">
            <p>{product.barberNote.text}</p>
            <footer>
              <Link to={`/barbers/${by.id}`}>{by.name}</Link>, chair {by.chair}
            </footer>
          </blockquote>
        </div>
      </article>

      <section className="wrap product-detail" aria-label="Product details">
        <div>
          <h2>What it is</h2>
          <p>{product.description}</p>
        </div>
        <div>
          <h2>How to use it</h2>
          <p>{product.use}</p>
        </div>
        <div>
          <h2>What's in it</h2>
          <p>{product.ingredients}</p>
        </div>
      </section>

      <section className="wrap related" aria-labelledby="related-title">
        <h2 id="related-title">On the same shelf</h2>
        <div className="product-grid">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}
