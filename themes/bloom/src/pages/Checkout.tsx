import { useEffect, useRef, useState, type FormEvent } from "react";
import { Check, Lock } from "lucide-react";
import { Link } from "../router";
import { brand, deliveryWindows } from "../content";
import { Field, TextArea, validate, type Errors } from "../components/Field";
import { LineThumb } from "./Cart";
import {
  clearCart,
  money,
  subtotal,
  useCart,
  type CartLine,
} from "../lib/cart";
import {
  dateProblem,
  earliest,
  isoDate,
  longDate,
  useNow,
  zoneFor,
} from "../lib/delivery";

const CARD_MAX = 200;

type Order = {
  number: string;
  lines: CartLine[];
  total: number;
  when: string;
  to: string;
  email: string;
  pickup: boolean;
};

export function Checkout() {
  const cart = useCart();
  const now = useNow();
  const [method, setMethod] = useState<"deliver" | "pickup">("deliver");
  const [postcode, setPostcode] = useState("");
  const [windowId, setWindowId] = useState(deliveryWindows[0].id);
  const [card, setCard] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const confirmHeading = useRef<HTMLHeadingElement>(null);
  useEffect(() => confirmHeading.current?.focus(), [order]);

  const pickup = method === "pickup";
  const zone = pickup ? null : zoneFor(postcode);
  const win = deliveryWindows.find((w) => w.id === windowId)!;
  const items = subtotal(cart);
  const deliveryFee = pickup ? 0 : (zone?.fee ?? 0) + win.price;
  const total = items + deliveryFee;
  const minDate = isoDate(earliest(now, zone ? zone.sameDay : true));

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const extra: Errors = {};
    if (
      !pickup &&
      postcode.trim() &&
      !zone &&
      /^EB\d{1,2}\s*\d[A-Z]{2}$/i.test(postcode.trim())
    )
      extra.postcode =
        "We only deliver to EB1–EB12. Choose studio pickup instead, or send to an address in our zones.";
    const date = String(data.get("date") ?? "");
    const problem = date && dateProblem(date, now, zone);
    if (problem) extra.date = problem;

    const messages = {
      ...(!pickup && {
        recipient: {
          missing: "Add the name of the person receiving the flowers.",
        },
        address: {
          missing:
            "Add the street address, including the house or flat number.",
        },
        postcode: {
          missing: "Add the postcode so we know which van run it's on.",
          invalid:
            "Postcodes look like EB4 2LT. Check the letters and numbers.",
        },
        recipientPhone: {
          missing:
            "Add the recipient's phone so the driver can call if the door isn't answered.",
          invalid: "Use digits only, with an optional + and spaces.",
        },
      }),
      date: {
        missing: pickup
          ? "Choose the day you'll collect."
          : "Choose a delivery day.",
      },
      name: { missing: "Add your name so we can put it on the receipt." },
      email: {
        missing: "Add your email for the order confirmation.",
        invalid: "That email looks incomplete. Check it has an @ and a domain.",
      },
    };
    const next = validate(form, messages, extra);
    setErrors(next);
    if (Object.keys(next).length) return;

    setSending(true);
    setTimeout(() => {
      const [y, m, d] = date.split("-").map(Number);
      setOrder({
        number: "BL-" + String(Math.floor(10000 + Math.random() * 89999)),
        lines: cart,
        total,
        when:
          longDate(new Date(y, m - 1, d)) +
          (pickup
            ? ", from 10 am"
            : `, ${win.label.split(", ")[1] ?? win.label}`),
        to: pickup
          ? `Studio pickup, ${brand.street}`
          : `${data.get("recipient")}, ${data.get("address")}, ${postcode.trim().toUpperCase()}`,
        email: String(data.get("email")),
        pickup,
      });
      clearCart();
      setSending(false);
      window.scrollTo({ top: 0 });
    }, 1100);
  }

  if (order)
    return (
      <div className="confirm">
        <Check className="confirm-mark" size={40} aria-hidden="true" />
        <h1 tabIndex={-1} ref={confirmHeading}>
          Thank you. Your flowers are on our list.
        </h1>
        <p className="lead">
          Order <strong>{order.number}</strong> is confirmed. A receipt is on
          its way to {order.email}, and we'll text{" "}
          {order.pickup ? "you when it's ready" : "a photo once it's delivered"}
          .
        </p>
        <dl className="confirm-details">
          <div>
            <dt>{order.pickup ? "Collect" : "Delivery"}</dt>
            <dd>{order.when}</dd>
          </div>
          <div>
            <dt>{order.pickup ? "Where" : "To"}</dt>
            <dd>{order.to}</dd>
          </div>
          <div>
            <dt>Flowers</dt>
            <dd>
              <ul>
                {order.lines.map((l) => (
                  <li key={l.key}>
                    {l.qty} × {l.name}{" "}
                    <span className="line-detail">{l.detail}</span>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
          <div>
            <dt>Total</dt>
            <dd>{money(order.total)}</dd>
          </div>
        </dl>
        <p className="fine">
          This is a demo: no order was placed, nothing was charged and no
          message was sent.
        </p>
        <Link to="/" className="btn">
          Back to the studio
        </Link>
      </div>
    );

  return (
    <>
      <header className="page-head">
        <h1>Checkout</h1>
        <p className="lead">Who, where, when and what the card should say.</p>
      </header>

      {cart.length === 0 ? (
        <div className="section empty">
          <h2>Your bag is empty.</h2>
          <p>
            Add a bouquet, a plant or a subscription first, then come back to
            choose a delivery day.
          </p>
          <Link to="/shop" className="btn">
            Shop flowers
          </Link>
        </div>
      ) : (
        <div className="section checkout">
          <form
            className="form"
            noValidate
            onSubmit={submit}
            aria-busy={sending}
          >
            <fieldset className="form-block">
              <legend>How should it reach them?</legend>
              <div className="option-grid option-grid-2">
                <label className="option">
                  <input
                    type="radio"
                    name="method"
                    value="deliver"
                    checked={!pickup}
                    onChange={() => setMethod("deliver")}
                  />
                  <span className="option-label">Deliver</span>
                  <span className="option-detail">
                    By our van, across EB1–EB12
                  </span>
                </label>
                <label className="option">
                  <input
                    type="radio"
                    name="method"
                    value="pickup"
                    checked={pickup}
                    onChange={() => setMethod("pickup")}
                  />
                  <span className="option-label">Collect from the studio</span>
                  <span className="option-detail">Free, {brand.street}</span>
                </label>
              </div>
            </fieldset>

            {!pickup && (
              <fieldset className="form-block">
                <legend>Recipient</legend>
                <div className="form-grid">
                  <Field
                    label="Their name"
                    name="recipient"
                    required
                    autoComplete="off"
                    error={errors.recipient}
                  />
                  <Field
                    label="Their phone"
                    name="recipientPhone"
                    type="tel"
                    required
                    pattern="\+?[0-9 ]{7,16}"
                    error={errors.recipientPhone}
                    hint="Only used by the driver."
                  />
                  <Field
                    label="Street address"
                    name="address"
                    required
                    autoComplete="street-address"
                    error={errors.address}
                    className="span-2"
                  />
                  <Field
                    label="Postcode"
                    name="postcode"
                    required
                    pattern="[Ee][Bb][0-9]{1,2} ?[0-9][A-Za-z]{2}"
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                    error={errors.postcode}
                    hint={
                      zone
                        ? `${zone.name}: ${money(zone.fee)}, ${zone.sameDay ? "same day before 1 pm" : "next day only"}.`
                        : "We deliver to EB1–EB12."
                    }
                    autoComplete="postal-code"
                  />
                  <Field
                    label="Safe place (optional)"
                    name="safe"
                    placeholder="Leave with no. 12, or in the porch"
                  />
                </div>
              </fieldset>
            )}

            <fieldset className="form-block">
              <legend>When</legend>
              <div className="form-grid">
                <Field
                  label={pickup ? "Collection day" : "Delivery day"}
                  name="date"
                  type="date"
                  required
                  min={minDate}
                  error={errors.date}
                  hint={`Earliest: ${longDate(earliest(now, zone ? zone.sameDay : true))}. No Sundays.`}
                />
              </div>
              {!pickup && (
                <div
                  className="option-grid option-grid-3"
                  role="radiogroup"
                  aria-label="Delivery window"
                >
                  {deliveryWindows.map((w) => (
                    <label key={w.id} className="option">
                      <input
                        type="radio"
                        name="window"
                        value={w.id}
                        checked={windowId === w.id}
                        onChange={() => setWindowId(w.id)}
                      />
                      <span className="option-label">{w.label}</span>
                      <span className="option-price">
                        {w.price ? "+" + money(w.price) : "Included"}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </fieldset>

            <fieldset className="form-block">
              <legend>The card</legend>
              <TextArea
                label="Card message (optional)"
                name="card"
                rows={3}
                maxLength={CARD_MAX}
                value={card}
                onChange={(e) => setCard(e.target.value)}
                hint={`Handwritten on cotton paper. ${CARD_MAX - card.length} characters left. Sign it yourself, or leave it anonymous.`}
              />
            </fieldset>

            <fieldset className="form-block">
              <legend>Your details</legend>
              <div className="form-grid">
                <Field
                  label="Your name"
                  name="name"
                  required
                  autoComplete="name"
                  error={errors.name}
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  error={errors.email}
                />
              </div>
            </fieldset>

            <p className="fine pay-note">
              <Lock size={15} aria-hidden="true" /> Demo checkout: no payment is
              taken and nothing is sent.
            </p>
            <button type="submit" className="btn btn-wide" disabled={sending}>
              {sending
                ? "Placing your order…"
                : `Place order · ${money(total)}`}
            </button>
          </form>

          <aside
            className="bag-summary checkout-summary"
            aria-label="Order summary"
          >
            <h2 className="h3">Your order</h2>
            <ul className="mini-lines">
              {cart.map((l) => (
                <li key={l.key}>
                  <LineThumb line={l} />
                  <div>
                    <p className="line-name">
                      {l.qty} × {l.name}
                    </p>
                    <p className="line-detail">{l.detail}</p>
                  </div>
                  <p className="num">{money(l.unit * l.qty)}</p>
                </li>
              ))}
            </ul>
            <dl className="sum">
              <div>
                <dt>Flowers</dt>
                <dd>{money(items)}</dd>
              </div>
              <div>
                <dt>
                  {pickup
                    ? "Studio pickup"
                    : zone
                      ? `Delivery, ${zone.name}`
                      : "Delivery"}
                </dt>
                <dd>
                  {pickup ? "Free" : zone ? money(zone.fee) : "Add postcode"}
                </dd>
              </div>
              {!pickup && win.price > 0 && (
                <div>
                  <dt>{win.label.split(",")[0]} window</dt>
                  <dd>{money(win.price)}</dd>
                </div>
              )}
              <div className="sum-total">
                <dt>Total</dt>
                <dd>{money(total)}</dd>
              </div>
            </dl>
          </aside>
        </div>
      )}
    </>
  );
}
