import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, Check, Loader2, Lock } from "lucide-react";
import { Link } from "../router";
import { checkoutCopy } from "../content";
import {
  clearCart,
  money,
  subtotal,
  useCart,
  type CartLine,
} from "../lib/cart";
import {
  Field,
  validate,
  type Errors,
  type Messages,
} from "../components/Field";

const messages: Messages = {
  email: {
    missing: "Enter your email so we can send the receipt and tracking.",
    invalid:
      "Check the email: it needs an @ and a domain, like name@example.com.",
  },
  first: { missing: "Enter the first name for the delivery label." },
  last: { missing: "Enter the last name for the delivery label." },
  address: {
    missing: "Enter a street address, including the house or unit number.",
  },
  city: { missing: "Enter your town or city." },
  region: { missing: "Enter your state or province, for example NY or ON." },
  postcode: {
    missing: "Enter your ZIP or postal code.",
    invalid: "Use 3 to 10 letters, numbers or spaces, like 12401 or K1A 0B1.",
  },
  country: {
    missing: "Choose whether we are shipping to the United States or Canada.",
  },
  card: {
    missing: "Enter the card number from the front of your card.",
    invalid: "Card numbers are 13 to 19 digits; spaces are fine.",
  },
  expiry: {
    missing: "Enter the expiry date as MM/YY.",
    invalid:
      "Use MM/YY with a month from 01 to 12, and a date that has not passed.",
  },
  cvc: {
    missing: "Enter the 3 or 4 digit security code.",
    invalid: "The security code is 3 or 4 digits, usually on the back.",
  },
};

type Order = {
  number: string;
  email: string;
  lines: CartLine[];
  total: number;
  method: string;
  sample: string;
};

/** Card expiry as MM/YY that is still valid this month. */
function expiryOk(value: string) {
  const m = /^(0[1-9]|1[0-2])\/(\d{2})$/.exec(value.trim());
  if (!m) return false;
  const now = new Date();
  const year = 2000 + Number(m[2]);
  return (
    year > now.getFullYear() ||
    (year === now.getFullYear() && Number(m[1]) >= now.getMonth() + 1)
  );
}

export function Checkout() {
  const cart = useCart();
  const [method, setMethod] = useState(checkoutCopy.delivery[0].id);
  const [sample, setSample] = useState(checkoutCopy.samples[0]);
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const done = useRef<HTMLHeadingElement>(null);

  const sub = subtotal(cart);
  const delivery =
    checkoutCopy.delivery.find((d) => d.id === method) ??
    checkoutCopy.delivery[0];
  const shipping =
    delivery.id === "standard" && sub >= checkoutCopy.freeOver
      ? 0
      : delivery.price;
  const total = sub + shipping;

  useEffect(() => {
    if (order) done.current?.focus();
  }, [order]);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const expiry = form.elements.namedItem("expiry") as HTMLInputElement;
    expiry.setCustomValidity(
      expiry.value && !expiryOk(expiry.value) ? "expired" : "",
    );
    const found = validate(form, messages);
    setErrors(found);
    if (Object.keys(found).length) return;
    setBusy(true);
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    setTimeout(() => {
      setOrder({
        number: "AU-" + Math.floor(100000 + Math.random() * 899999),
        email,
        lines: cart,
        total,
        method: delivery.label,
        sample,
      });
      clearCart();
      setBusy(false);
    }, 1100);
  }

  if (order)
    return (
      <div className="page checkout-page">
        <div className="confirm" role="status" aria-live="polite">
          <span className="confirm-mark" aria-hidden="true">
            <Check size={28} />
          </span>
          <h1 ref={done} tabIndex={-1}>
            Thank you. Your order is in.
          </h1>
          <p className="lede">
            Order {order.number}. A receipt is on its way to {order.email}, and
            we will send tracking once your parcel leaves the studio.
          </p>
          <ul className="confirm-lines">
            {order.lines.map((l) => (
              <li key={l.key}>
                <span>
                  {l.qty} × {l.name}, {l.size}
                </span>
                <span>{money(l.unit * l.qty)}</span>
              </li>
            ))}
            <li>
              <span>Free sample: {order.sample}</span>
              <span>$0</span>
            </li>
            <li className="confirm-total">
              <span>Total, {order.method.toLowerCase()} shipping</span>
              <span>{money(order.total)}</span>
            </li>
          </ul>
          <p className="quiet">
            This is a demo: no order was placed and no card was charged.
          </p>
          <div className="actions">
            <Link to="/journal/thinnest-to-thickest" className="btn">
              How to layer your new ritual{" "}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link to="/" className="btn btn-ghost">
              Back to home
            </Link>
          </div>
        </div>
      </div>
    );

  if (!cart.length)
    return (
      <div className="page checkout-page">
        <header className="page-head">
          <h1>Nothing to check out yet</h1>
          <p className="lede">
            Your bag is empty. Add a product or a whole ritual, then come back
            here.
          </p>
        </header>
        <div className="actions">
          <Link to="/shop" className="btn">
            Shop the essentials <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link to="/ritual" className="btn btn-ghost">
            Build your ritual
          </Link>
        </div>
      </div>
    );

  const count = Object.keys(errors).length;

  return (
    <div className="page checkout-page">
      <header className="page-head">
        <h1>Checkout</h1>
        <p className="lede">
          Three short sections. Your bag is saved if you leave.
        </p>
      </header>
      <div className="checkout-layout">
        <form
          className="checkout-form"
          noValidate
          onSubmit={submit}
          aria-busy={busy}
        >
          {count > 0 && (
            <p className="form-alert" role="alert">
              {count === 1 ? "One field needs" : `${count} fields need`}{" "}
              attention before we can place the order.
            </p>
          )}
          <fieldset>
            <legend>Contact</legend>
            <Field
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              required
              error={errors.email}
            />
          </fieldset>

          <fieldset>
            <legend>Shipping address</legend>
            <div className="grid-2">
              <Field
                label="First name"
                name="first"
                autoComplete="given-name"
                required
                error={errors.first}
              />
              <Field
                label="Last name"
                name="last"
                autoComplete="family-name"
                required
                error={errors.last}
              />
            </div>
            <Field
              label="Street address"
              name="address"
              autoComplete="address-line1"
              required
              error={errors.address}
            />
            <Field
              label="Apartment, unit (optional)"
              name="address2"
              autoComplete="address-line2"
            />
            <div className="grid-3">
              <Field
                label="City"
                name="city"
                autoComplete="address-level2"
                required
                error={errors.city}
              />
              <Field
                label="State / province"
                name="region"
                autoComplete="address-level1"
                required
                error={errors.region}
              />
              <Field
                label="ZIP / postal code"
                name="postcode"
                autoComplete="postal-code"
                required
                pattern="[A-Za-z0-9 \-]{3,10}"
                error={errors.postcode}
              />
            </div>
            <Field
              label="Country"
              name="country"
              required
              error={errors.country}
            >
              <option value="" disabled>
                Choose a country
              </option>
              {checkoutCopy.countries.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </Field>
          </fieldset>

          <fieldset>
            <legend>Delivery</legend>
            <div className="radio-rows">
              {checkoutCopy.delivery.map((d) => (
                <label key={d.id} className="radio-row">
                  <input
                    type="radio"
                    name="delivery"
                    checked={method === d.id}
                    onChange={() => setMethod(d.id)}
                  />
                  <span>
                    {d.label}
                    <small>{d.detail}</small>
                  </span>
                  <span className="price">
                    {d.id === "standard" && sub >= checkoutCopy.freeOver
                      ? "Free"
                      : money(d.price)}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend>Choose a free sample</legend>
            <div className="radio-rows">
              {checkoutCopy.samples.map((s) => (
                <label key={s} className="radio-row">
                  <input
                    type="radio"
                    name="sample"
                    checked={sample === s}
                    onChange={() => setSample(s)}
                  />
                  <span>{s}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend>Payment</legend>
            <Field
              label="Card number"
              name="card"
              inputMode="numeric"
              autoComplete="cc-number"
              required
              pattern="[0-9 ]{13,23}"
              placeholder="4242 4242 4242 4242"
              error={errors.card}
            />
            <div className="grid-2">
              <Field
                label="Expiry (MM/YY)"
                name="expiry"
                autoComplete="cc-exp"
                required
                placeholder="08/28"
                error={errors.expiry}
              />
              <Field
                label="Security code"
                name="cvc"
                inputMode="numeric"
                autoComplete="cc-csc"
                required
                pattern="[0-9]{3,4}"
                error={errors.cvc}
              />
            </div>
            <p className="quiet">
              <Lock size={14} aria-hidden="true" /> Demo checkout: nothing is
              sent, stored or charged.
            </p>
          </fieldset>

          <button type="submit" className="btn btn-wide" disabled={busy}>
            {busy ? (
              <>
                <Loader2 size={18} className="spin" aria-hidden="true" />{" "}
                Placing your order…
              </>
            ) : (
              <>Place order · {money(total)}</>
            )}
          </button>
        </form>

        <aside className="summary" aria-labelledby="order-h">
          <h2 id="order-h">Your order</h2>
          <ul className="summary-lines">
            {cart.map((l) => (
              <li key={l.key}>
                <span>
                  {l.qty} × {l.name}
                  <small>{l.size}</small>
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
              <dt>{delivery.label} shipping</dt>
              <dd>{shipping ? money(shipping) : "Free"}</dd>
            </div>
            <div className="summary-total">
              <dt>Total</dt>
              <dd>{money(total)}</dd>
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
