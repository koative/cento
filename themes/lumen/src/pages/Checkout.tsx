import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, Check, Loader2, Lock } from "lucide-react";
import { Link } from "../router";
import { checkoutCopy, lensTypes, stores } from "../content";
import {
  clearCart,
  count,
  money,
  plural,
  subtotal,
  useCart,
  type CartLine,
} from "../lib/cart";
import {
  clearError,
  Field,
  GroupError,
  validate,
  type Errors,
  type Messages,
} from "../components/Field";

const base: Messages = {
  email: {
    missing: "Enter your email for the order confirmation and tracking.",
    invalid:
      "Check the email address: it needs an @ and a domain, like name@example.com.",
  },
  name: { missing: "Enter the full name for the delivery label." },
  card: {
    missing: "Enter the card number.",
    invalid: "Card numbers are 13 to 19 digits; spaces are fine.",
  },
  expiry: {
    missing: "Enter the expiry date as MM/YY.",
    invalid: "Use MM/YY with a month from 01 to 12, for example 08/28.",
  },
  cvc: {
    missing: "Enter the 3 or 4 digit security code.",
    invalid: "The security code is 3 or 4 digits on the back of the card.",
  },
};
const address: Messages = {
  street: {
    missing: "Enter the street address, including the apartment or unit.",
  },
  city: { missing: "Enter the city." },
  state: {
    missing: "Enter the two-letter state code, like NY.",
    invalid: "Use the two-letter state code, like NY or CA.",
  },
  zip: {
    missing: "Enter the ZIP code.",
    invalid: "ZIP codes are 5 digits, or 5+4 like 10012-3456.",
  },
};
const pickup: Messages = {
  "pickup-store": {
    missing: "Choose the store where you'll collect your glasses.",
  },
};
const rxFields: Messages = {
  "od-sph": {
    missing:
      "Enter the SPH for your right eye (OD). Use 0 if it says plano or PL.",
    invalid: "SPH runs from −20 to +20 in steps of 0.25.",
  },
  "os-sph": {
    missing:
      "Enter the SPH for your left eye (OS). Use 0 if it says plano or PL.",
    invalid: "SPH runs from −20 to +20 in steps of 0.25.",
  },
  "od-cyl": {
    missing: "",
    invalid:
      "CYL runs from −6 to +6 in steps of 0.25. Leave it blank if there is none.",
  },
  "os-cyl": {
    missing: "",
    invalid:
      "CYL runs from −6 to +6 in steps of 0.25. Leave it blank if there is none.",
  },
  "od-axis": { missing: "", invalid: "AXIS is a whole number from 1 to 180." },
  "os-axis": { missing: "", invalid: "AXIS is a whole number from 1 to 180." },
  pd: {
    missing:
      "Enter your PD in millimetres. We can measure it free in any store.",
    invalid: "PD is usually between 50 and 75 mm.",
  },
};

type Order = {
  number: string;
  email: string;
  lines: CartLine[];
  total: number;
  method: string;
  rx: string;
};

export function Checkout() {
  const cart = useCart();
  const [method, setMethod] = useState(checkoutCopy.shipping[0].id);
  const [rxMode, setRxMode] = useState(checkoutCopy.rxOptions[0].id);
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const done = useRef<HTMLHeadingElement>(null);

  const needsRx = cart.some(
    (l) => lensTypes.find((t) => t.name === l.lens)?.rx,
  );
  const shipping = checkoutCopy.shipping.find((s) => s.id === method)!;
  const sub = subtotal(cart);
  const total = sub + shipping.price;

  useEffect(() => {
    if (order) done.current?.focus();
  }, [order]);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const value = (name: string) =>
      (
        form.elements.namedItem(name) as HTMLInputElement | null
      )?.value.trim() ?? "";
    const extra: Errors = {};
    for (const eye of ["od", "os"]) {
      if (
        needsRx &&
        rxMode === "enter" &&
        Number(value(`${eye}-cyl`)) &&
        !value(`${eye}-axis`)
      )
        extra[`${eye}-axis`] =
          `Enter the AXIS for ${eye === "od" ? "your right eye (OD)" : "your left eye (OS)"}; it's required when there is a CYL value.`;
    }
    const [mm, yy] = value("expiry").split("/").map(Number);
    const now = new Date();
    if (
      mm &&
      yy &&
      new Date(2000 + yy, mm) <= new Date(now.getFullYear(), now.getMonth())
    )
      extra.expiry =
        "This card has expired. Use a card with a future expiry date.";

    const found = validate(
      form,
      {
        ...base,
        ...(method === "pickup" ? pickup : address),
        ...(needsRx && rxMode === "enter" ? rxFields : {}),
      },
      extra,
    );
    setErrors(found);
    if (Object.keys(found).length) return;
    setBusy(true);
    setTimeout(() => {
      setOrder({
        number: "LM-" + Math.floor(100000 + Math.random() * 900000),
        email: value("email"),
        lines: cart,
        total,
        method:
          method === "pickup"
            ? `Collect at Lumen ${stores.find((s) => s.id === value("pickup-store"))?.name}`
            : shipping.name + " delivery",
        rx: !needsRx
          ? ""
          : checkoutCopy.rxOptions.find((o) => o.id === rxMode)!.label,
      });
      clearCart();
      setBusy(false);
    }, 1100);
  }

  if (order)
    return (
      <div className="page checkout-page">
        <div className="confirmation" aria-live="polite">
          <Check size={28} aria-hidden="true" className="confirm-icon" />
          <h1 ref={done} tabIndex={-1}>
            Thank you, your order is in
          </h1>
          <p className="lede">
            Order {order.number}. A receipt is on its way to {order.email}, and
            an optician will check your prescription before your lenses are cut.
          </p>
          <ul className="confirm-lines">
            {order.lines.map((l) => (
              <li key={l.key}>
                <span>
                  {l.qty} × {l.name}, {l.colour} · {l.lens}
                </span>
                <span>{money(l.unit * l.qty)}</span>
              </li>
            ))}
            <li className="total">
              <span>Total</span>
              <span>{money(order.total)}</span>
            </li>
          </ul>
          <dl className="summary-list">
            <div>
              <dt>Delivery</dt>
              <dd>{order.method}</dd>
            </div>
            {order.rx && (
              <div>
                <dt>Prescription</dt>
                <dd>{order.rx}</dd>
              </div>
            )}
          </dl>
          <div className="actions">
            <Link to="/eye-test" className="btn">
              Book an eye test <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link to="/frames" className="btn btn-quiet">
              Back to frames
            </Link>
          </div>
          <p className="demo-note">
            Demo only: no order was placed and nothing was charged.
          </p>
        </div>
      </div>
    );

  if (!cart.length)
    return (
      <div className="page checkout-page">
        <header className="page-head">
          <h1>Checkout</h1>
          <p className="lede">
            Your bag is empty, so there is nothing to check out yet.
          </p>
        </header>
        <Link to="/frames" className="btn">
          Shop frames <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </div>
    );

  return (
    <div className="page checkout-page">
      <header className="page-head">
        <h1>Checkout</h1>
        <p className="lede">
          {plural(count(cart), "pair")} · {money(total)}
        </p>
      </header>

      <div className="booking">
        <form
          noValidate
          onSubmit={submit}
          onChange={clearError(setErrors)}
          className="booking-form"
          aria-busy={busy}
        >
          <fieldset className="form-step">
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

          <fieldset className="form-step">
            <legend>Delivery</legend>
            <div
              className="choice-list"
              role="radiogroup"
              aria-label="Delivery method"
            >
              {checkoutCopy.shipping.map((s) => (
                <label key={s.id} className="choice">
                  <input
                    type="radio"
                    name="method"
                    value={s.id}
                    checked={method === s.id}
                    onChange={() => setMethod(s.id)}
                  />
                  <span>
                    <strong>{s.name}</strong>
                    <small>{s.detail}</small>
                  </span>
                  <span className="choice-price">
                    {s.price ? money(s.price) : "Free"}
                  </span>
                </label>
              ))}
            </div>
            <Field
              label="Full name"
              name="name"
              required
              autoComplete="name"
              error={errors.name}
            />
            {method === "pickup" ? (
              <div className="field">
                <label htmlFor="f-pickup-store">Collect from</label>
                <select
                  id="f-pickup-store"
                  name="pickup-store"
                  required
                  defaultValue=""
                  aria-invalid={errors["pickup-store"] ? true : undefined}
                  aria-describedby={
                    errors["pickup-store"] ? "f-pickup-error" : undefined
                  }
                >
                  <option value="">Choose a store</option>
                  {stores.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}, {s.city}
                    </option>
                  ))}
                </select>
                <GroupError
                  id="f-pickup-error"
                  error={errors["pickup-store"]}
                />
              </div>
            ) : (
              <div className="field-grid">
                <Field
                  label="Street address"
                  name="street"
                  required
                  autoComplete="street-address"
                  error={errors.street}
                  className="span-2"
                />
                <Field
                  label="City"
                  name="city"
                  required
                  autoComplete="address-level2"
                  error={errors.city}
                />
                <Field
                  label="State"
                  name="state"
                  required
                  autoComplete="address-level1"
                  pattern="[A-Za-z]{2}"
                  maxLength={2}
                  error={errors.state}
                />
                <Field
                  label="ZIP code"
                  name="zip"
                  required
                  autoComplete="postal-code"
                  inputMode="numeric"
                  pattern="\d{5}(-\d{4})?"
                  error={errors.zip}
                />
              </div>
            )}
          </fieldset>

          {needsRx && (
            <fieldset className="form-step">
              <legend>Prescription</legend>
              <div
                className="choice-list"
                role="radiogroup"
                aria-label="How you'll give us your prescription"
              >
                {checkoutCopy.rxOptions.map((o) => (
                  <label key={o.id} className="choice">
                    <input
                      type="radio"
                      name="rx-mode"
                      value={o.id}
                      checked={rxMode === o.id}
                      onChange={() => setRxMode(o.id)}
                    />
                    <span>
                      <strong>{o.label}</strong>
                      <small>{o.hint}</small>
                    </span>
                  </label>
                ))}
              </div>
              {rxMode === "enter" && (
                <div className="rx-entry">
                  {(["od", "os"] as const).map((eye) => (
                    <div
                      key={eye}
                      className="rx-eye"
                      role="group"
                      aria-label={
                        eye === "od" ? "Right eye (OD)" : "Left eye (OS)"
                      }
                    >
                      <p className="rx-eye-label">
                        {eye === "od" ? "Right eye · OD" : "Left eye · OS"}
                      </p>
                      <Field
                        label="SPH"
                        name={`${eye}-sph`}
                        type="number"
                        required
                        min={-20}
                        max={20}
                        step={0.25}
                        inputMode="decimal"
                        error={errors[`${eye}-sph`]}
                      />
                      <Field
                        label="CYL"
                        name={`${eye}-cyl`}
                        type="number"
                        min={-6}
                        max={6}
                        step={0.25}
                        inputMode="decimal"
                        error={errors[`${eye}-cyl`]}
                      />
                      <Field
                        label="AXIS"
                        name={`${eye}-axis`}
                        type="number"
                        min={1}
                        max={180}
                        step={1}
                        inputMode="numeric"
                        error={errors[`${eye}-axis`]}
                      />
                    </div>
                  ))}
                  <Field
                    label="PD (mm)"
                    name="pd"
                    type="number"
                    required
                    min={50}
                    max={75}
                    step={0.5}
                    inputMode="decimal"
                    error={errors.pd}
                    hint={<Link to="/lenses">What is PD?</Link>}
                  />
                </div>
              )}
            </fieldset>
          )}

          <fieldset className="form-step">
            <legend>Payment</legend>
            <div className="field-grid">
              <Field
                label="Card number"
                name="card"
                required
                autoComplete="cc-number"
                inputMode="numeric"
                pattern="[\d ]{13,23}"
                className="span-2"
                error={errors.card}
              />
              <Field
                label="Expiry (MM/YY)"
                name="expiry"
                required
                autoComplete="cc-exp"
                placeholder="08/28"
                pattern="(0[1-9]|1[0-2])/\d{2}"
                error={errors.expiry}
              />
              <Field
                label="Security code"
                name="cvc"
                required
                autoComplete="cc-csc"
                inputMode="numeric"
                pattern="\d{3,4}"
                error={errors.cvc}
              />
            </div>
          </fieldset>

          <button type="submit" className="btn btn-wide" disabled={busy}>
            {busy ? (
              <>
                <Loader2 size={18} className="spin" aria-hidden="true" />{" "}
                Placing order…
              </>
            ) : (
              <>
                <Lock size={16} aria-hidden="true" /> Place order ·{" "}
                {money(total)}
              </>
            )}
          </button>
          <p className="demo-note">
            This is a demo: no order is placed and no card is charged.
          </p>
        </form>

        <aside className="booking-summary" aria-label="Order summary">
          <h2>Order summary</h2>
          <ul className="confirm-lines">
            {cart.map((l) => (
              <li key={l.key}>
                <span>
                  {l.qty} × {l.name}
                  <small>
                    {l.colour} · {l.lens}
                    {l.index && ` · ${l.index}`}
                  </small>
                </span>
                <span>{money(l.unit * l.qty)}</span>
              </li>
            ))}
          </ul>
          <dl className="summary-list">
            <div>
              <dt>Subtotal</dt>
              <dd>{money(sub)}</dd>
            </div>
            <div>
              <dt>{shipping.name}</dt>
              <dd>{shipping.price ? money(shipping.price) : "Free"}</dd>
            </div>
            <div className="total">
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
