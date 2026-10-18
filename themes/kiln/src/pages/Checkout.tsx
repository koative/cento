import { useState, type FormEvent } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { Link } from "../router";
import { brand, firing } from "../content";
import {
  clearCart,
  count,
  money,
  subtotal,
  useCart,
  type CartLine,
} from "../lib/cart";
import { Field, validate, type Errors } from "../components/Field";
import { LineThumb } from "../components/LineThumb";

type Order = {
  number: string;
  lines: CartLine[];
  total: number;
  email: string;
  delivery: string;
};

export function Checkout() {
  const cart = useCart();
  const [method, setMethod] = useState<"ship" | "collect">("ship");
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);

  const sub = subtotal(cart);
  const shipping =
    method === "collect" || sub >= brand.shipping.freeOver
      ? 0
      : brand.shipping.flat;
  const total = sub + shipping;

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const next = validate(form, {
      email: {
        missing: "Enter your email for the order confirmation.",
        invalid:
          "Check the email: it needs an @ and a domain, like ana@example.com.",
      },
      name: { missing: "Enter the name for the order." },
      street: { missing: "Enter the street address we should post to." },
      city: { missing: "Enter the town or city." },
      postcode: {
        missing: "Enter the ZIP code.",
        invalid: "Use a five-digit ZIP code, like 04011.",
      },
    });
    setErrors(next);
    if (Object.keys(next).length) return;
    const data = new FormData(form);
    setSending(true);
    window.setTimeout(() => {
      setOrder({
        number: "K" + String(Math.floor(10000 + Math.random() * 90000)),
        lines: cart,
        total,
        email: String(data.get("email")),
        delivery:
          method === "ship"
            ? `Posting to ${data.get("street")}, ${data.get("city")} ${data.get("postcode")}`
            : `Collect from the studio, ${brand.address.slice(1).join(", ")}`,
      });
      clearCart();
      setSending(false);
      window.scrollTo({ top: 0 });
    }, 1100);
  }

  if (order) {
    return (
      <div className="page checkout">
        <section
          className="confirmation"
          role="status"
          aria-labelledby="done-title"
        >
          <Check size={32} aria-hidden="true" />
          <h1 id="done-title">Thank you. Order {order.number} is in.</h1>
          <p className="lead">
            A receipt is on its way to {order.email}. {order.delivery}.
          </p>
          <ul className="order-lines">
            {order.lines.map((l) => (
              <li key={l.key}>
                <LineThumb line={l} />
                <span>
                  {l.qty} × {l.name}
                  <small>{l.detail}</small>
                </span>
                <span>{money(l.unit * l.qty)}</span>
              </li>
            ))}
          </ul>
          <p className="order-total">
            Total <strong>{money(order.total)}</strong>
          </p>
          <p className="muted">
            Shelf pieces ship in 2–3 working days.{" "}
            {order.lines.some((l) => l.made) && firing.madeToOrder}
          </p>
          <p className="quiet-line">
            This is a demo: nothing was sent and no card was charged.
          </p>
          <Link to="/shop" className="btn">
            Back to the shop
          </Link>
        </section>
      </div>
    );
  }

  if (!cart.length) {
    return (
      <div className="page checkout">
        <header className="page-head">
          <h1>Checkout</h1>
          <p className="lead">
            Your bag is empty, so there is nothing to check out yet.
          </p>
        </header>
        <Link to="/shop" className="btn">
          Go to the shop
        </Link>
      </div>
    );
  }

  return (
    <div className="page checkout">
      <Link to="/cart" className="text-link back">
        <ArrowLeft size={16} aria-hidden="true" /> Back to your bag
      </Link>
      <h1>Checkout</h1>
      <div className="checkout-layout">
        <form onSubmit={submit} noValidate className="checkout-form">
          <fieldset>
            <legend>Contact</legend>
            <Field
              label="Email"
              name="email"
              type="email"
              required
              autoComplete="email"
              error={errors.email}
              hint="For the receipt and shipping updates."
            />
          </fieldset>

          <fieldset>
            <legend>Delivery</legend>
            <div className="delivery-options">
              <label>
                <input
                  type="radio"
                  name="method"
                  checked={method === "ship"}
                  onChange={() => setMethod("ship")}
                />
                <span>
                  <strong>Post it to me</strong>
                  {sub >= brand.shipping.freeOver
                    ? "Free on this order"
                    : `${money(brand.shipping.flat)}, free over ${money(brand.shipping.freeOver)}`}
                </span>
              </label>
              <label>
                <input
                  type="radio"
                  name="method"
                  checked={method === "collect"}
                  onChange={() => setMethod("collect")}
                />
                <span>
                  <strong>Collect from the studio</strong>
                  Free. Ready the next opening day.
                </span>
              </label>
            </div>
            <Field
              label="Full name"
              name="name"
              required
              autoComplete="name"
              error={errors.name}
            />
            {method === "ship" && (
              <div className="address-grid">
                <Field
                  label="Street address"
                  name="street"
                  required
                  autoComplete="street-address"
                  error={errors.street}
                  className="span-2"
                />
                <Field
                  label="Town or city"
                  name="city"
                  required
                  autoComplete="address-level2"
                  error={errors.city}
                />
                <Field
                  label="ZIP code"
                  name="postcode"
                  required
                  autoComplete="postal-code"
                  inputMode="numeric"
                  pattern="[0-9]{5}"
                  error={errors.postcode}
                />
              </div>
            )}
          </fieldset>

          <fieldset>
            <legend>Anything else</legend>
            <div className="field">
              <label htmlFor="f-note">Gift note (optional)</label>
              <textarea
                id="f-note"
                name="note"
                rows={3}
                placeholder="We handwrite it on a card and leave the prices out."
              />
            </div>
          </fieldset>

          <button type="submit" className="btn btn-wide" disabled={sending}>
            {sending ? "Placing order…" : `Place order · ${money(total)}`}
          </button>
          <p className="quiet-line">
            This is a demo: nothing is sent and no payment is taken.
          </p>
        </form>

        <aside className="summary" aria-label="Order summary">
          <h2>
            {count(cart)} {count(cart) === 1 ? "piece" : "pieces"}
          </h2>
          <ul className="order-lines">
            {cart.map((l) => (
              <li key={l.key}>
                <LineThumb line={l} />
                <span>
                  {l.qty} × {l.name}
                  <small>{l.detail}</small>
                </span>
                <span>{money(l.unit * l.qty)}</span>
              </li>
            ))}
          </ul>
          <dl>
            <div>
              <dt>Subtotal</dt>
              <dd>{money(sub)}</dd>
            </div>
            <div>
              <dt>{method === "ship" ? "Shipping" : "Collection"}</dt>
              <dd>{shipping ? money(shipping) : "Free"}</dd>
            </div>
            <div className="summary-total">
              <dt>Total</dt>
              <dd>{money(total)}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  );
}
