import { Link } from "../router";
import { lookbook, products } from "../content";
import { money } from "../lib/cart";
import { Flat } from "../components/Flat";

export function Lookbook() {
  return (
    <div className="page lookbook">
      <header className="page-head">
        <h1>{lookbook.title}</h1>
        <p className="lead">{lookbook.intro}</p>
      </header>

      <div className="looks">
        {lookbook.looks.map((look, i) => {
          const wearing = look.wearing.map((id) =>
            products.find((p) => p.id === id)!,
          );
          return (
            <figure
              key={look.title}
              className="look"
              data-shape={look.photo.h > look.photo.w ? "tall" : "wide"}
            >
              <img
                src={look.photo.src}
                alt={look.photo.alt}
                width={look.photo.w}
                height={look.photo.h}
                loading={i < 2 ? undefined : "lazy"}
              />
              <figcaption>
                <h2>{look.title}</h2>
                <p className="look-place">{look.place}</p>
                <p>{look.note}</p>
                <ul className="look-wearing" aria-label="Pieces in this look">
                  {wearing.map((p) => (
                    <li key={p.id}>
                      <Link to={`/shop/${p.id}`}>
                        <span className="plate">
                          <Flat product={p} />
                        </span>
                        <span>{p.name}</span>
                        <span className="num">{money(p.price)}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </div>
  );
}
