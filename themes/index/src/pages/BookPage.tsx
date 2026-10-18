import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import {
  books,
  events,
  formatLabels,
  sectionRoom,
  type Book,
} from "../content";
import { Link, navigate } from "../router";
import { addLine } from "../lib/cart";
import { dateLong, money, monthYear } from "../lib/format";
import { BookCover } from "../components/BookCover";
import { BookCard } from "../components/BookCard";
import { ShelfTalker } from "../components/ShelfTalker";
import { Qty } from "../components/Qty";

export function BookPage({ book }: { book: Book }) {
  const [formatId, setFormatId] = useState(book.formats[0].id);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState("");
  const format = book.formats.find((f) => f.id === formatId) ?? book.formats[0];
  const related = [
    ...books.filter((b) => b.section === book.section && b.slug !== book.slug),
    ...books.filter((b) => b.section !== book.section && b.pick),
  ].slice(0, 4);
  const appearances = events.filter((e) => e.book === book.slug);

  function add(thenCheckout: boolean) {
    addLine({
      slug: book.slug,
      title: book.title,
      detail: formatLabels[format.id],
      unit: format.price,
      qty,
    });
    if (thenCheckout) return navigate("/checkout");
    setAdded(
      `${qty} × ${book.title} (${formatLabels[format.id].toLowerCase()}) added to your bag.`,
    );
  }

  return (
    <div className="page book-page">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/books">Catalogue</Link> <span aria-hidden="true">/</span>{" "}
        <span>{book.section}</span>
      </nav>

      <div className="book-hero">
        <div className="book-hero-cover">
          <BookCover book={book} />
        </div>

        <div className="book-buy">
          <h1>
            {book.title}
            {book.subtitle && (
              <span className="book-subtitle">{book.subtitle}</span>
            )}
          </h1>
          <p className="book-byline">
            by {book.author}
            {book.translator && <>, translated by {book.translator}</>}
          </p>

          <fieldset className="formats">
            <legend>Format</legend>
            {book.formats.map((f) => (
              <label key={f.id} className="format-option">
                <input
                  type="radio"
                  name="format"
                  value={f.id}
                  checked={f.id === formatId}
                  onChange={() => {
                    setFormatId(f.id);
                    setQty((q) => Math.min(q, f.stock));
                    setAdded("");
                  }}
                />
                <span className="format-name">{formatLabels[f.id]}</span>
                <span className="format-price">{money(f.price)}</span>
                <span className="format-stock">
                  {f.stock <= 3
                    ? `Only ${f.stock} left`
                    : `${f.stock} on the shelf`}
                </span>
              </label>
            ))}
          </fieldset>

          <div className="buy-row">
            <Qty
              value={qty}
              onChange={setQty}
              label="Quantity"
              max={Math.min(format.stock, 10)}
            />
            <button type="button" className="btn" onClick={() => add(false)}>
              Add to bag · {money(format.price * qty)}
            </button>
          </div>
          <button type="button" className="text-btn" onClick={() => add(true)}>
            Buy now and go to checkout{" "}
            <ArrowRight size={16} aria-hidden="true" />
          </button>
          <p className="added" aria-live="polite">
            {added && (
              <>
                <Check size={16} aria-hidden="true" /> {added}{" "}
                <Link to="/cart">View bag</Link>
              </>
            )}
          </p>
          <ul className="buy-notes">
            <li>
              Collect from Room One in two hours, or bike delivery in Halden
              tomorrow.
            </li>
            <li>Free gift wrap in brown paper and string at checkout.</li>
          </ul>
        </div>
      </div>

      <div className="book-body">
        <div className="book-text">
          <h2>About the book</h2>
          {book.blurb.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
          <blockquote className="first-line">
            <p>{book.firstLine}</p>
            <footer>The first line</footer>
          </blockquote>
          {book.pick && (
            <>
              <h2>From the shelf card</h2>
              <ShelfTalker book={book} withCover={false} />
            </>
          )}
        </div>

        <aside className="book-details" aria-labelledby="details-title">
          <h2 id="details-title">Details</h2>
          <dl>
            <div>
              <dt>Publisher</dt>
              <dd>{book.publisher}</dd>
            </div>
            <div>
              <dt>Published</dt>
              <dd>{monthYear(book.published)}</dd>
            </div>
            <div>
              <dt>Pages</dt>
              <dd>{book.pages}</dd>
            </div>
            <div>
              <dt>Size</dt>
              <dd>{book.size}</dd>
            </div>
            <div>
              <dt>Shelf mark</dt>
              <dd>{book.shelf}</dd>
            </div>
            <div>
              <dt>Room</dt>
              <dd>
                {book.section} · {sectionRoom[book.section]}
              </dd>
            </div>
          </dl>
          <p className="subjects">
            <span>Filed under</span> {book.tracings.join(" · ")}
          </p>
          {appearances.map((e) => (
            <Link key={e.slug} to={`/events/${e.slug}`} className="book-event">
              <strong>{e.title}</strong>
              <span>
                {dateLong(e.date)}, {e.start}
              </span>
            </Link>
          ))}
        </aside>
      </div>

      <section className="band related">
        <div className="band-head">
          <h2>Shelved nearby</h2>
          <Link to="/books" className="text-link">
            Back to the catalogue <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="shelf-row shelf-row-4">
          {related.map((b) => (
            <BookCard key={b.slug} book={b} />
          ))}
        </div>
      </section>
    </div>
  );
}
