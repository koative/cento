import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { checkout } from "../content";
import { money, priced, setQty, subtotal, useCart } from "../lib/cart";
import { Qty } from "../components/Qty";

export function Bag() {
  const cart = useCart();
  const lines = priced(cart);
  const sub = subtotal(cart);
  const toFree = checkout.freeOver - sub;

  if (!lines.length)
    return (
      <div className="page bag-page">
        <header className="page-head">
          <h1 className="display">Your bag</h1>
          <p className="lede">
            Your bag is empty. The collection is waiting, and every piece can be
            altered in store for free.
          </p>
        </header>
        <div className="actions">
          <Link to="/shop" className="btn btn-ink">
            Shop the collection
          </Link>
          <Link to="/collection" className="btn btn-line">
            Browse the lookbook
          </Link>
        </div>
      </div>
    );

  return (
    <div className="page bag-page">
      <header className="page-head">
        <h1 className="display">Your bag</h1>
      </header>

      <div className="bag-layout">
        <ul className="bag-lines" aria-label="Pieces in your bag">
          {lines.map((l) => {
            const image =
              l.product.colours.find((c) => c.name === l.colour)?.image ??
              l.product.images[0];
            return (
              <li key={l.key} className="bag-line">
                <img src={image} alt="" width={96} height={120} />
                <div className="bag-line-text">
                  <Link to={`/shop/${l.product.id}`}>{l.product.name}</Link>
                  <span className="fine">
                    {l.colour} ·{" "}
                    {l.size === "One size" ? l.size : `Size ${l.size}`} ·{" "}
                    <span className="price">{money(l.product.price)}</span>
                  </span>
                  <button
                    type="button"
                    className="text-button"
                    onClick={() => setQty(l.key, 0)}
                  >
                    Remove
                    <span className="visually-hidden"> {l.product.name}</span>
                  </button>
                </div>
                <Qty
                  value={l.qty}
                  onChange={(n) => setQty(l.key, n)}
                  label={`Quantity of ${l.product.name}`}
                />
                <span className="bag-line-total price">
                  {money(l.qty * l.product.price)}
                </span>
              </li>
            );
          })}
        </ul>

        <aside className="summary" aria-labelledby="summary-title">
          <h2 id="summary-title">Summary</h2>
          <dl>
            <div>
              <dt>Subtotal</dt>
              <dd className="price">{money(sub)}</dd>
            </div>
            <div>
              <dt>Delivery</dt>
              <dd>
                {toFree <= 0
                  ? "Complimentary"
                  : "From " + money(checkout.delivery[0].price)}
              </dd>
            </div>
          </dl>
          <p className="fine" aria-live="polite">
            {toFree > 0
              ? `Add ${money(toFree)} more for complimentary standard delivery.`
              : "Your order ships with complimentary standard delivery."}
          </p>
          <Link to="/checkout" className="btn btn-ink btn-wide">
            Checkout <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <p className="fine">
            Free returns within 30 days, by post or in any store.
          </p>
        </aside>
      </div>
    </div>
  );
}
