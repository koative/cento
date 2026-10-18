import { ArrowRight, Trash2 } from "lucide-react";
import { Link } from "../router";
import { checkout } from "../content";
import { money, setQty, subtotal, useCart } from "../cart";
import { Bag } from "../components/Bag";
import { Qty } from "../components/Qty";

export function Cart() {
  const cart = useCart();
  const sub = subtotal(cart);
  const toFree = checkout.freeOver - sub;

  return (
    <div className="page cart-page">
      <header className="page-head">
        <h1>Your bag</h1>
      </header>

      {cart.length === 0 ? (
        <div className="empty-state">
          <p className="lead">
            Nothing in here yet. Your next good cup is a few clicks away.
          </p>
          <div className="actions">
            <Link to="/shop" className="btn">
              Shop coffee <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link to="/subscribe" className="btn btn-ghost">
              Build a subscription
            </Link>
          </div>
        </div>
      ) : (
        <div className="cart-layout">
          <ul className="cart-lines">
            {cart.map((l) => (
              <li key={l.key}>
                <Bag
                  name={l.name.replace(" subscription", "")}
                  origin=""
                  color={l.color}
                  weight={l.size}
                  size={4.5}
                  className="mini-bag"
                />
                <div className="cart-line-info">
                  <h2>
                    <Link to={l.every ? "/subscribe" : "/shop/" + l.id}>
                      {l.name}
                    </Link>
                  </h2>
                  <p className="muted">
                    {l.size} · {l.grind}
                    {l.every
                      ? ` · every ${l.every === 1 ? "week" : `${l.every} weeks`}, 10% off`
                      : ""}
                  </p>
                  <div className="cart-line-controls">
                    <Qty
                      value={l.qty}
                      onChange={(n) => setQty(l.key, n)}
                      label={`quantity of ${l.name}`}
                    />
                    <button
                      type="button"
                      className="icon-button"
                      onClick={() => setQty(l.key, 0)}
                      aria-label={`Remove ${l.name}`}
                    >
                      <Trash2 size={18} aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <p className="cart-line-price num">
                  {money(l.unit * l.qty)}
                  {l.every ? <small>per delivery</small> : null}
                </p>
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
                <dt>Shipping</dt>
                <dd>{toFree <= 0 ? "Free" : "Calculated at checkout"}</dd>
              </div>
            </dl>
            <p className="muted" aria-live="polite">
              {toFree > 0
                ? `Add ${money(toFree)} more for free shipping.`
                : "You get free shipping."}
            </p>
            <Link to="/checkout" className="btn btn-wide">
              Go to checkout <ArrowRight size={18} aria-hidden="true" />
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
