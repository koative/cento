import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { brand, checkout } from "../content";
import { Link } from "../router";
import { clearCart, subtotal, useCart, type CartLine } from "../lib/cart";
import { money } from "../lib/format";
import { Field, validate, type Errors } from "../components/Field";
import { LineCover } from "./Cart";

const base = {
  email: {
    missing:
      "Enter your email so we can send the receipt and tell you when it's ready.",
    invalid:
      "Check the email address: it needs an @ and a domain, like name@example.com.",
  },
  name: {
    missing:
      "Enter the name for the order, as it should appear on the parcel or the shelf behind the till.",
  },
};
const address = {
  street: {
    missing: "Enter the street address, including the house or flat number.",
  },
  city: { missing: "Enter your town or city." },
  postcode: {
    missing: "Enter your postcode.",
    invalid: "Use 3 to 10 letters, numbers or spaces for the postcode.",
  },
};
const card = {
  cardName: { missing: "Enter the name exactly as printed on the card." },
  cardNumber: {
    missing: "Enter the long number on the front of the card.",
    invalid: "Card numbers are 13 to 19 digits; spaces are fine.",
  },
  expiry: {
    missing: "Enter the expiry date as MM/YY.",
    invalid: "Write the expiry as MM/YY, for example 08/28.",
  },
  cvc: {
    missing: "Enter the 3 or 4 digit security code from the back of the card.",
    invalid: "The security code is 3 or 4 digits.",
  },
};

type Order = {
  number: string;
  email: string;
  name: string;
  lines: CartLine[];
  total: number;
  delivery: number;
  wrap: number;
  method: string;
};

function expired(value: string) {
  const [m, y] = value.split("/").map(Number);
  const now = new Date();
  return (
    2000 + y < now.getFullYear() ||
    (2000 + y === now.getFullYear() && m < now.getMonth() + 1)
  );
}

export function Checkout() {
  const cart = useCart();
  const [methodId, setMethodId] = useState(checkout.methods[0].id);
  const [wrap, setWrap] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const done = useRef<HTMLHeadingElement>(null);

  const method =
    checkout.methods.find((m) => m.id === methodId) ?? checkout.methods[0];
  const sub = subtotal(cart);
  const delivery =
    method.id === "bike" && sub >= checkout.freeDeliveryOver ? 0 : method.price;
  const wrapCost = wrap ? checkout.giftWrap : 0;
  const total = sub + delivery + wrapCost;
  const needsAddress = method.id !== "collect";

  useEffect(() => {
    if (order) done.current?.focus();
  }, [order]);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const next = validate(form, {
      ...base,
      ...(needsAddress ? address : {}),
      ...card,
    });
    const expiry = form.elements.namedItem("expiry") as HTMLInputElement;
    if (!next.expiry && expired(expiry.value)) {
      next.expiry =
        "This card has expired. Use a card with an expiry date this month or later.";
      if (Object.keys(next).length === 1) expiry.focus();
    }
    setErrors(next);
    if (Object.keys(next).length) return;
    const data = new FormData(form);
    setBusy(true);
    window.setTimeout(() => {
      setOrder({
        number: "IX-" + Math.floor(10000 + Math.random() * 90000),
        email: String(data.get("email")),
        name: String(data.get("name")),
        lines: cart,
        total,
        delivery,
        wrap: wrapCost,
        method: method.label,
      });
      clearCart();
      setBusy(false);
    }, 900);
  }

  if (order)
    return (
      <div className="page checkout-page">
        <div className="receipt" aria-live="polite">
          <h1 tabIndex={-1} ref={done}>
            Thank you, {order.name.split(" ")[0]}
          </h1>
          <p className="lede">
            Order <strong>{order.number}</strong> is in. A receipt is on its way
            to {order.email}.{" "}
            {order.method.startsWith("Collect")
              ? "We'll email again when it's wrapped and waiting behind the till, usually within two hours."
              : "We'll email again when it leaves the shop."}
          </p>
          <div className="slip">
            <p className="slip-head">
              {brand.name} · {brand.address}
            </p>
            <ul>
              {order.lines.map((l) => (
                <li key={l.key}>
                  <span>
                    {l.qty} × {l.title} <small>{l.detail}</small>
                  </span>
                  <span>{money(l.unit * l.qty)}</span>
                </li>
              ))}
              <li>
                <span>{order.method}</span>
                <span>{order.delivery ? money(order.delivery) : "Free"}</span>
              </li>
              {order.wrap > 0 && (
                <li>
                  <span>Gift wrap</span>
                  <span>{money(order.wrap)}</span>
                </li>
              )}
            </ul>
            <p className="slip-total">
              <span>Total</span>
              <span>{money(order.total)}</span>
            </p>
            <p className="slip-foot">
              Demo order: nothing was charged and no books will arrive.
            </p>
          </div>
          <div className="actions">
            <Link to="/books" className="btn">
              Back to the catalogue
            </Link>
            <Link to="/events" className="btn btn-ghost">
              See what's on
            </Link>
          </div>
        </div>
      </div>
    );

  if (!cart.length)
    return (
      <div className="page checkout-page">
        <div className="empty">
          <h1>Checkout</h1>
          <p>Your bag is empty, so there's nothing to check out yet.</p>
          <Link to="/books" className="btn">
            Browse the catalogue
          </Link>
        </div>
      </div>
    );

  return (
    <div className="page checkout-page">
      <header className="page-head">
        <h1>Checkout</h1>
      </header>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={submit} noValidate>
          <fieldset>
            <legend>Your details</legend>
            <Field
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              required
              error={errors.email}
            />
            <Field
              label="Full name"
              name="name"
              autoComplete="name"
              required
              error={errors.name}
            />
          </fieldset>

          <fieldset>
            <legend>How you'd like your books</legend>
            {checkout.methods.map((m) => (
              <label key={m.id} className="option">
                <input
                  type="radio"
                  name="method"
                  value={m.id}
                  checked={m.id === methodId}
                  onChange={() => setMethodId(m.id)}
                />
                <span className="option-name">{m.label}</span>
                <span className="option-price">
                  {m.id === "bike" && sub >= checkout.freeDeliveryOver
                    ? "Free"
                    : m.price
                      ? money(m.price)
                      : "Free"}
                </span>
                <span className="option-note">{m.note}</span>
              </label>
            ))}
          </fieldset>

          {needsAddress && (
            <fieldset>
              <legend>Delivery address</legend>
              <Field
                label="Street address"
                name="street"
                autoComplete="street-address"
                required
                error={errors.street}
              />
              <div className="field-row">
                <Field
                  label="Town or city"
                  name="city"
                  autoComplete="address-level2"
                  required
                  defaultValue={method.id === "bike" ? "Halden" : ""}
                  error={errors.city}
                />
                <Field
                  label="Postcode"
                  name="postcode"
                  autoComplete="postal-code"
                  required
                  pattern="[A-Za-z0-9 ]{3,10}"
                  error={errors.postcode}
                />
              </div>
            </fieldset>
          )}

          <fieldset>
            <legend>Wrapping</legend>
            <label className="check">
              <input
                type="checkbox"
                checked={wrap}
                onChange={(e) => setWrap(e.target.checked)}
              />
              Wrap it in brown paper and string (+{money(checkout.giftWrap)})
            </label>
            {wrap && (
              <div className="field">
                <label htmlFor="f-note">Gift note (optional)</label>
                <textarea
                  id="f-note"
                  name="note"
                  rows={3}
                  maxLength={240}
                  placeholder="We'll write it by hand on a shelf card."
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
              autoComplete="cc-number"
              inputMode="numeric"
              required
              pattern="[0-9 ]{13,23}"
              placeholder="1234 5678 9012 3456"
              error={errors.cardNumber}
            />
            <div className="field-row">
              <Field
                label="Expiry (MM/YY)"
                name="expiry"
                autoComplete="cc-exp"
                required
                pattern="(0[1-9]|1[0-2])/[0-9]{2}"
                placeholder="08/28"
                error={errors.expiry}
              />
              <Field
                label="Security code"
                name="cvc"
                autoComplete="cc-csc"
                inputMode="numeric"
                required
                pattern="[0-9]{3,4}"
                error={errors.cvc}
              />
            </div>
          </fieldset>

          <button className="btn btn-wide" type="submit" disabled={busy}>
            {busy ? (
              <>
                <Loader2 size={18} className="spin" aria-hidden="true" />{" "}
                Placing your order…
              </>
            ) : (
              <>
                Place order · {money(total)}{" "}
                <ArrowRight size={18} aria-hidden="true" />
              </>
            )}
          </button>
          <p className="quiet">
            This is a demo checkout: nothing is sent and no card is charged.
          </p>
        </form>

        <aside className="summary" aria-labelledby="summary-title">
          <h2 id="summary-title">Your order</h2>
          <ul className="summary-lines">
            {cart.map((l) => (
              <li key={l.key}>
                <LineCover line={l} />
                <span>
                  <strong>{l.title}</strong>
                  {l.qty} × {l.detail}
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
              <dt>{method.label}</dt>
              <dd>{delivery ? money(delivery) : "Free"}</dd>
            </div>
            {wrap && (
              <div>
                <dt>Gift wrap</dt>
                <dd>{money(wrapCost)}</dd>
              </div>
            )}
            <div className="summary-total">
              <dt>Total</dt>
              <dd>{money(total)}</dd>
            </div>
          </dl>
          <Link to="/cart" className="text-link">
            Edit your bag
          </Link>
        </aside>
      </div>
    </div>
  );
}
