import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { Link } from "../router";
import { checkout } from "../content";
import {
  clearCart,
  money,
  subtotal,
  useCart,
  type CartLine,
} from "../lib/cart";
import {
  Field,
  FieldError,
  validate,
  type Errors,
  type Messages,
} from "../components/Field";

const contact: Messages = {
  email: {
    missing: "Enter your email for the order confirmation.",
    invalid:
      "Check the email — it needs an @ and a domain, like name@example.com.",
  },
  name: { missing: "Enter your full name for the order." },
  phone: {
    missing: "Enter a phone number so we can book your fitting.",
    invalid: "Use digits, spaces or + only, at least 7 digits.",
  },
};
const address: Messages = {
  street: { missing: "Enter the street address, with house or unit number." },
  city: { missing: "Enter the town or city." },
  postcode: {
    missing: "Enter your ZIP code.",
    invalid: "A ZIP code is 5 digits, like 04521.",
  },
};
const terms: Messages = {
  terms: { missing: "Tick to accept the 14-day return and fitting terms." },
};

type Order = {
  number: string;
  email: string;
  lines: CartLine[];
  total: number;
  method: string;
  shipping: number;
};

export function Checkout() {
  const cart = useCart();
  const [method, setMethod] = useState(checkout.delivery[0].id);
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const done = useRef<HTMLHeadingElement>(null);

  const delivery = checkout.delivery.find((d) => d.id === method)!;
  const sub = subtotal(cart);
  const total = sub + delivery.price;

  useEffect(() => {
    if (order) done.current?.focus();
  }, [order]);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, {
      ...contact,
      ...(method === "collect" ? {} : address),
      ...terms,
    });
    setErrors(found);
    if (Object.keys(found).length) return;
    setBusy(true);
    window.setTimeout(() => {
      setOrder({
        number: "V-" + String(Math.floor(10000 + Math.random() * 89999)),
        email: (form.elements.namedItem("email") as HTMLInputElement).value,
        lines: cart,
        total,
        method: delivery.name,
        shipping: delivery.price,
      });
      clearCart();
      setBusy(false);
    }, 1100);
  }

  if (order)
    return (
      <div className="page checkout-page">
        <div className="confirmation" role="status" aria-live="polite">
          <Check size={32} aria-hidden="true" />
          <h1 ref={done} tabIndex={-1}>
            Order {order.number} is in
          </h1>
          <p className="lead">
            Thank you. We'll call within one working day to book your fitting
            and confirm sizes. A receipt would go to {order.email}.
          </p>
          <ul className="confirm-lines">
            {order.lines.map((l) => (
              <li key={l.key}>
                <span>
                  {l.qty} × {l.name}
                  <small>{l.detail}</small>
                </span>
                <span className="num">{money(l.unit * l.qty)}</span>
              </li>
            ))}
            <li>
              <span>{order.method}</span>
              <span className="num">
                {order.shipping ? money(order.shipping) : "Free"}
              </span>
            </li>
          </ul>
          <p className="summary-total">
            <span>Total</span>
            <strong className="num">{money(order.total)}</strong>
          </p>
          <p className="muted small">
            Demo checkout — nothing was charged and no order was sent.
          </p>
          <div className="actions">
            <Link to="/rides" className="btn">
              Come on a club ride <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link to="/" className="btn btn-ghost">
              Back to the shop
            </Link>
          </div>
        </div>
      </div>
    );

  if (!cart.length)
    return (
      <div className="page checkout-page">
        <header className="page-head">
          <h1>Checkout</h1>
        </header>
        <div className="empty">
          <h2>Your cart is empty</h2>
          <p>Add a bike or a custom build first, then come back here.</p>
          <Link to="/bikes" className="btn">
            Browse bikes <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
    );

  return (
    <div className="page checkout-page">
      <header className="page-head">
        <h1>Checkout</h1>
      </header>
      <div className="cart-layout">
        <form className="form checkout-form" noValidate onSubmit={submit}>
          <fieldset>
            <legend className="legend-big">Contact</legend>
            <Field
              label="Email"
              name="email"
              type="email"
              required
              autoComplete="email"
              error={errors.email}
            />
            <div className="field-pair">
              <Field
                label="Full name"
                name="name"
                required
                autoComplete="name"
                error={errors.name}
              />
              <Field
                label="Phone"
                name="phone"
                type="tel"
                required
                pattern="[+0-9 ]{7,}"
                autoComplete="tel"
                error={errors.phone}
              />
            </div>
          </fieldset>

          <fieldset className="choice-group">
            <legend className="legend-big">Delivery</legend>
            {checkout.delivery.map((d) => (
              <label key={d.id} className="choice">
                <input
                  type="radio"
                  name="delivery"
                  checked={method === d.id}
                  onChange={() => setMethod(d.id)}
                />
                <span className="choice-name">{d.name}</span>
                <span className="choice-detail">{d.detail}</span>
                <span className="choice-price num">
                  {d.price ? money(d.price) : "Free"}
                </span>
              </label>
            ))}
          </fieldset>

          {method !== "collect" && (
            <fieldset>
              <legend className="legend-big">Address</legend>
              <Field
                label="Street address"
                name="street"
                required
                autoComplete="street-address"
                error={errors.street}
              />
              <div className="field-pair">
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
                  inputMode="numeric"
                  pattern="[0-9]{5}"
                  autoComplete="postal-code"
                  error={errors.postcode}
                />
              </div>
            </fieldset>
          )}

          <fieldset>
            <legend className="legend-big">Payment</legend>
            <p className="muted">
              Bikes are paid at your fitting, by card or bank transfer. Custom
              builds take a 30% deposit once you've approved the drawing.
              Nothing is charged online.
            </p>
          </fieldset>

          <div>
            <label className="check">
              <input
                type="checkbox"
                name="terms"
                required
                aria-describedby={errors.terms ? "f-terms-error" : undefined}
              />
              <span>
                I accept the 14-day return policy for stock bikes and understand
                custom builds are made to order.
              </span>
            </label>
            <FieldError id="f-terms" error={errors.terms} />
          </div>

          <button type="submit" className="btn btn-wide" disabled={busy}>
            {busy ? (
              <>
                <Loader2 size={18} className="spin" aria-hidden="true" />{" "}
                Placing order…
              </>
            ) : (
              <>
                Place order · <span className="num">{money(total)}</span>
              </>
            )}
          </button>
          <p className="muted small">
            Demo checkout — nothing is sent or charged.
          </p>
        </form>

        <aside className="order-summary" aria-label="Order summary">
          <h2>Your order</h2>
          <ul className="confirm-lines">
            {cart.map((l) => (
              <li key={l.key}>
                <span>
                  {l.qty} × {l.name}
                  <small>{l.detail}</small>
                </span>
                <span className="num">{money(l.unit * l.qty)}</span>
              </li>
            ))}
            <li>
              <span>{delivery.name}</span>
              <span className="num">
                {delivery.price ? money(delivery.price) : "Free"}
              </span>
            </li>
          </ul>
          <p className="summary-total">
            <span>Total</span>
            <strong className="num">{money(total)}</strong>
          </p>
          <Link to="/cart" className="text-link">
            Edit cart
          </Link>
        </aside>
      </div>
    </div>
  );
}
