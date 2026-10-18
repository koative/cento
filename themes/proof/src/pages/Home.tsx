import { ArrowRight } from "lucide-react";
import {
  bakes,
  brand,
  classes,
  home,
  hours,
  images,
  products,
  wholesale,
} from "../content";
import { Link } from "../router";
import { ProductCard } from "../components/ProductCard";
import { money } from "../lib/cart";
import {
  bakeState,
  bakeStateLabel,
  clock,
  dayLabel,
  fromIso,
  minutesNow,
  openState,
} from "../lib/time";

export function Home() {
  const now = minutesNow();
  const status = openState();
  const featured = [...products].sort((a, b) => a.rank - b.rank).slice(0, 4);
  const upcoming = classes
    .flatMap((c) => c.sessions.map((s) => ({ c, s })))
    .sort((a, b) => a.s.date.localeCompare(b.s.date))
    .slice(0, 5);
  const today = hours[new Date().getDay()];

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <h1>{home.title}</h1>
          <p className="lede">{home.lede}</p>
          <div className="actions">
            <Link to="/shop" className="btn">
              Order for tomorrow <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link to="/today" className="btn btn-ghost">
              What's in the oven
            </Link>
          </div>
        </div>
        <figure className="hero-figure">
          <img
            src={images.loaves}
            alt="Seeded rye, country sourdough and a five-seed loaf on a floury board"
            width={1300}
            height={865}
          />
          <figcaption>
            <span>First loaves out</span>
            <span>{clock(bakes[0].out)}</span>
          </figcaption>
        </figure>
      </section>

      <section className="letterboard" aria-labelledby="lb-title">
        <div className="letterboard-head">
          <h2 id="lb-title">Out of the oven today</h2>
          <p>
            {status.open
              ? "Live from the bakehouse clock."
              : "Times from a typical morning. " + status.text + "."}
          </p>
        </div>
        <ol className="letterboard-list">
          {bakes.map((b) => {
            const state = status.open ? bakeState(b, now) : "later";
            return (
              <li key={b.name + b.out} data-state={state}>
                <span className="lb-time">{clock(b.out)}</span>
                <span className="lb-name">{b.name}</span>
                {status.open && state !== "later" && (
                  <span className="lb-state">{bakeStateLabel[state]}</span>
                )}
              </li>
            );
          })}
        </ol>
        <Link to="/today" className="text-link">
          Scrub through the day on the oven board{" "}
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </section>

      <section className="section" aria-labelledby="order-title">
        <div className="section-head">
          <h2 id="order-title">Order ahead, skip the queue</h2>
          <p>
            Reserve tonight, collect from seven. Bags wait on the named shelf at
            the side window.
          </p>
          <Link to="/shop" className="text-link">
            All {products.length} things we bake to order{" "}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="product-grid">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="method">
        <img
          src={images.starter}
          alt="Looking down into a jar of bubbling sourdough starter"
          width={1500}
          height={1000}
          loading="lazy"
        />
        <div className="method-copy">
          <h2>{home.method.title}</h2>
          <p>{home.method.body}</p>
          <Link to="/about" className="text-link">
            How we bake <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="section pickup-steps" aria-labelledby="pickup-title">
        <h2 id="pickup-title">How order-ahead works</h2>
        <ol>
          {home.pickup.map((s) => (
            <li key={s.title}>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section
        className="section classes-teaser"
        aria-labelledby="classes-title"
      >
        <div className="section-head">
          <h2 id="classes-title">Upstairs in the classroom</h2>
          <p>
            Eight benches, one teaching oven, and whatever you made to take
            home.
          </p>
          <Link to="/classes" className="text-link">
            All classes <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <ul className="session-list">
          {upcoming.map(({ c, s }) => (
            <li key={c.id + s.date}>
              <span className="session-date">{dayLabel(fromIso(s.date))}</span>
              <Link to={`/classes/${c.id}`}>{c.name}</Link>
              <span className="session-meta">
                {s.left === 0 ? "Full — waitlist" : `${s.left} seats left`}
              </span>
              <span className="session-price">{money(c.price)}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="trade-band" aria-labelledby="trade-title">
        <img
          src={images.rolls}
          alt="Trays of golden rolls fresh out of the oven"
          width={1500}
          height={1003}
          loading="lazy"
        />
        <div>
          <h2 id="trade-title">Bread for your café, before you open.</h2>
          <p>{wholesale.lede}</p>
          <Link to="/wholesale" className="btn btn-light">
            Wholesale price list <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <figure className="quote">
        <blockquote>
          <p>{home.quote.text}</p>
        </blockquote>
        <figcaption>
          {home.quote.name} <span>{home.quote.detail}</span>
        </figcaption>
      </figure>

      <section className="visit-close" aria-labelledby="visit-title">
        <img
          src={images.counter}
          alt="The bakery counter: trays of buns, quiches and croissants under glass, loaves on the shelves behind"
          width={1500}
          height={1125}
          loading="lazy"
        />
        <div>
          <h2 id="visit-title">Come by the counter.</h2>
          <p className="visit-today">
            {today.open === null || today.close === null
              ? "Closed today — we rest on Mondays."
              : `Today ${clock(today.open)} – ${clock(today.close)}`}
          </p>
          <address>
            {brand.address.join(", ")}
            <br />
            <a href={brand.phoneHref}>{brand.phone}</a>
          </address>
          <div className="actions">
            <Link to="/shop" className="btn">
              Order for tomorrow
            </Link>
            <Link to="/visit" className="btn btn-ghost">
              Hours & directions
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
