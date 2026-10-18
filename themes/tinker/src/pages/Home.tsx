import { ArrowRight, Clock, MapPin } from "lucide-react";
import type { CSSProperties } from "react";
import { Link } from "../router";
import {
  ages,
  brand,
  events,
  home,
  imagery,
  products,
  services,
  workshops,
} from "../content";
import { dateParts, money, shopStatus, shortDate } from "../lib/format";
import { findGifts } from "../lib/gifts";
import { Block } from "../components/Block";
import { PriceTag, ProductCard } from "../components/ProductCard";

const heroToys = ["rainbow-stacker", "humming-tin-top", "pecking-birds"].map(
  (id) => products.find((p) => p.id === id)!,
);
const newest = [...products]
  .sort((a, b) => b.added.localeCompare(a.added))
  .slice(0, 4);
const sample = { age: 4, love: "Vehicles" as const, budget: 50 };
const sampleGifts = findGifts({
  age: sample.age,
  loves: [sample.love],
  budget: sample.budget,
}).slice(0, 3);
const sessions = workshops
  .flatMap((w) => w.sessions.map((s) => ({ ...s, workshop: w })))
  .sort((a, b) => a.date.localeCompare(b.date))
  .slice(0, 4);

export function Home() {
  const status = shopStatus();
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-copy">
          <h1>{home.title}</h1>
          <p className="lead">{home.lead}</p>
          <div className="actions">
            <Link to="/shop" className="btn">
              Shop all toys <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link to="/gift-finder" className="btn btn-ghost">
              Find a gift in a minute
            </Link>
          </div>
          <p className="hero-status">
            <Clock size={16} aria-hidden="true" /> {status.text} ·{" "}
            {brand.street}
          </p>
        </div>
        <ul className="hero-toys">
          {heroToys.map((p, i) => (
            <li key={p.id} className={"hero-toy hero-toy-" + i}>
              <img
                src={p.image.src}
                alt={p.image.alt}
                width={p.image.w}
                height={p.image.h}
              />
              <Link to={`/shop/${p.id}`} className="hanging-tag">
                <span>{p.name}</span>
                <b className="num">{money(p.price)}</b>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="age-shelf" aria-labelledby="h-ages">
        <div className="section-head">
          <h2 id="h-ages">{home.ageTitle}</h2>
          <p>{home.ageLead}</p>
        </div>
        <ul className="height-chart">
          {ages.map((a, i) => (
            <li
              key={a.id}
              style={
                {
                  "--band": a.color,
                  "--on": a.on,
                  "--step": i,
                } as CSSProperties
              }
            >
              <Link to={`/ages/${a.id}`}>
                <Block shape={a.shape} color="currentColor" size={40} />
                <strong>{a.label}</strong>
                <span>{a.nickname}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="counter" aria-labelledby="h-counter">
        <div className="section-head section-head-row">
          <h2 id="h-counter">{home.counterTitle}</h2>
          <Link to="/shop" className="text-link">
            See all {products.length} toys{" "}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="product-grid product-grid-4">
          {newest.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="finder-teaser" aria-labelledby="h-finder">
        <div>
          <h2 id="h-finder">{home.finderTitle}</h2>
          <p>{home.finderLead}</p>
          <Link to="/gift-finder" className="btn btn-light">
            Open the gift finder <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <figure className="finder-sample">
          <figcaption>
            For a {sample.age} year old who loves {sample.love.toLowerCase()},
            under {money(sample.budget)}:
          </figcaption>
          <ol>
            {sampleGifts.map(({ product }) => (
              <li key={product.id}>
                <img
                  src={product.image.src}
                  alt=""
                  width={product.image.w}
                  height={product.image.h}
                  loading="lazy"
                />
                <Link to={`/shop/${product.id}`}>{product.name}</Link>
                <PriceTag price={product.price} />
              </li>
            ))}
          </ol>
        </figure>
      </section>

      <section className="bench" aria-labelledby="h-bench">
        <img
          className="bench-photo"
          src={workshops[0].image.src}
          alt={workshops[0].image.alt}
          width={workshops[0].image.w}
          height={workshops[0].image.h}
          loading="lazy"
        />
        <div className="bench-copy">
          <h2 id="h-bench">{home.benchTitle}</h2>
          <p>{home.benchLead}</p>
          <ul className="session-list">
            {sessions.map((s) => {
              const d = dateParts(s.date);
              return (
                <li key={s.id}>
                  <span className="date-chip" aria-hidden="true">
                    <b>{d.day}</b>
                    {d.month}
                  </span>
                  <span>
                    <Link to={`/workshops/${s.workshop.id}`}>
                      {s.workshop.name}
                    </Link>
                    <small>
                      {shortDate(s.date)} · {s.time} · ages {s.workshop.ages}
                    </small>
                  </span>
                  <span className={"seats" + (s.left <= 3 ? " seats-low" : "")}>
                    {s.left} {s.left === 1 ? "seat" : "seats"} left
                  </span>
                </li>
              );
            })}
          </ul>
          <Link to="/workshops" className="text-link">
            All workshops <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="testing" aria-labelledby="h-testing">
        <img
          src={imagery.shelves.src}
          alt={imagery.shelves.alt}
          width={imagery.shelves.w}
          height={imagery.shelves.h}
          loading="lazy"
        />
        <div>
          <h2 id="h-testing">{home.testTitle}</h2>
          <p>{home.testText}</p>
          <Link to="/about" className="text-link">
            How a toy gets on our shelf{" "}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="soon" aria-labelledby="h-soon">
        <div className="section-head section-head-row">
          <h2 id="h-soon">{home.eventsTitle}</h2>
          <Link to="/events" className="text-link">
            Full calendar <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <ul className="event-strip">
          {events.slice(0, 3).map((e) => {
            const d = dateParts(e.date);
            return (
              <li key={e.id}>
                <p className="event-when">
                  <b>{d.weekday}</b> {d.month} {d.day} · {e.time}
                </p>
                <h3>{e.title}</h3>
                <p>{e.text}</p>
                <p className="event-who">
                  {e.kind} · {e.who}
                </p>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="quotes" aria-labelledby="h-quotes">
        <h2 id="h-quotes" className="visually-hidden">
          {home.quotesTitle}
        </h2>
        {home.quotes.map((q, i) => (
          <figure key={q.by} className={"quote quote-" + i}>
            <blockquote>{q.text}</blockquote>
            <figcaption>{q.by}</figcaption>
          </figure>
        ))}
      </section>

      <section className="services" aria-labelledby="h-services">
        <h2 id="h-services">At the counter</h2>
        <dl>
          {services.map((s, i) => (
            <div key={s.title}>
              <dt>
                <Block shape={ages[i].shape} color={ages[i].color} size={22} />
                {s.title}
              </dt>
              <dd>{s.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="close" aria-labelledby="h-close">
        <div>
          <h2 id="h-close">{home.closeTitle}</h2>
          <p>{home.closeText}</p>
          <p className="close-where">
            <MapPin size={18} aria-hidden="true" /> {brand.street}, {brand.town}
          </p>
          <div className="actions">
            <Link to="/visit" className="btn">
              Hours &amp; directions
            </Link>
            <Link to="/events" className="btn btn-ghost">
              What&rsquo;s on
            </Link>
          </div>
        </div>
        <img
          src={imagery.counter.src}
          alt={imagery.counter.alt}
          width={imagery.counter.w}
          height={imagery.counter.h}
          loading="lazy"
        />
      </section>
    </div>
  );
}
