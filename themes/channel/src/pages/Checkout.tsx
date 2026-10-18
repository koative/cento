import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { Link } from "../router";
import {
  FREE_SHIPPING,
  SHIPPING,
  clearCart,
  subtotal,
  useCart,
  type CartLine,
} from "../lib/cart";
import { money } from "../lib/format";
import { Field, validate, type Errors } from "../components/Field";

const messages = {
  email: {
    missing: "Enter an email so we can send the receipt.",
    invalid: "That email needs an @ and a domain, e.g. you@example.com.",
  },
  name: { missing: "Enter the name to print on the parcel." },
  address: { missing: "Enter a street address for delivery." },
  city: { missing: "Enter the city or town." },
  state: { missing: "Choose a state." },
  zip: {
    missing: "Enter a 5-digit ZIP code.",
    invalid: "ZIP codes are 5 digits, e.g. 16502.",
  },
};

const states = [
  "Alabama",
  "California",
  "Colorado",
  "Florida",
  "Illinois",
  "Michigan",
  "New York",
  "Ohio",
  "Oregon",
  "Pennsylvania",
  "Texas",
  "Washington",
];

export function Checkout() {
  const cart = useCart();
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [express, setExpress] = useState(false);
  const [order, setOrder] = useState<{
    id: string;
    email: string;
    lines: CartLine[];
    total: number;
  } | null>(null);

  const sub = subtotal(cart);
  const ship = express ? 18 : sub >= FREE_SHIPPING ? 0 : SHIPPING;

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
        id: "CH-" + String(Date.now()).slice(-6),
        email,
        lines: cart,
        total: sub + ship,
      });
      clearCart();
      setBusy(false);
      window.scrollTo({ top: 0 });
    }, 900);
  }

  if (order) {
    return (
      <div className="wrap checkout-page">
        <section className="confirmation" aria-live="polite">
          <CheckCircle2 size={44} aria-hidden="true" />
          <h1>Order {order.id} is in</h1>
          <p className="lead">
            A receipt is on its way to {order.email}. Jess packs orders on
            Mondays and Wednesdays, so expect a tracking link within two
            business days.
          </p>
          <ul className="confirm-lines">
            {order.lines.map((l) => (
              <li key={l.key}>
                <span>
                  {l.qty} × {l.name}{" "}
                  <small>
                    {l.color} · {l.size}
                  </small>
                </span>
                <span>{money(l.qty * l.unit)}</span>
              </li>
            ))}
            <li className="summary-total">
              <span>Total</span>
              <span>{money(order.total)}</span>
            </li>
          </ul>
          <p className="page-note">
            Demo store: nothing was charged and nothing will ship.
          </p>
          <div className="actions">
            <Link to="/videos" className="btn btn-spark">
              Watch something while you wait
            </Link>
            <Link to="/shop" className="btn btn-ghost">
              Back to merch
            </Link>
          </div>
        </section>
      </div>
    );
  }

  if (!cart.length) {
    return (
      <div className="wrap checkout-page">
        <header className="page-head page-head-tight">
          <h1>Checkout</h1>
        </header>
        <div className="empty">
          <h2>Your bag is empty</h2>
          <p>
            Add something from the shop first, then come back here to check out.
          </p>
          <Link to="/shop" className="btn btn-spark">
            Browse merch
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="wrap checkout-page">
      <header className="page-head page-head-tight">
        <h1>Checkout</h1>
      </header>
      <div className="checkout-layout">
        <form className="form" noValidate onSubmit={submit} aria-busy={busy}>
          <fieldset>
            <legend>Contact</legend>
            <Field
              label="Email"
              name="email"
              type="email"
              required
              autoComplete="email"
              error={errors.email}
            />
          </fieldset>
          <fieldset>
            <legend>Ship to</legend>
            <Field
              label="Full name"
              name="name"
              required
              autoComplete="name"
              error={errors.name}
            />
            <Field
              label="Street address"
              name="address"
              required
              autoComplete="street-address"
              error={errors.address}
            />
            <div className="field-row">
              <Field
                label="City"
                name="city"
                required
                autoComplete="address-level2"
                error={errors.city}
              />
              <Field
                as="select"
                label="State"
                name="state"
                required
                defaultValue=""
                error={errors.state}
              >
                <option value="" disabled>
                  Choose…
                </option>
                {states.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </Field>
              <Field
                label="ZIP"
                name="zip"
                required
                inputMode="numeric"
                pattern="\d{5}"
                autoComplete="postal-code"
                error={errors.zip}
              />
            </div>
          </fieldset>
          <fieldset>
            <legend>Delivery</legend>
            <label className="radio-row">
              <input
                type="radio"
                name="speed"
                checked={!express}
                onChange={() => setExpress(false)}
              />
              <span>
                <strong>Standard, 3–6 days</strong>{" "}
                {sub >= FREE_SHIPPING ? "Free" : money(SHIPPING)}
              </span>
            </label>
            <label className="radio-row">
              <input
                type="radio"
                name="speed"
                checked={express}
                onChange={() => setExpress(true)}
              />
              <span>
                <strong>Express, 1–2 days</strong> {money(18)}
              </span>
            </label>
          </fieldset>
          <button
            type="submit"
            className="btn btn-spark btn-wide"
            disabled={busy}
          >
            {busy ? "Placing order…" : `Place order · ${money(sub + ship)}`}
          </button>
          <p className="page-note">
            Demo checkout: no payment is taken and nothing is sent anywhere.
          </p>
        </form>

        <aside className="summary" aria-label="Order summary">
          <h2>In your bag</h2>
          <ul className="confirm-lines">
            {cart.map((l) => (
              <li key={l.key}>
                <span>
                  {l.qty} × {l.name}{" "}
                  <small>
                    {l.color} · {l.size}
                  </small>
                </span>
                <span>{money(l.qty * l.unit)}</span>
              </li>
            ))}
          </ul>
          <dl>
            <div>
              <dt>Subtotal</dt>
              <dd>{money(sub)}</dd>
            </div>
            <div>
              <dt>Shipping</dt>
              <dd>{ship ? money(ship) : "Free"}</dd>
            </div>
            <div className="summary-total">
              <dt>Total</dt>
              <dd>{money(sub + ship)}</dd>
            </div>
          </dl>
          <Link to="/cart" className="more">
            Edit bag
          </Link>
        </aside>
      </div>
    </div>
  );
}
