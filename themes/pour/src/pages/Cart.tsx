import { ArrowRight, Ticket, Trash2, Users } from "lucide-react";
import { Link } from "../router";
import { checkout, wines } from "../content";
import {
  bottles,
  caseDiscount,
  money,
  setQty,
  subtotal,
  useCart,
} from "../lib/cart";
import { Bottle } from "../components/Bottle";
import { Qty } from "../components/Qty";

export function Cart() {
  const cart = useCart();
  const sub = subtotal(cart);
  const discount = caseDiscount(cart);
  const n = bottles(cart);
  const toGo = checkout.caseSize - (n % checkout.caseSize || checkout.caseSize);

  if (!cart.length)
    return (
      <div className="page cart-page">
        <h1>Your case is empty</h1>
        <p className="lead">
          Nothing in it yet. Start at the shelf, or let the taste finder pick
          for you.
        </p>
        <div className="actions">
          <Link to="/wines" className="btn">
            Browse the wines <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link to="/finder" className="btn btn-ghost">
            Taste finder
          </Link>
        </div>
      </div>
    );

  return (
    <div className="page cart-page">
      <h1>Your case</h1>
      <div className="cart-layout">
        <section aria-label="Items">
          {n > 0 && (
            <div className="case-meter" aria-live="polite">
              <div className="case-slots" aria-hidden="true">
                {Array.from({ length: checkout.caseSize }, (_, i) => (
                  <i
                    key={i}
                    data-full={i < Math.min(n, checkout.caseSize) || undefined}
                  />
                ))}
              </div>
              <p>
                {n >= checkout.caseSize
                  ? `Case discount on: ${checkout.caseDiscount * 100}% off all ${n} bottles.`
                  : `Add ${toGo} more ${toGo === 1 ? "bottle" : "bottles"} for ${checkout.caseDiscount * 100}% off the lot.`}
              </p>
            </div>
          )}
          <ul className="cart-lines">
            {cart.map((l) => {
              const wine =
                l.kind === "wine"
                  ? wines.find((w) => w.id === l.id)
                  : undefined;
              return (
                <li key={l.key}>
                  <span className="cart-thumb" aria-hidden="true">
                    {wine ? (
                      <Bottle wine={wine} />
                    ) : l.kind === "ticket" ? (
                      <Ticket size={26} />
                    ) : (
                      <Users size={26} />
                    )}
                  </span>
                  <div className="cart-name">
                    <Link
                      to={
                        l.kind === "wine"
                          ? "/wines/" + l.id
                          : l.kind === "ticket"
                            ? "/tastings/" + l.id
                            : "/club"
                      }
                    >
                      {l.name}
                    </Link>
                    <small>
                      {l.detail} · <span className="num">{money(l.unit)}</span>{" "}
                      {l.kind === "ticket"
                        ? "per seat"
                        : l.kind === "club"
                          ? ""
                          : "each"}
                    </small>
                  </div>
                  {l.kind === "club" ? (
                    <span />
                  ) : (
                    <Qty
                      value={l.qty}
                      onChange={(q) => setQty(l.key, q)}
                      label={`quantity of ${l.name}`}
                      min={1}
                      max={24}
                    />
                  )}
                  <span className="num cart-line-total">
                    {money(l.unit * l.qty)}
                  </span>
                  <button
                    type="button"
                    className="icon-btn"
                    onClick={() => setQty(l.key, 0)}
                    aria-label={`Remove ${l.name}`}
                  >
                    <Trash2 size={18} aria-hidden="true" />
                  </button>
                </li>
              );
            })}
          </ul>
          <Link to="/wines" className="text-link">
            Keep shopping <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </section>

        <aside className="summary" aria-labelledby="summary-title">
          <h2 id="summary-title">Summary</h2>
          <dl>
            <div>
              <dt>Subtotal</dt>
              <dd className="num">{money(sub)}</dd>
            </div>
            {discount > 0 && (
              <div>
                <dt>Case discount</dt>
                <dd className="num">−{money(discount)}</dd>
              </div>
            )}
            <div>
              <dt>Pickup or delivery</dt>
              <dd>Chosen at checkout</dd>
            </div>
            <div className="total">
              <dt>Total</dt>
              <dd className="num">{money(sub - discount)}</dd>
            </div>
          </dl>
          <Link to="/checkout" className="btn btn-block">
            Checkout <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <p className="quiet">
            You must be 21 or over to buy wine. We check ID at pickup and on
            delivery.
          </p>
        </aside>
      </div>
    </div>
  );
}
