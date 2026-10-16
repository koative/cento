import { useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  MoveUpRight,
  X,
  Plus,
  Minus,
  AudioLines,
} from "lucide-react";
import crowd from "./assets/crowd.jpg";
const lineups = [
  [
    { time: "18:00", name: "VELVET STATIC", stage: "WAREHOUSE" },
    { time: "20:00", name: "NØ SIGNAL", stage: "OPEN AIR" },
    { time: "22:00", name: "ACID BLOOM", stage: "WAREHOUSE" },
    { time: "00:00", name: "MIRA NOVA", stage: "OPEN AIR" },
  ],
  [
    { time: "17:00", name: "SOFT MACHINE", stage: "OPEN AIR" },
    { time: "19:30", name: "CIRCUIT BREAK", stage: "WAREHOUSE" },
    { time: "22:00", name: "DEEP CURRENT", stage: "OPEN AIR" },
    { time: "01:00", name: "ECHO SYSTEM", stage: "WAREHOUSE" },
  ],
  [
    { time: "16:00", name: "DUSK THEORY", stage: "OPEN AIR" },
    { time: "18:30", name: "SINE WAVE", stage: "WAREHOUSE" },
    { time: "21:00", name: "MOTION BLUR", stage: "OPEN AIR" },
    { time: "23:00", name: "LAST FREQUENCY", stage: "WAREHOUSE" },
  ],
];
export default function App() {
  const [day, setDay] = useState(0);
  const [pass, setPass] = useState("Weekend");
  const [qty, setQty] = useState(1);
  const [reserved, setReserved] = useState(false);
  return (
    <>
      <header>
        <a className="logo" href="#" aria-label="Pulse home">
          PULSE
          <AudioLines size={26} />
        </a>
        <nav>
          <a href="#lineup">Line-up</a>
          <a href="#experience">The experience</a>
        </nav>
        <a className="nav-ticket" href="#tickets">
          Get your pass <ArrowUpRight size={17} />
        </a>
      </header>
      <main>
        <section className="poster">
          <div className="poster-info">
            <span>INDEPENDENT SOUND. COLLECTIVE ENERGY.</span>
            <span>
              17—19 JULY 2027
              <br />
              BERLIN, GERMANY
            </span>
          </div>
          <div className="poster-heading">
            <h1>
              FEEL
              <br />
              <span>EVERY</span>
              <br />
              FREQUENCY.
            </h1>
            <div className="speaker" aria-hidden="true">
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
            </div>
            <div className="edition">
              THREE DAYS.
              <br />
              NO OFF SWITCH.
              <MoveUpRight size={58} />
            </div>
          </div>
          <div className="poster-bottom">
            <p>
              A gathering for the ones who
              <br />
              find themselves in the sound.
            </p>
            <a href="#lineup">
              Find your frequency <ArrowRight />
            </a>
            <span className="badge">
              VOL.
              <br />
              <strong>07</strong>
            </span>
          </div>
        </section>
        <div className="ticker" aria-hidden="true">
          <div>
            {Array.from({ length: 6 }, (_, i) => (
              <span key={i}>
                BODY IN MOTION <X /> MIND ELSEWHERE <X />
              </span>
            ))}
          </div>
        </div>
        <section className="lineup" id="lineup">
          <div className="section-heading">
            <h2>
              THE SOUND
              <br />
              OF WHAT'S NEXT.
            </h2>
            <p>
              From the first kick to the last sunrise.
              <br />
              Find your people at the front.
            </p>
          </div>
          <div className="day-tabs" role="tablist" aria-label="Festival day">
            {["FRI 17", "SAT 18", "SUN 19"].map((d, i) => (
              <button
                role="tab"
                aria-selected={day === i}
                aria-controls="schedule"
                id={"day-" + i}
                onClick={() => setDay(i)}
                key={d}
              >
                {d}
                <ArrowUpRight size={18} />
              </button>
            ))}
          </div>
          <div id="schedule" role="tabpanel" aria-labelledby={"day-" + day}>
            {lineups[day].map((a) => (
              <div className="artist" key={a.name}>
                <span>{a.time}</span>
                <h3>{a.name}</h3>
                <span>{a.stage}</span>
                <ArrowUpRight />
              </div>
            ))}
          </div>
          <p className="schedule-note">
            Illustrative artist names and schedule. This is a festival website
            concept.
          </p>
        </section>
        <section id="experience" className="experience">
          <img
            src={crowd}
            alt="A sea of hands lifted toward the lights at an electronic music festival"
            loading="lazy"
          />
          <div>
            <AudioLines size={44} />
            <h2>
              COME AS YOU ARE.
              <br />
              LEAVE A LITTLE
              <br />
              DIFFERENT.
            </h2>
            <p>
              Two stages. A whole new state of mind. Lose the clock in the
              warehouse, catch the last light outside, and keep going together.
            </p>
            <ul>
              <li>OPEN-AIR & WAREHOUSE STAGES</li>
              <li>INDEPENDENT FOOD & DRINK</li>
              <li>SPACE TO REST, ROOM TO DANCE</li>
            </ul>
          </div>
        </section>
        <section className="tickets" id="tickets">
          <div>
            <h2>
              DON'T JUST
              <br />
              HEAR ABOUT IT.
            </h2>
            <p>Your next favorite memory starts here.</p>
          </div>
          <div className="ticket-form">
            <div className="pass-picker">
              {["Weekend", "Friday", "Saturday", "Sunday"].map((p) => (
                <button
                  key={p}
                  className={pass === p ? "active" : ""}
                  onClick={() => {
                    setPass(p);
                    setReserved(false);
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
            <div className="ticket-price">
              <span>
                {pass === "Weekend"
                  ? "Three days. All frequencies."
                  : "One day. Full immersion."}
              </span>
              <strong>
                €{pass === "Weekend" ? 149 : 65}
                <small> / person</small>
              </strong>
            </div>
            <div className="ticket-controls">
              <div className="quantity">
                <button
                  aria-label="Remove one pass"
                  disabled={qty === 1}
                  onClick={() => {
                    setQty(qty - 1);
                    setReserved(false);
                  }}
                >
                  <Minus size={16} />
                </button>
                <span>{qty}</span>
                <button
                  aria-label="Add one pass"
                  disabled={qty === 6}
                  onClick={() => {
                    setQty(qty + 1);
                    setReserved(false);
                  }}
                >
                  <Plus size={16} />
                </button>
              </div>
              <button className="reserve" onClick={() => setReserved(true)}>
                Select {qty === 1 ? "pass" : "passes"} · €
                {(pass === "Weekend" ? 149 : 65) * qty}
                <ArrowUpRight size={18} />
              </button>
            </div>
            <p className="confirmation" aria-live="polite">
              {reserved
                ? `${qty} ${pass.toLowerCase()} ${qty === 1 ? "pass" : "passes"} selected. Demo only — no booking or payment was made.`
                : "Demo ticket selector. No real tickets are sold."}
            </p>
          </div>
        </section>
      </main>
      <footer>
        <a className="logo" href="#">
          PULSE
          <AudioLines size={26} />
        </a>
        <span>A FICTIONAL FESTIVAL. A REAL GOOD TEMPLATE.</span>
        <a href="../../">
          ELSEFORM COLLECTION <ArrowUpRight size={16} />
        </a>
      </footer>
    </>
  );
}
