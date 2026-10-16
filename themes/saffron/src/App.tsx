import { useState } from "react";
import {
  ArrowUpRight,
  ShoppingBasket,
  Plus,
  Minus,
  Check,
  Leaf,
  ArrowRight,
} from "lucide-react";
import market from "./assets/market.jpg";
const goods = [
  { name: "Heirloom tomatoes", category: "Produce", unit: "500 g", price: 4.5 },
  { name: "Garden greens", category: "Produce", unit: "1 bunch", price: 3 },
  { name: "Sourdough loaf", category: "Bakery", unit: "1 loaf", price: 6 },
  {
    name: "Almond croissant",
    category: "Bakery",
    unit: "1 pastry",
    price: 3.5,
  },
  { name: "Wildflower honey", category: "Pantry", unit: "250 g jar", price: 8 },
  {
    name: "Cold-pressed olive oil",
    category: "Pantry",
    unit: "500 ml",
    price: 12,
  },
];
export default function App() {
  const [category, setCategory] = useState("Everything");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [slot, setSlot] = useState("Saturday · 09:00–11:00");
  const [done, setDone] = useState(false);
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  const total = goods.reduce((a, g) => a + (cart[g.name] || 0) * g.price, 0);
  function quantity(name: string, delta: number) {
    setCart({ ...cart, [name]: Math.max(0, (cart[name] || 0) + delta) });
    setDone(false);
  }
  return (
    <>
      <div className="ticker">
        <span>GOOD FOOD. GOOD NEIGHBORS. GOOD MORNINGS.</span>
        <span>GOOD FOOD. GOOD NEIGHBORS. GOOD MORNINGS.</span>
      </div>
      <header>
        <a className="brand" href="#">
          saffron<span>your neighborhood market</span>
        </a>
        <nav>
          <a href="#market">This week's basket</a>
          <a href="#pickup">
            <ShoppingBasket size={18} /> Basket ({count})
          </a>
        </nav>
      </header>
      <main>
        <section className="market-hero">
          <div className="hero-copy">
            <h1>
              Fresh from
              <br />
              <em>around here.</em>
            </h1>
            <p>
              A few good things, picked for the week.
              <br />
              Seasonal produce and pantry favorites.
            </p>
            <a href="#market">
              Fill a happy basket <ArrowRight size={19} />
            </a>
          </div>
          <img src={market} alt="Fresh vegetables at a market stall" />
          <span className="market-stamp">
            IN SEASON.
            <br />
            IN GOOD COMPANY.
          </span>
        </section>
        <section className="market" id="market">
          <div className="market-top">
            <h2>The weekly good stuff.</h2>
            <p>Illustrative products & prices · Local demo basket</p>
          </div>
          <div className="market-layout">
            <div>
              <div className="filters">
                {["Everything", "Produce", "Bakery", "Pantry"].map((c) => (
                  <button
                    key={c}
                    aria-pressed={category === c}
                    onClick={() => setCategory(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <div className="produce-list">
                {goods
                  .filter(
                    (g) => category === "Everything" || g.category === category,
                  )
                  .map((g) => (
                    <article key={g.name}>
                      <div className="product-letter" aria-hidden="true">
                        {g.name.charAt(0)}
                      </div>
                      <div>
                        <h3>{g.name}</h3>
                        <span>
                          {g.category} · {g.unit}
                        </span>
                      </div>
                      <strong>${g.price.toFixed(2)}</strong>
                      <div className="quantity">
                        <button
                          disabled={!cart[g.name]}
                          aria-label={"Remove " + g.name}
                          onClick={() => quantity(g.name, -1)}
                        >
                          <Minus size={16} />
                        </button>
                        <output aria-label={g.name + " quantity"}>
                          {cart[g.name] || 0}
                        </output>
                        <button
                          aria-label={"Add " + g.name}
                          onClick={() => quantity(g.name, 1)}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </article>
                  ))}
              </div>
            </div>
            <aside id="pickup">
              <div className="basket-title">
                <ShoppingBasket size={26} />
                <h2>Your basket</h2>
              </div>
              {count ? (
                <ul>
                  {goods
                    .filter((g) => cart[g.name])
                    .map((g) => (
                      <li key={g.name}>
                        <span>
                          {cart[g.name]} × {g.name}
                        </span>
                        <strong>${(cart[g.name] * g.price).toFixed(2)}</strong>
                      </li>
                    ))}
                </ul>
              ) : (
                <p className="empty">
                  A little empty, a lot of possibility. Add something good.
                </p>
              )}
              <div className="total">
                <span>Demo total</span>
                <strong>${total.toFixed(2)}</strong>
              </div>
              <label>
                Pickup window
                <select
                  value={slot}
                  onChange={(e) => {
                    setSlot(e.target.value);
                    setDone(false);
                  }}
                >
                  <option>Saturday · 09:00–11:00</option>
                  <option>Saturday · 11:00–13:00</option>
                  <option>Sunday · 10:00–12:00</option>
                </select>
              </label>
              <button
                className="btn"
                disabled={!count}
                onClick={() => setDone(true)}
              >
                Preview my basket <ArrowRight size={17} />
              </button>
              {done && (
                <p role="status" className="basket-status">
                  <Check size={18} /> {count} items · ${total.toFixed(2)} ·{" "}
                  {slot}. Demo only — no order placed.
                </p>
              )}
              <small>No payment. No pickup reservation.</small>
            </aside>
          </div>
        </section>
        <section className="market-story">
          <Leaf size={40} />
          <h2>
            Small market.
            <br />
            <em>Full hearts.</em>
          </h2>
          <div>
            <p>
              Good food has a way of bringing people together. We like the
              simple things: familiar faces, the smell of fresh bread, and a
              basket full of possibilities.
            </p>
            <a href="#market">
              See what's on the table <ArrowUpRight size={18} />
            </a>
          </div>
        </section>
      </main>
      <footer>
        <span>Saffron · Fictional neighborhood market</span>
        <a href="../../">Elseform collection</a>
      </footer>
    </>
  );
}
