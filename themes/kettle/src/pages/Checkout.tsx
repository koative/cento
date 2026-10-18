import { useEffect, useRef, useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { Link } from "../router";
import { brand, hours, pickup } from "../content";
import {
  clock,
  isoDay,
  longDate,
  money,
  pause,
  reference,
  validate,
} from "../lib/util";
import { clearCart, subtotalOf, useCart, type CartLine } from "../lib/cart";
import { Field, useErrors } from "../components/Field";

type Placed = {
  ref: string;
  name: string;
  day: string;
  window: string;
  lines: CartLine[];
  total: number;
};

const messages = {
  day: "Choose the day you'll collect your order.",
  window: "Choose a pickup window.",
  name: "Add the name on your photo ID. We check it at pickup.",
  email: "Enter an email like you@example.com for your receipt.",
  phone:
    "Enter a phone number with at least 10 digits, like 555 014 7720, so we can text you when it's ready.",
  age: "Confirm you're 21 or older. We can't hand over beer without it.",
};

/** Two-hour pickup windows from opening (or two hours from now) to an hour before close. */
function windows(open: string, close: string, earliest: number) {
  const start = Math.max(Number(open.split(":")[0]), earliest);
  const end = close === "23:59" ? 23 : Number(close.split(":")[0]) - 1;
  const out: string[] = [];
  for (let h = start; h + 2 <= end + 1; h += 2)
    out.push(`${clock(`${h}:00`)} – ${clock(`${Math.min(h + 2, end)}:00`)}`);
  return out;
}

/** The next seven open days that still have a pickup window, from today. */
function pickupDays(now = new Date()) {
  const out: { iso: string; open: string; close: string; windows: string[] }[] =
    [];
  const d = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  for (let i = 0; out.length < 7 && i < 14; i++, d.setDate(d.getDate() + 1)) {
    const h = hours[d.getDay()];
    const slots = h
      ? windows(h[0], h[1], i === 0 ? now.getHours() + 2 : 0)
      : [];
    if (h && slots.length)
      out.push({ iso: isoDay(d), open: h[0], close: h[1], windows: slots });
  }
  return out;
}

export function Checkout() {
  const lines = useCart();
  const [days] = useState(() => pickupDays());
  const [day, setDay] = useState("");
  const [sending, setSending] = useState(false);
  const [placed, setPlaced] = useState<Placed | null>(null);
  const { errors, setErrors, onChange } = useErrors();
  const heading = useRef<HTMLHeadingElement>(null);
  const total = subtotalOf(lines);
  const chosen = days.find((d) => d.iso === day);

  useEffect(() => {
    if (placed) heading.current?.focus();
  }, [placed]);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, messages);
    setErrors(found);
    if (Object.keys(found).length) return;
    const data = new FormData(form);
    setSending(true);
    await pause();
    setPlaced({
      ref: reference("KB"),
      name: String(data.get("name")),
      day,
      window: String(data.get("window")),
      lines,
      total,
    });
    clearCart();
    setSending(false);
  };

  if (placed) {
    return (
      <section className="wrap confirm" aria-live="polite">
        <span className="confirm-icon" aria-hidden="true">
          <Check />
        </span>
        <h1 ref={heading} tabIndex={-1}>
          Order <span className="nowrap">{placed.ref}</span> is in.
        </h1>
        <p className="lede">
          Thanks, {placed.name.split(" ")[0]}. It'll be waiting at the bar on{" "}
          {longDate(placed.day)},{" "}
          <span className="nowrap">{placed.window}</span>. Bring the photo ID
          you named.
        </p>
        <ul className="confirm-lines">
          {placed.lines.map((l) => (
            <li key={l.key}>
              <span>
                {l.qty} × {l.name} <span className="muted">{l.variant}</span>
              </span>
              <span className="tnum">{money(l.qty * l.unit)}</span>
            </li>
          ))}
          <li className="summary-total">
            <span>Pay at pickup</span>
            <span className="tnum">{money(placed.total)}</span>
          </li>
        </ul>
        <p className="quiet-note">
          This is a demo: no order was sent and nothing was charged.
        </p>
        <div className="actions">
          <Link to="/taproom" className="btn btn-copper">
            See what's on tap
          </Link>
          <Link to="/shop" className="btn btn-line">
            Back to the shop
          </Link>
        </div>
      </section>
    );
  }

  if (!lines.length) {
    return (
      <div className="wrap cart-page">
        <header className="page-head page-head-tight">
          <h1>Checkout</h1>
        </header>
        <div className="empty">
          <h2>Your pickup order is empty.</h2>
          <p>
            Add a 4-pack or a bottle pre-order first, then pick a time to
            collect it.
          </p>
          <Link to="/shop" className="btn btn-ink">
            Browse the shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="wrap cart-page">
      <header className="page-head page-head-tight">
        <h1>Checkout</h1>
        <p className="lede">
          Pick a time, tell us who's collecting, and pay at the bar.{" "}
          {pickup.title}: we don't ship beer.
        </p>
      </header>

      <form
        className="booking"
        noValidate
        onSubmit={submit}
        onChange={onChange}
        aria-label="Pickup details"
      >
        <div className="booking-main">
          <fieldset className="step">
            <legend>Pickup</legend>
            <div className="form-grid">
              <Field label="Day" name="day" error={errors.day}>
                <select
                  required
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                >
                  <option value="">Choose a day</option>
                  {days.map((d) => (
                    <option key={d.iso} value={d.iso}>
                      {longDate(d.iso)}
                    </option>
                  ))}
                </select>
              </Field>
              <Field
                label="Window"
                name="window"
                error={errors.window}
                hint={
                  chosen
                    ? `Taproom open ${clock(chosen.open)} – ${clock(chosen.close)}.`
                    : "Choose a day first."
                }
              >
                <select required disabled={!chosen} defaultValue="" key={day}>
                  <option value="">Choose a window</option>
                  {chosen?.windows.map((w) => (
                    <option key={w}>{w}</option>
                  ))}
                </select>
              </Field>
            </div>
          </fieldset>

          <fieldset className="step">
            <legend>Who's collecting</legend>
            <div className="form-grid">
              <Field
                label="Name on photo ID"
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
                pattern="[\d\s\(\)\+\-\.]{10,}"
                placeholder="555 014 7720"
                error={errors.phone}
                hint="We text when it's ready."
              />
            </div>
            <label
              className="check check-block"
              data-invalid={errors.age ? "" : undefined}
            >
              <input
                type="checkbox"
                name="age"
                required
                aria-describedby={errors.age ? "age-err" : undefined}
                aria-invalid={errors.age ? true : undefined}
              />
              I'm 21 or older and will show matching photo ID at pickup.
            </label>
            {errors.age && (
              <p className="field-error" id="age-err">
                {errors.age}
              </p>
            )}
          </fieldset>
        </div>

        <aside className="booking-summary" aria-label="Order summary">
          <h2>Your order</h2>
          <ul className="confirm-lines">
            {lines.map((l) => (
              <li key={l.key}>
                <span>
                  {l.qty} × {l.name} <span className="muted">{l.variant}</span>
                </span>
                <span className="tnum">{money(l.qty * l.unit)}</span>
              </li>
            ))}
            <li className="summary-total">
              <span>Pay at pickup</span>
              <span className="tnum">{money(total)}</span>
            </li>
          </ul>
          <button
            type="submit"
            className="btn btn-copper btn-block btn-lg"
            disabled={sending}
          >
            {sending ? "Placing order…" : "Place pickup order"}
          </button>
          <p className="quiet-note">
            Demo checkout: nothing is sent or charged. Questions?{" "}
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
          </p>
        </aside>
      </form>
    </div>
  );
}
