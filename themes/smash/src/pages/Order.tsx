import { ArrowRight, Trash2 } from "lucide-react";
import { Link } from "../router";
import { menu, ordering } from "../content";
import { money } from "../lib";
import { countOf, setQty, subtotalOf, useCart } from "../cart";
import { MenuCard } from "../components/MenuCard";
import { Qty } from "../components/Qty";

export function Order() {
  const lines = useCart();
  const subtotal = subtotalOf(lines);
  const hasSide = lines.some(
    (l) => menu.find((m) => m.id === l.id)?.category === "sides",
  );
  const upsell = menu
    .filter((m) => (hasSide ? m.category === "shakes" : m.category === "sides"))
    .slice(0, 3);

  return (
    <div className="page order-page">
      <header className="page-head wrap">
        <h1>Your order</h1>
        <p className="lede">
          {lines.length
            ? `${countOf(lines)} ${countOf(lines) === 1 ? "thing" : "things"} on the tray. Choose pickup or delivery at checkout.`
            : "Nothing on the tray yet."}
        </p>
      </header>

      {lines.length === 0 ? (
        <section className="wrap empty" aria-labelledby="empty-h">
          <h2 id="empty-h">Start with the one most people get.</h2>
          <p>
            The Smash is two patties, American, pickles, onion and Smash sauce.
            Or build your own from scratch.
          </p>
          <div className="actions">
            <Link to="/menu/the-smash" className="btn btn-primary">
              Get The Smash
            </Link>
            <Link to="/menu" className="btn btn-ghost">
              See the menu
            </Link>
          </div>
        </section>
      ) : (
        <div className="wrap order-grid">
          <section aria-labelledby="lines-h">
            <h2 id="lines-h" className="sr-only">
              Items
            </h2>
            <ul className="ticket ticket-lines">
              {lines.map((l) => (
                <li key={l.key}>
                  <div className="line-main">
                    <Link
                      to={`/${l.kind === "menu" ? "menu" : "merch"}/${l.id}`}
                      className="line-name"
                    >
                      {l.name}
                    </Link>
                    <p className="line-detail">{l.detail}</p>
                  </div>
                  <Qty
                    value={l.qty}
                    onChange={(n) => setQty(l.key, n)}
                    label={l.name}
                  />
                  <p className="line-price">{money(l.unit * l.qty)}</p>
                  <button
                    type="button"
                    className="icon-btn"
                    onClick={() => setQty(l.key, 0)}
                    aria-label={`Remove ${l.name}`}
                  >
                    <Trash2 aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <aside className="summary" aria-labelledby="sum-h">
            <h2 id="sum-h">Subtotal</h2>
            <p className="summary-total">{money(subtotal)}</p>
            <p className="summary-note">
              Tax ({(ordering.taxRate * 100).toFixed(0)}%) and any delivery fee
              are added at checkout. Delivery has a{" "}
              {money(ordering.deliveryMinimum)} minimum.
            </p>
            <Link to="/checkout" className="btn btn-primary btn-lg btn-block">
              Checkout <ArrowRight aria-hidden="true" />
            </Link>
            <Link to="/menu" className="text-link">
              Keep adding
            </Link>
          </aside>
        </div>
      )}

      <section className="wrap order-upsell" aria-labelledby="upsell-h">
        <h2 id="upsell-h">
          {hasSide ? "A shake to finish?" : "Nobody regrets fries."}
        </h2>
        <div className="card-grid">
          {upsell.map((m) => (
            <MenuCard key={m.id} item={m} />
          ))}
        </div>
      </section>
    </div>
  );
}
