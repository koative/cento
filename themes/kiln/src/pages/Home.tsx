import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import {
  brand,
  firing,
  glazes,
  home,
  posts,
  products,
  studio,
  workshops,
  type GlazeId,
} from "../content";
import { ProductCard } from "../components/ProductCard";
import { GlazeTile, Vessel } from "../components/Ceramics";
import { PostCard } from "./Journal";
import { money } from "../lib/cart";

const upcoming = workshops
  .flatMap((w) => w.sessions.filter((s) => s.left > 0).map((s) => ({ w, s })))
  .sort((a, b) => a.s.date.localeCompare(b.s.date))
  .slice(0, 6);

export function Home() {
  const [glaze, setGlaze] = useState<GlazeId>("tide");
  const picked = glazes.find((g) => g.id === glaze)!;
  const featured = home.featured.map((id) =>
    products.find((p) => p.id === id)!,
  );

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <h1>{home.title}</h1>
          <p className="lead">{home.intro}</p>
          <div className="actions">
            <Link to="/shop" className="btn">
              Shop the shelf <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link to="/workshops" className="btn btn-ghost">
              Book a wheel class
            </Link>
          </div>
        </div>
        <figure className="hero-figure">
          <img
            src={home.hero.src}
            alt={home.hero.alt}
            width={home.hero.w}
            height={home.hero.h}
            fetchPriority="high"
          />
          <figcaption>{home.heroCaption}</figcaption>
        </figure>
      </section>

      <section className="section shelf" aria-labelledby="shelf-title">
        <div className="section-head">
          <h2 id="shelf-title">New from the kiln</h2>
          <Link to="/shop" className="text-link">
            All {products.length} objects{" "}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="object-grid">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="band bench-teaser" aria-labelledby="bench-title">
        <div className="bench-teaser-copy">
          <h2 id="bench-title">{home.bench.title}</h2>
          <p>{home.bench.text}</p>
          <p className="bench-teaser-live" aria-live="polite">
            <strong>{picked.name}</strong> · {picked.surface}. {picked.note}
          </p>
          <Link to="/glazes" className="btn btn-light">
            Open the glaze bench <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <div className="tile-rack" role="group" aria-label="Test tiles">
          {glazes.map((g) => (
            <button
              key={g.id}
              type="button"
              aria-pressed={g.id === glaze}
              onClick={() => setGlaze(g.id)}
            >
              <GlazeTile glaze={g.id} clay="speckled" />
              <span>{g.name}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="section firing" aria-labelledby="firing-title">
        <div className="firing-intro">
          <h2 id="firing-title">{home.firing.title}</h2>
          <p>{home.firing.text}</p>
          <p className="muted">{firing.madeToOrder}</p>
        </div>
        <ol className="firing-log">
          {firing.log.map((l) => (
            <li key={l.step}>
              <time>{l.date}</time>
              <strong>{l.step}</strong>
              <span>{l.detail}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="section classes" aria-labelledby="classes-title">
        <div className="classes-copy">
          <h2 id="classes-title">{home.workshops.title}</h2>
          <p>{home.workshops.text}</p>
          <img
            src={workshops[0].photo.src}
            alt={workshops[0].photo.alt}
            width={workshops[0].photo.w}
            height={workshops[0].photo.h}
            loading="lazy"
          />
        </div>
        <div className="session-table-wrap">
          <table className="session-table">
            <caption className="visually-hidden">
              Next workshop dates with places left
            </caption>
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Class</th>
                <th scope="col">Places</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              {upcoming.map(({ w, s }) => (
                <tr key={s.id}>
                  <td>
                    {s.label}
                    <span>{s.time}</span>
                  </td>
                  <td>
                    <Link to={`/workshops/${w.id}`}>{w.name}</Link>
                    <span>{w.level}</span>
                  </td>
                  <td data-low={s.left <= 3 || undefined}>{s.left} left</td>
                  <td>{money(w.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link to="/workshops" className="text-link">
            All workshops and dates <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="quiet" aria-label="From the founder">
        <img
          src={studio.photos.wide}
          alt="A potter in an apron throwing a tall vase on the wheel, shelves of finished pots behind"
          width={1800}
          height={1013}
          loading="lazy"
        />
        <blockquote>
          <p>{home.quote.text}</p>
          <footer>{home.quote.by}</footer>
        </blockquote>
      </section>

      <section className="section" aria-labelledby="journal-title">
        <div className="section-head">
          <h2 id="journal-title">From the journal</h2>
          <Link to="/journal" className="text-link">
            All entries <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="post-grid">
          {posts.slice(0, 3).map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </section>

      <section className="section visit" aria-labelledby="visit-title">
        <div>
          <h2 id="visit-title">{home.visit.title}</h2>
          <p>{home.visit.text}</p>
          <address>
            {brand.address.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </address>
          <dl className="hours">
            {brand.hours.map((h) => (
              <div key={h.days}>
                <dt>{h.days}</dt>
                <dd>{h.time}</dd>
              </div>
            ))}
          </dl>
        </div>
        <dl className="promises">
          {home.promises.map((p) => (
            <div key={p.title}>
              <dt>{p.title}</dt>
              <dd>{p.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="close" aria-labelledby="close-title">
        <Vessel
          form="jug"
          glaze="tide"
          clay="iron"
          dip={72}
          className="close-vessel"
        />
        <div>
          <h2 id="close-title">{home.close.title}</h2>
          <p>{home.close.text}</p>
          <div className="actions">
            <Link to="/shop" className="btn">
              Shop the shelf
            </Link>
            <Link to="/glazes" className="btn btn-ghost">
              Have one made
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
