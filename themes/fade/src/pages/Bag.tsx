import { useEffect, useRef, useState, type FormEvent } from "react";
import { PackageCheck, Trash2 } from "lucide-react";
import { Link } from "../router";
import { bagPage, brand, products } from "../content";
import { clearBag, setQty, subtotalOf, useBag } from "../lib/bag";
import { money, pause, validate } from "../lib/format";
import { Field, useErrors } from "../components/Field";
import { ProductArt } from "../components/ProductArt";
import { Qty } from "../components/Qty";

const messages = {
  name: "Add your name so we know whose bag it is at the counter.",
  email: "Enter an email like you@example.com for the receipt.",
  phone: "Add a phone number with area code so we can text when it's ready.",
  street: "Add the street address we should ship to.",
  city: "Add the town or city.",
  zip: "Enter a five-digit ZIP code, like 10456.",
};

type Done = {
  order: string;
  method: "pickup" | "ship";
  total: number;
  email: string;
};

export function Bag() {
  const lines = useBag();
  const [method, setMethod] = useState<"pickup" | "ship">("pickup");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<Done | null>(null);
  const { errors, setErrors, onChange } = useErrors();
  const doneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (done) doneRef.current?.focus();
  }, [done]);

  const subtotal = subtotalOf(lines);
  const shipping =
    method === "ship" && subtotal < bagPage.freeShipOver ? bagPage.shipFlat : 0;
  const total = subtotal + shipping;

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, messages);
    setErrors(found);
    if (Object.keys(found).length) return;
    setSending(true);
    await pause();
    setSending(false);
    setDone({
      order: `FS-${String(Date.now()).slice(-5)}`,
      method,
      total,
      email: String(new FormData(form).get("email")),
    });
    clearBag();
  };

  if (done) {
    return (
      <div
        className="wrap book-done"
        ref={doneRef}
        tabIndex={-1}
        aria-live="polite"
      >
        <PackageCheck aria-hidden="true" className="done-icon" />
        <h1>Order {done.order} is in.</h1>
        <p className="lede">
          {done.method === "pickup"
            ? `We'll text you when it's on the counter at ${brand.street}, usually within two hours. Pay ${money(done.total)} when you collect.`
            : `It ships tomorrow morning. A receipt for ${money(done.total)} is on its way to ${done.email}.`}
        </p>
        <div className="actions">
          <Link to="/shop" className="btn btn-ink">
            Back to the shop
          </Link>
          <Link to="/book" className="btn btn-line">
            Book a chair while you're here
          </Link>
        </div>
        <p className="demo-note">
          Demo only: nothing was sent, charged or shipped.
        </p>
      </div>
    );
  }

  if (!lines.length) {
    return (
      <div className="wrap bag-empty">
        <h1>{bagPage.title}</h1>
        <p className="lede">
          Nothing in here yet. The pomade your barber used today is on the
          shelf.
        </p>
        <div className="actions">
          <Link to="/shop" className="btn btn-red">
            Go to the shop
          </Link>
          <Link to="/" className="btn btn-line">
            Back to the start
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <header className="page-head wrap">
        <h1>{bagPage.title}</h1>
      </header>
      <div className="wrap checkout">
        <section aria-labelledby="lines-title" className="bag-lines">
          <h2 id="lines-title" className="sr-only">
            Items
          </h2>
          <ul>
            {lines.map((l) => {
              const p = products.find((x) => x.id === l.id);
              return (
                <li key={l.key} className="bag-line">
                  <div className="bag-thumb">
                    {p && <ProductArt product={p} />}
                  </div>
                  <div className="bag-what">
                    <Link to={`/shop/${l.id}`}>{l.name}</Link>
                    <span>
                      {l.variant} · {money(l.unit)} each
                    </span>
                  </div>
                  <Qty
                    value={l.qty}
                    onChange={(n) => setQty(l.key, n)}
                    label={l.name}
                  />
                  <p className="bag-sum">{money(l.unit * l.qty)}</p>
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
        </section>

        <form
          className="checkout-form"
          noValidate
          onSubmit={submit}
          onChange={onChange}
          aria-busy={sending}
        >
          <fieldset className="segmented">
            <legend>How you'd like it</legend>
            <div className="seg-row">
              <label className="seg">
                <input
                  type="radio"
                  name="method"
                  value="pickup"
                  checked={method === "pickup"}
                  onChange={() => setMethod("pickup")}
                />
                <span>Pick up · free</span>
              </label>
              <label className="seg">
                <input
                  type="radio"
                  name="method"
                  value="ship"
                  checked={method === "ship"}
                  onChange={() => setMethod("ship")}
                />
                <span>
                  Ship ·{" "}
                  {subtotal >= bagPage.freeShipOver
                    ? "free"
                    : money(bagPage.shipFlat)}
                </span>
              </label>
            </div>
          </fieldset>
          <p className="method-note">
            {method === "pickup"
              ? bagPage.pickupNote
              : `Ships in two working days. Free over ${money(bagPage.freeShipOver)}.`}
          </p>

          <div className="field-grid">
            <Field
              label="Name"
              name="name"
              required
              autoComplete="name"
              error={errors.name}
              className="span-2"
            />
            <Field
              label="Email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              error={errors.email}
            />
            <Field
              label="Mobile"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              pattern="[\d\s\(\)\+\.\-]{10,}"
              placeholder="(555) 013-6221"
              error={errors.phone}
            />
            {method === "ship" && (
              <>
                <Field
                  label="Street address"
                  name="street"
                  required
                  autoComplete="street-address"
                  error={errors.street}
                  className="span-2"
                />
                <Field
                  label="Town or city"
                  name="city"
                  required
                  autoComplete="address-level2"
                  error={errors.city}
                />
                <Field
                  label="ZIP code"
                  name="zip"
                  required
                  autoComplete="postal-code"
                  inputMode="numeric"
                  pattern="\d{5}"
                  error={errors.zip}
                />
              </>
            )}
          </div>

          <dl className="totals">
            <div>
              <dt>Subtotal</dt>
              <dd>{money(subtotal)}</dd>
            </div>
            <div>
              <dt>{method === "pickup" ? "Pick up" : "Shipping"}</dt>
              <dd>{shipping ? money(shipping) : "Free"}</dd>
            </div>
            <div className="totals-total">
              <dt>Total</dt>
              <dd>{money(total)}</dd>
            </div>
          </dl>
          <button
            type="submit"
            className="btn btn-red btn-block"
            disabled={sending}
          >
            {sending
              ? "Placing your order…"
              : method === "pickup"
                ? "Reserve for pick up"
                : `Place order · ${money(total)}`}
          </button>
          <p className="demo-note">
            Demo checkout: nothing is sent or charged. Pick-up orders are paid
            at the counter.
          </p>
        </form>
      </div>
    </>
  );
}
