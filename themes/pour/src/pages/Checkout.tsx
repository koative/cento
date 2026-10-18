import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { Link } from "../router";
import { brand, checkout } from "../content";
import {
  caseDiscount,
  clearCart,
  money,
  subtotal,
  useCart,
  type CartLine,
} from "../lib/cart";
import { Field, validate, type Errors } from "../components/Field";

const messages = {
  name: { missing: "Enter your name so we know whose case it is." },
  email: {
    missing: "Enter your email for the order confirmation.",
    invalid:
      "Check the email address: it needs an @ and a domain, like name@example.com.",
  },
  phone: {
    missing: "Enter a phone number for pickup or delivery questions.",
    invalid:
      "Use at least 10 digits for the phone number, spaces and dashes are fine.",
  },
  address: {
    missing:
      "Enter the street address, including the house or apartment number.",
  },
  zip: {
    missing: "Enter the ZIP code for delivery.",
    invalid: "Use a 5-digit ZIP code, like 97214.",
  },
  slot: { missing: "Choose a delivery window." },
  age: { missing: "Confirm you are 21 or over to buy wine." },
};

type Order = {
  number: string;
  email: string;
  lines: CartLine[];
  total: number;
  how: string;
};

export function Checkout() {
  const cart = useCart();
  const [how, setHow] = useState<"pickup" | "delivery">("pickup");
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const done = useRef<HTMLHeadingElement>(null);

  const goods = cart.some((l) => l.kind !== "ticket");
  const sub = subtotal(cart);
  const discount = caseDiscount(cart);
  const delivery =
    goods && how === "delivery" && sub - discount < checkout.freeOver
      ? checkout.deliveryFee
      : 0;
  const total = sub - discount + delivery;

  useEffect(() => {
    if (order) done.current?.focus();
  }, [order]);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, messages);
    setErrors(found);
    if (Object.keys(found).length) return;
    setBusy(true);
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    setTimeout(() => {
      setOrder({
        number: "POUR-" + Math.floor(1000 + Math.random() * 8999),
        email,
        lines: cart,
        total,
        how: !goods
          ? "Seats held at the door"
          : how === "pickup"
            ? "Pickup at the shop"
            : "Local delivery",
      });
      clearCart();
      setBusy(false);
    }, 1000);
  }

  if (order)
    return (
      <div className="page checkout-page">
        <div className="confirmation" aria-live="polite">
          <span className="confirm-mark" aria-hidden="true">
            <Check size={28} />
          </span>
          <h1 ref={done} tabIndex={-1}>
            Cheers, it is set aside
          </h1>
          <p className="lead">
            Order <b>{order.number}</b> is confirmed. A note is on its way to{" "}
            {order.email}. {order.how}.
          </p>
          <ul className="confirm-lines">
            {order.lines.map((l) => (
              <li key={l.key}>
                <span>
                  {l.qty} × {l.name} <small>{l.detail}</small>
                </span>
                <span className="num">{money(l.unit * l.qty)}</span>
              </li>
            ))}
            <li className="total">
              <b>Total</b>
              <b className="num">{money(order.total)}</b>
            </li>
          </ul>
          <p className="quiet">{checkout.note}</p>
          <Link to="/bar" className="btn">
            See what is open at the bar{" "}
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
    );

  if (!cart.length)
    return (
      <div className="page checkout-page">
        <h1>Nothing to check out</h1>
        <p className="lead">
          Your case is empty. Add a bottle, a seat at a tasting or a club
          membership first.
        </p>
        <Link to="/wines" className="btn">
          Browse the wines <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </div>
    );

  return (
    <div className="page checkout-page">
      <h1>Checkout</h1>
      <div className="cart-layout">
        <form
          className="checkout-form"
          noValidate
          onSubmit={submit}
          aria-busy={busy}
        >
          <fieldset>
            <legend>Your details</legend>
            <Field
              label="Full name"
              name="name"
              autoComplete="name"
              required
              error={errors.name}
            />
            <div className="field-row">
              <Field
                label="Email"
                name="email"
                type="email"
                autoComplete="email"
                required
                error={errors.email}
              />
              <Field
                label="Phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                pattern="[\d\s\-\+\(\)]{10,}"
                hint="We text when it is ready."
                error={errors.phone}
              />
            </div>
          </fieldset>

          {goods && (
            <fieldset>
              <legend>Pickup or delivery</legend>
              <div className="options">
                <label className="option">
                  <input
                    type="radio"
                    name="how"
                    value="pickup"
                    checked={how === "pickup"}
                    onChange={() => setHow("pickup")}
                  />
                  <span>
                    <b>Pickup at {brand.street}</b>
                    <small>{checkout.pickup} Free.</small>
                  </span>
                </label>
                <label className="option">
                  <input
                    type="radio"
                    name="how"
                    value="delivery"
                    checked={how === "delivery"}
                    onChange={() => setHow("delivery")}
                  />
                  <span>
                    <b>Local delivery</b>
                    <small>
                      Within five miles, {money(checkout.deliveryFee)}, free
                      over {money(checkout.freeOver)}.
                    </small>
                  </span>
                </label>
              </div>
              {how === "delivery" && (
                <>
                  <Field
                    label="Street address"
                    name="address"
                    autoComplete="street-address"
                    required
                    error={errors.address}
                  />
                  <div className="field-row">
                    <Field
                      label="ZIP code"
                      name="zip"
                      autoComplete="postal-code"
                      inputMode="numeric"
                      required
                      pattern="[0-9]{5}"
                      error={errors.zip}
                    />
                    <div className="field">
                      <label htmlFor="f-slot">Delivery window</label>
                      <select
                        id="f-slot"
                        name="slot"
                        required
                        defaultValue=""
                        aria-invalid={errors.slot ? true : undefined}
                        aria-describedby={
                          errors.slot ? "f-slot-error" : undefined
                        }
                      >
                        <option value="" disabled>
                          Choose a window
                        </option>
                        {checkout.slots.map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                      {errors.slot && (
                        <p className="field-error" id="f-slot-error">
                          {errors.slot}
                        </p>
                      )}
                    </div>
                  </div>
                </>
              )}
            </fieldset>
          )}

          <fieldset>
            <legend>Anything else</legend>
            <div className="field">
              <label htmlFor="f-notes">Note for the shop (optional)</label>
              <textarea
                id="f-notes"
                name="notes"
                rows={3}
                placeholder="A gift message, a dietary need for a tasting, a doorbell that does not work"
              />
            </div>
            {goods && (
              <div className="field">
                <label className="check">
                  <input
                    type="checkbox"
                    name="age"
                    required
                    aria-invalid={errors.age ? true : undefined}
                    aria-describedby={errors.age ? "f-age-error" : undefined}
                  />
                  I am 21 or over and will show ID at pickup or delivery.
                </label>
                {errors.age && (
                  <p className="field-error" id="f-age-error">
                    {errors.age}
                  </p>
                )}
              </div>
            )}
          </fieldset>

          <p className="quiet">
            Payment is taken by card when you collect or on delivery.{" "}
            {checkout.note}
          </p>
          <button type="submit" className="btn btn-block" disabled={busy}>
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
        </form>

        <aside className="summary" aria-labelledby="summary-title">
          <h2 id="summary-title">Your case</h2>
          <ul className="summary-lines">
            {cart.map((l) => (
              <li key={l.key}>
                <span>
                  {l.qty} × {l.name}
                  <small>{l.detail}</small>
                </span>
                <span className="num">{money(l.unit * l.qty)}</span>
              </li>
            ))}
          </ul>
          <dl>
            <div>
              <dt>Subtotal</dt>
              <dd className="num">{money(sub)}</dd>
            </div>
            {discount > 0 && (
              <div>
                <dt>Case discount</dt>
                <dd className="num">−{money(discount)}</dd>
              </div>
            )}
            {goods && (
              <div>
                <dt>{how === "pickup" ? "Pickup" : "Delivery"}</dt>
                <dd className="num">{delivery ? money(delivery) : "Free"}</dd>
              </div>
            )}
            <div className="total">
              <dt>Total</dt>
              <dd className="num">{money(total)}</dd>
            </div>
          </dl>
          <Link to="/cart" className="text-link">
            Edit your case
          </Link>
        </aside>
      </div>
    </div>
  );
}
