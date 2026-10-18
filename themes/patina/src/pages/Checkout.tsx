import { useRef, useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "../router";
import { brand, visit } from "../content";
import { Field, validate, type Errors } from "../components/Field";
import { clearCart, money, subtotal, useCart, type Line } from "../lib/cart";

type Order = {
  number: string;
  lines: Line[];
  delivery: { name: string; price: number };
  total: number;
  email: string;
};

export function Checkout() {
  const cart = useCart();
  const [method, setMethod] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const done = useRef<HTMLHeadingElement>(null);

  const delivery = visit.delivery[method];
  const collecting = delivery.price === 0;
  const total = subtotal(cart) + delivery.price;

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, {
      "c-name": { missing: "Add the name for the order." },
      "c-email": {
        missing: "Add an email for the confirmation.",
        invalid:
          "That email is missing something — check the @ and the domain.",
      },
      "c-phone": {
        missing:
          "Add a phone number — the drivers call an hour before they arrive.",
        invalid: "Use digits, spaces or dashes for the phone number.",
      },
      ...(collecting
        ? {}
        : {
            "c-street": { missing: "Add the street address for delivery." },
            "c-city": { missing: "Add the town or city." },
            "c-zip": {
              missing: "Add the ZIP code.",
              invalid: "Use a five-digit ZIP code, like 02911.",
            },
            "c-floor": {
              missing: "Tell us which floor the pieces are going to.",
            },
          }),
      "c-measured": {
        missing:
          "Confirm you have measured your doorways — the fit check on each piece page helps.",
      },
    });
    setErrors(found);
    if (Object.keys(found).length) return;
    setSending(true);
    const email = String(new FormData(form).get("c-email"));
    setTimeout(() => {
      setOrder({
        number: "PA-" + String(Math.floor(10000 + Math.random() * 89999)),
        lines: cart,
        delivery,
        total,
        email,
      });
      clearCart();
      setSending(false);
      requestAnimationFrame(() => done.current?.focus());
    }, 1100);
  }

  if (order) {
    return (
      <div className="page checkout" aria-live="polite">
        <div className="confirmation">
          <Check size={32} aria-hidden="true" />
          <h1 tabIndex={-1} ref={done}>
            Thank you. Order {order.number} is on hold for you.
          </h1>
          <p className="lead">
            We have taken these pieces off the floor. A confirmation and an
            invoice will go to {order.email} within the hour, and we will call
            to agree a {order.delivery.price ? "delivery" : "collection"} day.
          </p>
          <ul className="ledger">
            {order.lines.map((l) => (
              <li key={l.key}>
                <span>
                  {l.qty > 1 ? `${l.qty} × ` : ""}
                  {l.piece.name} · {l.finish.label}
                </span>
                <span>{money(l.unit * l.qty)}</span>
              </li>
            ))}
            <li>
              <span>{order.delivery.name}</span>
              <span>
                {order.delivery.price ? money(order.delivery.price) : "Free"}
              </span>
            </li>
            <li className="ledger-total">
              <span>Total, payable on invoice</span>
              <span>{money(order.total)}</span>
            </li>
          </ul>
          <p className="quiet">
            This is a demo: no order was placed and nothing was charged.
          </p>
          <Link to="/shop" className="btn">
            Back to the floor <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
    );
  }

  if (!cart.length) {
    return (
      <div className="page checkout">
        <header className="page-head">
          <h1>Checkout</h1>
          <p className="lead">
            Your cart is empty, so there is nothing to check out yet.
          </p>
        </header>
        <Link to="/shop" className="btn">
          Shop the floor <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </div>
    );
  }

  return (
    <div className="page checkout">
      <header className="page-head">
        <h1>Checkout</h1>
        <p className="lead">
          No card details here: we confirm the delivery day by phone, then send
          an invoice you can pay by transfer or card.
        </p>
      </header>

      <div className="checkout-layout">
        <form className="checkout-form" noValidate onSubmit={submit}>
          <fieldset>
            <legend>Your details</legend>
            <Field
              label="Full name"
              name="c-name"
              autoComplete="name"
              required
              error={errors["c-name"]}
            />
            <div className="field-row">
              <Field
                label="Email"
                name="c-email"
                type="email"
                autoComplete="email"
                required
                error={errors["c-email"]}
              />
              <Field
                label="Phone"
                name="c-phone"
                type="tel"
                autoComplete="tel"
                required
                pattern="[0-9\s\(\)\+\-]{7,}"
                error={errors["c-phone"]}
              />
            </div>
          </fieldset>

          <fieldset className="delivery-options">
            <legend>Delivery</legend>
            {visit.delivery.map((d, i) => (
              <label key={d.name} className="finish-option">
                <input
                  type="radio"
                  name="c-method"
                  checked={method === i}
                  onChange={() => setMethod(i)}
                />
                <span className="finish-label">{d.name}</span>
                <span className="finish-price">
                  {d.price ? money(d.price) : "Free"}
                </span>
                <span className="finish-note">{d.text}</span>
              </label>
            ))}
          </fieldset>

          {collecting ? (
            <p className="collect-note">
              Collect from Loading Bay 2, {brand.addressShort}, Thursday to
              Sunday. Bring a vehicle that takes the largest piece — the
              dimensions are in your confirmation.
            </p>
          ) : (
            <fieldset>
              <legend>Where it is going</legend>
              <Field
                label="Street address"
                name="c-street"
                autoComplete="street-address"
                required
                error={errors["c-street"]}
              />
              <div className="field-row field-row-3">
                <Field
                  label="Town or city"
                  name="c-city"
                  autoComplete="address-level2"
                  required
                  error={errors["c-city"]}
                />
                <Field
                  label="State"
                  name="c-state"
                  autoComplete="address-level1"
                  defaultValue="RI"
                />
                <Field
                  label="ZIP code"
                  name="c-zip"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  pattern="\d{5}"
                  required
                  error={errors["c-zip"]}
                />
              </div>
              <div className="field-row">
                <Field
                  as="select"
                  label="Which floor?"
                  name="c-floor"
                  required
                  defaultValue=""
                  error={errors["c-floor"]}
                >
                  <option value="" disabled>
                    Choose a floor
                  </option>
                  <option>Ground floor, step-free</option>
                  <option>Ground floor, with steps</option>
                  <option>1st – 3rd floor</option>
                  <option>4th floor or higher</option>
                </Field>
                <label className="check check-field">
                  <input type="checkbox" name="c-lift" />
                  <span>There is a lift that takes furniture</span>
                </label>
              </div>
              <Field
                as="textarea"
                label="Anything the drivers should know (optional)"
                name="c-notes"
                rows={3}
                hint="Tight turns on the stair, parking, a gate code."
              />
            </fieldset>
          )}

          <label className="check">
            <input
              type="checkbox"
              name="c-measured"
              required
              aria-invalid={errors["c-measured"] ? true : undefined}
              aria-describedby={
                errors["c-measured"] ? "c-measured-error" : undefined
              }
            />
            <span>
              I have measured my doorways and the space each piece is going to
            </span>
          </label>
          {errors["c-measured"] && (
            <p className="field-error" id="c-measured-error">
              {errors["c-measured"]}
            </p>
          )}

          <button type="submit" className="btn btn-block" disabled={sending}>
            {sending ? "Placing your order…" : `Place order · ${money(total)}`}
          </button>
          <p className="quiet">
            Demo checkout — no order is placed and nothing is charged.
          </p>
        </form>

        <aside className="summary" aria-label="Order summary">
          <h2>Your order</h2>
          <ul className="summary-lines">
            {cart.map((l) => (
              <li key={l.key}>
                <img
                  src={l.piece.images[0].src}
                  alt=""
                  width={l.piece.images[0].w}
                  height={l.piece.images[0].h}
                />
                <span>
                  {l.qty > 1 ? `${l.qty} × ` : ""}
                  {l.piece.name}
                  <small>{l.finish.label}</small>
                </span>
                <span>{money(l.unit * l.qty)}</span>
              </li>
            ))}
          </ul>
          <dl>
            <div>
              <dt>Subtotal</dt>
              <dd>{money(subtotal(cart))}</dd>
            </div>
            <div>
              <dt>Delivery</dt>
              <dd>{delivery.price ? money(delivery.price) : "Free"}</dd>
            </div>
            <div className="summary-total">
              <dt>Total</dt>
              <dd>{money(total)}</dd>
            </div>
          </dl>
          <Link to="/cart" className="text-link">
            Edit cart
          </Link>
        </aside>
      </div>
    </div>
  );
}
