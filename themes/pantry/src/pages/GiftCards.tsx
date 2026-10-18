import { useState, type FormEvent } from "react";
import { Link } from "../router";
import { gifts } from "../content";
import { GiftCardArt, Qty } from "../components/Bits";
import { Field, Shell, validate, type Errors } from "../components/Field";
import { addGift, money } from "../lib/box";

export function GiftCards() {
  const [preset, setPreset] = useState<number | "other">(gifts.amounts[1]);
  const [custom, setCustom] = useState("");
  const [design, setDesign] = useState(gifts.designs[0].id);
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");
  const [qty, setQty] = useState(1);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState("");

  const todayIso = new Date().toLocaleDateString("en-CA");
  const amount = preset === "other" ? Number(custom) || 0 : preset;

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, {
      custom: {
        missing: `Enter an amount between $${gifts.min} and $${gifts.max}.`,
        invalid: `Use a whole-dollar amount between $${gifts.min} and $${gifts.max}.`,
      },
      to: { missing: "Enter the recipient’s name so it appears on the card." },
      email: {
        missing: "Enter the recipient’s email; that is where the card goes.",
        invalid:
          "Check the recipient’s email, it needs an @ and a domain like example.com.",
      },
      from: { missing: "Enter your name so they know who to thank." },
      send: {
        missing: "Choose the day we should email the card.",
        invalid: "Choose today or a later date.",
      },
    });
    setErrors(found);
    if (Object.keys(found).length) {
      setStatus("");
      return;
    }
    const value = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement).value;
    addGift({
      amount,
      design,
      to,
      email: value("email"),
      from,
      message,
      send: value("send"),
      qty,
    });
    setStatus(
      `${qty > 1 ? qty + " gift cards" : "A gift card"} for ${money(amount)} ${qty > 1 ? "were" : "was"} added to your box.`,
    );
  }

  return (
    <div className="page gifts">
      <header className="page-head">
        <h1>{gifts.title}</h1>
        <p className="lead">{gifts.lead}</p>
      </header>

      <div className="gift-builder">
        <div className="gift-preview" aria-hidden="true">
          <GiftCardArt
            design={design}
            amount={amount || gifts.min}
            to={to}
            from={from}
            message={message}
          />
        </div>

        <form className="gift-form" noValidate onSubmit={submit}>
          <fieldset className="segmented segmented-lg">
            <legend>Amount</legend>
            {gifts.amounts.map((a) => (
              <label key={a}>
                <input
                  type="radio"
                  name="amount"
                  checked={preset === a}
                  onChange={() => setPreset(a)}
                />
                <span>${a}</span>
              </label>
            ))}
            <label>
              <input
                type="radio"
                name="amount"
                checked={preset === "other"}
                onChange={() => setPreset("other")}
              />
              <span>Other</span>
            </label>
          </fieldset>
          {preset === "other" && (
            <Field
              label={`Amount in dollars ($${gifts.min}–$${gifts.max})`}
              name="custom"
              type="number"
              inputMode="numeric"
              min={gifts.min}
              max={gifts.max}
              step={1}
              required
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              error={errors.custom}
            />
          )}

          <fieldset className="segmented">
            <legend>Design</legend>
            {gifts.designs.map((d) => (
              <label key={d.id}>
                <input
                  type="radio"
                  name="design"
                  checked={design === d.id}
                  onChange={() => setDesign(d.id)}
                />
                <span>{d.label}</span>
              </label>
            ))}
          </fieldset>

          <div className="field-row">
            <Field
              label="Recipient’s name"
              name="to"
              required
              autoComplete="off"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              error={errors.to}
            />
            <Field
              label="Recipient’s email"
              name="email"
              type="email"
              required
              autoComplete="off"
              error={errors.email}
            />
          </div>
          <Field
            label="Your name"
            name="from"
            required
            autoComplete="name"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            error={errors.from}
          />
          <Shell
            label="Message (optional)"
            name="message"
            hint={`${160 - message.length} characters left`}
          >
            {(a11y) => (
              <textarea
                {...a11y}
                name="message"
                rows={3}
                maxLength={160}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            )}
          </Shell>
          <div className="field-row field-row-end">
            <Field
              label="Send on"
              name="send"
              type="date"
              required
              min={todayIso}
              defaultValue={todayIso}
              error={errors.send}
            />
            <div className="field">
              <span className="order-label" aria-hidden="true">
                Quantity
              </span>
              <Qty
                value={qty}
                onChange={setQty}
                max={5}
                label="Number of gift cards"
              />
            </div>
          </div>
          <button type="submit" className="btn btn-big btn-block">
            Add {qty > 1 ? `${qty} cards` : "gift card"} · {money(amount * qty)}
          </button>
          <p className="form-status" aria-live="polite">
            {status}
            {status && (
              <>
                {" "}
                <Link to="/box">Go to your box</Link>
              </>
            )}
          </p>
        </form>
      </div>

      <section className="section gift-notes">
        {gifts.notes.map((n) => (
          <div key={n.title}>
            <h2>{n.title}</h2>
            <p>{n.body}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
