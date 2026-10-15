import { useState } from "react";
import { ArrowUpRight, ArrowRight, Flame, Utensils, Check } from "lucide-react";
import pizza from "./assets/pizza.jpg";
import pasta from "./assets/pasta.jpg";
import restaurant from "./assets/restaurant.jpg";
const menu = {
  "From the oven": [
    {
      name: "The good margherita",
      description: "San Marzano tomato, fior di latte, fresh basil",
      price: 16,
      tag: "V",
    },
    {
      name: "Hot honey & salami",
      description: "Spicy salami, smoked mozzarella, wildflower honey",
      price: 21,
      tag: "",
    },
    {
      name: "Mushroom after dark",
      description: "Roasted mushrooms, taleggio, thyme, black pepper",
      price: 20,
      tag: "V",
    },
    {
      name: "A little green",
      description: "Courgette, ricotta, lemon, basil pesto",
      price: 19,
      tag: "V",
    },
  ],
  "Small plates": [
    {
      name: "Burrata & the season",
      description: "Creamy burrata, seasonal tomatoes, basil oil",
      price: 13,
      tag: "V",
    },
    {
      name: "Crispy little potatoes",
      description: "Rosemary salt, roasted garlic aioli",
      price: 8,
      tag: "V",
    },
    {
      name: "The house focaccia",
      description: "Warm from the oven, good olive oil",
      price: 6,
      tag: "VG",
    },
    {
      name: "Big green salad",
      description: "Little gem, fresh herbs, sharp lemon dressing",
      price: 10,
      tag: "VG",
    },
  ],
  "Sweet endings": [
    {
      name: "One more tiramisu",
      description: "Espresso, mascarpone, cocoa. Two spoons?",
      price: 9,
      tag: "V",
    },
    {
      name: "Olive oil cake",
      description: "Citrus curd, cultured cream, sea salt",
      price: 9,
      tag: "V",
    },
    {
      name: "Gelato, simply",
      description: "Two scoops: pistachio, vanilla, or dark chocolate",
      price: 7,
      tag: "V",
    },
  ],
};
type Category = keyof typeof menu;
export default function App() {
  const [category, setCategory] = useState<Category>("From the oven");
  const [time, setTime] = useState("19:00");
  const [booked, setBooked] = useState(false);
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("2 guests");
  const today = new Date().toLocaleDateString("en-CA");
  return (
    <>
      <div className="announcement">
        A little heat. A lot of heart. <Flame size={13} /> Your new favorite
        fictional neighborhood spot.
      </div>
      <header>
        <a href="#" className="logo">
          ember<span>®</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#menu">The menu</a>
          <a href="#story">Our place</a>
          <a href="#book" className="nav-book">
            Grab a table <ArrowUpRight size={15} />
          </a>
        </nav>
      </header>
      <main>
        <section className="hero">
          <div className="hero-type">
            <span className="side-copy">
              WOOD-FIRED
              <br />
              GOOD TIMES
            </span>
            <h1>
              Good food.
              <br />
              <em>Better company.</em>
            </h1>
            <span className="hero-mark">
              <Flame size={35} strokeWidth={1.5} />
              <span>
                FIRED UP
                <br />
                FOR YOU
              </span>
            </span>
          </div>
          <div className="hero-photo">
            <img
              src={pizza}
              alt="Freshly baked pizza with tomato, melted cheese, and basil"
            />
            <div className="paper-note">
              <Utensils size={25} strokeWidth={1.4} />
              <h2>
                Pull up
                <br />a chair.
              </h2>
              <p>
                Come hungry.
                <br />
                Stay a little longer.
              </p>
              <a href="#book">
                Meet you at the table <ArrowRight size={17} />
              </a>
            </div>
            <span className="photo-label">
              HOT FROM THE OVEN. STRAIGHT TO THE TABLE.
            </span>
          </div>
        </section>
        <section className="intro" id="story">
          <span className="tiny-flame">
            <Flame size={28} />
          </span>
          <h2>
            Nothing fancy.
            <br />
            Just <em>really good.</em>
          </h2>
          <div>
            <p>
              Blistered crusts. The first sip of something cold. Plates passed
              around a table that always has room for one more.
            </p>
            <p>
              That’s the idea behind Ember. A neighborhood kitchen where the
              fire’s always on and the good times take their time.
            </p>
            <a href="#menu">
              Find your new usual <ArrowDownIcon />
            </a>
          </div>
        </section>
        <section id="menu" className="menu-section">
          <div className="menu-header">
            <h2>
              Made to
              <br />
              <em>be shared.</em>
            </h2>
            <p>
              A small menu. A big appetite.
              <br />
              Seasonal ingredients, cooked with feeling.
            </p>
          </div>
          <div className="menu-layout">
            <div className="menu-photo">
              <img
                src={category === "From the oven" ? pizza : pasta}
                alt={
                  category === "From the oven"
                    ? "Wood-fired pizza"
                    : "Fresh pasta with basil and seasonal ingredients"
                }
                loading="lazy"
              />
              <div className="menu-stamp">
                GOOD
                <br />
                THINGS
                <br />
                TAKE FIRE.
              </div>
            </div>
            <div className="menu-paper">
              <div className="menu-tabs" aria-label="Menu categories">
                {Object.keys(menu).map((c) => (
                  <button
                    key={c}
                    aria-pressed={category === c}
                    onClick={() => setCategory(c as Category)}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <div className="dishes" aria-live="polite">
                {menu[category].map((d) => (
                  <article key={d.name}>
                    <div>
                      <h3>
                        {d.name} {d.tag && <small>{d.tag}</small>}
                      </h3>
                      <span>€{d.price}</span>
                    </div>
                    <p>{d.description}</p>
                  </article>
                ))}
              </div>
              <p className="dietary">
                V vegetarian · VG vegan
                <br />
                Illustrative menu. Please ask about ingredients and allergens at
                a real venue.
              </p>
            </div>
          </div>
        </section>
        <section className="gather">
          <img
            src={restaurant}
            alt="Warm restaurant interior ready for a shared dinner"
            loading="lazy"
          />
          <div>
            <h2>
              The best things
              <br />
              happen{" "}
              <em>
                around
                <br />a table.
              </em>
            </h2>
            <a href="#book">
              Make an evening of it <ArrowUpRight size={20} />
            </a>
          </div>
        </section>
        <section className="reservation" id="book">
          <div className="booking-title">
            <Flame size={33} />
            <h2>
              Your people.
              <br />
              Our place.
            </h2>
            <p>
              Date night, a long catch-up, or absolutely no occasion at all.
              There’s a place for you here.
            </p>
            <div className="hours">
              <span>Tuesday — Thursday</span>
              <span>17:00 — 22:00</span>
              <span>Friday — Sunday</span>
              <span>12:00 — 23:00</span>
              <span>Monday</span>
              <span>Taking a breather</span>
            </div>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setBooked(true);
            }}
          >
            <h3>Let’s make a night of it.</h3>
            <div className="booking-fields">
              <label>
                Your day
                <input
                  type="date"
                  min={today}
                  required
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                    setBooked(false);
                  }}
                />
              </label>
              <label>
                Your people
                <select
                  aria-label="Your people"
                  value={guests}
                  onChange={(e) => {
                    setGuests(e.target.value);
                    setBooked(false);
                  }}
                >
                  {[
                    "2 guests",
                    "1 guest",
                    "3 guests",
                    "4 guests",
                    "5 guests",
                    "6 guests",
                  ].map((g) => (
                    <option key={g}>{g}</option>
                  ))}
                </select>
              </label>
            </div>
            <fieldset>
              <legend>Choose a time</legend>
              {["17:30", "18:00", "18:30", "19:00", "19:30", "20:00"].map(
                (t) => (
                  <button
                    key={t}
                    type="button"
                    aria-pressed={time === t}
                    onClick={() => {
                      setTime(t);
                      setBooked(false);
                    }}
                  >
                    {t}
                  </button>
                ),
              )}
            </fieldset>
            <label>
              Your name
              <input required placeholder="Who are we welcoming?" name="name" />
            </label>
            <button type="submit" className="reserve-button">
              {booked ? (
                <>
                  <Check size={18} /> Demo table selected
                </>
              ) : (
                <>
                  Save me a seat <ArrowRight size={18} />
                </>
              )}
            </button>
            <p className="booking-note" role="status">
              {booked
                ? `${guests} · ${date} · ${time}. This is a demo confirmation. No table has been reserved.`
                : "Try the reservation experience. This fictional restaurant does not accept real bookings."}
            </p>
          </form>
        </section>
      </main>
      <footer>
        <a href="#" className="footer-logo">
          ember®
        </a>
        <span>
          Made with fire. Shared with love.
          <br />
          Fictional restaurant · A Koative template
        </span>
        <a href="#menu">
          One more look at the menu? <ArrowUpRight size={17} />
        </a>
      </footer>
    </>
  );
}
function ArrowDownIcon() {
  return <ArrowRight size={16} style={{ transform: "rotate(90deg)" }} />;
}
