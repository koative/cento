import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, Check, Gift, Loader2, Lock } from "lucide-react";
import { Link } from "../router";
import { brand, checkout } from "../content";
import { clearCart, subtotal, useCart, type CartLine } from "../lib/cart";
import { money } from "../lib/format";
import { Field, FormAlert, validate, type Errors } from "../components/Field";

const messages = {
  email: {
    missing: "Enter your email so we can send your receipt.",
    invalid:
      "Check the email address: it needs an @ and a domain, like name@example.com.",
  },
  name: { missing: "Enter the name we should put on the order." },
  phone: {
    missing:
      "Enter a phone number so we can reach you about pickup or delivery.",
    invalid: "Use 7 to 15 digits; spaces, + and dashes are fine.",
  },
  attendees: {
    missing: "Enter the first names of the children coming to the workshop.",
  },
  address: {
    missing: "Enter a street address, including the house or apartment number.",
  },
  city: { missing: "Enter your town or city." },
  zip: {
    missing: "Enter your ZIP code.",
    invalid: "A ZIP code is 5 digits, like 97401.",
  },
};

type Order = {
  number: string;
  email: string;
  lines: CartLine[];
  total: number;
  method: string;
  pickup: boolean;
};

export function Checkout() {
  const cart = useCart();
  const [method, setMethod] = useState(checkout.methods[0].id);
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const done = useRef<HTMLHeadingElement>(null);

  const sub = subtotal(cart);
  const chosen =
    checkout.methods.find((m) => m.id === method) ?? checkout.methods[0];
  const shipping =
    chosen.id === "ship" && sub >= checkout.freeOver ? 0 : chosen.price;
  const total = sub + shipping;
  const hasWorkshop = cart.some((l) => l.kind === "workshop");
  const needsAddress = chosen.id !== "pickup";

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
        number: "TK-" + Math.floor(10000 + Math.random() * 89999),
        email,
        lines: cart,
        total,
        method: chosen.label,
        pickup: chosen.id === "pickup",
      });
      clearCart();
      setBusy(false);
    }, 900);
  }

  if (order)
    return (
      <div className="page checkout-page">
        <div className="confirmation" aria-live="polite">
          <span className="confirm-mark" aria-hidden="true">
            <Check size={30} />
          </span>
          <h1 ref={done} tabIndex={-1}>
            Thank you! Order {order.number} is on the counter.
          </h1>
          <p className="lead">
            {order.pickup
              ? `We are wrapping it now. It will be waiting at ${brand.street} by 5 pm; bring your order number.`
              : `We would email ${order.email} when it leaves the shop.`}{" "}
            ({checkout.note})
          </p>
          <ul className="confirm-lines">
            {order.lines.map((l) => (
              <li key={l.key}>
                <span>
                  {l.qty} × {l.name}
                  {l.detail ? `, ${l.detail}` : ""}
                  {l.wrap ? ", gift wrapped" : ""}
                </span>
                <span className="num">{money(l.unit * l.qty)}</span>
              </li>
            ))}
            <li>
              <b>Total · {order.method}</b>
              <b className="num">{money(order.total)}</b>
            </li>
          </ul>
          <div className="actions">
            <Link to="/events" className="btn">
              See what&rsquo;s on in the shop{" "}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link to="/shop" className="btn btn-ghost">
              Back to the shelves
            </Link>
          </div>
        </div>
      </div>
    );

  if (!cart.length)
    return (
      <div className="page checkout-page">
        <header className="page-head">
          <h1>{checkout.title}</h1>
        </header>
        <div className="empty-state">
          <p className="lead">
            Your basket is empty, so there is nothing to check out yet.
          </p>
          <Link to="/shop" className="btn">
            Shop all toys <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
    );

  return (
    <div className="page checkout-page">
      <header className="page-head">
        <h1>{checkout.title}</h1>
        <p className="muted">{checkout.note}</p>
      </header>

      <div className="checkout-layout">
        <form
          className="checkout-form"
          noValidate
          onSubmit={submit}
          aria-busy={busy}
        >
          <fieldset>
            <legend>Your details</legend>
            <Field
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              required
              error={errors.email}
              hint="For your receipt and pickup reminder."
            />
            <div className="field-row">
              <Field
                label="Full name"
                name="name"
                autoComplete="name"
                required
                error={errors.name}
              />
              <Field
                label="Phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                pattern="[0-9 +\-]{7,18}"
                error={errors.phone}
              />
            </div>
            {hasWorkshop && (
              <Field
                label="Children coming to the workshop"
                name="attendees"
                required
                error={errors.attendees}
                hint="First names for the name tags, and anything we should know (allergies, left-handed scissors)."
              />
            )}
          </fieldset>

          <fieldset className="method-options">
            <legend>How would you like your toys?</legend>
            {checkout.methods.map((m) => (
              <label key={m.id} className="radio-card">
                <input
                  type="radio"
                  name="method"
                  value={m.id}
                  checked={method === m.id}
                  onChange={() => setMethod(m.id)}
                />
                <span>
                  <strong>{m.label}</strong>
                  <small>{m.detail}</small>
                </span>
                <span className="num">
                  {m.id === "ship" && sub >= checkout.freeOver
                    ? "Free"
                    : m.price
                      ? money(m.price)
                      : "Free"}
                </span>
              </label>
            ))}
          </fieldset>

          {needsAddress && (
            <fieldset>
              <legend>Delivery address</legend>
              <Field
                label="Street address"
                name="address"
                autoComplete="street-address"
                required
                error={errors.address}
              />
              <div className="field-row">
                <Field
                  label="Town or city"
                  name="city"
                  autoComplete="address-level2"
                  required
                  error={errors.city}
                />
                <Field
                  label="ZIP code"
                  name="zip"
                  autoComplete="postal-code"
                  inputMode="numeric"
                  required
                  pattern="[0-9]{5}"
                  error={errors.zip}
                />
              </div>
            </fieldset>
          )}

          <fieldset>
            <legend>Payment</legend>
            <p className="payment-note">
              <Lock size={18} aria-hidden="true" /> No payment is taken in this
              demo. A live shop would show its card form here.
            </p>
          </fieldset>

          <button type="submit" className="btn btn-wide" disabled={busy}>
            {busy ? (
              <>
                <Loader2 size={18} className="spin" aria-hidden="true" />{" "}
                Placing order…
              </>
            ) : (
              <>Place order · {money(total)}</>
            )}
          </button>
          <FormAlert errors={errors} />
        </form>

        <aside className="order-summary" aria-labelledby="h-order">
          <h2 id="h-order">Your order</h2>
          <ul className="summary-lines">
            {cart.map((l) => (
              <li key={l.key}>
                <img src={l.image} alt="" width="56" height="56" />
                <span>
                  {l.qty} × {l.name}
                  <small>
                    {l.detail}
                    {l.wrap && (
                      <>
                        {l.detail ? " · " : ""}
                        <Gift size={12} aria-hidden="true" /> {l.wrap}
                      </>
                    )}
                  </small>
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
            <div>
              <dt>{chosen.id === "pickup" ? "Pickup" : "Delivery"}</dt>
              <dd className="num">{shipping ? money(shipping) : "Free"}</dd>
            </div>
            <div className="total">
              <dt>Total</dt>
              <dd className="num">{money(total)}</dd>
            </div>
          </dl>
          <Link to="/cart" className="text-link">
            Edit basket
          </Link>
        </aside>
      </div>
    </div>
  );
}
