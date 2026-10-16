import { useState } from "react";
import { ArrowRight, Sun, Minus, Plus } from "lucide-react";
const finishes = [
  { name: "Chalk", color: "#d7d0be" },
  { name: "Ochre", color: "#ba6434" },
  { name: "Graphite", color: "#444440" },
];
export default function App() {
  const [finish, setFinish] = useState(0);
  const [warm, setWarm] = useState(true);
  const [qty, setQty] = useState(1);
  const [saved, setSaved] = useState("");
  return (
    <>
      <a className="skip" href="#main">
        Skip to lighting collection
      </a>
      <header>
        <a className="brand" href="#">
          lumenary
        </a>
        <nav>
          <a href="#object">The object</a>
          <a href="#details">The details</a>
          <span>Light, thoughtfully.</span>
        </nav>
      </header>
      <main id="main">
        <section className="showroom" id="object">
          <div
            className="room"
            style={
              {
                "--lamp": finishes[finish].color,
                "--light": warm ? "#f7dfa0" : "#e9eff2",
              } as React.CSSProperties
            }
          >
            <div className="room-caption">
              Collection 01 / The Arc table light
            </div>
            <div className="lamp-scene">
              <div className="light-pool" />
              <div className="lamp-shade" />
              <div className="lamp-stem" />
              <div className="lamp-foot" />
            </div>
            <button
              className="light-switch"
              onClick={() => setWarm(!warm)}
              aria-pressed={warm}
            >
              <Sun />
              {warm ? "Warm light · 2700K" : "Cool light · 4000K"}
            </button>
            <span className="object-number">ARC / 01</span>
          </div>
          <div className="object-copy">
            <h1>
              A softer
              <br />
              kind of
              <br />
              <em>presence.</em>
            </h1>
            <p>
              Arc is a small architectural gesture. A generous shade. A slender
              stem. Light that makes room feel like home.
            </p>
            <div className="finish">
              <span>Finish — {finishes[finish].name}</span>
              <div>
                {finishes.map((f, i) => (
                  <button
                    key={f.name}
                    style={{ background: f.color }}
                    aria-label={`${f.name} finish`}
                    aria-pressed={finish === i}
                    onClick={() => {
                      setFinish(i);
                      setSaved("");
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="purchase">
              <strong>
                €245 <small>per light</small>
              </strong>
              <div className="quantity">
                <button
                  aria-label="Remove one light"
                  disabled={qty === 1}
                  onClick={() => {
                    setQty(qty - 1);
                    setSaved("");
                  }}
                >
                  <Minus />
                </button>
                <span>{qty}</span>
                <button
                  aria-label="Add one light"
                  disabled={qty === 8}
                  onClick={() => {
                    setQty(qty + 1);
                    setSaved("");
                  }}
                >
                  <Plus />
                </button>
              </div>
            </div>
            <button
              className="primary"
              onClick={() =>
                setSaved(
                  `${qty} Arc ${qty === 1 ? "light" : "lights"} in ${finishes[finish].name} added to your concept list. Total €${245 * qty}.`,
                )
              }
            >
              Add to concept list <ArrowRight />
            </button>
            <p className="status" role="status">
              {saved || "A fictional collection. No checkout or payment."}
            </p>
          </div>
        </section>
        <section className="details" id="details">
          <div>
            <h2>
              Made for
              <br />
              the everyday ritual.
            </h2>
            <p>
              The last chapter. A quiet supper. The work you love. Arc gives the
              ordinary a little warmth.
            </p>
          </div>
          <dl>
            <div>
              <dt>Material</dt>
              <dd>Powder-coated aluminium</dd>
            </div>
            <div>
              <dt>Dimensions</dt>
              <dd>H 420 × Ø 280 mm</dd>
            </div>
            <div>
              <dt>Light source</dt>
              <dd>Replaceable E27 LED</dd>
            </div>
            <div>
              <dt>Switch</dt>
              <dd>Inline dimmer concept</dd>
            </div>
            <div>
              <dt>Available finishes</dt>
              <dd>Chalk / Ochre / Graphite</dd>
            </div>
          </dl>
          <div className="dimension">
            <div className="dimension-shade" />
            <div className="dimension-stem" />
            <div className="dimension-base" />
            <span>420 mm</span>
            <small>280 mm</small>
          </div>
        </section>
        <section className="closing">
          <span>A note on light</span>
          <p>
            Not everything needs
            <br />
            to be brighter.
            <br />
            <em>Some things need to be warmer.</em>
          </p>
        </section>
      </main>
      <footer>
        <span>Lumenary — fictional lighting collection</span>
        <span>Designed to stay.</span>
      </footer>
    </>
  );
}
