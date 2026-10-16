import { useState } from "react";
import { ArrowUpRight, Plus, Check } from "lucide-react";
import photo from "./assets/photo.jpg";
const materials = [
  {
    name: "Limestone",
    color: "#d5cab5",
    note: "Quiet texture. A warm, grounded foundation.",
  },
  {
    name: "Walnut",
    color: "#78563f",
    note: "Deep grain. A richer note against pale surfaces.",
  },
  {
    name: "Sage",
    color: "#858e75",
    note: "A soft green to bring the outside in.",
  },
  {
    name: "Clay",
    color: "#b77355",
    note: "Earthy warmth, held in a matte finish.",
  },
];
export default function App() {
  const [selected, setSelected] = useState(0),
    [room, setRoom] = useState("Living room"),
    [chosen, setChosen] = useState<string[]>(["Limestone"]),
    [msg, setMsg] = useState("");
  const m = materials[selected];
  return (
    <>
      <header>
        <a className="brand" href="#">
          mosaic<span>Spaces for living.</span>
        </a>
        <nav>
          <a href="#materials">Material library</a>
          <a href="#studio">The studio</a>
          <a href="#brief">
            Start a room <ArrowUpRight size={16} />
          </a>
        </nav>
      </header>
      <main>
        <section className="mosaic-hero">
          <div className="hero-type">
            <h1>
              Rooms that
              <br />
              <em>feel like you.</em>
            </h1>
            <p>
              Considered interiors.
              <br />A little unexpected. Entirely personal.
            </p>
          </div>
          <img
            src={photo}
            alt="Light-filled contemporary loft with natural materials"
          />
          <div className="hero-caption">
            <span>The everyday sanctuary</span>
            <span>Residential concept / warm minimalism</span>
          </div>
        </section>
        <section className="material-section" id="materials">
          <div>
            <h2>
              A room begins
              <br />
              with a feeling.
            </h2>
            <p>
              Not a shopping list. Explore a few materials, notice what draws
              you in, and start building a language for your space.
            </p>
          </div>
          <div className="material-workspace">
            <div
              className="material-study"
              style={{ "--material": m.color } as React.CSSProperties}
            >
              <div className="slab" />
              <span>{m.name}</span>
            </div>
            <div className="material-controls">
              <div className="swatches">
                {materials.map((x, i) => (
                  <button
                    key={x.name}
                    aria-label={x.name}
                    aria-pressed={i === selected}
                    style={{ background: x.color }}
                    onClick={() => setSelected(i)}
                  />
                ))}
              </div>
              <h3>{m.name}</h3>
              <p>{m.note}</p>
              <button
                className="material-add"
                onClick={() => {
                  setChosen(
                    chosen.includes(m.name)
                      ? chosen.filter((x) => x !== m.name)
                      : [...chosen, m.name],
                  );
                  setMsg("");
                }}
              >
                {chosen.includes(m.name) ? (
                  <Check size={17} />
                ) : (
                  <Plus size={17} />
                )}{" "}
                {chosen.includes(m.name)
                  ? "Remove from moodboard"
                  : "Add to moodboard"}
              </button>
            </div>
          </div>
        </section>
        <section id="brief" className="room-brief">
          <h2>
            Your room,
            <br />
            taking shape.
          </h2>
          <div>
            <label>
              Which space are we imagining?
              <select
                value={room}
                onChange={(e) => {
                  setRoom(e.target.value);
                  setMsg("");
                }}
              >
                {["Living room", "Bedroom", "Dining room", "Home office"].map(
                  (x) => (
                    <option key={x}>{x}</option>
                  ),
                )}
              </select>
            </label>
            <div className="moodboard">
              {chosen.length ? (
                chosen.map((x) => (
                  <span key={x}>
                    <i
                      style={{
                        background: materials.find((m) => m.name === x)?.color,
                      }}
                    />
                    {x}
                  </span>
                ))
              ) : (
                <p>Your moodboard is empty. Add a material above.</p>
              )}
            </div>
            <button
              className="action"
              disabled={!chosen.length}
              onClick={() =>
                setMsg(
                  `${room} brief saved with ${chosen.join(", ")}. This is a local demo; no inquiry was sent.`,
                )
              }
            >
              Save room brief <ArrowUpRight size={18} />
            </button>
            <p role="status" className="status">
              {msg}
            </p>
          </div>
        </section>
        <section className="studio" id="studio">
          <p className="studio-statement">
            A home is never finished.
            <br />
            It gets more <em>you.</em>
          </p>
          <div>
            <h3>Space to be yourself.</h3>
            <p>
              Mosaic is an imagined interiors practice interested in the
              relationship between objects, light, and daily life. We begin with
              how a room feels, and work toward how it works.
            </p>
            <a href="#materials">Explore the material language</a>
          </div>
        </section>
      </main>
      <footer>
        <a href="../../">Elseform collection</a>
        <p>
          Mosaic is a fictional interior studio. Imagery is inspiration; briefs
          stay local.
        </p>
      </footer>
    </>
  );
}
