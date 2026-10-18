import { ArrowRight, CalendarPlus, Ticket as TicketIcon } from "lucide-react";
import { Link } from "../router";
import {
  brand,
  drops,
  home,
  lookbook,
  modeLabel,
  photos,
  products,
  store,
} from "../content";
import { money } from "../lib/cart";
import {
  at,
  buyable,
  dayLabel,
  downloadIcs,
  dropNo,
  dropStatus,
  nextDrop,
  openRaffles,
  productsIn,
  soldOut,
  timeLabel,
  useNow,
} from "../lib/time";
import { Countdown } from "../components/Countdown";
import { Flat } from "../components/Flat";
import { ProductCard } from "../components/ProductCard";
import { Ticket } from "../components/Ticket";

export function Home() {
  const now = useNow();
  const next = nextDrop(now);
  const lineup = productsIn(next);
  const upcoming = drops.filter((d) => at(d.date) > now);
  const archive = drops.filter((d) => at(d.date) <= now).reverse();
  const rail = products
    .filter((p) => buyable(p, now) && !soldOut(p))
    .slice(0, 4);
  const raffle = openRaffles(now)[0];
  const start = at(next.date);

  return (
    <div className="home">
      <section className="hero" aria-labelledby="h-hero">
        <div className="hero-copy">
          <h1 id="h-hero">{next.name}</h1>
          <p className="hero-lead">
            Drop {dropNo(next)} lands {dayLabel(start)} at {timeLabel(start)}{" "}
            {brand.tzLabel}. {next.summary}
          </p>
          <Countdown to={start} label={`${next.name} drops in`} />
          <div className="hero-actions">
            <Link to={`/drops/${next.id}`} className="btn btn-signal">
              See the lineup <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <button
              type="button"
              className="btn btn-ghost-light"
              onClick={() => downloadIcs(next)}
            >
              <CalendarPlus size={18} aria-hidden="true" /> Add to calendar
            </button>
          </div>
        </div>
        <figure className="hero-photo">
          <img
            src={next.photo.src}
            alt={next.photo.alt}
            width={next.photo.w}
            height={next.photo.h}
          />
        </figure>
        <ul className="hero-lineup" aria-label={`${next.name} lineup`}>
          {lineup.map((p) => (
            <li key={p.id}>
              <Link to={`/shop/${p.id}`}>
                <span className="plate plate-dark">
                  <Flat product={p} />
                </span>
                <span className="hero-lineup-name">{p.name}</span>
                <span className="num">{money(p.price)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="section calendar-strip" aria-labelledby="h-cal">
        <div className="section-head">
          <h2 id="h-cal">On the calendar</h2>
          <Link to="/drops" className="text-link">
            Full calendar <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <ol className="strip-list">
          {upcoming.map((d) => {
            const status = dropStatus(d, now);
            return (
              <li key={d.id}>
                <Link to={`/drops/${d.id}`} className="strip-row">
                  <span className="strip-date num">{dayLabel(at(d.date))}</span>
                  <span className="strip-name">{d.name}</span>
                  <span className="strip-mode">
                    {status === "raffle-open"
                      ? "Raffle open"
                      : modeLabel[d.mode]}
                  </span>
                  <span className="strip-no num">{dropNo(d)}</span>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="section" aria-labelledby="h-rail">
        <div className="section-head">
          <h2 id="h-rail">On the rail now</h2>
          <Link to="/shop" className="text-link">
            Shop everything <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="product-grid">
          {rail.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="ritual" aria-labelledby="h-ritual">
        <h2 id="h-ritual">{home.ritualTitle}</h2>
        <ol className="ritual-list">
          {home.ritual.map((r) => (
            <li key={r.when}>
              <span className="ritual-when">{r.when}</span>
              <h3>{r.title}</h3>
              <p>{r.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {raffle && (
        <section className="section raffle-teaser" aria-labelledby="h-raffle">
          <div className="raffle-teaser-copy">
            <h2 id="h-raffle">{raffle.name} is raffle only</h2>
            <p>{raffle.summary}</p>
            <Countdown
              to={at(raffle.raffleCloses!)}
              label="Entries close in"
              size="m"
            />
            <Link to="/raffle" className="btn">
              <TicketIcon size={18} aria-hidden="true" /> Enter the raffle
            </Link>
          </div>
          <Ticket drop={raffle} />
        </section>
      )}

      <section className="section look-strip" aria-labelledby="h-look">
        <div className="section-head">
          <h2 id="h-look">Shot on the line</h2>
          <Link to="/lookbook" className="text-link">
            Open the lookbook <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="look-strip-grid">
          {lookbook.looks.slice(1, 4).map((l) => (
            <figure key={l.title}>
              <img
                src={l.photo.src}
                alt={l.photo.alt}
                width={l.photo.w}
                height={l.photo.h}
                loading="lazy"
              />
              <figcaption>
                <b>{l.title}</b> {l.place}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="store-band" aria-labelledby="h-store">
        <img
          src={photos.wall.src}
          alt={photos.wall.alt}
          width={photos.wall.w}
          height={photos.wall.h}
          loading="lazy"
        />
        <div className="store-band-copy">
          <h2 id="h-store">{home.storeTitle}</h2>
          <p>{home.storeText}</p>
          <dl className="hours">
            {store.hours.map((h) => (
              <div key={h.days}>
                <dt>{h.days}</dt>
                <dd>{h.time}</dd>
              </div>
            ))}
          </dl>
          <Link to="/store" className="text-link">
            {brand.address.join(", ")}{" "}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="section" aria-labelledby="h-archive">
        <div className="section-head">
          <h2 id="h-archive">The archive</h2>
          <p className="muted">No restocks. Here is how the last runs went.</p>
        </div>
        <table className="archive-table">
          <thead>
            <tr>
              <th scope="col">Drop</th>
              <th scope="col">Name</th>
              <th scope="col">Date</th>
              <th scope="col">Run</th>
              <th scope="col">Sold through</th>
            </tr>
          </thead>
          <tbody>
            {archive.map((d) => {
              const left = productsIn(d).reduce(
                (s, p) => s + p.stock.reduce((a, b) => a + b, 0),
                0,
              );
              const sold = Math.round((1 - left / d.run) * 100);
              return (
                <tr key={d.id}>
                  <td className="num">{dropNo(d)}</td>
                  <th scope="row">
                    <Link to={`/drops/${d.id}`}>{d.name}</Link>
                  </th>
                  <td className="num">{dayLabel(at(d.date))}</td>
                  <td className="num">{d.run}</td>
                  <td>
                    <span className="meter" aria-hidden="true">
                      <span style={{ width: sold + "%" }} />
                    </span>
                    <span className="num">{sold}%</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      <section className="close" aria-labelledby="h-close">
        <h2 id="h-close">{home.closeTitle}</h2>
        <p>
          {next.name}, {dayLabel(start)}. Online at {timeLabel(start)}{" "}
          {brand.tzLabel}, Hollis Street from 12:00.
        </p>
        <div className="hero-actions">
          <Link to={`/drops/${next.id}`} className="btn btn-signal">
            See the lineup <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link to="/shop" className="btn btn-ghost-light">
            Shop what is left
          </Link>
        </div>
      </section>
    </div>
  );
}
