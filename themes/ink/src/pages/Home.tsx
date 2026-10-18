import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import {
  artists,
  brand,
  designById,
  flash,
  home,
  hours,
  images,
} from "../content";
import { money } from "../lib/ink";
import { FlashArt } from "../components/FlashArt";
import { FlashCard } from "../components/FlashCard";

export function Home() {
  const pinned = designById("sunwheel")!;
  const wall = flash.filter((d) => d.availability !== "claimed").slice(0, 8);
  const sized = designById("orbit")!;

  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <h1>{home.title}</h1>
            <p className="lede">{home.intro}</p>
            <div className="actions">
              <Link to="/flash" className="btn btn-ink">
                Open the flash book <ArrowRight aria-hidden="true" />
              </Link>
              <Link to="/book" className="btn btn-line">
                Request a booking
              </Link>
            </div>
          </div>
          <figure className="hero-photo">
            <img
              src={images.studio.src}
              alt={images.studio.alt}
              width={images.studio.w}
              height={images.studio.h}
            />
            <Link
              to={`/flash/${pinned.id}`}
              className="pinned-sheet"
              aria-label={`Flash No. ${pinned.no}, ${pinned.name}, from ${money(pinned.price)}`}
            >
              <span className="flash-no">No. {pinned.no}</span>
              <FlashArt art={pinned.id} />
              <span className="pinned-meta">
                <span>{pinned.name}</span>
                <span>from {money(pinned.price)}</span>
              </span>
            </Link>
          </figure>
        </div>
        <ul className="wrap hero-strip" aria-label="On the wall now">
          {flash.slice(0, 6).map((d) => (
            <li key={d.id}>
              <Link to={`/flash/${d.id}`}>
                <FlashArt art={d.id} />
                <span>{d.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="section wall">
        <div className="wrap">
          <div className="section-head split">
            <h2>{home.wallTitle}</h2>
            <p>{home.wallIntro}</p>
          </div>
          <div className="flash-grid">
            {wall.map((d) => (
              <FlashCard key={d.id} design={d} />
            ))}
          </div>
          <Link to="/flash" className="text-link">
            All {flash.length} sheets in the flash book{" "}
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="section sizer-teaser">
        <div className="wrap teaser-grid">
          <div>
            <h2>{home.sizerTitle}</h2>
            <p>{home.sizerText}</p>
            <Link to={`/flash/${sized.id}`} className="btn btn-paper">
              Try it on {sized.name}
            </Link>
          </div>
          <div className="teaser-sheets" aria-hidden="true">
            {[6, 10, 14].map((cm) => (
              <div key={cm} className="teaser-sheet">
                <div style={{ width: `${(cm / 14) * 100}%` }}>
                  <FlashArt art={sized.id} />
                </div>
                <span>{cm} cm</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section steps">
        <div className="wrap">
          <h2>{home.stepsTitle}</h2>
          <ol className="step-list">
            {home.steps.map((s) => (
              <li key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section artists-band">
        <div className="wrap">
          <div className="section-head split">
            <h2>{home.artistsTitle}</h2>
            <Link to="/artists" className="text-link">
              Meet the artists <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <ul className="artist-strip">
            {artists.map((a) => (
              <li key={a.id}>
                <Link to={`/artists/${a.id}`}>
                  <img
                    src={a.photo.src}
                    alt={a.photo.alt}
                    width={a.photo.w}
                    height={a.photo.h}
                    loading="lazy"
                  />
                  <span className="artist-name">{a.name}</span>
                  <span className="artist-role">{a.role}</span>
                  <span className="books" data-state={a.books}>
                    {a.books === "open" ? "Books open" : "Waitlist"}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="statement">
        <div className="wrap statement-grid">
          <img
            src={images.stencil.src}
            alt={images.stencil.alt}
            width={images.stencil.w}
            height={images.stencil.h}
            loading="lazy"
          />
          <div>
            <h2>{home.statement}</h2>
            <p>{home.statementText}</p>
          </div>
        </div>
      </section>

      <section className="section friday">
        <div className="wrap friday-grid">
          <div>
            <h2>{home.fridayTitle}</h2>
            <p>{home.fridayText}</p>
          </div>
          <div className="ticket">
            <span className="ticket-no" aria-hidden="true">
              07
            </span>
            <ul>
              {home.fridayRules.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section prices">
        <div className="wrap prices-grid">
          <h2>{home.pricesTitle}</h2>
          <dl className="price-list">
            {home.prices.map((p) => (
              <div key={p.item}>
                <dt>{p.item}</dt>
                <dd className="price-value">{p.value}</dd>
                <dd className="price-note">{p.note}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section reviews">
        <div className="wrap">
          <h2>{home.reviewsTitle}</h2>
          <div className="review-list">
            {home.reviews.map((r) => (
              <figure key={r.name}>
                <blockquote>
                  <p>{r.quote}</p>
                </blockquote>
                <figcaption>
                  {r.name} · <span>{r.piece}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section aftercare-teaser">
        <div className="wrap teaser-grid">
          <img
            src={images.fineLine.src}
            alt={images.fineLine.alt}
            width={images.fineLine.w}
            height={images.fineLine.h}
            loading="lazy"
          />
          <div>
            <h2>{home.aftercareTitle}</h2>
            <p>{home.aftercareText}</p>
            <Link to="/aftercare" className="text-link">
              Open the healing clock <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="close">
        <div className="wrap close-grid">
          <div>
            <h2>{home.closeTitle}</h2>
            <p>{home.closeText}</p>
            <div className="actions">
              <Link to="/book" className="btn btn-red">
                Request a booking
              </Link>
              <Link to="/flash" className="btn btn-paper">
                Browse flash
              </Link>
            </div>
          </div>
          <div className="close-visit">
            <p>
              {brand.street}
              <br />
              {brand.city}, {brand.region}
            </p>
            <dl className="hours">
              {hours.map((h) => (
                <div key={h.days}>
                  <dt>{h.days}</dt>
                  <dd>{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
