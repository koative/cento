import { useState } from "react";
import { ArrowRight, ArrowUpRight, MoveUpRight } from "lucide-react";
import { Link } from "../router";
import {
  bikes,
  brand,
  build,
  home,
  photos,
  rides,
  servicePackages,
  story,
} from "../content";
import { BikeCard } from "../components/BikeCard";
import { FrameDrawing } from "../components/FrameDrawing";
import { money } from "../lib/cart";
import { openStatus } from "../lib/hours";

const hero = bikes[0];

export function Home() {
  const [finish, setFinish] = useState(build.finishes[0]);
  const status = openStatus();

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <h1>{home.title}</h1>
          <p className="lead">{home.intro}</p>
          <div className="actions">
            <Link to="/bikes" className="btn">
              Shop the bikes <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link to="/build" className="btn btn-ghost">
              Build your own
            </Link>
          </div>
          <p className="hero-status">
            <span
              className="dot"
              data-open={status.open || undefined}
              aria-hidden="true"
            />
            {status.label} · {brand.address[1]}, {brand.address[2]}
          </p>
        </div>
        <figure className="hero-media">
          <img
            src={hero.photo}
            alt={hero.photoAlt}
            width={1400}
            height={775}
            fetchPriority="high"
          />
          <figcaption>
            <Link to={`/bikes/${hero.id}`} className="tag">
              <strong>{hero.name}</strong>
              <span>
                {hero.type} · {hero.material} ·{" "}
                <span className="num">{money(hero.price)}</span>
              </span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </figcaption>
        </figure>
      </section>

      <div className="band" role="presentation">
        <span>{home.band[0]}</span>
        <MoveUpRight size={40} aria-hidden="true" />
        <span>{home.band[1]}</span>
      </div>

      <section className="section">
        <div className="section-head">
          <h2>On the shop floor this week</h2>
          <Link to="/bikes" className="text-link">
            All {bikes.length} bikes <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="bike-grid">
          {[bikes[2], bikes[1], bikes[3], bikes[5]].map((b) => (
            <BikeCard key={b.id} bike={b} />
          ))}
        </div>
      </section>

      <section className="section teaser">
        <div className="sheet">
          <FrameDrawing
            geometry={hero.geometry}
            tyre={hero.tyre}
            finish={finish.hex}
            bar="drop"
            label={`Corsa frame drawing in ${finish.name}`}
            dims
          />
          <p className="sheet-caption">
            <span>Corsa · 54 cm · {finish.name}</span>
            <span>Drawn to scale, millimetres</span>
          </p>
        </div>
        <div className="teaser-copy">
          <h2>Draw it in your colour</h2>
          <p>
            Every custom frame starts as a drawing. Pick a platform, tell us
            your height, choose the paint and the parts — the drawing and the
            price change as you go.
          </p>
          <fieldset className="swatches">
            <legend>
              Finish <span>{finish.name}</span>
            </legend>
            {build.finishes.map((f) => (
              <label
                key={f.name}
                className="swatch"
                style={{ background: f.hex }}
              >
                <input
                  type="radio"
                  name="home-finish"
                  checked={finish.name === f.name}
                  onChange={() => setFinish(f)}
                  aria-label={f.name}
                />
              </label>
            ))}
          </fieldset>
          <Link to="/build" className="btn">
            Open the configurator <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="section process">
        <h2>{home.process}</h2>
        <ol className="steps">
          {story.steps.map((s, i) => (
            <li key={s.title}>
              <span className="step-week">Week {i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section workshop">
        <img
          src={photos.shopTruing}
          alt="A mechanic in the workshop seating a tyre on a wheel, bikes hanging behind"
          width={1400}
          height={1120}
          loading="lazy"
        />
        <div>
          <h2>A workshop that fixes anything with two wheels</h2>
          <p>
            Four stands, two mechanics, and a rule: nothing extra gets done
            without a phone call first. Most of our week is bikes we didn't
            sell.
          </p>
          <ul className="price-list">
            {servicePackages.map((s) => (
              <li key={s.id}>
                <span>{s.name}</span>
                <span className="leader" aria-hidden="true" />
                <span className="num">{money(s.price)}</span>
                <small>{s.time}</small>
              </li>
            ))}
          </ul>
          <Link to="/service" className="btn">
            Book a service <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="rides-teaser">
        <img
          src={photos.rideCoast}
          alt="Two club riders on drop-bar bikes riding a coast road beside the dunes"
          width={1400}
          height={933}
          loading="lazy"
        />
        <div className="rides-teaser-body">
          <h2>Five rides a week, all from the shop door</h2>
          <p>
            Free, no membership card, no one left behind on the social rides.
          </p>
          <ul className="timetable">
            {rides.slice(0, 4).map((r) => (
              <li key={r.id}>
                <span className="tt-day">{r.day.slice(0, 3)}</span>
                <span className="tt-time num">{r.time}</span>
                <span className="tt-name">{r.name}</span>
                <span className="tt-meta num">
                  {r.distance} km · {r.pace.split(",")[0]}
                </span>
              </li>
            ))}
          </ul>
          <Link to="/rides" className="text-link">
            The full club schedule <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="section quotes">
        <h2 className="visually-hidden">What riders say</h2>
        <blockquote className="quote-big">
          <p>{home.quote.text}</p>
          <footer>{home.quote.who}</footer>
        </blockquote>
        <blockquote className="quote-small">
          <p>{home.quote2.text}</p>
          <footer>{home.quote2.who}</footer>
        </blockquote>
      </section>

      <section className="close">
        <div>
          <h2>Come and ride one</h2>
          <p>
            Every bike on the floor can be taken round the block. Bring your
            pedals, or borrow ours. Fittings are booked; test rides never are.
          </p>
        </div>
        <dl className="close-facts">
          <div>
            <dt>Today</dt>
            <dd>{status.label}</dd>
          </div>
          <div>
            <dt>Find us</dt>
            <dd>{brand.address.join(", ")}</dd>
          </div>
          <div>
            <dt>Call</dt>
            <dd>
              <a href={`tel:${brand.phone.replace(/\s/g, "")}`}>
                {brand.phone}
              </a>
            </dd>
          </div>
        </dl>
        <div className="actions">
          <Link to="/bikes" className="btn btn-light">
            Browse the bikes <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link to="/about" className="btn btn-ghost-light">
            Meet the workshop
          </Link>
        </div>
      </section>
    </>
  );
}
