import { useState } from "react";
import { Check } from "lucide-react";
import { Link } from "../router";
import { DEMO_NOW, quote } from "../content";
import { QuoteCalculator } from "../components/QuoteCalculator";
import { Faq } from "../components/Faq";
import { EMAIL, Field, useForm } from "../components/form";
import { draft, price, tariffs, type QuoteInput } from "../lib/quote";
import { hub } from "../lib/geo";
import { dayOf, eur } from "../lib/format";

const today = DEMO_NOW.slice(0, 10);

type Booked = {
  ref: string;
  q: QuoteInput;
  total: number;
  date: string;
  email: string;
};

export default function Quote() {
  const [q, setQ] = useState<QuoteInput>(draft.current);
  const [booked, setBooked] = useState<Booked | null>(null);
  const r = price(q);

  const form = useForm(
    {
      company: "",
      name: "",
      email: "",
      phone: "",
      date: "",
      goods: "",
      terms: "",
    },
    (v) => ({
      company: v.company.trim()
        ? undefined
        : "Enter the company that pays for the freight.",
      name:
        v.name.trim().length > 1
          ? undefined
          : "Enter the name of the person we confirm with.",
      email: !v.email.trim()
        ? "Enter an email for the booking confirmation."
        : !EMAIL.test(v.email)
          ? "Check the email: it needs an @ and a domain."
          : undefined,
      phone:
        v.phone.replace(/\D/g, "").length >= 8
          ? undefined
          : "Enter a phone number with at least 8 digits for the driver to call.",
      date: !v.date
        ? "Choose a collection date."
        : v.date < today
          ? "Collection can’t be in the past. Choose today or later."
          : new Date(`${v.date}T12:00`).getDay() === 0
            ? "We don’t collect on Sundays. Choose Monday to Saturday."
            : undefined,
      goods:
        v.goods.trim().length >= 3
          ? undefined
          : "Describe the goods in a few words, e.g. “boxed ceramic tiles”.",
      terms: v.terms ? undefined : "Accept the carriage conditions to book.",
    }),
    (v) => {
      if (!r.ok) return;
      const ref = `RLY-4823-${String(352 + Math.floor(Math.random() * 600)).padStart(4, "0")}`;
      setBooked({
        ref,
        q,
        total: r.total,
        date: dayOf(new Date(`${v.date}T12:00`)),
        email: v.email,
      });
    },
  );

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <h1>{quote.h1}</h1>
          <p className="lede">{quote.lead}</p>
        </div>
      </section>

      <section className="section-tight">
        <div className="wrap">
          <QuoteCalculator q={q} set={setQ} />
        </div>
      </section>

      <section className="section section-sunk" aria-labelledby="book-title">
        <div className="wrap split">
          <div>
            <h2 id="book-title">{quote.formTitle}</h2>
            <p>{quote.formText}</p>
            {r.ok && (
              <dl className="booking-summary">
                <div>
                  <dt>Lane</dt>
                  <dd>
                    {hub(q.from).city} → {hub(q.to).city}
                  </dd>
                </div>
                <div>
                  <dt>Service</dt>
                  <dd>{tariffs[q.mode].label}</dd>
                </div>
                <div>
                  <dt>Load</dt>
                  <dd className="num">
                    {q.pallets} pallets · {q.weight} kg
                  </dd>
                </div>
                <div>
                  <dt>Rate</dt>
                  <dd className="num">{eur(r.total)} excl. VAT</dd>
                </div>
              </dl>
            )}
            <p className="muted small">
              Demo: nothing is sent, booked or charged. The form only runs in
              your browser.
            </p>
          </div>

          <div>
            <div aria-live="polite">
              {booked && (
                <div className="success-panel">
                  <Check size={28} aria-hidden />
                  <h3>Booked: {booked.ref}</h3>
                  <p>
                    {tariffs[booked.q.mode].label} from{" "}
                    {hub(booked.q.from).city} to {hub(booked.q.to).city},
                    collection on {booked.date}, at{" "}
                    <span className="num">{eur(booked.total)}</span>. A
                    confirmation would go to {booked.email}.
                  </p>
                  <div className="actions">
                    <Link to="/app/shipments" className="btn btn-primary">
                      Open the shipments demo
                    </Link>
                    <button
                      type="button"
                      className="btn btn-ghost"
                      onClick={() => {
                        setBooked(null);
                        form.reset();
                      }}
                    >
                      Book another
                    </button>
                  </div>
                </div>
              )}
            </div>
            {!booked && (
              <form className="form-grid" onSubmit={form.submit} noValidate>
                <Field
                  form={form}
                  name="company"
                  label="Company"
                  autoComplete="organization"
                  required
                />
                <Field
                  form={form}
                  name="name"
                  label="Your name"
                  autoComplete="name"
                  required
                />
                <Field
                  form={form}
                  name="email"
                  label="Email"
                  type="email"
                  autoComplete="email"
                  required
                />
                <Field
                  form={form}
                  name="phone"
                  label="Phone"
                  type="tel"
                  autoComplete="tel"
                  hint="The driver calls this number on arrival."
                  required
                />
                <Field
                  form={form}
                  name="date"
                  label="Collection date"
                  type="date"
                  min={today}
                  required
                />
                <Field
                  form={form}
                  name="goods"
                  label="Goods description"
                  placeholder="e.g. boxed ceramic tiles"
                  required
                />
                <Field
                  form={form}
                  name="terms"
                  type="checkbox"
                  label="I accept the carriage conditions (CMR, Relay terms 2026)"
                  className="span-2"
                />
                {!r.ok && (
                  <p className="field-error span-2" role="alert">
                    Fix the quote above before booking: {r.reason}
                  </p>
                )}
                <div className="span-2">
                  <button
                    className="btn btn-primary btn-lg"
                    disabled={form.status === "sending" || !r.ok}
                  >
                    {form.status === "sending"
                      ? "Booking…"
                      : r.ok
                        ? `Book at ${eur(r.total)}`
                        : "Book"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <h2>Quote questions</h2>
          <Faq items={quote.faqs} />
        </div>
      </section>
    </>
  );
}
