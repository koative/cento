import { useState } from "react";
import { ArrowUpRight, Flame, Plus, Minus } from "lucide-react";
const scents = [
  {
    name: "After the rain",
    notes: "Cedar · moss · petrichor",
    mood: "For coming home",
    color: "#88907a",
    text: "A window left open after a passing storm. Damp earth, quiet woods and a fresh beginning.",
  },
  {
    name: "The last light",
    notes: "Amber · fig · sandalwood",
    mood: "For slowing down",
    color: "#bd8d63",
    text: "The room turns golden. Soft fruit, warm wood and the feeling of nowhere else to be.",
  },
  {
    name: "Sunday morning",
    notes: "Neroli · linen · bergamot",
    mood: "For starting gently",
    color: "#c7bd8d",
    text: "Clean sheets and the first open window. Bright citrus softened by the comfort of familiar things.",
  },
];
export default function App() {
  const [scent, setScent] = useState(0),
    [lit, setLit] = useState(true),
    [quantity, setQuantity] = useState(1),
    [added, setAdded] = useState(false);
  let s = scents[scent];
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header>
        <a className="brand" href="#">
          <Flame size={21} strokeWidth={1} />
          emberlight
        </a>
        <nav>
          <a href="#ritual">Find your scent</a>
          <a href="#making">The making</a>
          <a href="#ritual">A little light ↗</a>
        </nav>
      </header>
      <main id="main">
        <section className="product-stage">
          <div className="stage-copy">
            <h1>
              A small light.
              <br />A softer world.
            </h1>
            <p>
              Thoughtfully made candles
              <br />
              for the moments between things.
            </p>
            <a href="#ritual">
              Find your everyday ritual <ArrowUpRight size={18} />
            </a>
            <span>POURED SLOWLY. BURNED WITH INTENTION.</span>
          </div>
          <div
            className={"candle-scene " + (lit ? "lit" : "")}
            style={{ "--ceramic": s.color } as React.CSSProperties}
          >
            <div className="plinth" />
            <div className="candle">
              <div className="wax">
                <i className="wick" />
                <i className="flame" />
              </div>
              <div className="vessel">
                <span>emberlight</span>
                <strong>{s.name}</strong>
                <small>BOTANICAL WAX / 220G</small>
              </div>
            </div>
            <div className="scene-caption">
              <span>THE EVERYDAY COLLECTION</span>
              <button onClick={() => setLit(!lit)} aria-pressed={lit}>
                <Flame size={15} />
                {lit ? "Extinguish the candle" : "Light the candle"}
              </button>
            </div>
          </div>
        </section>
        <section className="ritual" id="ritual">
          <div className="ritual-intro">
            <h2>
              What does
              <br />
              <em>your quiet</em> smell like?
            </h2>
            <p>
              A scent can change a room. Sometimes it can change the shape of a
              whole evening.
            </p>
          </div>
          <div className="scent-workspace">
            <div className="scent-list">
              {scents.map((v, i) => (
                <button
                  key={v.name}
                  aria-pressed={scent === i}
                  onClick={() => {
                    setScent(i);
                    setAdded(false);
                  }}
                >
                  <i style={{ background: v.color }} />
                  <span>
                    {v.name}
                    <small>{v.mood}</small>
                  </span>
                  <ArrowUpRight size={18} />
                </button>
              ))}
            </div>
            <article className="scent-detail" aria-live="polite">
              <h3>{s.name}</h3>
              <p className="notes">{s.notes}</p>
              <p>{s.text}</p>
              <div className="specs">
                <span>220g botanical wax</span>
                <span>Ceramic vessel</span>
                <span>Cotton wick</span>
              </div>
              <div className="purchase">
                <div className="quantity">
                  <button
                    aria-label="Fewer candles"
                    disabled={quantity === 1}
                    onClick={() => {
                      setQuantity(quantity - 1);
                      setAdded(false);
                    }}
                  >
                    <Minus size={15} />
                  </button>
                  <strong>{quantity}</strong>
                  <button
                    aria-label="More candles"
                    disabled={quantity === 6}
                    onClick={() => {
                      setQuantity(quantity + 1);
                      setAdded(false);
                    }}
                  >
                    <Plus size={15} />
                  </button>
                </div>
                <button className="add" onClick={() => setAdded(true)}>
                  {added
                    ? "Added to your ritual"
                    : `Add to my ritual · €${quantity * 32}`}
                  <ArrowUpRight size={16} />
                </button>
              </div>
              <p className="feedback">
                {added
                  ? `${quantity} × ${s.name}. Saved locally for this visit.`
                  : "A sample shop interaction. No checkout or payment."}
              </p>
            </article>
          </div>
        </section>
        <section className="making" id="making">
          <div className="making-word">
            Slow
            <br />
            by design.
          </div>
          <div>
            <h2>
              Nothing extra.
              <br />
              Everything considered.
            </h2>
            <p>
              A balanced scent. An honest vessel. A small ritual that asks
              nothing of you. We believe everyday objects deserve the same care
              as the moments we save for special occasions.
            </p>
            <div className="making-details">
              <span>Made in small batches</span>
              <span>Designed to be kept</span>
              <span>Packaged simply</span>
            </div>
            <p className="care">
              Candle care: trim the wick before lighting, keep away from drafts
              and never leave a burning candle unattended.
            </p>
          </div>
        </section>
      </main>
      <footer>
        <a className="brand" href="#">
          emberlight
        </a>
        <p>
          Fictional candle atelier · Sample products and local interactions ·
          Koative
        </p>
        <a href="#ritual">Find your quiet ↗</a>
      </footer>
    </>
  );
}
