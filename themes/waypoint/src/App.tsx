import { useState } from "react";
import { Plane, ArrowRight, Wind, Compass } from "lucide-react";
const routes = [
  {
    name: "Coastal circuit",
    from: "Shorefield",
    to: "North Head",
    nm: 42,
    heading: 65,
    lesson: "Navigation fundamentals",
  },
  {
    name: "Valley crossing",
    from: "Shorefield",
    to: "Riverbend",
    nm: 68,
    heading: 120,
    lesson: "Terrain and route planning",
  },
  {
    name: "Island approach",
    from: "Shorefield",
    to: "West Isle",
    nm: 95,
    heading: 280,
    lesson: "Over-water awareness",
  },
];
export default function App() {
  const [route, setRoute] = useState(0);
  const [speed, setSpeed] = useState(100);
  const [plan, setPlan] = useState("");
  const r = routes[route];
  const minutes = Math.round((r.nm / speed) * 60);
  return (
    <>
      <a className="skip" href="#main">
        Skip to flight planner
      </a>
      <header>
        <a className="brand" href="#">
          <Plane />
          WAYPOINT
        </a>
        <nav>
          <a href="#planner">Flight lab</a>
          <a href="#training">Training</a>
          <span>Flight school concept</span>
        </nav>
      </header>
      <main id="main">
        <section className="flight-hero">
          <div className="intro">
            <h1>
              Your world.
              <br />A little wider.
            </h1>
            <p>
              There is a moment when the map becomes a landscape. Your first
              chapter in flight starts here.
            </p>
            <a className="primary" href="#planner">
              Plan a training route <ArrowRight />
            </a>
            <div className="weather">
              <Wind />
              <span>
                Training conditions
                <small>Calm wind · clear visibility · simulated</small>
              </span>
            </div>
          </div>
          <div className="flight-instrument">
            <div className="instrument-caption">
              <span>Heading indicator</span>
              <span>Training display</span>
            </div>
            <div className="compass">
              <div
                className="dial"
                style={{ transform: `rotate(${-r.heading}deg)` }}
              >
                <span className="north">N</span>
                <span className="east">E</span>
                <span className="south">S</span>
                <span className="west">W</span>
                {Array.from({ length: 36 }, (_, i) => (
                  <i key={i} style={{ transform: `rotate(${i * 10}deg)` }} />
                ))}
              </div>
              <div className="plane-symbol">
                <Plane />
              </div>
              <div className="heading-readout">
                {String(r.heading).padStart(3, "0")}°
              </div>
            </div>
            <div className="instrument-bottom">
              <span>{r.from}</span>
              <ArrowRight />
              <span>{r.to}</span>
            </div>
          </div>
        </section>
        <section className="planner" id="planner">
          <div className="planner-title">
            <h2>
              Before the horizon,
              <br />
              there is a plan.
            </h2>
            <p>
              Explore a fictional training route. Change your cruise speed and
              watch the estimated flight time update.
            </p>
          </div>
          <div className="route-options">
            {routes.map((x, i) => (
              <button
                key={x.name}
                aria-pressed={route === i}
                onClick={() => {
                  setRoute(i);
                  setPlan("");
                }}
              >
                <span>
                  {x.name}
                  <small>{x.lesson}</small>
                </span>
                <strong>
                  {x.nm}
                  <small>NM</small>
                </strong>
              </button>
            ))}
          </div>
          <div className="flight-plan">
            <label>
              Cruise speed <strong>{speed} knots</strong>
              <input
                aria-label="Cruise speed"
                type="range"
                min="70"
                max="140"
                step="5"
                value={speed}
                onChange={(e) => {
                  setSpeed(+e.target.value);
                  setPlan("");
                }}
              />
            </label>
            <dl>
              <div>
                <dt>Estimated flight time</dt>
                <dd>{minutes} min</dd>
              </div>
              <div>
                <dt>Training fuel allowance</dt>
                <dd>{Math.ceil((minutes / 60) * 28 + 14)} L</dd>
              </div>
              <div>
                <dt>Course heading</dt>
                <dd>{r.heading}°</dd>
              </div>
            </dl>
            <button
              className="primary"
              onClick={() =>
                setPlan(
                  `${r.name} saved: ${minutes} minutes at ${speed} knots.`,
                )
              }
            >
              Save practice plan <ArrowRight />
            </button>
            <p className="status" role="status">
              {plan ||
                "Practice only. Never use this model for actual navigation."}
            </p>
          </div>
        </section>
        <section className="training" id="training">
          <h2>
            Learn to see
            <br />
            the whole picture.
          </h2>
          <article>
            <span>Ground school</span>
            <h3>Understand before you fly.</h3>
            <p>
              Weather, navigation, principles of flight and the decisions that
              connect them.
            </p>
          </article>
          <article>
            <span>In the cockpit</span>
            <h3>Confidence, one lesson at a time.</h3>
            <p>
              Structured practice with an instructor turns knowledge into a
              considered habit.
            </p>
          </article>
        </section>
        <p className="method">
          Model: distance ÷ cruise speed × 60. Fuel illustration: 28 L/hour plus
          14 L allowance. All routes, conditions and values are fictional and
          unsuitable for flight planning.
        </p>
      </main>
      <footer>
        <span>Waypoint — fictional flight school template</span>
        <span>A new perspective begins here.</span>
      </footer>
    </>
  );
}
