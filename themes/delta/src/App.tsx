import { useState } from "react";
import { Droplets, ArrowRight, Plus, Minus } from "lucide-react";
export default function App() {
  const [rain, setRain] = useState(24);
  const [district, setDistrict] = useState("East basin");
  const [saved, setSaved] = useState("");
  const capacity = district === "East basin" ? 420 : 680;
  const captured = Math.round(rain * capacity * 0.82);
  return (
    <>
      <a className="skip" href="#main">
        Skip to basin model
      </a>
      <header>
        <a className="brand" href="#">
          <Droplets />
          delta
        </a>
        <nav>
          <a href="#model">Basin model</a>
          <a href="#thinking">Our thinking</a>
        </nav>
        <span className="header-note">Water, held in balance.</span>
      </header>
      <main id="main">
        <div className="opening">
          <h1>
            Every drop.
            <br />
            <em>A wider possibility.</em>
          </h1>
          <p>
            A working study in urban water. See what a little rainfall can do
            when a neighbourhood makes room for it.
          </p>
        </div>
        <section className="basin" id="model">
          <div className="water-study">
            <div className="basin-caption">
              <span>{district}</span>
              <span>Concept model / live inputs</span>
            </div>
            <div
              className="reservoir"
              style={{ "--fill": `${28 + rain / 2}%` } as React.CSSProperties}
            >
              <div className="water">
                <i />
                <i />
                <i />
              </div>
              <div className="water-reading">
                <strong>
                  {captured.toLocaleString()}
                  <small>litres</small>
                </strong>
                <span>estimated captured rainwater</span>
              </div>
              <div className="levels">
                <span>100%</span>
                <span>50%</span>
                <span>0%</span>
              </div>
            </div>
            <div className="basin-base">
              <span>Permeable ground</span>
              <span>Storage, then slow release</span>
            </div>
          </div>
          <div className="model-controls">
            <h2>
              Make room
              <br />
              for rain.
            </h2>
            <p>
              Change the catchment and rainfall to explore a simple capture
              scenario.
            </p>
            <label>
              Catchment
              <select
                value={district}
                onChange={(e) => {
                  setDistrict(e.target.value);
                  setSaved("");
                }}
              >
                <option>East basin</option>
                <option>West gardens</option>
              </select>
            </label>
            <label className="rain-label">
              Rainfall <strong>{rain} mm</strong>
              <input
                aria-label="Rainfall"
                type="range"
                min="5"
                max="80"
                value={rain}
                onChange={(e) => {
                  setRain(+e.target.value);
                  setSaved("");
                }}
              />
            </label>
            <dl>
              <div>
                <dt>Capture area</dt>
                <dd>{capacity} m²</dd>
              </div>
              <div>
                <dt>Collection factor</dt>
                <dd>82%</dd>
              </div>
              <div>
                <dt>Garden watering equivalent</dt>
                <dd>{Math.round(captured / 12)} m²</dd>
              </div>
            </dl>
            <button
              className="primary"
              onClick={() =>
                setSaved(
                  `${district}: ${captured.toLocaleString()} litres saved to your local scenario.`,
                )
              }
            >
              Save this scenario <ArrowRight />
            </button>
            <p role="status" className="status">
              {saved || "Illustrative model. Not an engineering assessment."}
            </p>
          </div>
        </section>
        <section id="thinking" className="thinking">
          <div>
            <h2>
              Water belongs
              <br />
              in the conversation.
            </h2>
            <p>
              Between a downpour and a dry week is an opportunity to design
              differently. Small connected places can hold water, nurture
              planting and make a city more liveable.
            </p>
          </div>
          <div className="principles">
            <article>
              <span>Capture</span>
              <h3>Start where the rain lands.</h3>
              <p>Roofs, courtyards and streets become part of the catchment.</p>
            </article>
            <article>
              <span>Hold</span>
              <h3>Let the landscape do more.</h3>
              <p>
                Planted basins create temporary space for changing conditions.
              </p>
            </article>
            <article>
              <span>Release</span>
              <h3>A slower way downstream.</h3>
              <p>Controlled outflow gives water somewhere useful to go.</p>
            </article>
          </div>
        </section>
        <div className="footnote">
          <strong>The model, explained.</strong>
          <p>
            Captured litres = rainfall in millimetres × area in square metres ×
            0.82. Watering equivalent assumes 12 litres per square metre.
            Figures are fictional teaching examples.
          </p>
        </div>
      </main>
      <footer>
        <span>Delta — fictional water design studio</span>
        <span>A collection of considered systems.</span>
      </footer>
    </>
  );
}
