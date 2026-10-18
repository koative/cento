import { useState, type FormEvent } from "react";
import { ArrowRight, Leaf } from "lucide-react";
import { Link } from "../router";
import {
  delivery,
  deliveryPage,
  deliveryWindows,
  zones,
  type Zone,
} from "../content";
import { Field, validate, type Errors } from "../components/Field";
import { SlotBoard } from "../components/SlotBoard";
import { money, useBasket } from "../lib/cart";
import { findSlot, zoneFor } from "../lib/slots";

export function Delivery() {
  const { slot, lines } = useBasket();
  const chosen = findSlot(slot);
  const [errors, setErrors] = useState<Errors>({});
  const [checked, setChecked] = useState<{ zip: string; zone?: Zone } | null>(
    null,
  );

  function check(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form, {
      zip: {
        missing: "Enter your 5-digit ZIP code to check delivery.",
        invalid: "ZIP codes are 5 digits, like 40112.",
      },
    });
    setErrors(found);
    if (Object.keys(found).length) return setChecked(null);
    const zip = (
      form.elements.namedItem("zip") as HTMLInputElement
    ).value.trim();
    setChecked({ zip, zone: zoneFor(zip) });
  }

  return (
    <div className="page delivery-page">
      <header className="page-head">
        <h1>{deliveryPage.title}</h1>
        <p className="lede">{deliveryPage.intro}</p>
      </header>

      <section className="zip-check" aria-labelledby="zip-title">
        <h2 id="zip-title">Do we come to you?</h2>
        <form className="inline-form" noValidate onSubmit={check}>
          <Field
            label="ZIP code"
            name="zip"
            inputMode="numeric"
            autoComplete="postal-code"
            required
            pattern="\d{5}"
            maxLength={5}
            placeholder="40112"
            error={errors.zip}
          />
          <button className="btn" type="submit">
            Check
          </button>
        </form>
        <p
          className="zip-result"
          aria-live="polite"
          data-ok={checked?.zone ? "" : undefined}
        >
          {checked &&
            (checked.zone
              ? `Yes. ${checked.zip} is in ${checked.zone.name}: we deliver by ${checked.zone.vehicle}${
                  checked.zone.surcharge
                    ? `, plus ${money(checked.zone.surcharge)} on the slot fee`
                    : " at the listed slot fee"
                }.`
              : `Not yet. ${checked.zip} is outside our round. We deliver to ${zones.flatMap((z) => z.zips).join(", ")}; the shop on Orchard Row is open to everyone.`)}
        </p>
      </section>

      <section className="section board-section" aria-labelledby="board-title">
        <div className="section-head">
          <h2 id="board-title">This week's board</h2>
          <ul className="board-legend">
            <li data-status="open">Open, price shown</li>
            <li data-status="few">Nearly full</li>
            <li data-green="">
              <Leaf size={14} aria-hidden="true" /> Green slot,{" "}
              {money(delivery.greenDiscount)} off
            </li>
            <li data-status="full">Full or closed</li>
          </ul>
        </div>
        <SlotBoard />
        <div className="board-next">
          {chosen && lines.length > 0 ? (
            <Link to="/checkout" className="btn btn-lg">
              Continue to checkout <ArrowRight size={20} aria-hidden="true" />
            </Link>
          ) : (
            <Link to="/aisles" className="btn btn-lg">
              {chosen ? "Slot held. Start shopping" : "Start shopping"}{" "}
              <ArrowRight size={20} aria-hidden="true" />
            </Link>
          )}
        </div>
      </section>

      <section className="section how" aria-labelledby="how-title">
        <h2 id="how-title">From shelf to doorstep</h2>
        <ol className="how-steps">
          {delivery.steps.map((s) => (
            <li key={s.title}>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section fees-zones">
        <div>
          <h2>Fees</h2>
          <table className="ledger">
            <caption className="visually-hidden">
              Delivery fee by window
            </caption>
            <thead>
              <tr>
                <th scope="col">Window</th>
                <th scope="col">Fee</th>
                <th scope="col">Green slot</th>
              </tr>
            </thead>
            <tbody>
              {deliveryWindows.map((w) => (
                <tr key={w.id}>
                  <th scope="row">{w.label}</th>
                  <td className="num">{money(w.fee)}</td>
                  <td className="num">
                    {money(w.fee - delivery.greenDiscount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="fine">
            Free on baskets over {money(delivery.freeOver)}. Minimum basket{" "}
            {money(delivery.minimum)}.
          </p>
        </div>
        <div>
          <h2>Zones</h2>
          <ul className="zones">
            {zones.map((z) => (
              <li key={z.id}>
                <h3>{z.name}</h3>
                <p>{z.area}</p>
                <p className="meta">
                  By {z.vehicle} · ZIPs {z.zips.join(", ")}
                  {z.surcharge ? ` · +${money(z.surcharge)}` : ""}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <img {...deliveryPage.bike} loading="lazy" />
      </section>

      <section className="section faq" aria-labelledby="faq-title">
        <h2 id="faq-title">Questions about delivery</h2>
        {delivery.faq.map((f) => (
          <details key={f.q}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </section>
    </div>
  );
}
