import { ArrowRight, X } from "lucide-react";
import { products } from "../content";
import { Link } from "../router";
import { Qty } from "../components/Qty";
import { count, money, setQty, subtotal, useCart } from "../lib/cart";
import { dayLabel, pickupDays } from "../lib/time";

export function Cart() {
  const cart = useCart();
  const items = count(cart);
  const earliest = pickupDays(cart).find((d) => d.ok);

  if (!cart.length)
    return (
      <header className="page-head empty-bag">
        <h1>Your bag is empty</h1>
        <p className="lede">
          Nothing reserved yet. Order tonight and it's bagged with your name on
          it by seven tomorrow.
        </p>
        <div className="actions">
          <Link to="/shop" className="btn">
            Order ahead <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link to="/today" className="btn btn-ghost">
            See today's bake
          </Link>
        </div>
      </header>
    );

  return (
    <>
      <header className="page-head">
        <h1>Your bag</h1>
        <p className="lede">
          {items} {items === 1 ? "item" : "items"} reserved for pickup. You pay
          at the side window when you collect.
        </p>
      </header>

      <div className="section bag">
        <ul className="bag-lines">
          {cart.map((l) => {
            const p = products.find((x) => x.id === l.id);
            return (
              <li key={l.key}>
                {p && <img src={p.image} alt="" width={160} height={120} />}
                <div className="bag-line-info">
                  <Link to={`/shop/${l.id}`}>{l.name}</Link>
                  <span>{[l.size, l.choice].filter(Boolean).join(" · ")}</span>
                  {l.inscription && <span>Message: “{l.inscription}”</span>}
                </div>
                <Qty
                  value={l.qty}
                  onChange={(n) => setQty(l.key, n)}
                  label={l.name}
                />
                <span className="bag-line-total">{money(l.qty * l.unit)}</span>
                <button
                  type="button"
                  className="icon-btn"
                  onClick={() => setQty(l.key, 0)}
                  aria-label={`Remove ${l.name} from bag`}
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </li>
            );
          })}
        </ul>

        <aside className="bag-summary panel" aria-label="Summary">
          <dl>
            <div>
              <dt>Subtotal</dt>
              <dd>{money(subtotal(cart))}</dd>
            </div>
            <div>
              <dt>Earliest pickup</dt>
              <dd>
                {earliest
                  ? dayLabel(earliest.date, "long")
                  : "No common day in the next two weeks"}
              </dd>
            </div>
          </dl>
          <p className="quiet">Paid at pickup by card or cash. No deposit.</p>
          {earliest ? (
            <Link to="/checkout" className="btn btn-block">
              Choose a pickup time <ArrowRight size={18} aria-hidden="true" />
            </Link>
          ) : (
            <p className="field-error">
              Some items are never baked on the same day. Split them into two
              orders.
            </p>
          )}
          <Link to="/shop" className="text-link">
            Keep shopping
          </Link>
        </aside>
      </div>
    </>
  );
}
