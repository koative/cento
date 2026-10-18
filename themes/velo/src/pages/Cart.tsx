import { ArrowRight, X } from "lucide-react";
import { Link } from "../router";
import { Qty } from "../components/Qty";
import { money, setQty, subtotal, useCart } from "../lib/cart";

export function Cart() {
  const cart = useCart();
  const sub = subtotal(cart);

  return (
    <div className="page cart-page">
      <header className="page-head">
        <h1>Your cart</h1>
      </header>

      {cart.length === 0 ? (
        <div className="empty">
          <h2>Nothing in here yet</h2>
          <p>
            Have a look at what's on the shop floor, or draw something of your
            own.
          </p>
          <div className="actions">
            <Link to="/bikes" className="btn">
              Browse bikes <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link to="/build" className="btn btn-ghost">
              Open the configurator
            </Link>
          </div>
        </div>
      ) : (
        <div className="cart-layout">
          <ul className="cart-lines">
            {cart.map((l) => (
              <li key={l.key} className="cart-line">
                <img src={l.photo} alt="" width={160} height={120} />
                <div className="cart-line-body">
                  <h2>
                    <Link to={`/bikes/${l.id.replace(/^build-/, "")}`}>
                      {l.name}
                    </Link>
                  </h2>
                  <p>
                    <span
                      className="swatch-dot"
                      style={{ background: l.swatch }}
                      aria-hidden="true"
                    />{" "}
                    {l.detail}
                  </p>
                  <div className="cart-line-actions">
                    <Qty
                      value={l.qty}
                      onChange={(n) => setQty(l.key, n)}
                      label={`Quantity of ${l.name}`}
                    />
                    <button
                      type="button"
                      className="link-button"
                      onClick={() => setQty(l.key, 0)}
                    >
                      <X size={14} aria-hidden="true" /> Remove
                    </button>
                  </div>
                </div>
                <p className="cart-line-total num">{money(l.unit * l.qty)}</p>
              </li>
            ))}
          </ul>
          <aside className="order-summary" aria-label="Order summary">
            <h2>Summary</h2>
            <p className="summary-total">
              <span>Subtotal</span>
              <strong className="num">{money(sub)}</strong>
            </p>
            <p className="muted small">
              Delivery or in-shop fitting is chosen at checkout. Collection and
              fitting are free.
            </p>
            <Link to="/checkout" className="btn btn-wide">
              Go to checkout <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link to="/bikes" className="text-link">
              Keep browsing
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
