import { useState } from "react";
import { ArrowRight, Plus, Minus } from "lucide-react";
const honeys = [
  {
    name: "Wildflower",
    note: "Floral, bright, beautifully untamed.",
    color: "#b9701f",
    taste: "Flowers · citrus · soft spice",
    pair: "Warm toast, yogurt, soft cheese",
    price: 14,
  },
  {
    name: "Woodland",
    note: "Deep amber. A little wild at heart.",
    color: "#70411f",
    taste: "Malt · resin · dried fruit",
    pair: "Rye bread, roasted roots, tea",
    price: 17,
  },
  {
    name: "Spring blossom",
    note: "The lightness of a new beginning.",
    color: "#d3a53b",
    taste: "Apple blossom · vanilla · pear",
    pair: "Porridge, fresh ricotta, pancakes",
    price: 13,
  },
];
export default function App() {
  const [index, setIndex] = useState(0),
    [qty, setQty] = useState(1),
    [msg, setMsg] = useState("");
  const h = honeys[index];
  return (
    <>
      <header>
        <a className="brand" href="#">
          nectar
        </a>
        <nav>
          <a href="#tasting">The honey</a>
          <a href="#fieldnotes">Field notes</a>
          <a href="#tasting">
            Find your jar <ArrowRight size={16} />
          </a>
        </nav>
      </header>
      <main>
        <section className="nectar-intro">
          <h1>
            A little wild.
            <br />
            <em>A lot of wonder.</em>
          </h1>
          <p>
            Honey, as the flowers intended.
            <br />
            Explore a fictional apiary's changing seasons,
            <br />
            one golden spoonful at a time.
          </p>
        </section>
        <section className="tasting" id="tasting">
          <div className="flavors">
            <h2>
              Every season
              <br />
              has a flavor.
            </h2>
            {honeys.map((x, i) => (
              <button
                key={x.name}
                aria-pressed={index === i}
                onClick={() => {
                  setIndex(i);
                  setMsg("");
                }}
              >
                <span>{x.name}</span>
                <ArrowRight size={19} />
              </button>
            ))}
            <p>
              Three imagined harvests.
              <br />
              One very good ritual.
            </p>
          </div>
          <div className="jar-stage">
            <div
              className="jar"
              style={{ "--honey": h.color } as React.CSSProperties}
            >
              <div className="lid" />
              <div className="jar-body">
                <div className="jar-label">
                  <span>NECTAR</span>
                  <strong>{h.name}</strong>
                  <i>
                    From flower
                    <br />
                    to spoon.
                  </i>
                  <small>340 g · DEMO EDITION</small>
                </div>
              </div>
            </div>
            <span className="stage-caption">A study in liquid sunshine.</span>
          </div>
          <div className="tasting-note">
            <h2>{h.name}</h2>
            <p>{h.note}</p>
            <dl>
              <dt>Tasting notes</dt>
              <dd>{h.taste}</dd>
              <dt>Lovely with</dt>
              <dd>{h.pair}</dd>
            </dl>
            <div className="row">
              <strong>£{h.price}</strong>
              <div className="quantity">
                <button
                  disabled={qty === 1}
                  aria-label="Fewer jars"
                  onClick={() => setQty(qty - 1)}
                >
                  <Minus size={15} />
                </button>
                <output aria-label="Jar quantity">{qty}</output>
                <button aria-label="More jars" onClick={() => setQty(qty + 1)}>
                  <Plus size={15} />
                </button>
              </div>
            </div>
            <button
              className="action"
              onClick={() =>
                setMsg(
                  `${qty} ${h.name.toLowerCase()} jar${qty > 1 ? "s" : ""} added to your demo basket · £${qty * h.price}.`,
                )
              }
            >
              Add to demo basket
            </button>
            <p className="status" role="status">
              {msg}
            </p>
          </div>
        </section>
        <section className="fieldnotes" id="fieldnotes">
          <h2>
            The flowers
            <br />
            write the recipe.
          </h2>
          <div>
            <p>
              Weather, blossom, and the patchwork of a landscape give every
              honey its character. The beauty is in paying attention.
            </p>
            <div className="season-line">
              <span>
                SPRING
                <br />
                <b>Blossom opens</b>
              </span>
              <span>
                SUMMER
                <br />
                <b>Meadows hum</b>
              </span>
              <span>
                AUTUMN
                <br />
                <b>Honey rests</b>
              </span>
            </div>
            <p className="small">
              A note for little ones: honey is not suitable for children under
              one year old. Product information here is illustrative.
            </p>
          </div>
        </section>
      </main>
      <footer>
        <a href="../../">Elseform collection</a>
        <p>
          Nectar is a fictional apiary. No real products, purchases, or dietary
          claims.
        </p>
      </footer>
    </>
  );
}
