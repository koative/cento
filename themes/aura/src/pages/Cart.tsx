import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { checkoutCopy, products } from "../content";
import { count, money, setQty, subtotal, useCart } from "../lib/cart";
import { Vessel } from "../components/Vessel";
import { Qty } from "../components/Qty";

export function Cart() {
  const cart = useCart();
  const sub = subtotal(cart);
  const toFree = checkoutCopy.freeOver - sub;

  if (!cart.length)
    return (
      <div className="page cart-page">
        <header className="page-head">
          <h1>Your bag is empty</h1>
          <p className="lede">
            Start with one product you will use every day, or let the ritual
            builder choose a full routine.
          </p>
        </header>
        <div className="actions">
          <Link to="/shop" className="btn">
            Shop the essentials <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link to="/ritual" className="btn btn-ghost">
            Build your ritual
          </Link>
        </div>
      </div>
    );

  return (
    <div className="page cart-page">
      <header className="page-head">
        <h1>Your bag</h1>
        <p className="lede">
          {count(cart)} {count(cart) === 1 ? "item" : "items"}, kept on this
          device until you check out.
        </p>
      </header>
      <div className="cart-layout">
        <ul className="cart-lines" aria-label="Items in your bag">
          {cart.map((l) => {
            const p = products.find((x) => x.id === l.id);
            return (
              <li key={l.key}>
                {p && (
                  <Link
                    to={"/shop/" + p.id}
                    className={"tile tile-" + p.tile}
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    <Vessel product={p} />
                  </Link>
                )}
                <div className="line-info">
                  <h2>
                    <Link to={"/shop/" + l.id}>{l.name}</Link>
                  </h2>
                  <p>
                    {l.size} · {money(l.unit)} each
                  </p>
                  <button
                    type="button"
                    className="text-link remove"
                    onClick={() => setQty(l.key, 0)}
                  >
                    Remove<span className="visually-hidden"> {l.name}</span>
                  </button>
                </div>
                <Qty
                  value={l.qty}
                  onChange={(n) => setQty(l.key, n)}
                  label={l.name}
                />
                <p className="line-total">{money(l.unit * l.qty)}</p>
              </li>
            );
          })}
        </ul>
        <aside className="summary" aria-labelledby="sum-h">
          <h2 id="sum-h">Summary</h2>
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
                  : "From " + money(checkoutCopy.delivery[0].price)}
              </dd>
            </div>
          </dl>
          <p className="free-note" aria-live="polite">
            {toFree > 0
              ? `Add ${money(toFree)} more for free standard shipping.`
              : "Standard shipping is on us."}
          </p>
          <Link to="/checkout" className="btn btn-wide">
            Check out <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link to="/shop" className="text-link">
            Keep shopping
          </Link>
          <p className="quiet">Sixty-day returns, opened or not.</p>
        </aside>
      </div>
    </div>
  );
}
