import type { CSSProperties } from "react";
import { ArrowRight, Clock, Scale } from "lucide-react";
import { Link } from "../router";
import {
  cafes,
  coffees,
  fmtHours,
  guides,
  home,
  images,
  quotes,
  roastersChoice,
  roastWeek,
  subscription,
} from "../content";
import { money } from "../cart";
import { Bag } from "../components/Bag";
import { CoffeeCard } from "../components/CoffeeCard";

export function Home() {
  const hero = coffees[0];
  const today = (new Date().getDay() + 6) % 7;
  const dayIndex = new Date().getDay();
  const lowest =
    Math.min(...coffees.map((c) => c.price)) * (1 - subscription.discount);

  return (
    <>
      <section className="home-hero">
        <div className="home-hero-text">
          <h1>
            {home.heroTitle.split("\n").map((line, i) => (
              <span key={line} className={i ? "accent" : undefined}>
                {line}
              </span>
            ))}
          </h1>
          <p className="lead">{home.heroText}</p>
          <div className="actions">
            <Link to="/shop" className="btn">
              Shop all coffee <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link to="/subscribe" className="btn btn-ghost">
              Build a subscription
            </Link>
          </div>
        </div>
        <div className="home-hero-product">
          <Link
            to={"/shop/" + hero.id}
            className="hero-bag-link"
            aria-label={`${hero.name}, ${hero.origin}, ${money(hero.price)}`}
          >
            <Bag
              name={hero.name}
              origin={hero.origin}
              color={hero.color}
              size={19}
              className="hero-bag"
            />
          </Link>
          <div className="hero-tag">
            <p>
              <strong>{hero.name}</strong> {hero.origin},{" "}
              {hero.process.toLowerCase()}
            </p>
            <p>{hero.notes.join(" · ")}</p>
            <p className="hero-price">{money(hero.price)} / 250 g</p>
          </div>
        </div>
      </section>

      <section className="section shelf-section" aria-labelledby="h-shelf">
        <div className="section-head">
          <h2 id="h-shelf">{home.shelfTitle}</h2>
          <Link to="/shop" className="text-link">
            All eight coffees <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="shelf">
          {coffees.slice(0, 4).map((c) => (
            <CoffeeCard key={c.id} coffee={c} />
          ))}
        </div>
      </section>

      <section
        className="section roast-scale-section"
        aria-labelledby="h-scale"
      >
        <h2 id="h-scale">{home.scaleTitle}</h2>
        <p className="section-intro">{home.scaleText}</p>
        <ol className="roast-scale">
          {[...coffees]
            .sort((a, b) => a.level - b.level)
            .map((c) => (
              <li key={c.id} style={{ "--lvl": c.level } as CSSProperties}>
                <Link to={"/shop/" + c.id}>
                  <span
                    className="dot"
                    style={{ background: c.color }}
                    aria-hidden="true"
                  />
                  <strong>{c.name}</strong>
                  <span>
                    {c.notes[0]}
                    <em> · {c.roast}</em>
                  </span>
                </Link>
              </li>
            ))}
        </ol>
        <div className="roast-scale-axis" aria-hidden="true">
          <span>Light</span>
          <span>Medium</span>
          <span>Dark</span>
        </div>
      </section>

      <section className="roast-week" aria-labelledby="h-week">
        <img
          src={images.roaster.src}
          alt={images.roaster.alt}
          loading="lazy"
          width={1800}
          height={1200}
        />
        <div className="roast-week-text">
          <h2 id="h-week">{home.weekTitle}</h2>
          <p>{home.roastWeek}</p>
          <ol className="week">
            {roastWeek.map((d, i) => (
              <li
                key={d.day}
                data-roast={d.event === "Roast" || undefined}
                aria-current={i === today ? "date" : undefined}
              >
                <b>{d.day}</b>
                {d.event && <span className="week-event">{d.event}</span>}
                {d.detail && <span className="week-detail">{d.detail}</span>}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="sub-teaser" aria-labelledby="h-sub">
        <div className="sub-teaser-text">
          <h2 id="h-sub">{home.subscriptionTitle}</h2>
          <p>{home.subscriptionText}</p>
          <p className="sub-teaser-price">
            From {money(lowest)} a bag, shipped fresh every one to four weeks.
          </p>
          <Link to="/subscribe" className="btn btn-light">
            Build your subscription <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <div className="bag-stack" aria-hidden="true">
          <Bag
            name={roastersChoice.name}
            origin={roastersChoice.origin}
            color={roastersChoice.color}
            size={11}
          />
          <Bag
            name={coffees[3].name}
            origin={coffees[3].origin}
            color={coffees[3].color}
            size={11}
          />
          <Bag
            name={coffees[1].name}
            origin={coffees[1].origin}
            color={coffees[1].color}
            size={11}
          />
        </div>
      </section>

      <section className="section sourcing" aria-labelledby="h-source">
        <figure className="sourcing-img">
          <img
            src={images.cherries.src}
            alt={images.cherries.alt}
            loading="lazy"
            width={1200}
            height={540}
          />
        </figure>
        <div className="sourcing-text">
          <h2 id="h-source">{home.sourcingTitle}</h2>
          <p>{home.sourcingText}</p>
          <Link to="/about" className="text-link">
            Read our story <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <table className="data-table">
          <caption className="visually-hidden">Our producers</caption>
          <thead>
            <tr>
              <th scope="col">Coffee</th>
              <th scope="col">Producer</th>
              <th scope="col">Process</th>
            </tr>
          </thead>
          <tbody>
            {coffees.map((c) => (
              <tr key={c.id}>
                <th scope="row">
                  <Link to={"/shop/" + c.id}>{c.name}</Link>
                </th>
                <td>
                  {c.producer}
                  <span>
                    {c.region}, {c.origin}
                  </span>
                </td>
                <td>{c.process}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="section guides-teaser" aria-labelledby="h-brew">
        <div className="section-head">
          <h2 id="h-brew">{home.brewTitle}</h2>
          <Link to="/brew" className="text-link">
            All brew guides <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <ul className="guide-rows">
          {guides.map((g) => (
            <li key={g.slug}>
              <Link to={"/brew/" + g.slug}>
                <img
                  src={g.image}
                  alt=""
                  loading="lazy"
                  width={160}
                  height={160}
                />
                <span className="guide-row-name">
                  <strong>{g.name}</strong>
                  <span>{g.method}</span>
                </span>
                <span className="guide-row-metas">
                  <span>
                    <Clock size={16} aria-hidden="true" /> {g.time}
                  </span>
                  <span>
                    <Scale size={16} aria-hidden="true" /> 1:{g.ratio}
                  </span>
                </span>
                <ArrowRight
                  size={20}
                  aria-hidden="true"
                  className="guide-row-arrow"
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="quote-section" aria-label="What subscribers say">
        <blockquote>
          <p>{quotes[0].text}</p>
          <footer>{quotes[0].who}</footer>
        </blockquote>
      </section>

      <section className="section cafes-teaser" aria-labelledby="h-cafes">
        <div className="section-head">
          <h2 id="h-cafes">{home.cafesTitle}</h2>
          <Link to="/cafes" className="text-link">
            Cafés &amp; hours <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="cafe-strip">
          {cafes.map((c) => {
            const hours = c.week[dayIndex];
            return (
              <article key={c.id}>
                <img
                  src={c.image}
                  alt={c.imageAlt}
                  loading="lazy"
                  width={1200}
                  height={800}
                />
                <h3>{c.name}</h3>
                <p>{c.address}</p>
                <p className="muted">
                  {hours ? "Today " + fmtHours(hours) : "Closed today"}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="close-band" aria-labelledby="h-close">
        <h2 id="h-close">{home.closeTitle}</h2>
        <p>{home.closeText}</p>
        <div className="actions">
          <Link to="/shop" className="btn">
            Choose your coffee <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link to="/subscribe" className="btn btn-ghost">
            Or subscribe and save 10%
          </Link>
        </div>
      </section>
    </>
  );
}
