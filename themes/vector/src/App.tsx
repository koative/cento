import { useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  ChevronRight,
  MoveUpRight,
} from "lucide-react";
import car from "./assets/car.jpg";
const trims = [
  {
    name: "Touring",
    range: 410,
    power: 240,
    price: 68400,
    desc: "The long way home, every day.",
  },
  {
    name: "Grand Touring",
    range: 480,
    power: 320,
    price: 78900,
    desc: "More range. More room for possibility.",
  },
  {
    name: "Performance",
    range: 390,
    power: 420,
    price: 92500,
    desc: "Every corner, a conversation.",
  },
];
export default function App() {
  const [trim, setTrim] = useState(0);
  const [color, setColor] = useState("Silver");
  const [view, setView] = useState("Exterior");
  const [reserved, setReserved] = useState(false);
  const t = trims[trim];
  return (
    <>
      <a className="skip" href="#configure">
        Skip to configuration
      </a>
      <header className="nav">
        <a className="brand" href="#">
          <MoveUpRight />
          VECTOR
        </a>
        <nav>
          <a href="#vision">The idea</a>
          <a href="#configure">Configure</a>
          <a href="#details">The details</a>
        </nav>
        <span className="small">A fictional automotive study</span>
      </header>
      <main>
        <section className="drive">
          <img
            src={car}
            alt="Silver sports coupe on a mountain road, used as editorial automotive imagery"
          />
          <div className="drive-top">
            <h1>
              TAKE THE
              <br />
              LONG WAY.
            </h1>
            <p>
              V.01 / A driving concept
              <br />
              For the space between destinations.
            </p>
          </div>
          <div className="drive-bottom">
            <span>DESIGNED TO MOVE YOU.</span>
            <a href="#configure">
              Explore V.01 <ArrowRight />
            </a>
          </div>
        </section>
        <section id="vision" className="vision">
          <div>
            <span>V.01</span>
            <h2>
              LESS BETWEEN
              <br />
              YOU AND THE ROAD.
            </h2>
          </div>
          <p>
            Some journeys don't need a reason. Just a thoughtful machine, a
            clear horizon, and the freedom to keep going. Vector is a concept
            for a more connected kind of drive.
          </p>
        </section>
        <section id="configure" className="config">
          <div className="config-visual">
            <div className="view-tabs">
              {["Exterior", "Engineering"].map((x) => (
                <button
                  key={x}
                  aria-pressed={view === x}
                  onClick={() => setView(x)}
                >
                  {x}
                </button>
              ))}
            </div>
            {view === "Exterior" ? (
              <div className={"car-photo " + color.toLowerCase()}>
                <img src={car} alt="Editorial vehicle exterior reference" />
              </div>
            ) : (
              <div
                className="engineering"
                aria-label="Illustrative vehicle battery and axle geometry"
              >
                <div className="chassis">
                  <i />
                  <i />
                  <i />
                  <i />
                  <span>MODULAR ENERGY PLATFORM</span>
                </div>
                <p>Concept architecture · not a production specification</p>
              </div>
            )}
            <div className="visual-foot">
              <strong>V.01 {t.name}</strong>
              <span>{color} concept finish</span>
            </div>
            <p className="photo-note">
              Editorial photo of an existing vehicle. V.01 specifications and
              paint selections are fictional.
            </p>
          </div>
          <div className="config-options">
            <h2>
              YOUR KIND
              <br />
              OF MOMENTUM.
            </h2>
            <div className="trims">
              {trims.map((x, i) => (
                <button
                  key={x.name}
                  aria-pressed={trim === i}
                  onClick={() => {
                    setTrim(i);
                    setReserved(false);
                  }}
                >
                  <span>{x.name}</span>
                  <small>€{x.price.toLocaleString()}</small>
                  <ChevronRight />
                </button>
              ))}
            </div>
            <div className="paint">
              <span>Concept finish / {color}</span>
              <div>
                {[
                  ["Silver", "#bdc3c3"],
                  ["Graphite", "#434b50"],
                  ["Copper", "#ac7959"],
                ].map(([x, c]) => (
                  <button
                    key={x}
                    style={{ background: c }}
                    aria-label={x + " finish"}
                    aria-pressed={color === x}
                    onClick={() => {
                      setColor(x);
                      setReserved(false);
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="specs">
              <div>
                <strong>
                  {t.range}
                  <small>km</small>
                </strong>
                <span>Illustrative range</span>
              </div>
              <div>
                <strong>
                  {t.power}
                  <small>kW</small>
                </strong>
                <span>Concept power</span>
              </div>
            </div>
            <p>{t.desc}</p>
            <button className="btn" onClick={() => setReserved(true)}>
              Save this configuration <ArrowUpRight />
            </button>
            {reserved && (
              <p className="status" role="status">
                Saved: V.01 {t.name}, {color}. Your local concept is ready. No
                reservation or payment was made.
              </p>
            )}
          </div>
        </section>
        <section id="details" className="details">
          <h2>
            EVERY DETAIL.
            <br />A CLEAR PURPOSE.
          </h2>
          <div>
            <article>
              <span>FORM</span>
              <h3>Quiet by design.</h3>
              <p>
                Long lines, deliberate proportions and a cabin that leaves room
                for the journey.
              </p>
            </article>
            <article>
              <span>FEEL</span>
              <h3>A more direct connection.</h3>
              <p>
                A concept built around considered feedback, intuitive controls
                and the act of driving.
              </p>
            </article>
            <article>
              <span>FUTURE</span>
              <h3>Room to evolve.</h3>
              <p>
                Modular thinking throughout. A design study for what a personal
                vehicle could become.
              </p>
            </article>
          </div>
        </section>
      </main>
      <footer className="footer">
        <a className="brand" href="#">
          VECTOR
        </a>
        <span>
          Fictional automotive concept by Koative. All specifications and prices
          are illustrative. No affiliation with the pictured vehicle
          manufacturer.
        </span>
        <span>Keep moving.</span>
      </footer>
    </>
  );
}
