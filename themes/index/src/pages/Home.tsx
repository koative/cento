import { ArrowRight } from "lucide-react";
import {
  about,
  bookBySlug,
  books,
  brand,
  club,
  events,
  home,
  images,
  pickBooks,
} from "../content";
import { Link } from "../router";
import { dateLong, money, shopStatus } from "../lib/format";
import { BookCover } from "../components/BookCover";
import { BookCard } from "../components/BookCard";
import { CardDrawer } from "../components/CardDrawer";
import { ShelfTalker } from "../components/ShelfTalker";
import { EventRow } from "./Events";
import { HoursTable } from "./About";

export function Home() {
  const status = shopStatus();
  const front = pickBooks(home.frontTable);
  const clubBook = bookBySlug(club.current);
  const picks = books.filter((b) => b.pick).slice(0, 3);

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="status-line" data-open={status.open || undefined}>
            <span aria-hidden="true" /> {status.text} · {brand.address}
          </p>
          <h1>{home.heading}</h1>
          <p className="lede">{home.lede}</p>
          <div className="actions">
            <Link to="/books" className="btn">
              Browse the catalogue <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link to="/staff-picks" className="btn btn-ghost">
              What we're reading
            </Link>
          </div>
        </div>
        <div className="front-table" aria-label="On the front table this week">
          {front.map((b, i) => (
            <Link
              key={b.slug}
              to={`/books/${b.slug}`}
              className={`front-book front-book-${i + 1}`}
            >
              <BookCover book={b} />
              <span className="front-tag">
                <strong>{b.title}</strong> {money(b.formats[0].price)}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="band">
        <div className="band-head">
          <h2>New on the front table</h2>
          <Link to="/books" className="text-link">
            All {books.length} books in the catalogue{" "}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="shelf-row">
          {pickBooks(home.newArrivals).map((b) => (
            <BookCard key={b.slug} book={b} />
          ))}
        </div>
      </section>

      <section className="drawer-section">
        <div className="drawer-intro">
          <h2>{home.drawer.heading}</h2>
          <p>{home.drawer.text}</p>
        </div>
        <CardDrawer />
      </section>

      <section className="band talkers-band">
        <div className="band-head">
          <h2>Clipped to the shelves this month</h2>
          <Link to="/staff-picks" className="text-link">
            Every staff pick <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="talker-row">
          {picks.map((b) => (
            <ShelfTalker key={b.slug} book={b} />
          ))}
        </div>
      </section>

      <figure className="wall">
        <img
          src={images.wall}
          alt="A floor-to-ceiling wall of bookshelves in lamplight, every shelf full"
          width={1800}
          height={1055}
          loading="lazy"
        />
        <blockquote>
          <p>{home.quote.text}</p>
          <footer>{home.quote.by}</footer>
        </blockquote>
      </figure>

      <section className="band">
        <div className="band-head">
          <h2>Coming up in the back room</h2>
          <Link to="/events" className="text-link">
            Full events calendar <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <ol className="event-list">
          {events.slice(0, 3).map((e) => (
            <EventRow key={e.slug} event={e} />
          ))}
        </ol>
      </section>

      {clubBook && (
        <section className="club-feature">
          <BookCover book={clubBook} />
          <div>
            <h2>
              October's club book is <em>{clubBook.title}</em>
            </h2>
            <p>{club.lede}</p>
            <p className="club-meta">
              We meet {dateLong(club.meetings[0].date)}, 7pm, Room Three ·
              Membership from {money(club.plans[2].perMonth)} a month
            </p>
            <div className="actions">
              <Link to="/book-club" className="btn">
                Join the Index Club
              </Link>
              <Link to={`/books/${clubBook.slug}`} className="btn btn-ghost">
                Just buy the book
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="visit">
        <img
          src={images.window}
          alt="A small shop window in an old stone wall, filled with books and prints"
          width={1125}
          height={1500}
          loading="lazy"
        />
        <div className="visit-copy">
          <h2>Find us on Quarry Lane</h2>
          <p>
            {brand.address}, between the lime tree and the old towpath.{" "}
            {about.access}
          </p>
          <HoursTable />
          <Link to="/about" className="text-link">
            Our story and the three rooms{" "}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="close">
        <h2>{home.specialOrder.heading}</h2>
        <p>{home.specialOrder.text}</p>
        <div className="actions">
          <a
            className="btn"
            href={`mailto:${brand.email}?subject=Special%20order`}
          >
            Email a special order
          </a>
          <a className="btn btn-ghost" href={brand.phoneHref}>
            Call {brand.phone}
          </a>
        </div>
      </section>
    </>
  );
}
