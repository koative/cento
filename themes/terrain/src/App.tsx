import { useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowDown,
  Mountain,
  Compass,
  Check,
  Plus,
  Minus,
} from "lucide-react";
import mountains from "./assets/mountains.jpg";
import forest from "./assets/forest.jpg";
const routes = [
  {
    name: "The quiet way",
    region: "BLACK FOREST, GERMANY",
    level: "Easy",
    days: "3 days",
    distance: "28 km",
    elevation: "680 m",
    description:
      "Follow the forest floor through mossy valleys, quiet villages, and places where the only appointment is sunset.",
    stops: [
      "Arrive in Freiburg · Meet your trail companions",
      "Forest paths · Lakeside picnic · 12 km",
      "The ridge at first light · 16 km · Return",
    ],
    date: "June 12–14, 2027",
    price: 390,
  },
  {
    name: "Above the ordinary",
    region: "DOLOMITES, ITALY",
    level: "Moderate",
    days: "5 days",
    distance: "46 km",
    elevation: "2,450 m",
    description:
      "Limestone peaks, long lunches, and mountain huts above the clouds. A hut-to-hut journey with room to find your own pace.",
    stops: [
      "Arrive in Cortina · Kit check & welcome dinner",
      "Into the high country · 11 km · Rifugio stay",
      "The long ridge · 14 km · Alpine meadows",
      "Lakes & limestone · 13 km · Last mountain night",
      "One more sunrise · 8 km · Back to the valley",
    ],
    date: "July 08–12, 2027",
    price: 790,
  },
  {
    name: "The wild edge",
    region: "LYNGEN ALPS, NORWAY",
    level: "Challenging",
    days: "7 days",
    distance: "72 km",
    elevation: "4,100 m",
    description:
      "For those who want to go a little further. Trace the meeting of mountain and sea through the wild, open landscapes of the Arctic.",
    stops: [
      "Tromsø arrival · Expedition briefing",
      "Fjord crossing · First ascent · 10 km",
      "The high plateau · 16 km · Wild camp",
      "Glacier outlook · 12 km · Mountain hut",
      "Follow the coastline · 14 km · Wild camp",
      "The final summit · 13 km · Celebration meal",
      "Slow morning · 7 km · Return to Tromsø",
    ],
    date: "August 16–22, 2027",
    price: 1290,
  },
];
export default function App() {
  const [selected, setSelected] = useState(1);
  const [details, setDetails] = useState(false);
  const [saved, setSaved] = useState(false);
  const route = routes[selected];
  return (
    <>
      <header>
        <a className="logo" href="#">
          <Mountain size={25} />
          terrain<span>®</span>
        </a>
        <nav>
          <a href="#routes">Find your trail</a>
          <a href="#philosophy">Our way</a>
          <a href="#journal">Field notes</a>
        </nav>
        <a className="header-link" href="#routes">
          Let's get outside <ArrowUpRight size={16} />
        </a>
      </header>
      <main>
        <section className="hero">
          <div className="hero-photo">
            <img
              src={mountains}
              alt="Dramatic alpine peaks rising above a green mountain valley"
            />
            <div className="hero-photo-top">
              <span>
                LESS SCROLLING.
                <br />
                MORE WANDERING.
              </span>
              <Compass size={35} />
            </div>
            <div className="hero-photo-bottom">
              <h1>
                Somewhere
                <br />
                you can
                <br />
                <em>feel small.</em>
              </h1>
              <span>
                46°29′52.8″ N<br />
                11°51′08.4″ E
              </span>
            </div>
          </div>
          <div className="hero-side">
            <span className="side-year">OUT THERE, SINCE 2018</span>
            <div>
              <h2>
                The best things
                <br />
                happen
                <br />
                <em>off the map.</em>
              </h2>
              <p>
                Small-group journeys for curious souls. Real places, local
                guides, and a little space to breathe.
              </p>
              <a href="#routes">
                Find your way out <ArrowRight size={18} />
              </a>
            </div>
            <div className="hero-stamp">
              <Mountain size={31} />
              <span>
                GO SLOW.
                <br />
                LOOK CLOSER.
                <br />
                TAKE IT IN.
              </span>
            </div>
            <a className="scroll-link" href="#routes">
              THE TRAIL STARTS BELOW <ArrowDown size={15} />
            </a>
          </div>
        </section>
        <section className="routes" id="routes">
          <div className="section-top">
            <h2>
              Pick a path.
              <br />
              <em>Make it yours.</em>
            </h2>
            <p>
              There is no right way to get out there.
              <br />
              Just the one that feels right for you.
            </p>
          </div>
          <div
            className="route-selector"
            role="tablist"
            aria-label="Choose trail difficulty"
          >
            {routes.map((r, i) => (
              <button
                key={r.level}
                role="tab"
                id={"route-tab-" + i}
                aria-selected={selected === i}
                aria-controls="route-panel"
                onClick={() => {
                  setSelected(i);
                  setSaved(false);
                  setDetails(false);
                }}
              >
                <span
                  className={"difficulty-mark level-" + i}
                  aria-hidden="true"
                >
                  {[0, 1, 2].map((j) => (
                    <i className={j <= i ? "filled" : ""} key={j} />
                  ))}
                </span>
                {r.level}
                <span>{r.days}</span>
              </button>
            ))}
          </div>
          <div
            className="route-panel"
            id="route-panel"
            role="tabpanel"
            aria-labelledby={"route-tab-" + selected}
          >
            <div className="route-map">
              <svg
                viewBox="0 0 420 300"
                role="img"
                aria-label="Illustrative trail route diagram"
              >
                <g className="contours">
                  {Array.from({ length: 9 }, (_, i) => (
                    <ellipse
                      key={i}
                      cx="170"
                      cy="155"
                      rx={45 + i * 22}
                      ry={22 + i * 15}
                      transform={`rotate(-22 170 155)`}
                    />
                  ))}
                </g>
                <path
                  className="trail"
                  d={
                    selected === 0
                      ? "M65 240 Q100 160 165 170 T310 80"
                      : selected === 1
                        ? "M65 240 Q105 235 125 180 T205 150 T260 65 L320 75"
                        : "M65 240 L110 190 L90 150 L180 170 L205 90 L260 115 L285 50 L340 70"
                  }
                />
                <circle cx="65" cy="240" r="6" />
                <circle
                  cx={selected === 0 ? "310" : selected === 1 ? "320" : "340"}
                  cy={selected === 0 ? "80" : selected === 1 ? "75" : "70"}
                  r="6"
                />
                <text x="42" y="265">
                  START
                </text>
                <text x="300" y="45">
                  SUMMIT
                </text>
              </svg>
              <span>ILLUSTRATIVE ROUTE · NOT FOR NAVIGATION</span>
              <Compass size={30} />
            </div>
            <div className="route-info">
              <span>{route.region}</span>
              <h3>{route.name}</h3>
              <p>{route.description}</p>
              <div className="route-stats">
                <div>
                  <small>ON THE TRAIL</small>
                  <strong>{route.days}</strong>
                </div>
                <div>
                  <small>DISTANCE</small>
                  <strong>{route.distance}</strong>
                </div>
                <div>
                  <small>ASCENT</small>
                  <strong>{route.elevation}</strong>
                </div>
              </div>
              <div className="route-actions">
                <button
                  className="details-toggle"
                  onClick={() => setDetails(!details)}
                  aria-expanded={details}
                >
                  {details ? "Close itinerary" : "See the itinerary"}
                  {details ? <Minus size={17} /> : <Plus size={17} />}
                </button>
                <button
                  className="save"
                  onClick={() => setSaved(!saved)}
                  aria-pressed={saved}
                >
                  {saved ? <Check size={16} /> : <Plus size={16} />}{" "}
                  {saved ? "Saved" : "Save trip"}
                </button>
              </div>
              {details && (
                <ol className="itinerary">
                  {route.stops.map((s, i) => (
                    <li key={s}>
                      <span>DAY {i + 1}</span>
                      {s}
                    </li>
                  ))}
                </ol>
              )}
              <p className="save-message" aria-live="polite">
                {saved ? "Added to your shortlist for this visit." : ""}
              </p>
            </div>
          </div>
          <div className="route-date">
            <span>{route.date} · EXAMPLE DEPARTURE</span>
            <span>
              From <strong>€{route.price}</strong> / person · Demonstration only
            </span>
          </div>
        </section>
        <section className="philosophy" id="philosophy">
          <div>
            <span>LEAVE THE NOISE BEHIND.</span>
            <h2>
              Less itinerary.
              <br />
              More <em>instinct.</em>
            </h2>
            <p>
              We aren't here to tick boxes. We're here for the conversations on
              the climb, the second cup of coffee, the path you almost didn't
              take.
            </p>
            <p>
              Our journeys are small by design. A handful of good people, a
              guide who knows the ground, and enough room for the unexpected.
            </p>
            <div className="principles">
              <span>SMALL GROUPS</span>
              <span>LOCAL KNOWLEDGE</span>
              <span>LIGHT FOOTPRINT</span>
            </div>
          </div>
          <img
            src={forest}
            alt="Sunlight falling across a quiet forest clearing with deer"
            loading="lazy"
          />
        </section>
        <section className="journal" id="journal">
          <div>
            <h2>
              A note from
              <br />
              <em>the outside.</em>
            </h2>
            <span>FIELD NOTES · 4 MIN READ</span>
          </div>
          <article>
            <h3>
              The art of not
              <br />
              getting there faster.
            </h3>
            <p>
              Somewhere along the way, we made being outside another thing to
              optimize. More kilometers. Higher summits. A faster pace. But the
              best part of a walk rarely shows up on your watch.
            </p>
            <p>
              Try this on your next trail: stop somewhere that isn't the
              viewpoint. Put the phone away. Listen for three different sounds.
              The destination will still be there.
            </p>
            <span>From the Terrain journal · Sample editorial</span>
          </article>
        </section>
      </main>
      <footer>
        <div className="footer-top">
          <a className="logo" href="#">
            <Mountain size={25} />
            terrain<span>®</span>
          </a>
          <p>
            Good company.
            <br />
            Open country.
          </p>
          <a href="#routes">
            Find your next trail <ArrowUpRight size={20} />
          </a>
        </div>
        <div className="footer-bottom">
          <span>FICTIONAL TRAVEL BRAND · NO TRIPS ARE SOLD</span>
          <a href="../../">
            A KOATIVE TEMPLATE <ArrowUpRight size={13} />
          </a>
        </div>
      </footer>
    </>
  );
}
