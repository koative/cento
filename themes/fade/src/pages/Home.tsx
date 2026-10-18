import { ArrowRight, Phone } from "lucide-react";
import { Link } from "../router";
import {
  barbers,
  brand,
  cuts,
  days,
  fadeChartPage,
  home,
  products,
  services,
} from "../content";
import { clock, hoursLabel, money, openStatus } from "../lib/format";
import { nextChair, whenLabel } from "../lib/slots";
import { FadeStrip } from "../components/FadeStrip";
import { PriceList } from "../components/PriceList";
import { ProductCard } from "../components/ProductCard";

export function Home() {
  const status = openStatus(brand.hours);
  const next = nextChair(40);
  const board = home.boardServices.map((id) =>
    services.find((s) => s.id === id)!,
  );
  const picks = home.shopPicks.map((id) => products.find((p) => p.id === id)!);
  const gallery = cuts.slice(1, 6);
  const today = new Date().getDay();

  return (
    <>
      <section className="hero wrap" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="status" data-open={status.open ? "" : undefined}>
            <span className="dot" aria-hidden="true" />
            {status.label}
            {next && (
              <>
                {" · "}next chair {whenLabel(next.date)} at {clock(next.time)}{" "}
                with {next.barber.name.split(" ")[0]}
              </>
            )}
          </p>
          <h1 id="hero-title">{home.title}</h1>
          <p className="lede">{home.lead}</p>
          <div className="actions">
            <Link to="/book" className="btn btn-red">
              Book a chair
            </Link>
            <Link to="/services" className="btn btn-line">
              See every price
            </Link>
          </div>
          <dl className="hero-prices">
            {["skin-fade", "classic-cut", "beard-trim"].map((id) => {
              const s = services.find((x) => x.id === id)!;
              return (
                <div key={id}>
                  <dt>{s.name}</dt>
                  <dd>{money(s.price)}</dd>
                </div>
              );
            })}
          </dl>
        </div>
        <figure className="hero-figure">
          <img
            src={home.heroImage.src}
            alt={home.heroImage.alt}
            width={home.heroImage.w}
            height={home.heroImage.h}
            fetchPriority="high"
          />
          <figcaption>
            {cuts[0].title} ·{" "}
            {barbers.find((b) => b.id === cuts[0].barber)!.name}, chair 2
          </figcaption>
        </figure>
      </section>

      <section className="board-section" aria-labelledby="board-title">
        <div className="wrap board">
          <div className="board-head">
            <h2 id="board-title">{home.boardTitle}</h2>
            <p>{home.boardText}</p>
            <Link to="/services" className="text-link on-dark">
              Full price list & add-ons <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <PriceList items={board} />
        </div>
      </section>

      <section className="wrap chart-teaser" aria-labelledby="chart-title">
        <div className="chart-teaser-copy">
          <h2 id="chart-title">{home.chartTitle}</h2>
          <p>{home.chartText}</p>
          <Link to="/fade-chart" className="btn btn-ink">
            Build your fade
          </Link>
        </div>
        <ul className="swatches">
          {fadeChartPage.presets.map((p) => (
            <li key={p.id}>
              <Link to={`/fade-chart?preset=${p.id}`} className="swatch">
                <FadeStrip chart={p.chart} compact />
                <span>{p.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap chairs-section" aria-labelledby="chairs-title">
        <div className="section-head">
          <h2 id="chairs-title">{home.barbersTitle}</h2>
          <p>{home.barbersText}</p>
        </div>
        <ol className="chair-board">
          {barbers.map((b) => (
            <li key={b.id}>
              <span className="chair-no" aria-hidden="true">
                {b.chair}
              </span>
              <div className="chair-who">
                <h3>
                  <Link to={`/barbers/${b.id}`}>{b.name}</Link>
                </h3>
                <p>
                  <span className="sr-only">Chair {b.chair}, </span>
                  {b.tier} · {b.short}
                </p>
              </div>
              <p
                className="chair-today"
                data-in={b.days.includes(today) ? "" : undefined}
              >
                {b.days.includes(today)
                  ? "In today"
                  : `Back ${days[b.days.find((d) => d > today) ?? b.days[0]]}`}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="gallery-strip" aria-labelledby="strip-title">
        <div className="wrap section-head">
          <h2 id="strip-title">{home.galleryTitle}</h2>
          <Link to="/gallery" className="text-link">
            The whole gallery <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <ul className="wrap strip">
          {gallery.map((c) => (
            <li key={c.id}>
              <figure>
                <img
                  src={c.img.src}
                  alt={c.img.alt}
                  width={c.img.w}
                  height={c.img.h}
                  loading="lazy"
                />
                <figcaption>
                  <strong>{c.title}</strong> {c.recipe}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>

      <section className="quote-section wrap" aria-label="From the chair">
        <blockquote>
          <p>{home.quote.text}</p>
          <footer>{home.quote.by}</footer>
        </blockquote>
      </section>

      <section className="ritual" aria-labelledby="ritual-title">
        <div className="wrap ritual-body">
          <div>
            <img
              src={home.ritualImage.src}
              alt={home.ritualImage.alt}
              width={home.ritualImage.w}
              height={home.ritualImage.h}
              loading="lazy"
            />
            <h2 id="ritual-title">{home.ritualTitle}</h2>
            <p>{home.ritualText}</p>
            <p className="ritual-price">
              {money(services.find((s) => s.id === "hot-towel-shave")!.price)} ·
              45 min
            </p>
            <Link
              to="/book?service=hot-towel-shave&barber=tomas"
              className="btn btn-paper"
            >
              Book a shave with Tomás
            </Link>
          </div>
          <ol className="ritual-steps">
            {home.ritualSteps.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
        </div>
      </section>

      <section className="wrap shop-section" aria-labelledby="shop-title">
        <div className="section-head">
          <h2 id="shop-title">{home.shopTitle}</h2>
          <p>{home.shopText}</p>
          <Link to="/shop" className="text-link">
            Shop all {products.length} <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <div className="product-grid">
          {picks.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="wrap visit-teaser" aria-labelledby="visit-title">
        <img
          src={home.visitImage.src}
          alt={home.visitImage.alt}
          width={home.visitImage.w}
          height={home.visitImage.h}
          loading="lazy"
        />
        <div>
          <h2 id="visit-title">{home.visitTitle}</h2>
          <p>{home.visitText}</p>
          <address>
            {brand.street}, {brand.area}
          </address>
          <dl className="hours">
            {[2, 3, 4, 5, 6, 0, 1].map((d) => (
              <div key={d} data-today={d === today ? "" : undefined}>
                <dt>{days[d]}</dt>
                <dd>{hoursLabel(brand.hours[d])}</dd>
              </div>
            ))}
          </dl>
          <Link to="/visit" className="text-link">
            Directions & parking <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="close" aria-labelledby="close-title">
        <div className="wrap">
          <h2 id="close-title">{home.closeTitle}</h2>
          <p>{home.closeText}</p>
          <div className="actions">
            <Link to="/book" className="btn btn-red">
              Book a chair
            </Link>
            <a href={brand.phoneHref} className="btn btn-line">
              <Phone aria-hidden="true" /> {brand.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
