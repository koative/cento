import { useState } from "react";
import farm from "./assets/farm.jpg";
import { ArrowRight, Leaf, Check } from "lucide-react";
const crops = [
  {
    name: "Leafy greens",
    weeks: 6,
    yield: 2.4,
    plant: "Lettuce · kale · chard",
  },
  {
    name: "Kitchen herbs",
    weeks: 8,
    yield: 1.2,
    plant: "Basil · parsley · mint",
  },
  {
    name: "Summer tomatoes",
    weeks: 12,
    yield: 4.5,
    plant: "Cherry · plum · heritage",
  },
];
export default function App() {
  const [crop, setCrop] = useState(0);
  const [beds, setBeds] = useState(3);
  const [saved, setSaved] = useState("");
  const c = crops[crop];
  return (
    <>
      <a className="skip" href="#main">
        Skip to garden plan
      </a>
      <header>
        <a className="brand" href="#">
          <Leaf />
          verdant
        </a>
        <nav>
          <a href="#garden">Plan a patch</a>
          <a href="#journal">Field journal</a>
        </nav>
        <span>Little spaces. Living things.</span>
      </header>
      <main id="main">
        <section className="cover">
          <div className="cover-photo">
            <img
              src={farm}
              alt="A green cultivated landscape in gentle afternoon light"
            />
            <div className="photo-note">
              A different kind
              <br />
              of growth.
            </div>
          </div>
          <div className="cover-copy">
            <h1>
              The city
              <br />
              has room
              <br />
              <em>to grow.</em>
            </h1>
            <p>
              A rooftop, a courtyard, a forgotten corner. Start a small growing
              space and make something good take root.
            </p>
            <a href="#garden" className="primary">
              Find your growing rhythm <ArrowRight />
            </a>
          </div>
        </section>
        <section className="garden" id="garden">
          <div className="garden-heading">
            <h2>
              Your patch,
              <br />
              your possibilities.
            </h2>
            <p>
              Try a simple raised-bed plan. Choose a crop and the space you have
              to see an illustrative seasonal harvest.
            </p>
            <div className="crop-selector">
              {crops.map((x, i) => (
                <button
                  key={x.name}
                  onClick={() => {
                    setCrop(i);
                    setSaved("");
                  }}
                  aria-pressed={crop === i}
                >
                  {x.name}
                  <ArrowRight />
                </button>
              ))}
            </div>
          </div>
          <div className="patch">
            <div className="patch-top">
              <span>{c.plant}</span>
              <span>{beds * 2} m²</span>
            </div>
            <div className="beds">
              {Array.from({ length: beds }, (_, i) => (
                <div className={"bed crop-" + crop} key={i}>
                  {Array.from({ length: 6 }, (_, j) => (
                    <Leaf key={j} />
                  ))}
                </div>
              ))}
            </div>
            <label>
              Raised beds <strong>{beds}</strong>
              <input
                aria-label="Number of raised beds"
                type="range"
                min="1"
                max="6"
                value={beds}
                onChange={(e) => {
                  setBeds(+e.target.value);
                  setSaved("");
                }}
              />
            </label>
          </div>
          <div className="harvest">
            <h3>A season in your hands.</h3>
            <dl>
              <div>
                <dt>First harvest</dt>
                <dd>
                  {c.weeks}
                  <small>weeks</small>
                </dd>
              </div>
              <div>
                <dt>Illustrative yield</dt>
                <dd>
                  {(beds * 2 * c.yield).toFixed(1)}
                  <small>kg / season</small>
                </dd>
              </div>
              <div>
                <dt>Growing area</dt>
                <dd>
                  {beds * 2}
                  <small>square metres</small>
                </dd>
              </div>
            </dl>
            <button
              className="primary"
              onClick={() =>
                setSaved(
                  `${beds} beds of ${c.name.toLowerCase()} saved to your garden plan.`,
                )
              }
            >
              Save my patch <Check />
            </button>
            <p role="status" className="status">
              {saved || "A planning sketch, not an agricultural forecast."}
            </p>
          </div>
        </section>
        <section id="journal" className="journal">
          <div>
            <h2>
              Notes from
              <br />
              the growing season.
            </h2>
            <p>Good things take a little tending.</p>
          </div>
          <article>
            <span>Soil / 4 minute read</span>
            <h3>
              Begin below
              <br />
              the surface.
            </h3>
            <p>
              Healthy soil is a living system. Start with compost, good drainage
              and a little curiosity about what is already there.
            </p>
          </article>
          <article>
            <span>Community / 3 minute read</span>
            <h3>
              More than
              <br />a harvest.
            </h3>
            <p>
              A shared patch is also a place to meet. Leave a seat by the beds,
              share what you learn, and let neighbours become growers.
            </p>
          </article>
        </section>
        <p className="model-note">
          Demo assumptions: each bed is 2 m². Seasonal yield varies by selected
          crop: 2.4, 1.2 or 4.5 kg/m². Real harvests depend on climate, soil,
          care and growing conditions.
        </p>
      </main>
      <footer>
        <span>Verdant — fictional urban growing project</span>
        <span>Grow a little. Share a little.</span>
      </footer>
    </>
  );
}
