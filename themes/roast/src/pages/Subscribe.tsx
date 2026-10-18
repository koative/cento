import { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { navigate } from "../router";
import {
  coffees,
  grinds,
  roastersChoice,
  subscription as sub,
} from "../content";
import { addLine, money } from "../cart";
import { Bag } from "../components/Bag";

const choices = [roastersChoice, ...coffees];
const DAY = 86_400_000;
const dateFmt = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
});

/** The next roast day (Monday or Thursday) strictly after `from`. */
function nextRoast(from: Date) {
  const d = new Date(from.getFullYear(), from.getMonth(), from.getDate() + 1);
  while (!sub.roastDays.includes(d.getDay())) d.setDate(d.getDate() + 1);
  return d;
}

/** Size and rhythm whose daily supply is closest to the daily need. */
function suggest(cups: number) {
  const need = cups * sub.gramsPerCup;
  let best = { grams: 500, every: 2, gap: Infinity };
  // Ties go to the first match, so the order favours our most-ordered plan: two bags every two weeks.
  for (const every of [2, 1, 3, 4])
    for (const grams of [500, 250, 1000]) {
      const gap = Math.abs(grams / (every * 7) - need);
      if (gap < best.gap) best = { grams, every, gap };
    }
  return best;
}

export function Subscribe() {
  const [coffeeId, setCoffeeId] = useState(roastersChoice.id);
  const [cups, setCups] = useState(2);
  const [grams, setGrams] = useState(500);
  const [every, setEvery] = useState(2);
  const [grind, setGrind] = useState(grinds[0]);

  const coffee = choices.find((c) => c.id === coffeeId) ?? choices[0];
  const full = grams === 1000 ? coffee.priceKilo : coffee.price * (grams / 250);
  const price = full * (1 - sub.discount);
  const sizeLabel = sub.sizes.find((s) => s.grams === grams)?.label ?? "";
  const lasts = Math.round(grams / (cups * sub.gramsPerCup));
  const gap = every * 7 - lasts;
  const tip = suggest(cups);
  const first = nextRoast(new Date());
  const schedule = [0, 1, 2, 3].map(
    (i) => new Date(first.getTime() + i * every * 7 * DAY),
  );

  function start() {
    addLine({
      id: "sub-" + coffee.id,
      name: `${coffee.name} subscription`,
      color: coffee.color,
      size: sizeLabel,
      grind,
      unit: Math.round(price * 100) / 100,
      qty: 1,
      every,
    });
    navigate("/cart");
  }

  return (
    <div className="page subscribe-page">
      <header className="page-head">
        <h1>{sub.title}</h1>
        <p className="lead">{sub.intro}</p>
      </header>

      <div className="builder">
        <div className="builder-steps">
          <fieldset className="step">
            <legend>
              <span className="step-n">1</span> Pick a coffee
            </legend>
            <div className="coffee-choices">
              {choices.map((c) => (
                <label key={c.id} className="coffee-choice">
                  <input
                    type="radio"
                    name="coffee"
                    value={c.id}
                    checked={coffeeId === c.id}
                    onChange={() => setCoffeeId(c.id)}
                  />
                  <span
                    className="swatch"
                    style={{ background: c.color }}
                    aria-hidden="true"
                  />
                  <span>
                    <strong>{c.name}</strong>
                    <small>
                      {c.id === roastersChoice.id
                        ? "Changes every delivery"
                        : c.origin}
                    </small>
                  </span>
                </label>
              ))}
            </div>
            {coffeeId === roastersChoice.id && (
              <p className="step-note">{roastersChoice.blurb}</p>
            )}
          </fieldset>

          <fieldset className="step">
            <legend>
              <span className="step-n">2</span> How many cups a day?
            </legend>
            <div className="cups">
              <input
                type="range"
                min={1}
                max={6}
                value={cups}
                onChange={(e) => setCups(Number(e.target.value))}
                aria-label="Cups per day"
                aria-valuetext={`${cups} ${cups === 1 ? "cup" : "cups"} a day`}
              />
              <output className="cups-out">
                {cups} <span>{cups === 1 ? "cup" : "cups"} a day</span>
              </output>
            </div>
            <div className="suggestion" aria-live="polite">
              <Sparkles size={18} aria-hidden="true" />
              <p>
                At {cups * sub.gramsPerCup} g a day we suggest{" "}
                <b>
                  {sub.sizes.find((s) => s.grams === tip.grams)?.label} every{" "}
                  {tip.every === 1 ? "week" : `${tip.every} weeks`}
                </b>
                .
              </p>
              {(tip.grams !== grams || tip.every !== every) && (
                <button
                  type="button"
                  className="text-button"
                  onClick={() => {
                    setGrams(tip.grams);
                    setEvery(tip.every);
                  }}
                >
                  Use this
                </button>
              )}
            </div>
          </fieldset>

          <fieldset className="step">
            <legend>
              <span className="step-n">3</span> Bag size
            </legend>
            <div className="segmented">
              {sub.sizes.map((s) => (
                <label key={s.grams}>
                  <input
                    type="radio"
                    name="grams"
                    checked={grams === s.grams}
                    onChange={() => setGrams(s.grams)}
                  />
                  <span>
                    {s.label} <small>{s.detail}</small>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="step">
            <legend>
              <span className="step-n">4</span> Delivery rhythm
            </legend>
            <div className="segmented">
              {sub.frequencies.map((f) => (
                <label key={f}>
                  <input
                    type="radio"
                    name="every"
                    checked={every === f}
                    onChange={() => setEvery(f)}
                  />
                  <span>{f === 1 ? "Weekly" : `Every ${f} weeks`}</span>
                </label>
              ))}
            </div>
            <p
              className={"step-note" + (Math.abs(gap) > 3 ? " warn" : "")}
              aria-live="polite"
            >
              {sizeLabel} lasts about {lasts} days at {cups}{" "}
              {cups === 1 ? "cup" : "cups"} a day.{" "}
              {gap > 3
                ? `You would run dry ${gap} days before the next bag.`
                : gap < -3
                  ? `Bags would pile up: about ${-gap} days of coffee left when the next one lands.`
                  : "That matches your rhythm nicely."}
            </p>
          </fieldset>

          <fieldset className="step">
            <legend>
              <span className="step-n">5</span> Grind
            </legend>
            <div className="field">
              <label htmlFor="sub-grind">Ground for</label>
              <select
                id="sub-grind"
                value={grind}
                onChange={(e) => setGrind(e.target.value)}
              >
                {grinds.map((g) => (
                  <option key={g}>{g}</option>
                ))}
              </select>
            </div>
          </fieldset>
        </div>

        <aside className="builder-summary" aria-label="Your subscription">
          <div
            className="summary-bags"
            data-count={grams === 500 ? 2 : 1}
            key={coffee.id + grams}
          >
            {Array.from({ length: grams === 500 ? 2 : 1 }, (_, i) => (
              <Bag
                key={i}
                name={coffee.name}
                origin={coffee.origin}
                color={coffee.color}
                weight={grams === 1000 ? "1 kg" : "250 g"}
                size={grams === 1000 ? 12 : 10}
              />
            ))}
          </div>
          <h2>
            {coffee.name}, {sizeLabel}
          </h2>
          <p className="muted">
            {grind} · {every === 1 ? "every week" : `every ${every} weeks`}
          </p>
          <p className="summary-price">
            <span>{money(price)}</span> per delivery <s>{money(full)}</s>
          </p>
          <p className="muted">
            {money(price / (grams / sub.gramsPerCup))} a cup · pause, skip or
            cancel any time
          </p>
          <h3>Your first four deliveries</h3>
          <ol className="schedule">
            {schedule.map((d) => (
              <li key={d.getTime()}>
                <span>Roasted {dateFmt.format(d)}</span>
                <span>ships {dateFmt.format(new Date(d.getTime() + DAY))}</span>
              </li>
            ))}
          </ol>
          <button type="button" className="btn btn-wide" onClick={start}>
            Add subscription to bag <ArrowRight size={18} aria-hidden="true" />
          </button>
        </aside>
      </div>

      <section className="faq" aria-labelledby="h-faq">
        <h2 id="h-faq">Questions, answered</h2>
        <div className="faq-list">
          {sub.faq.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
