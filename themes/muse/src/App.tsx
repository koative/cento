import { useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  ShoppingBag,
  Check,
  Plus,
  Minus,
} from "lucide-react";
import fashion from "./assets/fashion.jpg";
import portrait from "./assets/portrait.jpg";
import detail from "./assets/detail.jpg";
const looks = [
  {
    title: "The art of becoming",
    name: "The sculpted coat",
    price: 390,
    image: fashion,
    color: "Warm stone",
    description:
      "A generous silhouette, an unexpected line. A layer for everything you are becoming.",
  },
  {
    title: "An everyday kind of extraordinary",
    name: "The everyday edit",
    price: 180,
    image: portrait,
    color: "Deep black",
    description:
      "Quiet essentials with an expressive point of view. Made to move with your own rhythm.",
  },
  {
    title: "A study in soft structure",
    name: "The fluid ensemble",
    price: 240,
    image: detail,
    color: "Soft ivory",
    description:
      "Soft structure and a considered palette. A new interpretation of a familiar feeling.",
  },
];
export default function App() {
  const [look, setLook] = useState(0);
  const [size, setSize] = useState("M");
  const [bag, setBag] = useState(0);
  const [added, setAdded] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [bagOpen, setBagOpen] = useState(false);
  const current = looks[look];
  return (
    <>
      <header className="topbar">
        <a href="#collection">Collection 26</a>
        <a className="logo" href="#" aria-label="Muse home">
          MUSE<span>MAISON</span>
        </a>
        <button
          className="bag"
          onClick={() => setBagOpen(!bagOpen)}
          aria-expanded={bagOpen}
        >
          <ShoppingBag size={15} /> Bag ({bag})
        </button>
      </header>
      {bagOpen && (
        <aside className="bag-panel" aria-label="Shopping bag">
          <h2>Your edit</h2>
          <p>
            {bag
              ? `${bag} selected ${bag === 1 ? "piece" : "pieces"} in your demonstration bag.`
              : "Your bag is waiting for something considered."}
          </p>
          {bag > 0 && (
            <button
              onClick={() => {
                setBag(0);
                setAdded(false);
              }}
            >
              Clear bag <Minus size={15} />
            </button>
          )}
          <span>Demo only. No checkout or payment.</span>
        </aside>
      )}
      <main>
        <section className="campaign">
          <div className="campaign-copy">
            <div className="season">
              Autumn / Winter 2026 <span>Paris, in spirit.</span>
            </div>
            <h1>
              The art
              <br />
              of <em>being</em>
              <br />
              yourself.
            </h1>
            <div className="campaign-bottom">
              <p>
                Clothes for the in-between.
                <br />
                For no one else, but you.
              </p>
              <a
                href="#collection"
                className="round-link"
                aria-label="Explore the collection"
              >
                <ArrowUpRight size={28} />
              </a>
            </div>
          </div>
          <div className="campaign-image">
            <img
              src={fashion}
              alt="Expressive street-style fashion in warm neutral tones"
            />
            <span className="image-caption">A wardrobe. A point of view.</span>
            <div className="image-corner">
              THE
              <br />
              NEW
              <br />
              FEELING
            </div>
          </div>
          <div className="edge-text">LESS EXPECTATION. MORE EXPRESSION.</div>
        </section>
        <div className="ticker" aria-hidden="true">
          <div>
            Not just worn. Lived in. <span>—</span> Not just worn. Lived in.{" "}
            <span>—</span> Not just worn. Lived in. <span>—</span> Not just
            worn. Lived in. <span>—</span>
          </div>
        </div>
        <section id="collection" className="collection">
          <div className="collection-head">
            <h2>
              A considered
              <br />
              <em>collection.</em>
            </h2>
            <p>
              Fewer pieces. More possibilities.
              <br />
              Explore our fictional seasonal edit.
            </p>
            <div className="arrows">
              <button
                onClick={() => {
                  setLook((look + 2) % 3);
                  setAdded(false);
                }}
                aria-label="Previous look"
              >
                <ArrowLeft size={20} />
              </button>
              <button
                onClick={() => {
                  setLook((look + 1) % 3);
                  setAdded(false);
                }}
                aria-label="Next look"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
          <div className="look">
            <div className="look-image">
              <img
                key={look}
                src={current.image}
                alt={current.name + " editorial inspiration"}
              />
              <span>{String(look + 1).padStart(2, "0")} / 03</span>
            </div>
            <div className="look-copy">
              <span className="look-category">A MUSE wardrobe study</span>
              <h3>{current.title}</h3>
              <p>{current.description}</p>
              <div className="product-meta">
                <strong>{current.name}</strong>
                <span>€{current.price}</span>
              </div>
              <span className="color">{current.color} · Editorial concept</span>
              <fieldset>
                <legend>Choose your size</legend>
                {["XS", "S", "M", "L", "XL"].map((s) => (
                  <button
                    key={s}
                    aria-pressed={size === s}
                    onClick={() => {
                      setSize(s);
                      setAdded(false);
                    }}
                    type="button"
                  >
                    {s}
                  </button>
                ))}
              </fieldset>
              <button
                className="add"
                onClick={() => {
                  setBag(bag + 1);
                  setAdded(true);
                }}
              >
                {added ? (
                  <>
                    <Check size={16} /> Added, size {size} — add another
                  </>
                ) : (
                  <>
                    Add to your edit <Plus size={17} />
                  </>
                )}
              </button>
              <span className="demo-note" role="status">
                {added
                  ? "Your demonstration bag has been updated."
                  : "An interactive concept. No purchase is made."}
              </span>
            </div>
          </div>
        </section>
        <section className="manifesto">
          <div className="manifesto-image">
            <img
              src={detail}
              alt="Carefully arranged fashion pieces and soft textures"
              loading="lazy"
            />
          </div>
          <div className="manifesto-copy">
            <h2>
              Style is not
              <br />a dress code.
              <br />
              <em>It’s a feeling.</em>
            </h2>
            <p>
              We are drawn to the things that stay with us. A beautiful line. An
              unexpected texture. The confidence to take up a little more space.
            </p>
            <p>
              MUSE is a fictional house for a very real idea: a wardrobe should
              make you feel more like yourself.
            </p>
            <a href="#collection">
              Find your own expression <ArrowUpRight size={18} />
            </a>
          </div>
        </section>
        <section className="newsletter">
          <span>A letter, occasionally.</span>
          <h2>
            Stay in the <em>feeling.</em>
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubscribed(true);
            }}
          >
            <label className="sr-only" htmlFor="muse-email">
              Email address
            </label>
            <input
              id="muse-email"
              type="email"
              placeholder="Your email address"
              required
            />
            <button aria-label="Join the Muse mailing list">
              <ArrowRight size={23} />
            </button>
          </form>
          <p role="status">
            {subscribed
              ? "You’re on the demo list. Your email has not been stored or sent."
              : "Collection notes, new perspectives, and things worth keeping."}
          </p>
        </section>
      </main>
      <footer>
        <a href="#" className="footer-logo">
          MUSE
        </a>
        <div>
          <span>Fictional fashion house</span>
          <span>An Elseform template · 2026</span>
        </div>
        <a href="#collection">
          Explore the edit <ArrowUpRight size={16} />
        </a>
      </footer>
    </>
  );
}
