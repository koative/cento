import { useRef, useState, type FormEvent } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "../router";
import { brand, clutchHouse, products, shipping } from "../content";
import { money } from "../lib/format";
import { clearCart, countOf, setQty, subtotalOf, useCart } from "../lib/cart";
import { Field, useErrors, validate } from "../components/Field";
import { MerchArt } from "../components/MerchArt";

const messages: Record<string, string> = {
  email:
    "Enter an email address like name@example.com so we can send the receipt.",
  fullName: "Enter the name for the delivery label.",
  address: "Enter a street and house number.",
  postcode: "Enter a postcode, for example 3072 AP.",
  city: "Enter the town or city.",
  country: "Choose the country we ship to.",
  terms: "Tick the box to confirm this is a demo order.",
};

type Done = { ref: string; email: string; total: number; pickup: boolean };

export function Cart() {
  const lines = useCart();
  const { errors, setErrors, onChange } = useErrors();
  const [delivery, setDelivery] = useState<"post" | "pickup">("post");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<Done | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);

  const subtotal = subtotalOf(lines);
  const ship =
    delivery === "pickup" || subtotal >= shipping.freeOver ? 0 : shipping.flat;
  const total = subtotal + ship;

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, messages);
    setErrors(found);
    if (Object.keys(found).length) return;
    setBusy(true);
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    window.setTimeout(() => {
      setDone({
        ref: `CLT-${Math.floor(10000 + Math.random() * 89999)}`,
        email,
        total,
        pickup: delivery === "pickup",
      });
      clearCart();
      setBusy(false);
      requestAnimationFrame(() => heading.current?.focus());
    }, 900);
  };

  if (done) {
    return (
      <section className="wrap confirm" aria-live="polite">
        <h1 ref={heading} tabIndex={-1}>
          Order {done.ref} confirmed
        </h1>
        <p className="lede">
          Thanks — a receipt for{" "}
          <span className="num">{money(done.total)}</span> is on its way to{" "}
          {done.email}.{" "}
          {done.pickup
            ? "We'll email you when it's ready to collect from the Clutch House shop."
            : "Name-printed jerseys ship within 3 working days; everything else ships tomorrow."}
        </p>
        <p className="quiet">
          This is a demo checkout: nothing was charged and no order was sent.
        </p>
        <div className="actions">
          <Link to="/shop" className="btn">
            Back to the shop
          </Link>
          <Link to="/matches" className="btn btn-ghost">
            See the next match
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <header className="page-head wrap">
        <h1>Your bag</h1>
        <p className="lede num">
          {lines.length
            ? `${countOf(lines)} ${countOf(lines) === 1 ? "item" : "items"} · ${money(subtotal)}`
            : "Nothing in here yet."}
        </p>
      </header>

      {!lines.length ? (
        <section className="wrap empty-bag">
          <p>
            Start with the jersey the team wears on stage — with your own name
            on the back.
          </p>
          <Link to={`/shop/${products[0].id}`} className="btn">
            Shop the 2026 jersey
          </Link>
        </section>
      ) : (
        <div className="wrap checkout">
          <section aria-labelledby="bag-h" className="bag-lines">
            <h2 id="bag-h" className="sr-only">
              Items
            </h2>
            <ul>
              {lines.map((l) => {
                const product = products.find((p) => p.id === l.id);
                return (
                  <li key={l.key} className="bag-line">
                    <span className="bag-thumb">
                      {product && (
                        <MerchArt
                          product={product}
                          view={l.nameplate ? "back" : "front"}
                          nameplate={l.nameplate}
                        />
                      )}
                    </span>
                    <span className="bag-what">
                      <Link to={`/shop/${l.id}`}>{l.name}</Link>
                      <span>
                        Size {l.size}
                        {l.nameplate && ` · Name: ${l.nameplate}`}
                      </span>
                      <span className="num">{money(l.unit)} each</span>
                    </span>
                    <span
                      className="qty"
                      role="group"
                      aria-label={`Quantity of ${l.name}`}
                    >
                      <button
                        type="button"
                        onClick={() => setQty(l.key, l.qty - 1)}
                        aria-label="One fewer"
                      >
                        <Minus aria-hidden="true" />
                      </button>
                      <span className="num">{l.qty}</span>
                      <button
                        type="button"
                        onClick={() => setQty(l.key, l.qty + 1)}
                        aria-label="One more"
                        disabled={l.qty >= 9}
                      >
                        <Plus aria-hidden="true" />
                      </button>
                    </span>
                    <span className="bag-total num">
                      {money(l.unit * l.qty)}
                    </span>
                    <button
                      type="button"
                      className="icon-btn"
                      onClick={() => setQty(l.key, 0)}
                      aria-label={`Remove ${l.name}`}
                    >
                      <Trash2 aria-hidden="true" />
                    </button>
                  </li>
                );
              })}
            </ul>
            <dl className="totals">
              <div>
                <dt>Subtotal</dt>
                <dd className="num">{money(subtotal)}</dd>
              </div>
              <div>
                <dt>
                  {delivery === "pickup"
                    ? "Pickup at Clutch House"
                    : "Shipping"}
                </dt>
                <dd className="num">{ship ? money(ship) : "Free"}</dd>
              </div>
              <div className="totals-sum">
                <dt>Total</dt>
                <dd className="num">{money(total)}</dd>
              </div>
            </dl>
            {delivery === "post" && subtotal < shipping.freeOver && (
              <p className="quiet num">
                Add {money(shipping.freeOver - subtotal)} more for free
                shipping.
              </p>
            )}
          </section>

          <form
            className="checkout-form"
            noValidate
            onSubmit={submit}
            onChange={onChange}
            aria-labelledby="co-h"
            aria-busy={busy}
          >
            <h2 id="co-h">Checkout</h2>
            <Field
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              required
              error={errors.email}
            />
            <fieldset className="choice">
              <legend>Delivery</legend>
              <label>
                <input
                  type="radio"
                  name="delivery"
                  value="post"
                  checked={delivery === "post"}
                  onChange={() => setDelivery("post")}
                />
                <span>
                  Post ·{" "}
                  {subtotal >= shipping.freeOver
                    ? "free"
                    : money(shipping.flat)}
                  <small>1–3 working days in the Benelux</small>
                </span>
              </label>
              <label>
                <input
                  type="radio"
                  name="delivery"
                  value="pickup"
                  checked={delivery === "pickup"}
                  onChange={() => setDelivery("pickup")}
                />
                <span>
                  Pick up at Clutch House · free
                  <small>
                    {clutchHouse.hours[1].day}, {clutchHouse.hours[1].time}
                  </small>
                </span>
              </label>
            </fieldset>
            <Field
              label="Full name"
              name="fullName"
              autoComplete="name"
              required
              error={errors.fullName}
            />
            {delivery === "post" && (
              <>
                <Field
                  label="Street and number"
                  name="address"
                  autoComplete="street-address"
                  required
                  error={errors.address}
                />
                <div className="field-row">
                  <Field
                    label="Postcode"
                    name="postcode"
                    autoComplete="postal-code"
                    required
                    pattern="[A-Za-z0-9 \-]{3,10}"
                    error={errors.postcode}
                  />
                  <Field
                    label="City"
                    name="city"
                    autoComplete="address-level2"
                    required
                    error={errors.city}
                  />
                </div>
                <Field label="Country" name="country" error={errors.country}>
                  <select required autoComplete="country-name" defaultValue="">
                    <option value="" disabled>
                      Choose a country
                    </option>
                    <option>Netherlands</option>
                    <option>Belgium</option>
                    <option>Luxembourg</option>
                    <option>Germany</option>
                    <option>France</option>
                    <option>United Kingdom</option>
                  </select>
                </Field>
              </>
            )}
            <div className="check" data-invalid={errors.terms ? "" : undefined}>
              <input
                id="f-terms"
                type="checkbox"
                name="terms"
                required
                aria-invalid={errors.terms ? true : undefined}
                aria-describedby={errors.terms ? "f-terms-err" : undefined}
              />
              <label htmlFor="f-terms">
                I understand this is a demo and no payment is taken.
              </label>
              {errors.terms && (
                <p className="field-error" id="f-terms-err">
                  {errors.terms}
                </p>
              )}
            </div>
            <button type="submit" className="btn btn-wide" disabled={busy}>
              {busy ? "Placing order…" : `Place order · ${money(total)}`}
            </button>
            <p className="quiet">
              Demo checkout for {brand.name}: nothing is charged or sent
              anywhere.
            </p>
          </form>
        </div>
      )}
    </>
  );
}
