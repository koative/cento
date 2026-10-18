import { useState } from "react";
import { ArrowRight, Moon, Star, Sun } from "lucide-react";
import { Link } from "../router";
import {
  home,
  ingredients,
  posts,
  products,
  reviews,
  steps,
  type Time,
} from "../content";
import { money } from "../lib/cart";
import { buildRitual, ritualSeconds } from "../lib/ritual";
import { Vessel } from "../components/Vessel";
import { ProductCard } from "../components/ProductCard";
import { Strata } from "../components/Strata";
import { PostCard } from "./Journal";

const byId = (id: string) => products.find((p) => p.id === id)!;

export function Home() {
  const [time, setTime] = useState<Time>("am");
  const ritual = buildRitual(
    { time, skin: "combination", focus: "hydration", minutes: 5 },
    {},
  );
  const spotlight = ingredients.find((g) => g.slug === home.ingredient.slug)!;
  const best = [...products].sort((a, b) => a.rank - b.rank).slice(0, 4);
  const [lead, ...more] = reviews.filter((r) =>
    ["dew-facial-oil", "soft-seal-cream", "daylight-veil-spf30"].includes(
      r.product,
    ),
  );

  return (
    <>
      <section className="hero">
        <div className="hero-text">
          <h1>
            {home.hero.title[0]}
            <br />
            <em>{home.hero.title[1]}</em>
          </h1>
          <p className="lede">{home.hero.text}</p>
          <div className="actions">
            <Link to="/shop" className="btn">
              Shop the essentials <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link to="/ritual" className="btn btn-ghost">
              Build your ritual
            </Link>
          </div>
          <ul className="hero-picks" aria-label="Most loved">
            {home.hero.picks.map((id) => {
              const p = byId(id);
              return (
                <li key={id}>
                  <Link to={"/shop/" + id}>
                    <span className={"tile tile-" + p.tile}>
                      <Vessel product={p} />
                    </span>
                    <span className="pick-name">{p.name}</span>
                    <span className="price">{money(p.sizes[0].price)}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <figure className="hero-photo">
          <img
            src={home.hero.image}
            alt={home.hero.alt}
            width={1400}
            height={2100}
            fetchPriority="high"
          />
          <figcaption>{home.hero.caption}</figcaption>
        </figure>
      </section>

      <section className="home-ritual" data-time={time}>
        <div className="home-ritual-text">
          <h2>{home.ritual.title}</h2>
          <p>{home.ritual.text}</p>
          <div className="segmented" role="group" aria-label="Time of day">
            <button
              type="button"
              aria-pressed={time === "am"}
              onClick={() => setTime("am")}
            >
              <Sun size={18} aria-hidden="true" /> Morning
            </button>
            <button
              type="button"
              aria-pressed={time === "pm"}
              onClick={() => setTime("pm")}
            >
              <Moon size={18} aria-hidden="true" /> Evening
            </button>
          </div>
          <p className="ritual-sum" aria-live="polite">
            A {time === "am" ? "morning" : "evening"} ritual for combination
            skin: {ritual.length} layers,{" "}
            {Math.round(ritualSeconds(ritual) / 60)} minutes.
          </p>
          <Link to="/ritual" className="btn">
            Build yours <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <Strata ritual={ritual} key={time} />
      </section>

      <section className="section">
        <div className="section-head">
          <h2>{home.bestsellers.title}</h2>
          <p>{home.bestsellers.text}</p>
          <Link to="/shop" className="text-link">
            All twelve essentials <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="product-grid">
          {best.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="section step-index">
        <div className="section-head">
          <h2>{home.steps.title}</h2>
          <p>{home.steps.text}</p>
        </div>
        <ol>
          {steps.map((s) => {
            const n = products.filter((p) => p.step === s.id).length;
            return (
              <li key={s.id}>
                <Link to={"/shop?step=" + s.id}>
                  <span className="step-name">{s.label}</span>
                  <span className="step-note">{s.note}</span>
                  <span className="step-count">
                    {n} {n === 1 ? "product" : "products"}
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="spotlight">
        <figure>
          <img
            src={spotlight.image}
            alt={spotlight.alt}
            width={1400}
            height={973}
            loading="lazy"
          />
          <figcaption>
            {spotlight.name}, {spotlight.origin.toLowerCase()}
          </figcaption>
        </figure>
        <div className="spotlight-text">
          <h2>{home.ingredient.title}</h2>
          <p>{home.ingredient.text}</p>
          <ul className="ing-cloud">
            {ingredients.map((g) => (
              <li key={g.slug}>
                <Link to={"/ingredients/" + g.slug}>{g.name}</Link>
              </li>
            ))}
          </ul>
          <Link to="/ingredients" className="text-link">
            Open the glossary <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="philosophy">
        <svg className="halo" viewBox="0 0 200 200" aria-hidden="true">
          <circle
            cx="100"
            cy="100"
            r="96"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            opacity=".35"
          />
          <circle
            cx="100"
            cy="100"
            r="74"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            opacity=".55"
          />
          <circle
            cx="100"
            cy="100"
            r="52"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
          />
          <circle cx="100" cy="100" r="24" fill="var(--berry)" />
        </svg>
        <div>
          <h2>{home.philosophy.title}</h2>
          <p>{home.philosophy.text}</p>
          <Link to="/about" className="text-link">
            Read our story <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="section voices" aria-labelledby="voices-h">
        <h2 id="voices-h" className="visually-hidden">
          What customers say
        </h2>
        <figure className="voice-lead">
          <blockquote>“{lead.text}”</blockquote>
          <figcaption>
            {lead.name}, {lead.skin.toLowerCase()} skin ·{" "}
            <Link to={"/shop/" + lead.product}>{byId(lead.product).name}</Link>
          </figcaption>
        </figure>
        <div className="voice-more">
          {more.map((r) => (
            <figure key={r.name}>
              <p className="stars" aria-label={`${r.rating} out of 5`}>
                {Array.from({ length: r.rating }, (_, i) => (
                  <Star key={i} size={14} aria-hidden="true" />
                ))}
              </p>
              <blockquote>“{r.text}”</blockquote>
              <figcaption>
                {r.name} ·{" "}
                <Link to={"/shop/" + r.product}>{byId(r.product).name}</Link>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>From the journal</h2>
          <Link to="/journal" className="text-link">
            All stories <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="post-grid">
          {posts.slice(0, 3).map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </section>

      <section className="promises" aria-label="Our promises">
        {home.promises.map((p) => (
          <div key={p.title}>
            <h3>{p.title}</h3>
            <p>{p.text}</p>
          </div>
        ))}
      </section>

      <section className="close">
        <h2>{home.close.title}</h2>
        <p>{home.close.text}</p>
        <Link to="/ritual" className="btn btn-light">
          Start the ritual builder <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </section>
    </>
  );
}
