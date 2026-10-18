import { Check, Clock, Flame, Plus } from "lucide-react";
import { Link } from "../router";
import { maxMeals, tagLabels, type Recipe } from "../content";
import { addRecipe, meals, recipeLines, setQty, useBox } from "../lib/box";

/** Adds the recipe with its default swap, or takes every version of it back out. */
export function BoxToggle({ recipe }: { recipe: Recipe }) {
  const box = useBox();
  const lines = recipeLines(box).filter((l) => l.slug === recipe.slug);
  const inBox = lines.length > 0;
  const full = !inBox && meals(box) >= maxMeals;
  return (
    <button
      type="button"
      className="box-toggle"
      aria-pressed={inBox}
      disabled={full}
      onClick={() =>
        inBox
          ? lines.forEach((l) => setQty(l.key, 0))
          : addRecipe(recipe.slug, recipe.swaps[0].id)
      }
    >
      {inBox ? (
        <Check size={18} aria-hidden="true" />
      ) : (
        <Plus size={18} aria-hidden="true" />
      )}
      {inBox ? "In your box" : full ? `Box full (${maxMeals})` : "Add to box"}
      <span className="visually-hidden">: {recipe.name}</span>
    </button>
  );
}

export function RecipeCard({
  recipe,
  lazy = true,
}: {
  recipe: Recipe;
  lazy?: boolean;
}) {
  const to = "/menu/" + recipe.slug;
  return (
    <article className="rcard">
      <Link to={to} className="rcard-media" tabIndex={-1} aria-hidden="true">
        <img
          src={recipe.image.src}
          alt=""
          width={recipe.image.w}
          height={recipe.image.h}
          loading={lazy ? "lazy" : undefined}
        />
        <span className="bag-no">{String(recipe.no).padStart(2, "0")}</span>
      </Link>
      <div className="rcard-body">
        <h3>
          <Link to={to}>{recipe.name}</Link>
        </h3>
        <p className="rcard-with">with {recipe.with}</p>
        <ul className="meta">
          <li>
            <Clock size={15} aria-hidden="true" /> {recipe.minutes} min
          </li>
          <li>
            <Flame size={15} aria-hidden="true" /> {recipe.nutrition.kcal} kcal
          </li>
          {recipe.premium && (
            <li className="premium">Premium +${recipe.premium.toFixed(2)}</li>
          )}
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
        <BoxToggle recipe={recipe} />
      </div>
    </article>
  );
}
