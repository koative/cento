import { useState } from "react";
import { ArrowUpRight, Wind, Mountain, ArrowDown } from "lucide-react";
import mountain from "./assets/mountains.jpg";
const flights = [
  {
    name: "First flight",
    time: "20–30 min",
    height: "1,400 m",
    price: 160,
    detail:
      "A gentle introduction to a completely different perspective. Fly tandem with your instructor; your only job is to look around.",
    launch: "Meadow launch",
    level: "No experience needed",
  },
  {
    name: "The long glide",
    time: "40–60 min",
    height: "1,900 m",
    price: 240,
    detail:
      "Follow the rising air and spend a little longer above it all. A more expansive tandem flight along the mountain ridge.",
    launch: "Ridge launch",
    level: "For the quietly adventurous",
  },
  {
    name: "Learn to fly",
    time: "3 days",
    height: "Ground to sky",
    price: 690,
    detail:
      "Meet the wing, understand the wind and make your first supervised flights. A small-group introduction built around confidence.",
    launch: "Training meadow",
    level: "Beginner course",
  },
];
export default function App() {
  const [flight, setFlight] = useState(0),
    [month, setMonth] = useState("June"),
    [saved, setSaved] = useState(false);
  let f = flights[flight];
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header>
        <a className="brand" href="#">
          <Mountain size={27} />
          ASCENT
        </a>
        <nav>
          <a href="#flights">Find your flight</a>
          <a href="#ground">Before you fly</a>
          <span>46°36′ N · ABOVE THE EVERYDAY</span>
        </nav>
      </header>
      <main id="main">
        <section className="panorama">
          <img
            src={mountain}
            alt="An immense alpine mountain range under a clear sky"
          />
          <div className="panorama-title">
            <h1>
              The world
              <br />
              looks different
              <br />
              <em>from up here.</em>
            </h1>
            <a href="#flights">
              Take the first step <ArrowUpRight size={21} />
            </a>
          </div>
          <div className="altitude">
            <Wind size={23} />
            <span>
              LESS NOISE.
              <br />
              MORE SKY.
            </span>
          </div>
          <div className="panorama-bottom">
            <p>
              Tandem flights & first adventures.
              <br />A small paragliding school with a big backyard.
            </p>
            <a href="#flights" aria-label="Explore flights">
              <ArrowDown size={27} />
            </a>
          </div>
        </section>
        <section className="flight-section" id="flights">
          <div className="flight-heading">
            <h2>
              YOUR KIND
              <br />
              OF <em>UP.</em>
            </h2>
            <p>
              There is no one way to begin.
              <br />
              Find the flight that feels like you.
            </p>
          </div>
          <div className="flight-picker">
            {flights.map((v, i) => (
              <button
                key={v.name}
                aria-pressed={flight === i}
                onClick={() => {
                  setFlight(i);
                  setSaved(false);
                }}
              >
                {v.name}
                <span>{v.time}</span>
              </button>
            ))}
          </div>
          <div className="flight-detail" aria-live="polite">
            <div className="flight-story">
              <h3>{f.name}</h3>
              <p>{f.detail}</p>
              <div className="flight-facts">
                <div>
                  <span>Time in the air</span>
                  <strong>{f.time}</strong>
                </div>
                <div>
                  <span>Launch altitude</span>
                  <strong>{f.height}</strong>
                </div>
                <div>
                  <span>Starting point</span>
                  <strong>{f.launch}</strong>
                </div>
              </div>
              <span className="level">{f.level}</span>
            </div>
            <div className="flight-plan">
              <label>
                When are you thinking?
                <select
                  value={month}
                  onChange={(e) => {
                    setMonth(e.target.value);
                    setSaved(false);
                  }}
                >
                  {["May", "June", "July", "August", "September"].map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                </select>
              </label>
              <div className="price">
                <strong>€{f.price}</strong>
                <span>per person · illustrative price</span>
              </div>
              <button onClick={() => setSaved(true)}>
                {saved ? "Flight added to your plan" : "Plan my flight"}
                <ArrowUpRight size={19} />
              </button>
              <p>
                {saved
                  ? `${f.name} in ${month}. A sample adventure, not a confirmed flight.`
                  : "Your local plan is a starting point. No booking or payment."}
              </p>
            </div>
          </div>
        </section>
        <section className="ground" id="ground">
          <h2>
            GOOD FLIGHTS
            <br />
            START ON THE GROUND.
          </h2>
          <div>
            {[
              [
                "A little preparation",
                "Comfortable layers, sturdy shoes and a willingness to try something new. Your instructor provides the rest.",
              ],
              [
                "The weather has a say",
                "Flying is always weather dependent. Real operators assess conditions before every flight and may reschedule.",
              ],
              [
                "A human pace",
                "We talk through each step before you leave the ground. Questions are welcome, and there is never a rush.",
              ],
            ].map(([h, p]) => (
              <article key={h}>
                <h3>{h}</h3>
                <p>{p}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <footer>
        <a className="brand" href="#">
          ASCENT
        </a>
        <p>
          Fictional flight school · Illustrative experiences, not flight advice
          · Koative
        </p>
        <a href="#flights">See you up there ↗</a>
      </footer>
    </>
  );
}
