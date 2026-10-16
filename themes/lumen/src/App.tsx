import { useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Plus,
  Minus,
  Check,
  Sun,
  Glasses,
} from "lucide-react";
import portrait from "./assets/portrait.jpg";
const finishes = [
  { name: "Ink", color: "#252a21" },
  { name: "Clay", color: "#a94d32" },
  { name: "Ocean", color: "#2c6377" },
];
export default function App() {
  const [finish, setFinish] = useState(0);
  const [size, setSize] = useState("Medium");
  const [lens, setLens] = useState("Smoke");
  const [bag, setBag] = useState<
    { finish: string; size: string; lens: string }[]
  >([]);
  const count = bag.length;
  return (
    <>
      <header>
        <a className="brand" href="#">
          LUMEN<span>Objects for seeing.</span>
        </a>
        <nav>
          <a href="#details">The frame</a>
          <a href="#story">Our perspective</a>
        </nav>
        <a href="#bag">
          Bag ({count}) <ArrowUpRight size={17} />
        </a>
      </header>
      <main>
        <section className="showroom">
          <div className="showroom-head">
            <h1>
              A different
              <br />
              point of view.
            </h1>
            <div>
              <span>THE EVERYDAY FRAME</span>
              <p>Forma / 01</p>
              <span>$145 · Illustrative price</span>
            </div>
          </div>
          <div
            className="product-stage"
            style={
              {
                "--frame": finishes[finish].color,
                "--lens":
                  lens === "Smoke"
                    ? "#424941"
                    : lens === "Amber"
                      ? "#a16c2c"
                      : "#527783",
              } as React.CSSProperties
            }
          >
            <div
              className="frame-object"
              aria-label={`${finishes[finish].name} eyewear frame with ${lens.toLowerCase()} lenses`}
            >
              <div className="arm arm-left" />
              <div className="arm arm-right" />
              <div className="eyepiece left-eye" />
              <div className="bridge" />
              <div className="eyepiece right-eye" />
            </div>
            <span className="measurement">← 142 mm →</span>
            <span className="stage-caption">
              Designed to be worn. Made to be you.
            </span>
            <span className="stage-number">F / 01</span>
          </div>
          <div className="config" id="details">
            <div>
              <h2>Make it yours.</h2>
              <p>
                One considered shape.
                <br />A few good decisions.
              </p>
            </div>
            <fieldset>
              <legend>Frame · {finishes[finish].name}</legend>
              <div className="swatches">
                {finishes.map((x, i) => (
                  <button
                    key={x.name}
                    aria-label={x.name + " frame"}
                    aria-pressed={finish === i}
                    style={{ background: x.color }}
                    onClick={() => setFinish(i)}
                  />
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend>Fit</legend>
              <div className="choices">
                {["Small", "Medium", "Large"].map((x) => (
                  <button
                    key={x}
                    aria-pressed={size === x}
                    onClick={() => setSize(x)}
                  >
                    {x}
                  </button>
                ))}
              </div>
            </fieldset>
            <label>
              Lens tint
              <select value={lens} onChange={(e) => setLens(e.target.value)}>
                <option>Smoke</option>
                <option>Amber</option>
                <option>Sea</option>
              </select>
            </label>
            <button
              className="btn"
              onClick={() =>
                setBag([...bag, { finish: finishes[finish].name, size, lens }])
              }
            >
              Add to demo bag <Plus size={18} />
            </button>
          </div>
        </section>
        <section className="perspective" id="story">
          <img
            src={portrait}
            alt="A pair of sunglasses in bright natural light"
          />
          <div>
            <Glasses size={38} />
            <h2>
              Life looks good
              <br />
              <em>from here.</em>
            </h2>
            <p>
              Everyday frames with an independent point of view. A balance of
              clear lines, generous proportions and just enough personality.
            </p>
            <div className="specs">
              <span>
                Frame width<strong>142 mm</strong>
              </span>
              <span>
                Lens width<strong>49 mm</strong>
              </span>
              <span>
                Bridge<strong>22 mm</strong>
              </span>
            </div>
            <small>
              All materials, dimensions and prices are illustrative product
              details.
            </small>
          </div>
        </section>
        <section className="bag" id="bag">
          <h2>Your point of view.</h2>
          <div>
            <p>
              {count
                ? bag
                    .map(
                      (item, i) =>
                        `${i + 1}. Forma / 01 — ${item.finish}, ${item.size}, ${item.lens}`,
                    )
                    .join(" · ")
                : "Your demo bag is empty. Configure a frame above."}
            </p>
            {count > 0 && (
              <>
                <strong>${count * 145}</strong>
                <button className="quiet" onClick={() => setBag([])}>
                  Clear demo bag
                </button>
              </>
            )}
            <p role="status">
              {count
                ? `${count} frame${count > 1 ? "s" : ""} in your demo bag. No purchase or payment is made.`
                : "Demo only. No checkout or payment."}
            </p>
          </div>
        </section>
      </main>
      <footer>
        <span>Lumen · Fictional eyewear concept</span>
        <a href="../../">Koative collection</a>
      </footer>
    </>
  );
}
