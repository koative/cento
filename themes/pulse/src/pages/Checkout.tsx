import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { Link } from "../router";
import { brand } from "../content";
import {
  clearOrder,
  lines,
  ticketCount,
  useOrder,
  type Order,
} from "../lib/order";
import { validate, type Errors } from "../lib/forms";
import { Field, useErrors } from "../components/Field";
import { OrderSummary } from "../components/OrderSummary";

/** The festival is 18+: holders must be born on or before this date. */
const latestBirthday = "2009-07-17";

const messages: Record<string, string> = {
  name: "Enter your full name as it appears on your ID.",
  email: "Enter an email like you@example.com — your e-tickets go there.",
  dob: "Enter your date of birth so we can check you're 18 by 17 July 2027.",
  country: "Choose the country you live in.",
  terms: "Tick the box to accept the ticket terms before you pay.",
};

type Done = { ref: string; email: string; order: Order; holders: string[] };

export function Checkout() {
  const order = useOrder();
  const count = ticketCount(order);
  const { errors, setErrors, onChange } = useErrors();
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<Done | null>(null);
  const confirmHeading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!done) return;
    window.scrollTo({ top: 0 });
    confirmHeading.current?.focus();
  }, [done]);

  const holderSlots = lines(order).flatMap((l) =>
    Array.from({ length: l.qty }, (_, i) =>
      `${l.ticket.name} ${l.qty > 1 ? i + 1 : ""}`.trim(),
    ),
  );

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const extra: Errors = {};
    const dob = String(data.get("dob") ?? "");
    if (dob && dob > latestBirthday)
      extra.dob =
        "Pulse is 18+. The lead booker must be born on or before 17 July 2009.";
    const holderMessages = Object.fromEntries(
      holderSlots.map((s, i) => [
        `holder-${i}`,
        `Add the name for ticket ${i + 1} (${s}) — it's printed on the wristband.`,
      ]),
    );
    const found = validate(form, { ...messages, ...holderMessages }, extra);
    setErrors(found);
    if (Object.keys(found).length) return;

    setSending(true);
    window.setTimeout(() => {
      setDone({
        ref: `PLS7-${Math.random().toString(36).slice(2, 7).toUpperCase()}`,
        email: String(data.get("email")),
        order,
        holders: holderSlots.map((_, i) => String(data.get(`holder-${i}`))),
      });
      clearOrder();
      setSending(false);
    }, 1200);
  };

  if (done) {
    return (
      <section className="wrap confirm" aria-live="polite">
        <Check className="confirm-mark" aria-hidden="true" />
        <h1 ref={confirmHeading} tabIndex={-1}>
          You're coming to Pulse.
        </h1>
        <p>
          Order <strong className="num">{done.ref}</strong> is confirmed. Your
          e-tickets are on their way to {done.email}, and wristbands are posted
          in the first week of July.
        </p>
        <div className="confirm-grid">
          <OrderSummary order={done.order} />
          <div>
            <h2>Wristbands for</h2>
            <ul className="mini-list">
              {done.holders.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </div>
        </div>
        <p className="demo-note">
          This is a demo: no payment was taken and nothing was sent.
        </p>
        <div className="confirm-actions">
          <Link to="/timetable" className="btn btn-acid">
            Plan your timetable
          </Link>
          <Link to="/venue" className="btn btn-line">
            How to get there
          </Link>
        </div>
      </section>
    );
  }

  if (!count) {
    return (
      <section className="wrap confirm">
        <h1>Checkout</h1>
        <p>
          Your order is empty. Pick a wristband first — weekend, camping or a
          single day.
        </p>
        <Link to="/tickets" className="btn btn-acid">
          Choose tickets
        </Link>
      </section>
    );
  }

  return (
    <>
      <header className="page-head wrap">
        <Link to="/tickets" className="back">
          <ArrowLeft aria-hidden="true" /> Edit tickets
        </Link>
        <h1>Checkout</h1>
        <p>
          Two minutes. Tickets are personal, so we need a name for every
          wristband.
        </p>
      </header>

      <div className="wrap tickets-layout">
        <form
          noValidate
          onSubmit={submit}
          onChange={onChange}
          className="checkout-form"
          aria-busy={sending}
        >
          <fieldset>
            <legend>Lead booker</legend>
            <div className="field-row">
              <Field
                label="Full name"
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
            <div className="field-row">
              <Field
                label="Date of birth"
                name="dob"
                type="date"
                required
                max={latestBirthday}
                error={errors.dob}
                hint="Pulse is 18+ on every day."
              />
              <Field
                label="Country of residence"
                name="country"
                error={errors.country}
              >
                <select required defaultValue="">
                  <option value="" disabled>
                    Choose…
                  </option>
                  {[
                    "Germany",
                    "Austria",
                    "Switzerland",
                    "Netherlands",
                    "Poland",
                    "Denmark",
                    "France",
                    "United Kingdom",
                    "Other",
                  ].map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </Field>
            </div>
          </fieldset>

          <fieldset>
            <legend>Names on the wristbands</legend>
            <p className="fieldset-hint">
              Free to change until 1 July from your account.
            </p>
            {holderSlots.map((slot, i) => (
              <Field
                key={i}
                label={`Ticket ${i + 1} · ${slot}`}
                name={`holder-${i}`}
                required
                autoComplete={i === 0 ? "name" : "off"}
                error={errors[`holder-${i}`]}
              />
            ))}
          </fieldset>

          <fieldset>
            <legend>Before you pay</legend>
            <div className="check" data-invalid={errors.terms ? "" : undefined}>
              <input
                id="f-terms"
                name="terms"
                type="checkbox"
                required
                aria-invalid={errors.terms ? true : undefined}
                aria-describedby={errors.terms ? "f-terms-err" : undefined}
              />
              <label htmlFor="f-terms">
                I accept the ticket terms, including the 18+ rule and the
                no-refund, face-value resale policy.
              </label>
              {errors.terms && (
                <p className="field-error" id="f-terms-err">
                  {errors.terms}
                </p>
              )}
            </div>
            <div className="check">
              <input id="f-news" name="news" type="checkbox" />
              <label htmlFor="f-news">
                Send me set times and the final-tier warning. A few emails a
                year.
              </label>
            </div>
          </fieldset>

          <button
            type="submit"
            className="btn btn-acid btn-wide"
            disabled={sending}
          >
            {sending ? "Confirming your order…" : "Confirm and pay"}
          </button>
          <p className="demo-note">
            Demo checkout: no payment is taken and nothing leaves your browser.
            Questions? {brand.email}
          </p>
          <p className="sr-only" aria-live="polite">
            {sending
              ? "Confirming your order"
              : Object.keys(errors).length
                ? `${Object.keys(errors).length} fields need attention`
                : ""}
          </p>
        </form>

        <aside className="order-panel" aria-labelledby="order-title">
          <h2 id="order-title">Your order</h2>
          <OrderSummary order={order} />
        </aside>
      </div>
    </>
  );
}
