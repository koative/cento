import { useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  MoveUpRight,
  Plus,
  Minus,
  Check,
} from "lucide-react";
import building from "./assets/building.jpg";
import interior from "./assets/interior.jpg";
const projects = [
  {
    name: "The Yard",
    type: "Commercial",
    place: "East London",
    year: "2026",
    image: building,
    desc: "An adaptive workplace concept that puts shared space, daylight and material honesty at the centre.",
  },
  {
    name: "A quieter interior",
    type: "Residential",
    place: "Copenhagen",
    year: "2025",
    image: interior,
    desc: "A thoughtful residential fit-out. Warm materials and simple proportions give everyday life room to breathe.",
  },
  {
    name: "Common Ground",
    type: "Commercial",
    place: "Rotterdam",
    year: "2025",
    image: building,
    desc: "A mixed-use concept built around the public realm. A clear structure with a generous relationship to the street.",
  },
];
export default function App() {
  const [active, setActive] = useState(0);
  const [stage, setStage] = useState(0);
  const [type, setType] = useState("Commercial");
  const [budget, setBudget] = useState("€500k–€2m");
  const [sent, setSent] = useState(false);
  const [open, setOpen] = useState(-1);
  const p = projects[active];
  return (
    <>
      <a className="skip" href="#projects">
        Skip to projects
      </a>
      <header className="nav">
        <a className="brand" href="#">
          <MoveUpRight />
          ALLOY
        </a>
        <nav>
          <a href="#projects">Selected work</a>
          <a href="#method">Our method</a>
          <a href="#brief">Start a project</a>
        </nav>
        <span className="small">Built on common ground.</span>
      </header>
      <main>
        <section className="alloy-title">
          <h1>
            GOOD BUILDINGS.
            <br />
            BETTER TOGETHER.
          </h1>
          <div>
            <span>CONSTRUCTION / DEVELOPMENT / FIT-OUT</span>
            <p>
              From an early conversation to the last careful detail. We bring
              people, materials and ideas together.
            </p>
          </div>
        </section>
        <section className="project-stage" id="projects">
          <div className="project-photo">
            <img
              src={p.image}
              alt={
                p.name === "A quieter interior"
                  ? "Warm, minimal living space with natural materials"
                  : "Sculptural architectural facade seen from below"
              }
            />
            <div className="project-stamp">
              BUILT WITH
              <br />
              <strong>INTENTION.</strong>
            </div>
            <div className="project-caption">
              <h2>{p.name}</h2>
              <span>
                {p.place} / {p.year}
              </span>
            </div>
          </div>
          <div className="project-index">
            {projects.map((x, i) => (
              <button
                key={x.name}
                aria-pressed={active === i}
                onClick={() => setActive(i)}
              >
                <span>{x.type}</span>
                <strong>{x.name}</strong>
                <ArrowUpRight />
              </button>
            ))}
            <p>{p.desc}</p>
            <span className="demo">
              Fictional projects with editorial architecture photography.
            </span>
          </div>
        </section>
        <section className="method" id="method">
          <div className="method-intro">
            <h2>
              ONE TEAM.
              <br />
              FROM FIRST LINE
              <br />
              TO FINAL HANDOVER.
            </h2>
            <p>
              A building comes together long before the materials arrive.
              Explore a considered project sequence.
            </p>
          </div>
          <div className="timeline">
            <div className="stage-tabs">
              {["Define", "Develop", "Build", "Handover"].map((x, i) => (
                <button
                  key={x}
                  aria-pressed={stage === i}
                  onClick={() => setStage(i)}
                >
                  <span>{i + 1}</span>
                  {x}
                </button>
              ))}
            </div>
            <div className="stage-content">
              <span>STAGE {stage + 1} OF 4</span>
              <h3>
                {
                  [
                    "Start with the right questions.",
                    "Make the ambition buildable.",
                    "Turn decisions into places.",
                    "Leave nothing unresolved.",
                  ][stage]
                }
              </h3>
              <p>
                {
                  [
                    "We align the brief, budget and programme before drawing a line. The most useful first step is shared understanding.",
                    "A coordinated design turns possibilities into practical decisions, with the people who will make them real.",
                    "Clear communication and careful sequencing keep the work moving. Every detail belongs to a bigger picture.",
                    "A thorough review, a clear record and time to understand the building. Handover is the beginning of its next life.",
                  ][stage]
                }
              </p>
              <div
                className="blueprint"
                aria-label={
                  "Concept floor plan highlighting stage " + (stage + 1)
                }
              >
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <span key={i} className={i <= stage ? "built" : ""} />
                ))}
                <i className="measure">12.40 m</i>
              </div>
            </div>
          </div>
        </section>
        <section className="capabilities section">
          <h2>
            THE WORK
            <br />
            BEHIND THE WORK.
          </h2>
          <div>
            {[
              [
                "Construction management",
                "Programme, procurement and coordination brought into one clear view.",
              ],
              [
                "Adaptive reuse",
                "A thoughtful second life for buildings that have more to give.",
              ],
              [
                "Interior fit-out",
                "Careful making at the scale people experience every day.",
              ],
            ].map(([q, a], i) => (
              <article key={q}>
                <button
                  aria-expanded={open === i}
                  onClick={() => setOpen(open === i ? -1 : i)}
                >
                  {q}
                  {open === i ? <Minus /> : <Plus />}
                </button>
                {open === i && <p>{a}</p>}
              </article>
            ))}
          </div>
        </section>
        <section id="brief" className="brief">
          <div>
            <h2>
              LET'S FIND
              <br />
              COMMON GROUND.
            </h2>
            <p>
              Every good project starts with a clear conversation. Prepare a
              sample brief below.
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <label className="field">
              Project type
              <select
                aria-label="Project type"
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                  setSent(false);
                }}
              >
                <option>Commercial</option>
                <option>Residential</option>
                <option>Adaptive reuse</option>
                <option>Interior fit-out</option>
              </select>
            </label>
            <label className="field">
              Indicative budget
              <select
                aria-label="Budget range"
                value={budget}
                onChange={(e) => {
                  setBudget(e.target.value);
                  setSent(false);
                }}
              >
                <option>Under €500k</option>
                <option>€500k–€2m</option>
                <option>€2m–€10m</option>
                <option>Over €10m</option>
              </select>
            </label>
            <label className="field project-email">
              Your email
              <input type="email" required placeholder="you@studio.com" />
            </label>
            <button className="btn" type="submit">
              Prepare project brief <ArrowRight />
            </button>
            {sent && (
              <p className="status" role="status">
                <Check size={14} /> Your {type.toLowerCase()} brief with a{" "}
                {budget} budget is prepared locally. No message has been sent.
              </p>
            )}
          </form>
        </section>
      </main>
      <footer className="footer">
        <a className="brand" href="#">
          ALLOY
        </a>
        <span>
          Fictional construction studio by Koative. All projects, services and
          estimates are demonstration content.
        </span>
        <a href="#">
          Back to top <ArrowUpRight />
        </a>
      </footer>
    </>
  );
}
