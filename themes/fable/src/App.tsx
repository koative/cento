import { useState } from "react";
import { ArrowUpRight, MoveUpRight, Sparkles, Plus, Minus } from "lucide-react";
import play from "./assets/play.jpg";
const sessions = [
  {
    name: "Make a magnificent mess",
    age: "3–6",
    time: "10:00",
    room: "The Colour Kitchen",
    description:
      "Paint with unusual tools, mix impossible colours and take home a very personal masterpiece.",
  },
  {
    name: "Build a better moon base",
    age: "7–11",
    time: "11:30",
    room: "The Big Ideas Lab",
    description:
      "Cardboard, connectors and a whole lot of imagination. Design a place to live somewhere entirely new.",
  },
  {
    name: "A story with no ending",
    age: "All ages",
    time: "14:00",
    room: "The Story Forest",
    description:
      "A story that changes with every voice. Step inside, choose a character and see where we all end up.",
  },
];
export default function App() {
  const [age, setAge] = useState("All ages"),
    [count, setCount] = useState(2),
    [chosen, setChosen] = useState("");
  const visible = sessions.filter(
    (s) => age === "All ages" || s.age === age || s.age === "All ages",
  );
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header>
        <a className="brand" href="#">
          fable<span>A MUSEUM FOR CURIOUS MINDS</span>
        </a>
        <nav>
          <a href="#play">What’s on</a>
          <a href="#visit">Your visit</a>
          <a className="ticket-link" href="#play">
            Let’s play <ArrowUpRight size={18} />
          </a>
        </nav>
      </header>
      <main id="main">
        <section className="hero">
          <div className="hero-copy">
            <h1>
              Small people.
              <br />
              Very <em>big</em>
              <br />
              ideas.
            </h1>
            <p>
              A museum where “what if?” is the beginning of everything. For
              children, their grown-ups, and anyone who still wonders.
            </p>
            <a href="#play">
              Find your next adventure <MoveUpRight size={22} />
            </a>
          </div>
          <div className="play-world">
            <div className="block b1" aria-hidden="true">
              ?
            </div>
            <div className="block b2" aria-hidden="true">
              <Sparkles size={65} />
            </div>
            <img
              src={play}
              alt="A colourful collection of toy building bricks"
            />
            <div className="play-label">
              PLEASE
              <br />
              TOUCH
              <br />
              EVERYTHING.
            </div>
            <div className="block b3" aria-hidden="true">
              !
            </div>
          </div>
        </section>
        <div className="ticker">
          <span>MAKE SOMETHING</span>
          <Sparkles size={22} />
          <span>ASK ANYTHING</span>
          <Sparkles size={22} />
          <span>TRY AGAIN</span>
          <Sparkles size={22} />
          <span>BE YOURSELF</span>
        </div>
        <section className="programme" id="play">
          <div className="programme-heading">
            <h2>
              What will you
              <br />
              wonder today?
            </h2>
            <div>
              <p>
                A little structure.
                <br />A lot of possibility.
              </p>
              <div className="filters" aria-label="Age groups">
                {["All ages", "3–6", "7–11"].map((a) => (
                  <button
                    key={a}
                    aria-pressed={age === a}
                    onClick={() => setAge(a)}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="sessions">
            {visible.map((s, i) => (
              <article key={s.name} className={"session s" + i}>
                <div className="session-meta">
                  <span>{s.time}</span>
                  <span>
                    {s.age === "All ages" ? "Everyone" : `Ages ${s.age}`}
                  </span>
                </div>
                <h3>{s.name}</h3>
                <p>{s.description}</p>
                <div className="session-room">{s.room}</div>
                <button
                  aria-pressed={chosen === s.name}
                  onClick={() => setChosen(chosen === s.name ? "" : s.name)}
                >
                  {chosen === s.name ? "Added to our day" : "Add to our day"}
                  <Plus size={19} />
                </button>
              </article>
            ))}
          </div>
          <div className="day-plan" aria-live="polite">
            <strong>
              {chosen ? "Your next big adventure" : "A day of possibilities"}
            </strong>
            <p>
              {chosen
                ? `${chosen} is on your family plan. No ticket has been booked.`
                : "Pick a workshop to start your family day plan."}
            </p>
          </div>
        </section>
        <section className="visit" id="visit">
          <div>
            <h2>
              Grown-up details.
              <br />
              Kid-sized fuss.
            </h2>
            <p>
              Wednesday–Sunday · 9:30–17:00
              <br />
              Little Lane, Wonderby · A fictional place with real possibilities.
            </p>
          </div>
          <div className="ticket">
            <h3>Your family day</h3>
            <div className="counter">
              <span>Visitors aged 3+</span>
              <div>
                <button
                  aria-label="Fewer visitors"
                  disabled={count === 1}
                  onClick={() => setCount(count - 1)}
                >
                  <Minus size={16} />
                </button>
                <strong>{count}</strong>
                <button
                  aria-label="More visitors"
                  disabled={count === 8}
                  onClick={() => setCount(count + 1)}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            <p className="total">
              £{count * 12}
              <span>sample family total</span>
            </p>
            <small>Under 3s visit free. Illustrative prices only.</small>
          </div>
        </section>
      </main>
      <footer>
        <a href="#" className="brand">
          fable
        </a>
        <p>Fictional children’s museum · Local family planner · Koative</p>
        <a href="#play">Go be curious ↗</a>
      </footer>
    </>
  );
}
