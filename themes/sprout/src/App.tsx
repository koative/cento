import { useState } from "react";
import { ArrowUpRight, Sun, CloudSun, Check, Plus } from "lucide-react";
import photo from "./assets/photo.jpg";
const plants = [
  {
    name: "Lavender",
    light: "Sunny",
    habit: "Aromatic, drought-tolerant once established",
    price: 8,
  },
  {
    name: "Fern",
    light: "Shady",
    habit: "Soft fronds for a sheltered corner",
    price: 12,
  },
  {
    name: "Rosemary",
    light: "Sunny",
    habit: "An evergreen herb for a generous pot",
    price: 7,
  },
  {
    name: "Hosta",
    light: "Shady",
    habit: "Broad, beautiful leaves in cool shade",
    price: 10,
  },
];
export default function App() {
  const [light, setLight] = useState("Sunny"),
    [picked, setPicked] = useState<string[]>([]),
    [space, setSpace] = useState("Balcony"),
    [msg, setMsg] = useState("");
  return (
    <>
      <header>
        <a className="brand" href="#">
          sprout<span>Room to grow.</span>
        </a>
        <nav>
          <a href="#plantfinder">Find your plants</a>
          <a href="#garden">My little garden ({picked.length})</a>
        </nav>
      </header>
      <main>
        <section className="sprout-opening">
          <div>
            <h1>
              Good things
              <br />
              start small.
            </h1>
            <p>
              A pot on a windowsill.
              <br />A little patch of possibility.
              <br />
              Let's grow something.
            </p>
            <a className="action" href="#plantfinder">
              Find what fits <ArrowUpRight size={18} />
            </a>
          </div>
          <img
            src={photo}
            alt="A hand trowel, potting soil and a small ceramic plant pot"
          />
          <div className="garden-caption">
            <span>Your corner of green.</span>
            <strong>
              Big garden energy.
              <br />
              Any size space.
            </strong>
          </div>
        </section>
        <section className="plant-finder" id="plantfinder">
          <div className="finder-heading">
            <h2>
              Happy plants.
              <br />
              Right place.
            </h2>
            <p>
              Start with the light you have. These general examples help you
              imagine a planting plan; your local climate still matters.
            </p>
            <div className="light-options">
              {["Sunny", "Shady"].map((x) => (
                <button
                  key={x}
                  aria-pressed={light === x}
                  onClick={() => setLight(x)}
                >
                  {x === "Sunny" ? <Sun size={23} /> : <CloudSun size={23} />}
                  <span>
                    {x}
                    <small>
                      {x === "Sunny"
                        ? "A bright, open spot"
                        : "A softer, sheltered spot"}
                    </small>
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div className="plant-list">
            {plants
              .filter((p) => p.light === light)
              .map((p, i) => (
                <article key={p.name}>
                  <div
                    className={"plant-graphic plant-" + p.name.toLowerCase()}
                    role="img"
                    aria-label={
                      "Abstract botanical form representing " + p.name
                    }
                  >
                    <i />
                    <i />
                    <i />
                    <i />
                    <b />
                  </div>
                  <div>
                    <h3>{p.name}</h3>
                    <p>{p.habit}</p>
                    <div className="row">
                      <span>£{p.price}</span>
                      <button
                        aria-label={
                          (picked.includes(p.name) ? "Remove " : "Add ") +
                          p.name
                        }
                        aria-pressed={picked.includes(p.name)}
                        onClick={() => {
                          setPicked(
                            picked.includes(p.name)
                              ? picked.filter((x) => x !== p.name)
                              : [...picked, p.name],
                          );
                          setMsg("");
                        }}
                      >
                        {picked.includes(p.name) ? (
                          <Check size={18} />
                        ) : (
                          <Plus size={18} />
                        )}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
          </div>
        </section>
        <section id="garden" className="garden-plan">
          <div>
            <h2>
              A little plan.
              <br />A lot of possibility.
            </h2>
            <label>
              My growing space
              <select
                value={space}
                onChange={(e) => {
                  setSpace(e.target.value);
                  setMsg("");
                }}
              >
                {["Balcony", "Patio", "Garden border", "Window box"].map(
                  (x) => (
                    <option key={x}>{x}</option>
                  ),
                )}
              </select>
            </label>
          </div>
          <div>
            <div className="garden-bed">
              {picked.length ? (
                picked.map((x) => (
                  <div key={x}>
                    <span>{x.slice(0, 1)}</span>
                    <b>{x}</b>
                    <button
                      aria-label={"Remove " + x + " from plan"}
                      onClick={() => {
                        setPicked(picked.filter((p) => p !== x));
                        setMsg("");
                      }}
                    >
                      Remove
                    </button>
                  </div>
                ))
              ) : (
                <p>
                  Your garden starts here.
                  <br />
                  Add a plant from the finder above.
                </p>
              )}
            </div>
            <button
              className="action"
              disabled={!picked.length}
              onClick={() =>
                setMsg(
                  `${space} plan saved with ${picked.join(", ")}. No plants were ordered.`,
                )
              }
            >
              Save my growing plan <ArrowUpRight size={18} />
            </button>
            <p role="status" className="status">
              {msg}
            </p>
          </div>
        </section>
        <section className="growing-notes">
          <h2>Grow at your own pace.</h2>
          <div>
            <details open>
              <summary>Get to know your light.</summary>
              <p>
                Watch how sunlight moves through your space during the day.
                Match plants to the conditions you actually have.
              </p>
            </details>
            <details>
              <summary>Give roots a good home.</summary>
              <p>
                Choose containers with drainage and a growing medium suited to
                the plant. Ask a local nursery for advice specific to your
                conditions.
              </p>
            </details>
            <details>
              <summary>Leave room for change.</summary>
              <p>
                Plants grow, seasons shift, and a garden is always becoming.
                Start small and notice what works.
              </p>
            </details>
          </div>
        </section>
      </main>
      <footer>
        <a href="../../">Elseform collection</a>
        <p>
          Sprout is a fictional nursery. Plant suggestions and prices are
          illustrative.
        </p>
      </footer>
    </>
  );
}
