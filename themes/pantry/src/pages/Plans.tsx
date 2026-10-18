import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Link, navigate } from "../router";
import {
  deliveryDays,
  deliveryFee,
  filters,
  freeDeliveryFrom,
  maxMeals,
  minMeals,
  plans,
  pricing,
  recipes,
  type DeliveryDay,
  type People,
  type Recipe,
} from "../content";
import { BoxDiagram } from "../components/Bits";
import {
  fillBox,
  findRecipe,
  money,
  perServing,
  recipePrice,
  setPlan,
  useBox,
} from "../lib/box";
import { deliveryDates, longDate, shortDate, useNow } from "../lib/week";

type Diet = "all" | "veggie" | "vegan";
const diets: { id: Diet; label: string }[] = [
  { id: "all", label: "Everything" },
  { id: "veggie", label: "Vegetarian" },
  { id: "vegan", label: "Vegan" },
];
const likeOptions = filters.filter((f) =>
  ["quick", "family", "spicy", "light", "premium"].includes(f.id),
);
const mealOptions = Array.from(
  { length: maxMeals - minMeals + 1 },
  (_, i) => i + minMeals,
);

/** Recipes allowed by the diet, best matches for the liked filters first. */
function rank(diet: Diet, likes: string[]) {
  const tests = likeOptions.filter((f) => likes.includes(f.id));
  return recipes
    .filter((r) => diet === "all" || r.tags.includes(diet))
    .map((r) => ({
      r,
      score: tests.filter((t) => t.test(r)).length + r.loved / 100,
    }))
    .sort((a, b) => b.score - a.score)
    .map((x) => x.r.slug);
}

export function Plans() {
  const box = useBox();
  const now = useNow();
  const dates = deliveryDates(now);
  const [people, setPeople] = useState<People>(box.people);
  const [count, setCount] = useState(4);
  const [diet, setDiet] = useState<Diet>("all");
  const [likes, setLikes] = useState<string[]>([]);
  const [day, setDay] = useState<DeliveryDay>(box.day);
  const [picks, setPicks] = useState<string[]>(() =>
    rank("all", []).slice(0, 4),
  );

  function refill(next: { count?: number; diet?: Diet; likes?: string[] }) {
    const c = next.count ?? count;
    const d = next.diet ?? diet;
    const l = next.likes ?? likes;
    setCount(c);
    setDiet(d);
    setLikes(l);
    setPicks(rank(d, l).slice(0, c));
  }

  function swap(slot: number) {
    const ranked = rank(diet, likes);
    const start = ranked.indexOf(picks[slot]);
    for (let step = 1; step < ranked.length; step++) {
      const candidate = ranked[(start + step) % ranked.length];
      if (!picks.includes(candidate)) {
        setPicks(picks.map((p, i) => (i === slot ? candidate : p)));
        return;
      }
    }
  }

  const chosen = picks.map(findRecipe).filter((r): r is Recipe => !!r);
  const recipesTotal = chosen.reduce(
    (s, r) => s + recipePrice(r, r.swaps[0].id, people, chosen.length),
    0,
  );
  const delivery = chosen.length >= freeDeliveryFrom ? 0 : deliveryFee;
  const short = chosen.length < minMeals;

  return (
    <div className="page plans">
      <header className="page-head">
        <h1>{plans.title}</h1>
        <p className="lead">{plans.lead}</p>
      </header>

      <div className="builder">
        <form className="builder-controls" onSubmit={(e) => e.preventDefault()}>
          <fieldset className="choice-set">
            <legend>Who’s eating?</legend>
            <div className="choice-row">
              {([2, 4] as People[]).map((p) => (
                <label key={p} className="choice">
                  <input
                    type="radio"
                    name="people"
                    checked={people === p}
                    onChange={() => setPeople(p)}
                  />
                  <span className="choice-big">{p} people</span>
                  <span className="choice-sub num">
                    from {money(perServing(p, maxMeals))} a serving
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="segmented segmented-lg">
            <legend>Recipes a week</legend>
            {mealOptions.map((n) => (
              <label key={n}>
                <input
                  type="radio"
                  name="count"
                  checked={count === n}
                  onChange={() => refill({ count: n })}
                />
                <span>{n}</span>
              </label>
            ))}
          </fieldset>

          <fieldset className="segmented">
            <legend>Diet</legend>
            {diets.map((d) => (
              <label key={d.id}>
                <input
                  type="radio"
                  name="diet"
                  checked={diet === d.id}
                  onChange={() => refill({ diet: d.id })}
                />
                <span>{d.label}</span>
              </label>
            ))}
          </fieldset>

          <fieldset className="likes">
            <legend>You like</legend>
            <p className="field-hint">{plans.prefsHint}</p>
            <div className="chips">
              {likeOptions.map((f) => (
                <label key={f.id} className="chip">
                  <input
                    type="checkbox"
                    checked={likes.includes(f.id)}
                    onChange={(e) =>
                      refill({
                        likes: e.target.checked
                          ? [...likes, f.id]
                          : likes.filter((x) => x !== f.id),
                      })
                    }
                  />
                  <Check size={15} aria-hidden="true" />
                  {f.label}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="choice-set">
            <legend>Delivery day</legend>
            <div className="day-row">
              {deliveryDays.map((d) => (
                <label key={d} className="choice choice-day">
                  <input
                    type="radio"
                    name="day"
                    checked={day === d}
                    onChange={() => setDay(d)}
                  />
                  <span className="choice-big">{d}</span>
                  <span className="choice-sub">
                    {shortDate(dates[d]).split(", ")[1]}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        </form>

        <section className="builder-box" aria-labelledby="box-h">
          <h2 id="box-h">Your first box</h2>
          <BoxDiagram
            items={Array.from({ length: count }, (_, i) =>
              findRecipe(picks[i] ?? ""),
            )}
            size={count}
            people={people}
            onSwap={swap}
          />
          <dl className="price-list" aria-live="polite">
            <div>
              <dt>
                {chosen.length} recipes × {people} servings
              </dt>
              <dd className="num">{money(recipesTotal)}</dd>
            </div>
            <div>
              <dt>Delivery on {longDate(dates[day])}</dt>
              <dd className="num">{delivery ? money(delivery) : "Free"}</dd>
            </div>
            <div className="price-total">
              <dt>Weekly total</dt>
              <dd className="num">{money(recipesTotal + delivery)}</dd>
            </div>
          </dl>
          {short && (
            <p className="field-error">
              Only {chosen.length} recipe matches this diet. Boxes start at two,
              so pick a wider diet.
            </p>
          )}
          <div className="builder-actions">
            <button
              type="button"
              className="btn btn-big btn-block"
              disabled={short}
              onClick={() => {
                fillBox(
                  people,
                  day,
                  chosen.map((r) => r.slug),
                );
                navigate("/box");
              }}
            >
              Pack these {chosen.length} recipes{" "}
              <ArrowRight size={18} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="btn btn-ghost btn-block"
              onClick={() => {
                setPlan({ people, day });
                navigate("/menu");
              }}
            >
              Choose my own from the menu
            </button>
          </div>
        </section>
      </div>

      <section className="section price-grid-section">
        <div className="narrow">
          <h2>Every plan, every price</h2>
          <p>
            Price per serving. Premium recipes add a fixed amount per serving,
            shown on the menu.
          </p>
        </div>
        <div
          className="table-scroll"
          tabIndex={0}
          role="region"
          aria-label="Price per serving table"
        >
          <table className="price-grid">
            <thead>
              <tr>
                <th scope="col">Recipes a week</th>
                {mealOptions.map((n) => (
                  <th scope="col" key={n} className="num">
                    {n}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {([2, 4] as People[]).map((p) => (
                <tr key={p}>
                  <th scope="row">{p} people</th>
                  {pricing[p].map((v, i) => (
                    <td
                      key={i}
                      className="num"
                      data-current={
                        p === people && i + minMeals === count ? "" : undefined
                      }
                    >
                      {money(v)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="muted">
          Delivery {money(deliveryFee)}, free from {freeDeliveryFrom} recipes.
        </p>
      </section>

      <section className="section includes">
        <h2>In every box</h2>
        <ul className="check-list">
          {plans.includes.map((i) => (
            <li key={i}>
              <Check size={18} aria-hidden="true" /> {i}
            </li>
          ))}
        </ul>
        <Link to="/how-it-works" className="text-link">
          How skipping and cancelling work{" "}
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </section>
    </div>
  );
}
