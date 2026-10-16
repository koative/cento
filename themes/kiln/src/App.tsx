import { useState } from "react";
import { ArrowUpRight, Plus, Minus, ShoppingBag } from "lucide-react";
import pottery from "./assets/pottery.jpg";
import ceramics from "./assets/ceramics.jpg";
const objects = [
  {
    name: "The daily cup",
    type: "Table",
    price: 32,
    note: "For slow mornings. Warm white glaze.",
    position: "20%",
  },
  {
    name: "Gathering bowl",
    type: "Table",
    price: 58,
    note: "A generous shape, a quiet centerpiece.",
    position: "50%",
  },
  {
    name: "Still life vessel",
    type: "Objects",
    price: 74,
    note: "Made for a single branch, or nothing at all.",
    position: "80%",
  },
];
export default function App() {
  const [filter, setFilter] = useState("All objects");
  const [bag, setBag] = useState<number[]>([0, 0, 0]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const count = bag.reduce((a, b) => a + b, 0);
  return (
    <>
      <header>
        <a className="wordmark" href="#">
          kiln<span>STUDIO</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#objects">Objects</a>
          <a href="#process">Our practice</a>
        </nav>
        <button
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="bag"
        >
          <ShoppingBag size={18} /> Bag ({count})
        </button>
      </header>
      <main>
        <section className="opening">
          <div className="opening-copy">
            <h1>
              Good things
              <br />
              take <em>shape.</em>
            </h1>
            <p>
              Everyday ceramics. Made slowly.
              <br />
              Kept for a very long time.
            </p>
            <a className="link" href="#objects">
              Find your everyday object <ArrowUpRight size={22} />
            </a>
            <div className="studio-note">
              <span>Earth. Water. Fire.</span>
              <span>Small-batch studio collection</span>
            </div>
          </div>
          <figure className="opening-image">
            <img
              src={ceramics}
              alt="Handmade blue ceramic plates and bowls arranged on wooden shelves"
            />
            <figcaption>
              Uneven by nature.
              <br />
              Beautiful by design.
            </figcaption>
          </figure>
          <div className="edition">
            A study in everyday rituals — Collection No. 04
          </div>
        </section>
        <section id="objects">
          <div className="section-top">
            <h2>A place at your table.</h2>
            <div className="filters" aria-label="Filter collection">
              {["All objects", "Table", "Objects"].map((x) => (
                <button
                  key={x}
                  onClick={() => setFilter(x)}
                  aria-pressed={filter === x}
                >
                  {x}
                </button>
              ))}
            </div>
          </div>
          <p className="sample">
            Concept collection · Illustrative products and prices
          </p>
          <div className="object-list">
            {objects.map(
              (item, i) =>
                (filter === "All objects" || filter === item.type) && (
                  <article key={item.name}>
                    <div className={"product-photo photo-" + i}>
                      <img
                        src={ceramics}
                        alt={"Studio ceramics — inspiration for " + item.name}
                        style={{ objectPosition: item.position }}
                      />
                      <span>{item.type}</span>
                    </div>
                    <div className="product-meta">
                      <h3>{item.name}</h3>
                      <span>${item.price}</span>
                    </div>
                    <p>{item.note}</p>
                    <button
                      className="add"
                      onClick={() => {
                        setBag((v) => v.map((n, j) => (j === i ? n + 1 : n)));
                        setMessage(item.name + " added to your sample bag.");
                      }}
                    >
                      Add {item.name}
                      <Plus size={18} />
                    </button>
                  </article>
                ),
            )}
          </div>
          <p role="status" className="message">
            {message}
          </p>
        </section>
        {open && (
          <section id="bag" aria-label="Your sample bag" className="bag">
            <div className="section-top">
              <h2>Your sample bag</h2>
              <button onClick={() => setOpen(false)}>Close bag</button>
            </div>
            {count === 0 ? (
              <p>Your bag is empty. Give an everyday object a home.</p>
            ) : (
              <>
                {objects.map(
                  (o, i) =>
                    bag[i] > 0 && (
                      <div className="bag-row" key={o.name}>
                        <span>{o.name}</span>
                        <div>
                          <button
                            aria-label={"Remove one " + o.name}
                            onClick={() =>
                              setBag((v) =>
                                v.map((n, j) =>
                                  i === j ? Math.max(0, n - 1) : n,
                                ),
                              )
                            }
                          >
                            <Minus size={16} />
                          </button>
                          <span>{bag[i]}</span>
                          <button
                            aria-label={"Add one " + o.name}
                            onClick={() =>
                              setBag((v) =>
                                v.map((n, j) => (i === j ? n + 1 : n)),
                              )
                            }
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <strong>${o.price * bag[i]}</strong>
                      </div>
                    ),
                )}
                <p className="total">
                  Sample total{" "}
                  <strong>
                    ${bag.reduce((sum, n, i) => sum + n * objects[i].price, 0)}
                  </strong>
                </p>
              </>
            )}
            <small>Local demo only. No orders or payments are taken.</small>
          </section>
        )}
        <section id="process" className="process">
          <img
            src={pottery}
            alt="A ceramic artist shaping wet clay by hand on a pottery wheel"
            loading="lazy"
          />
          <div>
            <h2>
              A little less
              <br />
              <em>perfect.</em>
              <br />A lot more human.
            </h2>
            <p>
              The trace of a thumb. A glaze that pools at the edge. The details
              we love are the ones a machine would smooth away.
            </p>
            <p>
              Our imagined studio celebrates useful objects and the people who
              make them. This is a design concept for an independent ceramics
              practice.
            </p>
          </div>
        </section>
        <section className="plinth-section">
          <div>
            <h2>
              Space for the
              <br />
              things you keep.
            </h2>
            <p>A quiet collection deserves a little room.</p>
            <a className="link" href="#objects">
              Explore the objects <ArrowUpRight size={22} />
            </a>
          </div>
          <div className="plinth-scene" aria-hidden="true">
            <div className="plinth">
              <i className="top" />
              <i className="front" />
              <i className="side" />
            </div>
            <span>THE DISPLAY STUDY</span>
          </div>
        </section>
      </main>
      <footer>
        <a className="wordmark" href="#">
          kiln
        </a>
        <p>Fictional ceramics studio · An Elseform template</p>
        <a href="../../">
          Back to the collection <ArrowUpRight size={16} />
        </a>
      </footer>
    </>
  );
}
