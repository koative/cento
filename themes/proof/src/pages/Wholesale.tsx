import { useState } from "react";
import { brand, images, wholesale } from "../content";
import {
  Field,
  PHONE_PATTERN,
  SelectField,
  TextArea,
  useFormFlow,
} from "../components/Field";
import { money } from "../lib/cart";
import { isoDate } from "../lib/time";

export function Wholesale() {
  const [sent, setSent] = useState<{ business: string; email: string } | null>(
    null,
  );
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const form = useFormFlow(
    {
      business: { missing: "Enter your business name." },
      type: { missing: "Choose what kind of business you run." },
      contact: { missing: "Enter who we should talk to." },
      email: {
        missing: "Enter an email for the price list.",
        invalid: "That email looks incomplete — check for an @ and a domain.",
      },
      phone: {
        missing: "Enter a phone number for the delivery driver.",
        invalid: "Use digits, spaces or dashes — at least 7 of them.",
      },
      start: {
        missing: "Pick a date for your trial delivery.",
        invalid: "Trial deliveries start tomorrow at the earliest.",
      },
    },
    (data) =>
      setSent({
        business: String(data.get("business")),
        email: String(data.get("email")),
      }),
  );

  return (
    <>
      <header className="page-head page-head-split">
        <div>
          <h1>Wholesale</h1>
          <p className="lede">{wholesale.lede}</p>
        </div>
        <img
          src={images.rackOven}
          alt="A baker loading a tall rack of loaves into the oven"
          width={999}
          height={1500}
        />
      </header>

      <section className="section segments" aria-labelledby="who-title">
        <h2 id="who-title">Who we bake for</h2>
        <dl>
          {wholesale.segments.map((s) => (
            <div key={s.title}>
              <dt>{s.title}</dt>
              <dd>{s.body}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="section trade-tables">
        <div>
          <h2 id="prices-title">Trade price list</h2>
          <div className="table-wrap">
            <table aria-labelledby="prices-title">
              <thead>
                <tr>
                  <th scope="col">Item</th>
                  <th scope="col">Unit</th>
                  <th scope="col" className="num">
                    Price
                  </th>
                  <th scope="col" className="num">
                    Min. per drop
                  </th>
                </tr>
              </thead>
              <tbody>
                {wholesale.prices.map((p) => (
                  <tr key={p.item}>
                    <th scope="row">{p.item}</th>
                    <td>{p.unit}</td>
                    <td className="num">{money(p.price)}</td>
                    <td className="num">{p.min}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="quiet">Prices before tax, valid through March 2027.</p>
        </div>
        <div>
          <h2 id="rounds-title">Delivery rounds</h2>
          <ul className="rounds">
            {wholesale.rounds.map((r) => (
              <li key={r.name}>
                <span className="round-window">{r.window}</span>
                <strong>{r.name}</strong>
                <span>{r.areas}</span>
              </li>
            ))}
          </ul>
          <h2>Terms</h2>
          <ul className="plain-list ticks">
            {wholesale.terms.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section enquiry" aria-labelledby="enquiry-title">
        <div className="enquiry-intro">
          <h2 id="enquiry-title">Ask for a trial delivery</h2>
          <p>
            Tell us about your counter and we'll send a sample bag on the
            morning you choose, with the price list and a standing-order sheet.
            Dev replies within a working day, or call him on{" "}
            <a href={brand.phoneHref}>{brand.phone}</a>.
          </p>
        </div>
        <div className="panel" aria-live="polite">
          {sent ? (
            <div className="form-success">
              <p className="success-title">
                Thanks — {sent.business} is on Dev's list.
              </p>
              <p>
                He'll confirm your trial delivery by email at {sent.email}{" "}
                before 2pm tomorrow. Nothing was actually sent: this is a demo
                form.
              </p>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setSent(null)}
              >
                Send another enquiry
              </button>
            </div>
          ) : (
            <form
              className="form-grid"
              noValidate
              onSubmit={form.onSubmit}
              onChange={form.onChange}
            >
              <Field
                label="Business name"
                name="business"
                required
                autoComplete="organization"
                error={form.errors.business}
              />
              <SelectField
                label="Type of business"
                name="type"
                required
                defaultValue=""
                error={form.errors.type}
              >
                <option value="" disabled>
                  Choose one
                </option>
                <option>Café</option>
                <option>Restaurant</option>
                <option>Grocer or deli</option>
                <option>Hotel or office</option>
              </SelectField>
              <Field
                label="Contact name"
                name="contact"
                required
                autoComplete="name"
                error={form.errors.contact}
              />
              <Field
                label="Email"
                name="email"
                type="email"
                required
                autoComplete="email"
                error={form.errors.email}
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
                label="Trial delivery date"
                name="start"
                type="date"
                required
                min={isoDate(tomorrow)}
                error={form.errors.start}
              />
              <SelectField
                label="Rough weekly spend"
                name="spend"
                defaultValue="$150 – $400"
                className="span-2"
              >
                <option>Under $150</option>
                <option>$150 – $400</option>
                <option>$400 – $1,000</option>
                <option>Over $1,000</option>
              </SelectField>
              <TextArea
                label="What would you like on the counter? (optional)"
                name="message"
                className="span-2"
              />
              <div className="span-2 form-foot">
                <button className="btn" type="submit" disabled={form.sending}>
                  {form.sending ? "Sending…" : "Request a trial"}
                </button>
                <p className="quiet">Demo form — nothing is sent anywhere.</p>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
