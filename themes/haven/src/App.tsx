import { useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowDown,
  Mountain,
  Sunrise,
  Wind,
  Check,
  Plus,
  Minus,
} from "lucide-react";
import mountain from "./assets/mountain.jpg";
import cabin from "./assets/cabin.jpg";
import room from "./assets/room.jpg";
const stays = [
  {
    name: "Forest hideaway",
    type: "A cabin among the trees",
    price: 240,
    image: cabin,
    description:
      "Timber walls, a generous terrace, and the quiet company of the forest. An unhurried place for two.",
    details: ["42 m² of your own", "Private forest terrace", "Sleeps 2 guests"],
  },
  {
    name: "Alpine room",
    type: "Wake up above it all",
    price: 180,
    image: room,
    description:
      "Soft linen, warm oak, and a view that asks nothing of you. A thoughtful room for slow mornings.",
    details: ["32 m² of calm", "Mountain-facing window", "Sleeps 2 guests"],
  },
  {
    name: "The summit suite",
    type: "A little room to disappear",
    price: 320,
    image: room,
    description:
      "Our most spacious retreat, with a separate lounge and wide windows framing the changing mountain light.",
    details: [
      "68 m² to settle into",
      "Private lounge & soaking tub",
      "Sleeps up to 4 guests",
    ],
  },
];
export default function App() {
  const [stay, setStay] = useState(0);
  const [nights, setNights] = useState(3);
  const [guests, setGuests] = useState("2 guests");
  const [arrival, setArrival] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const current = stays[stay];
  const today = new Date().toLocaleDateString("en-CA");
  return (
    <>
      <section className="hero" id="top">
        <img
          className="hero-landscape"
          src={mountain}
          alt="Dramatic alpine peaks rising above a quiet mountain valley"
        />
        <div className="hero-shade" />
        <header>
          <a href="#top" className="brand">
            <Mountain size={27} strokeWidth={1.2} />
            <span>haven</span>
          </a>
          <button
            className="mobile-menu"
            onClick={() => setMobileNav(!mobileNav)}
            aria-expanded={mobileNav}
          >
            {mobileNav ? "Close" : "Menu"}
          </button>
          <nav
            aria-label="Main navigation"
            className={mobileNav ? "nav-open" : ""}
          >
            <a href="#place" onClick={() => setMobileNav(false)}>
              The place
            </a>
            <a href="#stays" onClick={() => setMobileNav(false)}>
              Your stay
            </a>
            <a href="#rhythm" onClick={() => setMobileNav(false)}>
              The slower side
            </a>
          </nav>
          <a href="#booking" className="header-book">
            Find your haven <ArrowUpRight size={16} />
          </a>
        </header>
        <div className="hero-copy">
          <h1>
            A little further.
            <br />
            <em>A little closer.</em>
          </h1>
          <p>
            Further from the everyday.
            <br />
            Closer to what matters.
          </p>
        </div>
        <div className="hero-foot">
          <span>An alpine retreat, imagined.</span>
          <a href="#place">
            Take a breath. Look around. <ArrowDown size={16} />
          </a>
          <span>46° 35′ N · 10° 18′ E</span>
        </div>
      </section>
      <main>
        <section className="arrival-bar" aria-label="Plan your stay">
          <div className="arrival-intro">
            <span>Your time, unhurried.</span>
            <strong>Make room for a little quiet.</strong>
          </div>
          <label>
            Arrival
            <input
              type="date"
              min={today}
              value={arrival}
              onChange={(e) => {
                setArrival(e.target.value);
                setConfirmed(false);
              }}
              aria-label="Arrival date"
            />
          </label>
          <label>
            Company
            <select
              aria-label="Company"
              value={guests}
              onChange={(e) => {
                setGuests(e.target.value);
                setConfirmed(false);
                if (e.target.value === "4 guests") setStay(2);
              }}
            >
              <option>1 guest</option>
              <option>2 guests</option>
              <option>4 guests</option>
            </select>
          </label>
          <a href="#booking">
            Plan your escape <ArrowRight size={17} />
          </a>
        </section>
        <section className="place" id="place">
          <div className="place-title">
            <Mountain size={35} strokeWidth={1.1} />
            <h2>
              Less to do.
              <br />
              <em>More to feel.</em>
            </h2>
            <span>A different kind of altitude.</span>
          </div>
          <div className="place-story">
            <p>
              There’s a place where the road gets smaller, the air gets clearer,
              and the days begin to open up.
            </p>
            <p>
              Haven is an imagined alpine retreat for slow mornings, long walks,
              and the rare pleasure of having nowhere else to be. Thoughtful
              spaces, surrounded by something much bigger.
            </p>
            <a href="#stays">
              A place to call your own <ArrowUpRight size={17} />
            </a>
          </div>
        </section>
        <section className="landscape-pair">
          <div className="cabin-frame">
            <img
              src={cabin}
              alt="A secluded cabin surrounded by green forest"
              loading="lazy"
            />
            <span>Built to belong. Made to disappear into.</span>
          </div>
          <div className="quote-frame">
            <span>
              Leave the rush
              <br />
              at the last bend.
            </span>
            <div className="small-landscape">
              <img
                src={mountain}
                alt="Mountain ridges in soft daylight"
                loading="lazy"
              />
            </div>
            <p>
              The landscape sets the pace here.
              <br />
              All you have to do is follow.
            </p>
          </div>
        </section>
        <section id="stays" className="stays">
          <div className="stays-heading">
            <h2>
              Find your
              <br />
              <em>own corner.</em>
            </h2>
            <p>
              A room. A cabin. A different perspective.
              <br />
              Choose the space that feels like you.
            </p>
          </div>
          <div className="stay-tabs" aria-label="Accommodation">
            {stays.map((s, i) => (
              <button
                key={s.name}
                onClick={() => {
                  setStay(i);
                  setConfirmed(false);
                  if (i !== 2 && guests === "4 guests") setGuests("2 guests");
                }}
                aria-pressed={stay === i}
              >
                {s.name}
                <ArrowUpRight size={16} />
              </button>
            ))}
          </div>
          <div className="stay-preview">
            <img
              key={stay}
              src={current.image}
              alt={current.name + " accommodation concept"}
            />
            <div className="stay-details">
              <span>{current.type}</span>
              <h3>{current.name}</h3>
              <p>{current.description}</p>
              <ul>
                {current.details.map((d) => (
                  <li key={d}>
                    <Check size={13} />
                    {d}
                  </li>
                ))}
              </ul>
              <div className="stay-price">
                <strong>€{current.price}</strong>
                <span>/ night · illustrative rate</span>
              </div>
              <a href="#booking">
                Make this your haven <ArrowRight size={17} />
              </a>
            </div>
          </div>
        </section>
        <section className="rhythm" id="rhythm">
          <div className="rhythm-head">
            <span>The days are yours.</span>
            <h2>
              A slower kind
              <br />
              of <em>adventure.</em>
            </h2>
          </div>
          <div className="rituals">
            <article>
              <Sunrise size={28} strokeWidth={1.1} />
              <h3>Follow the first light.</h3>
              <p>
                A coffee in hand. The valley waking below. No need to be
                anywhere just yet.
              </p>
            </article>
            <article>
              <Mountain size={28} strokeWidth={1.1} />
              <h3>Take the longer way.</h3>
              <p>
                Forest trails and quiet paths. Find your own pace, one beautiful
                detour at a time.
              </p>
            </article>
            <article>
              <Wind size={28} strokeWidth={1.1} />
              <h3>Do a little less.</h3>
              <p>
                A long soak. A well-worn book. Space for the things that get
                lost in the noise.
              </p>
            </article>
          </div>
        </section>
        <section className="booking" id="booking">
          <div className="booking-intro">
            <h2>
              The mountains
              <br />
              can wait.
              <br />
              <em>So can everything else.</em>
            </h2>
            <p>
              Build your perfect pause. Explore a stay below and see how it
              feels.
            </p>
            <span>
              Fictional retreat · No live availability or reservations.
            </span>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setConfirmed(true);
            }}
          >
            <h3>Your little escape</h3>
            <label>
              Your space
              <select
                aria-label="Your space"
                value={stay}
                onChange={(e) => {
                  const n = Number(e.target.value);
                  setStay(n);
                  setConfirmed(false);
                  if (n !== 2 && guests === "4 guests") setGuests("2 guests");
                }}
              >
                {stays.map((s, i) => (
                  <option key={s.name} value={i}>
                    {s.name} · €{s.price} / night
                  </option>
                ))}
              </select>
            </label>
            <div className="booking-row">
              <label>
                Arrive
                <input
                  type="date"
                  required
                  min={today}
                  value={arrival}
                  onChange={(e) => {
                    setArrival(e.target.value);
                    setConfirmed(false);
                  }}
                />
              </label>
              <label>
                Stay a while
                <div className="stepper">
                  <button
                    type="button"
                    aria-label="One fewer night"
                    disabled={nights === 1}
                    onClick={() => {
                      setNights(nights - 1);
                      setConfirmed(false);
                    }}
                  >
                    <Minus size={14} />
                  </button>
                  <span>
                    {nights} {nights === 1 ? "night" : "nights"}
                  </span>
                  <button
                    type="button"
                    aria-label="One more night"
                    disabled={nights === 14}
                    onClick={() => {
                      setNights(nights + 1);
                      setConfirmed(false);
                    }}
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </label>
            </div>
            <label>
              Your company
              <select
                aria-label="Your company"
                value={guests}
                onChange={(e) => {
                  setGuests(e.target.value);
                  setConfirmed(false);
                  if (e.target.value === "4 guests") setStay(2);
                }}
              >
                <option>1 guest</option>
                <option>2 guests</option>
                <option>4 guests</option>
              </select>
            </label>
            <div className="booking-total">
              <span>
                {nights} {nights === 1 ? "night" : "nights"} · {guests}
                <small>Illustrative total, taxes included</small>
              </span>
              <strong>€{current.price * nights}</strong>
            </div>
            <button className="booking-submit">
              {confirmed
                ? "Your demo escape is ready"
                : "Imagine yourself here"}
              {confirmed ? <Check size={18} /> : <ArrowRight size={18} />}
            </button>
            <p className="confirmation" role="status">
              {confirmed
                ? `${current.name}, arriving ${arrival}. Your selection is confirmed for this demo only. Nothing has been booked.`
                : "No payment. No reservation. Just a little possibility."}
            </p>
          </form>
        </section>
      </main>
      <footer>
        <a href="#top" className="brand">
          <Mountain size={25} strokeWidth={1.2} />
          <span>haven</span>
        </a>
        <p>
          A little closer to yourself.
          <br />
          Fictional retreat · An Elseform template
        </p>
        <a href="#top">
          Back to the mountains <ArrowUpRight size={16} />
        </a>
      </footer>
    </>
  );
}
