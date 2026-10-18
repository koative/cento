import { ArrowRight, Gift, Trash2 } from "lucide-react";
import { Link } from "../router";
import {
  deliveryDays,
  freeDeliveryFrom,
  maxMeals,
  minMeals,
  type DeliveryDay,
  type People,
} from "../content";
import { Qty } from "../components/Bits";
import {
  findRecipe,
  giftLines,
  money,
  perServing,
  recipeLines,
  recipePrice,
  setPlan,
  setQty,
  swapOf,
  totals,
  useBox,
} from "../lib/box";
import { deliveryDates, shortDate, useNow } from "../lib/week";

export function BoxPage() {
  const box = useBox();
  const now = useNow();
  const dates = deliveryDates(now);
  const t = totals(box);
  const recipesIn = recipeLines(box);
  const giftsIn = giftLines(box);
  const tooFew = t.meals > 0 && t.meals < minMeals;

  if (!box.lines.length)
    return (
      <div className="page box-page">
        <header className="page-head">
          <h1>Your box</h1>
        </header>
        <div className="empty">
          <h2>Nothing in it yet</h2>
          <p>
            Pick {minMeals} to {maxMeals} recipes from this week’s menu, or let
            the plan builder fill it for you.
          </p>
          <div className="actions">
            <Link to="/plans" className="btn">
              Build your box
            </Link>
            <Link to="/menu" className="btn btn-ghost">
              Browse the menu
            </Link>
          </div>
        </div>
      </div>
    );

  return (
    <div className="page box-page">
      <header className="page-head">
        <h1>Your box</h1>
        <p className="lead">
          {t.meals > 0
            ? `${t.meals} of ${maxMeals} bags filled, delivered ${shortDate(dates[box.day])}. Change anything until Wednesday at 11:59 pm.`
            : "Gift cards only. They are emailed on the date you chose."}
        </p>
      </header>

      <div className="box-layout">
        <div className="box-lines">
          {recipesIn.length > 0 && (
            <section aria-labelledby="rec-h">
              <div className="box-plan">
                <h2 id="rec-h">Recipes</h2>
                <label>
                  <span>Servings</span>
                  <select
                    value={box.people}
                    onChange={(e) =>
                      setPlan({ people: Number(e.target.value) as People })
                    }
                  >
                    <option value={2}>2 people</option>
                    <option value={4}>4 people</option>
                  </select>
                </label>
                <label>
                  <span>Delivery</span>
                  <select
                    value={box.day}
                    onChange={(e) =>
                      setPlan({ day: e.target.value as DeliveryDay })
                    }
                  >
                    {deliveryDays.map((d) => (
                      <option key={d} value={d}>
                        {shortDate(dates[d])}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <ul className="line-list">
                {recipesIn.map((l) => {
                  const r = findRecipe(l.slug);
                  if (!r) return null;
                  return (
                    <li key={l.key} className="line">
                      <img
                        src={r.image.src}
                        alt=""
                        width={r.image.w}
                        height={r.image.h}
                      />
                      <div className="line-info">
                        <Link to={"/menu/" + r.slug} className="line-name">
                          {r.name}
                        </Link>
                        <span className="muted">
                          {swapOf(r, l.swap).label} · {box.people} servings
                          {l.qty > 1 && ` · cooked ${l.qty} times`}
                        </span>
                      </div>
                      <Qty
                        value={l.qty}
                        onChange={(n) => setQty(l.key, n)}
                        max={l.qty + maxMeals - t.meals}
                        label={"Times: " + r.name}
                      />
                      <span className="line-price num">
                        {money(
                          recipePrice(r, l.swap, box.people, t.meals) * l.qty,
                        )}
                      </span>
                      <button
                        type="button"
                        className="icon-btn"
                        onClick={() => setQty(l.key, 0)}
                      >
                        <Trash2 size={18} aria-hidden="true" />
                        <span className="visually-hidden">Remove {r.name}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
              {tooFew && (
                <p className="field-error">
                  Boxes start at {minMeals} recipes.{" "}
                  <Link to="/menu">Add one more from the menu</Link>.
                </p>
              )}
              {t.meals < maxMeals && !tooFew && (
                <p className="muted">
                  Room for {maxMeals - t.meals} more.{" "}
                  <Link to="/menu">Add from the menu</Link>
                  {t.meals < freeDeliveryFrom &&
                    ` — ${freeDeliveryFrom - t.meals} more and delivery is free`}
                  .
                </p>
              )}
            </section>
          )}

          {giftsIn.length > 0 && (
            <section aria-labelledby="gift-h">
              <h2 id="gift-h">Gift cards</h2>
              <ul className="line-list">
                {giftsIn.map((g) => (
                  <li key={g.key} className="line">
                    <span className="line-icon" aria-hidden="true">
                      <Gift size={22} />
                    </span>
                    <div className="line-info">
                      <span className="line-name">
                        {money(g.amount)} gift card for {g.to}
                      </span>
                      <span className="muted">
                        Emailed to {g.email} on{" "}
                        {new Date(g.send + "T12:00").toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric" },
                        )}
                      </span>
                    </div>
                    <Qty
                      value={g.qty}
                      onChange={(n) => setQty(g.key, n)}
                      max={5}
                      label={"Gift cards for " + g.to}
                    />
                    <span className="line-price num">
                      {money(g.amount * g.qty)}
                    </span>
                    <button
                      type="button"
                      className="icon-btn"
                      onClick={() => setQty(g.key, 0)}
                    >
                      <Trash2 size={18} aria-hidden="true" />
                      <span className="visually-hidden">
                        Remove gift card for {g.to}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <aside className="summary" aria-labelledby="sum-h">
          <h2 id="sum-h">Summary</h2>
          <dl className="price-list" aria-live="polite">
            {t.meals > 0 && (
              <>
                <div>
                  <dt>
                    Recipes · {money(perServing(box.people, t.meals))} a serving
                  </dt>
                  <dd className="num">{money(t.recipesTotal)}</dd>
                </div>
                <div>
                  <dt>Delivery</dt>
                  <dd className="num">
                    {t.delivery ? money(t.delivery) : "Free"}
                  </dd>
                </div>
              </>
            )}
            {t.giftsTotal > 0 && (
              <div>
                <dt>Gift cards</dt>
                <dd className="num">{money(t.giftsTotal)}</dd>
              </div>
            )}
            <div className="price-total">
              <dt>Due today</dt>
              <dd className="num">{money(t.total)}</dd>
            </div>
          </dl>
          {tooFew ? (
            <p className="muted">Add one more recipe to continue.</p>
          ) : (
            <Link to="/checkout" className="btn btn-big btn-block">
              Sign up & check out <ArrowRight size={18} aria-hidden="true" />
            </Link>
          )}
          {t.meals > 0 && (
            <p className="muted small">
              Your plan renews weekly at this size. Skip or cancel before any
              Wednesday cutoff.
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}
