import { ArrowRight, Clock, MapPin } from "lucide-react";
import { Link } from "../router";
import {
  beers,
  brand,
  events,
  home,
  hours,
  houseRules,
  images,
  products,
  tours,
} from "../content";
import { beerColor, money, openStatus } from "../lib/util";
import { Glass } from "../components/Art";
import { TapBoard } from "../components/TapBoard";
import { FlightBuilder } from "../components/FlightBuilder";
import { EventRow, ProductTile } from "../components/Tiles";
import { HoursTable } from "../components/HoursTable";

export function Home() {
  const status = openStatus(hours);
  const shelf = beers
    .filter((b) => b.tap !== null)
    .sort((a, b) => a.tap! - b.tap!);
  const seasonal = beers.find((b) => b.slug === "copper-marzen")!;
  const featured = [
    "low-water-4pack",
    "copper-marzen-4pack",
    "night-burner-2026",
    "teku-glass",
  ].map((id) => products.find((p) => p.id === id)!);

  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <h1>{home.title}</h1>
            <p className="lede">{home.intro}</p>
            <div className="actions">
              <Link to="/taproom" className="btn btn-copper btn-lg">
                See what's pouring
              </Link>
              <Link to="/tours" className="btn btn-line btn-lg">
                Book a brewery tour
              </Link>
            </div>
            <ul className="hero-facts">
              <li data-open={status.open ? "" : undefined}>
                <Clock aria-hidden="true" />
                {status.label}
              </li>
              <li>
                <MapPin aria-hidden="true" />
                {brand.street}, Riverbend
              </li>
            </ul>
          </div>
          <figure className="hero-figure">
            <img
              src={home.heroImage}
              alt="Polished copper brew kettles with tall vapour stacks in a white-tiled brewhouse"
              width={1800}
              height={1210}
            />
          </figure>
        </div>

        <div className="wrap">
          <ul className="shelf" aria-label="On tap today">
            {shelf.map((b) => (
              <li key={b.slug}>
                <Link to={`/beers/${b.slug}`} className="shelf-item">
                  <Glass
                    shape={b.glass}
                    color={beerColor(b)}
                    id={`shelf-${b.slug}`}
                  />
                  <span className="shelf-tap tnum">{b.tap}</span>
                  <span className="shelf-name">{b.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section-board" aria-labelledby="board-title">
        <div className="wrap">
          <div className="section-head">
            <h2 id="board-title">{home.boardTitle}</h2>
            <p>
              Pulled straight from the bright tanks. The board changes most
              Thursdays.
            </p>
          </div>
          <TapBoard caption="Beers on tap today" />
          <p className="board-foot">
            <Link to="/taproom" className="link-arrow">
              Taproom menu, food & growler fills{" "}
              <ArrowRight aria-hidden="true" />
            </Link>
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="flight-title">
        <div className="wrap">
          <div className="section-head">
            <h2 id="flight-title">{home.flightTitle}</h2>
            <p>{home.flightText}</p>
          </div>
          <FlightBuilder id="home" />
        </div>
      </section>

      <section
        className="section section-seasonal"
        aria-labelledby="seasonal-title"
      >
        <div className="wrap seasonal">
          <div className="seasonal-glass">
            <Glass
              shape={seasonal.glass}
              color={beerColor(seasonal)}
              id="seasonal"
              label={`${seasonal.name} in a shaker pint`}
            />
          </div>
          <div className="seasonal-copy">
            <h2 id="seasonal-title">{seasonal.name}</h2>
            <p className="tag">{seasonal.style} · the last kegs of the year</p>
            <p className="lede">{seasonal.story}</p>
            <dl className="spec-strip">
              <div>
                <dt>ABV</dt>
                <dd className="tnum">{seasonal.abv.toFixed(1)}%</dd>
              </div>
              <div>
                <dt>IBU</dt>
                <dd className="tnum">{seasonal.ibu}</dd>
              </div>
              <div>
                <dt>Colour</dt>
                <dd className="tnum">{seasonal.srm} SRM</dd>
              </div>
              <div>
                <dt>Lagered</dt>
                <dd>20 weeks</dd>
              </div>
            </dl>
            <div className="actions">
              <Link to={`/beers/${seasonal.slug}`} className="btn btn-ink">
                Read the brew sheet
              </Link>
              <Link to="/shop/copper-marzen-4pack" className="btn btn-line">
                Buy a 4-pack
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="brew-story" aria-labelledby="brew-title">
        <img
          src={images.brewhouse}
          alt=""
          loading="lazy"
          width={1478}
          height={1440}
        />
        <div className="wrap brew-story-inner">
          <div className="brew-story-card">
            <h2 id="brew-title">{home.brewTitle}</h2>
            <p>{home.brewText}</p>
            <Link to="/about" className="link-arrow">
              How Kettle started <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="events-title">
        <div className="wrap">
          <div className="section-head section-head-row">
            <h2 id="events-title">This month on Tannery Row</h2>
            <Link to="/events" className="link-arrow">
              Full calendar <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <div className="event-list">
            {events.slice(0, 4).map((e) => (
              <EventRow key={e.id} event={e} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tours" aria-labelledby="tours-title">
        <div className="wrap tours-home">
          <figure className="tours-figure">
            <img
              src={images.tour}
              alt="Row of copper kettles on white tiled bases, seen on a brewery tour"
              loading="lazy"
              width={1800}
              height={1350}
            />
          </figure>
          <div>
            <h2 id="tours-title">{home.toursTitle}</h2>
            <ul className="tour-lines">
              {tours.map((t) => (
                <li key={t.id}>
                  <div>
                    <h3>{t.name}</h3>
                    <p>{t.summary}</p>
                  </div>
                  <p className="tour-price tnum">
                    {money(t.price)}
                    <span>{t.min ? "per person" : `${t.minutes} min`}</span>
                  </p>
                </li>
              ))}
            </ul>
            <Link to="/tours" className="btn btn-copper">
              Choose a date
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-shop" aria-labelledby="shop-title">
        <div className="wrap">
          <div className="section-head section-head-row">
            <div>
              <h2 id="shop-title">{home.shopTitle}</h2>
              <p>{home.shopText}</p>
            </div>
            <Link to="/shop" className="link-arrow">
              Whole shop <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <div className="product-grid product-grid-short">
            {featured.map((p) => (
              <ProductTile key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-visit" aria-labelledby="visit-title">
        <div className="wrap visit">
          <div className="visit-copy">
            <h2 id="visit-title">{home.visitTitle}</h2>
            <address className="visit-address">
              {brand.street}
              <br />
              {brand.city}
            </address>
            <HoursTable />
          </div>
          <figure className="visit-figure">
            <img
              src={images.yard}
              alt="Friends at picnic tables on a gravel beer yard under shade trees"
              loading="lazy"
              width={1800}
              height={899}
            />
          </figure>
          <ul className="rules">
            {houseRules.map((r) => (
              <li key={r.title}>
                <h3>{r.title}</h3>
                <p>{r.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="close" aria-labelledby="close-title">
        <div className="wrap close-inner">
          <h2 id="close-title">{home.closeTitle}</h2>
          <p>{home.closeText}</p>
          <div className="actions">
            <Link to="/taproom" className="btn btn-copper btn-lg">
              Today's taproom menu
            </Link>
            <Link to="/events" className="btn btn-line-light btn-lg">
              What's on
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
