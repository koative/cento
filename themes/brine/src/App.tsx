import { useState } from "react";
import { ArrowUpRight, Plus, Minus, Anchor } from "lucide-react";
import photo from "./assets/photo.jpg";
const catchList = [
  {
    name: "Day-boat cod",
    kind: "Fish",
    note: "Flaky, clean & ready for the pan",
    price: 14,
  },
  {
    name: "Hand-dived scallops",
    kind: "Shellfish",
    note: "Six pieces, sweet and delicate",
    price: 18,
  },
  {
    name: "Cornish mussels",
    kind: "Shellfish",
    note: "A generous kilo for the table",
    price: 9,
  },
  {
    name: "Whole sea bream",
    kind: "Fish",
    note: "Prepared whole, perfect for roasting",
    price: 16,
  },
];
export default function App() {
  const [filter, setFilter] = useState("All"),
    [basket, setBasket] = useState<Record<string, number>>({}),
    [msg, setMsg] = useState("");
  let total = catchList.reduce(
    (s, p) => s + (basket[p.name] || 0) * p.price,
    0,
  );
  return (
    <>
      <header>
        <a href="#" className="brand">
          <Anchor size={24} /> brine.
        </a>
        <nav>
          <a href="#catch">Today's counter</a>
          <a href="#story">Our way</a>
          <a href="#basket">
            Basket ({Object.values(basket).reduce((a, b) => a + b, 0)})
          </a>
        </nav>
      </header>
      <main>
        <section className="brine-hero">
          <div>
            <h1>
              Good things
              <br />
              come in
              <br />
              <em>with the tide.</em>
            </h1>
            <p>
              Your neighborhood fishmonger, with a little salt in its soul. A
              changing counter, simple cooking, and plenty of good advice.
            </p>
            <a className="action" href="#catch">
              See today's catch <ArrowUpRight size={18} />
            </a>
            <p className="hero-note">
              From sea to supper. Nothing complicated.
            </p>
          </div>
          <figure>
            <img src={photo} alt="Blue ocean waves rolling toward the shore" />
            <figcaption>THE COUNTER CHANGES WITH THE COAST.</figcaption>
            <span className="roundel">
              Fresh thinking.
              <br />
              Saltwater roots.
            </span>
          </figure>
        </section>
        <div className="market-line">
          <span>THE HARBOR EDITION</span>
          <span>Good fish. Good company.</span>
          <span>A fictional coastal market</span>
        </div>
        <section id="catch" className="counter">
          <div className="counter-heading">
            <h2>On the counter.</h2>
            <div className="tabs">
              {["All", "Fish", "Shellfish"].map((x) => (
                <button
                  key={x}
                  aria-pressed={filter === x}
                  onClick={() => setFilter(x)}
                >
                  {x}
                </button>
              ))}
            </div>
            <p>
              Illustrative market prices. Build a basket to try the pickup
              experience.
            </p>
          </div>
          <div className="catch-list">
            {catchList
              .filter((p) => filter === "All" || p.kind === filter)
              .map((p) => (
                <article key={p.name}>
                  <div>
                    <span className="label">{p.kind}</span>
                    <h3>{p.name}</h3>
                    <p>{p.note}</p>
                  </div>
                  <strong>£{p.price}</strong>
                  <button
                    aria-label={"Add " + p.name}
                    onClick={() => {
                      setBasket({
                        ...basket,
                        [p.name]: (basket[p.name] || 0) + 1,
                      });
                      setMsg("");
                    }}
                  >
                    <Plus size={18} />
                  </button>
                </article>
              ))}
          </div>
        </section>
        <section className="pickup" id="basket">
          <div>
            <h2>Supper, sorted.</h2>
            <p>
              Pick your catch above, then prepare a local demo pickup note. We
              never send an order or take payment.
            </p>
          </div>
          <div className="basket">
            <h3>Your harbor basket</h3>
            {catchList
              .filter((p) => basket[p.name])
              .map((p) => (
                <div className="row" key={p.name}>
                  <span>
                    {basket[p.name]} × {p.name}
                  </span>
                  <button
                    aria-label={"Remove " + p.name}
                    onClick={() =>
                      setBasket({ ...basket, [p.name]: basket[p.name] - 1 })
                    }
                  >
                    <Minus size={14} />
                  </button>
                </div>
              ))}
            {!total && <p>Something good is waiting at the counter.</p>}
            <div className="row total">
              <span>Demo total</span>
              <strong>£{total}</strong>
            </div>
            <button
              className="action"
              disabled={!total}
              onClick={() =>
                setMsg("Your demo pickup basket is ready. No order was sent.")
              }
            >
              Prepare pickup note
            </button>
            <p role="status" className="status">
              {msg}
            </p>
          </div>
        </section>
        <section id="story" className="story">
          <h2>
            A small counter.
            <br />A wide-open sea.
          </h2>
          <p>
            Fish doesn't need a long story to make a good dinner. Ask what's
            lovely today, cook it simply, and pass the bread. That's the spirit
            behind Brine.
          </p>
        </section>
      </main>
      <footer>
        <a href="../../">Koative collection</a>
        <p>
          Brine is a fictional fishmonger. Stock and prices are demonstration
          content.
        </p>
      </footer>
    </>
  );
}
