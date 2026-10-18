import { useState } from "react";
import { Check, Clock, Droplets, Sprout } from "lucide-react";
import { Link, navigate } from "../router";
import { products, vases, type Product as P } from "../content";
import { ProductCard, Qty } from "../components/ProductCard";
import { addLine, money, MAX_QTY } from "../lib/cart";
import { cutoffMessage, useNow } from "../lib/delivery";

export function Product({ product }: { product: P }) {
  const now = useNow();
  const [shot, setShot] = useState(0);
  const [size, setSize] = useState(
    product.sizes[Math.min(1, product.sizes.length - 1)].id,
  );
  const [vase, setVase] = useState("none");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState("");

  const chosen = product.sizes.find((s) => s.id === size)!;
  const vaseChoice = vases.find((v) => v.id === vase)!;
  const unit = chosen.price + (product.vaseOption ? vaseChoice.price : 0);
  const img = product.images[shot];
  const related = products
    .filter((p) => p.id !== product.id)
    .map((p) => ({
      p,
      score:
        (p.type === product.type ? 2 : 0) +
        p.occasions.filter((o) => product.occasions.includes(o)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((r) => r.p);

  function add(goToCheckout: boolean) {
    const detail = [
      chosen.label,
      product.vaseOption && vase !== "none" ? vaseChoice.label : "",
    ]
      .filter(Boolean)
      .join(" · ");
    addLine({
      id: product.id,
      kind: "product",
      name: product.name,
      detail,
      unit,
      qty,
      image: product.images[0].src,
      to: "/shop/" + product.id,
    });
    if (goToCheckout) navigate("/checkout");
    else setAdded(`${qty} × ${product.name} (${detail}) added to your bag.`);
  }

  return (
    <>
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/shop">Shop</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{product.name}</span>
      </nav>

      <div className="pdp">
        <div className="pdp-gallery">
          <img
            className="pdp-main"
            src={img.src}
            alt={img.alt}
            width={img.w}
            height={img.h}
          />
          {product.images.length > 1 && (
            <div className="pdp-thumbs" role="group" aria-label="Photos">
              {product.images.map((im, i) => (
                <button
                  key={im.src}
                  type="button"
                  aria-pressed={shot === i}
                  onClick={() => setShot(i)}
                >
                  <img
                    src={im.src}
                    alt={`Photo ${i + 1}: ${im.alt}`}
                    width={im.w}
                    height={im.h}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="pdp-info">
          <p className="pdp-type">
            {product.type}
            {product.note && (
              <span className="product-note product-note-inline">
                {product.note}
              </span>
            )}
          </p>
          <h1>{product.name}</h1>
          <p className="lead">{product.short}</p>
          <p className="pdp-price">
            {money(unit)}
            {qty > 1 && (
              <span>
                {" "}
                · {money(unit * qty)} for {qty}
              </span>
            )}
          </p>

          <fieldset className="option-set">
            <legend>Size</legend>
            <div className="option-grid">
              {product.sizes.map((s) => (
                <label key={s.id} className="option">
                  <input
                    type="radio"
                    name="size"
                    value={s.id}
                    checked={size === s.id}
                    onChange={() => setSize(s.id)}
                  />
                  <span className="option-label">{s.label}</span>
                  <span className="option-detail">{s.detail}</span>
                  <span className="option-price">{money(s.price)}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {product.vaseOption && (
            <fieldset className="option-set">
              <legend>Vase</legend>
              <div className="option-grid">
                {vases.map((v) => (
                  <label key={v.id} className="option">
                    <input
                      type="radio"
                      name="vase"
                      value={v.id}
                      checked={vase === v.id}
                      onChange={() => setVase(v.id)}
                    />
                    <span className="option-label">{v.label}</span>
                    <span className="option-price">
                      {v.price ? "+" + money(v.price) : "Paper wrap"}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          <div className="buy-row">
            <Qty value={qty} onChange={setQty} label="Quantity" max={MAX_QTY} />
            <button type="button" className="btn" onClick={() => add(false)}>
              Add to bag · {money(unit * qty)}
            </button>
          </div>
          <button
            type="button"
            className="text-button"
            onClick={() => add(true)}
          >
            Buy now and choose a delivery day
          </button>
          <div aria-live="polite" className="added">
            {added && (
              <p>
                <Check size={18} aria-hidden="true" /> {added}{" "}
                <Link to="/cart">View bag</Link> or{" "}
                <Link to="/checkout">check out</Link>.
              </p>
            )}
          </div>

          <p className="cutoff">
            <Clock size={18} aria-hidden="true" />
            {cutoffMessage(now)}
          </p>

          <div className="pdp-copy">
            {product.description.map((d) => (
              <p key={d.slice(0, 20)}>{d}</p>
            ))}
          </div>

          <dl className="pdp-specs">
            <div>
              <dt>The recipe</dt>
              <dd>
                <ul>
                  {product.recipe.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </dd>
            </div>
            <div>
              <dt>
                <Sprout size={16} aria-hidden="true" /> Vase life
              </dt>
              <dd>{product.vaseLife}</dd>
            </div>
            <div>
              <dt>
                <Droplets size={16} aria-hidden="true" /> Care
              </dt>
              <dd>{product.care}</dd>
            </div>
            <div>
              <dt>Good for</dt>
              <dd>{product.occasions.join(", ")}</dd>
            </div>
          </dl>
          <p className="fine">
            Stems follow the market. If one variety is poor this week, we swap
            in something of equal value and similar colour.
          </p>
        </div>
      </div>

      <section className="section" aria-labelledby="related">
        <h2 id="related">You might also send</h2>
        <div className="product-grid product-grid-3">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}
