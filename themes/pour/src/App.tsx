import { useState } from "react";
import { ArrowUpRight, Plus, Minus, ShoppingBag } from "lucide-react";
const wines = [
  {
    name: "Cloud Study",
    type: "White",
    place: "Loire, France",
    grape: "Chenin Blanc",
    year: "2024",
    price: 24,
    color: "#e9ba62",
    glass: "#7c8051",
    note: "Pear skin. A little salt. The kind of white that turns lunch into an afternoon.",
  },
  {
    name: "Soft Landing",
    type: "Red",
    place: "Beaujolais, France",
    grape: "Gamay",
    year: "2023",
    price: 28,
    color: "#a2b6b2",
    glass: "#523b40",
    note: "Bright cherries, a gentle earthiness and absolutely no reason to save it for later.",
  },
  {
    name: "Skin Contact",
    type: "Orange",
    place: "Friuli, Italy",
    grape: "Pinot Grigio",
    year: "2024",
    price: 26,
    color: "#ed967a",
    glass: "#946b39",
    note: "Apricot, tea leaves and a good bit of texture. For the curious glass.",
  },
  {
    name: "Small Hours",
    type: "Sparkling",
    place: "Catalonia, Spain",
    grape: "Xarel·lo",
    year: "2024",
    price: 30,
    color: "#cec18d",
    glass: "#4b6850",
    note: "Fine bubbles and green apple. Good company for a very ordinary celebration.",
  },
];
export default function App() {
  const [filter, setFilter] = useState("All bottles"),
    [cart, setCart] = useState<number[]>([0, 0, 0, 0]),
    [detail, setDetail] = useState(0);
  const total = cart.reduce((a, n, i) => a + n * wines[i].price, 0),
    count = cart.reduce((a, n) => a + n, 0);
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header>
        <a className="brand" href="#">
          pour<span>GOOD WINE. NO CEREMONY.</span>
        </a>
        <nav>
          <a href="#bottles">The bottles</a>
          <a href="#philosophy">Our kind of wine</a>
          <a href="#case">
            <ShoppingBag size={17} />
            Your case ({count})
          </a>
        </nav>
      </header>
      <main id="main">
        <section className="opening">
          <h1>
            A little less label.
            <br />
            <em>A lot more character.</em>
          </h1>
          <p>
            Honest wines from people who care.
            <br />
            Picked for the table, not the trophy cabinet.
          </p>
        </section>
        <section className="shop" id="bottles">
          <div className="shop-bar">
            <div aria-label="Wine styles">
              {["All bottles", "White", "Red", "Orange", "Sparkling"].map(
                (t) => (
                  <button
                    aria-pressed={filter === t}
                    key={t}
                    onClick={() => setFilter(t)}
                  >
                    {t}
                  </button>
                ),
              )}
            </div>
            <span>
              {filter === "All bottles" ? 4 : 1} bottles, well chosen.
            </span>
          </div>
          <div className="shelf">
            {wines.map(
              (w, i) =>
                (filter === "All bottles" || filter === w.type) && (
                  <article className="wine" key={w.name}>
                    <button
                      className="bottle-view"
                      aria-label={`Explore ${w.name}`}
                      onClick={() => setDetail(i)}
                    >
                      <div
                        className="bottle"
                        style={
                          {
                            "--glass": w.glass,
                            "--label": w.color,
                          } as React.CSSProperties
                        }
                      >
                        <div className="neck" />
                        <div className="bottle-body">
                          <div className="wine-label">
                            <span>POUR SELECTION</span>
                            <strong>{w.name}</strong>
                            <small>
                              {w.grape}
                              <br />
                              {w.year}
                            </small>
                            <i />
                          </div>
                        </div>
                      </div>
                    </button>
                    <div className="wine-info">
                      <h2>{w.name}</h2>
                      <p>
                        {w.type} · {w.place}
                      </p>
                      <div>
                        <span>€{w.price}</span>
                        <button
                          aria-label={`Add ${w.name} to case`}
                          onClick={() =>
                            setCart(
                              cart.map((n, j) =>
                                j === i ? Math.min(n + 1, 12) : n,
                              ),
                            )
                          }
                        >
                          {cart[i] > 0 ? `${cart[i]} in case` : "Add to case"}
                          <Plus size={15} />
                        </button>
                      </div>
                    </div>
                  </article>
                ),
            )}
          </div>
          <div className="tasting" aria-live="polite">
            <span>IN THE GLASS</span>
            <h3>{wines[detail].name}</h3>
            <p>{wines[detail].note}</p>
          </div>
        </section>
        <section className="case" id="case">
          <div>
            <h2>
              Make a little
              <br />
              <em>room in the rack.</em>
            </h2>
            <p>
              A good case has a bit of everything.
              <br />
              Start with whatever sounds like your kind of evening.
            </p>
          </div>
          <div className="case-list">
            <h3>
              Your mixed case <span>{count} bottles</span>
            </h3>
            {count === 0 ? (
              <p className="empty">
                Your case is waiting. Add a bottle from the shelf above.
              </p>
            ) : (
              wines.map(
                (w, i) =>
                  cart[i] > 0 && (
                    <div className="case-row" key={w.name}>
                      <span>
                        {w.name}
                        <small>€{w.price} each</small>
                      </span>
                      <div>
                        <button
                          aria-label={`Remove one ${w.name}`}
                          onClick={() =>
                            setCart(cart.map((n, j) => (i === j ? n - 1 : n)))
                          }
                        >
                          <Minus size={15} />
                        </button>
                        <strong>{cart[i]}</strong>
                        <button
                          aria-label={`Add one ${w.name}`}
                          disabled={cart[i] === 12}
                          onClick={() =>
                            setCart(cart.map((n, j) => (i === j ? n + 1 : n)))
                          }
                        >
                          <Plus size={15} />
                        </button>
                      </div>
                    </div>
                  ),
              )
            )}
            <div className="case-total">
              <span>Sample case total</span>
              <strong>€{total}</strong>
            </div>
            <small>
              Local demo only. No checkout, payment or alcohol sale.
            </small>
          </div>
        </section>
        <section className="philosophy" id="philosophy">
          <h2>
            Wine is for sharing.
            <br />
            So is a good story.
          </h2>
          <p>
            Small producers. Thoughtful farming. As little interference as
            possible. We look for wines that taste like where they come from —
            and people you’d want to have dinner with.
          </p>
          <a href="#bottles">
            Find your next conversation <ArrowUpRight size={20} />
          </a>
        </section>
      </main>
      <footer>
        <a className="brand" href="#">
          pour
        </a>
        <p>Fictional wine retailer · Adults only concept · Koative</p>
        <a href="#bottles">Back to the shelf ↑</a>
      </footer>
    </>
  );
}
