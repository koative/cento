import { useState } from "react";
import { ArrowUpRight, ArrowRight, Check, Waves } from "lucide-react";
const lessons = [
  {
    name: "Little ripples",
    age: "Children",
    time: "09:00",
    level: "Water confidence",
    days: ["Monday", "Wednesday", "Saturday"],
  },
  {
    name: "Find your flow",
    age: "Adults",
    time: "10:30",
    level: "Beginner technique",
    days: ["Monday", "Thursday", "Saturday"],
  },
  {
    name: "Lane makers",
    age: "Adults",
    time: "18:00",
    level: "Stroke development",
    days: ["Tuesday", "Thursday"],
  },
  {
    name: "Family splash",
    age: "Families",
    time: "11:30",
    level: "Shared water time",
    days: ["Saturday", "Sunday"],
  },
];
export default function App() {
  const [group, setGroup] = useState("Everyone"),
    [day, setDay] = useState("Saturday"),
    [chosen, setChosen] = useState(""),
    [saved, setSaved] = useState(false);
  const shown = lessons.filter(
    (x) => (group === "Everyone" || x.age === group) && x.days.includes(day),
  );
  return (
    <>
      <header>
        <a href="#" className="brand">
          <Waves size={26} /> ripple
        </a>
        <nav>
          <a href="#timetable">Find your lane</a>
          <a href="#approach">First time here?</a>
        </nav>
      </header>
      <main>
        <section className="ripple-opening">
          <h1>
            Water feels
            <br />
            better together.
          </h1>
          <div>
            <p>
              A little courage.
              <br />A patient teacher.
              <br />
              Your next great splash.
            </p>
            <a className="action" href="#timetable">
              Find your lesson <ArrowUpRight size={18} />
            </a>
          </div>
        </section>
        <section className="pool" aria-label="Animated swimming lane diagram">
          <div className="pool-top">
            <span>YOUR PACE. YOUR LANE.</span>
            <Waves size={26} />
          </div>
          {["Confidence", "Connection", "A little more freedom"].map((x, i) => (
            <div className={"lane lane-" + i} key={x}>
              <span>{x}</span>
              <div className="swimmer">
                <i />
                <b />
              </div>
              <em>{String(i + 1).padStart(2, "0")}</em>
            </div>
          ))}
          <div className="pool-bottom">
            <span>Small steps make strong swimmers.</span>
            <a href="#timetable" aria-label="View lesson timetable">
              <ArrowRight size={24} />
            </a>
          </div>
        </section>
        <section className="timetable" id="timetable">
          <div className="timetable-intro">
            <h2>
              There's a<br />
              lane for you.
            </h2>
            <p>
              Browse an example week. Filter by swimmer, choose a day, and save
              a lesson to your local plan.
            </p>
            <label>
              Who's making a splash?
              <select
                value={group}
                onChange={(e) => {
                  setGroup(e.target.value);
                  setChosen("");
                  setSaved(false);
                }}
              >
                {["Everyone", "Children", "Adults", "Families"].map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="schedule">
            <div className="week">
              {[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Saturday",
                "Sunday",
              ].map((x) => (
                <button
                  key={x}
                  aria-label={x}
                  aria-pressed={day === x}
                  onClick={() => {
                    setDay(x);
                    setChosen("");
                    setSaved(false);
                  }}
                >
                  {x.slice(0, 3)}
                </button>
              ))}
            </div>
            <h3>{day} in the pool</h3>
            {shown.length ? (
              shown.map((l) => (
                <button
                  className="lesson"
                  key={l.name}
                  aria-pressed={chosen === l.name}
                  onClick={() => {
                    setChosen(l.name);
                    setSaved(false);
                  }}
                >
                  <time>{l.time}</time>
                  <span>
                    <strong>{l.name}</strong>
                    <small>
                      {l.age} · {l.level}
                    </small>
                  </span>
                  {chosen === l.name ? (
                    <Check size={20} />
                  ) : (
                    <ArrowUpRight size={20} />
                  )}
                </button>
              ))
            ) : (
              <div className="empty">
                <p>No example lessons for this combination.</p>
                <button
                  onClick={() => {
                    setGroup("Everyone");
                    setDay("Saturday");
                  }}
                >
                  Show Saturday lessons
                </button>
              </div>
            )}
            <div className="booking">
              <p>
                {chosen
                  ? `${chosen} · ${day}`
                  : "Choose a lesson to make your plan."}
              </p>
              <button
                className="action"
                disabled={!chosen}
                onClick={() => setSaved(true)}
              >
                Save lesson plan
              </button>
            </div>
            <p role="status" className="status">
              {saved
                ? `${chosen} saved locally. No class booking was made.`
                : ""}
            </p>
          </div>
        </section>
        <section className="first-time" id="approach">
          <h2>
            Come as you are.
            <br />
            We'll start there.
          </h2>
          <div>
            <details open>
              <summary>Do I need to be a confident swimmer?</summary>
              <p>
                Not for beginner classes. In a real academy, tell the instructor
                about your experience and comfort level before entering the
                water.
              </p>
            </details>
            <details>
              <summary>What would I bring?</summary>
              <p>
                Suitable swimwear, a towel, and any pool-required equipment.
                Check the real venue's guidance before attending.
              </p>
            </details>
            <details>
              <summary>Can I book through this website?</summary>
              <p>
                This is a fictional academy and interactive template. Plans stay
                in your browser; no real lesson is reserved.
              </p>
            </details>
          </div>
        </section>
      </main>
      <footer>
        <a href="../../">Elseform collection</a>
        <p>
          Ripple is a fictional swimming academy. Timetables and lessons are
          examples.
        </p>
      </footer>
    </>
  );
}
