import { useState } from "react";
import { ArrowUpRight, Check, Mountain, MoveUpRight } from "lucide-react";
import climb from "./assets/climb.jpg";
const routes = [
  {
    name: "Moss garden",
    grade: "V1",
    color: "#668c60",
    setter: "Eli",
    line: "M80 400 C180 340 170 230 280 160 S390 80 430 50",
    holds: [
      [80, 400],
      [145, 330],
      [185, 250],
      [280, 160],
      [370, 105],
      [430, 50],
    ],
  },
  {
    name: "The long way",
    grade: "V3",
    color: "#c27243",
    setter: "Sam",
    line: "M200 420 C280 320 350 330 300 240 S420 150 390 60",
    holds: [
      [200, 420],
      [260, 340],
      [325, 310],
      [300, 240],
      [390, 160],
      [390, 60],
    ],
  },
  {
    name: "Side quest",
    grade: "V5",
    color: "#7d79a6",
    setter: "Noa",
    line: "M400 415 C350 340 420 270 490 220 S470 100 520 55",
    holds: [
      [400, 415],
      [370, 340],
      [420, 270],
      [490, 220],
      [470, 130],
      [520, 55],
    ],
  },
];
export default function App() {
  const [grade, setGrade] = useState("All");
  const [selected, setSelected] = useState(0);
  const [ticks, setTicks] = useState<string[]>([]);
  const r = routes[selected];
  return (
    <>
      <header>
        <a className="brand" href="#">
          <Mountain />
          SUMMIT
        </a>
        <nav aria-label="Main">
          <a href="#wall">The wall</a>
          <a href="#first">First climb</a>
        </nav>
        <span>BOULDERING / GOOD COMPANY</span>
      </header>
      <main>
        <section className="wall-section" id="wall">
          <div className="wall-intro">
            <h1>
              Small holds.
              <br />
              Big feelings.
            </h1>
            <p>
              Your next problem is waiting.
              <br />
              Explore the wall, find a line, make it yours.
            </p>
            <div className="wall-key">
              <span>
                <i style={{ background: r.color }} />
                Selected route
              </span>
              <span>Illustrated demo wall · North face</span>
            </div>
          </div>
          <div className="route-map">
            <svg
              viewBox="0 0 600 470"
              role="img"
              aria-label={`Climbing wall showing ${r.name}, grade ${r.grade}`}
            >
              <path
                d="M25 430 L50 200 L165 45 L365 20 L575 95 L590 430 Z"
                fill="#d5cfbe"
              />
              <path
                d="M50 200 L255 190 L365 20 M255 190 L300 430 M255 190 L575 95"
                stroke="#b7b09d"
                strokeWidth="2"
                fill="none"
              />
              {routes.map((route, i) => (
                <g key={route.name} opacity={selected === i ? 1 : 0.28}>
                  <path
                    className={selected === i ? "route-line" : ""}
                    d={route.line}
                    stroke={route.color}
                    strokeWidth="3"
                    strokeDasharray="7 8"
                    fill="none"
                  />
                  {route.holds.map(([x, y], j) => (
                    <rect
                      key={j}
                      x={x - 12}
                      y={y - 7}
                      width={24 + (j % 3) * 4}
                      height="14"
                      rx="5"
                      transform={`rotate(${j * 29} ${x} ${y})`}
                      fill={route.color}
                    />
                  ))}
                </g>
              ))}
              <text x="35" y="458" fontSize="12" fill="#465143">
                LANDING ZONE / 4.5 M WALL
              </text>
            </svg>
            <span className="wall-label">
              NORTH
              <br />
              WALL
            </span>
          </div>
          <aside className="route-panel">
            <h2>Find your line</h2>
            <div className="grade-filter" aria-label="Route grade">
              {["All", "V1", "V3", "V5"].map((g) => (
                <button
                  key={g}
                  aria-pressed={grade === g}
                  onClick={() => {
                    setGrade(g);
                    if (g !== "All")
                      setSelected(routes.findIndex((x) => x.grade === g));
                  }}
                >
                  {g}
                </button>
              ))}
            </div>
            <div className="routes">
              {routes.map(
                (route, i) =>
                  (grade === "All" || route.grade === grade) && (
                    <button
                      key={route.name}
                      className={selected === i ? "selected" : ""}
                      onClick={() => setSelected(i)}
                    >
                      <span
                        className="grade"
                        style={{ background: route.color }}
                      >
                        {route.grade}
                      </span>
                      <span>
                        <b>{route.name}</b>
                        <small>
                          Set by {route.setter} ·{" "}
                          {ticks.includes(route.name)
                            ? "Completed"
                            : "Ready to climb"}
                        </small>
                      </span>
                      <MoveUpRight size={18} />
                    </button>
                  ),
              )}
            </div>
            <div className="route-detail">
              <span>ON YOUR RADAR</span>
              <h3>{r.name}</h3>
              <p>
                {selected === 0
                  ? "Trust your feet. A gentle introduction with generous holds and a satisfying finish."
                  : selected === 1
                    ? "A little balance, a little patience. Follow the diagonal and find your own rhythm."
                    : "A technical traverse for thoughtful movement. Keep your hips close and commit."}
              </p>
              <button
                className="tick"
                onClick={() =>
                  setTicks(
                    ticks.includes(r.name)
                      ? ticks.filter((x) => x !== r.name)
                      : [...ticks, r.name],
                  )
                }
              >
                {ticks.includes(r.name) ? (
                  <Check size={18} />
                ) : (
                  <Mountain size={18} />
                )}{" "}
                {ticks.includes(r.name)
                  ? "Remove from tick list"
                  : "Mark as climbed"}
              </button>
              <p className="status" role="status">
                {ticks.length} of 3 demo routes completed
              </p>
            </div>
          </aside>
        </section>
        <section className="first-climb" id="first">
          <img
            src={climb}
            alt="Climber finding a route on a rocky outdoor wall"
            loading="lazy"
          />
          <div>
            <h2>
              Everyone starts
              <br />
              somewhere.
            </h2>
            <p>
              You do not need a partner, a pile of gear, or a certain kind of
              body. Bring curiosity. We will help with the rest.
            </p>
            <dl>
              <div>
                <dt>First visit</dt>
                <dd>Intro + shoe hire · £18</dd>
              </div>
              <div>
                <dt>Open climb</dt>
                <dd>Monday–Friday · 07:00–22:00</dd>
              </div>
              <div>
                <dt>The essentials</dt>
                <dd>Comfortable clothes. Short nails. A little patience.</dd>
              </div>
            </dl>
            <a href="#wall">
              Explore the demo wall <ArrowUpRight size={17} />
            </a>
          </div>
        </section>
        <section className="club-note">
          <Mountain size={48} />
          <h2>
            Better together.
            <br />
            Even on your own route.
          </h2>
          <p>
            A fictional climbing space for trying, falling, learning, and trying
            again. Route grades and advice are illustrative; follow the guidance
            of your real gym.
          </p>
        </section>
      </main>
      <footer>
        <strong>SUMMIT / GO AGAIN</strong>
        <p>
          Fictional climbing gym by Koative. Your tick list stays in this
          browser.
        </p>
      </footer>
    </>
  );
}
