import { useState } from "react";
import { ArrowRight, Clock } from "lucide-react";
import { Link } from "../router";
import {
  faqs,
  farms,
  home,
  maxMeals,
  minMeals,
  recipes,
  type People,
} from "../content";
import { RecipeCard } from "../components/RecipeCard";
import { Faq, GiftCardArt } from "../components/Bits";
import { findRecipe, money, perServing } from "../lib/box";
import {
  deliveryDates,
  menuWeek,
  shortDate,
  timeLeft,
  useNow,
} from "../lib/week";

const mealOptions = Array.from(
  { length: maxMeals - minMeals + 1 },
  (_, i) => i + minMeals,
);

export function Home() {
  const now = useNow();
  const [people, setPeople] = useState<People>(2);
  const [count, setCount] = useState(3);
  const featured = findRecipe(home.bag.recipe)!;
  const each = perServing(people, count);
  const cheapest = Math.min(
    ...[2, 4].map((p) => perServing(p as People, maxMeals)),
  );

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <h1>{home.title}</h1>
          <p className="lead">{home.lead}</p>
          <div className="actions">
            <Link to="/plans" className="btn btn-big">
              Build your box <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link to="/menu" className="btn btn-ghost btn-big">
              See this week’s menu
            </Link>
          </div>
          <p className="hero-note">
            From {money(cheapest)} a serving. Skip any week, cancel before any
            Wednesday.
          </p>
        </div>
        <ul
          className="hero-cards"
          aria-label="Three recipes from this week’s menu"
        >
          {home.heroCards.map((slug) => {
            const r = findRecipe(slug)!;
            return (
              <li key={slug}>
                <Link to={"/menu/" + slug} className="mini-card">
                  <img
                    src={r.image.src}
                    alt={r.image.alt}
                    width={r.image.w}
                    height={r.image.h}
                  />
                  <span className="bag-no">
                    {String(r.no).padStart(2, "0")}
                  </span>
                  <span className="mini-name">{r.name}</span>
                  <span className="mini-meta">
                    <Clock size={14} aria-hidden="true" /> {r.minutes} min ·{" "}
                    {r.nutrition.kcal} kcal
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="section menu-rail">
        <div className="section-head">
          <h2>
            {home.menuTitle}, {menuWeek(now)}
          </h2>
          <Link to="/menu" className="text-link">
            All {recipes.length} recipes{" "}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <ul className="rail" aria-label="This week’s recipes">
          {recipes.slice(0, 8).map((r) => (
            <li key={r.slug}>
              <RecipeCard recipe={r} />
            </li>
          ))}
        </ul>
      </section>

      <section className="section week">
        <div className="narrow">
          <h2>{home.week.title}</h2>
          <p className="lead">{home.week.lead}</p>
        </div>
        <ol className="week-strip">
          {home.week.days.map((d) => (
            <li key={d.day}>
              <span className="week-day">{d.day}</span>
              <h3>{d.title}</h3>
              <p>{d.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section bag-feature">
        <img
          className="bag-photo"
          src={home.bag.image.src}
          alt={home.bag.image.alt}
          width={home.bag.image.w}
          height={home.bag.image.h}
          loading="lazy"
        />
        <div className="bag-copy">
          <h2>{home.bag.title}</h2>
          <p>{home.bag.body}</p>
          <div className="recipe-sheet">
            <h3>
              <span className="bag-no">
                {String(featured.no).padStart(2, "0")}
              </span>{" "}
              {featured.name}
            </h3>
            <div className="sheet-cols">
              <div>
                <h4>In bag {String(featured.no).padStart(2, "0")}</h4>
                <ul>
                  {featured.bag.map(([name]) => (
                    <li key={name}>{name}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4>From your pantry</h4>
                <ul>
                  {featured.pantry.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </div>
            <Link to={"/menu/" + featured.slug} className="text-link">
              Read the whole card <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section price-teaser">
        <div>
          <h2>What a week costs</h2>
          <p>
            The more dinners in the box, the less each serving costs. Delivery
            is free from four recipes.
          </p>
          <Link to="/plans" className="text-link">
            Compare every plan <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="calc">
          <fieldset className="segmented">
            <legend>People</legend>
            {([2, 4] as People[]).map((p) => (
              <label key={p}>
                <input
                  type="radio"
                  name="home-people"
                  checked={people === p}
                  onChange={() => setPeople(p)}
                />
                <span>{p}</span>
              </label>
            ))}
          </fieldset>
          <fieldset className="segmented">
            <legend>Recipes a week</legend>
            {mealOptions.map((n) => (
              <label key={n}>
                <input
                  type="radio"
                  name="home-count"
                  checked={count === n}
                  onChange={() => setCount(n)}
                />
                <span>{n}</span>
              </label>
            ))}
          </fieldset>
          <p className="calc-out" aria-live="polite">
            <span className="calc-big num">{money(each)}</span> a serving
            <span className="calc-sub num">
              {money(each * people * count)} a week for {people * count} dinners
            </span>
          </p>
        </div>
      </section>

      <section className="section quotes">
        <figure className="quote-main">
          <blockquote>
            <p>{home.quote.text}</p>
          </blockquote>
          <figcaption>
            <b>{home.quote.name}</b> · {home.quote.detail}
          </figcaption>
        </figure>
        <div className="quote-side">
          {home.quotes.map((q) => (
            <figure key={q.name}>
              <blockquote>
                <p>{q.text}</p>
              </blockquote>
              <figcaption>
                <b>{q.name}</b> · {q.detail}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="section farms">
        <img
          src={home.farms.image.src}
          alt={home.farms.image.alt}
          width={home.farms.image.w}
          height={home.farms.image.h}
          loading="lazy"
        />
        <div>
          <h2>{home.farms.title}</h2>
          <p>{home.farms.body}</p>
          <table className="farm-table">
            <caption className="visually-hidden">
              Our growers and suppliers
            </caption>
            <thead>
              <tr>
                <th scope="col">Grower</th>
                <th scope="col">Supplies</th>
                <th scope="col">Since</th>
              </tr>
            </thead>
            <tbody>
              {farms.map((f) => (
                <tr key={f.name}>
                  <th scope="row">
                    {f.name}
                    <span>{f.place}</span>
                  </th>
                  <td>{f.supplies}</td>
                  <td className="num">{f.since}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section gift-teaser">
        <GiftCardArt design="tomato" amount={80} to="Sam" from="Ana" />
        <div>
          <h2>{home.gift.title}</h2>
          <p>{home.gift.body}</p>
          <Link to="/gift-cards" className="btn">
            Choose a gift card
          </Link>
        </div>
      </section>

      <section className="section faq-section narrow">
        <h2>{home.faqTitle}</h2>
        <Faq items={faqs.slice(0, 4)} />
        <Link to="/how-it-works" className="text-link">
          More on how it works <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </section>

      <section className="close">
        <img
          src={home.close.image.src}
          alt=""
          width={home.close.image.w}
          height={home.close.image.h}
          loading="lazy"
        />
        <div className="close-card">
          <h2>{home.close.title}</h2>
          <p>{home.close.body}</p>
          <p className="close-clock">
            <b className="num">{timeLeft(now)}</b> left · first delivery from{" "}
            {shortDate(deliveryDates(now).Mon)}
          </p>
          <Link to="/plans" className="btn btn-big">
            Build your box <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
