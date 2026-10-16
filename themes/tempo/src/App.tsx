import { useState } from "react";
import { ArrowUpRight, ArrowRight, MoveUpRight } from "lucide-react";
import dance from "./assets/dance.jpg";
const classes = [
  {
    name: "House foundations",
    style: "House",
    day: "Monday",
    time: "18:00",
    teacher: "Maya",
    level: "Open level",
  },
  {
    name: "Contemporary flow",
    style: "Contemporary",
    day: "Monday",
    time: "19:30",
    teacher: "Jules",
    level: "All bodies",
  },
  {
    name: "House after dark",
    style: "House",
    day: "Wednesday",
    time: "20:00",
    teacher: "Eli",
    level: "Intermediate",
  },
  {
    name: "Freestyle lab",
    style: "Freestyle",
    day: "Thursday",
    time: "18:30",
    teacher: "Maya",
    level: "Open level",
  },
  {
    name: "Contemporary floorwork",
    style: "Contemporary",
    day: "Saturday",
    time: "11:00",
    teacher: "Jules",
    level: "Beginner friendly",
  },
];
export default function App() {
  const [filter, setFilter] = useState("All");
  const [chosen, setChosen] = useState("");
  return (
    <>
      <header>
        <a className="brand" href="#">
          tempo<sup>®</sup>
        </a>
        <nav aria-label="Main">
          <a href="#classes">Classes</a>
          <a href="#studio">The studio</a>
        </nav>
        <a className="header-cta" href="#classes">
          Find your rhythm <ArrowUpRight size={16} />
        </a>
      </header>
      <main>
        <section className="dance-poster">
          <div className="poster-type">
            <h1>
              MAKE
              <br />
              <span>YOUR</span>
              <br />
              MOVE.
            </h1>
            <MoveUpRight
              className="big-arrow"
              strokeWidth={0.8}
              aria-hidden="true"
            />
          </div>
          <figure>
            <img src={dance} alt="Dancers moving together in a bright studio" />
            <figcaption>
              A little less thinking. A little more feeling.
            </figcaption>
          </figure>
          <div className="poster-bottom">
            <p>
              A dance space for every body.
              <br />
              Come as you are. Leave a little louder.
            </p>
            <a href="#classes">
              Meet us on the floor
              <ArrowRight size={20} />
            </a>
          </div>
        </section>
        <div className="rhythm-band" aria-hidden="true">
          <span>NO PERFECT MOVES</span>
          <span>JUST YOURS</span>
          <span>NO PERFECT MOVES</span>
        </div>
        <section id="classes" className="timetable">
          <div className="section-head">
            <h2>
              This week.
              <br />
              Your beat.
            </h2>
            <p>
              One room. Different energies.
              <br />
              Choose a class and preview your place.
            </p>
          </div>
          <div className="filters" aria-label="Dance style">
            {["All", "House", "Contemporary", "Freestyle"].map((x) => (
              <button
                key={x}
                aria-pressed={filter === x}
                onClick={() => setFilter(x)}
              >
                {x}
              </button>
            ))}
          </div>
          <div className="class-list">
            {classes
              .filter((c) => filter === "All" || c.style === filter)
              .map((c) => (
                <article key={c.name}>
                  <div>
                    <span>{c.day}</span>
                    <b>{c.time}</b>
                  </div>
                  <div>
                    <h3>{c.name}</h3>
                    <p>
                      {c.level} · with {c.teacher} · 60 min
                    </p>
                  </div>
                  <button
                    onClick={() => setChosen(c.name)}
                    aria-label={`Choose ${c.name}`}
                  >
                    {chosen === c.name ? "Selected" : "Join class"}
                    <ArrowUpRight size={17} />
                  </button>
                </article>
              ))}
          </div>
          <p className="status" role="status">
            {chosen
              ? `${chosen} is on your plan. £16 drop-in. Demo only — your place has not been booked.`
              : "All classes are fictional demonstration sessions. No experience or perfect outfit required."}
          </p>
        </section>
        <section id="studio" className="studio">
          <h2>
            Find your people.
            <br />
            Lose the count.
          </h2>
          <div>
            <p>
              Tempo is an imagined neighbourhood studio built around the good
              feeling of moving together. No mirrors to impress. No front row to
              earn. Just music, a welcoming floor, and a teacher who meets you
              where you are.
            </p>
            <a href="#classes">
              A first class is a good start <ArrowUpRight size={18} />
            </a>
          </div>
        </section>
      </main>
      <footer>
        <strong>tempo — MOVE WITH FEELING</strong>
        <p>
          Fictional dance studio template by Koative. All class selections are
          local previews.
        </p>
      </footer>
    </>
  );
}
