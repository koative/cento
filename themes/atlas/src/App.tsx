import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  ArrowDownUp,
  TrainFront,
  Footprints,
  Accessibility,
  MapPin,
} from "lucide-react";
const stops = [
  { name: "North Park", x: 160, y: 100 },
  { name: "Museum", x: 290, y: 230 },
  { name: "Central", x: 420, y: 360 },
  { name: "Riverside", x: 620, y: 360 },
  { name: "Harbor", x: 750, y: 490 },
  { name: "West End", x: 170, y: 520 },
  { name: "Old Town", x: 300, y: 490 },
  { name: "East Market", x: 560, y: 220 },
  { name: "Botanic", x: 700, y: 100 },
];
const links = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [5, 6],
  [6, 2],
  [2, 7],
  [7, 8],
];
function findRoute(start: number, end: number) {
  const queue = [[start]];
  const seen = new Set([start]);
  while (queue.length) {
    const path = queue.shift()!;
    const last = path[path.length - 1];
    if (last === end) return path;
    for (const [a, b] of links) {
      const next = a === last ? b : b === last ? a : -1;
      if (next >= 0 && !seen.has(next)) {
        seen.add(next);
        queue.push([...path, next]);
      }
    }
  }
  return [];
}
export default function App() {
  const [from, setFrom] = useState(0),
    [to, setTo] = useState(4),
    [route, setRoute] = useState<number[]>([]),
    [view, setView] = useState("Journey"),
    [accessible, setAccessible] = useState(false);
  const chosen = route.length ? route : [];
  return (
    <>
      <header>
        <a className="brand" href="#">
          atlas<span>city transport</span>
        </a>
        <nav>
          <button
            aria-pressed={view === "Journey"}
            onClick={() => setView("Journey")}
          >
            Plan a journey
          </button>
          <button
            aria-pressed={view === "Departures"}
            onClick={() => setView("Departures")}
          >
            Departures
          </button>
          <a href="#network">
            Our network <ArrowUpRight size={14} />
          </a>
        </nav>
        <span className="city">Welcome to Port Vale.</span>
      </header>
      <main>
        <div className="page-title">
          <h1>A city within reach.</h1>
          <span>
            <span className="service-dot" />
            All lines running in this demo
          </span>
        </div>
        <div className="journey-layout">
          <aside className="planner">
            {view === "Journey" ? (
              <>
                <h2>
                  Where shall
                  <br />
                  we go?
                </h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setRoute(findRoute(from, to));
                  }}
                >
                  <label>
                    From
                    <select
                      aria-label="From station"
                      value={from}
                      onChange={(e) => {
                        setFrom(+e.target.value);
                        setRoute([]);
                      }}
                    >
                      {stops.map((s, i) => (
                        <option key={s.name} value={i}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <button
                    type="button"
                    className="swap"
                    onClick={() => {
                      setFrom(to);
                      setTo(from);
                      setRoute([]);
                    }}
                    aria-label="Swap stations"
                  >
                    <ArrowDownUp size={19} />
                  </button>
                  <label>
                    To
                    <select
                      aria-label="To station"
                      value={to}
                      onChange={(e) => {
                        setTo(+e.target.value);
                        setRoute([]);
                      }}
                    >
                      {stops.map((s, i) => (
                        <option key={s.name} value={i}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="accessible">
                    <input
                      type="checkbox"
                      checked={accessible}
                      onChange={(e) => setAccessible(e.target.checked)}
                    />
                    <Accessibility size={16} /> Step-free journey
                  </label>
                  <button className="primary">
                    Find my route <ArrowRight size={18} />
                  </button>
                </form>
                {route.length > 0 && (
                  <div className="route-result" role="status">
                    {route.length === 1 ? (
                      <>
                        <h3>You're already here.</h3>
                        <p>Choose another destination to explore the city.</p>
                      </>
                    ) : (
                      <>
                        <div className="result-heading">
                          <strong>{(route.length - 1) * 4 + 3} min</strong>
                          <span>€2.80 single</span>
                        </div>
                        <p>
                          {route.length - 1} stops ·{" "}
                          {accessible
                            ? "Step-free access"
                            : "Trains every 6 minutes"}
                        </p>
                        <ol>
                          {route.map((n, i) => (
                            <li key={n}>
                              <span>
                                {i === 0
                                  ? "Board"
                                  : i === route.length - 1
                                    ? "Arrive"
                                    : "Via"}
                              </span>
                              {stops[n].name}
                            </li>
                          ))}
                        </ol>
                      </>
                    )}
                  </div>
                )}
              </>
            ) : (
              <>
                <h2>
                  The next
                  <br />
                  way there.
                </h2>
                <label>
                  Station
                  <select
                    aria-label="Departure station"
                    value={from}
                    onChange={(e) => setFrom(+e.target.value)}
                  >
                    {stops.map((s, i) => (
                      <option value={i} key={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </label>
                <div className="departures">
                  <h3>{stops[from].name}</h3>
                  {["Harbor", "North Park", "Botanic"].map((s, i) => (
                    <div key={s}>
                      <span className={"line-badge l" + i}>
                        {i === 2 ? "B" : "A"}
                      </span>
                      <span>{s}</span>
                      <strong>{[2, 6, 9][i]} min</strong>
                    </div>
                  ))}
                </div>
                <p className="demo-note">
                  Illustrative timetable. No real-time transit connection.
                </p>
              </>
            )}
          </aside>
          <section className="map-panel" aria-label="Port Vale network map">
            <div className="map-tools">
              <span>
                <MapPin size={15} /> PORT VALE
              </span>
              <span>Schematic map · not to scale</span>
            </div>
            <div
              className="map-scroll"
              tabIndex={0}
              role="region"
              aria-label="Scrollable network diagram"
            >
              <svg
                viewBox="0 0 900 650"
                role="img"
                aria-label="Schematic network of nine fictional stations"
              >
                <path
                  className="river"
                  d="M900 80 Q570 50 650 240 Q720 400 450 480 Q300 530 320 650"
                />
                <path
                  d="M160 100 L420 360 H620 L750 490"
                  className="line line-a"
                />
                <path
                  d="M170 520 L300 490 L560 220 L700 100"
                  className="line line-b"
                />
                {route.length > 1 && (
                  <polyline
                    className="selected-route"
                    points={route
                      .map((n) => `${stops[n].x},${stops[n].y}`)
                      .join(" ")}
                  />
                )}
                <text
                  x="720"
                  y="220"
                  className="water-label"
                  transform="rotate(48 720 220)"
                >
                  RIVER VALE
                </text>
                {stops.map((s, i) => (
                  <g key={s.name} className="station">
                    <circle
                      cx={s.x}
                      cy={s.y}
                      r={i === 2 ? 12 : 7}
                      className={chosen.includes(i) ? "active-stop" : ""}
                    />
                    <text x={s.x} y={s.y - 22} textAnchor="middle">
                      {s.name}
                    </text>
                    {(i === from || i === to) && (
                      <text
                        className="pin-label"
                        x={s.x}
                        y={s.y + 30}
                        textAnchor="middle"
                      >
                        {i === from ? "START" : "END"}
                      </text>
                    )}
                  </g>
                ))}
                <rect
                  x="105"
                  y="110"
                  width="26"
                  height="26"
                  rx="5"
                  fill="#d74c36"
                />
                <text
                  x="118"
                  y="129"
                  textAnchor="middle"
                  fill="white"
                  fontSize="17"
                >
                  A
                </text>
                <rect
                  x="750"
                  y="110"
                  width="26"
                  height="26"
                  rx="5"
                  fill="#276c73"
                />
                <text
                  x="763"
                  y="129"
                  textAnchor="middle"
                  fill="white"
                  fontSize="17"
                >
                  B
                </text>
              </svg>
            </div>
            <div className="map-legend">
              <span>
                <i className="red" />
                Park — Harbor
              </span>
              <span>
                <i className="green" />
                West End — Botanic
              </span>
              <span>
                <Accessibility size={15} /> All stations step-free
              </span>
            </div>
          </section>
        </div>
        <section id="network" className="network">
          <div>
            <TrainFront size={28} />
            <h2>
              Less planning.
              <br />
              More exploring.
            </h2>
          </div>
          <div className="network-note">
            <h3>One ticket. The whole city.</h3>
            <p>
              Take a turn you haven't taken. Our fictional network brings parks,
              neighbourhoods and the waterfront together with a simple flat
              fare.
            </p>
            <a href="#" onClick={() => setView("Journey")}>
              Find your next stop <ArrowUpRight size={18} />
            </a>
          </div>
          <div className="walking">
            <Footprints size={26} />
            <h3>A little closer on foot.</h3>
            <p>
              Museum to Old Town is a lovely 15-minute walk in our imaginary
              city. Sometimes the journey is the point.
            </p>
          </div>
        </section>
      </main>
      <footer>
        <a href="../../">
          Elseform collection <ArrowUpRight size={14} />
        </a>
        <span>
          Atlas is a fictional transit concept. All routes, fares and times are
          sample data.
        </span>
      </footer>
    </>
  );
}
