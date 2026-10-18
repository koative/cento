import type { Ingredient } from "../content";

/** A photograph for plant ingredients; an apothecary-label monogram for everything made in a lab. */
export function IngredientMark({
  ingredient,
  large = false,
}: {
  ingredient: Ingredient;
  large?: boolean;
}) {
  if (ingredient.image)
    return (
      <img
        className="ing-mark ing-photo"
        src={ingredient.image}
        alt={large ? ingredient.alt : ""}
        loading={large ? undefined : "lazy"}
        width={large ? 1400 : 400}
        height={large ? 1050 : 400}
      />
    );
  return (
    <span
      className={"ing-mark ing-mono kind-" + ingredient.kind.toLowerCase()}
      aria-hidden="true"
    >
      <span>{ingredient.abbr}</span>
      <small>{ingredient.kind}</small>
    </span>
  );
}
