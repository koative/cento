import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Box,
  Download,
  RotateCw,
} from "lucide-react";
export default function App() {
  const [material, setMaterial] = useState("Aluminium 6061");
  const [quantity, setQuantity] = useState(50);
  const [finish, setFinish] = useState("Bead blasted");
  const [rotate, setRotate] = useState(true);
  const [requested, setRequested] = useState(false);
  const price = Math.round(
    (material === "Titanium Grade 5"
      ? 89
      : material === "Stainless 316"
        ? 42
        : 24) * (quantity >= 100 ? 0.8 : 1),
  );
  const saveSpec = () => {
    const blob = new Blob(
      [
        `FORGE DEMONSTRATION SPECIFICATION\nComponent: Flange F-204\nMaterial: ${material}\nFinish: ${finish}\nQuantity: ${quantity}\nIllustrative unit cost: €${price}\nNot a manufacturing quote.\n`,
      ],
      { type: "text/plain" },
    );
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "forge-specification.txt";
    a.click();
    URL.revokeObjectURL(a.href);
  };
  return (
    <>
      <a href="#configure" className="skip">
        Skip to part configuration
      </a>
      <header className="nav">
        <a href="#" className="brand">
          <Box />
          FORGE
        </a>
        <nav>
          <a href="#configure">Configure a part</a>
          <a href="#capabilities">Capabilities</a>
          <a href="#process">The process</a>
        </nav>
        <span className="small">Precision, made tangible.</span>
      </header>
      <main>
        <section className="forge-intro">
          <div className="intro-line">
            <h1>
              YOUR IDEA.
              <br />
              TO THE
              <br />
              <span>MICRON.</span>
            </h1>
            <p>
              Precision components.
              <br />
              Considered from every angle.
              <br />
              <a href="#configure">
                Start with a specification <ArrowUpRight />
              </a>
            </p>
          </div>
          <div className="machine-view">
            <div
              className={"part " + (!rotate ? "still" : "")}
              aria-label="Dimensional rotating flange geometry"
            >
              <div className="part-face">
                <div className="part-hole" />
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <span
                    key={i}
                    style={{
                      transform: `rotate(${i * 60}deg) translateX(106px)`,
                    }}
                  />
                ))}
              </div>
              <div className="part-side" />
            </div>
            <span className="dimension d1">Ø 240.00 mm</span>
            <span className="dimension d2">± 0.05 mm / CONCEPT TOLERANCE</span>
            <span className="part-id">
              F–204
              <br />
              <small>MOUNTING FLANGE</small>
            </span>
            <button onClick={() => setRotate(!rotate)} className="rotate">
              <RotateCw /> {rotate ? "Pause rotation" : "Rotate part"}
            </button>
          </div>
        </section>
        <section id="configure" className="configuration">
          <div className="config-heading">
            <span>F–204</span>
            <h2>
              A specification
              <br />
              is a conversation.
            </h2>
            <p>
              Explore materials, finishing and batch size. Build a sample brief
              you can take with you.
            </p>
            <p className="demo">
              Fictional part and prices. No files or inquiries are transmitted.
            </p>
          </div>
          <div className="config-form">
            <label className="field">
              Material
              <select
                aria-label="Material"
                value={material}
                onChange={(e) => {
                  setMaterial(e.target.value);
                  setRequested(false);
                }}
              >
                <option>Aluminium 6061</option>
                <option>Stainless 316</option>
                <option>Titanium Grade 5</option>
              </select>
            </label>
            <label className="field">
              Surface finish
              <select
                aria-label="Surface finish"
                value={finish}
                onChange={(e) => setFinish(e.target.value)}
              >
                <option>Bead blasted</option>
                <option>As machined</option>
                <option>Polished</option>
              </select>
            </label>
            <label className="field">
              Batch quantity
              <select
                aria-label="Batch quantity"
                value={quantity}
                onChange={(e) => setQuantity(+e.target.value)}
              >
                <option value={10}>10 units</option>
                <option value={50}>50 units</option>
                <option value={100}>100 units</option>
                <option value={500}>500 units</option>
              </select>
            </label>
            <div className="quote">
              <span>Illustrative unit price</span>
              <strong>
                €{price}
                <small>/ unit</small>
              </strong>
              <span>
                Batch total €{(price * quantity).toLocaleString()} · excl.
                tooling
              </span>
            </div>
            <button
              className="btn"
              onClick={() => {
                saveSpec();
                setRequested(true);
              }}
            >
              Download specification <Download />
            </button>
            {requested && (
              <p className="status" role="status">
                Specification prepared for {quantity} units in {material}.
              </p>
            )}
          </div>
        </section>
        <section id="capabilities" className="capabilities section">
          <div className="section-title">
            <h2>
              BUILT FOR
              <br />
              THE DETAIL.
            </h2>
            <p>
              From first prototype to repeatable production. Demonstration
              capabilities for a fictional manufacturing partner.
            </p>
          </div>
          {[
            [
              "CNC milling",
              "Complex profiles. Controlled tolerances.",
              "3 + 5 axis",
            ],
            [
              "CNC turning",
              "Rotational parts, from a single setup.",
              "Ø 10–250 mm",
            ],
            [
              "Finishing",
              "The last step deserves the first thought.",
              "6 processes",
            ],
          ].map(([name, desc, meta]) => (
            <article key={name}>
              <h3>{name}</h3>
              <p>{desc}</p>
              <span>{meta}</span>
              <ArrowUpRight />
            </article>
          ))}
        </section>
        <section id="process" className="process">
          <h2>
            FROM DRAWING
            <br />
            TO DONE.
          </h2>
          <ol>
            <li>
              <strong>Specify.</strong>
              <p>
                Define the part, material and the conditions it needs to work
                in.
              </p>
            </li>
            <li>
              <strong>Refine.</strong>
              <p>Review the geometry for production before the first cut.</p>
            </li>
            <li>
              <strong>Make.</strong>
              <p>
                A considered process, documented from stock to finished part.
              </p>
            </li>
          </ol>
        </section>
      </main>
      <footer className="footer">
        <span>FORGE / Fictional manufacturing concept by Koative</span>
        <span>All tolerances, prices and capabilities are illustrative.</span>
        <a href="#">
          Back to top <ArrowUpRight />
        </a>
      </footer>
    </>
  );
}
