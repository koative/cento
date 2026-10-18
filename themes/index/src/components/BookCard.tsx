import { booksellers, fromPrice, type Book } from "../content";
import { Link } from "../router";
import { money } from "../lib/format";
import { BookCover } from "./BookCover";

/** A book as it sits on a shelf: cover, then title, author and the lowest price. */
export function BookCard({
  book,
  showPick = false,
}: {
  book: Book;
  showPick?: boolean;
}) {
  const picker =
    showPick && book.pick
      ? booksellers.find((b) => b.id === book.pick?.by)
      : undefined;
  return (
    <article className="book-card">
      <Link to={`/books/${book.slug}`} className="book-card-link">
        <BookCover book={book} />
        <h3>{book.title}</h3>
      </Link>
      <p className="book-card-author">{book.author}</p>
      <p className="book-card-price">
        {book.formats.length > 1 && <span>from </span>}
        {money(fromPrice(book))}
        {picker && (
          <span className="book-card-pick">
            {picker.name.split(" ")[0]} recommends
          </span>
        )}
      </p>
    </article>
  );
}
