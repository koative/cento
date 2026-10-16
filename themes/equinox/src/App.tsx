import { useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Orbit,
  Pause,
  Play,
  Sparkles,
  Check,
} from "lucide-react";
const skies = [
  {
    name: "The Swan",
    latin: "Cygnus",
    path: "280,230 340,310 400,385 470,450 M270,360 340,310 445,250",
    text: "Follow a great bird across the summer sky. A story of flight, navigation, and the patterns we make together.",
  },
  {
    name: "The Lyre",
    latin: "Lyra",
    path: "330,210 400,290 460,310 430,400 370,380 400,290",
    text: "A small constellation with a bright imagination. Listen to the stories people have carried between the stars.",
  },
  {
    name: "The Crown",
    latin: "Corona Borealis",
    path: "230,260 260,350 330,400 410,390 470,320 480,240",
    text: "Trace a quiet arc in the northern sky. Discover why the smallest patterns can hold the largest stories.",
  },
];
const stars = Array.from({ length: 150 }, (_, i) => ({
  x: 350 + Math.cos(i * 137.5) * Math.sqrt((i + 1) / 150) * 295,
  y: 350 + Math.sin(i * 137.5) * Math.sqrt((i + 1) / 150) * 295,
  r: i % 11 === 0 ? 2 : 0.7 + (i % 3) * 0.3,
}));
export default function App() {
  const [sky, setSky] = useState(0),
    [spin, setSpin] = useState(false),
    [time, setTime] = useState("19:30"),
    [people, setPeople] = useState(2),
    [reserved, setReserved] = useState(false);
  return (
    <>
      <header>
        <a className="wordmark" href="#">
          equinox
          <Orbit size={21} />
        </a>
        <nav>
          <a href="#sky">Explore the sky</a>
          <a href="#visit">
            Plan a visit <ArrowUpRight size={15} />
          </a>
        </nav>
      </header>
      <main>
        <section className="observatory" id="sky">
          <div className="sky-copy">
            <h1>
              Look up.
              <br />
              Find <em>wonder.</em>
            </h1>
            <p className="venue">A planetarium for curious minds.</p>
            <p>
              For a little while, let your world
              <br />
              be a little bigger.
            </p>
            <a href="#visit" className="visit-link">
              An evening under the dome <ArrowDown size={18} />
            </a>
            <div className="selected-star">
              <span>In your sky</span>
              <h2>{skies[sky].name}</h2>
              <p>{skies[sky].latin}</p>
            </div>
          </div>
          <div className="celestial">
            <svg
              className={spin ? "sky spinning" : "sky"}
              viewBox="0 0 700 700"
              role="img"
              aria-label={`Illustrative star chart highlighting ${skies[sky].name}`}
            >
              <circle
                cx="350"
                cy="350"
                r="325"
                fill="none"
                stroke="#827d9a"
                strokeWidth=".6"
              />
              <circle
                cx="350"
                cy="350"
                r="300"
                fill="#171625"
                stroke="#827d9a"
                strokeWidth=".4"
              />
              {[80, 155, 230].map((r) => (
                <circle
                  key={r}
                  cx="350"
                  cy="350"
                  r={r}
                  fill="none"
                  stroke="#9183a0"
                  strokeOpacity=".22"
                  strokeDasharray="2 5"
                />
              ))}
              {Array.from({ length: 24 }, (_, i) => (
                <g key={i} transform={`rotate(${i * 15} 350 350)`}>
                  <line
                    x1="350"
                    y1="25"
                    x2="350"
                    y2={i % 3 === 0 ? 42 : 33}
                    stroke="#bcb5ce"
                  />
                  <text
                    x="350"
                    y="61"
                    fill="#bcb5ce"
                    fontSize="9"
                    textAnchor="middle"
                  >
                    {i}h
                  </text>
                </g>
              ))}
              <ellipse
                cx="350"
                cy="350"
                rx="280"
                ry="110"
                transform="rotate(-32 350 350)"
                stroke="#9183a0"
                strokeOpacity=".3"
                fill="none"
              />
              {stars.map((s, i) => (
                <circle
                  key={i}
                  {...s}
                  cx={s.x}
                  cy={s.y}
                  fill={i % 5 === 0 ? "#d9b591" : "#ede9ff"}
                />
              ))}
              <path
                d={"M" + skies[sky].path}
                stroke="#d9c1f4"
                strokeWidth="2"
                fill="none"
                strokeLinejoin="round"
              />
              <circle cx="350" cy="350" r="4" fill="#eee5f8" />
              <text
                x="350"
                y="690"
                textAnchor="middle"
                fill="#bcb5ce"
                fontSize="10"
              >
                ILLUSTRATIVE CELESTIAL ATLAS · NOT FOR NAVIGATION
              </text>
            </svg>
            <button
              className="motion"
              onClick={() => setSpin(!spin)}
              aria-label={spin ? "Pause sky rotation" : "Rotate sky"}
            >
              {spin ? <Pause size={15} /> : <Play size={15} />}{" "}
              {spin ? "Pause the sky" : "Set the sky in motion"}
            </button>
          </div>
        </section>
        <section className="constellations">
          <div
            className="constellation-tabs"
            role="tablist"
            aria-label="Constellations"
          >
            {skies.map((s, i) => (
              <button
                key={s.name}
                role="tab"
                aria-selected={sky === i}
                onClick={() => setSky(i)}
              >
                {s.name}
                <Sparkles size={18} />
              </button>
            ))}
          </div>
          <div className="sky-story" role="tabpanel">
            <h2>
              Some stories are
              <br />
              written in the dark.
            </h2>
            <p>{skies[sky].text}</p>
          </div>
        </section>
        <section id="visit" className="visit">
          <div>
            <h2>
              Save an evening
              <br />
              for the universe.
            </h2>
            <p>
              A fictional 45-minute planetarium experience.
              <br />
              Leave the everyday at the door.
            </p>
            <div className="dome" aria-hidden="true">
              <div />
              <span>THE DOME</span>
            </div>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setReserved(true);
            }}
            onChange={() => setReserved(false)}
          >
            <h3>Your night at Equinox</h3>
            <label>
              Showtime
              <select value={time} onChange={(e) => setTime(e.target.value)}>
                <option>17:00</option>
                <option>19:30</option>
                <option>21:00</option>
              </select>
            </label>
            <label>
              Visitors
              <select
                value={people}
                onChange={(e) => setPeople(+e.target.value)}
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? "visitor" : "visitors"}
                  </option>
                ))}
              </select>
            </label>
            <div className="total">
              <span>Illustrative admission</span>
              <strong>€{people * 18}</strong>
            </div>
            <button className="reserve">
              Create a visit plan <ArrowUpRight size={18} />
            </button>
            {reserved && (
              <p className="confirmation" role="status">
                <Check size={18} /> Your plan: {people} visitors at {time}. Demo
                only; no tickets reserved.
              </p>
            )}
          </form>
        </section>
      </main>
      <footer>
        <a href="../../">
          Koative collection <ArrowUpRight size={15} />
        </a>
        <span>Equinox is a fictional planetarium concept.</span>
        <span>Stay curious.</span>
      </footer>
    </>
  );
}
