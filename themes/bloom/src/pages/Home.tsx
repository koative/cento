import { ArrowRight, Clock } from "lucide-react";
import { Link } from "../router";
import {
  about,
  builder,
  frequencies,
  home,
  images,
  plans,
  posts,
  products,
  stems,
  testimonials,
  weddings,
  wraps,
  zones,
} from "../content";
import { ProductCard } from "../components/ProductCard";
import { Bouquet } from "../components/Bouquet";
import { PostCard } from "./Journal";
import { money } from "../lib/cart";
import { cutoffMessage, useNow } from "../lib/delivery";

export function Home() {
  const now = useNow();
  const featured = [...products]
    .sort((a, b) => a.featured - b.featured)
    .slice(0, 4);
  const preset = builder.presets[0];
  const weekly = frequencies[0];

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <h1>{home.headline}</h1>
          <p className="lead">{home.sub}</p>
          <div className="actions">
            <Link to="/shop" className="btn">
              Shop today's flowers
            </Link>
            <Link to="/builder" className="btn btn-ghost">
              Build your own
            </Link>
          </div>
          <p className="cutoff">
            <Clock size={18} aria-hidden="true" />
            {cutoffMessage(now)}
          </p>
        </div>
        <figure className="hero-img">
          <img
            src={images.tulips.src}
            alt={images.tulips.alt}
            width={images.tulips.w}
            height={images.tulips.h}
          />
          <figcaption>
            <Link to="/shop/the-daydream">The Daydream</Link>, double tulips,
            from {money(products[0].sizes[0].price)}
          </figcaption>
        </figure>
      </section>

      <section className="section" aria-labelledby="today">
        <div className="section-head">
          <h2 id="today">Today's bouquets</h2>
          <Link to="/shop" className="text-link">
            All flowers <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="product-grid">
          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} eager={i < 2} />
          ))}
        </div>
      </section>

      <section
        className="builder-teaser surface-tissue"
        aria-labelledby="build"
      >
        <Bouquet
          counts={preset.counts}
          wrap={wraps[0].colour}
          label={`Top-down sketch of a hand-tied bouquet: ${preset.label.toLowerCase()}`}
          className="teaser-bouquet"
        />
        <div className="builder-teaser-copy">
          <h2 id="build">Or build it stem by stem.</h2>
          <p>
            Choose from the eight varieties on our bench today, pick a wrap, and
            watch the bouquet come together in the same spiral we tie by hand.
            Stems from {money(Math.min(...stems.map((s) => s.price)))} each.
          </p>
          <ul className="chip-list" aria-label="Stems on the bench today">
            {stems.map((s) => (
              <li key={s.id}>
                <span
                  className="dot"
                  style={{ background: s.colour }}
                  aria-hidden="true"
                />
                {s.name}
              </li>
            ))}
          </ul>
          <Link to="/builder" className="btn">
            Open the bouquet builder
          </Link>
        </div>
      </section>

      <section className="section bench" aria-labelledby="bench">
        <div className="bench-intro">
          <h2 id="bench">On the bench this week</h2>
          <p>
            Bought on Monday from growers we know by name. Most travelled less
            far than you do to work.
          </p>
          <img
            src={images.peony.src}
            alt={images.peony.alt}
            width={images.peony.w}
            height={images.peony.h}
            loading="lazy"
          />
        </div>
        <table className="stem-table">
          <caption className="visually-hidden">
            Stems in this week, with grower, distance and price per stem
          </caption>
          <thead>
            <tr>
              <th scope="col">Stem</th>
              <th scope="col">Grower</th>
              <th scope="col" className="num">
                Miles
              </th>
              <th scope="col" className="num">
                Per stem
              </th>
            </tr>
          </thead>
          <tbody>
            {stems.map((s) => (
              <tr key={s.id}>
                <th scope="row">
                  {s.name} <span className="variety">{s.variety}</span>
                </th>
                <td>{s.from}</td>
                <td className="num">
                  {about.growers.find((g) => g.name === s.from)?.miles}
                </td>
                <td className="num">{money(s.price)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="believe" aria-labelledby="believe">
        <img
          src={images.iris.src}
          alt={images.iris.alt}
          width={images.iris.w}
          height={images.iris.h}
          loading="lazy"
        />
        <div>
          <h2 id="believe">{home.believe}</h2>
          <p>{home.believeSub}</p>
          <Link to="/about" className="text-link">
            Meet the studio <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="section subs-band" aria-labelledby="subs">
        <img
          src={images.marketTulips.src}
          alt={images.marketTulips.alt}
          width={images.marketTulips.w}
          height={images.marketTulips.h}
          loading="lazy"
        />
        <div>
          <h2 id="subs">Thursday flowers, without thinking about it.</h2>
          <ul className="plan-lines">
            {plans.map((p) => (
              <li key={p.id}>
                <span className="plan-name">{p.name}</span>
                <span className="plan-stems">{p.stems}</span>
                <span className="plan-price">
                  {money(Math.round(p.price * (1 - weekly.discount)))}
                  <small> weekly</small>
                </span>
              </li>
            ))}
          </ul>
          <p>
            Weekly, fortnightly or monthly. Skip, pause or cancel from one
            email.
          </p>
          <Link to="/subscriptions" className="btn">
            Choose a subscription
          </Link>
        </div>
      </section>

      <section className="weddings-band" aria-labelledby="weddings">
        <div className="weddings-band-copy">
          <h2 id="weddings">
            Weddings, long tables and the occasional four-metre tower.
          </h2>
          <p>{weddings.intro}</p>
          <Link to="/weddings" className="btn btn-light">
            Weddings &amp; events
          </Link>
        </div>
        <img
          className="wb-a"
          src={images.bride.src}
          alt={images.bride.alt}
          width={images.bride.w}
          height={images.bride.h}
          loading="lazy"
        />
        <img
          className="wb-b"
          src={images.installation.src}
          alt={images.installation.alt}
          width={images.installation.w}
          height={images.installation.h}
          loading="lazy"
        />
      </section>

      <section className="section delivery-band" aria-labelledby="delivery">
        <div>
          <h2 id="delivery">Delivered by Agnes, our van.</h2>
          <p className="cutoff">
            <Clock size={18} aria-hidden="true" />
            {cutoffMessage(now)}
          </p>
        </div>
        <dl className="zone-list">
          {zones.map((z) => (
            <div key={z.id}>
              <dt>{z.name}</dt>
              <dd>{z.areas}</dd>
              <dd className="zone-fee">
                {money(z.fee)} · {z.sameDay ? "same day" : "next day"}
              </dd>
            </div>
          ))}
        </dl>
        <Link to="/delivery" className="text-link">
          Check your postcode <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </section>

      <section
        className="section quotes surface-tissue"
        aria-labelledby="kind-words"
      >
        <h2 id="kind-words">Kind words, kept by the till</h2>
        <div className="quote-row">
          {testimonials.map((t) => (
            <figure key={t.name}>
              <blockquote>
                <p>{t.quote}</p>
              </blockquote>
              <figcaption>
                {t.name}
                <span>{t.context}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="journal">
        <div className="section-head">
          <h2 id="journal">From the journal</h2>
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

      <section className="close" aria-labelledby="close">
        <h2 id="close">{home.close}</h2>
        <div className="actions">
          <Link to="/shop" className="btn">
            Send flowers today
          </Link>
          <Link to="/subscriptions" className="btn btn-ghost">
            Or every Thursday
          </Link>
        </div>
      </section>
    </>
  );
}
