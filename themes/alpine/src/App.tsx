import { useState } from "react";
import { ArrowUpRight, Mountain, Check } from "lucide-react";
import photo from "./assets/photo.jpg";
const kits = [
  {
    name: "Cruise",
    desc: "A forgiving all-mountain setup for finding your rhythm.",
    price: 32,
    width: "78 mm",
    level: "New & returning skiers",
  },
  {
    name: "Carve",
    desc: "Precise edges and a lively feel for confident piste days.",
    price: 45,
    width: "84 mm",
    level: "Intermediate skiers",
  },
  {
    name: "Explore",
    desc: "More float, more freedom, more of the mountain.",
    price: 58,
    width: "102 mm",
    level: "Experienced skiers",
  },
];
export default function App() {
  const [kit, setKit] = useState(1),
    [days, setDays] = useState(3),
    [boots, setBoots] = useState(true),
    [msg, setMsg] = useState("");
  const k = kits[kit];
  return (
    <>
      <header>
        <a className="brand" href="#">
          <Mountain /> ALPINE
        </a>
        <nav>
          <a href="#outfit">Your setup</a>
          <a href="#mountain">Mountain notes</a>
          <a href="#outfit">
            Plan your rental <ArrowUpRight size={16} />
          </a>
        </nav>
      </header>
      <main>
        <section className="alpine-hero">
          <img
            src={photo}
            alt="Snow-covered mountain peaks under a pale blue sky"
          />
          <div>
            <h1>
              Less baggage.
              <br />
              More mountain.
            </h1>
            <p>Your next great day starts with the right setup.</p>
            <a className="action" href="#outfit">
              Find your skis <ArrowUpRight size={20} />
            </a>
          </div>
          <div className="altitude">
            <span>THE HIGH COUNTRY</span>
            <b>Equipment for the way you move.</b>
          </div>
        </section>
        <section className="outfit" id="outfit">
          <div className="outfit-intro">
            <h2>
              Make it
              <br />
              your mountain.
            </h2>
            <p>
              Choose a setup, set your stay, and get an illustrative rental
              estimate. We'll leave the early start to you.
            </p>
            <div className="kit-tabs">
              {kits.map((x, i) => (
                <button
                  key={x.name}
                  aria-pressed={kit === i}
                  onClick={() => {
                    setKit(i);
                    setMsg("");
                  }}
                >
                  <span>{x.name}</span>
                  <small>£{x.price} / day</small>
                </button>
              ))}
            </div>
          </div>
          <div
            className="ski-stage"
            aria-label="Geometric ski equipment model"
            role="img"
          >
            <div className={"ski ski-one kit-" + kit} />
            <div className={"ski ski-two kit-" + kit} />
            <span>
              {k.width} / {k.name.toUpperCase()}
            </span>
          </div>
          <div className="rental">
            <h3>{k.name}</h3>
            <p>{k.desc}</p>
            <span className="level">{k.level}</span>
            <label>
              Days on the mountain <output>{days} days</output>
              <input
                aria-label="Rental days"
                type="range"
                min="1"
                max="10"
                value={days}
                onChange={(e) => {
                  setDays(+e.target.value);
                  setMsg("");
                }}
              />
            </label>
            <label className="boot-check">
              <input
                type="checkbox"
                checked={boots}
                onChange={(e) => {
                  setBoots(e.target.checked);
                  setMsg("");
                }}
              />{" "}
              Include boots · £10/day
            </label>
            <div className="estimate">
              <span>Demo estimate</span>
              <strong>£{(k.price + (boots ? 10 : 0)) * days}</strong>
            </div>
            <button
              className="action"
              onClick={() =>
                setMsg(
                  `${k.name} setup for ${days} days saved. No reservation has been made.`,
                )
              }
            >
              Save rental plan <Check size={17} />
            </button>
            <p role="status" className="status">
              {msg}
            </p>
          </div>
        </section>
        <section className="mountain" id="mountain">
          <h2>
            A good day,
            <br />
            from the ground up.
          </h2>
          <div>
            <details open>
              <summary>Fit comes first.</summary>
              <p>
                A real rental should include an in-person fitting and
                professional binding adjustment. This demo calculator cannot
                replace that process.
              </p>
            </details>
            <details>
              <summary>Pack a little lighter.</summary>
              <p>
                Bring your preferred socks, suitable layers, eye protection, and
                the details of your trip. The mountain rewards good preparation.
              </p>
            </details>
            <details>
              <summary>Know your terrain.</summary>
              <p>
                Choose terrain appropriate to your ability and conditions. Local
                resort guidance always comes first.
              </p>
            </details>
          </div>
        </section>
      </main>
      <footer>
        <a href="../../">Koative collection</a>
        <p>
          Alpine is a fictional ski outfitter. Prices and equipment are
          illustrative.
        </p>
      </footer>
    </>
  );
}
