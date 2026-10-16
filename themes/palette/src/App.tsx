import { useState } from "react";
import { ArrowUpRight, Plus, Trash2, Paintbrush } from "lucide-react";
const pigments = [
  { name: "Ultramarine", hex: "#343f9f", code: "PB29", family: "Blue" },
  { name: "Vermilion", hex: "#e85b3e", code: "PR255", family: "Red" },
  { name: "Cadmium yellow", hex: "#e8ba37", code: "PY35", family: "Yellow" },
  { name: "Viridian", hex: "#3b8674", code: "PG18", family: "Green" },
  { name: "Rose madder", hex: "#b7456c", code: "PR83", family: "Red" },
  { name: "Burnt sienna", hex: "#ae603e", code: "PBr7", family: "Earth" },
];
function ink(hex: string) {
  const rgb = [1, 3, 5]
    .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722 > 0.179
    ? "#161616"
    : "#ffffff";
}
function mix(a: string, b: string, ratio: number) {
  return (
    "#" +
    [1, 3, 5]
      .map((i) =>
        Math.round(
          parseInt(a.slice(i, i + 2), 16) * (1 - ratio) +
            parseInt(b.slice(i, i + 2), 16) * ratio,
        )
          .toString(16)
          .padStart(2, "0"),
      )
      .join("")
  );
}
export default function App() {
  const [first, setFirst] = useState(0);
  const [second, setSecond] = useState(2);
  const [ratio, setRatio] = useState(50);
  const [saved, setSaved] = useState<string[]>([]);
  const [filter, setFilter] = useState("All");
  const color = mix(pigments[first].hex, pigments[second].hex, ratio / 100);
  return (
    <>
      <header>
        <a className="brand" href="#">
          <Paintbrush size={26} />
          palette
        </a>
        <nav aria-label="Main">
          <a href="#pigments">The pigments</a>
          <a href="#mixing">Color lab</a>
          <a href="#your-palette">Your palette ({saved.length})</a>
        </nav>
      </header>
      <main>
        <section className="color-opening">
          <div className="color-title">
            <h1>
              Start with
              <br />
              <span>color.</span>
            </h1>
            <p>
              Artist materials for curious hands.
              <br />A whole world between two pigments.
            </p>
            <a href="#mixing">
              Make something unexpected <ArrowUpRight size={18} />
            </a>
          </div>
          <div
            className="specimen-wall"
            aria-label="Six pigment color specimens"
          >
            {pigments.map((p, i) => (
              <button
                type="button"
                aria-label={`Select pigment ${p.name}`}
                aria-pressed={first === i}
                onClick={() => setFirst(i)}
                key={p.name}
                style={{
                  background: p.hex,
                  color: ink(p.hex),
                  transform: `rotate(${i % 2 === 0 ? -5 : 4}deg)`,
                }}
              >
                <span>{p.code}</span>
                <div className="pigment-tones" aria-hidden="true">
                  {[0, 0.25, 0.5, 0.75].map((t) => (
                    <i
                      key={t}
                      style={{ background: mix(p.hex, "#ffffff", t) }}
                    />
                  ))}
                </div>
                <b>{p.name}</b>
                <small>
                  {first === i ? "Selected for mixing" : "Explore this pigment"}
                </small>
              </button>
            ))}
          </div>
        </section>
        <section className="pigments" id="pigments">
          <div className="pigment-heading">
            <h2>
              A language
              <br />
              without words.
            </h2>
            <div className="filters" aria-label="Pigment family">
              {["All", "Blue", "Red", "Yellow", "Green", "Earth"].map((f) => (
                <button
                  key={f}
                  aria-pressed={filter === f}
                  onClick={() => setFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="pigment-list">
            {pigments
              .filter((p) => filter === "All" || p.family === filter)
              .map((p) => (
                <article key={p.code}>
                  <span className="sample" style={{ background: p.hex }} />
                  <h3>{p.name}</h3>
                  <span>{p.code}</span>
                  <span>Artist acrylic · 60 ml</span>
                  <button
                    onClick={() =>
                      setSaved(
                        saved.includes(p.hex) ? saved : [...saved, p.hex],
                      )
                    }
                    aria-label={`Save ${p.name}`}
                  >
                    {saved.includes(p.hex) ? "Saved" : "Save color"}
                    <Plus size={16} />
                  </button>
                </article>
              ))}
          </div>
        </section>
        <section className="mixing" id="mixing">
          <div className="mix-controls">
            <h2>
              Meet in
              <br />
              the middle.
            </h2>
            <p>
              Two colors. Endless possibilities.
              <br />
              Try a digital blend and save what speaks to you.
            </p>
            <div className="color-selects">
              <label>
                First pigment
                <select
                  value={first}
                  onChange={(e) => setFirst(Number(e.target.value))}
                >
                  {pigments.map((p, i) => (
                    <option key={p.code} value={i}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Second pigment
                <select
                  value={second}
                  onChange={(e) => setSecond(Number(e.target.value))}
                >
                  {pigments.map((p, i) => (
                    <option key={p.code} value={i}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <label className="ratio">
              Mix balance{" "}
              <span>
                {100 - ratio}% / {ratio}%
              </span>
              <input
                aria-label="Mix balance"
                type="range"
                min="0"
                max="100"
                value={ratio}
                onChange={(e) => setRatio(Number(e.target.value))}
              />
            </label>
            <button
              className="save-mix"
              onClick={() =>
                setSaved(saved.includes(color) ? saved : [...saved, color])
              }
            >
              Save this mix <Plus size={19} />
            </button>
            <p className="mix-note">
              RGB screen blending is illustrative. Real paint mixes differently.
            </p>
          </div>
          <div
            className="mix-result"
            style={{ background: color, color: ink(color) }}
          >
            <span>YOUR MIX</span>
            <div className="mix-geometry" aria-hidden="true">
              <div style={{ background: pigments[first].hex }} />
              <div style={{ background: pigments[second].hex }} />
            </div>
            <output aria-label="Mixed color">{color.toUpperCase()}</output>
            <p>
              {pigments[first].name}
              <br />
              meets {pigments[second].name}
            </p>
          </div>
        </section>
        <section className="mix-ramp" aria-label="Mixing proportions">
          <div>
            <h2>Find the balance.</h2>
            <p>
              Try a proportion between {pigments[first].name.toLowerCase()} and{" "}
              {pigments[second].name.toLowerCase()}.
            </p>
          </div>
          <div className="ramp-swatches">
            {[0, 25, 50, 75, 100].map((amount) => (
              <button
                key={amount}
                aria-label={`Set mix to ${amount} percent`}
                aria-pressed={ratio === amount}
                onClick={() => setRatio(amount)}
              >
                <span
                  style={{
                    background: mix(
                      pigments[first].hex,
                      pigments[second].hex,
                      amount / 100,
                    ),
                  }}
                />
                <strong>
                  {100 - amount} / {amount}
                </strong>
              </button>
            ))}
          </div>
        </section>
        <section className="your-palette" id="your-palette">
          <div>
            <h2>Your starting point.</h2>
            <p role="status">
              {saved.length
                ? `${saved.length} ${saved.length === 1 ? "color" : "colors"} saved. A little collection of possibilities.`
                : "No colors saved yet. Pick a pigment or make your own mix."}
            </p>
          </div>
          <div className="saved-colors">
            {saved.map((c) => (
              <div key={c} style={{ background: c, color: ink(c) }}>
                <span>{c.toUpperCase()}</span>
                <button
                  aria-label={`Remove ${c}`}
                  onClick={() => setSaved(saved.filter((x) => x !== c))}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer>
        <strong>palette / FOR THE JOY OF MAKING</strong>
        <p>
          Fictional art supplies by Koative. Colors are digital examples; no
          purchases are made.
        </p>
      </footer>
    </>
  );
}
