import { useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Pause,
  Play,
  Plus,
  Minus,
  Globe2,
} from "lucide-react";
const missions = [
  {
    name: "Aether",
    type: "Earth observation",
    altitude: "550",
    period: "95.5",
    inclination: "97.6",
    description:
      "A clearer picture of a changing planet. Aether models a sun-synchronous observation platform for forests, coastlines, and the places we call home.",
    tag: "LOW EARTH ORBIT",
    angle: 22,
  },
  {
    name: "Lumen",
    type: "Connected everywhere",
    altitude: "1,200",
    period: "109.4",
    inclination: "53.0",
    description:
      "Connections that cross every border. Lumen explores a resilient communications network, bringing the furthest corners of our world a little closer.",
    tag: "BROADBAND CONSTELLATION",
    angle: 65,
  },
  {
    name: "Pioneer",
    type: "Beyond the familiar",
    altitude: "35,786",
    period: "1,436",
    inclination: "0.0",
    description:
      "A steady perspective from a different altitude. Pioneer imagines the next generation of geostationary science and long-duration observation.",
    tag: "GEOSTATIONARY ORBIT",
    angle: -15,
  },
];
export default function App() {
  const [selected, setSelected] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [view, setView] = useState(25);
  const [open, setOpen] = useState<number | null>(0);
  const m = missions[selected];
  return (
    <>
      <header>
        <a className="logo" href="#">
          <span className="orbit-mark" />
          orbit<span className="logo-dot">®</span>
        </a>
        <nav>
          <a href="#missions">Missions</a>
          <a href="#approach">Our approach</a>
          <a href="#questions">Perspectives</a>
        </nav>
        <a className="header-contact" href="#contact">
          Let's go further <ArrowUpRight size={16} />
        </a>
      </header>
      <main>
        <section className="hero">
          <div className="hero-copy">
            <h1>
              A new
              <br />
              perspective.
              <br />
              <span>On everything.</span>
            </h1>
            <p>
              Space brings us closer to what matters.
              <br />
              We imagine the infrastructure for a more
              <br />
              connected, more understood world.
            </p>
            <a className="text-link" href="#missions">
              Explore our missions <ArrowRight size={18} />
            </a>
          </div>
          <div
            className="universe"
            aria-label="Animated three-dimensional orbital model"
          >
            <div
              className="orbital-scene"
              style={{
                transform: `rotateX(${view}deg) rotateZ(${m.angle}deg)`,
              }}
            >
              <div className="earth">
                <div className="earth-grid" />
                <div className="earth-grid second" />
                <div className="earth-equator" />
                <div className="earth-equator second" />
              </div>
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={"orbit-ring ring-" + i}
                  style={{ animationPlayState: playing ? "running" : "paused" }}
                >
                  <span className="satellite" />
                </div>
              ))}
            </div>
            <span className="coordinate top">
              N 51°30′26″
              <br />E 00°07′39″
            </span>
            <span className="coordinate bottom">
              {m.tag}
              <br />
              CONCEPT VISUALIZATION
            </span>
            <div className="view-controls">
              <button
                aria-label={
                  playing ? "Pause orbit animation" : "Play orbit animation"
                }
                onClick={() => setPlaying(!playing)}
              >
                {playing ? <Pause size={15} /> : <Play size={15} />}
              </button>
              <label>
                ROTATE
                <input
                  aria-label="Rotate orbital view"
                  type="range"
                  min="-25"
                  max="65"
                  value={view}
                  onChange={(e) => setView(Number(e.target.value))}
                />
              </label>
            </div>
          </div>
          <div className="hero-caption">
            <span>
              <i /> SYSTEMS OF TOMORROW
            </span>
            <span>DESIGNED FOR LIFE ON EARTH</span>
            <span>SCROLL TO EXPLORE ↓</span>
          </div>
        </section>
        <section className="missions" id="missions">
          <div className="mission-heading">
            <h2>
              Three missions.
              <br />
              One shared horizon.
            </h2>
            <p>
              The possibilities above us.
              <br />
              The purpose beneath them.
            </p>
          </div>
          <div className="mission-layout">
            <div
              className="mission-list"
              role="tablist"
              aria-label="Choose a mission"
              aria-orientation="vertical"
            >
              {missions.map((item, i) => (
                <button
                  key={item.name}
                  role="tab"
                  id={"mission-" + i}
                  aria-controls="mission-details"
                  aria-selected={selected === i}
                  onClick={() => setSelected(i)}
                >
                  <span className="mission-order">0{i + 1}</span>
                  <span>
                    <strong>{item.name}</strong>
                    <small>{item.type}</small>
                  </span>
                  <ArrowUpRight size={22} />
                </button>
              ))}
            </div>
            <div
              className="mission-detail"
              id="mission-details"
              role="tabpanel"
              aria-labelledby={"mission-" + selected}
            >
              <div className="trajectory" aria-hidden="true">
                <div style={{ transform: `rotate(${m.angle}deg)` }}>
                  <span />
                </div>
                <i />
              </div>
              <h3>{m.type}</h3>
              <p>{m.description}</p>
              <div className="telemetry">
                <div>
                  <span>ALTITUDE</span>
                  <strong>
                    {m.altitude}
                    <small> km</small>
                  </strong>
                </div>
                <div>
                  <span>PERIOD</span>
                  <strong>
                    {m.period}
                    <small> min</small>
                  </strong>
                </div>
                <div>
                  <span>INCLINATION</span>
                  <strong>
                    {m.inclination}
                    <small>°</small>
                  </strong>
                </div>
              </div>
              <small className="data-note">
                Illustrative mission parameters. Not live telemetry.
              </small>
            </div>
          </div>
        </section>
        <section className="approach" id="approach">
          <Globe2 size={42} />
          <h2>
            The most interesting
            <br />
            thing about space
            <br />
            is what it does <em>for us.</em>
          </h2>
          <div className="approach-bottom">
            <span>OUR POINT OF VIEW</span>
            <p>
              We believe the next chapter of exploration should be written with
              care. Thoughtful engineering. Shared knowledge. And a relentless
              focus on making life on Earth better.
            </p>
          </div>
        </section>
        <section className="questions" id="questions">
          <h2>
            A little more
            <br />
            perspective.
          </h2>
          <div>
            {[
              {
                q: "What is Orbit?",
                a: "Orbit is a fictional aerospace studio created to demonstrate this website template. The missions, orbital parameters, and systems on this page are illustrative concepts.",
              },
              {
                q: "How does the orbital visualization work?",
                a: "The model uses native CSS 3D transforms. You can pause its motion, rotate your perspective, and switch missions to explore different orbital configurations.",
              },
              {
                q: "Can this template support a real mission?",
                a: "Yes. Replace the sample content and connect your own mission data. This static demonstration does not receive live telemetry or control any aerospace equipment.",
              },
            ].map((f, i) => (
              <article key={f.q}>
                <button
                  aria-expanded={open === i}
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  {f.q}
                  {open === i ? <Minus size={18} /> : <Plus size={18} />}
                </button>
                {open === i && <p>{f.a}</p>}
              </article>
            ))}
          </div>
        </section>
        <section className="contact" id="contact">
          <span>THE NEXT CHAPTER STARTS WITH A CONVERSATION.</span>
          <a href="mailto:hello@example.com">
            Go beyond.
            <ArrowUpRight />
          </a>
          <p>Demonstration contact: hello@example.com</p>
        </section>
      </main>
      <footer>
        <a className="logo" href="#">
          <span className="orbit-mark" />
          orbit
        </a>
        <span>A FICTIONAL AEROSPACE STUDIO · ELSEFORM TEMPLATE</span>
        <a href="../../">
          Back to the collection <ArrowUpRight size={14} />
        </a>
      </footer>
    </>
  );
}
