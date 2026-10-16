import { useState } from "react";
import { ArrowUpRight, ArrowRight, Plus, Minus } from "lucide-react";
import house from "./assets/house.jpg";
import interior from "./assets/interior.jpg";
import building from "./assets/building.jpg";
const projects = [
  {
    name: "The quiet house",
    type: "Residential",
    place: "Copenhagen, DK",
    year: "2026",
    image: house,
    description:
      "A home composed around the passage of light. Warm oak, soft plaster and a deliberately restrained palette make room for the rituals of everyday life.",
  },
  {
    name: "Rooms for living",
    type: "Interiors",
    place: "Antwerp, BE",
    year: "2025",
    image: interior,
    description:
      "An open, connected interior where generous proportions and considered materials bring new life to an existing city apartment.",
  },
  {
    name: "Common ground",
    type: "Cultural",
    place: "Rotterdam, NL",
    year: "2025",
    image: building,
    description:
      "An exploration of architecture as a meeting place: a civic building with open thresholds and spaces that invite people to linger.",
  },
];
export default function App() {
  const [active, setActive] = useState(0);
  const [filter, setFilter] = useState("All projects");
  const [open, setOpen] = useState<number | null>(null);
  const [sent, setSent] = useState(false);
  return (
    <>
      <header className="masthead">
        <a href="#" className="wordmark" aria-label="Forma home">
          forma<span>®</span>
        </a>
        <span className="studio-label">
          Independent architecture
          <br />
          Copenhagen & everywhere
        </span>
        <nav aria-label="Main navigation">
          <a href="#work">Selected work</a>
          <a href="#studio">Studio</a>
          <a href="#contact">
            Let’s talk <ArrowUpRight size={15} />
          </a>
        </nav>
      </header>
      <main>
        <section className="opening">
          <div className="opening-title">
            <h1>
              Space to
              <br />
              <span>be human.</span>
            </h1>
            <p>
              Architecture shaped by life.
              <br />
              Considered in every detail.
            </p>
          </div>
          <div className="project-stage">
            <div className="side-note">EST. 2018 — BUILT ON CURIOSITY</div>
            <div className="hero-image">
              <img
                key={active}
                src={projects[active].image}
                alt={projects[active].name + " architectural concept"}
              />
              <a
                className="image-link"
                href="#work"
                aria-label="Explore our projects"
              >
                <ArrowUpRight size={30} />
              </a>
              <div className="photo-caption">
                <span>{projects[active].name}</span>
                <span>{projects[active].place}</span>
              </div>
            </div>
          </div>
          <div className="project-switcher">
            <span>Selected perspective</span>
            <div>
              {projects.map((p, i) => (
                <button
                  aria-pressed={active === i}
                  onClick={() => setActive(i)}
                  key={p.name}
                >
                  {String(i + 1).padStart(2, "0")} <span>{p.name}</span>
                </button>
              ))}
            </div>
          </div>
        </section>
        <section id="studio" className="studio">
          <span className="section-label">A practice of observation</span>
          <div>
            <h2>
              Good spaces begin
              <br />
              with <em>better questions.</em>
            </h2>
            <div className="studio-copy">
              <p>
                How does a room feel at first light? Where do people naturally
                gather? What is worth keeping?
              </p>
              <p>
                We design with curiosity, care, and a belief that the most
                meaningful architecture makes everyday life a little more
                extraordinary.
              </p>
            </div>
            <a href="#contact" className="text-link">
              Get to know our practice <ArrowUpRight size={18} />
            </a>
          </div>
        </section>
        <section className="work" id="work">
          <div className="section-heading">
            <h2>
              Selected work<span> (03)</span>
            </h2>
            <div className="filters" aria-label="Filter projects">
              {["All projects", "Residential", "Interiors", "Cultural"].map(
                (f) => (
                  <button
                    key={f}
                    onClick={() => {
                      setFilter(f);
                      setOpen(null);
                    }}
                    aria-pressed={filter === f}
                  >
                    {f}
                  </button>
                ),
              )}
            </div>
          </div>
          <div className="project-list">
            {projects.map(
              (p, i) =>
                (filter === "All projects" || filter === p.type) && (
                  <article className="project" key={p.name}>
                    <button
                      className="project-row"
                      onClick={() => setOpen(open === i ? null : i)}
                      aria-expanded={open === i}
                    >
                      <span className="project-number">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3>{p.name}</h3>
                      <span>{p.type}</span>
                      <span>{p.year}</span>
                      {open === i ? <Minus size={21} /> : <Plus size={21} />}
                    </button>
                    {open === i && (
                      <div className="project-expanded">
                        <img src={p.image} alt={p.name + " concept space"} />
                        <div>
                          <p>{p.description}</p>
                          <span>{p.place} · Concept project</span>
                          <a href="#contact" className="text-link">
                            Discuss a similar project <ArrowUpRight size={18} />
                          </a>
                        </div>
                      </div>
                    )}
                  </article>
                ),
            )}
          </div>
        </section>
        <section id="contact" className="contact">
          <div>
            <span className="section-label">
              A conversation is a beginning.
            </span>
            <h2>
              What are you
              <br />
              imagining?
            </h2>
            <ArrowUpRight className="contact-arrow" size={90} strokeWidth={1} />
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <label>
              Your name
              <input name="name" placeholder="Alex Morgan" required />
            </label>
            <label>
              Email address
              <input
                type="email"
                name="email"
                placeholder="alex@studio.com"
                required
              />
            </label>
            <label>
              A little about your project
              <textarea
                name="project"
                placeholder="A place, an idea, a possibility…"
                required
                rows={2}
              />
            </label>
            <button type="submit">
              Start a conversation <ArrowRight size={19} />
            </button>
            {sent && (
              <p className="form-message" role="status">
                Your concept inquiry is ready. This demo stores no information
                and sends no message.
              </p>
            )}
          </form>
        </section>
      </main>
      <footer>
        <a href="#" className="wordmark">
          forma<span>®</span>
        </a>
        <span>Fictional studio · An Elseform template</span>
        <a href="#">
          Back to top <ArrowUpRight size={15} />
        </a>
      </footer>
    </>
  );
}
