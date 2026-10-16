import { useState } from "react";
import mountain from "./assets/mountain.jpg";
import { ArrowDown, ArrowUpRight } from "lucide-react";
const layers = [
  {
    name: "Limestone",
    age: "145–66 Ma",
    depth: "0–80 m",
    color: "#e6d4b7",
    text: "A pale marine shelf. Fine grains and shell fragments record a shallow sea that once covered this landscape.",
    sample: "ST-014 / Carbonate",
  },
  {
    name: "Sandstone",
    age: "201–145 Ma",
    depth: "80–210 m",
    color: "#c18560",
    text: "Cross-bedded sand reveals the direction of ancient currents. Iron oxides give this horizon its warm ochre colour.",
    sample: "ST-022 / Clastic",
  },
  {
    name: "Shale",
    age: "252–201 Ma",
    depth: "210–360 m",
    color: "#6f7677",
    text: "Thin laminations preserve a quiet basin. This fine-grained layer forms a natural boundary between aquifers.",
    sample: "ST-031 / Mudstone",
  },
];
export default function App() {
  const [layer, setLayer] = useState(0);
  const [saved, setSaved] = useState<string[]>([]);
  const item = layers[layer];
  return (
    <>
      <a className="skip" href="#main">
        Skip to field atlas
      </a>
      <header>
        <a className="brand" href="#">
          strata<span>Field atlas</span>
        </a>
        <nav>
          <a href="#section">Cross-section</a>
          <a href="#notes">Field notes</a>
          <span>Volume 04</span>
        </nav>
      </header>
      <main id="main">
        <section className="atlas-cover">
          <div className="cover-text">
            <h1>
              Time has
              <br />a texture.
            </h1>
            <p>
              A field atlas of the ground beneath us.
              <br />
              Look closer. Go deeper.
            </p>
            <a href="#section" className="explore">
              Explore the section <ArrowDown />
            </a>
            <span className="coordinate">
              46°32′ N / 10°27′ E<br />
              Illustrative alpine transect
            </span>
          </div>
          <figure>
            <img
              src={mountain}
              alt="Jagged alpine mountain faces revealing bands of exposed rock"
            />
            <figcaption>
              Rock holds the long view. / Alpine study, fictional location.
            </figcaption>
          </figure>
        </section>
        <section id="section" className="cross-section">
          <div className="section-heading">
            <h2>Read the ground.</h2>
            <p>Select a horizon in the geological column.</p>
          </div>
          <div className="study">
            <div className="column" aria-label="Geological horizons">
              {layers.map((x, i) => (
                <button
                  key={x.name}
                  className={"layer " + (i === layer ? "active" : "")}
                  style={{ background: x.color }}
                  onClick={() => setLayer(i)}
                  aria-pressed={i === layer}
                >
                  <span>{x.name}</span>
                  <small>{x.depth}</small>
                  <i />
                </button>
              ))}
            </div>
            <article className="layer-detail">
              <div className="detail-heading">
                <h3>{item.name}</h3>
                <span>{item.age}</span>
              </div>
              <p>{item.text}</p>
              <dl>
                <div>
                  <dt>Sample reference</dt>
                  <dd>{item.sample}</dd>
                </div>
                <div>
                  <dt>Mapped depth</dt>
                  <dd>{item.depth}</dd>
                </div>
                <div>
                  <dt>Record type</dt>
                  <dd>Concept field observation</dd>
                </div>
              </dl>
              <button
                className="primary"
                onClick={() =>
                  setSaved(
                    saved.includes(item.name)
                      ? saved.filter((x) => x !== item.name)
                      : [...saved, item.name],
                  )
                }
              >
                {saved.includes(item.name)
                  ? "Remove field note"
                  : "Save field note"}
                <ArrowUpRight />
              </button>
              <p className="status" role="status">
                {saved.length} horizon{saved.length === 1 ? "" : "s"} in your
                field notebook.
              </p>
            </article>
          </div>
        </section>
        <section id="notes" className="notes">
          <h2>From the notebook.</h2>
          <article>
            <span>Observation / 06</span>
            <h3>The sea, at altitude.</h3>
            <p>
              A fragment of shell embedded in limestone changes how we see a
              mountain. The present surface is only the latest chapter.
            </p>
          </article>
          <article>
            <span>Method / 11</span>
            <h3>Measure twice. Map once.</h3>
            <p>
              Strike and dip give an orientation to every visible bed. A useful
              survey records uncertainty alongside measurement.
            </p>
          </article>
        </section>
      </main>
      <footer>
        <span>Strata — fictional geological atlas · Not survey data</span>
        <span>Collected slowly. Read deeply.</span>
      </footer>
    </>
  );
}
