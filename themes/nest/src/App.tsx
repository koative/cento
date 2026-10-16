import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Sun,
  BookOpen,
  Leaf,
  Moon,
  Check,
  Blocks,
} from "lucide-react";
import play from "./assets/play.jpg";
const programs = [
  {
    name: "Little explorers",
    age: "18 months–3 years",
    times: [
      ["09:00", "A gentle hello", "Settle in, find a familiar face."],
      ["10:00", "Hands-on discovery", "Textures, colors and little surprises."],
      ["12:00", "Lunch & quiet time", "A shared meal, then room to rest."],
      ["14:00", "Outside together", "Fresh air and a little adventure."],
    ],
  },
  {
    name: "Big wonderers",
    age: "3–5 years",
    times: [
      ["09:00", "Morning circle", "Stories, songs and what comes next."],
      ["10:00", "Make & imagine", "Build a world with your own ideas."],
      ["12:00", "Lunch & recharge", "Good food and a peaceful pause."],
      ["14:00", "Garden discoveries", "Follow curiosity into the outdoors."],
    ],
  },
];
export default function App() {
  const [group, setGroup] = useState(0);
  const [day, setDay] = useState("Tuesday morning");
  const [name, setName] = useState("");
  const [done, setDone] = useState(false);
  const icons = [Sun, Blocks, Moon, Leaf];
  return (
    <>
      <header>
        <a href="#" className="brand">
          <span className="nest-mark" aria-hidden="true" />
          nest
        </a>
        <nav>
          <a href="#day">A day at nest</a>
          <a href="#approach">Our approach</a>
        </nav>
        <a href="#visit" className="visit-link">
          Come say hello <ArrowUpRight size={16} />
        </a>
      </header>
      <main>
        <section className="welcome">
          <div className="welcome-type">
            <h1>
              Small people.
              <br />
              Big <em>wonder.</em>
            </h1>
            <p>
              A place to feel at home,
              <br />
              and a little world to discover.
            </p>
            <a className="btn" href="#day">
              Step into our day <ArrowRight size={18} />
            </a>
            <div className="shape-row" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          </div>
          <div className="photo-block">
            <img
              src={play}
              alt="A bright play space with colorful toys and learning materials"
            />
            <span className="photo-note">
              Room to play.
              <br />
              Space to grow.
            </span>
          </div>
        </section>
        <section className="approach" id="approach">
          <h2>
            Childhood is
            <br />
            <em>not a race.</em>
          </h2>
          <div>
            <p>
              It's a puddle to jump in. A story to tell twice. A tower that
              falls down, and goes up again.
            </p>
            <p>
              At our fictional early-years studio, we make room for the everyday
              magic of learning through play.
            </p>
            <a href="#visit">
              Get to know our little world <ArrowUpRight size={18} />
            </a>
          </div>
        </section>
        <section className="day" id="day">
          <div className="day-heading">
            <h2>
              A little rhythm.
              <br />A lot of possibility.
            </h2>
            <div className="age-tabs">
              {programs.map((p, i) => (
                <button
                  key={p.name}
                  aria-pressed={group === i}
                  onClick={() => {
                    setGroup(i);
                    setDone(false);
                  }}
                >
                  {p.name}
                  <small>{p.age}</small>
                </button>
              ))}
            </div>
          </div>
          <div className="timetable">
            {programs[group].times.map(([time, title, text], i) => {
              const Icon = icons[i];
              return (
                <article key={title}>
                  <span>{time}</span>
                  <Icon size={34} />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              );
            })}
          </div>
          <p className="schedule-note">
            An illustrative day, with plenty of flexibility. Every child finds
            their own rhythm.
          </p>
        </section>
        <section className="visit" id="visit">
          <div>
            <h2>
              Come as you are.
              <br />
              <em>Bring your questions.</em>
            </h2>
            <p>
              Explore a visit to our fictional studio. Use demo details; this
              form does not send information or make a booking.
            </p>
            <div className="hello-art" aria-hidden="true">
              <span>h</span>
              <span>e</span>
              <span>l</span>
              <span>l</span>
              <span>o</span>
            </div>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setDone(true);
            }}
          >
            <label>
              Your name
              <input
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setDone(false);
                }}
                placeholder="Alex Morgan"
              />
            </label>
            <label>
              Program
              <select
                value={group}
                onChange={(e) => {
                  setGroup(Number(e.target.value));
                  setDone(false);
                }}
              >
                {programs.map((p, i) => (
                  <option value={i} key={p.name}>
                    {p.name} · {p.age}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Preferred visit
              <select
                value={day}
                onChange={(e) => {
                  setDay(e.target.value);
                  setDone(false);
                }}
              >
                <option>Tuesday morning</option>
                <option>Wednesday afternoon</option>
                <option>Friday morning</option>
              </select>
            </label>
            <button className="btn">
              Preview our visit <ArrowRight size={18} />
            </button>
            {done && (
              <p role="status">
                <Check size={18} /> Hello, {name}. Your demo visit:{" "}
                {programs[group].name}, {day.toLowerCase()}. Nothing was booked.
              </p>
            )}
          </form>
        </section>
      </main>
      <footer>
        <span>Nest · Fictional childcare template</span>
        <a href="../../">Elseform collection</a>
      </footer>
    </>
  );
}
