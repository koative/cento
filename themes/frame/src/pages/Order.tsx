import { useState, type FormEvent } from "react";
import { Minus, Plus, X } from "lucide-react";
import { Link } from "../router";
import { brand, findFrame, framings, prints, sizes } from "../content";
import {
  count,
  money,
  order,
  remaining,
  setQty,
  totals,
  unitPrice,
  type OrderLine,
} from "../lib/store";
import {
  Field,
  validate,
  type Errors,
  type Messages,
} from "../components/Field";

const messages: Messages = {
  name: { missing: "Enter the name the prints should be addressed to." },
  email: {
    missing: "Enter an email so I can send tracking.",
    invalid: "That email looks incomplete — check it has an @ and a domain.",
  },
  address: { missing: "Enter the street address for delivery." },
  city: { missing: "Enter the town or city." },
  state: { missing: "Choose the state." },
  zip: {
    missing: "Enter the ZIP code.",
    invalid: "Use a 5-digit ZIP code, for example 04101.",
  },
};

const states = [
  "Maine",
  "Massachusetts",
  "New Hampshire",
  "New York",
  "Vermont",
  "California",
  "Illinois",
  "Oregon",
  "Texas",
  "Washington",
  "Other US state",
];

type Placed = {
  number: string;
  email: string;
  lines: OrderLine[];
  total: number;
  framed: boolean;
};

export function Order() {
  const lines = order.use();
  const { subtotal, ship, total } = totals(lines);
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [placed, setPlaced] = useState<Placed | null>(null);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, messages);
    setErrors(found);
    if (Object.keys(found).length) return;
    setSending(true);
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    window.setTimeout(() => {
      setPlaced({
        number: "FR-" + String(Date.now()).slice(-5),
        email,
        lines,
        total,
        framed: lines.some((l) => l.framing !== "none"),
      });
      order.set([]);
      setSending(false);
    }, 900);
  }

  if (placed)
    return (
      <div className="page narrow">
        <section className="confirmation" aria-live="polite">
          <h1>Thank you. Order {placed.number} is in.</h1>
          <p className="lede">
            I will sign and number your{" "}
            {count(placed.lines) === 1 ? "print" : "prints"} this week and email{" "}
            {placed.email} with tracking.{" "}
            {placed.framed
              ? "Framed work ships in about three weeks."
              : "Rolled prints ship within five working days."}
          </p>
          <ul className="confirm-lines">
            {placed.lines.map((l) => {
              const fr = findFrame(
                prints.find((p) => p.id === l.printId)!.frameId,
              )!;
              return (
                <li key={l.key}>
                  <img src={fr.src} alt="" width={fr.w} height={fr.h} />
                  <span>
                    {l.qty} × {fr.title}
                  </span>
                </li>
              );
            })}
          </ul>
          <p className="confirm-total">Total {money(placed.total)}</p>
          <p className="quiet">
            This is a demonstration: nothing was sent and no payment was taken.
          </p>
          <div className="actions">
            <Link to="/prints" className="btn">
              Back to the prints
            </Link>
            <Link to="/series" className="text-link">
              Look through the series
            </Link>
          </div>
        </section>
      </div>
    );

  return (
    <div className="page">
      <header className="page-head">
        <h1>Your print order</h1>
        <p className="lede">
          Each print is signed and numbered by hand before it leaves the studio.
          Shipping is a flat rate anywhere in the US.
        </p>
      </header>

      {!lines.length ? (
        <div className="empty-order">
          <p>
            Your order is empty. Choose a size and framing on any print page and
            it will wait here, even if you close the tab.
          </p>
          <Link to="/prints" className="btn btn-solid">
            Browse the prints
          </Link>
        </div>
      ) : (
        <div className="order-layout">
          <section aria-labelledby="h-lines">
            <h2 id="h-lines" className="visually-hidden">
              Prints in your order
            </h2>
            <ul className="order-lines">
              {lines.map((l) => {
                const print = prints.find((p) => p.id === l.printId)!;
                const fr = findFrame(print.frameId)!;
                const max =
                  remaining(l.printId) -
                  lines
                    .filter((x) => x.printId === l.printId && x !== l)
                    .reduce((s, x) => s + x.qty, 0);
                return (
                  <li key={l.key} className="order-line">
                    <Link to={`/prints/${print.id}`} className="order-thumb">
                      <img src={fr.src} alt="" width={fr.w} height={fr.h} />
                    </Link>
                    <div className="order-line-text">
                      <h3>
                        <Link to={`/prints/${print.id}`}>{fr.title}</Link>
                      </h3>
                      <p>
                        {sizes.find((s) => s.id === l.size)!.label},{" "}
                        {framings
                          .find((f) => f.id === l.framing)!
                          .label.toLowerCase()}{" "}
                        · {money(unitPrice(l.printId, l.size, l.framing))} each
                      </p>
                    </div>
                    <div
                      className="stepper"
                      role="group"
                      aria-label={`Quantity of ${fr.title}`}
                    >
                      <button
                        type="button"
                        className="icon-btn"
                        onClick={() => setQty(l.key, l.qty - 1)}
                        aria-label="One fewer"
                      >
                        <Minus size={16} aria-hidden="true" />
                      </button>
                      <output>{l.qty}</output>
                      <button
                        type="button"
                        className="icon-btn"
                        onClick={() => setQty(l.key, l.qty + 1)}
                        disabled={l.qty >= max}
                        aria-label="One more"
                      >
                        <Plus size={16} aria-hidden="true" />
                      </button>
                    </div>
                    <p className="order-line-price">
                      {money(l.qty * unitPrice(l.printId, l.size, l.framing))}
                    </p>
                    <button
                      type="button"
                      className="icon-btn order-remove"
                      onClick={() => setQty(l.key, 0)}
                      aria-label={`Remove ${fr.title}`}
                    >
                      <X size={18} aria-hidden="true" />
                    </button>
                  </li>
                );
              })}
            </ul>
            <dl className="order-totals" aria-live="polite">
              <div>
                <dt>Prints</dt>
                <dd>{money(subtotal)}</dd>
              </div>
              <div>
                <dt>
                  Shipping,{" "}
                  {lines.some((l) => l.framing !== "none")
                    ? "framed"
                    : "rolled"}
                </dt>
                <dd>{money(ship)}</dd>
              </div>
              <div className="order-total">
                <dt>Total</dt>
                <dd>{money(total)}</dd>
              </div>
            </dl>
          </section>

          <section className="checkout" aria-labelledby="h-checkout">
            <h2 id="h-checkout">Delivery</h2>
            <form noValidate onSubmit={submit} className="form">
              <Field label="Full name" name="name" error={errors.name}>
                {(p) => <input {...p} required autoComplete="name" />}
              </Field>
              <Field label="Email" name="email" error={errors.email}>
                {(p) => (
                  <input {...p} type="email" required autoComplete="email" />
                )}
              </Field>
              <Field
                label="Street address"
                name="address"
                error={errors.address}
                className="span-2"
              >
                {(p) => <input {...p} required autoComplete="street-address" />}
              </Field>
              <Field label="Town or city" name="city" error={errors.city}>
                {(p) => <input {...p} required autoComplete="address-level2" />}
              </Field>
              <Field label="State" name="state" error={errors.state}>
                {(p) => (
                  <select {...p} required defaultValue="">
                    <option value="" disabled>
                      Choose…
                    </option>
                    {states.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                )}
              </Field>
              <Field label="ZIP code" name="zip" error={errors.zip}>
                {(p) => (
                  <input
                    {...p}
                    required
                    inputMode="numeric"
                    pattern="[0-9]{5}"
                    maxLength={5}
                    autoComplete="postal-code"
                  />
                )}
              </Field>
              <Field
                label="Dedication on the back (optional)"
                name="dedication"
                hint="A name or a line, written in pencil under my signature."
                className="span-2"
              >
                {(p) => <input {...p} maxLength={80} />}
              </Field>
              <p className="quiet span-2">
                Payment is by invoice from {brand.email} once your print is
                signed. In this demo nothing is sent or charged.
              </p>
              <button
                type="submit"
                className="btn btn-solid span-2"
                disabled={sending}
              >
                {sending
                  ? "Placing your order…"
                  : `Place order · ${money(total)}`}
              </button>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}
