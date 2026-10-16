import { useState } from "react";
import { Wrench, ArrowRight, Check, Plus, Minus } from "lucide-react";
const jobs = [
  {
    name: "Oil & filter",
    price: 95,
    time: 45,
    description: "Fresh oil, new filter, a clean start.",
  },
  {
    name: "Chain service",
    price: 55,
    time: 30,
    description: "Clean, lubricate and adjust final drive.",
  },
  {
    name: "Brake inspection",
    price: 40,
    time: 30,
    description: "Pads, discs and hydraulic system check.",
  },
  {
    name: "Tyre fitting",
    price: 75,
    time: 60,
    description: "Fit and balance. Tyres quoted separately.",
  },
];
export default function App() {
  const [selected, setSelected] = useState<string[]>(["Oil & filter"]);
  const [bike, setBike] = useState("Roadster");
  const [saved, setSaved] = useState("");
  const chosen = jobs.filter((x) => selected.includes(x.name));
  const total = chosen.reduce((s, x) => s + x.price, 0);
  const minutes = chosen.reduce((s, x) => s + x.time, 0);
  return (
    <>
      <a className="skip" href="#main">
        Skip to workshop
      </a>
      <header>
        <a className="brand" href="#">
          <Wrench />
          TORQUE
        </a>
        <nav>
          <a href="#service">Build a service</a>
          <a href="#workshop">The workshop</a>
        </nav>
        <span>Independent motorcycle care</span>
      </header>
      <main id="main">
        <section className="workshop-hero">
          <div className="hero-copy">
            <h1>
              Built to ride.
              <br />
              Kept that way.
            </h1>
            <p>
              Proper attention for the machine that moves you. An independent
              workshop for everyday riders and long-way-home people.
            </p>
            <a href="#service" className="primary">
              Build your service <ArrowRight />
            </a>
          </div>
          <div className="wheel-study">
            <div className="wheel">
              <div className="rim">
                {Array.from({ length: 12 }, (_, i) => (
                  <i key={i} style={{ transform: `rotate(${i * 30}deg)` }} />
                ))}
              </div>
              <div className="hub" />
            </div>
            <div className="caliper">TQ</div>
            <span className="wheel-label">
              Precision is a practice.
              <br />
              Not a promise on a wall.
            </span>
            <span className="wheel-measure">Ø 17″ / wheel assembly study</span>
          </div>
        </section>
        <section id="service" className="service">
          <div className="service-heading">
            <h2>
              What does
              <br />
              your ride need?
            </h2>
            <p>
              Put together a service estimate.
              <br />
              No booking. No surprises.
            </p>
            <label>
              Motorcycle type
              <select
                value={bike}
                onChange={(e) => {
                  setBike(e.target.value);
                  setSaved("");
                }}
              >
                <option>Roadster</option>
                <option>Adventure</option>
                <option>Classic</option>
              </select>
            </label>
          </div>
          <div className="job-list">
            {jobs.map((j) => (
              <button
                key={j.name}
                aria-pressed={selected.includes(j.name)}
                onClick={() => {
                  setSelected(
                    selected.includes(j.name)
                      ? selected.filter((x) => x !== j.name)
                      : [...selected, j.name],
                  );
                  setSaved("");
                }}
              >
                <span className="job-check">
                  {selected.includes(j.name) ? <Check /> : <Plus />}
                </span>
                <span>
                  <strong>{j.name}</strong>
                  <small>{j.description}</small>
                </span>
                <span className="job-price">€{j.price}</span>
              </button>
            ))}
          </div>
          <aside className="estimate">
            <span>Your workshop estimate</span>
            <strong>€{total}</strong>
            <p>{minutes} minutes of workshop time</p>
            <div>
              {chosen.map((x) => (
                <span key={x.name}>
                  {x.name}
                  <b>€{x.price}</b>
                </span>
              ))}
              {!chosen.length && (
                <p>Select at least one service to build an estimate.</p>
              )}
            </div>
            <button
              className="primary"
              disabled={!chosen.length}
              onClick={() =>
                setSaved(
                  `${bike} service saved: ${chosen.length} tasks, €${total}, ${minutes} minutes.`,
                )
              }
            >
              Save service plan <ArrowRight />
            </button>
            <p role="status" className="status">
              {saved ||
                "Illustrative pricing. Parts and repair work may differ."}
            </p>
          </aside>
        </section>
        <section className="workshop" id="workshop">
          <div>
            <span>Good work is in the details.</span>
            <h2>
              Hands-on care.
              <br />
              Straight answers.
            </h2>
          </div>
          <div>
            <h3>Before the first bolt.</h3>
            <p>
              Start with the rider. Understand the machine. Agree on the work
              before it begins. This is our fictional workshop philosophy — and
              a useful starting point for yours.
            </p>
            <div className="hours">
              <span>
                Tuesday–Friday <b>09:00–18:00</b>
              </span>
              <span>
                Saturday <b>09:00–14:00</b>
              </span>
              <span>
                Sunday–Monday <b>Out riding</b>
              </span>
            </div>
          </div>
        </section>
      </main>
      <footer>
        <span>Torque — fictional motorcycle workshop</span>
        <span>Take the long way home.</span>
      </footer>
    </>
  );
}
