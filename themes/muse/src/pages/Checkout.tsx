import { useEffect, useRef, useState, type FormEvent } from "react";
import { Check, Loader2, Lock } from "lucide-react";
import { Link } from "../router";
import { checkout, stores } from "../content";
import {
  clearCart,
  money,
  priced,
  subtotal,
  useCart,
  type PricedLine,
} from "../lib/cart";
import {
  Field,
  SelectField,
  validate,
  type Errors,
  type Messages,
} from "../components/Field";

const base: Messages = {
  email: {
    missing: "Enter your email so we can send the receipt and tracking.",
    invalid:
      "Check the email address: it needs an @ and a domain, like name@example.com.",
  },
  cardName: { missing: "Enter the name exactly as it appears on the card." },
  cardNumber: {
    missing: "Enter the card number.",
    invalid: "Card numbers are 13 to 19 digits. Spaces are fine.",
  },
  expiry: {
    missing: "Enter the expiry date as MM/YY.",
    invalid: "Use MM/YY for a month that has not passed yet, like 08/28.",
  },
  cvc: {
    missing: "Enter the 3 or 4 digit security code from the back of the card.",
    invalid: "The security code is 3 or 4 digits.",
  },
};
const shipping: Messages = {
  fullName: { missing: "Enter the name for the delivery label." },
  address: {
    missing: "Enter the street address, with the building or flat number.",
  },
  city: { missing: "Enter the town or city." },
  postcode: {
    missing: "Enter the postcode or ZIP.",
    invalid: "Postcodes are 3 to 10 letters, numbers, spaces or hyphens.",
  },
  country: { missing: "Choose the country we are delivering to." },
};
const collect: Messages = {
  fullName: { missing: "Enter the name we should ask for at the counter." },
  store: { missing: "Choose the store where you will collect the order." },
};

type Order = {
  number: string;
  email: string;
  lines: PricedLine[];
  total: number;
  where: string;
};

function expiryInPast(value: string) {
  const [mm, yy] = value.split("/").map(Number);
  if (!mm || Number.isNaN(yy)) return false;
  const now = new Date();
  return (
    2000 + yy < now.getFullYear() ||
    (2000 + yy === now.getFullYear() && mm < now.getMonth() + 1)
  );
}

export function Checkout() {
  const cart = useCart();
  const lines = priced(cart);
  const [method, setMethod] = useState(checkout.delivery[0].id);
  const [gift, setGift] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const done = useRef<HTMLHeadingElement>(null);

  const sub = subtotal(cart);
  const delivery = checkout.delivery.find((d) => d.id === method)!;
  const fee =
    method === "standard" && sub >= checkout.freeOver ? 0 : delivery.price;
  const total = sub + fee;

  useEffect(() => {
    if (order) done.current?.focus();
  }, [order]);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const expiry = form.elements.namedItem("expiry") as HTMLInputElement;
    expiry.setCustomValidity(expiryInPast(expiry.value) ? "past" : "");
    const next = validate(form, {
      ...base,
      ...(method === "collect" ? collect : shipping),
    });
    setErrors(next);
    if (Object.keys(next).length) return;

    const data = new FormData(form);
    const where =
      method === "collect"
        ? `Collect at ${stores.find((s) => s.id === data.get("store"))?.city ?? ""}`
        : `${data.get("address")}, ${data.get("city")}, ${data.get("country")}`;
    setBusy(true);
    window.setTimeout(() => {
      setOrder({
        number: "MU-" + Math.floor(260000 + Math.random() * 9999),
        email: String(data.get("email")),
        lines,
        total,
        where,
      });
      clearCart();
      setBusy(false);
      window.scrollTo({ top: 0 });
    }, 1100);
  }

  if (order)
    return (
      <div className="page checkout-page">
        <section className="confirmation" aria-live="polite">
          <Check size={28} aria-hidden="true" className="confirm-mark" />
          <h1 ref={done} tabIndex={-1}>
            Thank you. Order <span className="nowrap">{order.number}</span> is
            placed.
          </h1>
          <p className="lede">
            A receipt is on its way to {order.email}. Your pieces are pressed,
            wrapped in tissue and sent from the Paris atelier within two working
            days.
          </p>
          <dl className="confirm-details">
            <div>
              <dt>Delivery</dt>
              <dd>{order.where}</dd>
            </div>
            <div>
              <dt>Total paid</dt>
              <dd className="price">{money(order.total)}</dd>
            </div>
          </dl>
          <ul className="confirm-lines">
            {order.lines.map((l) => (
              <li key={l.key}>
                {l.qty} × {l.product.name}, {l.colour}, {l.size}
              </li>
            ))}
          </ul>
          <p className="fine">
            This is a demo order: nothing was charged, sent or stored.
          </p>
          <div className="actions">
            <Link to="/collection" className="btn btn-ink">
              Back to the lookbook
            </Link>
            <Link to="/stores" className="btn btn-line">
              Book an alteration in store
            </Link>
          </div>
        </section>
      </div>
    );

  if (!lines.length)
    return (
      <div className="page checkout-page">
        <header className="page-head">
          <h1 className="display">Checkout</h1>
          <p className="lede">There is nothing in your bag to check out yet.</p>
        </header>
        <Link to="/shop" className="btn btn-ink">
          Shop the collection
        </Link>
      </div>
    );

  return (
    <div className="page checkout-page">
      <header className="page-head">
        <h1 className="display">Checkout</h1>
        <p className="fine">
          <Lock size={14} aria-hidden="true" /> A demo checkout: nothing is
          charged and no details leave your browser.
        </p>
      </header>

      <div className="checkout-layout">
        <form
          className="checkout-form"
          onSubmit={submit}
          noValidate
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
              hint="For the receipt and tracking only."
            />
          </fieldset>

          <fieldset>
            <legend>Delivery</legend>
            <div className="methods">
              {checkout.delivery.map((d) => (
                <label key={d.id} className="method">
                  <input
                    type="radio"
                    name="method"
                    value={d.id}
                    checked={method === d.id}
                    onChange={() => setMethod(d.id)}
                  />
                  <span className="method-label">{d.label}</span>
                  <span className="method-detail">{d.detail}</span>
                  <span className="method-price price">
                    {d.id === "standard" && sub >= checkout.freeOver
                      ? "Free"
                      : d.price
                        ? money(d.price)
                        : "Free"}
                  </span>
                </label>
              ))}
            </div>
            <Field
              label="Full name"
              name="fullName"
              autoComplete="name"
              required
              error={errors.fullName}
            />
            {method === "collect" ? (
              <SelectField
                label="Store"
                name="store"
                required
                defaultValue=""
                error={errors.store}
              >
                <option value="" disabled>
                  Choose a store
                </option>
                {stores.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.city}, {s.address[0]}
                  </option>
                ))}
              </SelectField>
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
                    label="Postcode"
                    name="postcode"
                    autoComplete="postal-code"
                    required
                    pattern="[A-Za-z0-9 \-]{3,10}"
                    error={errors.postcode}
                  />
                </div>
                <SelectField
                  label="Country"
                  name="country"
                  autoComplete="country-name"
                  required
                  defaultValue=""
                  error={errors.country}
                >
                  <option value="" disabled>
                    Choose a country
                  </option>
                  {checkout.countries.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </SelectField>
              </>
            )}
            <label className="check gift">
              <input
                type="checkbox"
                checked={gift}
                onChange={(e) => setGift(e.target.checked)}
              />
              This is a gift. {checkout.giftNote}
            </label>
            {gift && (
              <div className="field">
                <label htmlFor="f-giftMessage">Card message (optional)</label>
                <textarea
                  id="f-giftMessage"
                  name="giftMessage"
                  rows={3}
                  maxLength={200}
                />
              </div>
            )}
          </fieldset>

          <fieldset>
            <legend>Payment</legend>
            <Field
              label="Name on card"
              name="cardName"
              autoComplete="cc-name"
              required
              error={errors.cardName}
            />
            <Field
              label="Card number"
              name="cardNumber"
              inputMode="numeric"
              autoComplete="cc-number"
              required
              pattern="(?:[0-9] ?){12,18}[0-9]"
              placeholder="4242 4242 4242 4242"
              error={errors.cardNumber}
            />
            <div className="field-row">
              <Field
                label="Expiry"
                name="expiry"
                inputMode="numeric"
                autoComplete="cc-exp"
                required
                pattern="(0[1-9]|1[0-2])/[0-9]{2}"
                placeholder="MM/YY"
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
          </fieldset>

          <button
            type="submit"
            className="btn btn-ink btn-wide"
            disabled={busy}
          >
            {busy ? (
              <>
                <Loader2 size={16} className="spin" aria-hidden="true" />{" "}
                Placing your order
              </>
            ) : (
              `Place order, ${money(total)}`
            )}
          </button>
          <p className="fine">
            Demo only: no payment is taken and nothing is sent.
          </p>
        </form>

        <aside className="summary" aria-labelledby="order-title">
          <h2 id="order-title">Your order</h2>
          <ul className="summary-lines">
            {lines.map((l) => (
              <li key={l.key}>
                <img
                  src={
                    l.product.colours.find((c) => c.name === l.colour)?.image ??
                    l.product.images[0]
                  }
                  alt=""
                  width={56}
                  height={70}
                />
                <span>
                  {l.product.name}
                  <span className="fine">
                    {l.colour} · {l.size} · ×{l.qty}
                  </span>
                </span>
                <span className="price">{money(l.qty * l.product.price)}</span>
              </li>
            ))}
          </ul>
          <dl>
            <div>
              <dt>Subtotal</dt>
              <dd className="price">{money(sub)}</dd>
            </div>
            <div>
              <dt>{delivery.label}</dt>
              <dd className="price">{fee ? money(fee) : "Free"}</dd>
            </div>
            <div className="summary-total">
              <dt>Total</dt>
              <dd className="price">{money(total)}</dd>
            </div>
          </dl>
          <Link to="/bag" className="text-link">
            Edit bag
          </Link>
        </aside>
      </div>
    </div>
  );
}
