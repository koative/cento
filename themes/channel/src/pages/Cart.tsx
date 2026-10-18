import { Trash2 } from "lucide-react";
import { Link } from "../router";
import { brand, products } from "../content";
import { Mockup } from "../components/Mockup";
import { Qty } from "../components/Qty";
import {
  FREE_SHIPPING,
  SHIPPING,
  setQty,
  subtotal,
  useCart,
} from "../lib/cart";
import { money } from "../lib/format";

export function Cart() {
  const cart = useCart();
  const sub = subtotal(cart);
  const ship = sub >= FREE_SHIPPING || sub === 0 ? 0 : SHIPPING;

  return (
    <div className="wrap cart-page">
      <header className="page-head page-head-tight">
        <h1>Your bag</h1>
      </header>
      {cart.length === 0 ? (
        <div className="empty">
          <h2>Nothing in here yet</h2>
          <p>The shop tee and the bottle opener are the usual first picks.</p>
          <Link to="/shop" className="btn btn-spark">
            Browse merch
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <ul className="cart-lines">
            {cart.map((l) => {
              const p = products.find((x) => x.id === l.id);
              const color =
                p?.colors.find((c) => c.name === l.color) ?? p?.colors[0];
              return (
                <li key={l.key}>
                  <Link
                    to={"/shop/" + l.id}
                    className="cart-thumb"
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    {p && color && (
                      <Mockup kind={p.kind} color={color} label="" />
                    )}
                  </Link>
                  <div className="cart-info">
                    <Link to={"/shop/" + l.id} className="cart-name">
                      {l.name}
                    </Link>
                    <p>
                      {l.color} · {l.size}
                    </p>
                    <p className="price">{money(l.unit)}</p>
                  </div>
                  <Qty
                    value={l.qty}
                    onChange={(n) => setQty(l.key, n)}
                    label={`Quantity of ${l.name}`}
                  />
                  <p className="cart-total">{money(l.unit * l.qty)}</p>
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
          <aside className="summary" aria-label="Order summary">
            <h2>Summary</h2>
            <dl>
              <div>
                <dt>Subtotal</dt>
                <dd>{money(sub)}</dd>
              </div>
              <div>
                <dt>Shipping</dt>
                <dd>{ship ? money(ship) : "Free"}</dd>
              </div>
              <div className="summary-total">
                <dt>Total</dt>
                <dd>{money(sub + ship)}</dd>
              </div>
            </dl>
            <p className="page-note">
              {ship
                ? `Add ${money(FREE_SHIPPING - sub)} more for free US shipping.`
                : "Free US shipping on this order."}
            </p>
            <Link to="/checkout" className="btn btn-spark btn-wide">
              Check out
            </Link>
            <p className="page-note">{brand.shipping}</p>
          </aside>
        </div>
      )}
    </div>
  );
}
