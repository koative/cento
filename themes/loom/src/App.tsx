import { useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Check,
  Plus,
  Minus,
  SlidersHorizontal,
} from "lucide-react";
const fabrics = [
  {
    name: "Felted wool",
    code: "LW–108",
    category: "Wool",
    color: "#b5a28b",
    texture: "wool",
    weight: "420",
    origin: "Northern Italy",
    desc: "Warm, substantial and softly structured. A quiet foundation for upholstery and considered interiors.",
  },
  {
    name: "Natural linen",
    code: "LN–204",
    category: "Linen",
    color: "#d9ceb5",
    texture: "linen",
    weight: "280",
    origin: "Belgium",
    desc: "An open weave with an easy, lived-in character. Light catches every small irregularity.",
  },
  {
    name: "Moss bouclé",
    code: "BC–032",
    category: "Wool",
    color: "#7f8567",
    texture: "boucle",
    weight: "540",
    origin: "Portugal",
    desc: "Dimensional loops bring movement to a grounded green. Made for spaces that invite you to stay.",
  },
  {
    name: "Clay canvas",
    code: "CT–091",
    category: "Cotton",
    color: "#b77f68",
    texture: "canvas",
    weight: "360",
    origin: "Turkey",
    desc: "A tightly woven cotton with a dry hand and architectural structure. Quiet strength, in warm earth.",
  },
  {
    name: "Midnight twill",
    code: "TW–310",
    category: "Cotton",
    color: "#414c52",
    texture: "twill",
    weight: "310",
    origin: "Japan",
    desc: "A clean diagonal weave with a subtle surface. Deep, versatile and precise.",
  },
  {
    name: "Oat mélange",
    code: "ML–084",
    category: "Wool",
    color: "#c6baa2",
    texture: "wool",
    weight: "390",
    origin: "Scotland",
    desc: "A soft blend of warm neutrals. The beauty is in the small variations, visible up close.",
  },
];
export default function App() {
  const [filter, setFilter] = useState("All materials");
  const [active, setActive] = useState(0);
  const [samples, setSamples] = useState<string[]>([]);
  const [sent, setSent] = useState(false);
  const f = fabrics[active];
  return (
    <>
      <a className="skip" href="#library">
        Skip to material library
      </a>
      <header className="nav">
        <a className="brand" href="#">
          loom<span>Material matters.</span>
        </a>
        <nav>
          <a href="#library">The library</a>
          <a href="#sample-box">Your sample box ({samples.length})</a>
        </nav>
      </header>
      <main>
        <section className="loom-heading">
          <h1>
            Start with
            <br />
            <em>the feeling.</em>
          </h1>
          <div>
            <p>
              A material library for spaces with soul. Explore texture, find
              your palette, and make something worth touching.
            </p>
            <span className="demo">
              Fictional textile collection / Digital material studies
            </span>
          </div>
        </section>
        <section id="library" className="library">
          <div className="library-toolbar">
            <span>
              <SlidersHorizontal size={16} /> Explore materials
            </span>
            <div className="tabs">
              {["All materials", "Wool", "Linen", "Cotton"].map((x) => (
                <button
                  key={x}
                  aria-pressed={filter === x}
                  onClick={() => setFilter(x)}
                >
                  {x}
                </button>
              ))}
            </div>
            <span>
              {
                fabrics.filter(
                  (x) => filter === "All materials" || x.category === filter,
                ).length
              }{" "}
              swatches
            </span>
          </div>
          <div className="material-workspace">
            <div className="materials">
              {fabrics.map((x, i) =>
                filter === "All materials" || x.category === filter ? (
                  <button
                    className={"material " + (active === i ? "selected" : "")}
                    key={x.code}
                    onClick={() => setActive(i)}
                    aria-pressed={active === i}
                  >
                    <span
                      className={"swatch " + x.texture}
                      style={{ "--fabric": x.color } as React.CSSProperties}
                    >
                      <span className="sample-tag">
                        {x.code}
                        <br />
                        {x.category.toUpperCase()}
                      </span>
                      {samples.includes(x.code) && (
                        <span className="in-box">
                          <Check size={16} />
                        </span>
                      )}
                    </span>
                    <span className="material-caption">
                      <strong>{x.name}</strong>
                      <ArrowUpRight />
                    </span>
                  </button>
                ) : null,
              )}
            </div>
            <section className="material-story" aria-label="Selected material">
              <div
                className={"large-swatch " + f.texture}
                style={{ "--fabric": f.color } as React.CSSProperties}
              >
                <span>
                  {f.code}
                  <br />
                  <em>{f.name}</em>
                </span>
              </div>
              <article>
                <span className="material-code">{f.code} / MATERIAL STUDY</span>
                <h2>{f.name}</h2>
                <p>{f.desc}</p>
                <dl>
                  <div>
                    <dt>Composition family</dt>
                    <dd>{f.category}</dd>
                  </div>
                  <div>
                    <dt>Illustrative weight</dt>
                    <dd>{f.weight} g/m²</dd>
                  </div>
                  <div>
                    <dt>Concept origin</dt>
                    <dd>{f.origin}</dd>
                  </div>
                </dl>
                <button
                  className="btn"
                  onClick={() => {
                    setSamples(
                      samples.includes(f.code)
                        ? samples.filter((s) => s !== f.code)
                        : [...samples, f.code],
                    );
                    setSent(false);
                  }}
                >
                  {samples.includes(f.code)
                    ? "Remove from sample box"
                    : "Add to sample box"}
                  {samples.includes(f.code) ? <Minus /> : <Plus />}
                </button>
                <p className="demo">
                  Textures are procedural digital studies, not product
                  photographs. Specifications are fictional.
                </p>
              </article>
            </section>
          </div>
        </section>
        <section id="sample-box" className="sample-section">
          <div>
            <h2>
              A small box.
              <br />A world of possibility.
            </h2>
            <p>Build a collection of textures to consider together.</p>
          </div>
          <div className="sample-box">
            <h3>
              Your sample box <span>{samples.length} / 6</span>
            </h3>
            {samples.length ? (
              <>
                <div className="chosen-samples">
                  {fabrics
                    .filter((f) => samples.includes(f.code))
                    .map((f) => (
                      <div key={f.code}>
                        <span
                          className={"mini-swatch " + f.texture}
                          style={{ "--fabric": f.color } as React.CSSProperties}
                        />
                        <span>
                          {f.name}
                          <small>{f.code}</small>
                        </span>
                        <button
                          aria-label={"Remove " + f.name}
                          onClick={() => {
                            setSamples(samples.filter((s) => s !== f.code));
                            setSent(false);
                          }}
                        >
                          <Minus />
                        </button>
                      </div>
                    ))}
                </div>
                <button className="btn" onClick={() => setSent(true)}>
                  Prepare sample request <ArrowRight />
                </button>
                {sent && (
                  <p className="status" role="status">
                    Your {samples.length}-material sample request is ready in
                    this demo. Nothing has been ordered or sent.
                  </p>
                )}
              </>
            ) : (
              <p className="empty">
                Your box is waiting. Select a material above and add your first
                swatch.
              </p>
            )}
          </div>
        </section>
      </main>
      <footer className="footer">
        <a className="brand" href="#">
          loom
        </a>
        <span>
          Fictional textile library by Koative. All materials, origins and
          specifications are illustrative.
        </span>
        <span>Made to be felt.</span>
      </footer>
    </>
  );
}
