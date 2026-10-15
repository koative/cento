import { useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Search,
  Plus,
  Minus,
  BookOpen,
} from "lucide-react";
import library from "./assets/library.jpg";
const books = [
  {
    id: 1,
    title: "The Art of Noticing",
    author: "Ada Hart",
    genre: "Essays",
    price: 24,
    color: "blue",
    subtitle: "Small observations / larger worlds",
    description:
      "A collection of fictional essays on looking a little closer. From the geometry of a city pavement to the rituals of an ordinary morning, Ada Hart makes a case for attention as a daily practice.",
  },
  {
    id: 2,
    title: "A House for Every Season",
    author: "Noah Field",
    genre: "Design",
    price: 38,
    color: "red",
    subtitle: "Spaces for a slower life",
    description:
      "An imagined journey through homes that move with the rhythm of the year. A richly composed study of light, material, and the ways a room can change without moving a single wall.",
  },
  {
    id: 3,
    title: "Almost, Somewhere",
    author: "Iris Cole",
    genre: "Fiction",
    price: 18,
    color: "pink",
    subtitle: "A novel",
    description:
      "Two strangers, a missed train, and a town neither intended to visit. A fictional novel about the lives we might have led and the small choices that bring us back to ourselves.",
  },
  {
    id: 4,
    title: "Ways of Making",
    author: "Leo Mercer",
    genre: "Design",
    price: 32,
    color: "green",
    subtitle: "Conversations with the hands",
    description:
      "An illustrative collection of conversations with ceramicists, weavers, woodworkers, and others who think through making. The process is as interesting as the finished object.",
  },
  {
    id: 5,
    title: "The Long Way Home",
    author: "Rose Bennett",
    genre: "Fiction",
    price: 20,
    color: "yellow",
    subtitle: "A novel in three journeys",
    description:
      "A fictional family story told across three journeys and one persistent question: what do we take with us, and what do we finally learn to leave behind?",
  },
  {
    id: 6,
    title: "On Doing Less",
    author: "Elias North",
    genre: "Essays",
    price: 22,
    color: "brown",
    subtitle: "Notes on enough",
    description:
      "These imagined reflections explore the difference between an empty day and an open one. A thoughtful companion for anyone learning to leave a little room in their life.",
  },
];
export default function App() {
  const [genre, setGenre] = useState("All books");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<number | null>(null);
  const [bag, setBag] = useState<number[]>([]);
  const [showBag, setShowBag] = useState(false);
  const visible = books.filter(
    (b) =>
      (genre === "All books" || b.genre === genre) &&
      `${b.title} ${b.author}`.toLowerCase().includes(query.toLowerCase()),
  );
  const book = books.find((b) => b.id === selected);
  return (
    <>
      <header>
        <a className="logo" href="#">
          index<span>books & other worlds</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#shelf">Browse the shelves</a>
          <a href="#shop">Our little shop</a>
        </nav>
        <button
          className="bag-toggle"
          onClick={() => setShowBag(!showBag)}
          aria-expanded={showBag}
        >
          Book bag <span>{bag.length}</span>
        </button>
      </header>
      {showBag && (
        <aside className="bag" aria-label="Book bag">
          <div>
            <h2>Your next chapter</h2>
            <button onClick={() => setShowBag(false)}>Close</button>
          </div>
          {bag.length ? (
            <>
              <ul>
                {books
                  .filter((b) => bag.includes(b.id))
                  .map((b) => (
                    <li key={b.id}>
                      <span>
                        {b.title}
                        <small>
                          {bag.filter((id) => id === b.id).length} × €{b.price}
                        </small>
                      </span>
                      <button
                        aria-label={`Remove ${b.title}`}
                        onClick={() => setBag(bag.filter((id) => id !== b.id))}
                      >
                        <Minus size={16} />
                      </button>
                    </li>
                  ))}
              </ul>
              <p className="total">
                Demo total{" "}
                <strong>
                  €
                  {bag.reduce(
                    (s, id) => s + books.find((b) => b.id === id)!.price,
                    0,
                  )}
                </strong>
              </p>
              <button className="clear" onClick={() => setBag([])}>
                Clear book bag
              </button>
              <p>No checkout. Just a locally held reading list.</p>
            </>
          ) : (
            <p>Your book bag is empty. A good story is waiting on the shelf.</p>
          )}
        </aside>
      )}
      <main>
        <section className="welcome">
          <div className="welcome-text">
            <h1>
              Come in.
              <br />
              Get <em>lost.</em>
            </h1>
            <p>
              Good books. Unexpected discoveries.
              <br />A small, independent corner of the world.
            </p>
            <a href="#shelf">
              Find your next read <ArrowRight size={21} />
            </a>
          </div>
          <div className="display" aria-label="Featured books">
            <div className="book-object book-one">
              <span>ADA HART</span>
              <strong>
                The Art
                <br />
                of Noticing
              </strong>
              <div className="cover-window" />
              <small>
                SMALL OBSERVATIONS
                <br />
                LARGER WORLDS
              </small>
            </div>
            <div className="book-object book-two">
              <span>IRIS COLE</span>
              <strong>
                Almost,
                <br />
                <i>Somewhere</i>
              </strong>
              <small>A NOVEL</small>
            </div>
            <div className="display-caption">For the beautifully curious.</div>
          </div>
          <span className="welcome-bottom">
            An independent bookshop concept. Open to possibility.
          </span>
        </section>
        <section id="shelf" className="shelf">
          <div className="shelf-heading">
            <h2>On our shelves</h2>
            <span>A small selection, chosen with care.</span>
          </div>
          <div className="shelf-tools">
            <div className="genres" aria-label="Book genres">
              {["All books", "Fiction", "Essays", "Design"].map((g) => (
                <button
                  aria-pressed={genre === g}
                  key={g}
                  onClick={() => setGenre(g)}
                >
                  {g}
                </button>
              ))}
            </div>
            <label className="search">
              <Search size={17} />
              <input
                aria-label="Search books"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="A title, an author…"
              />
            </label>
          </div>
          <div className="books" aria-label="Book selection">
            {visible.map((b) => (
              <button
                className="book-entry"
                key={b.id}
                onClick={() => setSelected(selected === b.id ? null : b.id)}
                aria-expanded={selected === b.id}
              >
                <div className={`cover ${b.color}`}>
                  <span>{b.author}</span>
                  <strong>{b.title}</strong>
                  <div className="cover-motif" />
                  <small>{b.subtitle}</small>
                </div>
                <div className="book-meta">
                  <div>
                    <h3>{b.title}</h3>
                    <p>{b.author}</p>
                  </div>
                  <span>€{b.price}</span>
                </div>
              </button>
            ))}
          </div>
          {!visible.length && (
            <p className="empty" role="status">
              No books match “{query}”. Try another title or choose All books.
            </p>
          )}
          {book && (
            <article className="book-detail" aria-label="Book details">
              <div>
                <span>{book.genre} · Fictional edition</span>
                <h3>{book.title}</h3>
                <p>{book.description}</p>
                <p>By {book.author} · Paperback</p>
              </div>
              <div>
                <strong>€{book.price}</strong>
                <button onClick={() => setBag([...bag, book.id])}>
                  Add to book bag <Plus size={18} />
                </button>
                <p role="status">
                  {bag.includes(book.id)
                    ? `${bag.filter((id) => id === book.id).length} in your book bag`
                    : "A little something for your shelf."}
                </p>
                <button
                  className="detail-close"
                  onClick={() => setSelected(null)}
                >
                  Close details
                </button>
              </div>
            </article>
          )}
        </section>
        <section id="shop" className="shop">
          <img
            src={library}
            alt="Warmly lit bookshelves filled with stories"
            loading="lazy"
          />
          <div>
            <BookOpen size={28} strokeWidth={1.3} />
            <h2>
              Not an algorithm.
              <br />
              <em>A bookshop.</em>
            </h2>
            <p>
              Some books find you when you're looking for something else. That's
              the lovely thing about a real shelf.
            </p>
            <p>
              Index is an imagined independent bookshop built around a simple
              idea: a good recommendation is the beginning of a conversation.
            </p>
            <a href="#shelf">
              Wander a little <ArrowUpRight size={19} />
            </a>
          </div>
        </section>
        <section className="closing">
          <p>
            A book is a place
            <br />
            you can take with you.
          </p>
          <span>
            Make a little room
            <br />
            for your next world.
          </span>
        </section>
      </main>
      <footer>
        <a href="#">index</a>
        <span>
          Fictional books. An independent spirit.
          <br />A Koative template — no purchases are processed.
        </span>
        <a href="#shelf">Back to the shelves ↑</a>
      </footer>
    </>
  );
}
