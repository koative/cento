import { useRef, useState, type FormEvent } from "react";
import { ArrowRight, Check, LoaderCircle } from "lucide-react";
import { Link } from "../router";
import { delivery } from "../content";
import { Field, validate, type Errors } from "../components/Field";
import { SlotBoard } from "../components/SlotBoard";
import {
  clearBasket,
  count,
  money,
  priced,
  subtotal,
  useBasket,
} from "../lib/cart";
import { deliveryFee, findSlot, slotLabel, zoneFor } from "../lib/slots";

type Placed = {
  number: string;
  slot: string;
  street: string;
  items: number;
  total: number;
  email: string;
};

function expiryInFuture(v: string) {
  const [mm, yy] = v.split("/").map(Number);
  if (!mm || mm > 12 || yy === undefined) return false;
  const now = new Date();
  return (
    2000 + yy > now.getFullYear() ||
    (2000 + yy === now.getFullYear() && mm >= now.getMonth() + 1)
  );
}

export function Checkout() {
  const basket = useBasket();
  const lines = priced(basket.lines);
  const sub = subtotal(lines);
  const slot = findSlot(basket.slot);
  const [zip, setZip] = useState("");
  const zone = zoneFor(zip);
  const fee = deliveryFee(slot, sub, zone);
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [placed, setPlaced] = useState<Placed | null>(null);
  const slotRef = useRef<HTMLDivElement>(null);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, {
      name: { missing: "Enter the name we should ask for at the door." },
      email: {
        missing: "Enter an email for your receipt.",
        invalid:
          "That email is missing something. Check the @ and the part after it.",
      },
      phone: {
        missing: "Enter a phone number so your picker can call about swaps.",
        invalid: "Use at least 10 digits, like 555 014 2230.",
        check: (v) => v.replace(/\D/g, "").length >= 10,
      },
      street: { missing: "Enter the street address for delivery." },
      zip: {
        missing: "Enter your 5-digit ZIP code.",
        invalid: `We only deliver to Zones 1 and 2 (ZIPs 40110 to 40116). Check the ZIP or visit the shop.`,
        check: (v) => Boolean(zoneFor(v)),
      },
      card: {
        missing: "Enter the card number. Nothing will be charged in this demo.",
        invalid: "Card numbers are 15 or 16 digits. Check for a missing digit.",
        check: (v) => /^\d{15,16}$/.test(v.replace(/\s/g, "")),
      },
      expiry: {
        missing: "Enter the expiry date as MM/YY.",
        invalid: "Use MM/YY with a date that has not passed, like 08/28.",
        check: expiryInFuture,
      },
      cvc: {
        missing: "Enter the 3 or 4 digits on the back of the card.",
        invalid: "The security code is 3 or 4 digits.",
      },
    });
    if (!slot) {
      found.slot = "Choose a delivery slot. Grey windows are full or closed.";
      if (Object.keys(found).length === 1)
        slotRef.current
          ?.querySelector<HTMLInputElement>("input:not(:disabled)")
          ?.focus();
    }
    setErrors(found);
    if (Object.keys(found).length || !slot) return;

    const value = (n: string) =>
      (form.elements.namedItem(n) as HTMLInputElement).value.trim();
    setBusy(true);
    setTimeout(() => {
      setPlaced({
        number: "SAF-" + String(Math.floor(10000 + Math.random() * 89999)),
        slot: slotLabel(slot),
        street: value("street"),
        items: count(basket.lines),
        total: sub + fee,
        email: value("email"),
      });
      clearBasket();
      setBusy(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1200);
  }

  if (placed) {
    return (
      <div className="page checkout-page">
        <section className="confirmation" aria-live="polite">
          <span className="confirm-mark" aria-hidden="true">
            <Check size={32} />
          </span>
          <h1>
            Order <span className="nowrap">{placed.number}</span> is in
          </h1>
          <p className="lede">
            Thank you. A grocer will start picking a few hours before your slot
            and call if anything needs a swap you have not agreed to.
          </p>
          <dl className="receipt">
            <div>
              <dt>Delivery</dt>
              <dd>{placed.slot}</dd>
            </div>
            <div>
              <dt>To</dt>
              <dd>{placed.street}</dd>
            </div>
            <div>
              <dt>Items</dt>
              <dd className="num">{placed.items}</dd>
            </div>
            <div>
              <dt>Estimated total</dt>
              <dd className="num">{money(placed.total)}</dd>
            </div>
          </dl>
          <p className="fine">
            Demo only: no order was placed, nothing was charged and no email was
            sent to {placed.email}.
          </p>
          <Link to="/recipes" className="btn btn-lg">
            Plan what to cook <ArrowRight size={20} aria-hidden="true" />
          </Link>
        </section>
      </div>
    );
  }

  if (!lines.length) {
    return (
      <div className="page checkout-page">
        <header className="page-head">
          <h1>Checkout</h1>
          <p className="lede">
            Your basket is empty, so there is nothing to check out yet.
          </p>
        </header>
        <Link to="/aisles" className="btn btn-lg">
          Walk the aisles <ArrowRight size={20} aria-hidden="true" />
        </Link>
      </div>
    );
  }

  const short = delivery.minimum - sub;

  return (
    <div className="page checkout-page">
      <header className="page-head">
        <h1>Checkout</h1>
        <p className="lede">
          Four short steps. We only charge once your basket has been picked and
          weighed.
        </p>
      </header>

      <div className="checkout-layout">
        <form
          className="checkout-form"
          noValidate
          onSubmit={submit}
          aria-busy={busy}
        >
          <fieldset>
            <legend>Who is it for</legend>
            <div className="field-grid">
              <Field
                label="Full name"
                name="name"
                autoComplete="name"
                required
                error={errors.name}
              />
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
                hint="Only used if your picker needs to ask about a swap."
                error={errors.phone}
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Where to</legend>
            <div className="field-grid">
              <Field
                label="Street address"
                name="street"
                autoComplete="address-line1"
                required
                className="span-2"
                error={errors.street}
              />
              <Field
                label="Apartment, buzzer (optional)"
                name="apt"
                autoComplete="address-line2"
              />
              <Field
                label="ZIP code"
                name="zip"
                inputMode="numeric"
                autoComplete="postal-code"
                required
                pattern="\d{5}"
                maxLength={5}
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                hint={
                  zone
                    ? `${zone.name}, by ${zone.vehicle}`
                    : "Zones 1 and 2: 40110 to 40116"
                }
                error={errors.zip}
              />
              <div className="field span-2">
                <label htmlFor="f-notes">
                  Safe place or doorstep notes (optional)
                </label>
                <textarea
                  id="f-notes"
                  name="notes"
                  rows={3}
                  placeholder="Behind the side gate; the dog is friendly."
                />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>When</legend>
            <div
              ref={slotRef}
              aria-describedby={errors.slot ? "slot-error" : undefined}
            >
              <SlotBoard legend="Choose a delivery slot" />
            </div>
            {errors.slot && !slot && (
              <p className="field-error" id="slot-error">
                {errors.slot}
              </p>
            )}
          </fieldset>

          <fieldset>
            <legend>Payment</legend>
            <p className="fine">
              Demo checkout: nothing is sent anywhere and no card is charged.
            </p>
            <div className="field-grid card-grid">
              <Field
                label="Card number"
                name="card"
                inputMode="numeric"
                autoComplete="cc-number"
                required
                placeholder="4242 4242 4242 4242"
                className="span-2"
                error={errors.card}
              />
              <Field
                label="Expiry"
                name="expiry"
                autoComplete="cc-exp"
                required
                pattern="\d{2}/\d{2}"
                placeholder="MM/YY"
                error={errors.expiry}
              />
              <Field
                label="CVC"
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

          {short > 0 && (
            <p className="field-error">
              Add {money(short)} more to reach the {money(delivery.minimum)}{" "}
              minimum. <Link to="/aisles">Back to the aisles</Link>
            </p>
          )}
          <button
            type="submit"
            className="btn btn-lg btn-block"
            disabled={busy || short > 0}
          >
            {busy ? (
              <>
                <LoaderCircle size={20} className="spin" aria-hidden="true" />{" "}
                Placing order…
              </>
            ) : (
              <>Place order · {money(sub + fee)}</>
            )}
          </button>
          <p className="visually-hidden" aria-live="polite">
            {busy
              ? "Placing your order"
              : Object.keys(errors).length
                ? `${Object.keys(errors).length} fields need attention`
                : ""}
          </p>
        </form>

        <aside className="summary" aria-labelledby="order-title">
          <h2 id="order-title">Your order</h2>
          <ul className="summary-lines">
            {lines.map((l) => (
              <li key={l.key}>
                <span>
                  {l.qty} × {l.product.name}
                  <small>{l.option.label}</small>
                </span>
                <span className="num">{money(l.total)}</span>
              </li>
            ))}
          </ul>
          <dl>
            <div>
              <dt>Items</dt>
              <dd className="num">{money(sub)}</dd>
            </div>
            <div>
              <dt>Delivery{zone?.surcharge ? ` (${zone.name})` : ""}</dt>
              <dd className="num">{fee === 0 ? "Free" : money(fee)}</dd>
            </div>
            <div className="total">
              <dt>Estimated total</dt>
              <dd className="num">{money(sub + fee)}</dd>
            </div>
          </dl>
          <Link to="/basket" className="text-link">
            Edit basket
          </Link>
        </aside>
      </div>
    </div>
  );
}
