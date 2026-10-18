import { ArrowRight, Clock } from "lucide-react";
import { Link } from "../router";
import {
  aisles,
  growers,
  home,
  products,
  recipes,
  testimonials,
} from "../content";
import { ProductCard } from "../components/Shelf";
import { SlotBoard } from "../components/SlotBoard";
import { money } from "../lib/cart";
import { cutoffLabel, dayLabel, nextOpenSlot } from "../lib/slots";

export function Home() {
  const next = nextOpenSlot();
  const thisWeek = products
    .filter((p) => p.tags.includes("In season"))
    .sort((a, b) => a.rank - b.rank)
    .slice(0, 8);
  const [feature, ...moreRecipes] = recipes;

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <h1>{home.hero.title}</h1>
          <p className="lede">{home.hero.text}</p>
          <div className="actions">
            <Link to="/aisles" className="btn btn-lg">
              Start your basket <ArrowRight size={20} aria-hidden="true" />
            </Link>
            <Link to="/delivery" className="btn btn-ghost btn-lg">
              See delivery slots
            </Link>
          </div>
        </div>
        <figure className="hero-media">
          <img {...home.hero.photo} fetchPriority="high" />
          {next && (
            <Link to="/delivery" className="hero-tag">
              <span>Next slot</span>
              <strong>{dayLabel(next.date)}</strong>
              <span>
                {next.window.label} · {money(next.fee)}
              </span>
            </Link>
          )}
        </figure>
      </section>

      <section className="section week">
        <div className="section-head">
          <h2>{home.week.title}</h2>
          <p>{home.week.text}</p>
          <Link to="/aisles" className="text-link">
            All {products.length} items{" "}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="product-grid">
          {thisWeek.map((p, i) => (
            <ProductCard product={p} key={p.id} eager={i < 4} />
          ))}
        </div>
      </section>

      <section className="section aisle-index">
        <h2>{home.aisles.title}</h2>
        <ul className="aisle-rows">
          {aisles.map((a) => {
            const items = products.filter((p) => p.aisle === a.id);
            return (
              <li key={a.id}>
                <Link
                  to={"/aisles/" + a.id}
                  className="aisle-row"
                  data-tone={a.id}
                >
                  <span className="aisle-name">{a.name}</span>
                  <span className="aisle-blurb">{a.blurb}</span>
                  <span className="aisle-count">{items.length} items</span>
                  <img
                    src={items[0].photo.src}
                    alt=""
                    width={items[0].photo.width}
                    height={items[0].photo.height}
                    loading="lazy"
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="section slots-teaser">
        <div className="section-head">
          <h2>{home.slots.title}</h2>
          <p>{home.slots.text}</p>
          <Link to="/delivery" className="text-link">
            Zones, fees and the full week{" "}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <SlotBoard days={4} legend="Delivery slot, next four days" />
      </section>

      <section className="section recipe-feature">
        <Link to={"/recipes/" + feature.slug} className="feature-media">
          <img {...feature.photo} loading="lazy" />
        </Link>
        <div className="feature-copy">
          <h2>{home.recipe.title}</h2>
          <p>{home.recipe.text}</p>
          <h3>
            <Link to={"/recipes/" + feature.slug}>{feature.name}</Link>
          </h3>
          <p className="meta">
            <Clock size={16} aria-hidden="true" /> {feature.minutes} min ·
            serves {feature.serves} ·{" "}
            {feature.ingredients.filter((i) => i.product).length} items from our
            shelves
          </p>
          <ul className="more-recipes">
            {moreRecipes.slice(0, 4).map((r) => (
              <li key={r.slug}>
                <Link to={"/recipes/" + r.slug}>
                  <span>{r.name}</span>
                  <span className="meta">{r.minutes} min</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section growers">
        <div className="section-head">
          <h2>{home.growers.title}</h2>
          <p>{home.growers.text}</p>
        </div>
        <table className="ledger">
          <caption className="visually-hidden">
            Our suppliers, nearest first
          </caption>
          <thead>
            <tr>
              <th scope="col">Supplier</th>
              <th scope="col">What they bring</th>
              <th scope="col">Distance</th>
              <th scope="col">With us since</th>
            </tr>
          </thead>
          <tbody>
            {growers.map((g) => (
              <tr key={g.name}>
                <th scope="row">{g.name}</th>
                <td>{g.grows}</td>
                <td className="num">{g.miles}</td>
                <td className="num">{g.since}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="story-band">
        <img {...home.story.photo} loading="lazy" />
        <div>
          <h2>{home.story.title}</h2>
          <p>{home.story.text}</p>
          <Link to="/about" className="text-link">
            Read our story <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="section voices" aria-labelledby="voices-title">
        <h2 id="voices-title">From the round</h2>
        <ul>
          {testimonials.map((t) => (
            <li key={t.name}>
              <blockquote>
                <p>{t.quote}</p>
              </blockquote>
              <p className="meta">
                {t.name}, {t.where}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="close-band">
        <h2>{home.close.title}</h2>
        <p>{home.close.text}</p>
        {next && (
          <p className="close-next">
            Next open slot:{" "}
            <strong>
              {dayLabel(next.date)}, {next.window.label}
            </strong>
            , open until {cutoffLabel(next)}.
          </p>
        )}
        <Link to="/aisles" className="btn btn-ink btn-lg">
          Start your basket <ArrowRight size={20} aria-hidden="true" />
        </Link>
      </section>
    </>
  );
}
