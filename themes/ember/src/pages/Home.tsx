import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import {
  brand,
  dishes,
  events,
  home,
  photos,
  services,
  week,
} from "../content";
import { Photo } from "../components/Photo";
import { OpenNow } from "../components/OpenNow";
import { EventRow } from "../components/EventRow";
import { Diets } from "../components/DishRow";
import { money, span } from "../lib/time";

const byId = (id: string) => dishes.find((d) => d.id === id)!;

/** A sample plan for four, priced from the live menu. */
const sample = [
  ["house-focaccia", 1],
  ["burrata", 1],
  ["crispy-potatoes", 1],
  ["hot-honey-salami", 1],
  ["white-pie", 1],
  ["half-chicken", 1],
] as const;

const ovenDay = [
  { time: "2 pm", what: "Lit with oak and beech" },
  { time: "6 pm", what: "Floor at 850°F, first pies" },
  { time: "10 pm", what: "Last pie of the night" },
  { time: "Overnight", what: "Tomorrow's lamb braises in the falling heat" },
  { time: "7 am", what: "Granola and brunch bread in the last warmth" },
];

export function Home() {
  const spot = byId(home.spotlight.dish);
  const sampleTotal = sample.reduce((n, [id, q]) => n + byId(id).price * q, 0);
  const upcoming = events.filter((e) => e.left > 0).slice(0, 3);

  return (
    <div className="home">
      <section className="hero wrap">
        <div className="hero-copy">
          <h1>{home.title}</h1>
          <p className="lede">{home.lede}</p>
          <div className="actions">
            <Link to="/reservations" className="btn btn-primary">
              Book a table
            </Link>
            <Link to="/menu/dinner" className="btn btn-ghost">
              See the dinner menu
            </Link>
          </div>
          <OpenNow />
        </div>
        <div className="hero-media">
          <Photo photo={photos.hero} className="arch hero-img" eager />
          <div className="tonight">
            <h2>Tonight from the oven</h2>
            <ul>
              {home.tonight.map((id) => {
                const d = byId(id);
                return (
                  <li key={id}>
                    <Link to={`/menu/${d.service}/${d.id}`}>{d.name}</Link>
                    <span className="leader" aria-hidden="true" />
                    <span className="num">{money(d.price)}</span>
                  </li>
                );
              })}
            </ul>
            <Link to="/menu/dinner" className="text-link">
              Full dinner menu <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="services wrap" aria-labelledby="services-title">
        <h2 id="services-title" className="section-title">
          Three menus, one fire.
        </h2>
        <ul className="service-list">
          {services.map((s) => (
            <li key={s.id}>
              <Link to={`/menu/${s.id}`} className="service-link">
                <span className="service-name">{s.name}</span>
                <span className="service-when">{s.when}</span>
                <span className="service-intro">
                  {s.intro.replace(/\. .*$/, ".")}
                </span>
                <ArrowRight aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="oven-band" aria-labelledby="oven-title">
        <div className="wrap oven-grid">
          <Photo photo={photos.fire} className="arch oven-img" />
          <div className="oven-copy">
            <h2 id="oven-title">{home.oven.title}</h2>
            {home.oven.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <ol className="oven-day">
              {ovenDay.map((o) => (
                <li key={o.time}>
                  <span className="num">{o.time}</span>
                  {o.what}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="spotlight wrap" aria-labelledby="spot-title">
        {spot.photo && <Photo photo={spot.photo} className="spot-img" />}
        <div className="spot-copy">
          <h2 id="spot-title">{home.spotlight.title}</h2>
          <p>{home.spotlight.body}</p>
          <p className="spot-dish">
            <Link to={`/menu/${spot.service}/${spot.id}`}>{spot.name}</Link>{" "}
            <Diets dish={spot} />{" "}
            <span className="num">{money(spot.price)}</span>
          </p>
        </div>
      </section>

      <section className="planner-teaser" aria-labelledby="plan-title">
        <div className="wrap teaser-grid">
          <div>
            <h2 id="plan-title">{home.planner.title}</h2>
            <p>{home.planner.body}</p>
            <Link to="/menu/dinner" className="btn btn-primary">
              Start planning
            </Link>
          </div>
          <figure className="ticket ticket-sample">
            <figcaption>A table for four, last Friday</figcaption>
            <ul className="ticket-lines">
              {sample.map(([id, q]) => (
                <li key={id}>
                  <span className="ticket-qty num">{q}×</span>
                  <span>{byId(id).name}</span>
                  <span className="num">{money(byId(id).price * q)}</span>
                </li>
              ))}
            </ul>
            <dl className="ticket-total">
              <div>
                <dt>Total</dt>
                <dd className="num">{money(sampleTotal)}</dd>
              </div>
              <div>
                <dt>About, per head</dt>
                <dd className="num">{money(sampleTotal / 4)}</dd>
              </div>
            </dl>
            <p className="advice-line">
              A good spread for 4. Leave dessert until later.
            </p>
          </figure>
        </div>
      </section>

      <section className="home-events wrap" aria-labelledby="events-title">
        <div className="section-head">
          <h2 id="events-title" className="section-title">
            Coming up at the long table
          </h2>
          <Link to="/events" className="text-link">
            All events <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <ul className="event-list">
          {upcoming.map((e) => (
            <EventRow key={e.id} event={e} />
          ))}
        </ul>
      </section>

      <section className="pd-band wrap" aria-labelledby="pd-title">
        <Photo photo={photos.dining} className="pd-img" />
        <div className="pd-copy">
          <h2 id="pd-title">{home.privateDining.title}</h2>
          <p>{home.privateDining.body}</p>
          <Link to="/private-dining" className="btn btn-ghost">
            Private dining
          </Link>
        </div>
      </section>

      <section className="regulars wrap" aria-labelledby="regulars-title">
        <h2 id="regulars-title" className="section-title">
          Heard at the counter
        </h2>
        <ul>
          {home.regulars.map((r) => (
            <li key={r.who}>
              <blockquote>
                <p>“{r.quote}”</p>
              </blockquote>
              <p className="who">{r.who}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="close-band" aria-labelledby="close-title">
        <div className="wrap close-grid">
          <div>
            <h2 id="close-title">{home.close.title}</h2>
            <p>{home.close.body}</p>
            <div className="actions">
              <Link to="/reservations" className="btn btn-primary">
                Book a table
              </Link>
              <Link to="/visit" className="btn btn-ghost">
                How to find us
              </Link>
            </div>
          </div>
          <div className="close-info">
            <OpenNow />
            <p className="close-address">
              {brand.street}
              <br />
              {brand.area}, {brand.postcode}
            </p>
            <dl className="hours-mini">
              {week.map((d) => (
                <div key={d.day}>
                  <dt>{d.short}</dt>
                  <dd className="num">
                    {d.dinner ? span(d.dinner) : "Closed"}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </div>
  );
}
