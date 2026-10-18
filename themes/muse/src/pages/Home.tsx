import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import {
  brand,
  categories,
  collection,
  home,
  looks,
  lookPath,
  posts,
  products,
  stores,
} from "../content";
import { money } from "../lib/cart";
import { storeStatus } from "../lib/hours";
import { ProductCard } from "../components/ProductCard";

const byId = (id: string) => products.find((p) => p.id === id)!;

export function Home() {
  const [lead, ...rest] = posts.slice(0, 3);
  return (
    <div className="page home">
      <section className="hero" aria-labelledby="hero-title">
        <figure className="hero-media">
          <img src={home.heroImage} alt={home.heroAlt} fetchPriority="high" />
          <figcaption>
            <Link to={lookPath(2)}>Look 02 · 06:40 · {looks[1].title}</Link>
          </figcaption>
        </figure>
        <div className="hero-copy">
          <h1 id="hero-title" className="display">
            The <em>Quiet</em> Hours
          </h1>
          <p className="lede">{home.heroLine}</p>
          <div className="actions">
            <Link to="/shop" className="btn btn-ink">
              Shop the collection
            </Link>
            <Link to="/collection" className="btn btn-line">
              See the ten looks
            </Link>
          </div>
          <ul className="hero-picks" aria-label="In the shop now">
            {home.heroPicks.map(byId).map((p) => (
              <li key={p.id}>
                <Link to={`/shop/${p.id}`}>
                  <img src={p.images[0]} alt="" width={56} height={70} />
                  <span className="pick-name">{p.name}</span>
                  <span className="pick-blurb">{p.blurb}</span>
                  <span className="price">{money(p.price)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section new-in" aria-labelledby="new-in-title">
        <div className="section-head">
          <h2 id="new-in-title">New in the shop</h2>
          <Link to="/shop" className="text-link">
            Shop all {products.length} pieces{" "}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="product-grid four">
          {home.newIn.map(byId).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section
        className="section filmstrip-section"
        aria-labelledby="looks-title"
      >
        <div className="section-head">
          <h2 id="looks-title">Ten looks, one day</h2>
          <p>{collection.intro}</p>
        </div>
        <ol className="filmstrip">
          {looks.map((l) => (
            <li key={l.n}>
              <Link to={lookPath(l.n)}>
                <img src={l.image} alt={l.alt} loading="lazy" />
                <span className="film-hour">{l.hour}</span>
                <span className="film-title">
                  Look {String(l.n).padStart(2, "0")}, {l.title}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="statement" aria-label="Our approach">
        <p>{home.statement}</p>
      </section>

      <section className="section split" aria-labelledby="coat-title">
        <img
          src={home.coat.image}
          alt={home.coat.alt}
          loading="lazy"
          className="split-media"
        />
        <div className="split-copy">
          <h2 id="coat-title">{home.coat.title}</h2>
          <p>{home.coat.text}</p>
          <div className="actions">
            <Link to="/shop/hours-coat" className="btn btn-ink">
              The Hours Coat, {money(byId("hours-coat").price)}
            </Link>
            <Link to="/journal/forty-hours-in-a-coat" className="text-link">
              Read how it is made <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section index-section" aria-labelledby="index-title">
        <h2 id="index-title">Shop by piece</h2>
        <ul className="category-index">
          {categories.map((c) => {
            const n = products.filter((p) => p.category === c.id).length;
            return (
              <li key={c.id}>
                <a href={`#/shop?c=${c.id}`}>
                  <span className="cat-name">{c.label}</span>
                  <span className="cat-line">{c.line}</span>
                  <span className="cat-count">
                    {n} {n === 1 ? "piece" : "pieces"}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="atelier-band" aria-labelledby="atelier-title">
        <img src={home.atelier.image} alt={home.atelier.alt} loading="lazy" />
        <div>
          <h2 id="atelier-title">{home.atelier.title}</h2>
          <p>{home.atelier.text}</p>
          <Link to="/house" className="btn btn-paper">
            Inside the house
          </Link>
        </div>
      </section>

      <section
        className="section journal-teaser"
        aria-labelledby="journal-title"
      >
        <div className="section-head">
          <h2 id="journal-title">From the journal</h2>
          <Link to="/journal" className="text-link">
            All entries <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="journal-teaser-grid">
          <article className="post-lead">
            <Link to={`/journal/${lead.slug}`}>
              <img src={lead.image} alt={lead.alt} loading="lazy" />
              <h3>{lead.title}</h3>
            </Link>
            <p>{lead.dek}</p>
          </article>
          {rest.map((p) => (
            <article key={p.slug} className="post-small">
              <Link to={`/journal/${p.slug}`}>
                <img src={p.image} alt={p.alt} loading="lazy" />
                <h3>{p.title}</h3>
              </Link>
              <p>{p.dek}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section close" aria-labelledby="close-title">
        <h2 id="close-title">Come and try it on</h2>
        <ul className="close-stores">
          {stores.map((s) => {
            const status = storeStatus(s);
            return (
              <li key={s.id}>
                <Link to="/stores">
                  <span className="close-city">{s.city}</span>
                  <span>{s.address[0]}</span>
                  <span
                    className="close-status"
                    data-open={status.open || undefined}
                  >
                    {status.line}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        <dl className="promises">
          {home.service.map((s) => (
            <div key={s.title}>
              <dt>{s.title}</dt>
              <dd>{s.text}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
