import { useState } from "react";
import { Plus, Minus, ArrowUpRight } from "lucide-react";
const flavors = [
  {
    name: "Sea salt caramel",
    note: "A little salt. A long finish.",
    tone: "#a97242",
  },
  { name: "Dark ganache", note: "Deep cocoa, softly spoken.", tone: "#4b2b25" },
  {
    name: "Pistachio praline",
    note: "Roasted, green, quietly rich.",
    tone: "#79815a",
  },
  {
    name: "Raspberry rose",
    note: "Bright fruit, a floral whisper.",
    tone: "#9b4857",
  },
];
export default function App() {
  const [box, setBox] = useState<number[]>([]),
    [msg, setMsg] = useState("");
  return (
    <>
      <header>
        <a className="brand" href="#">
          truffle<span>Chocolate, considered.</span>
        </a>
        <nav>
          <a href="#box">Compose a box</a>
          <a href="#atelier">At the atelier</a>
          <span>{box.length} / 6</span>
        </nav>
      </header>
      <main>
        <section className="truffle-opening">
          <div>
            <h1>
              A small
              <br />
              moment of
              <br />
              <em>extraordinary.</em>
            </h1>
            <p>
              Chocolate for the pause between things.
              <br />
              Choose six little reasons to slow down.
            </p>
            <a href="#box">
              Compose your collection <ArrowUpRight size={18} />
            </a>
          </div>
          <div
            className="chocolate-stage"
            role="img"
            aria-label="Six geometric chocolate bonbons arranged in a gift box"
          >
            <div className="gift-box">
              {[0, 1, 2, 3, 1, 0].map((x, i) => (
                <div
                  className="bonbon"
                  key={i}
                  style={{ "--cocoa": flavors[x].tone } as React.CSSProperties}
                >
                  <span />
                </div>
              ))}
            </div>
            <span className="gift-note">THE SIX-PIECE COLLECTION</span>
          </div>
        </section>
        <section id="box" className="box-builder">
          <div className="flavor-menu">
            <h2>Follow your taste.</h2>
            <p>
              Six pieces. Four imagined flavors. Your own beautiful balance.
            </p>
            {flavors.map((f, i) => (
              <article key={f.name}>
                <i style={{ background: f.tone }} />
                <div>
                  <h3>{f.name}</h3>
                  <p>{f.note}</p>
                </div>
                <button
                  aria-label={"Add " + f.name}
                  disabled={box.length === 6}
                  onClick={() => {
                    setBox([...box, i]);
                    setMsg("");
                  }}
                >
                  <Plus size={17} />
                </button>
              </article>
            ))}
          </div>
          <aside>
            <div className="row">
              <h3>Your chocolate story</h3>
              <span>{box.length} of 6</span>
            </div>
            <div className="box-slots">
              {Array.from({ length: 6 }, (_, i) => (
                <div className="slot" key={i}>
                  {box[i] !== undefined ? (
                    <button
                      aria-label={"Remove piece " + (i + 1)}
                      style={{ background: flavors[box[i]].tone }}
                      onClick={() => {
                        setBox(box.filter((_, j) => j !== i));
                        setMsg("");
                      }}
                    >
                      <Minus size={16} />
                      <span>{flavors[box[i]].name}</span>
                    </button>
                  ) : (
                    <span>{i + 1}</span>
                  )}
                </div>
              ))}
            </div>
            <div className="row box-price">
              <span>Illustrative gift box</span>
              <strong>£24</strong>
            </div>
            <button
              className="action"
              disabled={box.length !== 6}
              onClick={() =>
                setMsg(
                  "Your six-piece demo box is complete. No purchase or order was made.",
                )
              }
            >
              {box.length === 6
                ? "Save your chocolate box"
                : `Choose ${6 - box.length} more piece${6 - box.length === 1 ? "" : "s"}`}
            </button>
            <p role="status" className="status">
              {msg}
            </p>
            <p className="allergen">
              Demo only. Real product allergen and ingredient details must be
              supplied before sale.
            </p>
          </aside>
        </section>
        <section id="atelier" className="atelier">
          <h2>
            The art is
            <br />
            in the attention.
          </h2>
          <div>
            <p>
              Temperature. Texture. A shell that gives way at just the right
              moment. The smallest things are often the ones worth taking time
              over.
            </p>
            <p>
              Truffle imagines a contemporary chocolate atelier where
              gift-giving begins with a personal choice, and every piece has
              room to be itself.
            </p>
            <a href="#box">
              Make something thoughtful <ArrowUpRight size={16} />
            </a>
          </div>
        </section>
      </main>
      <footer>
        <a href="../../">Koative collection</a>
        <p>
          Truffle is a fictional chocolate atelier. All products and prices are
          illustrative.
        </p>
      </footer>
    </>
  );
}
