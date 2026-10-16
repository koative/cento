import { useState } from "react";
import { ArrowUpRight, ArrowRight, Waves, Sun, Wind } from "lucide-react";
import surf from "./assets/surf.jpg";
const levels = [
  {
    name: "First wave",
    tag: "Never surfed",
    duration: "2 hours",
    price: 55,
    copy: "Meet the board, read the beach, and find your feet in the whitewater. No experience needed.",
  },
  {
    name: "Find your line",
    tag: "A little experience",
    duration: "2.5 hours",
    price: 70,
    copy: "Build confidence beyond the whitewater. Work on timing, positioning, and a smoother ride.",
  },
  {
    name: "Go a little deeper",
    tag: "Confident surfer",
    duration: "3 hours",
    price: 95,
    copy: "A small-group session focused on wave selection, turning, and making the most of the conditions.",
  },
];
export default function App() {
  const [level, setLevel] = useState(0);
  const [day, setDay] = useState("Saturday 17 Oct");
  const [people, setPeople] = useState(1);
  const [summary, setSummary] = useState("");
  const lesson = levels[level];
  return (
    <>
      <header>
        <a className="brand" href="#">
          drift
          <Waves size={28} />
        </a>
        <nav aria-label="Main">
          <a href="#lessons">Get in the water</a>
          <a href="#field-notes">Field notes</a>
        </nav>
        <span>SURF SLOW. FEEL MORE.</span>
      </header>
      <main>
        <section className="coast">
          <img
            src={surf}
            alt="Surfer carrying a board along the edge of the ocean"
          />
          <div className="coast-title">
            <h1>
              More salt.
              <br />
              Less rush.
            </h1>
            <p>
              Learn the ocean's rhythm.
              <br />
              Find a little of your own.
            </p>
            <a href="#lessons">
              Your first wave starts here <ArrowUpRight size={20} />
            </a>
          </div>
          <div className="coast-coordinate">
            <span>WEST COAST / OPEN WATER</span>
            <span>A SURF SCHOOL FOR THE CURIOUS</span>
          </div>
        </section>
        <div className="conditions">
          <span>AN ILLUSTRATIVE MORNING</span>
          <div>
            <Waves size={22} />
            <p>
              <b>2–3 ft</b>Friendly swell
            </p>
          </div>
          <div>
            <Wind size={22} />
            <p>
              <b>Light offshore</b>Easy on the face
            </p>
          </div>
          <div>
            <Sun size={22} />
            <p>
              <b>18°C</b>Wetsuit weather
            </p>
          </div>
          <small>
            Demo conditions.
            <br />
            Check local forecasts before surfing.
          </small>
        </div>
        <section className="lessons" id="lessons">
          <div className="lesson-heading">
            <h2>
              There's a wave
              <br />
              with your name on it.
            </h2>
            <p>
              Start where you are. We will take it from there.
              <br />
              All lesson details are fictional examples.
            </p>
          </div>
          <div className="lesson-layout">
            <div className="lesson-choices">
              {levels.map((l, i) => (
                <button
                  key={l.name}
                  aria-pressed={level === i}
                  onClick={() => {
                    setLevel(i);
                    setSummary("");
                  }}
                >
                  <span>{l.tag}</span>
                  <b>{l.name}</b>
                  <ArrowRight size={22} />
                </button>
              ))}
            </div>
            <div className="lesson-detail">
              <span className="duration">
                {lesson.duration} / BOARD + WETSUIT INCLUDED
              </span>
              <h3>{lesson.name}</h3>
              <p>{lesson.copy}</p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSummary(
                    `${lesson.name} for ${people} ${people === 1 ? "person" : "people"} on ${day}: £${lesson.price * people}. Demo only — no lesson booked.`,
                  );
                }}
              >
                <div className="form-row">
                  <label>
                    Your day
                    <select
                      value={day}
                      onChange={(e) => {
                        setDay(e.target.value);
                        setSummary("");
                      }}
                    >
                      <option>Saturday 17 Oct</option>
                      <option>Sunday 18 Oct</option>
                      <option>Saturday 24 Oct</option>
                    </select>
                  </label>
                  <label>
                    Your crew
                    <select
                      value={people}
                      onChange={(e) => {
                        setPeople(Number(e.target.value));
                        setSummary("");
                      }}
                    >
                      {[1, 2, 3, 4].map((n) => (
                        <option value={n} key={n}>
                          {n} {n === 1 ? "person" : "people"}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <button type="submit">
                  Preview lesson · £{lesson.price * people}
                  <ArrowUpRight size={19} />
                </button>
                <p role="status" className="status">
                  {summary ||
                    "A local preview. No payment, booking, or personal information required."}
                </p>
              </form>
            </div>
          </div>
        </section>
        <section className="field-notes" id="field-notes">
          <div className="wave-art" aria-hidden="true">
            <svg viewBox="0 0 500 280" fill="none" stroke="currentColor">
              {Array.from({ length: 12 }, (_, i) => (
                <path
                  key={i}
                  d={`M-30 ${80 + i * 15} Q100 ${-80 + i * 20} 250 ${110 + i * 12} T530 ${70 + i * 16}`}
                  strokeWidth="1.4"
                />
              ))}
            </svg>
          </div>
          <div>
            <h2>
              The ocean is
              <br />
              the teacher.
            </h2>
            <p>
              We are just here to help you listen. Drift is an imagined surf
              school with a patient approach, small groups, and a belief that a
              good session is about more than standing up.
            </p>
            <details>
              <summary>What should I bring?</summary>
              <p>
                A swimsuit, towel, water, sunscreen, and warm clothes for
                afterwards. The demo lesson includes a board and wetsuit.
              </p>
            </details>
            <details>
              <summary>Do I need to be a strong swimmer?</summary>
              <p>
                Surfing requires water confidence and swimming ability. Discuss
                your ability and local conditions with a qualified instructor
                before joining a real lesson.
              </p>
            </details>
          </div>
        </section>
      </main>
      <footer>
        <strong>drift / SEE YOU OUT THERE</strong>
        <p>
          Fictional surf school by Koative. Forecast, lessons and availability
          are illustrative.
        </p>
      </footer>
    </>
  );
}
