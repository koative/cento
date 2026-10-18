import { useState } from "react";
import { Check } from "lucide-react";
import { Link, navigate } from "../router";
import { club, images } from "../content";
import { addLine, money } from "../lib/cart";

type Billing = "monthly" | "yearly";

export function Club() {
  const [billing, setBilling] = useState<Billing>("monthly");
  const [tier, setTier] = useState(club.tiers[1].id);
  const chosen = club.tiers.find((t) => t.id === tier)!;
  const price = (monthly: number) =>
    billing === "monthly" ? monthly : monthly * 11;

  function join() {
    addLine({
      kind: "club",
      id: chosen.id,
      name: `Pour Club: ${chosen.name}`,
      detail:
        billing === "monthly"
          ? "Billed monthly"
          : "Billed yearly, 12 months for 11",
      unit: price(chosen.monthly),
      qty: 1,
    });
    navigate("/cart");
  }

  return (
    <div className="page">
      <header className="page-head with-photo">
        <div>
          <h1>The Pour Club</h1>
          <p className="lead">{club.intro}</p>
        </div>
        <img
          src={images.cellar}
          alt="Rows of oak barrels in a low, lamp-lit cellar"
          width={1400}
          height={932}
        />
      </header>

      <section className="section" aria-labelledby="plans-title">
        <div className="section-head">
          <h2 id="plans-title">Pick a size</h2>
          <div className="toggle" role="radiogroup" aria-label="Billing">
            {(["monthly", "yearly"] as const).map((b) => (
              <button
                key={b}
                type="button"
                role="radio"
                aria-checked={billing === b}
                onClick={() => setBilling(b)}
              >
                {b === "monthly" ? "Pay monthly" : "Pay yearly"}
              </button>
            ))}
          </div>
        </div>
        <p className="quiet">{club.yearlyNote}</p>

        <fieldset className="tiers">
          <legend className="visually-hidden">Club size</legend>
          {club.tiers.map((t) => (
            <label
              key={t.id}
              className="tier"
              data-selected={tier === t.id || undefined}
            >
              <input
                type="radio"
                name="tier"
                value={t.id}
                checked={tier === t.id}
                onChange={() => setTier(t.id)}
                className="visually-hidden"
              />
              <span className="tier-bottles" aria-hidden="true">
                {Array.from({ length: t.bottles }, (_, i) => (
                  <i key={i} />
                ))}
              </span>
              <span className="tier-name">{t.name}</span>
              <span className="tier-price">
                <b className="num">{money(price(t.monthly))}</b>{" "}
                {billing === "monthly" ? "a month" : "a year"}
              </span>
              <span className="tier-blurb">
                {t.bottles} bottles. {t.blurb}
              </span>
              <ul className="ticks">
                {t.perks.map((p) => (
                  <li key={p}>
                    <Check size={16} aria-hidden="true" /> {p}
                  </li>
                ))}
              </ul>
            </label>
          ))}
        </fieldset>
        <div className="club-cta">
          <p aria-live="polite">
            {chosen.name}, {chosen.bottles} bottles,{" "}
            <span className="num">{money(price(chosen.monthly))}</span>{" "}
            {billing === "monthly" ? "a month" : "a year"}.
          </p>
          <button type="button" className="btn" onClick={join}>
            Join with {chosen.name}
          </button>
        </div>
      </section>

      <section className="section steps">
        <h2>How it works</h2>
        <ol className="step-list">
          {club.steps.map((s) => (
            <li key={s.title}>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section faq">
        <h2>Club questions</h2>
        {club.faq.map((f) => (
          <details key={f.q}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
        <p>
          Anything else? <Link to="/visit">See the full FAQ</Link> or write to{" "}
          <a href="mailto:hello@pour.example">hello@pour.example</a>.
        </p>
      </section>
    </div>
  );
}
