import { ArrowRight, Clock, MapPin } from "lucide-react";
import { Link, navigate } from "../router";
import {
  brand,
  categories,
  days,
  home,
  hours,
  looks,
  products,
  services,
  stylists,
  visit,
} from "../content";
import { fromPrice, hoursLabel, money, openStatus } from "../lib/plan";
import { startVisit } from "../lib/visit";
import { ChairTimeline } from "../components/ChairTimeline";
import { ShadeChart } from "../components/ShadeChart";
import { LookTile, ProductItem, StylistTile } from "../components/Tiles";

export function Home() {
  const hero = looks[0];
  const status = openStatus();
  const byId = (id: string) => services.find((s) => s.id === id)!;

  return (
    <>
      <section className="hero wrap">
        <div className="hero-copy">
          <h1>{home.title}</h1>
          <p className="lede">{home.lede}</p>
          <div className="actions">
            <Link to="/book" className="btn btn-primary btn-large">
              Book a chair
            </Link>
            <Link to="/services" className="btn btn-ghost btn-large">
              See services & prices
            </Link>
          </div>
          <ul className="from-prices">
            {home.fromPrices.map((f) => (
              <li key={f.label}>
                <span>{f.label}</span>
                <strong className="num">
                  from {money(fromPrice(byId(f.service)))}
                </strong>
              </li>
            ))}
          </ul>
          <p className="open-status" data-open={status.open ? "" : undefined}>
            <Clock aria-hidden="true" size={16} />
            {status.label} · {brand.address[0]}
          </p>
        </div>
        <figure className="hero-figure">
          <img
            src={hero.photo.src}
            alt={hero.photo.alt}
            width={hero.photo.w}
            height={hero.photo.h}
            fetchPriority="high"
          />
          <figcaption>
            <Link to={`/lookbook/${hero.id}`}>
              {hero.name}
              <span>
                by {stylists.find((s) => s.id === hero.stylist)?.name}
              </span>
            </Link>
          </figcaption>
        </figure>
      </section>

      <section className="menu-short wrap" aria-labelledby="menu-short-h">
        <div className="section-head">
          <h2 id="menu-short-h">{home.menuTitle}</h2>
          <p>{home.menuLede}</p>
        </div>
        <div className="menu-columns">
          {categories.map((c) => (
            <div key={c.id} className="menu-col">
              <h3>{c.name}</h3>
              <ul>
                {services
                  .filter((s) => s.category === c.id)
                  .slice(0, 4)
                  .map((s) => (
                    <li key={s.id}>
                      <span>{s.name}</span>
                      <span className="dots" aria-hidden="true" />
                      <span className="num">
                        {fromPrice(s) ? `from ${money(fromPrice(s))}` : "Free"}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
        <Link to="/services" className="text-link">
          The full menu, with every step and minute{" "}
          <ArrowRight aria-hidden="true" size={18} />
        </Link>
      </section>

      <section className="recent wrap" aria-labelledby="recent-h">
        <div className="section-head row">
          <h2 id="recent-h">{home.lookTitle}</h2>
          <Link to="/lookbook" className="text-link">
            Whole lookbook <ArrowRight aria-hidden="true" size={18} />
          </Link>
        </div>
        <div className="look-row">
          {looks.slice(1, 5).map((l) => (
            <LookTile key={l.id} look={l} />
          ))}
        </div>
      </section>

      <section className="band band-wine" aria-labelledby="levels-h">
        <div className="wrap levels">
          <div>
            <h2 id="levels-h">{home.levelsTitle}</h2>
            <p>{home.levelsBody}</p>
          </div>
          <ShadeChart />
        </div>
      </section>

      <section className="plan-teaser wrap" aria-labelledby="plan-h">
        <div className="plan-copy">
          <h2 id="plan-h">{home.planTitle}</h2>
          <p>{home.planBody}</p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              startVisit(home.planExample);
              navigate("/book");
            }}
          >
            Start with this plan
          </button>
          <Link to="/book" className="text-link">
            Or build your own
          </Link>
        </div>
        <div className="plan-card">
          <p className="plan-card-title">{home.planCaption}</p>
          <ChairTimeline ids={home.planExample} level="senior" start={600} />
        </div>
      </section>

      <section className="team wrap" aria-labelledby="team-h">
        <div className="section-head row">
          <h2 id="team-h">Six stylists, one formula book</h2>
          <Link to="/stylists" className="text-link">
            Meet them <ArrowRight aria-hidden="true" size={18} />
          </Link>
        </div>
        <div className="stylist-grid">
          {stylists.map((s) => (
            <StylistTile key={s.id} stylist={s} />
          ))}
        </div>
      </section>

      <figure className="big-quote wrap">
        <blockquote>
          <p>{home.quote.text}</p>
        </blockquote>
        <figcaption>{home.quote.by}</figcaption>
      </figure>

      <section className="shelf wrap" aria-labelledby="shelf-h">
        <div className="section-head row">
          <div>
            <h2 id="shelf-h">{home.shelfTitle}</h2>
            <p>{home.shelfBody}</p>
          </div>
          <Link to="/products" className="text-link">
            All eight <ArrowRight aria-hidden="true" size={18} />
          </Link>
        </div>
        <div className="product-grid">
          {products.slice(0, 4).map((p) => (
            <ProductItem key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="visit-strip" aria-labelledby="visit-h">
        <img
          src={visit.photo.src}
          alt={visit.photo.alt}
          width={visit.photo.w}
          height={visit.photo.h}
          loading="lazy"
        />
        <div className="visit-card">
          <h2 id="visit-h">Linden Avenue, three chairs from the window</h2>
          <p className="with-icon">
            <MapPin aria-hidden="true" size={18} />
            {brand.address.join(", ")}
          </p>
          <dl className="hours-mini">
            {[2, 3, 4, 5, 6, 0].map((d) => (
              <div key={d}>
                <dt>{days[d]}</dt>
                <dd className="num">{hoursLabel(hours[d])}</dd>
              </div>
            ))}
          </dl>
          <p className="muted">Closed Mondays for training.</p>
          <Link to="/visit" className="text-link">
            Directions & policies <ArrowRight aria-hidden="true" size={18} />
          </Link>
        </div>
      </section>

      <section className="close band band-wine" aria-labelledby="close-h">
        <div className="wrap close-inner">
          <h2 id="close-h">{home.closeTitle}</h2>
          <p>{home.closeBody}</p>
          <div className="actions">
            <Link to="/book" className="btn btn-light btn-large">
              Book online
            </Link>
            <a
              href={brand.phoneHref}
              className="btn btn-outline-light btn-large"
            >
              Call {brand.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
