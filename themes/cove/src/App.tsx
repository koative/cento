import { useState } from "react";
import { ArrowUpRight, Anchor, Wind, Compass } from "lucide-react";
import coast from "./assets/coast.jpg";
import ocean from "./assets/ocean.jpg";
const routes = [
  {
    name: "The quiet islands",
    days: 5,
    ports: ["Milos", "Kimolos", "Polyaigos"],
    text: "Volcanic coastlines, empty anchorages and an unhurried rhythm. Our most sheltered route for first-time sailors.",
    price: 1850,
  },
  {
    name: "Across the Cyclades",
    days: 7,
    ports: ["Paros", "Naxos", "Koufonisia"],
    text: "A proper island-hopping week. Whitewashed villages, long lunches ashore and open-water passages between them.",
    price: 2450,
  },
  {
    name: "The blue escape",
    days: 3,
    ports: ["Hydra", "Dokos", "Spetses"],
    text: "A long weekend with room to breathe. Car-free harbours and pine-scented coves, a short sail from the mainland.",
    price: 1250,
  },
];
export default function App() {
  const [route, setRoute] = useState(0),
    [crew, setCrew] = useState(2),
    [planned, setPlanned] = useState(false);
  const r = routes[route];
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header>
        <a className="brand" href="#">
          <Anchor size={27} strokeWidth={1.5} />
          cove
        </a>
        <nav>
          <a href="#voyages">The voyages</a>
          <a href="#aboard">Life aboard</a>
          <a href="#voyages">
            Set a course <ArrowUpRight size={16} />
          </a>
        </nav>
      </header>
      <main id="main">
        <section className="opening">
          <div className="hero-type">
            <h1>
              Meet me
              <br />
              <em>at the water.</em>
            </h1>
            <div>
              <p>
                Small sailing journeys.
                <br />
                Big blue possibilities.
              </p>
              <a href="#voyages">
                Find your voyage <ArrowUpRight size={20} />
              </a>
            </div>
          </div>
          <div className="sea-window">
            <img
              src={coast}
              alt="Turquoise Mediterranean water meeting a sunlit island coast"
            />
            <div className="sea-caption">
              <span>THE AEGEAN, AT YOUR PACE</span>
              <span>37.4467° N / 25.3289° E</span>
            </div>
            <div className="compass-seal">
              <Compass size={65} strokeWidth={0.8} />
              <span>FOLLOW THE BLUE</span>
            </div>
          </div>
        </section>
        <section className="route-section" id="voyages">
          <div className="route-heading">
            <h2>
              A course of
              <br />
              your own.
            </h2>
            <p>
              No crowded decks. No whistle-stop itineraries.
              <br />
              Just your people, a good skipper and the sea.
            </p>
          </div>
          <div className="route-workspace">
            <div className="route-selector">
              {routes.map((v, i) => (
                <button
                  aria-pressed={route === i}
                  onClick={() => {
                    setRoute(i);
                    setPlanned(false);
                  }}
                  key={v.name}
                >
                  <span>
                    {v.name}
                    <small>{v.days} days under sail</small>
                  </span>
                  <ArrowUpRight size={20} />
                </button>
              ))}
            </div>
            <div className="chart" aria-label={`${r.name} sailing route`}>
              <span className="chart-label">YOUR ISLAND CHAPTERS</span>
              <div className="islands">
                {r.ports.map((port, i) => (
                  <div className={"island i" + i} key={port}>
                    <i />
                    <strong>{port}</strong>
                    <span>
                      {i === 0
                        ? "Board here"
                        : i === 2
                          ? "Stay a little"
                          : "Drop anchor"}
                    </span>
                  </div>
                ))}
              </div>
              <span className="chart-scale">20 NAUTICAL MILES ━━━</span>
              <Wind className="wind" size={35} strokeWidth={1} />
            </div>
            <div className="route-info" aria-live="polite">
              <h3>{r.name}</h3>
              <p>{r.text}</p>
              <label>
                Your crew
                <select
                  value={crew}
                  onChange={(e) => {
                    setCrew(Number(e.target.value));
                    setPlanned(false);
                  }}
                >
                  {[2, 4, 6].map((n) => (
                    <option key={n} value={n}>
                      {n} guests
                    </option>
                  ))}
                </select>
              </label>
              <div className="price">
                <strong>€{r.price}</strong>
                <span>per person · {r.days} days</span>
              </div>
              <button className="plan" onClick={() => setPlanned(true)}>
                {planned ? "Voyage saved" : "Build my voyage"}
                <ArrowUpRight size={17} />
              </button>
              <p className="note">
                {planned
                  ? `${r.days} days for ${crew} guests. Illustrative total €${r.price * crew}.`
                  : "Sample voyage only. No booking or payment."}
              </p>
            </div>
          </div>
        </section>
        <section className="aboard" id="aboard">
          <img src={ocean} alt="Sunlight across the open sea" />
          <div>
            <h2>
              The best plans
              <br />
              <em>have a little drift.</em>
            </h2>
            <p>
              Swim before breakfast. Read the same page twice. Follow a local
              recommendation to a table by the harbour. Our kind of sailing is
              about everything that happens along the way.
            </p>
            <div>
              <span>Private, skippered sailing</span>
              <span>Up to six guests</span>
              <span>Space to change your mind</span>
            </div>
          </div>
        </section>
      </main>
      <footer>
        <a href="#" className="brand">
          cove
        </a>
        <p>
          Fictional sailing company · Illustrative routes and prices · Koative
        </p>
        <a href="#voyages">Your next horizon ↗</a>
      </footer>
    </>
  );
}
