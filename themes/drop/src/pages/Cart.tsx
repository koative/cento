import { ArrowRight, Minus, Plus, X } from "lucide-react";
import { Link } from "../router";
import { checkout, products } from "../content";
import { money, setQty, subtotal, useCart } from "../lib/cart";
import { Flat } from "../components/Flat";

export function Cart() {
  const cart = useCart();
  const sub = subtotal(cart);
  const toFree = checkout.freeOver - sub;

  return (
    <div className="page cart-page">
      <header className="page-head">
        <h1>Your bag</h1>
      </header>

      {!cart.length ? (
        <div className="empty-state">
          <p>
            Your bag is empty. Drop pieces do not wait around, so if you saw
            something, go back for it.
          </p>
          <Link to="/shop" className="btn btn-signal">
            Shop what is left <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <ul className="cart-lines">
            {cart.map((l) => {
              const p = products.find((x) => x.id === l.id);
              const color = p?.colors.find((c) => c.name === l.color);
              return (
                <li key={l.key} className="cart-line">
                  {p && (
                    <Link
                      to={`/shop/${p.id}`}
                      className="plate"
                      tabIndex={-1}
                      aria-hidden="true"
                    >
                      <Flat product={p} color={color} />
                    </Link>
                  )}
                  <div className="cart-line-info">
                    <h2>
                      <Link to={`/shop/${l.id}`}>{l.name}</Link>
                    </h2>
                    <p className="muted">
                      {l.color} · Size {l.size} · {money(l.unit)} each
                    </p>
                    <div
                      className="qty qty-small"
                      role="group"
                      aria-label={`Quantity of ${l.name}`}
                    >
                      <button
                        type="button"
                        onClick={() => setQty(l.key, l.qty - 1)}
                        aria-label="One fewer"
                      >
                        <Minus size={14} aria-hidden="true" />
                      </button>
                      <output className="num">{l.qty}</output>
                      <button
                        type="button"
                        onClick={() => setQty(l.key, l.qty + 1)}
                        disabled={l.qty >= l.limit}
                        aria-label="One more"
                      >
                        <Plus size={14} aria-hidden="true" />
                      </button>
                    </div>
                    {l.qty >= l.limit && (
                      <p className="muted small">
                        That is the limit for this piece.
                      </p>
                    )}
                  </div>
                  <p className="num cart-line-total">{money(l.unit * l.qty)}</p>
                  <button
                    type="button"
                    className="icon-button"
                    onClick={() => setQty(l.key, 0)}
                    aria-label={`Remove ${l.name} from bag`}
                  >
                    <X size={18} aria-hidden="true" />
                  </button>
                </li>
              );
            })}
          </ul>

          <aside className="summary" aria-labelledby="h-summary">
            <h2 id="h-summary">Summary</h2>
            <dl>
              <div>
                <dt>Subtotal</dt>
                <dd className="num">{money(sub)}</dd>
              </div>
              <div>
                <dt>Shipping</dt>
                <dd>
                  {toFree <= 0 ? "Free standard" : "From $8, at checkout"}
                </dd>
              </div>
            </dl>
            <p className="free-ship" aria-live="polite">
              {toFree > 0
                ? `${money(toFree)} away from free standard shipping.`
                : "Free standard shipping unlocked."}
            </p>
            <span className="meter" aria-hidden="true">
              <span
                style={{
                  width: Math.min(100, (sub / checkout.freeOver) * 100) + "%",
                }}
              />
            </span>
            <Link to="/checkout" className="btn btn-signal btn-wide">
              Checkout <ArrowRight size={18} aria-hidden="true" />
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
