import { ArrowRight, Gift, Trash2 } from "lucide-react";
import { Link } from "../router";
import { checkout } from "../content";
import { count, setQty, subtotal, useCart } from "../lib/cart";
import { money } from "../lib/format";
import { Qty } from "../components/Qty";

export function Cart() {
  const cart = useCart();
  const sub = subtotal(cart);
  const toFree = checkout.freeOver - sub;

  return (
    <div className="page cart-page">
      <header className="page-head">
        <h1>Your basket</h1>
        {cart.length > 0 && (
          <p className="lead">
            {count(cart)} {count(cart) === 1 ? "item" : "items"} in your basket.
            Toys are gift wrapped at the counter the way you chose.
          </p>
        )}
      </header>

      {cart.length === 0 ? (
        <div className="empty-state">
          <p className="lead">Your basket is empty. The shelves are not.</p>
          <div className="actions">
            <Link to="/shop" className="btn">
              Shop all toys <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link to="/gift-finder" className="btn btn-ghost">
              Use the gift finder
            </Link>
          </div>
        </div>
      ) : (
        <div className="cart-layout">
          <ul className="cart-lines">
            {cart.map((l) => (
              <li key={l.key}>
                <img src={l.image} alt="" width="96" height="96" />
                <div className="cart-line-info">
                  <Link
                    to={
                      l.kind === "toy" ? `/shop/${l.id}` : `/workshops/${l.id}`
                    }
                  >
                    {l.name}
                  </Link>
                  <small>
                    {l.kind === "workshop" ? "Workshop · " : ""}
                    {l.detail}
                  </small>
                  {l.wrap && (
                    <small className="cart-wrap">
                      <Gift size={14} aria-hidden="true" /> {l.wrap}
                      {l.tag ? ` · tag: “${l.tag}”` : ""}
                    </small>
                  )}
                </div>
                <Qty
                  value={l.qty}
                  max={l.max}
                  onChange={(n) => setQty(l.key, n)}
                  label={`Quantity of ${l.name}`}
                />
                <span className="num cart-line-price">
                  {money(l.unit * l.qty)}
                </span>
                <button
                  type="button"
                  className="icon-button"
                  onClick={() => setQty(l.key, 0)}
                  aria-label={`Remove ${l.name}`}
                >
                  <Trash2 size={18} aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
          <aside className="order-summary" aria-labelledby="h-summary">
            <h2 id="h-summary">Summary</h2>
            <dl>
              <div>
                <dt>Subtotal</dt>
                <dd className="num">{money(sub)}</dd>
              </div>
              <div>
                <dt>Pickup at the shop</dt>
                <dd>Free</dd>
              </div>
            </dl>
            <p className="muted">
              {toFree > 0
                ? `Add ${money(toFree)} more for free shipping anywhere in the US.`
                : "Your order ships free anywhere in the US."}
            </p>
            <Link to="/checkout" className="btn btn-wide">
              Check out · {money(sub)}
            </Link>
            <Link to="/shop" className="text-link">
              Keep shopping
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
