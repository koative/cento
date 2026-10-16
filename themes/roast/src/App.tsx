import { useState, type CSSProperties } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  ShoppingBag,
  Plus,
  Minus,
  X,
  Coffee,
  MoveUpRight,
  Check,
  Flame,
  Sun,
  Moon,
} from "lucide-react";
import coffee from "./assets/coffee.jpg";
const coffees = [
  {
    name: "Daybreak",
    origin: "Colombia",
    description:
      "Your everyday, anything-but-ordinary coffee. Round, sweet, and ready before you are.",
    notes: ["Milk chocolate", "Caramel", "Orange"],
    roast: "Medium roast",
    color: "#f78b38",
    price: 18,
  },
  {
    name: "High Noon",
    origin: "Ethiopia",
    description:
      "A bright little detour from the usual. Floral, fruit-forward, and full of good surprises.",
    notes: ["Bergamot", "Peach", "Honey"],
    roast: "Light roast",
    color: "#dfc6e9",
    price: 22,
  },
  {
    name: "Night Shift",
    origin: "Brazil",
    description:
      "All of the rich, unhurried goodness. None of the late-night staring at the ceiling.",
    notes: ["Cocoa", "Hazelnut", "Brown sugar"],
    roast: "Decaf · Medium",
    color: "#b9c7a6",
    price: 20,
  },
];
type CartItem = {
  name: string;
  size: string;
  grind: string;
  price: number;
  qty: number;
};
function Bag({
  name,
  origin,
  color,
  small = false,
}: {
  name: string;
  origin: string;
  color: string;
  small?: boolean;
}) {
  return (
    <div
      className={"bag " + (small ? "small" : "")}
      style={{ "--bag-color": color } as CSSProperties}
    >
      <div className="bag-seal" />
      <div className="bag-body">
        <div className="bag-brand">
          roast<span>GOOD COFFEE. GOOD DAYS.</span>
        </div>
        <div className="bag-mark">
          <Sun size={75} strokeWidth={1.15} />
        </div>
        <div className="bag-product">
          <strong>{name}</strong>
          <span>{origin} · Whole bean</span>
        </div>
        <div className="bag-base">
          <span>Specialty coffee</span>
          <span>250 g</span>
        </div>
      </div>
      <div className="bag-fold" />
    </div>
  );
}
export default function App() {
  const [selected, setSelected] = useState(0),
    [size, setSize] = useState("250 g"),
    [grind, setGrind] = useState("Whole bean"),
    [qty, setQty] = useState(1),
    [cart, setCart] = useState<CartItem[]>([]),
    [cartOpen, setCartOpen] = useState(false),
    [added, setAdded] = useState(false),
    [subscribed, setSubscribed] = useState(false);
  const product = coffees[selected],
    price = product.price * (size === "1 kg" ? 3.4 : 1),
    count = cart.reduce((s, i) => s + i.qty, 0),
    total = cart.reduce((s, i) => s + i.qty * i.price, 0);
  function add() {
    setCart((items) => {
      const exists = items.find(
        (i) => i.name === product.name && i.size === size && i.grind === grind,
      );
      return exists
        ? items.map((i) => (i === exists ? { ...i, qty: i.qty + qty } : i))
        : [...items, { name: product.name, size, grind, qty, price }];
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  }
  return (
    <>
      <div className="announcement">
        A small-batch coffee concept. A very good place to start.
      </div>
      <header>
        <a className="logo" href="#">
          roast<span>®</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#shop">The coffee</a>
          <a href="#story">Our kind of coffee</a>
          <a href="#brew">Brew better</a>
        </nav>
        <button
          className="cart-toggle"
          onClick={() => setCartOpen(!cartOpen)}
          aria-expanded={cartOpen}
        >
          <ShoppingBag size={18} />
          <span>Your bag</span>
          <b>{count}</b>
        </button>
      </header>
      <main>
        <section className="hero">
          <div className="hero-text">
            <h1>
              Wake up.
              <br />
              Smell the
              <br />
              <span>good stuff.</span>
            </h1>
            <p>
              Really good coffee. From people who care.
              <br />
              For whatever kind of day you're having.
            </p>
            <a href="#shop" className="solid-button">
              Find your daily grind <ArrowUpRight size={20} />
            </a>
            <div className="hero-foot">
              <Coffee size={20} />
              <span>A little ritual. A big difference.</span>
            </div>
          </div>
          <div className="hero-product">
            <div className="circle-copy">FRESH PERSPECTIVE. FRESH COFFEE.</div>
            <div className="bag-scene">
              <Bag name="Daybreak" origin="Colombia" color="#f78b38" />
            </div>
            <div className="product-callout">
              <span>
                Your morning,
                <br />
                made better.
              </span>
              <svg viewBox="0 0 90 70" aria-hidden="true">
                <path d="M82 8C55 6 77 60 13 48m0 0 16-10M13 48l13 14" />
              </svg>
            </div>
            <div className="hero-product-foot">
              <span>Meet Daybreak</span>
              <span>Chocolate. Caramel. Good energy.</span>
            </div>
          </div>
        </section>
        <div className="ticker" aria-hidden="true">
          <span>GOOD COFFEE</span>
          <Sun />
          <span>NO COMPLICATED STUFF</span>
          <Sun />
          <span>JUST YOUR NEXT GREAT CUP</span>
          <Sun />
        </div>
        <section id="shop" className="shop">
          <div className="shop-heading">
            <h2>
              Find your
              <br />
              <em>morning person.</em>
            </h2>
            <p>
              Three coffees. Three very good reasons
              <br />
              to get out of bed.
            </p>
          </div>
          <div
            className="coffee-tabs"
            role="group"
            aria-label="Choose a coffee"
          >
            {coffees.map((c, i) => (
              <button
                key={c.name}
                onClick={() => {
                  setSelected(i);
                  setAdded(false);
                }}
                aria-pressed={selected === i}
                className={selected === i ? "active" : ""}
              >
                <span style={{ background: c.color }} />
                {c.name}
                <small>
                  {i === 0
                    ? "The everyday one"
                    : i === 1
                      ? "The bright one"
                      : "The slow one"}
                </small>
                {selected === i && <ArrowUpRight size={17} />}
              </button>
            ))}
          </div>
          <div className="product-detail">
            <div className={"product-display variant-" + selected}>
              <span className="origin-tag">
                {product.origin}
                <br />
                Single origin
              </span>
              <Bag
                name={product.name}
                origin={product.origin}
                color={product.color}
              />
              <span className="roast-tag">
                <Flame size={14} />
                {product.roast}
              </span>
            </div>
            <div className="product-info">
              <div className="product-title">
                <h3>{product.name}</h3>
                <span>${price.toFixed(2)}</span>
              </div>
              <p>{product.description}</p>
              <div className="tasting">
                <span>TASTES LIKE A GOOD DAY</span>
                <div>
                  {product.notes.map((n) => (
                    <span key={n}>{n}</span>
                  ))}
                </div>
              </div>
              <div className="options">
                <fieldset>
                  <legend>How much?</legend>
                  <div>
                    {["250 g", "1 kg"].map((s) => (
                      <button
                        key={s}
                        type="button"
                        aria-pressed={size === s}
                        className={size === s ? "chosen" : ""}
                        onClick={() => setSize(s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </fieldset>
                <label>
                  Your grind
                  <select
                    aria-label="Your grind"
                    value={grind}
                    onChange={(e) => setGrind(e.target.value)}
                  >
                    <option>Whole bean</option>
                    <option>Filter grind</option>
                    <option>French press</option>
                    <option>Espresso grind</option>
                  </select>
                </label>
              </div>
              <div className="add-row">
                <div className="quantity">
                  <button
                    aria-label="Decrease quantity"
                    disabled={qty === 1}
                    onClick={() => setQty(qty - 1)}
                  >
                    <Minus size={15} />
                  </button>
                  <span>{qty}</span>
                  <button
                    aria-label="Increase quantity"
                    disabled={qty >= 10}
                    onClick={() => setQty(qty + 1)}
                  >
                    <Plus size={15} />
                  </button>
                </div>
                <button className="solid-button" onClick={add}>
                  {added ? (
                    <>
                      <Check size={17} /> Added to your bag
                    </>
                  ) : (
                    <>
                      Add to bag · ${(price * qty).toFixed(2)}{" "}
                      <ArrowRight size={17} />
                    </>
                  )}
                </button>
              </div>
              <small className="demo-note" role="status">
                {added
                  ? "Sample bag updated. Open “Your bag” to review."
                  : "Demo store. No payment or order will be processed."}
              </small>
              <div className="product-details">
                <span>Roasted with intention</span>
                <span>Made for your daily ritual</span>
              </div>
            </div>
          </div>
        </section>
        <section id="story" className="story">
          <div className="story-image">
            <img
              src={coffee}
              alt="Freshly roasted coffee beans with deep chocolate brown tones"
              loading="lazy"
            />
            <span>Good things take care.</span>
          </div>
          <div className="story-copy">
            <Coffee size={34} strokeWidth={1.2} />
            <h2>
              Serious about coffee.
              <br />
              <em>Easy about life.</em>
            </h2>
            <p>
              We think a great cup should be the easiest part of your day. So
              this little coffee concept keeps things simple: thoughtful
              origins, a considered roast, and flavors worth slowing down for.
            </p>
            <p>
              No secret handshakes. No intimidating tasting notes. Just a really
              good reason to put the kettle on.
            </p>
            <a href="#shop">
              Meet your next favorite <ArrowUpRight size={18} />
            </a>
          </div>
        </section>
        <section id="brew" className="brew">
          <div>
            <h2>
              Your cup.
              <br />
              <em>Your rules.</em>
            </h2>
            <p>Start here. Make it yours.</p>
          </div>
          <ol>
            <li>
              <span>01</span>
              <div>
                <h3>Keep it fresh.</h3>
                <p>Grind just before brewing. Future you will thank you.</p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <h3>Find your balance.</h3>
                <p>Try 15 g of coffee to 250 ml of water. Adjust to taste.</p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <h3>Take a moment.</h3>
                <p>Your inbox can wait. This is the good part.</p>
              </div>
            </li>
          </ol>
        </section>
        <section className="newsletter">
          <div>
            <h2>
              Something good
              <br />
              is brewing.
            </h2>
            <p>A little coffee talk. A little inspiration. No noise.</p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubscribed(true);
            }}
          >
            {subscribed ? (
              <div className="subscribed" role="status">
                <Check size={22} />
                <span>
                  You're on the demo list.
                  <small>No email was sent or stored.</small>
                </span>
              </div>
            ) : (
              <>
                <label htmlFor="email">Your email address</label>
                <div>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@somewhere.good"
                    required
                  />
                  <button aria-label="Join the demo newsletter">
                    <ArrowUpRight size={24} />
                  </button>
                </div>
                <small>
                  Try the form. This demo doesn't collect personal data.
                </small>
              </>
            )}
          </form>
        </section>
      </main>
      <footer>
        <a href="#" className="logo">
          roast<span>®</span>
        </a>
        <span>
          A fictional coffee brand. All products are demonstration content.
        </span>
        <a href="../../">
          An Elseform template <ArrowUpRight size={14} />
        </a>
      </footer>
      {cartOpen && (
        <section className="cart-panel" aria-label="Your shopping bag">
          <div className="cart-heading">
            <h2>Your good stuff.</h2>
            <button
              aria-label="Close shopping bag"
              onClick={() => setCartOpen(false)}
            >
              <X size={21} />
            </button>
          </div>
          {cart.length === 0 ? (
            <div className="empty-cart">
              <Coffee size={35} />
              <h3>A little empty in here.</h3>
              <p>Your next good cup is waiting.</p>
              <button
                onClick={() => {
                  setCartOpen(false);
                  document
                    .getElementById("shop")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Explore the coffee <ArrowRight size={17} />
              </button>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cart.map((item, i) => (
                  <div
                    className="cart-item"
                    key={item.name + item.size + item.grind}
                  >
                    <span
                      className="cart-swatch"
                      style={{
                        background: coffees.find((c) => c.name === item.name)
                          ?.color,
                      }}
                    >
                      <Coffee size={24} />
                    </span>
                    <div>
                      <h3>{item.name}</h3>
                      <p>
                        {item.size} · {item.grind}
                      </p>
                      <div className="cart-qty">
                        <button
                          aria-label={`Remove one ${item.name}`}
                          onClick={() =>
                            setCart(
                              cart.flatMap((x, j) =>
                                j === i
                                  ? x.qty > 1
                                    ? [{ ...x, qty: x.qty - 1 }]
                                    : []
                                  : [x],
                              ),
                            )
                          }
                        >
                          <Minus size={12} />
                        </button>
                        <span>{item.qty}</span>
                        <button
                          aria-label={`Add one ${item.name}`}
                          onClick={() =>
                            setCart(
                              cart.map((x, j) =>
                                j === i ? { ...x, qty: x.qty + 1 } : x,
                              ),
                            )
                          }
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                    <b>${(item.price * item.qty).toFixed(2)}</b>
                  </div>
                ))}
              </div>
              <div className="cart-total">
                <span>Subtotal</span>
                <strong>${total.toFixed(2)}</strong>
              </div>
              <p className="cart-disclaimer">
                This is a sample bag. Checkout is not available, and no real
                orders are placed.
              </p>
              <button
                className="continue-button"
                onClick={() => setCartOpen(false)}
              >
                Keep exploring <ArrowRight size={18} />
              </button>
            </>
          )}
        </section>
      )}
    </>
  );
}
