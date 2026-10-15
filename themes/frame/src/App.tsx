import { useState } from "react";
import {
  ArrowUpRight,
  Grid2X2,
  Rows3,
  ArrowLeft,
  ArrowRight,
  Aperture,
} from "lucide-react";
import coast from "./assets/coast.jpg";
import city from "./assets/city.jpg";
import portrait from "./assets/portrait.jpg";
const projects = [
  {
    title: "Where the earth exhales",
    category: "Landscape",
    place: "The highlands",
    image: coast,
    text: "A study of distance, weather, and the almost invisible line between the two. Some places ask you to say less.",
    year: "2026",
  },
  {
    title: "After the last train",
    category: "Urban",
    place: "The city, after dark",
    image: city,
    text: "The city takes a breath between one day and the next. A collection of quiet encounters with the electric night.",
    year: "2025",
  },
  {
    title: "In her own light",
    category: "Portrait",
    place: "Studio sessions",
    image: portrait,
    text: "An unhurried portrait study. Natural light, open conversation, and the space to be entirely yourself.",
    year: "2026",
  },
];
export default function App() {
  const [active, setActive] = useState(0);
  const [category, setCategory] = useState("All work");
  const [layout, setLayout] = useState("grid");
  const [contact, setContact] = useState(false);
  const project = projects[active];
  const visible = projects.filter(
    (p) => category === "All work" || p.category === category,
  );
  return (
    <>
      <header>
        <a className="wordmark" href="#">
          frame<span>®</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#work">Selected work</a>
          <a href="#about">The practice</a>
          <a href="#contact">
            Get in touch <ArrowUpRight size={14} />
          </a>
        </nav>
        <span className="availability">Independent image making</span>
      </header>
      <main>
        <section className="opening" aria-label="Featured project">
          <div className="intro">
            <h1>
              A way of
              <br />
              <em>seeing.</em>
            </h1>
            <p>
              Photography & art direction.
              <br />
              For the moments that stay.
            </p>
            <div className="edition">
              <Aperture size={29} strokeWidth={1} />
              <span>
                Selected photographs
                <br />
                2025 — 2026
              </span>
            </div>
          </div>
          <div className="feature">
            <img key={project.image} src={project.image} alt={project.title} />
            <div className="image-shade" />
            <div className="feature-info">
              <div>
                <span>{project.place}</span>
                <h2>{project.title}</h2>
              </div>
              <a href="#work" aria-label="Explore selected photographs">
                <ArrowUpRight size={34} />
              </a>
            </div>
            <div className="counter">
              <span>{String(active + 1).padStart(2, "0")} / 03</span>
              <button
                aria-label="Previous photograph"
                onClick={() => setActive((active + 2) % 3)}
              >
                <ArrowLeft size={18} />
              </button>
              <button
                aria-label="Next photograph"
                onClick={() => setActive((active + 1) % 3)}
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </section>
        <section id="work" className="work">
          <div className="section-head">
            <h2>Contact sheet</h2>
            <span>Three stories. Many ways to look.</span>
          </div>
          <div className="toolbar">
            <div className="filters" aria-label="Photography categories">
              {["All work", "Landscape", "Urban", "Portrait"].map((c) => (
                <button
                  key={c}
                  aria-pressed={c === category}
                  onClick={() => setCategory(c)}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="layout">
              <button
                aria-label="Grid layout"
                aria-pressed={layout === "grid"}
                onClick={() => setLayout("grid")}
              >
                <Grid2X2 size={18} />
              </button>
              <button
                aria-label="List layout"
                aria-pressed={layout === "list"}
                onClick={() => setLayout("list")}
              >
                <Rows3 size={19} />
              </button>
            </div>
          </div>
          <div
            className={`projects ${layout}`}
            aria-label="Photography projects"
          >
            {visible.map((p) => (
              <button
                className="project"
                key={p.title}
                aria-pressed={project.title === p.title}
                onClick={() => {
                  setActive(projects.indexOf(p));
                  document.querySelector(".opening")?.scrollIntoView({
                    behavior: window.matchMedia(
                      "(prefers-reduced-motion: reduce)",
                    ).matches
                      ? "auto"
                      : "smooth",
                  });
                }}
              >
                <div className="project-image">
                  <img src={p.image} alt={p.title} loading="lazy" />
                  <ArrowUpRight className="project-arrow" size={25} />
                </div>
                <div className="project-meta">
                  <h3>{p.title}</h3>
                  <span>
                    {p.category} / {p.year}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>
        <section id="about" className="about">
          <span>Behind the frame</span>
          <div>
            <h2>
              Attention is
              <br />
              the whole practice.
            </h2>
            <p>
              Frame is a fictional independent photography practice exploring
              the relationship between people, places, and the light that
              connects them. The work moves slowly. The feeling lasts.
            </p>
            <p className="project-note">Currently on view: {project.text}</p>
          </div>
        </section>
        <section id="contact" className="contact">
          <h2>
            Have something
            <br />
            <em>in mind?</em>
          </h2>
          <button onClick={() => setContact(!contact)} aria-expanded={contact}>
            Let's make a picture <ArrowUpRight size={24} />
          </button>
          {contact && (
            <p role="status">
              Your next project starts with a conversation. This is a template
              demo; connect this button to your studio email or inquiry form.
            </p>
          )}
        </section>
      </main>
      <footer>
        <span>FRAME — A Koative template</span>
        <span>Fictional studio. Real attention to detail.</span>
        <a href="#">Back to top ↑</a>
      </footer>
    </>
  );
}
