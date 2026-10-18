import { useState, type FormEvent } from "react";
import { Minus, Plus, X } from "lucide-react";
import { Link } from "../router";
import { brand, shipping } from "../content";
import { money } from "../lib/format";
import { isEmail, useForm } from "../lib/form";
import {
  bag,
  bagCount,
  itemFor,
  setQty,
  totals,
  type BagLine,
} from "../lib/store";
import { Field } from "../components/Field";
import { ShopVisual } from "../components/Cards";

type Order = {
  number: string;
  email: string;
  pickup: boolean;
  lines: BagLine[];
  total: number;
};

export function Bag() {
  const lines = bag.use();
  const [pickup, setPickup] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const t = totals(lines, pickup);

  const f = useForm(
    "checkout",
    { name: "", email: "", address: "", city: "", zip: "" },
    (v) => ({
      name:
        v.name.trim().length < 2
          ? "Enter your full name for the order."
          : undefined,
      email: !v.email.trim()
        ? "Enter your email so we can send the receipt."
        : !isEmail(v.email)
          ? "Check the email: it needs an @ and a domain."
          : undefined,
      address:
        !pickup && !v.address.trim()
          ? "Enter a street address, or choose collection from the gallery."
          : undefined,
      city: !pickup && !v.city.trim() ? "Enter the town or city." : undefined,
      zip:
        !pickup && !/^\d{5}(-\d{4})?$/.test(v.zip.trim())
          ? "Enter a 5-digit ZIP code, like 11231."
          : undefined,
    }),
  );

  const place = (e: FormEvent) =>
    f.submit(e, () => {
      setOrder({
        number: "F-" + String(Date.now()).slice(-6),
        email: f.values.email,
        pickup,
        lines,
        total: t.total,
      });
      bag.set([]);
      window.scrollTo({ top: 0 });
    });

  if (order)
    return (
      <div className="page narrow">
        <h1 className="display" tabIndex={-1} ref={(el) => el?.focus()}>
          Thank you
        </h1>
        <p className="lede">
          Order {order.number} is confirmed. A receipt and a payment link are on
          their way to {order.email}.
        </p>
        <ul className="line-list">
          {order.lines.map((l) => (
            <li key={l.key}>
              <span>
                {l.qty} × {itemFor(l)?.name}{" "}
                <span className="quiet">({l.option})</span>
              </span>
              <span className="num">{money(l.qty * l.unit)}</span>
            </li>
          ))}
          <li>
            <strong>Total</strong>
            <strong className="num">{money(order.total)}</strong>
          </li>
        </ul>
        <p>
          {order.pickup
            ? `Collect from the front desk at ${brand.street} from tomorrow, during opening hours. Bring the order number.`
            : "Unframed editions and books ship in 2 working days; framed works in 10."}
        </p>
        <p className="quiet">
          This is a demo: no order was placed and nothing was charged.
        </p>
        <Link to="/shop" className="btn">
          Back to the shop
        </Link>
      </div>
    );

  if (lines.length === 0)
    return (
      <div className="page narrow">
        <h1 className="display">Your bag</h1>
        <p className="lede">
          Your bag is empty. Editions start at $140 and every one is signed by
          the artist.
        </p>
        <Link to="/shop" className="btn">
          Browse editions &amp; books
        </Link>
      </div>
    );

  return (
    <div className="page">
      <header className="page-head">
        <h1 className="display">Your bag</h1>
      </header>
      <div className="checkout">
        <section aria-labelledby="lines-title" className="bag-lines">
          <h2 id="lines-title" className="visually-hidden">
            Items
          </h2>
          <ul>
            {lines.map((l) => {
              const item = itemFor(l);
              if (!item) return null;
              return (
                <li key={l.key} className="bag-line">
                  <Link
                    to={`/shop/${item.id}`}
                    className="bag-thumb"
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    <ShopVisual item={item} />
                  </Link>
                  <div>
                    <h3>
                      <Link to={`/shop/${item.id}`}>{item.name}</Link>
                    </h3>
                    <p className="quiet">
                      {item.by} · {l.option}
                    </p>
                    <div
                      className="qty qty-small"
                      role="group"
                      aria-label={`Quantity of ${item.name}`}
                    >
                      <button
                        type="button"
                        onClick={() => setQty(l.key, l.qty - 1)}
                        aria-label="One fewer"
                      >
                        <Minus size={14} aria-hidden="true" />
                      </button>
                      <output>{l.qty}</output>
                      <button
                        type="button"
                        onClick={() => setQty(l.key, l.qty + 1)}
                        disabled={l.qty >= 10}
                        aria-label="One more"
                      >
                        <Plus size={14} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <div className="bag-line-end">
                    <span className="num">{money(l.qty * l.unit)}</span>
                    <button
                      type="button"
                      className="icon-btn"
                      onClick={() => setQty(l.key, 0)}
                      aria-label={`Remove ${item.name}`}
                    >
                      <X size={16} aria-hidden="true" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          <dl className="totals">
            <div>
              <dt>Subtotal ({bagCount(lines)} items)</dt>
              <dd className="num">{money(t.subtotal)}</dd>
            </div>
            <div>
              <dt>{pickup ? "Collection" : "Delivery"}</dt>
              <dd className="num">{t.delivery ? money(t.delivery) : "Free"}</dd>
            </div>
            <div className="total">
              <dt>Total</dt>
              <dd className="num">{money(t.total)}</dd>
            </div>
          </dl>
          {!pickup && t.subtotal < shipping.freeOver && (
            <p className="quiet">
              Add {money(shipping.freeOver - t.subtotal)} more for free
              delivery.
            </p>
          )}
        </section>

        <form
          className="checkout-form"
          noValidate
          onSubmit={place}
          aria-labelledby="details-title"
        >
          <h2 id="details-title">Your details</h2>
          <fieldset className="segmented">
            <legend>How would you like it?</legend>
            <label>
              <input
                type="radio"
                name="fulfil"
                checked={!pickup}
                onChange={() => setPickup(false)}
              />
              <span>Deliver it</span>
            </label>
            <label>
              <input
                type="radio"
                name="fulfil"
                checked={pickup}
                onChange={() => setPickup(true)}
              />
              <span>Collect from the gallery</span>
            </label>
          </fieldset>
          <Field id={f.id("name")} label="Full name" error={f.errors.name}>
            <input
              type="text"
              required
              autoComplete="name"
              {...f.bind("name")}
            />
          </Field>
          <Field id={f.id("email")} label="Email" error={f.errors.email}>
            <input
              type="email"
              required
              autoComplete="email"
              {...f.bind("email")}
            />
          </Field>
          {!pickup && (
            <>
              <Field
                id={f.id("address")}
                label="Street address"
                error={f.errors.address}
              >
                <input
                  type="text"
                  required
                  autoComplete="street-address"
                  {...f.bind("address")}
                />
              </Field>
              <div className="field-row">
                <Field id={f.id("city")} label="City" error={f.errors.city}>
                  <input
                    type="text"
                    required
                    autoComplete="address-level2"
                    {...f.bind("city")}
                  />
                </Field>
                <Field id={f.id("zip")} label="ZIP code" error={f.errors.zip}>
                  <input
                    type="text"
                    required
                    inputMode="numeric"
                    autoComplete="postal-code"
                    {...f.bind("zip")}
                  />
                </Field>
              </div>
            </>
          )}
          <p className="quiet">
            We email a secure payment link after you place the order. Demo only:
            nothing is sent or charged.
          </p>
          <button
            type="submit"
            className="btn btn-wide"
            disabled={f.status === "sending"}
          >
            {f.status === "sending"
              ? "Placing order…"
              : `Place order · ${money(t.total)}`}
          </button>
        </form>
      </div>
    </div>
  );
}
