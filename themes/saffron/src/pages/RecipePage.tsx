import { useState } from "react";
import { ArrowRight, Check, Clock, ShoppingBasket, Users } from "lucide-react";
import { Link } from "../router";
import { products, recipes, type Recipe } from "../content";
import { Qty, useFlash } from "../components/Shelf";
import { addItem, money } from "../lib/cart";

const FRACTIONS: [number, string][] = [
  [0.25, "¼"],
  [1 / 3, "⅓"],
  [0.5, "½"],
  [2 / 3, "⅔"],
  [0.75, "¾"],
];

/** 1.5 → "1½"; falls back to one decimal when no kitchen fraction is close. Eggs and cloves round up to whole ones. */
function kitchenAmount(n: number, unit: string) {
  if (!unit || /^cloves?$/.test(unit)) return String(Math.ceil(n - 0.01));
  const whole = Math.floor(n + 0.05);
  const frac = n - whole;
  if (Math.abs(frac) < 0.05) return String(whole);
  const near = FRACTIONS.find(([v]) => Math.abs(frac - v) < 0.05);
  return near ? `${whole || ""}${near[1]}` : n.toFixed(1);
}

export function RecipePage({ recipe }: { recipe: Recipe }) {
  const [serves, setServes] = useState(recipe.serves);
  const [have, setHave] = useState<string[]>([]);
  const [added, flash] = useFlash(5000);
  const scale = serves / recipe.serves;

  // One basket line per product; `packs` is the share of a pack the base recipe uses, rounded up to whole packs.
  const shoppable = recipe.ingredients.flatMap((ing) => {
    const product =
      ing.product && products.find((p) => p.id === ing.product!.id);
    if (!ing.product || !product) return [];
    const packs = Math.max(
      1,
      Math.ceil(ing.product.packs * (ing.fixed ? 1 : scale) - 0.01),
    );
    return [
      {
        ing,
        product,
        variant: ing.product.variant,
        packs,
        cost: product.variants[ing.product.variant].price * packs,
      },
    ];
  });
  const toBuy = shoppable.filter((s) => !have.includes(s.product.id));
  const total = toBuy.reduce((s, b) => s + b.cost, 0);

  const others = recipes.filter((r) => r.slug !== recipe.slug).slice(0, 3);

  return (
    <article className="page recipe-page">
      <header className="recipe-head">
        <div>
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link to="/recipes">Recipes</Link>
          </nav>
          <h1>{recipe.name}</h1>
          <p className="lede">{recipe.intro}</p>
          <p className="meta">
            <span>
              <Clock size={16} aria-hidden="true" /> {recipe.minutes} min
            </span>
            <span>
              <Users size={16} aria-hidden="true" /> Written for {recipe.serves}
            </span>
            <span>{recipe.diets.join(" · ")}</span>
          </p>
        </div>
        <img {...recipe.photo} />
      </header>

      <div className="recipe-body">
        <section className="ingredients" aria-labelledby="ing-title">
          <div className="ing-head">
            <h2 id="ing-title">Ingredients</h2>
            <div className="serves">
              <span id="serves-label">Serves</span>
              <Qty
                value={serves}
                onChange={setServes}
                label="Number of servings"
              />
            </div>
          </div>
          <ul className="ing-list">
            {recipe.ingredients.map((ing) => {
              const sold = ing.product && shoppable.find((s) => s.ing === ing);
              return (
                <li key={ing.item}>
                  <span className="ing-amount">
                    {kitchenAmount(
                      ing.fixed ? ing.amount : ing.amount * scale,
                      ing.unit,
                    )}{" "}
                    {ing.unit}
                  </span>
                  <span className="ing-item">{ing.item}</span>
                  {sold && (
                    <label className="have">
                      <input
                        type="checkbox"
                        checked={have.includes(sold.product.id)}
                        onChange={(e) =>
                          setHave(
                            e.target.checked
                              ? [...have, sold.product.id]
                              : have.filter((id) => id !== sold.product.id),
                          )
                        }
                      />
                      <span>Have it</span>
                    </label>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="shop-recipe">
            <h3>From our shelves</h3>
            {toBuy.length ? (
              <ul>
                {toBuy.map((b) => (
                  <li key={b.product.id}>
                    <Link to={`/aisles/${b.product.aisle}/${b.product.id}`}>
                      {b.packs} × {b.product.name}
                    </Link>
                    <span className="num">{money(b.cost)}</span>
                    <small>{b.product.variants[b.variant].label}</small>
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                You have everything we sell for this one. Just the
                store-cupboard bits left.
              </p>
            )}
            <button
              type="button"
              className="btn btn-lg"
              disabled={!toBuy.length}
              onClick={() => {
                toBuy.forEach((b) => addItem(b.product.id, b.variant, b.packs));
                flash();
              }}
            >
              {added ? (
                <Check size={20} aria-hidden="true" />
              ) : (
                <ShoppingBasket size={20} aria-hidden="true" />
              )}
              {added
                ? "Added to your basket"
                : `Add ${toBuy.length} items · ${money(total)}`}
            </button>
            <p className="added-note" aria-live="polite">
              {added && (
                <>
                  Everything for {serves} is in your basket.{" "}
                  <Link to="/basket" className="text-link">
                    Review basket <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </>
              )}
            </p>
          </div>
        </section>

        <section className="method" aria-labelledby="method-title">
          <h2 id="method-title">Method</h2>
          <ol>
            {recipe.steps.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
          <aside className="tip">
            <h3>From {recipe.cook}</h3>
            <p>{recipe.tip}</p>
          </aside>
        </section>
      </div>

      <section className="section">
        <h2>Cook next</h2>
        <ul className="recipe-grid">
          {others.map((r) => (
            <li key={r.slug} className="recipe-card">
              <Link to={"/recipes/" + r.slug}>
                <img
                  src={r.photo.src}
                  alt={r.photo.alt}
                  width={r.photo.width}
                  height={r.photo.height}
                  loading="lazy"
                />
                <h3>{r.name}</h3>
              </Link>
              <p className="meta">
                <span>
                  <Clock size={15} aria-hidden="true" /> {r.minutes} min
                </span>
              </p>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
