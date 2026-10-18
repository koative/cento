import { Trash2 } from "lucide-react";
import { Link } from "../router";
import { zones } from "../content";
import { Qty } from "../components/ProductCard";
import {
  money,
  setQty,
  subtotal,
  useCart,
  MAX_QTY,
  type CartLine,
} from "../lib/cart";

export function LineThumb({ line }: { line: CartLine }) {
  if (line.image)
    return (
      <img
        className="line-thumb"
        src={line.image}
        alt=""
        width="80"
        height="96"
      />
    );
  return (
    <svg
      className="line-thumb line-thumb-drawn"
      viewBox="-12 -12 24 24"
      aria-hidden="true"
    >
      {[0, 72, 144, 216, 288].map((r) => (
        <ellipse
          key={r}
          cy="-5.5"
          rx="3.6"
          ry="5.6"
          transform={`rotate(${r})`}
        />
      ))}
      <circle r="2.4" />
    </svg>
  );
}

export function Cart() {
  const cart = useCart();
  const total = subtotal(cart);
  const cheapest = Math.min(...zones.map((z) => z.fee));

  return (
    <>
      <header className="page-head">
        <h1>Your bag</h1>
        {cart.length > 0 && (
          <p className="lead">
            Choose the delivery day, time and card message at checkout.
          </p>
        )}
      </header>
      {cart.length === 0 ? (
        <div className="section empty">
          <h2>Nothing in your bag yet.</h2>
          <p>Start with today's bouquets, or build one stem by stem.</p>
          <div className="actions">
            <Link to="/shop" className="btn">
              Shop flowers
            </Link>
            <Link to="/builder" className="btn btn-ghost">
              Build a bouquet
            </Link>
          </div>
        </div>
      ) : (
        <div className="section bag">
          <ul className="bag-lines">
            {cart.map((l) => (
              <li key={l.key}>
                <LineThumb line={l} />
                <div className="line-info">
                  <h2 className="line-name">
                    <Link to={l.to}>{l.name}</Link>
                  </h2>
                  <p className="line-detail">{l.detail}</p>
                  <p className="line-unit">{money(l.unit)} each</p>
                </div>
                <div className="line-actions">
                  {l.kind === "product" ? (
                    <Qty
                      value={l.qty}
                      onChange={(n) => setQty(l.key, n)}
                      label={`Quantity of ${l.name}`}
                      max={MAX_QTY}
                    />
                  ) : (
                    <span className="line-qty">Qty {l.qty}</span>
                  )}
                  <button
                    type="button"
                    className="icon-button"
                    onClick={() => setQty(l.key, 0)}
                    aria-label={`Remove ${l.name}`}
                  >
                    <Trash2 size={18} aria-hidden="true" />
                  </button>
                </div>
                <p className="line-total">{money(l.unit * l.qty)}</p>
              </li>
            ))}
          </ul>
          <aside className="bag-summary" aria-label="Order summary">
            <dl className="sum">
              <div>
                <dt>Subtotal</dt>
                <dd>{money(total)}</dd>
              </div>
              <div>
                <dt>Delivery</dt>
                <dd>from {money(cheapest)}, or free pickup</dd>
              </div>
            </dl>
            <Link to="/checkout" className="btn btn-wide">
              Choose delivery &amp; check out
            </Link>
            <Link to="/shop" className="text-link">
              Keep shopping
            </Link>
          </aside>
        </div>
      )}
    </>
  );
}
