import { ArrowRight, X } from "lucide-react";
import { bookBySlug, checkout, club } from "../content";
import { Link } from "../router";
import { setQty, subtotal, useCart, type CartLine } from "../lib/cart";
import { money } from "../lib/format";
import { BookCover } from "../components/BookCover";
import { Qty } from "../components/Qty";

export function LineCover({ line }: { line: CartLine }) {
  const book = bookBySlug(line.slug === "club" ? club.current : line.slug);
  return book ? (
    <BookCover
      book={book}
      className={line.slug === "club" ? "cover-parcel" : ""}
    />
  ) : null;
}

export function Cart() {
  const cart = useCart();
  const sub = subtotal(cart);
  const toFree = checkout.freeDeliveryOver - sub;

  return (
    <div className="page cart-page">
      <header className="page-head">
        <h1>Your bag</h1>
        {cart.length > 0 && (
          <p className="lede">
            {toFree > 0
              ? `Add ${money(toFree)} more for free bike delivery in Halden, or collect from the shop for free any time.`
              : "Your order qualifies for free bike delivery in Halden."}
          </p>
        )}
      </header>

      {cart.length === 0 ? (
        <div className="empty">
          <h2>Nothing in your bag yet</h2>
          <p>Start at the front table, or let one of us choose for you.</p>
          <div className="actions">
            <Link to="/books" className="btn">
              Browse the catalogue
            </Link>
            <Link to="/staff-picks" className="btn btn-ghost">
              Staff picks
            </Link>
          </div>
        </div>
      ) : (
        <div className="cart-layout">
          <ul className="cart-lines">
            {cart.map((l) => (
              <li key={l.key} className="cart-line">
                <LineCover line={l} />
                <div className="cart-line-main">
                  <h2>
                    {l.slug === "club" ? (
                      <Link to="/book-club">{l.title}</Link>
                    ) : (
                      <Link to={`/books/${l.slug}`}>{l.title}</Link>
                    )}
                  </h2>
                  <p>
                    {l.detail} · {money(l.unit)}
                  </p>
                  <div className="cart-line-actions">
                    <Qty
                      value={l.qty}
                      onChange={(n) => setQty(l.key, n)}
                      label={`Quantity of ${l.title}`}
                      min={0}
                    />
                    <button
                      type="button"
                      className="text-btn"
                      onClick={() => setQty(l.key, 0)}
                    >
                      <X size={16} aria-hidden="true" /> Remove
                    </button>
                  </div>
                </div>
                <p className="cart-line-total">{money(l.unit * l.qty)}</p>
              </li>
            ))}
          </ul>

          <aside className="summary" aria-labelledby="summary-title">
            <h2 id="summary-title">Summary</h2>
            <dl>
              <div>
                <dt>Subtotal</dt>
                <dd>{money(sub)}</dd>
              </div>
              <div>
                <dt>Delivery</dt>
                <dd>Chosen at checkout</dd>
              </div>
            </dl>
            <Link to="/checkout" className="btn btn-wide">
              Go to checkout <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link to="/books" className="text-link">
              Keep browsing
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
