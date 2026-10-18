import { useState, type FormEvent } from "react";
import { Lock } from "lucide-react";
import { shipping } from "../content";
import { Link } from "../router";
import { clearCart, subtotalOf, useCart, type CartLine } from "../lib/cart";
import { money, pause, validate } from "../lib/format";
import { Field, useErrors } from "../components/Field";

const messages = {
  name: "Enter your full name — it's printed on the tickets and the parcel.",
  email: "Enter an email like you@example.com; tickets and receipts go there.",
  address: "Enter the street address for delivery.",
  city: "Enter the town or city.",
  postcode: "Enter a ZIP or postcode, 3–10 letters or numbers.",
  card: "Enter the 16-digit card number, spaces are fine.",
  expiry: "Enter the expiry as MM/YY, for example 08/28.",
  cvc: "Enter the 3 or 4 digits on the back of the card.",
  terms: "Tick to confirm you've read the ticket policy.",
};

type Done = {
  order: string;
  email: string;
  lines: CartLine[];
  total: number;
  pickup: boolean;
};

export function Checkout() {
  const lines = useCart();
  const { errors, setErrors, onChange } = useErrors();
  const [method, setMethod] = useState(shipping.methods[0].id);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<Done | null>(null);

  const merch = lines.filter((l) => l.kind === "merch");
  const tickets = lines.filter((l) => l.kind === "ticket");
  const subtotal = subtotalOf(lines);
  const chosen = shipping.methods.find((m) => m.id === method)!;
  const ship = !merch.length
    ? 0
    : method === "standard" && subtotalOf(merch) >= shipping.freeOver
      ? 0
      : chosen.price;
  const total = subtotal + ship;

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const extra: Record<string, string> = {};
    const expiry = (form.elements.namedItem("expiry") as HTMLInputElement)
      .value;
    const [mm, yy] = expiry.split("/").map(Number);
    if (/^\d{2}\/\d{2}$/.test(expiry) && new Date(2000 + yy, mm) <= new Date())
      extra.expiry =
        "That card has expired — use one with a later expiry date.";
    const found = validate(form, messages, extra);
    setErrors(found);
    if (Object.keys(found).length) return;
    setSending(true);
    await pause(1200);
    setDone({
      order: `RIFF-${Math.floor(10000 + Math.random() * 89999)}`,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      lines,
      total,
      pickup: method === "pickup",
    });
    clearCart();
    window.scrollTo({ top: 0 });
  }

  if (done)
    return (
      <section className="wrap confirm" aria-live="polite">
        <h1 className="display-xl">See you up front</h1>
        <p className="lede">
          Order {done.order} is confirmed. A receipt
          {done.lines.some((l) => l.kind === "ticket")
            ? " and your e-tickets"
            : ""}{" "}
          are on the way to {done.email}.
        </p>
        <ul className="confirm-lines">
          {done.lines.map((l) => (
            <li key={l.key}>
              <span>
                {l.qty} × {l.name}
              </span>
              <span>{l.detail}</span>
            </li>
          ))}
        </ul>
        <p className="confirm-total">Total paid {money(done.total)}</p>
        {done.lines.some((l) => l.kind === "merch") && (
          <p>
            {done.pickup
              ? "Your merch will be bagged with your name at the merch table."
              : "Merch ships within 3 working days; tracking follows by email."}
          </p>
        )}
        <div className="actions">
          <Link to="/tour" className="btn btn-red">
            Back to the tour
          </Link>
          <Link to="/music/low-ceiling" className="btn btn-line">
            Play the new record
          </Link>
        </div>
      </section>
    );

  if (!lines.length)
    return (
      <section className="wrap page-head">
        <h1 className="display-xl">Checkout</h1>
        <div className="empty">
          <p>There's nothing to check out yet.</p>
          <div className="actions">
            <Link to="/tour" className="btn btn-red">
              Find a show
            </Link>
            <Link to="/merch" className="btn btn-line">
              Browse merch
            </Link>
          </div>
        </div>
      </section>
    );

  return (
    <>
      <header className="page-head wrap">
        <h1 className="display-xl">Checkout</h1>
        <p className="lede">
          Tickets at face value, merch packed by the band. Demo store: nothing
          is sent or charged.
        </p>
      </header>

      <div className="wrap checkout-grid">
        <form
          className="checkout-form"
          noValidate
          onSubmit={submit}
          onChange={onChange}
        >
          <fieldset>
            <legend>Contact</legend>
            <Field
              label="Full name"
              name="name"
              required
              minLength={2}
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
              hint="E-tickets and the receipt are sent here."
            />
          </fieldset>

          {merch.length > 0 && (
            <fieldset>
              <legend>Delivery</legend>
              <div className="options">
                {shipping.methods.map((m) => (
                  <label key={m.id} className="option">
                    <input
                      type="radio"
                      name="method"
                      value={m.id}
                      checked={method === m.id}
                      onChange={() => setMethod(m.id)}
                    />
                    <span>
                      <strong>{m.name}</strong>
                      <span>{m.detail}</span>
                    </span>
                    <span className="option-price">
                      {m.id === "standard" &&
                      subtotalOf(merch) >= shipping.freeOver
                        ? "Free"
                        : m.price
                          ? money(m.price)
                          : "Free"}
                    </span>
                  </label>
                ))}
              </div>
              {method !== "pickup" && (
                <div className="field-grid">
                  <Field
                    label="Street address"
                    name="address"
                    required
                    autoComplete="street-address"
                    error={errors.address}
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
                    label="ZIP / postcode"
                    name="postcode"
                    required
                    pattern="[A-Za-z0-9 \-]{3,10}"
                    autoComplete="postal-code"
                    error={errors.postcode}
                  />
                  <Field label="Country" name="country" className="span-2">
                    <select defaultValue="US" autoComplete="country">
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="GB">United Kingdom</option>
                      <option value="NL">Netherlands</option>
                      <option value="DE">Germany</option>
                      <option value="FR">France</option>
                    </select>
                  </Field>
                </div>
              )}
            </fieldset>
          )}

          <fieldset>
            <legend>Payment</legend>
            <div className="field-grid">
              <Field
                label="Card number"
                name="card"
                required
                inputMode="numeric"
                pattern="[0-9]{4} ?[0-9]{4} ?[0-9]{4} ?[0-9]{4}"
                autoComplete="cc-number"
                placeholder="4242 4242 4242 4242"
                error={errors.card}
                className="span-2"
              />
              <Field
                label="Expiry (MM/YY)"
                name="expiry"
                required
                pattern="(0[1-9]|1[0-2])/[0-9]{2}"
                autoComplete="cc-exp"
                placeholder="08/28"
                error={errors.expiry}
              />
              <Field
                label="CVC"
                name="cvc"
                required
                inputMode="numeric"
                pattern="[0-9]{3,4}"
                autoComplete="cc-csc"
                error={errors.cvc}
              />
            </div>
          </fieldset>

          {tickets.length > 0 && (
            <div className="field" data-invalid={errors.terms ? "" : undefined}>
              <label className="check">
                <input
                  type="checkbox"
                  name="terms"
                  required
                  aria-invalid={errors.terms ? true : undefined}
                  aria-describedby={errors.terms ? "f-terms-err" : undefined}
                />
                Tickets are in my name; I'll resell only through the official
                face-value exchange.
              </label>
              {errors.terms && (
                <p className="field-error" id="f-terms-err">
                  {errors.terms}
                </p>
              )}
            </div>
          )}

          <button className="btn btn-red btn-block" disabled={sending}>
            <Lock aria-hidden="true" />{" "}
            {sending ? "Placing order…" : `Pay ${money(total)}`}
          </button>
          <p className="quiet">
            This is a demo store. Nothing is sent, charged or stored beyond your
            browser.
          </p>
        </form>

        <aside className="summary" aria-labelledby="sum">
          <h2 id="sum" className="box-head">
            Your order
          </h2>
          <ul className="summary-lines">
            {lines.map((l) => (
              <li key={l.key}>
                <span>
                  {l.qty} × {l.name}
                  <small>{l.detail}</small>
                </span>
                <span>{money(l.unit * l.qty)}</span>
              </li>
            ))}
          </ul>
          <dl>
            <div>
              <dt>Subtotal</dt>
              <dd>{money(subtotal)}</dd>
            </div>
            {merch.length > 0 && (
              <div>
                <dt>Shipping</dt>
                <dd>{ship ? money(ship) : "Free"}</dd>
              </div>
            )}
            <div className="summary-total">
              <dt>Total</dt>
              <dd>{money(total)}</dd>
            </div>
          </dl>
          <Link to="/cart" className="more-link">
            Edit cart
          </Link>
        </aside>
      </div>
    </>
  );
}
