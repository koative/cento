import { ArrowRight, X } from "lucide-react";
import { Link } from "../router";
import { products } from "../content";
import { money, setQty, subtotal, useCart } from "../lib/cart";
import { ProductArt } from "../components/ProductArt";
import { Qty } from "../components/ProductCard";

export function Cart() {
  const cart = useCart();
  const sub = subtotal(cart);

  return (
    <div className="page cart-page">
      <header className="page-head">
        <h1>Your cart</h1>
        <p className="lead">
          Free signed-for shipping and a 45-day home trial on everything here.
        </p>
      </header>

      {cart.length === 0 ? (
        <div className="empty-state">
          <p>Your cart is empty. The quietest place on this site.</p>
          <Link to="/shop" className="btn">
            Shop headphones
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <ul className="cart-lines">
            {cart.map((l) => {
              const p = products.find((x) => x.id === l.id);
              const colour = p?.colours.find((c) => c.name === l.colour);
              return (
                <li key={l.key}>
                  <div className="cart-art">
                    {p && colour && (
                      <ProductArt kind={p.kind} colour={colour} />
                    )}
                  </div>
                  <div className="cart-info">
                    <Link to={"/shop/" + l.id}>{l.name}</Link>
                    <span className="muted">
                      {l.colour} · {money(l.unit)} each
                    </span>
                  </div>
                  <Qty
                    value={l.qty}
                    onChange={(n) => setQty(l.key, n)}
                    label={`Quantity of ${l.name}, ${l.colour}`}
                  />
                  <span className="num line-total">
                    {money(l.unit * l.qty)}
                  </span>
                  <button
                    type="button"
                    className="icon-btn"
                    onClick={() => setQty(l.key, 0)}
                    aria-label={`Remove ${l.name}, ${l.colour}`}
                  >
                    <X size={18} aria-hidden="true" />
                  </button>
                </li>
              );
            })}
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
                <dd>Free</dd>
              </div>
              <div className="total">
                <dt>Total</dt>
                <dd className="num">{money(sub)}</dd>
              </div>
            </dl>
            <Link to="/checkout" className="btn btn-wide">
              Check out <ArrowRight size={18} aria-hidden="true" />
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
