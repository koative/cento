import { useState } from "react";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import photo from "./assets/photo.jpg";
const pieces = [
  {
    name: "The low lounge",
    era: "1970s",
    material: "Oak & woven cord",
    price: 480,
  },
  {
    name: "A good sideboard",
    era: "1960s",
    material: "Warm teak, quiet lines",
    price: 920,
  },
  {
    name: "Reading companion",
    era: "1970s",
    material: "Brushed brass floor lamp",
    price: 240,
  },
];
export default function App() {
  const [selected, setSelected] = useState(0),
    [saved, setSaved] = useState<string[]>([]),
    [view, setView] = useState("All decades");
  const p = pieces[selected];
  return (
    <>
      <header>
        <a className="brand" href="#">
          patina
        </a>
        <nav>
          <a href="#objects">Objects</a>
          <a href="#notes">A second life</a>
          <span>Shortlist {saved.length}</span>
        </nav>
      </header>
      <main>
        <section className="patina-hero">
          <img
            src={photo}
            alt="Warm modern interior with natural timber furniture and soft daylight"
          />
          <div className="title-panel">
            <h1>
              Already lived.
              <br />
              <em>Still loved.</em>
            </h1>
            <p>
              Furniture with a past.
              <br />
              Room for a future.
            </p>
            <a href="#objects">
              Meet the collection <ArrowUpRight size={18} />
            </a>
          </div>
          <span className="photo-caption">
            A room to imagine. Editorial inspiration.
          </span>
        </section>
        <section className="objects" id="objects">
          <div className="objects-intro">
            <h2>
              Good things
              <br />
              don't get old.
            </h2>
            <p>
              They settle in. A small collection of imagined vintage pieces,
              selected for form, feeling, and another lifetime of use.
            </p>
            <label>
              Browse by decade
              <select value={view} onChange={(e) => setView(e.target.value)}>
                <option>All decades</option>
                <option>1960s</option>
                <option>1970s</option>
              </select>
            </label>
          </div>
          <div>
            <div className="inventory">
              {pieces
                .filter((x) => view === "All decades" || x.era === view)
                .map((x) => (
                  <button
                    aria-pressed={selected === pieces.indexOf(x)}
                    key={x.name}
                    onClick={() => setSelected(pieces.indexOf(x))}
                  >
                    <span>{x.era}</span>
                    <h3>{x.name}</h3>
                    <ChevronRight size={20} />
                  </button>
                ))}
            </div>
            <div className="piece-detail">
              <div
                className={"chair-study object-" + selected}
                role="img"
                aria-label="Abstract furniture form study"
              >
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
              <div>
                <h3>{p.name}</h3>
                <p>
                  {p.material}
                  <br />
                  An illustrative vintage selection.
                </p>
                <strong>£{p.price}</strong>
                <button
                  className="action"
                  onClick={() =>
                    setSaved(
                      saved.includes(p.name)
                        ? saved.filter((x) => x !== p.name)
                        : [...saved, p.name],
                    )
                  }
                >
                  {saved.includes(p.name)
                    ? "Remove from shortlist"
                    : "Add to shortlist"}
                </button>
                <p className="status" role="status">
                  {saved.includes(p.name)
                    ? p.name + " is in your local shortlist."
                    : ""}
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="care" id="notes">
          <span className="care-word">Keep.</span>
          <div>
            <h2>
              Character is
              <br />
              worth keeping.
            </h2>
            <p>
              A softened edge. A deepened color. The mark of a favorite book. We
              like objects that show their time without losing their purpose.
            </p>
            <details>
              <summary>Living with older furniture</summary>
              <p>
                Use gentle cleaning, protect timber from standing water, and ask
                a qualified restorer before making structural repairs. Every
                object has its own needs.
              </p>
            </details>
            <details>
              <summary>About the collection</summary>
              <p>
                This is a fictional shop. Photographs show interior inspiration;
                the illustrated objects and prices are examples, not actual
                inventory.
              </p>
            </details>
          </div>
        </section>
      </main>
      <footer>
        <a href="../../">Elseform collection</a>
        <p>
          Patina is a fictional vintage furniture concept. Shortlists stay in
          this page.
        </p>
      </footer>
    </>
  );
}
