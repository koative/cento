import { useState } from "react";
import {
  ArrowUpRight,
  Plus,
  Check,
  Clock3,
  Heart,
  ArrowRight,
} from "lucide-react";
import care from "./assets/care.jpg";
export default function App() {
  const [type, setType] = useState("General visit");
  const [day, setDay] = useState("Monday, 19 Oct");
  const [time, setTime] = useState("09:30");
  const [done, setDone] = useState(false);
  return (
    <>
      <header>
        <a className="brand" href="#">
          solace
          <Plus size={27} />
        </a>
        <nav>
          <a href="#care">Our approach</a>
          <a href="#visit">Plan a visit</a>
        </nav>
        <span className="location">A little more human.</span>
      </header>
      <main>
        <section className="welcome">
          <div className="intro">
            <h1>
              Good care.
              <br />
              <em>Room to breathe.</em>
            </h1>
            <p>
              Time to talk. Space to ask. A neighborhood clinic designed around
              the person, not just the appointment.
            </p>
            <div className="portrait">
              <img src={care} alt="A sunlit, welcoming clinic interior" />
              <span>
                <Heart size={20} /> Here for the everyday.
              </span>
            </div>
          </div>
          <div className="visit" id="visit">
            <div className="visit-title">
              <h2>Let's make time.</h2>
              <ArrowUpRight size={30} />
            </div>
            <p>Explore a visit that works for your day.</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setDone(true);
              }}
            >
              <label>
                What brings you in?
                <select
                  value={type}
                  onChange={(e) => {
                    setType(e.target.value);
                    setDone(false);
                  }}
                >
                  <option>General visit</option>
                  <option>Follow-up visit</option>
                  <option>New patient introduction</option>
                </select>
              </label>
              <fieldset>
                <legend>Choose a day</legend>
                {["Monday, 19 Oct", "Tuesday, 20 Oct", "Wednesday, 21 Oct"].map(
                  (d) => (
                    <button
                      key={d}
                      type="button"
                      aria-pressed={day === d}
                      onClick={() => {
                        setDay(d);
                        setDone(false);
                      }}
                    >
                      {d.split(", ")[0]}
                      <strong>{d.split(", ")[1]}</strong>
                    </button>
                  ),
                )}
              </fieldset>
              <fieldset className="times">
                <legend>Available times · illustrative schedule</legend>
                {["09:30", "11:00", "14:30", "16:00"].map((t) => (
                  <button
                    type="button"
                    key={t}
                    aria-pressed={time === t}
                    onClick={() => {
                      setTime(t);
                      setDone(false);
                    }}
                  >
                    {t}
                  </button>
                ))}
              </fieldset>
              <button className="btn" type="submit">
                Preview my visit <ArrowRight size={19} />
              </button>
              {done && (
                <p role="status" className="confirmation">
                  <Check size={18} /> {type} · {day} at {time}. Your demo visit
                  is selected. No appointment was booked.
                </p>
              )}
              <small>No account needed. This is a local demonstration.</small>
            </form>
          </div>
        </section>
        <section className="care" id="care">
          <div>
            <h2>
              Care with
              <br />a familiar face.
            </h2>
            <p>
              We believe a comfortable visit starts before you walk through the
              door.
            </p>
          </div>
          <div className="care-list">
            {[
              [
                "More time, fewer unknowns",
                "Find the visit type, time and practical details in one place.",
              ],
              [
                "Your questions belong here",
                "Bring a list of what you would like to discuss at your visit.",
              ],
              [
                "A clear next step",
                "A thoughtful conversation makes room for what comes next.",
              ],
            ].map(([a, b]) => (
              <article key={a}>
                <h3>{a}</h3>
                <p>{b}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="note">
          <Clock3 size={29} />
          <p>
            <strong>A note before you visit</strong>
            <br />
            This fictional clinic demonstrates appointment browsing only. It
            does not provide medical advice or urgent care.
          </p>
          <a href="#visit">
            Explore the planner <ArrowUpRight size={19} />
          </a>
        </section>
      </main>
      <footer>
        <span>Solace · A fictional healthcare template</span>
        <a href="../../">Elseform collection</a>
      </footer>
    </>
  );
}
