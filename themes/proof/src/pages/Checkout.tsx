import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { brand, hours, pickupRules } from "../content";
import { Link } from "../router";
import {
  Field,
  PHONE_PATTERN,
  TextArea,
  useFormFlow,
} from "../components/Field";
import {
  clearCart,
  money,
  subtotal,
  useCart,
  type CartLine,
} from "../lib/cart";
import {
  clock,
  dayLabel,
  fromIso,
  isoDate,
  minutesNow,
  pickupDays,
} from "../lib/time";

type Order = {
  number: string;
  name: string;
  email: string;
  day: string;
  window: string;
  lines: CartLine[];
  total: number;
};

/** Hourly windows from opening until bags stop being held; on the same day only those still ahead. */
function windowsFor(iso: string) {
  const date = fromIso(iso);
  const open = hours[date.getDay()].open ?? 0;
  const after = iso === isoDate(new Date()) ? minutesNow() + 30 : 0;
  const slots: string[] = [];
  for (let m = open; m < pickupRules.holdUntil; m += 60)
    if (m >= after)
      slots.push(
        `${clock(m)} – ${clock(Math.min(m + 60, pickupRules.holdUntil))}`,
      );
  return slots;
}

export function Checkout() {
  const cart = useCart();
  const days = pickupDays(cart);
  const [day, setDay] = useState(days.find((d) => d.ok)?.iso ?? "");
  const [slot, setSlot] = useState("");
  const confirmed = useRef<HTMLHeadingElement>(null);
  const [order, setOrder] = useState<Order | null>(null);
  const windows = day ? windowsFor(day) : [];

  const form = useFormFlow(
    {
      day: {
        missing:
          "Choose a pickup day — greyed-out days can't be ready in time.",
      },
      window: { missing: "Choose a pickup window." },
      name: { missing: "Enter the name to write on your bag." },
      email: {
        missing: "Enter an email for your order number.",
        invalid: "That email looks incomplete — check for an @ and a domain.",
      },
      phone: {
        missing: "Enter a phone number in case we run late.",
        invalid: "Use digits, spaces or dashes — at least 7 of them.",
      },
      hold: { missing: "Tick to confirm you'll collect by 1pm." },
    },
    (data) => {
      setOrder({
        number: "P-" + String(Math.floor(1000 + Math.random() * 9000)),
        name: String(data.get("name")),
        email: String(data.get("email")),
        day,
        window: slot,
        lines: cart,
        total: subtotal(cart),
      });
      clearCart();
    },
  );

  useEffect(() => {
    if (!order) return;
    window.scrollTo({ top: 0, behavior: "instant" });
    confirmed.current?.focus();
  }, [order]);

  if (order)
    return (
      <section className="page-head confirmation">
        <h1 ref={confirmed} tabIndex={-1}>
          Bagged and waiting, {order.name.split(" ")[0]}.
        </h1>
        <p className="lede">
          Order <strong>{order.number}</strong> will be on the named shelf at
          the side window on {dayLabel(fromIso(order.day), "long")},{" "}
          {order.window}. Pay {money(order.total)} when you collect.
        </p>
        <ul className="receipt">
          {order.lines.map((l) => (
            <li key={l.key}>
              <span>
                {l.qty} × {l.name}
                <small>
                  {[l.size, l.choice, l.inscription && `“${l.inscription}”`]
                    .filter(Boolean)
                    .join(" · ")}
                </small>
              </span>
              <span>{money(l.qty * l.unit)}</span>
            </li>
          ))}
          <li className="receipt-total">
            <span>To pay at pickup</span>
            <span>{money(order.total)}</span>
          </li>
        </ul>
        <p className="quiet">
          A confirmation would go to {order.email} — this is a demo, so nothing
          was sent or charged. To change it, call {brand.phone}.
        </p>
        <div className="actions">
          <Link to="/today" className="btn">
            See tomorrow's bake <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link to="/" className="btn btn-ghost">
            Back home
          </Link>
        </div>
      </section>
    );

  if (!cart.length)
    return (
      <header className="page-head empty-bag">
        <h1>Nothing to check out</h1>
        <p className="lede">
          Your bag is empty. Add a loaf or a box of pastries and come back to
          pick a morning.
        </p>
        <Link to="/shop" className="btn">
          Order ahead <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </header>
    );

  return (
    <>
      <header className="page-head">
        <Link to="/cart" className="back-link">
          <ArrowLeft size={16} aria-hidden="true" /> Back to bag
        </Link>
        <h1>Pickup checkout</h1>
        <p className="lede">
          Pick a morning your whole bag can be ready, tell us whose name goes on
          it, and pay when you collect.
        </p>
      </header>

      <div className="section checkout">
        <form noValidate onSubmit={form.onSubmit} onChange={form.onChange}>
          <fieldset
            className="day-picker"
            aria-describedby={form.errors.day ? "f-day-error" : "day-hint"}
          >
            <legend>Pickup day</legend>
            <p className="field-hint" id="day-hint">
              Only days when every item is baked and has enough notice can be
              chosen.
            </p>
            <div className="days">
              {days.map((d) => (
                <label
                  key={d.iso}
                  className="day"
                  data-disabled={!d.ok || undefined}
                >
                  <input
                    type="radio"
                    name="day"
                    value={d.iso}
                    required
                    disabled={!d.ok}
                    checked={day === d.iso}
                    onChange={() => {
                      setDay(d.iso);
                      setSlot("");
                    }}
                  />
                  <span className="day-name">
                    {d.date.toLocaleDateString("en-US", { weekday: "short" })}
                  </span>
                  <span className="day-num">{d.date.getDate()}</span>
                  <span className="day-note">
                    {d.ok
                      ? d.date.toLocaleDateString("en-US", { month: "short" })
                      : d.reason}
                  </span>
                </label>
              ))}
            </div>
            {form.errors.day && (
              <p className="field-error" id="f-day-error">
                {form.errors.day}
              </p>
            )}
          </fieldset>

          <fieldset
            className="options options-inline"
            aria-describedby={form.errors.window ? "f-window-error" : undefined}
          >
            <legend>Pickup window{day && `, ${dayLabel(fromIso(day))}`}</legend>
            {windows.length ? (
              windows.map((w) => (
                <label key={w} className="option">
                  <input
                    type="radio"
                    name="window"
                    value={w}
                    required
                    checked={slot === w}
                    onChange={() => setSlot(w)}
                  />
                  <span>{w}</span>
                </label>
              ))
            ) : (
              <p className="field-hint">
                {day
                  ? "No windows left that day — choose another day."
                  : "Choose a day first."}
              </p>
            )}
            {form.errors.window && (
              <p className="field-error" id="f-window-error">
                {form.errors.window}
              </p>
            )}
          </fieldset>

          <div className="form-grid">
            <Field
              label="Name for the bag"
              name="name"
              required
              autoComplete="name"
              error={form.errors.name}
            />
            <Field
              label="Phone"
              name="phone"
              type="tel"
              required
              pattern={PHONE_PATTERN}
              autoComplete="tel"
              error={form.errors.phone}
            />
            <Field
              label="Email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="span-2"
              error={form.errors.email}
            />
            <TextArea
              label="Anything we should know? (optional)"
              name="notes"
              rows={3}
              className="span-2"
              placeholder="Collecting for someone else, allergies, a bigger box…"
            />
          </div>

          <div className="field check">
            <input
              id="f-hold"
              type="checkbox"
              name="hold"
              required
              aria-invalid={form.errors.hold ? true : undefined}
              aria-describedby={form.errors.hold ? "f-hold-error" : undefined}
            />
            <label htmlFor="f-hold">
              I'll collect by 1pm. After that, bags go back on the counter and
              you refund me.
            </label>
            {form.errors.hold && (
              <p className="field-error" id="f-hold-error">
                {form.errors.hold}
              </p>
            )}
          </div>

          <button
            className="btn btn-block"
            type="submit"
            disabled={form.sending}
          >
            {form.sending
              ? "Reserving your bag…"
              : `Reserve for pickup · ${money(subtotal(cart))}`}
          </button>
          <p className="quiet">
            Demo checkout — nothing is sent, reserved or charged. Payment
            happens at the window.
          </p>
        </form>

        <aside className="panel order-summary" aria-label="Order summary">
          <h2>In your bag</h2>
          <ul className="receipt">
            {cart.map((l) => (
              <li key={l.key}>
                <span>
                  {l.qty} × {l.name}
                  <small>
                    {[l.size, l.choice, l.inscription && `“${l.inscription}”`]
                      .filter(Boolean)
                      .join(" · ")}
                  </small>
                </span>
                <span>{money(l.qty * l.unit)}</span>
              </li>
            ))}
            <li className="receipt-total">
              <span>Pay at pickup</span>
              <span>{money(subtotal(cart))}</span>
            </li>
          </ul>
          <Link to="/cart" className="text-link">
            Edit bag
          </Link>
        </aside>
      </div>
    </>
  );
}
