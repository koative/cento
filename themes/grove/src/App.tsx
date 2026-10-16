import { useState } from "react";
import { ArrowUpRight, Leaf, Plus, Minus, Check } from "lucide-react";
import farm from "./assets/farm.jpg";
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const crops = [
  { name: "Leafy greens", season: [2, 3, 4, 8, 9, 10] },
  { name: "Carrots", season: [5, 6, 7, 8, 9, 10] },
  { name: "Tomatoes", season: [6, 7, 8] },
  { name: "Squash", season: [8, 9, 10, 11] },
  { name: "Apples", season: [8, 9, 10] },
];
export default function App() {
  const [month, setMonth] = useState(9);
  const [size, setSize] = useState("Small");
  const [eggs, setEggs] = useState(false);
  const [weeks, setWeeks] = useState(1);
  const [summary, setSummary] = useState("");
  const price = (size === "Small" ? 18 : 28) + (eggs ? 5 : 0);
  return (
    <>
      <header>
        <a href="#" className="brand">
          <Leaf size={25} />
          grove
        </a>
        <nav aria-label="Main">
          <a href="#harvest">In season</a>
          <a href="#share">Your farm share</a>
        </nav>
        <span>GROWN WITH THE SEASONS</span>
      </header>
      <main>
        <section className="farm-opening">
          <img
            src={farm}
            alt="Golden sunlight across rolling farmland and green fields"
          />
          <div className="farm-title">
            <h1>
              A little closer
              <br />
              to the ground.
            </h1>
            <p>
              Seasonal food. Familiar faces.
              <br />A weekly box with a story.
            </p>
            <a href="#share">
              Build your farm share <ArrowUpRight size={17} />
            </a>
          </div>
          <span className="farm-caption">
            THE GROVE ALMANAC / A FICTIONAL FAMILY FARM
          </span>
        </section>
        <section className="harvest" id="harvest">
          <div className="section-heading">
            <h2>
              Let the season
              <br />
              write the menu.
            </h2>
            <p>
              Our harvest changes with the weather.
              <br />
              Explore an illustrative year on the farm.
            </p>
          </div>
          <div
            className="calendar-scroll"
            role="region"
            aria-label="Scrollable seasonal harvest calendar"
            tabIndex={0}
          >
            <table aria-label="Seasonal crop calendar. Select a month to see its harvest.">
              <thead>
                <tr>
                  <th scope="col">FROM THE FIELD</th>
                  {months.map((m, i) => (
                    <th scope="col" key={m}>
                      <button
                        aria-label={`View ${m} harvest`}
                        aria-pressed={month === i}
                        onClick={() => setMonth(i)}
                      >
                        {m}
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {crops.map((c) => (
                  <tr key={c.name}>
                    <th scope="row">{c.name}</th>
                    {months.map((m, i) => (
                      <td key={m} className={month === i ? "active-month" : ""}>
                        {c.season.includes(i) ? (
                          <span className="crop-dot">
                            <span className="sr-only">In season</span>
                          </span>
                        ) : (
                          <span className="empty">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="harvest-result" role="status">
            <Leaf size={20} />
            <p>
              <b>{months[month]} harvest:</b>{" "}
              {crops
                .filter((c) => c.season.includes(month))
                .map((c) => c.name)
                .join(", ") ||
                "The fields are resting. Stored produce and preserves fill our winter boxes."}
            </p>
          </div>
        </section>
        <section className="share" id="share">
          <div className="share-story">
            <h2>
              A box of
              <br />
              <em>right now.</em>
            </h2>
            <p>
              No perfect rows of identical vegetables. Just the best of this
              week, picked for the people who will cook it.
            </p>
            <div className="box-list">
              <span>THIS OCTOBER, EXPECT</span>
              <p>
                Earthy carrots
                <br />
                Crisp apples
                <br />
                Tender greens
                <br />
                Sweet squash
              </p>
            </div>
          </div>
          <div className="share-builder">
            <h3>Make room at your table.</h3>
            <div className="size-options">
              {["Small", "Family"].map((s) => (
                <button
                  aria-pressed={size === s}
                  key={s}
                  onClick={() => {
                    setSize(s);
                    setSummary("");
                  }}
                >
                  <b>{s} share</b>
                  <span>
                    {s === "Small"
                      ? "1–2 people · 5 varieties"
                      : "3–4 people · 7 varieties"}
                  </span>
                  <strong>
                    £{s === "Small" ? 18 : 28}
                    <small>/ week</small>
                  </strong>
                </button>
              ))}
            </div>
            <label className="egg-option">
              <input
                type="checkbox"
                checked={eggs}
                onChange={(e) => {
                  setEggs(e.target.checked);
                  setSummary("");
                }}
              />
              <span>Add six pasture eggs</span>
              <b>+ £5 / week</b>
            </label>
            <div className="weeks">
              <span>Weeks to preview</span>
              <div>
                <button
                  aria-label="Fewer weeks"
                  disabled={weeks === 1}
                  onClick={() => {
                    setWeeks(weeks - 1);
                    setSummary("");
                  }}
                >
                  <Minus size={15} />
                </button>
                <output aria-label="Number of weeks">{weeks}</output>
                <button
                  aria-label="More weeks"
                  disabled={weeks === 8}
                  onClick={() => {
                    setWeeks(weeks + 1);
                    setSummary("");
                  }}
                >
                  <Plus size={15} />
                </button>
              </div>
            </div>
            <button
              className="build-button"
              onClick={() =>
                setSummary(
                  `${size} share${eggs ? " with eggs" : ""} for ${weeks} ${weeks === 1 ? "week" : "weeks"}: £${price * weeks}. Local preview only — no subscription started.`,
                )
              }
            >
              Preview my share · £{price * weeks}
              <ArrowUpRight size={18} />
            </button>
            <p role="status" className="status">
              {summary ||
                "No payment or subscription. Just a taste of how your farm share could work."}
            </p>
          </div>
        </section>
        <section className="promise">
          <Check size={28} />
          <h2>Good food has roots.</h2>
          <p>
            Grove is an imagined community-supported farm. This template
            connects the rhythm of a growing season to the simple joy of
            deciding what to cook.
          </p>
        </section>
      </main>
      <footer>
        <strong>grove / FROM OUR GROUND TO YOUR TABLE</strong>
        <p>
          Fictional farm by Koative. Harvest, prices, and availability are
          demonstration content.
        </p>
      </footer>
    </>
  );
}
