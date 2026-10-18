import { useState } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { hours, products, type Product } from "../content";
import { Link, navigate } from "../router";
import { Qty } from "../components/Qty";
import { ProductCard } from "../components/ProductCard";
import { addLine, money } from "../lib/cart";
import { noticeLabel } from "../lib/time";

const INSCRIPTION_MAX = 24;

export function ProductPage({ product }: { product: Product }) {
  const [size, setSize] = useState(0);
  const [choice, setChoice] = useState(product.choice?.options[0]);
  const [inscription, setInscription] = useState("");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState("");

  const related = [...products]
    .filter((p) => p.id !== product.id)
    .sort(
      (a, b) =>
        Number(b.category === product.category) -
          Number(a.category === product.category) || a.rank - b.rank,
    )
    .slice(0, 3);
  const unit = product.sizes[size].price;
  const days = hours
    .filter((_, i) => product.bakeDays.includes(i))
    .map((h) => h.day.slice(0, 3));
  const bakedEveryDay =
    product.bakeDays.length === hours.filter((h) => h.open !== null).length;

  function add(checkout: boolean) {
    addLine({
      id: product.id,
      name: product.name,
      size: product.sizes[size].label,
      choice,
      inscription: inscription.trim() || undefined,
      unit,
      qty,
    });
    if (checkout) return navigate("/checkout");
    setAdded(
      `Added ${qty} × ${product.name} (${product.sizes[size].label}) to your bag.`,
    );
  }

  return (
    <>
      <div className="product">
        <Link to="/shop" className="back-link">
          <ArrowLeft size={16} aria-hidden="true" /> Order ahead
        </Link>
        <figure className="product-media">
          <img
            src={product.image}
            alt={product.alt}
            width={1400}
            height={1050}
          />
        </figure>

        <div className="product-buy">
          <h1>{product.name}</h1>
          <p className="lede">{product.blurb}</p>
          <p className="product-price">
            {money(unit * qty)}
            {qty > 1 && <span> · {money(unit)} each</span>}
          </p>

          <form
            className="buy-form"
            onSubmit={(e) => {
              e.preventDefault();
              add(false);
            }}
          >
            <fieldset className="options">
              <legend>Size</legend>
              {product.sizes.map((s, i) => (
                <label key={s.label} className="option">
                  <input
                    type="radio"
                    name="size"
                    checked={size === i}
                    onChange={() => setSize(i)}
                  />
                  <span>{s.label}</span>
                  <span className="option-price">{money(s.price)}</span>
                </label>
              ))}
            </fieldset>

            {product.choice && (
              <fieldset className="options options-inline">
                <legend>{product.choice.label}</legend>
                {product.choice.options.map((o) => (
                  <label key={o} className="option">
                    <input
                      type="radio"
                      name="choice"
                      checked={choice === o}
                      onChange={() => setChoice(o)}
                    />
                    <span>{o}</span>
                  </label>
                ))}
              </fieldset>
            )}

            {product.inscription && (
              <div className="field">
                <label htmlFor="inscription">Message on top (optional)</label>
                <input
                  id="inscription"
                  value={inscription}
                  maxLength={INSCRIPTION_MAX}
                  placeholder="Happy 40th, Ruth"
                  aria-describedby="inscription-hint"
                  onChange={(e) => setInscription(e.target.value)}
                />
                <p className="field-hint" id="inscription-hint">
                  Piped in dark chocolate.{" "}
                  {INSCRIPTION_MAX - inscription.length} characters left.
                </p>
              </div>
            )}

            <div className="buy-row">
              <Qty value={qty} onChange={setQty} label={product.name} />
              <button className="btn" type="submit">
                Add to bag
              </button>
            </div>
            <button
              className="btn btn-ghost btn-block"
              type="button"
              onClick={() => add(true)}
            >
              Add and choose pickup
            </button>
            <p className="added" role="status">
              {added && (
                <>
                  <Check size={18} aria-hidden="true" /> {added}{" "}
                  <Link to="/cart">View bag</Link>
                </>
              )}
            </p>
          </form>

          <dl className="facts">
            <div>
              <dt>Notice</dt>
              <dd>{noticeLabel(product.leadDays)}</dd>
            </div>
            <div>
              <dt>Baked</dt>
              <dd>
                {bakedEveryDay ? "Every day we're open" : days.join(", ")}
              </dd>
            </div>
            <div>
              <dt>Allergens</dt>
              <dd>{product.allergens.join(", ")}</dd>
            </div>
          </dl>
        </div>

        <div className="product-story">
          <h2>
            About this{" "}
            {product.category === "Pantry"
              ? "kit"
              : product.category === "Cakes"
                ? "cake"
                : "bake"}
          </h2>
          {product.description.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <table className="spec-table">
            <caption className="visually-hidden">Specifications</caption>
            <tbody>
              {product.specs.map(([k, v]) => (
                <tr key={k}>
                  <th scope="row">{k}</th>
                  <td>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {related.length > 0 && (
        <section className="section" aria-labelledby="related-title">
          <h2 id="related-title">Goes in the same bag</h2>
          <div className="product-grid product-grid-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
