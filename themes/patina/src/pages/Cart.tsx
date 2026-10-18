import { ArrowRight, Trash2 } from "lucide-react";
import { Link } from "../router";
import { Qty } from "../components/Qty";
import { money, setQty, subtotal, useCart } from "../lib/cart";

export function Cart() {
  const cart = useCart();

  return (
    <div className="page cart">
      <header className="page-head">
        <h1>Your cart</h1>
        <p className="lead">
          {cart.length
            ? "Pieces in your cart are not reserved until you check out — or call us and we will hold them for 48 hours."
            : "Nothing in here yet. The floor changes every Thursday."}
        </p>
      </header>

      {cart.length ? (
        <div className="cart-layout">
          <ul className="cart-lines" aria-label="Pieces in your cart">
            {cart.map((l) => (
              <li key={l.key} className="cart-line">
                <Link
                  to={"/shop/" + l.id}
                  className="cart-line-media"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <img
                    src={l.piece.images[0].src}
                    alt=""
                    width={l.piece.images[0].w}
                    height={l.piece.images[0].h}
                  />
                </Link>
                <div className="cart-line-info">
                  <h2>
                    <Link to={"/shop/" + l.id}>{l.piece.name}</Link>
                  </h2>
                  <p>
                    {l.piece.stock} · {l.finish.label}
                    {l.finish.delta ? ` (+${money(l.finish.delta)})` : ""}
                  </p>
                  <p className="quiet">{l.finish.note}</p>
                </div>
                <div className="cart-line-qty">
                  {l.piece.available > 1 ? (
                    <Qty
                      value={l.qty}
                      onChange={(n) => setQty(l.key, n)}
                      label={`${l.piece.unit ?? "piece"}s of ${l.piece.name}`}
                      max={l.piece.available}
                    />
                  ) : (
                    <span className="quiet">One of a kind</span>
                  )}
                  <button
                    type="button"
                    className="text-button"
                    onClick={() => setQty(l.key, 0)}
                  >
                    <Trash2 size={16} aria-hidden="true" /> Remove
                    <span className="visually-hidden"> {l.piece.name}</span>
                  </button>
                </div>
                <p className="cart-line-total">{money(l.unit * l.qty)}</p>
              </li>
            ))}
          </ul>
          <aside className="summary" aria-label="Cart summary">
            <dl>
              <div>
                <dt>Subtotal</dt>
                <dd>{money(subtotal(cart))}</dd>
              </div>
              <div>
                <dt>Delivery</dt>
                <dd>Chosen at checkout, from free</dd>
              </div>
            </dl>
            <Link to="/checkout" className="btn btn-block">
              Checkout <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link to="/shop" className="text-link">
              Keep looking
            </Link>
          </aside>
        </div>
      ) : (
        <div className="empty">
          <Link to="/shop" className="btn">
            Shop the floor <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link to="/rooms" className="btn btn-ghost">
            Browse room sets
          </Link>
        </div>
      )}
    </div>
  );
}
