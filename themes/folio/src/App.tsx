import { useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
const editions = [
  {
    name: "An exercise in balance",
    artist: "Mara Ellis",
    color: "#d94d31",
    type: "Screenprint",
    price: 75,
    form: "balance",
  },
  {
    name: "Blue hour, no. 4",
    artist: "Theo Park",
    color: "#314daf",
    type: "Risograph",
    price: 40,
    form: "blue",
  },
  {
    name: "The space between",
    artist: "Ada Reed",
    color: "#d2b349",
    type: "Screenprint",
    price: 65,
    form: "space",
  },
  {
    name: "Soft machinery",
    artist: "Noa Finch",
    color: "#78875a",
    type: "Risograph",
    price: 35,
    form: "soft",
  },
];
export default function App() {
  const [filter, setFilter] = useState("All editions"),
    [selected, setSelected] = useState(0),
    [saved, setSaved] = useState<string[]>([]);
  let work = editions[selected];
  return (
    <>
      <header>
        <a className="brand" href="#">
          folio<span>Independent print room</span>
        </a>
        <nav>
          <a href="#editions">Editions</a>
          <a href="#process">The process</a>
          <span>Saved {saved.length}</span>
        </nav>
      </header>
      <main>
        <section className="folio-intro">
          <h1>
            Ink. Paper.
            <br />
            <em>Possibility.</em>
          </h1>
          <p>
            Original ideas, in small editions.
            <br />A home for printmakers and the
            <br />
            walls that are waiting for them.
          </p>
          <a href="#editions" aria-label="Explore editions">
            <ArrowRight size={36} />
          </a>
        </section>
        <section className="featured">
          <div
            className={"artwork " + work.form}
            style={{ "--art": work.color } as React.CSSProperties}
            role="img"
            aria-label={work.name + ", an original geometric print"}
          >
            <i />
            <i />
            <i />
            <i />
          </div>
          <aside>
            <h2>{work.name}</h2>
            <p>
              {work.artist}
              <br />
              {work.type} on uncoated paper
              <br />
              Imagined edition of 50
            </p>
            <div className="row">
              <strong>£{work.price}</strong>
              <span>30 × 40 cm</span>
            </div>
            <button
              className="action"
              onClick={() =>
                setSaved(
                  saved.includes(work.name)
                    ? saved.filter((x) => x !== work.name)
                    : [...saved, work.name],
                )
              }
            >
              {saved.includes(work.name)
                ? "Remove from saved"
                : "Save this edition"}
              <ArrowUpRight size={17} />
            </button>
            <p role="status" className="status">
              {saved.includes(work.name)
                ? "Edition saved to your local shortlist."
                : ""}
            </p>
            <div className="edition-nav">
              {editions.map((p, i) => (
                <button
                  key={p.name}
                  aria-label={"View " + p.name}
                  aria-pressed={selected === i}
                  onClick={() => setSelected(i)}
                >
                  {String(i + 1).padStart(2, "0")}
                </button>
              ))}
            </div>
          </aside>
        </section>
        <section id="editions" className="editions">
          <div className="row">
            <h2>The print drawer.</h2>
            <div className="tabs">
              {["All editions", "Screenprint", "Risograph"].map((x) => (
                <button
                  key={x}
                  aria-pressed={filter === x}
                  onClick={() => setFilter(x)}
                >
                  {x}
                </button>
              ))}
            </div>
          </div>
          <div className="edition-grid">
            {editions
              .filter((x) => filter === "All editions" || x.type === filter)
              .map((p) => (
                <button
                  className="edition"
                  key={p.name}
                  onClick={() => {
                    setSelected(editions.indexOf(p));
                    document
                      .querySelector(".featured")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <div
                    className={"mini artwork " + p.form}
                    style={{ "--art": p.color } as React.CSSProperties}
                  >
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>
                  <h3>{p.name}</h3>
                  <span>
                    {p.artist} · {p.type}
                  </span>
                  <b>£{p.price}</b>
                </button>
              ))}
          </div>
        </section>
        <section id="process" className="process">
          <h2>
            Made slowly.
            <br />
            Looked at forever.
          </h2>
          <div>
            <p>
              A print is an encounter between a hand, a surface, and a little
              unpredictability. Every layer changes what came before it.
            </p>
            <p>
              These original code-drawn compositions explore that spirit. A
              fictional collection, built for real curiosity.
            </p>
            <a href="#editions">
              Find your point of view <ArrowUpRight size={16} />
            </a>
          </div>
        </section>
      </main>
      <footer>
        <a href="../../">Elseform collection</a>
        <p>
          Folio is a fictional print gallery. Artwork is original CSS geometry;
          no sales are processed.
        </p>
      </footer>
    </>
  );
}
