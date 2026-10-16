import { useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  MoveUpRight,
  Coffee,
  Wifi,
  Armchair,
  Check,
  Plus,
  Minus,
} from "lucide-react";
import workspace from "./assets/workspace.jpg";
const zones = [
  { name: "The Library", label: "Quiet focus", rate: 28, color: "#d9d8bd" },
  { name: "The Workshop", label: "Shared energy", rate: 22, color: "#e6baa1" },
  {
    name: "The Garden",
    label: "A fresh perspective",
    rate: 25,
    color: "#b6c8a2",
  },
];
export default function App() {
  const [zone, setZone] = useState(0),
    [days, setDays] = useState(1),
    [saved, setSaved] = useState(false);
  return (
    <>
      <header>
        <a href="#" className="brand">
          commons<span>space to do your thing.</span>
        </a>
        <nav>
          <a href="#spaces">Find your space</a>
          <a href="#day-pass" className="nav-pass">
            Try a day <MoveUpRight size={17} />
          </a>
        </nav>
      </header>
      <main>
        <section className="hero">
          <div className="hero-heading">
            <h1>
              Good work.
              <br />
              Better company.
            </h1>
            <div>
              <p>
                A desk of your own.
                <br />A world of ideas around you.
              </p>
              <a href="#day-pass">
                Make yourself at home <ArrowRight size={19} />
              </a>
            </div>
          </div>
          <div className="hero-image">
            <img
              src={workspace}
              alt="Sunlit shared workspace with communal tables and indoor plants"
            />
            <div className="image-note">
              <span>A place to begin.</span>
              <p>
                Drop in.
                <br />
                Settle down.
                <br />
                Make something.
              </p>
            </div>
            <span className="location">
              A fictional neighbourhood workspace · Est. for your next idea
            </span>
          </div>
        </section>
        <section className="intro">
          <h2>
            Some days need quiet.
            <br />
            Some need a conversation.
            <br />
            <em>There's a corner for both.</em>
          </h2>
          <p>
            For the independent minds, the small teams, the people between
            places. A thoughtful home for the way you work.
          </p>
        </section>
        <section id="spaces" className="spaces">
          <div className="space-top">
            <h2>Choose your kind of day.</h2>
            <span>Three spaces. One community.</span>
          </div>
          <div className="space-layout">
            <div className="floorplan">
              <svg
                viewBox="0 0 760 480"
                role="img"
                aria-label={`Floor plan highlighting ${zones[zone].name}`}
              >
                <path
                  d="M55 55 H700 V420 H55 Z"
                  fill="#eeeadd"
                  stroke="#343c30"
                  strokeWidth="6"
                />
                <g fill="none" stroke="#343c30" strokeWidth="3">
                  <path d="M330 55 V245 H700 M55 300 H330 V420" />
                  <path
                    d="M330 285 V245 M330 335 V300"
                    stroke="#eeeadd"
                    strokeWidth="8"
                  />
                  <path d="M55 360 H35 M700 110 H720" />
                </g>
                <rect
                  x="70"
                  y="70"
                  width="245"
                  height="215"
                  fill={zone === 0 ? zones[0].color : "#e2e1d6"}
                />
                <rect
                  x="345"
                  y="70"
                  width="340"
                  height="160"
                  fill={zone === 1 ? zones[1].color : "#e2e1d6"}
                />
                <rect
                  x="345"
                  y="260"
                  width="340"
                  height="145"
                  fill={zone === 2 ? zones[2].color : "#e2e1d6"}
                />
                {[0, 1, 2].map((i) => (
                  <g
                    key={i}
                    transform={`translate(${i === 0 ? 100 : 380} ${i === 0 ? 100 : i === 1 ? 100 : 285})`}
                    stroke="#6d7463"
                    fill="none"
                  >
                    {[0, 1, 2].map((n) => (
                      <g key={n} transform={`translate(${n * 65} 0)`}>
                        <rect width="42" height="70" rx="3" />
                        <path d="M8 -8 H34 M8 78 H34" strokeWidth="5" />
                      </g>
                    ))}
                  </g>
                ))}
                <text x="190" y="250" textAnchor="middle">
                  THE LIBRARY
                </text>
                <text x="520" y="203" textAnchor="middle">
                  THE WORKSHOP
                </text>
                <text x="520" y="385" textAnchor="middle">
                  THE GARDEN
                </text>
                <text x="190" y="365" textAnchor="middle">
                  COFFEE &amp; HELLOS
                </text>
                <path
                  d="M180 420 V450 M170 440 L180 450 L190 440"
                  stroke="#343c30"
                  fill="none"
                  strokeWidth="2"
                />
                <text x="230" y="454">
                  COME ON IN
                </text>
              </svg>
              <div className="plan-caption">
                <span>Ground floor · illustrative plan</span>
                <span>Not to scale</span>
              </div>
            </div>
            <div
              className="zone-list"
              role="tablist"
              aria-label="Workspace zones"
            >
              {zones.map((z, i) => (
                <button
                  key={z.name}
                  role="tab"
                  aria-selected={zone === i}
                  onClick={() => {
                    setZone(i);
                    setSaved(false);
                  }}
                >
                  <span className="zone-dot" style={{ background: z.color }} />
                  <span>
                    <small>{z.label}</small>
                    <strong>{z.name}</strong>
                  </span>
                  <ArrowUpRight size={24} />
                </button>
              ))}
              <p className="zone-detail" role="tabpanel">
                {
                  [
                    "Heads-down hours. Soft voices. A window seat and the space to finish that thing.",
                    "Big tables for shared ideas. Meet a collaborator, spread out a project, make a little progress.",
                    "A bright, leafy corner. Open space for fresh thinking and a slower working rhythm.",
                  ][zone]
                }
              </p>
            </div>
          </div>
        </section>
        <section id="day-pass" className="day-pass">
          <div className="day-copy">
            <h2>
              Your desk
              <br />
              is waiting.
            </h2>
            <p>No long story. Just a good place to work.</p>
            <ul>
              <li>
                <Wifi size={18} /> Fast Wi-Fi
              </li>
              <li>
                <Coffee size={18} /> Coffee on the house
              </li>
              <li>
                <Armchair size={18} /> A comfortable spot
              </li>
            </ul>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSaved(true);
            }}
          >
            <h3>A little trial run.</h3>
            <label>
              Your space
              <select
                value={zone}
                onChange={(e) => {
                  setZone(+e.target.value);
                  setSaved(false);
                }}
              >
                {zones.map((z, i) => (
                  <option value={i} key={z.name}>
                    {z.name}
                  </option>
                ))}
              </select>
            </label>
            <div className="days">
              <span>Day passes</span>
              <div>
                <button
                  type="button"
                  aria-label="Remove a day"
                  disabled={days === 1}
                  onClick={() => {
                    setDays(days - 1);
                    setSaved(false);
                  }}
                >
                  <Minus size={16} />
                </button>
                <output>{days}</output>
                <button
                  type="button"
                  aria-label="Add a day"
                  disabled={days === 5}
                  onClick={() => {
                    setDays(days + 1);
                    setSaved(false);
                  }}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            <div className="price">
              <strong>€{zones[zone].rate * days}</strong>
              <span>
                €{zones[zone].rate} per day
                <br />
                Illustrative pricing
              </span>
            </div>
            <button className="submit">
              Plan my workday <ArrowUpRight size={18} />
            </button>
            {saved && (
              <p role="status" className="confirmed">
                <Check size={17} />
                {days} {days === 1 ? "day" : "days"} in {zones[zone].name}.
                Local demo plan saved; no booking made.
              </p>
            )}
          </form>
        </section>
      </main>
      <footer>
        <a className="brand" href="#">
          commons
        </a>
        <span>Fictional workspace. Real possibilities.</span>
        <a href="../../">
          Back to Elseform <ArrowUpRight size={14} />
        </a>
      </footer>
    </>
  );
}
