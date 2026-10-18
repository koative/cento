import { useState } from "react";
import { Check } from "lucide-react";
import { Link } from "../router";
import { frequencies, images, plans, subscriptionCopy } from "../content";
import { addLine, money } from "../lib/cart";
import { longDate, useNow } from "../lib/delivery";

/** The first Thursday at least two days away, so we can buy for it at Monday's market. */
function firstThursday(now: Date) {
  const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2);
  d.setDate(d.getDate() + ((4 - d.getDay() + 7) % 7));
  return d;
}

export function Subscriptions() {
  const now = useNow();
  const [freqId, setFreqId] = useState(frequencies[0].id);
  const [planId, setPlanId] = useState(plans[1].id);
  const [added, setAdded] = useState("");

  const freq = frequencies.find((f) => f.id === freqId)!;
  const plan = plans.find((p) => p.id === planId)!;
  const per = (price: number) => Math.round(price * (1 - freq.discount));
  const first = longDate(firstThursday(now));

  function add() {
    addLine({
      id: "subscription-" + plan.id,
      kind: "subscription",
      name: plan.name,
      detail: `${freq.label} subscription · first delivery ${first}`,
      unit: per(plan.price),
      qty: 1,
      image: images.marketTulips.src,
      to: "/subscriptions",
    });
    setAdded(
      `${plan.name}, ${freq.label.toLowerCase()}, is in your bag. You pay for the first delivery today.`,
    );
  }

  return (
    <>
      <header className="page-head page-head-split">
        <div>
          <h1>Flowers every Thursday</h1>
          <p className="lead">{subscriptionCopy.intro}</p>
        </div>
        <img
          src={images.marketTulips.src}
          alt={images.marketTulips.alt}
          width={images.marketTulips.w}
          height={images.marketTulips.h}
        />
      </header>

      <section className="section subs" aria-labelledby="choose">
        <h2 id="choose">Choose your bunch</h2>
        <fieldset className="segmented">
          <legend className="visually-hidden">How often</legend>
          {frequencies.map((f) => (
            <label key={f.id}>
              <input
                type="radio"
                name="freq"
                value={f.id}
                checked={freqId === f.id}
                onChange={() => setFreqId(f.id)}
              />
              <span>
                {f.label}
                {f.discount > 0 && (
                  <small> save {Math.round(f.discount * 100)}%</small>
                )}
              </span>
            </label>
          ))}
        </fieldset>

        <fieldset className="plan-grid">
          <legend className="visually-hidden">Size of bunch</legend>
          {plans.map((p) => (
            <label key={p.id} className="plan">
              <input
                type="radio"
                name="plan"
                value={p.id}
                checked={planId === p.id}
                onChange={() => setPlanId(p.id)}
              />
              <span className="plan-name">{p.name}</span>
              <span className="plan-stems">{p.stems}</span>
              <span className="plan-price">
                {money(per(p.price))}
                <small> a delivery</small>
              </span>
              {freq.discount > 0 && (
                <span className="plan-was">instead of {money(p.price)}</span>
              )}
              <span className="plan-desc">{p.description}</span>
            </label>
          ))}
        </fieldset>

        <div className="subs-summary">
          <p>
            <strong>{plan.name}</strong>, delivered {freq.every}. First delivery{" "}
            <strong>{first}</strong>, then {money(per(plan.price))} a delivery
            until you pause or cancel.
          </p>
          <button type="button" className="btn" onClick={add}>
            Add subscription to bag
          </button>
        </div>
        <div aria-live="polite" className="added">
          {added && (
            <p>
              <Check size={18} aria-hidden="true" /> {added}{" "}
              <Link to="/checkout">Go to checkout</Link>.
            </p>
          )}
        </div>
      </section>

      <section className="section surface-tissue week" aria-labelledby="week">
        <h2 id="week">A subscriber's week</h2>
        <ol className="week-list">
          {subscriptionCopy.how.map((h) => (
            <li key={h.title}>
              <h3>{h.title}</h3>
              <p>{h.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section faq-section" aria-labelledby="subs-faq">
        <h2 id="subs-faq">Questions subscribers ask</h2>
        <div className="faq">
          {subscriptionCopy.faq.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
