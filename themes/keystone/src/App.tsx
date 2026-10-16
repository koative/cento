import { useState } from "react";
import building from "./assets/building.jpg";
import { ArrowUpRight, ArrowRight, Download } from "lucide-react";
const systems = [
  {
    name: "Timber",
    factor: 1.1,
    depth: 18,
    description:
      "Lightweight, renewable and expressive. A conceptual glulam system for modest spans.",
    color: "#bb8256",
  },
  {
    name: "Steel",
    factor: 2.8,
    depth: 24,
    description:
      "Slender members, longer reaches. A conceptual steel frame with bolted connections.",
    color: "#627a85",
  },
  {
    name: "Concrete",
    factor: 3.5,
    depth: 20,
    description:
      "Mass, continuity and quiet strength. A conceptual reinforced concrete structure.",
    color: "#9c9b8e",
  },
];
export default function App() {
  const [system, setSystem] = useState(0);
  const [span, setSpan] = useState(6);
  const [saved, setSaved] = useState("");
  const s = systems[system];
  const depth = Math.round((span * 1000) / s.depth);
  return (
    <>
      <a className="skip" href="#main">
        Skip to structural study
      </a>
      <header>
        <a className="brand" href="#">
          KEYSTONE<span>Structures & ideas</span>
        </a>
        <nav>
          <a href="#study">Structural study</a>
          <a href="#practice">The practice</a>
        </nav>
      </header>
      <main id="main">
        <section className="cover">
          <div className="cover-title">
            <h1>
              The strength
              <br />
              of a clear idea.
            </h1>
            <p>
              Engineering that makes architecture possible. We bring a
              considered structure to ambitious places.
            </p>
            <a href="#study">
              Explore a structural concept <ArrowUpRight />
            </a>
          </div>
          <figure>
            <img
              src={building}
              alt="Glass-clad towers with repeated structural lines against an overcast sky"
            />
            <figcaption>
              Form and force, in conversation. / Illustrative project study
            </figcaption>
          </figure>
        </section>
        <section id="study" className="study">
          <div className="study-controls">
            <h2>
              Every span
              <br />
              starts somewhere.
            </h2>
            <p>
              Explore how material and span change the proportions of a
              conceptual beam.
            </p>
            <div className="systems">
              {systems.map((x, i) => (
                <button
                  key={x.name}
                  aria-pressed={system === i}
                  onClick={() => {
                    setSystem(i);
                    setSaved("");
                  }}
                >
                  {x.name}
                </button>
              ))}
            </div>
            <label>
              Clear span <strong>{span} m</strong>
              <input
                aria-label="Clear span"
                type="range"
                min="3"
                max="12"
                step="1"
                value={span}
                onChange={(e) => {
                  setSpan(+e.target.value);
                  setSaved("");
                }}
              />
            </label>
            <p className="system-description">{s.description}</p>
          </div>
          <div className="structure">
            <div className="drawing-caption">
              <span>Concept section</span>
              <span>Not for construction</span>
            </div>
            <svg
              viewBox="0 0 600 290"
              role="img"
              aria-label={`${span} metre ${s.name.toLowerCase()} beam concept`}
            >
              <defs>
                <pattern
                  id="hatch"
                  width="8"
                  height="8"
                  patternUnits="userSpaceOnUse"
                >
                  <path d="M0 8L8 0" stroke="#a8aba1" strokeWidth="1" />
                </pattern>
              </defs>
              <path d="M60 240H540" stroke="#6d756b" strokeWidth="1" />
              <rect
                x="80"
                y="155"
                width="35"
                height="85"
                fill="url(#hatch)"
                stroke="#6d756b"
              />
              <rect
                x="485"
                y="155"
                width="35"
                height="85"
                fill="url(#hatch)"
                stroke="#6d756b"
              />
              <rect
                x="65"
                y={155 - depth / 8}
                width="470"
                height={depth / 8}
                fill={s.color}
              />
              {[120, 210, 300, 390, 480].map((x) => (
                <g key={x}>
                  <path
                    d={`M${x} 40V80M${x - 5} 74L${x} 80L${x + 5} 74`}
                    stroke="#6d756b"
                    fill="none"
                  />
                </g>
              ))}
              <path d="M100 263H500M100 255V270M500 255V270" stroke="#6d756b" />
              <text
                x="300"
                y="283"
                textAnchor="middle"
                fontSize="12"
                fill="#4d5b50"
              >
                {span},000 mm clear span
              </text>
              <text
                x="300"
                y="25"
                textAnchor="middle"
                fontSize="10"
                fill="#4d5b50"
              >
                ILLUSTRATIVE DISTRIBUTED LOAD
              </text>
            </svg>
            <div className="study-output">
              <div>
                <span>Concept depth</span>
                <strong>
                  {depth}
                  <small>mm</small>
                </strong>
              </div>
              <div>
                <span>Span-to-depth assumption</span>
                <strong>1:{s.depth}</strong>
              </div>
            </div>
            <button
              className="primary"
              onClick={() =>
                setSaved(
                  `${s.name} concept saved: ${span} m span, ${depth} mm illustrative depth.`,
                )
              }
            >
              Save this study <ArrowRight />
            </button>
            <p role="status" className="status">
              {saved ||
                "An educational proportion study. No structural verification is performed."}
            </p>
          </div>
        </section>
        <section id="practice" className="practice">
          <div>
            <h2>
              Good structures
              <br />
              begin with listening.
            </h2>
            <p>
              The right solution is rarely the loudest. It is the one that makes
              the whole project work better.
            </p>
          </div>
          <div className="practice-list">
            <article>
              <span>Early thinking</span>
              <h3>Find the structural idea.</h3>
              <p>
                Explore material, geometry and load paths while the architecture
                is still open to possibility.
              </p>
            </article>
            <article>
              <span>Design development</span>
              <h3>Resolve the connections.</h3>
              <p>
                Bring the hidden details into focus. The junction is where a
                good concept becomes a workable whole.
              </p>
            </article>
          </div>
        </section>
        <div className="technical-note">
          <strong>About this model</strong>
          <p>
            Illustrative beam depth = span ÷ a simplified span-to-depth ratio.
            These ratios are fictional teaching inputs. Loads, deflection,
            stability, connections and applicable codes are not checked. This
            template is not an engineering service.
          </p>
        </div>
      </main>
      <footer>
        <span>Keystone — fictional structural engineering studio</span>
        <span>Clear thinking. Lasting form.</span>
      </footer>
    </>
  );
}
