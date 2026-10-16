import { useState } from "react";
import { ArrowUpRight, Leaf, MapPin, Clock } from "lucide-react";
import garden from "./assets/garden.jpg";
import flowers from "./assets/flowers.jpg";
const trails = [
  {
    name: "The glasshouse",
    time: "45 minutes",
    distance: "A gentle indoor loop",
    note: "Step into a warmer world. Ferns, palms and an extraordinary collection of leaves under one glass roof.",
    plants: ["Monstera deliciosa", "Adiantum raddianum", "Ficus elastica"],
  },
  {
    name: "The wild meadow",
    time: "60 minutes",
    distance: "1.2 km · mostly level",
    note: "Take the wandering path through seed heads, native grasses and flowers that change with every visit.",
    plants: ["Achillea millefolium", "Salvia pratensis", "Centaurea cyanus"],
  },
  {
    name: "The old orchard",
    time: "30 minutes",
    distance: "800 m · gravel paths",
    note: "A slower walk among heritage fruit trees. Find a bench, bring a book and watch the light move.",
    plants: ["Malus domestica", "Pyrus communis", "Prunus domestica"],
  },
];
export default function App() {
  const [trail, setTrail] = useState(0),
    [saved, setSaved] = useState(false);
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header>
        <a href="#" className="brand">
          <Leaf size={28} />
          botanica
        </a>
        <nav>
          <a href="#garden">The garden</a>
          <a href="#explore">Plan a wander</a>
          <a href="#visit">
            Visit us <ArrowUpRight size={16} />
          </a>
        </nav>
      </header>
      <main id="main">
        <section className="opening" id="garden">
          <div className="opening-copy">
            <h1>
              A little
              <br />
              closer to
              <br />
              <em>the wild.</em>
            </h1>
            <p>
              A living garden for curious minds.
              <br />
              Come for a walk. Leave with a new way of looking.
            </p>
            <a href="#explore">
              Find your path <ArrowUpRight size={19} />
            </a>
            <div className="opening-note">
              <span>Open for wandering</span>
              <strong>Tuesday—Sunday · 9:00—17:00</strong>
            </div>
          </div>
          <figure>
            <img
              src={garden}
              alt="Young seedlings growing in the botanical garden nursery"
            />
            <figcaption>A place that grows with you.</figcaption>
            <div className="leaf-stamp">
              <Leaf size={32} />
              <span>
                ROOTED IN
                <br />
                CURIOSITY
              </span>
            </div>
          </figure>
        </section>
        <section className="notice">
          <span>In the garden now</span>
          <p>
            Late summer seed heads, a thousand shades of green, and the first
            apples in the orchard.
          </p>
          <a href="#explore">Take a look ↗</a>
        </section>
        <section className="explore" id="explore">
          <div className="section-intro">
            <h2>
              No wrong turns.
              <br />
              Just <em>new discoveries.</em>
            </h2>
            <p>
              Three ways into the garden. Pick a path that fits your day, then
              let curiosity take the lead.
            </p>
          </div>
          <div className="field-guide">
            <div className="trail-list">
              {trails.map((t, i) => (
                <button
                  key={t.name}
                  aria-pressed={trail === i}
                  onClick={() => {
                    setTrail(i);
                    setSaved(false);
                  }}
                >
                  <span>
                    {t.name}
                    <small>{t.time}</small>
                  </span>
                  <ArrowUpRight size={21} />
                </button>
              ))}
              <img src={flowers} alt="A seasonal study of garden flowers" />
            </div>
            <article className="trail-detail" aria-live="polite">
              <Leaf className="guide-leaf" size={64} strokeWidth={1} />
              <h3>{trails[trail].name}</h3>
              <p>{trails[trail].note}</p>
              <div className="trail-facts">
                <span>
                  <Clock size={16} />
                  {trails[trail].time}
                </span>
                <span>
                  <MapPin size={16} />
                  {trails[trail].distance}
                </span>
              </div>
              <h4>Look out for</h4>
              <ul>
                {trails[trail].plants.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <button className="save" onClick={() => setSaved(!saved)}>
                {saved ? "Added to your garden day" : "Add this walk to my day"}
                <ArrowUpRight size={18} />
              </button>
              {saved && (
                <p className="confirmation">
                  Your {trails[trail].time.toLowerCase()} walk is saved for this
                  visit.
                </p>
              )}
            </article>
          </div>
        </section>
        <section className="visit" id="visit">
          <h2>
            Come as you are.
            <br />
            Stay a little longer.
          </h2>
          <div>
            <p>
              Bring a picnic. Borrow a field guide. Find a patch of shade and
              make an ordinary afternoon feel a little extraordinary.
            </p>
            <dl>
              <div>
                <dt>When</dt>
                <dd>Tuesday—Sunday, 9:00—17:00</dd>
              </div>
              <div>
                <dt>Where</dt>
                <dd>Orchard Lane, Greenhaven</dd>
              </div>
              <div>
                <dt>Admission</dt>
                <dd>Adults £12 · Under 12s free</dd>
              </div>
            </dl>
            <span>Fictional visitor information for this garden concept.</span>
          </div>
        </section>
      </main>
      <footer>
        <a className="brand" href="#">
          <Leaf size={21} />
          botanica
        </a>
        <p>Fictional botanical garden · Local visit planner · Koative</p>
        <a href="#garden">Back to the green ↑</a>
      </footer>
    </>
  );
}
