import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { metals, pieces } from "../content";
import { maxQty, money, setQty, subtotal, useCart } from "../lib/cart";
import { Plate } from "../components/Plate";
import { Qty } from "../components/Bits";

export function Cart() {
  const cart = useCart();
  const total = subtotal(cart);

  return (
    <div className="wrap page">
      <header className="page-head">
        <h1>Your bag</h1>
      </header>

      {cart.length === 0 ? (
        <div className="empty">
          <h2>Nothing in the bag yet</h2>
          <p>
            Browse the collections, or draw a ring of your own in the builder
            and add it from there.
          </p>
          <div className="actions">
            <Link to="/collections" className="btn">
              See the collections
            </Link>
            <Link to="/ring-builder" className="btn btn-quiet">
              Open the ring builder
            </Link>
          </div>
        </div>
      ) : (
        <div className="bag">
          <ul className="bag-lines">
            {cart.map((line) => {
              const piece = pieces.find((p) => p.slug === line.slug);
              return (
                <li key={line.key} className="bag-line">
                  <div className="tray bag-thumb">
                    <Plate art={line.art} metal={line.metal} />
                  </div>
                  <div className="bag-line-info">
                    <h2>
                      <Link
                        to={
                          piece
                            ? `/collections/${piece.collection}/${piece.slug}`
                            : "/ring-builder"
                        }
                      >
                        {line.name}
                      </Link>
                    </h2>
                    <p>{metals[line.metal].name}</p>
                    {line.details.map((d) => (
                      <p key={d}>{d}</p>
                    ))}
                    <button
                      type="button"
                      className="text-button"
                      onClick={() => setQty(line.key, 0)}
                    >
                      Remove
                    </button>
                  </div>
                  <Qty
                    value={line.qty}
                    onChange={(n) => setQty(line.key, n)}
                    label={line.name}
                    max={maxQty}
                    min={0}
                  />
                  <p className="price">{money(line.unit * line.qty)}</p>
                </li>
              );
            })}
          </ul>

          <aside className="ledger bag-summary">
            <h2>Summary</h2>
            <dl>
              <div>
                <dt>Subtotal</dt>
                <dd>{money(total)}</dd>
              </div>
              <div>
                <dt>Insured delivery</dt>
                <dd>Free</dd>
              </div>
              <div className="ledger-total">
                <dt>Total</dt>
                <dd>{money(total)}</dd>
              </div>
            </dl>
            <Link to="/checkout" className="btn btn-wide">
              Check out <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <p className="field-hint">
              Every piece includes lifetime cleaning, claw checks and a free
              resize in the first year.
            </p>
          </aside>
        </div>
      )}
    </div>
  );
}
