import { Link } from "../router";
import { collection, looks, lookPath, products } from "../content";
import { money } from "../lib/cart";
import { DayLine } from "../components/DayLine";

export function Collection() {
  return (
    <div className="page collection-page">
      <header className="page-head">
        <h1 className="display">
          The <em>Quiet</em> Hours
        </h1>
        <p className="lede">
          {collection.season}. {collection.intro}
        </p>
        <p className="fine">{collection.credits}</p>
      </header>

      <DayLine />

      <ol className="look-grid">
        {looks.map((l, i) => {
          const pieces = l.pieces.map((id) =>
            products.find((p) => p.id === id)!,
          );
          return (
            <li
              key={l.n}
              className={i % 5 === 0 ? "look-tile wide" : "look-tile"}
            >
              <Link to={lookPath(l.n)} className="look-tile-link">
                <img
                  src={l.image}
                  alt={l.alt}
                  loading={i < 2 ? "eager" : "lazy"}
                />
                <span className="look-tile-hour">{l.hour}</span>
                <h2>
                  Look {String(l.n).padStart(2, "0")} <span>{l.title}</span>
                </h2>
              </Link>
              <ul className="look-tile-pieces">
                {pieces.map((p) => (
                  <li key={p.id}>
                    <Link to={`/shop/${p.id}`}>{p.name}</Link>
                    <span className="price">{money(p.price)}</span>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
