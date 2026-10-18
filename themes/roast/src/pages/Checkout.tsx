import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, Check, Loader2, Lock } from "lucide-react";
import { Link } from "../router";
import { checkout } from "../content";
import { clearCart, money, subtotal, useCart, type CartLine } from "../cart";
import { Field, validate, type Errors } from "../components/Field";

const messages = {
  email: {
    missing: "Enter your email so we can send the roast and tracking updates.",
    invalid:
      "Check the email address, it needs an @ and a domain like example.com.",
  },
  name: { missing: "Enter the name for the delivery label." },
  address: {
    missing: "Enter a street address, including the house or flat number.",
  },
  city: { missing: "Enter your town or city." },
  postcode: {
    missing: "Enter your postcode or ZIP.",
    invalid: "Use 3 to 10 letters, numbers or spaces for the postcode.",
  },
  country: { missing: "Choose the country we are shipping to." },
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
  const delivery =
    checkout.delivery.find((d) => d.id === method) ?? checkout.delivery[0];
  const shipping =
    delivery.id === "standard" && sub >= checkout.freeOver ? 0 : delivery.price;
  const total = sub + shipping;

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
        number: "RST-" + Math.floor(10000 + Math.random() * 89999),
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
            Thank you, it is on the roaster
          </h1>
          <p className="lead">
            Order <b>{order.number}</b> is confirmed. We will email{" "}
            {order.email} when it ships. ({checkout.note})
          </p>
          <ul className="confirm-lines">
            {order.lines.map((l) => (
              <li key={l.key}>
                <span>
                  {l.qty} × {l.name}, {l.size}, {l.grind.toLowerCase()}
                </span>
                <span className="num">{money(l.unit * l.qty)}</span>
              </li>
            ))}
            <li>
              <b>Total · {order.method}</b>
              <b className="num">{money(order.total)}</b>
            </li>
          </ul>
          <Link to="/brew" className="btn">
            Read a brew guide while you wait{" "}
            <ArrowRight size={18} aria-hidden="true" />
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
          <p className="lead">
            Your bag is empty, so there is nothing to check out yet.
          </p>
          <Link to="/shop" className="btn">
            Shop coffee <ArrowRight size={18} aria-hidden="true" />
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
              hint="For the roast and shipping updates."
            />
          </fieldset>

          <fieldset>
            <legend>Shipping address</legend>
            <Field
              label="Full name"
              name="name"
              autoComplete="name"
              required
              error={errors.name}
            />
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
                label="Postcode / ZIP"
                name="postcode"
                autoComplete="postal-code"
                required
                pattern="[A-Za-z0-9 \-]{3,10}"
                error={errors.postcode}
              />
            </div>
            <div className="field">
              <label htmlFor="f-country">Country</label>
              <select
                id="f-country"
                name="country"
                required
                defaultValue=""
                autoComplete="country-name"
                aria-invalid={errors.country ? true : undefined}
                aria-describedby={
                  errors.country ? "f-country-error" : undefined
                }
              >
                <option value="" disabled>
                  Choose a country
                </option>
                {checkout.countries.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              {errors.country && (
                <p className="field-error" id="f-country-error">
                  {errors.country}
                </p>
              )}
            </div>
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
                  {d.id === "standard" && sub >= checkout.freeOver
                    ? "Free"
                    : d.price
                      ? money(d.price)
                      : "Free"}
                </span>
              </label>
            ))}
          </fieldset>

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
          {Object.keys(errors).length > 0 && (
            <p className="form-error" role="alert">
              Please fix the{" "}
              {Object.keys(errors).length === 1
                ? "highlighted field"
                : `${Object.keys(errors).length} highlighted fields`}{" "}
              above.
            </p>
          )}
        </form>

        <aside className="order-summary" aria-labelledby="h-order">
          <h2 id="h-order">Your order</h2>
          <ul className="summary-lines">
            {cart.map((l) => (
              <li key={l.key}>
                <span
                  className="swatch"
                  style={{ background: l.color }}
                  aria-hidden="true"
                />
                <span>
                  {l.qty} × {l.name}
                  <small>
                    {l.size} · {l.grind}
                    {l.every
                      ? ` · every ${l.every === 1 ? "week" : `${l.every} weeks`}`
                      : ""}
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
              <dt>Shipping</dt>
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
