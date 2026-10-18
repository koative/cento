import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { frames } from "../content";
import { count, money, plural, setQty, subtotal, useCart } from "../lib/cart";
import { FrameArt } from "../components/FrameArt";
import { Qty } from "../components/FrameCard";

export function Cart() {
  const cart = useCart();
  const total = subtotal(cart);

  return (
    <div className="page cart-page">
      <header className="page-head">
        <h1>Your bag</h1>
        <p className="lede" aria-live="polite">
          {cart.length
            ? `${plural(count(cart), "pair")} · ${money(total)}`
            : "Your bag is empty."}
        </p>
      </header>

      {cart.length === 0 ? (
        <div className="empty">
          <p>Find a frame first, or let three questions narrow it down.</p>
          <div className="actions">
            <Link to="/frames" className="btn">
              Shop frames <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link to="/face-shapes" className="btn btn-quiet">
              Face-shape finder
            </Link>
          </div>
        </div>
      ) : (
        <div className="cart">
          <ul className="cart-lines">
            {cart.map((l) => {
              const frame = frames.find((f) => f.id === l.id);
              const colour =
                frame?.colours.find((c) => c.name === l.colour) ??
                frame?.colours[0];
              return (
                <li key={l.key}>
                  <div className="cart-thumb">
                    {frame && colour && (
                      <FrameArt frame={frame} colour={colour} />
                    )}
                  </div>
                  <div className="cart-text">
                    <h2>
                      <Link to={`/frames/${l.id}`}>{l.name}</Link>
                    </h2>
                    <p>
                      {l.colour} · {l.size}
                    </p>
                    <p>
                      {l.lens}
                      {l.index && ` · ${l.index}`}
                      {l.reactive && " · Light-reactive"}
                    </p>
                  </div>
                  <Qty
                    value={l.qty}
                    onChange={(n) => setQty(l.key, n)}
                    label={`${l.name} in ${l.colour}`}
                  />
                  <p className="line-total">{money(l.unit * l.qty)}</p>
                  <button
                    type="button"
                    className="text-button"
                    onClick={() => setQty(l.key, 0)}
                  >
                    Remove
                  </button>
                </li>
              );
            })}
          </ul>
          <aside className="cart-summary" aria-label="Order summary">
            <dl className="summary-list">
              <div>
                <dt>Subtotal</dt>
                <dd>{money(total)}</dd>
              </div>
              <div>
                <dt>Shipping</dt>
                <dd>Free</dd>
              </div>
              <div className="total">
                <dt>Total</dt>
                <dd>{money(total)}</dd>
              </div>
            </dl>
            <p className="field-hint">
              You'll add your prescription at checkout, or send it later.
            </p>
            <Link to="/checkout" className="btn btn-wide">
              Checkout <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link to="/frames" className="text-link">
              Keep shopping
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
