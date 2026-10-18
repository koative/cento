import { useEffect, useRef, useState, type FormEvent } from "react";
import { Bike, Store } from "lucide-react";
import { Link } from "../router";
import { locations, ordering } from "../content";
import { money, pause, validate, type Errors } from "../lib";
import { clearCart, subtotalOf, useCart, type CartLine } from "../cart";
import { Field, useErrors } from "../components/Field";

type Mode = "pickup" | "delivery";
type Placed = {
  number: string;
  name: string;
  mode: Mode;
  where: string;
  when: string;
  lines: CartLine[];
  total: number;
};

const messages = {
  name: "Add the name we should call out at the counter.",
  phone:
    "Enter a phone number with at least 10 digits, like 555 010 0220, so we can text you when it's ready.",
  email: "Enter an email like you@example.com for your receipt.",
  location: "Choose which counter you're picking up from.",
  address: "Add a street address so the driver can find you.",
  zip: "Enter a 5-digit ZIP code.",
};

/** The next eight quarter-hours, starting half an hour from now. */
function slots(now = new Date()) {
  const start = new Date(now);
  start.setMinutes(Math.ceil((now.getMinutes() + 30) / 15) * 15, 0, 0);
  return Array.from({ length: 8 }, (_, i) =>
    new Date(start.getTime() + i * 15 * 60_000).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    }),
  );
}

export function Checkout() {
  const lines = useCart();
  const [mode, setMode] = useState<Mode>("pickup");
  const [tip, setTip] = useState(ordering.tipOptions[2]);
  const [sending, setSending] = useState(false);
  const [placed, setPlaced] = useState<Placed | null>(null);
  const { errors, setErrors, onChange } = useErrors();
  const heading = useRef<HTMLHeadingElement>(null);
  const [times] = useState(slots);

  const subtotal = subtotalOf(lines);
  const tax = subtotal * ordering.taxRate;
  const fee = mode === "delivery" ? ordering.deliveryFee : 0;
  const tipAmount = subtotal * tip;
  const total = subtotal + tax + fee + tipAmount;

  useEffect(() => {
    if (placed) heading.current?.focus();
  }, [placed]);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const extra: Errors = {};
    const zip = String(data.get("zip") ?? "");
    if (
      mode === "delivery" &&
      /^\d{5}$/.test(zip) &&
      !ordering.deliveryZips.includes(zip)
    ) {
      extra.zip = `We don't deliver to ${zip} yet. Switch to pickup, or use a ZIP from 97211–97218 or 97232.`;
    }
    if (mode === "delivery" && subtotal < ordering.deliveryMinimum) {
      extra.mode = `Delivery starts at ${money(ordering.deliveryMinimum)}. Add ${money(ordering.deliveryMinimum - subtotal)} more, or switch to pickup.`;
    }
    const phone = String(data.get("phone") ?? "");
    if (phone && phone.replace(/\D/g, "").length < 10)
      extra.phone = messages.phone;
    const found = validate(form, messages, extra);
    setErrors(found);
    if (Object.keys(found).length) return;

    setSending(true);
    await pause();
    const location = locations.find((l) => l.id === data.get("location"));
    setPlaced({
      number: `S-${Math.floor(1000 + Math.random() * 9000)}`,
      name: String(data.get("name")),
      mode,
      where:
        mode === "pickup"
          ? `${location?.name}, ${location?.address[0]}`
          : `${data.get("address")}, ${zip}`,
      when:
        mode === "pickup"
          ? String(data.get("time"))
          : `about ${ordering.deliveryMinutes} minutes`,
      lines,
      total,
    });
    clearCart();
    setSending(false);
  };

  if (placed) {
    return (
      <div className="page checkout-page">
        <section className="wrap confirm" aria-live="polite">
          <h1 ref={heading} tabIndex={-1}>
            Order {placed.number} is on the griddle.
          </h1>
          <p className="lede">
            Thanks, {placed.name}.{" "}
            {placed.mode === "pickup"
              ? `Pick it up at ${placed.where}, ${placed.when === "ASAP" ? `in about ${ordering.pickupMinutes} minutes` : `at ${placed.when}`}.`
              : `It's heading to ${placed.where}, ${placed.when}.`}{" "}
            We'll text you when it's wrapped.
          </p>
          <div className="ticket confirm-ticket">
            <p className="ticket-number">{placed.number}</p>
            <ul>
              {placed.lines.map((l) => (
                <li key={l.key}>
                  <span>
                    {l.qty} × {l.name}
                  </span>
                  <span>{money(l.unit * l.qty)}</span>
                </li>
              ))}
            </ul>
            <p className="ticket-total">
              <span>Total</span>
              <span>{money(placed.total)}</span>
            </p>
          </div>
          <p className="quiet">{ordering.demoNote}</p>
          <Link to="/menu" className="btn btn-primary">
            Back to the menu
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div className="page checkout-page">
      <header className="page-head wrap">
        <h1>Checkout</h1>
        <p className="lede">
          Pickup is ready in about {ordering.pickupMinutes} minutes. Delivery
          runs from Eastside and Northgate, about {ordering.deliveryMinutes}.
        </p>
      </header>

      {lines.length === 0 ? (
        <section className="wrap empty" aria-labelledby="co-empty">
          <h2 id="co-empty">Your tray is empty.</h2>
          <p>
            Add something from the menu, then come back here to choose pickup or
            delivery.
          </p>
          <Link to="/menu" className="btn btn-primary">
            Go to the menu
          </Link>
        </section>
      ) : (
        <div className="wrap checkout-grid">
          <form
            className="checkout-form"
            noValidate
            onSubmit={submit}
            onChange={onChange}
            aria-busy={sending}
          >
            <fieldset
              className="form-block"
              aria-describedby={errors.mode ? "mode-err" : undefined}
            >
              <legend>How do you want it?</legend>
              <div className="mode-toggle">
                {(
                  [
                    ["pickup", "Pickup", Store],
                    ["delivery", "Delivery", Bike],
                  ] as const
                ).map(([id, label, Icon]) => (
                  <label key={id} data-on={mode === id ? "" : undefined}>
                    <input
                      type="radio"
                      name="mode"
                      value={id}
                      checked={mode === id}
                      onChange={() => (setMode(id), setErrors({}))}
                    />
                    <Icon aria-hidden="true" />
                    {label}
                    <span>
                      {id === "pickup"
                        ? `Ready in ~${ordering.pickupMinutes} min`
                        : `${money(ordering.deliveryFee)} · ~${ordering.deliveryMinutes} min`}
                    </span>
                  </label>
                ))}
              </div>
              {errors.mode && (
                <p className="field-error" id="mode-err">
                  {errors.mode}
                </p>
              )}
            </fieldset>

            {mode === "pickup" ? (
              <fieldset className="form-block form-cols">
                <legend>Where and when</legend>
                <Field label="Counter" name="location" error={errors.location}>
                  <select required defaultValue="">
                    <option value="" disabled>
                      Choose a counter
                    </option>
                    {locations.map((l) => (
                      <option key={l.id} value={l.id}>
                        {l.name} — {l.address[0]}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Pickup time" name="time">
                  <select defaultValue="ASAP">
                    <option value="ASAP">As soon as it's ready</option>
                    {times.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </Field>
              </fieldset>
            ) : (
              <fieldset className="form-block form-cols">
                <legend>Where to</legend>
                <Field
                  label="Street address"
                  name="address"
                  required
                  autoComplete="street-address"
                  error={errors.address}
                  className="span-2"
                />
                <Field
                  label="Apartment, buzzer, floor"
                  name="unit"
                  autoComplete="address-line2"
                  hint="Optional"
                />
                <Field
                  label="ZIP code"
                  name="zip"
                  required
                  inputMode="numeric"
                  pattern="\d{5}"
                  maxLength={5}
                  autoComplete="postal-code"
                  error={errors.zip}
                />
                <Field
                  label="Note for the driver"
                  name="note"
                  hint="Optional — gate codes, which door, etc."
                  className="span-2"
                />
              </fieldset>
            )}

            <fieldset className="form-block form-cols">
              <legend>Who's it for</legend>
              <Field
                label="Name"
                name="name"
                required
                autoComplete="name"
                error={errors.name}
              />
              <Field
                label="Mobile"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                hint="We text when it's ready"
                error={errors.phone}
              />
              <Field
                label="Email"
                name="email"
                type="email"
                required
                autoComplete="email"
                hint="For the receipt"
                error={errors.email}
                className="span-2"
              />
            </fieldset>

            <fieldset className="form-block">
              <legend>Tip the crew</legend>
              <div className="tip-options">
                {ordering.tipOptions.map((t) => (
                  <label key={t} data-on={tip === t ? "" : undefined}>
                    <input
                      type="radio"
                      name="tip"
                      value={t}
                      checked={tip === t}
                      onChange={() => setTip(t)}
                    />
                    {t ? `${t * 100}%` : "No tip"}
                    <span>{money(subtotal * t)}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <p className="pay-note">
              You pay at the counter or to the driver, card or phone.{" "}
              {ordering.demoNote}
            </p>
            <button
              className="btn btn-primary btn-lg btn-block"
              type="submit"
              disabled={sending}
            >
              {sending
                ? "Sending to the griddle…"
                : `Place order · ${money(total)}`}
            </button>
          </form>

          <aside className="summary ticket" aria-labelledby="co-sum">
            <h2 id="co-sum">Your tray</h2>
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
            <dl className="summary-sums">
              <div>
                <dt>Subtotal</dt>
                <dd>{money(subtotal)}</dd>
              </div>
              <div>
                <dt>Tax</dt>
                <dd>{money(tax)}</dd>
              </div>
              {fee > 0 && (
                <div>
                  <dt>Delivery</dt>
                  <dd>{money(fee)}</dd>
                </div>
              )}
              <div>
                <dt>Tip</dt>
                <dd>{money(tipAmount)}</dd>
              </div>
              <div className="sum-total">
                <dt>Total</dt>
                <dd>{money(total)}</dd>
              </div>
            </dl>
            <Link to="/order" className="text-link">
              Edit order
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
