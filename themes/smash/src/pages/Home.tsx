import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import {
  about,
  catering,
  home,
  images,
  locations,
  menu,
  merch,
  type MenuItem,
} from "../content";
import { money, openStatus, priceOf } from "../lib";
import { ItemBuilder } from "../components/ItemBuilder";
import { MerchCard } from "../components/MerchCard";
import { MenuCard } from "../components/MenuCard";

const byId = (id: string) => menu.find((m) => m.id === id) as MenuItem;

export function Home() {
  const builder = useRef<HTMLElement>(null);
  const signature = byId("the-smash");
  const build = byId("the-build");
  const board = home.boardIds.map(byId);
  const sides = ["fries", "rings", "chocolate-malt", "vanilla"].map(byId);
  const eastside = openStatus(locations[0].hours);

  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <h1>{home.title}</h1>
            <p className="lede">{home.lede}</p>
            <div className="actions">
              <Link to="/menu" className="btn btn-primary btn-lg">
                Start an order <ArrowRight aria-hidden="true" />
              </Link>
              <button
                type="button"
                className="btn btn-ghost btn-lg"
                onClick={() =>
                  builder.current?.scrollIntoView({
                    behavior: matchMedia("(prefers-reduced-motion: reduce)")
                      .matches
                      ? "auto"
                      : "smooth",
                  })
                }
              >
                Build a burger
              </button>
            </div>
            <p className="hero-status">
              <span
                className="dot"
                data-open={eastside.open ? "" : undefined}
                aria-hidden="true"
              />
              Eastside: {eastside.label}. Pickup in about twelve minutes.
            </p>
          </div>
          <figure className="hero-figure">
            <div className="checker">
              <img
                src={images.hero.src}
                alt={images.hero.alt}
                width={images.hero.w}
                height={images.hero.h}
              />
            </div>
            <Link to={`/menu/${signature.id}`} className="hero-ticket">
              <span className="ticket-name">{signature.name}</span>
              <span className="ticket-line">{signature.blurb}</span>
              <span className="ticket-price">{money(priceOf(signature))}</span>
            </Link>
          </figure>
        </div>
      </section>

      <section className="board" aria-labelledby="board-h">
        <div className="wrap">
          <div className="section-head">
            <h2 id="board-h">On the board</h2>
            <Link to="/menu" className="text-link">
              Full menu <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <div className="card-grid">
            {board.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="build" ref={builder} aria-labelledby="build-h">
        <div className="wrap">
          <div className="section-head">
            <h2 id="build-h">Build it, watch it stack.</h2>
            <p>
              Every lever on our griddle, in your hand. Pick the patties, the
              cheese, the works, and see exactly what you're getting before it
              hits the steel.
            </p>
          </div>
          <ItemBuilder key={build.id} item={build} />
        </div>
      </section>

      <section className="crust" aria-labelledby="crust-h">
        <div className="wrap crust-grid">
          <img
            src={images.crust.src}
            alt={images.crust.alt}
            width={images.crust.w}
            height={images.crust.h}
            loading="lazy"
          />
          <div>
            <h2 id="crust-h">{home.crust.title}</h2>
            <p>{home.crust.text}</p>
          </div>
        </div>
      </section>

      <section className="method" aria-labelledby="method-h">
        <div className="wrap method-grid">
          <div className="method-photos">
            <img
              src={images.press.src}
              alt={images.press.alt}
              width={images.press.w}
              height={images.press.h}
              loading="lazy"
            />
            <img
              src={images.griddle.src}
              alt={images.griddle.alt}
              width={images.griddle.w}
              height={images.griddle.h}
              loading="lazy"
            />
          </div>
          <div>
            <h2 id="method-h">Five moves, every burger.</h2>
            <ol className="steps">
              {about.method.map((s) => (
                <li key={s.title}>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="sides" aria-labelledby="sides-h">
        <div className="wrap">
          <h2 id="sides-h">{home.sidesTitle}</h2>
          <ul className="sides-grid">
            {sides.map((s) => (
              <li key={s.id}>
                <Link to={`/menu/${s.id}`}>
                  {s.image && (
                    <img
                      src={s.image.src}
                      alt={s.image.alt}
                      width={s.image.w}
                      height={s.image.h}
                      loading="lazy"
                    />
                  )}
                  <span className="sides-label">
                    {s.name} <span>{money(priceOf(s))}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="visit" aria-labelledby="visit-h">
        <div className="wrap visit-grid">
          <img
            src={images.neon.src}
            alt={images.neon.alt}
            width={images.neon.w}
            height={images.neon.h}
            loading="lazy"
          />
          <div>
            <h2 id="visit-h">Three counters and a truck.</h2>
            <ul className="visit-list">
              {locations.map((l) => {
                const s = openStatus(l.hours);
                return (
                  <li key={l.id}>
                    <Link to={`/locations/${l.id}`}>
                      <span className="visit-name">{l.name}</span>
                      <span className="visit-kind">{l.kind}</span>
                      <span
                        className="visit-status"
                        data-open={s.open ? "" : undefined}
                      >
                        {s.label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      <section className="cater-band" aria-labelledby="cater-h">
        <div className="wrap cater-grid">
          <div>
            <h2 id="cater-h">Feeding ten, or four hundred.</h2>
            <p>{catering.intro}</p>
            <Link to="/catering" className="btn btn-mustard">
              Plan catering
            </Link>
          </div>
          <img
            src={images.backyard.src}
            alt={images.backyard.alt}
            width={images.backyard.w}
            height={images.backyard.h}
            loading="lazy"
          />
        </div>
      </section>

      <section className="merch-strip" aria-labelledby="merch-h">
        <div className="wrap">
          <div className="section-head">
            <h2 id="merch-h">Take the joint home.</h2>
            <Link to="/merch" className="text-link">
              All merch <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <div className="merch-grid">
            {merch.slice(0, 4).map((m) => (
              <MerchCard key={m.id} item={m} />
            ))}
          </div>
        </div>
      </section>

      <section className="close" aria-labelledby="close-h">
        <div className="wrap close-inner">
          <h2 id="close-h">{home.closeTitle}</h2>
          <p>{home.closeText}</p>
          <div className="actions">
            <Link to="/menu" className="btn btn-char btn-lg">
              Order pickup
            </Link>
            <Link to="/locations" className="btn btn-ghost-char btn-lg">
              Find a counter
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
