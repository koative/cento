import { ArrowRight, X } from "lucide-react";
import { Link } from "../router";
import { brand, firing } from "../content";
import { count, money, setQty, subtotal, useCart } from "../lib/cart";
import { Qty } from "../components/Qty";
import { LineThumb, lineHref } from "../components/LineThumb";

export function Cart() {
  const cart = useCart();
  const sub = subtotal(cart);
  const toFree = brand.shipping.freeOver - sub;
  const hasMade = cart.some((l) => l.made);

  return (
    <div className="page cart">
      <header className="page-head">
        <h1>Your bag</h1>
        <p className="lead" aria-live="polite">
          {cart.length
            ? `${count(cart)} ${count(cart) === 1 ? "piece" : "pieces"}, ${money(sub)}`
            : "Nothing in your bag yet."}
        </p>
      </header>

      {cart.length === 0 ? (
        <div className="empty">
          <p>
            The shelf restocks after every firing. The next kiln opens{" "}
            {firing.opening}.
          </p>
          <div className="actions">
            <Link to="/shop" className="btn">
              Go to the shop <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link to="/glazes" className="btn btn-ghost">
              Have something made
            </Link>
          </div>
        </div>
      ) : (
        <div className="cart-layout">
          <ul className="cart-lines">
            {cart.map((l) => (
              <li key={l.key}>
                <LineThumb line={l} />
                <div className="line-info">
                  <Link to={lineHref(l)}>{l.name}</Link>
                  <span>{l.detail}</span>
                  {l.made && <span className="made-tag">Made to order</span>}
                </div>
                <Qty
                  value={l.qty}
                  onChange={(n) => setQty(l.key, n)}
                  label={`Quantity of ${l.name}`}
                />
                <span className="line-price">{money(l.unit * l.qty)}</span>
                <button
                  type="button"
                  className="icon-btn"
                  aria-label={`Remove ${l.name}`}
                  onClick={() => setQty(l.key, 0)}
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
          <aside className="summary" aria-label="Order summary">
            <dl>
              <div>
                <dt>Subtotal</dt>
                <dd>{money(sub)}</dd>
              </div>
              <div>
                <dt>Shipping</dt>
                <dd>
                  {toFree <= 0
                    ? "Free"
                    : `${money(brand.shipping.flat)} or collect free`}
                </dd>
              </div>
            </dl>
            <p className="muted">
              {toFree > 0
                ? `Add ${money(toFree)} more for free shipping.`
                : "Your order ships free."}{" "}
              {hasMade && firing.madeToOrder}
            </p>
            <Link to="/checkout" className="btn btn-wide">
              Checkout <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link to="/shop" className="text-link">
              Keep browsing
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
