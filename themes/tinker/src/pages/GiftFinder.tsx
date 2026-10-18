import { useState, type CSSProperties } from "react";
import { Check, Gift, RotateCcw } from "lucide-react";
import { interests, pages, wraps, type Interest } from "../content";
import { addLine } from "../lib/cart";
import { bandFor, money } from "../lib/format";
import { findGifts } from "../lib/gifts";
import { ProductCard } from "../components/ProductCard";

const yearsOld = Array.from({ length: 13 }, (_, i) => i);
const budgets: { value: number | null; label: string }[] = [
  { value: 20, label: "Under $20" },
  { value: 35, label: "Under $35" },
  { value: 50, label: "Under $50" },
  { value: null, label: "Any budget" },
];
const kraft = wraps.find((w) => w.id === "kraft")!;

function describe(age: number, loves: Interest[], budget: number | null) {
  const who =
    age === 0
      ? "a baby under one"
      : age === 12
        ? "someone 12 or older"
        : `a ${age} year old`;
  const into = loves.length
    ? ` who loves ${loves.map((l) => l.toLowerCase()).join(" or ")}`
    : "";
  return `${who}${into}${budget ? `, under ${money(budget)}` : ""}`;
}

export function GiftFinder() {
  const [age, setAge] = useState(4);
  const [loves, setLoves] = useState<Interest[]>([]);
  const [budget, setBudget] = useState<number | null>(50);
  const [added, setAdded] = useState<string[]>([]);

  const matches = findGifts({ age, loves, budget });
  const strong = loves.length
    ? matches.filter((m) => m.hits.length).length
    : matches.length;
  const nextBudget = budgets[budgets.findIndex((b) => b.value === budget) + 1];

  function toggle(i: Interest) {
    setLoves(loves.includes(i) ? loves.filter((l) => l !== i) : [...loves, i]);
  }

  function reset() {
    setAge(4);
    setLoves([]);
    setBudget(50);
  }

  return (
    <div className="page finder-page">
      <header className="page-head">
        <h1>{pages.finder.title}</h1>
        <p className="lead">{pages.finder.lead}</p>
      </header>

      <div className="finder-layout">
        <form className="finder-questions" onSubmit={(e) => e.preventDefault()}>
          <fieldset className="age-stack">
            <legend>
              How old are they?{" "}
              <b>
                {age === 12
                  ? "12 or older"
                  : age === 0
                    ? "Under 1"
                    : `${age} years old`}
              </b>
            </legend>
            <div className="stack-row">
              {yearsOld.map((n) => {
                const band = bandFor(n);
                return (
                  <label
                    key={n}
                    className="stack"
                    data-on={n <= age || undefined}
                    data-picked={n === age || undefined}
                    style={
                      { "--h": n + 1, "--band": band.color } as CSSProperties
                    }
                  >
                    <input
                      type="radio"
                      name="age"
                      value={n}
                      checked={age === n}
                      onChange={() => setAge(n)}
                    />
                    <span className="stack-col" aria-hidden="true" />
                    <span className="stack-num">
                      {n === 12 ? "12+" : n}
                      <span className="visually-hidden">
                        {n === 0
                          ? " (under one year)"
                          : n === 1
                            ? " year old"
                            : " years old"}
                      </span>
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <fieldset>
            <legend>
              What are they into? <small>Pick as many as you like</small>
            </legend>
            <div className="chips">
              {interests.map((i) => (
                <label key={i} className="chip">
                  <input
                    type="checkbox"
                    checked={loves.includes(i)}
                    onChange={() => toggle(i)}
                  />
                  <span>{i}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend>What would you like to spend?</legend>
            <div className="chips">
              {budgets.map((b) => (
                <label key={b.label} className="chip">
                  <input
                    type="radio"
                    name="budget"
                    checked={budget === b.value}
                    onChange={() => setBudget(b.value)}
                  />
                  <span>{b.label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <button type="button" className="text-button" onClick={reset}>
            <RotateCcw size={16} aria-hidden="true" /> Start again
          </button>
        </form>

        <section className="finder-results" aria-labelledby="h-results">
          <h2 id="h-results" aria-live="polite">
            {matches.length
              ? `${strong} ${strong === 1 ? "toy" : "toys"} for ${describe(age, loves, budget)}`
              : `Nothing on the shelf for ${describe(age, loves, budget)}`}
          </h2>
          {loves.length > 0 && matches.length > strong && (
            <p className="finder-note">
              Below those, {matches.length - strong} more that suit the age and
              budget.
            </p>
          )}

          {matches.length ? (
            <ol className="product-grid finder-grid">
              {matches.slice(0, 9).map(({ product, hits }, i) => (
                <li key={product.id} style={{ "--i": i } as CSSProperties}>
                  <ProductCard
                    product={product}
                    extra={
                      <>
                        <ul className="reasons">
                          <li>
                            <Check size={14} aria-hidden="true" /> Ages{" "}
                            {product.ageMin}
                            {product.ageMax >= 99 ? "+" : `–${product.ageMax}`}
                          </li>
                          {hits.map((h) => (
                            <li key={h}>
                              <Check size={14} aria-hidden="true" /> {h}
                            </li>
                          ))}
                        </ul>
                        <button
                          type="button"
                          className="btn btn-small btn-quiet quick-add"
                          disabled={added.includes(product.id)}
                          onClick={() => {
                            addLine({
                              kind: "toy",
                              id: product.id,
                              name: product.name,
                              detail: product.option?.values[0].label ?? "",
                              wrap: kraft.label,
                              image: product.image.src,
                              unit: product.price,
                              qty: 1,
                              max: product.stock,
                            });
                            setAdded([...added, product.id]);
                          }}
                        >
                          {added.includes(product.id) ? (
                            <>
                              <Check size={16} aria-hidden="true" /> In your
                              basket, wrapped
                            </>
                          ) : (
                            <>
                              <Gift size={16} aria-hidden="true" /> Add, gift
                              wrapped
                            </>
                          )}
                        </button>
                      </>
                    }
                  />
                </li>
              ))}
            </ol>
          ) : (
            <div className="empty-state">
              <p>Every toy for this age costs a little more than that.</p>
              {nextBudget && (
                <button
                  type="button"
                  className="btn"
                  onClick={() => setBudget(nextBudget.value)}
                >
                  Try {nextBudget.label.toLowerCase()}
                </button>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
