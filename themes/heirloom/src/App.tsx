import { useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Check,
  ChevronRight,
  Pause,
  Play,
} from "lucide-react";
const metals = [
  { name: "Warm gold", color: "#c6a269", price: 320 },
  { name: "Soft silver", color: "#b5b7ba", price: 260 },
  { name: "Rose gold", color: "#c89580", price: 340 },
];
export default function App() {
  const [metal, setMetal] = useState(0);
  const [size, setSize] = useState("6");
  const [engraving, setEngraving] = useState("always");
  const [reserved, setReserved] = useState(false);
  const [angle, setAngle] = useState(-30);
  const [rotating, setRotating] = useState(true);
  return (
    <>
      <header>
        <a className="brand" href="#">
          HEIRLOOM
        </a>
        <nav>
          <a href="#object">The object</a>
          <a href="#inscription">Make it personal</a>
        </nav>
        <span>Objects with a future.</span>
      </header>
      <main>
        <section className="cabinet">
          <div className="cabinet-title">
            <h1>
              Some things
              <br />
              are meant
              <br />
              <em>to stay.</em>
            </h1>
            <p>
              A small object.
              <br />A whole world of meaning.
            </p>
            <a href="#inscription">
              Create your keepsake <ArrowUpRight size={18} />
            </a>
          </div>
          <div
            className="jewel-stage"
            style={{ "--metal": metals[metal].color } as React.CSSProperties}
          >
            <div
              className={"ring " + (rotating ? "rotating" : "")}
              style={{ "--angle": `${angle}deg` } as React.CSSProperties}
              aria-label={`${metals[metal].name} sculptural ring`}
            >
              {Array.from({ length: 14 }, (_, i) => (
                <div
                  key={i}
                  className="ring-layer"
                  style={{
                    transform: `translateZ(${-i * 1.8}px)`,
                    filter: `brightness(${1 - i * 0.026})`,
                  }}
                />
              ))}
            </div>
            <span className="jewel-caption">
              THE CONTINUUM RING
              <br />
              <small>One line. No end.</small>
            </span>
            <span className="cabinet-mark">H.</span>
            <div className="object-view-controls">
              <label>
                Turn the object
                <input
                  aria-label="Rotate ring"
                  type="range"
                  min="-90"
                  max="90"
                  value={angle}
                  onChange={(e) => {
                    setAngle(+e.target.value);
                    setRotating(false);
                  }}
                />
              </label>
              <button
                aria-label={rotating ? "Pause rotation" : "Resume rotation"}
                onClick={() => setRotating(!rotating)}
              >
                {rotating ? <Pause size={16} /> : <Play size={16} />}
              </button>
            </div>
            <span className="material-caption">
              {metals[metal].name} / 4 mm band
            </span>
          </div>
        </section>
        <section className="object" id="object">
          <div className="object-label">
            <span>Continuum</span>
            <small>A study in permanence</small>
          </div>
          <div>
            <h2>
              A quiet kind
              <br />
              of extraordinary.
            </h2>
            <p>
              An uninterrupted curve, shaped to catch the light. A simple form
              that leaves room for the story you bring to it.
            </p>
            <p>
              Choose a finish, find your fit, and add a few words that belong
              only to you.
            </p>
          </div>
          <dl>
            <div>
              <dt>Form</dt>
              <dd>Continuous rounded band</dd>
            </div>
            <div>
              <dt>Width</dt>
              <dd>4 mm · illustrative</dd>
            </div>
            <div>
              <dt>Finish</dt>
              <dd>Softly polished</dd>
            </div>
            <div>
              <dt>Collection</dt>
              <dd>Objects to keep</dd>
            </div>
          </dl>
        </section>
        <section className="inscription" id="inscription">
          <div className="inscription-copy">
            <h2>
              Something
              <br />
              <em>only you know.</em>
            </h2>
            <p>
              A date. A word. A little promise.
              <br />
              The inside can mean as much as the outside.
            </p>
            <div
              className="engraving-plate"
              style={{ "--metal": metals[metal].color } as React.CSSProperties}
            >
              <span>{engraving || "Your words here"}</span>
            </div>
            <small>Illustrative engraving preview · up to 18 characters</small>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setReserved(true);
            }}
          >
            <fieldset>
              <legend>Metal · {metals[metal].name}</legend>
              <div className="metals">
                {metals.map((m, i) => (
                  <button
                    type="button"
                    key={m.name}
                    aria-label={m.name}
                    aria-pressed={metal === i}
                    style={{ background: m.color }}
                    onClick={() => {
                      setMetal(i);
                      setReserved(false);
                    }}
                  />
                ))}
              </div>
            </fieldset>
            <label>
              Ring size · US
              <select
                value={size}
                onChange={(e) => {
                  setSize(e.target.value);
                  setReserved(false);
                }}
              >
                {["5", "6", "7", "8", "9", "10"].map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </label>
            <label>
              Personal inscription
              <input
                maxLength={18}
                value={engraving}
                onChange={(e) => {
                  setEngraving(e.target.value);
                  setReserved(false);
                }}
                placeholder="Up to 18 characters"
              />
            </label>
            <div className="price">
              <span>Continuum ring</span>
              <strong>${metals[metal].price}</strong>
            </div>
            <button className="btn">
              Preview your piece <ArrowRight size={18} />
            </button>
            {reserved && (
              <p role="status">
                <Check size={18} /> {metals[metal].name}, size {size}
                {engraving ? `, engraved “${engraving}”` : ""}. Demo piece
                prepared — no order placed.
              </p>
            )}
            <small>
              Fictional product, materials and price. No payment or reservation.
            </small>
          </form>
        </section>
        <section className="closing">
          <p>
            Kept close.
            <br />
            Passed on.
          </p>
          <a href="#object">
            Return to the collection <ArrowUpRight size={19} />
          </a>
        </section>
      </main>
      <footer>
        <span>Heirloom · Fictional jewelry atelier</span>
        <a href="../../">Elseform collection</a>
      </footer>
    </>
  );
}
