import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, Check, Loader2, Lock } from "lucide-react";
import { Link } from "../router";
import { brand, checkout } from "../content";
import {
  clearCart,
  money,
  subtotal,
  useCart,
  type CartLine,
} from "../lib/cart";
import { Field, Select, validate, type Errors } from "../components/Field";
import { Barcode } from "../components/Barcode";

const messages = {
  email: {
    missing: "Enter your email for the receipt and tracking.",
    invalid: "Check the email: it needs an @ and a domain like example.com.",
  },
  name: { missing: "Enter the name for the shipping label." },
  address: {
    missing: "Enter a street address with the building or unit number.",
  },
  city: { missing: "Enter your town or city." },
  postcode: {
    missing: "Enter your ZIP or postcode.",
    invalid: "Use 3 to 10 letters, numbers or spaces for the ZIP or postcode.",
  },
  country: {
    missing: "Choose United States or Canada; we do not ship elsewhere yet.",
  },
};

type Order = {
  number: string;
  email: string;
  lines: CartLine[];
  total: number;
  method: string;
};

export function Checkout() {
  const cart = useCart();
  const [method, setMethod] = useState(checkout.delivery[0].id);
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const done = useRef<HTMLHeadingElement>(null);

  const sub = subtotal(cart);
  const delivery = checkout.delivery.find((d) => d.id === method)!;
  const priceOf = (d: (typeof checkout.delivery)[number]) =>
    d.id === "standard" && sub >= checkout.freeOver ? 0 : d.price;
  const shipping = priceOf(delivery);
  const total = sub + shipping;
  const pickup = method === "pickup";

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
        number: "DRP-" + Math.floor(100000 + Math.random() * 899999),
        email,
        lines: cart,
        total,
        method: delivery.label,
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
            <Check size={28} />
          </span>
          <h1 ref={done} tabIndex={-1}>
            Got it. Order {order.number} is yours.
          </h1>
          <p className="lead">
            A receipt is on its way to {order.email}. {checkout.note}
          </p>
          <div className="receipt">
            <ul>
              {order.lines.map((l) => (
                <li key={l.key}>
                  <span>
                    {l.qty} × {l.name}, {l.color}, {l.size}
                  </span>
                  <span className="num">{money(l.unit * l.qty)}</span>
                </li>
              ))}
              <li className="receipt-total">
                <span>Total · {order.method}</span>
                <span className="num">{money(order.total)}</span>
              </li>
            </ul>
            <Barcode value={order.number} height={44} />
            <p className="num receipt-no">{order.number}</p>
          </div>
          <Link to="/drops" className="btn btn-signal">
            See what drops next <ArrowRight size={18} aria-hidden="true" />
          </Link>
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
          <p>Your bag is empty, so there is nothing to check out yet.</p>
          <Link to="/shop" className="btn btn-signal">
            Shop what is left <ArrowRight size={18} aria-hidden="true" />
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
            <legend>Contact</legend>
            <Field
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              required
              error={errors.email}
              hint="Receipt and tracking go here."
            />
          </fieldset>

          <fieldset className="delivery-options">
            <legend>Delivery</legend>
            {checkout.delivery.map((d) => (
              <label key={d.id} className="radio-card">
                <input
                  type="radio"
                  name="delivery"
                  value={d.id}
                  checked={method === d.id}
                  onChange={() => setMethod(d.id)}
                />
                <span>
                  <strong>{d.label}</strong>
                  <small>{d.detail}</small>
                </span>
                <span className="num">
                  {priceOf(d) ? money(priceOf(d)) : "Free"}
                </span>
              </label>
            ))}
          </fieldset>

          <fieldset>
            <legend>{pickup ? "Who is collecting" : "Shipping address"}</legend>
            <Field
              label="Full name"
              name="name"
              autoComplete="name"
              required
              error={errors.name}
              hint={pickup ? "Bring an ID with this name." : undefined}
            />
            {pickup ? (
              <p className="notice">
                Collect from {brand.address.join(", ")}, from the Sunday after
                the drop. Bring the order number.
              </p>
            ) : (
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
                    label="Town or city"
                    name="city"
                    autoComplete="address-level2"
                    required
                    error={errors.city}
                  />
                  <Field
                    label="ZIP or postcode"
                    name="postcode"
                    autoComplete="postal-code"
                    required
                    pattern="[A-Za-z0-9 \-]{3,10}"
                    error={errors.postcode}
                  />
                </div>
                <Select
                  label="Country"
                  name="country"
                  required
                  defaultValue=""
                  autoComplete="country-name"
                  error={errors.country}
                >
                  <option value="" disabled>
                    Choose a country
                  </option>
                  {checkout.countries.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </Select>
              </>
            )}
          </fieldset>

          <fieldset>
            <legend>Payment</legend>
            <p className="notice">
              <Lock size={18} aria-hidden="true" /> No payment is taken in this
              demo. A live store would show its card form here.
            </p>
          </fieldset>

          <button
            type="submit"
            className="btn btn-signal btn-wide"
            disabled={busy}
          >
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
          {Object.keys(errors).length > 0 && (
            <p className="form-error" role="alert">
              {Object.keys(errors).length === 1
                ? "One field needs a fix"
                : `${Object.keys(errors).length} fields need a fix`}{" "}
              before we can place the order.
            </p>
          )}
        </form>

        <aside className="summary" aria-labelledby="h-order">
          <h2 id="h-order">Your order</h2>
          <ul className="summary-lines">
            {cart.map((l) => (
              <li key={l.key}>
                <span>
                  {l.qty} × {l.name}
                  <small>
                    {l.color} · {l.size}
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
              <dt>{delivery.label}</dt>
              <dd className="num">{shipping ? money(shipping) : "Free"}</dd>
            </div>
            <div className="total">
              <dt>Total</dt>
              <dd className="num">{money(total)}</dd>
            </div>
          </dl>
          <Link to="/cart" className="text-link">
            Edit bag
          </Link>
        </aside>
      </div>
    </div>
  );
}
