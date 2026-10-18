import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Link } from "../router";
import { shipping, shop, type ShopItem } from "../content";
import { money } from "../lib/format";
import { addToBag } from "../lib/store";
import { ShopCard, ShopVisual } from "../components/Cards";

export function ShopItemPage({ item }: { item: ShopItem }) {
  const [option, setOption] = useState(item.options[0].label);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState("");
  const unit =
    item.price + (item.options.find((o) => o.label === option)?.add ?? 0);
  const related = shop
    .filter(
      (s) => s.id !== item.id && (s.kind === item.kind || s.by === item.by),
    )
    .slice(0, 4);

  const add = () => {
    addToBag(item, option, qty);
    setAdded(
      `Added ${qty} × ${item.name} (${option.toLowerCase()}) to your bag.`,
    );
  };

  return (
    <article className="page">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/shop">Editions &amp; books</Link>
      </nav>
      <div className="item-main">
        <figure className="item-stage">
          <ShopVisual item={item} />
        </figure>
        <div className="item-info">
          <h1>
            <span className="work-artist">{item.by}</span>
            <span className="work-title">{item.name}</span>
          </h1>
          <p className="work-price num">{money(unit)}</p>
          <p>{item.description}</p>

          {item.options.length > 1 && (
            <fieldset className="options">
              <legend>{item.kind === "Books" ? "Copy" : "Framing"}</legend>
              {item.options.map((o) => (
                <label key={o.label}>
                  <input
                    type="radio"
                    name="option"
                    value={o.label}
                    checked={option === o.label}
                    onChange={() => setOption(o.label)}
                  />
                  <span>{o.label}</span>
                  <span className="num">
                    {o.add ? `+ ${money(o.add)}` : money(item.price)}
                  </span>
                </label>
              ))}
            </fieldset>
          )}

          <div className="buy-row">
            <div className="qty" role="group" aria-label="Quantity">
              <button
                type="button"
                onClick={() => setQty(Math.max(1, qty - 1))}
                disabled={qty <= 1}
                aria-label="One fewer"
              >
                <Minus size={16} aria-hidden="true" />
              </button>
              <output aria-live="polite" aria-label={`Quantity ${qty}`}>
                {qty}
              </output>
              <button
                type="button"
                onClick={() => setQty(Math.min(10, qty + 1))}
                disabled={qty >= 10}
                aria-label="One more"
              >
                <Plus size={16} aria-hidden="true" />
              </button>
            </div>
            <button type="button" className="btn btn-wide" onClick={add}>
              Add to bag · {money(unit * qty)}
            </button>
          </div>
          <div aria-live="polite" className="added">
            {added && (
              <p>
                {added} <Link to="/bag">View bag and check out</Link>
              </p>
            )}
          </div>

          <dl className="spec">
            <div>
              <dt>Size</dt>
              <dd>{item.spec}</dd>
            </div>
            {item.details.map((d, i) => (
              <div key={d}>
                <dt>
                  {i === 0 ? (
                    "Details"
                  ) : (
                    <span className="visually-hidden">Details</span>
                  )}
                </dt>
                <dd>{d}</dd>
              </div>
            ))}
            <div>
              <dt>Delivery</dt>
              <dd>
                {money(shipping.flat)} in the US, free over{" "}
                {money(shipping.freeOver)}. Framed works ship in 10 working
                days.
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {related.length > 0 && (
        <section className="section" aria-labelledby="related-title">
          <div className="section-head">
            <h2 id="related-title">You may also like</h2>
          </div>
          <div className="shop-grid">
            {related.map((r) => (
              <ShopCard key={r.id} item={r} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
