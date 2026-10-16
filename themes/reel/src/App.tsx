import { useState } from "react";
import { ArrowUpRight, Play, Pause } from "lucide-react";
import coast from "./assets/coast.jpg";
import forest from "./assets/forest.jpg";
import city from "./assets/city.jpg";
const films = [
  {
    title: "Where the water ends",
    kind: "Landscape",
    year: "2026",
    length: "18 min",
    image: coast,
    copy: "On a disappearing coastline, three generations of one family measure time in tides. A quiet study of belonging, and the places we cannot keep.",
  },
  {
    title: "A language of leaves",
    kind: "People",
    year: "2025",
    length: "24 min",
    image: forest,
    copy: "A forest keeper returns to the same woodland every morning. Listening becomes a way of understanding the world — and our place within it.",
  },
  {
    title: "Between buildings",
    kind: "People",
    year: "2026",
    length: "32 min",
    image: city,
    copy: "The small rituals that make a city feel like home. An intimate portrait of strangers whose ordinary days overlap in unexpected ways.",
  },
];
export default function App() {
  const [active, setActive] = useState(0),
    [screening, setScreening] = useState(false),
    [filter, setFilter] = useState("All films");
  let film = films[active];
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header>
        <a className="wordmark" href="#">
          reel<span>INDEPENDENT FILM STUDIO</span>
        </a>
        <nav>
          <a href="#films">Films</a>
          <a href="#studio">Studio</a>
          <a href="mailto:hello@example.com">
            Start a conversation <ArrowUpRight size={16} />
          </a>
        </nav>
      </header>
      <main id="main">
        <div className="intro">
          <h1>
            Look closer.
            <br />
            Stay longer.
          </h1>
          <p>
            Documentary films for a world
            <br />
            that deserves our attention.
          </p>
          <span className="edition">
            SELECTED WORK
            <br />
            2025—2026
          </span>
        </div>
        <section
          className={`screen ${screening ? "screening" : ""}`}
          aria-label="Film screening room"
        >
          <img src={film.image} alt={film.title + " documentary still"} />
          <div className="screen-edge">
            <span>REEL ORIGINAL</span>
            <span>
              {film.year} / {film.length}
            </span>
          </div>
          <div className="screen-title">
            <h2>{film.title}</h2>
            <button
              onClick={() => setScreening(!screening)}
              aria-label={
                screening ? "Pause visual screening" : "Start visual screening"
              }
            >
              {screening ? <Pause /> : <Play />}
              <span>
                {screening ? "Pause visual screening" : "Enter the film"}
              </span>
            </button>
          </div>
          {screening && (
            <p className="caption" aria-live="polite">
              A visual study. A place remembered through its smallest details.
            </p>
          )}
          <div className="timeline" aria-hidden="true">
            <i />
          </div>
        </section>
        <div className="screen-detail">
          <p>{film.copy}</p>
          <span>
            {screening
              ? "Silent visual screening · no video or audio"
              : "Select a film below to explore the story"}
          </span>
        </div>
        <section className="film-index" id="films">
          <div className="index-head">
            <h2>Our films</h2>
            <div className="filters" aria-label="Film categories">
              {["All films", "Landscape", "People"].map((f) => (
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
          {films.map(
            (f, i) =>
              (filter === "All films" || f.kind === filter) && (
                <button
                  className="film-row"
                  key={f.title}
                  aria-pressed={active === i}
                  onClick={() => {
                    setActive(i);
                    setScreening(false);
                  }}
                >
                  <img src={f.image} alt="" />
                  <span className="film-name">
                    {f.title}
                    <small>{f.kind} / A Reel original</small>
                  </span>
                  <span>{f.year}</span>
                  <span>{f.length}</span>
                  <ArrowUpRight size={24} />
                </button>
              ),
          )}
        </section>
        <section className="studio" id="studio">
          <h2>
            We make room
            <br />
            for the real.
          </h2>
          <div>
            <p>
              We are a small documentary studio interested in the moments
              between the headlines. Observant filmmaking. Human stories. A
              point of view that starts with listening.
            </p>
            <a href="mailto:hello@example.com">
              Tell us what you’re thinking <ArrowUpRight size={18} />
            </a>
          </div>
        </section>
      </main>
      <footer>
        <span>reel © 2026</span>
        <p>
          Fictional film studio · Imagined stories and visual screenings ·
          Koative
        </p>
        <a href="#">Back to the opening ↑</a>
      </footer>
    </>
  );
}
