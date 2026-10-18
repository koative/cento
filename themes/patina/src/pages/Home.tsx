import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import {
  brand,
  categories,
  grades,
  home,
  pieceById,
  pieces,
  restoration,
  rooms,
  sell,
} from "../content";
import { PieceCard, Tag } from "../components/Tag";
import { FitCheck } from "../components/FitCheck";
import { money } from "../lib/cart";

export function Home() {
  const arrivals = pieces
    .filter((p) => !p.sold)
    .sort((a, b) => b.arrived.localeCompare(a.arrived))
    .slice(0, 4);
  const room = rooms[1];
  const fitPiece = pieceById(home.fitPieceId)!;

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-copy">
          <h1>{home.title}</h1>
          <p className="lead">{home.intro}</p>
          <div className="actions">
            <Link to="/shop" className="btn">
              Shop the floor <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link to="/rooms" className="btn btn-ghost">
              See the room sets
            </Link>
          </div>
          <p className="hero-note">
            {brand.floorNote} Open Thursday to Sunday at {brand.addressShort}.
          </p>
        </div>
        <figure className="hero-media">
          <img
            src={home.heroImage.src}
            alt={home.heroImage.alt}
            width={home.heroImage.w}
            height={home.heroImage.h}
            fetchPriority="high"
          />
          {home.heroTags.map(({ pieceId, x, y }) => {
            const piece = pieceById(pieceId)!;
            return (
              <Link
                key={pieceId}
                to={"/shop/" + piece.id}
                className="hero-tag"
                style={{ left: x + "%", top: y + "%" }}
                aria-label={`${piece.name}, ${money(piece.price)}`}
              >
                <Tag piece={piece} />
              </Link>
            );
          })}
        </figure>
      </section>

      <section className="section arrivals" aria-labelledby="arrivals-h">
        <div className="section-head">
          <h2 id="arrivals-h">{home.arrivalsTitle}</h2>
          <p>{home.arrivalsText}</p>
          <Link to="/shop" className="text-link">
            All {pieces.filter((p) => !p.sold).length} pieces on the floor{" "}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="piece-grid">
          {arrivals.map((p) => (
            <PieceCard key={p.id} piece={p} />
          ))}
        </div>
      </section>

      <section className="section kinds" aria-labelledby="kinds-h">
        <h2 id="kinds-h">{home.kindsTitle}</h2>
        <ul className="kinds-list">
          {categories.map((c) => {
            const inCat = pieces.filter((p) => p.category === c && !p.sold);
            return (
              <li key={c}>
                <Link to={"/shop?category=" + c}>
                  <span className="kinds-name">{c}</span>
                  <span className="kinds-count">
                    {inCat.length} on the floor
                  </span>
                  <span className="kinds-from">
                    from {money(Math.min(...inCat.map((p) => p.price)))}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="section room-feature" aria-labelledby="room-h">
        <figure className="room-feature-media">
          <img
            src={room.image.src}
            alt={room.image.alt}
            width={room.image.w}
            height={room.image.h}
            loading="lazy"
          />
        </figure>
        <div className="room-feature-copy">
          <h2 id="room-h">{home.roomTitle}</h2>
          <p>{home.roomText}</p>
          <h3>{room.name}</h3>
          <ul className="ledger">
            {room.pieces.map(({ id }) => {
              const p = pieceById(id)!;
              return (
                <li key={id}>
                  <Link to={"/shop/" + id}>{p.name}</Link>
                  <span>{p.sold ? "Sold" : money(p.price)}</span>
                </li>
              );
            })}
          </ul>
          <Link to={"/rooms/" + room.slug} className="text-link">
            Walk through {room.name.toLowerCase()}{" "}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="section home-fit">
        <FitCheck piece={fitPiece} title={home.fitTitle} />
        <p className="home-fit-link">
          Shown with the{" "}
          <Link to={"/shop/" + fitPiece.id}>{fitPiece.name}</Link>,{" "}
          {fitPiece.stock}. Every piece page carries the same check.
        </p>
      </section>

      <section className="band restore-band" aria-labelledby="restore-h">
        <div className="band-inner">
          <figure>
            <img
              src={restoration.image.src}
              alt={restoration.image.alt}
              width={restoration.image.w}
              height={restoration.image.h}
              loading="lazy"
            />
          </figure>
          <div>
            <h2 id="restore-h">{home.restoreTitle}</h2>
            <p>{home.restoreText}</p>
            <ul className="ledger ledger-light">
              {restoration.services.slice(0, 4).map((s) => (
                <li key={s.name}>
                  <span>{s.name}</span>
                  <span>from {money(s.from)}</span>
                </li>
              ))}
            </ul>
            <Link to="/restoration" className="btn btn-light">
              Restoration prices &amp; estimate{" "}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section sell-teaser" aria-labelledby="sell-h">
        <div>
          <h2 id="sell-h">{home.sellTitle}</h2>
          <p>{home.sellText}</p>
          <ol className="steps">
            {home.sellSteps.map((s) => (
              <li key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
          <Link to="/sell" className="btn">
            Send us photographs <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <figure className="sell-teaser-media">
          <img
            src={sell.image.src}
            alt={sell.image.alt}
            width={sell.image.w}
            height={sell.image.h}
            loading="lazy"
          />
          <figcaption>{sell.imageCaption}</figcaption>
        </figure>
      </section>

      <section className="section grades" aria-labelledby="grades-h">
        <h2 id="grades-h">{home.gradesTitle}</h2>
        <dl className="grade-list">
          {grades.map((g) => (
            <div key={g.id}>
              <dt>
                <span className="grade-letter" aria-hidden="true">
                  {g.id}
                </span>
                {g.name}
              </dt>
              <dd>{g.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <figure className="section pull-quote">
        <blockquote>
          <p>{home.quote.text}</p>
        </blockquote>
        <figcaption>{home.quote.who}</figcaption>
      </figure>

      <section className="section close" aria-labelledby="close-h">
        <figure>
          <img
            src={home.closeImage.src}
            alt={home.closeImage.alt}
            width={home.closeImage.w}
            height={home.closeImage.h}
            loading="lazy"
          />
        </figure>
        <div>
          <h2 id="close-h">{home.closeTitle}</h2>
          <p>{home.closeText}</p>
          <dl className="hours">
            {brand.hours.map((h) => (
              <div key={h.days}>
                <dt>{h.days}</dt>
                <dd>{h.time}</dd>
              </div>
            ))}
          </dl>
          <p className="close-address">{brand.address}</p>
          <Link to="/visit" className="btn">
            Directions &amp; delivery{" "}
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
