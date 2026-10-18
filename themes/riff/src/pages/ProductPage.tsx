import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { products, releases, shipping, type Product } from "../content";
import { Link } from "../router";
import { addLine } from "../lib/cart";
import { money } from "../lib/format";
import { MerchArt } from "../components/MerchArt";
import { ProductCard } from "../components/Cards";
import { Qty } from "../components/Qty";

export function ProductPage({ product }: { product: Product }) {
  const options = product.variant?.options ?? [];
  const [choice, setChoice] = useState(
    options.find((o) => !o.soldOut)?.name ?? "",
  );
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState("");
  const option = options.find((o) => o.name === choice);
  const unit = product.price + (option?.extra ?? 0);
  const release = releases.find(
    (r) => r.slug === product.art.release && product.category === "Records",
  );
  const related = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  function add() {
    addLine(
      {
        key: `merch|${product.id}|${choice}`,
        kind: "merch",
        ref: product.id,
        name: product.name,
        detail: product.variant
          ? `${product.variant.label}: ${choice}`
          : product.category,
        unit,
      },
      qty,
    );
    setAdded(
      `${qty} × ${product.name}${choice ? ` (${choice})` : ""} added to your cart.`,
    );
  }

  return (
    <>
      <div className="wrap crumb">
        <Link to="/merch">
          <ArrowLeft aria-hidden="true" /> All merch
        </Link>
      </div>

      <section className="wrap product-hero">
        <div className="product-stage">
          <MerchArt product={product} />
        </div>
        <div className="product-info">
          <h1 className="display-lg">{product.name}</h1>
          <p className="price">{money(unit)}</p>
          <p className="lede">{product.blurb}</p>

          {product.variant && (
            <fieldset className="chips">
              <legend>{product.variant.label}</legend>
              {options.map((o) => (
                <label
                  key={o.name}
                  className="chip"
                  data-disabled={o.soldOut ? "" : undefined}
                >
                  <input
                    type="radio"
                    name="variant"
                    value={o.name}
                    checked={choice === o.name}
                    disabled={o.soldOut}
                    onChange={() => setChoice(o.name)}
                  />
                  <span>
                    {o.name}
                    {o.extra ? ` +${money(o.extra)}` : ""}
                    {o.soldOut ? " — sold out" : ""}
                  </span>
                </label>
              ))}
            </fieldset>
          )}

          <div className="buy-row">
            <Qty value={qty} onChange={setQty} label={product.name} />
            <button type="button" className="btn btn-red" onClick={add}>
              Add to cart · {money(unit * qty)}
            </button>
          </div>
          <p aria-live="polite" className="added">
            {added && (
              <>
                {added} <Link to="/cart">View cart</Link>
              </>
            )}
          </p>

          <h2 className="box-head">Details</h2>
          <ul className="details">
            {product.details.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
          <p className="quiet">
            Ships in 3 working days. Free US shipping over{" "}
            {money(shipping.freeOver)}. Or choose “Pick up at a show” at
            checkout.
          </p>
          {release && (
            <Link to={`/music/${release.slug}`} className="more-link">
              Listen to {release.title} first <ArrowRight aria-hidden="true" />
            </Link>
          )}
        </div>
      </section>

      {related.length > 0 && (
        <section className="section wrap" aria-labelledby="related">
          <h2 id="related" className="display-md">
            More {product.category.toLowerCase()}
          </h2>
          <div className="product-grid">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
