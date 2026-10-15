import { useState } from "react";
import { ArrowUpRight, ArrowRight, Flower2, Check } from "lucide-react";
import bouquet from "./assets/bouquet.jpg";
import flowers from "./assets/flowers.jpg";
const arrangements = [
  {
    name: "The daydream",
    image: bouquet,
    description:
      "A generous gathering of pink tulips. Soft edges, bright feelings, and a little wild at heart.",
    base: 45,
  },
  {
    name: "The little gesture",
    image: flowers,
    description:
      "A sculptural iris study. A few carefully chosen stems with all the room they need to shine.",
    base: 32,
  },
];
export default function App() {
  const [arrangement, setArrangement] = useState(0);
  const [size, setSize] = useState("A little lovely");
  const [note, setNote] = useState("");
  const [name, setName] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const item = arrangements[arrangement];
  const extra =
    size === "A little lovely" ? 0 : size === "Something generous" ? 20 : 40;
  const reset = () => setConfirmed(false);
  return (
    <>
      <div className="ribbon">
        For everyday occasions. And no occasion at all.
      </div>
      <header>
        <a className="brand" href="#">
          bloom
          <Flower2 size={27} strokeWidth={1.2} />
        </a>
        <nav aria-label="Main navigation">
          <a href="#flowers">Our flowers</a>
          <a href="#studio">The studio</a>
        </nav>
        <a className="header-link" href="#flowers">
          Make someone's day <ArrowUpRight size={15} />
        </a>
      </header>
      <main>
        <section className="floral-poster">
          <div className="stem-study">
            <img
              src={flowers}
              alt="A delicate pink iris on a slender green stem"
            />
            <span>
              A little wild.
              <br />
              Entirely wonderful.
            </span>
          </div>
          <div className="poster-type">
            <h1>
              Life in
              <br />
              <em>full bloom.</em>
            </h1>
            <p>
              Thoughtfully gathered flowers.
              <br />
              For the big feelings and the little things.
            </p>
            <a href="#flowers">
              Find your flowers <ArrowRight size={18} />
            </a>
            <Flower2 className="poster-flower" size={50} strokeWidth={0.8} />
          </div>
          <figure className="tulip-study">
            <img
              src={bouquet}
              alt="Pink tulips arranged in a simple glass vase"
            />
            <figcaption>Fresh perspective, every day.</figcaption>
          </figure>
        </section>
        <section className="studio-note" id="studio">
          <Flower2 size={30} strokeWidth={1} />
          <p>
            We believe flowers don't need a reason.
            <br />
            Just a place in your day.
          </p>
          <span>
            Bloom is an imagined floral studio with a fondness for unexpected
            stems, generous color, and doing things by hand.
          </span>
        </section>
        <section className="bouquet-builder" id="flowers">
          <div className="builder-intro">
            <h2>
              A little something,
              <br />
              <em>just for them.</em>
            </h2>
            <p>
              Choose your flowers. Find the right size.
              <br />
              Make the message your own.
            </p>
          </div>
          <div className="builder-grid">
            <div className={`arrangement-image arrangement-${arrangement}`}>
              <img
                key={item.image}
                src={item.image}
                alt={
                  item.name === "The daydream"
                    ? "Pink tulip arrangement"
                    : "Single pink iris arrangement"
                }
              />
              <span>
                Seasonal inspiration
                <br />
                Every stem has its own way.
              </span>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setConfirmed(true);
              }}
            >
              <div
                className="arrangement-tabs"
                aria-label="Choose an arrangement"
              >
                {arrangements.map((a, i) => (
                  <button
                    key={a.name}
                    type="button"
                    aria-pressed={arrangement === i}
                    onClick={() => {
                      setArrangement(i);
                      reset();
                    }}
                  >
                    {a.name}
                  </button>
                ))}
              </div>
              <h3>{item.name}</h3>
              <p className="description">{item.description}</p>
              <fieldset>
                <legend>How much lovely?</legend>
                <div className="sizes">
                  {[
                    "A little lovely",
                    "Something generous",
                    "All the feelings",
                  ].map((s, i) => (
                    <button
                      key={s}
                      type="button"
                      aria-pressed={size === s}
                      onClick={() => {
                        setSize(s);
                        reset();
                      }}
                    >
                      <span>{s}</span>
                      <span>€{item.base + i * 20}</span>
                    </button>
                  ))}
                </div>
              </fieldset>
              <div className="form-fields">
                <label htmlFor="sender">Your name</label>
                <input
                  id="sender"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    reset();
                  }}
                  placeholder="The lovely person behind the flowers"
                  required
                />
                <label htmlFor="message">
                  A little note <span>(optional)</span>
                </label>
                <textarea
                  id="message"
                  maxLength={180}
                  value={note}
                  onChange={(e) => {
                    setNote(e.target.value);
                    reset();
                  }}
                  placeholder="Thinking of you, just because…"
                  rows={2}
                />
              </div>
              <div className="builder-total">
                <span>
                  Your arrangement<strong>€{item.base + extra}</strong>
                </span>
                <button type="submit">
                  Create my request <ArrowUpRight size={20} />
                </button>
              </div>
              {confirmed ? (
                <div className="confirmation" role="status">
                  <Check size={19} />
                  <p>
                    Your flower idea is ready, {name}: {item.name},{" "}
                    {size.toLowerCase()}, €{item.base + extra}.
                    {note && ` Your note: “${note}”`} This is a local demo. No
                    order was placed or message sent.
                  </p>
                </div>
              ) : (
                <p className="demo-note">
                  An arrangement to imagine. This demo creates no real order.
                </p>
              )}
            </form>
          </div>
        </section>
        <section className="care">
          <div>
            <h2>
              Good flowers.
              <br />
              <em>A little care.</em>
            </h2>
            <p>A few small things to keep the good feeling going.</p>
          </div>
          <div className="care-notes">
            <details open>
              <summary>A fresh start</summary>
              <p>
                Trim your stems at an angle and place them in a clean vase with
                fresh water. Give them a little space to find their shape.
              </p>
            </details>
            <details>
              <summary>A good place to be</summary>
              <p>
                A cool spot away from direct sunlight and ripening fruit helps
                flowers last longer. Let them enjoy the room with you.
              </p>
            </details>
            <details>
              <summary>A little attention</summary>
              <p>
                Refresh the water every couple of days and remove any leaves
                below the waterline. Small rituals make a difference.
              </p>
            </details>
          </div>
        </section>
        <section className="closing">
          <Flower2 size={42} strokeWidth={1} />
          <p>
            For someone you love.
            <br />
            <em>That includes you.</em>
          </p>
          <a href="#flowers">
            Find a little joy <ArrowUpRight size={20} />
          </a>
        </section>
      </main>
      <footer>
        <a className="brand" href="#">
          bloom
          <Flower2 size={23} strokeWidth={1.2} />
        </a>
        <span>
          A fictional floral studio, by Koative.
          <br />
          All prices and arrangements are illustrative.
        </span>
        <a href="#">Back to the good stuff ↑</a>
      </footer>
    </>
  );
}
