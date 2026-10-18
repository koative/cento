import { ArrowRight, Trash2 } from "lucide-react";
import { Link } from "../router";
import { delivery } from "../content";
import { Qty } from "../components/Shelf";
import {
  count,
  money,
  priced,
  setQty,
  setSwap,
  subtotal,
  useBasket,
} from "../lib/cart";
import { deliveryFee, findSlot, slotLabel } from "../lib/slots";

export function BasketPage() {
  const basket = useBasket();
  const lines = priced(basket.lines);
  const sub = subtotal(lines);
  const slot = findSlot(basket.slot);
  const fee = deliveryFee(slot, sub);
  const short = delivery.minimum - sub;
  const toFree = delivery.freeOver - sub;

  if (!lines.length) {
    return (
      <div className="page basket-page">
        <header className="page-head">
          <h1>Your basket is empty</h1>
          <p className="lede">
            Nothing picked yet. Start with what is in season, or let a recipe
            fill it for you.
          </p>
        </header>
        <div className="actions">
          <Link to="/aisles" className="btn btn-lg">
            Walk the aisles <ArrowRight size={20} aria-hidden="true" />
          </Link>
          <Link to="/recipes" className="btn btn-ghost btn-lg">
            Shop a recipe
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page basket-page">
      <header className="page-head">
        <h1>Your basket</h1>
        <p className="lede">
          {count(basket.lines)} items. Every line has a swap setting: tell your
          picker what to do if it is out on the day.
        </p>
      </header>

      <div className="basket-layout">
        <ul className="basket-lines" aria-label="Items in your basket">
          {lines.map((l) => (
            <li key={l.key} className="basket-line">
              <img
                src={l.product.photo.src}
                alt=""
                width={l.product.photo.width}
                height={l.product.photo.height}
              />
              <div className="line-main">
                <h2>
                  <Link to={`/aisles/${l.product.aisle}/${l.product.id}`}>
                    {l.product.name}
                  </Link>
                </h2>
                <p className="meta">
                  {l.option.label} · {money(l.option.price)} each
                </p>
                <label className="check check-small">
                  <input
                    type="checkbox"
                    checked={l.swap}
                    onChange={(e) => setSwap(l.key, e.target.checked)}
                  />
                  <span>
                    {l.swap
                      ? "Swap for the closest match if out"
                      : "Leave out if unavailable"}
                  </span>
                </label>
              </div>
              <Qty
                value={l.qty}
                min={0}
                onChange={(n) => setQty(l.key, n)}
                label={`Quantity of ${l.product.name}`}
              />
              <strong className="line-total num">{money(l.total)}</strong>
              <button
                type="button"
                className="icon-btn"
                onClick={() => setQty(l.key, 0)}
                aria-label={`Remove ${l.product.name}`}
              >
                <Trash2 size={18} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>

        <aside className="summary" aria-labelledby="summary-title">
          <h2 id="summary-title">Receipt so far</h2>
          <dl>
            <div>
              <dt>Items</dt>
              <dd className="num">{money(sub)}</dd>
            </div>
            <div>
              <dt>Delivery{slot?.green ? " (green slot)" : ""}</dt>
              <dd className="num">{fee === 0 ? "Free" : money(fee)}</dd>
            </div>
            <div className="total">
              <dt>Estimated total</dt>
              <dd className="num">{money(sub + fee)}</dd>
            </div>
          </dl>
          <p className="free-meter" aria-live="polite">
            {toFree > 0
              ? `${money(toFree)} more for free delivery.`
              : "Delivery is on us for this basket."}
          </p>
          <div className="meter" aria-hidden="true">
            <span
              style={{
                width: `${Math.min(100, (sub / delivery.freeOver) * 100)}%`,
              }}
            />
          </div>
          <div className="summary-slot">
            <p>{slot ? slotLabel(slot) : "No delivery slot chosen yet."}</p>
            <Link to="/delivery" className="text-link">
              {slot ? "Change slot" : "Choose a slot"}
            </Link>
          </div>
          {short > 0 ? (
            <>
              <button
                type="button"
                className="btn btn-lg btn-block"
                disabled
                aria-describedby="min-note"
              >
                Checkout
              </button>
              <p id="min-note" className="fine">
                Add {money(short)} more to reach the {money(delivery.minimum)}{" "}
                minimum.
              </p>
            </>
          ) : (
            <Link to="/checkout" className="btn btn-lg btn-block">
              Checkout <ArrowRight size={20} aria-hidden="true" />
            </Link>
          )}
          <p className="fine">
            Weighed items are charged at the picked weight, never more than 10%
            over the estimate.
          </p>
        </aside>
      </div>
    </div>
  );
}
