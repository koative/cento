import { useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Dna,
  Microscope,
  Pause,
  Play,
} from "lucide-react";
const studies = [
  {
    id: "H-014",
    name: "Protein folding",
    area: "Discovery",
    phase: "Exploration",
    text: "Mapping the way structure becomes function. A synthetic protein library for understanding how small changes shift an entire system.",
    color: "#de76a8",
  },
  {
    id: "H-027",
    name: "Cellular repair",
    area: "Translation",
    phase: "In vitro",
    text: "Following the signals that let a cell reset. Our fictional study explores repair pathways in controlled model environments.",
    color: "#c7d76c",
  },
  {
    id: "H-032",
    name: "Microbial ecology",
    area: "Discovery",
    phase: "Observation",
    text: "A living system is never alone. This concept study investigates the relationships inside a model microbial community.",
    color: "#75bdba",
  },
];
export default function App() {
  const [active, setActive] = useState(0);
  const [filter, setFilter] = useState("All research");
  const [playing, setPlaying] = useState(true);
  const [saved, setSaved] = useState<string[]>([]);
  const s = studies[active];
  return (
    <>
      <a className="skip" href="#research">
        Skip to research
      </a>
      <header className="nav">
        <a className="brand" href="#">
          <Dna />
          helix.
        </a>
        <nav>
          <a href="#research">Our research</a>
          <a href="#approach">How we think</a>
          <a href="#library">Study library</a>
        </nav>
        <span className="small">Independent research concept</span>
      </header>
      <main>
        <section className="opening">
          <div className="statement">
            <h1>
              Life is full
              <br />
              of <em>possibility.</em>
            </h1>
            <p>
              We look closer. We ask better questions. We explore the quiet
              mechanisms that make life extraordinary.
            </p>
            <a href="#research" className="btn">
              Explore the research <ArrowRight />
            </a>
            <span className="demo">
              Fictional biotechnology studio. No clinical claims.
            </span>
          </div>
          <div
            className={"specimen " + (!playing ? "paused" : "")}
            aria-label="Animated abstract protein model"
          >
            <div className="orbit o1" />
            <div className="orbit o2" />
            <div className="orbit o3" />
            {Array.from({ length: 12 }, (_, i) => (
              <i key={i} style={{ "--i": i } as React.CSSProperties} />
            ))}
            <div className="specimen-label">
              MODEL 014 / STRUCTURAL STUDY
              <br />
              <strong>
                Small structures.
                <br />
                Infinite questions.
              </strong>
            </div>
            <button
              className="motion"
              onClick={() => setPlaying(!playing)}
              aria-label={
                playing ? "Pause molecular motion" : "Play molecular motion"
              }
            >
              {playing ? <Pause /> : <Play />}
            </button>
          </div>
        </section>
        <section className="research section" id="research">
          <div className="section-title">
            <h2>Curiosity, in progress.</h2>
            <p>
              Three fictional programmes. One shared belief: understanding
              starts with paying attention.
            </p>
          </div>
          <div className="study-grid">
            <div className="study-list">
              {studies.map((x, i) => (
                <button
                  key={x.id}
                  aria-pressed={active === i}
                  onClick={() => setActive(i)}
                >
                  <span>{x.id}</span>
                  <strong>{x.name}</strong>
                  <ArrowUpRight />
                </button>
              ))}
            </div>
            <article
              className="study-detail"
              style={{ "--study": s.color } as React.CSSProperties}
            >
              <Microscope size={34} />
              <div>
                <span>
                  {s.area} / {s.phase}
                </span>
                <h3>{s.name}</h3>
                <p>{s.text}</p>
                <button
                  onClick={() =>
                    setSaved(
                      saved.includes(s.id)
                        ? saved.filter((x) => x !== s.id)
                        : [...saved, s.id],
                    )
                  }
                >
                  {saved.includes(s.id)
                    ? "Remove from reading list"
                    : "Save to reading list"}{" "}
                  <ArrowRight />
                </button>
                <p className="status" role="status">
                  {saved.length} {saved.length === 1 ? "study" : "studies"} in
                  your reading list
                </p>
              </div>
            </article>
          </div>
        </section>
        <section id="approach" className="approach">
          <p>
            Science is a conversation
            <br />
            with what we don't yet know.
          </p>
          <div>
            <h3>Open by intention.</h3>
            <p>
              Our concept is built around research that can be questioned,
              repeated, and shared. Every idea needs room to evolve.
            </p>
            <ul>
              <li>Observe without assumptions.</li>
              <li>Document the unexpected.</li>
              <li>Build understanding together.</li>
            </ul>
          </div>
        </section>
        <section id="library" className="section">
          <div className="section-title">
            <h2>The study library.</h2>
            <div className="tabs">
              {["All research", "Discovery", "Translation"].map((f) => (
                <button
                  key={f}
                  aria-pressed={filter === f}
                  onClick={() => setFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          {studies
            .filter((x) => filter === "All research" || x.area === filter)
            .map((x) => (
              <div className="library-row" key={x.id}>
                <span>{x.id}</span>
                <h3>{x.name}</h3>
                <span>{x.area}</span>
                <button
                  aria-label={"Open " + x.name}
                  onClick={() => {
                    setActive(studies.indexOf(x));
                    document.getElementById("research")?.scrollIntoView();
                  }}
                >
                  <ArrowUpRight />
                </button>
              </div>
            ))}
        </section>
      </main>
      <footer className="footer">
        <a className="brand" href="#">
          helix.
        </a>
        <span>
          Fictional research concept by Koative. All studies are illustrative;
          this is not medical information.
        </span>
        <span>Stay curious.</span>
      </footer>
    </>
  );
}
