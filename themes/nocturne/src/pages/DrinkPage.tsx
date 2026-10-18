import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "../router";
import { drinkCategories, drinks, type Drink } from "../content";
import { albumOf, money } from "../lib/format";
import { DrinkCard } from "../components/Cards";
import { Glass } from "../components/Art";

export function DrinkPage({ drink }: { drink: Drink }) {
  const category = drinkCategories.find((c) => c.id === drink.category)!;
  const album = albumOf(drink.listen.album);
  const related = drinks
    .filter((d) => d.id !== drink.id)
    .map((d) => ({
      d,
      score:
        d.taste.filter((t) => drink.taste.includes(t)).length +
        (d.category === drink.category ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map((r) => r.d);

  return (
    <>
      <div className="wrap crumbs">
        <Link to="/menu" className="text-link">
          <ArrowLeft aria-hidden="true" /> All drinks
        </Link>
      </div>

      <article className="wrap drink-page">
        <div className="drink-hero">
          <div className="drink-media">
            {drink.image ? (
              <figure className="arch">
                <img
                  src={drink.image.src}
                  alt={drink.image.alt}
                  width={drink.image.w}
                  height={drink.image.h}
                />
              </figure>
            ) : (
              <div className="drink-glass-stage">
                <Glass kind={drink.glass} color={drink.color} />
              </div>
            )}
          </div>

          <div className="drink-info">
            <h1>{drink.name}</h1>
            <p className="drink-notes">{drink.notes}</p>
            <p className="drink-price">
              {money(drink.price)}
              <span>
                {category.label} · about {drink.abv}% ABV
                {drink.abv === 0 ? ", alcohol-free" : ""}
              </span>
            </p>
            <p className="lede">{drink.description}</p>
            <ul className="tags" aria-label="Character">
              {drink.taste.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="drink-detail">
          <section className="drink-spec" aria-labelledby="spec">
            <h2 id="spec">The spec</h2>
            <table>
              <caption className="sr-only">
                Ingredients for {drink.name}
              </caption>
              <tbody>
                {drink.spec.map((s) => (
                  <tr key={s.item}>
                    <td>{s.amount}</td>
                    <th scope="row">{s.item}</th>
                  </tr>
                ))}
              </tbody>
            </table>
            <dl className="spec-list spec-list-tight">
              <div>
                <dt>Method</dt>
                <dd>{drink.method}</dd>
              </div>
              <div>
                <dt>Glass</dt>
                <dd>
                  {
                    {
                      rocks: "Rocks",
                      coupe: "Coupe",
                      nick: "Nick & Nora",
                      highball: "Highball",
                    }[drink.glass]
                  }
                </dd>
              </div>
              <div>
                <dt>Ice</dt>
                <dd>{drink.ice}</dd>
              </div>
              <div>
                <dt>Garnish</dt>
                <dd>{drink.garnish}</dd>
              </div>
            </dl>
          </section>

          <aside className="listen" aria-labelledby="listen">
            <h2 id="listen">Listen with</h2>
            <div className="listen-record">
              <span
                className="sleeve"
                style={{ background: album.color }}
                aria-hidden="true"
              >
                <span />
              </span>
              <div>
                <p className="listen-title">{album.title}</p>
                <p className="muted">
                  {album.artist}, {album.year} · {album.genre}
                </p>
              </div>
            </div>
            <p>{drink.listen.why}</p>
            <p className="muted small">
              On the shelf behind the desk. Ask the selector and it may well be
              next.
            </p>
            <Link to="/reservations" className="btn btn-brass">
              Book a table <ArrowRight aria-hidden="true" />
            </Link>
          </aside>
        </div>
      </article>

      <section className="section section-rule">
        <div className="wrap">
          <h2 className="h-sub">If you like {drink.name}</h2>
          <div className="drink-grid">
            {related.map((d) => (
              <DrinkCard key={d.id} drink={d} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
