import { useState } from "react";
import { ArrowUpRight, ArrowRight, MoveUpRight, Activity } from "lucide-react";
import movement from "./assets/movement.jpg";
const paths = [
  {
    name: "Back to everyday",
    tag: "Everyday movement",
    headline: "Make the ordinary feel easy again.",
    description:
      "A thoughtful starting point for the movements that make up your day. Your clinician works with you to understand what matters and build a realistic plan.",
    steps: [
      "Understand your movement",
      "Set a meaningful goal",
      "Build a personal programme",
    ],
    duration: "Initial consultation · 50 minutes",
  },
  {
    name: "Back to sport",
    tag: "Sport & performance",
    headline: "Return with a little more confidence.",
    description:
      "A progressive pathway for people working towards their sport again. A real clinician would tailor every stage to your history, assessment and goals.",
    steps: [
      "Review your sport demands",
      "Explore strength & control",
      "Plan a gradual return",
    ],
    duration: "Performance consultation · 60 minutes",
  },
  {
    name: "Move for the long run",
    tag: "Strength & prevention",
    headline: "Build capacity for what comes next.",
    description:
      "For people who want to move well for longer. Start with a conversation about your routine and make strength a sustainable part of it.",
    steps: [
      "Map your daily routine",
      "Find your starting point",
      "Create a sustainable rhythm",
    ],
    duration: "Movement consultation · 45 minutes",
  },
];
export default function App() {
  const [path, setPath] = useState(0),
    [time, setTime] = useState("Morning"),
    [planned, setPlanned] = useState(false);
  const p = paths[path];
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header>
        <a href="#" className="brand">
          kinetic
          <MoveUpRight size={28} />
        </a>
        <nav>
          <a href="#pathways">Your way forward</a>
          <a href="#approach">How we work</a>
          <a className="contact" href="#pathways">
            Make a start <ArrowUpRight size={16} />
          </a>
        </nav>
      </header>
      <main id="main">
        <section className="hero">
          <div className="hero-title">
            <h1>
              Life moves.
              <br />
              <span>So can you.</span>
            </h1>
            <p>
              Physiotherapy and movement care.
              <br />
              For the everyday. And the extraordinary.
            </p>
          </div>
          <div className="motion-layout">
            <div className="motion-word">
              BACK
              <br />
              TO
              <br />
              <em>YOU.</em>
            </div>
            <div className="motion-photo">
              <img
                src={movement}
                alt="A person stretching during a movement session"
              />
              <span>YOUR NEXT CHAPTER STARTS WITH A SMALL MOVE.</span>
            </div>
            <div className="motion-disc" aria-hidden="true">
              <ArrowUpRight size={96} strokeWidth={1} />
            </div>
          </div>
          <div className="hero-bottom">
            <span>INDIVIDUAL CARE. SHARED MOMENTUM.</span>
            <a href="#pathways">
              Find your way forward <ArrowRight size={18} />
            </a>
          </div>
        </section>
        <section className="pathways" id="pathways">
          <div className="path-heading">
            <h2>
              Where do you
              <br />
              want to get back to?
            </h2>
            <p>
              Your goal gives the work its direction.
              <br />
              Start with the one that feels closest.
            </p>
          </div>
          <div className="path-tabs">
            {paths.map((v, i) => (
              <button
                key={v.name}
                aria-pressed={path === i}
                onClick={() => {
                  setPath(i);
                  setPlanned(false);
                }}
              >
                {v.name}
                <ArrowUpRight size={20} />
              </button>
            ))}
          </div>
          <div className="path-content" aria-live="polite">
            <article>
              <h3>{p.headline}</h3>
              <p>{p.description}</p>
              <ol>
                {p.steps.map((s, i) => (
                  <li key={s}>
                    <span>{i + 1}</span>
                    {s}
                  </li>
                ))}
              </ol>
            </article>
            <div className="consult">
              <Activity size={30} strokeWidth={1.3} />
              <h3>A useful first conversation.</h3>
              <p>{p.duration}</p>
              <label>
                What suits your day?
                <select
                  value={time}
                  onChange={(e) => {
                    setTime(e.target.value);
                    setPlanned(false);
                  }}
                >
                  <option>Morning</option>
                  <option>Afternoon</option>
                  <option>Evening</option>
                </select>
              </label>
              <button onClick={() => setPlanned(true)}>
                {planned ? "Preference saved" : "Plan my first visit"}
                <ArrowUpRight size={18} />
              </button>
              <small>
                {planned
                  ? `${p.tag} · ${time.toLowerCase()} preference. Saved locally; no appointment booked.`
                  : "Demo planner only. No appointment is booked."}
              </small>
            </div>
          </div>
        </section>
        <section className="approach" id="approach">
          <h2>
            Progress is personal.
            <br />
            Care should be, too.
          </h2>
          <div>
            <p>
              We begin by listening. What does a good day look like? What are
              you missing? What would you like to do again? The answers shape
              the work.
            </p>
            <p>
              Clear conversations. Considered progressions. A plan you can
              understand and a pace that respects where you are.
            </p>
            <span>
              Fictional clinic concept. This page provides no diagnosis or
              medical advice.
            </span>
          </div>
        </section>
      </main>
      <footer>
        <a className="brand" href="#">
          kinetic ↗
        </a>
        <p>Fictional movement clinic · Local demonstration · Koative</p>
        <a href="#pathways">Keep moving forward ↗</a>
      </footer>
    </>
  );
}
