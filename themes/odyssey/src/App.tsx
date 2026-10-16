import { useState } from "react";
import {
  ArrowUpRight,
  MapPin,
  Plus,
  Check,
  ArrowRight,
  Compass,
  Minus,
} from "lucide-react";
import coast from "./assets/coast.jpg";
import town from "./assets/town.jpg";
const days = [
  {
    name: "Arrive & wander",
    items: [
      { name: "A slow morning in the old town", time: "09:00", type: "Walk" },
      { name: "Lunch beside the harbor", time: "13:00", type: "Food" },
      { name: "Sunset from the headland", time: "18:00", type: "View" },
    ],
  },
  {
    name: "Follow the coastline",
    items: [
      { name: "Coastal path to the lighthouse", time: "08:30", type: "Walk" },
      { name: "A quiet cove and a long swim", time: "12:00", type: "Coast" },
      { name: "Dinner at the neighborhood table", time: "19:00", type: "Food" },
    ],
  },
  {
    name: "Leave a little open",
    items: [
      { name: "Coffee and the morning market", time: "09:30", type: "Food" },
      { name: "An afternoon without a plan", time: "14:00", type: "Pause" },
      { name: "One last look at the water", time: "17:00", type: "View" },
    ],
  },
];
export default function App() {
  const [day, setDay] = useState(0);
  const [plan, setPlan] = useState<string[]>([]);
  const [packed, setPacked] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  return (
    <>
      <header>
        <a className="brand" href="#">
          <Compass size={26} />
          odyssey
        </a>
        <nav>
          <a href="#itinerary">The itinerary</a>
          <a href="#packing">Before you go</a>
        </nav>
        <span>A little further from ordinary.</span>
      </header>
      <main>
        <section className="destination">
          <img
            src={coast}
            alt="Rocky coastline with turquoise water and a distant bridge"
          />
          <div className="destination-copy">
            <h1>
              Take the
              <br />
              <em>long way.</em>
            </h1>
            <p>
              A three-day coastal escape.
              <br />
              Less rushing. More remembering.
            </p>
            <a href="#itinerary">
              Make it your trip <ArrowUpRight size={21} />
            </a>
          </div>
          <span className="destination-note">
            A fictional travel journal · Illustrative itinerary
          </span>
        </section>
        <section className="intro">
          <h2>
            A place is more
            <br />
            than its highlights.
          </h2>
          <p>
            Leave room for the side street, the second coffee, the conversation
            you didn't plan. This itinerary is a starting point. The best bits
            are yours to find.
          </p>
          <span>
            3 days
            <br />
            <small>One good feeling.</small>
          </span>
        </section>
        <section className="itinerary" id="itinerary">
          <div className="trip-head">
            <h2>Your days, your way.</h2>
            <span>{plan.length} stops in your trip</span>
          </div>
          <div className="planner">
            <div>
              <div className="day-tabs">
                {days.map((d, i) => (
                  <button
                    key={d.name}
                    aria-pressed={day === i}
                    onClick={() => setDay(i)}
                  >
                    Day {i + 1}
                    <span>{d.name}</span>
                  </button>
                ))}
              </div>
              <div className="day-plan" key={day}>
                {days[day].items.map((x, i) => (
                  <article key={x.name}>
                    <span className="time">{x.time}</span>
                    <div>
                      <small>{x.type}</small>
                      <h3>{x.name}</h3>
                      <p>
                        {
                          [
                            "Start with curiosity. See where the first turn takes you.",
                            "Make time to sit, look around and enjoy where you are.",
                            "Let the day finish at its own pace.",
                          ][i]
                        }
                      </p>
                    </div>
                    <button
                      aria-label={
                        (plan.includes(x.name) ? "Remove " : "Add ") + x.name
                      }
                      onClick={() => {
                        setPlan(
                          plan.includes(x.name)
                            ? plan.filter((n) => n !== x.name)
                            : [...plan, x.name],
                        );
                        setDone(false);
                      }}
                    >
                      {plan.includes(x.name) ? (
                        <Check size={22} />
                      ) : (
                        <Plus size={22} />
                      )}
                    </button>
                  </article>
                ))}
              </div>
            </div>
            <aside>
              <img src={town} alt="A sunlit coastal village street" />
              <div>
                <h3>Your little escape</h3>
                {plan.length ? (
                  <ul>
                    {plan.map((p) => (
                      <li key={p}>
                        <span>{p}</span>
                        <button
                          aria-label={"Remove " + p + " from summary"}
                          onClick={() => {
                            setPlan(plan.filter((n) => n !== p));
                            setDone(false);
                          }}
                        >
                          <Minus size={15} />
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>
                    Add a few stops from the itinerary. Keep space for the
                    unexpected.
                  </p>
                )}
                <button
                  className="btn"
                  disabled={!plan.length}
                  onClick={() => setDone(true)}
                >
                  Save this itinerary <ArrowRight size={17} />
                </button>
                {done && (
                  <p role="status">
                    Your {plan.length}-stop demo itinerary is saved for this
                    session. No travel is booked.
                  </p>
                )}
              </div>
            </aside>
          </div>
        </section>
        <section className="packing" id="packing">
          <div>
            <h2>
              Bring less.
              <br />
              <em>Notice more.</em>
            </h2>
            <p>
              A little checklist for a slower kind of trip.
              <br />
              Practical details are illustrative, not travel advice.
            </p>
          </div>
          <div>
            {[
              "Comfortable walking shoes",
              "A book you want to finish",
              "A reusable water bottle",
              "Room for a little spontaneity",
            ].map((x) => (
              <label key={x}>
                <input
                  type="checkbox"
                  checked={packed.includes(x)}
                  onChange={() =>
                    setPacked(
                      packed.includes(x)
                        ? packed.filter((p) => p !== x)
                        : [...packed, x],
                    )
                  }
                />
                <span>{x}</span>
              </label>
            ))}
            <span className="packed-count">
              {packed.length} of 4 ready to go
            </span>
          </div>
        </section>
      </main>
      <footer>
        <span>Odyssey · Fictional travel planning template</span>
        <a href="../../">Elseform collection</a>
      </footer>
    </>
  );
}
