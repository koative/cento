import { useState } from "react";
import { ArrowUpRight, Moon, Plus, Minus } from "lucide-react";
import sky from "./assets/aurora.jpg";
import cabin from "./assets/cabin.jpg";
const stays = [
  {
    name: "The Observatory",
    type: "Glass-roof cabin",
    price: 420,
    detail:
      "A private roof to the northern sky. One king bed, a wood stove and nothing between you and the stars.",
  },
  {
    name: "The Pine House",
    type: "Forest cabin",
    price: 340,
    detail:
      "Sheltered among old pines. Two bedrooms, your own sauna and a path straight to the frozen lake.",
  },
  {
    name: "The Still Room",
    type: "Lakeside suite",
    price: 290,
    detail:
      "Wake to the quiet water. A generous suite with a soaking tub and breakfast delivered at your pace.",
  },
];
export default function App() {
  const [selected, setSelected] = useState(0),
    [nights, setNights] = useState(3),
    [planned, setPlanned] = useState(false);
  const stay = stays[selected];
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <section className="night">
        <img
          className="sky"
          src={sky}
          alt="Northern lights moving across the Arctic night sky"
        />
        <header>
          <a className="brand" href="#">
            aurora<span>STAY A LITTLE FURTHER NORTH</span>
          </a>
          <nav>
            <a href="#stays">The cabins</a>
            <a href="#rituals">Life up here</a>
            <a className="nav-book" href="#stays">
              Find your quiet <ArrowUpRight size={16} />
            </a>
          </nav>
        </header>
        <main id="main">
          <div className="night-title">
            <h1>
              Some nights
              <br />
              stay with you.
            </h1>
            <p>
              A handful of cabins.
              <br />
              An endless northern sky.
              <br />
              Your place at the edge of everything.
            </p>
          </div>
          <div className="night-bottom">
            <span>68° 21′ N · LAPLAND</span>
            <span>
              <Moon size={15} /> The season of long nights
            </span>
            <a href="#stays">Come a little closer ↓</a>
          </div>
        </main>
      </section>
      <section className="stay-section" id="stays">
        <div className="stay-intro">
          <h2>
            Far from ordinary.
            <br />
            <em>Close to yourself.</em>
          </h2>
          <p>
            A small retreat in an immense landscape. Choose a place to retreat
            to, then leave a little room for the unexpected.
          </p>
        </div>
        <div className="stay-layout">
          <div className="cabin-image">
            <img
              src={cabin}
              alt="A cabin surrounded by a quiet northern forest"
            />
            <span>YOUR OWN SMALL CORNER OF THE NORTH</span>
          </div>
          <div className="planner">
            <div className="cabin-tabs" aria-label="Choose a cabin">
              {stays.map((s, i) => (
                <button
                  key={s.name}
                  aria-pressed={selected === i}
                  onClick={() => {
                    setSelected(i);
                    setPlanned(false);
                  }}
                >
                  {s.name}
                  <ArrowUpRight size={17} />
                </button>
              ))}
            </div>
            <div className="stay-copy" aria-live="polite">
              <span>{stay.type}</span>
              <h3>{stay.name}</h3>
              <p>{stay.detail}</p>
              <div className="night-control">
                <span>Make time for yourself</span>
                <div>
                  <button
                    aria-label="Fewer nights"
                    disabled={nights === 2}
                    onClick={() => {
                      setNights(nights - 1);
                      setPlanned(false);
                    }}
                  >
                    <Minus size={16} />
                  </button>
                  <strong>{nights} nights</strong>
                  <button
                    aria-label="More nights"
                    disabled={nights === 7}
                    onClick={() => {
                      setNights(nights + 1);
                      setPlanned(false);
                    }}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              <button className="reserve" onClick={() => setPlanned(true)}>
                {planned
                  ? "Stay added to your plan"
                  : `Plan this stay · €${stay.price * nights}`}
                <ArrowUpRight size={18} />
              </button>
              <p className="note">
                {planned
                  ? `${nights} nights in ${stay.name}. Your sample plan is ready to explore.`
                  : "Illustrative stay, for two. No reservation or payment."}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="rituals" id="rituals">
        <h2>
          Less to do.
          <br />
          <em>More to feel.</em>
        </h2>
        <div>
          <article>
            <span>Morning</span>
            <h3>The slow beginning</h3>
            <p>
              Coffee by the window. Warm rye bread. The luxury of not having
              anywhere to be.
            </p>
          </article>
          <article>
            <span>Afternoon</span>
            <h3>Follow the forest</h3>
            <p>
              Snowshoes by the door, marked trails through the pines, and a warm
              sauna waiting.
            </p>
          </article>
          <article>
            <span>After dark</span>
            <h3>Keep looking up</h3>
            <p>
              Wrap yourself in wool. Let your eyes adjust. Some things are worth
              waiting for.
            </p>
          </article>
        </div>
      </section>
      <footer>
        <a href="#">aurora</a>
        <p>Fictional hospitality concept · Local stay planner only · Koative</p>
        <a href="#stays">Make room for wonder ↗</a>
      </footer>
    </>
  );
}
