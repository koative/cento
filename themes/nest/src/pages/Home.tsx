import { ArrowRight, Clock, MapPin, Utensils } from "lucide-react";
import { Link } from "../router";
import {
  brand,
  faqs,
  homeSections as h,
  images,
  menu,
  rooms,
  story,
  team,
  testimonials,
} from "../content";
import { GrowthChart } from "../components/GrowthChart";
import { DayTimeline } from "../components/DayTimeline";
import { Peg } from "../components/Peg";
import { TourCta } from "../components/TourCta";
import { money } from "../lib/fees";

export function Home() {
  const leads = team.filter((p) => p.roomId);
  const [quote] = testimonials;
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <h1>{brand.tagline}</h1>
            <p className="lede">{brand.description}</p>
            <div className="actions">
              <Link to="/tour" className="btn btn-primary">
                Book a tour <ArrowRight aria-hidden="true" />
              </Link>
              <Link to="/fees" className="btn btn-ghost">
                Work out your fees
              </Link>
            </div>
            <ul className="hero-facts">
              <li>
                <Clock aria-hidden="true" /> {brand.hours}
              </li>
              <li>
                <MapPin aria-hidden="true" /> {brand.address.join(", ")}
              </li>
              <li>
                <Utensils aria-hidden="true" /> Three meals a day, cooked here
              </li>
            </ul>
          </div>
          <figure className="hero-photo">
            <img
              src={images.hero.src}
              alt={images.hero.alt}
              width={images.hero.w}
              height={images.hero.h}
              fetchPriority="high"
            />
          </figure>
        </div>
        <nav className="wrap hero-rooms" aria-label="Rooms by age">
          {rooms.map((r) => (
            <Link
              key={r.id}
              to={`/rooms/${r.id}`}
              style={{ background: r.color }}
            >
              <strong>{r.name}</strong>
              <span>{r.ages.split(" · ")[0]}</span>
            </Link>
          ))}
        </nav>
      </section>

      <section className="section">
        <div className="wrap split">
          <div className="split-head">
            <h2>{h.roomsTitle}</h2>
            <p>{h.roomsText}</p>
            <Link to="/rooms" className="text-link">
              Find your child's room <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <GrowthChart />
        </div>
        <div className="wrap room-mosaic">
          {rooms.map((r) => (
            <Link key={r.id} to={`/rooms/${r.id}`} className="mosaic-tile">
              <img
                src={r.image.src}
                alt={r.image.alt}
                width={r.image.w}
                height={r.image.h}
                loading="lazy"
              />
              <span className="mosaic-tag" style={{ background: r.color }}>
                {r.name} <small>{r.ages.split(" · ")[0]}</small>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section section-oat">
        <div className="wrap">
          <div className="section-head">
            <h2>{h.dayTitle}</h2>
            <Link to="/day" className="text-link">
              The full day, hour by hour <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <DayTimeline compact />
        </div>
      </section>

      <section className="section">
        <div className="wrap principles">
          <figure className="principles-photo">
            <img
              src={images.parachute.src}
              alt={images.parachute.alt}
              width={images.parachute.w}
              height={images.parachute.h}
              loading="lazy"
            />
          </figure>
          <div>
            <h2>How we look after your child</h2>
            <dl className="principle-list">
              {story.principles.map((p) => (
                <div key={p.title}>
                  <dt>{p.title}</dt>
                  <dd>{p.text}</dd>
                </div>
              ))}
            </dl>
            <Link to="/about" className="text-link">
              Our story <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-ink">
        <div className="wrap split">
          <div className="split-head">
            <h2>{h.feesTitle}</h2>
            <p>{h.feesText}</p>
            <Link to="/fees" className="btn btn-sun">
              Open the fees calculator <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <table className="rate-table">
            <caption className="sr-only">Session prices by room</caption>
            <thead>
              <tr>
                <th scope="col">Room</th>
                <th scope="col">Shortest session</th>
                <th scope="col">Longest session</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((r) => {
                const first = r.sessions[0];
                const last = r.sessions[r.sessions.length - 1];
                return (
                  <tr key={r.id}>
                    <th scope="row">
                      <span
                        className="dot"
                        style={{ background: r.color }}
                        aria-hidden="true"
                      />{" "}
                      {r.name}
                    </th>
                    <td>
                      <span className="num">{money(first.price)}</span>{" "}
                      <small>{first.label.toLowerCase()}</small>
                    </td>
                    <td>
                      <span className="num">{money(last.price)}</span>{" "}
                      <small>{last.label.toLowerCase()}</small>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <h2>{h.menuTitle}</h2>
            <p>
              {menu.week}. {menu.note}
            </p>
          </div>
          <div
            className="menu-board"
            role="region"
            aria-label="This week's menu"
            tabIndex={0}
          >
            <table>
              <thead>
                <tr>
                  <td />
                  {menu.days.map((d) => (
                    <th key={d.day} scope="col">
                      {d.day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {menu.meals.map((meal, i) => (
                  <tr key={meal}>
                    <th scope="row">{meal}</th>
                    {menu.days.map((d) => (
                      <td key={d.day}>{d.items[i]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section section-peach">
        <div className="wrap quote-block">
          <figure className="quote-photo">
            <img
              src={images.laughing.src}
              alt={images.laughing.alt}
              width={images.laughing.w}
              height={images.laughing.h}
              loading="lazy"
            />
          </figure>
          <blockquote>
            <p>“{quote.quote}”</p>
            <footer>
              <strong>{quote.who}</strong>
              <span>{quote.detail}</span>
            </footer>
          </blockquote>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <h2>{h.teamTitle}</h2>
            <p>{h.teamText}</p>
          </div>
          <ul className="peg-rail">
            {leads.map((p) => (
              <li key={p.id}>
                <Peg symbol={p.symbol} color={p.color} name={p.name} />
                <p>
                  <strong>{p.name}</strong>
                  <span>{p.role}</span>
                </p>
              </li>
            ))}
          </ul>
          <Link to="/team" className="text-link">
            Meet the whole team <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="section section-oat">
        <div className="wrap split">
          <div className="split-head">
            <h2>Questions parents ask first</h2>
            <p>
              Sickness, settling in, allergies, pickups: it's all in parent
              info.
            </p>
            <Link to="/parents" className="text-link">
              Read parent info <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <div className="faq">
            {faqs.slice(0, 4).map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <TourCta title={h.closeTitle} />
    </>
  );
}
