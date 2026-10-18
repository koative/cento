import { useEffect, useRef, useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { Link } from "../router";
import { giftWrap, metals, shipping } from "../content";
import {
  clearCart,
  money,
  subtotal,
  useCart,
  type CartLine,
} from "../lib/cart";
import { Field, validate, type Errors } from "../components/Field";

/** Luhn checksum: catches mistyped card numbers before anything is "charged". */
function luhn(digits: string) {
  let sum = 0;
  for (let i = 0; i < digits.length; i++) {
    let d = Number(digits[digits.length - 1 - i]);
    if (i % 2) d = d * 2 > 9 ? d * 2 - 9 : d * 2;
    sum += d;
  }
  return sum % 10 === 0;
}

function expiryProblem(v: string) {
  const m = /^(\d{2})\s*\/\s*(\d{2})$/.exec(v);
  if (!m || Number(m[1]) < 1 || Number(m[1]) > 12)
    return "Write the expiry as MM/YY, e.g. 08/28.";
  const end = new Date(2000 + Number(m[2]), Number(m[1]), 1);
  return end <= new Date()
    ? "That card has expired; use one with a later date."
    : undefined;
}

type Order = {
  number: string;
  email: string;
  lines: CartLine[];
  total: number;
  method: string;
};

export function Checkout() {
  const cart = useCart();
  const [method, setMethod] = useState(shipping[0].id);
  const [gift, setGift] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const confirmation = useRef<HTMLDivElement>(null);

  // The confirmation replaces the whole form: move focus (and the view) to it.
  useEffect(() => {
    if (order) confirmation.current?.focus();
  }, [order]);

  const ship = shipping.find((s) => s.id === method)!;
  const total = subtotal(cart) + ship.price + (gift ? giftWrap.price : 0);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, {
      email: {
        missing: "Enter an email for your receipt and delivery updates.",
        invalid: "That email looks incomplete; check the @ and the domain.",
      },
      phone: {
        missing:
          "Add a phone number; the courier calls before delivering jewellery.",
        invalid:
          "Use digits, spaces, brackets, dashes or +, e.g. +1 555 014 2290.",
      },
      fullname: {
        missing: "Enter the name the parcel should be addressed to.",
      },
      address: { missing: "Enter the street address for delivery." },
      city: { missing: "Enter the town or city." },
      state: { missing: "Choose the state." },
      zip: {
        missing: "Enter the ZIP code.",
        invalid: "A ZIP code is five digits, e.g. 02903.",
      },
      cardname: {
        missing: "Enter the name exactly as it appears on the card.",
      },
      card: {
        missing: "Enter the card number.",
        check: (v) => {
          const digits = v.replace(/\s/g, "");
          return !/^\d{13,19}$/.test(digits) || !luhn(digits)
            ? "That card number does not add up; check each digit. (Demo: try 4242 4242 4242 4242.)"
            : undefined;
        },
      },
      expiry: {
        missing: "Enter the expiry date as MM/YY.",
        check: expiryProblem,
      },
      cvc: {
        missing: "Enter the 3 or 4 digit security code.",
        invalid:
          "The security code is 3 or 4 digits, on the back of most cards.",
      },
    });
    setErrors(found);
    if (Object.keys(found).length) return;
    const email = String(new FormData(form).get("email"));
    setSending(true);
    // Demo only: nothing is charged or sent.
    setTimeout(() => {
      setOrder({
        number: `HL-${Math.floor(10000 + Math.random() * 89999)}`,
        email,
        lines: cart,
        total,
        method: ship.name,
      });
      clearCart();
      setSending(false);
    }, 1200);
  }

  if (order) {
    return (
      <div className="wrap page">
        <div
          className="confirmation confirmation-page"
          role="status"
          tabIndex={-1}
          ref={confirmation}
        >
          <Check size={32} aria-hidden="true" />
          <h1>Thank you. Order {order.number} is with the atelier.</h1>
          <p>
            A receipt is on its way to {order.email}. Made-to-order pieces go
            onto a bench this week; we will write when yours is hallmarked and
            again when it ships by {order.method.toLowerCase()}.
          </p>
          <ul className="order-lines">
            {order.lines.map((l) => (
              <li key={l.key}>
                <span>
                  {l.qty} × {l.name}, {metals[l.metal].name}
                </span>
                <span className="price">{money(l.unit * l.qty)}</span>
              </li>
            ))}
            <li className="ledger-total">
              <span>Total paid</span>
              <span className="price">{money(order.total)}</span>
            </li>
          </ul>
          <p className="field-hint">
            Demo checkout: no payment was taken and no order was placed.
          </p>
          <Link to="/" className="btn">
            Back to the atelier
          </Link>
        </div>
      </div>
    );
  }

  if (!cart.length) {
    return (
      <div className="wrap page">
        <div className="empty">
          <h1>Checkout</h1>
          <p>Your bag is empty, so there is nothing to check out yet.</p>
          <Link to="/collections" className="btn">
            See the collections
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="wrap page">
      <header className="page-head">
        <h1>Checkout</h1>
        <p className="lede">
          Insured delivery, signature on arrival. Every order includes a
          hallmark certificate and lifetime care.
        </p>
      </header>

      <div className="checkout">
        <form className="form" noValidate onSubmit={submit}>
          <fieldset>
            <legend>Contact</legend>
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
                pattern="[0-9+\(\)\- ]{7,}"
                error={errors.phone}
              />
            </div>
          </fieldset>

          <fieldset className="choice-set">
            <legend>Delivery</legend>
            <div className="type-options">
              {shipping.map((s) => (
                <label key={s.id} className="type-option">
                  <input
                    type="radio"
                    name="method"
                    value={s.id}
                    checked={method === s.id}
                    onChange={() => setMethod(s.id)}
                  />
                  <span>
                    <strong>
                      {s.name} · {s.price ? money(s.price) : "Free"}
                    </strong>
                    <small>{s.note}</small>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          {method !== "collect" && (
            <fieldset>
              <legend>Delivery address</legend>
              <Field
                label="Full name"
                name="fullname"
                autoComplete="name"
                required
                error={errors.fullname}
              />
              <Field
                label="Street address"
                name="address"
                autoComplete="street-address"
                required
                error={errors.address}
              />
              <div className="field-row field-row-3">
                <Field
                  label="City"
                  name="city"
                  autoComplete="address-level2"
                  required
                  error={errors.city}
                />
                <div className="field">
                  <label htmlFor="f-state">State</label>
                  <select
                    id="f-state"
                    name="state"
                    required
                    defaultValue=""
                    autoComplete="address-level1"
                    aria-invalid={errors.state ? true : undefined}
                    aria-describedby={
                      errors.state ? "f-state-error" : undefined
                    }
                  >
                    <option value="">Choose</option>
                    {[
                      "CT",
                      "MA",
                      "ME",
                      "NH",
                      "NJ",
                      "NY",
                      "PA",
                      "RI",
                      "VT",
                      "CA",
                      "IL",
                      "TX",
                      "WA",
                    ].map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                  {errors.state && (
                    <p className="field-error" id="f-state-error">
                      {errors.state}
                    </p>
                  )}
                </div>
                <Field
                  label="ZIP"
                  name="zip"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  required
                  pattern="\d{5}"
                  maxLength={5}
                  error={errors.zip}
                />
              </div>
            </fieldset>
          )}

          <fieldset>
            <legend>Gift</legend>
            <label className="check">
              <input
                type="checkbox"
                checked={gift}
                onChange={(e) => setGift(e.target.checked)}
              />
              {giftWrap.name} (+{money(giftWrap.price)})
            </label>
            {gift && (
              <div className="field">
                <label htmlFor="f-note">Card message (optional)</label>
                <textarea id="f-note" name="note" rows={3} maxLength={240} />
              </div>
            )}
          </fieldset>

          <fieldset>
            <legend>Payment</legend>
            <Field
              label="Name on card"
              name="cardname"
              autoComplete="cc-name"
              required
              error={errors.cardname}
            />
            <Field
              label="Card number"
              name="card"
              inputMode="numeric"
              autoComplete="cc-number"
              required
              placeholder="4242 4242 4242 4242"
              error={errors.card}
            />
            <div className="field-row">
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
                pattern="\d{3,4}"
                maxLength={4}
                error={errors.cvc}
              />
            </div>
          </fieldset>

          <button
            className="btn btn-wide"
            type="submit"
            disabled={sending}
            aria-busy={sending}
          >
            {sending ? "Placing your order…" : `Pay ${money(total)}`}
          </button>
          <p className="field-hint">
            Demo checkout: nothing is charged, stored or sent.
          </p>
        </form>

        <aside className="ledger checkout-summary">
          <h2>Your order</h2>
          <ul className="order-lines">
            {cart.map((l) => (
              <li key={l.key}>
                <span>
                  {l.qty} × {l.name}
                  <small>
                    {[metals[l.metal].short, ...l.details].join(" · ")}
                  </small>
                </span>
                <span className="price">{money(l.unit * l.qty)}</span>
              </li>
            ))}
          </ul>
          <dl>
            <div>
              <dt>Subtotal</dt>
              <dd>{money(subtotal(cart))}</dd>
            </div>
            <div>
              <dt>{ship.name}</dt>
              <dd>{ship.price ? money(ship.price) : "Free"}</dd>
            </div>
            {gift && (
              <div>
                <dt>Gift box and card</dt>
                <dd>{money(giftWrap.price)}</dd>
              </div>
            )}
            <div className="ledger-total">
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
