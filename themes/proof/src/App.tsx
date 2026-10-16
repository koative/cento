import { useState } from "react";
import { ArrowRight, Plus, Minus, Wheat } from "lucide-react";
import bread from "./assets/bread.jpg";
const menu = [
  {
    name: "Country sourdough",
    note: "Our everyday loaf. Dark crust, open crumb.",
    price: 7,
  },
  {
    name: "Seeded rye",
    note: "Deep, nutty, and made for good butter.",
    price: 8,
  },
  {
    name: "Morning croissant",
    note: "Folded by hand. Baked until golden.",
    price: 3.5,
  },
  {
    name: "Cardamom knot",
    note: "A little spice. A little sugar. A slow morning.",
    price: 4,
  },
];
export default function App() {
  const [quantities, setQuantities] = useState([0, 0, 0, 0]);
  const [time, setTime] = useState("09:00–10:00");
  const [receipt, setReceipt] = useState(false);
  const total = quantities.reduce((s, n, i) => s + n * menu[i].price, 0);
  const count = quantities.reduce((a, b) => a + b, 0);
  function change(i: number, d: number) {
    setQuantities(
      quantities.map((n, j) =>
        i === j ? Math.max(0, Math.min(12, n + d)) : n,
      ),
    );
    setReceipt(false);
  }
  return (
    <>
      <header>
        <a href="#" className="brand">
          proof<span>bread & the good things</span>
        </a>
        <nav aria-label="Main">
          <a href="#counter">At the counter</a>
          <a href="#our-way">Our way</a>
        </nav>
        <span>BAKED HERE. EVERY MORNING.</span>
      </header>
      <main>
        <section className="bakery-opening">
          <div className="opening-title">
            <h1>
              Good things
              <br />
              take <em>time.</em>
            </h1>
            <p>
              Flour. Water. Salt.
              <br />
              And a little patience.
            </p>
            <Wheat size={50} strokeWidth={1} />
          </div>
          <img
            src={bread}
            alt="Freshly baked artisan loaves with golden flour-dusted crusts"
          />
          <div className="opening-caption">
            <span>THE DAILY BAKE</span>
            <p>
              Long fermentation. Warm ovens.
              <br />
              Something worth getting up for.
            </p>
            <a href="#counter">
              Choose your morning <ArrowRight size={20} />
            </a>
          </div>
        </section>
        <section className="counter" id="counter">
          <div className="counter-title">
            <h2>
              Fresh from
              <br />
              the oven.
            </h2>
            <p>
              A small daily menu.
              <br />
              Pick a few good things for your table.
            </p>
          </div>
          <div className="order-sheet">
            <div className="sheet-head">
              <span>THE BAKE LIST / FRIDAY</span>
              <span>PRICE / QUANTITY</span>
            </div>
            {menu.map((item, i) => (
              <article key={item.name}>
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.note}</p>
                </div>
                <span className="price">£{item.price.toFixed(2)}</span>
                <div className="quantity">
                  <button
                    aria-label={`Remove ${item.name}`}
                    disabled={quantities[i] === 0}
                    onClick={() => change(i, -1)}
                  >
                    <Minus size={14} />
                  </button>
                  <output aria-label={`${item.name} quantity`}>
                    {quantities[i]}
                  </output>
                  <button
                    aria-label={`Add ${item.name}`}
                    disabled={quantities[i] === 12}
                    onClick={() => change(i, 1)}
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </article>
            ))}
            <div className="order-total">
              <label>
                Collection window
                <select
                  value={time}
                  onChange={(e) => {
                    setTime(e.target.value);
                    setReceipt(false);
                  }}
                >
                  <option>09:00–10:00</option>
                  <option>10:00–11:00</option>
                  <option>11:00–12:00</option>
                </select>
              </label>
              <div>
                <span>
                  {count} {count === 1 ? "item" : "items"}
                </span>
                <b>£{total.toFixed(2)}</b>
              </div>
            </div>
            <button
              className="receipt-button"
              disabled={!count}
              onClick={() => setReceipt(true)}
            >
              Preview your bakery bag <ArrowRight size={18} />
            </button>
            <div role="status" className="status">
              {receipt ? (
                <>
                  <strong>Your morning, sorted.</strong>
                  <p>
                    {quantities
                      .map((n, i) => (n ? `${n} × ${menu[i].name}` : null))
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                  <p>
                    Collection {time} · Total £{total.toFixed(2)}. Demo only —
                    no order placed.
                  </p>
                </>
              ) : (
                "A local order preview. Nothing is purchased or reserved."
              )}
            </div>
          </div>
        </section>
        <section className="our-way" id="our-way">
          <Wheat size={70} strokeWidth={1} />
          <h2>
            Nothing hurried.
            <br />
            Nothing unnecessary.
          </h2>
          <p>
            Proof is an imagined neighbourhood bakery. We like early starts,
            honest ingredients, and the sound of a loaf cooling on the rack. Our
            fictional menu is a starting point for your own daily ritual.
          </p>
        </section>
      </main>
      <footer>
        <strong>proof / AN EVERYDAY PLEASURE</strong>
        <p>
          Fictional bakery by Koative. Prices and availability are illustrative;
          no orders are sent.
        </p>
      </footer>
    </>
  );
}
