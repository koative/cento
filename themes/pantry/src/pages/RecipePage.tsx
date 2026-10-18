import { useState } from "react";
import { ArrowRight, ChefHat, Clock, Flame, Gauge, Heart } from "lucide-react";
import { Link } from "../router";
import {
  maxMeals,
  recipes,
  tagLabels,
  type People,
  type Recipe,
} from "../content";
import {
  addRecipe,
  meals,
  money,
  recipePrice,
  setPlan,
  useBox,
} from "../lib/box";
import { Qty } from "../components/Bits";
import { RecipeCard } from "../components/RecipeCard";

const fractions: Record<string, string> = {
  "0.25": "¼",
  "0.5": "½",
  "0.75": "¾",
};

/** 1.5 → "1½", 0.25 → "¼", 300 → "300". */
function amount(n: number) {
  const whole = Math.floor(n);
  const frac = fractions[String(+(n - whole).toFixed(2))] ?? "";
  return (whole || !frac ? String(whole) : "") + frac;
}

export function RecipePage({ recipe }: { recipe: Recipe }) {
  const box = useBox();
  const [swap, setSwap] = useState(recipe.swaps[0].id);
  const [qty, setQty] = useState(1);
  const [status, setStatus] = useState("");
  const inBox = meals(box);
  const room = maxMeals - inBox;
  const count = Math.max(inBox + qty, 2);
  const unit = recipePrice(recipe, swap, box.people, count);
  const scale = box.people / 2;
  const related = recipes
    .filter((r) => r.slug !== recipe.slug)
    .map((r) => ({
      r,
      score:
        r.tags.filter((t) => recipe.tags.includes(t)).length +
        (r.chef === recipe.chef ? 0.5 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((x) => x.r);

  function add() {
    const swapLabel = recipe.swaps.find((s) => s.id === swap)!.label;
    if (addRecipe(recipe.slug, swap, qty))
      setStatus(
        `Added ${qty > 1 ? qty + " × " : ""}${recipe.name} (${swapLabel.toLowerCase()}) to your box.`,
      );
    else
      setStatus(
        `Your box has room for ${room} more ${room === 1 ? "recipe" : "recipes"}. Lower the quantity or remove one from your box.`,
      );
  }

  return (
    <article className="page recipe">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/menu">This week’s menu</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{recipe.name}</span>
      </nav>

      <div className="recipe-top">
        <figure className="recipe-photo">
          <img
            src={recipe.image.src}
            alt={recipe.image.alt}
            width={recipe.image.w}
            height={recipe.image.h}
          />
          <span className="bag-no bag-no-big">
            {String(recipe.no).padStart(2, "0")}
          </span>
        </figure>

        <div className="recipe-info">
          <h1>{recipe.name}</h1>
          <p className="recipe-with">with {recipe.with}</p>
          <ul className="meta meta-lg">
            <li>
              <Clock size={17} aria-hidden="true" /> {recipe.minutes} min
            </li>
            <li>
              <Gauge size={17} aria-hidden="true" /> {recipe.difficulty}
            </li>
            <li>
              <Flame size={17} aria-hidden="true" /> {recipe.nutrition.kcal}{" "}
              kcal
            </li>
            <li>
              <Heart size={17} aria-hidden="true" /> {recipe.loved}% would cook
              it again
            </li>
          </ul>
          {recipe.tags.length > 0 && (
            <ul className="tags" aria-label="Diet">
              {recipe.tags.map((t) => (
                <li key={t} data-tag={t}>
                  {tagLabels[t]}
                </li>
              ))}
            </ul>
          )}
          <p>{recipe.blurb}</p>

          <div className="order-panel">
            <fieldset className="segmented">
              <legend>Servings (applies to your whole box)</legend>
              {([2, 4] as People[]).map((p) => (
                <label key={p}>
                  <input
                    type="radio"
                    name="servings"
                    checked={box.people === p}
                    onChange={() => setPlan({ people: p })}
                  />
                  <span>{p} people</span>
                </label>
              ))}
            </fieldset>
            {recipe.swaps.length > 1 && (
              <fieldset className="swaps">
                <legend>Make it with</legend>
                {recipe.swaps.map((s) => (
                  <label key={s.id}>
                    <input
                      type="radio"
                      name="swap"
                      value={s.id}
                      checked={swap === s.id}
                      onChange={() => setSwap(s.id)}
                    />
                    <span>{s.label}</span>
                    <span className="swap-price num">
                      {s.extra ? `+${money(s.extra)} / serving` : "Included"}
                    </span>
                  </label>
                ))}
              </fieldset>
            )}
            <div className="order-row">
              <div>
                <span className="order-label" aria-hidden="true">
                  Cook it
                </span>
                <Qty
                  value={qty}
                  onChange={setQty}
                  max={Math.max(1, Math.min(3, room))}
                  label="Times this week"
                />
              </div>
              <p className="order-price">
                <span className="num">{money(unit * qty)}</span>
                <span className="muted">
                  {money(unit / box.people)} a serving × {box.people * qty}
                </span>
              </p>
            </div>
            <button
              type="button"
              className="btn btn-big btn-block"
              onClick={add}
              disabled={room < 1}
            >
              {room < 1
                ? `Your box is full (${maxMeals} recipes)`
                : "Add to box"}
            </button>
            <p className="form-status" aria-live="polite">
              {status}
              {status.startsWith("Added") && (
                <>
                  {" "}
                  <Link to="/box">Review your box</Link>
                </>
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="recipe-body">
        <section className="ingredients" aria-labelledby="ing-h">
          <h2 id="ing-h">Ingredients for {box.people}</h2>
          <h3>In bag {String(recipe.no).padStart(2, "0")}</h3>
          <table className="ing-table">
            <tbody>
              {recipe.bag.map(([name, n, u]) => (
                <tr key={name}>
                  <td className="num">
                    {amount(n * scale)}{" "}
                    {n * scale > 1 && (u === "bunch" || u === "pinch")
                      ? u + "es"
                      : n * scale > 1 && (u === "can" || u === "pot")
                        ? u + "s"
                        : u}
                  </td>
                  <th scope="row">{name}</th>
                </tr>
              ))}
            </tbody>
          </table>
          <h3>From your pantry</h3>
          <p>{recipe.pantry.join(", ")}</p>
          <h3>Allergens</h3>
          <p>
            {recipe.allergens.length
              ? recipe.allergens.join(", ")
              : "None of the 14 major allergens"}
            . Packed in a kitchen that handles all 14.
          </p>
        </section>

        <section className="method" aria-labelledby="method-h">
          <h2 id="method-h">Method</h2>
          <ol className="steps">
            {recipe.steps.map((s) => (
              <li key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
          <aside className="chef-note">
            <ChefHat size={22} aria-hidden="true" />
            <p>
              {recipe.note}
              <span className="muted"> — {recipe.chef}</span>
            </p>
          </aside>
        </section>

        <section className="nutrition" aria-labelledby="nut-h">
          <h2 id="nut-h">Per serving</h2>
          <table className="nut-table">
            <tbody>
              {(
                [
                  ["Energy", recipe.nutrition.kcal + " kcal"],
                  ["Protein", recipe.nutrition.protein + " g"],
                  ["Carbohydrate", recipe.nutrition.carbs + " g"],
                  ["Fat", recipe.nutrition.fat + " g"],
                  ["Fibre", recipe.nutrition.fibre + " g"],
                  ["Salt", recipe.nutrition.salt.toFixed(1) + " g"],
                ] as const
              ).map(([k, v]) => (
                <tr key={k}>
                  <th scope="row">{k}</th>
                  <td className="num">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>

      <section className="section related" aria-labelledby="rel-h">
        <div className="section-head">
          <h2 id="rel-h">Goes well in the same box</h2>
          <Link to="/menu" className="text-link">
            Whole menu <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <ul className="recipe-grid recipe-grid-3">
          {related.map((r) => (
            <li key={r.slug}>
              <RecipeCard recipe={r} />
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
