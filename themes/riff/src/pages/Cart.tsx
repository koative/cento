import { Trash2 } from "lucide-react";
import { products, shipping, shows } from "../content";
import { Link } from "../router";
import { countOf, setQty, subtotalOf, useCart } from "../lib/cart";
import { monthDay, money } from "../lib/format";
import { MerchArt } from "../components/MerchArt";
import { Qty } from "../components/Qty";

export function Cart() {
  const lines = useCart();
  const subtotal = subtotalOf(lines);
  const merch = lines.filter((l) => l.kind === "merch");

  return (
    <>
      <header className="page-head wrap">
        <h1 className="display-xl">Cart</h1>
        <p className="lede" aria-live="polite">
          {lines.length
            ? `${countOf(lines)} ${countOf(lines) === 1 ? "item" : "items"}, ${money(subtotal)}`
            : "Nothing in here yet."}
        </p>
      </header>

      <section className="wrap cart-grid" aria-label="Cart contents">
        {lines.length === 0 ? (
          <div className="empty">
            <p>
              Your cart is empty. Grab tickets before your city sells out, or
              pick up the new record.
            </p>
            <div className="actions">
              <Link to="/tour" className="btn btn-red">
                Find a show
              </Link>
              <Link to="/merch" className="btn btn-line">
                Browse merch
              </Link>
            </div>
          </div>
        ) : (
          <>
            <ul className="cart-lines">
              {lines.map((l) => {
                const product =
                  l.kind === "merch"
                    ? products.find((p) => p.id === l.ref)
                    : undefined;
                const show =
                  l.kind === "ticket"
                    ? shows.find((s) => s.id === l.ref)
                    : undefined;
                return (
                  <li key={l.key} className="cart-line">
                    {product ? (
                      <MerchArt product={product} className="cart-thumb" />
                    ) : (
                      <span className="stub cart-thumb" aria-hidden="true">
                        <span>Admit</span>
                        {show ? monthDay(show.date) : "One"}
                      </span>
                    )}
                    <div className="cart-name">
                      <Link to={product ? `/merch/${l.ref}` : `/tour/${l.ref}`}>
                        {l.name}
                      </Link>
                      <span>{l.detail}</span>
                      <span>{money(l.unit)} each</span>
                    </div>
                    <Qty
                      value={l.qty}
                      onChange={(n) => setQty(l.key, n)}
                      label={l.name}
                    />
                    <span className="cart-total">{money(l.unit * l.qty)}</span>
                    <button
                      type="button"
                      className="icon-btn"
                      onClick={() => setQty(l.key, 0)}
                      aria-label={`Remove ${l.name}`}
                    >
                      <Trash2 aria-hidden="true" />
                    </button>
                  </li>
                );
              })}
            </ul>
            <aside className="summary" aria-labelledby="sum">
              <h2 id="sum" className="box-head">
                Summary
              </h2>
              <dl>
                <div>
                  <dt>Subtotal</dt>
                  <dd>{money(subtotal)}</dd>
                </div>
                <div>
                  <dt>Shipping</dt>
                  <dd>
                    {!merch.length
                      ? "E-tickets, no shipping"
                      : subtotalOf(merch) >= shipping.freeOver
                        ? "Free (US standard)"
                        : "From $6 at checkout"}
                  </dd>
                </div>
              </dl>
              <Link to="/checkout" className="btn btn-red btn-block">
                Check out
              </Link>
              <p className="quiet">
                Ticket prices include $1 for the Small Rooms Fund. No booking
                fees, ever.
              </p>
            </aside>
          </>
        )}
      </section>
    </>
  );
}
