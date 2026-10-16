import { useState } from "react";
import { ArrowUpRight, Leaf, Heart } from "lucide-react";
import wildlife from "./assets/wildlife.jpg";
const animals = [
  {
    name: "Fern",
    species: "Roe deer",
    status: "Returning to the wild",
    story:
      "Found alone at the edge of a busy road. After careful rehabilitation, Fern is preparing for a quieter life in protected woodland.",
    care: "Habitat preparation",
    days: "A patient, gradual return",
  },
  {
    name: "Pip",
    species: "European hedgehog",
    status: "Growing stronger",
    story:
      "A small autumn arrival who needed a little extra time. Pip is gaining strength in a sheltered habitat before spring release.",
    care: "Daily feeding & observation",
    days: "Small steps, every day",
  },
  {
    name: "Ash",
    species: "Tawny owl",
    status: "Learning to fly again",
    story:
      "A wing injury brought Ash to our care. Short, supervised flights in the rehabilitation aviary are helping confidence return.",
    care: "Flight rehabilitation",
    days: "Progress at nature’s pace",
  },
];
export default function App() {
  const [animal, setAnimal] = useState(0),
    [activity, setActivity] = useState("Habitat morning"),
    [saved, setSaved] = useState(false);
  const a = animals[animal];
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header>
        <a className="brand" href="#">
          <Leaf size={24} />
          sanctuary
        </a>
        <nav>
          <a href="#stories">Lives in our care</a>
          <a href="#help">Lend a hand</a>
          <a href="#ethos">Our approach ↗</a>
        </nav>
      </header>
      <main id="main">
        <section className="forest">
          <img
            src={wildlife}
            alt="Wild deer among the trees in a green woodland"
          />
          <div className="forest-title">
            <h1>
              The wild
              <br />
              deserves
              <br />
              <em>a way back.</em>
            </h1>
            <p>
              A small wildlife sanctuary.
              <br />A second chance, one life at a time.
            </p>
            <a href="#stories">
              Meet the lives in our care <ArrowUpRight size={18} />
            </a>
          </div>
          <div className="forest-caption">
            <span>CARE FIRST. ALWAYS.</span>
            <span>WOODLAND / WILDLIFE / A WAY HOME</span>
          </div>
        </section>
        <section className="stories" id="stories">
          <div className="stories-heading">
            <h2>
              Every life has a story.
              <br />
              <em>These are still being written.</em>
            </h2>
            <p>
              Care is rarely dramatic. Mostly, it is quiet, consistent and full
              of small beginnings.
            </p>
          </div>
          <div className="casebook">
            <div className="animal-list">
              {animals.map((v, i) => (
                <button
                  key={v.name}
                  aria-pressed={animal === i}
                  onClick={() => setAnimal(i)}
                >
                  <span>
                    {v.name}
                    <small>{v.species}</small>
                  </span>
                  <ArrowUpRight size={23} />
                </button>
              ))}
            </div>
            <article aria-live="polite">
              <div className="case-head">
                <span>FROM THE CARE JOURNAL</span>
                <Heart size={20} strokeWidth={1} />
              </div>
              <h3>{a.name}</h3>
              <p className="species">
                {a.species} · {a.status}
              </p>
              <p>{a.story}</p>
              <dl>
                <div>
                  <dt>Today’s focus</dt>
                  <dd>{a.care}</dd>
                </div>
                <div>
                  <dt>The pace</dt>
                  <dd>{a.days}</dd>
                </div>
              </dl>
              <span className="fictional">
                Illustrative animal story, created for this concept.
              </span>
            </article>
          </div>
        </section>
        <section className="help" id="help">
          <div>
            <h2>
              A little of your time.
              <br />
              <em>A world of difference.</em>
            </h2>
            <p>
              Not every helping hand needs specialist experience. Some days, it
              is a pair of wellies and a willingness to get muddy.
            </p>
          </div>
          <div className="volunteer">
            <h3>Find your way to help</h3>
            <label>
              A day that sounds like you
              <select
                value={activity}
                onChange={(e) => {
                  setActivity(e.target.value);
                  setSaved(false);
                }}
              >
                <option>Habitat morning</option>
                <option>Garden & grounds</option>
                <option>Community open day</option>
              </select>
            </label>
            <p>
              {activity === "Habitat morning"
                ? "Help prepare natural spaces, build shelters and create quieter corners for recovery."
                : activity === "Garden & grounds"
                  ? "Care for native planting, maintain paths and help our landscape support more life."
                  : "Welcome curious visitors, share the sanctuary story and help make a day of learning possible."}
            </p>
            <button onClick={() => setSaved(true)}>
              {saved ? "Interest saved locally" : "Add to my volunteer plan"}
              <ArrowUpRight size={18} />
            </button>
            <small aria-live="polite">
              {saved
                ? `${activity} is in your sample plan. No application has been sent.`
                : "A demonstration planner. No volunteer application is sent."}
            </small>
          </div>
        </section>
        <section className="ethos" id="ethos">
          <h2>
            Wild is where
            <br />
            they belong.
          </h2>
          <p>
            Our imagined sanctuary is built around a simple principle: care
            should lead back to independence. Quiet spaces, patient
            rehabilitation and decisions made for the animal, every time.
          </p>
          <a href="#stories">Return to the care journal ↗</a>
        </section>
      </main>
      <footer>
        <a className="brand" href="#">
          sanctuary
        </a>
        <p>
          Fictional wildlife sanctuary · Illustrative stories, no real
          fundraising · Koative
        </p>
        <a href="#help">Make a little room for wild ↗</a>
      </footer>
    </>
  );
}
