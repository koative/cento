import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import {
  about,
  bar,
  brand,
  club,
  events,
  home,
  hours,
  images,
  visit,
  wines,
} from "../content";
import { money } from "../lib/cart";
import { dayParts } from "../lib/format";
import { Bottle } from "../components/Bottle";
import { WineCard } from "../components/WineCard";
import { TasteFinder } from "../components/TasteFinder";

const shelf = [
  "porch-light",
  "cloud-study",
  "tea-leaves",
  "soft-landing",
  "under-the-veil",
  "red-clay",
  "sunday-table",
].map((id) => wines.find((w) => w.id === id)!);
const newest = [...wines]
  .sort((a, b) => b.added.localeCompare(a.added))
  .slice(0, 4);
const pouring = wines.filter((w) => w.glass).slice(0, 7);
const growers = ["tea-leaves", "red-clay", "amber-hour"].map((id) =>
  wines.find((w) => w.id === id)!,
);

export function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <h1>{home.title}</h1>
          <div className="hero-side">
            <p className="lead">{home.lede}</p>
            <div className="actions">
              <Link to="/wines" className="btn">
                Shop {wines.length} bottles{" "}
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link to="/finder" className="btn btn-ghost">
                Find your bottle
              </Link>
            </div>
          </div>
        </div>
        <div className="shelf" aria-label="On the shelf">
          {shelf.map((w, i) => (
            <Link
              key={w.id}
              to={"/wines/" + w.id}
              className="shelf-bottle"
              style={{ "--i": i } as CSSProperties}
            >
              <Bottle wine={w} />
              <span className="price-tag">
                <span>{w.name}</span>
                <b className="num">{money(w.price)}</b>
              </span>
            </Link>
          ))}
        </div>
        <aside className="tonight" aria-labelledby="tonight-title">
          <h2 id="tonight-title">{home.tonight}</h2>
          <p>
            Bar from {hours[2].bar.split(" – ")[0]} · {brand.street}
          </p>
          <ul>
            {pouring.slice(0, 4).map((w) => (
              <li key={w.id}>
                <span>{w.name}</span>
                <span className="dots" aria-hidden="true" />
                <span className="num">{money(w.glass!)}</span>
              </li>
            ))}
          </ul>
          <Link to="/bar" className="text-link">
            Full board <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </aside>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>{home.shelfTitle}</h2>
          <Link to="/wines" className="text-link">
            All {wines.length} wines <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="wine-grid">
          {newest.map((w) => (
            <WineCard key={w.id} wine={w} />
          ))}
        </div>
      </section>

      <section className="section finder-section">
        <div className="section-head stacked">
          <h2>{home.finderTitle}</h2>
          <p>{home.finderText}</p>
        </div>
        <TasteFinder />
      </section>

      <section className="night-band">
        <div className="night-inner">
          <img
            src={images.chalkboard}
            alt="The bar at Pour after dark, bulbs hanging over the chalkboard"
            width={1400}
            height={933}
            loading="lazy"
          />
          <div>
            <h2>{home.barTitle}</h2>
            <p>{bar.intro}</p>
            <ul className="board">
              {pouring.map((w) => (
                <li key={w.id}>
                  <span>
                    {w.name}{" "}
                    <small>
                      {w.colour.toLowerCase()} · {w.country}
                    </small>
                  </span>
                  <span className="dots" aria-hidden="true" />
                  <span className="num">{money(w.glass!)}</span>
                </li>
              ))}
            </ul>
            <Link to="/bar" className="btn btn-light">
              See the bar menu <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section growers">
        <figure className="growers-photo">
          <img
            src={images.harvest}
            alt="A picker cutting a bunch of dark grapes by hand"
            width={1300}
            height={866}
            loading="lazy"
          />
        </figure>
        <div>
          <h2>{home.growersTitle}</h2>
          <p className="lead">{about.rules[3].text}</p>
          <ul className="grower-list">
            {growers.map((w) => (
              <li key={w.id}>
                <h3>{w.producer}</h3>
                <p className="grower-place">
                  {w.region}, {w.country}
                </p>
                <p>{w.story.split(". ")[0]}.</p>
                <Link to={"/wines/" + w.id} className="text-link">
                  Taste {w.name} <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>{home.tastingsTitle}</h2>
          <Link to="/tastings" className="text-link">
            All tastings <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <ul className="event-list">
          {events.slice(0, 3).map((e) => {
            const d = dayParts(e.date);
            return (
              <li key={e.id}>
                <span className="event-date">
                  <small>{d.weekday}</small>
                  <b>{d.day}</b>
                  <small>{d.month}</small>
                </span>
                <div>
                  <p className="event-kind">
                    {e.kind} · {e.time}
                  </p>
                  <h3>
                    <Link to={"/tastings/" + e.id}>{e.title}</Link>
                  </h3>
                  <p>{e.summary}</p>
                </div>
                <span className="event-price">
                  <b className="num">{money(e.price)}</b>
                  <small data-low={e.left <= 6 || undefined}>
                    {e.left} seats left
                  </small>
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="club-band">
        <img
          src={images.table}
          alt="Glasses of white wine and plates on a long candlelit table"
          width={1600}
          height={1066}
          loading="lazy"
        />
        <div className="club-band-copy">
          <h2>{home.clubTitle}</h2>
          <p>{club.intro}</p>
          <ul className="club-mini">
            {club.tiers.map((t) => (
              <li key={t.id}>
                <b>{t.name}</b>
                <span>{t.bottles} bottles</span>
                <span className="num">{money(t.monthly)}/mo</span>
              </li>
            ))}
          </ul>
          <Link to="/club" className="btn">
            Join the club <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="section manifesto">
        <h2>{home.rulesTitle}</h2>
        <p className="manifesto-text">{visit.faq[0].a}</p>
        <ul className="manifesto-terms">
          {about.rules.map((r) => (
            <li key={r.title}>{r.title}</li>
          ))}
        </ul>
        <Link to="/about" className="text-link">
          How we buy <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </section>

      <section className="close">
        <div>
          <h2>{home.visitTitle}</h2>
          <p className="lead">
            {brand.street}, {brand.area}. The shop opens at 11, the bar at 4,
            and someone is always happy to open a bottle for you to taste.
          </p>
          <div className="actions">
            <Link to="/visit" className="btn">
              Hours & directions
            </Link>
            <a href={brand.phoneHref} className="btn btn-ghost">
              Call {brand.phone}
            </a>
          </div>
        </div>
        <img
          src={images.vigneron}
          alt="A winemaker tasting a glass of red in a small tasting room"
          width={1300}
          height={975}
          loading="lazy"
        />
      </section>
    </>
  );
}
