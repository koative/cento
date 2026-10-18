import { booksellers, type Book } from "../content";
import { Link } from "../router";
import { BookCover } from "./BookCover";

/** The handwritten card a bookseller clips to the shelf under a book they love. */
export function ShelfTalker({
  book,
  withCover = true,
}: {
  book: Book;
  withCover?: boolean;
}) {
  if (!book.pick) return null;
  const by = booksellers.find((b) => b.id === book.pick?.by);
  return (
    <figure className="talker">
      {withCover && (
        <Link
          to={`/books/${book.slug}`}
          className="talker-cover"
          tabIndex={-1}
          aria-hidden="true"
        >
          <BookCover book={book} />
        </Link>
      )}
      <div className="talker-card">
        <blockquote>
          <p>{book.pick.note}</p>
        </blockquote>
        <figcaption>
          <Link to={`/books/${book.slug}`} className="talker-title">
            {book.title}
          </Link>
          <span>
            {book.author} · chosen by {by?.name}
          </span>
        </figcaption>
      </div>
    </figure>
  );
}
