import { ArrowLeft } from "lucide-react";
import { Link } from "../router";
import { categories, menu, type MenuItem } from "../content";
import { kcalOf, money, priceOf } from "../lib";
import { ItemBuilder } from "../components/ItemBuilder";
import { ItemVisual } from "../components/ItemVisual";
import { MenuCard, Tags } from "../components/MenuCard";

export function MenuItemPage({ item }: { item: MenuItem }) {
  const category = categories.find((c) => c.id === item.category)!;
  const pairs = item.pairs
    .map((id) => menu.find((m) => m.id === id))
    .filter((m): m is MenuItem => !!m);
  // Drawn items show their stack in the builder below, so the top only needs a photo when there is one.
  const showTop = item.image || !item.stack;

  return (
    <div className="page item-page">
      <div className="wrap">
        <Link to="/menu" className="back-link">
          <ArrowLeft aria-hidden="true" /> Menu · {category.label}
        </Link>
      </div>

      <section
        className="wrap item-hero"
        data-visual={showTop ? "" : undefined}
      >
        {showTop && (
          <div className="item-hero-visual">
            <ItemVisual item={item} lazy={false} />
          </div>
        )}
        <div className="item-hero-copy">
          <h1>{item.name}</h1>
          <p className="item-price">
            {money(priceOf(item))} <span>· {kcalOf(item)} kcal as built</span>
          </p>
          <Tags item={item} />
          <p className="lede">{item.description}</p>
          <dl className="specs">
            <div>
              <dt>Allergens</dt>
              <dd>{item.allergens.join(", ")}</dd>
            </div>
            <div>
              <dt>Ready in</dt>
              <dd>About twelve minutes for pickup</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="wrap item-build" aria-labelledby="build-h">
        <h2 id="build-h">{item.stack ? "Make it yours" : "Your way"}</h2>
        <ItemBuilder key={item.id} item={item} />
      </section>

      {pairs.length > 0 && (
        <section className="wrap item-pairs" aria-labelledby="pairs-h">
          <h2 id="pairs-h">Goes with</h2>
          <div className="card-grid">
            {pairs.map((p) => (
              <MenuCard key={p.id} item={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
