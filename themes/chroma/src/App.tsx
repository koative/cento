import { useState } from "react";
import { ArrowUpRight, ArrowRight, Scissors } from "lucide-react";
import portrait from "./assets/portrait.jpg";
const services = [
  {
    name: "The considered cut",
    note: "Shape, movement, and a finish that feels like you.",
    price: 65,
    duration: 60,
  },
  {
    name: "Lived-in color",
    note: "Soft dimension that grows out as beautifully as it begins.",
    price: 140,
    duration: 150,
  },
  {
    name: "A complete refresh",
    note: "A new shape, a new shade, a little new perspective.",
    price: 195,
    duration: 210,
  },
];
export default function App() {
  const [service, setService] = useState(0);
  const [stylist, setStylist] = useState("Any stylist");
  const [time, setTime] = useState("10:00");
  const [summary, setSummary] = useState("");
  const current = services[service];
  return (
    <>
      <header>
        <a href="#" className="brand">
          CHROMA
        </a>
        <nav aria-label="Main">
          <a href="#approach">Our approach</a>
          <a href="#appointment">
            Make a little change <ArrowUpRight size={14} />
          </a>
        </nav>
      </header>
      <main>
        <section className="lookbook">
          <div className="lookbook-title">
            <h1>
              A different
              <br />
              kind of
              <br />
              <span>good hair.</span>
            </h1>
            <p>
              Less about the trend.
              <br />
              More about you.
            </p>
          </div>
          <figure>
            <img
              src={portrait}
              alt="Portrait showing long naturally textured hair in soft light"
            />
            <figcaption>PERSONAL SHAPE / NATURAL MOVEMENT</figcaption>
          </figure>
          <div className="side-note">A SALON FOR YOUR NEXT CHAPTER</div>
          <div className="lookbook-link">
            <span>GOOD HAIR IS A FEELING.</span>
            <a href="#appointment">
              <ArrowUpRight size={42} />
              <span>Find yours</span>
            </a>
          </div>
        </section>
        <section className="approach" id="approach">
          <Scissors size={40} strokeWidth={1} />
          <h2>
            You, with
            <br />a little <em>more you.</em>
          </h2>
          <p>
            A thoughtful consultation. A cut that works on a Tuesday. Color that
            feels like it has always been yours. Chroma is an imagined salon for
            people who want to feel at home in their own hair.
          </p>
        </section>
        <section className="appointment" id="appointment">
          <div className="services">
            <h2>What feels right?</h2>
            <p>Start with a service. We leave room for the conversation.</p>
            {services.map((s, i) => (
              <button
                key={s.name}
                aria-pressed={service === i}
                onClick={() => {
                  setService(i);
                  setSummary("");
                }}
              >
                <span>
                  <b>{s.name}</b>
                  <small>{s.note}</small>
                </span>
                <span className="service-price">
                  £{s.price}
                  <ArrowUpRight size={18} />
                </span>
              </button>
            ))}
          </div>
          <div className="booking">
            <h3>
              A little time
              <br />
              for yourself.
            </h3>
            <dl>
              <div>
                <dt>Your service</dt>
                <dd>{current.name}</dd>
              </div>
              <div>
                <dt>Time together</dt>
                <dd>{current.duration} minutes</dd>
              </div>
              <div>
                <dt>Illustrative price</dt>
                <dd>£{current.price}</dd>
              </div>
            </dl>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSummary(
                  `${current.name} at ${time} with ${stylist.toLowerCase()} — ${current.duration} minutes, £${current.price}. Demo only; no appointment booked.`,
                );
              }}
            >
              <label>
                Who would you like to see?
                <select
                  value={stylist}
                  onChange={(e) => {
                    setStylist(e.target.value);
                    setSummary("");
                  }}
                >
                  <option>Any stylist</option>
                  <option>Alex</option>
                  <option>Robin</option>
                  <option>Jules</option>
                </select>
              </label>
              <fieldset>
                <legend>Saturday 17 October · demo times</legend>
                <div className="time-slots">
                  {["10:00", "12:30", "15:00"].map((t) => (
                    <button
                      type="button"
                      key={t}
                      aria-pressed={time === t}
                      onClick={() => {
                        setTime(t);
                        setSummary("");
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </fieldset>
              <button className="preview-button" type="submit">
                Preview my appointment <ArrowRight size={17} />
              </button>
              <p className="status" role="status">
                {summary ||
                  "A local preview. No contact details or payment required."}
              </p>
            </form>
          </div>
        </section>
        <section className="closing">
          <h2>
            Come as you are.
            <br />
            Leave feeling like yourself.
          </h2>
          <a href="#appointment">
            Let's make a little change <ArrowUpRight size={20} />
          </a>
        </section>
      </main>
      <footer>
        <strong>CHROMA / HAIR WITH FEELING</strong>
        <p>
          Fictional salon by Koative. Services, stylists, prices and
          availability are illustrative.
        </p>
      </footer>
    </>
  );
}
