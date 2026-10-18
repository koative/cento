import { X } from "lucide-react";
import { Link } from "../router";
import { pickup, products } from "../content";
import { money } from "../lib/util";
import { setQty, subtotalOf, useCart } from "../lib/cart";
import { ProductArt } from "../components/Art";
import { Qty } from "../components/Tiles";

export function Cart() {
  const lines = useCart();
  const subtotal = subtotalOf(lines);

  return (
    <div className="wrap cart-page">
      <header className="page-head page-head-tight">
        <h1>Your pickup order</h1>
        <p className="lede">{pickup.text}</p>
      </header>

      {lines.length ? (
        <div className="cart">
          <ul className="cart-lines" aria-label="Items in your order">
            {lines.map((l) => {
              const product = products.find((p) => p.id === l.productId);
              return (
                <li key={l.key} className="cart-line">
                  <div className="cart-art">
                    {product && <ProductArt product={product} />}
                  </div>
                  <div className="cart-info">
                    <Link to={`/shop/${l.productId}`} className="cart-name">
                      {l.name}
                    </Link>
                    <span>{l.variant}</span>
                    <span className="tnum">{money(l.unit)} each</span>
                  </div>
                  <Qty
                    value={l.qty}
                    onChange={(n) => setQty(l.key, n)}
                    label={`${l.name}, ${l.variant}`}
                    max={product?.limit ?? 24}
                  />
                  <p className="cart-total tnum">{money(l.unit * l.qty)}</p>
                  <button
                    type="button"
                    className="icon-btn"
                    onClick={() => setQty(l.key, 0)}
                    aria-label={`Remove ${l.name}, ${l.variant}`}
                  >
                    <X aria-hidden="true" />
                  </button>
                </li>
              );
            })}
          </ul>
          <aside className="cart-summary" aria-label="Order total">
            <dl>
              <div>
                <dt>Subtotal</dt>
                <dd className="tnum">{money(subtotal)}</dd>
              </div>
              <div>
                <dt>Sales tax</dt>
                <dd>{pickup.taxNote}</dd>
              </div>
              <div className="summary-total">
                <dt>Pay at pickup</dt>
                <dd className="tnum">{money(subtotal)}</dd>
              </div>
            </dl>
            <Link to="/checkout" className="btn btn-copper btn-block btn-lg">
              Choose a pickup time
            </Link>
            <Link to="/shop" className="btn btn-quiet btn-block">
              Keep shopping
            </Link>
          </aside>
        </div>
      ) : (
        <div className="empty">
          <h2>Nothing in the order yet.</h2>
          <p>
            Fresh 4-packs come off the line every Wednesday. Start with the beer
            you liked at the bar.
          </p>
          <Link to="/shop" className="btn btn-ink">
            Browse the shop
          </Link>
        </div>
      )}
    </div>
  );
}
